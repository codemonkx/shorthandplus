# Shorthand Plus — Project Todo & Implementation Tracker

## 📌 Pending & Actionable Items

### 🔴 High Priority / Awaiting User SMTP Credentials
- [ ] **Live Outbound Email (SMTP) Delivery Configuration**
  - **Status**: Backend transport engine implemented (`server/services/emailService.js`); awaiting active SMTP credentials in `.env`.
  - **Requirement**: Provide valid credentials (`SMTP_USER` and `SMTP_PASS`, e.g., a 16-character Google App Password or Brevo/SendGrid API key) in `.env` to enable real network transmission of 6-digit OTP codes to candidates' actual email inboxes (such as `nithinx002@gmail.com`).
  - **Verification Step**: Send a live test recovery email to candidate inbox, verify receipt within 10 seconds, and complete password reset.

---

## ✅ Completed & Verified Workflows

- [x] **Target Examinations & Government Recruitment Coverage (कौन-कौन सी परीक्षाओं की तैयारी कराई जाती है?)**
  - Title: **कौन-कौन सी परीक्षाओं की तैयारी कराई जाती है?**
  - Details: `Our courses provide skill-based training for various government stenographer and typing examinations.`
  - Integrated all 9 target examination benches across the platform:
    1. **SSC Stenographer Grade C & D** (Staff Selection Commission, 80 & 100 WPM)
    2. **Supreme Court Stenographer** (Apex Court Judicial Bench, 100 & 120 WPM)
    3. **Supreme Court SPA** (Senior Personal Assistant, 110 & 120 WPM)
    4. **Delhi High Court PA / SPA** (Personal Assistant & SPA Judicial Bench)
    5. **Patna High Court Stenographer** (80 & 100 WPM Courtroom Transcription)
    6. **Jharkhand High Court Stenographer** (Dual Hindi Kruti Dev/Mangal & English)
    7. **BSF Stenographer** (Border Security Force / Paramilitary)
    8. **CRPF Stenographer** (Central Reserve Police Force / ASI Steno)
    9. **Other State Government Stenographer Exams** (BSSC, UPSSSC, Vidhan Sabha & Subordinate Civil Courts)
  - Synchronized across:
    - Centralized `TARGET_EXAMINATIONS` in `src/data/mockData.js`.
    - Dedicated interactive section and primary FAQ in `src/views/LandingPage.jsx`.
    - Dedicated exam coverage section in `src/views/AboutAcademyView.jsx`.
    - Dedicated exam overview strip in `src/views/CoursesPage.jsx`.
    - Target Exam Benches navigation list in `src/components/Footer.jsx`.
    - Custom responsive CSS with Warm Stone styling in `src/App.css`.

- [x] **Institute Highlights & Official Address (GAYA SHORTHAND CLASSES)**
  - Institute: **GAYA SHORTHAND CLASSES (SHORTHAND PLUS)**
  - Official Motto & Slogan: **"Learn Today, Lead Tomorrow!"**
  - Experienced Head Faculty: **Shadab Sir (12 Years Experience)**
  - Exact Official Address: **Gaya College More, Opp. Cyber Thana, Gaya, Bihar**
  - Official Contact: **9204123453** (+91 9204123453) | Website: **https://stenoplus.in** | Email: **stenoplus.in@gmail.com**
  - Integrated all 8 Institute Highlights across `LandingPage.jsx`, `AboutAcademyView.jsx`, `Footer.jsx`, and `ClassesPage.jsx`:
    1. Experienced Faculty – Shadab Sir (12 Years Experience)
    2. Basic to Advanced Training (50–140 WPM Speed in Shorthand)
    3. Audio-Visual Classroom (Digital presentations & on-screen interactive guidance)
    4. Online Typing & Accuracy Software (Kruti Dev, Mangal & English QWERTY engines)
    5. Regular Dictation Practice (Daily progressive parliamentary, editorial & court judgments)
    6. Exam-Oriented Mock Tests (Exact SSC & High Court simulation with backspace lock & 5-min clock)
    7. Individual Performance Monitoring (AI-based real-time evaluation & word error scoring)
    8. SSC, High Court and Other Government Exam Preparation (Targeted batches for Court, SSC & PS roles)
  - Synchronized across `LandingPage.jsx`, `AboutAcademyView.jsx`, `Footer.jsx`, `ClassesPage.jsx`, `LegalPolicyModal.jsx`, and `emailService.js`.

