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
                  className="sp-btn-white-secondary bg-white border border-[#D6D2C8] text-zinc-900 hover:bg-[#F3F1EC] transition-colors"
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

              {/* Pricing & Timing Reassurance micro-line */}
              <p className="sp-hero-reassurance-line">
                Online passes from &#8377;30 &middot; Offline &amp; Live Google Meet batches &middot; 3 Free Demo Classes
              </p>

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

        {/* Flush Exam Authority Strip - Balanced Full-Width Flex Row */}
        <div className="sp-exam-strip bg-[#F3F1EC] border-y border-[#E5E1D8]">
          <div className="sp-exam-strip-inner max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="sp-exam-strip-label whitespace-nowrap text-zinc-600 font-semibold text-xs tracking-wider">PREPARING ASPIRANTS FOR</span>
            <div className="sp-exam-strip-list flex-1 flex flex-wrap items-center justify-between md:justify-end lg:justify-between gap-x-6 gap-y-2 md:pl-12 text-zinc-800 font-semibold">
              <span className="text-zinc-800 font-semibold">SSC Stenographer</span>
              <span className="sp-strip-bullet text-[#D6D2C8]">&middot;</span>
              <span className="text-zinc-800 font-semibold">Patna High Court</span>
              <span className="sp-strip-bullet text-[#D6D2C8]">&middot;</span>
              <span className="text-zinc-800 font-semibold">Civil Court</span>
              <span className="sp-strip-bullet text-[#D6D2C8]">&middot;</span>
              <span className="text-zinc-800 font-semibold">EPFO</span>
              <span className="sp-strip-bullet text-[#D6D2C8]">&middot;</span>
              <span className="text-zinc-800 font-semibold">DRDO</span>
              <span className="sp-strip-bullet text-[#D6D2C8]">&middot;</span>
              <span className="text-zinc-800 font-semibold">BSSC</span>
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
            <span className="sp-section-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              THE SHORTHAND PLUS PLATFORM
            </span>
            <h2 className="sp-section-h2">
              Built like the actual exam hall, down to every keystroke.
            </h2>
            <p className="sp-section-sub">
              Experience the dual-stage examination simulation trusted by Bihar's top stenography qualifiers:
            </p>
          </div>

          {/* 2-Column Interactive Split */}
          <div className="sp-engine-grid">
            
            {/* Left Column: 3 Clickable Accordion/Tab Items (Collapse Inactive Tabs) */}
            <div className="sp-engine-tabs">
              
              {/* Tab 0 */}
              <div 
                className={`sp-engine-tab-card ${activeEngineTab === 0 ? 'active' : 'inactive'}`}
                onClick={() => setActiveEngineTab(0)}
                role="button"
                tabIndex={0}
              >
                <div className="sp-engine-tab-head">
                  <span className="sp-engine-tab-num">01</span>
                  <div className="sp-engine-tab-title-wrap">
                    <div className="sp-engine-tab-title-row">
                      <h3 className="sp-engine-tab-title">Calibrated Audio Dictation</h3>
                      {activeEngineTab === 0 ? (
                        <ChevronUp size={16} className="text-slate-700 shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400 shrink-0" />
                      )}
                    </div>
                    {activeEngineTab === 0 && (
                      <span className="sp-engine-tab-tag">50–140 WPM Standard</span>
                    )}
                  </div>
                </div>
                {activeEngineTab === 0 && (
                  <p className="sp-engine-tab-desc">
                    Practice 50–140 WPM Pitman &amp; High Court legal dictations with exam-accurate pacing, single-play lock, and mandatory 5-minute reading clock.
                  </p>
                )}
              </div>

              {/* Tab 1 */}
              <div 
                className={`sp-engine-tab-card ${activeEngineTab === 1 ? 'active' : 'inactive'}`}
                onClick={() => setActiveEngineTab(1)}
                role="button"
                tabIndex={0}
              >
                <div className="sp-engine-tab-head">
                  <span className="sp-engine-tab-num">02</span>
                  <div className="sp-engine-tab-title-wrap">
                    <div className="sp-engine-tab-title-row">
                      <h3 className="sp-engine-tab-title">Bilingual Typing Studio</h3>
                      {activeEngineTab === 1 ? (
                        <ChevronUp size={16} className="text-slate-700 shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400 shrink-0" />
                      )}
                    </div>
                    {activeEngineTab === 1 && (
                      <span className="sp-engine-tab-tag">Kruti Dev &amp; Mangal</span>
                    )}
                  </div>
                </div>
                {activeEngineTab === 1 && (
                  <p className="sp-engine-tab-desc">
                    Dedicated English QWERTY, Hindi Kruti Dev 010, and Mangal Inscript typing drills with strict backspace-lock simulation and live gross/net WPM.
                  </p>
                )}
              </div>

              {/* Tab 2 */}
              <div 
                className={`sp-engine-tab-card ${activeEngineTab === 2 ? 'active' : 'inactive'}`}
                onClick={() => setActiveEngineTab(2)}
                role="button"
                tabIndex={0}
              >
                <div className="sp-engine-tab-head">
                  <span className="sp-engine-tab-num">03</span>
                  <div className="sp-engine-tab-title-wrap">
                    <div className="sp-engine-tab-title-row">
                      <h3 className="sp-engine-tab-title">Automated SSC Error Evaluation</h3>
                      {activeEngineTab === 2 ? (
                        <ChevronUp size={16} className="text-slate-700 shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400 shrink-0" />
                      )}
                    </div>
                    {activeEngineTab === 2 && (
                      <span className="sp-engine-tab-tag">Full &amp; Half Error Scoring</span>
                    )}
                  </div>
                </div>
                {activeEngineTab === 2 && (
                  <p className="sp-engine-tab-desc">
                    Instant word-by-word diff checking full vs. half mistakes against official SSC and High Court cutoffs with exact percentage qualification criteria.
                  </p>
                )}
              </div>

            </div>

            {/* Right Column: Live Stylized Software UI Mockup */}
            <div className="sp-engine-preview-outer bg-[#F3F1EC] border border-[#E5E1D8] rounded-2xl p-4 sm:p-5">
              <div className="sp-engine-preview-window bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(24,24,27,0.08)]">
                
                {/* Window Title Bar - Crisp Dark Charcoal Top Bar */}
                <div className="sp-window-chrome bg-[#18181B] px-4 py-2.5 flex items-center justify-between text-xs text-zinc-300">
                  <div className="sp-chrome-dots flex items-center gap-1.5">
                    <span className="sp-dot w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="sp-dot w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="sp-dot w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="sp-chrome-title font-medium text-zinc-200 flex items-center gap-2">
                    <span className="text-zinc-400 font-semibold tracking-wider text-[11px]">SHORTHAND PLUS &middot; EXAM ENGINE</span>
                    <span className="text-zinc-600 hidden sm:inline">&middot;</span>
                    <span className="text-zinc-300 hidden sm:inline text-xs">
                      {activeEngineTab === 0 && "Live Audio Dictation Lab"}
                      {activeEngineTab === 1 && "Bilingual Typing Studio"}
                      {activeEngineTab === 2 && "Forensic Error Audit Diff"}
                    </span>
                  </div>
                  <div className="sp-chrome-badge bg-zinc-800/90 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    EXAM ACTIVE
                  </div>
                </div>

                {/* Mockup Canvas */}
                <div className="sp-window-canvas bg-white">
                
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
                        {isPlayingAudioPreview ? <Pause size={18} fill="#FFFFFF" /> : <Play size={18} fill="#FFFFFF" />}
                      </button>

                      <div className="sp-audio-waveform-bars">
                        {[40, 65, 30, 85, 95, 60, 45, 90, 100, 75, 40, 80, 60, 95, 50, 85, 30, 70, 90, 45].map((height, i) => (
                          <span 
                            key={i} 
                            className={`sp-wave-bar ${isPlayingAudioPreview && i < 12 ? 'active' : ''}`}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>

                      <span className="sp-audio-timer-readout font-mono tabular-nums">
                        {isPlayingAudioPreview ? "02:14 / 05:00" : "00:00 / 05:00"}
                      </span>
                    </div>

                    <div className="sp-preview-footer-note">
                      <span>Strict Single-Play Protocol: Audio plays once without rewind or pause.</span>
                      <button 
                        type="button" 
                        className="sp-preview-cta-link whitespace-nowrap inline-flex items-center gap-1.5"
                        onClick={handleStartTests}
                      >
                        <span>Open Full Dictation Lab &rarr;</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 1 PREVIEW: Bilingual Typing Lab Simulator */}
                {activeEngineTab === 1 && (
                  <div className="sp-preview-card">
                    <div className="sp-preview-badge-row">
                      <span className="sp-preview-status-pill">
                        <span className="sp-live-dot" /> TYPING BENCHMARK
                      </span>
                      <div className="sp-font-tabs">
                        <span className="sp-font-tab active">Kruti Dev 010</span>
                        <span className="sp-font-tab">Mangal Inscript</span>
                        <span className="sp-font-tab">English QWERTY</span>
                      </div>
                    </div>

                    {/* Live Exam Telemetry HUD */}
                    <div className="sp-typing-telemetry-hud">
                      <div className="sp-telemetry-item">
                        <span className="sp-telemetry-label">GROSS SPEED</span>
                        <span className="sp-telemetry-val tabular-nums font-mono">48.2 <span className="sp-unit">WPM</span></span>
                      </div>
                      <div className="sp-telemetry-item">
                        <span className="sp-telemetry-label">NET ACCURACY</span>
                        <span className="sp-telemetry-val tabular-nums font-mono text-emerald">98.4%</span>
                      </div>
                      <div className="sp-telemetry-item">
                        <span className="sp-telemetry-label">BACKSPACE LOCK</span>
                        <span className="sp-telemetry-val text-crimson font-mono font-bold">ENFORCED</span>
                      </div>
                      <div className="sp-telemetry-item">
                        <span className="sp-telemetry-label">TIME REMAINING</span>
                        <span className="sp-telemetry-val tabular-nums font-mono">07:45</span>
                      </div>
                    </div>

                    {/* Simulated Text Transcription Input Box */}
                    <div className="sp-simulated-typing-box">
                      <p className="sp-simulated-text font-hindi">
                        न्यायालय के आदेशानुसार उक्त याचिका पर सुनवाई करते हुए न्यायाधीश महोदय ने स्पष्ट किया कि...
                      </p>
                      <div className="sp-typing-cursor-line">
                        <span className="sp-typed-text font-hindi">न्यायालय के आदेशानुसार उक्त</span>
                        <span className="sp-blinking-caret" />
                      </div>
                    </div>

                    <div className="sp-preview-footer-note">
                      <span>Strict Backspace Lock: Eliminates bad editing habits during live preparation.</span>
                      <button 
                        type="button" 
                        className="sp-preview-cta-link whitespace-nowrap inline-flex items-center gap-1.5"
                        onClick={() => setCurrentTab && setCurrentTab('typing-studio')}
                      >
                        <span>Launch Typing Engine &rarr;</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2 PREVIEW: Automated SSC Error Evaluation Diff */}
                {activeEngineTab === 2 && (
                  <div className="sp-preview-card">
                    <div className="sp-preview-badge-row">
                      <span className="sp-preview-status-pill">
                        <span className="sp-live-dot" /> FORENSIC AUDIT
                      </span>
                      <span className="sp-preview-meta-tag font-mono">SSC Grade C &middot; 100 WPM</span>
                    </div>

                    {/* Diff Inspection Passage */}
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
                        <span className="sp-diff-value tabular-nums font-mono">1 (Omission)</span>
                      </div>
                      <div className="sp-diff-score-cell">
                        <span className="sp-diff-label">HALF MISTAKES</span>
                        <span className="sp-diff-value tabular-nums font-mono">1 (Spelling)</span>
                      </div>
                      <div className="sp-diff-score-cell">
                        <span className="sp-diff-label">TOTAL ERROR RATE</span>
                        <span className="sp-diff-value tabular-nums font-mono text-emerald">1.5%</span>
                      </div>
                      <div className="sp-diff-score-cell">
                        <span className="sp-diff-label">NET ACCURACY</span>
                        <span className="sp-diff-value tabular-nums font-mono font-bold">98.5%</span>
                      </div>
                    </div>

                    <div className="sp-preview-footer-note">
                      <span>Full SSC Standard: Certified evaluation matching official Staff Selection Commission rules.</span>
                      <button 
                        type="button" 
                        className="sp-preview-cta-link whitespace-nowrap inline-flex items-center gap-1.5"
                        onClick={handleStartTests}
                      >
                        <span>Try Full Mock Exam &rarr;</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HOW PREPARATION WORKS (MINIMAL HORIZONTAL TIMELINE)
          ========================================================================= */}
      <section className="sp-timeline-section bg-[#F3F1EC] border-y border-[#E5E1D8]">
        <div className="sp-container">
          
          <div className="sp-timeline-head-row">
            <div>
              <span className="sp-section-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                PEDAGOGICAL ROADMAP
              </span>
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
              <span className="sp-timeline-num text-slate-400 font-bold">01</span>
              <h3 className="sp-timeline-title">Listen &amp; Write Shorthand</h3>
              <p className="sp-timeline-desc">
                Take calibrated live or studio dictations in your physical stenography notebook at <strong>60 to 140 WPM</strong>. Master light/dark stroke discrimination and phraseography without hesitations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="sp-timeline-col">
              <span className="sp-timeline-num text-slate-400 font-bold">02</span>
              <h3 className="sp-timeline-title">Transcribe Under Exam Clock</h3>
              <p className="sp-timeline-desc">
                Review outlines during the 5-minute reading clock, then transcribe in <strong>English, Kruti Dev 010, or Mangal</strong> under strict official exam-hall timing and backspace-lock rules.
              </p>
            </div>

            {/* Step 3 */}
            <div className="sp-timeline-col">
              <span className="sp-timeline-num text-slate-400 font-bold">03</span>
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
              <span className="sp-section-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                GAYA SHORTHAND CLASSES &middot; EST. 2012
              </span>
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

            {/* Right Column: Mentor & Academy Visual Card */}
            <div className="bg-white border border-[#E5E1D8] rounded-2xl overflow-hidden shadow-xs">
              {/* Top Visual Frame */}
              <div className="aspect-[4/3] bg-[#F3F1EC] relative overflow-hidden">
                {/* TODO: Replace src with real portrait photo of Shadab Sir or Gaya classroom */}
                <img 
                  src="/assets/institution-hero.jpg" 
                  alt="Shadab Sir - Gaya Shorthand Classes Classroom &amp; Mentor" 
                  className="w-full h-full object-cover object-top"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 text-white px-5 py-3 text-xs flex items-center justify-between backdrop-blur-xs">
                  <span className="font-semibold text-white">Shadab Sir &middot; Founder &amp; Chief Instructor</span>
                  <span className="text-slate-300 font-mono text-[11px]">Est. 2012 &middot; Gaya</span>
                </div>
              </div>

              {/* Compact 4-Point Summary Underneath */}
              <div className="p-5 divide-y divide-[#E5E1D8]/60">
                <div className="py-2.5 text-sm font-medium text-slate-800 flex items-center gap-2.5">
                  <Check size={16} className="text-[#B91C1C] shrink-0" />
                  <span>Personal Pitman Outline Checking</span>
                </div>
                <div className="py-2.5 text-sm font-medium text-slate-800 flex items-center gap-2.5">
                  <Check size={16} className="text-[#B91C1C] shrink-0" />
                  <span>Hindi Kruti Dev 010 &amp; Mangal Inscript Mastery</span>
                </div>
                <div className="py-2.5 text-sm font-medium text-slate-800 flex items-center gap-2.5">
                  <Check size={16} className="text-[#B91C1C] shrink-0" />
                  <span>Daily High Court &amp; Parliamentary Dictations</span>
                </div>
                <div className="py-2.5 text-sm font-medium text-slate-800 flex items-center gap-2.5">
                  <Check size={16} className="text-[#B91C1C] shrink-0" />
                  <span>3 Free Demo Classes Before Enrollment</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: REFINED LIGHT EDITORIAL LIVE ONLINE CLASSES BANNER
          ========================================================================= */}
      <section className="sp-live-banner-section bg-white">
        <div className="sp-container">
          <div className="sp-live-banner-card bg-[#F3F1EC] border border-[#E5E1D8] border-l-4 border-l-[#991B1B] rounded-2xl p-8 md:p-12">
            
            {/* Left Content Column */}
            <div className="sp-live-content-col">
              <div className="sp-live-eyebrow">
                <span className="sp-live-static-dot" style={{ backgroundColor: '#991B1B' }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  LIVE ONLINE INTERACTIVE BATCHES
                </span>
              </div>

              <h2 className="sp-live-headline text-zinc-900">
                Can't Visit the Gaya Center?{' '}
                <span className="sp-live-serif-accent font-serif italic font-normal text-[#991B1B] whitespace-nowrap">
                  Join Live Online Classes
                </span>
              </h2>

              <p className="sp-live-body text-slate-600">
                Daily Google Meet dictations, live digital whiteboard outline checking, and real-time doubt resolution with <strong className="text-zinc-900">Shadab Sir</strong>.
              </p>

              <div className="sp-live-features-strip text-slate-500">
                <span className="sp-live-feat-item text-zinc-700 font-medium">Google Meet Live</span>
                <span className="sp-live-feat-divider text-stone-300">&middot;</span>
                <span className="sp-live-feat-item text-zinc-700 font-medium">Whiteboard Outline Review</span>
                <span className="sp-live-feat-divider text-stone-300">&middot;</span>
                <span className="sp-live-feat-item text-zinc-700 font-medium">Direct Doubt Resolution</span>
              </div>
            </div>

            {/* Right Action Block */}
            <div className="sp-live-action-col">
              <button
                type="button"
                className="sp-btn-crimson bg-[#991B1B] text-white hover:bg-[#7F1D1D] px-6 py-3.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                onClick={() => {
                  if (setCurrentTab) setCurrentTab('batches');
                }}
              >
                <span>View Live Class Schedule</span>
                <ArrowRight size={16} />
              </button>
              <span className="sp-live-caption text-slate-500 text-xs">
                Morning &amp; evening batches available
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ASPIRANT VOICES (EDITORIAL TESTIMONIALS)
          ========================================================================= */}
      <section className="sp-voices-section bg-[#F3F1EC] border-y border-[#E5E1D8]">
        <div className="sp-container">
          
          <div className="sp-voices-header">
            <span className="sp-section-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              STUDENT OUTCOMES
            </span>
            <h2 className="sp-section-h2">
              Trusted by Serious Aspirants.
            </h2>
            <p className="sp-section-sub">
              Verified experiences from candidates who built their shorthand speed and cleared recruitment skill tests:
            </p>
          </div>

          <div className="sp-voices-grid">
            
            {/* Review 1 */}
            <div className="sp-voice-card bg-white border border-[#E5E1D8] rounded-xl p-6 shadow-[0_2px_10px_rgba(24,24,27,0.03)] flex flex-col justify-between">
              <div>
                {/* Top Proof Row */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E1D8]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-900">
                    SSC Steno Grade C
                  </span>
                  <span className="text-xs font-semibold text-[#991B1B] tabular-nums">
                    100 WPM &middot; 97.4% Acc
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  &ldquo;Shadab Sir's daily dictation practice and 5-minute reading room made all the difference in my SSC skill test. Individual notebook checking helped fix my stroke angles completely.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  AV
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Anjali Verma</div>
                  <div className="text-xs text-slate-500">Selected 2023 &middot; Central Secretariat</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="sp-voice-card bg-white border border-[#E5E1D8] rounded-xl p-6 shadow-[0_2px_10px_rgba(24,24,27,0.03)] flex flex-col justify-between">
              <div>
                {/* Top Proof Row */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E1D8]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-900">
                    Patna High Court PA
                  </span>
                  <span className="text-xs font-semibold text-[#991B1B] tabular-nums">
                    100 WPM &middot; 98.2% Acc
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  &ldquo;The strict backspace lock simulation and legal judgment audio series mirrored the exact Patna High Court exam software. Reached 100 WPM with zero guesswork.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  RK
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Rakesh Kumar</div>
                  <div className="text-xs text-slate-500">Qualified 2022 &middot; Patna High Court Bench</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="sp-voice-card bg-white border border-[#E5E1D8] rounded-xl p-6 shadow-[0_2px_10px_rgba(24,24,27,0.03)] flex flex-col justify-between">
              <div>
                {/* Top Proof Row */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5E1D8]">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-900">
                    Civil Court Steno
                  </span>
                  <span className="text-xs font-semibold text-[#991B1B] tabular-nums">
                    80 WPM &middot; 96.8% Acc
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  &ldquo;Best shorthand institute in Gaya. The dual font support (Kruti Dev 010 and Mangal) in their computer lab is unmatched for judicial exam aspirants.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                  MT
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Md. Tariq</div>
                  <div className="text-xs text-slate-500">Selected 2023 &middot; District Court Gaya</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: COMPACT CENTER DETAILS + FAQ SPLIT
          ========================================================================= */}
      <section className="sp-center-faq-section">
        <div className="sp-container">
          
          <div className="sp-center-faq-grid">
            
            {/* Left Column: Center Location & Helplines */}
            <div className="sp-center-card bg-[#F3F1EC] border border-[#E5E1D8] rounded-2xl">
              <span className="sp-section-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                VISIT OUR CENTER
              </span>
              <h2 className="sp-section-h2" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                Gaya Coaching Center &amp; Helplines
              </h2>

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

              {/* Secondary White Button (No Dark-on-Dark Stacking with Footer) */}
              <div className="sp-center-action-row">
                <button
                  type="button"
                  className="sp-btn-white-secondary bg-white border border-[#D6D2C8] text-zinc-900 hover:bg-[#F3F1EC]"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.75rem 1.25rem', fontSize: '0.875rem', fontWeight: 600 }}
                  onClick={handleOpenDemo}
                >
                  <span>Book 3 Free Demos &rarr;</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive FAQ Accordion */}
            <div className="sp-faq-wrap">
              <span className="sp-section-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                ADMISSIONS FAQ
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
      </section>

      {/* =========================================================================
          SECTION 8: CONTAINED EDITORIAL CLOSING CONVERSION CARD (WARM STONE)
          ========================================================================= */}
      <section className="sp-closing-cta-section bg-white pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="sp-closing-cta-card bg-[#F3F1EC] border border-[#E5E1D8] rounded-2xl py-14 px-6 text-center max-w-5xl mx-auto">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-3 block">
              GET STARTED TODAY
            </span>
            <h2 className="sp-closing-cta-h2 text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900">
              Ready to Build{' '}
              <span className="font-serif italic font-normal text-[#991B1B]">Exam-Hall</span>{' '}
              Speed?
            </h2>
            <p className="sp-closing-cta-sub mt-3 text-base text-slate-600 max-w-xl mx-auto">
              Take a free calibrated audio dictation test online or visit our Gaya College More center for 3 free demo classes.
            </p>
            <div className="sp-closing-cta-buttons mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                className="sp-btn-ink-primary bg-[#18181B] text-white hover:bg-zinc-800 px-6 py-3.5 rounded-lg text-sm font-semibold"
                onClick={handleStartTests}
              >
                <span>Start Free Dictation Test &rarr;</span>
              </button>
              <button
                type="button"
                className="sp-btn-white-secondary bg-white border border-[#D6D2C8] text-zinc-900 hover:bg-[#F3F1EC] px-6 py-3.5 rounded-lg text-sm font-semibold"
                onClick={handleExploreCourses}
              >
                <span>Explore All Courses</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
