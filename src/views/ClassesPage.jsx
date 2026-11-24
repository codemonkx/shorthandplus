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
import { motion } from 'framer-motion';
import { FadeUp, StaggerContainer, StaggerItem, TRANSITION_EASE } from '../components/MotionPrimitives';
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
        backgroundColor: '#FBF8F3', 
        minHeight: '100vh', 
        width: '100%',
        color: '#231418',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
      }}
    >
      
      {/* =========================================================================
          1. EDITORIAL HERO HEADER (LEFT-ALIGNED WITH NAVBAR CLEARANCE)
          ========================================================================= */}
      <section 
        className="relative overflow-hidden bg-[#FBF8F3] border-b border-[#E5DBD0]"
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FBF8F3',
          borderBottom: '1px solid #E5DBD0',
          paddingTop: '128px',
          paddingBottom: '48px',
          width: '100%',
          boxSizing: 'border-box'
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
          className="sp-courses-container relative z-10"
          style={{ 
            maxWidth: '1280px', 
            margin: '0 auto', 
            paddingLeft: '24px',
            paddingRight: '24px',
            textAlign: 'left',
            boxSizing: 'border-box'
          }}
        >
          <FadeUp>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B', display: 'inline-block' }} />
              <span style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#8A7B7E'
              }}>
                Offline Gaya Center &amp; Live Google Meet Broadcast
              </span>
            </div>

            <h1 
              style={{ 
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2.35rem, 4vw, 3.65rem)',
                fontWeight: 400, 
                color: '#231418', 
                letterSpacing: '-0.02em', 
                margin: '8px 0 16px',
                lineHeight: 1.05
              }}
            >
              Classroom Batches, Timetable &amp;{' '}
              <span style={{ 
                fontStyle: 'italic', 
                color: '#991B1B'
              }}>
                Live Dictations.
              </span>
            </h1>

            <p 
              style={{ 
                fontSize: '16px', 
                color: '#594A4D', 
                lineHeight: 1.6, 
                maxWidth: '820px', 
                margin: 0 
              }}
            >
              Attend daily in-person classes at our Gaya academy or access live broadcast Google Meet dictations from anywhere. Daily batches guided by{' '}
              <strong style={{ color: '#231418', fontWeight: 600 }}>Shadab Sir (12+ Years Experience)</strong>{' '}
              spanning <span style={{ whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: '#231418' }}>6:00 AM – 8:00 PM</span>.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* =========================================================================
          2. RECESSED FULL-WIDTH TAB DOCK (SINGLE HORIZONTAL ROW)
          ========================================================================= */}
      <div 
        style={{
          width: '100%',
          backgroundColor: 'rgba(239, 231, 220, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #E0D5C7',
          padding: '12px 0',
          position: 'sticky',
          top: '76px',
          zIndex: 30,
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="sp-courses-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            scrollbarWidth: 'none'
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
                style={active ? {
                  backgroundColor: '#FFFFFF',
                  color: '#231418',
                  fontWeight: 600,
                  border: '1px solid #E0D5C7',
                  borderRadius: '9999px',
                  padding: '7px 16px',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(35, 20, 24, 0.06)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  flexShrink: 0
                } : {
                  background: 'transparent',
                  color: '#594A4D',
                  fontWeight: 500,
                  border: '1px solid transparent',
                  borderRadius: '9999px',
                  padding: '7px 16px',
                  fontSize: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = '#231418';
                    e.currentTarget.style.backgroundColor = 'rgba(251, 248, 243, 0.7)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = '#594A4D';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {tab.hasDot && (
                  <span style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: '#991B1B',
                    display: 'inline-block',
                    flexShrink: 0
                  }} />
                )}
                {IconComponent && <IconComponent size={13} style={{ color: active ? '#991B1B' : '#8A7B7E' }} />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          3. MAIN TAB CONTENT CONTAINER
          ========================================================================= */}
      <div 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: activeTab === 'online-live' ? '36px 0 0' : '36px 24px 48px',
          boxSizing: 'border-box'
        }}
      >

        {/* ---------------------------------------------------------------------
            TAB 0: LIVE ONLINE GOOGLE MEET STUDIO
            --------------------------------------------------------------------- */}
        {activeTab === 'online-live' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Top Container: Broadcast Card + Capabilities */}
            <div 
              className="sp-courses-container"
              style={{
                maxWidth: '1280px',
                margin: '0 auto',
                paddingLeft: '24px',
                paddingRight: '24px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px'
              }}
            >
              {/* Split Hero Card: Left Broadcast + Right Whiteboard Frame */}
              <FadeUp>
                <div 
                  className="sp-courses-hero-2col"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8DFD3',
                    borderRadius: '16px',
                    padding: '32px',
                    boxShadow: '0 10px 30px rgba(35, 20, 24, 0.05)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '32px',
                    alignItems: 'stretch',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Left Broadcast Card (lg:col-span-7) */}
                  <div 
                    className="sp-courses-hero-col-left"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minWidth: 0
                    }}
                  >
                    <div>
                      {/* Status Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        <span 
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            backgroundColor: '#FDF2F2',
                            border: '1px solid #FBD5D5',
                            color: '#991B1B',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '11px',
                            fontWeight: 700,
                            fontFamily: "'JetBrains Mono', monospace",
                            textTransform: 'uppercase',
                            letterSpacing: '0.14em'
                          }}
                        >
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B', display: 'inline-block' }} />
                          <span>{activeClass?.isLive ? 'LIVE BROADCAST ACTIVE' : (activeClass?.tag || 'UPCOMING BROADCAST')}</span>
                        </span>
                        <span 
                          style={{
                            backgroundColor: '#EFE7DC',
                            border: '1px solid #E0D5C7',
                            color: '#594A4D',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '11px',
                            fontWeight: 600,
                            fontFamily: "'JetBrains Mono', monospace"
                          }}
                        >
                          {activeClass?.roomNo?.replace(/Zoom Room/g, 'Google Meet Room') || 'Google Meet Room #01 (Studio Live)'}
                        </span>
                        <span 
                          style={{
                            color: '#8A7B7E',
                            fontSize: '12px',
                            fontFamily: "'JetBrains Mono', monospace",
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Users size={13} style={{ color: '#8A7B7E' }} />
                          <span>{activeClass ? (activeClass.attendees || 1) : 142} Active Candidates</span>
                        </span>
                      </div>

                      <h2 
                        style={{ 
                          fontFamily: "'Instrument Serif', Georgia, serif",
                          fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', 
                          fontWeight: 400, 
                          color: '#231418', 
                          lineHeight: 1.1, 
                          margin: '12px 0 10px',
                          letterSpacing: '-0.015em'
                        }}
                      >
                        {activeClass?.title || 'SSC Stenographer Grade C & D — 80 WPM Live Speed Dictation & Transcription Lab'}
                      </h2>

                      <p style={{ fontSize: '14px', color: '#594A4D', lineHeight: 1.6, margin: 0 }}>
                        Conducted by <strong style={{ color: '#231418', fontWeight: 600 }}>{activeClass?.instructor || 'Shadab Sir'}</strong> ({activeClass?.instructorRole || '12+ Years Experience'}). {activeClass?.description || 'Real-time 5-minute parliamentary dictation, synchronized digital shorthand whiteboard with interactive student drawing, live audio player with 0.8x-1.3x pacing, and immediate transcription grading.'}
                      </p>
                    </div>

                    {/* Google Meet Credentials Box (Flush hairline metadata strip) */}
                    <div 
                      style={{
                        margin: '20px 0',
                        padding: '14px 0',
                        borderTop: '1px solid #EDE5DA',
                        borderBottom: '1px solid #EDE5DA',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '16px'
                      }}
                    >
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                        <span style={{ color: '#8A7B7E', fontWeight: 500 }}>Meet Code:</span>
                        <strong style={{ fontFamily: "'JetBrains Mono', monospace", color: '#231418', fontWeight: 700 }}>
                          {activeClass?.meetCode || activeClass?.zoomMeetingId || 'stenoplus-live'}
                        </strong>
                        <button 
                          type="button" 
                          onClick={handleCopyId}
                          title="Copy Meeting Code"
                          style={{ 
                            border: '1px solid #E0D5C7', 
                            backgroundColor: '#FBF8F3', 
                            color: '#231418',
                            padding: '3px 8px', 
                            borderRadius: '9999px', 
                            cursor: 'pointer', 
                            fontSize: '11px', 
                            fontWeight: 600, 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '4px' 
                          }}
                        >
                          {copiedId ? <Check size={11} style={{ color: '#991B1B' }} /> : <Copy size={11} />}
                          <span>{copiedId ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <span style={{ color: '#8A7B7E', fontWeight: 500 }}>Platform:</span>
                        <strong style={{ color: '#231418', fontWeight: 600 }}>Google Meet</strong>
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <span style={{ color: '#8A7B7E', fontWeight: 500 }}>Schedule:</span>
                        <span style={{ color: '#231418', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                          {activeClass?.time || '8:30 AM (60m)'}
                        </span>
                      </div>
                    </div>

                    {/* Primary Action Buttons (Side-by-side rounded-full pills) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <button 
                        type="button"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#991B1B',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '9999px',
                          padding: '12px 24px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          boxShadow: '0 8px 20px rgba(153, 27, 27, 0.20)',
                          whiteSpace: 'nowrap',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7F1D1D'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#991B1B'}
                        onClick={() => {
                          if (onSelectClass && activeClass) {
                            onSelectClass(activeClass.id);
                          } else {
                            setCurrentTab('online-classes');
                          }
                        }}
                      >
                        <Video size={15} />
                        <span>Enter Live Meet Studio (In-Browser) &rarr;</span>
                      </button>

                      <a 
                        href={activeClass?.meetUrl || activeClass?.googleMeetUrl || (activeClass?.zoomDirectUrl?.includes('meet.google') ? activeClass.zoomDirectUrl : 'https://meet.google.com/gsc-steno-live')}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#FBF8F3',
                          color: '#231418',
                          border: '1px solid #D8CCBE',
                          borderRadius: '9999px',
                          padding: '12px 20px',
                          fontSize: '13px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EFE7DC'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FBF8F3'}
                      >
                        <ExternalLink size={14} />
                        <span>Launch in Google Meet</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Preview Card / Whiteboard Teaser (lg:col-span-5) */}
                  <div 
                    className="sp-courses-hero-col-right"
                    style={{
                      backgroundColor: '#FBF8F3',
                      border: '1px solid #E8DFD3',
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxSizing: 'border-box',
                      minWidth: 0
                    }}
                  >
                    <div>
                      <div 
                        style={{
                          backgroundColor: '#EFE7DC',
                          border: '1px solid #E0D5C7',
                          borderRadius: '10px 10px 0 0',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '11px',
                          fontWeight: 700,
                          fontFamily: "'JetBrains Mono', monospace",
                          color: '#594A4D'
                        }}
                      >
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#059669' }} />
                        <span>STUDIO WHITEBOARD FEED &middot; 1080P HD</span>
                      </div>

                      <div 
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E8DFD3',
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
                            backgroundColor: '#231418',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '14px'
                          }}>
                            SS
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#231418', fontSize: '15px' }}>Shadab Sir (Host)</div>
                            <div style={{ fontSize: '12px', color: '#8A7B7E' }}>Faculty Director (12+ Yrs Exp)</div>
                          </div>
                        </div>

                        <div 
                          style={{
                            backgroundColor: '#FAF7F2',
                            border: '1px solid #EDE5DA',
                            borderRadius: '10px',
                            padding: '14px',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.25rem', letterSpacing: '4px', color: '#231418', fontWeight: 700, marginBottom: '4px' }}>
                            / &mdash; \ ) ⌒ ⌣ ⌢
                          </div>
                          <div style={{ fontSize: '12px', fontStyle: 'italic', color: '#594A4D' }}>
                            "Parliamentary Motion on State Infrastructure..."
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#594A4D' }}>
                            <CheckCircle2 size={14} style={{ color: '#991B1B', flexShrink: 0 }} />
                            <span>Direct Google Meet Classroom Entrance &amp; 1-Click Access</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#594A4D' }}>
                            <CheckCircle2 size={14} style={{ color: '#991B1B', flexShrink: 0 }} />
                            <span>Real 80-104 WPM Speed-Pitch Dictation Player</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#594A4D' }}>
                            <CheckCircle2 size={14} style={{ color: '#991B1B', flexShrink: 0 }} />
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
                          borderRadius: '9999px', 
                          backgroundColor: '#231418', 
                          color: '#FAF6F0', 
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 2px 8px rgba(35, 20, 24, 0.15)',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3A2228'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#231418'}
                      >
                        <span>Join Live Online Classroom &rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Online Classes Features Trio (3 Studio Capability Cards) */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '24px'
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
                ].map((feat, idx) => {
                  const IconComponent = feat.icon;
                  return (
                    <FadeUp key={feat.num} delay={idx * 0.08}>
                      <div 
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E8DFD3',
                          borderRadius: '16px',
                          padding: '24px',
                          boxShadow: '0 4px 18px rgba(35, 20, 24, 0.03)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                          height: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '10px',
                            backgroundColor: '#FBF8F3',
                            border: '1px solid #E8DFD3',
                            color: '#231418',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <IconComponent size={20} />
                          </div>
                          <span style={{
                            fontFamily: "'Instrument Serif', Georgia, serif",
                            fontSize: '1.5rem',
                            lineHeight: 1,
                            color: '#8A7B7E',
                            fontWeight: 400
                          }}>
                            {feat.num}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#231418', margin: '4px 0 0', lineHeight: 1.35 }}>
                          {feat.title}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#594A4D', lineHeight: 1.6, margin: 0 }}>
                          {feat.desc}
                        </p>
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>

            {/* All 4 Daily Google Meet Batches Schedule (Alternating Warm Sand Band) */}
            <section 
              style={{
                width: '100%',
                backgroundColor: '#EFE7DC',
                borderTop: '1px solid #E0D5C7',
                borderBottom: '1px solid #E0D5C7',
                padding: '64px 0',
                marginTop: '48px',
                boxSizing: 'border-box'
              }}
            >
              <div 
                className="sp-courses-container"
                style={{
                  maxWidth: '1280px',
                  margin: '0 auto',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  boxSizing: 'border-box'
                }}
              >
                <FadeUp>
                  <div style={{ marginBottom: '28px' }}>
                    <span style={{ 
                      fontFamily: "'JetBrains Mono', monospace", 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      color: '#991B1B', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.18em',
                      display: 'block',
                      marginBottom: '6px'
                    }}>
                      DAILY BROADCAST TIMETABLE
                    </span>
                    <h2 
                      style={{ 
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontSize: 'clamp(1.875rem, 3.2vw, 2.65rem)', 
                        fontWeight: 400, 
                        color: '#231418', 
                        margin: '0 0 6px',
                        letterSpacing: '-0.015em'
                      }}
                    >
                      All 4 daily online <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>Google Meet</span> dictation batches.
                    </h2>
                    <p style={{ fontSize: '14px', color: '#594A4D', margin: 0 }}>
                      All online sessions are recorded and available for replay 24/7 in the Candidate Portal.
                    </p>
                  </div>
                </FadeUp>

                {/* 4-Column Desktop Grid */}
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '20px'
                  }}
                >
                  {(onlineClasses && onlineClasses.length > 0 ? onlineClasses : [
                    { id: 'class-theory-2', time: '6:00 AM – 8:00 AM', tag: 'Recording Ready', title: 'Basic Pitman Theory & New Strokes', speed: 'Beginners (0 - 60 WPM)', meetCode: 'gsc-theory-am', zoomMeetingId: 'gsc-theory-am' },
                    { id: 'class-live-1', isLive: true, time: '8:30 AM – 10:30 AM', tag: '● Active Live', title: 'SSC Grade C & D 80 WPM Speed Lab', speed: '80 WPM Standard', meetCode: 'gsc-steno-live', zoomMeetingId: 'gsc-steno-live' },
                    { id: 'class-judicial-3', time: '3:00 PM – 5:00 PM', tag: 'Starts 3:00 PM', title: 'High Court Judicial 100 WPM Bench', speed: '100 WPM Judicial', meetCode: 'gsc-court-pm', zoomMeetingId: 'gsc-court-pm' },
                    { id: 'class-reporter-4', time: '5:30 PM – 7:30 PM', tag: 'Starts 5:30 PM', title: 'Assembly Reporter 120+ WPM Elite', speed: '120-140 WPM', meetCode: 'gsc-assembly-eve', zoomMeetingId: 'gsc-assembly-eve' }
                  ]).map((b, idx) => (
                    <FadeUp key={b.id} delay={idx * 0.06}>
                      <div 
                        style={b.isLive ? {
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #DFD3C5',
                          borderTop: '4px solid #991B1B',
                          borderRadius: '16px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '14px',
                          boxShadow: '0 12px 28px rgba(35, 20, 24, 0.07)',
                          height: '100%',
                          boxSizing: 'border-box'
                        } : {
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E8DFD3',
                          borderRadius: '16px',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '14px',
                          boxShadow: '0 4px 16px rgba(35, 20, 24, 0.03)',
                          height: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '12px' }}>
                            <span style={{
                              color: '#231418',
                              fontSize: '12px',
                              fontWeight: 700,
                              fontFamily: "'JetBrains Mono', monospace"
                            }}>
                              {b.time}
                            </span>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              color: b.isLive ? '#991B1B' : '#8A7B7E',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontFamily: "'JetBrains Mono', monospace",
                              textTransform: 'uppercase'
                            }}>
                              {b.isLive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B' }} />}
                              {b.isLive ? 'LIVE NOW' : b.tag}
                            </span>
                          </div>

                          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#231418', margin: '0 0 10px', lineHeight: 1.35 }}>
                            {b.title}
                          </h4>

                          <div 
                            style={{
                              margin: '12px 0',
                              padding: '10px 0',
                              borderTop: '1px solid #EDE5DA',
                              borderBottom: '1px solid #EDE5DA',
                              fontSize: '11px',
                              fontFamily: "'JetBrains Mono', monospace",
                              color: '#594A4D'
                            }}
                          >
                            <span style={{ color: '#991B1B', fontWeight: 600 }}>{b.speed}</span> &middot; Meet: {b.meetCode || b.zoomMeetingId}
                          </div>
                        </div>

                        <button 
                          type="button"
                          onClick={() => {
                            if (onSelectClass) {
                              onSelectClass(b.id);
                            } else {
                              setCurrentTab('online-classes');
                            }
                          }}
                          style={b.isLive ? {
                            width: '100%',
                            padding: '10px 16px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            border: 'none',
                            backgroundColor: '#991B1B',
                            color: '#FFFFFF',
                            boxShadow: '0 2px 8px rgba(153, 27, 27, 0.25)',
                            transition: 'all 0.15s ease'
                          } : {
                            width: '100%',
                            padding: '10px 16px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            border: '1px solid #DCD0C2',
                            backgroundColor: '#FBF8F3',
                            color: '#231418',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = b.isLive ? '#7F1D1D' : '#231418';
                            if (!b.isLive) e.currentTarget.style.color = '#FAF6F0';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = b.isLive ? '#991B1B' : '#FBF8F3';
                            if (!b.isLive) e.currentTarget.style.color = '#231418';
                          }}
                        >
                          <span>{b.isLive ? 'Enter Live Classroom →' : 'View Session Details →'}</span>
                        </button>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            TAB 1: DAILY ACADEMY BATCHES
            --------------------------------------------------------------------- */}
        {activeTab === 'batches' && (
          <div className="sp-courses-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
            <FadeUp>
              <div style={{ textAlign: 'left', marginBottom: '28px' }}>
                <span style={{
                  display: 'inline-block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#991B1B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  marginBottom: '8px'
                }}>
                  CLASSROOM &amp; ONLINE SCHEDULE &middot; ESTD. 2012
                </span>
                <h2 
                  style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.875rem, 3vw, 2.65rem)', 
                    fontWeight: 400, 
                    color: '#231418', 
                    margin: '0 0 10px', 
                    letterSpacing: '-0.015em',
                    lineHeight: 1.1
                  }}
                >
                  Daily classroom batches at <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>Gaya Center.</span>
                </h2>
                <p style={{ fontSize: '15px', color: '#594A4D', maxWidth: '760px', margin: 0, lineHeight: 1.6 }}>
                  Structured offline training batches from 6:00 AM to 8:00 PM with daily handwritten outline reviews, acoustic dictations, and 1 hour dedicated computer typing lab.
                </p>
              </div>
            </FadeUp>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}
            >
              {DAILY_BATCHES.map((batch, idx) => (
                <FadeUp key={batch.id} delay={idx * 0.06}>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8DFD3',
                      borderRadius: '16px',
                      padding: '26px',
                      boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = '#D4C6B6';
                      e.currentTarget.style.boxShadow = '0 10px 28px rgba(35, 20, 24, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#E8DFD3';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(35, 20, 24, 0.04)';
                    }}
                  >
                    <div>
                      {/* Top Chips Row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          backgroundColor: '#EFE7DC',
                          color: '#991B1B',
                          border: '1px solid #E0D5C7'
                        }}>
                          {batch.badge}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          backgroundColor: '#FAF7F2',
                          color: '#594A4D',
                          border: '1px solid #EDE5DA'
                        }}>
                          {batch.seats}
                        </span>
                      </div>

                      {/* Time & Shift Strip */}
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#FAF7F2',
                        border: '1px solid #EDE5DA',
                        borderRadius: '9999px',
                        padding: '6px 14px',
                        marginBottom: '14px',
                        width: 'fit-content'
                      }}>
                        <Clock size={14} style={{ color: '#991B1B' }} />
                        <strong style={{ fontSize: '13px', color: '#231418', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                          {batch.time}
                        </strong>
                        <span style={{ color: '#CBBCC0' }}>&middot;</span>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#594A4D' }}>
                          {batch.shift}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '0 0 8px', lineHeight: 1.35 }}>
                        {batch.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#594A4D', lineHeight: 1.55, margin: '0 0 16px' }}>
                        {batch.desc}
                      </p>

                      {/* Details Box */}
                      <div style={{
                        backgroundColor: '#FAF7F2',
                        border: '1px solid #EDE5DA',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        marginBottom: '20px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Volume2 size={14} style={{ color: '#8A7B7E' }} />
                            <span style={{ fontSize: '12px', color: '#594A4D', fontWeight: 500 }}>Target Speed:</span>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B', backgroundColor: '#FFFFFF', border: '1px solid #E0D5C7', padding: '2px 8px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
                            {batch.speed}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <GraduationCap size={14} style={{ color: '#8A7B7E' }} />
                            <span style={{ fontSize: '12px', color: '#594A4D', fontWeight: 500 }}>Lead Faculty:</span>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#231418' }}>
                            {batch.instructor}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Building size={14} style={{ color: '#8A7B7E' }} />
                            <span style={{ fontSize: '12px', color: '#594A4D', fontWeight: 500 }}>Training Mode:</span>
                          </div>
                          <span style={{ fontSize: '12px', color: '#594A4D', fontWeight: 500 }}>
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
                        backgroundColor: '#231418',
                        color: '#FAF6F0',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 8px rgba(35, 20, 24, 0.15)',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3A2228'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#231418'}
                    >
                      <Phone size={14} style={{ color: '#FAF6F0' }} />
                      <span>Inquire / Reserve Batch Seat</span>
                    </a>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            TAB 2: WEEKLY TIMETABLE
            --------------------------------------------------------------------- */}
        {activeTab === 'timetable' && (
          <div className="sp-courses-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
            <FadeUp>
              <div style={{ textAlign: 'left', marginBottom: '28px' }}>
                <span style={{
                  display: 'inline-block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#991B1B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  marginBottom: '8px'
                }}>
                  ROUTINE &amp; LAB SCHEDULE &middot; MONDAY TO SATURDAY
                </span>
                <h2 
                  style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.875rem, 3vw, 2.65rem)', 
                    fontWeight: 400, 
                    color: '#231418', 
                    margin: '0 0 10px', 
                    letterSpacing: '-0.015em',
                    lineHeight: 1.1
                  }}
                >
                  Weekly examination &amp; <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>dictation routine.</span>
                </h2>
                <p style={{ fontSize: '15px', color: '#594A4D', maxWidth: '760px', margin: 0, lineHeight: 1.6 }}>
                  Monday to Saturday active training program at Gaya Shorthand Classes (Opposite Cyber Thana, Gaya).
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8DFD3',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)'
                }}
              >
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#EFE7DC', borderBottom: '1px solid #E0D5C7' }}>
                        <th style={{ padding: '14px 18px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#231418' }}>Time Slot</th>
                        <th style={{ padding: '14px 18px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#231418' }}>Batch Category</th>
                        <th style={{ padding: '14px 18px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#231418' }}>Speed Benchmark</th>
                        <th style={{ padding: '14px 18px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#231418' }}>Classroom / Lab</th>
                        <th style={{ padding: '14px 18px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#231418' }}>Faculty Lead</th>
                        <th style={{ padding: '14px 18px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#231418' }}>Daily Focus</th>
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
                          style={{ borderBottom: idx === 4 ? 'none' : '1px solid #EDE5DA', transition: 'background-color 0.15s ease' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAF7F2'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <td style={{ padding: '14px 18px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: '#231418', fontSize: '13px' }}>
                            {row.time}
                          </td>
                          <td style={{ padding: '14px 18px', fontWeight: 700, color: '#231418', fontSize: '14px' }}>
                            {row.batch}
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '3px 10px',
                              borderRadius: '9999px',
                              fontSize: '11px',
                              fontWeight: 700,
                              fontFamily: "'JetBrains Mono', monospace",
                              backgroundColor: row.isHighlight ? '#EFE7DC' : '#FAF7F2',
                              color: row.isHighlight ? '#991B1B' : '#594A4D',
                              border: `1px solid ${row.isHighlight ? '#E0D5C7' : '#EDE5DA'}`
                            }}>
                              {row.speed}
                            </span>
                          </td>
                          <td style={{ padding: '14px 18px', color: '#594A4D', fontSize: '13px', fontWeight: 500 }}>
                            {row.hall}
                          </td>
                          <td style={{ padding: '14px 18px', color: '#231418', fontSize: '13px', fontWeight: 600 }}>
                            {row.faculty}
                          </td>
                          <td style={{ padding: '14px 18px', color: '#594A4D', fontSize: '13px', lineHeight: 1.5 }}>
                            {row.focus}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div 
                  style={{
                    backgroundColor: '#FAF7F2',
                    borderTop: '1px solid #EDE5DA',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#594A4D'
                  }}
                >
                  <Sparkles size={15} style={{ color: '#991B1B', flexShrink: 0 }} />
                  <span><strong style={{ color: '#231418', fontWeight: 600 }}>Sunday Special:</strong> Full-length 100-mark mock examinations held every Sunday 9:00 AM – 1:00 PM with software-evaluated accuracy scorecards.</span>
                </div>
              </div>
            </FadeUp>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            TAB 3: ACCREDITED COMPUTER DIPLOMAS
            --------------------------------------------------------------------- */}
        {activeTab === 'diplomas' && (
          <div className="sp-courses-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
            <FadeUp>
              <div style={{ textAlign: 'left', marginBottom: '28px' }}>
                <span style={{
                  display: 'inline-block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#991B1B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  marginBottom: '8px'
                }}>
                  GOVERNMENT RECOGNIZED CERTIFICATIONS
                </span>
                <h2 
                  style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.875rem, 3vw, 2.65rem)', 
                    fontWeight: 400, 
                    color: '#231418', 
                    margin: '0 0 10px', 
                    letterSpacing: '-0.015em',
                    lineHeight: 1.1
                  }}
                >
                  Accredited computer <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>diplomas &amp; certificates.</span>
                </h2>
                <p style={{ fontSize: '15px', color: '#594A4D', maxWidth: '760px', margin: 0, lineHeight: 1.6 }}>
                  Recognized for all Central &amp; State Government recruitments, High Courts, Civil Courts, and BSSC verification.
                </p>
              </div>
            </FadeUp>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
              }}
            >
              {/* DCA Card */}
              <FadeUp delay={0.06}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8DFD3',
                    borderRadius: '16px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)',
                    height: '100%',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#D4C6B6';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(35, 20, 24, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#E8DFD3';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(35, 20, 24, 0.04)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#FBF8F3', border: '1px solid #E8DFD3', color: '#231418', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Award size={22} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '9999px', backgroundColor: '#EFE7DC', color: '#594A4D', border: '1px solid #E0D5C7' }}>
                        6 Months Course
                      </span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '0 0 8px', lineHeight: 1.35 }}>
                      DCA (Diploma in Computer Applications)
                    </h3>
                    <p style={{ fontSize: '13px', color: '#594A4D', lineHeight: 1.55, margin: '0 0 18px' }}>
                      Covers computer fundamentals, Windows OS, MS Office suite (Word, Excel, PowerPoint), and speed touch typing.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#594A4D' }}>
                        <CheckCircle2 size={15} style={{ color: '#991B1B', flexShrink: 0 }} />
                        <span>Government recognized certificate</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#594A4D' }}>
                        <CheckCircle2 size={15} style={{ color: '#991B1B', flexShrink: 0 }} />
                        <span>Online QR code &amp; Roll verification</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#594A4D' }}>
                        <CheckCircle2 size={15} style={{ color: '#991B1B', flexShrink: 0 }} />
                        <span>Valid for Clerk &amp; Data Entry Operator posts</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="tel:+919204123453"
                    style={{
                      width: '100%',
                      backgroundColor: '#231418',
                      color: '#FAF6F0',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(35, 20, 24, 0.15)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3A2228'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#231418'}
                  >
                    <Phone size={14} style={{ color: '#FAF6F0' }} />
                    <span>Inquire for DCA Program</span>
                  </a>
                </div>
              </FadeUp>

              {/* ADCA Card (Featured with Crimson top accent) */}
              <FadeUp delay={0.12}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DFD3C5',
                    borderTop: '4px solid #991B1B',
                    borderRadius: '16px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 12px 32px rgba(35, 20, 24, 0.07)',
                    height: '100%',
                    boxSizing: 'border-box',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(35, 20, 24, 0.10)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(35, 20, 24, 0.07)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#991B1B',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '3px 14px',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 8px rgba(153, 27, 27, 0.3)'
                  }}>
                    &star; Most Preferred for Govt Jobs
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', marginTop: '4px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#FDF2F2', border: '1px solid #FBD5D5', color: '#991B1B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldCheck size={22} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px', backgroundColor: '#EFE7DC', color: '#991B1B', border: '1px solid #E0D5C7' }}>
                        1 Year (12 Months)
                      </span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '0 0 8px', lineHeight: 1.35 }}>
                      ADCA (Advance Diploma in Computer Applications)
                    </h3>
                    <p style={{ fontSize: '13px', color: '#594A4D', lineHeight: 1.55, margin: '0 0 18px' }}>
                      Advanced comprehensive diploma covering DCA syllabus plus Tally ERP, database management, and office automation.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#594A4D' }}>
                        <CheckCircle2 size={15} style={{ color: '#991B1B', flexShrink: 0 }} />
                        <span>Mandatory qualification for multiple govt posts</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#594A4D' }}>
                        <CheckCircle2 size={15} style={{ color: '#991B1B', flexShrink: 0 }} />
                        <span>Hands-on practical lab training (50+ PCs)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#594A4D' }}>
                        <CheckCircle2 size={15} style={{ color: '#991B1B', flexShrink: 0 }} />
                        <span>Official grade sheet &amp; verifiable diploma</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="tel:+919204123453"
                    style={{
                      width: '100%',
                      backgroundColor: '#991B1B',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(153, 27, 27, 0.20)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7F1D1D'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#991B1B'}
                  >
                    <Phone size={14} style={{ color: '#FFFFFF' }} />
                    <span>Inquire for ADCA Program</span>
                  </a>
                </div>
              </FadeUp>

              {/* Tally Prime Card */}
              <FadeUp delay={0.18}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8DFD3',
                    borderRadius: '16px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)',
                    height: '100%',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#D4C6B6';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(35, 20, 24, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#E8DFD3';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(35, 20, 24, 0.04)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#FBF8F3', border: '1px solid #E8DFD3', color: '#231418', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <GraduationCap size={22} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '9999px', backgroundColor: '#EFE7DC', color: '#594A4D', border: '1px solid #E0D5C7' }}>
                        3 Months Specialization
                      </span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '0 0 8px', lineHeight: 1.35 }}>
                      Tally Prime with GST Certification
                    </h3>
                    <p style={{ fontSize: '13px', color: '#594A4D', lineHeight: 1.55, margin: '0 0 18px' }}>
                      Professional financial accounting, inventory management, GST compliance, and billing voucher generation.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#594A4D' }}>
                        <CheckCircle2 size={15} style={{ color: '#991B1B', flexShrink: 0 }} />
                        <span>Modern Tally Prime software version</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#594A4D' }}>
                        <CheckCircle2 size={15} style={{ color: '#991B1B', flexShrink: 0 }} />
                        <span>Real business balance sheet practice</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#594A4D' }}>
                        <CheckCircle2 size={15} style={{ color: '#991B1B', flexShrink: 0 }} />
                        <span>Secretariat &amp; accounting clerk ready</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href="tel:+919204123453"
                    style={{
                      width: '100%',
                      backgroundColor: '#231418',
                      color: '#FAF6F0',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '12px',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(35, 20, 24, 0.15)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3A2228'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#231418'}
                  >
                    <Phone size={14} style={{ color: '#FAF6F0' }} />
                    <span>Inquire for Tally Course</span>
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            TAB 4: RECRUITMENT NOTICES
            --------------------------------------------------------------------- */}
        {activeTab === 'notices' && (
          <div className="sp-courses-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
            <FadeUp>
              <div style={{ textAlign: 'left', marginBottom: '28px' }}>
                <span style={{
                  display: 'inline-block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#991B1B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  marginBottom: '8px'
                }}>
                  OFFICIAL RECRUITMENT BULLETIN &middot; 2026
                </span>
                <h2 
                  style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.875rem, 3vw, 2.65rem)', 
                    fontWeight: 400, 
                    color: '#231418', 
                    margin: '0 0 10px', 
                    letterSpacing: '-0.015em',
                    lineHeight: 1.1
                  }}
                >
                  Upcoming recruitment notices &amp; <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>vacancies.</span>
                </h2>
                <p style={{ fontSize: '15px', color: '#594A4D', maxWidth: '760px', margin: 0, lineHeight: 1.6 }}>
                  Verified recruitment notifications and exam pattern guidelines for High Court, SSC, and state stenographer vacancies.
                </p>
              </div>
            </FadeUp>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ANNOUNCEMENTS.map((item, idx) => (
                <FadeUp key={item.id} delay={idx * 0.05}>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8DFD3',
                      borderRadius: '16px',
                      padding: '24px 28px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '20px',
                      boxShadow: '0 4px 18px rgba(35, 20, 24, 0.03)',
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
                      e.currentTarget.style.boxShadow = '0 4px 18px rgba(35, 20, 24, 0.03)';
                    }}
                  >
                    <div style={{ flex: '1 1 500px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          backgroundColor: '#EFE7DC',
                          color: '#991B1B',
                          border: '1px solid #E0D5C7'
                        }}>
                          {item.tag}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#8A7B7E', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                          <Calendar size={13} style={{ color: '#8A7B7E' }} />
                          <span>{item.date}</span>
                        </span>
                      </div>
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#231418', margin: '0 0 6px', lineHeight: 1.35 }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '13.5px', color: '#594A4D', lineHeight: 1.55, margin: 0, maxWidth: '820px' }}>
                        {item.description}
                      </p>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={() => setCurrentTab('courses')}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '9999px',
                          backgroundColor: '#231418',
                          color: '#FAF6F0',
                          border: 'none',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: '0 2px 8px rgba(35, 20, 24, 0.15)',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3A2228'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#231418'}
                      >
                        <span>Explore Preparation Courses</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            TAB 5: SHORTHAND OUTLINES & PHRASEOGRAPHY DICTIONARY
            --------------------------------------------------------------------- */}
        {activeTab === 'outlines' && (
          <div className="sp-courses-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
            <FadeUp>
              <div style={{ textAlign: 'left', marginBottom: '28px' }}>
                <span style={{
                  display: 'inline-block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#991B1B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  marginBottom: '8px'
                }}>
                  PHRASEOGRAPHY VAULT &middot; PITMAN &amp; HINDI
                </span>
                <h2 
                  style={{ 
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.875rem, 3vw, 2.65rem)', 
                    fontWeight: 400, 
                    color: '#231418', 
                    margin: '0 0 10px', 
                    letterSpacing: '-0.015em',
                    lineHeight: 1.1
                  }}
                >
                  Shorthand outlines &amp; <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>legal strokes dictionary.</span>
                </h2>
                <p style={{ fontSize: '15px', color: '#594A4D', maxWidth: '760px', margin: 0, lineHeight: 1.6 }}>
                  Master standardized Pitman &amp; Hindi contractions, legal intersections, and high-frequency parliamentary speed phrases.
                </p>
              </div>
            </FadeUp>

            {/* Search Bar & Category Filters */}
            <FadeUp delay={0.05}>
              <div style={{ maxWidth: '820px', margin: '0 auto 28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#8A7B7E' }} />
                  <input
                    type="text"
                    value={outlineSearch}
                    onChange={(e) => setOutlineSearch(e.target.value)}
                    placeholder="Search terminology, e.g. High Court, Parliament, Police, SLP, Affidavit..."
                    style={{
                      width: '100%',
                      padding: '12px 44px 12px 44px',
                      borderRadius: '9999px',
                      border: '1px solid #DCD0C2',
                      backgroundColor: '#FFFFFF',
                      fontSize: '13px',
                      color: '#231418',
                      outline: 'none',
                      boxShadow: '0 1px 3px rgba(35, 20, 24, 0.04)',
                      transition: 'border-color 0.15s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#991B1B'}
                    onBlur={(e) => e.target.style.borderColor = '#DCD0C2'}
                  />
                  {outlineSearch && (
                    <button
                      type="button"
                      onClick={() => setOutlineSearch('')}
                      style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#8A7B7E', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}
                    >
                      &times;
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
                        style={active ? {
                          padding: '6px 16px',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          border: '1px solid #E0D5C7',
                          backgroundColor: '#FFFFFF',
                          color: '#231418',
                          boxShadow: '0 1px 3px rgba(35, 20, 24, 0.06)'
                        } : {
                          padding: '6px 16px',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          border: '1px solid transparent',
                          background: 'transparent',
                          color: '#594A4D',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!active) {
                            e.currentTarget.style.color = '#231418';
                            e.currentTarget.style.backgroundColor = '#EFE7DC';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!active) {
                            e.currentTarget.style.color = '#594A4D';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </FadeUp>

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
                .map((item, idx) => (
                  <FadeUp key={item.id} delay={idx * 0.04}>
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E8DFD3',
                        borderRadius: '16px',
                        padding: '22px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 18px rgba(35, 20, 24, 0.03)',
                        height: '100%',
                        boxSizing: 'border-box',
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
                        e.currentTarget.style.boxShadow = '0 4px 18px rgba(35, 20, 24, 0.03)';
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#EFE7DC', color: '#594A4D', textTransform: 'uppercase', border: '1px solid #E0D5C7' }}>
                            {item.category}
                          </span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Zap size={13} style={{ color: '#991B1B' }} />
                            <span>{item.speedTier}</span>
                          </span>
                        </div>

                        <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#231418', margin: '0 0 4px', lineHeight: 1.3 }}>
                          {item.term}
                        </h4>
                        <div style={{ fontSize: '13px', color: '#8A7B7E', fontWeight: 500, marginBottom: '14px' }}>
                          {item.hindiEquivalent}
                        </div>

                        {/* Stroke Box */}
                        <div style={{
                          backgroundColor: '#FAF7F2',
                          border: '1px solid #EDE5DA',
                          borderRadius: '10px',
                          padding: '12px 14px',
                          marginBottom: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                          <div>
                            <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#991B1B', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '3px', fontFamily: "'JetBrains Mono', monospace" }}>
                              OUTLINE FORMULA (PITMAN)
                            </div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '15px', color: '#231418', letterSpacing: '0.5px' }}>
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
                              backgroundColor: copiedOutlineId === item.id ? '#FAF0F0' : '#FFFFFF',
                              border: '1px solid',
                              borderColor: copiedOutlineId === item.id ? '#F5C6C6' : '#E0D5C7',
                              borderRadius: '9999px',
                              padding: '5px 12px',
                              fontSize: '11px',
                              fontWeight: 600,
                              color: copiedOutlineId === item.id ? '#991B1B' : '#231418',
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
                                <Check size={12} style={{ color: '#991B1B' }} />
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
                        <div style={{ fontSize: '12.5px', color: '#594A4D', marginBottom: '8px', lineHeight: 1.45 }}>
                          <strong style={{ color: '#231418' }}>Rule:</strong> {item.ruleType} &mdash; {item.ruleDesc}
                        </div>
                        <div style={{ fontSize: '12px', color: '#231418', backgroundColor: '#FAF7F2', border: '1px solid #EDE5DA', padding: '8px 10px', borderRadius: '8px', lineHeight: 1.4 }}>
                          💡 <strong style={{ color: '#231418' }}>Speed Tip:</strong> {item.speedTip}
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          4. CLOSING EDITORIAL OFFLINE CENTER CTA (OPEN WARM-GLOW SECTION)
          ========================================================================= */}
      <section 
        className="relative overflow-hidden bg-[#FBF8F3] border-t border-[#E5DBD0] text-center"
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FBF8F3',
          borderTop: '1px solid #E5DBD0',
          padding: '4.5rem 1.5rem',
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {/* Subtle warm radial glow behind content */}
        <div 
          style={{ 
            pointerEvents: 'none', 
            position: 'absolute', 
            inset: 0, 
            background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(196, 132, 120, 0.16) 0%, rgba(251, 248, 243, 0) 75%)' 
          }} 
        />
        <div 
          className="sp-courses-container"
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            boxSizing: 'border-box'
          }}
        >
          <FadeUp>
            <span 
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#991B1B',
                display: 'block',
                marginBottom: '12px'
              }}
            >
              GAYA OFFLINE CENTER &middot; 3 FREE DEMO CLASSES
            </span>
            <h2 
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 'clamp(2.25rem, 4.2vw, 3.25rem)',
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                color: '#231418',
                marginBottom: '12px'
              }}
            >
              Join offline classes at <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>Gaya Shorthand.</span>
            </h2>
            <p 
              style={{
                fontSize: '15px',
                color: '#594A4D',
                maxWidth: '560px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '28px',
                lineHeight: 1.6
              }}
            >
              Gaya College More, Opposite Cyber Thana, Gaya, Bihar &middot; Morning &amp; evening batches.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <button 
                type="button"
                onClick={() => onOpenCheckout ? onOpenCheckout() : null}
                style={{
                  backgroundColor: '#991B1B',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(153, 27, 27, 0.20)',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <span>Book 3 Free Demos &rarr;</span>
              </button>
              <a 
                href="tel:+919204123453"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D8CCBE',
                  color: '#231418',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <Phone size={14} style={{ color: '#991B1B', flexShrink: 0 }} />
                <span>Call Helpline: 9204123453</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
