import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import db from '../db/database.js';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET } from '../config.js';
import { verifyToken, optionalToken } from '../middleware/auth.js';

const router = express.Router();

let razorpayInstance = null;
try {
  razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
  });
} catch (e) {
  console.warn('⚠️ Razorpay initialized in fallback/test mode:', e.message);
}

// Return public key for client Razorpay Checkout
router.get('/key', (req, res) => {
  return res.json({ success: true, keyId: RAZORPAY_KEY_ID });
});

// Helper to determine expiry days based on plan/course
function getExpiryDays(plan) {
  const duration = (plan?.duration || '').toLowerCase();
  const id = (plan?.id || '').toLowerCase();

  if (duration.includes('12') || duration.includes('annual') || id.includes('12mo')) return 365;
  if (duration.includes('6') || id.includes('6mo')) return 180;
  if (duration.includes('3') || duration.includes('4') || id.includes('pitman')) return 120;
  if (duration.includes('1 day') || id.includes('1day')) return 1;
  return 30; // default 1 month
}

// Create Razorpay Order
router.post('/create-order', optionalToken, async (req, res) => {
  try {
    const { planId, amount: requestedAmount, customerName, customerEmail, customerMobile } = req.body;
    
    // Resolve user: use authenticated session or find by email
    let user = req.user;
    if (!user && customerEmail) {
      user = await db.get('SELECT * FROM users WHERE email = ?', customerEmail.trim().toLowerCase());
    }
    if (!user) {
      user = {
        id: 0,
        name: customerName || 'Candidate Guest',
        email: customerEmail || 'guest@shorthandplus.in',
        roll_no: 'GUEST-2026',
        mobile: customerMobile || ''
      };
    }

    // Look up course/plan in database for authoritative pricing
    let plan = await db.get('SELECT * FROM courses WHERE id = ?', planId);
    let finalAmount = plan ? plan.price : Number(requestedAmount);

    if (!finalAmount || finalAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid course or amount.' });
    }

    const planName = plan ? plan.title : (planId === 'plan-12mo' ? '12-Month Unlimited' : planId === 'plan-6mo' ? '6-Month Scholar' : 'Monthly Shorthand Pass');
    const amountInPaise = Math.round(finalAmount * 100);
    const receipt = `rcpt_${user.id}_${Date.now()}`;

    let razorpayOrder = null;

    if (razorpayInstance && RAZORPAY_KEY_ID && !RAZORPAY_KEY_ID.includes('shorthandplus')) {
      try {
        razorpayOrder = await razorpayInstance.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: receipt,
          notes: {
            userId: String(user.id),
            userEmail: user.email,
            planId: planId || 'custom',
            planName: planName
          }
        });
      } catch (err) {
        console.warn('Razorpay live order creation failed, falling back to secure test order:', err.message);
      }
    }

    // Fallback order object if testing or API keys not yet provisioned in environment
    if (!razorpayOrder) {
      const mockOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;
      razorpayOrder = {
        id: mockOrderId,
        amount: amountInPaise,
        currency: 'INR',
        receipt: receipt,
        status: 'created'
      };
    }

    // Record order in database
    await db.run(`
      INSERT INTO orders (order_id, user_id, plan_id, plan_name, amount, currency, status, receipt)
      VALUES (?, ?, ?, ?, ?, ?, 'created', ?)
    `,
      razorpayOrder.id,
      user.id,
      planId || 'custom',
      planName,
      finalAmount,
      'INR',
      receipt
    );

    return res.json({
      success: true,
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        planName: planName,
        priceInRupees: finalAmount
      },
      keyId: RAZORPAY_KEY_ID,
      isRealKey: Boolean(RAZORPAY_KEY_ID && !RAZORPAY_KEY_ID.includes('shorthandplus')),
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile || '919204123453'
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create payment order.' });
  }
});

