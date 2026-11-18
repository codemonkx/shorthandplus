# Shorthand Plus — Project Todo & Implementation Tracker

## 📌 Pending External Credentials (Awaiting Production Keys)

### 🔴 High Priority / Awaiting User Configuration
- [ ] **Live Outbound Email (SMTP) Delivery Configuration**
  - **Status**: Backend transport engine implemented (`server/services/emailService.js`); awaiting active SMTP credentials in `.env`.
  - **Requirement**: Provide valid credentials (`SMTP_USER` and `SMTP_PASS`, e.g., a 16-character Google App Password for `stenoplus.in@gmail.com` or SendGrid/Brevo API key) in `.env` to enable real network transmission of 6-digit OTP codes to candidates' actual email inboxes. (During local dev, OTP is securely printed to the server console).
  - **Verification Step**: Send a live test recovery email to candidate inbox, verify receipt within 10 seconds, and complete password reset.

- [ ] **Razorpay Live Merchant Production Keys**
  - **Status**: Running on test sandbox (`rzp_test_...`).
  - **Requirement**: Replace with live merchant API keys (`rzp_live_...` and `RAZORPAY_KEY_SECRET`) in `.env` before accepting real student payments from candidates. Instant UPI QR (`919204123453@paytm`) is fully live.

- [ ] **Cloud PostgreSQL Connection Setup**
  - **Status**: Configured with automatic graceful fallback; currently running on embedded SQLite WAL mode (`server/data/shorthand.db`).
  - **Requirement**: When deploying to production cloud infrastructure (Render, Railway, Supabase, or AWS), provide `DATABASE_URL` pointing to the managed PostgreSQL database.
