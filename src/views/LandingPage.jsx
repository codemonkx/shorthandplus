import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Clock, 
  Users, 
  User,
  ChevronDown, 
  ChevronUp,
  MessageCircle,
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Check, 
  ExternalLink,
  Headphones, 
  Keyboard, 
  Layers, 
  FileText, 
  Zap, 
  Tv, 
  Cpu, 
  Briefcase, 
  Globe,
  CreditCard,
  LogIn
} from 'lucide-react';
import { PRICING_PLANS, TARGET_EXAMINATIONS } from '../data/mockData';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const YouTubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
    <path fill="#FFFFFF" d="m9.545 15.568 6.273-3.568-6.273-3.568z"/>
  </svg>
);

const TOP_FAQS = [
  {
    id: 1,
    q: "What is the duration of the shorthand course?",
    a: "The duration of the shorthand course depends on the student's learning speed and practice level. The Basic Pitman course typically takes 3 to 4 months for complete book coverage. We provide systematic training from basic to advanced levels (50 to 140 WPM), focusing on speed, accuracy, and exam preparation."
  },
  {
    id: 2,
    q: "Can beginners join shorthand classes?",
    a: "Yes! Beginners are welcome. No prior knowledge of shorthand is required. We start from the absolute basics (strokes, consonants, vowels) and gradually develop students' skills through regular daily practice and personalized notebook checking."
  },
  {
    id: 3,
    q: "Is English shorthand taught from the basic level?",
    a: "Yes. English shorthand is taught from the absolute beginner level covering basic Pitman strokes, consonants, vowels, word formation, phrases, grammalogues, and progressing up to advanced 120+ WPM dictations."
  },
  {
    id: 4,
    q: "Do you provide Hindi shorthand classes?",
    a: "Yes. We provide complete Hindi shorthand training starting from fundamentals (स्वर एवं व्यंजन) and progressing towards higher speed (50 to 120+ WPM) with Kruti Dev 010 and Mangal Inscript typing and legal judgment dictations."
  },
  {
    id: 5,
    q: "Are demo classes available before enrollment?",
    a: "Yes! We offer 3 Free Demo Classes so that students can experience our teaching methodology, interactive classroom environment, and modern typing lab before paying any admission fee."
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
  const [activeFaq, setActiveFaq] = useState(null);
  const [isPlayingYouTube, setIsPlayingYouTube] = useState(false);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleEnrollClick = (courseTitle) => {
    fireConfetti();
    if (onOpenAdmission) {
      onOpenAdmission();
    }
  };

  const coursesList = [
    {
      id: "eng-steno",
      badge: "Flagship Shorthand",
      badgeColor: "#2563EB",
      title: "English Shorthand (Pitman)",
      subtitle: "Basic Pitman theory to 120 WPM exam dictations",
      price: "₹4,500",
      originalPrice: "₹6,000",
      duration: "3 to 4 Months",
      speed: "50 to 120 WPM",
      highlights: [
        "Complete Pitman theory, grammalogues & phraseography",
        "Daily handwritten outline verification by Shadab Sir",
        "Audio dictations from 50 to 120 WPM with reading room",
        "Targeted for SSC Steno Grade C & D, High Court & PA/PS"
      ]
    },
    {
      id: "hindi-steno",
      badge: "High Court & SSC Special",
      badgeColor: "#059669",
      title: "Hindi Shorthand (हिंदी आशुलिपि)",
      subtitle: "Complete Hindi theory & speed dictation batch",
      price: "₹4,500",
      originalPrice: "₹6,000",
      duration: "3 to 4 Months",
      speed: "50 to 120+ WPM",
      highlights: [
        "Complete Hindi steno rules (स्वर, व्यंजन एवं आंकड़े)",
        "Daily Hindi audio dictations with outline checking",
        "Kruti Dev 010 & Mangal Inscript dual transcription",
        "Specialized for Patna High Court, Civil Courts & SSC"
      ]
    },
    {
      id: "typing-combo",
      badge: "Dual-Font Typing Lab",
      badgeColor: "#0284C7",
      title: "English & Hindi Typing Lab",
      subtitle: "QWERTY, Kruti Dev 010 & Mangal Inscript",
      price: "₹350",
      originalPrice: "₹500",
      duration: "1 Month (Pass)",
      speed: "30 to 60+ WPM",
      highlights: [
        "Scientific touch-typing finger positioning mastery",
        "English QWERTY + Hindi Kruti Dev 010 & Mangal",
        "Strict backspace lock exam simulation software",
        "Automated gross & net WPM scoring with error calculation"
      ]
    },
    {
      id: "court-special",
      badge: "Judicial Bench Special",
      badgeColor: "#7C3AED",
      title: "High Court Judicial Speed Series",
      subtitle: "Live courtroom judgments & legal transcription",
      price: "₹700",
      originalPrice: "₹1,000",
      duration: "1 Month Access",
      speed: "80 & 100 WPM Legal",
      highlights: [
        "Authentic High Court criminal & civil judgment audio",
        "Legal vocabulary, Latin maxims & judicial phrases",
        "5-Minute reading clock with strict audio warnings",
        "Official High Court mechanical keyboard simulation"
      ]
    },
    {
      id: "computer-diplomas",
      badge: "Govt. Recognized Certification",
      badgeColor: "#0284c7",
      title: "Computer Diplomas (ADCA / DCA)",
      subtitle: "6 to 12 Months Recognized Diplomas",
      price: "₹1,200",
      originalPrice: "₹1,500",
      duration: "6 / 12 Months",
      speed: "IT Skills + Typing",
      highlights: [
        "Official DCA (6 Months) & ADCA (12 Months) programs",
        "MS Office Suite (Word, Excel, PowerPoint) & Internet",
        "Tally Prime with GST invoicing & practical accounting",
        "Government recognized diploma with QR code verification"
      ]
    }
  ];

  return (
    <div className="clean-homepage-wrapper" style={{ minHeight: '100vh', background: '#F5F5F7', color: '#0F172A', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      
      {/* =========================================================================
          SECTION 1: HERO SECTION (MNC TIER-1 ARCHITECTURE)
          ========================================================================= */}
      <section style={{ 
        padding: '3rem 1.25rem 2.75rem', 
        background: 'radial-gradient(circle at 15% 0%, rgba(37, 99, 235, 0.05) 0%, transparent 45%), radial-gradient(circle at 85% 0%, rgba(225, 29, 72, 0.05) 0%, transparent 45%), #F8FAFC', 
        borderBottom: '1px solid #E2E8F0' 
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            
            {/* Left Column: Direct Value Proposition */}
            <div>
              {/* Institution Pill */}
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: '#FFFFFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '999px', 
                padding: '6px 14px', 
                fontSize: '0.78rem', 
                fontWeight: 800, 
                color: '#0F172A',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                marginBottom: '1.25rem',
                letterSpacing: '0.04em'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E11D48', display: 'inline-block' }} />
                <span>GAYA SHORTHAND CLASSES • EST. 2012 • 12+ YEARS COACHING</span>
              </div>

              {/* Headline */}
              <h1 style={{ 
                fontSize: 'clamp(2.1rem, 3.8vw, 3.3rem)', 
                fontWeight: 850, 
                lineHeight: 1.15, 
                letterSpacing: '-0.035em', 
                color: '#0F172A',
                margin: '0 0 1.25rem'
              }}>
                The Gold Standard for Shorthand & Typing For <span style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #E11D48 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Government Exams</span>
              </h1>

              {/* Subtitle */}
              <p style={{ 
                fontSize: '1.05rem', 
                lineHeight: 1.65, 
                color: '#475569', 
                margin: '0 0 1.85rem',
                maxWidth: '580px'
              }}>
                Master Pitman Shorthand (50–140 WPM), bilingual computer typing (Kruti Dev & Mangal), and legal dictations. Complete preparation guided by <strong>Shadab Sir (12 Years Exp)</strong> at Gaya College More, backed by real-time automated SSC error evaluation.
              </p>

              {/* Primary Call-to-Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center', marginBottom: '2.25rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (setCurrentTab) setCurrentTab('tests');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.9rem 1.65rem',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Headphones size={18} color="#FFFFFF" />
                  <span>Practice Audio Dictation</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (setCurrentTab) setCurrentTab('typing-studio');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: '1px solid #1E293B',
                    borderRadius: '12px',
                    padding: '0.9rem 1.4rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Keyboard size={18} />
                  <span>Try Typing Test</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    fireConfetti();
                    if (onOpenAdmission) onOpenAdmission();
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#FFFFFF',
                    color: '#E11D48',
                    border: '1.5px solid #FECDD3',
                    borderRadius: '12px',
                    padding: '0.9rem 1.3rem',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FFF1F2';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Sparkles size={16} color="#E11D48" />
                  <span>Book 3 Free Demos</span>
                </button>
              </div>

              {/* 4 Precision Trust Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.35rem', fontWeight: 850, color: '#0F172A', fontFamily: 'monospace' }}>1,200+</strong>
                  <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Selections</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.35rem', fontWeight: 850, color: '#2563EB', fontFamily: 'monospace' }}>50 - 140</strong>
                  <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>WPM Audio</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.35rem', fontWeight: 850, color: '#059669', fontFamily: 'monospace' }}>98.5%</strong>
                  <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Accuracy</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.35rem', fontWeight: 850, color: '#D97706', fontFamily: 'monospace' }}>4.9 ★</strong>
                  <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Google Rating</span>
                </div>
              </div>

            </div>

            {/* Right Column: Live Interactive Exam Engine Showcase */}
            <div>
              <div style={{ 
                background: '#FFFFFF', 
                borderRadius: '20px', 
                padding: '1.75rem', 
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}>
                {/* Header Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#059669', display: 'inline-block', boxShadow: '0 0 0 3px rgba(5, 150, 105, 0.2)' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#0F172A' }}>
                      Two-Stage Exam Engine Live
                    </span>
                  </div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', padding: '3px 10px', borderRadius: '999px' }}>
                    SSC / Court Pattern
                  </span>
                </div>

                {/* Stage 1: Audio Track Preview */}
                <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '1rem', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Headphones size={16} color="#2563EB" />
                      <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0F172A' }}>
                        Patna High Court Bench 80 WPM
                      </span>
                    </div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#059669', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '2px 8px', borderRadius: '6px' }}>
                      Stage 1 Audio ✓
                    </span>
                  </div>
                  {/* Visual Waveform */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
                    {[35, 60, 90, 45, 80, 100, 65, 40, 75, 95, 60, 85, 50, 70, 90, 40, 65, 80, 55, 30].map((h, i) => (
                      <span key={i} style={{ flex: 1, background: '#2563EB', height: `${h}%`, borderRadius: '2px', opacity: 0.85 }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.72rem', color: '#64748B', fontFamily: 'SF Mono, monospace' }}>
                    <span>05:00 Calibrated Dictation</span>
                    <span>Single-Play Strict Lock</span>
                  </div>
                </div>

                {/* Stage 2: Timed Typing Transcription Preview */}
                <div style={{ background: '#FFFFFF', borderRadius: '14px', padding: '1rem', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Keyboard size={15} color="#0F172A" />
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>Stage 2: Transcription</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#D97706', fontFamily: 'SF Mono, monospace', background: '#FFFBEB', border: '1px solid #FDE68A', padding: '2px 8px', borderRadius: '6px' }}>
                      ⏱ 09:42 remaining
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#334155', fontFamily: 'SF Mono, monospace', lineHeight: 1.55, margin: 0, background: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
                    "The learned counsel appearing on behalf of the appellant has contended that the High Court..."<span style={{ borderRight: '2px solid #2563EB' }}>&nbsp;</span>
                  </p>
                </div>

                {/* Instant Evaluation Scorecard */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#F8FAFC', padding: '10px 8px', borderRadius: '10px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Net Speed</span>
                    <strong style={{ fontSize: '1.15rem', color: '#0F172A', fontFamily: 'SF Mono, monospace' }}>84 WPM</strong>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '10px 8px', borderRadius: '10px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Accuracy</span>
                    <strong style={{ fontSize: '1.15rem', color: '#059669', fontFamily: 'SF Mono, monospace' }}>98.2%</strong>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '10px 8px', borderRadius: '10px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Result</span>
                    <strong style={{ fontSize: '0.88rem', color: '#059669', fontWeight: 800 }}>Qualified</strong>
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  type="button"
                  onClick={() => setCurrentTab && setCurrentTab('tests')}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    fontSize: '0.94rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Headphones size={16} />
                  <span>Launch Audio Dictation Vault</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 1B: WHAT YOU CAN DO ON SHORTHAND PLUS (THE 3 CORE GATEWAYS)
          ========================================================================= */}
      <section style={{ padding: '3rem 1.25rem', background: '#FFFFFF', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.25rem' }}>
            <span style={{ 
              display: 'inline-block', 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              color: '#2563EB', 
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              padding: '4px 12px',
              borderRadius: '999px',
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.65rem' 
            }}>
              Choose Your Practice Track
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 800, color: '#0F172A', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
              Everything You Need to Clear Your Exam
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
              Whether you want to practice high-speed audio dictations, master computer typing, or learn shorthand from scratch — select below:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            
            {/* Card 1: Dictation Vault */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #BFDBFE',
              borderRadius: '20px',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(37, 99, 235, 0.08)',
              position: 'relative'
            }}>
              <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '0.72rem', fontWeight: 800, color: '#2563EB', background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '3px 10px', borderRadius: '999px' }}>
                Standard SSC Benchmark
              </span>

              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}>
                  <Headphones size={22} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
                  Audio Dictation Vault
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55, margin: '0 0 1.25rem' }}>
                  Calibrated <strong>80, 100, 120, 140 WPM</strong> voice dictations. Follows strict examination rules: audio plays once without rewind, followed by a timed typing screen and automated SSC mistake scoring.
                </p>

                <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    "Patna High Court & SSC Standard Audio Tracks",
                    "Single-Play Anti-Cheating Protocol",
                    "Instant LCS Word-by-Word Diff Evaluation"
                  ].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#2563EB" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setCurrentTab && setCurrentTab('tests')}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.28)'
                }}
              >
                <span>Launch Dictation Vault</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Card 2: Typing Studio */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
            }}>
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#FFFFFF' }}>
                  <Keyboard size={22} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
                  Bilingual Typing Studio
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55, margin: '0 0 1.25rem' }}>
                  Dedicated practice studio for <strong>Hindi (Kruti Dev 010 & Mangal Inscript)</strong> and <strong>English</strong> typing. Features backspace lock simulation and instant net speed calculation.
                </p>

                <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    "Dual Hindi Engine: Kruti Dev 010 & Mangal",
                    "Official Backspace Lock & 5-Min Reading Clock",
                    "25+ Civil Court & SSC Test Paragraphs"
                  ].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#0F172A" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setCurrentTab && setCurrentTab('typing-studio')}
                style={{
                  width: '100%',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Open Typing Studio</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Card 3: Academy Coaching & Classes */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
            }}>
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(225, 29, 72, 0.25)' }}>
                  <GraduationCap size={22} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
                  Classroom & Live Batches
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55, margin: '0 0 1.25rem' }}>
                  Complete Pitman Shorthand curriculum from basic strokes to high-speed judicial series. Guided directly by <strong>Shadab Sir (12 Yrs Exp)</strong> with daily notebook checking.
                </p>

                <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    "Offline Lab at Gaya College More & Live Zoom",
                    "3 Free Demo Classes (Zero Upfront Risk)",
                    "DCA & ADCA Govt. Recognized Diplomas"
                  ].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#334155', fontWeight: 600 }}>
                      <CheckCircle2 size={16} color="#E11D48" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setCurrentTab && setCurrentTab('courses')}
                style={{
                  width: '100%',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>View Courses & Fees</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 1C: HOW THE TWO-STAGE DICTATION EXAM WORKS (3 SIMPLE STEPS)
          ========================================================================= */}
      <section style={{ padding: '3.5rem 1.25rem', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem', 
              fontWeight: 800, 
              color: '#2563EB', 
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              padding: '5px 14px',
              borderRadius: '999px',
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.85rem' 
            }}>
              <Sparkles size={14} color="#2563EB" />
              <span>Simple 3-Step Examination Workflow</span>
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.5rem)', fontWeight: 850, color: '#0F172A', margin: '0 0 0.85rem', letterSpacing: '-0.025em' }}>
              How the Controlled Dictation Exam Works
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#64748B', margin: 0, lineHeight: 1.6 }}>
              Strictly mirrors official High Court and SSC Stenographer skill tests without any confusion.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
            
            {/* Step 1 */}
            <div style={{ 
              background: '#F8FAFC', 
              borderRadius: '20px', 
              padding: '2rem', 
              border: '1px solid #E2E8F0', 
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#2563EB', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)' }}>
                  1
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Stage 1 • Audio Listening
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: '0 0 10px' }}>
                Audio Plays Exactly Once
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Click Start. The voice dictation plays automatically at your chosen speed. Strictly <strong>no replay, pause, or rewind</strong>. You write the shorthand outlines in your notebook.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ 
              background: '#F8FAFC', 
              borderRadius: '20px', 
              padding: '2rem', 
              border: '1px solid #E2E8F0', 
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#E11D48', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', boxShadow: '0 4px 10px rgba(225, 29, 72, 0.3)' }}>
                  2
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#E11D48', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Stage 2 • Timed Typing
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: '0 0 10px' }}>
                Type on Fixed Countdown
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                The moment audio completes, the typing screen unlocks automatically. Your official countdown timer starts. Transcribe what you wrote on paper before time runs out.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ 
              background: '#F8FAFC', 
              borderRadius: '20px', 
              padding: '2rem', 
              border: '1px solid #E2E8F0', 
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#059669', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', boxShadow: '0 4px 10px rgba(5, 150, 105, 0.3)' }}>
                  3
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Stage 3 • Instant Scorecard
                </span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: '0 0 10px' }}>
                Automated Word-by-Word Diff
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                On timer completion, our server compares your transcription against the master text. Receive Gross WPM, Net WPM, accuracy %, and highlighted full/half mistake breakdowns.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE 5 CORE COURSES & TRANSPARENT PRICING
          ========================================================================= */}
      <section style={{ padding: '4rem 1.25rem 3.5rem', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem', 
              fontWeight: 800, 
              color: '#2563EB', 
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              padding: '5px 14px',
              borderRadius: '999px',
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.85rem' 
            }}>
              Affordable & Goal-Oriented Programs
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.5rem)', fontWeight: 850, color: '#0F172A', margin: '0 0 0.85rem', letterSpacing: '-0.025em' }}>
              Our Courses & Transparent Fees
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#64748B', margin: 0, lineHeight: 1.6 }}>
              Choose the course calibrated for your target examination. Complete beginner to high-speed mastery with daily live and recorded classes.
            </p>
          </div>

          {/* Unified MNC Courses Grid (5 Core Programs) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.75rem', marginBottom: '2.5rem' }}>
            {coursesList.map((c) => {
              const isPopular = c.id === 'eng-steno';
              return (
                <div 
                  key={c.id}
                  style={{
                    background: '#FFFFFF',
                    border: isPopular ? '2px solid #2563EB' : '1px solid #E2E8F0',
                    borderRadius: '20px',
                    padding: '2rem 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isPopular 
                      ? '0 12px 32px -4px rgba(37, 99, 235, 0.16), 0 2px 6px rgba(15, 23, 42, 0.04)' 
                      : '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.05)',
                    position: 'relative',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = isPopular 
                      ? '0 16px 40px -4px rgba(37, 99, 235, 0.22)' 
                      : '0 12px 32px -4px rgba(15, 23, 42, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isPopular 
                      ? '0 12px 32px -4px rgba(37, 99, 235, 0.16), 0 2px 6px rgba(15, 23, 42, 0.04)' 
                      : '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.05)';
                  }}
                >
                  {isPopular && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '24px',
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.6px',
                      textTransform: 'uppercase',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      boxShadow: '0 4px 10px rgba(37, 99, 235, 0.35)'
                    }}>
                      Most Popular
                    </div>
                  )}

                  <div>
                    {/* Badge & Duration */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 800, 
                        color: isPopular ? '#2563EB' : '#059669', 
                        background: isPopular ? '#EFF6FF' : '#ECFDF5', 
                        padding: '4px 12px', 
                        borderRadius: '999px',
                        border: isPopular ? '1px solid #BFDBFE' : '1px solid #A7F3D0'
                      }}>
                        {c.badge}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} color="#64748B" />
                        <span>{c.duration}</span>
                      </span>
                    </div>

                    {/* Course Title & Subtitle */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                      {c.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
                      {c.subtitle}
                    </p>

                    {/* Pricing Box */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #F1F5F9' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 850, color: '#0F172A', fontFamily: 'SF Mono, monospace', letterSpacing: '-0.02em' }}>
                        {c.price}
                      </span>
                      {c.originalPrice && (
                        <span style={{ fontSize: '1.05rem', color: '#94A3B8', textDecoration: 'line-through', fontWeight: 600 }}>
                          {c.originalPrice}
                        </span>
                      )}
                      <span style={{ 
                        fontSize: '0.78rem', 
                        color: '#2563EB', 
                        fontWeight: 700, 
                        marginLeft: 'auto',
                        background: '#EFF6FF',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        border: '1px solid #BFDBFE'
                      }}>
                        ⚡ {c.speed.includes('WPM') ? c.speed : `Speed: ${c.speed}`}
                      </span>
                    </div>

                    {/* Highlights List */}
                    <ul style={{ listStyle: 'none', margin: '0 0 1.75rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {c.highlights.map((h, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#334155', lineHeight: 1.45 }}>
                          <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action Button */}
                  <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick(c.title)}
                      style={{
                        width: '100%',
                        background: isPopular 
                          ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' 
                          : '#0F172A',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.85rem',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: isPopular 
                          ? '0 4px 12px rgba(37, 99, 235, 0.28)' 
                          : '0 2px 6px rgba(15, 23, 42, 0.15)',
                        transition: 'opacity 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                    >
                      <span>Enroll in Batch</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TARGET GOVERNMENT EXAMINATIONS
          ========================================================================= */}
      <section style={{ padding: '4rem 1.25rem 3.5rem', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem', 
              fontWeight: 800, 
              color: '#059669', 
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              padding: '5px 14px',
              borderRadius: '999px',
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.85rem' 
            }}>
              Comprehensive Exam Calibration
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.5rem)', fontWeight: 850, color: '#0F172A', margin: '0 0 0.5rem', letterSpacing: '-0.025em' }}>
              Target Government Examinations
            </h2>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#64748B', margin: '0 0 0.85rem' }}>
              कौन-कौन सी परीक्षाओं की तैयारी कराई जाती है?
            </p>
            <p style={{ fontSize: '0.96rem', color: '#64748B', margin: 0, lineHeight: 1.6 }}>
              Our courses provide skill-based training calibrated strictly according to official government skill test patterns and marking schemes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                title: "SSC Stenographer Grade C & D",
                speed: "80 & 100 WPM",
                lang: "English & Hindi",
                desc: "Parliamentary debates, budget speeches, official 5-minute reading clock, and full/half mistake formula scoring.",
                color: "#2563EB",
                bg: "#EFF6FF",
                border: "#BFDBFE"
              },
              {
                title: "Supreme Court Stenographer & SPA",
                speed: "100 & 120 WPM",
                lang: "English Legal",
                desc: "High-speed legal dictation, constitutional bench judgments, legal phraseology, and high precision accuracy.",
                color: "#7C3AED",
                bg: "#F5F3FF",
                border: "#DDD6FE"
              },
              {
                title: "Patna High Court Stenographer & PA",
                speed: "80 & 100 WPM",
                lang: "English & Hindi",
                desc: "Authentic criminal & civil appeals, legal terminology, strict backspace lock simulation, and daily evaluation.",
                color: "#059669",
                bg: "#ECFDF5",
                border: "#A7F3D0"
              },
              {
                title: "Jharkhand High Court Stenographer",
                speed: "80 & 100 WPM",
                lang: "Hindi & English",
                desc: "Dual Hindi font engine (Kruti Dev 010 & Mangal Inscript) and English civil court judgment transcription.",
                color: "#D97706",
                bg: "#FFFBEB",
                border: "#FDE68A"
              },
              {
                title: "Delhi High Court PA / SPA",
                speed: "100 & 110 WPM",
                lang: "English Legal",
                desc: "Commercial division orders, courtroom speed dictations, and timed computer transcription.",
                color: "#0284C7",
                bg: "#F0F9FF",
                border: "#BAE6FD"
              },
              {
                title: "BSF & CRPF Paramilitary Stenographer",
                speed: "80 WPM",
                lang: "Hindi & English",
                desc: "Paramilitary ASI (Steno) recruitment skill test drills, official gazette passages, and typing accuracy.",
                color: "#E11D48",
                bg: "#FFF1F2",
                border: "#FECDD3"
              }
            ].map((exam, i) => (
              <div 
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.03)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.03)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    color: exam.color, 
                    background: exam.bg, 
                    border: `1px solid ${exam.border}`,
                    padding: '3px 10px', 
                    borderRadius: '6px' 
                  }}>
                    {exam.speed}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                    {exam.lang}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
                  {exam.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  {exam.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WHY GAYA SHORTHAND CLASSES? (THE 4 PILLARS)
          ========================================================================= */}
      <section style={{ padding: '4rem 1.25rem 3.5rem', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem', 
              fontWeight: 800, 
              color: '#2563EB', 
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              padding: '5px 14px',
              borderRadius: '999px',
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.85rem' 
            }}>
              Proven Learning Methodology
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.5rem)', fontWeight: 850, color: '#0F172A', margin: '0 0 0.85rem', letterSpacing: '-0.025em' }}>
              Why Gaya Shorthand Classes?
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#64748B', margin: 0, lineHeight: 1.6 }}>
              A disciplined, step-by-step coaching system developed over 12 years to turn complete beginners into exam-ready stenographers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {[
              {
                icon: Award,
                iconColor: "#2563EB",
                iconBg: "#EFF6FF",
                iconBorder: "#BFDBFE",
                title: "Expert Faculty — Shadab Sir",
                subtitle: "12 Years Dedicated Experience",
                desc: "Direct daily mentorship with individual notebook correction, outline curvature validation, and personal doubt clearing at every step."
              },
              {
                icon: Headphones,
                iconColor: "#D97706",
                iconBg: "#FFFBEB",
                iconBorder: "#FDE68A",
                title: "Audio-Visual Classroom & Vault",
                subtitle: "Speeds from 50 to 140 WPM",
                desc: "Classes equipped with visual displays and daily graded studio audio dictations across parliamentary speeches, legal judgments, and editorials."
              },
              {
                icon: Keyboard,
                iconColor: "#059669",
                iconBg: "#ECFDF5",
                iconBorder: "#A7F3D0",
                title: "Real Exam Simulation Software",
                subtitle: "Kruti Dev 010 & Mangal Inscript",
                desc: "Practice with official exam conditions: backspace lock simulation, 5-minute reading clock, and instant word-by-word diff error evaluation."
              },
              {
                icon: Sparkles,
                iconColor: "#E11D48",
                iconBg: "#FFF1F2",
                iconBorder: "#FECDD3",
                title: "3 Free Demo Classes for Beginners",
                subtitle: "Zero Risk • No Prior Knowledge Needed",
                desc: "Experience our teaching methodology, digital classroom, and modern computer typing lab before taking admission."
              }
            ].map((pillar, i) => (
              <div 
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '18px',
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.04)'
                }}
              >
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: pillar.iconBg, 
                  border: `1px solid ${pillar.iconBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <pillar.icon size={24} color={pillar.iconColor} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
                    {pillar.title}
                  </h3>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: pillar.iconColor, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    {pillar.subtitle}
                  </span>
                </div>
                <p style={{ fontSize: '0.92rem', color: '#64748B', margin: 0, lineHeight: 1.6 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CLASSROOM VIDEO DEMO & GOOGLE REVIEWS (SOCIAL PROOF)
          ========================================================================= */}
      <section style={{ padding: '4rem 1.25rem 3.5rem', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem', 
              fontWeight: 800, 
              color: '#E11D48', 
              background: '#FFF1F2',
              border: '1px solid #FECDD3',
              padding: '5px 14px',
              borderRadius: '999px',
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.85rem' 
            }}>
              Demonstrations & Verified Feedback
            </span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3vw, 2.5rem)', fontWeight: 850, color: '#0F172A', margin: '0 0 0.85rem', letterSpacing: '-0.025em' }}>
              See Our Classes & What Students Say
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#64748B', margin: 0, lineHeight: 1.6 }}>
              Over 140+ students have rated Gaya Shorthand Classes 4.9/5 on Google for authentic coaching and results.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
            
            {/* Left: YouTube Video Card */}
            <div style={{ 
              background: '#FFFFFF', 
              border: '1px solid #E2E8F0', 
              borderRadius: '20px', 
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.05)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                  <YouTubeIcon size={24} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#E11D48', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Live Classroom Dictation Demo
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
                  SSC Stenographer 80 & 100 WPM Live Dictation
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', margin: '0 0 1.5rem', lineHeight: 1.55 }}>
                  Instructor: <strong>Shadab Sir (12 Years Experience)</strong>. Real-time parliamentary speech dictation calibrated at 80 and 100 WPM with official 5-minute reading clock and strict error evaluation.
                </p>

                {/* YouTube Video Player (Embedded & Interactive) */}
                <div style={{ 
                  background: '#0F172A', 
                  borderRadius: '14px', 
                  aspectRatio: '16/9', 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  overflow: 'hidden', 
                  marginBottom: '1.5rem', 
                  boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.12)',
                  border: '1px solid #E2E8F0'
                }}>
                  {isPlayingYouTube ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk?autoplay=1&rel=0"
                      title="Gaya Shorthand Classes - Speed Dictation & Whiteboard Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: 'none', display: 'block', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                    />
                  ) : (
                    <div 
                      onClick={() => setIsPlayingYouTube(true)}
                      style={{ 
                        textAlign: 'center', 
                        color: '#FFFFFF', 
                        padding: '1.5rem', 
                        zIndex: 1, 
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'radial-gradient(circle, rgba(225, 29, 72, 0.22) 0%, rgba(15, 23, 42, 0.96) 100%)'
                      }}
                      title="Click to Play Classroom Demonstration Video"
                    >
                      <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        borderRadius: '50%', 
                        background: '#E11D48', 
                        color: '#FFFFFF', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 12px', 
                        boxShadow: '0 6px 20px rgba(225, 29, 72, 0.4)'
                      }}>
                        <Play size={28} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
                      </div>
                      <span style={{ display: 'block', fontSize: '1rem', fontWeight: 800 }}>Watch Classroom Dictation Video</span>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)', marginTop: '4px' }}>Click to play on-screen demo • Gaya Shorthand Classes</span>
                    </div>
                  )}
                </div>
              </div>

              <a
                href="https://www.youtube.com/results?search_query=Gaya+Shorthand+Classes+dictation"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxSizing: 'border-box',
                  boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)'
                }}
              >
                <YouTubeIcon size={18} />
                <span>Watch Demonstrations on YouTube</span>
              </a>
            </div>

            {/* Right: Google Reviews & Student Testimonials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Google Reviews Aggregate Badge */}
              <div style={{ 
                background: '#FFFFFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '16px', 
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <GoogleIcon />
                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      4.9 out of 5 Rating
                    </h4>
                    <span style={{ fontSize: '0.82rem', color: '#64748B' }}>Based on 140+ Google Student Reviews</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#D97706" color="#D97706" />
                  ))}
                </div>
              </div>

              {/* 3 Authentic Student Testimonial Cards */}
              {[
                {
                  name: "Anjali Verma",
                  exam: "SSC Stenographer Grade C",
                  text: "“Shadab Sir's daily dictation practice and 5-minute reading room made all the difference in my SSC skill test. Individual notebook checking helped fix my stroke angles completely!”"
                },
                {
                  name: "Rakesh Kumar",
                  exam: "Patna High Court Personal Assistant",
                  text: "“The strict backspace lock simulation and legal judgment audio series mirrored the exact Patna High Court exam software. Cracked my exam with 98% accuracy!”"
                },
                {
                  name: "Md. Tariq",
                  exam: "Jharkhand High Court & Civil Courts",
                  text: "“Best shorthand and typing institute in Gaya. The dual font support (Kruti Dev 010 and Mangal) in their computer lab is unmatched for judicial exam aspirants.”"
                }
              ].map((rev, i) => (
                <div 
                  key={i}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '1.35rem 1.5rem',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
                  }}
                >
                  <p style={{ fontSize: '0.9rem', color: '#334155', margin: '0 0 10px', lineHeight: 1.55, fontStyle: 'italic' }}>
                    {rev.text}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                      {rev.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '3px 10px', borderRadius: '6px' }}>
                      {rev.exam}
                    </span>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: GAYA CENTER LOCATION, CONTACTS & TOP FAQS
          ========================================================================= */}
      <section style={{ padding: '4rem 1.25rem 3.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
            
            {/* Left: Academy Address & Google Maps */}
            <div>
              <span style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem', 
                fontWeight: 800, 
                color: '#2563EB', 
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                padding: '5px 14px',
                borderRadius: '999px',
                textTransform: 'uppercase', 
                letterSpacing: '0.6px', 
                marginBottom: '0.85rem' 
              }}>
                Visit Our Offline Institute
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.6vw, 2.2rem)', fontWeight: 850, color: '#0F172A', margin: '0 0 1.25rem', letterSpacing: '-0.025em' }}>
                Gaya Coaching Center & Helplines
              </h2>
              
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '18px', padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                  <MapPin size={22} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
                      Address:
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                      <strong>Gaya Shorthand Classes</strong><br />
                      Gaya College More, Opposite Cyber Thana, Gayaji, Bihar - 823001
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                  <Phone size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
                      Direct Helplines:
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                      Director (Shadab Sir): <a href="tel:9204123453" style={{ color: '#2563EB', fontWeight: 700 }}>+91 9204123453</a><br />
                      Admissions Desk: <a href="tel:7870377214" style={{ color: '#0F172A', fontWeight: 700 }}>+91 7870377214</a>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Clock size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
                      Office & Class Timings:
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                      Morning 7:00 AM – 11:30 AM • Evening 3:30 PM – 7:30 PM (Mon to Sat)
                    </p>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid #E2E8F0', 
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                height: '210px',
                position: 'relative'
              }}>
                <iframe
                  title="Gaya Shorthand Classes Google Map"
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

            {/* Right: Top 5 Frequently Asked Questions */}
            <div>
              <span style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem', 
                fontWeight: 800, 
                color: '#2563EB', 
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                padding: '5px 14px',
                borderRadius: '999px',
                textTransform: 'uppercase', 
                letterSpacing: '0.6px', 
                marginBottom: '0.85rem' 
              }}>
                Clear Answers For New Students
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 2.6vw, 2.2rem)', fontWeight: 850, color: '#0F172A', margin: '0 0 1.25rem', letterSpacing: '-0.025em' }}>
                Frequently Asked Questions
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {TOP_FAQS.map((faq) => {
                  const isOpen = activeFaq === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      style={{
                        background: '#FFFFFF',
                        border: isOpen ? '1px solid #2563EB' : '1px solid #E2E8F0',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)',
                        transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '1.15rem 1.4rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0F172A' }}>
                          {faq.q}
                        </span>
                        {isOpen ? <ChevronUp size={18} color="#2563EB" /> : <ChevronDown size={18} color="#94A3B8" />}
                      </button>

                      {isOpen && (
                        <div style={{ padding: '0 1.4rem 1.25rem', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, borderTop: '1px solid #F1F5F9' }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Inquire More Link */}
              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <a
                  href="tel:9204123453"
                  style={{ fontSize: '0.88rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Phone size={15} color="#2563EB" />
                  <span>Have questions? Call Helpline: +91 9204123453</span>
                </a>
              </div>

            </div>

          </div>

          {/* Bottom Academy CTA Banner */}
          <div style={{ 
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
            borderRadius: '24px', 
            padding: '3rem 2rem', 
            color: '#FFFFFF',
            textAlign: 'center',
            boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <span style={{
              display: 'inline-block',
              fontSize: '0.76rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#38BDF8',
              marginBottom: '0.6rem'
            }}>
              ESTD. 2012 • GAYA SHORTHAND CLASSES
            </span>
            <h3 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 850, margin: '0 0 0.75rem', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Learn Today, Lead Tomorrow!
            </h3>
            <p style={{ fontSize: '1.02rem', color: '#CBD5E1', maxWidth: '640px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
              Begin your government stenographer journey with <strong>3 Free Demo Classes</strong> at Gaya Shorthand Classes. Guided by experienced faculty <strong>Shadab Sir (12 Years Experience)</strong>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a
                href="tel:9204123453"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '0.85rem 1.6rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.15s ease'
                }}
              >
                <Phone size={16} color="#FFFFFF" />
                <span>Call Helpline: +91 9204123453</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  if (onOpenAdmission) onOpenAdmission();
                }}
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem 1.6rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                }}
              >
                <Sparkles size={16} color="#FFFFFF" />
                <span>Book 3 Free Demo Classes</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
