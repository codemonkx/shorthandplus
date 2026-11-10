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

export default function AboutAcademyView({ onOpenCheckout, onOpenAdmission, setCurrentTab }) {
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
          <span className="about-badge-gold">Gaya Shorthand Classes · Est. 2012</span>
          <h1 className="about-hero-title">About Gaya Shorthand Classes</h1>
          <p className="about-hero-subtitle">
            <strong>Gaya Shorthand Classes</strong> — <em>Learn Today, Lead Tomorrow.</em> Led by experienced faculty <strong>Shadab Sir (12 Years Experience)</strong>, we are a professional training center (Offline and Online) dedicated to enhancing typing, shorthand, and computer skills with a modern approach to learning.
          </p>
        </div>

        {/* 2. CORE SPEED & EVALUATION ANNOUNCEMENT BAR */}
        <div style={{
          background: '#FFFFFF',
          color: '#0F172A',
          borderRadius: '14px',
          padding: '1.25rem 1.75rem',
          margin: '0 0 2.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0F172A',
              fontWeight: 700,
              fontSize: '1rem'
            }}>
              ⚡
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B', fontWeight: 600 }}>
                Verified Skill Development
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.01em' }}>
                Basic to Advance 50 WPM to 140 WPM Speed Training in Shorthand
              </div>
            </div>
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#F8FAFC',
            color: '#475569',
            padding: '0.4rem 0.85rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 600,
            border: '1px solid #E2E8F0'
          }}>
            <Sparkles size={14} color="#0F172A" />
            <span>AI-Based Dictation & Real-Time Evaluation</span>
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
                <GraduationCap size={28} className="text-cream" />
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
              color: '#2563EB',
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              marginBottom: '0.5rem'
            }}>
              GAYA SHORTHAND CLASSES • LEARN TODAY, LEAD TOMORROW!
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              Institute Highlights
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#555555', maxWidth: 680, margin: '0 auto' }}>
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
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(17, 17, 17, 0.02)',
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
                    background: 'rgba(37, 99, 235, 0.08)',
                    border: '1px solid rgba(37, 99, 235, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB'
                  }}>
                    <IconComp size={20} strokeWidth={2.2} />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: 1.55, margin: 0 }}>
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
              fontWeight: 800,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              color: '#2563EB',
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              marginBottom: '0.5rem'
            }}>
              GOVERNMENT EXAMINATIONS COVERED
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 850, color: '#0F172A', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
              कौन-कौन सी परीक्षाओं की तैयारी कराई जाती है?
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#555555', maxWidth: 660, margin: '0 auto', lineHeight: 1.6 }}>
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
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(17, 17, 17, 0.03)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px',
                      background: 'rgba(37, 99, 235, 0.08)',
                      color: '#2563EB',
                      border: '1px solid rgba(37, 99, 235, 0.22)'
                    }}>
                      {exam.category}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-mono, monospace)' }}>
                      {exam.speed}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.4rem', lineHeight: 1.35 }}>
                    {exam.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                    {exam.description}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1.25rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(17, 17, 17, 0.08)'
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#777777' }}>{exam.badge}</span>
                  <button
                    onClick={() => {
                      if (setCurrentTab) setCurrentTab('courses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#2563EB',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
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
              fontWeight: 800,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              color: '#2563EB',
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              marginBottom: '0.5rem'
            }}>
              STRUCTURED PEDAGOGY • GAYA SHORTHAND CLASSES
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 850, color: '#0F172A', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
              Teaching Methodology (शिक्षण पद्धति)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#555555', maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
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
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '14px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(17, 17, 17, 0.03)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span style={{
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono, monospace)',
                        color: '#2563EB',
                        background: 'rgba(37, 99, 235, 0.08)',
                        padding: '0.2rem 0.65rem',
                        borderRadius: '6px',
                        border: '1px solid rgba(37, 99, 235, 0.22)'
                      }}>
                        STEP {item.step}
                      </span>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#2563EB'
                      }}>
                        <IconComp size={18} strokeWidth={2.2} />
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem', lineHeight: 1.35 }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563EB', marginBottom: '0.65rem' }}>
                      {item.hindi}
                    </div>
                    <p style={{ fontSize: '0.86rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. JOIN US & OFFICIAL CONTACT BANNER */}
        <section style={{ 
          background: '#F5F5F7', 
          border: '1.5px solid rgba(0, 0, 0, 0.08)', 
          borderRadius: '20px', 
          padding: '2.5rem 2rem', 
          boxShadow: '0 8px 30px rgba(17, 17, 17, 0.04)',
          marginTop: '3.5rem'
        }}>
          
          {/* Section Header */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem', marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(17, 17, 17, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ 
                width: '52px', 
                height: '52px', 
                borderRadius: '12px', 
                background: '#FFFFFF', 
                border: '1px solid rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img 
                  src="/assets/logo-big-s.png" 
                  alt="Steno Plus Big S Logo" 
                  style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <Award size={14} color="#2563EB" />
                  <span>Offline & Online Admissions Open 2026</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 850, color: '#0F172A', margin: '2px 0 0', letterSpacing: '-0.02em' }}>
                  Visit Us: Gaya Shorthand Classes
                </h2>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                background: '#FFFFFF', 
                color: '#0F172A', 
                border: '1.5px solid rgba(0, 0, 0, 0.08)', 
                borderRadius: '999px', 
                padding: '6px 14px', 
                fontSize: '0.82rem', 
                fontWeight: 700 
              }}>
                Director: Shadab Sir (12 Yrs Exp)
              </span>
            </div>
          </div>

          {/* 2-Column Responsive Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            
            {/* Left Column: 6 Structured Info Tiles + Google Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                
                {/* Tile 1: Address */}
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px', padding: '1.15rem 1.25rem', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.08)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#777777', letterSpacing: '0.4px', marginBottom: '2px' }}>
                      Academy Address
                    </span>
                    <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A', margin: 0, lineHeight: 1.4 }}>
                      Gaya College More, Opposite Cyber Thana, Gayaji, Bihar - 823001
                    </p>
                  </div>
                </div>

                {/* Tile 2: Phone Helplines */}
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px', padding: '1.15rem 1.25rem', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.08)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#777777', letterSpacing: '0.4px', marginBottom: '2px' }}>
                      Direct Helplines
                    </span>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.4 }}>
                      <a href="tel:+919204123453" style={{ color: '#059669', textDecoration: 'none' }}>+91 9204123453</a>
                      <span style={{ color: 'rgba(17, 17, 17, 0.25)', margin: '0 4px' }}>•</span>
                      <a href="tel:+917870377214" style={{ color: '#0F172A', textDecoration: 'none' }}>+91 7870377214</a>
                    </div>
                  </div>
                </div>

                {/* Tile 3: 3 Free Demo Classes */}
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px', padding: '1.15rem 1.25rem', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(217, 119, 6, 0.08)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#777777', letterSpacing: '0.4px', marginBottom: '2px' }}>
                      Free Demo Classes
                    </span>
                    <p style={{ fontSize: '0.85rem', color: '#444444', margin: 0, lineHeight: 1.4 }}>
                      <strong>3 Free Demo Classes</strong> for beginners to experience our audio dictations & typing lab.
                    </p>
                  </div>
                </div>

                {/* Tile 4: Batch Timings */}
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px', padding: '1.15rem 1.25rem', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.08)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#777777', letterSpacing: '0.4px', marginBottom: '2px' }}>
                      Daily Batch Timings
                    </span>
                    <p style={{ fontSize: '0.85rem', color: '#444444', margin: 0, lineHeight: 1.4 }}>
                      Morning 6:00 AM – 11:00 AM<br />Evening 3:00 PM – 8:00 PM (Mon–Sat)
                    </p>
                  </div>
                </div>

                {/* Tile 5: Official Email */}
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px', padding: '1.15rem 1.25rem', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.08)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#777777', letterSpacing: '0.4px', marginBottom: '2px' }}>
                      Official E-Mail
                    </span>
                    <a href="mailto:stenoplus.in@gmail.com" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', textDecoration: 'none' }}>
                      stenoplus.in@gmail.com
                    </a>
                  </div>
                </div>

                {/* Tile 6: Official Website */}
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '12px', padding: '1.15rem 1.25rem', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.08)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Globe size={18} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#777777', letterSpacing: '0.4px', marginBottom: '2px' }}>
                      Official Portal
                    </span>
                    <a href="https://stenoplus.in" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#059669', textDecoration: 'none' }}>
                      https://stenoplus.in
                    </a>
                  </div>
                </div>

              </div>

              {/* Embedded Google Map */}
              <div style={{ 
                borderRadius: '14px', 
                overflow: 'hidden', 
                border: '1px solid rgba(0, 0, 0, 0.08)', 
                height: '200px',
                position: 'relative',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
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

            {/* Right Column: Admission Card & Instant Actions */}
            <div style={{ 
              background: '#FFFFFF', 
              border: '1.5px solid rgba(0, 0, 0, 0.08)', 
              borderRadius: '16px', 
              padding: '1.75rem',
              boxShadow: '0 4px 20px rgba(17, 17, 17, 0.04)'
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#059669', letterSpacing: '0.4px' }}>
                  Offline & Online Admission Desk
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 850, color: '#0F172A', margin: '0 0 0.5rem', lineHeight: 1.25 }}>
                Connect with Admission Desk
              </h3>
              
              <p style={{ fontSize: '0.88rem', color: '#555555', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
                Visit our center in Gaya to attend a free trial dictation session, inspect our 50+ PC lab, or activate your online access.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
                
                {/* 1. Online Admission Form Button */}
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
                    background: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.85rem 1.25rem',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 3px 12px rgba(37, 99, 235, 0.28)',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Sparkles size={16} />
                  <span>Book 3 Free Demo Classes</span>
                </button>

                {/* 2. Direct Phone Call Primary */}
                <a
                  href="tel:+919204123453"
                  style={{
                    width: '100%',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.8rem 1.25rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxSizing: 'border-box',
                    transition: 'opacity 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <Phone size={16} color="#059669" />
                  <span>Call Director: +91 9204123453</span>
                </a>

                {/* 3. Direct Phone Call Secondary */}
                <a
                  href="tel:+917870377214"
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    color: '#0F172A',
                    border: '1.5px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '10px',
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  <Phone size={16} color="#111111" />
                  <span>Admissions Helpline: +91 7870377214</span>
                </a>

                {/* 4. Direct Email */}
                <a
                  href="mailto:stenoplus.in@gmail.com"
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    color: '#555555',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '10px',
                    padding: '0.7rem 1.25rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  <Mail size={15} color="#2563EB" />
                  <span>Email: stenoplus.in@gmail.com</span>
                </a>

              </div>

              {/* Highlights checklist */}
              <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(17, 17, 17, 0.08)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  "Personalized mentorship by Shadab Sir (12 Yrs Exp)",
                  "50–140 WPM Graded Speeds (Pitman & Hindi)",
                  "50+ Modern Computer Lab (Kruti Dev & Mangal)",
                  "Govt. Recognized ADCA / DCA Computer Diplomas"
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#444444' }}>
                    <Check size={14} color="#059669" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}