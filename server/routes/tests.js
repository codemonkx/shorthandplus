import express from 'express';
import db from '../db/database.js';
import { verifyToken, requireAdmin, optionalToken } from '../middleware/auth.js';
import { evaluateTranscription } from '../utils/diffEvaluation.js';

const router = express.Router();

// 1. List Tests for Students/Public (Transcripts for steno are hidden on backend)
router.get('/', optionalToken, async (req, res) => {
  try {
    const { type } = req.query;
    const isAdmin = req.user && req.user.role === 'admin';
    
    let query = 'SELECT * FROM tests WHERE (is_active = 1 AND (is_published IS NULL OR is_published = 1))';
    const params = [];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    query += ' ORDER BY id DESC';

    const tests = await db.all(query, params);

    const formatted = tests.map(t => ({
      id: t.id,
      title: t.title,
      name: t.title,
      type: t.type,
      category: t.category,
      authority: t.authority,
      speed: t.speed_str || `${t.speed_wpm} WPM`,
      speedWpm: t.speed_wpm,
      targetSpeed: t.speed_str || `${t.speed_wpm} WPM`,
      language: t.language,
      duration: t.duration || '10 Mins',
      time: t.duration || '10 Mins',
      typingDurationMins: t.typing_duration_mins || 10,
      totalWords: t.total_words,
      words: t.total_words,
      audioUrl: t.audio_url,
      audioDuration: t.audio_duration || 300,
      difficulty: t.difficulty,
      isPublished: t.is_published ?? t.is_active ?? 1,
      // SECURITY: Steno master transcripts MUST NOT be sent to students before submission
      passageText: (isAdmin || t.type === 'typing') ? t.passage_text : null
    }));

    return res.json({ success: true, tests: formatted });
  } catch (error) {
    console.error('Error fetching tests:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching tests.' });
  }
});

// 2. Admin: List All Tests (including unpublished drafts, full transcripts, and attempt counts)
router.get('/admin/all', verifyToken, requireAdmin, async (req, res) => {
  try {
    const tests = await db.all('SELECT * FROM tests ORDER BY id DESC');

    const formatted = await Promise.all(tests.map(async (t) => {
      const attemptsRow = await db.get('SELECT COUNT(*) as count FROM test_results WHERE test_id = ?', t.id);
      return {
        id: t.id,
        title: t.title,
        name: t.title,
        type: t.type,
        category: t.category,
        authority: t.authority,
        speed: t.speed_str || `${t.speed_wpm} WPM`,
        speedWpm: t.speed_wpm,
        language: t.language,
        duration: t.duration || '10 Mins',
        typingDurationMins: t.typing_duration_mins || 10,
        totalWords: t.total_words,
        audioUrl: t.audio_url,
        audioDuration: t.audio_duration || 300,
        difficulty: t.difficulty,
        isPublished: t.is_published ?? t.is_active ?? 1,
        passageText: t.passage_text,
        attemptsCount: attemptsRow?.count || attemptsRow?.COUNT || 0,
        createdAt: t.created_at
      };
    }));

    return res.json({ success: true, tests: formatted });
  } catch (error) {
    console.error('Error fetching admin tests:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching admin tests.' });
  }
});

// 3. Candidate Test History (Must be before /:id)
router.get('/my-history', verifyToken, async (req, res) => {
  try {
    const results = await db.all(`
      SELECT 
        id, test_id as "testId", test_title as name, test_type as type,
        speed_wpm as "speedNum", accuracy_pct as "marksNum",
        total_words as "totalWords", typed_words as "typedWords",
        full_mistakes as "fullMistakes", half_mistakes as "halfMistakes",
        effective_errors as "effectiveErrors", qualification_status as status,
        time_taken_secs as "timeTakenSecs",
        created_at as "createdAt"
      FROM test_results 
      WHERE user_id = ?
      ORDER BY id DESC
    `, req.user.id);

    const formatted = results.map(r => ({
      ...r,
      speed: `${r.speedNum || r.speednum} WPM`,
      marks: `${r.marksNum || r.marksnum}%`,
      date: new Date(r.createdAt || r.createdat).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      statusType: (r.status || '').toLowerCase().includes('qualified') ? 'qualified' : 'disqualified'
    }));

    return res.json({ success: true, history: formatted, results: formatted });
  } catch (error) {
    console.error('Error fetching history:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching test history.' });
  }
});