- [x] **Official Course & Subscription Pass Pricing (Rate Sheet Update)**
  - Synchronized exact handwritten rates from the official rate card across `PRICING_PLANS`, `INITIAL_ACADEMY_COURSES`, `LandingPage.jsx`, `CoursesPage.jsx`, `AdminPortalView.jsx`, `seed.js`, and SQLite table `courses`:
    1. **1-Day Skill Sprint Pass** (`plan-1day`): Updated from ₹20 -> **₹30** (1 Day Unlimited Shorthand + Typing Tests with Live + Recording).
    2. **1-Month Test Series Pass** (`plan-1mo`): Updated from ₹249 -> **₹350** (1 Month Unlimited Shorthand + Typing Tests with Live + Recording).
    3. **6-Month Pro Scholar Pass** (`plan-6mo`): Updated from ₹899 -> **₹1,100** (6 Month Unlimited Shorthand + Typing Tests with Live + Recording).
    4. **12-Month Annual Career Master Pass** (`plan-12mo`): Updated from ₹1,200 -> **₹2,000** (12 Month Unlimited Shorthand + Typing Tests with Live + Recording).
    5. **Patna High Court Special Batch** (`plan-patna-hc`): **₹700 / Month** (Authentic Criminal & Civil Judgment Audio, strict court simulation).
    6. **Jharkhand High Court Special Batch** (`plan-jharkhand-hc`): **₹700 / Month** (Dual Hindi Engine Kruti Dev 010 & Mangal, strict backspace lock).
    7. **Basic Pitman Shorthand Course** (`course-pitman` & `plan-pitman`): Updated from ₹6,000 Complete Book -> **₹4,500**; duration updated to **3 to 4 Months Only** with Live + Recording, Homework Daily Correction.
    8. **SSC Stenographer Grade C & D Batch** (`course-ssc`): Synchronized monthly pass fee to **₹350 / Month**.
  - Integrated "WhatsApp Now" action buttons linking directly to Helpline `+91 9204123453` with pre-filled enrollment messages on all subscription and course cards.
  - Updated category switcher counters (`All Options (7)`, `Test Series Passes (4)`, `Special Batches & Masterclasses (3)`).
  - Synchronized authoritative database table `courses` in `server/data/shorthand.db` for zero payment discrepancy during order verification.

