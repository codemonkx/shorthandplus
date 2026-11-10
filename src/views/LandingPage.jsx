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
      badgeColor: "#F83458",
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
      badgeColor: "#F83458",
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
      badgeColor: "#F83458",
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
      badgeColor: "#F83458",
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
          SECTION 1: HERO SECTION (THE 5-SECOND CLARITY PITCH)
          ========================================================================= */}
      <section style={{ padding: '2.25rem 1.25rem 2rem', background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(248, 52, 88, 0.07), transparent 70%), #F5F5F7', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            
            {/* Left Column: Direct Value Proposition */}
            <div>
              {/* Institution Pill */}
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: '#FFFFFF', 
                border: '1px solid rgba(0, 0, 0, 0.08)', 
                borderRadius: '999px', 
                padding: '6px 14px', 
                fontSize: '0.8rem', 
                fontWeight: 700, 
                color: '#0F172A',
                boxShadow: '0 1px 3px rgba(17, 17, 17, 0.04)',
                marginBottom: '1.25rem'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F83458', display: 'inline-block' }} />
                <span>GAYA SHORTHAND CLASSES • LEARN TODAY, LEAD TOMORROW!</span>
              </div>

              {/* Headline */}
              <h1 style={{ 
                fontSize: 'clamp(2rem, 3.6vw, 3.1rem)', 
                fontWeight: 850, 
                lineHeight: 1.16, 
                letterSpacing: '-0.03em', 
                color: '#0F172A',
                margin: '0 0 1.25rem'
              }}>
                Master Shorthand, Typing & Computer Skills For <span style={{ background: 'linear-gradient(135deg, #F83458 0%, #FF5A79 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Government Exams</span>
              </h1>

              {/* Subtitle */}
              <p style={{ 
                fontSize: '1.05rem', 
                lineHeight: 1.6, 
                color: '#444444', 
                margin: '0 0 1.75rem',
                maxWidth: '580px'
              }}>
                Personalized offline and online coaching guided by <strong>Shadab Sir (12 Years Experience)</strong> at Gaya College More, Opp. Cyber Thana. Speeds from <strong>50 to 140 WPM</strong> with real-time accuracy scoring, audio dictation, and exam simulations.
              </p>

              {/* Primary Call-to-Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center', marginBottom: '2rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (setCurrentTab) setCurrentTab('tests');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#F83458',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.85rem 1.6rem',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(248, 52, 88, 0.3)',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Headphones size={18} color="#FFFFFF" />
                  <span>Practice Audio Dictation</span>
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
                    border: '1px solid #111111',
                    borderRadius: '10px',
                    padding: '0.85rem 1.4rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(17, 17, 17, 0.2)',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Keyboard size={18} />
                  <span>Try Free Typing Test</span>
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
                    color: '#0F172A',
                    border: '1px solid rgba(17, 17, 17, 0.15)',
                    borderRadius: '10px',
                    padding: '0.85rem 1.3rem',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Sparkles size={16} color="#F83458" />
                  <span>Book 3 Free Demos</span>
                </button>
              </div>

              {/* 3 Quick Value Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#F83458" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A' }}>3 Free Demo Classes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} color="#F83458" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A' }}>Shadab Sir (12 Yrs Exp)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={18} color="#F83458" />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A' }}>Gaya College More, Gaya</span>
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#0F172A' }}>
                      Two-Stage Exam Engine Live
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, background: '#F83458', color: '#FFFFFF', padding: '3px 10px', borderRadius: '999px' }}>
                    SSC / Court Pattern
                  </span>
                </div>

                {/* Stage 1: Audio Track Preview */}
                <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Headphones size={16} color="#F83458" />
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>
                        Patna High Court Bench 80 WPM
                      </span>
                    </div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#10B981', background: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
                      Stage 1 Audio ✓
                    </span>
                  </div>
                  {/* Visual Waveform */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
                    {[35, 60, 90, 45, 80, 100, 65, 40, 75, 95, 60, 85, 50, 70, 90, 40, 65, 80, 55, 30].map((h, i) => (
                      <span key={i} style={{ flex: 1, background: '#F83458', height: `${h}%`, borderRadius: '2px', opacity: 0.85 }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.72rem', color: '#64748b', fontFamily: 'monospace' }}>
                    <span>05:00 Calibrated Dictation</span>
                    <span>Single-Play Strict Enforcement</span>
                  </div>
                </div>

                {/* Stage 2: Timed Typing Transcription Preview */}
                <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Keyboard size={15} color="#0F172A" />
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>Stage 2: Transcription</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#d97706', fontFamily: 'monospace', background: '#FEF3C7', padding: '2px 8px', borderRadius: '4px' }}>
                      ⏱ 09:42 remaining
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#334155', fontFamily: 'monospace', lineHeight: 1.5, margin: 0, background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px dashed #cbd5e1' }}>
                    "The learned counsel appearing on behalf of the appellant has contended that the High Court..."<span style={{ borderRight: '2px solid #F83458' }}>&nbsp;</span>
                  </p>
                </div>

                {/* Instant Evaluation Scorecard */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#F8FAFC', padding: '8px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                    <span style={{ display: 'block', fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Net Speed</span>
                    <strong style={{ fontSize: '1.1rem', color: '#0F172A', fontFamily: 'monospace' }}>84 WPM</strong>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '8px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                    <span style={{ display: 'block', fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Accuracy</span>
                    <strong style={{ fontSize: '1.1rem', color: '#10B981', fontFamily: 'monospace' }}>98.2%</strong>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: '8px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                    <span style={{ display: 'block', fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Result</span>
                    <strong style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 800 }}>Qualified</strong>
                  </div>
                </div>

                {/* Direct Action Button */}
                <button
                  type="button"
                  onClick={() => setCurrentTab && setCurrentTab('tests')}
                  style={{
                    width: '100%',
                    background: '#F83458',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.85rem',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(248, 52, 88, 0.28)',
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
              color: '#F83458', 
              background: 'rgba(248, 52, 88, 0.08)',
              border: '1px solid rgba(248, 52, 88, 0.25)',
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
              background: '#F8FAFC',
              border: '1.5px solid rgba(248, 52, 88, 0.3)',
              borderRadius: '18px',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(248, 52, 88, 0.06)',
              position: 'relative'
            }}>
              <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '0.72rem', fontWeight: 800, color: '#F83458', background: 'rgba(248, 52, 88, 0.1)', padding: '3px 10px', borderRadius: '999px' }}>
                Most Popular
              </span>

              <div>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#F83458', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(248, 52, 88, 0.3)' }}>
                  <Headphones size={24} />
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
                      <CheckCircle2 size={16} color="#F83458" />
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
                  background: '#F83458',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.85rem',
                  fontSize: '0.94rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(248, 52, 88, 0.28)'
                }}
              >
                <span>Launch Dictation Vault</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Card 2: Typing Studio */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #e2e8f0',
              borderRadius: '18px',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}>
              <div>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#FFFFFF' }}>
                  <Keyboard size={24} />
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
                  borderRadius: '10px',
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
              background: '#F8FAFC',
              border: '1px solid #e2e8f0',
              borderRadius: '18px',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}>
              <div>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#FFFFFF' }}>
                  <GraduationCap size={24} />
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
                      <CheckCircle2 size={16} color="#475569" />
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
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '10px',
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
      <section style={{ padding: '3rem 1.25rem', background: '#F5F5F7', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.25rem' }}>
            <span style={{ 
              display: 'inline-block', 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              color: '#0F172A', 
              background: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '4px 12px',
              borderRadius: '999px',
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.65rem' 
            }}>
              Simple 3-Step Process
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 800, color: '#0F172A', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
              How the Controlled Dictation Exam Works
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Strictly mirrors official High Court and SSC Stenographer skill tests without any confusion.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            
            {/* Step 1 */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F83458', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
                  1
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#F83458', textTransform: 'uppercase' }}>Stage 1 • Audio</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
                Audio Plays Once
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Click Start. The voice dictation plays automatically at your chosen speed. No replay, rewind, or pause is allowed. You write the shorthand in your notebook.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0F172A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
                  2
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>Stage 2 • Typing</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
                Type on Fixed Timer
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                The moment audio playback finishes, the typing screen opens automatically. Your countdown timer starts. You transcribe what you wrote on paper.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10B981', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
                  3
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>Stage 3 • Scorecard</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px' }}>
                Instant Automated Diff
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Upon timer completion or manual submit, the server checks your words against the master transcript. See Gross WPM, Net WPM, accuracy %, mistakes, and word-by-word diff.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE 5 CORE COURSES & TRANSPARENT PRICING
          ========================================================================= */}
      <section style={{ padding: '2.5rem 1.25rem 2.25rem', background: '#F5F5F7', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 1.75rem' }}>
            <span style={{ 
              display: 'inline-block', 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              color: '#F83458', 
              background: 'rgba(248, 52, 88, 0.08)',
              border: '1px solid rgba(248, 52, 88, 0.25)',
              padding: '4px 12px',
              borderRadius: '999px',
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.65rem' 
            }}>
              Affordable & Goal-Oriented Programs
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 800, color: '#0F172A', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
              Our Courses & Transparent Fees
            </h2>
            <p style={{ fontSize: '1rem', color: '#444444', margin: 0, lineHeight: 1.5 }}>
              Choose the course suited for your target exam. Complete basic to advanced preparation with daily live and recorded classes.
            </p>
          </div>

          {/* Unified Clean Courses Grid (5 Core Programs) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {coursesList.map((c) => (
              <div 
                key={c.id}
                style={{
                  background: '#FFFFFF',
                  border: c.id === 'eng-steno' ? '1.5px solid #F83458' : '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: c.id === 'eng-steno' ? '0 6px 24px rgba(248, 52, 88, 0.12)' : '0 4px 16px rgba(17, 17, 17, 0.04)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = c.id === 'eng-steno' ? '#F83458' : 'rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = c.id === 'eng-steno' ? '#F83458' : 'rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.boxShadow = c.id === 'eng-steno' ? '0 6px 24px rgba(248, 52, 88, 0.12)' : '0 4px 16px rgba(17, 17, 17, 0.04)';
                }}
              >
                <div>
                  {/* Badge & Duration */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      fontWeight: 800, 
                      color: '#F83458', 
                      background: 'rgba(248, 52, 88, 0.08)', 
                      padding: '4px 10px', 
                      borderRadius: '999px',
                      border: '1px solid rgba(248, 52, 88, 0.25)'
                    }}>
                      {c.badge}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#666666', fontWeight: 600 }}>
                      {c.duration}
                    </span>
                  </div>

                  {/* Course Title & Subtitle */}
                  <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#444444', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
                    {c.subtitle}
                  </p>

                  {/* Pricing Box */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                    <span style={{ fontSize: '1.85rem', fontWeight: 850, color: '#0F172A', fontFamily: 'monospace' }}>
                      {c.price}
                    </span>
                    {c.originalPrice && (
                      <span style={{ fontSize: '1rem', color: '#888888', textDecoration: 'line-through', fontWeight: 600 }}>
                        {c.originalPrice}
                      </span>
                    )}
                    <span style={{ fontSize: '0.78rem', color: '#0F172A', fontWeight: 700, marginLeft: 'auto' }}>
                      ⚡ {c.speed.includes('WPM') ? c.speed : `Speed: ${c.speed}`}
                    </span>
                  </div>

                  {/* Highlights List */}
                  <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {c.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: '#333333', lineHeight: 1.4 }}>
                        <Check size={15} color="#F83458" style={{ flexShrink: 0, marginTop: '2px', strokeWidth: 2.5 }} />
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
                      background: '#F83458',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(248, 52, 88, 0.28)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>Enroll in Batch</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          SECTION 3: TARGET GOVERNMENT EXAMINATIONS
          ========================================================================= */}
      <section style={{ padding: '2.5rem 1.25rem 2.25rem', background: '#F5F5F7', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 1.75rem' }}>
            <span style={{ 
              display: 'inline-block', 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              color: '#F83458', 
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.5rem' 
            }}>
              Comprehensive Exam Preparation
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
              Which Examinations Do We Prepare You For?
            </h2>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#78716c', margin: '0 0 0.75rem' }}>
              कौन-कौन सी परीक्षाओं की तैयारी कराई जाती है?
            </p>
            <p style={{ fontSize: '0.95rem', color: '#57534e', margin: 0, lineHeight: 1.5 }}>
              Our courses provide skill-based training calibrated strictly according to official government skill test patterns and marking schemes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              {
                title: "SSC Stenographer Grade C & D",
                speed: "80 & 100 WPM",
                lang: "English & Hindi",
                desc: "Parliamentary debates, budget speeches, official 5-minute reading clock, and full/half mistake formula scoring."
              },
              {
                title: "Supreme Court Stenographer & SPA",
                speed: "100 & 120 WPM",
                lang: "English Legal",
                desc: "High-speed legal dictation, constitutional bench judgments, legal phraseology, and high precision accuracy."
              },
              {
                title: "Patna High Court Stenographer & PA",
                speed: "80 & 100 WPM",
                lang: "English & Hindi",
                desc: "Authentic criminal & civil appeals, legal terminology, strict backspace lock simulation, and daily evaluation."
              },
              {
                title: "Jharkhand High Court Stenographer",
                speed: "80 & 100 WPM",
                lang: "Hindi & English",
                desc: "Dual Hindi font engine (Kruti Dev 010 & Mangal Inscript) and English civil court judgment transcription."
              },
              {
                title: "Delhi High Court PA / SPA",
                speed: "100 & 110 WPM",
                lang: "English Legal",
                desc: "Commercial division orders, courtroom speed dictations, and timed computer transcription."
              },
              {
                title: "BSF & CRPF Paramilitary Stenographer",
                speed: "80 WPM",
                lang: "Hindi & English",
                desc: "Paramilitary ASI (Steno) recruitment skill test drills, official gazette passages, and typing accuracy."
              }
            ].map((exam, i) => (
              <div 
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px',
                  padding: '1.25rem 1.4rem',
                  boxShadow: '0 1px 4px rgba(17, 17, 17, 0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F83458', background: 'rgba(248, 52, 88, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                    {exam.speed}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#555555', fontWeight: 600 }}>
                    {exam.lang}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
                  {exam.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#555555', margin: 0, lineHeight: 1.4 }}>
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
      <section style={{ padding: '2.5rem 1.25rem 2.25rem', background: '#F5F5F7', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 1.75rem' }}>
            <span style={{ 
              display: 'inline-block', 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              color: '#F83458', 
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.5rem' 
            }}>
              Proven Learning Methodology
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 800, color: '#0F172A', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
              Why Gaya Shorthand Classes?
            </h2>
            <p style={{ fontSize: '1rem', color: '#555555', margin: 0, lineHeight: 1.5 }}>
              A disciplined, step-by-step coaching system developed over 12 years to turn complete beginners into exam-ready stenographers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: Award,
                iconColor: "#F83458",
                title: "Experienced Faculty — Shadab Sir",
                subtitle: "12 Years Dedicated Experience",
                desc: "Direct guidance from Shadab Sir with individual notebook correction, outline curvature checks, and personal doubt clearing at every step."
              },
              {
                icon: Headphones,
                iconColor: "#111111",
                title: "Audio-Visual Classroom & Dictation",
                subtitle: "Speeds from 50 to 140 WPM",
                desc: "Classes equipped with visual displays and daily graded studio audio dictations across parliamentary speeches, legal judgments, and editorials."
              },
              {
                icon: Keyboard,
                iconColor: "#111111",
                title: "Online Typing & Real Exam Software",
                subtitle: "Kruti Dev 010 & Mangal Inscript",
                desc: "Practice with official exam conditions: backspace lock simulation, 5-minute reading clock, and instant word-by-word diff error evaluation."
              },
              {
                icon: Sparkles,
                iconColor: "#F83458",
                title: "3 Free Demo Classes for Beginners",
                subtitle: "Zero Risk • No Prior Knowledge Needed",
                desc: "Experience our teaching methodology, digital classroom, and modern computer typing lab before taking admission."
              }
            ].map((pillar, i) => (
              <div 
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '14px',
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '10px', 
                  background: '#FFFFFF', 
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <pillar.icon size={22} color={pillar.iconColor} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#0F172A', margin: '0 0 2px' }}>
                    {pillar.title}
                  </h3>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: pillar.iconColor, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                    {pillar.subtitle}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#555555', margin: 0, lineHeight: 1.5 }}>
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
      <section style={{ padding: '2.5rem 1.25rem 2.25rem', background: '#F5F5F7', borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 1.75rem' }}>
            <span style={{ 
              display: 'inline-block', 
              fontSize: '0.78rem', 
              fontWeight: 800, 
              color: '#F83458', 
              textTransform: 'uppercase', 
              letterSpacing: '0.6px', 
              marginBottom: '0.5rem' 
            }}>
              Demonstrations & Verified Feedback
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 800, color: '#0F172A', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
              See Our Classes & What Students Say
            </h2>
            <p style={{ fontSize: '1rem', color: '#555555', margin: 0, lineHeight: 1.5 }}>
              Over 140+ students have rated Gaya Shorthand Classes 4.9/5 on Google for quality coaching and results.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
            
            {/* Left: YouTube Video Card */}
            <div style={{ 
              background: '#FFFFFF', 
              border: '1px solid rgba(0, 0, 0, 0.08)', 
              borderRadius: '16px', 
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(17, 17, 17, 0.04)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                  <YouTubeIcon size={24} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F83458', textTransform: 'uppercase' }}>
                    Live Classroom Dictation Demo
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  SSC Stenographer 80 & 100 WPM Live Dictation
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '0 0 1.25rem', lineHeight: 1.45 }}>
                  Instructor: <strong>Shadab Sir (12 Years Experience)</strong>. Real-time parliamentary speech dictation calibrated at 80 and 100 WPM with official 5-minute reading clock and strict error evaluation.
                </p>

                {/* YouTube Video Player (Embedded & Interactive) */}
                <div style={{ 
                  background: '#0F172A', 
                  borderRadius: '12px', 
                  aspectRatio: '16/9', 
                  position: 'relative', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  overflow: 'hidden', 
                  marginBottom: '1.25rem', 
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
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
                        background: 'radial-gradient(circle, rgba(248, 52, 88, 0.22) 0%, rgba(29, 29, 31, 0.95) 100%)'
                      }}
                      title="Click to Play Classroom Demonstration Video"
                    >
                      <div style={{ 
                        width: '58px', 
                        height: '58px', 
                        borderRadius: '50%', 
                        background: '#F83458', 
                        color: '#FFFFFF', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 10px', 
                        boxShadow: '0 4px 14px rgba(248, 52, 88, 0.35)'
                      }}>
                        <Play size={26} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
                      </div>
                      <span style={{ display: 'block', fontSize: '0.96rem', fontWeight: 800 }}>Watch Classroom Dictation Video</span>
                      <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.75)', marginTop: '3px' }}>Click to play on-screen demo • Gaya Shorthand Classes</span>
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
                  background: '#F83458',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.8rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxSizing: 'border-box',
                  boxShadow: '0 2px 8px rgba(248, 52, 88, 0.28)'
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
                border: '1px solid rgba(0, 0, 0, 0.08)', 
                borderRadius: '14px', 
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(17, 17, 17, 0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <GoogleIcon />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      4.9 out of 5 Rating
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#555555' }}>Based on 140+ Google Student Reviews</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
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
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '12px',
                    padding: '1.15rem 1.25rem',
                    boxShadow: '0 1px 4px rgba(17, 17, 17, 0.02)'
                  }}
                >
                  <p style={{ fontSize: '0.86rem', color: '#444444', margin: '0 0 8px', lineHeight: 1.45, fontStyle: 'italic' }}>
                    {rev.text}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>
                      {rev.name}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#F83458', background: 'rgba(248, 52, 88, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
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
      <section style={{ padding: '2.5rem 1.25rem 2rem', background: '#F5F5F7' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            
            {/* Left: Academy Address & Google Maps */}
            <div>
              <span style={{ 
                display: 'inline-block', 
                fontSize: '0.78rem', 
                fontWeight: 800, 
                color: '#F83458', 
                textTransform: 'uppercase', 
                letterSpacing: '0.6px', 
                marginBottom: '0.5rem' 
              }}>
                Visit Our Offline Institute
              </span>
              <h2 style={{ fontSize: 'clamp(1.7rem, 2.5vw, 2.1rem)', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
                Gaya Coaching Center & Helplines
              </h2>
              
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                  <MapPin size={20} color="#F83458" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: '0 0 2px' }}>
                      Address:
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: '#555555', margin: 0, lineHeight: 1.45 }}>
                      <strong>Gaya Shorthand Classes</strong><br />
                      Gaya College More, Opposite Cyber Thana, Gayaji, Bihar - 823001
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                  <Phone size={18} color="#F83458" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: '0 0 2px' }}>
                      Direct Helplines:
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: '#555555', margin: 0 }}>
                      Director (Shadab Sir): <a href="tel:9204123453" style={{ color: '#F83458', fontWeight: 700 }}>+91 9204123453</a><br />
                      Admissions Desk: <a href="tel:7870377214" style={{ color: '#555555', fontWeight: 700 }}>+91 7870377214</a>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Clock size={18} color="#111111" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: '0 0 2px' }}>
                      Office & Class Timings:
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: '#555555', margin: 0 }}>
                      Morning 7:00 AM – 11:30 AM • Evening 3:30 PM – 7:30 PM (Mon to Sat)
                    </p>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div style={{ 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid rgba(0, 0, 0, 0.08)', 
                boxShadow: '0 2px 8px rgba(17, 17, 17, 0.04)',
                height: '200px',
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
                display: 'inline-block', 
                fontSize: '0.78rem', 
                fontWeight: 800, 
                color: '#F83458', 
                textTransform: 'uppercase', 
                letterSpacing: '0.6px', 
                marginBottom: '0.5rem' 
              }}>
                Clear Answers For New Students
              </span>
              <h2 style={{ fontSize: 'clamp(1.7rem, 2.5vw, 2.1rem)', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
                Frequently Asked Questions
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {TOP_FAQS.map((faq) => {
                  const isOpen = activeFaq === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        transition: 'border-color 0.15s ease'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '1rem 1.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0F172A' }}>
                          {faq.q}
                        </span>
                        {isOpen ? <ChevronUp size={18} color="#111111" /> : <ChevronDown size={18} color="#777777" />}
                      </button>

                      {isOpen && (
                        <div style={{ padding: '0 1.25rem 1.15rem', fontSize: '0.88rem', color: '#555555', lineHeight: 1.5, borderTop: '1px solid rgba(17, 17, 17, 0.08)' }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Inquire More Link */}
              <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
                <a
                  href="tel:9204123453"
                  style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F83458', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <Phone size={14} color="#F83458" />
                  <span>Have questions? Call Helpline: +91 9204123453</span>
                </a>
              </div>

            </div>

          </div>

          {/* Bottom Academy CTA Banner */}
          <div style={{ 
            background: '#FFFFFF', 
            border: '1.5px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '16px', 
            padding: '2.5rem 2rem', 
            color: '#0F172A',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(17, 17, 17, 0.04)'
          }}>
            <span style={{
              display: 'inline-block',
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#F83458',
              marginBottom: '0.4rem'
            }}>
              ESTD. 2012 • GAYA SHORTHAND CLASSES
            </span>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', fontWeight: 850, margin: '0 0 0.5rem', color: '#0F172A' }}>
              Learn Today, Lead Tomorrow!
            </h3>
            <p style={{ fontSize: '1rem', color: '#555555', maxWidth: '640px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              Begin your government stenographer journey with <strong>3 Free Demo Classes</strong> at Gaya Shorthand Classes. Guided by experienced faculty <strong>Shadab Sir (12 Years Experience)</strong>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
              <a
                href="tel:9204123453"
                style={{
                  background: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.4rem',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(17, 17, 17, 0.25)'
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
                  background: '#F83458',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.4rem',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(248, 52, 88, 0.28)'
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
