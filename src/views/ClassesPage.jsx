import React, { useState } from 'react';
import { 
  Clock, 
  GraduationCap, 
  Phone, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Building, 
  Volume2,
  Video,
  ExternalLink,
  ArrowRight,
  Radio,
  Users,
  Copy,
  Check,
  Keyboard,
  Search,
  BookOpen,
  Zap,
  Calendar
} from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/mockData';
import '../landing-redesign.css';

const DAILY_BATCHES = [
  {
    id: 'batch-morning-1',
    time: '6:00 AM – 8:00 AM',
    shift: 'Morning Early Bird',
    title: 'Basic Pitman Shorthand Theory & New Strokes',
    speed: 'Beginners (0 - 60 WPM)',
    instructor: 'Shadab Sir',
    mode: 'Offline Classroom + Live Audio Stream',
    seats: '5 Seats Left',
    badge: 'Theory Foundation',
    badgeColor: 'badge-blue',
    desc: 'Ideal for college students and beginners learning consonant strokes, vowel placements, circles, loops, and basic outline formation.'
  },
  {
    id: 'batch-morning-2',
    time: '8:30 AM – 10:30 AM',
    shift: 'Morning Core Batch',
    title: 'SSC Stenographer Grade C & D Speed Builder',
    speed: '80 WPM Intermediate',
    instructor: 'Shadab Sir (Director)',
    mode: 'Offline Lab + Typing Studio',
    seats: 'Filling Fast',
    badge: 'SSC Exam Target',
    badgeColor: 'badge-amber',
    desc: 'Rigorous daily dictations with 5-minute reading clock and strict backspace lock typing on authentic mechanical keyboards.'
  },
  {
    id: 'batch-evening-1',
    time: '3:00 PM – 5:00 PM',
    shift: 'Afternoon Judicial Bench',
    title: 'High Court Judicial Legal Series & Criminal Appeals',
    speed: '100 WPM Judicial',
    instructor: 'Shadab Sir',
    mode: 'Offline Classroom & Audio Vault',
    seats: 'Open Admissions',
    badge: 'Patna & High Courts',
    badgeColor: 'badge-emerald',
    desc: 'Dedicated courtroom dictation using authentic High Court case records, criminal appeals, and civil bench judgments.'
  },
  {
    id: 'batch-evening-2',
    time: '5:30 PM – 7:30 PM',
    shift: 'Evening Master Class',
    title: 'Parliament & Vidhan Sabha Reporter 120 WPM Batch',
    speed: '120+ WPM Advanced',
    instructor: 'Senior Court Master',
    mode: 'Advanced Lab',
    seats: 'Limited Batch (25 Candidates)',
    badge: 'Assembly Reporter',
    badgeColor: 'badge-purple',
    desc: 'High-speed phraseography, advanced contractions, and rapid speech transcription for legislative assembly reporter exams.'
  }
];

const SHORTHAND_OUTLINES_DATA = [
  {
    id: 'out-1',
    term: "Hon'ble High Court",
    category: "Legal & Judicial",
    speedTier: "80 - 120 WPM",
    shorthandStroke: "H-N-B-L // K-R-T",
    hindiEquivalent: "माननीय उच्च न्यायालय",
    ruleType: "Intersection & Doubling",
    ruleDesc: "Intersected Hay with N-hook crossing through ray line with Kay-Ray-Tee stroke.",
    speedTip: "Write without lifting pencil; the intersection automatically denotes 'Court'."
  },
  {
    id: 'out-2',
    term: "Parliamentary Standing Committee",
    category: "Parliamentary",
    speedTier: "100 - 120 WPM",
    shorthandStroke: "P-R-L-M // S-T-N-D // K-M-T",
    hindiEquivalent: "संसदीय स्थायी समिति",
    ruleType: "Contraction & Prefix",
    ruleDesc: "P stroke on line with R-hook, halved Tee for standing, Kay loop for committee.",
    speedTip: "Standard Rajya Sabha & Lok Sabha debate phrase."
  },
  {
    id: 'out-3',
    term: "Criminal Procedure Code (CrPC)",
    category: "Legal & Judicial",
    speedTier: "80 - 100 WPM",
    shorthandStroke: "K-R-M // P-R-S-D-R",
    hindiEquivalent: "दंड प्रक्रिया संहिता",
    ruleType: "Compound Contraction",
    ruleDesc: "Kay-Ray with em-hook, joined to P-Ray with Ses-circle on line.",
    speedTip: "Frequent in Patna, Jharkhand & Delhi High Court morning judicial dictations."
  },
  {
    id: 'out-4',
    term: "Special Leave Petition (SLP)",
    category: "Legal & Judicial",
    speedTier: "100 - 120 WPM",
    shorthandStroke: "S-P-L-V // P-T-S-H-N",
    hindiEquivalent: "विशेष अनुमति याचिका",
    ruleType: "Abbreviated Outline",
    ruleDesc: "Circle S with Pee-Lay stroke joined to Tee-Shun hook below the line.",
    speedTip: "Supreme Court appellate judgment favorite."
  },
  {
    id: 'out-5',
    term: "Capital Expenditure & Revenue",
    category: "Administrative & Govt",
    speedTier: "80 - 100 WPM",
    shorthandStroke: "K-P-T-L // K-S-P-N-D",
    hindiEquivalent: "पूंजीगत व्यय एवं राजस्व",
    ruleType: "Halving Principle",
    ruleDesc: "Kay-Pee halved for Tee, joined to Kay-circle-Pee with end-hook.",
    speedTip: "Union Budget and Ministry of Finance standard terminology."
  },
  {
    id: 'out-6',
    term: "Constitutional Bench of India",
    category: "Legal & Judicial",
    speedTier: "100 - 120 WPM",
    shorthandStroke: "K-N-S-T-T // B-N-C-H",
    hindiEquivalent: "भारत की संविधान पीठ",
    ruleType: "Intersected Stroke",
    ruleDesc: "Con-dot omitted, Ses-circle on Tee followed by Bee with N-hook crossing.",
    speedTip: "Essential for 5-Judge bench judgment transcription."
  },
  {
    id: 'out-7',
    term: "Superintendent of Police (SP)",
    category: "Administrative & Govt",
    speedTier: "80 - 100 WPM",
    shorthandStroke: "S-P-R-N-T // P-L-S",
    hindiEquivalent: "पुलिस अधीक्षक",
    ruleType: "Doubling Principle",
    ruleDesc: "Circle S with Pee doubled for 'ender' sound, joined to Lay-circle.",
    speedTip: "Police FIR and criminal writ petition standard outline."
  },
  {
    id: 'out-8',
    term: "Prima Facie Case",
    category: "Legal & Judicial",
    speedTier: "80 - 120 WPM",
    shorthandStroke: "P-R-M // F-S-H-K-S",
    hindiEquivalent: "प्रथम दृष्टया मामला",
    ruleType: "Latin Phraseography",
    ruleDesc: "P-Ray first position above line, Ef stroke with circle-S crossing.",
    speedTip: "Do not insert first-position vowel during speed; outline shape is unique."
  },
  {
    id: 'out-9',
    term: "Affidavit in Opposition",
    category: "Legal & Judicial",
    speedTier: "100 - 120 WPM",
    shorthandStroke: "F-D-V-T // P-Z-S-H-N",
    hindiEquivalent: "प्रति-शपथ पत्र",
    ruleType: "Halving & Shun Hook",
    ruleDesc: "Ef stroke with Dee halved for Tee, joined to Pee with large Shun hook.",
    speedTip: "Standard civil procedure motion terminology."
  },
  {
    id: 'out-10',
    term: "Supplementary Demands for Grants",
    category: "Parliamentary",
    speedTier: "100 - 120 WPM",
    shorthandStroke: "S-P-L-M // D-M-N-D // G-R-N-T",
    hindiEquivalent: "अनुपूरक अनुदान मांगें",
    ruleType: "Advanced Phraseography",
    ruleDesc: "Circle-S on Pee-Lay, Dee halved for End-hook, Gay-Ray halved for Tee.",
    speedTip: "Lok Sabha financial business favorite outline."
  },
  {
    id: 'out-11',
    term: "Cross-Examination of Witnesses",
    category: "Legal & Judicial",
    speedTier: "80 - 100 WPM",
    shorthandStroke: "K-R-S // S-G-Z-M-N // W-T-N-S",
    hindiEquivalent: "गवाहों से जिरह",
    ruleType: "Compound Intersection",
    ruleDesc: "Ray-circle-S crossed through Ses-Gay-Em, Way stroke with En-circle.",
    speedTip: "Trial court deposition dictation essential."
  },
  {
    id: 'out-12',
    term: "Socio-Economic Development",
    category: "Administrative & Govt",
    speedTier: "80 - 100 WPM",
    shorthandStroke: "S-S-H-K-N // D-V-L-P",
    hindiEquivalent: "सामाजिक-आर्थिक विकास",
    ruleType: "Contraction Principle",
    ruleDesc: "Circle-S on Ish stroke joined to Kay-En, Dee with Vee-Lay stroke on line.",
    speedTip: "NITI Aayog & Planning Commission editorial standard."
  }
];