- [x] **Official Institute Identity & Key Highlights (SHORTHAND PLUS)**
  - Integrated official brand statement: `SHORTHAND PLUS is a professional training center (OFFLINE/ONLINE) dedicated to enhancing typing, shorthand, and computer skills with a modern approach to learning.`
  - Added full offerings scope: `Shorthand, Typing, and Advanced Diploma in Computer Applications (ADCA), DCA, TALLY etc., designed to help students build speed, accuracy, and efficiency for career growth in Government and private sectors.`
  - Integrated all 5 Key Highlights across `LandingPage.jsx` and `AboutAcademyView.jsx`:
    1. Audio-Visual Learning (digital presentations, on-screen guidance, interactive visuals)
    2. AI-Based Dictation Practice (simulating real dictation scenarios with instant feedback)
    3. Expert Trainers (step-by-step techniques for developing speed tailored to learner's pace)
    4. Comprehensive Curriculum (ADCA covering MS Office, Internet Applications, Tally, etc.)
    5. Career-Oriented Training (stenographer exams, data entry jobs, clerical roles)
  - Updated speed capability to **Basic to Advance 50 WPM to 140 WPM in Shorthand** with **AI-Based Dictation & Real-Time Evaluation**.
  - Updated official contact details platform-wide:
    - Helpline: `+91 9204123453`
    - Email: `stenoplus.in@gmail.com`
    - Website: `https://stenoplus.in`
    - Offline Center: `Gaya Shorthand Classes, Near Railway Station / Tower Chowk, Gaya, Bihar - 823001`
  - Propagated to `Footer.jsx`, `LandingPage.jsx`, `AboutAcademyView.jsx`, `CoursesPage.jsx`, `LegalPolicyModal.jsx`, `emailService.js`, `mockData.js`, and database `courses`.

- [x] **Canonical Course List — Website & Admission Form (S.No. 1 to 5)**
  - Synchronized official 5-course list across website catalog, filters, database, and admission registration forms:
    - **1. English Shorthand** (Pitman Shorthand Basic to Advance)
    - **2. Hindi Shorthand** (हिंदी आशुलिपि & Court Special)
    - **3. English Typing** (& Computer Typing Skills, 30-60+ WPM)
    - **4. Hindi Typing** (Kruti Dev 010 & Mangal Inscript)
    - **5. English & Hindi Typing** (Combined Dual-Language Mastery)
  - Updated **Admission Registration Forms**:
    - `AuthModal.jsx` registration modal now provides target admission course selection matching S.No. 1 to 5.
    - `LandingPage.jsx` hero candidate admission box now directly offers S.No. 1 to 5 course selection.
  - Added dedicated **Course List — Website / Admission Form** interactive panel in `CoursesPage.jsx`.
  - Added Course #5 (`course-bilingual-typing`) across `mockData.js`, `CoursesPage.jsx`, `LandingPage.jsx`, `seed.js`, and live SQLite `courses` table.

- [x] **Course #4: Hindi Typing & Hindi Computer Typing**
  - Course Name: `Hindi Typing & Hindi Computer Typing`.
  - Details: `Learn Hindi typing with practical keyboard training and regular typing exercises. This course is designed for students preparing for government typing examinations and office-related computer work.`
  - Added all 9 Curriculum Features:
    1. Hindi Keyboard Introduction
    2. Kruti Dev Typing
    3. Mangal Font Typing
    4. Remington Keyboard Layout
    5. Word and Sentence Practice
    6. Paragraph Typing
    7. Speed and Accuracy Development
    8. Online Hindi Typing Software
    9. Government Exam-Oriented Practice
  - Propagated across `src/data/mockData.js`, `src/views/CoursesPage.jsx` (with dedicated Hindi Typing filter pill), `src/views/LandingPage.jsx`, `server/db/seed.js`, and live SQLite `courses` table.

- [x] **Course #3: English Typing & Computer Typing Skills**
  - Course Name: `English Typing & Computer Typing Skills`.
  - Details: `Develop professional English typing skills with proper finger placement, keyboard techniques and regular practical exercises. This course focuses on typing speed, accuracy and computer-based typing examination preparation.`
  - Added all 10 Curriculum Features:
    1. Keyboard Introduction
    2. Home Row and Finger Placement
    3. Touch Typing Techniques
    4. Word and Sentence Practice
    5. Paragraph Typing
    6. Speed Building Exercises
    7. Accuracy Improvement
    8. Online Typing Software Practice
    9. Computer-Based Typing Tests
    10. Speed Target: 30, 35, 40, 50 and 60+ WPM
  - Propagated across `src/data/mockData.js`, `src/views/CoursesPage.jsx` (with dedicated English Typing filter pill), `src/views/LandingPage.jsx`, `server/db/seed.js`, and live SQLite `courses` table.

- [x] **Course #2: Hindi Shorthand (हिंदी आशुलिपि)**
  - Course Name: `Hindi Shorthand (हिंदी आशुलिपि)`.
  - Details: `Learn Hindi Shorthand from Basic to Advanced Level through practical classes, regular dictation and transcription practice. This course is designed for students preparing for Hindi Stenographer, Court Stenographer and various government recruitment examinations.`
  - Added all 10 Curriculum Features:
    1. Basic Hindi Shorthand Theory
    2. Hindi Shorthand Signs and Symbols
    3. Vowels and Consonants (स्वर एवं व्यंजन)
    4. Word Formation and Sentence Writing
    5. Shorthand Rules and Principles
    6. Daily Hindi Dictation Practice
    7. Speed Practice (50, 80, 100 & 120 WPM)
    8. Reading and Transcription (Kruti Dev 010 & Mangal)
    9. Accuracy Improvement Techniques
    10. Exam-Oriented Practice Tests
  - Propagated across `src/data/mockData.js`, `src/views/CoursesPage.jsx` (with dedicated Hindi filter pill), `src/views/LandingPage.jsx`, `server/db/seed.js`, and live SQLite `courses` table.

- [x] **Course #1: English Shorthand (Pitman Shorthand)**
  - Updated title: `English Shorthand (Pitman Shorthand)`.
  - Added full comprehensive course description tailored for SSC Stenographer, High Court Stenographer, PA, PS, and government exams.
  - Added all 11 curriculum features: Basic to Advanced Shorthand Training, Pitman Shorthand Theory, Consonants and Vowels, Grammalogues and Phraseography, Short Forms and Special Rules, Word Formation and Sentence Practice, Daily Dictation Practice, Speed Development (60, 80, 100, 120 WPM), Transcription Practice, Exam-Oriented Mock Tests, and Accuracy Improvement Techniques.
  - Propagated across `src/data/mockData.js`, `src/views/CoursesPage.jsx`, `src/views/LandingPage.jsx`, and SQLite `courses` table.

- [x] **National All-India Mock Test Leaderboard & Rankings**
  - Built dedicated `LeaderboardView.jsx` with Top 3 Champions Podium (Gold #1, Silver #2, Bronze #3), speed & accuracy metrics, and category filtering (All-India, Steno Dictations, Typing Studio).
  - Implemented `GET /api/tests/leaderboard` in backend joining user profiles with real test scores.
  - Linked in `Sidebar.jsx`, `Navbar.jsx` user dropdown, and `App.jsx`.

- [x] **Official 5-Minute Silent Reading Room Phase**
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
