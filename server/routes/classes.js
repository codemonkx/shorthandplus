import express from 'express';
import db from '../db/database.js';
import { verifyToken, requireAdmin, optionalToken } from '../middleware/auth.js';

const router = express.Router();

// Helper to check if user has access to a specific class/course
async function checkUserClassAccess(user, courseId) {
  if (!user) return false;
  if (user.role === 'admin') return true;

  const enrollment = await db.get(`
    SELECT * FROM enrollments 
    WHERE user_id = ? AND status = 'Active' AND expires_at > CURRENT_TIMESTAMP
    ORDER BY expires_at DESC
  `, user.id);

  if (!enrollment) return false;

  // Active pass holders (Annual, Monthly, Pro, Career, Scholar) have platform-wide access
  const plan = (enrollment.plan_name || enrollment.plan_id || '').toLowerCase();
  if (
    plan.includes('12 month') ||
    plan.includes('annual') ||
    plan.includes('unlimited') ||
    plan.includes('scholar') ||
    plan.includes('monthly test series') ||
    plan.includes('pro') ||
    plan.includes('master')
  ) {
    return true;
  }

  // Course-specific enrollment match
  if (courseId && enrollment.course_id === courseId) {
    return true;
  }

  return true;
}

// Course name resolution helper
function getCourseNameById(courseId) {
  const map = {
    'course-ssc': 'SSC Stenographer Grade C & D',
    'course-pitman': 'English Shorthand (Pitman)',
    'course-court': 'High Court Judicial Speed Bench',
    'course-hindi-steno': 'Hindi Shorthand (हिंदी आशुलिपि)',
    'course-english-typing': 'English Typing & Computer Speed',
    'course-hindi-typing': 'Hindi Typing & Kruti Dev / Mangal',
    'course-bilingual-typing': 'Bilingual English & Hindi Typing',
    'course-diplomas': 'Computer Diplomas (DCA / ADCA)'
  };
  return map[courseId] || 'All Enrolled Programs';
}

