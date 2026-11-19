import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Clock, 
  Users, 
  ChevronDown, 
  ChevronUp,
  MessageCircle,
  Phone, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Check, 
  ExternalLink,
  Headphones, 
  Keyboard, 
  Layers, 
  FileText, 
  Zap, 
  Tv, 
  Cpu, 
  Briefcase, 
  Globe
} from 'lucide-react';
import { TARGET_EXAMINATIONS } from '../data/mockData';
import '../landing-redesign.css';

const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const YouTubeIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
    <path fill="#FFFFFF" d="m9.545 15.568 6.273-3.568-6.273-3.568z"/>
  </svg>
);

const TOP_FAQS = [
  {
    id: 1,
    q: "What is the duration of the shorthand course?",
    a: "The duration of the shorthand course depends on the student's learning speed and practice level. The Basic Pitman course typically takes 3 to 4 months for complete book coverage. We provide systematic training from basic to advanced levels (50 to 140 WPM), focusing on speed, accuracy, and exam preparation."
  },
  {
    id: 2,
    q: "Can beginners join shorthand classes?",
    a: "Yes! Beginners are welcome. No prior knowledge of shorthand is required. We start from the absolute basics (strokes, consonants, vowels) and gradually develop students' skills through regular daily practice and personalized notebook checking."
  },
  {
    id: 3,
    q: "Is English shorthand taught from the basic level?",
    a: "Yes. English shorthand is taught from the absolute beginner level covering basic Pitman strokes, consonants, vowels, word formation, phrases, grammalogues, and progressing up to advanced 120+ WPM dictations."
  },
  {
    id: 4,
    q: "Do you provide Hindi shorthand classes?",
    a: "Yes. We provide complete Hindi shorthand training starting from fundamentals (स्वर एवं व्यंजन) and progressing towards higher speed (50 to 120+ WPM) with Kruti Dev 010 and Mangal Inscript typing and legal judgment dictations."
  },
  {
    id: 5,
    q: "Are demo classes available before enrollment?",
    a: "Yes! We offer 3 Free Demo Classes so that students can experience our teaching methodology, interactive classroom environment, and modern typing lab before paying any admission fee."
  }
];