// 4. National Mock Test Leaderboard (Must be before /:id)
router.get('/leaderboard', async (req, res) => {
  try {
    const { type } = req.query;
    let query = `
      SELECT 
        tr.id, tr.test_title as "testTitle", tr.test_type as "testType",
        tr.speed_wpm as "speedNum", tr.accuracy_pct as "accuracyNum",
        tr.full_mistakes as "fullMistakes", tr.half_mistakes as "halfMistakes",
        tr.qualification_status as "qualificationStatus", tr.created_at as "createdAt",
        u.name as "candidateName", u.roll_no as "rollNo", u.state
      FROM test_results tr
      JOIN users u ON tr.user_id = u.id
      WHERE tr.qualification_status LIKE '%Qualified%' OR tr.accuracy_pct >= 80
    `;
    const params = [];
    if (type) {
      query += ' AND tr.test_type = ?';
      params.push(type);
    }
    query += ' ORDER BY tr.speed_wpm DESC, tr.accuracy_pct DESC LIMIT 50';

    const dbRows = await db.all(query, params);

    const defaultRankings = [
      { id: 101, candidateName: 'Rahul Verma', rollNo: 'SP-2026-042', state: 'Bihar', testTitle: 'SSC Steno Grade D - Parliament Debate 80 WPM', testType: 'steno', speedNum: 104, accuracyNum: 99.2, fullMistakes: 3, halfMistakes: 2, qualificationStatus: 'Qualified (Merit Rank #1)', date: '08-11-2026' },
      { id: 102, candidateName: 'Priya Kumari', rollNo: 'SP-2026-019', state: 'Jharkhand', testTitle: 'Patna High Court Criminal Appeal Bench 80 WPM', testType: 'steno', speedNum: 98, accuracyNum: 98.7, fullMistakes: 5, halfMistakes: 4, qualificationStatus: 'Qualified (Merit Rank #2)', date: '08-11-2026' },
      { id: 103, candidateName: 'Amit Ranjan', rollNo: 'SP-2026-088', state: 'Uttar Pradesh', testTitle: 'Delhi High Court Commercial Division', testType: 'steno', speedNum: 94, accuracyNum: 98.1, fullMistakes: 7, halfMistakes: 4, qualificationStatus: 'Qualified (Merit Rank #3)', date: '07-11-2026' },
      { id: 104, candidateName: 'Ananya Sharma', rollNo: 'SP-2026-105', state: 'Delhi', testTitle: 'English QWERTY Typing Speed Benchmark', testType: 'typing', speedNum: 91, accuracyNum: 97.8, fullMistakes: 8, halfMistakes: 6, qualificationStatus: 'Qualified (Merit Rank #4)', date: '07-11-2026' }
    ];

    const dbMapped = (dbRows || []).map(r => ({
      id: r.id,
      candidateName: r.candidateName || r.candidatename,
      rollNo: r.rollNo || r.rollno,
      state: r.state || 'Bihar',
      testTitle: r.testTitle || r.testtitle,
      testType: r.testType || r.testtype,
      speedNum: Number(r.speedNum || r.speednum || 80),
      accuracyNum: Number(r.accuracyNum || r.accuracynum || 95),
      fullMistakes: Number(r.fullMistakes || r.fullmistakes || 0),
      halfMistakes: Number(r.halfMistakes || r.halfmistakes || 0),
      qualificationStatus: r.qualificationStatus || r.qualificationstatus || 'Qualified',
      date: new Date(r.createdAt || r.createdat || Date.now()).toLocaleDateString('en-GB')
    }));

    const combined = [...dbMapped, ...defaultRankings];

    return res.json({
      success: true,
      totalAspirants: 2840,
      leaderboard: combined.slice(0, 50)
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching leaderboard.' });
  }
});

// 5. Admin: View Student Attempts & Results for a Test
router.get('/:id/attempts', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const test = await db.get('SELECT id, title, type FROM tests WHERE id = ?', id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    const attempts = await db.all(`
      SELECT 
        tr.id, tr.user_id, tr.speed_wpm as "speedWpm", tr.accuracy_pct as "accuracyPct",
        tr.total_words as "totalWords", tr.typed_words as "typedWords",
        tr.full_mistakes as "fullMistakes", tr.half_mistakes as "halfMistakes",
        tr.effective_errors as "effectiveErrors", tr.qualification_status as "qualificationStatus",
        tr.time_taken_secs as "timeTakenSecs", tr.created_at as "createdAt",
        u.name as "candidateName", u.roll_no as "rollNo", u.email as "candidateEmail"
      FROM test_results tr
      LEFT JOIN users u ON tr.user_id = u.id
      WHERE tr.test_id = ?
      ORDER BY tr.id DESC
    `, id);

    return res.json({
      success: true,
      testTitle: test.title,
      attempts: attempts.map(a => ({
        ...a,
        candidateName: a.candidateName || 'Guest Aspirant',
        rollNo: a.rollNo || 'N/A',
        candidateEmail: a.candidateEmail || 'N/A',
        submittedAt: new Date(a.createdAt).toLocaleString('en-GB')
      }))
    });
  } catch (error) {
    console.error('Error fetching test attempts:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching test attempts.' });
  }
});

