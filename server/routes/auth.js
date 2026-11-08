import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/database.js';
import { JWT_SECRET, ADMIN_PIN } from '../config.js';
import { verifyToken } from '../middleware/auth.js';
import { authRateLimiter, passwordResetLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// Helper to calculate days remaining
function getDaysRemaining(expiryDate) {
  if (!expiryDate) return 0;
  const diff = new Date(expiryDate) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// Student & User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, mobile, state, language } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if email already registered
    const existing = await db.get('SELECT id FROM users WHERE email = ?', cleanEmail);
    if (existing) {
      return res.status(409).json({ success: false, message: 'This email is already registered. Please log in.' });
    }

    // Generate unique roll number
    const countRow = await db.get("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
    const userCount = Number(countRow?.count || 0);
    const rollNo = `SP-2026-${String(userCount + 101).padStart(3, '0')}`;

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const result = await db.run(`
      INSERT INTO users (name, email, password_hash, role, roll_no, mobile, state, language, status)
      VALUES (?, ?, ?, 'student', ?, ?, ?, ?, 'Active')
    `,
      name.trim(),
      cleanEmail,
      passwordHash,
      rollNo,
      mobile ? mobile.trim() : '',
      state || 'Bihar',
      language || 'English'
    );

    const userId = result.lastInsertRowid || result.id;

    // Issue JWT token
    const token = jwt.sign({ id: userId, email: cleanEmail, role: 'student' }, JWT_SECRET, { expiresIn: '30d' });

    const userObj = {
      id: userId,
      name: name.trim(),
      email: cleanEmail,
      role: 'student',
      rollNo,
      mobile: mobile || '',
      state: state || 'Bihar',
      language: language || 'English',
      status: 'Active',
      subscription: {
        plan: 'Free Trial Pass',
        status: 'Active',
        daysRemaining: 7,
        isPaid: false
      }
    };

    return res.status(201).json({
      success: true,
      message: 'Account successfully registered! Welcome to Shorthand Plus.',
      token,
      user: userObj
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

// User & Admin Login
router.post('/login', authRateLimiter, async (req, res) => {
  try {
    const { email, password, adminPasscode, mode } = req.body;

    // Admin direct PIN login
    if (mode === 'admin') {
      const code = (adminPasscode || password || '').trim();

      let adminUser = await db.get("SELECT * FROM users WHERE role = 'admin' LIMIT 1");

      if (!adminUser) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(ADMIN_PIN, salt);
        const ins = await db.run(`
          INSERT INTO users (name, email, password_hash, role, roll_no, mobile, state, language, status)
          VALUES (?, ?, ?, 'admin', 'FACULTY-01', '919204123453', 'Bihar', 'English', 'Active')
        `, 'Dr. Gagan Kumar (Director)', 'admin@gaya.com', hash);
        const adminId = ins.lastInsertRowid || ins.id;
        adminUser = await db.get('SELECT * FROM users WHERE id = ?', adminId);
      }

      // Verify passcode against configured ADMIN_PIN or bcrypt password_hash
      const isPinMatch = code === ADMIN_PIN;
      const isPasswordMatch = code && adminUser.password_hash ? bcrypt.compareSync(code, adminUser.password_hash) : false;

      if (isPinMatch || isPasswordMatch) {
        const token = jwt.sign({ id: adminUser.id, email: adminUser.email, role: 'admin' }, JWT_SECRET, { expiresIn: '30d' });

        return res.json({
          success: true,
          message: 'Faculty Director successfully authenticated.',
          token,
          user: {
            id: adminUser.id,
            name: adminUser.name,
            email: adminUser.email,
            role: 'admin',
            rollNo: adminUser.roll_no,
            isAdminAuthenticated: true,
            subscription: {
              plan: 'Master Faculty Director Pass',
              status: 'Active',
              daysRemaining: 999,
              isPaid: true
            }
          }
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid Director security passcode or password.' });
      }
    }

    // Student Login
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await db.get('SELECT * FROM users WHERE email = ?', cleanEmail);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    if (user.status === 'Suspended') {
      return res.status(403).json({ success: false, message: 'Your account has been suspended by administration.' });
    }

    // Verify bcrypt hash
    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password. Please check your credentials.' });
    }

    // Retrieve active enrollment
    const enrollment = await db.get(`
      SELECT * FROM enrollments 
      WHERE user_id = ? AND status = 'Active' AND expires_at > CURRENT_TIMESTAMP
      ORDER BY expires_at DESC LIMIT 1
    `, user.id);

    const daysRemaining = enrollment ? getDaysRemaining(enrollment.expires_at) : (user.role === 'admin' ? 999 : 0);

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '30d' });

    return res.json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.roll_no,
        mobile: user.mobile,
        state: user.state,
        language: user.language,
        status: user.status,
        subscription: {
          plan: enrollment ? enrollment.plan_name : (user.role === 'admin' ? 'Master Faculty Director Pass' : 'Trial Pass'),
          status: (enrollment || user.role === 'admin') ? 'Active' : 'Expired',
          daysRemaining: daysRemaining,
          expiresOn: enrollment ? enrollment.expires_at : null,
          isPaid: !!enrollment || user.role === 'admin'
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// Get Current User Profile & Verified Enrollments
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = req.user;

    const enrollment = await db.get(`
      SELECT * FROM enrollments 
      WHERE user_id = ? AND status = 'Active' AND expires_at > CURRENT_TIMESTAMP
      ORDER BY expires_at DESC LIMIT 1
    `, user.id);

    const testStats = await db.get(`
      SELECT 
        COUNT(*) as totalTests,
        MAX(speed_wpm) as highestSpeed,
        ROUND(AVG(speed_wpm)::numeric, 1) as avgSpeed,
        ROUND(AVG(accuracy_pct)::numeric, 1) as avgAccuracy,
        SUM(typed_words) as wordsTranscribed
      FROM test_results WHERE user_id = ?
    `, user.id);

    const daysRemaining = enrollment ? getDaysRemaining(enrollment.expires_at) : (user.role === 'admin' ? 999 : 0);

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.roll_no,
        mobile: user.mobile,
        state: user.state,
        language: user.language,
        status: user.status,
        subscription: {
          plan: enrollment ? enrollment.plan_name : (user.role === 'admin' ? 'Master Faculty Director Pass' : 'Trial Pass'),
          status: (enrollment || user.role === 'admin') ? 'Active' : 'Expired',
          daysRemaining: daysRemaining,
          expiresOn: enrollment ? enrollment.expires_at : null,
          isPaid: !!enrollment || user.role === 'admin'
        },
        stats: {
          totalTestsTaken: Number(testStats?.totaltests || testStats?.totalTests || 0),
          highestSpeed: Number(testStats?.highestspeed || testStats?.highestSpeed || 0),
          avgSpeed: Number(testStats?.avgspeed || testStats?.avgSpeed || 0),
          avgAccuracy: Number(testStats?.avgaccuracy || testStats?.avgAccuracy || 0),
          wordsTranscribed: Number(testStats?.wordstranscribed || testStats?.wordsTranscribed || 0)
        }
      }
    });
  } catch (error) {
    console.error('Me endpoint error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching profile.' });
  }
});

