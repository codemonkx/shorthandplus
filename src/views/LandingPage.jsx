import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause,
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Clock, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  MapPin, 
  Headphones, 
  Keyboard, 
  FileText, 
  Zap, 
  Check,
  CheckCircle
} from 'lucide-react';
import '../landing-redesign.css';

const TOP_FAQS = [
  {
    id: 1,
    q: "What is the duration of the shorthand course from beginner to exam-ready?",
    a: "The foundation Pitman theory course takes 3 to 4 months of structured study. After completing the theory book, speed development batches (60 to 120+ WPM) typically take another 2 to 3 months depending on daily transcription hours."
  },
  {
    id: 2,
    q: "Can complete beginners join without prior typing or shorthand experience?",
    a: "Yes. Over 80% of our students start as complete beginners. We teach fundamental stroke directions, light and dark curve distinctions, and vowel positioning from scratch, backed by daily individual notebook verification by Shadab Sir."
  },
  {
    id: 3,
    q: "Which typing fonts are taught for High Court and Civil Court examinations?",
    a: "We train candidates in English QWERTY, Hindi Kruti Dev 010, and Hindi Mangal Inscript. Our typing laboratory runs custom exam software that simulates official backspace-lock rules and calculates accurate gross and net WPM."
  },
  {
    id: 4,
    q: "How do live online interactive batches work for students outside Gaya?",
    a: "Live online classes take place daily via Google Meet. Shadab Sir delivers live voice dictations, reviews handwritten outlines using a digital whiteboard, and students transcribe passages into our automated evaluation portal with instant scoring."
  },
  {
    id: 5,
    q: "Are the 3 demo classes completely free before enrolling?",
    a: "Yes. We offer 3 Free Trial Demo Classes with zero upfront payment. You can experience the classroom teaching methodology, live dictations, typing lab, and notebook checking before taking admission."
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
  const [activeEngineTab, setActiveEngineTab] = useState(0);
  const [activeFaq, setActiveFaq] = useState(1);
  const [isPlayingAudioPreview, setIsPlayingAudioPreview] = useState(false);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleOpenDemo = () => {
    fireConfetti();
    if (onOpenAdmission) {
      onOpenAdmission();
    }
  };

  const handleStartTests = () => {
    if (setCurrentTab) {
      setCurrentTab('tests');
    } else if (onStartFullTest) {
      onStartFullTest();
    }
  };

  const handleExploreCourses = () => {
    if (setCurrentTab) {
      setCurrentTab('courses');
    }
  };

  return (
    <div className="sp-landing-root">
      
      {/* =========================================================================
          SECTION 1: EDITORIAL SPLIT HERO + EXAM TRUST STRIP (bg-white)
          ========================================================================= */}
      <section className="sp-hero-section">
        <div className="sp-hero-container">
          <div className="sp-hero-grid">
            
            {/* Left Column (Copy, Trust Signals, CTAs) */}
            <div className="sp-hero-left">
              
              {/* Clean inline trust row (no pills, no glow) */}
              <div className="sp-hero-trust-row">
                <span className="sp-hero-trust-item">Est. 2012 &middot; Gaya College More</span>
                <span className="sp-hero-trust-divider" />
                <span className="sp-hero-trust-item">12+ Years Coaching</span>
                <span className="sp-hero-trust-divider" />
                <span className="sp-hero-trust-item">SSC &amp; High Court Standard</span>
              </div>

              {/* Bold H1 with editorial italic serif accent */}
              <h1 className="sp-hero-h1">
                The Gold Standard in{' '}
                <span className="sp-hero-serif-accent">Shorthand</span>{' '}
                &amp; Typing for Govt. Exams
              </h1>

              {/* Concise 2-line subheadline */}
              <p className="sp-hero-subheadline">
                Master Pitman Shorthand (50–140 WPM), Hindi Kruti Dev &amp; Mangal typing, and legal dictations—guided by <strong>Shadab Sir</strong> with automated SSC error evaluation.
              </p>

              {/* Clean CTA row */}
              <div className="sp-hero-cta-group">
                <button
                  type="button"
                  className="sp-btn-ink-primary"
                  onClick={handleStartTests}
                >
                  <span>Start Audio Dictation</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="sp-btn-white-secondary"
                  onClick={handleExploreCourses}
                >
                  <span>Explore Courses</span>
                </button>

                <button
                  type="button"
                  className="sp-hero-demo-link"
                  onClick={handleOpenDemo}
                >
                  Book 3 Free Demos &rarr;
                </button>
              </div>

            </div>

            {/* Right Column (Hero Visual Showcase) */}
            <div className="sp-hero-right">
              <div className="sp-hero-media-card">
                <img 
                  src="/assets/institution-hero.jpg" 
                  alt="Shorthand Plus Stenography Classroom &amp; Typing Lab" 
                  className="sp-hero-img"
                />
                <div className="sp-hero-caption-bar">
                  <div className="sp-caption-dot" />
                  <span className="sp-caption-text">SSC &amp; High Court Exam Standard &middot; 50&ndash;140 WPM</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Flush Exam Authority Strip */}
        <div className="sp-exam-strip">
          <div className="sp-exam-strip-inner">
            <span className="sp-exam-strip-label">PREPARING ASPIRANTS FOR</span>
            <div className="sp-exam-strip-list">
              <span>SSC Stenographer</span>
              <span className="sp-strip-bullet">&middot;</span>
              <span>Patna High Court</span>
              <span className="sp-strip-bullet">&middot;</span>
              <span>Civil Court</span>
              <span className="sp-strip-bullet">&middot;</span>
              <span>EPFO</span>
              <span className="sp-strip-bullet">&middot;</span>
              <span>DRDO</span>
              <span className="sp-strip-bullet">&middot;</span>
              <span>BSSC</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE EXAM ENGINE SHOWCASE (THE CENTERPIECE)
          ========================================================================= */}
      <section className="sp-engine-section">
        <div className="sp-container">
          
          {/* Header (Left-aligned, max-w-2xl) */}
          <div className="sp-engine-header">
            <span className="sp-section-eyebrow">THE SHORTHAND PLUS PLATFORM</span>
            <h2 className="sp-section-h2">
              Built like the actual exam hall, down to every keystroke.
            </h2>
            <p className="sp-section-sub">
              Experience the dual-stage examination simulation trusted by Bihar's top stenography qualifiers:
            </p>
          </div>

          {/* 2-Column Interactive Split */}
          <div className="sp-engine-grid">
            
            {/* Left Column: 3 Clickable Accordion/Tab Items */}
            <div className="sp-engine-tabs">
              
              {/* Tab 0 */}
              <div 
                className={`sp-engine-tab-card ${activeEngineTab === 0 ? 'active' : ''}`}
                onClick={() => setActiveEngineTab(0)}
                role="button"
                tabIndex={0}
              >
                <div className="sp-engine-tab-head">
                  <span className="sp-engine-tab-num">01</span>
                  <div className="sp-engine-tab-title-wrap">
                    <h3 className="sp-engine-tab-title">Calibrated Audio Dictation</h3>
                    <span className="sp-engine-tab-tag">50–140 WPM Standard</span>
                  </div>
                </div>
                <p className="sp-engine-tab-desc">
                  Practice 50–140 WPM Pitman &amp; High Court legal dictations with exam-accurate pacing, single-play lock, and mandatory 5-minute reading clock.
                </p>
              </div>

              {/* Tab 1 */}
              <div 
                className={`sp-engine-tab-card ${activeEngineTab === 1 ? 'active' : ''}`}
                onClick={() => setActiveEngineTab(1)}
                role="button"
                tabIndex={0}
              >
                <div className="sp-engine-tab-head">
                  <span className="sp-engine-tab-num">02</span>
                  <div className="sp-engine-tab-title-wrap">
                    <h3 className="sp-engine-tab-title">Bilingual Typing Studio</h3>
                    <span className="sp-engine-tab-tag">Kruti Dev &amp; Mangal</span>
                  </div>
                </div>
                <p className="sp-engine-tab-desc">
                  Dedicated English QWERTY, Hindi Kruti Dev 010, and Mangal Inscript typing drills with strict backspace-lock simulation and live gross/net WPM.
                </p>
              </div>

              {/* Tab 2 */}
              <div 
                className={`sp-engine-tab-card ${activeEngineTab === 2 ? 'active' : ''}`}
                onClick={() => setActiveEngineTab(2)}
                role="button"
                tabIndex={0}
              >
                <div className="sp-engine-tab-head">
                  <span className="sp-engine-tab-num">03</span>
                  <div className="sp-engine-tab-title-wrap">
                    <h3 className="sp-engine-tab-title">Automated SSC Error Evaluation</h3>
                    <span className="sp-engine-tab-tag">Full &amp; Half Error Scoring</span>
                  </div>
                </div>
                <p className="sp-engine-tab-desc">
                  Instant word-by-word diff checking full vs. half mistakes against official SSC and High Court cutoffs with exact percentage qualification criteria.
                </p>
              </div>

            </div>

            {/* Right Column: Live Stylized Software UI Mockup */}
            <div className="sp-engine-preview-window">
              
              {/* Window Title Bar */}
              <div className="sp-window-chrome">
                <div className="sp-chrome-dots">
                  <span className="sp-dot sp-dot-red" />
                  <span className="sp-dot sp-dot-yellow" />
                  <span className="sp-dot sp-dot-green" />
                </div>
                <div className="sp-chrome-title">
                  {activeEngineTab === 0 && "Audio Exam Simulator v2.4 · Live Dictation Room"}
                  {activeEngineTab === 1 && "Bilingual Typing Studio · Exam-Mode Lock Active"}
                  {activeEngineTab === 2 && "Automated Evaluation Engine · Forensic Diff Report"}
                </div>
                <div className="sp-chrome-badge">EXAM ACTIVE</div>
              </div>

              {/* Mockup Canvas */}
              <div className="sp-window-canvas">
                
                {/* TAB 0 PREVIEW: Audio Dictation Player */}
                {activeEngineTab === 0 && (
                  <div className="sp-preview-card">
                    <div className="sp-preview-badge-row">
                      <span className="sp-preview-status-pill">
                        <span className="sp-live-dot" /> LIVE DICTATION
                      </span>
                      <span className="sp-preview-meta-tag">Track ID: PHC-LEGAL-104</span>
                    </div>

                    <h4 className="sp-preview-title">
                      Patna High Court Legal Dictation &middot; 100 WPM
                    </h4>
                    <p className="sp-preview-sub">
                      Case Law: Cr. Misc. Petitions &middot; Kailash Chandra Vol. 14 Calibration
                    </p>

                    {/* Speed Selector */}
                    <div className="sp-speed-selector-row">
                      <span className="sp-selector-label">CALIBRATED SPEED:</span>
                      <div className="sp-speed-pills">
                        <span className="sp-speed-pill">80 WPM</span>
                        <span className="sp-speed-pill active">100 WPM</span>
                        <span className="sp-speed-pill">120 WPM</span>
                      </div>
                    </div>

                    {/* Minimalist Waveform Visualization */}
                    <div className="sp-audio-player-box">
                      <button 
                        type="button"
                        className="sp-audio-play-btn"
                        onClick={() => setIsPlayingAudioPreview(!isPlayingAudioPreview)}
                        title="Toggle Audio Simulation"
                      >
                        {isPlayingAudioPreview ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                      </button>

                      <div className="sp-waveform-bars">
                        {[40, 65, 30, 85, 95, 60, 45, 100, 75, 50, 90, 65, 40, 80, 55, 35, 70, 90, 60, 30].map((h, idx) => (
                          <span 
                            key={idx} 
                            className={`sp-wave-bar ${isPlayingAudioPreview && idx < 12 ? 'active' : ''}`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>

                      <div className="sp-audio-timer tabular-nums">
                        {isPlayingAudioPreview ? "01:24" : "05:00"}
                      </div>
                    </div>

                    <div className="sp-preview-footer-note">
                      <span>Strict Single-Play Protocol: Audio plays once without rewind or pause.</span>
                      <button 
                        type="button" 
                        className="sp-preview-cta-link"
                        onClick={handleStartTests}
                      >
                        Launch Dictation Vault &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 1 PREVIEW: Bilingual Typing Studio */}
                {activeEngineTab === 1 && (
                  <div className="sp-preview-card">
                    <div className="sp-preview-badge-row">
                      <span className="sp-preview-status-pill">
                        <span className="sp-live-dot" /> BACKSPACE LOCKED
                      </span>
                      <span className="sp-preview-meta-tag">Exam Layout: Kruti Dev 010</span>
                    </div>

                    {/* Font & Layout Switcher */}
                    <div className="sp-font-toggle-row">
                      <span className="sp-font-tab">English QWERTY</span>
                      <span className="sp-font-tab active">Hindi Kruti Dev 010</span>
                      <span className="sp-font-tab">Mangal Inscript</span>
                    </div>

                    {/* Real-time stats row */}
                    <div className="sp-preview-stats-bar">
                      <div className="sp-stat-item">
                        <span className="sp-stat-label">GROSS SPEED</span>
                        <span className="sp-stat-val tabular-nums">46 WPM</span>
                      </div>
                      <div className="sp-stat-item">
                        <span className="sp-stat-label">NET SPEED</span>
                        <span className="sp-stat-val tabular-nums">42 WPM</span>
                      </div>
                      <div className="sp-stat-item">
                        <span className="sp-stat-label">ACCURACY</span>
                        <span className="sp-stat-val tabular-nums text-emerald">97.8%</span>
                      </div>
                      <div className="sp-stat-item">
                        <span className="sp-stat-label">TIME LEFT</span>
                        <span className="sp-stat-val tabular-nums">08:45</span>
                      </div>
                    </div>

                    {/* Live Editor Preview Snippet */}
                    <div className="sp-typing-passage-box">
                      <span className="sp-typed-text">
                        अभ्यर्थियों को सूचित किया जाता है कि पटना उच्च न्यायालय आशुलिपिक परीक्षा के लिए गति एवं शुद्धता सर्वोपरि
                      </span>
                      <span className="sp-typing-cursor" />
                      <span className="sp-untyped-text">
                        {' '}है। निर्धारित समय सीमा के भीतर कंप्यूटर टंकण पूर्ण करना अनिवार्य होगा।
                      </span>
                    </div>

                    <div className="sp-preview-footer-note">
                      <span>Strict Backspace Lock: Eliminates bad editing habits during live preparation.</span>
                      <button 
                        type="button" 
                        className="sp-preview-cta-link"
                        onClick={() => setCurrentTab && setCurrentTab('typing-studio')}
                      >
                        Enter Typing Studio &rarr;
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2 PREVIEW: Automated SSC Error Evaluation */}
                {activeEngineTab === 2 && (
                  <div className="sp-preview-card">
                    <div className="sp-preview-badge-row">
                      <span className="sp-preview-status-pill qualified">
                        <CheckCircle size={14} /> QUALIFIED &middot; SSC GRADE C
                      </span>
                      <span className="sp-preview-meta-tag">Cutoff Allowed: 7.0%</span>
                    </div>

                    <h4 className="sp-preview-title">
                      LCS Forensic Word-by-Word Error Breakdown
                    </h4>

                    {/* Diff Highlighting Display */}
                    <div className="sp-diff-passage-box">
                      <p className="sp-diff-text">
                        The proceedings of the{' '}
                        <del className="sp-diff-omission" title="Full Mistake: Word Omitted">
                          honorable
                        </del>{' '}
                        court were adjourned today after hearing the{' '}
                        <span className="sp-diff-half-mistake" title="Half Mistake: Spelling typo">
                          parlimentary
                        </span>{' '}
                        arguments presented in the constitutional writ petition without any unnecessary delay.
                      </p>
                    </div>

                    {/* Legend */}
                    <div className="sp-diff-legend-row">
                      <div className="sp-legend-item">
                        <span className="sp-legend-box sp-legend-red" />
                        <span>Full Mistake (Omission / Addition) &middot; -1.0</span>
                      </div>
                      <div className="sp-legend-item">
                        <span className="sp-legend-box sp-legend-amber" />
                        <span>Half Mistake (Spelling / Case) &middot; -0.5</span>
                      </div>
                    </div>

                    {/* Score Summary Metrics */}
                    <div className="sp-diff-score-grid">
                      <div className="sp-diff-score-cell">
                        <span className="sp-diff-label">FULL MISTAKES</span>
                        <span className="sp-diff-value tabular-nums">1 (Omission)</span>
                      </div>
                      <div className="sp-diff-score-cell">
                        <span className="sp-diff-label">HALF MISTAKES</span>
                        <span className="sp-diff-value tabular-nums">1 (Spelling)</span>
                      </div>
                      <div className="sp-diff-score-cell">
                        <span className="sp-diff-label">TOTAL ERROR RATE</span>
                        <span className="sp-diff-value tabular-nums text-emerald">1.5%</span>
                      </div>
                      <div className="sp-diff-score-cell">
                        <span className="sp-diff-label">NET ACCURACY</span>
                        <span className="sp-diff-value tabular-nums font-bold">98.5%</span>
                      </div>
                    </div>

                    <div className="sp-preview-footer-note">
                      <span>Full SSC Standard: Certified evaluation matching official Staff Selection Commission rules.</span>
                      <button 
                        type="button" 
                        className="sp-preview-cta-link"
                        onClick={handleStartTests}
                      >
                        Try Full Mock Exam &rarr;
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HOW PREPARATION WORKS (MINIMAL HORIZONTAL TIMELINE)
          ========================================================================= */}
      <section className="sp-timeline-section">
        <div className="sp-container">
          
          <div className="sp-timeline-head-row">
            <div>
              <span className="sp-section-eyebrow">PEDAGOGICAL ROADMAP</span>
              <h2 className="sp-section-h2" style={{ textAlign: 'left', margin: 0 }}>
                From First Outline to Final Selection.
              </h2>
            </div>
            <button
              type="button"
              className="sp-timeline-all-courses-link"
              onClick={handleExploreCourses}
            >
              <span>View All Courses</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="sp-timeline-grid">
            
            {/* Step 1 */}
            <div className="sp-timeline-col">
              <span className="sp-timeline-num">01</span>
              <h3 className="sp-timeline-title">Listen &amp; Write Shorthand</h3>
              <p className="sp-timeline-desc">
                Take calibrated live or studio dictations in your physical stenography notebook at <strong>60 to 140 WPM</strong>. Master light/dark stroke discrimination and phraseography without hesitations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="sp-timeline-col">
              <span className="sp-timeline-num">02</span>
              <h3 className="sp-timeline-title">Transcribe Under Exam Clock</h3>
              <p className="sp-timeline-desc">
                Review outlines during the 5-minute reading clock, then transcribe in <strong>English, Kruti Dev 010, or Mangal</strong> under strict official exam-hall timing and backspace-lock rules.
              </p>
            </div>

            {/* Step 3 */}
            <div className="sp-timeline-col">
              <span className="sp-timeline-num">03</span>
              <h3 className="sp-timeline-title">Fix Every Single Mistake</h3>
              <p className="sp-timeline-desc">
                Receive automated full and half-mistake percentage reports instantly, combined with daily <strong>handwritten outline review</strong> by Shadab Sir to eliminate recurring stroke angle flaws.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LEGACY & MENTOR EDITORIAL SPLIT (bg-white)
          ========================================================================= */}
      <section className="sp-mentor-section">
        <div className="sp-container">
          <div className="sp-mentor-grid">
            
            {/* Left Column: Editorial Narrative & Mentor Legacy */}
            <div className="sp-mentor-narrative">
              <span className="sp-section-eyebrow">GAYA SHORTHAND CLASSES &middot; EST. 2012</span>
              <h2 className="sp-section-h2" style={{ textAlign: 'left' }}>
                12+ Years of Discipline. Guided Directly by Shadab Sir.
              </h2>
              
              <div className="sp-mentor-text-block">
                <p>
                  Founded at Gaya College More in 2012, <strong>Gaya Shorthand Classes</strong> has established itself as Bihar's premier preparatory academy for government stenography aspirants. Over 1,200 candidates have qualified for Central &amp; State services under direct personal mentorship.
                </p>
                <p>
                  We believe that while automated software is indispensable for measuring speed, true shorthand mastery demands traditional stroke discipline. Every single outline, curve angle, and grammalogue contraction is inspected daily so bad habits never carry into the examination hall.
                </p>
              </div>

              {/* Flush Stat Strip */}
              <div className="sp-mentor-stats-strip">
                <div className="sp-stat-box">
                  <div className="sp-stat-number tabular-nums">12+ Yrs</div>
                  <div className="sp-stat-caption">Coaching Legacy</div>
                </div>
                <div className="sp-stat-box">
                  <div className="sp-stat-number tabular-nums">50&ndash;140</div>
                  <div className="sp-stat-caption">WPM Training Range</div>
                </div>
                <div className="sp-stat-box">
                  <div className="sp-stat-number">Offline + Live</div>
                  <div className="sp-stat-caption">Gaya &amp; Google Meet</div>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button
                  type="button"
                  className="sp-mentor-story-link"
                  onClick={() => setCurrentTab && setCurrentTab('about')}
                >
                  <span>Read Our Story &amp; Methodology</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Column: 4 Core Pillars Credential Card */}
            <div className="sp-mentor-pillars-card">
              <div className="sp-pillars-card-head">
                <h3 className="sp-pillars-heading">Institutional Principles</h3>
                <span className="sp-pillars-tag">CORE PILLARS</span>
              </div>

              <div className="sp-pillars-list">
                
                <div className="sp-pillar-item">
                  <div className="sp-pillar-header">
                    <CheckCircle2 size={18} className="sp-pillar-icon" />
                    <h4 className="sp-pillar-title">Personal Outline Checking</h4>
                  </div>
                  <p className="sp-pillar-desc">
                    Daily physical review of shorthand notebooks by Shadab Sir to correct stroke angles, proportion, and phraseography before bad habits take root.
                  </p>
                </div>

                <div className="sp-pillar-item">
                  <div className="sp-pillar-header">
                    <CheckCircle2 size={18} className="sp-pillar-icon" />
                    <h4 className="sp-pillar-title">Bilingual Typing Mastery</h4>
                  </div>
                  <p className="sp-pillar-desc">
                    Comprehensive dual-stream training across English Pitman and Hindi Shorthand with both Kruti Dev 010 and Mangal Inscript typing labs.
                  </p>
                </div>

                <div className="sp-pillar-item">
                  <div className="sp-pillar-header">
                    <CheckCircle2 size={18} className="sp-pillar-icon" />
                    <h4 className="sp-pillar-title">Daily Legal &amp; Parliamentary Dictations</h4>
                  </div>
                  <p className="sp-pillar-desc">
                    High Court judgments, civil petitions, FIR vocabulary, and Kailash Chandra volumes calibrated to exact official recruitment speeds.
                  </p>
                </div>

                <div className="sp-pillar-item">
                  <div className="sp-pillar-header">
                    <CheckCircle2 size={18} className="sp-pillar-icon" />
                    <h4 className="sp-pillar-title">Transparent Coaching with 3 Free Demo Classes</h4>
                  </div>
                  <p className="sp-pillar-desc">
                    Experience our classroom instruction, typing lab computers, and dictation methodology completely free before paying any admission fee.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: HIGH-CONTRAST LIVE ONLINE CLASSES BANNER (bg-white)
          ========================================================================= */}
      <section className="sp-live-banner-section">
        <div className="sp-container">
          <div className="sp-live-banner-card">
            
            {/* Left Content Column */}
            <div className="sp-live-content-col">
              <div className="sp-live-eyebrow">
                <span className="sp-live-static-dot" />
                <span>LIVE ONLINE INTERACTIVE BATCHES</span>
              </div>

              <h2 className="sp-live-headline">
                Can't Visit the Gaya Center?{' '}
                <span className="sp-live-serif-accent">Join Live Online Classes</span>
              </h2>

              <p className="sp-live-body">
                Daily Google Meet dictations, live digital whiteboard outline checking, and real-time doubt resolution with <strong>Shadab Sir</strong>.
              </p>

              <div className="sp-live-features-strip">
                <span className="sp-live-feat-item">Google Meet Live</span>
                <span className="sp-live-feat-divider">&middot;</span>
                <span className="sp-live-feat-item">Whiteboard Outline Review</span>
                <span className="sp-live-feat-divider">&middot;</span>
                <span className="sp-live-feat-item">Direct Doubt Resolution</span>
              </div>
            </div>

            {/* Right Action Block */}
            <div className="sp-live-action-col">
              <button
                type="button"
                className="sp-live-btn-white"
                onClick={() => {
                  if (setCurrentTab) setCurrentTab('batches');
                }}
              >
                <span>View Live Class Schedule</span>
                <ArrowRight size={16} />
              </button>
              <span className="sp-live-caption">
                Morning &amp; evening batches available
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ASPIRANT VOICES (EDITORIAL TESTIMONIALS)
          ========================================================================= */}
      <section className="sp-voices-section">
        <div className="sp-container">
          
          <div className="sp-voices-header">
            <span className="sp-section-eyebrow">STUDENT OUTCOMES</span>
            <h2 className="sp-section-h2">
              Trusted by Serious Aspirants.
            </h2>
            <p className="sp-section-sub">
              Verified experiences from candidates who built their shorthand speed and cleared recruitment skill tests:
            </p>
          </div>

          <div className="sp-voices-grid">
            
            {/* Review 1 */}
            <div className="sp-voice-card">
              <div>
                <div className="sp-voice-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#B91C1C" color="#B91C1C" />
                  ))}
                </div>
                <p className="sp-voice-quote">
                  &ldquo;Shadab Sir's daily dictation practice and 5-minute reading room made all the difference in my SSC skill test. Individual notebook checking helped fix my stroke angles completely.&rdquo;
                </p>
              </div>
              <div className="sp-voice-author-block">
                <div className="sp-voice-author-name">Anjali Verma</div>
                <div className="sp-voice-author-tag">SSC STENOGRAPHER GRADE C &middot; 100 WPM</div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="sp-voice-card">
              <div>
                <div className="sp-voice-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#B91C1C" color="#B91C1C" />
                  ))}
                </div>
                <p className="sp-voice-quote">
                  &ldquo;The strict backspace lock simulation and legal judgment audio series mirrored the exact Patna High Court exam software. Reached 100 WPM with zero guesswork.&rdquo;
                </p>
              </div>
              <div className="sp-voice-author-block">
                <div className="sp-voice-author-name">Rakesh Kumar</div>
                <div className="sp-voice-author-tag">PATNA HIGH COURT PA &middot; 98% ACCURACY</div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="sp-voice-card">
              <div>
                <div className="sp-voice-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#B91C1C" color="#B91C1C" />
                  ))}
                </div>
                <p className="sp-voice-quote">
                  &ldquo;Best shorthand institute in Gaya. The dual font support (Kruti Dev 010 and Mangal) in their computer lab is unmatched for judicial exam aspirants.&rdquo;
                </p>
              </div>
              <div className="sp-voice-author-block">
                <div className="sp-voice-author-name">Md. Tariq</div>
                <div className="sp-voice-author-tag">BIHAR CIVIL COURT STENOGRAPHER</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: COMPACT CENTER DETAILS + FAQ SPLIT & TIGHT CLOSING BAND
          ========================================================================= */}
      <section className="sp-center-faq-section">
        <div className="sp-container">
          
          <div className="sp-center-faq-grid">
            
            {/* Left Column: Center Location & Helplines */}
            <div className="sp-center-card">
              <span className="sp-section-eyebrow">VISIT OUR CENTER</span>
              <h3 className="sp-center-heading">
                Gaya Coaching Center &amp; Helplines
              </h3>

              <div className="sp-center-info-list">
                
                <div className="sp-center-info-row">
                  <MapPin size={20} className="sp-center-info-icon" />
                  <div>
                    <h4 className="sp-info-label">Address:</h4>
                    <p className="sp-info-text">
                      <strong>Gaya Shorthand Classes</strong><br />
                      Gaya College More, Opposite Cyber Thana, Gaya, Bihar &ndash; 823001
                    </p>
                  </div>
                </div>

                <div className="sp-center-info-row">
                  <Clock size={19} className="sp-center-info-icon" />
                  <div>
                    <h4 className="sp-info-label">Batch &amp; Lab Timings:</h4>
                    <p className="sp-info-text">
                      6:00 AM &ndash; 11:00 AM &amp; 2:00 PM &ndash; 8:00 PM (Monday to Saturday)
                    </p>
                  </div>
                </div>

                <div className="sp-center-info-row">
                  <Phone size={19} className="sp-center-info-icon" />
                  <div>
                    <h4 className="sp-info-label">Helplines &amp; Inquiries:</h4>
                    <p className="sp-info-text">
                      Director (Shadab Sir): <a href="tel:9204123453">+91 9204123453</a><br />
                      Admissions Desk: <a href="tel:7870377214">+91 7870377214</a>
                    </p>
                  </div>
                </div>

              </div>

              <div className="sp-center-action-row">
                <button
                  type="button"
                  className="sp-btn-ink-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={handleOpenDemo}
                >
                  <span>Book 3 Free Demos</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Column: Interactive FAQ Accordion */}
            <div className="sp-faq-wrap">
              <span className="sp-section-eyebrow">ADMISSIONS FAQ</span>
              <h3 className="sp-center-heading">
                Frequently Asked Questions
              </h3>

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
                        <span className="sp-faq-question-text">{faq.q}</span>
                        {isOpen ? <ChevronUp size={18} color="#0F172A" /> : <ChevronDown size={18} color="#94A3B8" />}
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

            </div>

          </div>

        </div>

        {/* Tight Closing CTA Strip (Directly above footer, zero awkward gap) */}
        <div className="sp-closing-cta-strip">
          <div className="sp-container">
            <div className="sp-closing-cta-box">
              <h2 className="sp-closing-h2">
                Ready to Build Exam-Hall Speed?
              </h2>
              <p className="sp-closing-sub">
                Join over 1,200 successful candidates trained under Shadab Sir. Book your 3 free demo classes today.
              </p>
              <div className="sp-closing-btn-row">
                <button
                  type="button"
                  className="sp-btn-white-primary"
                  onClick={handleStartTests}
                >
                  <span>Start Free Dictation Test</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="sp-btn-ink-outline"
                  onClick={handleExploreCourses}
                >
                  <span>Explore All Courses</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