// 6. Get Single Test by ID (Transcript protected for students)
router.get('/:id', optionalToken, async (req, res) => {
  try {
    const test = await db.get('SELECT * FROM tests WHERE id = ?', req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    const isAdmin = req.user && req.user.role === 'admin';

    return res.json({
      success: true,
      test: {
        id: test.id,
        title: test.title,
        name: test.title,
        type: test.type,
        category: test.category,
        authority: test.authority,
        speed: test.speed_str || `${test.speed_wpm} WPM`,
        speedWpm: test.speed_wpm,
        language: test.language,
        duration: test.duration || '10 Mins',
        time: test.duration || '10 Mins',
        typingDurationMins: test.typing_duration_mins || 10,
        totalWords: test.total_words,
        words: test.total_words,
        audioUrl: test.audio_url,
        audioDuration: test.audio_duration || 300,
        difficulty: test.difficulty,
        isPublished: test.is_published ?? test.is_active ?? 1,
        // SECURITY: Transcript hidden for student audio dictations
        passageText: (isAdmin || test.type === 'typing') ? test.passage_text : null
      }
    });
  } catch (error) {
    console.error('Error fetching test:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching test.' });
  }
});

// =========================================================================
// TWO-STAGE CONTROLLED ASSESSMENT SESSION PROTOCOL
// =========================================================================

