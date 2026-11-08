import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const JWT_SECRET = process.env.JWT_SECRET || 'shorthand_plus_production_jwt_secret_key_2026';
export const ADMIN_PIN = process.env.ADMIN_PIN || '8080';

if (NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes('shorthand_plus_production'))) {
  console.warn('⚠️ SECURITY WARNING: Using default JWT_SECRET in production. Set a unique, cryptographically random JWT_SECRET in .env.');
}

// Razorpay Test / Production credentials
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_shorthandplus';
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'shorthand_razorpay_secret_key_2026';
export const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'shorthand_webhook_secret_2026';
