import dotenv from 'dotenv';
import pg from 'pg';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const isPgConfigured = Boolean(
  process.env.DATABASE_URL || 
  (process.env.PGHOST && process.env.PGDATABASE)
);

let pool = null;
let sqliteDb = null;
let isPostgres = false;

// Convert SQLite-style ? placeholders to PostgreSQL $1, $2, ...
function toPgSql(sql) {
  let paramIdx = 1;
  let pgSql = sql.replace(/\?/g, () => `$${paramIdx++}`);
  // Replace SQLite specific datetime expressions with PostgreSQL equivalents
  pgSql = pgSql.replace(/datetime\('now'\)/gi, 'CURRENT_TIMESTAMP');
  pgSql = pgSql.replace(/datetime\(([^)]+)\)/gi, '$1');
  return pgSql;
}

if (isPgConfigured) {
  try {
    const connectionString = process.env.DATABASE_URL;
    const isLocalhost = connectionString?.includes('localhost') || connectionString?.includes('127.0.0.1');

    pool = new pg.Pool({
      connectionString: connectionString || undefined,
      host: process.env.PGHOST,
      port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      max: 20, // 20 concurrent connections in pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: isLocalhost || !connectionString?.includes('sslmode=require') && !process.env.PGSSLMODE 
        ? false 
        : { rejectUnauthorized: false }
    });

    pool.on('error', (err) => {
      console.error('⚠️ PostgreSQL pool idle client error:', err.message);
    });

    isPostgres = true;
    console.log('🐘 PostgreSQL configuration detected. Production pool initialized.');
  } catch (err) {
    console.error('Failed to configure PostgreSQL pool, falling back to embedded database:', err);
    isPostgres = false;
  }
}

// Fallback to embedded SQLite if PostgreSQL is not active
if (!isPostgres) {
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const dbPath = path.join(dataDir, 'shorthand.db');
  sqliteDb = new Database(dbPath);
  sqliteDb.pragma('journal_mode = WAL');
  sqliteDb.pragma('foreign_keys = ON');
  console.log('📦 Embedded database active at:', dbPath);
}

// Normalize parameters to array
function normalizeParams(params) {
  if (!params || params.length === 0) return [];
  if (params.length === 1 && Array.isArray(params[0])) {
    return params[0];
  }
  return params;
}

// Convert SQL to SQLite dialect (strip Postgres casts like ::numeric)
function toSqliteSql(sql) {
  if (typeof sql !== 'string') return sql;
  return sql.replace(/::\w+/g, '');
}

