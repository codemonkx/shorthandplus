# Gaya Shorthand Classes (ShorthandPlus) 🏛️

[![Full-Stack Suite](https://img.shields.io/badge/Full--Stack%20QA-18%2F18%20Passing-047857?style=flat-square)](https://github.com/codemonkx/shorthandplus)
[![Vite](https://img.shields.io/badge/Bundler-Vite%208.3-d97706?style=flat-square&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/Frontend-React%2019-1c1917?style=flat-square&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Backend-Express%204.x-1c1917?style=flat-square&logo=express)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-SQLite%20(WAL)%20%7C%20PostgreSQL-047857?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Design System](https://img.shields.io/badge/Design%20System-Warm%20Stone%20%26%20Cashmere-d97706?style=flat-square)](#-design-system--ui-palette)

**Gaya Shorthand Classes (ShorthandPlus)** is Bihar's premier full-stack stenography examination and computer typing portal. Operating since 2008, the academy prepares aspirants for **Staff Selection Commission (SSC Steno Grade C & D)**, **Patna High Court**, **Jharkhand High Court**, **Civil Courts**, **Parliamentary Reporters**, and state government skill tests.

The platform provides a comprehensive simulation of official government examinations: speed-calibrated audio dictations, real-time typing transcription engines with strict backspace lockdown, forensic LCS word-by-word diff error evaluation, candidate scorecard dossiers, verified merit diplomas, Razorpay subscription checkout, and an executive director administrative console.

---

## 📑 Table of Contents

- [🏛️ Executive Overview](#-executive-overview)
- [🎨 Design System & UI Palette](#-design-system--ui-palette)
- [⚡ Core Features & Capabilities](#-core-features--capabilities)
- [🛡️ Security Architecture & Hardening](#-security-architecture--hardening)
- [🏗️ System Architecture & Tech Stack](#-system-architecture--tech-stack)
- [📂 Project Directory Structure](#-project-directory-structure)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [⚙️ Environment Configuration](#️-environment-configuration)
- [🔑 Pre-Configured Demo Accounts](#-pre-configured-demo-accounts)
- [🧪 Automated QA & Integration Testing](#-automated-qa--integration-testing)
- [📜 Production Build & Deployment](#-production-build--deployment)
- [📄 License & Credits](#-license--credits)

---

## 🏛️ Executive Overview

Government stenography skill examinations demand extreme precision:
* **SSC Stenographer Grade 'C'**: 100 WPM dictation for 10 minutes with strict 5% error limit (General).
* **SSC Stenographer Grade 'D'**: 80 WPM dictation for 10 minutes with strict 7% error limit (General).
* **High Court Benches (Patna / Ranchi)**: 80–120 WPM legal transcription with a mandatory 90% net accuracy qualifying threshold.

ShorthandPlus bridges the gap between traditional coaching and computer-based skill examinations by replicating actual exam room conditions with automated, instantaneous forensic error evaluation.

---

## 🎨 Design System & UI Palette

The entire interface adheres to the **Warm Stone & Cashmere** editorial design system—crafted for high-legibility, distraction-free examination environments with zero eye-strain during extended study sessions.

* **Canvas & Viewport**: `#FAF9F6` (Warm Alabaster Stone)
* **Cards & Surfaces**: `#FFFFFF` (Pure Crisp White)
* **Dividers & Structural Borders**: `#E7E5E4` / `#D6D3D1` (Muted Warm Stone)
* **Obsidian Typography & Primary Actions**: `#1C1917` (Deep Espresso Charcoal, hover `#292524`)
* **Honey Amber Accents**: `#D97706` / `#B45309` (Velocity gauges, active tabs, flagship batches)
* **Emerald Accents**: `#047857` / `#059669` (Passing scorecards, verified statuses, SSC cutoffs)
* **Secondary Typography**: `#57534e` for body prose, `#78716c` for captions, monospace for numerical telemetry.

---

## ⚡ Core Features & Capabilities

### 🎙️ 1. Studio Dictation Room & Audio Player
- **Pitch-Preserved Speed Controls**: Adjust audio playback rate from `0.75x` to `1.50x` without vocal pitch distortion.
- **Language-Aware Speech Playback**: Audio playback routes to dedicated Hindi (`sample-dictation-hindi.mp3`) or English (`sample-dictation.mp3`) audio recordings.
- **Official Examination HUD**: Countdown timer, speed indicators, audio scrubbing, volume sliders, and keyboard shortcuts (`Space` to play/pause, `Ctrl + Enter` to proceed).

### ✍️ 2. Interactive HTML5 Shorthand Stylus Canvas
- **Digital Pitman Notepad**: Ruled lines, pen/pencil chisel stroke simulation, and eraser tools designed for iPad, stylus tablets, and mouse drawing.
- **Student Scratchpad**: Text area with word counts and instant `.txt` file export.
- **Live Classroom Teaser**: Real-time studio whiteboard preview feed.

### ⌨️ 3. Computer Transcription Engine
- **Triple Backspace Modes**:
  - `Allowed`: Standard uninhibited typing for beginners.
  - `Counted`: Tracks and records every backspace keystroke in telemetry.
  - `Locked`: Completely disables `Backspace` and `Delete` keys to simulate strict High Court test conditions.
- **Dual Script Support**: Seamless switching between Latin English and Hindi (Kruti Dev 010 and Mangal / Inscript fonts).
- **Anti-Cheating Guard**: Disables copy-paste shortcuts (`Ctrl+C`, `Ctrl+V`) and logs tab-switch warnings if the candidate leaves the exam window.
- **Mid-Exam Draft Protection**: Automatic `sessionStorage` draft persistence (`shorthand_exam_draft_${testId}`) prevents work loss if the page is accidentally refreshed.

### 📊 4. LCS Word-by-Word Diff & Mistake Evaluation
- Implements the official **Longest Common Subsequence (LCS)** alignment algorithm comparing candidate transcription against the master reference text.
- **Government Mistake Classification**:
  - **Full Mistakes (1.00 Deduction)**: Omitted words, substituted words, and unauthorized additions.
  - **Half Mistakes (0.50 Deduction)**: Spelling errors, punctuation/capitalization omissions, and singular/plural transpositions.
  - **Net Accuracy & Status**: Real-time error percentage calculation with automatic qualification status against General (5%) and Reserved (7%) benchmarks.

### 📜 5. Certified PDF Dossier & Merit Diploma Generator
- **Candidate Scorecard Dossier**: Formal multi-page A4 PDF generated client-side via `jsPDF` and `jspdf-autotable`, including telemetry breakdown, error taxonomy, and signature block.
- **Official Merit Certificate**: High-resolution landscape diploma with double academic border, student roll number, registration ID, achieved speed, and official accreditation seal.

### 💳 6. Razorpay Payments & Instant Plan Provisioning
- Integrated with Razorpay standard checkout supporting UPI, QR Code, Net Banking, and Debit/Credit cards.
- Automated instant plan activation, updating user status to `Active` and recording transactions in the financial ledger.
- Development fallback simulator allowing full end-to-end checkout testing without live merchant keys.

### 🛡️ 7. Director & Faculty Administrative Console
- Master dashboard displaying total enrolled aspirants, monthly revenue, active test counts, and scheduled batches.
- **Test Management**: Create, edit, and delete stenography dictations and typing exercises.
- **Audio Upload Studio**: Upload MP3/WAV dictation recordings with automated master passage calibration.
- **Candidate Roster**: Search, filter, inspect candidate score history, assign passes, and export student records to CSV with formula injection defense.
- **Live Class Scheduling**: Create and broadcast Zoom meeting sessions with one-click live toggle.

---

## 🛡️ Security Architecture & Hardening

The platform adheres to strict enterprise web security standards:

| Defense Layer | Implementation Details |
| :--- | :--- |
| **Authentication & Clearance** | Zero hardcoded backdoor passcodes. All admin endpoints verify strict `ADMIN_PIN` environment configuration and `bcryptjs` password hashing. |
| **Password Reset (Anti-Replay)** | Cryptographic 6-digit random OTP stored in database with a strict 15-minute expiration window and immediate single-use invalidation. |
| **Payment Verification** | Cryptographic HMAC-SHA256 signature verification matching Razorpay order and payment IDs; duplicate replay guard prevents re-crediting completed transactions. |
| **CSV Formula Injection (CWE-1236)** | Student roster and financial exports sanitize all cells starting with `=`, `+`, `-`, `@` with a leading single quote (`'`). |
| **File Upload Validation** | Audio uploads enforce strict extension whitelisting (`.mp3`, `.wav`, `.ogg`, `.m4a`, `.aac`), file path sanitization against directory traversal, and isolate 50MB payload limits strictly to upload routes. |
| **Sliding-Window Rate Limiting** | Express middleware limits consecutive requests per IP (15 req/min in production; 100 req/min in development) to defend against brute force and DDoS. |
| **HTTP Security Headers** | Strips `X-Powered-By`, injects `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and enforces explicit CORS whitelists. |
| **Runtime Crash Protection** | Top-level React `ErrorBoundary` intercepts uncaught component exceptions and presents a graceful recovery screen without unmounting candidate sessions. |

---

## 🏗️ System Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Vite + React 19)                      │
│   Landing Page • Steno Vault • Typing Studio • Exam Engine • Admin     │
│   Warm Stone & Cashmere CSS • jsPDF Engine • Shorthand HTML5 Canvas    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST APIs (JSON)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js + Express 4.x)                    │
│   Security Headers • Rate Limiter • JWT Auth • Body Parsers (100KB)    │
│   Routes: /auth • /classes • /courses • /tests • /payment • /admin     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ SQL Queries (Promise-based)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA PERSISTENCE LAYER                          │
│   Primary Production: PostgreSQL Connection Pool                       │
│   Fallback / Development: SQLite 3 Engine with WAL Journaling          │
└────────────────────────────────────────────────────────────────────────┘
```

- **Frontend Core**: React 19, Vite 8.3, Lucide React, jsPDF, jspdf-autotable, html2canvas, canvas-confetti.
- **Backend Core**: Node.js, Express, jsonwebtoken, bcryptjs, multer, cors.
- **Database**: SQLite3 (Embedded with WAL mode) and PostgreSQL (`pg` pool).

---

## 📂 Project Directory Structure

```text
Ew/
├── index.html                   # HTML5 Entrypoint with PWA & OpenGraph Meta
├── package.json                 # Project dependencies & automation scripts
├── vite.config.js               # Vite bundler configuration & proxy routes
├── .env.example                 # Environment variables blueprint
├── setup-local-postgres.sh      # Automated PostgreSQL setup utility
│
├── public/                      # Static assets served at root
│   ├── assets/                  # Hero banners, Kruti Dev font, audio samples
│   │   ├── sample-dictation.mp3       # English dictation audio
│   │   ├── sample-dictation-hindi.mp3 # Hindi dictation audio
│   │   └── Kruti-Dev-010.ttf          # Authentic Hindi typing font
│   └── favicon.svg              # Brand SVG favicon
│
├── server/                      # Express REST API Backend
│   ├── index.js                 # Server entrypoint & middleware mounting
│   ├── config.js                # Port, JWT secret, and database configuration
│   ├── db/                      # Database initialization, schemas & seeds
│   │   ├── database.js          # Unified DB adapter (PostgreSQL + SQLite)
│   │   ├── schema.sql           # Canonical relational database DDL
│   │   └── seed.js              # Seed data for courses, tests, and users
│   ├── middleware/              # Auth, rate limiting, and security headers
│   │   ├── auth.js              # JWT token verification & admin guards
│   │   ├── rateLimit.js         # Sliding-window IP rate limiter
│   │   └── securityHeaders.js   # HTTP defense headers & CORS
│   ├── routes/                  # Express API resource routers
│   │   ├── admin.js             # Director roster, audio upload & CSV export
│   │   ├── auth.js              # Register, login & cryptographic OTP reset
│   │   ├── classes.js           # Live online batches & Zoom links
│   │   ├── courses.js           # Course catalog CRUD
│   │   ├── payment.js           # Razorpay order creation & signature verify
│   │   └── tests.js             # Steno/typing tests & candidate history
│   └── uploads/                 # Storage for director audio dictations
│
├── src/                         # React 19 Frontend Application
│   ├── App.jsx                  # Main application controller & state store
│   ├── main.jsx                 # React root mounting with ErrorBoundary
│   ├── index.css                # Base stylesheet & font variables
│   ├── theme-tryhackme.css      # Warm Stone & Cashmere master theme
│   ├── components/              # Modular UI components
│   │   ├── ShorthandCanvas.jsx  # Interactive HTML5 stylus drawing canvas
│   │   ├── ExamEngine.jsx       # Real-time typing engine with draft recovery
│   │   ├── DictationRoom.jsx    # Speed player & audio playback HUD
│   │   ├── EvaluationResult.jsx # Forensic LCS diff transcript viewer
│   │   ├── ErrorBoundary.jsx    # Top-level crash protection screen
│   │   ├── AuthModal.jsx        # Login, registration & OTP reset modal
│   │   ├── CheckoutModal.jsx    # Razorpay pass subscription checkout
│   │   └── ProfileSettingsModal.jsx # Candidate profile & password settings
│   ├── views/                   # Full-page views
│   │   ├── LandingPage.jsx      # Academy homepage & student testimonials
│   │   ├── CoursesPage.jsx      # Academic programs & syllabus cards
│   │   ├── ClassesPage.jsx      # Daily batch schedules & whiteboard teaser
│   │   ├── StenoTestsPage.jsx   # Stenography audio exam test bank
│   │   ├── TypingTestsPage.jsx  # Typing speed studio with Kruti Dev / English
│   │   ├── ResultsHistoryPage.jsx # Candidate scorecards & PDF downloads
│   │   ├── DashboardView.jsx    # Candidate velocity radars & billing ledger
│   │   └── AdminPortalView.jsx  # Director management console
│   ├── services/                # API client abstraction layer
│   │   └── api.js               # Frontend fetch wrapper with JWT headers
│   └── utils/                   # Pure business logic utilities
│       ├── diffEvaluation.js    # LCS word alignment & error scoring algorithm
│       ├── pdfGenerator.js      # Scorecard dossier & diploma PDF exports
│       └── soundEngine.js       # Web Audio API mechanical keyboard clicks
│
└── scratch/                     # Automated QA integration test scripts
    └── test-full-workflows.mjs  # 18-suite full-stack automated test runner
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
Ensure you have the following installed on your operating system:
* **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
* **npm**: `v9.0.0` or higher
* **Web Browser**: Google Chrome, Mozilla Firefox, Brave, or Microsoft Edge.

### 2. Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/codemonkx/shorthandplus.git
cd shorthandplus

# Install all npm dependencies
npm install
```

### 3. Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```
*(The defaults are pre-configured to run out of the box with embedded SQLite.)*

### 4. Run the Full-Stack Application
Start both the backend API server and the frontend client simultaneously with a single command:
```bash
npm run dev:all
```

Alternatively, run them in separate terminal windows:
* **Terminal 1 (Backend API):**
  ```bash
  npm run server
  ```
  *Server active at `http://localhost:5000` (API mounted at `/api`)*
* **Terminal 2 (Frontend Client):**
  ```bash
  npm run dev
  ```
  *Frontend active at `http://localhost:5173`*

Open your browser and navigate to **`http://localhost:5173`**.

---

## ⚙️ Environment Configuration

All environment configuration options are documented in [`.env.example`](.env.example):

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port for the Express backend server. |
| `NODE_ENV` | `development` | Environment mode (`development` or `production`). |
| `JWT_SECRET` | `shorthand_plus_enterprise_jwt_secret_key_2026` | Cryptographic secret for signing candidate JWT tokens. |
| `ADMIN_PIN` | `8080` | Faculty master passcode required for director clearance. |
| `DATABASE_URL` | *(Empty / SQLite)* | PostgreSQL connection URI (`postgresql://user:pass@host:5432/dbname`). If omitted, uses embedded SQLite WAL. |
| `RAZORPAY_KEY_ID` | `rzp_test_mock_shorthand_plus` | Razorpay Merchant Key ID. |
| `RAZORPAY_KEY_SECRET` | `mock_secret_key_shorthand_plus_2026` | Razorpay Merchant Secret for HMAC signature verification. |

---

## 🔑 Pre-Configured Demo Accounts

For immediate evaluation, the database is pre-seeded with the following credentials:

| Role | Email / ID | Password / PIN | Description & Access Level |
| :--- | :--- | :--- | :--- |
| **Student** | `shadabca@gmail.com` | `shadab12345` | Active 12-Month Pro Pass. Full access to steno dictations, typing studio, and historical scorecards. |
| **Faculty Director (Admin)** | `admin@gaya.com` | `8080` | Master Administrative Clearance. Access to student roster, exam management, audio uploads, and CSV exports. |

*(You can also use the one-click **"Auto-Fill Demo"** button directly inside the Login modal.)*

---

## 🧪 Automated QA & Integration Testing

The project includes an end-to-end integration test suite that tests all 18 backend workflows over real HTTP connections:

```bash
# Ensure server is running on http://localhost:5000, then execute:
node scratch/test-full-workflows.mjs
```

### Test Suite Coverage:
1. `System Health & Security Headers` (Checks HTTP 200, nosniff, and SAMEORIGIN)
2. `Candidate Registration` (Verifies password hashing and JWT issuance)
3. `Duplicate Registration Rejection` (Enforces 409 Conflict)
4. `Candidate Login with Valid Credentials` (Verifies token generation)
5. `Candidate Login Rejection` (Enforces 401 Unauthorized on invalid passwords)
6. `Director Authentication with ADMIN_PIN` (Verifies administrative elevation)
7. `Admin Backdoor Rejection` (Confirms removal of hardcoded bypasses)
8. `Admin Verify-PIN Endpoint` (Validates director modal unlock)
9. `Password Reset OTP Lifecycle` (Tests 6-digit generation, expiration & anti-replay)
10. `Candidate Profile Update & Change Password` (Verifies profile mutations)
11. `Courses Catalog & Admin Management` (Tests public retrieval and CRUD)
12. `Live Classes Access Gating` (Verifies batch retrieval and live toggling)
13. `Tests Retrieval & Admin Management` (Tests steno and typing test banks)
14. `Audio File Upload Validation` (Validates MP3 upload & rejects malicious extensions)
15. `Exam Result Submission & History Verification` (Verifies LCS scoring persistence)
16. `Payment Lifecycle & Signature Verification` (Tests Razorpay order & HMAC verification)
17. `Admin Student Roster & CSV Formula Guard` (Tests student records & formula sanitization)
18. `Cleanup Test Artifacts` (Automated cleanup of temporary test uploads)

---

## 📜 Production Build & Deployment

To generate an optimized production bundle:

```bash
# 1. Compile and minify client assets
npm run build

# 2. Preview the production build locally
npm run preview
```

### Deployment Guidelines:
* **Vercel / Netlify**: Configure `dist/` as the publish directory and set rewrite rules to `index.html` for single-page routing.
* **Node.js / Docker**: Run `npm run build`, point Express to serve static files from `dist/`, and run `npm run server`. Set `NODE_ENV=production` and supply a managed PostgreSQL URI in `DATABASE_URL`.

---

## 📄 License & Credits

- **Institution**: Gaya Shorthand Classes, Gaya, Bihar (ESTD. 2008).
- **Chief Examiner & Director**: Dr. Gagan Kumar.
- **Platform Architecture**: Shorthand Plus Enterprise Full-Stack Engine.
- **License**: Proprietary educational software developed for Gaya Shorthand Classes.
