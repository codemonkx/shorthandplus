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
  Check,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeUp, StaggerContainer, StaggerItem, TRANSITION_EASE } from '../components/MotionPrimitives';
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
        backgroundColor: '#FBF8F3',
        minHeight: '100vh',
        width: '100%',
        color: '#231418',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        margin: 0,
        padding: 0
      }}
    >
      
      {/* =========================================================================
          SECTION 1: EDITORIAL HERO & FULL-WIDTH IDENTITY STRIP
          ========================================================================= */}
      <section 
        className="relative overflow-hidden"
        style={{
          backgroundColor: '#FBF8F3',
          width: '100%',
          paddingTop: '112px',
          paddingBottom: '48px',
          position: 'relative'
        }}
      >
        {/* Subtle decorative Pitman shorthand line-art background */}
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
            <line x1="880" y1="120" x2="1400" y2="120" stroke="#231418" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="880" y1="160" x2="1400" y2="160" stroke="#231418" strokeWidth="1" strokeDasharray="3 6" />
            <path d="M1020 110 L1020 160 M1020 160 L1040 175" stroke="#231418" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1080 115 C1105 130 1115 150 1095 160" stroke="#231418" strokeWidth="2" strokeLinecap="round" />
            <path d="M1150 120 C1140 125 1145 135 1155 132 L1185 160" stroke="#231418" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="1240" cy="135" r="7" stroke="#231418" strokeWidth="2" />
            <path d="M1247 135 L1285 158" stroke="#231418" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="40" y1="680" x2="520" y2="680" stroke="#231418" strokeWidth="3 6" />
            <path d="M40 680 C65 700 75 715 60 720" stroke="#231418" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M105 680 L135 725 L160 725" stroke="#231418" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="215" cy="695" r="7" stroke="#231418" strokeWidth="2" />
            <path d="M222 695 L255 720" stroke="#231418" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>

        <div 
          className="sp-courses-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            textAlign: 'left',
            position: 'relative',
            zIndex: 1,
            boxSizing: 'border-box'
          }}
        >
          <FadeUp>
            {/* Eyebrow with tiny #991B1B dot */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B', display: 'inline-block' }} />
              <span style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#8A7B7E'
              }}>
                EST. 2012 · GAYA COLLEGE MORE · BIHAR'S PREMIER STENOGRAPHY ACADEMY
              </span>
            </div>

            {/* H1 Heading in Instrument Serif */}
            <h1 
              style={{ 
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2.5rem, 4.4vw, 3.75rem)', 
                fontWeight: 400, 
                color: '#231418', 
                letterSpacing: '-0.02em', 
                margin: '0 0 16px',
                lineHeight: 1.05
              }}
            >
              About{' '}
              <span style={{ 
                fontStyle: 'italic', 
                color: '#991B1B'
              }}>
                Gaya Shorthand
              </span>{' '}
              Classes.
            </h1>

            {/* Subheading */}
            <p 
              style={{ 
                fontSize: '1.02rem', 
                color: '#594A4D', 
                lineHeight: 1.65, 
                maxWidth: '780px', 
                margin: 0 
              }}
            >
              <strong style={{ color: '#231418', fontWeight: 700 }}>Gaya Shorthand Classes</strong> — <em>Learn Today, Lead Tomorrow.</em> Led by experienced faculty{' '}
              <strong style={{ color: '#231418', fontWeight: 700 }}>Shadab Sir (12+ Years Experience)</strong>, we are a premier stenography &amp; computer academy (Offline Classroom &amp; Live Studio) dedicated to building professional steno speeds from first theory outline to final government selection.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Flush Full-Width Identity Strip on Warm Sand */}
      <div 
        style={{
          width: '100%',
          backgroundColor: '#EFE7DC',
          borderTop: '1px solid #E0D5C7',
          borderBottom: '1px solid #E0D5C7',
          padding: '14px 0'
        }}
      >
        <div 
          className="sp-courses-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '12px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#231418' }}>
            <MapPin size={15} color="#991B1B" style={{ flexShrink: 0 }} />
            <span>Gaya, Bihar (Est. 2012) · Behind Gaya College More, Opposite Cyber Thana</span>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#594A4D'
          }}>
            OFFLINE CLASSROOM + LIVE ONLINE STUDIO
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: LEGACY STORY & FOUNDER SPOTLIGHT (Warm Cream #FBF8F3)
          ========================================================================= */}
      <section 
        style={{
          backgroundColor: '#FBF8F3',
          width: '100%',
          padding: '56px 0 64px'
        }}
      >
        <div 
          className="sp-courses-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            boxSizing: 'border-box'
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
              <FadeUp>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#991B1B' }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: '#8A7B7E'
                  }}>
                    Our Mission &amp; Legacy
                  </span>
                </div>

                <h2 
                  style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(2rem, 3vw, 2.65rem)', 
                    fontWeight: 400, 
                    color: '#231418', 
                    letterSpacing: '-0.015em', 
                    margin: '0 0 16px',
                    lineHeight: 1.15
                  }}
                >
                  Practical excellence &amp;{' '}
                  <span style={{ fontStyle: 'italic', color: '#991B1B' }}>
                    career focus.
                  </span>
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#594A4D', fontSize: '0.96rem', lineHeight: 1.68 }}>
                  <p style={{ margin: 0 }}>
                    The institute provides highly practical courses in <strong style={{ color: '#231418' }}>Shorthand</strong>, <strong style={{ color: '#231418' }}>Typing</strong>, and <strong style={{ color: '#231418' }}>Advanced Diploma in Computer Applications (ADCA)</strong>, <strong>DCA</strong>, <strong>TALLY</strong> etc., designed to help students build speed, accuracy, and efficiency for career growth in Government and private sectors.
                  </p>
                  <p style={{ margin: 0 }}>
                    Over the last decade and a half, our academy (Gaya Shorthand Classes) has mentored more than <strong style={{ color: '#231418' }}>10,000+ candidates</strong> who are currently serving as Stenographers, Personal Assistants (PA), Private Secretaries (PS), and Clerical Officers in the <strong style={{ color: '#231418' }}>Supreme Court, High Courts, SSC (Grade C &amp; D)</strong>, Central Secretariats, and State Departments.
                  </p>
                </div>

                {/* Symmetrical 4-Column Stat Architecture Bar in Crisp White */}
                <div 
                  style={{
                    marginTop: '32px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8DFD3',
                    borderRadius: '16px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 18px rgba(35, 20, 24, 0.03)'
                  }}
                  className="sp-about-stat-bar"
                >
                  {[
                    { stat: '50–140', label: 'WPM Speed Range' },
                    { stat: '15+', label: 'Structured Courses' },
                    { stat: '10,000+', label: 'Practice Dictations' },
                    { stat: '2,700+', label: 'Trained Aspirants' }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      style={{
                        padding: '22px 16px',
                        textAlign: 'center',
                        borderLeft: idx > 0 ? '1px solid #EDE5DA' : 'none'
                      }}
                    >
                      <div style={{
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontVariantNumeric: 'tabular-nums',
                        fontWeight: 400,
                        fontSize: 'clamp(1.6rem, 2.2vw, 2.25rem)',
                        color: '#231418',
                        lineHeight: 1
                      }}>
                        {item.stat}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#8A7B7E',
                        marginTop: '8px'
                      }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right Column (5 cols): Elevated Founder Card for Shadab Sir */}
            <div 
              style={{ 
                gridColumn: 'span 5 / span 5'
              }}
              className="sp-about-col-right"
            >
              <FadeUp delay={0.1}>
                <div 
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8DFD3',
                    borderTop: '4px solid #991B1B',
                    borderRadius: '18px',
                    padding: '28px',
                    boxShadow: '0 12px 32px rgba(35, 20, 24, 0.06)',
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
                        backgroundColor: '#231418',
                        color: '#FAF6F0',
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
                        <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#231418', margin: '0 0 3px' }}>
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
                        backgroundColor: '#FBF8F3',
                        borderLeft: '3px solid #991B1B',
                        borderRadius: '0 10px 10px 0',
                        padding: '14px 16px',
                        fontSize: '0.88rem',
                        fontStyle: 'italic',
                        color: '#594A4D',
                        lineHeight: 1.65
                      }}
                    >
                      "This modern, technology-driven approach ensures that students not only master traditional shorthand and typing skills but also stay ahead with digital competency for today's professional demands."
                    </blockquote>

                    {/* 3 Credential Rows */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '11px',
                      paddingBottom: '22px',
                      borderBottom: '1px solid #EDE5DA'
                    }}>
                      {[
                        "Basic to Advance Shorthand Training (50 WPM to 140 WPM)",
                        "AI-Based Dictation Simulation & Real-Time Error Scoring",
                        "Tailored pacing for SSC, High Court, PA/PS & Data Entry Exams"
                      ].map((cred, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '0.84rem', color: '#594A4D', lineHeight: 1.45 }}>
                          <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Call CTA Pill Button */}
                  <a 
                    href="tel:+919204123453"
                    style={{
                      marginTop: '22px',
                      backgroundColor: '#991B1B',
                      color: '#FFFFFF',
                      width: '100%',
                      padding: '12px 20px',
                      borderRadius: '9999px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 6px 16px rgba(153, 27, 27, 0.18)',
                      textDecoration: 'none',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#7F1D1D';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#991B1B';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Phone size={15} color="#FFFFFF" />
                    <span>Call Shadab Sir (+91 9204123453)</span>
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INSTITUTE HIGHLIGHTS (Warm Sand #EFE7DC)
          ========================================================================= */}
      <section 
        style={{
          borderTop: '1px solid #E0D5C7',
          borderBottom: '1px solid #E0D5C7',
          padding: '56px 0 64px',
          backgroundColor: '#EFE7DC',
          width: '100%'
        }}
      >
        <div 
          className="sp-courses-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            boxSizing: 'border-box'
          }}
        >
          {/* Section Header */}
          <FadeUp>
            <div style={{ textAlign: 'left', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#991B1B' }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#8A7B7E'
                }}>
                  Comprehensive Academic Infrastructure
                </span>
              </div>
              <h2 style={{ 
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2rem, 3vw, 2.65rem)', 
                fontWeight: 400, 
                color: '#231418', 
                margin: '0 0 8px', 
                letterSpacing: '-0.015em',
                lineHeight: 1.15
              }}>
                Institute{' '}
                <span style={{ fontStyle: 'italic', color: '#991B1B' }}>
                  highlights.
                </span>
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#594A4D', maxWidth: '740px', margin: 0, lineHeight: 1.65 }}>
                Under experienced faculty <strong style={{ color: '#231418' }}>Shadab Sir (12 Years Experience)</strong>, we provide basic to advanced training with audio-visual classrooms, online typing software, and exam-oriented mock tests.
              </p>
            </div>
          </FadeUp>

          {/* Balanced 4×2 Architectural Grid in Crisp White */}
          <FadeUp delay={0.1}>
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8DFD3',
                borderRadius: '18px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)'
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
                      borderRight: isRightCol ? 'none' : '1px solid #EDE5DA',
                      borderBottom: isBottomRow ? 'none' : '1px solid #EDE5DA',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAF6F0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div>
                      {/* Top micro-row: Monochrome Icon + Serif Index */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          backgroundColor: '#FBF8F3',
                          border: '1px solid #E8DFD3',
                          color: '#231418',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <IconComp size={19} />
                        </div>
                        <span style={{
                          fontFamily: "'Instrument Serif', Georgia, serif",
                          fontSize: '18px',
                          fontWeight: 400,
                          color: '#8A7B7E'
                        }}>
                          {item.num}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#231418', margin: '0 0 8px', lineHeight: 1.35 }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: '#594A4D', lineHeight: 1.6, margin: 0 }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: RECRUITMENT EXAMINATIONS (Warm Cream #FBF8F3)
          ========================================================================= */}
      <section 
        style={{
          padding: '56px 0 64px',
          backgroundColor: '#FBF8F3',
          width: '100%'
        }}
      >
        <div 
          className="sp-courses-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            boxSizing: 'border-box'
          }}
        >
          {/* Section Header */}
          <FadeUp>
            <div style={{ textAlign: 'left', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#991B1B' }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#8A7B7E'
                }}>
                  Target Government Recruitment Exams
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', fontWeight: 800, color: '#231418', margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                कौन-कौन सी परीक्षाओं की तैयारी कराई जाती है?
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#594A4D', maxWidth: '720px', margin: 0, lineHeight: 1.65 }}>
                Specialized speed &amp; accuracy coaching tailored to official skill test patterns.
              </p>
            </div>
          </FadeUp>

          {/* 3×3 Symmetrical Grid (9 Exam Cards in Crisp White) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}
          >
            {TARGET_EXAMINATIONS.map((exam, idx) => (
              <FadeUp key={exam.id} delay={idx * 0.04}>
                <div 
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8DFD3',
                    borderRadius: '16px',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 16px rgba(35, 20, 24, 0.03)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#D4C6B6';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(35, 20, 24, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#E8DFD3';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(35, 20, 24, 0.03)';
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
                      borderBottom: '1px solid #EDE5DA'
                    }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#8A7B7E'
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
                      <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#231418', margin: '0 0 6px', lineHeight: 1.35 }}>
                        {exam.title}
                      </h3>
                      <p style={{ fontSize: '0.84rem', color: '#594A4D', lineHeight: 1.6, margin: 0 }}>
                        {exam.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Row */}
                  <div style={{
                    paddingTop: '12px',
                    borderTop: '1px solid #EDE5DA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '11px', color: '#8A7B7E', fontWeight: 600 }}>
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
                        color: '#231418',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#991B1B'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#231418'}
                    >
                      <span>Prepare Now</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TEACHING METHODOLOGY (Warm Sand #EFE7DC)
          ========================================================================= */}
      <section 
        style={{
          borderTop: '1px solid #E0D5C7',
          borderBottom: '1px solid #E0D5C7',
          padding: '56px 0 64px',
          backgroundColor: '#EFE7DC',
          width: '100%'
        }}
      >
        <div 
          className="sp-courses-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            boxSizing: 'border-box'
          }}
        >
          {/* Section Header */}
          <FadeUp>
            <div style={{ textAlign: 'left', marginBottom: '36px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#991B1B' }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: '#8A7B7E'
                }}>
                  Structured Training Pedagogy
                </span>
              </div>
              <h2 style={{ 
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2rem, 3vw, 2.65rem)', 
                fontWeight: 400, 
                color: '#231418', 
                margin: '0 0 8px', 
                letterSpacing: '-0.015em',
                lineHeight: 1.15
              }}>
                Teaching{' '}
                <span style={{ fontStyle: 'italic', color: '#991B1B' }}>
                  methodology
                </span>{' '}
                (शिक्षण पद्धति)
              </h2>
              <p style={{ fontSize: '0.94rem', color: '#594A4D', maxWidth: '720px', margin: 0, lineHeight: 1.65 }}>
                Led by experienced faculty <strong style={{ color: '#231418' }}>Shadab Sir (12 Years Experience)</strong>, our systematic 8-stage methodology ensures complete mastery from fundamental theory to final government exam qualification.
              </p>
            </div>
          </FadeUp>

          {/* 4×2 Hairline Editorial Grid (Rendered directly on #EFE7DC) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '36px 32px'
            }}
          >
            {TEACHING_METHODOLOGY.map((item, idx) => {
              const IconComp = methodologyIconMap[item.icon] || ShieldCheck;
              return (
                <FadeUp key={item.step} delay={idx * 0.05}>
                  <div 
                    style={{
                      borderTop: '2px solid #D6C9B8',
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
                      <IconComp size={16} color="#8A7B7E" />
                    </div>

                    {/* Title & Hindi Subtitle */}
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#231418', margin: '6px 0 2px', lineHeight: 1.35 }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#594A4D', margin: '0 0 10px' }}>
                      {item.hindi}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '0.84rem', color: '#594A4D', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: UNIFIED "VISIT US & ADMISSIONS DESK" CARD (Warm Cream #FBF8F3)
          ========================================================================= */}
      <section 
        style={{
          padding: '56px 0 72px',
          backgroundColor: '#FBF8F3',
          width: '100%'
        }}
      >
        <div 
          className="sp-courses-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            boxSizing: 'border-box'
          }}
        >
          <FadeUp>
            {/* Outer Card Shell in Crisp White with Soft Shadow */}
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8DFD3',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 34px rgba(35, 20, 24, 0.06)',
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
                    borderBottom: '1px solid #EDE5DA'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src="/assets/logo-big-s.png" 
                        alt="Gaya Shorthand Classes Logo" 
                        style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <h2 style={{ 
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontSize: 'clamp(1.4rem, 2.2vw, 1.75rem)', 
                        fontWeight: 400, 
                        color: '#231418', 
                        margin: 0 
                      }}>
                        Visit Us:{' '}
                        <span style={{ fontStyle: 'italic', color: '#991B1B' }}>
                          Gaya Shorthand Classes
                        </span>
                      </h2>
                    </div>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#8A7B7E'
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
                        <MapPin size={14} color="#8A7B7E" />
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E' }}>
                          Campus Address
                        </span>
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#231418', lineHeight: 1.45 }}>
                        Gaya College More, Opposite Cyber Thana, Gayaji, Bihar - 823001
                      </div>
                    </div>

                    {/* Daily Batch Timings */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <Clock size={14} color="#8A7B7E" />
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E' }}>
                          Batch Timings
                        </span>
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#231418', lineHeight: 1.45, fontFamily: "'JetBrains Mono', monospace" }}>
                        6:00 AM – 11:00 AM<br />3:00 PM – 8:00 PM (Mon–Sat)
                      </div>
                    </div>

                    {/* Direct Helplines */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <Phone size={14} color="#8A7B7E" />
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E' }}>
                          Direct Helplines
                        </span>
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#231418', lineHeight: 1.45, fontFamily: "'JetBrains Mono', monospace" }}>
                        <a href="tel:+919204123453" style={{ color: '#231418', textDecoration: 'none' }}>+91 9204123453</a>
                        <span style={{ color: '#8A7B7E', margin: '0 6px' }}>·</span>
                        <a href="tel:+917870377214" style={{ color: '#231418', textDecoration: 'none' }}>+91 7870377214</a>
                      </div>
                    </div>

                    {/* Training Mode */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <GraduationCap size={14} color="#8A7B7E" />
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E' }}>
                          Training Mode
                        </span>
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#231418', lineHeight: 1.45 }}>
                        Offline Lab (50+ PCs) + Live Google Meet Broadcast
                      </div>
                    </div>

                    {/* Official Email */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <Mail size={14} color="#8A7B7E" />
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E' }}>
                          Official Email
                        </span>
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#231418', lineHeight: 1.45 }}>
                        <a href="mailto:stenoplus.in@gmail.com" style={{ color: '#231418', textDecoration: 'none' }}>
                          stenoplus.in@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Official Portal */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <Globe size={14} color="#8A7B7E" />
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8A7B7E' }}>
                          Online Portal
                        </span>
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#231418', lineHeight: 1.45 }}>
                        <a href="https://stenoplus.in" target="_blank" rel="noopener noreferrer" style={{ color: '#231418', textDecoration: 'none' }}>
                          https://stenoplus.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline Landmark & Direction Strip (ZERO Blank Void) */}
                <div 
                  style={{
                    marginTop: '28px',
                    paddingTop: '20px',
                    borderTop: '1px solid #EDE5DA',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    fontSize: '12px',
                    color: '#594A4D'
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="#991B1B" />
                    <span><strong>Landmark:</strong> Opposite Cyber Thana, Gaya College More</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Gaya+College+More+Gaya+Bihar"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#231418',
                      textDecoration: 'none',
                      fontWeight: 700,
                      backgroundColor: '#FAF6F0',
                      border: '1px solid #E0D5C7',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFE7DC';
                      e.currentTarget.style.color = '#991B1B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAF6F0';
                      e.currentTarget.style.color = '#231418';
                    }}
                  >
                    <span>Get Directions on Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Right Column (5 cols): Admissions Desk & Actions */}
              <div 
                style={{
                  gridColumn: 'span 5 / span 5',
                  backgroundColor: '#FAF6F0',
                  borderLeft: '1px solid #E8DFD3',
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
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B', display: 'inline-block' }} />
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: '#8A7B7E'
                    }}>
                      Admissions Open · 2026 Batches
                    </span>
                  </div>

                  <h3 style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)', 
                    fontWeight: 400, 
                    color: '#231418', 
                    margin: '0 0 8px', 
                    lineHeight: 1.2 
                  }}>
                    Connect with Admissions Desk
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#594A4D', lineHeight: 1.6, margin: 0 }}>
                    Visit our center in Gaya to attend a free trial dictation session, inspect our 50+ PC lab, or activate your online access.
                  </p>

                  {/* Button Stack: All rounded-full Pills */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '22px' }}>
                    {/* Primary CTA: Solid Deep Crimson Pill */}
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenAdmission) onOpenAdmission();
                        else if (setCurrentTab) setCurrentTab('classes');
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: '#991B1B',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '13px 20px',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 6px 16px rgba(153, 27, 27, 0.18)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#7F1D1D';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#991B1B';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Sparkles size={15} color="#FFFFFF" />
                      <span>Book 3 Free Demo Classes →</span>
                    </button>

                    {/* Secondary CTA: Solid Deep Burgundy-Espresso Pill */}
                    <a
                      href="tel:+919204123453"
                      style={{
                        width: '100%',
                        backgroundColor: '#231418',
                        color: '#FAF6F0',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '13px 20px',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxSizing: 'border-box',
                        fontFamily: "'JetBrains Mono', monospace",
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#3A2228';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#231418';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Phone size={15} color="#FAF6F0" />
                      <span>Call Helpline (+91 9204123453)</span>
                    </a>
                  </div>

                  {/* Direct Links Row: WhatsApp & Email Rounded Pills */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
                    <a
                      href="https://wa.me/919204123453"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DFD4C6',
                        borderRadius: '9999px',
                        padding: '10px 14px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#231418',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#EFE7DC';
                        e.currentTarget.style.borderColor = '#D4C6B6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#DFD4C6';
                      }}
                    >
                      <MessageCircle size={14} color="#231418" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href="mailto:stenoplus.in@gmail.com"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DFD4C6',
                        borderRadius: '9999px',
                        padding: '10px 14px',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#231418',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#EFE7DC';
                        e.currentTarget.style.borderColor = '#D4C6B6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.borderColor = '#DFD4C6';
                      }}
                    >
                      <Mail size={14} color="#231418" />
                      <span>Email Us</span>
                    </a>
                  </div>
                </div>

                {/* Reassurance List */}
                <div style={{
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: '1px solid #EDE5DA',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#594A4D'
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
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