// Verify Payment Signature & Fulfill Enrollment Automatically
router.post('/verify', optionalToken, async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      planId, 
      paymentMethod = 'UPI (Instant)' 
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ success: false, message: 'Missing payment verification credentials.' });
    }

    // Retrieve order record first
    const order = await db.get('SELECT * FROM orders WHERE order_id = ?', razorpay_order_id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order reference not found in database.' });
    }

    // Prevent duplicate fulfillment replay attacks
    if (order.status === 'paid') {
      const existingEnrollment = await db.get(`
        SELECT * FROM enrollments 
        WHERE user_id = ? AND status = 'Active' 
        ORDER BY id DESC LIMIT 1
      `, order.user_id);
      return res.json({
        success: true,
        message: 'Payment was already fulfilled for this order.',
        enrollment: existingEnrollment
      });
    }

    // Cryptographic signature verification with HMAC-SHA256
    let isAuthentic = false;
    if (razorpay_signature && razorpay_signature !== 'sandbox_verified') {
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      if (expectedSignature === razorpay_signature) {
        isAuthentic = true;
      }
    }

    // Allow sandbox simulation strictly in non-production development mode with explicit token
    const isDevelopment = process.env.NODE_ENV !== 'production';
    if (!isAuthentic && isDevelopment && razorpay_signature === 'sandbox_verified') {
      isAuthentic = true;
    }

    if (!isAuthentic) {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment signature verification failed. Untrusted transaction.' 
      });
    }

    // Resolve target user: from authenticated session or original order creator
    let user = req.user;
    if (!user && order.user_id && order.user_id > 0) {
      user = await db.get('SELECT * FROM users WHERE id = ?', order.user_id);
    }
    if (!user) {
      user = await db.get("SELECT * FROM users WHERE role = 'student' LIMIT 1");
    }

    const plan = planId ? await db.get('SELECT * FROM courses WHERE id = ?', planId) : null;
    const planName = plan ? plan.title : (order ? order.plan_name : 'Shorthand Career Plan');
    const amount = order ? order.amount : (plan ? plan.price : 249);

    // Update order status
    await db.run("UPDATE orders SET status = 'paid' WHERE order_id = ?", razorpay_order_id);

    // Calculate expiry date
    const days = getExpiryDays(plan || { id: planId });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + days);
    const expiresAtIso = expiresAt.toISOString();

    // Create Enrollment Record in Database
    const enrollmentResult = await db.run(`
      INSERT INTO enrollments (user_id, plan_id, plan_name, amount, status, starts_at, expires_at, payment_id)
      VALUES (?, ?, ?, ?, 'Active', CURRENT_TIMESTAMP, ?, ?)
    `,
      user.id,
      planId || (order ? order.plan_id : 'plan-1mo'),
      planName,
      amount,
      expiresAtIso,
      razorpay_payment_id
    );

    // Generate Transaction Record in Financial Ledger
    const txnId = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;
    const dateStr = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    await db.run(`
      INSERT INTO transactions (id, user_id, student_name, roll_no, plan_name, amount, mode, payment_id, order_id, status, billing_cycle, date_str)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Auto-Verified', ?, ?)
    `,
      txnId,
      user.id,
      user.name,
      user.roll_no,
      planName,
      amount,
      paymentMethod,
      razorpay_payment_id,
      razorpay_order_id,
      `${days} Days Access`,
      dateStr
    );

    return res.json({
      success: true,
      message: 'Payment verified successfully! Course enrollment is active.',
      enrollment: {
        id: enrollmentResult.lastInsertRowid || enrollmentResult.id,
        planName,
        status: 'Active',
        daysRemaining: days,
        expiresAt: expiresAtIso
      },
      transaction: {
        id: txnId,
        amount,
        mode: paymentMethod,
        date: dateStr,
        status: 'Auto-Verified'
      }
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ success: false, message: 'Server error processing payment verification.' });
  }
});

// Razorpay Asynchronous Webhook Endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    if (!signature) {
      return res.status(400).send('Webhook signature missing');
    }

    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
      .update(req.body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).send('Invalid webhook signature');
    }

    const event = JSON.parse(req.body.toString());

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;

      if (orderId) {
        await db.run("UPDATE orders SET status = 'paid' WHERE order_id = ?", orderId);
      }
    }

    return res.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).send('Internal Server Error');
  }
});

export default router;
