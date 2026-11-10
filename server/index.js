import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { PORT } from './config.js';
import db, { initDatabase } from './db/database.js';
import { seedDatabase } from './db/seed.js';
import securityHeaders from './middleware/securityHeaders.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './routes/auth.js';
import coursesRoutes from './routes/courses.js';
import paymentRoutes from './routes/payment.js';
import enrollmentsRoutes from './routes/enrollments.js';
import testsRoutes from './routes/tests.js';
import classesRoutes from './routes/classes.js';
import adminRoutes from './routes/admin.js';

// 1. Initialize Database & Tables (PostgreSQL if DATABASE_URL configured, or Embedded fallback)
await initDatabase();

// 2. Seed Initial Platform Data
await seedDatabase();

// 3. Create Express App
const app = express();

// Security Headers (MIME sniffing, Clickjacking, Referrer Policy)
app.use(securityHeaders);

// Scoped CORS Whitelist
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true
}));

// Scoped Request Body Parsing: 100kb baseline across all public routes, large payloads isolated to audio upload
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payment/webhook' || req.originalUrl === '/api/admin/upload-audio') {
    next();
  } else {
    express.json({ limit: '100kb' })(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Static Serving for Uploaded Audio Files with Hardened Download Headers
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'none'");
    if (filePath.endsWith('.html') || filePath.endsWith('.htm') || filePath.endsWith('.svg') || filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', 'attachment');
    }
  }
}));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'Shorthand Plus Enterprise Full-Stack Engine',
    database: db.isPostgres ? 'PostgreSQL (Connection Pool)' : 'SQLite (Embedded WAL)',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/api/tests', testsRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/admin', adminRoutes);

// Serve frontend production build if available
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Shorthand Plus Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints mounted on http://localhost:${PORT}/api`);
});

server.on('error', (err) => {
  console.error('❌ Server listen error:', err);
});

server.on('close', () => {
  console.warn('⚠️ Server closed event triggered');
});