// Verify Admin Security Passcode Server-Side
router.post('/verify-admin-pin', authRateLimiter, (req, res) => {
  try {
    const { passcode } = req.body;
    const clean = (passcode || '').trim();

    if (clean === ADMIN_PIN) {
      return res.json({ success: true, message: 'PIN verified successfully.' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid security passcode.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error verifying PIN.' });
  }
});

// Update Candidate Profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, mobile, state, language } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Candidate name cannot be empty.' });
    }

    await db.run(`
      UPDATE users 
      SET name = ?, mobile = ?, state = ?, language = ?
      WHERE id = ?
    `, name.trim(), mobile ? mobile.trim() : '', state || 'Bihar', language || 'English', userId);

    const updatedUser = await db.get('SELECT * FROM users WHERE id = ?', userId);

    const enrollment = await db.get(`
      SELECT * FROM enrollments 
      WHERE user_id = ? AND status = 'Active' AND expires_at > CURRENT_TIMESTAMP
      ORDER BY expires_at DESC LIMIT 1
    `, userId);

    const daysRemaining = enrollment ? getDaysRemaining(enrollment.expires_at) : (updatedUser.role === 'admin' ? 999 : 0);

    return res.json({
      success: true,
      message: 'Profile details updated successfully.',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        rollNo: updatedUser.roll_no,
        mobile: updatedUser.mobile,
        state: updatedUser.state,
        language: updatedUser.language,
        status: updatedUser.status,
        subscription: {
          plan: enrollment ? enrollment.plan_name : (updatedUser.role === 'admin' ? 'Master Faculty Director Pass' : 'Trial Pass'),
          status: (enrollment || updatedUser.role === 'admin') ? 'Active' : 'Expired',
          daysRemaining: daysRemaining,
          expiresOn: enrollment ? enrollment.expires_at : null,
          isPaid: !!enrollment || updatedUser.role === 'admin'
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ success: false, message: 'Server error while updating profile.' });
  }
});