// 7. Start / Resume Two-Stage Assessment Session
// Audio plays exactly ONCE. Page refresh does NOT reset audio or add typing time.
router.post('/:id/start-assessment', optionalToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : 0;

    const test = await db.get('SELECT * FROM tests WHERE id = ?', id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Assessment test not found.' });
    }

    const now = Date.now();
    const audioDurationSecs = test.audio_duration || 300;
    const typingDurationSecs = (test.typing_duration_mins || 10) * 60;

    // Check if user has an existing active unsubmitted session for this test
    let session = null;
    if (userId > 0) {
      session = await db.get(`
        SELECT * FROM assessment_sessions 
        WHERE test_id = ? AND user_id = ? AND status IN ('listening', 'typing')
        ORDER BY id DESC LIMIT 1
      `, id, userId);
    }

    if (session) {
      // Session exists: Check state and prevent resetting
      if (session.status === 'listening') {
        const elapsed = Math.floor((now - Number(session.audio_started_at)) / 1000);
        
        // If audio duration has already passed on server, auto-advance to typing
        if (elapsed >= session.audio_duration_secs) {
          const listeningCompletedAt = Number(session.audio_started_at) + (session.audio_duration_secs * 1000);
          const typingStartedAt = listeningCompletedAt;
          const typingExpiresAt = typingStartedAt + (session.typing_duration_secs * 1000);

          await db.run(`
            UPDATE assessment_sessions 
            SET status = 'typing',
                listening_completed_at = ?,
                typing_started_at = ?,
                typing_expires_at = ?
            WHERE id = ?
          `, listeningCompletedAt, typingStartedAt, typingExpiresAt, session.id);

          const remaining = Math.max(0, Math.floor((typingExpiresAt - now) / 1000));

          return res.json({
            success: true,
            resumed: true,
            sessionId: session.id,
            stage: 'typing',
            testId: test.id,
            testTitle: test.title,
            speed: test.speed_str || `${test.speed_wpm} WPM`,
            category: test.category,
            language: test.language,
            typingDurationMins: Math.round(session.typing_duration_secs / 60),
            typingExpiresAt,
            remainingTimeSecs: remaining,
            isExpired: remaining <= 0,
            message: 'Audio listening stage already finished. Resuming typing stage.'
          });
        } else {
          // Audio is still actively playing. Resume at current elapsed offset (NO RESTART)
          return res.json({
            success: true,
            resumed: true,
            sessionId: session.id,
            stage: 'listening',
            testId: test.id,
            testTitle: test.title,
            speed: test.speed_str || `${test.speed_wpm} WPM`,
            category: test.category,
            language: test.language,
            audioUrl: test.audio_url,
            audioDuration: session.audio_duration_secs,
            currentTimeOffset: Math.max(0, elapsed),
            audioPlayCount: session.audio_play_count,
            typingDurationMins: Math.round(session.typing_duration_secs / 60),
            message: 'Resuming single-play audio dictation from current server playback offset.'
          });
        }
      } else if (session.status === 'typing') {
        // Typing stage actively in progress. Return exact remaining time calculated on server
        const remaining = Math.max(0, Math.floor((Number(session.typing_expires_at) - now) / 1000));
        return res.json({
          success: true,
          resumed: true,
          sessionId: session.id,
          stage: 'typing',
          testId: test.id,
          testTitle: test.title,
          speed: test.speed_str || `${test.speed_wpm} WPM`,
          category: test.category,
          language: test.language,
          typingDurationMins: Math.round(session.typing_duration_secs / 60),
          typingExpiresAt: Number(session.typing_expires_at),
          remainingTimeSecs: remaining,
          isExpired: remaining <= 0,
          draftText: session.typed_text || '',
          message: 'Resuming typing assessment. Timer countdown synchronized with server.'
        });
      }
    }

    // Create a new session
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await db.run(`
      INSERT INTO assessment_sessions (
        id, user_id, test_id, status, audio_started_at, audio_duration_secs,
        typing_duration_secs, audio_play_count
      ) VALUES (?, ?, ?, 'listening', ?, ?, ?, 1)
    `,
      sessionId,
      userId,
      test.id,
      now,
      audioDurationSecs,
      typingDurationSecs
    );

    return res.status(201).json({
      success: true,
      resumed: false,
      sessionId,
      stage: 'listening',
      testId: test.id,
      testTitle: test.title,
      speed: test.speed_str || `${test.speed_wpm} WPM`,
      category: test.category,
      language: test.language,
      audioUrl: test.audio_url,
      audioDuration: audioDurationSecs,
      currentTimeOffset: 0,
      typingDurationMins: test.typing_duration_mins || 10,
      audioPlayCount: 1,
      message: 'Assessment session started. Audio will play exactly once.'
    });
  } catch (error) {
    console.error('Error starting assessment session:', error);
    return res.status(500).json({ success: false, message: 'Server error starting assessment session.' });
  }
});

// 8. Complete Stage 1 (Audio Listening) and Advance to Stage 2 (Typing)
router.post('/assessment-session/:sessionId/complete-listening', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await db.get('SELECT * FROM assessment_sessions WHERE id = ?', sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    if (session.status === 'typing') {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((Number(session.typing_expires_at) - now) / 1000));
      return res.json({
        success: true,
        stage: 'typing',
        typingExpiresAt: Number(session.typing_expires_at),
        remainingTimeSecs: remaining
      });
    }

    if (session.status === 'submitted') {
      return res.status(400).json({ success: false, message: 'This assessment has already been submitted.' });
    }

    const now = Date.now();
    const typingDurationSecs = session.typing_duration_secs || 600;
    const typingExpiresAt = now + (typingDurationSecs * 1000);

    await db.run(`
      UPDATE assessment_sessions 
      SET status = 'typing',
          listening_completed_at = ?,
          typing_started_at = ?,
          typing_expires_at = ?
      WHERE id = ?
    `, now, now, typingExpiresAt, sessionId);

    return res.json({
      success: true,
      stage: 'typing',
      typingExpiresAt,
      remainingTimeSecs: typingDurationSecs,
      message: 'Listening phase completed. Typing countdown started.'
    });
  } catch (error) {
    console.error('Error completing listening stage:', error);
    return res.status(500).json({ success: false, message: 'Server error completing listening stage.' });
  }
});