// Universal database client object
const db = {
  isPostgres,
  pool,
  sqlite: sqliteDb,

  // Single row query: SELECT ... LIMIT 1
  async get(sql, ...params) {
    const flatParams = normalizeParams(params);
    if (isPostgres) {
      const pgSql = toPgSql(sql);
      const res = await pool.query(pgSql, flatParams);
      return res.rows[0] || null;
    } else {
      // In SQLite mode
      const cleanSql = toSqliteSql(sql);
      const stmt = sqliteDb.prepare(cleanSql);
      const row = stmt.get(...flatParams);
      return row || null;
    }
  },

  // Multi-row query: SELECT ...
  async all(sql, ...params) {
    const flatParams = normalizeParams(params);
    if (isPostgres) {
      const pgSql = toPgSql(sql);
      const res = await pool.query(pgSql, flatParams);
      return res.rows || [];
    } else {
      const cleanSql = toSqliteSql(sql);
      const stmt = sqliteDb.prepare(cleanSql);
      return stmt.all(...flatParams) || [];
    }
  },

  // Mutation query: INSERT, UPDATE, DELETE
  async run(sql, ...params) {
    const flatParams = normalizeParams(params);
    if (isPostgres) {
      let pgSql = toPgSql(sql);
      const isInsert = /^\s*INSERT\s+INTO/i.test(pgSql);
      const hasReturning = /RETURNING/i.test(pgSql);

      // If it's an INSERT without RETURNING, append RETURNING id to capture the generated ID
      if (isInsert && !hasReturning) {
        pgSql = `${pgSql.trim()} RETURNING id`;
      }

      const res = await pool.query(pgSql, flatParams);
      const insertedId = res.rows?.[0]?.id;
      return {
        id: insertedId,
        lastInsertRowid: insertedId,
        changes: res.rowCount,
        rowCount: res.rowCount
      };
    } else {
      const cleanSql = toSqliteSql(sql);
      const stmt = sqliteDb.prepare(cleanSql);
      const res = stmt.run(...flatParams);
      return {
        id: res.lastInsertRowid,
        lastInsertRowid: res.lastInsertRowid,
        changes: res.changes,
        rowCount: res.changes
      };
    }
  },

  // Generic raw query
  async query(sql, ...params) {
    const flatParams = normalizeParams(params);
    if (isPostgres) {
      const pgSql = toPgSql(sql);
      return await pool.query(pgSql, flatParams);
    } else {
      const cleanSql = toSqliteSql(sql);
      const stmt = sqliteDb.prepare(cleanSql);
      const rows = stmt.all(...flatParams);
      return { rows, rowCount: rows.length };
    }
  },

  // Multi-statement script execution
  async exec(sql) {
    if (isPostgres) {
      return await pool.query(sql);
    } else {
      return sqliteDb.exec(sql);
    }
  },

  // SQLite Synchronous Prepared Statement Compatibility Interface
  prepare(sql) {
    if (sqliteDb) {
      // In SQLite mode, native prepare returns synchronous methods
      const nativeStmt = sqliteDb.prepare(sql);
      return {
        get: (...p) => nativeStmt.get(...normalizeParams(p)),
        all: (...p) => nativeStmt.all(...normalizeParams(p)),
        run: (...p) => nativeStmt.run(...normalizeParams(p)),
        // Async equivalents
        getAsync: async (...p) => db.get(sql, ...p),
        allAsync: async (...p) => db.all(sql, ...p),
        runAsync: async (...p) => db.run(sql, ...p)
      };
    } else {
      // In PostgreSQL mode, returns async methods
      return {
        get: (...p) => db.get(sql, ...p),
        all: (...p) => db.all(sql, ...p),
        run: (...p) => db.run(sql, ...p),
        getAsync: (...p) => db.get(sql, ...p),
        allAsync: (...p) => db.all(sql, ...p),
        runAsync: (...p) => db.run(sql, ...p)
      };
    }
  }
};

