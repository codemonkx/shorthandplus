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
      let outlines = [];
      try {
        if (c.key_outlines) outlines = JSON.parse(c.key_outlines);
      } catch {}

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
        passageSnippet: c.passage_snippet || '',
        keyOutlines: outlines,
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
      passageSnippet,
      keyOutlines,
      roomNo = 'Zoom Room #01 (Studio Live)'
    } = req.body;

    if (!title || !zoomMeetingId || !zoomPasscode) {
      return res.status(400).json({ success: false, message: 'Title, meeting ID, and passcode are required.' });
    }

    const id = `class-live-${Date.now()}`;
    const cleanId = String(zoomMeetingId).replace(/\s+/g, '');
    const cleanPass = String(zoomPasscode).trim();
    const directUrl = zoomDirectUrl || `https://zoom.us/j/${cleanId}?pwd=${cleanPass}`;
    const appUrl = `zoommtg://zoom.us/join?confno=${cleanId}&pwd=${cleanPass}`;
    const webUrl = `https://app.zoom.us/wc/${cleanId}/join`;

    await db.run(`
      INSERT INTO live_classes (
        id, title, shift, time, instructor, instructor_role, speed, course_id,
        is_live, tag, badge_class, zoom_meeting_id, zoom_passcode, zoom_direct_url,
        zoom_app_url, zoom_web_url, description, today_topic, room_no, mode,
        passage_snippet, key_outlines
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      'Zoom Live Call + Shorthand Whiteboard + Typing Lab',
      passageSnippet || '',
      keyOutlines ? JSON.stringify(keyOutlines) : null
    );

    const created = await db.get('SELECT * FROM live_classes WHERE id = ?', id);

    let parsedOutlines = [];
    try {
      if (created.key_outlines) parsedOutlines = JSON.parse(created.key_outlines);
    } catch {}

    return res.status(201).json({
      success: true,
      message: 'Live class batch scheduled and synced with student portals!',
      class: {
        id: created.id,
        title: created.title,
        shift: created.shift,
        time: created.time,
        instructor: created.instructor,
        instructorRole: created.instructor_role,
        speed: created.speed,
        courseId: created.course_id,
        attendees: created.attendees,
        isLive: Boolean(created.is_live),
        tag: created.tag,
        badgeClass: created.badge_class,
        hasAccess: true,
        zoomMeetingId: created.zoom_meeting_id,
        zoomPasscode: created.zoom_passcode,
        zoomDirectUrl: created.zoom_direct_url,
        zoomAppUrl: created.zoom_app_url,
        zoomWebUrl: created.zoom_web_url,
        description: created.description,
        todayTopic: created.today_topic,
        roomNo: created.room_no,
        passageSnippet: created.passage_snippet || '',
        keyOutlines: parsedOutlines,
        mode: created.mode
      }
    });
  } catch (error) {
    console.error('Error scheduling live class:', error);
    return res.status(500).json({ success: false, message: 'Failed to schedule live class.' });
  }
});

// Admin: Update Live Class Details
router.put('/live/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const current = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    if (!current) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    const {
      title = current.title,
      shift = current.shift,
      time = current.time,
      instructor = current.instructor,
      instructorRole = current.instructor_role,
      speed = current.speed,
      zoomMeetingId = current.zoom_meeting_id,
      zoomPasscode = current.zoom_passcode,
      zoomDirectUrl,
      description = current.description,
      todayTopic = current.today_topic,
      passageSnippet = current.passage_snippet,
      roomNo = current.room_no,
      isLive
    } = req.body;

    const cleanId = String(zoomMeetingId).replace(/\s+/g, '');
    const cleanPass = String(zoomPasscode).trim();
    const directUrl = zoomDirectUrl || `https://zoom.us/j/${cleanId}?pwd=${cleanPass}`;
    const appUrl = `zoommtg://zoom.us/join?confno=${cleanId}&pwd=${cleanPass}`;
    const webUrl = `https://app.zoom.us/wc/${cleanId}/join`;
    const nextLive = isLive !== undefined ? (isLive ? 1 : 0) : current.is_live;

    await db.run(`
      UPDATE live_classes SET
        title = ?, shift = ?, time = ?, instructor = ?, instructor_role = ?,
        speed = ?, zoom_meeting_id = ?, zoom_passcode = ?, zoom_direct_url = ?,
        zoom_app_url = ?, zoom_web_url = ?, description = ?, today_topic = ?,
        room_no = ?, passage_snippet = ?, is_live = ?
      WHERE id = ?
    `,
      title, shift, time, instructor, instructorRole,
      speed, zoomMeetingId, zoomPasscode, directUrl,
      appUrl, webUrl, description, todayTopic,
      roomNo, passageSnippet || '', nextLive, id
    );

    const updated = await db.get('SELECT * FROM live_classes WHERE id = ?', id);

    let parsedOutlines = [];
    try {
      if (updated.key_outlines) parsedOutlines = JSON.parse(updated.key_outlines);
    } catch {}

    return res.json({
      success: true,
      message: 'Class details successfully updated and synced with students!',
      class: {
        id: updated.id,
        title: updated.title,
        shift: updated.shift,
        time: updated.time,
        instructor: updated.instructor,
        instructorRole: updated.instructor_role,
        speed: updated.speed,
        courseId: updated.course_id,
        attendees: updated.attendees,
        isLive: Boolean(updated.is_live),
        tag: updated.tag,
        badgeClass: updated.badge_class,
        hasAccess: true,
        zoomMeetingId: updated.zoom_meeting_id,
        zoomPasscode: updated.zoom_passcode,
        zoomDirectUrl: updated.zoom_direct_url,
        zoomAppUrl: updated.zoom_app_url,
        zoomWebUrl: updated.zoom_web_url,
        description: updated.description,
        todayTopic: updated.today_topic,
        roomNo: updated.room_no,
        passageSnippet: updated.passage_snippet || '',
        keyOutlines: parsedOutlines,
        mode: updated.mode
      }
    });
  } catch (error) {
    console.error('Error updating live class:', error);
    return res.status(500).json({ success: false, message: 'Failed to update live class.' });
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
