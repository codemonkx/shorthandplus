import express from 'express';
import db from '../db/database.js';
import { verifyToken, requireAdmin, optionalToken } from '../middleware/auth.js';

const router = express.Router();

// List Tests (filter by type: 'steno' | 'typing')
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM tests WHERE is_active = 1';
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
      name: t.title, // alias for typing tests
      type: t.type,
      category: t.category,
      authority: t.authority,
      speed: t.speed_str || `${t.speed_wpm} WPM`,
      speedWpm: t.speed_wpm,
      targetSpeed: t.speed_str || `${t.speed_wpm} WPM`,
      language: t.language,
      duration: t.duration,
      time: t.duration, // alias
      totalWords: t.total_words,
      words: t.total_words, // alias
      audioUrl: t.audio_url,
      audioDuration: t.audio_duration,
      difficulty: t.difficulty,
      passageText: t.passage_text
    }));

    return res.json({ success: true, tests: formatted });
  } catch (error) {
    console.error('Error fetching tests:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching tests.' });
  }
});

// Candidate Test History (Must be before /:id)
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
      statusType: Number(r.marksNum || r.marksnum || 0) >= 90 ? 'qualified' : 'disqualified'
    }));

    return res.json({ success: true, history: formatted, results: formatted });
  } catch (error) {
    console.error('Error fetching history:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching test history.' });
  }
});

// Get Single Test by ID
router.get('/:id', async (req, res) => {
  try {
    const test = await db.get('SELECT * FROM tests WHERE id = ?', req.params.id);
    if (!test) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

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
        duration: test.duration,
        time: test.duration,
        totalWords: test.total_words,
        words: test.total_words,
        audioUrl: test.audio_url,
        audioDuration: test.audio_duration,
        difficulty: test.difficulty,
        passageText: test.passage_text
      }
    });
  } catch (error) {
    console.error('Error fetching test:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching test.' });
  }
});

// Admin: Create Test (Steno or Typing)
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
      language = 'English', 
      totalWords, 
      audioUrl = '/assets/sample-dictation.mp3', 
      audioDuration = 300, 
      difficulty = 'Medium', 
      passageText 
    } = req.body;

    if (!title || !passageText) {
      return res.status(400).json({ success: false, message: 'Test title and master passage text are required.' });
    }

    const wordsCount = totalWords || passageText.trim().split(/\s+/).filter(Boolean).length;
    const speedNumber = speedWpm ? Number(speedWpm) : 80;
    const speedString = speedStr || `${speedNumber} WPM`;

    const result = await db.run(`
      INSERT INTO tests (title, type, category, authority, speed_wpm, speed_str, duration, language, total_words, audio_url, audio_duration, difficulty, passage_text)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      title.trim(),
      type,
      category || (type === 'steno' ? 'SSC Steno Bench' : 'Typing Speed Studio'),
      authority || 'Exam Board',
      speedNumber,
      speedString,
      duration,
      language,
      wordsCount,
      audioUrl,
      audioDuration,
      difficulty,
      passageText.trim()
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
        language: created.language,
        totalWords: created.total_words,
        words: created.total_words,
        audioUrl: created.audio_url,
        passageText: created.passage_text
      }
    });
  } catch (error) {
    console.error('Error creating test:', error);
    return res.status(500).json({ success: false, message: 'Failed to create test.' });
  }
});

// Admin: Update Test
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, authority, speedWpm, speedStr, duration, language, totalWords, audioUrl, difficulty, passageText } = req.body;

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
        language = COALESCE(?, language),
        total_words = COALESCE(?, total_words),
        audio_url = COALESCE(?, audio_url),
        difficulty = COALESCE(?, difficulty),
        passage_text = COALESCE(?, passage_text)
      WHERE id = ?
    `,
      title ? title.trim() : null,
      category,
      authority,
      speedWpm ? Number(speedWpm) : null,
      speedStr,
      duration,
      language,
      wordsCount,
      audioUrl,
      difficulty,
      passageText ? passageText.trim() : null,
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

// Admin: Delete Test
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const del = await db.run('DELETE FROM tests WHERE id = ?', id);

    if (del.changes === 0 && del.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    return res.json({ success: true, message: 'Test successfully removed.' });
  } catch (error) {
    console.error('Error deleting test:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete test.' });
  }
});

// Submit Candidate Exam Result & Store in DB
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

    // Strict numerical bounds validation
    const validatedSpeed = Math.max(0, Math.min(250, Number(speedWpm) || 0));
    const validatedAccuracy = Math.max(0, Math.min(100, Number(accuracyPct) || 0));
    const validatedErrors = Math.max(0, Number(effectiveErrors) || 0);
    const validatedTime = Math.max(1, Math.min(3600, Number(timeTakenSecs) || 300));
    const safeTitle = (testTitle || 'Speed Examination Benchmark').slice(0, 200).trim();

    // If guest / not logged in, calculate result without polluting official candidate accounts
    if (!req.user) {
      return res.status(200).json({
        success: true,
        message: 'Guest exam score verified! Sign in to permanently save your certificate and rank on the state leaderboard.',
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