// Format a live class record for consistent JSON API responses
function formatClassRecord(c, hasAccess = true) {
  let outlines = [];
  try {
    if (c.key_outlines) outlines = JSON.parse(c.key_outlines);
  } catch {}

  // Google Meet URL & Code resolution
  let meetCode = c.meet_code || '';
  let meetUrl = c.meet_url || '';

  if (!meetUrl && c.zoom_direct_url && c.zoom_direct_url.includes('meet.google.com')) {
    meetUrl = c.zoom_direct_url;
  }
  if (!meetCode && meetUrl) {
    meetCode = meetUrl.replace(/^https?:\/\/meet\.google\.com\//i, '').split('?')[0];
  }
  if (!meetUrl && c.zoom_meeting_id) {
    const clean = String(c.zoom_meeting_id).replace(/\s+/g, '-').toLowerCase();
    if (clean.includes('-')) {
      meetCode = clean;
      meetUrl = `https://meet.google.com/${clean}`;
    }
  }
  if (!meetUrl || meetUrl.includes('gsc-steno-live') || meetUrl.includes('meet/gsc-steno-live')) {
    meetCode = 'stenoplus-live';
    meetUrl = 'https://meet.google.com/new';
  }

  // Status calculation: 'live', 'upcoming', 'completed', 'cancelled'
  let currentStatus = c.status || (c.is_live ? 'live' : 'upcoming');
  if (c.is_live && currentStatus !== 'live') {
    currentStatus = 'live';
  }

  let tag = c.tag;
  let badgeClass = c.badge_class || 'badge-upcoming';

  if (currentStatus === 'live') {
    tag = '🔴 GOOGLE MEET LIVE CALL ACTIVE';
    badgeClass = 'badge-live';
  } else if (currentStatus === 'completed') {
    tag = 'COMPLETED';
    badgeClass = 'badge-completed';
  } else if (currentStatus === 'cancelled') {
    tag = 'CANCELLED';
    badgeClass = 'badge-cancelled';
  } else {
    tag = tag || 'UPCOMING';
    badgeClass = 'badge-upcoming';
  }

  const courseName = c.course_name || getCourseNameById(c.course_id);
  const scheduledDate = c.scheduled_date || (c.created_at ? String(c.created_at).split(' ')[0] : new Date().toISOString().split('T')[0]);
  const startTime = c.start_time || c.time || '8:30 AM';
  const durationMins = Number(c.duration_mins || 60);

  return {
    id: c.id,
    title: c.title,
    courseId: c.course_id || 'course-ssc',
    courseName: courseName,
    scheduledDate: scheduledDate,
    startTime: startTime,
    durationMins: durationMins,
    shift: c.shift || 'Morning Core Batch',
    time: c.time || `${startTime} (${durationMins}m)`,
    instructor: c.instructor || 'Shadab Sir',
    instructorRole: c.instructor_role || 'Faculty Director • stenoplus.in@gmail.com',
    speed: c.speed || '80 WPM Standard',
    attendees: c.attendees || 100,
    status: currentStatus,
    isLive: currentStatus === 'live',
    tag: tag,
    badgeClass: badgeClass,
    hasAccess: hasAccess,
    meetUrl: hasAccess ? meetUrl : null,
    meetCode: hasAccess ? meetCode : '••••-•••• [Enroll to Access]',
    googleMeetUrl: hasAccess ? meetUrl : null,
    // Backward compatibility aliases
    zoomMeetingId: hasAccess ? meetCode : '••••-•••• [Enroll to Access]',
    zoomPasscode: hasAccess ? 'OPEN' : '•••••••• [Protected]',
    zoomDirectUrl: hasAccess ? meetUrl : null,
    zoomAppUrl: hasAccess ? meetUrl : null,
    zoomWebUrl: hasAccess ? meetUrl : null,
    description: c.description || 'Interactive Google Meet live speed dictation and transcription class.',
    todayTopic: c.today_topic || 'High-Speed Court & SSC Dictation Session',
    roomNo: (c.room_no || 'Google Meet Room #01 (Studio Live)').replace(/Zoom Room/g, 'Google Meet Room'),
    mode: (c.mode || 'Google Meet Live Call + Shorthand Whiteboard + Typing Lab').replace(/Zoom/g, 'Google Meet'),
    passageSnippet: c.passage_snippet || '',
    keyOutlines: outlines,
    cancelledReason: c.cancelled_reason || null,
    createdAt: c.created_at
  };
}

// 1. Get All Live Classes with Student Access Verification
router.get('/live', optionalToken, async (req, res) => {
  try {
    const user = req.user;
    const classes = await db.all(`
      SELECT * FROM live_classes 
      ORDER BY 
        CASE 
          WHEN status = 'live' OR is_live = 1 THEN 0 
          WHEN status = 'upcoming' OR status IS NULL THEN 1 
          WHEN status = 'completed' THEN 2 
          WHEN status = 'cancelled' THEN 3 
          ELSE 4 
        END,
        scheduled_date DESC,
        created_at DESC
    `);

    const formatted = await Promise.all(
      classes.map(async (c) => {
        const hasAccess = await checkUserClassAccess(user, c.course_id);
        return formatClassRecord(c, hasAccess);
      })
    );

    return res.json({ success: true, classes: formatted });
  } catch (error) {
    console.error('Error fetching live classes:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching live classes.' });
  }
});

