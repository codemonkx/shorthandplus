import express from 'express';
import db from '../db/database.js';
import { verifyToken, requireAdmin, optionalToken } from '../middleware/auth.js';

const router = express.Router();

// Helper to check if user has access to live classes
async function checkUserClassAccess(user) {
  if (!user) return false;
  if (user.role === 'admin') return true;

  const enrollment = await db.get(`
    SELECT id FROM enrollments 
    WHERE user_id = ? AND status = 'Active' AND expires_at > CURRENT_TIMESTAMP
    LIMIT 1
  `, user.id);

  return Boolean(enrollment);
}

// Get Live Classes with Batch Access Control
router.get('/live', optionalToken, async (req, res) => {
  try {
    const user = req.user;
    const classes = await db.all('SELECT * FROM live_classes ORDER BY is_live DESC, created_at DESC');
    const hasAccess = await checkUserClassAccess(user);

    const formatted = classes.map(c => {
      return {
        id: c.id,
        title: c.title,
        shift: c.shift,
        time: c.time,
        instructor: c.instructor,
        instructorRole: c.instructor_role,
        speed: c.speed,
        courseId: c.course_id,
        attendees: c.attendees,
        isLive: Boolean(c.is_live),
        tag: c.is_live ? '🔴 ZOOM LIVE CALL ACTIVE' : c.tag,
        badgeClass: c.is_live ? 'badge-live' : c.badge_class,
        hasAccess: hasAccess,
        // Access-gate Zoom meeting ID and Passcode
        zoomMeetingId: hasAccess ? c.zoom_meeting_id : '•••• •••• •••• [Enrolled Students Only]',
        zoomPasscode: hasAccess ? c.zoom_passcode : '•••••••• [Protected]',
        zoomDirectUrl: hasAccess ? c.zoom_direct_url : null,
        zoomAppUrl: hasAccess ? c.zoom_app_url : null,
        zoomWebUrl: hasAccess ? c.zoom_web_url : null,
        description: c.description,
        todayTopic: c.today_topic,
        roomNo: c.room_no,
        mode: c.mode
      };
    });

    return res.json({ success: true, classes: formatted });
  } catch (error) {
    console.error('Error fetching live classes:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching live classes.' });
  }
});

// Admin: Schedule Live Class
router.post('/live', verifyToken, requireAdmin, async (req, res) => {
  try {
    const {
      title,
      shift = 'Morning Core Batch',
      time,
      instructor = 'Shadab Sir',
      instructorRole = 'Faculty Director • 12 Years Experience',
      speed = '80 WPM',
      courseId = 'course-ssc',
      isLive = false,
      zoomMeetingId,
      zoomPasscode,
      zoomDirectUrl,
      description,
      todayTopic,
      roomNo = 'Zoom Room #01 (Studio Live)'
    } = req.body;

    if (!title || !zoomMeetingId || !zoomPasscode) {
      return res.status(400).json({ success: false, message: 'Title, meeting ID, and passcode are required.' });
    }

    const id = `class-live-${Date.now()}`;
    const cleanId = zoomMeetingId.replace(/\s+/g, '');
    const cleanPass = zoomPasscode.trim();
    const directUrl = zoomDirectUrl || `https://zoom.us/j/${cleanId}?pwd=${cleanPass}`;
    const appUrl = `zoommtg://zoom.us/join?confno=${cleanId}&pwd=${cleanPass}`;
    const webUrl = `https://app.zoom.us/wc/${cleanId}/join`;

    await db.run(`
      INSERT INTO live_classes (
        id, title, shift, time, instructor, instructor_role, speed, course_id,
        is_live, tag, badge_class, zoom_meeting_id, zoom_passcode, zoom_direct_url,
        zoom_app_url, zoom_web_url, description, today_topic, room_no, mode
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      id,
      title.trim(),
      shift,
      time || '8:30 AM – 10:30 AM',
      instructor,
      instructorRole,
      speed,
      courseId,
      isLive ? 1 : 0,
      isLive ? '🔴 ZOOM LIVE CALL ACTIVE' : 'STARTS SOON ON ZOOM',
      isLive ? 'badge-live' : 'badge-upcoming',
      zoomMeetingId,
      zoomPasscode,
      directUrl,
      appUrl,
      webUrl,
      description || 'Interactive Zoom live dictation and transcription class.',
      todayTopic || 'High-Speed Court & SSC Dictation Session',
      roomNo,
      'Zoom Live Call + Shorthand Whiteboard + Typing Lab'
    );

    const created = await db.get('SELECT * FROM live_classes WHERE id = ?', id);

    return res.status(201).json({
      success: true,
      message: 'Live class batch scheduled and synced with student portals!',
      class: {
        ...created,
        hasAccess: true,
        isLive: Boolean(created.is_live)
      }
    });
  } catch (error) {
    console.error('Error scheduling live class:', error);
    return res.status(500).json({ success: false, message: 'Failed to schedule live class.' });
  }
});

// Admin: Toggle Live On-Air Broadcast Status
router.put('/live/:id/toggle-live', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const current = await db.get('SELECT is_live FROM live_classes WHERE id = ?', id);

    if (!current) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    const nextLive = current.is_live ? 0 : 1;
    const tag = nextLive ? '🔴 ZOOM LIVE CALL ACTIVE' : "TODAY'S REPLAY & ZOOM ARCHIVE";
    const badgeClass = nextLive ? 'badge-live' : 'badge-replay';

    await db.run('UPDATE live_classes SET is_live = ?, tag = ?, badge_class = ? WHERE id = ?',
      nextLive, tag, badgeClass, id
    );

    return res.json({
      success: true,
      message: nextLive ? 'Broadcast launched live on air! Students can join now.' : 'Live broadcast concluded and archived.',
      isLive: Boolean(nextLive)
    });
  } catch (error) {
    console.error('Error toggling live status:', error);
    return res.status(500).json({ success: false, message: 'Failed to update live status.' });
  }
});

// Admin: Delete Live Class
router.delete('/live/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const del = await db.run('DELETE FROM live_classes WHERE id = ?', req.params.id);
    if (del.changes === 0 && del.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }
    return res.json({ success: true, message: 'Live class session removed.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete class.' });
  }
});

export default router;
