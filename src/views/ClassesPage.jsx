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
  Zap
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
          <div className="classes-nav-tabs">
            <button 
              className={`class-nav-tab ${activeTab === 'online-live' ? 'active tab-live-active' : ''}`}
              onClick={() => setActiveTab('online-live')}
            >
              <span className="live-dot-mini" />
              <span>Live Zoom Studio</span>
            </button>
            <button 
              className={`class-nav-tab ${activeTab === 'batches' ? 'active' : ''}`}
              onClick={() => setActiveTab('batches')}
            >
              <span>Daily Academy Batches</span>
            </button>
            <button 
              className={`class-nav-tab ${activeTab === 'timetable' ? 'active' : ''}`}
              onClick={() => setActiveTab('timetable')}
            >
              <span>Weekly Timetable</span>
            </button>
            <button 
              className={`class-nav-tab ${activeTab === 'diplomas' ? 'active' : ''}`}
              onClick={() => setActiveTab('diplomas')}
            >
              <span>Govt. Diplomas (ADCA/DCA)</span>
            </button>
            <button 
              className={`class-nav-tab ${activeTab === 'notices' ? 'active' : ''}`}
              onClick={() => setActiveTab('notices')}
            >
              <span>Recruitment Notices</span>
            </button>
            <button 
              className={`class-nav-tab ${activeTab === 'outlines' ? 'active tab-live-active' : ''}`}
              onClick={() => setActiveTab('outlines')}
            >
              <Zap size={13} className="text-amber-500 inline mr-1" />
              <span>Shorthand Outlines</span>
            </button>
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

        {/* TAB 1: DAILY BATCHES */}
        {activeTab === 'batches' && (
          <div className="classes-batches-view">
            <div className="section-header-compact text-center">
              <span className="badge-subheading">CLASSROOM & ONLINE SCHEDULE</span>
              <h2 className="section-title-large">Daily Classroom Batches at Gaya Center</h2>
              <p className="section-description-text">
                All batches include daily handwritten outline checks, audio dictation recordings, and 1 hour of computer typing practice.
              </p>
            </div>

            <div className="classes-batch-cards-grid mt-4">
              {DAILY_BATCHES.map((batch) => (
                <div key={batch.id} className="batch-schedule-card">
                  <div className="batch-schedule-header">
                    <span className={`badge ${batch.badgeColor}`}>{batch.badge}</span>
                    <span className="batch-seats-pill">{batch.seats}</span>
                  </div>

                  <div className="batch-time-strip">
                    <Clock size={16} className="text-royal-blue" />
                    <span className="batch-time-text font-mono">{batch.time}</span>
                    <span className="batch-shift-tag">{batch.shift}</span>
                  </div>

                  <h3 className="batch-title-text">{batch.title}</h3>
                  <p className="batch-desc-text">{batch.desc}</p>

                  <div className="batch-details-box">
                    <div className="detail-line">
                      <Volume2 size={15} className="text-royal-blue shrink-0" />
                      <span><strong>Target Speed:</strong> <span className="font-mono text-royal-blue font-bold">{batch.speed}</span></span>
                    </div>
                    <div className="detail-line">
                      <GraduationCap size={15} className="text-royal-blue shrink-0" />
                      <span><strong>Lead Instructor:</strong> {batch.instructor}</span>
                    </div>
                    <div className="detail-line">
                      <Building size={15} className="text-royal-blue shrink-0" />
                      <span><strong>Format:</strong> {batch.mode}</span>
                    </div>
                  </div>

                  <div className="batch-card-action">
                    <a 
                      href="tel:+919204123453"
                      className="btn-batch-join"
                    >
                      <Phone size={15} />
                      <span>Inquire / Book Seat</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: WEEKLY TIMETABLE */}
        {activeTab === 'timetable' && (
          <div className="classes-timetable-view">
            <div className="section-header-compact text-center">
              <span className="badge-subheading">ROUTINE & LAB SCHEDULE</span>
              <h2 className="section-title-large">Weekly Examination & Dictation Routine</h2>
              <p className="section-description-text">
                Monday to Saturday active training program at Gaya Shorthand Classes.
              </p>
            </div>

            <div className="timetable-table-wrapper mt-4">
              <table className="academy-timetable-table">
                <thead>
                  <tr>
                    <th>Time Slot</th>
                    <th>Batch Category</th>
                    <th>Speed (WPM)</th>
                    <th>Classroom / Lab</th>
                    <th>Faculty Lead</th>
                    <th>Daily Focus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-mono font-bold text-royal-blue">6:00 AM – 8:00 AM</td>
                    <td><strong>Basic Theory (Pitman)</strong></td>
                    <td><span className="badge badge-blue font-mono">0 - 60 WPM</span></td>
                    <td>Hall A (Ground Floor)</td>
                    <td>Shadab Sir</td>
                    <td>Vowels, Stroke Angles & Daily Homework Check</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold text-royal-blue">8:30 AM – 10:30 AM</td>
                    <td><strong>SSC Steno Grade C & D</strong></td>
                    <td><span className="badge badge-amber font-mono">80 WPM</span></td>
                    <td>Computer Lab 1 (50 PCs)</td>
                    <td>Shadab Sir & Lab Head</td>
                    <td>Reading Room + Kruti Dev Hindi & English Typing</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold text-royal-blue">11:00 AM – 1:00 PM</td>
                    <td><strong>Computer Diplomas (DCA/ADCA)</strong></td>
                    <td><span className="badge badge-purple font-mono">Typing Studio</span></td>
                    <td>Computer Lab 2</td>
                    <td>Computer Faculty</td>
                    <td>MS Office, Tally Prime, Internet Operations</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold text-royal-blue">3:00 PM – 5:00 PM</td>
                    <td><strong>High Court Judicial Bench</strong></td>
                    <td><span className="badge badge-emerald font-mono">100 WPM</span></td>
                    <td>Acoustic Dictation Hall</td>
                    <td>Shadab Sir</td>
                    <td>Criminal Appeals, Bail Orders, Legal Outlines</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold text-royal-blue">5:30 PM – 7:30 PM</td>
                    <td><strong>Parliament / Assembly Master</strong></td>
                    <td><span className="badge badge-purple font-mono">120 WPM</span></td>
                    <td>Audio Broadcast Room</td>
                    <td>Senior Master</td>
                    <td>Fast Speed Pacing, Contractions & Transcriptions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ACCREDITED COMPUTER DIPLOMAS */}
        {activeTab === 'diplomas' && (
          <div className="classes-diplomas-view">
            <div className="section-header-compact text-center">
              <span className="badge-subheading">GOVERNMENT RECOGNIZED CERTIFICATIONS</span>
              <h2 className="section-title-large">Accredited Computer Diplomas & Certificates</h2>
              <p className="section-description-text">
                Recognized for all Central & State Government recruitments, High Courts, Civil Courts, and BSSC verification.
              </p>
            </div>

            <div className="diplomas-cards-grid mt-4">
              <div className="diploma-program-card">
                <div className="diploma-icon-bubble">
                  <Award size={26} className="text-amber" />
                </div>
                <h3>DCA (Diploma in Computer Applications)</h3>
                <span className="duration-pill">6 Months Course</span>
                <p>Covers computer fundamentals, Windows OS, MS Office suite (Word, Excel, PowerPoint), and speed typing.</p>
                <ul className="diploma-points">
                  <li><CheckCircle2 size={15} className="text-emerald" /> Government recognized certificate</li>
                  <li><CheckCircle2 size={15} className="text-emerald" /> Online QR code verification</li>
                  <li><CheckCircle2 size={15} className="text-emerald" /> Valid for Clerk and Data Entry Operator posts</li>
                </ul>
                <a href="tel:+919204123453" className="btn-diploma-inquire">
                  <Phone size={14} />
                  <span>Inquire for Admission</span>
                </a>
              </div>

              <div className="diploma-program-card featured">
                <div className="diploma-icon-bubble">
                  <ShieldCheck size={26} className="text-royal-blue" />
                </div>
                <h3>ADCA (Advance Diploma in Computer Applications)</h3>
                <span className="duration-pill">1 Year (12 Months)</span>
                <p>Advanced comprehensive diploma covering DCA syllabus plus Tally ERP, database management, and office automation.</p>
                <ul className="diploma-points">
                  <li><CheckCircle2 size={15} className="text-emerald" /> Mandatory qualification for multiple government posts</li>
                  <li><CheckCircle2 size={15} className="text-emerald" /> Hands-on practical lab training</li>
                  <li><CheckCircle2 size={15} className="text-emerald" /> Official grade sheet & verifiable diploma</li>
                </ul>
                <a href="tel:+919204123453" className="btn-diploma-inquire">
                  <Phone size={14} />
                  <span>Inquire for Admission</span>
                </a>
              </div>

              <div className="diploma-program-card">
                <div className="diploma-icon-bubble">
                  <GraduationCap size={26} className="text-emerald" />
                </div>
                <h3>Tally Prime with GST Certification</h3>
                <span className="duration-pill">3 Months Specialization</span>
                <p>Professional financial accounting, inventory management, GST compliance, and billing voucher generation.</p>
                <ul className="diploma-points">
                  <li><CheckCircle2 size={15} className="text-emerald" /> Modern Tally Prime version</li>
                  <li><CheckCircle2 size={15} className="text-emerald" /> Real business balance sheet practice</li>
                  <li><CheckCircle2 size={15} className="text-emerald" /> Secretariat & accounting clerk ready</li>
                </ul>
                <a href="tel:+919204123453" className="btn-diploma-inquire">
                  <Phone size={14} />
                  <span>Inquire for Admission</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RECRUITMENT NOTICES */}
        {activeTab === 'notices' && (
          <div className="classes-notices-view">
            <div className="section-header-compact text-center">
              <span className="badge-subheading">OFFICIAL BULLETIN</span>
              <h2 className="section-title-large">Upcoming Recruitment Notices & Vacancies</h2>
              <p className="section-description-text">
                Verified recruitment notifications for High Court and SSC stenographer vacancies.
              </p>
            </div>

            <div className="notices-cards-stack mt-4">
              {ANNOUNCEMENTS.map((item) => (
                <div key={item.id} className="notice-banner-card">
                  <div className="notice-banner-left">
                    <div className="notice-badge-date">
                      <span className="badge badge-blue">{item.tag}</span>
                      <span className="font-mono text-xs text-muted">{item.date}</span>
                    </div>
                    <h3 className="notice-banner-title">{item.title}</h3>
                    <p className="notice-banner-desc">{item.description}</p>
                  </div>
                  <div className="notice-banner-right">
                    <button 
                      className="btn-view-notice-tests"
                      onClick={() => setCurrentTab('courses')}
                    >
                      <span>Explore Exam Courses →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SHORTHAND OUTLINES & PHRASEOGRAPHY DICTIONARY */}
        {activeTab === 'outlines' && (
          <div className="classes-notices-view">
            <div className="section-header-compact text-center">
              <span className="badge-subheading" style={{ background: '#FEF3C7', color: '#92400E' }}>PHRASEOGRAPHY VAULT</span>
              <h2 className="section-title-large">Shorthand Outlines & Legal Strokes Dictionary</h2>
              <p className="section-description-text">
                Master standardized Pitman & Hindi contractions, legal intersections, and high-frequency parliamentary speed phrases.
              </p>
            </div>

            {/* Search Bar & Category Filters */}
            <div style={{ maxWidth: '750px', margin: '1.5rem auto 1rem auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#78716c' }} />
                <input
                  type="text"
                  value={outlineSearch}
                  onChange={(e) => setOutlineSearch(e.target.value)}
                  placeholder="Search terminology, e.g. High Court, Parliament, Police, SLP, Affidavit..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    borderRadius: '8px',
                    border: '1px solid #e7e5e4',
                    background: '#ffffff',
                    fontSize: '0.85rem',
                    color: '#1c1917',
                    outline: 'none',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}
                />
                {outlineSearch && (
                  <button
                    onClick={() => setOutlineSearch('')}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#a8a29e', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                {['All', 'Legal & Judicial', 'Parliamentary', 'Administrative & Govt'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setOutlineCategory(cat)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: outlineCategory === cat ? '#d97706' : '#e7e5e4',
                      background: outlineCategory === cat ? '#fef3c7' : '#ffffff',
                      color: outlineCategory === cat ? '#92400e' : '#57534e',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Outlines Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
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
                      border: '1px solid #e7e5e4',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#f5f5f4', color: '#57534e', textTransform: 'uppercase' }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#d97706' }}>
                          ⚡ {item.speedTier}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1c1917', margin: '0 0 0.25rem 0' }}>
                        {item.term}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: '#78716c', marginBottom: '0.85rem' }}>
                        {item.hindiEquivalent}
                      </div>

                      {/* Stroke Box */}
                      <div style={{
                        background: '#faf9f6',
                        border: '1px dashed #d6d3d1',
                        borderRadius: '6px',
                        padding: '0.6rem 0.8rem',
                        marginBottom: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#78716c', fontWeight: 700 }}>
                            Outline Formula (Pitman)
                          </div>
                          <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem', color: '#1c1917', letterSpacing: '0.5px' }}>
                            {item.shorthandStroke}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.shorthandStroke);
                            setCopiedOutlineId(item.id);
                            setTimeout(() => setCopiedOutlineId(null), 1500);
                          }}
                          style={{
                            background: copiedOutlineId === item.id ? '#ecfdf5' : '#ffffff',
                            border: '1px solid',
                            borderColor: copiedOutlineId === item.id ? '#10b981' : '#e7e5e4',
                            borderRadius: '4px',
                            padding: '0.3rem 0.5rem',
                            fontSize: '0.7rem',
                            color: copiedOutlineId === item.id ? '#047857' : '#57534e',
                            cursor: 'pointer'
                          }}
                          title="Copy Stroke Formula"
                        >
                          {copiedOutlineId === item.id ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>

                      {/* Rule & Pacing Tip */}
                      <div style={{ fontSize: '0.76rem', color: '#44403c', marginBottom: '0.4rem', lineHeight: 1.4 }}>
                        <strong>Rule:</strong> {item.ruleType} — {item.ruleDesc}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#92400e', background: '#fffbeb', padding: '0.4rem 0.6rem', borderRadius: '4px', lineHeight: 1.35 }}>
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
