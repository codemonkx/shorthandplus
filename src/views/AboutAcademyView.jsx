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
  Award
} from 'lucide-react';

export default function AboutAcademyView({ onOpenCheckout, setCurrentTab }) {
  const keyHighlights = [
    {
      icon: Tv,
      title: "Audio-Visual Learning",
      description: "Classes are supported with digital presentations, on-screen guidance, and interactive visuals to make learning easy and engaging."
    },
    {
      icon: Cpu,
      title: "AI-Based Dictation Practice",
      description: "To improve shorthand and typing accuracy, the institute uses artificial intelligence tools that simulate real dictation scenarios and provide instant feedback."
    },
    {
      icon: Users,
      title: "Expert Trainers",
      description: "Experienced faculty guide students with step-by-step techniques for developing speed in typing and shorthand, tailored to each learner’s pace."
    },
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description: "Alongside shorthand and typing, the ADCA program covers essential computer skills such as MS Office, Internet Applications, Tally, and more."
    },
    {
      icon: Briefcase,
      title: "Career-Oriented Training",
      description: "The institute focuses on preparing students for stenographer exams, data entry jobs, clerical roles, and other computer-based career opportunities."
    }
  ];

  return (
    <div className="about-page-wrapper">
      <div className="about-page-container">
        
        {/* 1. HERO HEADER */}
        <div className="about-hero-header">
          <span className="about-badge-gold">🏛️ PROFESSIONAL TRAINING CENTER (OFFLINE / ONLINE)</span>
          <h1 className="about-hero-title">About SHORTHAND PLUS</h1>
          <p className="about-hero-subtitle">
            <strong>SHORTHAND PLUS</strong> is a professional training center (OFFLINE/ONLINE) dedicated to enhancing typing, shorthand, and computer skills with a modern approach to learning.
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
                <h3 className="director-name">Gaya Shorthand Classes</h3>
                <p className="director-title">Faculty & Academic Directorate</p>
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
              WHY STUDENTS CHOOSE US
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', margin: '0 0 0.5rem' }}>
              Key Highlights of SHORTHAND PLUS
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#57534e', maxWidth: 640, margin: '0 auto' }}>
              Blending proven traditional shorthand discipline with modern artificial intelligence and digital audio-visual classrooms.
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

        {/* 5. JOIN US & OFFICIAL CONTACT BANNER */}
        <div className="about-contact-banner">
          <div className="contact-banner-grid">
            <div className="contact-info-col">
              <h3 className="contact-box-title">Join Us : Gaya Shorthand Classes</h3>
              
              <div className="contact-detail-row">
                <MapPin size={18} className="text-royal-blue shrink-0" />
                <div>
                  <strong>Academy Address:</strong>
                  <p>Gaya Shorthand Classes, Near Railway Station / Tower Chowk, Gaya, Bihar - 823001</p>
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