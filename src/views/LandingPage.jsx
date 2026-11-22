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
          SECTION 1: EDITORIAL SPLIT HERO + EXAM TRUST STRIP (DEEP CHARCOAL)
          ========================================================================= */}
      <section className="sp-hero-section bg-[#16161A] text-[#F5F3EE] pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-[#27272A]">
        <div className="sp-hero-container">
          <div className="sp-hero-grid">
            
            {/* Left Column (Copy, Trust Signals, CTAs) */}
            <div className="sp-hero-left">
              
              {/* Clean inline trust row (no pills, no glow) */}
              <div className="sp-hero-trust-row text-zinc-400">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Est. 2012 &middot; Gaya College More</span>
                <span className="sp-hero-trust-divider bg-[#3F3F46]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">12+ Years Coaching</span>
                <span className="sp-hero-trust-divider bg-[#3F3F46]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">SSC &amp; High Court Standard</span>
              </div>

              {/* Bold H1 with editorial italic serif accent */}
              <h1 className="mt-4 font-sans text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#F5F3EE]">
                The Gold Standard in{' '}
                <span className="font-serif italic font-normal text-[#F87171] tracking-normal text-[1.08em]">Shorthand</span>{' '}
                &amp; Typing for Govt. Exams
              </h1>

              {/* Concise 2-line subheadline */}
              <p className="mt-5 text-base lg:text-lg text-zinc-300 leading-relaxed max-w-xl">
                Master Pitman Shorthand (50–140 WPM), Hindi Kruti Dev &amp; Mangal typing, and legal dictations—guided by <strong className="text-white font-semibold">Shadab Sir</strong> with automated SSC error evaluation.
              </p>

              {/* Clean CTA row */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  className="bg-[#B91C1C] hover:bg-[#991B1B] text-white px-6 py-3.5 rounded-xl text-sm font-semibold shadow-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                  onClick={handleStartTests}
                >
                  <span>Start Audio Dictation</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="bg-white/5 hover:bg-white/10 border border-white/20 text-[#F5F3EE] px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
                  onClick={handleExploreCourses}
                >
                  <span>Explore Courses</span>
                </button>

                <button
                  type="button"
                  className="text-sm font-medium text-zinc-300 hover:text-white px-2 py-2 transition-colors cursor-pointer"
                  onClick={handleOpenDemo}
                >
                  Book 3 Free Demos &rarr;
                </button>
              </div>

              {/* Pricing & Timing Reassurance micro-line */}
              <p className="mt-5 text-xs text-zinc-400 font-medium">
                Online passes from &#8377;30 &middot; Offline &amp; Live Google Meet batches &middot; 3 Free Demo Classes
              </p>

            </div>

            {/* Right Column (Hero Visual Showcase) */}
            <div className="sp-hero-right">
              <div className="rounded-2xl border border-white/10 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)] bg-[#1A1A20] relative w-full max-w-[540px]">
                <img 
                  src="/assets/institution-hero.jpg" 
                  alt="Shorthand Plus Stenography Classroom &amp; Typing Lab" 
                  className="w-full h-[380px] object-cover object-center block"
                />
                <div className="bg-[#16161A]/85 backdrop-blur-sm border-t border-white/10 px-4 py-3 flex items-center justify-between text-xs text-zinc-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F87171] shrink-0" />
                    <span className="font-medium text-zinc-200">SSC &amp; High Court Exam Standard</span>
                  </div>
                  <span className="font-mono text-zinc-400 tabular-nums">50&ndash;140 WPM</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Flush Exam Authority Strip - Balanced Full-Width Flex Row */}
        <div className="bg-[#E4DFD5] border-y border-[#D1CBBF] py-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[#16161A] font-bold text-xs tracking-wider uppercase whitespace-nowrap">PREPARING ASPIRANTS FOR</span>
            <div className="flex-1 flex flex-wrap items-center justify-between md:justify-end lg:justify-between gap-x-6 gap-y-2 md:pl-12 text-[#16161A] font-semibold text-xs sm:text-sm">
              <span>SSC Stenographer</span>
              <span className="text-[#A8A294]">&middot;</span>
              <span>Patna High Court</span>
              <span className="text-[#A8A294]">&middot;</span>
              <span>Civil Court</span>
              <span className="text-[#A8A294]">&middot;</span>
              <span>EPFO</span>
              <span className="text-[#A8A294]">&middot;</span>
              <span>DRDO</span>
              <span className="text-[#A8A294]">&middot;</span>
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
            
            {/* Left Column: 3 Clickable Accordion/Tab Items */}
            <div className="flex flex-col gap-3">
              
              {/* Tab 0 */}
              <div 
                className={`${activeEngineTab === 0 ? 'bg-[#F7F5F0] border border-[#D1CBBF] border-l-[3px] border-l-[#991B1B] shadow-[0_4px_14px_rgba(22,22,26,0.04)]' : 'bg-transparent border border-transparent hover:bg-[#EAE5DC]/50'} rounded-xl p-5 cursor-pointer text-left transition-all`}
                onClick={() => setActiveEngineTab(0)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-lg font-bold tabular-nums shrink-0 ${activeEngineTab === 0 ? 'text-[#991B1B]' : 'text-zinc-400'}`}>01</span>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-base font-bold transition-colors ${activeEngineTab === 0 ? 'text-[#16161A]' : 'text-zinc-700'}`}>Calibrated Audio Dictation</h3>
                      {activeEngineTab === 0 ? (
                        <ChevronUp size={16} className="text-[#991B1B] shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-zinc-400 shrink-0" />
                      )}
                    </div>
                    {activeEngineTab === 0 && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#991B1B]">50–140 WPM Standard</span>
                    )}
                  </div>
                </div>
                {activeEngineTab === 0 && (
                  <p className="mt-3 text-sm text-zinc-600 leading-relaxed pl-8">
                    Practice 50–140 WPM Pitman &amp; High Court legal dictations with exam-accurate pacing, single-play lock, and mandatory 5-minute reading clock.
                  </p>
                )}
              </div>

              {/* Tab 1 */}
              <div 
                className={`${activeEngineTab === 1 ? 'bg-[#F7F5F0] border border-[#D1CBBF] border-l-[3px] border-l-[#991B1B] shadow-[0_4px_14px_rgba(22,22,26,0.04)]' : 'bg-transparent border border-transparent hover:bg-[#EAE5DC]/50'} rounded-xl p-5 cursor-pointer text-left transition-all`}
                onClick={() => setActiveEngineTab(1)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-lg font-bold tabular-nums shrink-0 ${activeEngineTab === 1 ? 'text-[#991B1B]' : 'text-zinc-400'}`}>02</span>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-base font-bold transition-colors ${activeEngineTab === 1 ? 'text-[#16161A]' : 'text-zinc-700'}`}>Bilingual Typing Studio</h3>
                      {activeEngineTab === 1 ? (
                        <ChevronUp size={16} className="text-[#991B1B] shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-zinc-400 shrink-0" />
                      )}
                    </div>
                    {activeEngineTab === 1 && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#991B1B]">Kruti Dev &amp; Mangal</span>
                    )}
                  </div>
                </div>
                {activeEngineTab === 1 && (
                  <p className="mt-3 text-sm text-zinc-600 leading-relaxed pl-8">
                    Dedicated English QWERTY, Hindi Kruti Dev 010, and Mangal Inscript typing drills with strict backspace-lock simulation and live gross/net WPM.
                  </p>
                )}
              </div>

              {/* Tab 2 */}
              <div 
                className={`${activeEngineTab === 2 ? 'bg-[#F7F5F0] border border-[#D1CBBF] border-l-[3px] border-l-[#991B1B] shadow-[0_4px_14px_rgba(22,22,26,0.04)]' : 'bg-transparent border border-transparent hover:bg-[#EAE5DC]/50'} rounded-xl p-5 cursor-pointer text-left transition-all`}
                onClick={() => setActiveEngineTab(2)}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-lg font-bold tabular-nums shrink-0 ${activeEngineTab === 2 ? 'text-[#991B1B]' : 'text-zinc-400'}`}>03</span>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-base font-bold transition-colors ${activeEngineTab === 2 ? 'text-[#16161A]' : 'text-zinc-700'}`}>Automated SSC Error Evaluation</h3>
                      {activeEngineTab === 2 ? (
                        <ChevronUp size={16} className="text-[#991B1B] shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-zinc-400 shrink-0" />
                      )}
                    </div>
                    {activeEngineTab === 2 && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#991B1B]">Full &amp; Half Error Scoring</span>
                    )}
                  </div>
                </div>
                {activeEngineTab === 2 && (
                  <p className="mt-3 text-sm text-zinc-600 leading-relaxed pl-8">
                    Instant word-by-word diff checking full vs. half mistakes against official SSC and High Court cutoffs with exact percentage qualification criteria.
                  </p>
                )}
              </div>

            </div>

            {/* Right Column: Live Stylized Software UI Mockup Card */}
            <div className="bg-[#F7F5F0] border border-[#D1CBBF] rounded-2xl overflow-hidden shadow-[0_14px_36px_rgba(22,22,26,0.07)]">
              
              {/* Window Title Bar - Crisp Editorial macOS Bar */}
              <div className="bg-[#EAE5DC] border-b border-[#D6D0C4] px-5 py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C4BEB2]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C4BEB2]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C4BEB2]" />
                </div>
                <div className="font-mono text-[11px] font-medium tracking-wider uppercase text-zinc-600 flex items-center gap-2">
                  <span>SHORTHAND PLUS &middot; EXAM ENGINE</span>
                  <span className="text-zinc-400 hidden sm:inline">&middot;</span>
                  <span className="text-zinc-700 hidden sm:inline font-semibold">
                    {activeEngineTab === 0 && "Live Audio Dictation Lab"}
                    {activeEngineTab === 1 && "Bilingual Typing Studio"}
                    {activeEngineTab === 2 && "Forensic Error Audit Diff"}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-500/10 border border-emerald-600/20 px-2.5 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>LIVE SIMULATION</span>
                </div>
              </div>

              {/* Mockup Canvas */}
              <div className="p-6 sm:p-7 bg-[#F7F5F0]">
              
                {/* TAB 0 PREVIEW: Audio Dictation Player */}
                {activeEngineTab === 0 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#991B1B]">
                        <span className="w-2 h-2 rounded-full bg-[#991B1B]" /> LIVE DICTATION
                      </span>
                      <span className="font-mono text-xs text-zinc-500">Track ID: PHC-LEGAL-104</span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#16161A]">
                        Patna High Court Legal Dictation &middot; 100 WPM
                      </h4>
                      <p className="text-xs text-zinc-600 mt-1">
                        Case Law: Cr. Misc. Petitions &middot; Kailash Chandra Vol. 14 Calibration
                      </p>
                    </div>

                    {/* Speed Selector */}
                    <div className="flex items-center gap-3 py-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">CALIBRATED SPEED:</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-[#DED8CC] text-zinc-700">80 WPM</span>
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#16161A] text-white">100 WPM</span>
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-[#DED8CC] text-zinc-700">120 WPM</span>
                      </div>
                    </div>

                    {/* Minimalist Waveform Visualization */}
                    <div className="bg-white/80 border border-[#DED8CC] rounded-xl p-4 flex items-center gap-4">
                      <button 
                        type="button"
                        className="w-11 h-11 rounded-full bg-[#16161A] hover:bg-[#991B1B] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                        onClick={() => setIsPlayingAudioPreview(!isPlayingAudioPreview)}
                        title="Toggle Audio Simulation"
                      >
                        {isPlayingAudioPreview ? <Pause size={18} fill="#FFFFFF" /> : <Play size={18} fill="#FFFFFF" />}
                      </button>

                      <div className="flex-1 h-9 flex items-center gap-1">
                        {[40, 65, 30, 85, 95, 60, 45, 90, 100, 75, 40, 80, 60, 95, 50, 85, 30, 70, 90, 45].map((height, i) => (
                          <span 
                            key={i} 
                            className={`flex-1 rounded-sm transition-colors ${isPlayingAudioPreview && i < 12 ? 'bg-[#991B1B]' : 'bg-[#DED8CC]'}`}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>

                      <span className="font-mono text-xs font-semibold text-zinc-700 tabular-nums shrink-0">
                        {isPlayingAudioPreview ? "02:14 / 05:00" : "00:00 / 05:00"}
                      </span>
                    </div>

                    <div className="mt-2 pt-4 border-t border-[#DED8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-xs text-zinc-600">Strict Single-Play Protocol: Audio plays once without rewind or pause.</span>
                      <button 
                        type="button" 
                        className="whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#16161A] hover:text-[#991B1B] transition-colors cursor-pointer"
                        onClick={handleStartTests}
                      >
                        <span>Open Full Dictation Lab &rarr;</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 1 PREVIEW: Bilingual Typing Lab Simulator */}
                {activeEngineTab === 1 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#991B1B]">
                        <span className="w-2 h-2 rounded-full bg-[#991B1B]" /> TYPING BENCHMARK
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#16161A] text-white">Kruti Dev 010</span>
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-[#DED8CC] text-zinc-600">Mangal Inscript</span>
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-[#DED8CC] text-zinc-600">English QWERTY</span>
                      </div>
                    </div>

                    {/* Live Exam Telemetry HUD */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#DED8CC] bg-[#F1EDE5] rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-[#DED8CC] my-1">
                      <div className="p-3 sm:p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">GROSS SPEED</span>
                        <span className="text-base font-mono font-bold text-[#16161A] tabular-nums">48.2 <span className="text-xs text-zinc-500 font-normal">WPM</span></span>
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">NET ACCURACY</span>
                        <span className="text-base font-mono font-bold text-emerald-700 tabular-nums">98.4%</span>
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">BACKSPACE LOCK</span>
                        <span className="text-base font-mono font-bold text-[#991B1B]">ENFORCED</span>
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">TIME REMAINING</span>
                        <span className="text-base font-mono font-bold text-[#16161A] tabular-nums">07:45</span>
                      </div>
                    </div>

                    {/* Simulated Text Transcription Input Box */}
                    <div className="bg-white/80 border border-[#DED8CC] rounded-xl p-4 font-sans text-sm leading-relaxed">
                      <p className="font-hindi text-zinc-500">
                        न्यायालय के आदेशानुसार उक्त याचिका पर सुनवाई करते हुए न्यायाधीश महोदय ने स्पष्ट किया कि...
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center">
                        <span className="font-hindi text-[#16161A] font-semibold">न्यायालय के आदेशानुसार उक्त</span>
                        <span className="inline-block w-0.5 h-4 bg-[#991B1B] ml-0.5 animate-pulse" />
                      </div>
                    </div>

                    <div className="mt-2 pt-4 border-t border-[#DED8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-xs text-zinc-600">Strict Backspace Lock: Eliminates bad editing habits during live preparation.</span>
                      <button 
                        type="button" 
                        className="whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#16161A] hover:text-[#991B1B] transition-colors cursor-pointer"
                        onClick={() => setCurrentTab && setCurrentTab('typing-studio')}
                      >
                        <span>Launch Typing Engine &rarr;</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2 PREVIEW: Automated SSC Error Evaluation Diff */}
                {activeEngineTab === 2 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-emerald-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" /> FORENSIC AUDIT
                      </span>
                      <span className="font-mono text-xs text-zinc-500">SSC Grade C &middot; 100 WPM</span>
                    </div>

                    {/* Diff Inspection Passage */}
                    <div className="bg-white/80 border border-[#DED8CC] rounded-xl p-4 font-sans text-sm leading-relaxed">
                      <p className="text-zinc-800 leading-relaxed m-0">
                        The proceedings of the{' '}
                        <del className="bg-rose-100 text-rose-800 line-through px-1.5 py-0.5 rounded font-semibold" title="Full Mistake: Word Omitted">
                          honorable
                        </del>{' '}
                        court were adjourned today after hearing the{' '}
                        <span className="border-b-2 border-amber-500 bg-amber-100 text-amber-900 px-1 py-0.5 rounded-sm font-semibold" title="Half Mistake: Spelling typo">
                          parlimentary
                        </span>{' '}
                        arguments presented in the constitutional writ petition without any unnecessary delay.
                      </p>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-rose-400" />
                        <span>Full Mistake (Omission / Addition) &middot; -1.0</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-amber-400" />
                        <span>Half Mistake (Spelling / Case) &middot; -0.5</span>
                      </div>
                    </div>

                    {/* Score Summary Metrics: 4-Column Telemetry Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#DED8CC] bg-[#F1EDE5] rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-[#DED8CC] my-1">
                      <div className="p-3 sm:p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">FULL MISTAKES</span>
                        <span className="text-base font-mono font-bold text-[#16161A] tabular-nums">1 (Omission)</span>
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">HALF MISTAKES</span>
                        <span className="text-base font-mono font-bold text-[#16161A] tabular-nums">1 (Spelling)</span>
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">TOTAL ERROR RATE</span>
                        <span className="text-base font-mono font-bold text-emerald-700 tabular-nums">1.5%</span>
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col gap-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">NET ACCURACY</span>
                        <span className="text-base font-mono font-bold text-[#16161A] tabular-nums">98.5%</span>
                      </div>
                    </div>

                    <div className="mt-2 pt-4 border-t border-[#DED8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-xs text-zinc-600">Full SSC Standard: Certified evaluation matching official Staff Selection Commission rules.</span>
                      <button 
                        type="button" 
                        className="whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#16161A] hover:text-[#991B1B] transition-colors cursor-pointer"
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
      </section>

      {/* =========================================================================
          SECTION 3: HOW PREPARATION WORKS (MINIMAL HORIZONTAL TIMELINE)
          ========================================================================= */}
      <section className="sp-timeline-section bg-[#ECE8E0] border-t border-[#D6D0C4]">
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
            <div className="sp-timeline-col border-t-2 border-[#D6D0C4]">
              <span className="sp-timeline-num text-[#8C8578] font-bold">01</span>
              <h3 className="sp-timeline-title">Listen &amp; Write Shorthand</h3>
              <p className="sp-timeline-desc">
                Take calibrated live or studio dictations in your physical stenography notebook at <strong>60 to 140 WPM</strong>. Master light/dark stroke discrimination and phraseography without hesitations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="sp-timeline-col border-t-2 border-[#D6D0C4]">
              <span className="sp-timeline-num text-[#8C8578] font-bold">02</span>
              <h3 className="sp-timeline-title">Transcribe Under Exam Clock</h3>
              <p className="sp-timeline-desc">
                Review outlines during the 5-minute reading clock, then transcribe in <strong>English, Kruti Dev 010, or Mangal</strong> under strict official exam-hall timing and backspace-lock rules.
              </p>
            </div>

            {/* Step 3 */}
            <div className="sp-timeline-col border-t-2 border-[#D6D0C4]">
              <span className="sp-timeline-num text-[#8C8578] font-bold">03</span>
              <h3 className="sp-timeline-title">Fix Every Single Mistake</h3>
              <p className="sp-timeline-desc">
                Receive automated full and half-mistake percentage reports instantly, combined with daily <strong>handwritten outline review</strong> by Shadab Sir to eliminate recurring stroke angle flaws.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LEGACY & MENTOR EDITORIAL SPLIT (WARM PARCHMENT CANVAS)
          ========================================================================= */}
      <section className="sp-mentor-section bg-[#ECE8E0] border-t border-[#D6D0C4]">
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

            {/* Right Column: Mentor & Academy Visual Card (Soft Ivory #F7F5F0) */}
            <div className="bg-[#F7F5F0] border border-[#D6D0C4] rounded-2xl overflow-hidden shadow-xs">
              {/* Top Visual Frame */}
              <div className="aspect-[4/3] bg-[#E2DDD3] relative overflow-hidden">
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
              <div className="p-5 divide-y divide-[#D6D0C4]/60">
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
      <section className="sp-live-banner-section bg-[#ECE8E0] border-t border-[#D6D0C4]">
        <div className="sp-container">
          <div className="sp-live-banner-card bg-[#F7F5F0] border border-[#D6D0C4] border-l-4 border-l-[#991B1B] rounded-2xl p-8 md:p-12">
            
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
      <section className="sp-voices-section bg-[#ECE8E0] border-t border-[#D6D0C4]">
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
            <div className="sp-voice-card bg-[#F7F5F0] border border-[#D6D0C4] rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                {/* Top Proof Row */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D6D0C4]">
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
            <div className="sp-voice-card bg-[#F7F5F0] border border-[#D6D0C4] rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                {/* Top Proof Row */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D6D0C4]">
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
            <div className="sp-voice-card bg-[#F7F5F0] border border-[#D6D0C4] rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                {/* Top Proof Row */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D6D0C4]">
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
      <section className="sp-center-faq-section bg-[#ECE8E0] border-t border-[#D6D0C4]">
        <div className="sp-container">
          
          <div className="sp-center-faq-grid">
            
            {/* Left Column: Center Location & Helplines (Soft Ivory #F7F5F0) */}
            <div className="sp-center-card bg-[#F7F5F0] border border-[#D6D0C4] rounded-2xl">
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

              {/* Secondary Button */}
              <div className="sp-center-action-row">
                <button
                  type="button"
                  className="sp-btn-white-secondary bg-[#F7F5F0] border border-[#B8B1A3] text-[#16161A] hover:bg-[#E2DDD3]"
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
          SECTION 8: CONTAINED EDITORIAL CLOSING CONVERSION CARD (WARM PARCHMENT CANVAS)
          ========================================================================= */}
      <section className="sp-closing-cta-section bg-[#ECE8E0] border-t border-[#D6D0C4] pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="sp-closing-cta-card bg-[#F7F5F0] border border-[#D6D0C4] rounded-2xl py-14 px-6 text-center max-w-5xl mx-auto">
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
                className="sp-btn-ink-primary bg-[#16161A] text-[#F5F3EE] hover:bg-[#27272A] px-6 py-3.5 rounded-lg text-sm font-semibold transition-colors"
                onClick={handleStartTests}
              >
                <span>Start Free Dictation Test &rarr;</span>
              </button>
              <button
                type="button"
                className="sp-btn-white-secondary bg-transparent border border-[#B8B1A3] text-[#16161A] hover:bg-[#ECE8E0] px-6 py-3.5 rounded-lg text-sm font-semibold transition-colors"
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
