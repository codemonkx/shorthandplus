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
      <section 
        className="sp-hero-section"
        style={{
          backgroundColor: '#16161A',
          color: '#F5F3EE',
          borderBottom: '1px solid #27272A',
          width: '100%',
          paddingTop: '128px',
          paddingBottom: '80px',
          position: 'relative'
        }}
      >
        <div 
          className="sp-hero-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
        >
          <div 
            className="sp-hero-grid-2col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '48px',
              alignItems: 'center'
            }}
          >
            {/* Left Column (lg:col-span-6) */}
            <div 
              className="sp-hero-col-left"
              style={{
                gridColumn: 'span 6 / span 6',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left'
              }}
            >
              {/* Eyebrow */}
              <div 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#A1A1AA',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}
              >
                <span>EST. 2012</span>
                <span>&middot;</span>
                <span>GAYA COLLEGE MORE</span>
                <span>&middot;</span>
                <span>12+ YEARS COACHING</span>
              </div>

              {/* H1 */}
              <h1 
                style={{
                  color: '#F5F3EE',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(2.25rem, 4vw, 3.4rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.03em',
                  margin: '0 0 20px 0'
                }}
              >
                The Gold Standard in{' '}
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#F87171' }}>Shorthand</span>{' '}
                &amp; Typing for Govt. Exams
              </h1>

              {/* Subheadline */}
              <p 
                style={{
                  color: '#D4D4D8',
                  fontSize: '16px',
                  lineHeight: 1.6,
                  maxWidth: '580px',
                  margin: '0 0 28px 0'
                }}
              >
                Master Pitman Shorthand (50–140 WPM), Hindi Kruti Dev &amp; Mangal typing, and legal dictations—guided by <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>Shadab Sir</strong> with automated SSC error evaluation.
              </p>

              {/* Horizontal CTA Row */}
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '28px'
                }}
              >
                <button
                  type="button"
                  onClick={handleStartTests}
                  style={{
                    background: '#B91C1C',
                    color: '#FFFFFF',
                    padding: '12px 22px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span>Start Audio Dictation</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleExploreCourses}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    color: '#F5F3EE',
                    padding: '12px 22px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <span>Explore Courses</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenDemo}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#D4D4D8',
                    fontSize: '14px',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    padding: '8px 4px',
                    transition: 'color 0.15s'
                  }}
                >
                  Book 3 Free Demos &rarr;
                </button>
              </div>

              {/* Pricing & Timing Reassurance micro-line */}
              <p 
                style={{
                  marginTop: '18px',
                  fontSize: '12px',
                  color: '#A1A1AA',
                  fontWeight: 500
                }}
              >
                Online passes from &#8377;30 &middot; Offline &amp; Live Google Meet batches &middot; 3 Free Demo Classes
              </p>
            </div>

            {/* Right Column (lg:col-span-6) */}
            <div 
              className="sp-hero-col-right"
              style={{
                gridColumn: 'span 6 / span 6',
                minWidth: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <div 
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
                  background: '#1A1A20',
                  position: 'relative'
                }}
              >
                <img 
                  src="/assets/institution-hero.jpg" 
                  alt="Shorthand Plus Stenography Classroom &amp; Typing Lab" 
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 3',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div 
                  style={{
                    background: '#1E1E24',
                    padding: '12px 16px',
                    color: '#E4E4E7',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F87171', display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600 }}>SSC &amp; High Court Exam Standard</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#A1A1AA' }}>50&ndash;140 WPM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Exam Authority Strip (Directly Below Hero) */}
        <div 
          style={{
            background: '#E4DFD5',
            borderTop: '1px solid #D1CBBF',
            borderBottom: '1px solid #D1CBBF',
            padding: '16px 0',
            width: '100%',
            marginTop: '64px'
          }}
        >
          <div 
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              paddingLeft: '24px',
              paddingRight: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <span 
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#52525B',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              PREPARING ASPIRANTS FOR
            </span>
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '24px',
                color: '#16161A',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              <span>SSC Stenographer</span>
              <span style={{ color: '#A8A294' }}>&middot;</span>
              <span>Patna High Court</span>
              <span style={{ color: '#A8A294' }}>&middot;</span>
              <span>Civil Court</span>
              <span style={{ color: '#A8A294' }}>&middot;</span>
              <span>EPFO</span>
              <span style={{ color: '#A8A294' }}>&middot;</span>
              <span>DRDO</span>
              <span style={{ color: '#A8A294' }}>&middot;</span>
              <span>BSSC</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE EXAM ENGINE SHOWCASE (THE CENTERPIECE)
          ========================================================================= */}
      <section 
        className="sp-engine-section"
        style={{
          background: '#ECE8E0',
          padding: '80px 0',
          width: '100%',
          borderTop: '1px solid #D6D0C4'
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
          <div style={{ maxWidth: '680px', marginBottom: '40px', textAlign: 'left' }}>
            <span 
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: '#57534E',
                marginBottom: '8px',
                display: 'block'
              }}
            >
              THE SHORTHAND PLUS PLATFORM
            </span>
            <h2 
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: '#16161A',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                margin: '0 0 12px 0'
              }}
            >
              Built like the actual exam hall, down to every keystroke.
            </h2>
            <p 
              style={{
                fontSize: '15px',
                color: '#57534E',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              Experience the dual-stage examination simulation trusted by Bihar's top stenography qualifiers:
            </p>
          </div>

          {/* 2-Column Interactive Split (lg:grid-cols-12 gap-10 items-start) */}
          <div 
            className="sp-engine-grid-2col"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '40px',
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
                gap: '12px'
              }}
            >
              {/* Tab 0 */}
              <div 
                onClick={() => setActiveEngineTab(0)}
                role="button"
                tabIndex={0}
                style={activeEngineTab === 0 ? {
                  background: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderLeft: '3px solid #991B1B',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 14px rgba(22,22,26,0.04)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                } : {
                  padding: '18px 20px',
                  borderBottom: '1px solid #D6D0C4',
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
                      color: '#57534E',
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
                  background: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderLeft: '3px solid #991B1B',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 14px rgba(22,22,26,0.04)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                } : {
                  padding: '18px 20px',
                  borderBottom: '1px solid #D6D0C4',
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
                      color: '#57534E',
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
                  background: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderLeft: '3px solid #991B1B',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 14px rgba(22,22,26,0.04)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                } : {
                  padding: '18px 20px',
                  borderBottom: '1px solid #D6D0C4',
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
                      color: '#57534E',
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
              <div 
                style={{
                  background: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 14px 36px rgba(22, 22, 26, 0.07)',
                  width: '100%'
                }}
              >
                {/* Subtle Top Toolbar */}
                <div 
                  style={{
                    background: '#EAE5DC',
                    borderBottom: '1px solid #D6D0C4',
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
                        color: '#57534E',
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
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
                    <span>EXAM ACTIVE</span>
                  </div>
                </div>

                {/* Mockup Body (padding: 24px) */}
                <div style={{ padding: '24px', background: '#F7F5F0' }}>
                  
                  {/* Tab 0 Preview */}
                  {activeEngineTab === 0 && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#991B1B' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#991B1B', display: 'inline-block' }} />
                          LIVE DICTATION
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#78716C' }}>Track ID: PHC-LEGAL-104</span>
                      </div>

                      <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#16161A', margin: '14px 0 4px 0' }}>
                        Patna High Court Legal Dictation &middot; 100 WPM
                      </h4>
                      <p style={{ fontSize: '13px', color: '#57534E', margin: '0 0 16px 0' }}>
                        Case Law: Cr. Misc. Petitions &middot; Kailash Chandra Vol. 14 Calibration
                      </p>

                      {/* Speed Selector */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#78716C' }}>CALIBRATED SPEED:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#FFFFFF', border: '1px solid #DED8CC', color: '#57534E' }}>80 WPM</span>
                          <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#16161A', color: '#FFFFFF' }}>100 WPM</span>
                          <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#FFFFFF', border: '1px solid #DED8CC', color: '#57534E' }}>120 WPM</span>
                        </div>
                      </div>

                      {/* Waveform Player inside bordered panel */}
                      <div 
                        style={{
                          background: '#F1EDE5',
                          border: '1px solid #DED8CC',
                          borderRadius: '12px',
                          padding: '16px',
                          margin: '16px 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setIsPlayingAudioPreview(!isPlayingAudioPreview)}
                          title="Toggle Audio Simulation"
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: '#16161A',
                            border: 'none',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          {isPlayingAudioPreview ? <Pause size={18} fill="#FFFFFF" /> : <Play size={18} fill="#FFFFFF" />}
                        </button>

                        <div style={{ flex: 1, height: '36px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {[40, 65, 30, 85, 95, 60, 45, 90, 100, 75, 40, 80, 60, 95, 50, 85, 30, 70, 90, 45].map((height, i) => (
                            <span 
                              key={i} 
                              style={{
                                flex: 1,
                                height: `${height}%`,
                                borderRadius: '2px',
                                background: isPlayingAudioPreview && i < 12 ? '#991B1B' : '#DED8CC',
                                transition: 'background-color 0.2s'
                              }}
                            />
                          ))}
                        </div>

                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 600, color: '#16161A', flexShrink: 0 }}>
                          {isPlayingAudioPreview ? "02:14 / 05:00" : "00:00 / 05:00"}
                        </span>
                      </div>

                      {/* Bottom Footer Row */}
                      <div 
                        style={{
                          marginTop: '20px',
                          paddingTop: '16px',
                          borderTop: '1px solid #DED8CC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <span style={{ fontSize: '12px', color: '#57534E' }}>Strict Single-Play Protocol: Audio plays once without rewind or pause.</span>
                        <button
                          type="button"
                          onClick={handleStartTests}
                          style={{
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            background: 'none',
                            border: 'none',
                            color: '#16161A',
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
                    </div>
                  )}

                  {/* Tab 1 Preview (Bilingual Typing Studio) */}
                  {activeEngineTab === 1 && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#991B1B' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#991B1B', display: 'inline-block' }} />
                          TYPING BENCHMARK
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#16161A', color: '#FFFFFF' }}>Kruti Dev 010</span>
                          <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#FFFFFF', border: '1px solid #DED8CC', color: '#57534E' }}>Mangal Inscript</span>
                          <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#FFFFFF', border: '1px solid #DED8CC', color: '#57534E' }}>English QWERTY</span>
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
                        <div style={{ background: '#F1EDE5', border: '1px solid #DED8CC', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C', marginBottom: '4px', display: 'block' }}>GROSS SPEED</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#16161A' }}>48.2 <span style={{ fontSize: '12px', color: '#78716C', fontWeight: 500 }}>WPM</span></span>
                        </div>
                        <div style={{ background: '#F1EDE5', border: '1px solid #DED8CC', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C', marginBottom: '4px', display: 'block' }}>NET ACCURACY</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#047857' }}>98.4%</span>
                        </div>
                        <div style={{ background: '#F1EDE5', border: '1px solid #DED8CC', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C', marginBottom: '4px', display: 'block' }}>BACKSPACE LOCK</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#991B1B' }}>ENFORCED</span>
                        </div>
                        <div style={{ background: '#F1EDE5', border: '1px solid #DED8CC', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C', marginBottom: '4px', display: 'block' }}>TIME REMAINING</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#16161A' }}>07:45</span>
                        </div>
                      </div>

                      {/* Simulated Text Transcription Input Box */}
                      <div style={{ background: '#FFFFFF', border: '1px solid #DED8CC', borderRadius: '10px', padding: '16px', fontSize: '15px', margin: '16px 0', lineHeight: 1.7 }}>
                        <p className="font-hindi" style={{ color: '#78716C', margin: '0 0 8px 0' }}>
                          न्यायालय के आदेशानुसार उक्त याचिका पर सुनवाई करते हुए न्यायाधीश महोदय ने स्पष्ट किया कि...
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="font-hindi" style={{ color: '#16161A', fontWeight: 600 }}>न्यायालय के आदेशानुसार उक्त</span>
                          <span style={{ display: 'inline-block', width: '2px', height: '1.2em', background: '#991B1B', marginLeft: '3px' }} />
                        </div>
                      </div>

                      {/* Bottom Footer Row */}
                      <div 
                        style={{
                          marginTop: '20px',
                          paddingTop: '16px',
                          borderTop: '1px solid #DED8CC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <span style={{ fontSize: '12px', color: '#57534E' }}>Strict Backspace Lock: Eliminates bad editing habits during live preparation.</span>
                        <button
                          type="button"
                          onClick={() => setCurrentTab && setCurrentTab('typing-studio')}
                          style={{
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            background: 'none',
                            border: 'none',
                            color: '#16161A',
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
                    </div>
                  )}

                  {/* Tab 2 Preview (Automated SSC Error Evaluation Diff) */}
                  {activeEngineTab === 2 && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#047857' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
                          FORENSIC AUDIT
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#78716C' }}>SSC Grade C &middot; 100 WPM</span>
                      </div>

                      {/* Diff Inspection Passage inside bordered panel */}
                      <div style={{ background: '#FFFFFF', border: '1px solid #DED8CC', borderRadius: '12px', padding: '16px', margin: '16px 0', fontSize: '14px', lineHeight: 1.7 }}>
                        <p style={{ color: '#16161A', margin: 0 }}>
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
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#57534E', margin: '12px 0' }}>
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
                        <div style={{ background: '#F1EDE5', border: '1px solid #DED8CC', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C', marginBottom: '4px', display: 'block' }}>FULL MISTAKES</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#16161A' }}>1 (Omission)</span>
                        </div>
                        <div style={{ background: '#F1EDE5', border: '1px solid #DED8CC', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C', marginBottom: '4px', display: 'block' }}>HALF MISTAKES</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#16161A' }}>1 (Spelling)</span>
                        </div>
                        <div style={{ background: '#F1EDE5', border: '1px solid #DED8CC', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C', marginBottom: '4px', display: 'block' }}>TOTAL ERROR RATE</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#047857' }}>1.5%</span>
                        </div>
                        <div style={{ background: '#F1EDE5', border: '1px solid #DED8CC', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C', marginBottom: '4px', display: 'block' }}>NET ACCURACY</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#16161A' }}>98.5%</span>
                        </div>
                      </div>

                      {/* Bottom Footer Row */}
                      <div 
                        style={{
                          marginTop: '20px',
                          paddingTop: '16px',
                          borderTop: '1px solid #DED8CC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <span style={{ fontSize: '12px', color: '#57534E' }}>Full SSC Standard: Certified evaluation matching official Staff Selection Commission rules.</span>
                        <button 
                          type="button" 
                          onClick={handleStartTests}
                          style={{
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            background: 'none',
                            border: 'none',
                            color: '#16161A',
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