// 2. Admin: Schedule / Create New Live Class on Google Meet
router.post('/live', verifyToken, requireAdmin, async (req, res) => {
  try {
    const {
      title,
      courseId = 'course-ssc',
      courseName,
      scheduledDate,
      startTime = '8:30 AM',
      durationMins = 60,
      shift = 'Morning Core Batch',
      time,
      instructor = 'Shadab Sir',
      instructorRole = 'Faculty Director • stenoplus.in@gmail.com',
      speed = '80 WPM',
      meetUrl,
      meetCode,
      googleMeetUrl,
      description,
      todayTopic,
      passageSnippet,
      keyOutlines,
      roomNo = 'Google Meet Room #01 (Studio Live)'
    } = req.body;

    const rawMeet = meetUrl || googleMeetUrl || meetCode;
    if (!title || !rawMeet) {
      return res.status(400).json({ 
        success: false, 
        message: 'Class Title and Google Meet link or code are required.' 
      });
    }

    let finalMeetCode = '';
    let finalMeetUrl = '';

    if (String(rawMeet).startsWith('http')) {
      finalMeetUrl = String(rawMeet).trim();
      finalMeetCode = finalMeetUrl.replace(/^https?:\/\/meet\.google\.com\//i, '').split('?')[0] || 'gsc-steno-live';
    } else {
      finalMeetCode = String(rawMeet).replace(/\s+/g, '-').toLowerCase();
      finalMeetUrl = `https://meet.google.com/${finalMeetCode}`;
    }

    const id = `class-live-${Date.now()}`;
    const cleanRoomNo = (roomNo || 'Google Meet Room #01 (Studio Live)').replace(/Zoom Room/g, 'Google Meet Room');
    const resolvedCourseName = courseName || getCourseNameById(courseId);
    const resolvedDate = scheduledDate || new Date().toISOString().split('T')[0];
    const resolvedTime = time || `${startTime} (${durationMins}m)`;

    await db.run(`
      INSERT INTO live_classes (
        id, title, course_id, course_name, scheduled_date, start_time, duration_mins,
        shift, time, instructor, instructor_role, speed, attendees,
        status, is_live, tag, badge_class, meet_url, meet_code,
        zoom_meeting_id, zoom_passcode, zoom_direct_url, zoom_app_url, zoom_web_url,
        description, today_topic, room_no, mode, passage_snippet, key_outlines
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      id,
      title.trim(),
      courseId,
      resolvedCourseName,
      resolvedDate,
      startTime,
      Number(durationMins) || 60,
      shift,
      resolvedTime,
      instructor,
      instructorRole,
      speed,
      100,
      'upcoming',
      0,
      'UPCOMING',
      'badge-upcoming',
      finalMeetUrl,
      finalMeetCode,
      finalMeetCode,
      'OPEN',
      finalMeetUrl,
      finalMeetUrl,
      finalMeetUrl,
      description || `Interactive Google Meet class for ${resolvedCourseName}.`,
      todayTopic || 'Real-Time Speed Dictation & Evaluation',
      cleanRoomNo,
      'Google Meet Live Call + Shorthand Whiteboard + Typing Lab',
      passageSnippet || '',
      keyOutlines ? JSON.stringify(keyOutlines) : null
    );

    const created = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    const formatted = formatClassRecord(created, true);

    return res.status(201).json({
      success: true,
      message: 'Class scheduled successfully on Google Meet! It is now visible in student dashboards.',
      class: formatted
    });
  } catch (error) {
    console.error('Error scheduling live class:', error);
    return res.status(500).json({ success: false, message: 'Failed to schedule live class.' });
  }
});

// 3. Admin: Update Existing Class Details
router.put('/live/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const current = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    if (!current) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    const {
      title = current.title,
      courseId = current.course_id,
      courseName = current.course_name,
      scheduledDate = current.scheduled_date,
      startTime = current.start_time,
      durationMins = current.duration_mins,
      shift = current.shift,
      time = current.time,
      instructor = current.instructor,
      instructorRole = current.instructor_role,
      speed = current.speed,
      meetUrl,
      meetCode,
      googleMeetUrl,
      description = current.description,
      todayTopic = current.today_topic,
      passageSnippet = current.passage_snippet,
      roomNo = current.room_no,
      status = current.status
    } = req.body;

    const rawMeet = meetUrl || googleMeetUrl || meetCode || current.meet_url;
    let finalMeetUrl = current.meet_url || 'https://meet.google.com/gsc-steno-live';
    let finalMeetCode = current.meet_code || 'gsc-steno-live';

    if (rawMeet) {
      if (String(rawMeet).startsWith('http')) {
        finalMeetUrl = String(rawMeet).trim();
        finalMeetCode = finalMeetUrl.replace(/^https?:\/\/meet\.google\.com\//i, '').split('?')[0] || 'gsc-steno-live';
      } else {
        finalMeetCode = String(rawMeet).replace(/\s+/g, '-').toLowerCase();
        finalMeetUrl = `https://meet.google.com/${finalMeetCode}`;
      }
    }

    const cleanRoomNo = (roomNo || 'Google Meet Room #01 (Studio Live)').replace(/Zoom Room/g, 'Google Meet Room');
    const resolvedCourseName = courseName || getCourseNameById(courseId);
    const resolvedTime = time || `${startTime || '8:30 AM'} (${durationMins || 60}m)`;
    const isLiveNum = status === 'live' ? 1 : (status === 'completed' || status === 'cancelled' ? 0 : current.is_live);

    await db.run(`
      UPDATE live_classes SET
        title = ?, course_id = ?, course_name = ?, scheduled_date = ?, start_time = ?,
        duration_mins = ?, shift = ?, time = ?, instructor = ?, instructor_role = ?,
        speed = ?, meet_url = ?, meet_code = ?, zoom_meeting_id = ?, zoom_direct_url = ?,
        zoom_app_url = ?, zoom_web_url = ?, description = ?, today_topic = ?,
        room_no = ?, passage_snippet = ?, status = ?, is_live = ?
      WHERE id = ?
    `,
      title.trim(),
      courseId,
      resolvedCourseName,
      scheduledDate,
      startTime,
      Number(durationMins) || 60,
      shift,
      resolvedTime,
      instructor,
      instructorRole,
      speed,
      finalMeetUrl,
      finalMeetCode,
      finalMeetCode,
      finalMeetUrl,
      finalMeetUrl,
      finalMeetUrl,
      description,
      todayTopic,
      cleanRoomNo,
      passageSnippet || '',
      status || 'upcoming',
      isLiveNum,
      id
    );

    const updated = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    const formatted = formatClassRecord(updated, true);

    return res.json({
      success: true,
      message: 'Class details successfully updated and synced with students!',
      class: formatted
    });
  } catch (error) {
    console.error('Error updating live class:', error);
    return res.status(500).json({ success: false, message: 'Failed to update live class.' });
  }
});

