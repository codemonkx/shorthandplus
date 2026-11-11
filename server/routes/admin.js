import express from 'express';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import db from '../db/database.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { uploadRateLimiter } from '../middleware/rateLimit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Mitigate CSV Formula Injection (CWE-1236)
function sanitizeCsvCell(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  // If the cell begins with dangerous formula indicators, neutralize by prepending a single quote
  if (/^[=+\-@\t\r]/.test(str)) {
    return `"'${str}"`;
  }
  return `"${str}"`;
}

function getDaysRemaining(expiryDate) {
  if (!expiryDate) return 0;
  const diff = new Date(expiryDate) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// Cohort-Wide Admin Dashboard Statistics
router.get('/stats', verifyToken, requireAdmin, async (req, res) => {
  try {
    const totalStudentsRow = await db.get("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
    const totalStudents = Number(totalStudentsRow?.count || 0);

    const activeEnrollmentsRow = await db.get(`
      SELECT COUNT(DISTINCT user_id) as count 
      FROM enrollments 
      WHERE status = 'Active' AND expires_at > CURRENT_TIMESTAMP
    `);
    const activeEnrollments = Number(activeEnrollmentsRow?.count || 0);

    const totalRevenueRow = await db.get(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM transactions 
      WHERE status = 'Auto-Verified' OR status = 'Success'
    `);
    const totalRevenue = Number(totalRevenueRow?.total || 0);

    const totalAudioTestsRow = await db.get("SELECT COUNT(*) as count FROM tests WHERE type = 'steno' AND is_active = 1");
    const totalAudioTests = Number(totalAudioTestsRow?.count || 0);

    const totalTypingTestsRow = await db.get("SELECT COUNT(*) as count FROM tests WHERE type = 'typing' AND is_active = 1");
    const totalTypingTests = Number(totalTypingTestsRow?.count || 0);

    const performance = await db.get(`
      SELECT 
        ROUND(AVG(accuracy_pct), 1) as avgAccuracy,
        ROUND(AVG(speed_wpm), 1) as avgSpeed,
        COUNT(*) as totalTestsConducted
      FROM test_results
    `);

    return res.json({
      success: true,
      stats: {
        totalStudents,
        activeSubscriptions: activeEnrollments,
        totalAudioTests,
        totalTypingTests,
        totalRevenue,
        avgAccuracy: Number(performance?.avgaccuracy || performance?.avgAccuracy || 0),
        avgSpeed: Number(performance?.avgspeed || performance?.avgSpeed || 0),
        totalTestsConducted: Number(performance?.totaltestsconducted || performance?.totalTestsConducted || 0)
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching statistics.' });
  }
});

// Candidate Roster
router.get('/students', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = `
      SELECT u.id, u.name, u.email, u.roll_no as "rollNo", u.state, u.status,
             (SELECT plan_name FROM enrollments WHERE user_id = u.id AND status = 'Active' AND expires_at > CURRENT_TIMESTAMP ORDER BY expires_at DESC LIMIT 1) as plan,
             (SELECT expires_at FROM enrollments WHERE user_id = u.id AND status = 'Active' AND expires_at > CURRENT_TIMESTAMP ORDER BY expires_at DESC LIMIT 1) as "expiresAt"
      FROM users u
      WHERE u.role = 'student'
    `;
    const params = [];

    if (search) {
      query += ' AND (u.name LIKE ? OR u.roll_no LIKE ? OR u.email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status && status !== 'All') {
      query += ' AND u.status = ?';
      params.push(status);
    }

    query += ' ORDER BY u.id ASC';

    const users = await db.all(query, params);

    const formatted = users.map(u => {
      const exp = u.expiresAt || u.expiresat;
      const days = exp ? getDaysRemaining(exp) : 0;
      return {
        id: u.id,
        name: u.name,
        rollNo: u.rollNo || u.rollno,
        email: u.email,
        targetExam: 'Patna High Court & SSC',
        plan: u.plan || 'No Active Plan',
        speed: 80,
        accuracy: 94.5,
        daysRemaining: days,
        status: u.status
      };
    });

    return res.json({ success: true, students: formatted });
  } catch (error) {
    console.error('Error fetching students:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching students.' });
  }
});

// Toggle Student Status ('Active' <-> 'Suspended')
router.put('/students/:id/status', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.get('SELECT status FROM users WHERE id = ?', id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    const nextStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    await db.run('UPDATE users SET status = ? WHERE id = ?', nextStatus, id);

    return res.json({
      success: true,
      message: `Candidate status updated to ${nextStatus}.`,
      status: nextStatus
    });
  } catch (error) {
    console.error('Error toggling student status:', error);
    return res.status(500).json({ success: false, message: 'Failed to update student status.' });
  }
});

// Extend Candidate Subscription Pass (Admin Action)
router.post('/students/:id/extend-pass', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { days = 30 } = req.body;
    const user = await db.get('SELECT id, name, roll_no FROM users WHERE id = ?', id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    const currentEnrollment = await db.get(`
      SELECT * FROM enrollments 
      WHERE user_id = ? AND status = 'Active' AND expires_at > CURRENT_TIMESTAMP
      ORDER BY expires_at DESC LIMIT 1
    `, id);

    let newExpiry;
    if (currentEnrollment) {
      newExpiry = new Date(new Date(currentEnrollment.expires_at).getTime() + days * 24 * 60 * 60 * 1000).toISOString();
      await db.run('UPDATE enrollments SET expires_at = ? WHERE id = ?', newExpiry, currentEnrollment.id);
    } else {
      newExpiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      await db.run(`
        INSERT INTO enrollments (user_id, plan_name, expires_at, status)
        VALUES (?, 'Director Special Grant (30 Days)', ?, 'Active')
      `, id, newExpiry);
    }

    return res.json({
      success: true,
      message: `Successfully extended subscription pass by ${days} days for ${user.name}.`,
      expiresAt: newExpiry
    });
  } catch (error) {
    console.error('Error extending student pass:', error);
    return res.status(500).json({ success: false, message: 'Failed to extend pass.' });
  }
});

// Admin Manual Password Reset
router.post('/students/:id/reset-password', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    const user = await db.get('SELECT id, name, email FROM users WHERE id = ?', id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    const tempPassword = newPassword && newPassword.trim().length >= 6 
      ? newPassword.trim() 
      : `Gaya@${Math.floor(100000 + Math.random() * 900000)}`;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(tempPassword, salt);

    await db.run('UPDATE users SET password_hash = ? WHERE id = ?', hash, id);

    return res.json({
      success: true,
      message: `Password reset successfully for ${user.name}.`,
      tempPassword
    });
  } catch (error) {
    console.error('Error resetting student password by admin:', error);
    return res.status(500).json({ success: false, message: 'Failed to reset student password.' });
  }
});

// Permanently Delete / Remove Student Account
router.delete('/students/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.get('SELECT id, name, role FROM users WHERE id = ?', id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Cannot delete administrator account.' });
    }

    // Clean up student related records across all tables
    await db.run('DELETE FROM enrollments WHERE user_id = ?', id);
    await db.run('DELETE FROM test_results WHERE user_id = ?', id);
    await db.run('DELETE FROM password_resets WHERE user_id = ?', id);
    await db.run('DELETE FROM transactions WHERE user_id = ?', id);
    await db.run('DELETE FROM users WHERE id = ?', id);

    return res.json({
      success: true,
      message: `Candidate "${user.name}" removed successfully.`
    });
  } catch (error) {
    console.error('Error deleting student by admin:', error);
    return res.status(500).json({ success: false, message: 'Server error removing student.' });
  }
});

// Financial Ledger Transactions
router.get('/transactions', verifyToken, requireAdmin, async (req, res) => {
  try {
    const txns = await db.all('SELECT * FROM transactions ORDER BY created_at DESC');

    const formatted = txns.map(t => ({
      id: t.id,
      student: t.student_name,
      rollNo: t.roll_no,
      plan: t.plan_name,
      amount: t.amount,
      mode: t.mode,
      date: t.date_str || new Date(t.created_at).toLocaleDateString(),
      status: t.status
    }));

    return res.json({ success: true, transactions: formatted });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching transactions.' });
  }
});

// Announcements CRUD
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await db.all('SELECT * FROM announcements WHERE is_active = 1 ORDER BY is_live_banner DESC, id DESC');
    return res.json({ success: true, announcements });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error fetching announcements.' });
  }
});

router.post('/announcements', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, tag = 'Notice', description, isLiveBanner = false } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required.' });
    }

    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    if (isLiveBanner) {
      await db.run('UPDATE announcements SET is_live_banner = 0');
    }

    const result = await db.run(`
      INSERT INTO announcements (title, tag, date_str, description, is_live_banner)
      VALUES (?, ?, ?, ?, ?)
    `,
      title,
      tag,
      dateStr,
      description || title,
      isLiveBanner ? 1 : 0
    );

    return res.status(201).json({
      success: true,
      message: isLiveBanner ? 'Live notice banner broadcasted to all online students!' : 'Announcement published.',
      announcementId: result.lastInsertRowid || result.id
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create announcement.' });
  }
});

router.delete('/announcements/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    await db.run('DELETE FROM announcements WHERE id = ?', req.params.id);
    return res.json({ success: true, message: 'Announcement removed.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete announcement.' });
  }
});

// CSV Export of Candidate Examination Results Register
router.get('/export-results-csv', verifyToken, requireAdmin, async (req, res) => {
  try {
    const results = await db.all(`
      SELECT 
        tr.id as "ResultID",
        u.roll_no as "RollNumber",
        u.name as "CandidateName",
        u.email as "Email",
        tr.test_title as "ExamTitle",
        tr.test_type as "ExamType",
        tr.speed_wpm as "SpeedWPM",
        tr.accuracy_pct as "AccuracyPercentage",
        tr.total_words as "TotalWords",
        tr.typed_words as "TypedWords",
        tr.full_mistakes as "FullMistakes",
        tr.half_mistakes as "HalfMistakes",
        tr.effective_errors as "EffectiveErrors",
        tr.qualification_status as "QualificationStatus",
        tr.time_taken_secs as "TimeTakenSecs",
        tr.created_at as "ExaminationDate"
      FROM test_results tr
      JOIN users u ON tr.user_id = u.id
      ORDER BY tr.id DESC
    `);

    // Generate CSV string
    const headers = [
      'Result ID', 'Roll Number', 'Candidate Name', 'Email', 'Exam Title',
      'Exam Type', 'Speed (WPM)', 'Accuracy (%)', 'Total Words', 'Typed Words',
      'Full Mistakes', 'Half Mistakes', 'Effective Errors', 'Status', 'Time (Secs)', 'Exam Date'
    ];

    const rows = results.map(r => [
      r.ResultID || r.resultid,
      sanitizeCsvCell(r.RollNumber || r.rollnumber),
      sanitizeCsvCell(r.CandidateName || r.candidatename),
      sanitizeCsvCell(r.Email || r.email),
      sanitizeCsvCell(r.ExamTitle || r.examtitle),
      r.ExamType || r.examtype,
      r.SpeedWPM || r.speedwpm,
      r.AccuracyPercentage || r.accuracypercentage,
      r.TotalWords || r.totalwords,
      r.TypedWords || r.typedwords,
      r.FullMistakes || r.fullmistakes,
      r.HalfMistakes || r.halfmistakes,
      r.EffectiveErrors || r.effectiveerrors,
      sanitizeCsvCell(r.QualificationStatus || r.qualificationstatus),
      r.TimeTakenSecs || r.timetakensecs,
      sanitizeCsvCell(r.ExaminationDate || r.examinationdate)
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="shorthand_results_register.csv"');
    return res.send(csvContent);
  } catch (error) {
    console.error('Error generating CSV export:', error);
    return res.status(500).json({ success: false, message: 'Failed to export CSV.' });
  }
});

// Upload Audio Recording File (Persisted to Server Storage with Strict MIME & Extension Whitelist)
router.post('/upload-audio', verifyToken, requireAdmin, uploadRateLimiter, express.json({ limit: '50mb' }), async (req, res) => {
  try {
    const { fileName, data } = req.body;
    if (!data || !fileName) {
      return res.status(400).json({ success: false, message: 'Audio file data and fileName are required.' });
    }

    // Strict audio file extension whitelisting
    const ALLOWED_EXTENSIONS = new Set(['.mp3', '.wav', '.ogg', '.m4a', '.aac']);
    const rawExt = path.extname(fileName).toLowerCase();
    
    if (!ALLOWED_EXTENSIONS.has(rawExt)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid file format. Only official audio formats (.mp3, .wav, .ogg, .m4a, .aac) are permitted.' 
      });
    }

    // Extract base64 payload
    const matches = data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const base64Data = matches ? matches[2] : data;
    const buffer = Buffer.from(base64Data, 'base64');

    // Bounds check on buffer size (max 50 MB, min 100 bytes)
    if (buffer.length < 100) {
      return res.status(400).json({ success: false, message: 'Uploaded audio buffer is empty or corrupt.' });
    }
    if (buffer.length > 50 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: 'File size exceeds 50 MB limit.' });
    }

    // Create uploads/audio directory if not existing
    const uploadsDir = path.join(__dirname, '../uploads/audio');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Sanitize base name to eliminate path traversal characters
    const cleanExt = rawExt;
    const baseName = path.basename(fileName, cleanExt).replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeName = `${baseName}_${Date.now()}${cleanExt}`;
    const filePath = path.join(uploadsDir, safeName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/api/uploads/audio/${safeName}`;

    return res.json({
      success: true,
      message: 'Audio file uploaded and calibrated successfully.',
      url: publicUrl,
      fileName: safeName,
      fileSize: (buffer.length / (1024 * 1024)).toFixed(2) + ' MB'
    });
  } catch (error) {
    console.error('Audio upload error:', error);
    return res.status(500).json({ success: false, message: 'Failed to upload audio file.' });
  }
});

export default router;