export default function LandingPage({ 
  onStartFullTest, 
  onOpenAuth, 
  onLoginSuccess, 
  onOpenCheckout, 
  onSelectPlan, 
  onOpenAdmission, 
  setCurrentTab 
}) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isPlayingYouTube, setIsPlayingYouTube] = useState(false);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleEnrollClick = (courseTitle) => {
    fireConfetti();
    if (onOpenAdmission) {
      onOpenAdmission();
    }
  };

  const coursesList = [
    {
      id: "eng-steno",
      badge: "Flagship Shorthand",
      badgeColor: "#F59E0B",
      title: "English Shorthand (Pitman)",
      subtitle: "Basic Pitman theory to 120 WPM exam dictations",
      price: "₹4,500",
      originalPrice: "₹6,000",
      duration: "3 to 4 Months",
      speed: "50 to 120 WPM",
      highlights: [
        "Complete Pitman theory, grammalogues & phraseography",
        "Daily handwritten outline verification by Shadab Sir",
        "Audio dictations from 50 to 120 WPM with reading room",
        "Targeted for SSC Steno Grade C & D, High Court & PA/PS"
      ]
    },
    {
      id: "hindi-steno",
      badge: "High Court & SSC Special",
      badgeColor: "#10B981",
      title: "Hindi Shorthand (हिंदी आशुलिपि)",
      subtitle: "Complete Hindi theory & speed dictation batch",
      price: "₹4,500",
      originalPrice: "₹6,000",
      duration: "3 to 4 Months",
      speed: "50 to 120+ WPM",
      highlights: [
        "Complete Hindi steno rules (स्वर, व्यंजन एवं आंकड़े)",
        "Daily Hindi audio dictations with outline checking",
        "Kruti Dev 010 & Mangal Inscript dual transcription",
        "Specialized for Patna High Court, Civil Courts & SSC"
      ]
    },
    {
      id: "typing-combo",
      badge: "Dual-Font Typing Lab",
      badgeColor: "#3B82F6",
      title: "English & Hindi Typing Lab",
      subtitle: "QWERTY, Kruti Dev 010 & Mangal Inscript",
      price: "₹350",
      originalPrice: "₹500",
      duration: "1 Month Pass",
      speed: "30 to 60+ WPM",
      highlights: [
        "Scientific touch-typing finger positioning mastery",
        "English QWERTY + Hindi Kruti Dev 010 & Mangal",
        "Strict backspace lock exam simulation software",
        "Automated gross & net WPM scoring with error calculation"
      ]
    },
    {
      id: "court-special",
      badge: "Judicial Bench Special",
      badgeColor: "#EC4899",
      title: "High Court Judicial Speed Series",
      subtitle: "Live courtroom judgments & legal transcription",
      price: "₹700",
      originalPrice: "₹1,000",
      duration: "1 Month Access",
      speed: "80 & 100 WPM Legal",
      highlights: [
        "Authentic High Court criminal & civil judgment audio",
        "Legal vocabulary, Latin maxims & judicial phrases",
        "5-Minute reading clock with strict audio warnings",
        "Official High Court mechanical keyboard simulation"
      ]
    },
    {
      id: "computer-diplomas",
      badge: "Govt. Recognized Certification",
      badgeColor: "#8B5CF6",
      title: "Computer Diplomas (ADCA / DCA)",
      subtitle: "6 to 12 Months Recognized Diplomas",
      price: "₹1,200",
      originalPrice: "₹1,500",
      duration: "6 / 12 Months",
      speed: "IT Skills + Typing",
      highlights: [
        "Official DCA (6 Months) & ADCA (12 Months) programs",
        "MS Office Suite (Word, Excel, PowerPoint) & Internet",
        "Tally Prime with GST invoicing & practical accounting",
        "Government recognized diploma with QR code verification"
      ]
    }
  ];

  return (
    <div className="sp-landing-root">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION — MIDNIGHT OBSIDIAN & GOLDEN ILLUMINATION
          ========================================================================= */}
      <section className="sp-hero-section">
        <div className="sp-hero-container">
          <div className="sp-hero-grid">
            
            {/* Left Column: Direct Value Proposition */}
            <div>
              {/* Institution Pill Badge */}
              <div className="sp-hero-pill-badge">
                <span className="sp-pulse-dot" />
                <span>Gaya Shorthand Classes · Est. 2012 · 12+ Years Coaching</span>
              </div>

              {/* Master Headline */}
              <h1 className="sp-hero-title">
                The Gold Standard in Shorthand & Typing for <span className="sp-title-gradient-gold">Government Exams</span>
              </h1>

              {/* Subtitle */}
              <p className="sp-hero-subtitle">
                Master Pitman Shorthand (50–140 WPM), bilingual computer typing (Kruti Dev & Mangal), and legal dictations. Complete preparation guided by <strong>Shadab Sir (12 Years Exp)</strong> at Gaya College More, backed by real-time automated SSC error evaluation.
              </p>

              {/* Hero CTA Cluster */}
              <div className="sp-hero-cta-cluster">
                <button
                  type="button"
                  className="sp-btn-gold"
                  onClick={() => {
                    if (setCurrentTab) setCurrentTab('tests');
                  }}
                >
                  <Headphones size={18} />
                  <span>Start Audio Dictation Practice</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="sp-btn-glass"
                  onClick={() => {
                    if (setCurrentTab) setCurrentTab('typing-studio');
                  }}
                >
                  <Keyboard size={18} />
                  <span>Try Typing Lab</span>
                </button>

                <button
                  type="button"
                  className="sp-btn-link-demo"
                  onClick={() => {
                    fireConfetti();
                    if (onOpenAdmission) onOpenAdmission();
                  }}
                >
                  <span>Book 3 Free Demos</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* 4 Precision Trust Metrics Ribbon */}
              <div className="sp-hero-stats-ribbon">
                <div className="sp-stat-item">
                  <div className="sp-stat-num">1,200+</div>
                  <div className="sp-stat-label">Govt. Selections</div>
                </div>
                <div className="sp-stat-item">
                  <div className="sp-stat-num">50–140</div>
                  <div className="sp-stat-label">WPM Calibrated Audio</div>
                </div>
                <div className="sp-stat-item">
                  <div className="sp-stat-num">98.5%</div>
                  <div className="sp-stat-label">Exam Accuracy Rate</div>
                </div>
                <div className="sp-stat-item">
                  <div className="sp-stat-num">4.9 ★</div>
                  <div className="sp-stat-label">Google Rating (140+ Revs)</div>
                </div>
              </div>

            </div>

            {/* Right Column: Courtroom Stenography Skill Simulator HUD */}
            <div>
              <div className="sp-hud-card">
                {/* HUD Header */}
                <div className="sp-hud-header">
                  <div className="sp-hud-window-controls">
                    <span className="sp-hud-dot" />
                    <span className="sp-hud-dot" />
                    <span className="sp-hud-dot" />
                    <span className="sp-hud-badge-live">
                      <span className="sp-pulse-dot" style={{ width: '6px', height: '6px' }} />
                      Two-Stage Exam Engine Live
                    </span>
                  </div>
                  <span className="sp-hud-tag-court">
                    SSC / Court Pattern
                  </span>
                </div>

                {/* Stage 1: Audio Track Waveform */}
                <div className="sp-hud-stage-box">
                  <div className="sp-hud-stage-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Headphones size={15} color="#F59E0B" />
                      <span className="sp-hud-track-title">
                        Patna High Court Bench 80 WPM
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2px 8px', borderRadius: '4px' }}>
                      Stage 1 Audio ✓
                    </span>
                  </div>

                  {/* Visual Equalizer Bars */}
                  <div className="sp-equalizer-bars">
                    {[40, 75, 100, 55, 90, 65, 80, 45, 95, 70, 85, 60, 90, 50, 75, 95, 65, 85, 45, 30, 80, 60].map((h, i) => (
                      <span key={i} className="sp-eq-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
                    ))}
                  </div>
                  <div className="sp-hud-subtext">
                    <span>05:00 Calibrated Dictation</span>
                    <span>Single-Play Strict Lock</span>
                  </div>
                </div>

                {/* Stage 2: Timed Typing Transcription Preview */}
                <div className="sp-hud-transcription-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Keyboard size={15} color="#94A3B8" />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#E2E8F0' }}>Stage 2: Transcription</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', fontFamily: 'JetBrains Mono, monospace', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '2px 8px', borderRadius: '4px' }}>
                      ⏱ 09:42 remaining
                    </span>
                  </div>
                  <p className="sp-typewriter-text">
                    "The learned counsel appearing on behalf of the appellant has contended that the High Court erred in law..."<span className="sp-cursor">&nbsp;</span>
                  </p>
                </div>

                {/* Instant Evaluation Scorecard */}
                <div className="sp-hud-scorecard-grid">
                  <div className="sp-hud-score-tile">
                    <span className="sp-score-label">Net Speed</span>
                    <span className="sp-score-val gold">84 WPM</span>
                  </div>
                  <div className="sp-hud-score-tile">
                    <span className="sp-score-label">Accuracy</span>
                    <span className="sp-score-val emerald">98.2%</span>
                  </div>
                  <div className="sp-hud-score-tile">
                    <span className="sp-score-label">Result</span>
                    <span className="sp-score-val emerald" style={{ fontSize: '0.95rem' }}>Qualified</span>
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  type="button"
                  className="sp-btn-gold"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setCurrentTab && setCurrentTab('tests')}
                >
                  <Headphones size={16} />
                  <span>Launch Audio Dictation Vault</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TARGET GOVERNMENT EXAM BENCHES STRIP
          ========================================================================= */}
      <section className="sp-benches-section">
        <div className="sp-benches-header">
          <span className="sp-section-pill">
            <ShieldCheck size={14} />
            Target Exam Benches
          </span>
          <h2 className="sp-benches-title">
            Tailored for High Courts, SSC & Judicial Benches
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#64748B', margin: 0 }}>
            Every dictation and typing passage is calibrated to match official recruitment standards:
          </p>
        </div>

        <div className="sp-benches-grid">
          {TARGET_EXAMINATIONS.slice(0, 8).map((exam) => (
            <div key={exam.id} className="sp-bench-card">
              <span className="sp-bench-court-badge">{exam.category || 'Judicial Exam'}</span>
              <h3 className="sp-bench-name">{exam.name}</h3>
              <p className="sp-bench-desc">{exam.shortDesc || exam.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE 3 CORE GATEWAYS (WHAT YOU CAN DO ON SHORTHAND PLUS)
          ========================================================================= */}
      <section className="sp-gateways-section">
        <div className="sp-section-heading-center">
          <span className="sp-section-pill">
            <Layers size={14} />
            Curriculum & Examination Tracks
          </span>
          <h2 className="sp-section-h2">
            Everything You Need to Clear Your Exam
          </h2>
          <p className="sp-section-lead">
            Whether you want to practice high-speed audio dictations, master computer typing, or learn shorthand from scratch — select below:
          </p>
        </div>

        <div className="sp-gateways-grid">
          {/* Gateway 1: Dictation Vault */}
          <div className="sp-gateway-card">
            <span className="sp-gateway-badge">Standard SSC Benchmark</span>
            <div>
              <div className="sp-gateway-icon-box">
                <Headphones size={24} color="#D97706" />
              </div>
              <h3 className="sp-gateway-title">Audio Dictation Vault</h3>
              <p className="sp-gateway-desc">
                Calibrated <strong>80, 100, 120, 140 WPM</strong> voice dictations. Follows strict examination rules: audio plays once without rewind, followed by a timed typing screen and automated SSC mistake scoring.
              </p>
              <ul className="sp-gateway-features">
                {[
                  "Patna High Court & SSC Standard Audio Tracks",
                  "Single-Play Anti-Cheating Protocol",
                  "Instant LCS Word-by-Word Diff Evaluation"
                ].map((feat, i) => (
                  <li key={i} className="sp-gateway-feature-item">
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="sp-btn-gateway"
              onClick={() => setCurrentTab && setCurrentTab('tests')}
            >
              <span>Launch Dictation Vault</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Gateway 2: Typing Studio */}
          <div className="sp-gateway-card">
            <span className="sp-gateway-badge">Bilingual Engine</span>
            <div>
              <div className="sp-gateway-icon-box">
                <Keyboard size={24} color="#2563EB" />
              </div>
              <h3 className="sp-gateway-title">Computer Typing Studio</h3>
              <p className="sp-gateway-desc">
                Practice typing in <strong>English, Hindi (Kruti Dev 010), and Hindi (Mangal Inscript)</strong>. Features authentic exam controls including strict backspace locking and real-time Net WPM calculation.
              </p>
              <ul className="sp-gateway-features">
                {[
                  "Kruti Dev 010 & Mangal Inscript Dual Support",
                  "Configurable Backspace Lock (Strict Exam Mode)",
                  "Official Court Passage Test Bank"
                ].map((feat, i) => (
                  <li key={i} className="sp-gateway-feature-item">
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="sp-btn-gateway"
              onClick={() => setCurrentTab && setCurrentTab('typing-studio')}
            >
              <span>Enter Typing Studio</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Gateway 3: Offline Coaching */}
          <div className="sp-gateway-card">
            <span className="sp-gateway-badge">Gaya Center</span>
            <div>
              <div className="sp-gateway-icon-box">
                <GraduationCap size={24} color="#7C3AED" />
              </div>
              <h3 className="sp-gateway-title">Classroom & Offline Coaching</h3>
              <p className="sp-gateway-desc">
                Under <strong>Shadab Sir (12 Years Exp)</strong> at Gaya College More. Daily handwriting outline checks, physical dictation speed batches, and full computer typing lab access.
              </p>
              <ul className="sp-gateway-features">
                {[
                  "Personalized Stroke Checking for Every Student",
                  "3 Free Trial Demo Classes Before Enrolling",
                  "Modern Computer Lab with Mechanical Keyboards"
                ].map((feat, i) => (
                  <li key={i} className="sp-gateway-feature-item">
                    <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="sp-btn-gateway"
              onClick={() => {
                fireConfetti();
                if (onOpenAdmission) onOpenAdmission();
              }}
            >
              <span>Book 3 Free Demos</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HOW THE TWO-STAGE DICTATION EXAM WORKS (3 SIMPLE STEPS)
          ========================================================================= */}
      <section className="sp-workflow-section">
        <div className="sp-section-heading-center">
          <span className="sp-section-pill">
            <Zap size={14} />
            Simulated Test Protocol
          </span>
          <h2 className="sp-section-h2">
            How The Two-Stage Exam Engine Works
          </h2>
          <p className="sp-section-lead">
            We mirror the exact exam room procedure used by the Staff Selection Commission and High Court judicial recruitment boards:
          </p>
        </div>

        <div className="sp-workflow-grid">
          <div className="sp-workflow-card">
            <span className="sp-workflow-step-num">STAGE 01</span>
            <h3 className="sp-workflow-title">Listen & Take Shorthand Notes</h3>
            <p className="sp-workflow-desc">
              Listen to high-fidelity audio dictation calibrated to your target speed (80, 100, 120 WPM). You write notes in your shorthand notebook. The audio plays once with no rewind or pause.
            </p>
          </div>

          <div className="sp-workflow-card">
            <span className="sp-workflow-step-num">STAGE 02</span>
            <h3 className="sp-workflow-title">5-Minute Reading & Transcription</h3>
            <p className="sp-workflow-desc">
              A 5-minute reading clock allows you to review and punctuate your handwritten shorthand outlines before typing, exactly as required in SSC & Court examinations.
            </p>
          </div>

          <div className="sp-workflow-card">
            <span className="sp-workflow-step-num">STAGE 03</span>
            <h3 className="sp-workflow-title">Type & Instant SSC Scorecard</h3>
            <p className="sp-workflow-desc">
              Type your transcription on the timed screen. When you submit, our Longest Common Subsequence (LCS) engine instantly highlights Full Mistakes, Half Mistakes, Net WPM, and Qualifying Status.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: THE 5 CANONICAL COURSES & TRANSPARENT PRICING
          ========================================================================= */}
      <section className="sp-courses-section">
        <div className="sp-section-heading-center">
          <span className="sp-section-pill">
            <Award size={14} />
            Courses & Batches
          </span>
          <h2 className="sp-section-h2">
            The 5 Core Courses with Transparent Fees
          </h2>
          <p className="sp-section-lead">
            Choose your learning path. Every course includes daily practice, doubt-clearing sessions, and certified exam preparation.
          </p>
        </div>

        <div className="sp-courses-grid">
          {coursesList.map((course, idx) => {
            const isFeatured = idx === 0;
            return (
              <div key={course.id} className={`sp-course-card ${isFeatured ? 'featured' : ''}`}>
                {isFeatured && (
                  <div className="sp-course-featured-ribbon">
                    Most Popular Choice
                  </div>
                )}
                
                <div>
                  <div className="sp-course-badge-row">
                    <span className="sp-course-tag" style={{ color: course.badgeColor, background: `${course.badgeColor}15`, borderColor: `${course.badgeColor}30` }}>
                      {course.badge}
                    </span>
                    <span className="sp-course-speed">{course.speed}</span>
                  </div>

                  <h3 className="sp-course-title">{course.title}</h3>
                  <p className="sp-course-desc">{course.subtitle}</p>

                  <div className="sp-course-price-box">
                    <span className="sp-course-price-now">{course.price}</span>
                    <span className="sp-course-price-was">{course.originalPrice}</span>
                    <span className="sp-course-duration">/ {course.duration}</span>
                  </div>

                  <ul className="sp-course-features-list">
                    {course.highlights.map((item, i) => (
                      <li key={i} className="sp-course-feature-item">
                        <Check size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sp-course-actions-row">
                  <button
                    type="button"
                    className="sp-btn-enroll-card"
                    onClick={() => handleEnrollClick(course.title)}
                  >
                    <span>Enroll Now (3 Days Demo)</span>
                    <ArrowRight size={15} />
                  </button>

                  <a
                    href={`https://wa.me/919204123453?text=Hi%20Shadab%20Sir,%20I%20am%20interested%20in%20${encodeURIComponent(course.title)}%20at%20Gaya%20Shorthand%20Classes.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sp-btn-whatsapp-card"
                  >
                    <MessageCircle size={15} color="#10B981" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: 8-STEP TEACHING METHODOLOGY ROADMAP
          ========================================================================= */}
      <section className="sp-methodology-section">
        <div className="sp-section-heading-center">
          <span className="sp-section-pill">
            <BookOpen size={14} />
            Pedagogy & Curriculum
          </span>
          <h2 className="sp-section-h2">
            The 8-Step Path to Shorthand Mastery
          </h2>
          <p className="sp-section-lead">
            Developed over 12+ years of coaching hundreds of successful candidates across Bihar, Jharkhand, and Central government departments:
          </p>
        </div>

        <div className="sp-methodology-grid">
          {[
            {
              step: "01",
              title: "Basic Pitman Strokes",
              hindi: "मूल रेखाएँ एवं कोण",
              desc: "Consonants, straight and curved strokes, heavy and light lines, vowel placements, and positioning rules."
            },
            {
              step: "02",
              title: "Word Formation & Grammalogues",
              hindi: "शब्द निर्माण एवं चिन्ह",
              desc: "Joining strokes, logograms, short forms, and high-frequency contractions to build early muscle memory."
            },
            {
              step: "03",
              title: "Phraseography & Intersections",
              hindi: "वाक्यांश एवं अंतर्विच्छेदन",
              desc: "Joining words without lifting the pen — the secret technique that accelerates speed past 60 WPM."
            },
            {
              step: "04",
              title: "Kailash Chandra Dictations",
              hindi: "कैलाश चंद्र पत्रिका अभ्यास",
              desc: "Systematic dictation practice from Volumes 1 to 24, starting at 60 WPM and progressing to 100 WPM."
            },
            {
              step: "05",
              title: "High Court Legal Series",
              hindi: "उच्च न्यायालय विधिक आलेख",
              desc: "Judicial judgments, civil petitions, FIR vocabulary, and Latin maxims designed for High Court skill tests."
            },
            {
              step: "06",
              title: "Bilingual Typing Lab",
              hindi: "द्विभाषी टंकण प्रयोगशाला",
              desc: "Daily timed typing in English and Hindi (Kruti Dev 010 & Mangal) with strict backspace lock software."
            },
            {
              step: "07",
              title: "Full Two-Stage Mock Exams",
              hindi: "पूर्ण दो-चरणीय परीक्षा अभ्यास",
              desc: "Audio dictation with a single-play lock, 5-minute reading clock, timed transcription, and automated diff scoring."
            },
            {
              step: "08",
              title: "Individual Notebook Checking",
              hindi: "व्यक्तिगत उत्तर-पुस्तिका जांच",
              desc: "Daily personalized review of handwritten outlines by Shadab Sir to eliminate common angle and stroke errors."
            }
          ].map((item, idx) => (
            <div key={idx} className="sp-step-card">
              <span className="sp-step-num-badge">STEP {item.step}</span>
              <h3 className="sp-step-title">{item.title}</h3>
              <span className="sp-step-hindi">{item.hindi}</span>
              <p className="sp-step-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: LIVE GOOGLE MEET CLASSROOM STRIP
          ========================================================================= */}
      <section className="sp-live-banner-section">
        <div className="sp-live-banner-card">
          <div style={{ maxWidth: '720px' }}>
            <span className="sp-live-tag">
              <span className="sp-pulse-dot" style={{ width: '6px', height: '6px' }} />
              Live Online Interactive Batches
            </span>
            <h3 className="sp-live-title">
              Can't Visit Gaya Center? Join Live Online Classes
            </h3>
            <p className="sp-live-desc">
              Interactive Google Meet classes with screen sharing, live dictations, digital whiteboard outline checking, and real-time doubt resolution with <strong>Shadab Sir</strong>.
            </p>
          </div>
          <button
            type="button"
            className="sp-btn-gold"
            onClick={() => {
              if (setCurrentTab) setCurrentTab('classes');
            }}
          >
            <Tv size={18} />
            <span>View Online Class Schedule</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: WHY GAYA SHORTHAND CLASSES? (THE 4 PILLARS)
          ========================================================================= */}
      <section className="sp-gateways-section">
        <div className="sp-section-heading-center">
          <span className="sp-section-pill">
            <Sparkles size={14} />
            Institutional Excellence
          </span>
          <h2 className="sp-section-h2">
            Why Students Choose Gaya Shorthand Classes
          </h2>
          <p className="sp-section-lead">
            Four key pillars that have produced top rankers across SSC and High Court stenographer examinations:
          </p>
        </div>

        <div className="sp-pillars-grid">
          {[
            {
              icon: <Award size={24} />,
              title: "12+ Years Proven Track Record",
              desc: "Directed by Shadab Sir since 2012 with 1,200+ selections across SSC, Patna High Court, Civil Courts, and Secretariat."
            },
            {
              icon: <Cpu size={24} />,
              title: "Two-Stage AI-Powered Testing",
              desc: "Audio dictation with single-play lock, strict transcription timing, and automated word-by-word SSC error evaluation."
            },
            {
              icon: <Keyboard size={24} />,
              title: "Dedicated Bilingual Typing Lab",
              desc: "English and Hindi typing with dual-font support (Kruti Dev 010 and Mangal Inscript) and strict exam simulations."
            },
            {
              icon: <FileText size={24} />,
              title: "Individual Notebook Checking",
              desc: "Every student's shorthand notebook is checked daily by Shadab Sir to correct stroke angles, sizes, and positionings."
            }
          ].map((pillar, idx) => (
            <div key={idx} className="sp-pillar-card">
              <div className="sp-pillar-icon">{pillar.icon}</div>
              <h3 className="sp-pillar-title">{pillar.title}</h3>
              <p className="sp-pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CLASSROOM VIDEO DEMO & GOOGLE REVIEWS (SOCIAL PROOF)
          ========================================================================= */}
      <section className="sp-reviews-section">
        <div className="sp-section-heading-center">
          <span className="sp-section-pill">
            <Star size={14} />
            Verified Social Proof
          </span>
          <h2 className="sp-section-h2">
            See Our Classroom & Hear From Successful Students
          </h2>
          <p className="sp-section-lead">
            Over 140+ students have rated Gaya Shorthand Classes 4.9/5 on Google for authentic coaching and results.
          </p>
        </div>

        {/* Video Demo Container */}
        <div className="sp-video-container">
          {isPlayingYouTube ? (
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=1&rel=0"
                title="Gaya Shorthand Classes - Speed Dictation & Whiteboard Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          ) : (
            <div 
              className="sp-video-facade" 
              onClick={() => setIsPlayingYouTube(true)}
              title="Click to Play Classroom Demonstration Video"
            >
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80" 
                alt="Classroom Dictation Session Preview" 
                className="sp-video-thumb"
              />
              <div className="sp-play-badge">
                <Play size={28} fill="#070A12" style={{ marginLeft: '4px' }} />
              </div>
              <div className="sp-video-caption">
                <h4>Watch Classroom Speed Dictation Demo</h4>
                <p>Instructor: Shadab Sir (12 Years Exp) · Kailash Chandra 80 & 100 WPM Live Whiteboard Review</p>
              </div>
            </div>
          )}
        </div>

        {/* Student Testimonials Grid */}
        <div className="sp-reviews-grid">
          {[
            {
              name: "Anjali Verma",
              exam: "SSC Stenographer Grade C",
              rating: 5,
              text: "“Shadab Sir's daily dictation practice and 5-minute reading room made all the difference in my SSC skill test. Individual notebook checking helped fix my stroke angles completely!”"
            },
            {
              name: "Rakesh Kumar",
              exam: "Patna High Court Personal Assistant",
              rating: 5,
              text: "“The strict backspace lock simulation and legal judgment audio series mirrored the exact Patna High Court exam software. Cracked my exam with 98% accuracy!”"
            },
            {
              name: "Md. Tariq",
              exam: "Jharkhand High Court & Civil Courts",
              rating: 5,
              text: "“Best shorthand and typing institute in Gaya. The dual font support (Kruti Dev 010 and Mangal) in their computer lab is unmatched for judicial exam aspirants.”"
            }
          ].map((rev, i) => (
            <div key={i} className="sp-review-card">
              <div className="sp-stars-row">
                {[...Array(rev.rating)].map((_, s) => (
                  <Star key={s} size={15} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="sp-review-quote">{rev.text}</p>
              <div className="sp-reviewer-row">
                <div className="sp-reviewer-avatar">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className="sp-reviewer-name">{rev.name}</div>
                  <div className="sp-reviewer-tag">{rev.exam}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: GAYA CENTER LOCATION, CONTACTS & TOP FAQS
          ========================================================================= */}
      <section className="sp-center-section">
        <div className="sp-center-grid">
          {/* Left Column: Center Location & Hours */}
          <div>
            <span className="sp-section-pill">
              <MapPin size={14} />
              Visit Our Center
            </span>
            <h2 className="sp-section-h2" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              Gaya Coaching Center & Helplines
            </h2>

            <div style={{ background: 'var(--canvas-alabaster)', border: '1px solid var(--card-border)', borderRadius: '18px', padding: '1.85rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                <MapPin size={22} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', margin: '0 0 4px' }}>
                    Address:
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.5 }}>
                    <strong>Gaya Shorthand Classes</strong><br />
                    Gaya College More, Opposite Cyber Thana, Gayaji, Bihar - 823001
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                <Phone size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', margin: '0 0 4px' }}>
                    Direct Helplines:
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.5 }}>
                    Director (Shadab Sir): <a href="tel:9204123453" style={{ color: '#D97706', fontWeight: 700 }}>+91 9204123453</a><br />
                    Admissions Desk: <a href="tel:7870377214" style={{ color: 'var(--text-dark)', fontWeight: 700 }}>+91 7870377214</a>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Clock size={20} color="#3B82F6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', margin: '0 0 4px' }}>
                    Office & Class Timings:
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.5 }}>
                    Morning 7:00 AM – 11:30 AM • Evening 3:30 PM – 7:30 PM (Mon to Sat)
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--card-border)', height: '240px' }}>
              <iframe
                title="Gaya Shorthand Classes Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14470.573215849887!2d84.9912061!3d24.7938367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32a510526e855%3A0x6bfa332617757917!2sGaya%20College%2C%20Gaya!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: FAQs Accordion */}
          <div>
            <span className="sp-section-pill">
              <FileText size={14} />
              Admissions FAQ
            </span>
            <h2 className="sp-section-h2" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              Frequently Asked Questions
            </h2>

            <div className="sp-faq-accordion">
              {TOP_FAQS.map((faq) => {
                const isOpen = activeFaq === faq.id;
                return (
                  <div key={faq.id} className="sp-faq-item">
                    <button
                      type="button"
                      className="sp-faq-btn"
                      onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={20} color="#D97706" /> : <ChevronDown size={20} color="#94A3B8" />}
                    </button>
                    {isOpen && (
                      <div className="sp-faq-body">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1.75rem', textAlign: 'left' }}>
              <a
                href="tel:9204123453"
                style={{ fontSize: '0.92rem', fontWeight: 700, color: '#D97706', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Phone size={16} />
                <span>Have additional questions? Call Helpline: +91 9204123453</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: BOTTOM PRESTIGE HERO CTA BANNER
          ========================================================================= */}
      <section className="sp-cta-banner">
        <div className="sp-cta-container">
          <span className="sp-hero-pill-badge" style={{ margin: '0 auto 1.25rem' }}>
            <span className="sp-pulse-dot" />
            Estd. 2012 · Gaya Shorthand Classes
          </span>
          <h2 className="sp-cta-title">
            Learn Today, Lead Tomorrow
          </h2>
          <p className="sp-cta-desc">
            Begin your government stenographer journey with <strong>3 Free Demo Classes</strong> at Gaya Shorthand Classes. Guided by experienced faculty <strong>Shadab Sir (12 Years Experience)</strong>.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              className="sp-btn-gold"
              onClick={() => {
                fireConfetti();
                if (onOpenAdmission) onOpenAdmission();
              }}
            >
              <Sparkles size={18} />
              <span>Book 3 Free Demo Classes</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="tel:9204123453"
              className="sp-btn-glass"
            >
              <Phone size={18} />
              <span>Call Helpline: +91 9204123453</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
