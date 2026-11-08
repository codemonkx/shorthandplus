import express from 'express';
import db from '../db/database.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get All Active Courses & Batches
router.get('/', async (req, res) => {
  try {
    const courses = await db.all('SELECT * FROM courses WHERE is_active = 1 ORDER BY popular DESC, created_at DESC');

    const formatted = courses.map(c => ({
      id: c.id,
      title: c.title,
      category: c.category,
      badge: c.badge,
      tagColor: c.tag_color || 'badge-blue',
      speedTarget: c.speed_target,
      duration: c.duration,
      fee: c.fee,
      price: c.price,
      description: c.description,
      syllabus: c.syllabus ? (typeof c.syllabus === 'string' ? JSON.parse(c.syllabus) : c.syllabus) : [],
      mode: c.mode,
      popular: Boolean(c.popular)
    }));

    return res.json({ success: true, courses: formatted });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching courses.' });
  }
});

// Admin: Create Course
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, category, badge, tagColor, speedTarget, duration, fee, price, description, syllabus, mode, popular } = req.body;

    if (!title || !price || !duration) {
      return res.status(400).json({ success: false, message: 'Course title, duration, and price are required.' });
    }

    const id = `course-${Date.now()}`;
    const feeFormatted = fee || `₹${Number(price).toLocaleString('en-IN')}`;

    await db.run(`
      INSERT INTO courses (id, title, category, badge, tag_color, speed_target, duration, fee, price, description, syllabus, mode, popular)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      id,
      title.trim(),
      category || 'Foundation',
      badge || 'Certified Course',
      tagColor || 'badge-blue',
      speedTarget || 'Standard',
      duration,
      feeFormatted,
      Number(price),
      description || '',
      JSON.stringify(Array.isArray(syllabus) ? syllabus : [syllabus || 'Comprehensive theory & practical training']),
      mode || 'Online Portal + Audio Lab',
      popular ? 1 : 0
    );

    const created = await db.get('SELECT * FROM courses WHERE id = ?', id);

    return res.status(201).json({
      success: true,
      message: 'Course created successfully and published in catalog!',
      course: {
        ...created,
        syllabus: created.syllabus ? (typeof created.syllabus === 'string' ? JSON.parse(created.syllabus) : created.syllabus) : [],
        popular: Boolean(created.popular)
      }
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({ success: false, message: 'Failed to create course.' });
  }
});

// Admin: Update Course
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, badge, tagColor, speedTarget, duration, fee, price, description, syllabus, mode, popular } = req.body;

    const existing = await db.get('SELECT * FROM courses WHERE id = ?', id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    await db.run(`
      UPDATE courses SET
        title = COALESCE(?, title),
        category = COALESCE(?, category),
        badge = COALESCE(?, badge),
        tag_color = COALESCE(?, tag_color),
        speed_target = COALESCE(?, speed_target),
        duration = COALESCE(?, duration),
        fee = COALESCE(?, fee),
        price = COALESCE(?, price),
        description = COALESCE(?, description),
        syllabus = COALESCE(?, syllabus),
        mode = COALESCE(?, mode),
        popular = COALESCE(?, popular)
      WHERE id = ?
    `,
      title ? title.trim() : null,
      category,
      badge,
      tagColor,
      speedTarget,
      duration,
      fee,
      price ? Number(price) : null,
      description,
      syllabus ? JSON.stringify(Array.isArray(syllabus) ? syllabus : [syllabus]) : null,
      mode,
      popular !== undefined ? (popular ? 1 : 0) : null,
      id
    );

    const updated = await db.get('SELECT * FROM courses WHERE id = ?', id);

    return res.json({
      success: true,
      message: 'Course details successfully updated!',
      course: {
        ...updated,
        syllabus: updated.syllabus ? (typeof updated.syllabus === 'string' ? JSON.parse(updated.syllabus) : updated.syllabus) : [],
        popular: Boolean(updated.popular)
      }
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return res.status(500).json({ success: false, message: 'Failed to update course.' });
  }
});

// Admin: Delete Course
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const del = await db.run('DELETE FROM courses WHERE id = ?', id);

    if (del.changes === 0 && del.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    return res.json({ success: true, message: 'Course removed from catalog.' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete course.' });
  }
});

export default router;
