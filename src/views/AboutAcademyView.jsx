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
  ShieldCheck
} from 'lucide-react';
import { TARGET_EXAMINATIONS, TEACHING_METHODOLOGY } from '../data/mockData';

export default function AboutAcademyView({ onOpenCheckout, setCurrentTab }) {
  const keyHighlights = [
    {
      icon: Award,
      title: "Experienced Faculty – Shadab Sir (12 Years Experience)",
      description: "Personalized mentorship and proven speed-building techniques by Shadab Sir with 12+ years of dedicated coaching for SSC and High Court steno aspirants."
    },
    {
      icon: Layers,
      title: "Basic to Advanced Training",
      description: "Systematic step-by-step curriculum starting from initial theory, consonants and vowels up to 50–140 WPM speed mastery."
    },
    {
      icon: Tv,
      title: "Audio-Visual Classroom",
      description: "Classes are supported with digital presentations, on-screen guidance, and interactive visuals to make learning easy and engaging."
    },
    {
      icon: Keyboard,
      title: "Online Typing & Accuracy Software",
      description: "Modern typing studio supporting English (QWERTY), Hindi Kruti Dev 010, and Mangal Inscript with real-time accuracy scoring and error analysis."
    },
    {
      icon: Headphones,
      title: "Regular Dictation Practice",
      description: "Daily progressive audio dictations covering parliamentary debates, editorial passages, and high court criminal/civil judgments."
    },
    {
      icon: FileText,
      title: "Exam-Oriented Mock Tests",
      description: "Full exam simulation with 5-minute reading clock, audio warnings, backspace lock option, and strict full/half mistake formula scoring."
    },
    {
      icon: Cpu,
      title: "Individual Performance Monitoring",
      description: "AI-based evaluation tools that simulate real dictation scenarios, provide instant feedback, and track individual speed and accuracy progression."
    },
    {
      icon: Briefcase,
      title: "SSC, High Court and Other Government Exam Preparation",
      description: "Specialized targeted batches for SSC Steno Grade C & D, Patna High Court, Jharkhand High Court, Civil Courts, PA, PS, and clerical recruitment."
    }
  ];

  return (
    <div className="about-page-wrapper">
      <div className="about-page-container">
        
        {/* 1. HERO HEADER */}
        <div className="about-hero-header">
          <span className="about-badge-gold">🏛️ GAYA SHORTHAND CLASSES • LEARN TODAY, LEAD TOMORROW!</span>
          <h1 className="about-hero-title">About Gaya Shorthand Classes (SHORTHAND PLUS)</h1>
          <p className="about-hero-subtitle">
            <strong>GAYA SHORTHAND CLASSES</strong> — <em>Learn Today, Lead Tomorrow!</em> Led by experienced faculty <strong>Shadab Sir (12 Years Experience)</strong>, we are a professional training center (OFFLINE/ONLINE) dedicated to enhancing typing, shorthand, and computer skills with a modern approach to learning.
          </p>
        </div>

        {/* 2. CORE SPEED & EVALUATION ANNOUNCEMENT BAR */}
        <div style={{
          background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
          color: '#faf9f6',
          borderRadius: '12px',
          padding: '1.25rem 1.75rem',
          margin: '0 0 2.5rem',
          boxShadow: '0 4px 16px rgba(28, 25, 23, 0.08)',
          border: '1px solid #44403c',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.1rem'
            }}>
              ⚡
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#fbbf24', fontWeight: 700 }}>
                Verified Skill Development
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.2px' }}>
                WE PROVIDE BASIC TO ADVANCE 50WPM TO 140WPM SPEED IN SHORTHAND
              </div>
            </div>
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.45rem 0.9rem',
            borderRadius: '999px',
            fontSize: '0.84rem',
            fontWeight: 600,
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <Sparkles size={15} color="#fbbf24" />
            <span>AI-BASED DICTATION & REAL TIME EVALUATION</span>
          </div>
        </div>

        {/* 3. STORY & OVERVIEW SECTION */}
        <div className="about-story-grid">
          <div className="about-story-card">
            <h2 className="story-card-heading">Practical Excellence & Career Focus</h2>
            <p className="story-card-text">
              The institute provides highly practical courses in <strong>Shorthand</strong>, <strong>Typing</strong>, and <strong>Advanced Diploma in Computer Applications (ADCA)</strong>, <strong>DCA</strong>, <strong>TALLY</strong> etc., designed to help students build speed, accuracy, and efficiency for career growth in Government and private sectors.
            </p>
            <p className="story-card-text">
              Over the last decade and a half, our academy (Gaya Shorthand Classes) has mentored more than <strong>10,000+ candidates</strong> who are currently serving as Stenographers, Personal Assistants (PA), Private Secretaries (PS), and Clerical Officers in the <strong>Supreme Court, High Courts, SSC (Grade C & D)</strong>, Central Secretariats, and State Departments.
            </p>
            <div className="story-stats-row">
              <div className="story-stat-box">
                <span className="stat-big font-mono">50–140</span>
                <span className="stat-label">WPM Steno Speeds</span>
              </div>
              <div className="story-stat-box">
                <span className="stat-big font-mono">15+</span>
                <span className="stat-label">Years Mentoring</span>
              </div>
              <div className="story-stat-box">
                <span className="stat-big font-mono">10,000+</span>
                <span className="stat-label">Govt. Selections</span>
              </div>
              <div className="story-stat-box">
                <span className="stat-big font-mono">1,700+</span>
                <span className="stat-label">Audio Dictations</span>
              </div>
            </div>
          </div>

          <div className="about-director-card">
            <div className="director-badge-header">
              <div className="director-avatar-box">
                <GraduationCap size={28} className="text-white" />
              </div>
              <div>
                <h3 className="director-name">Shadab Sir (12 Years Experience)</h3>
                <p className="director-title">Founder & Head Faculty • Gaya Shorthand Classes</p>
              </div>
            </div>
            <p className="director-quote">
              "This modern, technology-driven approach ensures that students not only master traditional shorthand and typing skills but also stay ahead with digital competency for today's professional demands."
            </p>
            <div className="director-highlights-list">
              <div className="highlight-item">
                <CheckCircle2 size={16} className="text-emerald shrink-0" />
                <span>Basic to Advance Shorthand Training (50 WPM to 140 WPM)</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={16} className="text-emerald shrink-0" />
                <span>AI-Based Dictation Simulation & Real-Time Error Scoring</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={16} className="text-emerald shrink-0" />
                <span>Tailored pacing for SSC, High Court, PA/PS & Data Entry Exams</span>
              </div>
            </div>
            <a 
              href="tel:+919204123453"
              className="btn-director-wa"
              style={{ background: '#18181b' }}
            >
              <Phone size={16} />
              <span>Call Helpline (+91 9204123453)</span>
            </a>
          </div>
        </div>

        {/* 4. KEY HIGHLIGHTS SECTION */}
        <section style={{ margin: '3rem 0 2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-block',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#d97706',
              background: '#fef3c7',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              marginBottom: '0.5rem'
            }}>
              GAYA SHORTHAND CLASSES • LEARN TODAY, LEAD TOMORROW!
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', margin: '0 0 0.5rem' }}>
              Institute Highlights
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#57534e', maxWidth: 680, margin: '0 auto' }}>
              Under experienced faculty <strong>Shadab Sir (12 Years Experience)</strong>, we provide basic to advanced training with audio-visual classrooms, online typing software, and exam-oriented mock tests.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem'
          }}>
            {keyHighlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e7e5e4',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    transition: 'transform 0.2s ease, border-color 0.2s ease'
                  }}
                >
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: '#faf9f6',
                    border: '1px solid #e7e5e4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#d97706'
                  }}>
                    <IconComp size={20} strokeWidth={2.2} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1c1917', margin: 0 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#57534e', lineHeight: 1.55, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4.5 TARGET GOVERNMENT EXAMINATIONS SECTION */}
        <section style={{ margin: '3rem 0 2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-block',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#d97706',
              background: '#fef3c7',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              marginBottom: '0.5rem'
            }}>
              GOVERNMENT EXAMINATIONS COVERED
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', margin: '0 0 0.5rem' }}>
              कौन-कौन सी परीक्षाओं की तैयारी कराई जाती है?
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#57534e', maxWidth: 660, margin: '0 auto' }}>
              Our courses provide skill-based training for various government stenographer and typing examinations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem'
          }}>
            {TARGET_EXAMINATIONS.map((exam) => (
              <div 
                key={exam.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e7e5e4',
                  borderRadius: '12px',
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      background: exam.badgeColor === 'emerald' ? '#ecfdf5' : exam.badgeColor === 'blue' ? '#eff6ff' : exam.badgeColor === 'amber' ? '#fef3c7' : '#f5f5f4',
                      color: exam.badgeColor === 'emerald' ? '#047857' : exam.badgeColor === 'blue' ? '#1d4ed8' : exam.badgeColor === 'amber' ? '#b45309' : '#57534e'
                    }}>
                      {exam.category}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#d97706', fontFamily: 'monospace' }}>
                      {exam.speed}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1c1917', margin: '0 0 0.4rem' }}>
                    {exam.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#57534e', lineHeight: 1.55, margin: 0 }}>
                    {exam.description}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #f5f5f4'
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#78716c' }}>{exam.badge}</span>
                  <button
                    onClick={() => {
                      if (setCurrentTab) setCurrentTab('tests');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#d97706',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <span>Practice Tests</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4.8 TEACHING METHODOLOGY (शिक्षण पद्धति) SECTION */}
        <section style={{ margin: '3rem 0 2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-block',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#d97706',
              background: '#fef3c7',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              marginBottom: '0.5rem'
            }}>
              STRUCTURED PEDAGOGY • GAYA SHORTHAND CLASSES
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', margin: '0 0 0.5rem' }}>
              Teaching Methodology (शिक्षण पद्धति)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#57534e', maxWidth: 680, margin: '0 auto' }}>
              Led by experienced faculty <strong>Shadab Sir (12 Years Experience)</strong>, our systematic 8-stage methodology ensures complete mastery from fundamental theory to final government exam qualification.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {TEACHING_METHODOLOGY.map((item) => {
              const IconComp = item.icon === 'Layers' ? Layers
                : item.icon === 'Tv' ? Tv
                : item.icon === 'Calendar' ? Calendar
                : item.icon === 'Headphones' ? Headphones
                : item.icon === 'RotateCcw' ? RotateCcw
                : item.icon === 'Users' ? Users
                : item.icon === 'Cpu' ? Cpu
                : ShieldCheck;
              return (
                <div 
                  key={item.step}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e7e5e4',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        fontFamily: 'monospace',
                        color: '#d97706',
                        background: '#fffbeb',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid #fde68a'
                      }}>
                        STEP {item.step}
                      </span>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: '#faf9f6',
                        border: '1px solid #e7e5e4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#d97706'
                      }}>
                        <IconComp size={18} strokeWidth={2.2} />
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1c1917', margin: '0 0 0.25rem' }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#d97706', marginBottom: '0.65rem' }}>
                      {item.hindi}
                    </div>
                    <p style={{ fontSize: '0.84rem', color: '#57534e', lineHeight: 1.55, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. JOIN US & OFFICIAL CONTACT BANNER */}
        <div className="about-contact-banner">
          <div className="contact-banner-grid">
            <div className="contact-info-col">
              <h3 className="contact-box-title">Join Us : Gaya Shorthand Classes</h3>
              
              <div className="contact-detail-row">
                <MapPin size={18} className="text-royal-blue shrink-0" />
                <div>
                  <strong>Academy Address:</strong>
                  <p>Gaya College More, Opp. Cyber Thana, Gaya, Bihar</p>
                </div>
              </div>

              <div className="contact-detail-row">
                <Phone size={18} className="text-royal-blue shrink-0" />
                <div>
                  <strong>Helpline Number:</strong>
                  <p>
                    <a href="tel:+919204123453" style={{ color: 'inherit', fontWeight: 600 }}>
                      +91 9204123453
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-detail-row">
                <Mail size={18} className="text-royal-blue shrink-0" />
                <div>
                  <strong>Official E-mail:</strong>
                  <p>
                    <a href="mailto:stenoplus.in@gmail.com" style={{ color: '#d97706', fontWeight: 600, textDecoration: 'none' }}>
                      stenoplus.in@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-detail-row">
                <Globe size={18} className="text-royal-blue shrink-0" />
                <div>
                  <strong>Official Website:</strong>
                  <p>
                    <a href="https://stenoplus.in" target="_blank" rel="noopener noreferrer" style={{ color: '#d97706', fontWeight: 600, textDecoration: 'none' }}>
                      https://stenoplus.in
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-detail-row">
                <Clock size={18} className="text-royal-blue shrink-0" />
                <div>
                  <strong>Daily Batch Timings:</strong>
                  <p>Morning 6:00 AM – 11:00 AM | Evening 3:00 PM – 8:00 PM (Monday to Saturday)</p>
                </div>
              </div>
            </div>

            <div className="contact-action-col">
              <div className="visit-booking-card">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#047857', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  <Award size={16} />
                  <span>OFFLINE & ONLINE ADMISSIONS OPEN</span>
                </div>
                <h4 className="visit-title">Connect with Admission Desk</h4>
                <p className="visit-sub">
                  Visit our center in Gaya to attend a free trial dictation session, inspect our 50+ PC lab, or activate your online access.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1rem' }}>
                  <a 
                    href="tel:+919204123453"
                    className="btn-book-visit"
                  >
                    <Phone size={16} />
                    <span>Call Helpline: +91 9204123453</span>
                  </a>
                  <a 
                    href="mailto:stenoplus.in@gmail.com"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      background: '#faf9f6',
                      border: '1px solid #e7e5e4',
                      borderRadius: '8px',
                      color: '#1c1917',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    <Mail size={16} />
                    <span>Email: stenoplus.in@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}