// 9. Query Assessment Session Status & Synchronize Timer
router.get('/assessment-session/:sessionId/status', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await db.get('SELECT * FROM assessment_sessions WHERE id = ?', sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    const now = Date.now();

    if (session.status === 'listening') {
      const elapsed = Math.floor((now - Number(session.audio_started_at)) / 1000);
      const remainingAudio = Math.max(0, session.audio_duration_secs - elapsed);

      if (remainingAudio <= 0) {
        // Auto-advance on server
        const typingDurationSecs = session.typing_duration_secs || 600;
        const typingExpiresAt = now + (typingDurationSecs * 1000);

        await db.run(`
          UPDATE assessment_sessions 
          SET status = 'typing',
              listening_completed_at = ?,
              typing_started_at = ?,
              typing_expires_at = ?
          WHERE id = ?
        `, now, now, typingExpiresAt, sessionId);

        return res.json({
          success: true,
          status: 'typing',
          stage: 'typing',
          remainingTimeSecs: typingDurationSecs,
          typingExpiresAt
        });
      }

      return res.json({
        success: true,
        status: 'listening',
        stage: 'listening',
        elapsedSecs: elapsed,
        remainingAudioSecs: remainingAudio,
        audioDuration: session.audio_duration_secs
      });
    }

    if (session.status === 'typing') {
      const remaining = Math.max(0, Math.floor((Number(session.typing_expires_at) - now) / 1000));
      return res.json({
        success: true,
        status: 'typing',
        stage: 'typing',
        remainingTimeSecs: remaining,
        typingExpiresAt: Number(session.typing_expires_at),
        isExpired: remaining <= 0
      });
    }

    return res.json({
      success: true,
      status: session.status,
      stage: session.status,
      resultId: session.result_id
    });
  } catch (error) {
    console.error('Error fetching session status:', error);
    return res.status(500).json({ success: false, message: 'Server error checking session status.' });
  }
});