export default function ClassesPage({ onOpenCheckout, setCurrentTab, onlineClasses = [], onSelectClass }) {
  const [activeTab, setActiveTab] = useState('online-live'); // 'online-live' | 'batches' | 'timetable' | 'diplomas' | 'notices' | 'outlines'
  const [copiedId, setCopiedId] = useState(false);
  const [outlineSearch, setOutlineSearch] = useState('');
  const [outlineCategory, setOutlineCategory] = useState('All');
  const [copiedOutlineId, setCopiedOutlineId] = useState(null);

  // Active highlighted class: priority to isLive class, else first class
  const activeClass = (onlineClasses && onlineClasses.length > 0)
    ? (onlineClasses.find(c => c.isLive) || onlineClasses[0])
    : null;

  const handleCopyId = () => {
    const codeToCopy = activeClass?.meetCode || activeClass?.zoomMeetingId || 'gsc-steno-live';
    navigator.clipboard?.writeText(codeToCopy).catch(() => {});
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div 
      className="sp-classes-root classes-page-root" 
      style={{ 
        backgroundColor: '#ECE8E0', 
        minHeight: '100vh', 
        width: '100%',
        color: '#16161A',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
      }}
    >
      
      {/* =========================================================================
          1. EDITORIAL HERO HEADER (LEFT-ALIGNED WITH NAVBAR CLEARANCE)
          ========================================================================= */}
      <div 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '112px 24px 32px',
          textAlign: 'left'
        }}
      >
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
            Offline Gaya Center &amp; Live Google Meet Broadcast
          </span>
        </div>

        <h1 
          style={{ 
            fontSize: 'clamp(2rem, 3.2vw, 2.85rem)', 
            fontWeight: 800, 
            color: '#16161A', 
            letterSpacing: '-0.025em', 
            margin: '0 0 16px',
            lineHeight: 1.18
          }}
        >
          Classroom Batches, Timetable &amp;{' '}
          <span style={{ 
            fontFamily: "'Instrument Serif', Georgia, serif", 
            fontStyle: 'italic', 
            fontWeight: 400, 
            color: '#991B1B', 
            fontSize: '1.08em' 
          }}>
            Live Dictations
          </span>
        </h1>

        <p 
          style={{ 
            fontSize: '1.05rem', 
            color: '#44403C', 
            lineHeight: 1.65, 
            maxWidth: '820px', 
            margin: 0 
          }}
        >
          Attend daily in-person classes at our Gaya academy or access live broadcast Google Meet dictations from anywhere. Daily batches guided by{' '}
          <strong style={{ color: '#16161A', fontWeight: 700 }}>Shadab Sir (12 Years Experience)</strong>{' '}
          spanning{' '}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#16161A' }}>
            6:00 AM to 8:00 PM
          </span>.
        </p>
      </div>

      {/* =========================================================================
          2. RECESSED FULL-WIDTH TAB DOCK (SINGLE HORIZONTAL ROW)
          ========================================================================= */}
      <div 
        style={{
          width: '100%',
          background: '#E4DFD5',
          borderTop: '1px solid #D1CBBF',
          borderBottom: '1px solid #D1CBBF',
          padding: '10px 0',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backdropFilter: 'blur(8px)'
        }}
      >
        <div 
          className="sp-classes-tab-dock"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          {[
            { id: 'online-live', label: 'Live Google Meet Studio', hasDot: true },
            { id: 'batches', label: 'Daily Academy Batches' },
            { id: 'timetable', label: 'Weekly Timetable' },
            { id: 'diplomas', label: 'Govt. Diplomas (ADCA/DCA)' },
            { id: 'notices', label: 'Recruitment Notices' },
            { id: 'outlines', label: 'Shorthand Outlines', icon: Zap }
          ].map((tab) => {
            const active = activeTab === tab.id;
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: active ? 700 : 600,
                  border: '1px solid',
                  borderColor: active ? '#D1CBBF' : 'transparent',
                  background: active ? '#F7F5F0' : 'transparent',
                  color: active ? '#16161A' : '#57534E',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: active ? '0 2px 6px rgba(22, 22, 26, 0.06)' : 'none',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = '#16161A';
                    e.currentTarget.style.background = '#ECE8E0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = '#57534E';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {tab.hasDot && (
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#991B1B',
                    display: 'inline-block'
                  }} />
                )}
                {IconComponent && <IconComponent size={13} color={active ? '#991B1B' : '#57534E'} />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          3. MAIN TAB CONTENT CONTAINER
          ========================================================================= */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 24px 48px' }}>

        {/* ---------------------------------------------------------------------
            TAB 0: LIVE ONLINE GOOGLE MEET STUDIO
            --------------------------------------------------------------------- */}
        {activeTab === 'online-live' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Split Hero Card: Left Broadcast + Right Whiteboard Frame */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '24px',
                alignItems: 'stretch'
              }}
            >
              {/* Left Broadcast Card */}
              <div 
                style={{
                  background: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderLeft: '4px solid #991B1B',
                  borderRadius: '20px',
                  padding: '32px',
                  boxShadow: '0 4px 20px rgba(22, 22, 26, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    <span 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#FAF0F0',
                        border: '1px solid #F5C6C6',
                        color: '#991B1B',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#991B1B', display: 'inline-block' }} />
                      <span>{activeClass?.isLive ? 'LIVE BROADCAST ACTIVE' : (activeClass?.tag || 'UPCOMING BROADCAST')}</span>
                    </span>
                    <span 
                      style={{
                        background: '#EFECE5',
                        border: '1px solid #D6D0C4',
                        color: '#57534E',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        fontFamily: "'JetBrains Mono', monospace"
                      }}
                    >
                      {activeClass?.roomNo?.replace(/Zoom Room/g, 'Google Meet Room') || 'Google Meet Room #01 • Studio Live'}
                    </span>
                    <span 
                      style={{
                        color: '#57534E',
                        fontSize: '0.75rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Users size={12} color="#57534E" />
                      <span>{activeClass ? (activeClass.attendees || 1) : 142} Active Candidates</span>
                    </span>
                  </div>

                  <h2 
                    style={{ 
                      fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)', 
                      fontWeight: 800, 
                      color: '#16161A', 
                      lineHeight: 1.3, 
                      margin: '0 0 10px' 
                    }}
                  >
                    {activeClass?.title || 'SSC Stenographer Grade C & D — 80 WPM Live Speed Dictation & Transcription Lab'}
                  </h2>

                  <p style={{ fontSize: '0.92rem', color: '#44403C', lineHeight: 1.65, margin: 0 }}>
                    Conducted by <strong style={{ color: '#16161A' }}>{activeClass?.instructor || 'Shadab Sir'}</strong> ({activeClass?.instructorRole || '12 Years Experience'}). {activeClass?.description || 'Real-time 5-minute parliamentary dictation, synchronized digital shorthand whiteboard with interactive student drawing, live audio player with 0.8x-1.3x pacing, and immediate transcription grading.'}
                  </p>
                </div>

                {/* Google Meet Credentials Box */}
                <div 
                  style={{
                    background: '#EFECE5',
                    border: '1px solid #DFD9CD',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F7F5F0', border: '1px solid #D1CBBF', padding: '6px 12px', borderRadius: '8px', fontSize: '0.84rem' }}>
                    <span style={{ color: '#57534E', fontWeight: 600 }}>Meet Code:</span>
                    <strong style={{ fontFamily: "'JetBrains Mono', monospace", color: '#16161A' }}>
                      {activeClass?.meetCode || activeClass?.zoomMeetingId || 'gsc-steno-live'}
                    </strong>
                    <button 
                      type="button" 
                      onClick={handleCopyId}
                      title="Copy Meeting Code"
                      style={{ 
                        border: '1px solid #D1CBBF', 
                        background: '#E4DFD5', 
                        color: '#16161A',
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        cursor: 'pointer', 
                        fontSize: '0.72rem', 
                        fontWeight: 700, 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '4px' 
                      }}
                    >
                      {copiedId ? <Check size={11} color="#991B1B" /> : <Copy size={11} />}
                      <span>{copiedId ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F7F5F0', border: '1px solid #D1CBBF', padding: '6px 12px', borderRadius: '8px', fontSize: '0.84rem' }}>
                    <span style={{ color: '#57534E', fontWeight: 600 }}>Platform:</span>
                    <strong style={{ color: '#16161A', fontWeight: 700 }}>Google Meet</strong>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F7F5F0', border: '1px solid #D1CBBF', padding: '6px 12px', borderRadius: '8px', fontSize: '0.84rem' }}>
                    <span style={{ color: '#57534E', fontWeight: 600 }}>Schedule:</span>
                    <span style={{ color: '#16161A', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{activeClass?.time || '8:30 AM – 10:30 AM (Daily)'}</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <button 
                    type="button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#991B1B',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px 22px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(153, 27, 27, 0.25)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#7F1D1D'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#991B1B'}
                    onClick={() => {
                      if (onSelectClass && activeClass) {
                        onSelectClass(activeClass.id);
                      } else {
                        setCurrentTab('online-classes');
                      }
                    }}
                  >
                    <Video size={16} />
                    <span>Enter Live Meet Studio (In-Browser)</span>
                    <ArrowRight size={15} />
                  </button>

                  <a 
                    href={activeClass?.meetUrl || activeClass?.googleMeetUrl || (activeClass?.zoomDirectUrl?.includes('meet.google') ? activeClass.zoomDirectUrl : 'https://meet.google.com/gsc-steno-live')}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#EFECE5',
                      color: '#16161A',
                      border: '1px solid #D1CBBF',
                      borderRadius: '10px',
                      padding: '12px 20px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#E4DFD5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#EFECE5'}
                  >
                    <ExternalLink size={15} />
                    <span>Launch in Google Meet</span>
                  </a>
                </div>
              </div>

              {/* Right Preview Card / Whiteboard Teaser */}
              <div 
                style={{
                  background: '#EFECE5',
                  border: '1px solid #D1CBBF',
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(22, 22, 26, 0.04)'
                }}
              >
                <div>
                  <div 
                    style={{
                      background: '#E4DFD5',
                      border: '1px solid #D1CBBF',
                      borderRadius: '10px 10px 0 0',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#57534E'
                    }}
                  >
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#991B1B' }} />
                    <span>STUDIO WHITEBOARD FEED • 1080P HD</span>
                  </div>

                  <div 
                    style={{
                      background: '#FAF8F5',
                      border: '1px solid #D1CBBF',
                      borderTop: 'none',
                      borderRadius: '0 0 10px 10px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: '#16161A',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.9rem'
                      }}>
                        SS
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#16161A', fontSize: '0.95rem' }}>Shadab Sir (Host)</div>
                        <div style={{ fontSize: '0.78rem', color: '#57534E' }}>Faculty Director (12 Yrs Exp)</div>
                      </div>
                    </div>

                    <div 
                      style={{
                        background: '#EFECE5',
                        border: '1px solid #D6D0C4',
                        borderRadius: '8px',
                        padding: '14px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.25rem', letterSpacing: '4px', color: '#16161A', fontWeight: 700, marginBottom: '4px' }}>
                        / — \ ) ⌒ ⌣ ⌢
                      </div>
                      <div style={{ fontSize: '0.78rem', fontStyle: 'italic', color: '#57534E' }}>
                        "Parliamentary Motion on State Infrastructure..."
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#44403C' }}>
                        <CheckCircle2 size={14} color="#991B1B" style={{ flexShrink: 0 }} />
                        <span>Direct Google Meet Classroom Entrance &amp; 1-Click Access</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#44403C' }}>
                        <CheckCircle2 size={14} color="#991B1B" style={{ flexShrink: 0 }} />
                        <span>Real 80-104 WPM Speed-Pitch Dictation Player</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#44403C' }}>
                        <CheckCircle2 size={14} color="#991B1B" style={{ flexShrink: 0 }} />
                        <span>Post-Class Keyboard Transcription &amp; Instant Evaluation</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <button 
                    type="button"
                    onClick={() => setCurrentTab('online-classes')}
                    style={{ 
                      width: '100%',
                      padding: '12px 18px', 
                      borderRadius: '10px', 
                      background: '#16161A', 
                      color: '#FFFFFF', 
                      border: 'none',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(22, 22, 26, 0.15)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#27272A'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#16161A'}
                  >
                    <span>Join Live Online Classroom</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Online Classes Features Trio */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}
            >
              {[
                {
                  num: '01',
                  icon: Video,
                  title: 'Dual-Mode Shorthand Whiteboard',
                  desc: 'Watch teacher strokes live or switch to your own interactive HTML5 stylus canvas to trace outlines with fine pencil or heavy calligraphy pens.'
                },
                {
                  num: '02',
                  icon: Volume2,
                  title: 'Speed-Controlled Dictation Engine',
                  desc: 'Built-in audio player with 0.8x, 1.0x, 1.1x, 1.2x, and 1.3x multipliers. Practice at custom speeds without pitch distortion.'
                },
                {
                  num: '03',
                  icon: Keyboard,
                  title: '1-Click Typing Test Handover',
                  desc: 'Immediately transition from the live Google Meet dictation into the exam typing engine to transcribe your strokes with instant accuracy metrics.'
                }
              ].map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div 
                    key={feat.num}
                    style={{
                      background: '#F7F5F0',
                      border: '1px solid #D1CBBF',
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 2px 10px rgba(22, 22, 26, 0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: '#EFECE5',
                        border: '1px solid #D1CBBF',
                        color: '#57534E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComponent size={20} />
                      </div>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        color: '#991B1B'
                      }}>
                        {feat.num}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#16161A', margin: '4px 0 0', lineHeight: 1.35 }}>
                      {feat.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#44403C', lineHeight: 1.6, margin: 0 }}>
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* All 4 Daily Google Meet Batches Schedule */}
            <div 
              style={{
                background: '#F7F5F0',
                border: '1px solid #D1CBBF',
                borderRadius: '18px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(22, 22, 26, 0.03)'
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <span style={{ 
                  fontFamily: "'JetBrains Mono', monospace", 
                  fontSize: '0.74rem', 
                  fontWeight: 700, 
                  color: '#991B1B', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em' 
                }}>
                  Daily Broadcast Timetable
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#16161A', margin: '4px 0 6px' }}>
                  All 4 Daily Online Google Meet Dictation Batches
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#57534E', margin: 0 }}>
                  All online sessions are recorded and available for replay 24/7 in the Candidate Portal.
                </p>
              </div>

              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '16px'
                }}
              >
                {(onlineClasses && onlineClasses.length > 0 ? onlineClasses : [
                  { id: 'class-theory-2', time: '6:00 AM – 8:00 AM', tag: 'Recording Ready', title: 'Basic Pitman Theory & New Strokes', speed: 'Beginners (0 - 60 WPM)', meetCode: 'gsc-theory-am', zoomMeetingId: 'gsc-theory-am' },
                  { id: 'class-live-1', isLive: true, time: '8:30 AM – 10:30 AM', tag: '● Active Live', title: 'SSC Grade C & D 80 WPM Speed Lab', speed: '80 WPM Standard', meetCode: 'gsc-steno-live', zoomMeetingId: 'gsc-steno-live' },
                  { id: 'class-judicial-3', time: '3:00 PM – 5:00 PM', tag: 'Starts 3:00 PM', title: 'High Court Judicial 100 WPM Bench', speed: '100 WPM Judicial', meetCode: 'gsc-court-pm', zoomMeetingId: 'gsc-court-pm' },
                  { id: 'class-reporter-4', time: '5:30 PM – 7:30 PM', tag: 'Starts 5:30 PM', title: 'Assembly Reporter 120+ WPM Elite', speed: '120-140 WPM', meetCode: 'gsc-assembly-eve', zoomMeetingId: 'gsc-assembly-eve' }
                ]).map((b) => (
                  <div 
                    key={b.id} 
                    style={{
                      background: b.isLive ? '#FAF8F5' : '#F7F5F0',
                      border: b.isLive ? '1.5px solid #991B1B' : '1px solid #D1CBBF',
                      borderTop: b.isLive ? '4px solid #991B1B' : '1px solid #D1CBBF',
                      borderRadius: '14px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px',
                      boxShadow: b.isLive ? '0 4px 16px rgba(153, 27, 27, 0.08)' : '0 1px 3px rgba(22, 22, 26, 0.03)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
                        <span style={{
                          background: b.isLive ? '#991B1B' : '#EFECE5',
                          color: b.isLive ? '#FFFFFF' : '#16161A',
                          border: b.isLive ? 'none' : '1px solid #D6D0C4',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: '999px',
                          fontFamily: "'JetBrains Mono', monospace"
                        }}>
                          {b.time}
                        </span>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: b.isLive ? '#991B1B' : '#57534E',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {b.isLive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#991B1B' }} />}
                          {b.tag}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#16161A', margin: '0 0 8px', lineHeight: 1.35 }}>
                        {b.title}
                      </h4>

                      <div style={{
                        fontSize: '0.75rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: b.isLive ? '#991B1B' : '#57534E',
                        background: b.isLive ? '#FAF0F0' : '#EFECE5',
                        border: '1px solid ' + (b.isLive ? '#F5C6C6' : '#DFD9CD'),
                        padding: '4px 8px',
                        borderRadius: '6px',
                        display: 'inline-block'
                      }}>
                        {b.speed} • Meet: {b.meetCode || b.zoomMeetingId}
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        if (onSelectClass) {
                          onSelectClass(b.id);
                        } else {
                          setCurrentTab('online-classes');
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        border: b.isLive ? 'none' : '1px solid #D1CBBF',
                        background: b.isLive ? '#991B1B' : '#EFECE5',
                        color: b.isLive ? '#FFFFFF' : '#16161A',
                        boxShadow: b.isLive ? '0 2px 8px rgba(153, 27, 27, 0.25)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = b.isLive ? '#7F1D1D' : '#E4DFD5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = b.isLive ? '#991B1B' : '#EFECE5';
                      }}
                    >
                      <span>{b.isLive ? 'Enter Live Classroom →' : 'View Session Details →'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            TAB 1: DAILY ACADEMY BATCHES
            --------------------------------------------------------------------- */}
        {activeTab === 'batches' && (
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'left', marginBottom: '28px' }}>
              <span style={{
                display: 'inline-block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#991B1B',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '8px'
              }}>
                Classroom &amp; Online Schedule • Estd. 2012
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#16161A', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Daily Classroom Batches at Gaya Center
              </h2>
              <p style={{ fontSize: '1rem', color: '#44403C', maxWidth: '760px', margin: 0, lineHeight: 1.6 }}>
                Structured offline training batches from 6:00 AM to 8:00 PM with daily handwritten outline reviews, acoustic dictations, and 1 hour dedicated computer typing lab.
              </p>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
              }}
            >
              {DAILY_BATCHES.map((batch) => (
                <div
                  key={batch.id}
                  style={{
                    background: '#F7F5F0',
                    border: '1px solid #D1CBBF',
                    borderRadius: '18px',
                    padding: '26px',
                    boxShadow: '0 2px 12px rgba(22, 22, 26, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#B5ADA0';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 22, 26, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#D1CBBF';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(22, 22, 26, 0.03)';
                  }}
                >
                  <div>
                    {/* Top Chips Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: '#EFECE5',
                        color: '#16161A',
                        border: '1px solid #D6D0C4'
                      }}>
                        {batch.badge}
                      </span>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        background: '#EFECE5',
                        color: '#57534E',
                        border: '1px solid #D6D0C4'
                      }}>
                        {batch.seats}
                      </span>
                    </div>

                    {/* Time & Shift Strip */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#EFECE5',
                      border: '1px solid #D6D0C4',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      marginBottom: '14px',
                      width: 'fit-content'
                    }}>
                      <Clock size={14} color="#991B1B" />
                      <strong style={{ fontSize: '0.88rem', color: '#16161A', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                        {batch.time}
                      </strong>
                      <span style={{ color: '#A8A29E' }}>•</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#57534E' }}>
                        {batch.shift}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16161A', margin: '0 0 8px', lineHeight: 1.35 }}>
                      {batch.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#44403C', lineHeight: 1.6, margin: '0 0 16px' }}>
                      {batch.desc}
                    </p>

                    {/* Details Box */}
                    <div style={{
                      background: '#FAF8F5',
                      border: '1px solid #DFD9CD',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '20px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Volume2 size={14} color="#57534E" />
                          <span style={{ fontSize: '0.8rem', color: '#57534E', fontWeight: 600 }}>Target Speed:</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16161A', background: '#EFECE5', border: '1px solid #D6D0C4', padding: '2px 8px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
                          {batch.speed}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <GraduationCap size={14} color="#57534E" />
                          <span style={{ fontSize: '0.8rem', color: '#57534E', fontWeight: 600 }}>Lead Faculty:</span>
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16161A' }}>
                          {batch.instructor}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Building size={14} color="#57534E" />
                          <span style={{ fontSize: '0.8rem', color: '#57534E', fontWeight: 600 }}>Training Mode:</span>
                        </div>
                        <span style={{ fontSize: '0.82rem', color: '#44403C', fontWeight: 600 }}>
                          {batch.mode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <a
                    href="tel:+919204123453"
                    style={{
                      width: '100%',
                      background: '#16161A',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(22, 22, 26, 0.15)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#27272A'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#16161A'}
                  >
                    <Phone size={14} color="#FFFFFF" />
                    <span>Inquire / Reserve Batch Seat</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            TAB 2: WEEKLY TIMETABLE
            --------------------------------------------------------------------- */}
        {activeTab === 'timetable' && (
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'left', marginBottom: '28px' }}>
              <span style={{
                display: 'inline-block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#991B1B',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '8px'
              }}>
                Routine &amp; Lab Schedule • Monday to Saturday
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#16161A', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Weekly Examination &amp; Dictation Routine
              </h2>
              <p style={{ fontSize: '1rem', color: '#44403C', maxWidth: '760px', margin: 0, lineHeight: 1.6 }}>
                Monday to Saturday active training program at Gaya Shorthand Classes (Opposite Cyber Thana, Gaya).
              </p>
            </div>

            <div 
              style={{
                background: '#F7F5F0',
                border: '1px solid #D1CBBF',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(22, 22, 26, 0.03)'
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
                  <thead>
                    <tr style={{ background: '#E4DFD5', borderBottom: '2px solid #D1CBBF' }}>
                      <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#16161A' }}>Time Slot</th>
                      <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#16161A' }}>Batch Category</th>
                      <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#16161A' }}>Speed Benchmark</th>
                      <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#16161A' }}>Classroom / Lab</th>
                      <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#16161A' }}>Faculty Lead</th>
                      <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#16161A' }}>Daily Focus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        time: '6:00 AM – 8:00 AM',
                        batch: 'Basic Theory (Pitman)',
                        speed: '0 – 60 WPM',
                        isHighlight: false,
                        hall: 'Hall A (Ground Floor)',
                        faculty: 'Shadab Sir (Director)',
                        focus: 'Vowels, Stroke Angles & Daily Homework Check'
                      },
                      {
                        time: '8:30 AM – 10:30 AM',
                        batch: 'SSC Steno Grade C & D',
                        speed: '80 WPM',
                        isHighlight: true,
                        hall: 'Computer Lab 1 (50 PCs)',
                        faculty: 'Shadab Sir & Lab Head',
                        focus: 'Reading Room + Kruti Dev / Mangal Typing'
                      },
                      {
                        time: '11:00 AM – 1:00 PM',
                        batch: 'Computer Diplomas (DCA/ADCA)',
                        speed: 'Typing Studio',
                        isHighlight: false,
                        hall: 'Computer Lab 2',
                        faculty: 'Computer Faculty',
                        focus: 'MS Office Suite, Tally Prime, Internet Operations'
                      },
                      {
                        time: '3:00 PM – 5:00 PM',
                        batch: 'High Court Judicial Bench',
                        speed: '100 WPM',
                        isHighlight: true,
                        hall: 'Acoustic Dictation Hall',
                        faculty: 'Shadab Sir',
                        focus: 'Criminal Appeals, Bail Orders, Court Judgments'
                      },
                      {
                        time: '5:30 PM – 7:30 PM',
                        batch: 'Parliament / Assembly Master',
                        speed: '120 WPM',
                        isHighlight: true,
                        hall: 'Audio Broadcast Room',
                        faculty: 'Senior Master',
                        focus: 'Fast Speed Pacing, Contractions & Transcriptions'
                      }
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        style={{ borderBottom: idx === 4 ? 'none' : '1px solid #DFD9CD', transition: 'background 0.15s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#EFECE5'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#F7F5F0'}
                      >
                        <td style={{ padding: '14px 18px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#16161A', fontSize: '0.85rem' }}>
                          {row.time}
                        </td>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: '#16161A', fontSize: '0.88rem' }}>
                          {row.batch}
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '3px 9px',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            fontFamily: "'JetBrains Mono', monospace",
                            background: row.isHighlight ? '#FAF0F0' : '#EFECE5',
                            color: row.isHighlight ? '#991B1B' : '#57534E',
                            border: `1px solid ${row.isHighlight ? '#F5C6C6' : '#D6D0C4'}`
                          }}>
                            {row.speed}
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px', color: '#57534E', fontSize: '0.84rem', fontWeight: 600 }}>
                          {row.hall}
                        </td>
                        <td style={{ padding: '14px 18px', color: '#16161A', fontSize: '0.84rem', fontWeight: 700 }}>
                          {row.faculty}
                        </td>
                        <td style={{ padding: '14px 18px', color: '#44403C', fontSize: '0.84rem', lineHeight: 1.5 }}>
                          {row.focus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div 
                style={{
                  background: '#EFECE5',
                  borderTop: '1px solid #D1CBBF',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.84rem',
                  color: '#44403C'
                }}
              >
                <Sparkles size={15} color="#991B1B" />
                <span><strong style={{ color: '#16161A' }}>Sunday Special:</strong> Full-length 100-mark mock examinations held every Sunday 9:00 AM – 1:00 PM with software-evaluated accuracy scorecards.</span>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            TAB 3: ACCREDITED COMPUTER DIPLOMAS
            --------------------------------------------------------------------- */}
        {activeTab === 'diplomas' && (
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'left', marginBottom: '28px' }}>
              <span style={{
                display: 'inline-block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#991B1B',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '8px'
              }}>
                Government Recognized Certifications
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#16161A', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Accredited Computer Diplomas &amp; Certificates
              </h2>
              <p style={{ fontSize: '1rem', color: '#44403C', maxWidth: '760px', margin: 0, lineHeight: 1.6 }}>
                Recognized for all Central &amp; State Government recruitments, High Courts, Civil Courts, and BSSC verification.
              </p>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
              }}
            >
              {/* DCA Card */}
              <div
                style={{
                  background: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderRadius: '18px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 12px rgba(22, 22, 26, 0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#B5ADA0';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 22, 26, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#D1CBBF';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(22, 22, 26, 0.03)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#EFECE5', border: '1px solid #D1CBBF', color: '#57534E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Award size={22} />
                    </div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px', background: '#EFECE5', color: '#57534E', border: '1px solid #D6D0C4' }}>
                      6 Months Course
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16161A', margin: '0 0 8px', lineHeight: 1.35 }}>
                    DCA (Diploma in Computer Applications)
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#44403C', lineHeight: 1.6, margin: '0 0 18px' }}>
                    Covers computer fundamentals, Windows OS, MS Office suite (Word, Excel, PowerPoint), and speed touch typing.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#44403C' }}>
                      <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0 }} />
                      <span>Government recognized certificate</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#44403C' }}>
                      <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0 }} />
                      <span>Online QR code &amp; Roll verification</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#44403C' }}>
                      <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0 }} />
                      <span>Valid for Clerk &amp; Data Entry Operator posts</span>
                    </div>
                  </div>
                </div>
                <a
                  href="tel:+919204123453"
                  style={{
                    width: '100%',
                    background: '#16161A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(22, 22, 26, 0.15)',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#27272A'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#16161A'}
                >
                  <Phone size={14} color="#FFFFFF" />
                  <span>Inquire for DCA Program</span>
                </a>
              </div>

              {/* ADCA Card (Featured) */}
              <div
                style={{
                  background: '#FAF8F5',
                  border: '2px solid #991B1B',
                  borderTop: '4px solid #991B1B',
                  borderRadius: '18px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 30px rgba(153, 27, 27, 0.08)',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(153, 27, 27, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(153, 27, 27, 0.08)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#991B1B',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '3px 14px',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 8px rgba(153, 27, 27, 0.3)'
                }}>
                  ★ Most Preferred for Govt Jobs
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', marginTop: '4px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#FAF0F0', border: '1px solid #F5C6C6', color: '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldCheck size={22} />
                    </div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px', background: '#FAF0F0', color: '#991B1B', border: '1px solid #F5C6C6' }}>
                      1 Year (12 Months)
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16161A', margin: '0 0 8px', lineHeight: 1.35 }}>
                    ADCA (Advance Diploma in Computer Applications)
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#44403C', lineHeight: 1.6, margin: '0 0 18px' }}>
                    Advanced comprehensive diploma covering DCA syllabus plus Tally ERP, database management, and office automation.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#44403C' }}>
                      <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0 }} />
                      <span>Mandatory qualification for multiple govt posts</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#44403C' }}>
                      <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0 }} />
                      <span>Hands-on practical lab training (50+ PCs)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#44403C' }}>
                      <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0 }} />
                      <span>Official grade sheet &amp; verifiable diploma</span>
                    </div>
                  </div>
                </div>
                <a
                  href="tel:+919204123453"
                  style={{
                    width: '100%',
                    background: '#991B1B',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(153, 27, 27, 0.25)',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#7F1D1D'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#991B1B'}
                >
                  <Phone size={14} color="#FFFFFF" />
                  <span>Inquire for ADCA Program</span>
                </a>
              </div>

              {/* Tally Prime Card */}
              <div
                style={{
                  background: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderRadius: '18px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 12px rgba(22, 22, 26, 0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#B5ADA0';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 22, 26, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#D1CBBF';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(22, 22, 26, 0.03)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#EFECE5', border: '1px solid #D1CBBF', color: '#57534E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <GraduationCap size={22} />
                    </div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px', background: '#EFECE5', color: '#57534E', border: '1px solid #D6D0C4' }}>
                      3 Months Specialization
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16161A', margin: '0 0 8px', lineHeight: 1.35 }}>
                    Tally Prime with GST Certification
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#44403C', lineHeight: 1.6, margin: '0 0 18px' }}>
                    Professional financial accounting, inventory management, GST compliance, and billing voucher generation.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#44403C' }}>
                      <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0 }} />
                      <span>Modern Tally Prime software version</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#44403C' }}>
                      <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0 }} />
                      <span>Real business balance sheet practice</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#44403C' }}>
                      <CheckCircle2 size={15} color="#991B1B" style={{ flexShrink: 0 }} />
                      <span>Secretariat &amp; accounting clerk ready</span>
                    </div>
                  </div>
                </div>
                <a
                  href="tel:+919204123453"
                  style={{
                    width: '100%',
                    background: '#16161A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(22, 22, 26, 0.15)',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#27272A'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#16161A'}
                >
                  <Phone size={14} color="#FFFFFF" />
                  <span>Inquire for Tally Course</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            TAB 4: RECRUITMENT NOTICES
            --------------------------------------------------------------------- */}
        {activeTab === 'notices' && (
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'left', marginBottom: '28px' }}>
              <span style={{
                display: 'inline-block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#991B1B',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '8px'
              }}>
                Official Recruitment Bulletin • 2026
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#16161A', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Upcoming Recruitment Notices &amp; Vacancies
              </h2>
              <p style={{ fontSize: '1rem', color: '#44403C', maxWidth: '760px', margin: 0, lineHeight: 1.6 }}>
                Verified recruitment notifications and exam pattern guidelines for High Court, SSC, and state stenographer vacancies.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ANNOUNCEMENTS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#F7F5F0',
                    border: '1px solid #D1CBBF',
                    borderRadius: '18px',
                    padding: '24px 28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                    boxShadow: '0 2px 10px rgba(22, 22, 26, 0.03)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#B5ADA0';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(22, 22, 26, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#D1CBBF';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(22, 22, 26, 0.03)';
                  }}
                >
                  <div style={{ flex: '1 1 500px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: '#EFECE5',
                        color: '#16161A',
                        border: '1px solid #D6D0C4'
                      }}>
                        {item.tag}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#57534E', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                        <Calendar size={13} />
                        <span>{item.date}</span>
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16161A', margin: '0 0 6px', lineHeight: 1.35 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#44403C', lineHeight: 1.6, margin: 0, maxWidth: '820px' }}>
                      {item.description}
                    </p>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => setCurrentTab('courses')}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '10px',
                        background: '#16161A',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 8px rgba(22, 22, 26, 0.15)',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#27272A'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#16161A'}
                    >
                      <span>Explore Preparation Courses</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            TAB 5: SHORTHAND OUTLINES & PHRASEOGRAPHY DICTIONARY
            --------------------------------------------------------------------- */}
        {activeTab === 'outlines' && (
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'left', marginBottom: '28px' }}>
              <span style={{
                display: 'inline-block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#991B1B',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '8px'
              }}>
                Phraseography Vault • Pitman &amp; Hindi
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#16161A', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                Shorthand Outlines &amp; Legal Strokes Dictionary
              </h2>
              <p style={{ fontSize: '1rem', color: '#44403C', maxWidth: '760px', margin: 0, lineHeight: 1.6 }}>
                Master standardized Pitman &amp; Hindi contractions, legal intersections, and high-frequency parliamentary speed phrases.
              </p>
            </div>

            {/* Search Bar & Category Filters */}
            <div style={{ maxWidth: '820px', margin: '0 auto 28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#57534E' }} />
                <input
                  type="text"
                  value={outlineSearch}
                  onChange={(e) => setOutlineSearch(e.target.value)}
                  placeholder="Search terminology, e.g. High Court, Parliament, Police, SLP, Affidavit..."
                  style={{
                    width: '100%',
                    padding: '14px 44px 14px 48px',
                    borderRadius: '12px',
                    border: '1.5px solid #D1CBBF',
                    background: '#F7F5F0',
                    fontSize: '0.92rem',
                    color: '#16161A',
                    outline: 'none',
                    boxShadow: '0 2px 6px rgba(22, 22, 26, 0.02)',
                    transition: 'border-color 0.15s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#16161A'}
                  onBlur={(e) => e.target.style.borderColor = '#D1CBBF'}
                />
                {outlineSearch && (
                  <button
                    type="button"
                    onClick={() => setOutlineSearch('')}
                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#57534E', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {['All', 'Legal & Judicial', 'Parliamentary', 'Administrative & Govt'].map((cat) => {
                  const active = outlineCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setOutlineCategory(cat)}
                      style={{
                        padding: '6px 16px',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: active ? 700 : 600,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: active ? '#16161A' : '#D1CBBF',
                        background: active ? '#16161A' : '#F7F5F0',
                        color: active ? '#FFFFFF' : '#57534E',
                        transition: 'all 0.15s ease',
                        boxShadow: active ? '0 2px 8px rgba(22, 22, 26, 0.15)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = '#16161A';
                          e.currentTarget.style.background = '#EFECE5';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = '#57534E';
                          e.currentTarget.style.background = '#F7F5F0';
                        }
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Outlines Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              {SHORTHAND_OUTLINES_DATA
                .filter(item => {
                  const matchCat = outlineCategory === 'All' || item.category === outlineCategory;
                  const matchSearch = !outlineSearch.trim() || 
                    item.term.toLowerCase().includes(outlineSearch.toLowerCase()) ||
                    item.hindiEquivalent.toLowerCase().includes(outlineSearch.toLowerCase()) ||
                    item.ruleDesc.toLowerCase().includes(outlineSearch.toLowerCase()) ||
                    item.shorthandStroke.toLowerCase().includes(outlineSearch.toLowerCase());
                  return matchCat && matchSearch;
                })
                .map(item => (
                  <div
                    key={item.id}
                    style={{
                      background: '#F7F5F0',
                      border: '1px solid #D1CBBF',
                      borderRadius: '16px',
                      padding: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 10px rgba(22, 22, 26, 0.02)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = '#B5ADA0';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(22, 22, 26, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#D1CBBF';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(22, 22, 26, 0.02)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#EFECE5', color: '#57534E', textTransform: 'uppercase', border: '1px solid #D6D0C4' }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#991B1B', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Zap size={13} color="#991B1B" />
                          <span>{item.speedTier}</span>
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#16161A', margin: '0 0 4px', lineHeight: 1.3 }}>
                        {item.term}
                      </h4>
                      <div style={{ fontSize: '0.86rem', color: '#57534E', fontWeight: 600, marginBottom: '14px' }}>
                        {item.hindiEquivalent}
                      </div>

                      {/* Stroke Box */}
                      <div style={{
                        background: '#EFECE5',
                        border: '1px solid #D6D0C4',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        marginBottom: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#991B1B', fontWeight: 800, letterSpacing: '0.06em', marginBottom: '3px', fontFamily: "'JetBrains Mono', monospace" }}>
                            OUTLINE FORMULA (PITMAN)
                          </div>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '0.98rem', color: '#16161A', letterSpacing: '0.5px' }}>
                            {item.shorthandStroke}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(item.shorthandStroke).catch(() => {});
                            setCopiedOutlineId(item.id);
                            setTimeout(() => setCopiedOutlineId(null), 1500);
                          }}
                          style={{
                            background: copiedOutlineId === item.id ? '#FAF0F0' : '#F7F5F0',
                            border: '1px solid',
                            borderColor: copiedOutlineId === item.id ? '#F5C6C6' : '#D1CBBF',
                            borderRadius: '6px',
                            padding: '5px 10px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            color: copiedOutlineId === item.id ? '#991B1B' : '#16161A',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s ease'
                          }}
                          title="Copy Stroke Formula"
                        >
                          {copiedOutlineId === item.id ? (
                            <>
                              <Check size={12} color="#991B1B" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Rule & Pacing Tip */}
                      <div style={{ fontSize: '0.8rem', color: '#44403C', marginBottom: '8px', lineHeight: 1.45 }}>
                        <strong style={{ color: '#16161A' }}>Rule:</strong> {item.ruleType} — {item.ruleDesc}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#16161A', background: '#FAF8F5', border: '1px solid #DFD9CD', padding: '8px 10px', borderRadius: '6px', lineHeight: 1.4 }}>
                        💡 <strong style={{ color: '#16161A' }}>Speed Tip:</strong> {item.speedTip}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          4. CLOSING EDITORIAL OFFLINE CENTER CTA (WARM PARCHMENT CARD)
          ========================================================================= */}
      <section style={{ maxWidth: 1280, margin: '24px auto 64px', padding: '0 24px' }}>
        <div 
          style={{
            background: '#F7F5F0',
            border: '1px solid #D1CBBF',
            borderLeft: '4px solid #991B1B',
            borderRadius: '20px',
            padding: '36px 32px',
            boxShadow: '0 6px 24px rgba(22, 22, 26, 0.04)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', minWidth: '280px', flex: '1 1 420px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '14px',
              background: '#EFECE5',
              border: '1px solid #D1CBBF',
              color: '#991B1B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Building size={26} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#16161A', margin: '0 0 6px', letterSpacing: '-0.015em' }}>
                Join Offline Classroom at{' '}
                <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#991B1B', fontSize: '1.08em' }}>
                  Gaya Shorthand Classes
                </span>
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#57534E', margin: 0, lineHeight: 1.5 }}>
                Gaya College More, Opposite Cyber Thana, Gayaji, Bihar • <strong style={{ color: '#16161A' }}>3 Free Demo Classes Available</strong>
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a 
              href="tel:+919204123453"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#EFECE5',
                color: '#16161A',
                border: '1px solid #D1CBBF',
                padding: '12px 20px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#E4DFD5'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#EFECE5'}
            >
              <Phone size={15} color="#16161A" />
              <span>Call Helpline: 9204123453</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenCheckout ? onOpenCheckout() : null}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#991B1B',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 22px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(153, 27, 27, 0.25)',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#7F1D1D'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#991B1B'}
            >
              <Sparkles size={15} color="#FFFFFF" />
              <span>Book 3 Free Demos</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
