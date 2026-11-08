import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString && !process.env.PGHOST) {
  console.error('❌ Error: DATABASE_URL environment variable is not defined in .env');
  console.log('👉 Please set DATABASE_URL=postgresql://user:password@host:5432/dbname in .env');
  process.exit(1);
}

const isLocalhost = connectionString?.includes('localhost') || connectionString?.includes('127.0.0.1');

const client = new pg.Client({
  connectionString: connectionString || undefined,
  host: process.env.PGHOST,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: isLocalhost || !connectionString?.includes('sslmode=require') && !process.env.PGSSLMODE 
    ? false 
    : { rejectUnauthorized: false }
});

async function runMigration() {
  try {
    console.log('🔄 Connecting to PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully.');

    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('🚀 Executing DDL schema migration...');
    await client.query(sql);

    console.log('✨ Migration completed successfully! All tables, indexes, and constraints are provisioned.');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