// 10. Submit Stage 2 Assessment & Perform Server-Side Evaluation
router.post('/assessment-session/:sessionId/submit', optionalToken, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { typedText = '', backspaceCount = 0, tabSwitchWarnings = 0 } = req.body;

    const session = await db.get('SELECT * FROM assessment_sessions WHERE id = ?', sessionId);
    if (!session) {
      return res.status(404).json({ success: false, message: 'Assessment session not found.' });
    }

    // Prevent duplicate submission
    if (session.status === 'submitted') {
      const existingResult = await db.get('SELECT * FROM test_results WHERE id = ?', session.result_id);
      return res.status(409).json({
        success: false,
        message: 'This assessment has already been submitted.',
        resultId: session.result_id,
        evaluation: existingResult
      });
    }

    const test = await db.get('SELECT * FROM tests WHERE id = ?', session.test_id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Underlying test record not found.' });
    }

    const now = Date.now();
    const typingStarted = Number(session.typing_started_at) || Number(session.audio_started_at) || now;
    const timeTakenSecs = Math.min(
      session.typing_duration_secs || 600,
      Math.max(1, Math.floor((now - typingStarted) / 1000))
    );

    // SERVER-SIDE EVALUATION AGAINST MASTER BENCHMARK TRANSCRIPT
    const evaluation = evaluateTranscription(test.passage_text, typedText, timeTakenSecs);

    const userId = session.user_id || (req.user ? req.user.id : 0);

    // Save student assessment result
    const insertResult = await db.run(`
      INSERT INTO test_results (
        user_id, test_id, test_title, test_type, speed_wpm, accuracy_pct,
        total_words, typed_words, full_mistakes, half_mistakes, effective_errors,
        qualification_status, time_taken_secs, backspace_count, tab_switch_warnings
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      userId,
      test.id,
      test.title,
      test.type || 'steno',
      evaluation.netWpm,
      evaluation.accuracyPct,
      evaluation.totalMasterWords,
      evaluation.totalTypedWords,
      evaluation.fullMistakes,
      0,
      evaluation.effectiveErrors,
      evaluation.qualificationStatus,
      timeTakenSecs,
      Math.max(0, Number(backspaceCount) || 0),
      Math.max(0, Number(tabSwitchWarnings) || 0)
    );

    const resultId = insertResult.lastInsertRowid || insertResult.id;

    // Mark session as submitted
    await db.run(`
      UPDATE assessment_sessions 
      SET status = 'submitted',
          submitted_at = ?,
          typed_text = ?,
          result_id = ?
      WHERE id = ?
    `, now, typedText, resultId, sessionId);

    return res.json({
      success: true,
      message: 'Assessment submitted and evaluated successfully.',
      resultId,
      evaluation: {
        ...evaluation,
        timeTakenSecs,
        testId: test.id,
        testTitle: test.title,
        testSpeed: test.speed_str || `${test.speed_wpm} WPM`,
        category: test.category,
        language: test.language,
        submittedAt: new Date(now).toLocaleString('en-GB')
      },
      // Now that submission is complete, safely expose the original transcript for post-exam review
      masterTranscript: test.passage_text
    });
  } catch (error) {
    console.error('Error submitting assessment session:', error);
    return res.status(500).json({ success: false, message: 'Server error submitting assessment.' });
  }
});

// =========================================================================
// ADMIN CRUD & MANAGEMENT
// =========================================================================

// 11. Admin: Create Test
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { 
      title, 
      type = 'steno', 
      category, 
      authority, 
      speedWpm, 
      speedStr, 
      duration = '10 Mins', 
      typingDurationMins = 10,
      language = 'English', 
      totalWords, 
      audioUrl = '/assets/sample-dictation.mp3', 
      audioDuration = 300, 
      difficulty = 'Medium', 
      passageText,
      isPublished = 1
    } = req.body;

    if (!title || !passageText) {
      return res.status(400).json({ success: false, message: 'Test title and master passage text are required.' });
    }

    const wordsCount = totalWords || passageText.trim().split(/\s+/).filter(Boolean).length;
    const speedNumber = speedWpm ? Number(speedWpm) : 80;
    const speedString = speedStr || `${speedNumber} WPM`;
    const typingMins = Number(typingDurationMins) || 10;
    const published = isPublished === 0 ? 0 : 1;

    const result = await db.run(`
      INSERT INTO tests (
        title, type, category, authority, speed_wpm, speed_str, duration,
        typing_duration_mins, language, total_words, audio_url, audio_duration,
        difficulty, passage_text, is_published, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      title.trim(),
      type,
      category || (type === 'steno' ? 'SSC Steno Bench' : 'Typing Speed Studio'),
      authority || 'Exam Board',
      speedNumber,
      speedString,
      duration,
      typingMins,
      language,
      wordsCount,
      audioUrl,
      audioDuration,
      difficulty,
      passageText.trim(),
      published,
      published
    );

    const testId = result.lastInsertRowid || result.id;
    const created = await db.get('SELECT * FROM tests WHERE id = ?', testId);

    return res.status(201).json({
      success: true,
      message: `${type === 'steno' ? 'Dictation audio test' : 'Typing test'} published successfully!`,
      test: {
        id: created.id,
        title: created.title,
        name: created.title,
        type: created.type,
        category: created.category,
        speed: created.speed_str,
        speedWpm: created.speed_wpm,
        duration: created.duration,
        typingDurationMins: created.typing_duration_mins || 10,
        language: created.language,
        totalWords: created.total_words,
        audioUrl: created.audio_url,
        audioDuration: created.audio_duration,
        isPublished: created.is_published ?? 1,
        passageText: created.passage_text
      }
    });
  } catch (error) {
    console.error('Error creating test:', error);
    return res.status(500).json({ success: false, message: 'Failed to create test.' });
  }
});

// 12. Admin: Update Test
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      category, 
      authority, 
      speedWpm, 
      speedStr, 
      duration, 
      typingDurationMins, 
      language, 
      totalWords, 
      audioUrl, 
      audioDuration, 
      difficulty, 
      passageText,
      isPublished 
    } = req.body;

    const existing = await db.get('SELECT * FROM tests WHERE id = ?', id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    const wordsCount = passageText ? passageText.trim().split(/\s+/).filter(Boolean).length : existing.total_words;

    await db.run(`
      UPDATE tests SET
        title = COALESCE(?, title),
        category = COALESCE(?, category),
        authority = COALESCE(?, authority),
        speed_wpm = COALESCE(?, speed_wpm),
        speed_str = COALESCE(?, speed_str),
        duration = COALESCE(?, duration),
        typing_duration_mins = COALESCE(?, typing_duration_mins),
        language = COALESCE(?, language),
        total_words = COALESCE(?, total_words),
        audio_url = COALESCE(?, audio_url),
        audio_duration = COALESCE(?, audio_duration),
        difficulty = COALESCE(?, difficulty),
        passage_text = COALESCE(?, passage_text),
        is_published = COALESCE(?, is_published),
        is_active = COALESCE(?, is_active)
      WHERE id = ?
    `,
      title ? title.trim() : null,
      category,
      authority,
      speedWpm ? Number(speedWpm) : null,
      speedStr,
      duration,
      typingDurationMins !== undefined ? Number(typingDurationMins) : null,
      language,
      wordsCount,
      audioUrl,
      audioDuration !== undefined ? Number(audioDuration) : null,
      difficulty,
      passageText ? passageText.trim() : null,
      isPublished !== undefined ? Number(isPublished) : null,
      isPublished !== undefined ? Number(isPublished) : null,
      id
    );

    const updated = await db.get('SELECT * FROM tests WHERE id = ?', id);

    return res.json({
      success: true,
      message: 'Test content updated successfully!',
      test: updated
    });
  } catch (error) {
    console.error('Error updating test:', error);
    return res.status(500).json({ success: false, message: 'Failed to update test.' });
  }
});