// Initialize schema in whichever database is active
export async function initDatabase() {
  if (isPostgres) {
    console.log('🐘 Initializing PostgreSQL schema...');
    try {
      const schemaPath = path.join(__dirname, 'schema.sql');
      if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await pool.query(schemaSql);
        console.log('✅ PostgreSQL Schema & Tables initialized.');
        return;
      }
    } catch (pgErr) {
      console.warn(`⚠️ PostgreSQL connection failed (${pgErr.message || pgErr}). Automatically switching to embedded SQLite engine...`);
      isPostgres = false;
      db.isPostgres = false;
      if (!sqliteDb) {
        const dataDir = path.join(__dirname, '../data');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        const dbPath = path.join(dataDir, 'shorthand.db');
        sqliteDb = new Database(dbPath);
        sqliteDb.pragma('journal_mode = WAL');
        sqliteDb.pragma('foreign_keys = ON');
        db.sqlite = sqliteDb;
      }
    }
  }

  // SQLite Tables
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'student',
        roll_no TEXT UNIQUE NOT NULL,
        mobile TEXT,
        state TEXT DEFAULT 'Bihar',
        language TEXT DEFAULT 'English',
        status TEXT DEFAULT 'Active',
        avatar TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        badge TEXT,
        tag_color TEXT,
        speed_target TEXT,
        duration TEXT NOT NULL,
        fee TEXT NOT NULL,
        price INTEGER NOT NULL,
        description TEXT,
        syllabus TEXT,
        mode TEXT,
        popular INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        plan_id TEXT NOT NULL,
        plan_name TEXT NOT NULL,
        amount INTEGER NOT NULL,
        status TEXT DEFAULT 'Active',
        starts_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME NOT NULL,
        payment_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT UNIQUE NOT NULL,
        user_id INTEGER NOT NULL,
        plan_id TEXT NOT NULL,
        plan_name TEXT NOT NULL,
        amount INTEGER NOT NULL,
        currency TEXT DEFAULT 'INR',
        status TEXT DEFAULT 'created',
        receipt TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        user_id INTEGER,
        student_name TEXT NOT NULL,
        roll_no TEXT NOT NULL,
        plan_name TEXT NOT NULL,
        amount INTEGER NOT NULL,
        mode TEXT NOT NULL,
        payment_id TEXT,
        order_id TEXT,
        status TEXT DEFAULT 'Auto-Verified',
        billing_cycle TEXT,
        date_str TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'steno',
        category TEXT NOT NULL,
        authority TEXT,
        speed_wpm INTEGER,
        speed_str TEXT,
        duration TEXT,
        language TEXT DEFAULT 'English',
        total_words INTEGER,
        audio_url TEXT,
        audio_duration INTEGER DEFAULT 300,
        difficulty TEXT DEFAULT 'Medium',
        passage_text TEXT NOT NULL,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS test_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        test_id INTEGER NOT NULL,
        test_title TEXT NOT NULL,
        test_type TEXT DEFAULT 'steno',
        speed_wpm REAL NOT NULL,
        accuracy_pct REAL NOT NULL,
        total_words INTEGER NOT NULL,
        typed_words INTEGER NOT NULL,
        full_mistakes INTEGER NOT NULL,
        half_mistakes INTEGER NOT NULL,
        effective_errors REAL NOT NULL,
        qualification_status TEXT NOT NULL,
        time_taken_secs INTEGER NOT NULL,
        backspace_count INTEGER DEFAULT 0,
        tab_switch_warnings INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS live_classes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        shift TEXT,
        time TEXT,
        instructor TEXT,
        instructor_role TEXT,
        speed TEXT,
        course_id TEXT,
        attendees INTEGER DEFAULT 100,
        is_live INTEGER DEFAULT 0,
        tag TEXT,
        badge_class TEXT,
        zoom_meeting_id TEXT NOT NULL,
        zoom_passcode TEXT NOT NULL,
        zoom_direct_url TEXT,
        zoom_app_url TEXT,
        zoom_web_url TEXT,
        description TEXT,
        today_topic TEXT,
        room_no TEXT,
        mode TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS recorded_classes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        shift TEXT,
        time TEXT,
        instructor TEXT,
        speed TEXT,
        duration TEXT,
        course_id TEXT,
        zoom_meeting_id TEXT,
        zoom_passcode TEXT,
        zoom_direct_url TEXT,
        description TEXT,
        today_topic TEXT,
        room_no TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        tag TEXT,
        date_str TEXT,
        description TEXT NOT NULL,
        is_live_banner INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS password_resets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        token_code TEXT NOT NULL,
        expires_at DATETIME NOT NULL,
        used INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS assessment_sessions (
        id TEXT PRIMARY KEY,
        user_id INTEGER,
        test_id INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'listening',
        audio_started_at INTEGER,
        audio_duration_secs INTEGER DEFAULT 300,
        listening_completed_at INTEGER,
        typing_started_at INTEGER,
        typing_duration_secs INTEGER DEFAULT 600,
        typing_expires_at INTEGER,
        submitted_at INTEGER,
        audio_play_count INTEGER DEFAULT 1,
        typed_text TEXT,
        result_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
      );
    `);

    // Ensure columns exist on tests table
    try {
      sqliteDb.exec(`ALTER TABLE tests ADD COLUMN typing_duration_mins INTEGER DEFAULT 10;`);
    } catch {}
    try {
      sqliteDb.exec(`ALTER TABLE tests ADD COLUMN is_published INTEGER DEFAULT 1;`);
    } catch {}

    console.log('✅ SQLite Database & Tables Initialized.');
}

export default db;