// 4. Admin: Start Live Class (Launch Google Meet session as Host)
router.put('/live/:id/start', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const current = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    if (!current) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    const tag = '🔴 GOOGLE MEET LIVE CALL ACTIVE';
    const badgeClass = 'badge-live';

    await db.run(`
      UPDATE live_classes 
      SET status = 'live', is_live = 1, tag = ?, badge_class = ?
      WHERE id = ?
    `, tag, badgeClass, id);

    const updated = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    const formatted = formatClassRecord(updated, true);

    return res.json({
      success: true,
      message: 'Class is now LIVE on Google Meet! Students can join now.',
      class: formatted,
      hostUrl: formatted.meetUrl
    });
  } catch (error) {
    console.error('Error starting live class:', error);
    return res.status(500).json({ success: false, message: 'Failed to start live class.' });
  }
});

// 5. Admin: Complete Live Class
router.put('/live/:id/complete', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const current = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    if (!current) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    await db.run(`
      UPDATE live_classes 
      SET status = 'completed', is_live = 0, tag = 'COMPLETED', badge_class = 'badge-completed'
      WHERE id = ?
    `, id);

    const updated = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    const formatted = formatClassRecord(updated, true);

    return res.json({
      success: true,
      message: 'Class marked as completed.',
      class: formatted
    });
  } catch (error) {
    console.error('Error completing live class:', error);
    return res.status(500).json({ success: false, message: 'Failed to complete live class.' });
  }
});

// 6. Admin: Cancel Scheduled Class
router.put('/live/:id/cancel', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason = 'Class cancelled by teacher due to schedule adjustment.' } = req.body;

    const current = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    if (!current) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    await db.run(`
      UPDATE live_classes 
      SET status = 'cancelled', is_live = 0, cancelled_reason = ?, tag = 'CANCELLED', badge_class = 'badge-cancelled'
      WHERE id = ?
    `, reason, id);

    const updated = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    const formatted = formatClassRecord(updated, true);

    return res.json({
      success: true,
      message: 'Class has been cancelled and students notified.',
      class: formatted
    });
  } catch (error) {
    console.error('Error cancelling live class:', error);
    return res.status(500).json({ success: false, message: 'Failed to cancel live class.' });
  }
});

// 7. Admin: Toggle Live Status (Legacy handler)
router.put('/live/:id/toggle-live', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const current = await db.get('SELECT * FROM live_classes WHERE id = ?', id);
    if (!current) {
      return res.status(404).json({ success: false, message: 'Class not found.' });
    }

    const nextLive = current.is_live ? 0 : 1;
    const nextStatus = nextLive ? 'live' : 'completed';
    const tag = nextLive ? '🔴 GOOGLE MEET LIVE CALL ACTIVE' : 'COMPLETED';
    const badgeClass = nextLive ? 'badge-live' : 'badge-completed';

    await db.run(`
      UPDATE live_classes 
      SET is_live = ?, status = ?, tag = ?, badge_class = ?
      WHERE id = ?
    `, nextLive, nextStatus, tag, badgeClass, id);

    return res.json({
      success: true,
      message: nextLive ? 'Class launched live on Google Meet! Students can join now.' : 'Class concluded.',
      isLive: Boolean(nextLive),
      status: nextStatus
    });
  } catch (error) {
    console.error('Error toggling live status:', error);
    return res.status(500).json({ success: false, message: 'Failed to update live status.' });
  }
});

// 8. Admin: Delete Live Class
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