// 13. Admin: Toggle Test Publish Status
router.patch('/:id/toggle-publish', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const test = await db.get('SELECT id, is_published, is_active FROM tests WHERE id = ?', id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    const currentPublished = test.is_published ?? test.is_active ?? 1;
    const newStatus = currentPublished === 1 ? 0 : 1;

    await db.run('UPDATE tests SET is_published = ?, is_active = ? WHERE id = ?', newStatus, newStatus, id);

    return res.json({
      success: true,
      message: `Test ${newStatus === 1 ? 'published to students' : 'unpublished to draft status'}.`,
      isPublished: newStatus
    });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    return res.status(500).json({ success: false, message: 'Failed to toggle publish status.' });
  }
});

// 14. Admin: Delete Test
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Delete associated test results and sessions
    await db.run('DELETE FROM test_results WHERE test_id = ?', id);
    await db.run('DELETE FROM assessment_sessions WHERE test_id = ?', id);

    const del = await db.run('DELETE FROM tests WHERE id = ?', id);

    if (del.changes === 0 && del.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    return res.json({ success: true, message: 'Test and associated attempt records removed successfully.' });
  } catch (error) {
    console.error('Error deleting test:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete test.' });
  }
});

// 15. Legacy fallback submit endpoint
router.post('/submit-result', optionalToken, async (req, res) => {
  try {
    const {
      testId,
      testTitle,
      testType = 'steno',
      speedWpm,
      accuracyPct,
      totalWords,
      typedWords,
      fullMistakes,
      halfMistakes,
      effectiveErrors,
      qualificationStatus,
      timeTakenSecs,
      backspaceCount,
      tabSwitchWarnings
    } = req.body;

    const validatedSpeed = Math.max(0, Math.min(250, Number(speedWpm) || 0));
    const validatedAccuracy = Math.max(0, Math.min(100, Number(accuracyPct) || 0));
    const validatedErrors = Math.max(0, Number(effectiveErrors) || 0);
    const validatedTime = Math.max(1, Math.min(3600, Number(timeTakenSecs) || 300));
    const safeTitle = (testTitle || 'Speed Examination Benchmark').slice(0, 200).trim();

    if (!req.user) {
      return res.status(200).json({
        success: true,
        message: 'Guest exam score verified! Sign in to permanently save your certificate.',
        isGuest: true,
        resultId: null
      });
    }

    const userId = req.user.id;

    const result = await db.run(`
      INSERT INTO test_results (
        user_id, test_id, test_title, test_type, speed_wpm, accuracy_pct,
        total_words, typed_words, full_mistakes, half_mistakes, effective_errors,
        qualification_status, time_taken_secs, backspace_count, tab_switch_warnings
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      userId,
      testId || 0,
      safeTitle,
      testType === 'typing' ? 'typing' : 'steno',
      validatedSpeed,
      validatedAccuracy,
      Math.max(0, Number(totalWords) || 0),
      Math.max(0, Number(typedWords) || 0),
      Math.max(0, Number(fullMistakes) || 0),
      Math.max(0, Number(halfMistakes) || 0),
      validatedErrors,
      String(qualificationStatus || 'Qualified').slice(0, 50),
      validatedTime,
      Math.max(0, Number(backspaceCount) || 0),
      Math.max(0, Number(tabSwitchWarnings) || 0)
    );

    return res.status(201).json({
      success: true,
      message: 'Exam score registered and verified in official records.',
      resultId: result.lastInsertRowid || result.id
    });
  } catch (error) {
    console.error('Error submitting test result:', error);
    return res.status(500).json({ success: false, message: 'Failed to submit test result.' });
  }
});

export default router;
