# Shorthand Plus — Project Todo & Implementation Tracker

## 📌 Pending & Actionable Items

### 🔴 High Priority / Awaiting User SMTP Credentials
- [ ] **Live Outbound Email (SMTP) Delivery Configuration**
  - **Status**: Backend transport engine implemented (`server/services/emailService.js`); awaiting active SMTP credentials in `.env`.
  - **Requirement**: Provide valid credentials (`SMTP_USER` and `SMTP_PASS`, e.g., a 16-character Google App Password or Brevo/SendGrid API key) in `.env` to enable real network transmission of 6-digit OTP codes to candidates' actual email inboxes (such as `nithinx002@gmail.com`).
  - **Verification Step**: Send a live test recovery email to candidate inbox, verify receipt within 10 seconds, and complete password reset.

---

### 🟡 Medium Priority / Academic Roadmap Enhancements
- [ ] **National Weekly Mock Test Leaderboards**
  - **Status**: Backlog.
  - **Requirement**: Publicly visible all-India leaderboard ranking students weekly by speed (WPM), accuracy percentage, and mistake deductions.

---

### 🟢 Low Priority / Production Deployment Operations
- [ ] **Cloud PostgreSQL Connection Setup**
  - **Status**: Configured with fallback; currently running on local SQLite WAL mode.
  - **Requirement**: When deploying to production cloud infrastructure (Render, Railway, or AWS), provide `DATABASE_URL` pointing to Supabase, Neon, or RDS.

- [ ] **Razorpay Live Merchant Production Keys**
  - **Status**: Running on test sandbox (`rzp_test_...`).
  - **Requirement**: Replace with live merchant API keys (`rzp_live_...`) before accepting real student payments.

---

## ✅ Completed & Verified Workflows

- [x] **Official 5-Minute Silent Reading Room Phase**
  - Implemented in `DictationRoom.jsx` with official countdown timer (`05:00`), live clock HUD, note-checking instructions, and option to skip for informal practice.
  - Complies with official SSC Grade C & D and High Court judicial examination regulations.

- [x] **Searchable Pitman & Hindi Shorthand Outline Dictionary**
  - Integrated into `ClassesPage.jsx` with instant keyword search, category filter chips (Legal & Judicial, Parliamentary, Administrative & Govt), stroke formulas, rule explanations, speed tips, and copy buttons.

- [x] **Legal & Compliance Policies Engine (Razorpay & IT Rules Compliant)**
  - Created `LegalPolicyModal.jsx` covering Terms & Conditions, Privacy Policy (DPDP Act 2023), Refund & Cancellation Policy, and Grievance Officer details.
  - Wired into `Footer.jsx` and `CheckoutModal.jsx`.

- [x] **Admin Direct Operations in Student Roster**
  - Implemented `POST /api/admin/students/:id/extend-pass` (+30 days saved directly to DB).
  - Implemented `POST /api/admin/students/:id/reset-password` (set or auto-generate temporary password).
  - Wired live action buttons in `AdminPortalView.jsx` student roster table.

- [x] **Direct Official Scorecard Dossier PDF Export**
  - Replaced browser `window.print()` in `EvaluationResult.jsx` with automatic generation of official candidate merit dossier PDF.

- [x] **Dynamic Subscription Chip in TopBar**
  - Replaced hardcoded `12-Mo Pro Active` with live dynamic plan and days remaining logic.

- [x] **Self-Service Password Reset via Candidate Email**
  - Cryptographic 6-digit hardware entropy generation (`crypto.randomInt`).
  - Strict 15-minute expiration timestamp with database TTL validation.
  - Atomic single-use anti-replay defense (`used = 1` committed immediately).
  - Dual-layer sliding-window rate limiting (`passwordResetLimiter` & `authRateLimiter`).
  - Nodemailer transport service integrated with branded HTML email layout.
  - **UI Security Fix**: Removed OTP auto-fill from input field; field defaults to clean empty state with `autoFocus` and digit-only validation.

- [x] **Registration Form Streamlining**
  - Removed mobile phone number requirement from both `AuthModal.jsx` and `LandingPage.jsx`.
  - Cleaned layout: candidate only needs Name, Email, Password, State & Language Medium.

- [x] **Warm Stone & Cashmere Design System**
  - Eliminated all cold blue/slate styling (`#0f172a`, `#2563eb`, `text-blue-500`) across all 18 views.
  - Unified `#FAF9F6` warm stone canvas, obsidian `#1C1917` typography, and `#D97706` honey amber accents.

- [x] **Automated Integration QA Suite (18/18 PASS)**
  - Automated test runner verifying health, registration, login, admin security, OTP life cycle, profile update, courses, live classes, dictation uploads, exam scoring, payment signatures, and admin student roster operations.

- [x] **Mid-Exam State Persistence**
  - Automatic `sessionStorage` backup ensuring student progress survives accidental browser refreshes.

- [x] **PDF Certificate Generator**
  - Government-standard format with high-resolution seal, QR verification code, and Director signature.
