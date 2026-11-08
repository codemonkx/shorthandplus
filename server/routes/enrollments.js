import express from 'express';
import db from '../db/database.js';
import { verifyToken, optionalToken } from '../middleware/auth.js';

const router = express.Router();

function getDaysRemaining(expiryDate) {
  if (!expiryDate) return 0;
  const diff = new Date(expiryDate) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// Get Logged-in User's Active Enrollments
router.get('/my', verifyToken, async (req, res) => {
  try {
    const user = req.user;

    const enrollments = await db.all(`
      SELECT * FROM enrollments 
      WHERE user_id = ? 
      ORDER BY expires_at DESC
    `, user.id);

    const formatted = enrollments.map(e => ({
      id: e.id,
      planId: e.plan_id,
      planName: e.plan_name,
      amount: e.amount,
      status: new Date(e.expires_at) > new Date() ? 'Active' : 'Expired',
      daysRemaining: getDaysRemaining(e.expires_at),
      startsAt: e.starts_at,
      expiresAt: e.expires_at,
      paymentId: e.payment_id
    }));

    return res.json({ success: true, enrollments: formatted });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching enrollments.' });
  }
});

// Access Gate Check for Tests & Content
router.get('/check-access/:target', optionalToken, async (req, res) => {
  try {
    const user = req.user;
    const target = req.params.target;

    // Unauthenticated guest check
    if (!user) {
      return res.json({
        success: true,
        hasAccess: false,
        reason: 'Please log in or create an account to access this examination benchmark.',
        action: 'LOGIN_REQUIRED'
      });
    }

    // Admins always have access
    if (user.role === 'admin') {
      return res.json({
        success: true,
        hasAccess: true,
        reason: 'Admin access granted.',
        daysRemaining: 999
      });
    }

    // Check if account is suspended
    if (user.status === 'Suspended') {
      return res.json({
        success: true,
        hasAccess: false,
        reason: 'Account suspended. Contact administration.',
        action: 'ACCOUNT_SUSPENDED'
      });
    }

    // Check active unexpired enrollment
    const activeEnrollment = await db.get(`
      SELECT * FROM enrollments 
      WHERE user_id = ? AND status = 'Active' AND expires_at > CURRENT_TIMESTAMP
      ORDER BY expires_at DESC LIMIT 1
    `, user.id);

    if (!activeEnrollment) {
      return res.json({
        success: true,
        hasAccess: false,
        reason: 'Your subscription pass has expired or is inactive. Upgrade your plan to unlock all speed dictations and typing tests.',
        action: 'UPGRADE_REQUIRED'
      });
    }

    return res.json({
      success: true,
      hasAccess: true,
      planName: activeEnrollment.plan_name,
      daysRemaining: getDaysRemaining(activeEnrollment.expires_at)
    });
  } catch (error) {
    console.error('Access check error:', error);
    return res.status(500).json({ success: false, message: 'Error checking access permissions.' });
  }
});

export default router;
