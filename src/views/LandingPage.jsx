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
  CheckCircle,
  Video,
  Sparkles,
  BookOpen,
  Target
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
    <div className="sp-landing-root" style={{ backgroundColor: '#FBF8F3', color: '#231418', overflowX: 'hidden' }}>
      
      {/* =========================================================================
          SECTION 1: AIRY EDITORIAL HERO (WARM CREAM #FBF8F3)
          ========================================================================= */}
      <section 
        className="sp-hero-section"
        style={{
          backgroundColor: '#FBF8F3',
          color: '#231418',
          width: '100%',
          paddingTop: '120px',
          paddingBottom: '72px',
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
            opacity: 0.45,
            pointerEvents: 'none'
          }} 
        />

        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '48px',
              alignItems: 'center'
            }}
          >
            {/* Left Column (lg:col-span-6) */}
            <div 
              style={{
                gridColumn: 'span 12',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left'
              }}
              className="lg:!col-span-6"
            >
              {/* Eyebrow */}
              <div 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#8A7B7E',
                  marginBottom: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#991B1B', display: 'inline-block', flexShrink: 0 }} />
                <span>EST. 2012</span>
                <span>&middot;</span>
                <span>GAYA COLLEGE MORE</span>
                <span>&middot;</span>
                <span>12+ YEARS COACHING</span>
              </div>

              {/* H1 in Instrument Serif */}
              <h1 
                style={{
                  color: '#231418',
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontWeight: 400,
                  fontSize: 'clamp(2.5rem, 5vw, 4.15rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.02em',
                  margin: '0 0 20px 0'
                }}
              >
                The Gold Standard in{' '}
                <span style={{ fontStyle: 'italic', color: '#991B1B' }}>Shorthand</span>{' '}
                &amp; Typing <span style={{ fontStyle: 'italic' }}>for Govt. Exams.</span>
              </h1>

              {/* Subheadline in #594A4D */}
              <p 
                style={{
                  color: '#594A4D',
                  fontSize: '16px',
                  lineHeight: 1.65,
                  maxWidth: '560px',
                  margin: '0 0 28px 0'
                }}
              >
                Master Pitman Shorthand (50–140 WPM), Hindi Kruti Dev &amp; Mangal typing, and legal dictations—guided by <strong style={{ color: '#231418', fontWeight: 600 }}>Shadab Sir</strong> with automated SSC error evaluation.
              </p>

              {/* Soft Pill CTA Row */}
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <button
                  type="button"
                  onClick={handleStartTests}
                  style={{
                    background: '#231418',
                    color: '#FAF6F0',
                    padding: '13px 26px',
                    borderRadius: '9999px',
                    fontWeight: 600,
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(35, 20, 24, 0.16)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3A2228'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#231418'}
                >
                  <span>Start Audio Dictation</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleExploreCourses}
                  style={{
                    background: 'transparent',
                    border: '1px solid #C9BCB0',
                    color: '#231418',
                    padding: '13px 24px',
                    borderRadius: '9999px',
                    fontWeight: 600,
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EFE7DC'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span>Explore Courses</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenDemo}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#594A4D',
                    fontSize: '14px',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    padding: '8px 6px',
                    transition: 'color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#991B1B'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#594A4D'}
                >
                  Book 3 Free Demos &rarr;
                </button>
              </div>

              {/* 3-Stat Proof Row Underneath */}
              <div 
                style={{
                  marginTop: '28px',
                  paddingTop: '20px',
                  borderTop: '1px solid #E5DBD0',
                  width: '100%',
                  maxWidth: '560px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '28px', color: '#231418', lineHeight: 1.1 }}>
                    12+ Yrs
                  </div>
                  <div style={{ fontSize: '11px', color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '4px' }}>
                    Coaching Legacy
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '28px', color: '#231418', lineHeight: 1.1 }}>
                    2,700+
                  </div>
                  <div style={{ fontSize: '11px', color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '4px' }}>
                    Aspirants Trained
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '28px', color: '#231418', lineHeight: 1.1 }}>
                    Est. 2012
                  </div>
                  <div style={{ fontSize: '11px', color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '4px' }}>
                    Gaya Center
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (lg:col-span-6) Architectural Arch Frame */}
            <div 
              style={{
                gridColumn: 'span 12',
                minWidth: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
              className="lg:!col-span-6"
            >
              <div 
                style={{
                  width: '100%',
                  borderRadius: '28px',
                  position: 'relative',
                  border: '1px solid #E5DBD0',
                  boxShadow: '0 24px 56px rgba(35, 20, 24, 0.09)',
                  background: '#EFE7DC',
                  padding: '12px',
                  boxSizing: 'border-box'
                }}
              >
                <img 
                  src="/assets/institution-hero.jpg" 
                  alt="Shorthand Plus Stenography Classroom &amp; Typing Lab" 
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 3',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    display: 'block'
                  }}
                />

                {/* Floating pill badge bottom-left */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    background: '#FFFFFF',
                    border: '1px solid #E8DFD3',
                    borderRadius: '9999px',
                    padding: '8px 16px',
                    boxShadow: '0 8px 24px rgba(35, 20, 24, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#231418'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#991B1B', display: 'inline-block' }} />
                  <span>50–140 WPM &middot; 3 Free Demo Classes</span>
                </div>

                {/* Circular Seal top-right */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    right: '-16px',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: '#231418',
                    color: '#FAF6F0',
                    border: '4px solid #FBF8F3',
                    boxShadow: '0 10px 24px rgba(35, 20, 24, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '18px', lineHeight: 1 }}>SSC</span>
                  <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#CBBCC0', marginTop: '2px' }}>&amp; Courts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THIN WARM-SAND EXAM TRUST STRIP (#EFE7DC)
          ========================================================================= */}
      <div 
        style={{
          background: '#EFE7DC',
          borderTop: '1px solid #E3D9CC',
          borderBottom: '1px solid #E3D9CC',
          padding: '14px 0',
          width: '100%',
          margin: 0
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
              letterSpacing: '0.16em',
              color: '#8A7B7E',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            TARGET GOVT. EXAMINATIONS
          </span>
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '20px',
              color: '#594A4D',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            <span>SSC Stenographer</span>
            <span style={{ color: '#C9BCB0' }}>&middot;</span>
            <span>Patna High Court</span>
            <span style={{ color: '#C9BCB0' }}>&middot;</span>
            <span>Civil Court PA</span>
            <span style={{ color: '#C9BCB0' }}>&middot;</span>
            <span>EPFO &amp; DRDO</span>
            <span style={{ color: '#C9BCB0' }}>&middot;</span>
            <span>BSSC &amp; Parliament</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: INTERACTIVE EXAM ENGINE SHOWCASE + LIVE STUDIO HIGHLIGHT STRIP
          ========================================================================= */}
      <section 
        className="sp-engine-section"
        style={{
          background: '#FBF8F3',
          padding: '88px 0',
          width: '100%',
          borderTop: '1px solid #E5DBD0'
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
          {/* Header */}
          <div style={{ maxWidth: '680px', marginBottom: '44px', textAlign: 'left' }}>
            <span 
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: '#991B1B',
                marginBottom: '10px',
                display: 'block'
              }}
            >
              EXAM SIMULATION SUITE
            </span>
            <h2 
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 400,
                color: '#231418',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 12px 0'
              }}
            >
              Built like the exam hall, <span style={{ fontStyle: 'italic' }}>down to every keystroke.</span>
            </h2>
            <p 
              style={{
                fontSize: '15px',
                color: '#594A4D',
                lineHeight: 1.65,
                margin: 0
              }}
            >
              Experience the dual-stage examination simulation trusted by Bihar's top stenography qualifiers:
            </p>
          </div>

          {/* 2-Column Interactive Split */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '40px',
              alignItems: 'start'
            }}
          >
            {/* Left Column (5 cols — 3 Clickable Tabs) */}
            <div 
              style={{
                gridColumn: 'span 12',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
              className="lg:!col-span-5"
            >
              {/* Tab 0 */}
              <div 
                onClick={() => setActiveEngineTab(0)}
                role="button"
                tabIndex={0}
                style={activeEngineTab === 0 ? {
                  background: '#FFFFFF',
                  border: '1px solid #E5DBD0',
                  borderLeft: '3px solid #991B1B',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 6px 20px rgba(35, 20, 24, 0.05)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                } : {
                  padding: '18px 20px',
                  border: '1px solid transparent',
                  borderBottom: '1px solid #E5DBD0',
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
                      color: activeEngineTab === 0 ? '#991B1B' : '#8A7B7E',
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
                          color: activeEngineTab === 0 ? '#231418' : '#594A4D',
                          margin: 0,
                          transition: 'color 0.2s'
                        }}
                      >
                        Calibrated Audio Dictation
                      </h3>
                      {activeEngineTab === 0 ? (
                        <ChevronUp size={16} color="#991B1B" style={{ flexShrink: 0 }} />
                      ) : (
                        <ChevronDown size={16} color="#8A7B7E" style={{ flexShrink: 0 }} />
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
                      color: '#594A4D',
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
                  border: '1px solid #E5DBD0',
                  borderLeft: '3px solid #991B1B',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 6px 20px rgba(35, 20, 24, 0.05)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                } : {
                  padding: '18px 20px',
                  border: '1px solid transparent',
                  borderBottom: '1px solid #E5DBD0',
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
                      color: activeEngineTab === 1 ? '#991B1B' : '#8A7B7E',
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
                          color: activeEngineTab === 1 ? '#231418' : '#594A4D',
                          margin: 0,
                          transition: 'color 0.2s'
                        }}
                      >
                        Bilingual Typing Studio
                      </h3>
                      {activeEngineTab === 1 ? (
                        <ChevronUp size={16} color="#991B1B" style={{ flexShrink: 0 }} />
                      ) : (
                        <ChevronDown size={16} color="#8A7B7E" style={{ flexShrink: 0 }} />
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
                      color: '#594A4D',
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
                  border: '1px solid #E5DBD0',
                  borderLeft: '3px solid #991B1B',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 6px 20px rgba(35, 20, 24, 0.05)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                } : {
                  padding: '18px 20px',
                  border: '1px solid transparent',
                  borderBottom: '1px solid #E5DBD0',
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
                      color: activeEngineTab === 2 ? '#991B1B' : '#8A7B7E',
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
                          color: activeEngineTab === 2 ? '#231418' : '#594A4D',
                          margin: 0,
                          transition: 'color 0.2s'
                        }}
                      >
                        Automated SSC Error Evaluation
                      </h3>
                      {activeEngineTab === 2 ? (
                        <ChevronUp size={16} color="#991B1B" style={{ flexShrink: 0 }} />
                      ) : (
                        <ChevronDown size={16} color="#8A7B7E" style={{ flexShrink: 0 }} />
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
                      color: '#594A4D',
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

            {/* Right Column (7 cols — Software Mockup Window) */}
            <div 
              style={{
                gridColumn: 'span 12',
                minWidth: 0,
                width: '100%'
              }}
              className="lg:!col-span-7"
            >
              <div 
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5DBD0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 14px 38px rgba(35, 20, 24, 0.06)',
                  width: '100%'
                }}
              >
                {/* Subtle Top Toolbar Header */}
                <div 
                  style={{
                    background: '#F4EFE7',
                    borderBottom: '1px solid #E5DBD0',
                    padding: '12px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#CBBCC0', display: 'inline-block' }} />
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#CBBCC0', display: 'inline-block' }} />
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#CBBCC0', display: 'inline-block' }} />
                    </div>
                    <span 
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#594A4D',
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

                {/* Mockup Body */}
                <div style={{ padding: '24px', background: '#FFFFFF' }}>
                  
                  {/* Tab 0 Preview */}
                  {activeEngineTab === 0 && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#991B1B' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#991B1B', display: 'inline-block' }} />
                          LIVE DICTATION
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#8A7B7E' }}>Track ID: PHC-LEGAL-104</span>
                      </div>

                      <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '14px 0 4px 0' }}>
                        Patna High Court Legal Dictation &middot; 100 WPM
                      </h4>
                      <p style={{ fontSize: '13px', color: '#594A4D', margin: '0 0 16px 0' }}>
                        Case Law: Cr. Misc. Petitions &middot; Kailash Chandra Vol. 14 Calibration
                      </p>

                      {/* Speed Selector */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8A7B7E' }}>CALIBRATED SPEED:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#FBF8F3', border: '1px solid #E5DBD0', color: '#594A4D' }}>80 WPM</span>
                          <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#231418', color: '#FAF6F0' }}>100 WPM</span>
                          <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#FBF8F3', border: '1px solid #E5DBD0', color: '#594A4D' }}>120 WPM</span>
                        </div>
                      </div>

                      {/* Waveform Player */}
                      <div 
                        style={{
                          background: '#FBF8F3',
                          border: '1px solid #E5DBD0',
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
                            background: '#231418',
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
                                background: isPlayingAudioPreview && i < 12 ? '#991B1B' : '#E5DBD0',
                                transition: 'background-color 0.2s'
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
                          borderTop: '1px solid #E5DBD0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <span style={{ fontSize: '12px', color: '#594A4D' }}>Strict Single-Play Protocol: Audio plays once without rewind or pause.</span>
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
                          <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#231418', color: '#FAF6F0' }}>Kruti Dev 010</span>
                          <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#FBF8F3', border: '1px solid #E5DBD0', color: '#594A4D' }}>Mangal Inscript</span>
                          <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#FBF8F3', border: '1px solid #E5DBD0', color: '#594A4D' }}>English QWERTY</span>
                        </div>
                      </div>

                      {/* 4 Metrics in clean 4-column HUD grid */}
                      <div 
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(4, 1fr)',
                          gap: '12px',
                          margin: '16px 0'
                        }}
                      >
                        <div style={{ background: '#FBF8F3', border: '1px solid #E5DBD0', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>GROSS SPEED</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#231418' }}>48.2 <span style={{ fontSize: '12px', color: '#8A7B7E', fontWeight: 500 }}>WPM</span></span>
                        </div>
                        <div style={{ background: '#FBF8F3', border: '1px solid #E5DBD0', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>NET ACCURACY</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#047857' }}>98.4%</span>
                        </div>
                        <div style={{ background: '#FBF8F3', border: '1px solid #E5DBD0', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>BACKSPACE LOCK</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#991B1B' }}>ENFORCED</span>
                        </div>
                        <div style={{ background: '#FBF8F3', border: '1px solid #E5DBD0', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>TIME REMAINING</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', fontWeight: 700, color: '#231418' }}>07:45</span>
                        </div>
                      </div>

                      {/* Simulated Text Transcription Input Box */}
                      <div style={{ background: '#FBF8F3', border: '1px solid #E5DBD0', borderRadius: '10px', padding: '16px', fontSize: '15px', margin: '16px 0', lineHeight: 1.7 }}>
                        <p style={{ color: '#8A7B7E', margin: '0 0 8px 0' }}>
                          न्यायालय के आदेशानुसार उक्त याचिका पर सुनवाई करते हुए न्यायाधीश महोदय ने स्पष्ट किया कि...
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ color: '#231418', fontWeight: 600 }}>न्यायालय के आदेशानुसार उक्त</span>
                          <span style={{ display: 'inline-block', width: '2px', height: '1.2em', background: '#991B1B', marginLeft: '3px' }} />
                        </div>
                      </div>

                      {/* Bottom Footer Row */}
                      <div 
                        style={{
                          marginTop: '20px',
                          paddingTop: '16px',
                          borderTop: '1px solid #E5DBD0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <span style={{ fontSize: '12px', color: '#594A4D' }}>Strict Backspace Lock: Eliminates bad editing habits during live preparation.</span>
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
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#8A7B7E' }}>SSC Grade C &middot; 100 WPM</span>
                      </div>

                      <div 
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(4, 1fr)',
                          gap: '12px',
                          margin: '16px 0'
                        }}
                      >
                        <div style={{ background: '#FBF8F3', border: '1px solid #E5DBD0', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>FULL MISTAKES</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#231418' }}>1 (Omission)</span>
                        </div>
                        <div style={{ background: '#FBF8F3', border: '1px solid #E5DBD0', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>HALF MISTAKES</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#231418' }}>1 (Spelling)</span>
                        </div>
                        <div style={{ background: '#FBF8F3', border: '1px solid #E5DBD0', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>TOTAL ERROR RATE</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#047857' }}>1.5%</span>
                        </div>
                        <div style={{ background: '#FBF8F3', border: '1px solid #E5DBD0', borderRadius: '12px', padding: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E', marginBottom: '4px', display: 'block' }}>NET ACCURACY</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 700, color: '#231418' }}>98.5%</span>
                        </div>
                      </div>

                      {/* Bottom Footer Row */}
                      <div 
                        style={{
                          marginTop: '20px',
                          paddingTop: '16px',
                          borderTop: '1px solid #E5DBD0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <span style={{ fontSize: '12px', color: '#594A4D' }}>Full SSC Standard: Certified evaluation matching official Staff Selection Commission rules.</span>
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
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>

          {/* Full-Width Dark Highlight Strip (Live Google Meet Studio) */}
          <div 
            style={{
              marginTop: '48px',
              background: 'linear-gradient(135deg, #231418 0%, #2E1A1F 50%, #3B2127 100%)',
              color: '#FAF6F0',
              borderRadius: '20px',
              padding: '32px 40px',
              boxShadow: '0 16px 40px rgba(35, 20, 24, 0.16)',
              border: '1px solid #442830',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#E5B8BE',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F87171', display: 'inline-block' }} />
                LIVE GOOGLE MEET STUDIO
              </span>
              <h3 
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  color: '#FAF6F0',
                  margin: '0 0 8px 0',
                  lineHeight: 1.2
                }}
              >
                Can't Visit the Gaya Center? <span style={{ fontStyle: 'italic' }}>Join Live Online Classes.</span>
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#CBBCC0', lineHeight: 1.5 }}>
                Daily Google Meet dictations, live digital whiteboard outline checking, and real-time doubt resolution directly with Shadab Sir.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '17px', color: '#E5B8BE' }}>
                Online passes from ₹30
              </span>
              <button
                type="button"
                onClick={() => setCurrentTab && setCurrentTab('classes')}
                style={{
                  background: '#FAF6F0',
                  color: '#231418',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FAF6F0'}
              >
                <span>View Live Schedule</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WARM-SAND FEATURE SPLIT — TRAINING METHOD (#EFE7DC)
          ========================================================================= */}
      <section 
        style={{
          background: '#EFE7DC',
          padding: '88px 0',
          width: '100%',
          borderTop: '1px solid #DFD4C6'
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
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '48px',
              alignItems: 'center'
            }}
          >
            {/* Left Column (5 cols) */}
            <div 
              style={{
                gridColumn: 'span 12',
                minWidth: 0,
                textAlign: 'left'
              }}
              className="lg:!col-span-5"
            >
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#991B1B',
                  marginBottom: '10px',
                  display: 'block'
                }}
              >
                STRUCTURED PROGRESSION
              </span>
              <h2 
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 400,
                  color: '#231418',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  margin: '0 0 16px 0'
                }}
              >
                Training that actually <span style={{ fontStyle: 'italic' }}>reaches exam speed.</span>
              </h2>
              <p style={{ fontSize: '15px', color: '#594A4D', lineHeight: 1.65, margin: '0 0 16px 0' }}>
                We believe that while automated software is indispensable for measuring transcription speed, true shorthand accuracy demands rigorous, traditional stroke discipline.
              </p>
              <p style={{ fontSize: '15px', color: '#594A4D', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                Every single curve angle, light and dark stroke distinction, and grammalogue contraction is inspected daily by Shadab Sir so flawed shorthand habits never enter the examination hall.
              </p>
              
              <div 
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #DFD4C6',
                  boxShadow: '0 12px 32px rgba(35, 20, 24, 0.06)'
                }}
              >
                <img 
                  src="/assets/court-feature.jpg" 
                  alt="Court Transcription Practice"
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            {/* Right Column (7 cols — 4 Crisp White Horizontal Cards) */}
            <div 
              style={{
                gridColumn: 'span 12',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
              className="lg:!col-span-7"
            >
              {/* Card 1 */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '22px 24px',
                  border: '1px solid #E8DFD3',
                  boxShadow: '0 4px 16px rgba(35, 20, 24, 0.04)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px'
                }}
              >
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#EFE7DC',
                    color: '#991B1B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Headphones size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#231418', margin: '0 0 4px 0' }}>
                    01 &middot; Learn &amp; Write Pitman Shorthand
                  </h4>
                  <p style={{ fontSize: '14px', color: '#594A4D', lineHeight: 1.55, margin: 0 }}>
                    Master foundational consonants, vowels, and phraseography, followed by 50–140 WPM speed development on editorial and legal passages.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '22px 24px',
                  border: '1px solid #E8DFD3',
                  boxShadow: '0 4px 16px rgba(35, 20, 24, 0.04)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px'
                }}
              >
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#EFE7DC',
                    color: '#991B1B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Keyboard size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#231418', margin: '0 0 4px 0' }}>
                    02 &middot; Transcribe on Exam-Grade Keyboards
                  </h4>
                  <p style={{ fontSize: '14px', color: '#594A4D', lineHeight: 1.55, margin: 0 }}>
                    Dedicated typing drills for Hindi Kruti Dev 010, Mangal Inscript, and English QWERTY with official backspace-lock enforcement.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '22px 24px',
                  border: '1px solid #E8DFD3',
                  boxShadow: '0 4px 16px rgba(35, 20, 24, 0.04)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px'
                }}
              >
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#EFE7DC',
                    color: '#991B1B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#231418', margin: '0 0 4px 0' }}>
                    03 &middot; Pass SSC &amp; Court Error Audits
                  </h4>
                  <p style={{ fontSize: '14px', color: '#594A4D', lineHeight: 1.55, margin: 0 }}>
                    Get instant computer audits calculating exact full and half mistakes according to official commission notification formulas.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div 
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '22px 24px',
                  border: '1px solid #E8DFD3',
                  boxShadow: '0 4px 16px rgba(35, 20, 24, 0.04)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px'
                }}
              >
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#EFE7DC',
                    color: '#991B1B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Award size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#231418', margin: '0 0 4px 0' }}>
                    04 &middot; Personal Daily Outline Checking
                  </h4>
                  <p style={{ fontSize: '14px', color: '#594A4D', lineHeight: 1.55, margin: 0 }}>
                    Every shorthand candidate receives individual notebook checking and stroke diagnosis directly by Shadab Sir in person or live video.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DATA + HUMAN PROOF (#FBF8F3)
          ========================================================================= */}
      <section 
        style={{
          background: '#FBF8F3',
          padding: '88px 0',
          width: '100%',
          borderTop: '1px solid #E5DBD0'
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
          {/* Header */}
          <div style={{ maxWidth: '640px', marginBottom: '40px', textAlign: 'left' }}>
            <span 
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: '#991B1B',
                marginBottom: '10px',
                display: 'block'
              }}
            >
              PROVEN TRACK RECORD
            </span>
            <h2 
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 400,
                color: '#231418',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 10px 0'
              }}
            >
              Numbers your scorecard <span style={{ fontStyle: 'italic' }}>will agree with.</span>
            </h2>
          </div>

          {/* 4 Crisp White Stat Tiles */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              marginBottom: '48px'
            }}
          >
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E8DFD3',
                boxShadow: '0 4px 16px rgba(35, 20, 24, 0.04)'
              }}
            >
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '42px', color: '#231418', lineHeight: 1, marginBottom: '8px' }}>
                98.4%
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Transcription Accuracy
              </div>
              <p style={{ fontSize: '13px', color: '#594A4D', marginTop: '6px', margin: '6px 0 0 0' }}>
                Average qualification rate of regular batch students in SSC skill tests.
              </p>
            </div>

            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E8DFD3',
                boxShadow: '0 4px 16px rgba(35, 20, 24, 0.04)'
              }}
            >
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '42px', color: '#231418', lineHeight: 1, marginBottom: '8px' }}>
                140
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Top WPM Speed Achieved
              </div>
              <p style={{ fontSize: '13px', color: '#594A4D', marginTop: '6px', margin: '6px 0 0 0' }}>
                Parliamentary and High Court reporter level transcription speed.
              </p>
            </div>

            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E8DFD3',
                boxShadow: '0 4px 16px rgba(35, 20, 24, 0.04)'
              }}
            >
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '42px', color: '#231418', lineHeight: 1, marginBottom: '8px' }}>
                10,000+
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Audio Dictations Evaluated
              </div>
              <p style={{ fontSize: '13px', color: '#594A4D', marginTop: '6px', margin: '6px 0 0 0' }}>
                Official KC, progressive, and legal judgment files checked since 2012.
              </p>
            </div>

            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E8DFD3',
                boxShadow: '0 4px 16px rgba(35, 20, 24, 0.04)'
              }}
            >
              <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '42px', color: '#231418', lineHeight: 1, marginBottom: '8px' }}>
                3 Days
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Free Demo Classes
              </div>
              <p style={{ fontSize: '13px', color: '#594A4D', marginTop: '6px', margin: '6px 0 0 0' }}>
                Full classroom, lab, and notebook checking trial with zero fee upfront.
              </p>
            </div>
          </div>

          {/* Feature Testimonial Pair (5 cols / 7 cols) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '36px',
              alignItems: 'center',
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid #E8DFD3',
              boxShadow: '0 6px 24px rgba(35, 20, 24, 0.04)'
            }}
          >
            <div 
              style={{
                gridColumn: 'span 12',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid #E5DBD0'
              }}
              className="lg:!col-span-5"
            >
              <img 
                src="/assets/institution-hero.jpg" 
                alt="Selected Student Batch"
                style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '10px 14px', background: '#FBF8F3', fontSize: '11px', fontWeight: 600, color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'flex', justifyContent: 'space-between' }}>
                <span>SSC Grade C &amp; D Batch</span>
                <span style={{ color: '#991B1B' }}>Selected Qualifiers</span>
              </div>
            </div>

            <div 
              style={{
                gridColumn: 'span 12',
                textAlign: 'left'
              }}
              className="lg:!col-span-7"
            >
              <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={17} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <blockquote 
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)',
                  color: '#231418',
                  lineHeight: 1.3,
                  margin: '0 0 16px 0'
                }}
              >
                &ldquo;My transcription errors dropped under 2% in six weeks. The daily individual notebook evaluation made all the difference.&rdquo;
              </blockquote>
              <p style={{ fontSize: '14px', color: '#594A4D', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                Shadab Sir pointed out exact stroke distortions in my Pitman outlines that I had been repeating for months elsewhere. The backspace lock in the typing lab also stopped me from hesitating at the keyboard.
              </p>
              <div>
                <strong style={{ fontSize: '14px', color: '#231418', display: 'block' }}>Rajesh Kumar</strong>
                <span style={{ fontSize: '12px', color: '#8A7B7E' }}>Selected &middot; Personal Assistant (PA), Patna High Court</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FULL-BLEED DARK BRAND STORY BAND — SHADAB SIR (#231418)
          ========================================================================= */}
      <section 
        style={{
          background: '#231418',
          color: '#FAF6F0',
          padding: '96px 0',
          width: '100%',
          borderTop: '1px solid #3A2329'
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
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '48px',
              alignItems: 'start'
            }}
          >
            {/* Left Column (5 cols) */}
            <div 
              style={{
                gridColumn: 'span 12',
                textAlign: 'left'
              }}
              className="lg:!col-span-5"
            >
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#C9A3A8',
                  marginBottom: '12px',
                  display: 'block'
                }}
              >
                OUR STORY &middot; GUIDED BY SHADAB SIR
              </span>
              <h2 
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 'clamp(2.25rem, 3.8vw, 3.25rem)',
                  fontWeight: 400,
                  color: '#FAF6F0',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  margin: '0 0 24px 0'
                }}
              >
                Twelve years of discipline, <span style={{ fontStyle: 'italic', color: '#E5B8BE' }}>built for govt. selections.</span>
              </h2>

              <button
                type="button"
                onClick={() => setCurrentTab && setCurrentTab('about')}
                style={{
                  background: 'transparent',
                  border: '1px solid #52373E',
                  color: '#FAF6F0',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#321C22'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span>Read Full Methodology</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Right Column (7 cols) Narrative & Milestone Grid */}
            <div 
              style={{
                gridColumn: 'span 12',
                textAlign: 'left'
              }}
              className="lg:!col-span-7"
            >
              <p style={{ fontSize: '15px', color: '#D6C7CA', lineHeight: 1.7, margin: '0 0 16px 0' }}>
                Founded at Gaya College More in 2012, Gaya Shorthand Classes began with a single mission: to provide candidates with genuine, uncompromised stenography guidance matching the exact grading standards of the Staff Selection Commission and High Courts.
              </p>
              <p style={{ fontSize: '15px', color: '#D6C7CA', lineHeight: 1.7, margin: '0 0 32px 0' }}>
                Over the past decade, more than 2,700 students have trained under Shadab Sir's direct eye. By combining traditional Pitman stroke checking with modern automated evaluation software and daily live Google Meet broadcasts, we offer an uncompromising pathway to state and central government employment.
              </p>

              {/* 2x2 Hairline Milestone Grid */}
              <div 
                style={{
                  paddingTop: '28px',
                  borderTop: '1px solid #3D252B',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px'
                }}
              >
                <div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '32px', color: '#FAF6F0', lineHeight: 1 }}>
                    2012
                  </div>
                  <div style={{ fontSize: '11px', color: '#A89397', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '6px' }}>
                    Founded at Gaya College More
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '32px', color: '#FAF6F0', lineHeight: 1 }}>
                    50–140 WPM
                  </div>
                  <div style={{ fontSize: '11px', color: '#A89397', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '6px' }}>
                    Speed Range Mastered
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '32px', color: '#FAF6F0', lineHeight: 1 }}>
                    Offline + Live
                  </div>
                  <div style={{ fontSize: '11px', color: '#A89397', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '6px' }}>
                    Hybrid Classroom Model
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '32px', color: '#FAF6F0', lineHeight: 1 }}>
                    2,700+
                  </div>
                  <div style={{ fontSize: '11px', color: '#A89397', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '6px' }}>
                    Aspirants Trained
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: STUDENT REVIEWS ROW (#FBF8F3)
          ========================================================================= */}
      <section 
        style={{
          background: '#FBF8F3',
          padding: '88px 0',
          width: '100%',
          borderTop: '1px solid #E5DBD0'
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
          {/* Header */}
          <div style={{ maxWidth: '640px', marginBottom: '40px', textAlign: 'left' }}>
            <span 
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: '#991B1B',
                marginBottom: '10px',
                display: 'block'
              }}
            >
              VERIFIED ASPIRANTS
            </span>
            <h2 
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 400,
                color: '#231418',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: 0
              }}
            >
              2,700+ aspirants <span style={{ fontStyle: 'italic' }}>and counting.</span>
            </h2>
          </div>

          {/* 3 Review Cards Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px'
            }}
          >
            {/* Review 1 */}
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E8DFD3',
                boxShadow: '0 4px 16px rgba(35, 20, 24, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #EFE7DC' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#231418', textTransform: 'uppercase', letterSpacing: '0.08em' }}>SSC Steno Grade C</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#991B1B' }}>100 WPM &middot; 97.4% Acc</span>
                </div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#594A4D', lineHeight: 1.6, margin: '0 0 18px 0' }}>
                  &ldquo;Shadab Sir's daily dictation practice and 5-minute reading room made all the difference in my SSC skill test. Individual notebook checking helped fix my stroke angles completely.&rdquo;
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#231418', color: '#FAF6F0', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  AV
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#231418' }}>Anjali Verma</div>
                  <div style={{ fontSize: '11px', color: '#8A7B7E' }}>Selected 2023 &middot; Central Secretariat</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E8DFD3',
                boxShadow: '0 4px 16px rgba(35, 20, 24, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #EFE7DC' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#231418', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Patna High Court PA</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#991B1B' }}>100 WPM &middot; 98.2% Acc</span>
                </div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#594A4D', lineHeight: 1.6, margin: '0 0 18px 0' }}>
                  &ldquo;The strict backspace lock simulation and legal judgment audio series mirrored the exact Patna High Court exam software. Reached 100 WPM with zero guesswork.&rdquo;
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#231418', color: '#FAF6F0', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  RK
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#231418' }}>Rakesh Kumar</div>
                  <div style={{ fontSize: '11px', color: '#8A7B7E' }}>Qualified 2022 &middot; Patna High Court Bench</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #E8DFD3',
                boxShadow: '0 4px 16px rgba(35, 20, 24, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #EFE7DC' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#231418', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Civil Court Steno</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#991B1B' }}>80 WPM &middot; 96.8% Acc</span>
                </div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#594A4D', lineHeight: 1.6, margin: '0 0 18px 0' }}>
                  &ldquo;Joined from out of town through live Google Meet batches. The digital whiteboard outline review is just like sitting right in front of Sir in the classroom.&rdquo;
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#231418', color: '#FAF6F0', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  PS
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#231418' }}>Priya Sharma</div>
                  <div style={{ fontSize: '11px', color: '#8A7B7E' }}>Online Candidate &middot; Civil Court Qualifier</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: WARM-SAND OPEN FAQ & GAYA CENTER SPLIT (#EFE7DC)
          ========================================================================= */}
      <section 
        style={{
          background: '#EFE7DC',
          padding: '88px 0',
          width: '100%',
          borderTop: '1px solid #DFD4C6'
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
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '48px',
              alignItems: 'start'
            }}
          >
            {/* Left Column (5 cols) Gaya Center Card */}
            <div 
              style={{
                gridColumn: 'span 12',
                textAlign: 'left'
              }}
              className="lg:!col-span-5"
            >
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#991B1B',
                  marginBottom: '10px',
                  display: 'block'
                }}
              >
                FAQ &amp; GAYA CENTER
              </span>
              <h2 
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 400,
                  color: '#231418',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  margin: '0 0 24px 0'
                }}
              >
                Questions, <span style={{ fontStyle: 'italic' }}>answered.</span>
              </h2>

              <div 
                style={{
                  background: '#FBF8F3',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #DFD4C6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: '0 4px 16px rgba(35, 20, 24, 0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={18} color="#991B1B" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Center Location</div>
                    <div style={{ fontSize: '14px', color: '#231418', fontWeight: 600, marginTop: '2px' }}>
                      Gaya College More, Opposite Cyber Thana, Gayaji, Bihar
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Clock size={18} color="#991B1B" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Laboratory Timings</div>
                    <div style={{ fontSize: '14px', color: '#231418', fontWeight: 600, marginTop: '2px' }}>
                      6:00 AM – 11:00 AM &amp; 3:00 PM – 8:00 PM (Mon–Sat)
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Phone size={18} color="#991B1B" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#8A7B7E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Helpline &amp; Inquiries</div>
                    <div style={{ fontSize: '14px', color: '#231418', fontWeight: 600, marginTop: '2px' }}>
                      Director (Shadab Sir): +91 9204123453<br />
                      Admissions: +91 7870377214
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleOpenDemo}
                  style={{
                    background: '#231418',
                    color: '#FAF6F0',
                    borderRadius: '9999px',
                    padding: '11px 20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3A2228'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#231418'}
                >
                  <span>Book 3 Free Demos &rarr;</span>
                </button>
              </div>
            </div>

            {/* Right Column (7 cols) Interactive Accordion */}
            <div 
              style={{
                gridColumn: 'span 12',
                textAlign: 'left'
              }}
              className="lg:!col-span-7"
            >
              <div style={{ borderTop: '1px solid #DDD1C2', borderBottom: '1px solid #DDD1C2' }}>
                {TOP_FAQS.map((faq) => {
                  const isOpen = activeFaq === faq.id;
                  return (
                    <div key={faq.id} style={{ borderBottom: '1px solid #DDD1C2' }}>
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '20px 0',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px'
                        }}
                      >
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#231418' }}>
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp size={18} color="#991B1B" style={{ flexShrink: 0 }} />
                        ) : (
                          <ChevronDown size={18} color="#8A7B7E" style={{ flexShrink: 0 }} />
                        )}
                      </button>
                      {isOpen && (
                        <div style={{ paddingBottom: '20px', fontSize: '14px', color: '#594A4D', lineHeight: 1.65 }}>
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
          SECTION 9: SOFT WARM-GLOW PRE-FOOTER CTA (#FBF8F3)
          ========================================================================= */}
      <section 
        style={{
          background: '#FBF8F3',
          position: 'relative',
          overflow: 'hidden',
          padding: '96px 24px',
          textAlign: 'center',
          borderTop: '1px solid #E5DBD0'
        }}
      >
        {/* Radial Terracotta Warm Glow */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 65% 60% at 50% 50%, rgba(217, 160, 145, 0.22) 0%, rgba(251, 248, 243, 0) 75%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span 
            style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: '#991B1B',
              marginBottom: '12px',
              display: 'block'
            }}
          >
            3 FREE DEMO CLASSES &middot; NO COMMITMENT
          </span>

          <h2 
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)',
              fontWeight: 400,
              color: '#231418',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0'
            }}
          >
            Ready to build <span style={{ fontStyle: 'italic' }}>exam-hall speed?</span>
          </h2>

          <p style={{ fontSize: '16px', color: '#594A4D', lineHeight: 1.6, maxWidth: '540px', margin: '0 auto 32px auto' }}>
            Take a free calibrated audio dictation test online or visit our Gaya College More center for 3 free trial classes.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={handleStartTests}
              style={{
                background: '#231418',
                color: '#FAF6F0',
                padding: '14px 28px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(35, 20, 24, 0.16)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3A2228'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#231418'}
            >
              <span>Start Free Dictation Test &rarr;</span>
            </button>

            <button
              type="button"
              onClick={handleExploreCourses}
              style={{
                background: '#FFFFFF',
                border: '1px solid #DDD1C2',
                color: '#231418',
                padding: '14px 28px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(35, 20, 24, 0.04)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EFE7DC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              <span>Explore All Courses</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
