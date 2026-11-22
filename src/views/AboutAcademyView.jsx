import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  GraduationCap, 
  CheckCircle2,
  Tv,
  Cpu,
  Users,
  BookOpen,
  Briefcase,
  Sparkles,
  Globe,
  Award,
  Layers,
  Keyboard,
  Headphones,
  FileText,
  ArrowRight,
  Calendar,
  RotateCcw,
  ShieldCheck,
  MessageCircle,
  Check
} from 'lucide-react';
import { TARGET_EXAMINATIONS, TEACHING_METHODOLOGY } from '../data/mockData';
import '../landing-redesign.css';

export default function AboutAcademyView({ onOpenCheckout, onOpenAdmission, setCurrentTab }) {
  const keyHighlights = [
    {
      num: "01",
      icon: Award,
      title: "Experienced Faculty – Shadab Sir",
      description: "Personalized mentorship and proven speed-building techniques by Shadab Sir with 12+ years of dedicated coaching for SSC and High Court steno aspirants."
    },
    {
      num: "02",
      icon: Layers,
      title: "Basic to Advanced Training",
      description: "Systematic step-by-step curriculum starting from initial theory, consonants and vowels up to 50–140 WPM speed mastery."
    },
    {
      num: "03",
      icon: Tv,
      title: "Audio-Visual Classroom",
      description: "Classes are supported with digital presentations, on-screen guidance, and interactive visuals to make learning easy and engaging."
    },
    {
      num: "04",
      icon: Keyboard,
      title: "Online Typing & Accuracy Software",
      description: "Modern typing studio supporting English (QWERTY), Hindi Kruti Dev 010, and Mangal Inscript with real-time accuracy scoring and error analysis."
    },
    {
      num: "05",
      icon: Headphones,
      title: "Regular Dictation Practice",
      description: "Daily progressive audio dictations covering parliamentary debates, editorial passages, and high court criminal/civil judgments."
    },
    {
      num: "06",
      icon: FileText,
      title: "Exam-Oriented Mock Tests",
      description: "Full exam simulation with 5-minute reading clock, audio warnings, backspace lock option, and strict full/half mistake formula scoring."
    },
    {
      num: "07",
      icon: Cpu,
      title: "Individual Performance Monitoring",
      description: "AI-based evaluation tools that simulate real dictation scenarios, provide instant feedback, and track individual speed and accuracy progression."
    },
    {
      num: "08",
      icon: Briefcase,
      title: "Government Exam Preparation",
      description: "Specialized targeted batches for SSC Steno Grade C & D, Patna High Court, Jharkhand High Court, Civil Courts, PA, PS, and clerical recruitment."
    }
  ];

  const methodologyIconMap = {
    Layers,
    Tv,
    Calendar,
    Headphones,
    RotateCcw,
    Users,
    Cpu,
    ShieldCheck
  };

  return (
    <div 
      className="sp-about-root about-page-wrapper"
      style={{
        backgroundColor: '#ECE8E0',
        minHeight: '100vh',
        width: '100%',
        color: '#16161A',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        margin: 0,
        padding: 0
      }}
    >
      
      {/* =========================================================================
          SECTION 1: EDITORIAL PAGE HEADER + WARM STONE IDENTITY BAR
          ========================================================================= */}
      <section 
        style={{
          backgroundColor: '#ECE8E0',
          width: '100%',
          paddingTop: '112px',
          paddingBottom: '36px'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            textAlign: 'left'
          }}
        >
          {/* Eyebrow with tiny static 6px #991B1B dot */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B', display: 'inline-block' }} />
            <span style={{
              fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#57534E'
            }}>
              Est. 2012 · Gaya College More · Bihar's Premier Stenography Academy
            </span>
          </div>

          {/* H1 Heading */}
          <h1 
            style={{ 
              fontSize: 'clamp(2.1rem, 3.4vw, 3.15rem)', 
              fontWeight: 800, 
              color: '#16161A', 
              letterSpacing: '-0.03em', 
              margin: '0 0 16px',
              lineHeight: 1.12
            }}
          >
            About{' '}
            <span style={{ 
              fontFamily: "'Instrument Serif', Georgia, serif", 
              fontStyle: 'italic', 
              fontWeight: 400, 
              color: '#991B1B', 
              letterSpacing: 'normal',
              fontSize: '1.08em' 
            }}>
              Gaya Shorthand
            </span>{' '}
            Classes
          </h1>

          {/* Subheading */}
          <p 
            style={{ 
              fontSize: '1.05rem', 
              color: '#44403C', 
              lineHeight: 1.65, 
              maxWidth: '820px', 
              margin: 0 
            }}
          >
            <strong>Gaya Shorthand Classes</strong> — <em>Learn Today, Lead Tomorrow.</em> Led by experienced faculty{' '}
            <strong style={{ color: '#16161A', fontWeight: 700 }}>Shadab Sir (12+ Years Experience)</strong>, we are a professional training center (Offline and Online) dedicated to enhancing typing, shorthand, and computer skills with a modern approach to learning.
          </p>
        </div>
      </section>

      {/* Flush Full-Width Identity Strip */}
      <div 
        style={{
          width: '100%',
          background: '#E4DFD5',
          borderTop: '1px solid #D1CBBF',
          borderBottom: '1px solid #D1CBBF',
          padding: '12px 0'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            fontSize: '12px'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#16161A' }}>
            <MapPin size={15} color="#991B1B" style={{ flexShrink: 0 }} />
            <span>Gaya, Bihar (Est. 2012) · Behind Gaya College More, Opposite Cyber Thana</span>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#57534E'
          }}>
            OFFLINE CLASSROOM + LIVE ONLINE STUDIO
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: LEGACY STORY & FOUNDER SPOTLIGHT
          ========================================================================= */}
      <section 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px 72px'
        }}
      >
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            alignItems: 'start'
          }}
        >
          {/* Left Column (7 cols): Editorial Narrative + Balanced 4-Stat Bar */}
          <div 
            style={{ 
              gridColumn: 'span 7 / span 7',
              display: 'flex',
              flexDirection: 'column'
            }}
            className="sp-about-col-left"
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#57534E',
              display: 'inline-block',
              marginBottom: '8px'
            }}>
              Our Mission &amp; Legacy
            </span>

            <h2 
              style={{ 
                fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', 
                fontWeight: 800, 
                color: '#16161A', 
                letterSpacing: '-0.02em', 
                margin: '0 0 16px',
                lineHeight: 1.25
              }}
            >
              Practical Excellence &amp; Career Focus
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#44403C', fontSize: '0.96rem', lineHeight: 1.65 }}>
              <p style={{ margin: 0 }}>
                The institute provides highly practical courses in <strong style={{ color: '#16161A' }}>Shorthand</strong>, <strong style={{ color: '#16161A' }}>Typing</strong>, and <strong style={{ color: '#16161A' }}>Advanced Diploma in Computer Applications (ADCA)</strong>, <strong>DCA</strong>, <strong>TALLY</strong> etc., designed to help students build speed, accuracy, and efficiency for career growth in Government and private sectors.
              </p>
              <p style={{ margin: 0 }}>
                Over the last decade and a half, our academy (Gaya Shorthand Classes) has mentored more than <strong style={{ color: '#16161A' }}>10,000+ candidates</strong> who are currently serving as Stenographers, Personal Assistants (PA), Private Secretaries (PS), and Clerical Officers in the <strong style={{ color: '#16161A' }}>Supreme Court, High Courts, SSC (Grade C &amp; D)</strong>, Central Secretariats, and State Departments.
              </p>
            </div>

            {/* Symmetrical 4-Column Stat Architecture Bar (Zero Orphan Box) */}
            <div 
              style={{
                marginTop: '32px',
                background: '#F7F5F0',
                border: '1px solid #D1CBBF',
                borderRadius: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(22, 22, 26, 0.03)'
              }}
              className="sp-about-stat-bar"
            >
              {[
                { stat: '50–140', label: 'WPM Training Range' },
                { stat: '15+', label: 'Structured Courses' },
                { stat: '10,000+', label: 'Practice Dictations' },
                { stat: '2,700+', label: 'Trained Aspirants' }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '20px 16px',
                    textAlign: 'center',
                    borderLeft: idx > 0 ? '1px solid #DFD9CD' : 'none'
                  }}
                >
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 800,
                    fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)',
                    color: '#16161A',
                    lineHeight: 1.1
                  }}>
                    {item.stat}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#57534E',
                    marginTop: '6px'
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Elevated Founder Card for Shadab Sir */}
          <div 
            style={{ 
              gridColumn: 'span 5 / span 5'
            }}
            className="sp-about-col-right"
          >
            <div 
              style={{
                background: '#F7F5F0',
                border: '1px solid #D1CBBF',
                borderTop: '4px solid #991B1B',
                borderRadius: '18px',
                padding: '28px',
                boxShadow: '0 12px 32px rgba(22, 22, 26, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#16161A',
                    color: '#F5F3EE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    flexShrink: 0
                  }}>
                    SS
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#16161A', margin: '0 0 3px' }}>
                      Shadab Sir
                    </h3>
                    <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#991B1B', margin: 0 }}>
                      Founder &amp; Chief Instructor · 12+ Years Experience
                    </p>
                  </div>
                </div>

                {/* Editorial Quote Block */}
                <blockquote 
                  style={{
                    margin: '0 0 20px',
                    background: '#EFECE5',
                    borderLeft: '3px solid #991B1B',
                    borderRadius: '0 10px 10px 0',
                    padding: '14px 16px',
                    fontSize: '0.88rem',
                    fontStyle: 'italic',
                    color: '#44403C',
                    lineHeight: 1.6
                  }}
                >
                  "This modern, technology-driven approach ensures that students not only master traditional shorthand and typing skills but also stay ahead with digital competency for today's professional demands."
                </blockquote>

                {/* 3 Credential Rows */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  paddingBottom: '22px',
                  borderBottom: '1px solid #DFD9CD'
                }}>
                  {[
                    "Basic to Advance Shorthand Training (50 WPM to 140 WPM)",
                    "AI-Based Dictation Simulation & Real-Time Error Scoring",
                    "Tailored pacing for SSC, High Court, PA/PS & Data Entry Exams"
                  ].map((cred, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '0.84rem', color: '#44403C', lineHeight: 1.45 }}>
                      <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Call CTA Button */}
              <a 
                href="tel:+919204123453"
                style={{
                  marginTop: '22px',
                  background: '#991B1B',
                  color: '#FFFFFF',
                  width: '100%',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 16px rgba(153, 27, 27, 0.18)',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#7F1D1D'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#991B1B'}
              >
                <Phone size={15} color="#FFFFFF" />
                <span>Call Shadab Sir (+91 9204123453)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INSTITUTE HIGHLIGHTS — BALANCED 4×2 ARCHITECTURAL GRID
          ========================================================================= */}
      <section 
        style={{
          borderTop: '1px solid #D6D0C4',
          padding: '64px 0 80px',
          backgroundColor: '#ECE8E0'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px'
          }}
        >
          {/* Section Header */}
          <div style={{ textAlign: 'left', marginBottom: '36px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#57534E',
              display: 'inline-block',
              marginBottom: '8px'
            }}>
              Why Students Choose Gaya Shorthand Classes
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', fontWeight: 800, color: '#16161A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              Institute Highlights
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#44403C', maxWidth: '740px', margin: 0, lineHeight: 1.6 }}>
              Under experienced faculty <strong>Shadab Sir (12 Years Experience)</strong>, we provide basic to advanced training with audio-visual classrooms, online typing software, and exam-oriented mock tests.
            </p>
          </div>

          {/* Balanced 4×2 Architectural Grid (8 highlights total) */}
          <div 
            style={{
              background: '#F7F5F0',
              border: '1px solid #D1CBBF',
              borderRadius: '18px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              boxShadow: '0 4px 20px rgba(22, 22, 26, 0.03)'
            }}
            className="sp-about-highlights-grid"
          >
            {keyHighlights.map((item, idx) => {
              const IconComp = item.icon;
              const isRightCol = (idx + 1) % 4 === 0;
              const isBottomRow = idx >= 4;

              return (
                <div 
                  key={idx}
                  style={{
                    padding: '26px',
                    borderRight: isRightCol ? 'none' : '1px solid #DFD9CD',
                    borderBottom: isBottomRow ? 'none' : '1px solid #DFD9CD',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F0ECE3'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div>
                    {/* Top micro-row: Monochrome Icon + Monospace Index */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: '#EFECE5',
                        border: '1px solid #D1CBBF',
                        color: '#57534E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComp size={19} />
                      </div>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#8C8578'
                      }}>
                        {item.num}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#16161A', margin: '0 0 8px', lineHeight: 1.35 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#44403C', lineHeight: 1.6, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: RECRUITMENT EXAMINATIONS — 3×3 EDITORIAL DIRECTORY
          ========================================================================= */}
      <section 
        style={{
          borderTop: '1px solid #D6D0C4',
          padding: '64px 0 80px',
          backgroundColor: '#ECE8E0'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px'
          }}
        >
          {/* Section Header */}
          <div style={{ textAlign: 'left', marginBottom: '36px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#57534E',
              display: 'inline-block',
              marginBottom: '8px'
            }}>
              Target Government Recruitment Exams
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', fontWeight: 800, color: '#16161A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              कौन-कौन सी परीक्षाओं की तैयारी कराई जाती है?
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#44403C', maxWidth: '720px', margin: 0, lineHeight: 1.6 }}>
              Specialized speed &amp; accuracy coaching tailored to official skill test patterns.
            </p>
          </div>

          {/* 3×3 Symmetrical Grid (9 Exam Cards) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}
          >
            {TARGET_EXAMINATIONS.map((exam) => (
              <div 
                key={exam.id}
                style={{
                  background: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderRadius: '16px',
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 10px rgba(22, 22, 26, 0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#B8B1A3';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 22, 26, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#D1CBBF';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(22, 22, 26, 0.03)';
                }}
              >
                <div>
                  {/* Top Metadata Row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #DFD9CD'
                  }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#57534E'
                    }}>
                      {exam.category}
                    </span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#991B1B',
                      fontVariantNumeric: 'tabular-nums'
                    }}>
                      {exam.speed}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '14px 0 10px' }}>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#16161A', margin: '0 0 6px', lineHeight: 1.35 }}>
                      {exam.title}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#44403C', lineHeight: 1.6, margin: 0 }}>
                      {exam.description}
                    </p>
                  </div>
                </div>

                {/* Footer Row */}
                <div style={{
                  paddingTop: '12px',
                  borderTop: '1px solid #DFD9CD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '11px', color: '#78716C', fontWeight: 600 }}>
                    {exam.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (setCurrentTab) setCurrentTab('courses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#16161A',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#991B1B'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#16161A'}
                  >
                    <span>Prepare Now</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: 8-STAGE TEACHING METHODOLOGY (शिक्षण पद्धति)
          ========================================================================= */}
      <section 
        style={{
          borderTop: '1px solid #D6D0C4',
          padding: '64px 0 80px',
          backgroundColor: '#ECE8E0'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px'
          }}
        >
          {/* Section Header */}
          <div style={{ textAlign: 'left', marginBottom: '36px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#57534E',
              display: 'inline-block',
              marginBottom: '8px'
            }}>
              Structured Training Pedagogy
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', fontWeight: 800, color: '#16161A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              Teaching Methodology (शिक्षण पद्धति)
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#44403C', maxWidth: '720px', margin: 0, lineHeight: 1.6 }}>
              Led by experienced faculty <strong>Shadab Sir (12 Years Experience)</strong>, our systematic 8-stage methodology ensures complete mastery from fundamental theory to final government exam qualification.
            </p>
          </div>

          {/* 4×2 Hairline Editorial Grid (Rendered directly on #ECE8E0) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '36px 32px'
            }}
          >
            {TEACHING_METHODOLOGY.map((item) => {
              const IconComp = methodologyIconMap[item.icon] || ShieldCheck;
              return (
                <div 
                  key={item.step}
                  style={{
                    borderTop: '2px solid #C8C2B6',
                    paddingTop: '16px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Top Row: STAGE Step in #991B1B Mono + Monochrome Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#991B1B'
                    }}>
                      STAGE {item.step}
                    </span>
                    <IconComp size={16} color="#78716C" />
                  </div>

                  {/* Title & Hindi Subtitle */}
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#16161A', margin: '6px 0 2px', lineHeight: 1.35 }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#57534E', margin: '0 0 10px' }}>
                    {item.hindi}
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.84rem', color: '#44403C', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: UNIFIED "VISIT US & ADMISSIONS DESK" ARCHITECTURAL CARD
          ========================================================================= */}
      <section 
        style={{
          padding: '16px 0 80px',
          backgroundColor: '#ECE8E0'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px'
          }}
        >
          {/* Outer Card Shell */}
          <div 
            style={{
              background: '#F7F5F0',
              border: '1px solid #D1CBBF',
              borderLeft: '4px solid #991B1B',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 12px 34px rgba(22, 22, 26, 0.06)',
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)'
            }}
            className="sp-about-visitus-grid"
          >
            {/* Left Column (7 cols): Center Details & Direct Contact */}
            <div 
              style={{
                gridColumn: 'span 7 / span 7',
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="sp-about-visitus-left"
            >
              <div>
                {/* Header Row */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid #DFD9CD'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src="/assets/logo-big-s.png" 
                      alt="Gaya Shorthand Classes Logo" 
                      style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <h2 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', fontWeight: 800, color: '#16161A', margin: 0 }}>
                      Visit Us: Gaya Shorthand Classes
                    </h2>
                  </div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#57534E'
                  }}>
                    GAYA COLLEGE MORE · EST. 2012
                  </span>
                </div>

                {/* Clean 2-Column Structured Info Grid */}
                <div 
                  style={{
                    marginTop: '24px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                    gap: '24px 28px'
                  }}
                >
                  {/* Campus Address */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <MapPin size={14} color="#57534E" />
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C' }}>
                        Campus Address
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#16161A', lineHeight: 1.45 }}>
                      Gaya College More, Opposite Cyber Thana, Gayaji, Bihar - 823001
                    </div>
                  </div>

                  {/* Daily Batch Timings */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Clock size={14} color="#57534E" />
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C' }}>
                        Batch Timings
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#16161A', lineHeight: 1.45, fontFamily: "'JetBrains Mono', monospace" }}>
                      6:00 AM – 11:00 AM<br />3:00 PM – 8:00 PM (Mon–Sat)
                    </div>
                  </div>

                  {/* Direct Helplines */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Phone size={14} color="#57534E" />
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C' }}>
                        Direct Helplines
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#16161A', lineHeight: 1.45, fontFamily: "'JetBrains Mono', monospace" }}>
                      <a href="tel:+919204123453" style={{ color: '#16161A', textDecoration: 'none' }}>+91 9204123453</a>
                      <span style={{ color: '#A8A29E', margin: '0 6px' }}>·</span>
                      <a href="tel:+917870377214" style={{ color: '#16161A', textDecoration: 'none' }}>+91 7870377214</a>
                    </div>
                  </div>

                  {/* Training Mode */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <GraduationCap size={14} color="#57534E" />
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C' }}>
                        Training Mode
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#16161A', lineHeight: 1.45 }}>
                      Offline Lab (50+ PCs) + Live Google Meet Broadcast
                    </div>
                  </div>

                  {/* Official Email */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Mail size={14} color="#57534E" />
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C' }}>
                        Official Email
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#16161A', lineHeight: 1.45 }}>
                      <a href="mailto:stenoplus.in@gmail.com" style={{ color: '#16161A', textDecoration: 'none' }}>
                        stenoplus.in@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Official Portal */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Globe size={14} color="#57534E" />
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#78716C' }}>
                        Online Portal
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#16161A', lineHeight: 1.45 }}>
                      <a href="https://stenoplus.in" target="_blank" rel="noopener noreferrer" style={{ color: '#16161A', textDecoration: 'none' }}>
                        https://stenoplus.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map Preview */}
              <div 
                style={{
                  marginTop: '24px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #D6D0C4',
                  height: '140px',
                  boxShadow: '0 2px 6px rgba(22, 22, 26, 0.02)'
                }}
              >
                <iframe
                  title="Gaya Shorthand Classes Center Map"
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

            {/* Right Column (5 cols): Admissions Desk & Actions */}
            <div 
              style={{
                gridColumn: 'span 5 / span 5',
                background: '#EFECE5',
                borderLeft: '1px solid #D6D0C4',
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="sp-about-visitus-right"
            >
              <div>
                {/* Eyebrow with tiny #991B1B dot */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#991B1B', display: 'inline-block' }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: '#57534E'
                  }}>
                    Admissions Open · 2026 Batches
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16161A', margin: '0 0 8px', lineHeight: 1.3 }}>
                  Connect with Admissions Desk
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#44403C', lineHeight: 1.6, margin: 0 }}>
                  Visit our center in Gaya to attend a free trial dictation session, inspect our 50+ PC lab, or activate your online access.
                </p>

                {/* Button Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '22px' }}>
                  {/* Primary CTA: Solid Deep Crimson */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenAdmission) {
                        onOpenAdmission();
                      } else if (setCurrentTab) {
                        setCurrentTab('landing');
                      }
                    }}
                    style={{
                      width: '100%',
                      background: '#991B1B',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '13px 18px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 6px 16px rgba(153, 27, 27, 0.20)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#7F1D1D'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#991B1B'}
                  >
                    <Sparkles size={15} color="#FFFFFF" />
                    <span>Book 3 Free Demo Classes →</span>
                  </button>

                  {/* Secondary CTA: Solid Deep Charcoal */}
                  <a
                    href="tel:+919204123453"
                    style={{
                      width: '100%',
                      background: '#16161A',
                      color: '#F5F3EE',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px 18px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxSizing: 'border-box',
                      fontFamily: "'JetBrains Mono', monospace",
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#27272A'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#16161A'}
                  >
                    <Phone size={15} color="#F5F3EE" />
                    <span>Call Helpline (+91 9204123453)</span>
                  </a>
                </div>

                {/* Direct Links Row: WhatsApp & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
                  <a
                    href="https://wa.me/919204123453"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#F7F5F0',
                      border: '1px solid #D1CBBF',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#16161A',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'border-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#B8B1A3'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D1CBBF'}
                  >
                    <MessageCircle size={14} color="#16161A" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="mailto:stenoplus.in@gmail.com"
                    style={{
                      background: '#F7F5F0',
                      border: '1px solid #D1CBBF',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#16161A',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'border-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#B8B1A3'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#D1CBBF'}
                  >
                    <Mail size={14} color="#16161A" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>

              {/* Reassurance List */}
              <div style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid #D6D0C4',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '12px',
                color: '#44403C'
              }}>
                {[
                  "Personalized mentorship by Shadab Sir (12+ Yrs Exp)",
                  "50–140 WPM Graded Speeds (Pitman & Hindi)",
                  "Govt. Recognized ADCA / DCA Computer Diplomas"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={14} color="#991B1B" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
