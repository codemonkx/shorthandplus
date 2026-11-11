-- =====================================================================
-- Shorthand Plus — Production PostgreSQL Database Schema
-- Compatible with PostgreSQL 14+, Neon, Supabase, AWS RDS, Render
-- =====================================================================

-- Enable UUID extension if needed in future
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables in reverse order for clean migrations if needed
-- DROP TABLE IF EXISTS announcements CASCADE;
-- DROP TABLE IF EXISTS recorded_classes CASCADE;
-- DROP TABLE IF EXISTS live_classes CASCADE;
-- DROP TABLE IF EXISTS test_results CASCADE;
-- DROP TABLE IF EXISTS tests CASCADE;
-- DROP TABLE IF EXISTS transactions CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS enrollments CASCADE;
-- DROP TABLE IF EXISTS courses CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'student',
  roll_no VARCHAR(50) UNIQUE NOT NULL,
  mobile VARCHAR(50),
  state VARCHAR(100) DEFAULT 'Bihar',
  language VARCHAR(50) DEFAULT 'English',
  status VARCHAR(50) DEFAULT 'Active',
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_roll_no ON users(roll_no);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  badge VARCHAR(100),
  tag_color VARCHAR(50) DEFAULT 'badge-blue',
  speed_target VARCHAR(100),
  duration VARCHAR(100) NOT NULL,
  fee VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  syllabus TEXT, -- Stored as JSON string or JSONB
  mode VARCHAR(50) DEFAULT 'Bilingual (Hindi + English)',
  popular INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active);

-- 3. ENROLLMENTS TABLE (Active candidate subscriptions)
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id VARCHAR(100) NOT NULL,
  plan_name VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'Active',
  starts_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  payment_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status_expires ON enrollments(status, expires_at);

-- 4. ORDERS TABLE (Razorpay Payment Orders)
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(100) UNIQUE NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id VARCHAR(100) NOT NULL,
  plan_name VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  status VARCHAR(50) DEFAULT 'created',
  receipt VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- 5. TRANSACTIONS TABLE (Immutable Financial Ledger)
CREATE TABLE IF NOT EXISTS transactions (
  id VARCHAR(100) PRIMARY KEY,
  user_id INTEGER,
  student_name VARCHAR(255) NOT NULL,
  roll_no VARCHAR(100) NOT NULL,
  plan_name VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  mode VARCHAR(100) NOT NULL,
  payment_id VARCHAR(100),
  order_id VARCHAR(100),
  status VARCHAR(100) DEFAULT 'Auto-Verified',
  billing_cycle VARCHAR(100),
  date_str VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at DESC);

-- 6. TESTS TABLE (Steno Dictation Passages & Typing Tests)
CREATE TABLE IF NOT EXISTS tests (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'steno', -- 'steno' | 'typing'
  category VARCHAR(100) NOT NULL,
  authority VARCHAR(100),
  speed_wpm INTEGER,
  speed_str VARCHAR(50),
  duration VARCHAR(50),
  language VARCHAR(50) DEFAULT 'English',
  total_words INTEGER,
  audio_url TEXT,
  audio_duration INTEGER DEFAULT 300,
  difficulty VARCHAR(50) DEFAULT 'Medium',
  passage_text TEXT NOT NULL,
  typing_duration_mins INTEGER DEFAULT 10,
  is_published INTEGER DEFAULT 1,
  is_active INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tests_active_type ON tests(is_active, type);

-- 7. TEST RESULTS TABLE (Candidate Submissions with SSC Formula Evaluation)
CREATE TABLE IF NOT EXISTS test_results (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_id INTEGER NOT NULL,
  test_title VARCHAR(255) NOT NULL,
  test_type VARCHAR(50) DEFAULT 'steno',
  speed_wpm REAL NOT NULL,
  accuracy_pct REAL NOT NULL,
  total_words INTEGER NOT NULL,
  typed_words INTEGER NOT NULL,
  full_mistakes INTEGER NOT NULL,
  half_mistakes INTEGER NOT NULL,
  effective_errors REAL NOT NULL,
  qualification_status VARCHAR(50) NOT NULL,
  time_taken_secs INTEGER NOT NULL,
  backspace_count INTEGER DEFAULT 0,
  tab_switch_warnings INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_test_results_user ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_test_results_created ON test_results(created_at DESC);

-- 7B. ASSESSMENT SESSIONS TABLE (Controlled Two-Stage Examination Sessions)
CREATE TABLE IF NOT EXISTS assessment_sessions (
  id VARCHAR(100) PRIMARY KEY,
  user_id INTEGER,
  test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'listening', -- 'listening', 'typing', 'submitted', 'expired'
  audio_started_at BIGINT,
  audio_duration_secs INTEGER DEFAULT 300,
  listening_completed_at BIGINT,
  typing_started_at BIGINT,
  typing_duration_secs INTEGER DEFAULT 600,
  typing_expires_at BIGINT,
  submitted_at BIGINT,
  audio_play_count INTEGER DEFAULT 1,
  typed_text TEXT,
  result_id INTEGER REFERENCES test_results(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_assessment_sessions_user_test ON assessment_sessions(user_id, test_id);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_status ON assessment_sessions(status);

-- 8. LIVE CLASSES TABLE (Live Zoom Sessions with Protected Credentials)
CREATE TABLE IF NOT EXISTS live_classes (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  shift VARCHAR(50),
  time VARCHAR(100),
  instructor VARCHAR(100),
  instructor_role VARCHAR(100),
  speed VARCHAR(50),
  course_id VARCHAR(100),
  attendees INTEGER DEFAULT 100,
  is_live INTEGER DEFAULT 0,
  tag VARCHAR(50),
  badge_class VARCHAR(50),
  zoom_meeting_id VARCHAR(100) NOT NULL,
  zoom_passcode VARCHAR(100) NOT NULL,
  zoom_direct_url TEXT,
  zoom_app_url TEXT,
  zoom_web_url TEXT,
  description TEXT,
  today_topic TEXT,
  room_no VARCHAR(50),
  mode VARCHAR(50),
  passage_snippet TEXT,
  key_outlines TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. RECORDED CLASSES TABLE (Archived Past Sessions)
CREATE TABLE IF NOT EXISTS recorded_classes (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  shift VARCHAR(50),
  time VARCHAR(100),
  instructor VARCHAR(100),
  speed VARCHAR(50),
  duration VARCHAR(50),
  course_id VARCHAR(100),
  zoom_meeting_id VARCHAR(100),
  zoom_passcode VARCHAR(100),
  zoom_direct_url TEXT,
  description TEXT,
  today_topic TEXT,
  room_no VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. ANNOUNCEMENTS TABLE (Official Notices & Live Banner Ticker)
CREATE TABLE IF NOT EXISTS announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  tag VARCHAR(100),
  date_str VARCHAR(100),
  description TEXT NOT NULL,
  is_live_banner INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. PASSWORD RESETS TABLE (Cryptographic Recovery Tokens)
CREATE TABLE IF NOT EXISTS password_resets (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token_code VARCHAR(100) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_password_resets_email ON password_resets(email);