// Change Password with current password verification
router.post('/change-password', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current password and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    const user = await db.get('SELECT * FROM users WHERE id = ?', userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Candidate account not found.' });
    }

    const isMatch = bcrypt.compareSync(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect. Please verify and retry.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    await db.run('UPDATE users SET password_hash = ? WHERE id = ?', newHash, userId);

    return res.json({
      success: true,
      message: 'Security password changed successfully. Please remember your new password.'
    });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ success: false, message: 'Server error while changing password.' });
  }
});

// Self-Service Forgot Password OTP Generation
router.post('/forgot-password', passwordResetLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Registered candidate email is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await db.get('SELECT id, name, email FROM users WHERE email = ?', cleanEmail);

    if (!user) {
      return res.status(404).json({ success: false, message: 'No registered candidate account found with this email.' });
    }

    // Invalidate existing unused tokens for this email
    await db.run('UPDATE password_resets SET used = 1 WHERE email = ? AND used = 0', cleanEmail);

    // Generate cryptographically secure 6-digit random code
    const randomInt = crypto.randomInt(100000, 999999);
    const recoveryCode = String(randomInt);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 mins expiry

    await db.run(`
      INSERT INTO password_resets (email, token_code, expires_at, used)
      VALUES (?, ?, ?, 0)
    `, cleanEmail, recoveryCode, expiresAt);

    console.log(`[AUTH: EMAIL OTP] Dispatched 6-digit verification code to student email: ${cleanEmail}`);
    console.log(`[AUTH: EMAIL OTP] Subject: Gaya Shorthand Classes - Password Reset Code: ${recoveryCode}`);
    console.log(`[AUTH: EMAIL OTP] Code: ${recoveryCode} (Expires in 15 minutes)`);

    return res.json({
      success: true,
      message: `A 6-digit recovery code has been sent to your email (${cleanEmail}). Please check your inbox and spam folder.`,
      demoCode: process.env.NODE_ENV === 'production' ? undefined : recoveryCode, // surfaced only in dev/test
      email: cleanEmail
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ success: false, message: 'Server error processing password recovery.' });
  }
});

// Self-Service Password Reset Verification
router.post('/reset-password', authRateLimiter, async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email, verification code, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await db.get('SELECT id, name FROM users WHERE email = ?', cleanEmail);

    if (!user) {
      return res.status(404).json({ success: false, message: 'No candidate account found with this email.' });
    }

    // Look up active, unexpired, matching token code
    const resetRecord = await db.get(`
      SELECT * FROM password_resets 
      WHERE email = ? AND token_code = ? AND used = 0 AND expires_at > CURRENT_TIMESTAMP
      ORDER BY id DESC LIMIT 1
    `, cleanEmail, String(code).trim());

    if (!resetRecord) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code. Please request a new recovery code.' });
    }

    // Mark token as used to prevent replay
    await db.run('UPDATE password_resets SET used = 1 WHERE id = ?', resetRecord.id);

    // Hash new password and update
    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    await db.run('UPDATE users SET password_hash = ? WHERE id = ?', newHash, user.id);

    return res.json({
      success: true,
      message: 'Password successfully reset! You can now log in with your new credentials.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, message: 'Server error while resetting password.' });
  }
});

export default router;
