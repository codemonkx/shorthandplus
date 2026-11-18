# Shorthand Plus (Gaya Shorthand Classes) 🏛️

> **The Gold Standard in Stenography & Typing for Government Examinations**  
> Guided by **Shadab Sir (12+ Years Experience)** • Gaya College More, Opposite Cyber Thana, Gayaji, Bihar.  
> Official Website: [https://stenoplus.in](https://stenoplus.in) • Helpline: **+91 9204123453** / **+91 7870377214**

---

## 📌 About The Platform

**Shorthand Plus** is a full-stack web platform built for government stenographer and typing aspirants preparing for:
- **SSC Stenographer Grade C & D** (80 & 100 WPM)
- **High Court Benches** (Patna High Court, Jharkhand High Court, Delhi High Court)
- **Supreme Court of India** (Stenographer & Senior Personal Assistant)
- **Central & State Exams** (BSF, CRPF ASI Steno, Civil Courts, BSSC, UPSSSC)

---

## ✨ Key Features

- **🎙️ Calibrated Audio Dictation Room:** 50–140 WPM speech audio player with pitch preservation, 5-minute silent reading room countdown, and interactive digital whiteboard notepad.
- **⌨️ Bilingual Typing Studio:** Practice in **English QWERTY**, **Hindi Kruti Dev 010**, and **Hindi Mangal Inscript** with an on-screen Alt-Code modal (`Alt+0216`, `Alt+0228`, etc.) for complex conjuncts.
- **📊 Automated SSC Error Evaluation:** Instant Longest Common Subsequence (LCS) diff calculation grading full mistakes (omissions, substitutions, additions) and half mistakes (spelling, capitalization) with $\le 7\%$ qualification cutoffs.
- **📜 Official Scorecard PDF Export:** Download official A4 candidate merit scorecards with error breakdown and verified credentials via client-side `jsPDF`.
- **🔴 Google Meet Live Classes:** Daily morning (07:00 AM) and evening (06:00 PM) live batches with Google Meet integration and automatic 30-second live status synchronization.
- **📝 Online Admissions & Free Demos:** Dedicated admission form with instant reference numbers (`GSC-ADM-XXXX`), printable admission slips, and WhatsApp integration.
- **💳 Instant Fee Payment:** Direct UPI QR payments (`919204123453@paytm`) and pass activations (₹30 1-Day, ₹350 1-Month, ₹1,100 6-Month, ₹2,000 1-Year).
- **🛡️ Director Admin Portal:** Protected by Director PIN (`7860`). Manage candidates, schedule live classes, upload audio dictations, and export CSV reports.

---

## 🚀 Quick Start (Run Locally)

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/codemonkx/shorthandplus.git
cd shorthandplus

# Install dependencies
npm install
```

### 3. Start Development Servers
```bash
# Runs Express backend (:5000) and Vite React frontend (:5173) together
npm run dev:all
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 Demo Logins

| Role | Email / Access | Password / PIN | Capabilities |
| :--- | :--- | :--- | :--- |
| **Director / Faculty** | `stenoplus.in@gmail.com` | PIN: **`7860`** | Full admin control, live class scheduler, student roster, tests |
| **Student (Demo)** | `student@stenoplus.in` | **`student123`** | Full access to tests, typing studio, live batches, scorecards |

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 8, Lucide Icons, jsPDF, Canvas Confetti.
- **Backend:** Node.js, Express, JWT Authentication, Nodemailer.
- **Database:** Dual engine with auto-fallback:
  - **Embedded SQLite (WAL mode):** Works out-of-the-box (`server/data/shorthand.db`).
  - **PostgreSQL:** Automatically used when `DATABASE_URL` is configured in `.env`.
- **Styling:** Custom Warm Stone & Charcoal design system with full mobile responsiveness.

---

## 📂 Project Structure

```
├── public/                 # Static audio files, logos, PWA manifest, _redirects
├── server/
│   ├── config.js           # Server configuration & environment variables
│   ├── db/                 # Database initialization, SQLite & PostgreSQL schemas, seeds
│   ├── routes/             # API routes (auth, classes, courses, tests, admin, payment)
│   └── index.js            # Express server entry point
├── src/
│   ├── components/         # Reusable UI components & modals (Navbar, Modals, Engines)
│   ├── data/               # Mock courses, tests, and official FAQs
│   ├── services/           # Unified frontend API client
│   ├── utils/              # LCS evaluation diff engine, PDF generator, sound engine
│   ├── views/              # Main page views (Landing, Courses, Classes, Dashboard, etc.)
│   └── App.jsx             # Main router with React.lazy code splitting
└── README.md
```

---

## 📞 Academy Contact & Offline Center

- **Institute:** Gaya Shorthand Classes (Shorthand Plus)
- **Address:** Gaya College More, Opposite Cyber Thana, Gayaji, Bihar - 823001
- **Helpline:** +91 9204123453 / +91 7870377214
- **Email:** stenoplus.in@gmail.com
- **Website:** [https://stenoplus.in](https://stenoplus.in)
