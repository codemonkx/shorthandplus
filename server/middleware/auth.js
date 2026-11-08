import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import db from '../db/database.js';

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.get(
      'SELECT id, name, email, role, roll_no, mobile, state, language, status, avatar FROM users WHERE id = ?',
      decoded.id
    );

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token. User no longer exists.' });
    }

    if (user.status === 'Suspended') {
      return res.status(403).json({ success: false, message: 'Your account has been suspended by administration.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token expired or invalid. Please log in again.' });
  }
}

export async function optionalToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await db.get(
        'SELECT id, name, email, role, roll_no, mobile, state, language, status, avatar FROM users WHERE id = ?',
        decoded.id
      );
      if (user && user.status !== 'Suspended') {
        req.user = user;
      }
    } catch {}
  }
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied. Administrative privileges required.' });
  }
  next();
}

export async function requireActiveEnrollment(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  if (req.user.role === 'admin') {
    return next(); // Admins bypass enrollment checks
  }

  // Check active enrollment in database
  const activeEnrollment = await db.get(`
    SELECT * FROM enrollments 
    WHERE user_id = ? AND status = 'Active' AND expires_at > CURRENT_TIMESTAMP
    ORDER BY expires_at DESC LIMIT 1
  `, req.user.id);

  if (!activeEnrollment) {
    return res.status(403).json({ 
      success: false, 
      message: 'Active subscription required to access this resource. Please upgrade your pass.',
      code: 'SUBSCRIPTION_EXPIRED'
    });
  }

  req.enrollment = activeEnrollment;
  next();
}
