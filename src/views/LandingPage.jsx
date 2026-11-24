import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
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
import { FadeUp, StaggerContainer, StaggerItem, AnimatedCounter, TRANSITION_EASE } from '../components/MotionPrimitives';
import '../landing-redesign.css';

const TRUST_EXAMS = [
  'SSC Stenographer Grade C & D',
  'Patna High Court PA',
  'Civil Court Stenographer',
  'EPFO Personal Assistant',
  'DRDO Admin & Allied',
  'BSSC Stenographer',
  'Parliament Reporter',
  'Supreme Court SPA',
  'Allahabad High Court'
];

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
  const [previewSpeed, setPreviewSpeed] = useState('100');

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
          SECTION 1: BESPOKE EDITORIAL HERO WITH ANIMATED PITMAN SHORTHAND
          ========================================================================= */}
      <section 
        className="sp-bespoke-hero-section"
        style={{
          backgroundColor: '#FBF8F3',
          color: '#231418',
          width: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle warm stone dot/grid pattern */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(#E2D8CC 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
            opacity: 0.25,
            pointerEvents: 'none'
          }} 
        />

        {/* Signature Background Detail: Animated Pitman Shorthand Line-Art */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          <svg 
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0.05,
              pointerEvents: 'none'
            }}
            viewBox="0 0 1440 800" 
            fill="none" 
            preserveAspectRatio="xMidYMid slice" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fine ruled notebook hairlines (Top Right) */}
            <line x1="860" y1="160" x2="1420" y2="160" stroke="#231418" strokeWidth="1" strokeDasharray="4 6" />
            <line x1="880" y1="210" x2="1440" y2="210" stroke="#231418" strokeWidth="1" strokeDasharray="4 6" />
            <line x1="920" y1="260" x2="1440" y2="260" stroke="#231418" strokeWidth="1" strokeDasharray="4 6" />
            <line x1="950" y1="310" x2="1440" y2="310" stroke="#231418" strokeWidth="1" strokeDasharray="4 6" />

            {/* Authentic Pitman Shorthand Stroke Arcs & Outlines (Top Right Cluster) */}
            {/* Downward straight stroke (T/D) & Grammalogue tick */}
            <motion.path 
              d="M1020 110 L1020 160 M1020 160 L1040 175" 
              stroke="#231418" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: TRANSITION_EASE }}
            />
            {/* Light curve F/V arc */}
            <motion.path 
              d="M1080 115 C1105 130 1115 150 1095 160" 
              stroke="#231418" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.1, ease: TRANSITION_EASE }}
            />
            {/* Slanted stroke with initial R-hook (P-R) */}
            <motion.path 
              d="M1150 120 C1140 125 1145 135 1155 132 L1185 160" 
              stroke="#231418" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.15, ease: TRANSITION_EASE }}
            />
            {/* Phraseography Circle & Stroke (as-is / is-as) */}
            <motion.path 
              d="M1230 148 A 12 12 0 1 1 1218 136 L1248 160" 
              stroke="#231418" strokeWidth="2.2" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: TRANSITION_EASE }}
            />
            {/* Compound outline: Ray + Ish + T (Shorthand outline) */}
            <motion.path 
              d="M1100 210 L1130 180 C1145 195 1165 195 1175 210 L1175 240" 
              stroke="#231418" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.25, ease: TRANSITION_EASE }}
            />
            {/* Halving principle stroke (Court / Legal) */}
            <motion.path 
              d="M1230 210 C1250 195 1270 205 1285 210 M1285 210 L1295 198" 
              stroke="#231418" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: TRANSITION_EASE }}
            />
            {/* Vowel indicator dots and dashes */}
            <circle cx="1035" cy="135" r="3.5" fill="#231418" />
            <circle cx="1115" cy="140" r="3.5" fill="#231418" />
            <line x1="1195" y1="135" x2="1205" y2="132" stroke="#231418" strokeWidth="2.5" strokeLinecap="round" />

            {/* Fine ruled notebook hairlines (Bottom Left - Trimmed & Shifted to Lower Corner) */}
            <line x1="0" y1="710" x2="260" y2="710" stroke="#231418" strokeWidth="1" strokeDasharray="4 6" />
            <line x1="0" y1="750" x2="280" y2="750" stroke="#231418" strokeWidth="1" strokeDasharray="4 6" />
            <line x1="0" y1="785" x2="300" y2="785" stroke="#231418" strokeWidth="1" strokeDasharray="4 6" />

            {/* Authentic Pitman Shorthand Stroke Arcs (Bottom Left Cluster - Lowered away from metrics) */}
            {/* Long curve stroke (Ith / The) */}
            <motion.path 
              d="M40 680 C65 700 75 715 60 720" 
              stroke="#231418" strokeWidth="2.4" strokeLinecap="round"
              initial={{ pathLength: 0.3, opacity: 0.85 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.15, ease: TRANSITION_EASE }}
            />
            {/* Upward ray + small circle */}
            <motion.path 
              d="M100 720 L135 675 A 9 9 0 1 1 125 665" 
              stroke="#231418" strokeWidth="2.2" strokeLinecap="round"
              initial={{ pathLength: 0.3, opacity: 0.85 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: TRANSITION_EASE }}
            />
            {/* Horizontal stroke K/G with final N-hook */}
            <motion.path 
              d="M180 720 L230 720 C240 715 242 710 235 708" 
              stroke="#231418" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0.3, opacity: 0.85 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.25, ease: TRANSITION_EASE }}
            />
            {/* Double curve grammalogue (Special / Speed) */}
            <motion.path 
              d="M70 760 C100 735 130 780 170 760" 
              stroke="#231418" strokeWidth="2.4" strokeLinecap="round"
              initial={{ pathLength: 0.3, opacity: 0.85 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: TRANSITION_EASE }}
            />
            {/* Intersected stroke (Government / High Court abbreviation) */}
            <motion.path 
              d="M200 745 L235 780 M195 765 L245 755" 
              stroke="#231418" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0.3, opacity: 0.85 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.35, ease: TRANSITION_EASE }}
            />
            {/* Vowel indicators */}
            <circle cx="115" cy="695" r="3.5" fill="#231418" />
            <circle cx="205" cy="735" r="3.5" fill="#231418" />
          </svg>
        </div>

        {/* Inner container: desktop strict 2-column side-by-side */}
        <div className="sp-bespoke-hero-grid">
          
          {/* Left Column (Desktop 1st Column) */}
          <div className="sp-bespoke-hero-left">
            
            {/* Eyebrow */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#8A7B7E',
                marginBottom: '4px'
              }}
            >
              <span className="sp-live-pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#991B1B', display: 'inline-block', flexShrink: 0 }} />
              <span>EST. 2012</span>
              <span>&middot;</span>
              <span>GAYA COLLEGE MORE</span>
              <span>&middot;</span>
              <span>12+ YEARS COACHING</span>
            </div>

            {/* Commanding Display H1 (Masked Line-by-Line Reveal) */}
            <h1 
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2.75rem, 4.5vw, 4.25rem)',
                lineHeight: 1.08,
                fontWeight: 400,
                color: '#231418',
                letterSpacing: '-0.02em',
                margin: '1rem 0 0 0'
              }}
            >
              <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '3px' }}>
                <motion.span 
                  style={{ display: 'block' }}
                  initial={{ opacity: 0.85, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.05, ease: TRANSITION_EASE }}
                >
                  The Gold Standard in
                </motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '3px' }}>
                <motion.span 
                  style={{ display: 'block' }}
                  initial={{ opacity: 0.85, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.14, ease: TRANSITION_EASE }}
                >
                  <span style={{ fontStyle: 'italic', color: '#991B1B', position: 'relative', display: 'inline-block' }}>
                    Shorthand
                    <svg 
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '100%',
                        height: '6px',
                        overflow: 'visible',
                        pointerEvents: 'none'
                      }}
                      viewBox="0 0 120 8" 
                      fill="none"
                    >
                      <motion.path 
                        d="M2 6C35 2 85 2 118 5" 
                        stroke="#991B1B" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        initial={{ pathLength: 0.3, opacity: 0.85 }} 
                        animate={{ pathLength: 1, opacity: 0.95 }} 
                        transition={{ duration: 0.8, delay: 0.3, ease: TRANSITION_EASE }} 
                      />
                    </svg>
                  </span>{' '}&amp; Typing
                </motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '3px' }}>
                <motion.span 
                  style={{ display: 'block' }}
                  initial={{ opacity: 0.85, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.23, ease: TRANSITION_EASE }}
                >
                  for Govt. Exams.
                </motion.span>
              </span>
            </h1>

            {/* Subheadline */}
            <p 
              style={{
                marginTop: '1.25rem',
                fontSize: '15.5px',
                color: '#594A4D',
                lineHeight: 1.6,
                maxWidth: '520px',
                marginBottom: 0
              }}
            >
              Master Pitman Shorthand (50–140 WPM), Hindi Kruti Dev &amp; Mangal typing, and legal dictations—guided by <strong style={{ fontWeight: 600, color: '#231418' }}>Shadab Sir</strong> with automated SSC error evaluation.
            </p>

            {/* Refined Pill CTA Row */}
            <div 
              style={{
                marginTop: '1.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                onClick={handleStartTests}
                style={{
                  backgroundColor: '#991B1B',
                  color: '#FFFFFF',
                  padding: '13px 24px',
                  borderRadius: '9999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  boxShadow: '0 8px 22px rgba(153,27,27,0.22)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <span>Start Audio Dictation</span>
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                onClick={handleExploreCourses}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#231418',
                  border: '1px solid #D8CCBE',
                  padding: '13px 24px',
                  borderRadius: '9999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <span>Explore Courses</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                onClick={handleOpenDemo}
                style={{
                  backgroundColor: 'transparent',
                  color: '#594A4D',
                  border: 'none',
                  padding: '8px 12px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease'
                }}
              >
                Book 3 Free Demos &rarr;
              </motion.button>
            </div>

            {/* Clean 3-Metric Proof Bar */}
            <div 
              style={{
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid #E5DBD0',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.25rem',
                maxWidth: '440px',
                width: '100%'
              }}
            >
              <div>
                <div 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: '1.85rem',
                    color: '#231418',
                    lineHeight: 1
                  }}
                >
                  12+ Yrs
                </div>
                <div style={{ fontSize: '11px', fontWeight: 500, color: '#8A7B7E', marginTop: '6px' }}>
                  Gaya Legacy
                </div>
              </div>
              <div>
                <div 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: '1.85rem',
                    color: '#231418',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  50&ndash;140
                </div>
                <div style={{ fontSize: '11px', fontWeight: 500, color: '#8A7B7E', marginTop: '6px' }}>
                  WPM Speed Range
                </div>
              </div>
              <div>
                <div 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: '1.85rem',
                    color: '#231418',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  2,700+
                </div>
                <div style={{ fontSize: '11px', fontWeight: 500, color: '#8A7B7E', marginTop: '6px' }}>
                  Trained Aspirants
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Desktop 2nd Column) */}
          <div className="sp-bespoke-hero-right">
            <div style={{ position: 'relative', width: '100%', maxWidth: '540px', margin: '0 auto' }}>
              {/* Architectural Warm-Sand Mat */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.65, ease: TRANSITION_EASE }}
                style={{
                  backgroundColor: '#EFE7DC',
                  padding: '12px',
                  borderRadius: '26px',
                  border: '1px solid #E0D5C7',
                  boxShadow: '0 24px 54px rgba(35,20,24,0.10)'
                }}
              >
                {/* Classroom Photo inside overflow-hidden frame */}
                <div style={{ overflow: 'hidden', borderRadius: '18px' }}>
                  <img 
                    src="/assets/institution-hero.jpg" 
                    alt="Shorthand Plus Stenography Classroom &amp; Typing Lab" 
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      borderRadius: '18px',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.7s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>

                {/* Clean Right-Aligned Caption Inside Mat */}
                <div 
                  style={{
                    paddingTop: '10px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingBottom: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    fontSize: '11px'
                  }}
                >
                  <span 
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontWeight: 600,
                      color: '#991B1B',
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '0.05em'
                    }}
                  >
                    SSC &amp; High Court Standard &middot; GAYA
                  </span>
                </div>
              </motion.div>

              {/* Floating Live Telemetry Pill (Bottom-Left Overlap) */}
              <motion.div 
                initial={{ opacity: 0.85, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease: TRANSITION_EASE }}
                className="sp-telemetry-pill"
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  left: '-16px',
                  zIndex: 20,
                  backgroundColor: 'rgba(255,255,255,0.96)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid #E5DBD0',
                  borderRadius: '9999px',
                  padding: '8px 16px 8px 12px',
                  boxShadow: '0 12px 30px rgba(35,20,24,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span className="sp-live-pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#991B1B', display: 'inline-block', flexShrink: 0 }} />
                <span 
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#231418',
                    fontVariantNumeric: 'tabular-nums',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Next Live Dictation &middot; 8:30 AM &middot; 80 WPM
                </span>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* Step 3: Exam Authority Strip (Continuous Seamless Marquee) */}
      <div 
        style={{
          background: '#EFE7DC',
          borderTop: '1px solid #E3D9CC',
          borderBottom: '1px solid #E3D9CC',
          padding: '12px 0',
          width: '100%',
          margin: 0,
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          <span 
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#8A7B7E',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>PREPARING FOR:</span>
          </span>

          <div className="sp-marquee-wrapper" style={{ flex: 1, minWidth: 0 }}>
            <div className="sp-marquee-track">
              {/* Set 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '28px', paddingRight: '28px' }}>
                {TRUST_EXAMS.map((exam, idx) => (
                  <React.Fragment key={`e1-${idx}`}>
                    <span style={{ color: '#231418', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {exam}
                    </span>
                    <span style={{ color: '#C9BCB0' }}>&middot;</span>
                  </React.Fragment>
                ))}
              </div>
              {/* Set 2 (for continuous seamless loop) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '28px', paddingRight: '28px' }}>
                {TRUST_EXAMS.map((exam, idx) => (
                  <React.Fragment key={`e2-${idx}`}>
                    <span style={{ color: '#231418', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {exam}
                    </span>
                    <span style={{ color: '#C9BCB0' }}>&middot;</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: INTERACTIVE EXAM ENGINE SHOWCASE (THE CENTERPIECE)
          ========================================================================= */}
      <section 
        className="sp-engine-section"
        style={{
          background: '#FBF8F3',
          padding: '56px 0',
          width: '100%',
          borderTop: '1px solid #E8DFD3'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
        >
          {/* Header (Left-aligned, max-w-2xl) */}
          <FadeUp>
            <div style={{ maxWidth: '680px', marginBottom: '32px', textAlign: 'left' }}>
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#8A7B7E',
                  marginBottom: '8px',
                  display: 'block'
                }}
              >
                THE SHORTHAND PLUS PLATFORM
              </span>
              <h2 
                className="font-serif font-normal text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.08] tracking-[-0.015em] text-[#231418]"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 'clamp(1.875rem, 3.2vw, 2.65rem)',
                  fontWeight: 400,
                  color: '#231418',
                  lineHeight: 1.08,
                  letterSpacing: '-0.015em',
                  margin: '0 0 10px 0'
                }}
              >
                Built like the exam hall, <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>down to every keystroke.</span>
              </h2>
              <p 
                style={{
                  fontSize: '15px',
                  color: '#8A7B7E',
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                Experience the dual-stage examination simulation trusted by Bihar's top stenography qualifiers:
              </p>
            </div>
          </FadeUp>

          {/* 2-Column Interactive Split (lg:grid-cols-12 gap-10 items-start) */}
          <div 
            className="sp-engine-grid-2col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '36px',
              alignItems: 'start'
            }}
          >
            {/* Left Column (lg:col-span-5 — 3 Clickable Tabs) */}
            <div 
              className="sp-engine-col-tabs"
              style={{
                gridColumn: 'span 5 / span 5',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {/* Tab 0 */}
              <div 
                onClick={() => setActiveEngineTab(0)}
                role="button"
                tabIndex={0}
                style={activeEngineTab === 0 ? {
                  background: '#FFFFFF',
                  borderTop: '1px solid #E8DFD3',
                  borderRight: '1px solid #E8DFD3',
                  borderBottom: '1px solid #E8DFD3',
                  borderLeft: '3px solid #991B1B',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                } : {
                  padding: '16px 20px',
                  borderBottom: '1px solid #E8DFD3',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  background: 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <span 
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '18px',
                      fontWeight: 700,
                      color: activeEngineTab === 0 ? '#991B1B' : '#78716C',
                      lineHeight: 1,
                      flexShrink: 0
                    }}
                  >
                    01
                  </span>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <h3 
                        style={{
                          fontSize: '16px',
                          fontWeight: activeEngineTab === 0 ? 700 : 600,
                          color: activeEngineTab === 0 ? '#16161A' : '#57534E',
                          margin: 0,
                          transition: 'color 0.2s'
                        }}
                      >
                        Calibrated Audio Dictation
                      </h3>
                      {activeEngineTab === 0 ? (
                        <ChevronUp size={16} color="#991B1B" style={{ flexShrink: 0 }} />
                      ) : (
                        <ChevronDown size={16} color="#78716C" style={{ flexShrink: 0 }} />
                      )}
                    </div>
                    {activeEngineTab === 0 && (
                      <span 
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#991B1B'
                        }}
                      >
                        50–140 WPM Standard
                      </span>
                    )}
                  </div>
                </div>
                {activeEngineTab === 0 && (
                  <p 
                    style={{
                      marginTop: '12px',
                      fontSize: '14px',
                      color: '#8A7B7E',
                      lineHeight: 1.6,
                      paddingLeft: '34px',
                      margin: '12px 0 0 0'
                    }}
                  >
                    Practice 50–140 WPM Pitman &amp; High Court legal dictations with exam-accurate pacing, single-play lock, and mandatory 5-minute reading clock.
                  </p>
                )}
              </div>

              {/* Tab 1 */}
              <div 
                onClick={() => setActiveEngineTab(1)}
                role="button"
                tabIndex={0}
                style={activeEngineTab === 1 ? {
                  background: '#FFFFFF',
                  borderTop: '1px solid #E8DFD3',
                  borderRight: '1px solid #E8DFD3',
                  borderBottom: '1px solid #E8DFD3',
                  borderLeft: '3px solid #991B1B',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                } : {
                  padding: '16px 20px',
                  borderBottom: '1px solid #E8DFD3',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  background: 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <span 
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '18px',
                      fontWeight: 700,
                      color: activeEngineTab === 1 ? '#991B1B' : '#78716C',
                      lineHeight: 1,
                      flexShrink: 0
                    }}
                  >
                    02
                  </span>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <h3 
                        style={{
                          fontSize: '16px',
                          fontWeight: activeEngineTab === 1 ? 700 : 600,
                          color: activeEngineTab === 1 ? '#16161A' : '#57534E',
                          margin: 0,
                          transition: 'color 0.2s'
                        }}
                      >
                        Bilingual Typing Studio
                      </h3>
                      {activeEngineTab === 1 ? (
                        <ChevronUp size={16} color="#991B1B" style={{ flexShrink: 0 }} />
                      ) : (
                        <ChevronDown size={16} color="#78716C" style={{ flexShrink: 0 }} />
                      )}
                    </div>
                    {activeEngineTab === 1 && (
                      <span 
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#991B1B'
                        }}
                      >
                        Kruti Dev &amp; Mangal
                      </span>
                    )}
                  </div>
                </div>
                {activeEngineTab === 1 && (
                  <p 
                    style={{
                      marginTop: '12px',
                      fontSize: '14px',
                      color: '#8A7B7E',
                      lineHeight: 1.6,
                      paddingLeft: '34px',
                      margin: '12px 0 0 0'
                    }}
                  >
                    Dedicated English QWERTY, Hindi Kruti Dev 010, and Mangal Inscript typing drills with strict backspace-lock simulation and live gross/net WPM.
                  </p>
                )}
              </div>

              {/* Tab 2 */}
              <div 
                onClick={() => setActiveEngineTab(2)}
                role="button"
                tabIndex={0}
                style={activeEngineTab === 2 ? {
                  background: '#FFFFFF',
                  borderTop: '1px solid #E8DFD3',
                  borderRight: '1px solid #E8DFD3',
                  borderBottom: '1px solid #E8DFD3',
                  borderLeft: '3px solid #991B1B',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                } : {
                  padding: '16px 20px',
                  borderBottom: '1px solid #E8DFD3',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  background: 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <span 
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '18px',
                      fontWeight: 700,
                      color: activeEngineTab === 2 ? '#991B1B' : '#78716C',
                      lineHeight: 1,
                      flexShrink: 0
                    }}
                  >
                    03
                  </span>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <h3 
                        style={{
                          fontSize: '16px',
                          fontWeight: activeEngineTab === 2 ? 700 : 600,
                          color: activeEngineTab === 2 ? '#16161A' : '#57534E',
                          margin: 0,
                          transition: 'color 0.2s'
                        }}
                      >
                        Automated SSC Error Evaluation
                      </h3>
                      {activeEngineTab === 2 ? (
                        <ChevronUp size={16} color="#991B1B" style={{ flexShrink: 0 }} />
                      ) : (
                        <ChevronDown size={16} color="#78716C" style={{ flexShrink: 0 }} />
                      )}
                    </div>
                    {activeEngineTab === 2 && (
                      <span 
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#991B1B'
                        }}
                      >
                        Full &amp; Half Error Scoring
                      </span>
                    )}
                  </div>
                </div>
                {activeEngineTab === 2 && (
                  <p 
                    style={{
                      marginTop: '12px',
                      fontSize: '14px',
                      color: '#8A7B7E',
                      lineHeight: 1.6,
                      paddingLeft: '34px',
                      margin: '12px 0 0 0'
                    }}
                  >
                    Instant word-by-word diff checking full vs. half mistakes against official SSC and High Court cutoffs with exact percentage qualification criteria.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column (lg:col-span-7 — Restored Software Mockup Window) */}
            <div 
              className="sp-engine-col-preview"
              style={{
                gridColumn: 'span 7 / span 7',
                minWidth: 0,
                width: '100%'
              }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: TRANSITION_EASE }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E8DFD3',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)',
                  width: '100%'
                }}
              >
                {/* Subtle Top Toolbar */}
                <div 
                  style={{
                    background: '#F4EFE7',
                    borderBottom: '1px solid #E8DFD3',
                    padding: '12px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#C4BEB2', display: 'inline-block' }} />
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#C4BEB2', display: 'inline-block' }} />
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#C4BEB2', display: 'inline-block' }} />
                    </div>
                    <span 
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#8A7B7E',
                        marginLeft: '8px'
                      }}
                    >
                      SHORTHAND PLUS &middot; EXAM ENGINE
                    </span>
                  </div>
                  
                  <div 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#047857',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      background: 'rgba(5, 150, 105, 0.1)',
                      border: '1px solid rgba(5, 150, 105, 0.2)',
                      borderRadius: '6px',
                      padding: '3px 8px'
                    }}
                  >
                    <span className="sp-live-pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
                    <span>EXAM ACTIVE</span>
                  </div>
                </div>

                {/* Mockup Body (padding: 24px) */}
                <div style={{ padding: '24px', background: '#FFFFFF' }}>
                  <AnimatePresence mode="wait">
                    {/* Tab 0 Preview */}
                    {activeEngineTab === 0 && (
                      <motion.div
                        key="tab-0"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: TRANSITION_EASE }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#991B1B' }}>
                            <span className="sp-live-pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#991B1B', display: 'inline-block' }} />
                            LIVE DICTATION
                          </span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#8A7B7E' }}>Track ID: PHC-LEGAL-104</span>
                        </div>

                        <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '14px 0 4px 0' }}>
                          Patna High Court Legal Dictation &middot; {previewSpeed} WPM
                        </h4>
                        <p style={{ fontSize: '13px', color: '#8A7B7E', margin: '0 0 16px 0' }}>
                          Case Law: Cr. Misc. Petitions &middot; Kailash Chandra Vol. 14 Calibration
                        </p>

                        {/* Speed Selector */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
                          <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8A7B7E' }}>CALIBRATED SPEED:</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {['80', '100', '120'].map((speed) => {
                              const isActive = previewSpeed === speed;
                              return (
                                <button
                                  key={speed}
                                  type="button"
                                  onClick={() => setPreviewSpeed(speed)}
                                  style={{
                                    padding: '4px 12px',
                                    borderRadius: '9999px',
                                    fontSize: '12px',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontWeight: isActive ? 600 : 500,
                                    backgroundColor: isActive ? '#231418' : '#EFE7DC',
                                    color: isActive ? '#FAF6F0' : '#594A4D',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                  }}
                                >
                                  {speed} WPM
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Waveform Player inside bordered panel */}
                        <div 
                          style={{
                            background: '#FBF8F3',
                            border: '1px solid #E8DFD3',
                            borderRadius: '12px',
                            padding: '16px',
                            margin: '16px 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                          }}
                        >
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsPlayingAudioPreview(!isPlayingAudioPreview)}
                            title="Toggle Audio Simulation"
                            style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              background: '#231418',
                              border: 'none',
                              color: '#FFFFFF',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              boxShadow: '0 2px 8px rgba(35, 20, 24, 0.15)'
                            }}
                          >
                            {isPlayingAudioPreview ? <Pause size={18} fill="#FFFFFF" /> : <Play size={18} fill="#FFFFFF" />}
                          </motion.button>

                          <div style={{ flex: 1, height: '36px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {[40, 65, 30, 85, 95, 60, 45, 90, 100, 75, 40, 80, 60, 95, 50, 85, 30, 70, 90, 45].map((height, i) => (
                              <span 
                                key={i} 
                                style={{
                                  flex: 1,
                                  height: isPlayingAudioPreview ? `${Math.min(100, Math.max(25, (height + ((i % 4) * 12) * (i % 2 === 0 ? 1 : -0.5))))}%` : `${height}%`,
                                  borderRadius: '2px',
                                  background: isPlayingAudioPreview && i < 14 ? '#991B1B' : '#DED8CC',
                                  transition: `height ${previewSpeed === '120' ? '0.12s' : previewSpeed === '80' ? '0.45s' : '0.25s'} ease, background-color 0.2s ease`
                                }}
                              />
                            ))}
                          </div>

                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 600, color: '#231418', flexShrink: 0 }}>
                            {isPlayingAudioPreview ? "02:14 / 05:00" : "00:00 / 05:00"}
                          </span>
                        </div>

                        {/* Bottom Footer Row */}
                        <div 
                          style={{
                            marginTop: '20px',
                            paddingTop: '16px',
                            borderTop: '1px solid #E8DFD3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            flexWrap: 'wrap'
                          }}
                        >
                          <span style={{ fontSize: '12px', color: '#8A7B7E' }}>Strict Single-Play Protocol: Audio plays once without rewind or pause.</span>
                          <button
                            type="button"
                            onClick={handleStartTests}
                            style={{
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                              background: 'none',
                              border: 'none',
                              color: '#231418',
                              fontWeight: 600,
                              fontSize: '13px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>Open Full Dictation Lab &rarr;</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 1 Preview (Bilingual Typing Studio) */}
                    {activeEngineTab === 1 && (
                      <motion.div
                        key="tab-1"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: TRANSITION_EASE }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#991B1B' }}>
                            <span className="sp-live-pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#991B1B', display: 'inline-block' }} />
                            TYPING BENCHMARK
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#231418', color: '#FFFFFF' }}>Kruti Dev 010</span>
                            <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#FFFFFF', border: '1px solid #E8DFD3', color: '#8A7B7E' }}>Mangal Inscript</span>
                            <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#FFFFFF', border: '1px solid #E8DFD3', color: '#8A7B7E' }}>English QWERTY</span>
                          </div>
                        </div>

                        {/* 4 Metrics in clean 4-column HUD grid */}
                        <div 
                          className="sp-telemetry-4col"
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '12px',
                            margin: '16px 0'
                          }}
                        >
                          <div style={{ background: '#FBF8F3', border: '1px solid #E8DFD3', borderRadius: '12px', padding: '14px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>GROSS SPEED</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#231418' }}>48.2 <span style={{ fontSize: '12px', color: '#8A7B7E', fontWeight: 500 }}>WPM</span></span>
                          </div>
                          <div style={{ background: '#FBF8F3', border: '1px solid #E8DFD3', borderRadius: '12px', padding: '14px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>NET ACCURACY</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#047857' }}>98.4%</span>
                          </div>
                          <div style={{ background: '#FBF8F3', border: '1px solid #E8DFD3', borderRadius: '12px', padding: '14px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>BACKSPACE LOCK</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#991B1B' }}>ENFORCED</span>
                          </div>
                          <div style={{ background: '#FBF8F3', border: '1px solid #E8DFD3', borderRadius: '12px', padding: '14px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>TIME REMAINING</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#231418' }}>07:45</span>
                          </div>
                        </div>

                        {/* Simulated Text Transcription Input Box */}
                        <div style={{ background: '#FFFFFF', border: '1px solid #E8DFD3', borderRadius: '10px', padding: '16px', fontSize: '15px', margin: '16px 0', lineHeight: 1.7 }}>
                          <p className="font-hindi" style={{ color: '#8A7B7E', margin: '0 0 8px 0' }}>
                            न्यायालय के आदेशानुसार उक्त याचिका पर सुनवाई करते हुए न्यायाधीश महोदय ने स्पष्ट किया कि...
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="font-hindi" style={{ color: '#231418', fontWeight: 600 }}>न्यायालय के आदेशानुसार उक्त</span>
                            <span className="sp-blinking-caret" style={{ display: 'inline-block', width: '2px', height: '1.2em', background: '#991B1B', marginLeft: '3px' }} />
                          </div>
                        </div>

                        {/* Bottom Footer Row */}
                        <div 
                          style={{
                            marginTop: '20px',
                            paddingTop: '16px',
                            borderTop: '1px solid #E8DFD3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            flexWrap: 'wrap'
                          }}
                        >
                          <span style={{ fontSize: '12px', color: '#8A7B7E' }}>Strict Backspace Lock: Eliminates bad editing habits during live preparation.</span>
                          <button
                            type="button"
                            onClick={() => setCurrentTab && setCurrentTab('typing-studio')}
                            style={{
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                              background: 'none',
                              border: 'none',
                              color: '#231418',
                              fontWeight: 600,
                              fontSize: '13px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>Launch Typing Engine &rarr;</span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 2 Preview (Automated SSC Error Evaluation Diff) */}
                    {activeEngineTab === 2 && (
                      <motion.div
                        key="tab-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: TRANSITION_EASE }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#047857' }}>
                            <span className="sp-live-pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
                            FORENSIC AUDIT
                          </span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#8A7B7E' }}>SSC Grade C &middot; 100 WPM</span>
                        </div>

                        {/* Diff Inspection Passage inside bordered panel */}
                        <div style={{ background: '#FFFFFF', border: '1px solid #E8DFD3', borderRadius: '12px', padding: '16px', margin: '16px 0', fontSize: '14px', lineHeight: 1.7 }}>
                          <p style={{ color: '#231418', margin: 0 }}>
                            The proceedings of the{' '}
                            <del style={{ background: '#FEE2E2', color: '#B91C1C', textDecoration: 'line-through', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }} title="Full Mistake: Word Omitted">
                              honorable
                            </del>{' '}
                            court were adjourned today after hearing the{' '}
                            <span style={{ borderBottom: '2px solid #F59E0B', background: '#FEF3C7', color: '#B45309', padding: '1px 5px', borderRadius: '2px', fontWeight: 600 }} title="Half Mistake: Spelling typo">
                              parlimentary
                            </span>{' '}
                            arguments presented in the constitutional writ petition without any unnecessary delay.
                          </p>
                        </div>

                        {/* Legend */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#8A7B7E', margin: '12px 0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#F87171', display: 'inline-block' }} />
                            <span>Full Mistake (Omission / Addition) &middot; -1.0</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#FBBF24', display: 'inline-block' }} />
                            <span>Half Mistake (Spelling / Case) &middot; -0.5</span>
                          </div>
                        </div>

                        {/* Score Summary Metrics: 4-Column Grid inside bordered panels */}
                        <div 
                          className="sp-telemetry-4col"
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '12px',
                            margin: '16px 0'
                          }}
                        >
                          <div style={{ background: '#FBF8F3', border: '1px solid #E8DFD3', borderRadius: '12px', padding: '14px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>FULL MISTAKES</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#231418' }}>1 (Omission)</span>
                          </div>
                          <div style={{ background: '#FBF8F3', border: '1px solid #E8DFD3', borderRadius: '12px', padding: '14px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>HALF MISTAKES</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#231418' }}>1 (Spelling)</span>
                          </div>
                          <div style={{ background: '#FBF8F3', border: '1px solid #E8DFD3', borderRadius: '12px', padding: '14px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>TOTAL ERROR RATE</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#047857' }}>1.5%</span>
                          </div>
                          <div style={{ background: '#FBF8F3', border: '1px solid #E8DFD3', borderRadius: '12px', padding: '14px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>NET ACCURACY</span>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#231418' }}>98.5%</span>
                          </div>
                        </div>

                        {/* Bottom Footer Row */}
                        <div 
                          style={{
                            marginTop: '20px',
                            paddingTop: '16px',
                            borderTop: '1px solid #E8DFD3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            flexWrap: 'wrap'
                          }}
                        >
                          <span style={{ fontSize: '12px', color: '#8A7B7E' }}>Full SSC Standard: Certified evaluation matching official Staff Selection Commission rules.</span>
                          <button 
                            type="button" 
                            onClick={handleStartTests}
                            style={{
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                              background: 'none',
                              border: 'none',
                              color: '#231418',
                              fontWeight: 600,
                              fontSize: '13px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>Try Full Mock Exam &rarr;</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HOW PREPARATION WORKS (MINIMAL HORIZONTAL TIMELINE)
          ========================================================================= */}
      <section className="sp-timeline-section bg-[#EFE7DC] border-t border-[#E3D9CC]">
        <div className="sp-container">
          
          <FadeUp>
            <div className="sp-timeline-head-row">
              <div>
                <span className="sp-section-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[#594A4D]">
                  PEDAGOGICAL ROADMAP
                </span>
                <h2 
                  className="sp-section-h2 font-serif font-normal text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.08] tracking-[-0.015em] text-[#231418]" 
                  style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.875rem, 3.2vw, 2.65rem)',
                    fontWeight: 400,
                    lineHeight: 1.08,
                    letterSpacing: '-0.015em',
                    color: '#231418',
                    textAlign: 'left', 
                    margin: 0 
                  }}
                >
                  From first outline <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>to final selection.</span>
                </h2>
              </div>
              <button
                type="button"
                className="sp-timeline-all-courses-link group"
                onClick={handleExploreCourses}
              >
                <span>View All Courses</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </FadeUp>

          {/* Animated Connecting Rule */}
          <motion.div 
            initial={{ scaleX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.8, ease: TRANSITION_EASE }} 
            style={{ 
              transformOrigin: '0% 50%', 
              height: '2px', 
              background: '#DFD4C6', 
              width: '100%', 
              marginBottom: '1.25rem' 
            }} 
          />

          <div className="sp-timeline-grid">
            
            {/* Step 1 */}
            <FadeUp delay={0}>
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="sp-timeline-col border-t-2 border-[#E8DFD3]"
              >
                <span 
                  className="sp-timeline-num text-[#8A7B7E]"
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: '1.875rem',
                    lineHeight: 1,
                    color: '#8A7B7E',
                    fontWeight: 400
                  }}
                >
                  01
                </span>
                <h3 className="sp-timeline-title">Listen &amp; Write Shorthand</h3>
                <p className="sp-timeline-desc">
                  Take calibrated live or studio dictations in your physical stenography notebook at <strong>60 to 140 WPM</strong>. Master light/dark stroke discrimination and phraseography without hesitations.
                </p>
              </motion.div>
            </FadeUp>

            {/* Step 2 */}
            <FadeUp delay={0.08}>
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="sp-timeline-col border-t-2 border-[#E8DFD3]"
              >
                <span 
                  className="sp-timeline-num text-[#8A7B7E]"
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: '1.875rem',
                    lineHeight: 1,
                    color: '#8A7B7E',
                    fontWeight: 400
                  }}
                >
                  02
                </span>
                <h3 className="sp-timeline-title">Transcribe Under Exam Clock</h3>
                <p className="sp-timeline-desc">
                  Review outlines during the 5-minute reading clock, then transcribe in <strong>English, Kruti Dev 010, or Mangal</strong> under strict official exam-hall timing and backspace-lock rules.
                </p>
              </motion.div>
            </FadeUp>

            {/* Step 3 */}
            <FadeUp delay={0.16}>
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="sp-timeline-col border-t-2 border-[#E8DFD3]"
              >
                <span 
                  className="sp-timeline-num text-[#8A7B7E]"
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: '1.875rem',
                    lineHeight: 1,
                    color: '#8A7B7E',
                    fontWeight: 400
                  }}
                >
                  03
                </span>
                <h3 className="sp-timeline-title">Fix Every Single Mistake</h3>
                <p className="sp-timeline-desc">
                  Receive automated full and half-mistake percentage reports instantly, combined with daily <strong>handwritten outline review</strong> by Shadab Sir to eliminate recurring stroke angle flaws.
                </p>
              </motion.div>
            </FadeUp>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DARK EDITORIAL STORY BAND (SHADAB SIR & GAYA LEGACY)
          ========================================================================= */}
      <section 
        className="sp-dark-story-section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#231418',
          color: '#FAF6F0',
          borderTop: '1px solid #3A2329',
          borderBottom: '1px solid #3A2329',
          width: '100%'
        }}
      >
        <div className="sp-dark-story-grid">
          
          {/* Left Column (5 cols on desktop) */}
          <div className="sp-dark-story-col-left">
            <span 
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#C9A3A8',
                display: 'block'
              }}
            >
              OUR LEGACY &middot; GUIDED BY SHADAB SIR
            </span>

            <h2 
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 3.1rem)',
                lineHeight: 1.06,
                fontWeight: 400,
                letterSpacing: '-0.015em',
                color: '#FAF6F0',
                margin: '0.75rem 0 0 0',
                textAlign: 'left'
              }}
            >
              Twelve years of discipline,{' '}
              <span style={{ fontStyle: 'italic', color: '#E5B8BE' }}>
                built for govt. selections.
              </span>
            </h2>

            {/* Compact 4-item hairline mentorship list */}
            <div 
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.625rem',
                fontSize: '13.5px',
                color: '#D6C7CA'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={16} style={{ color: '#E5B8BE', flexShrink: 0 }} />
                <span>Personal Pitman Outline Checking</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={16} style={{ color: '#E5B8BE', flexShrink: 0 }} />
                <span>Hindi Kruti Dev 010 &amp; Mangal Inscript Mastery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={16} style={{ color: '#E5B8BE', flexShrink: 0 }} />
                <span>Daily High Court &amp; Parliamentary Dictations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={16} style={{ color: '#E5B8BE', flexShrink: 0 }} />
                <span>3 Free Demo Classes Before Enrollment</span>
              </div>
            </div>

            {/* Crisp Pill Outline CTA */}
            <div style={{ marginTop: '1.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  if (setCurrentTab) setCurrentTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #5A3A42',
                  backgroundColor: 'transparent',
                  color: '#FAF6F0',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#FAF6F0';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#5A3A42';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>Read Full Methodology</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right Column (7 cols on desktop) */}
          <div className="sp-dark-story-col-right">
            <div 
              style={{
                fontSize: '14.5px',
                lineHeight: 1.65,
                color: '#D6C7CA',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <p style={{ margin: 0 }}>
                Founded at Gaya College More in 2012, <strong style={{ color: '#FAF6F0', fontWeight: 500 }}>Gaya Shorthand Classes</strong> has established itself as Bihar's premier preparatory academy for government stenography aspirants. Over 1,200 candidates have qualified for Central &amp; State services under direct personal mentorship.
              </p>
              <p style={{ margin: 0 }}>
                We believe that while automated software is indispensable for measuring speed, true shorthand mastery demands <strong style={{ color: '#FAF6F0', fontWeight: 500 }}>traditional stroke discipline</strong>. Every single outline, curve angle, and grammalogue contraction is inspected daily so bad habits never carry into the examination hall.
              </p>
            </div>

            {/* 2x2 Hairline Milestone Grid Directly Underneath */}
            <div 
              className="sp-dark-milestone-grid"
              style={{
                marginTop: '2.25rem',
                paddingTop: '2rem',
                borderTop: '1px solid #3D252B'
              }}
            >
              <div>
                <div 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                    lineHeight: 1,
                    fontWeight: 400,
                    color: '#FAF6F0'
                  }}
                >
                  <AnimatedCounter value="2012" duration={0.6} />
                </div>
                <div style={{ fontSize: '12px', color: '#A89397', marginTop: '8px' }}>
                  Founded at Gaya College More, Bihar
                </div>
              </div>

              <div>
                <div 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                    lineHeight: 1,
                    fontWeight: 400,
                    color: '#FAF6F0',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  <AnimatedCounter value="50–140" duration={0.6} />
                </div>
                <div style={{ fontSize: '12px', color: '#A89397', marginTop: '8px' }}>
                  WPM Pitman &amp; Hindi Shorthand Range
                </div>
              </div>

              <div>
                <div 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                    lineHeight: 1,
                    fontWeight: 400,
                    color: '#FAF6F0',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  <AnimatedCounter value="2,700+" duration={0.6} />
                </div>
                <div style={{ fontSize: '12px', color: '#A89397', marginTop: '8px' }}>
                  Aspirants Trained Across SSC &amp; Courts
                </div>
              </div>

              <div>
                <div 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                    lineHeight: 1,
                    fontWeight: 400,
                    color: '#FAF6F0'
                  }}
                >
                  Offline + Live
                </div>
                <div style={{ fontSize: '12px', color: '#A89397', marginTop: '8px' }}>
                  Gaya Typing Lab &amp; Daily Google Meet
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WARM SAND LIVE BATCH STUDIO STRIP
          ========================================================================= */}
      <section 
        className="sp-live-studio-strip"
        style={{
          width: '100%',
          backgroundColor: '#EFE7DC',
          borderBottom: '1px solid #E0D5C7'
        }}
      >
        <div className="sp-live-studio-row">
          
          {/* Left Column */}
          <div style={{ minWidth: 0, textAlign: 'left' }}>
            {/* Eyebrow with pulsing 6px #991B1B live dot */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span className="sp-live-pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#991B1B', display: 'inline-block', flexShrink: 0 }} />
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#594A4D'
                }}
              >
                LIVE GOOGLE MEET INTERACTIVE STUDIO
              </span>
            </div>

            {/* Editorial Serif H3 */}
            <h3 
              style={{
                marginTop: '6px',
                marginBottom: 0,
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(1.75rem, 2.5vw, 2.15rem)',
                lineHeight: 1.2,
                fontWeight: 400,
                color: '#231418'
              }}
            >
              Can't visit the Gaya center?{' '}
              <span style={{ fontStyle: 'italic', color: '#991B1B' }}>
                Join live online classes.
              </span>
            </h3>

            {/* 3 Crisp Daily Batch Timing Pills */}
            <div 
              style={{
                marginTop: '1rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span 
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DFD4C6',
                  borderRadius: '9999px',
                  padding: '4px 14px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 500,
                  color: '#231418',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                6:00 AM &middot; Pitman Theory
              </span>
              <span 
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DFD4C6',
                  borderRadius: '9999px',
                  padding: '4px 14px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 500,
                  color: '#231418',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                8:30 AM &middot; SSC 80 WPM Live
              </span>
              <span 
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DFD4C6',
                  borderRadius: '9999px',
                  padding: '4px 14px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 500,
                  color: '#231418',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                3:00 PM &middot; High Court Legal
              </span>
            </div>
          </div>

          {/* Right Column: CTA & Caption */}
          <div 
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '6px'
            }}
            className="lg:items-end"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                if (setCurrentTab) setCurrentTab('classes');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                backgroundColor: '#991B1B',
                color: '#FFFFFF',
                padding: '13px 26px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: 600,
                boxShadow: '0 8px 20px rgba(153, 27, 27, 0.20)',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              <span>View Live Class Schedule</span>
              <ArrowRight size={16} />
            </motion.button>
            <span style={{ fontSize: '11px', color: '#6E5E61' }}>
              Morning &amp; evening batches &middot; Direct doubt review
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ASPIRANT VOICES (EDITORIAL TESTIMONIALS)
          ========================================================================= */}
      <section 
        className="sp-voices-section bg-[#FBF8F3] py-14 lg:py-16 border-b border-[#E5DBD0]"
        style={{
          backgroundColor: '#FBF8F3',
          borderTop: 'none',
          borderBottom: '1px solid #E5DBD0'
        }}
      >
        <div className="sp-container">
          
          <FadeUp>
            <div className="sp-voices-header">
              <span className="sp-section-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[#594A4D]">
                STUDENT OUTCOMES
              </span>
              <h2 
                className="sp-section-h2 font-serif font-normal text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.08] tracking-[-0.015em] text-[#231418]"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 'clamp(1.875rem, 3.2vw, 2.65rem)',
                  fontWeight: 400,
                  lineHeight: 1.08,
                  letterSpacing: '-0.015em',
                  color: '#231418'
                }}
              >
                Trusted by <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>serious aspirants.</span>
              </h2>
              <p className="sp-section-sub">
                Verified experiences from candidates who built their shorthand speed and cleared recruitment skill tests:
              </p>
            </div>
          </FadeUp>

          <div className="sp-voices-grid">
            
            {/* Review 1 */}
            <FadeUp delay={0}>
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(35, 20, 24, 0.08)' }}
                transition={{ duration: 0.2 }}
                className="sp-voice-card bg-[#FFFFFF] border border-[#E8DFD3] rounded-xl p-6 shadow-[0_4px_20px_rgba(35,20,24,0.04)] flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Scorecard Badge */}
                  <div 
                    className="flex items-center justify-between pb-4 mb-4 border-b border-[#EFE7DC] text-[11px] font-mono"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '1rem',
                      marginBottom: '1rem',
                      borderBottom: '1px solid #EFE7DC',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace"
                    }}
                  >
                    <span style={{ color: '#991B1B', fontWeight: 700, letterSpacing: '0.06em' }}>
                      SSC GRADE C
                    </span>
                    <span style={{ color: '#594A4D', fontWeight: 600 }}>
                      100 WPM &middot; 1.6% ERR
                    </span>
                  </div>

                  <p className="text-sm text-[#594A4D] leading-relaxed mb-6">
                    &ldquo;Shadab Sir's daily dictation practice and 5-minute reading room made all the difference in my SSC skill test. Individual notebook checking helped fix my stroke angles completely.&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                    AV
                  </div>
                  <div>
                    <div className="font-bold text-[#231418] text-sm">Anjali Verma</div>
                    <div className="text-xs text-[#8A7B7E]">Selected 2023 &middot; Central Secretariat</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Review 2 */}
            <FadeUp delay={0.08}>
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(35, 20, 24, 0.08)' }}
                transition={{ duration: 0.2 }}
                className="sp-voice-card bg-[#FFFFFF] border border-[#E8DFD3] rounded-xl p-6 shadow-[0_4px_20px_rgba(35,20,24,0.04)] flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Scorecard Badge */}
                  <div 
                    className="flex items-center justify-between pb-4 mb-4 border-b border-[#EFE7DC] text-[11px] font-mono"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '1rem',
                      marginBottom: '1rem',
                      borderBottom: '1px solid #EFE7DC',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace"
                    }}
                  >
                    <span style={{ color: '#991B1B', fontWeight: 700, letterSpacing: '0.06em' }}>
                      PATNA HIGH COURT
                    </span>
                    <span style={{ color: '#594A4D', fontWeight: 600 }}>
                      80 WPM &middot; 98.8% ACC
                    </span>
                  </div>

                  <p className="text-sm text-[#594A4D] leading-relaxed mb-6">
                    &ldquo;The strict backspace lock simulation and legal judgment audio series mirrored the exact Patna High Court exam software. Reached 100 WPM with zero guesswork.&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                    RK
                  </div>
                  <div>
                    <div className="font-bold text-[#231418] text-sm">Rakesh Kumar</div>
                    <div className="text-xs text-[#8A7B7E]">Qualified 2022 &middot; Patna High Court Bench</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Review 3 */}
            <FadeUp delay={0.16}>
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(35, 20, 24, 0.08)' }}
                transition={{ duration: 0.2 }}
                className="sp-voice-card bg-[#FFFFFF] border border-[#E8DFD3] rounded-xl p-6 shadow-[0_4px_20px_rgba(35,20,24,0.04)] flex flex-col justify-between h-full"
              >
                <div>
                  {/* Top Scorecard Badge */}
                  <div 
                    className="flex items-center justify-between pb-4 mb-4 border-b border-[#EFE7DC] text-[11px] font-mono"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '1rem',
                      marginBottom: '1rem',
                      borderBottom: '1px solid #EFE7DC',
                      fontSize: '11px',
                      fontFamily: "'JetBrains Mono', monospace"
                    }}
                  >
                    <span style={{ color: '#991B1B', fontWeight: 700, letterSpacing: '0.06em' }}>
                      CIVIL COURT PA
                    </span>
                    <span style={{ color: '#594A4D', fontWeight: 600 }}>
                      80 WPM &middot; KRUTI DEV
                    </span>
                  </div>

                  <p className="text-sm text-[#594A4D] leading-relaxed mb-6">
                    &ldquo;Best shorthand institute in Gaya. The dual font support (Kruti Dev 010 and Mangal) in their computer lab is unmatched for judicial exam aspirants.&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                    MT
                  </div>
                  <div>
                    <div className="font-bold text-[#231418] text-sm">Md. Tariq</div>
                    <div className="text-xs text-[#8A7B7E]">Selected 2023 &middot; District Court Gaya</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: COMPACT CENTER DETAILS + FAQ SPLIT
          ========================================================================= */}
      <section className="sp-center-faq-section bg-[#EFE7DC] border-t border-[#E3D9CC] py-16 lg:py-20">
        <div className="sp-container">
          
          <div className="sp-center-faq-grid">
            
            {/* Left Column: Center Location & Helplines (Soft Ivory #F7F5F0) */}
            <FadeUp>
              <div className="sp-center-card bg-[#FFFFFF] border border-[#E8DFD3] rounded-2xl p-7 lg:-mt-6 shadow-[0_4px_20px_rgba(35,20,24,0.04)]">
                <span className="sp-section-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[#594A4D]">
                  VISIT OUR CENTER
                </span>
                <h2 
                  className="sp-section-h2 font-serif font-normal text-3xl lg:text-[2.2rem] leading-[1.1] tracking-[-0.015em] text-[#231418]" 
                  style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: '-0.015em',
                    color: '#231418',
                    textAlign: 'left', 
                    marginBottom: '1.25rem' 
                  }}
                >
                  Gaya Coaching Center &amp; Helplines
                </h2>

                <div className="sp-center-info-list space-y-4">
                  
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
                <div className="sp-center-action-row mt-5 pt-5">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="sp-btn-white-secondary bg-[#FFFFFF] border border-[#E8DFD3] text-[#231418] hover:bg-[#FAF8F5] rounded-full"
                    style={{ 
                      width: '100%', 
                      justifyContent: 'center', 
                      padding: '12px 24px', 
                      fontSize: '13.5px', 
                      fontWeight: 600,
                      borderRadius: '9999px',
                      cursor: 'pointer'
                    }}
                    onClick={handleOpenDemo}
                  >
                    <span>Book 3 Free Demos &rarr;</span>
                  </motion.button>
                </div>
              </div>
            </FadeUp>

            {/* Right Column: Interactive FAQ Accordion */}
            <FadeUp>
              <div className="sp-faq-wrap">
                <span className="sp-section-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[#594A4D]">
                  ADMISSIONS FAQ
                </span>
                <h2 
                  className="sp-section-h2 font-serif font-normal text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.08] tracking-[-0.015em] text-[#231418]" 
                  style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.875rem, 3.2vw, 2.65rem)',
                    fontWeight: 400,
                    lineHeight: 1.08,
                    letterSpacing: '-0.015em',
                    color: '#231418',
                    textAlign: 'left', 
                    marginBottom: '1.25rem' 
                  }}
                >
                  Frequently <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>asked questions.</span>
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
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <ChevronDown size={18} color={isOpen ? "#991B1B" : "#8A7B7E"} />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: TRANSITION_EASE }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className="sp-faq-body" style={{ paddingTop: '0.5rem' }}>
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

              </div>
            </FadeUp>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: OPEN WARM-GLOW PRE-FOOTER CTA (WARM CREAM #FBF8F3 CANVAS)
          ========================================================================= */}
      <section 
        className="sp-closing-cta-section relative overflow-hidden bg-[#FBF8F3] border-t border-[#E5DBD0] py-16 lg:py-20 text-center px-6"
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FBF8F3',
          borderTop: '1px solid #E5DBD0',
          padding: '4.5rem 1.5rem',
          textAlign: 'center'
        }}
      >
        {/* Radial warm glow */}
        <div 
          style={{ 
            pointerEvents: 'none', 
            position: 'absolute', 
            inset: 0, 
            background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(196, 132, 120, 0.16) 0%, rgba(251, 248, 243, 0) 75%)' 
          }} 
        />
        <div style={{ maxWidth: '42rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <FadeUp>
            <span 
              style={{ 
                fontSize: '11px', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '0.18em', 
                color: '#991B1B', 
                display: 'block', 
                marginBottom: '12px' 
              }}
            >
              GET STARTED TODAY &middot; 3 FREE DEMO CLASSES
            </span>
            <h2 
              className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#231418] leading-tight"
              style={{ 
                fontFamily: "'Instrument Serif', Georgia, serif", 
                fontSize: 'clamp(2.25rem, 4.2vw, 3.25rem)', 
                fontWeight: 400, 
                color: '#231418', 
                lineHeight: 1.12, 
                letterSpacing: '-0.02em', 
                margin: '0 0 14px 0' 
              }}
            >
              Ready to build <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>exam-hall speed?</span>
            </h2>
            <p 
              style={{ 
                fontSize: '15px', 
                color: '#594A4D', 
                lineHeight: 1.6, 
                maxWidth: '36rem', 
                margin: '0 auto 28px auto' 
              }}
            >
              Take a free calibrated audio dictation test online or visit our Gaya center for 3 free demo classes.
            </p>
            <div 
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '14px' 
              }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartTests}
                style={{
                  backgroundColor: '#231418',
                  color: '#FAF6F0',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(35, 20, 24, 0.16)',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <span>Start Free Dictation Test &rarr;</span>
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExploreCourses}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D8CCBE',
                  color: '#231418',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <span>Explore All Courses</span>
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
