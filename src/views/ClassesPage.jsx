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
import ShorthandCanvas from '../components/ShorthandCanvas';

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
  const [showLiveCanvas, setShowLiveCanvas] = useState(false);
  const [outlineSearch, setOutlineSearch] = useState('');
  const [outlineCategory, setOutlineCategory] = useState('All');
  const [copiedOutlineId, setCopiedOutlineId] = useState(null);

  // Active highlighted class: priority to isLive class, else first class
  const activeClass = (onlineClasses && onlineClasses.length > 0)
    ? (onlineClasses.find(c => c.isLive) || onlineClasses[0])
    : null;

  const handleCopyId = () => {
    const idToCopy = activeClass?.zoomMeetingId || '842 9104 2281';
    navigator.clipboard.writeText(idToCopy);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="classes-page-root">
      
      {/* 1. HERO HEADER */}
      <div className="classes-hero-banner" style={{ padding: '1rem 1.25rem 2rem', textAlign: 'center' }}>
        <div className="classes-hero-container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
            <div className="classes-hero-badge" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              background: '#ffffff',
              border: '1px solid #e7e5e4',
              color: '#1c1917',
              fontSize: '0.78rem',
              fontWeight: 700,
              boxShadow: '0 1px 3px rgba(28, 25, 23, 0.03)'
            }}>
              <Sparkles size={14} className="text-amber-500" />
              <span>ACADEMY BATCH TIMINGS & SCHEDULE • ESTD. 2012</span>
            </div>
          </div>
          <h1 className="classes-hero-title" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 850, margin: '0 0 0.75rem', letterSpacing: '-0.025em', color: '#1c1917' }}>
            Classroom Batches, Timetable & Live Dictations
          </h1>
          <p className="classes-hero-desc" style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.6, margin: '0 auto 1.5rem', maxWidth: '780px' }}>
            Attend daily in-person classes at our Gaya academy or access live broadcast Zoom dictations from anywhere. Daily batches guided by <strong>Shadab Sir (12 Years Experience)</strong> spanning 6:00 AM to 8:00 PM.
          </p>

          {/* Tab Navigation Switcher */}
          <div className="classes-nav-tabs" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '1.75rem',
            padding: '0.4rem',
            background: '#faf9f6',
            borderRadius: '9999px',
            border: '1px solid #e7e5e4',
            width: 'fit-content',
            margin: '1.75rem auto 0'
          }}>
            {[
              { id: 'online-live', label: 'Live Zoom Studio', hasDot: true },
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
                    gap: '0.45rem',
                    padding: '0.5rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.86rem',
                    fontWeight: active ? 800 : 600,
                    border: 'none',
                    background: active ? '#1c1917' : 'transparent',
                    color: active ? '#ffffff' : '#57534e',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    boxShadow: active ? '0 2px 8px rgba(28, 25, 23, 0.2)' : 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.hasDot && (
                    <span style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: active ? '#34d399' : '#10b981',
                      boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3)'
                    }} />
                  )}
                  {IconComponent && <IconComponent size={14} color={active ? '#f59e0b' : '#d97706'} />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT SECTIONS */}
      <div className="classes-content-container">

        {/* TAB 0: LIVE ONLINE ZOOM STUDIO */}
        {activeTab === 'online-live' && (
          <div className="classes-online-live-showcase">
            {/* Live Broadcast Hero Card */}
            <div className="online-live-hero-card" style={{
              background: '#ffffff',
              border: '1px solid #e7e5e4',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              overflow: 'hidden'
            }}>
              <div className="hero-card-left" style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem'
              }}>
                <div className="live-status-row">
                  <span className={`live-broadcast-pill ${activeClass?.isLive ? '' : 'pill-upcoming'}`}>
                    {activeClass?.isLive && <span className="live-pulsing-dot" />}
                    <span>{activeClass?.isLive ? 'ZOOM BROADCAST LIVE NOW' : (activeClass?.tag || 'UPCOMING ON ZOOM')}</span>
                  </span>
                  <span className="online-room-badge font-mono">{activeClass?.roomNo || 'Zoom Room #01 • Studio Live'}</span>
                  <span className="online-attendees-badge font-mono">
                    <Users size={12} />
                    <span>{activeClass ? (activeClass.attendees || 1) : 142} Active Candidates</span>
                  </span>
                </div>

                <h2 className="live-hero-card-title">
                  {activeClass?.title || 'SSC Stenographer Grade C & D — 80 WPM Live Speed Dictation & Transcription Lab'}
                </h2>
                <p className="live-hero-card-desc">
                  Conducted by <strong>{activeClass?.instructor || 'Shadab Sir'}</strong> ({activeClass?.instructorRole || '12 Years Experience'}). {activeClass?.description || 'Real-time 5-minute parliamentary dictation, synchronized digital shorthand whiteboard with interactive student drawing, live audio player with 0.8x-1.3x pacing, and immediate transcription grading.'}
                </p>

                {/* Zoom Credentials Box */}
                <div className="live-hero-creds-strip" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', background: '#faf9f6', border: '1px solid #e7e5e4', padding: '10px 14px', borderRadius: '12px', margin: '1rem 0' }}>
                  <div className="cred-bubble" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1px solid #e7e5e4', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <span className="lbl" style={{ color: '#78716c', fontWeight: 600 }}>Meeting ID:</span>
                    <strong className="font-mono" style={{ color: '#1c1917' }}>{activeClass?.zoomMeetingId || '842 9104 2281'}</strong>
                    <button 
                      type="button" 
                      className="btn-inline-copy"
                      onClick={handleCopyId}
                      title="Copy Meeting ID"
                      style={{ border: 'none', background: '#f5f5f4', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                    >
                      {copiedId ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      <span>{copiedId ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="cred-bubble" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1px solid #e7e5e4', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <span className="lbl" style={{ color: '#78716c', fontWeight: 600 }}>Passcode:</span>
                    <strong className="font-mono" style={{ color: '#1c1917' }}>{activeClass?.zoomPasscode || 'GAYA80WPM'}</strong>
                  </div>
                  <div className="cred-bubble" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1px solid #e7e5e4', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <span className="lbl" style={{ color: '#78716c', fontWeight: 600 }}>Schedule:</span>
                    <span style={{ color: '#1c1917', fontWeight: 600 }}>{activeClass?.time || '8:30 AM – 10:30 AM (Daily)'}</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="live-hero-actions-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                  <button 
                    type="button"
                    className="btn-enter-live-studio"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#047857',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0.85rem 1.4rem',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(4, 120, 87, 0.25)'
                    }}
                    onClick={() => {
                      if (onSelectClass && activeClass) {
                        onSelectClass(activeClass.id);
                      } else {
                        setCurrentTab('online-classes');
                      }
                    }}
                  >
                    <Video size={17} />
                    <span>Enter Live Zoom Studio (In-Browser)</span>
                    <ArrowRight size={16} />
                  </button>

                  <a 
                    href={activeClass?.zoomAppUrl || "zoommtg://zoom.us/join?confno=84291042281&pwd=GAYA80WPM"}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#ffffff',
                      color: '#1c1917',
                      border: '1.5px solid #d6d3d1',
                      borderRadius: '10px',
                      padding: '0.85rem 1.3rem',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <ExternalLink size={15} />
                    <span>Launch in Zoom Desktop App</span>
                  </a>
                </div>
              </div>

              {/* Right Preview Card / Whiteboard Teaser */}
              <div className="hero-card-right" style={{
                padding: '2rem',
                background: '#faf9f6',
                borderLeft: '1px solid #e7e5e4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div className="mini-stream-preview-box">
                  <div className="mini-stream-header font-mono">
                    <span className="mini-rec-dot" />
                    <span>STUDIO WHITEBOARD FEED • 1080P HD</span>
                  </div>
                  <div className="mini-stream-body">
                    <div className="mini-teacher-badge">
                      <span className="mini-avatar">SS</span>
                      <div>
                        <span className="mini-name">Shadab Sir (Host)</span>
                        <span className="mini-role">Faculty Director (12 Yrs Exp)</span>
                      </div>
                    </div>

                    <div className="mini-stroke-display font-mono">
                      <div className="stroke-chars">/ — \ ) ⌒ ⌣ ⌢</div>
                      <div className="stroke-quote">"Parliamentary Motion on State Infrastructure..."</div>
                    </div>

                    <div className="mini-features-list">
                      <div className="mini-feat-item">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        <span>Interactive HTML5 Shorthand Canvas (Pencil & Pen)</span>
                      </div>
                      <div className="mini-feat-item">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        <span>Real 80-104 WPM Speed-Pitch Dictation Player</span>
                      </div>
                      <div className="mini-feat-item">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        <span>Student Shorthand Scratchpad with Instant .txt Export</span>
                      </div>
                    </div>
                  </div>

                  <div className="mini-stream-footer" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '1rem', background: '#1c1917' }}>
                    <button 
                      type="button"
                      onClick={() => setShowLiveCanvas(!showLiveCanvas)}
                      style={{ 
                        flex: '1 1 auto',
                        padding: '0.75rem 1rem', 
                        borderRadius: '8px', 
                        background: showLiveCanvas ? '#d97706' : '#292524', 
                        color: '#fafaf9', 
                        border: '1px solid #44403c',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {showLiveCanvas ? 'Hide Whiteboard Canvas' : 'Draw Outlines On-Screen'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setCurrentTab('online-classes')}
                      style={{ 
                        flex: '1 1 auto',
                        padding: '0.75rem 1rem', 
                        borderRadius: '8px', 
                        background: '#047857', 
                        color: '#ffffff', 
                        border: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Join Session Now</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Live Stylus Shorthand Canvas */}
            {showLiveCanvas && (
              <div className="mt-4 mb-3 animate-fade-in">
                <ShorthandCanvas 
                  audioUrl="/assets/sample-dictation.mp3"
                  title="Live Studio Whiteboard • Interactive HTML5 Stylus Canvas"
                  topic="Parliamentary Motion on State Infrastructure & Expenditure Audit"
                  initialNotes="Mr. Speaker Sir, the motion was introduced in the House concerning national infrastructure expenditure and audited revenue accounts for the fiscal year 2025-2026..."
                />
              </div>
            )}

            {/* Online Classes Features Trio */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              marginTop: '2.5rem'
            }}>
              <div style={{
                background: '#ffffff',
                border: '1px solid #e7e5e4',
                borderRadius: '16px',
                padding: '1.75rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#f5f4f0',
                  color: '#1c1917',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Video size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917', margin: '0 0 0.5rem' }}>
                  Dual-Mode Shorthand Whiteboard
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#57534e', lineHeight: 1.6, margin: 0 }}>
                  Watch teacher strokes live or switch to your own interactive HTML5 stylus canvas to trace outlines with fine pencil or heavy calligraphy pens.
                </p>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid #e7e5e4',
                borderRadius: '16px',
                padding: '1.75rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Volume2 size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917', margin: '0 0 0.5rem' }}>
                  Speed-Controlled Dictation Engine
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#57534e', lineHeight: 1.6, margin: 0 }}>
                  Built-in audio player with 0.8x, 1.0x, 1.1x, 1.2x, and 1.3x multipliers. Practice at custom speeds without pitch distortion.
                </p>
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid #e7e5e4',
                borderRadius: '16px',
                padding: '1.75rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#dcfce7',
                  color: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Keyboard size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917', margin: '0 0 0.5rem' }}>
                  1-Click Typing Test Handover
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#57534e', lineHeight: 1.6, margin: 0 }}>
                  Immediately transition from the live Zoom dictation into the exam typing engine to transcribe your strokes with instant accuracy metrics.
                </p>
              </div>
            </div>

            {/* All 4 Daily Zoom Batches Schedule */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e7e5e4',
              borderRadius: '16px',
              padding: '1.75rem 2rem',
              marginTop: '2.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Daily Broadcast Timetable
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 850, color: '#1c1917', margin: '0.2rem 0 0.4rem' }}>
                  All 4 Daily Online Zoom Dictation Batches
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#57534e', margin: 0 }}>
                  All online sessions are recorded and available for replay 24/7 in the Candidate Portal.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                {(onlineClasses && onlineClasses.length > 0 ? onlineClasses : [
                  { id: 'class-theory-2', time: '6:00 AM – 8:00 AM', badgeClass: 'badge-replay', tag: 'Recording Ready', title: 'Basic Pitman Theory & New Strokes', speed: 'Beginners (0 - 60 WPM)', zoomMeetingId: '815 6742 9904' },
                  { id: 'class-live-1', isLive: true, time: '8:30 AM – 10:30 AM', badgeClass: 'badge-live', tag: '● Active Live', title: 'SSC Grade C & D 80 WPM Speed Lab', speed: '80 WPM Standard', zoomMeetingId: '842 9104 2281' },
                  { id: 'class-judicial-3', time: '3:00 PM – 5:00 PM', badgeClass: 'badge-upcoming', tag: 'Starts 3:00 PM', title: 'High Court Judicial 100 WPM Bench', speed: '100 WPM Judicial', zoomMeetingId: '879 3341 5520' },
                  { id: 'class-reporter-4', time: '5:30 PM – 7:30 PM', badgeClass: 'badge-upcoming', tag: 'Starts 5:30 PM', title: 'Assembly Reporter 120+ WPM Elite', speed: '120-140 WPM', zoomMeetingId: '891 4059 1133' }
                ]).map((b) => (
                  <div 
                    key={b.id} 
                    style={{
                      background: b.isLive ? '#fef2f2' : '#faf9f6',
                      border: b.isLive ? '1.5px solid #f87171' : '1px solid #e7e5e4',
                      borderRadius: '14px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.85rem',
                      boxShadow: b.isLive ? '0 4px 16px rgba(225, 29, 72, 0.1)' : '0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '0.65rem' }}>
                        <span style={{
                          background: b.isLive ? '#dc2626' : '#e7e5e4',
                          color: b.isLive ? '#ffffff' : '#1c1917',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 9px',
                          borderRadius: '999px',
                          fontFamily: 'monospace'
                        }}>
                          {b.time}
                        </span>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: b.isLive ? '#dc2626' : '#78716c',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {b.isLive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#dc2626', animation: 'beaconPulse 1.2s infinite' }} />}
                          {b.tag}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1c1917', margin: '0 0 0.5rem', lineHeight: 1.35 }}>
                        {b.title}
                      </h4>

                      <div style={{
                        fontSize: '0.76rem',
                        fontFamily: 'monospace',
                        color: b.isLive ? '#991b1b' : '#57534e',
                        background: b.isLive ? '#fee2e2' : '#ffffff',
                        border: '1px solid ' + (b.isLive ? '#fca5a5' : '#e7e5e4'),
                        padding: '4px 8px',
                        borderRadius: '6px',
                        display: 'inline-block'
                      }}>
                        {b.speed} • Zoom ID: {b.zoomMeetingId}
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
                        padding: '0.6rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        border: b.isLive ? 'none' : '1px solid #d6d3d1',
                        background: b.isLive ? '#047857' : '#ffffff',
                        color: b.isLive ? '#ffffff' : '#1c1917',
                        boxShadow: b.isLive ? '0 2px 8px rgba(4, 120, 87, 0.25)' : 'none',
                        transition: 'all 0.15s ease'
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

        {/* TAB 1: DAILY ACADEMY BATCHES */}
        {activeTab === 'batches' && (
          <div className="classes-batches-view" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-block',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#d97706',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                background: '#fffbeb',
                border: '1px solid #fef3c7',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                marginBottom: '0.65rem'
              }}>
                CLASSROOM & ONLINE SCHEDULE • ESTD. 2012
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 850, color: '#1c1917', margin: '0 0 0.6rem', letterSpacing: '-0.02em' }}>
                Daily Classroom Batches at Gaya Center
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#57534e', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
                Structured offline training batches from 6:00 AM to 8:00 PM with daily handwritten outline reviews, acoustic dictations, and 1 hour dedicated computer typing lab.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem'
            }}>
              {DAILY_BATCHES.map((batch) => (
                <div
                  key={batch.id}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e7e5e4',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    boxShadow: '0 4px 20px rgba(28, 25, 23, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = '#d6d3d1';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(28, 25, 23, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e7e5e4';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(28, 25, 23, 0.03)';
                  }}
                >
                  <div>
                    {/* Top Chips Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        background: batch.badgeColor === 'badge-amber' ? '#fef3c7' : batch.badgeColor === 'badge-emerald' ? '#ecfdf5' : batch.badgeColor === 'badge-purple' ? '#f5f3ff' : '#eff6ff',
                        color: batch.badgeColor === 'badge-amber' ? '#92400e' : batch.badgeColor === 'badge-emerald' ? '#065f46' : batch.badgeColor === 'badge-purple' ? '#5b21b6' : '#1e40af',
                        border: '1px solid',
                        borderColor: batch.badgeColor === 'badge-amber' ? '#fde68a' : batch.badgeColor === 'badge-emerald' ? '#a7f3d0' : batch.badgeColor === 'badge-purple' ? '#ddd6fe' : '#bfdbfe'
                      }}>
                        {batch.badge}
                      </span>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        background: '#faf9f6',
                        color: '#78716c',
                        border: '1px solid #e7e5e4'
                      }}>
                        {batch.seats}
                      </span>
                    </div>

                    {/* Time & Shift Strip */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#faf9f6',
                      border: '1px solid #e7e5e4',
                      borderRadius: '10px',
                      padding: '0.45rem 0.85rem',
                      marginBottom: '1rem',
                      width: 'fit-content'
                    }}>
                      <Clock size={15} color="#d97706" />
                      <strong style={{ fontSize: '0.92rem', color: '#1c1917', fontFamily: 'var(--font-mono, monospace)', fontWeight: 800 }}>
                        {batch.time}
                      </strong>
                      <span style={{ color: '#d6d3d1' }}>•</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#57534e' }}>
                        {batch.shift}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.5rem', lineHeight: 1.35 }}>
                      {batch.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#57534e', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                      {batch.desc}
                    </p>

                    {/* Details Box */}
                    <div style={{
                      background: '#faf9f6',
                      border: '1px solid #e7e5e4',
                      borderRadius: '12px',
                      padding: '0.9rem 1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Volume2 size={15} color="#d97706" />
                          <span style={{ fontSize: '0.8rem', color: '#78716c', fontWeight: 600 }}>Target Speed:</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1c1917', background: '#ffffff', border: '1px solid #e7e5e4', padding: '2px 8px', borderRadius: '6px', fontFamily: 'var(--font-mono, monospace)' }}>
                          {batch.speed}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <GraduationCap size={15} color="#047857" />
                          <span style={{ fontSize: '0.8rem', color: '#78716c', fontWeight: 600 }}>Lead Faculty:</span>
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1c1917' }}>
                          {batch.instructor}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Building size={15} color="#2563eb" />
                          <span style={{ fontSize: '0.8rem', color: '#78716c', fontWeight: 600 }}>Training Mode:</span>
                        </div>
                        <span style={{ fontSize: '0.82rem', color: '#44403c', fontWeight: 600 }}>
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
                      background: '#1c1917',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(28, 25, 23, 0.15)',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#292524'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#1c1917'}
                  >
                    <Phone size={15} color="#f59e0b" />
                    <span>Inquire / Reserve Batch Seat</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: WEEKLY TIMETABLE */}
        {activeTab === 'timetable' && (
          <div className="classes-timetable-view" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-block',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#047857',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                marginBottom: '0.65rem'
              }}>
                ROUTINE & LAB SCHEDULE • MONDAY TO SATURDAY
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 850, color: '#1c1917', margin: '0 0 0.6rem', letterSpacing: '-0.02em' }}>
                Weekly Examination & Dictation Routine
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#57534e', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
                Monday to Saturday active training program at Gaya Shorthand Classes (Opposite Cyber Thana, Gaya).
              </p>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1.5px solid #e7e5e4',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(28, 25, 23, 0.03)'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
                  <thead>
                    <tr style={{ background: '#faf9f6', borderBottom: '2px solid #e7e5e4' }}>
                      <th style={{ padding: '1rem 1.25rem', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#78716c' }}>Time Slot</th>
                      <th style={{ padding: '1rem 1.25rem', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#78716c' }}>Batch Category</th>
                      <th style={{ padding: '1rem 1.25rem', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#78716c' }}>Speed Benchmark</th>
                      <th style={{ padding: '1rem 1.25rem', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#78716c' }}>Classroom / Lab</th>
                      <th style={{ padding: '1rem 1.25rem', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#78716c' }}>Faculty Lead</th>
                      <th style={{ padding: '1rem 1.25rem', fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#78716c' }}>Daily Focus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        time: '6:00 AM – 8:00 AM',
                        batch: 'Basic Theory (Pitman)',
                        speed: '0 – 60 WPM',
                        speedBg: '#eff6ff',
                        speedColor: '#1d4ed8',
                        speedBorder: '#bfdbfe',
                        hall: 'Hall A (Ground Floor)',
                        faculty: 'Shadab Sir (Director)',
                        focus: 'Vowels, Stroke Angles & Daily Homework Check'
                      },
                      {
                        time: '8:30 AM – 10:30 AM',
                        batch: 'SSC Steno Grade C & D',
                        speed: '80 WPM',
                        speedBg: '#ecfdf5',
                        speedColor: '#047857',
                        speedBorder: '#a7f3d0',
                        hall: 'Computer Lab 1 (50 PCs)',
                        faculty: 'Shadab Sir & Lab Head',
                        focus: 'Reading Room + Kruti Dev / Mangal Typing'
                      },
                      {
                        time: '11:00 AM – 1:00 PM',
                        batch: 'Computer Diplomas (DCA/ADCA)',
                        speed: 'Typing Studio',
                        speedBg: '#f5f3ff',
                        speedColor: '#6d28d9',
                        speedBorder: '#ddd6fe',
                        hall: 'Computer Lab 2',
                        faculty: 'Computer Faculty',
                        focus: 'MS Office Suite, Tally Prime, Internet Operations'
                      },
                      {
                        time: '3:00 PM – 5:00 PM',
                        batch: 'High Court Judicial Bench',
                        speed: '100 WPM',
                        speedBg: '#fffbeb',
                        speedColor: '#b45309',
                        speedBorder: '#fde68a',
                        hall: 'Acoustic Dictation Hall',
                        faculty: 'Shadab Sir',
                        focus: 'Criminal Appeals, Bail Orders, Court Judgments'
                      },
                      {
                        time: '5:30 PM – 7:30 PM',
                        batch: 'Parliament / Assembly Master',
                        speed: '120 WPM',
                        speedBg: '#fdf2f8',
                        speedColor: '#be185d',
                        speedBorder: '#fbcfe8',
                        hall: 'Audio Broadcast Room',
                        faculty: 'Senior Master',
                        focus: 'Fast Speed Pacing, Contractions & Transcriptions'
                      }
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        style={{ borderBottom: idx === 4 ? 'none' : '1px solid #f5f5f4', transition: 'background 0.15s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#faf9f6'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                      >
                        <td style={{ padding: '1.1rem 1.25rem', fontFamily: 'var(--font-mono, monospace)', fontWeight: 800, color: '#1c1917', fontSize: '0.9rem' }}>
                          {row.time}
                        </td>
                        <td style={{ padding: '1.1rem 1.25rem', fontWeight: 800, color: '#1c1917', fontSize: '0.9rem' }}>
                          {row.batch}
                        </td>
                        <td style={{ padding: '1.1rem 1.25rem' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '9999px',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            fontFamily: 'var(--font-mono, monospace)',
                            background: row.speedBg,
                            color: row.speedColor,
                            border: `1px solid ${row.speedBorder}`
                          }}>
                            {row.speed}
                          </span>
                        </td>
                        <td style={{ padding: '1.1rem 1.25rem', color: '#44403c', fontSize: '0.88rem', fontWeight: 600 }}>
                          {row.hall}
                        </td>
                        <td style={{ padding: '1.1rem 1.25rem', color: '#1c1917', fontSize: '0.88rem', fontWeight: 700 }}>
                          {row.faculty}
                        </td>
                        <td style={{ padding: '1.1rem 1.25rem', color: '#57534e', fontSize: '0.86rem', lineHeight: 1.45 }}>
                          {row.focus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{
                background: '#faf9f6',
                borderTop: '1px solid #e7e5e4',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: '#78716c'
              }}>
                <Sparkles size={15} color="#d97706" />
                <span><strong>Sunday Special:</strong> Full-length 100-mark mock examinations held every Sunday 9:00 AM – 1:00 PM with software-evaluated accuracy scorecards.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACCREDITED COMPUTER DIPLOMAS */}
        {activeTab === 'diplomas' && (
          <div className="classes-diplomas-view" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-block',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#2563eb',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                marginBottom: '0.65rem'
              }}>
                GOVERNMENT RECOGNIZED CERTIFICATIONS
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 850, color: '#1c1917', margin: '0 0 0.6rem', letterSpacing: '-0.02em' }}>
                Accredited Computer Diplomas & Certificates
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#57534e', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
                Recognized for all Central & State Government recruitments, High Courts, Civil Courts, and BSSC verification.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem'
            }}>
              {/* DCA Card */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e7e5e4',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(28, 25, 23, 0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = '#d6d3d1';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(28, 25, 23, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e7e5e4';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(28, 25, 23, 0.03)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Award size={24} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '9999px', background: '#faf9f6', color: '#57534e', border: '1px solid #e7e5e4' }}>
                      6 Months Course
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.5rem', lineHeight: 1.35 }}>
                    DCA (Diploma in Computer Applications)
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#57534e', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                    Covers computer fundamentals, Windows OS, MS Office suite (Word, Excel, PowerPoint), and speed touch typing.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                      <span>Government recognized certificate</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                      <span>Online QR code & Roll verification</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                      <span>Valid for Clerk & Data Entry Operator posts</span>
                    </div>
                  </div>
                </div>
                <a
                  href="tel:+919204123453"
                  style={{
                    width: '100%',
                    background: '#1c1917',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(28, 25, 23, 0.15)'
                  }}
                >
                  <Phone size={15} color="#f59e0b" />
                  <span>Inquire for DCA Program</span>
                </a>
              </div>

              {/* ADCA Card (Featured) */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #fed7aa',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(217, 119, 6, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(217, 119, 6, 0.08)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#d97706',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  padding: '0.2rem 0.85rem',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.3)'
                }}>
                  ★ Most Preferred for Govt Jobs
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', marginTop: '0.35rem' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldCheck size={24} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '9999px', background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }}>
                      1 Year (12 Months)
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.5rem', lineHeight: 1.35 }}>
                    ADCA (Advance Diploma in Computer Applications)
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#57534e', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                    Advanced comprehensive diploma covering DCA syllabus plus Tally ERP, database management, and office automation.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                      <span>Mandatory qualification for multiple govt posts</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                      <span>Hands-on practical lab training (50+ PCs)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                      <span>Official grade sheet & verifiable diploma</span>
                    </div>
                  </div>
                </div>
                <a
                  href="tel:+919204123453"
                  style={{
                    width: '100%',
                    background: '#047857',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 3px 12px rgba(4, 120, 87, 0.25)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#059669'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#047857'}
                >
                  <Phone size={15} color="#fde68a" />
                  <span>Inquire for ADCA Program</span>
                </a>
              </div>

              {/* Tally Prime Card */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e7e5e4',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(28, 25, 23, 0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = '#d6d3d1';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(28, 25, 23, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e7e5e4';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(28, 25, 23, 0.03)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <GraduationCap size={24} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '9999px', background: '#faf9f6', color: '#57534e', border: '1px solid #e7e5e4' }}>
                      3 Months Specialization
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.5rem', lineHeight: 1.35 }}>
                    Tally Prime with GST Certification
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#57534e', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                    Professional financial accounting, inventory management, GST compliance, and billing voucher generation.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                      <span>Modern Tally Prime software version</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                      <span>Real business balance sheet practice</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                      <span>Secretariat & accounting clerk ready</span>
                    </div>
                  </div>
                </div>
                <a
                  href="tel:+919204123453"
                  style={{
                    width: '100%',
                    background: '#1c1917',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(28, 25, 23, 0.15)'
                  }}
                >
                  <Phone size={15} color="#f59e0b" />
                  <span>Inquire for Tally Course</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RECRUITMENT NOTICES */}
        {activeTab === 'notices' && (
          <div className="classes-notices-view" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-block',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#b45309',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                background: '#fffbeb',
                border: '1px solid #fef3c7',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                marginBottom: '0.65rem'
              }}>
                OFFICIAL RECRUITMENT BULLETIN • 2026
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 850, color: '#1c1917', margin: '0 0 0.6rem', letterSpacing: '-0.02em' }}>
                Upcoming Recruitment Notices & Vacancies
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#57534e', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
                Verified recruitment notifications and exam pattern guidelines for High Court, SSC, and state stenographer vacancies.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
              {ANNOUNCEMENTS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e7e5e4',
                    borderRadius: '16px',
                    padding: '1.75rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    boxShadow: '0 3px 14px rgba(28, 25, 23, 0.03)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#d6d3d1';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(28, 25, 23, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = '#e7e5e4';
                    e.currentTarget.style.boxShadow = '0 3px 14px rgba(28, 25, 23, 0.03)';
                  }}
                >
                  <div style={{ flex: '1 1 500px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        background: item.tag === 'High Court' ? '#fef3c7' : item.tag === 'SSC Steno' ? '#eff6ff' : '#ecfdf5',
                        color: item.tag === 'High Court' ? '#92400e' : item.tag === 'SSC Steno' ? '#1e40af' : '#065f46',
                        border: '1px solid',
                        borderColor: item.tag === 'High Court' ? '#fde68a' : item.tag === 'SSC Steno' ? '#bfdbfe' : '#a7f3d0'
                      }}>
                        {item.tag}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#78716c', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600 }}>
                        <Calendar size={13} />
                        <span>{item.date}</span>
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.45rem', lineHeight: 1.35 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: '#57534e', lineHeight: 1.6, margin: 0, maxWidth: '820px' }}>
                      {item.description}
                    </p>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => setCurrentTab('courses')}
                      style={{
                        padding: '0.75rem 1.4rem',
                        borderRadius: '9999px',
                        background: '#1c1917',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 8px rgba(28, 25, 23, 0.2)',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#292524'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#1c1917'}
                    >
                      <span>Explore Preparation Courses</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SHORTHAND OUTLINES & PHRASEOGRAPHY DICTIONARY */}
        {activeTab === 'outlines' && (
          <div className="classes-outlines-view" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <span style={{
                display: 'inline-block',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#92400e',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                background: '#fef3c7',
                border: '1px solid #fde68a',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                marginBottom: '0.65rem'
              }}>
                PHRASEOGRAPHY VAULT • PITMAN & HINDI
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', fontWeight: 850, color: '#1c1917', margin: '0 0 0.6rem', letterSpacing: '-0.02em' }}>
                Shorthand Outlines & Legal Strokes Dictionary
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#57534e', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
                Master standardized Pitman & Hindi contractions, legal intersections, and high-frequency parliamentary speed phrases.
              </p>
            </div>

            {/* Search Bar & Category Filters */}
            <div style={{ maxWidth: '750px', margin: '0 auto 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#78716c' }} />
                <input
                  type="text"
                  value={outlineSearch}
                  onChange={(e) => setOutlineSearch(e.target.value)}
                  placeholder="Search terminology, e.g. High Court, Parliament, Police, SLP, Affidavit..."
                  style={{
                    width: '100%',
                    padding: '0.85rem 2.5rem 0.85rem 2.6rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e7e5e4',
                    background: '#ffffff',
                    fontSize: '0.92rem',
                    color: '#1c1917',
                    outline: 'none',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'border-color 0.15s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1c1917'}
                  onBlur={(e) => e.target.style.borderColor = '#e7e5e4'}
                />
                {outlineSearch && (
                  <button
                    type="button"
                    onClick={() => setOutlineSearch('')}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#a8a29e', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                {['All', 'Legal & Judicial', 'Parliamentary', 'Administrative & Govt'].map((cat) => {
                  const active = outlineCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setOutlineCategory(cat)}
                      style={{
                        padding: '0.4rem 0.95rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: active ? 800 : 600,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: active ? '#1c1917' : '#e7e5e4',
                        background: active ? '#1c1917' : '#ffffff',
                        color: active ? '#ffffff' : '#57534e',
                        transition: 'all 0.15s ease',
                        boxShadow: active ? '0 2px 8px rgba(28, 25, 23, 0.15)' : 'none'
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Outlines Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
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
                      background: '#ffffff',
                      border: '1.5px solid #e7e5e4',
                      borderRadius: '14px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = '#d6d3d1';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(28, 25, 23, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#e7e5e4';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '4px', background: '#faf9f6', color: '#57534e', textTransform: 'uppercase', border: '1px solid #e7e5e4' }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#d97706', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Zap size={13} />
                          <span>{item.speedTier}</span>
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.15rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.2rem', lineHeight: 1.3 }}>
                        {item.term}
                      </h4>
                      <div style={{ fontSize: '0.86rem', color: '#78716c', fontWeight: 600, marginBottom: '0.9rem' }}>
                        {item.hindiEquivalent}
                      </div>

                      {/* Stroke Box */}
                      <div style={{
                        background: '#faf9f6',
                        border: '1px solid #fed7aa',
                        borderRadius: '10px',
                        padding: '0.75rem 1rem',
                        marginBottom: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#b45309', fontWeight: 800, letterSpacing: '0.4px', marginBottom: '2px' }}>
                            OUTLINE FORMULA (PITMAN)
                          </div>
                          <div style={{ fontFamily: 'var(--font-mono, monospace)', fontWeight: 800, fontSize: '1rem', color: '#1c1917', letterSpacing: '0.5px' }}>
                            {item.shorthandStroke}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(item.shorthandStroke);
                            setCopiedOutlineId(item.id);
                            setTimeout(() => setCopiedOutlineId(null), 1500);
                          }}
                          style={{
                            background: copiedOutlineId === item.id ? '#ecfdf5' : '#ffffff',
                            border: '1px solid',
                            borderColor: copiedOutlineId === item.id ? '#10b981' : '#e7e5e4',
                            borderRadius: '6px',
                            padding: '0.35rem 0.65rem',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            color: copiedOutlineId === item.id ? '#047857' : '#57534e',
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
                              <Check size={12} color="#047857" />
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
                      <div style={{ fontSize: '0.8rem', color: '#44403c', marginBottom: '0.55rem', lineHeight: 1.45 }}>
                        <strong>Rule:</strong> {item.ruleType} — {item.ruleDesc}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#92400e', background: '#fffbeb', border: '1px solid #fef3c7', padding: '0.45rem 0.65rem', borderRadius: '6px', lineHeight: 1.4 }}>
                        💡 <strong>Speed Tip:</strong> {item.speedTip}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>

      {/* 3. BOTTOM OFFLINE CENTER INFO */}
      <section style={{ maxWidth: 1200, margin: '2.5rem auto 3.5rem', padding: '0 1.25rem' }}>
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #fed7aa',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '280px', flex: '1 1 400px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Building size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.25rem' }}>
                Join Offline Classroom at Gaya Shorthand Classes
              </h4>
              <p style={{ fontSize: '0.86rem', color: '#57534e', margin: 0, lineHeight: 1.45 }}>
                Gaya College More, Opposite Cyber Thana, Gayaji, Bihar • <strong>3 Free Demo Classes Available</strong>
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a 
              href="tel:+919204123453"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fef3c7',
                color: '#92400e',
                border: '1.5px solid #fde68a',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Phone size={16} color="#d97706" />
              <span>Call Helpline: 9204123453 / 7870377214</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenCheckout ? onOpenCheckout() : null}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#047857',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(4, 120, 87, 0.25)'
              }}
            >
              <Sparkles size={16} color="#fde68a" />
              <span>Book 3 Free Demo Classes</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
