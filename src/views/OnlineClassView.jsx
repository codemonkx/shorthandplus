import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  ShieldCheck, 
  Keyboard, 
  Headphones, 
  Sparkles, 
  Users, 
  FileText, 
  X, 
  Download, 
  Check, 
  Calendar,
  Search,
  Copy,
  ExternalLink,
  Monitor,
  Share2,
  Flame,
  Radio,
  BookOpen
} from 'lucide-react';
import { STENO_TESTS, TYPING_TESTS } from '../data/mockData';

const ONLINE_CLASSES_DATA = [
  {
    id: 'class-live-1',
    title: 'SSC Stenographer Grade C & D — 80 WPM Live Speed Dictation & Transcription Lab',
    shift: 'Morning Core Batch',
    time: '8:30 AM – 10:30 AM',
    instructor: 'Gagan Sir',
    instructorRole: 'Head Faculty • 18+ Yrs Exp',
    speed: '80 WPM Standard',
    attendees: 142,
    isLive: true,
    tag: '🔴 ZOOM LIVE CALL ACTIVE',
    badgeClass: 'badge-live',
    zoomMeetingId: '842 9104 2281',
    zoomPasscode: 'GAYA80WPM',
    zoomDirectUrl: 'https://zoom.us/j/84291042281?pwd=GAYA80WPM',
    zoomAppUrl: 'zoommtg://zoom.us/join?confno=84291042281&pwd=GAYA80WPM',
    zoomWebUrl: 'https://app.zoom.us/wc/84291042281/join',
    description: 'Live interactive Zoom speed dictation: Real-time 5-minute parliamentary dictation, stroke analysis, and immediate post-call transcription evaluation.',
    todayTopic: 'Parliamentary Motion on State Infrastructure & Expenditure Audit',
    passageSnippet: "Mr. Speaker Sir, the motion was introduced in the House concerning national infrastructure expenditure and audited revenue accounts for the fiscal year 2025-2026. The state government along with the Auditor General presented a comprehensive assessment of capital allocations...",
    roomNo: 'Zoom Room #01 (Studio Live)',
    keyOutlines: [
      { stroke: 'P-R-L-M-T', phrase: 'Parliamentary Motion', rule: 'Contraction • P on line with Ray loop' },
      { stroke: 'S // G-V', phrase: 'State Government', rule: 'Intersected Stroke • S circle crossing Gay' },
      { stroke: 'K-S-P-N-D', phrase: 'Expenditure & Revenue', rule: 'Advanced Phraseography • Halving principle' },
      { stroke: 'D-T-R // J-N', phrase: 'Auditor General', rule: 'Compound phrase • Light vowel position' }
    ]
  },
  {
    id: 'class-theory-2',
    title: 'Basic Pitman Shorthand Theory: Vowel Positions, Circles & Hook Formations',
    shift: 'Morning Early Bird',
    time: '6:00 AM – 8:00 AM',
    instructor: 'Gagan Sir',
    instructorRole: 'Founder & Senior Master',
    speed: 'Beginners (0 - 60 WPM)',
    attendees: 98,
    isLive: false,
    tag: "TODAY'S REPLAY & ZOOM ARCHIVE",
    badgeClass: 'badge-replay',
    zoomMeetingId: '815 6742 9904',
    zoomPasscode: 'PITMAN2026',
    zoomDirectUrl: 'https://zoom.us/j/81567429904?pwd=PITMAN2026',
    zoomAppUrl: 'zoommtg://zoom.us/join?confno=81567429904&pwd=PITMAN2026',
    zoomWebUrl: 'https://app.zoom.us/wc/81567429904/join',
    description: 'Comprehensive consonant joinings, light/heavy vowels, diphthongs, and initial R and L hooks with daily outline verification.',
    todayTopic: 'Chapter 14: Compound Consonants & Intersected Words',
    passageSnippet: "The student of shorthand must practice light and heavy strokes with careful pen pressure. Light strokes represent voiceless consonants while heavy strokes denote voiced consonants...",
    roomNo: 'Zoom Room #02 (Theory Hall)',
    keyOutlines: [
      { stroke: 'B-R-K-S', phrase: 'Book-keeper & Secretary', rule: 'Vowel placement at 3rd place' },
      { stroke: 'M-N-S-T-R', phrase: 'Honorable Minister', rule: 'Large loop representation' },
      { stroke: 'K-M-P-N', phrase: 'Joint Stock Company', rule: 'Intersected K stroke' }
    ]
  },
  {
    id: 'class-judiciary-3',
    title: 'High Court Judicial Speed Bench: Criminal Appeals & Judgment Phrases',
    shift: 'Afternoon Judicial Series',
    time: '3:00 PM – 5:00 PM',
    instructor: 'Gagan Sir & High Court Reporter',
    instructorRole: 'Judicial Series Lead',
    speed: '100 WPM Judicial',
    attendees: 115,
    isLive: false,
    tag: 'STARTS AT 3:00 PM ON ZOOM',
    badgeClass: 'badge-upcoming',
    zoomMeetingId: '879 3341 5520',
    zoomPasscode: 'COURT100',
    zoomDirectUrl: 'https://zoom.us/j/87933415520?pwd=COURT100',
    zoomAppUrl: 'zoommtg://zoom.us/join?confno=87933415520&pwd=COURT100',
    zoomWebUrl: 'https://app.zoom.us/wc/87933415520/join',
    description: 'Authentic criminal appeals, civil revisions, and high-frequency legal Latin maxims calibrated strictly for High Court exams with live Zoom courtroom simulation.',
    todayTopic: 'Patna High Court Cr. Appeal 412/2025 Bench Dictation',
    passageSnippet: "In the High Court of Judicature at Patna, Criminal Appeal Number 412 of 2025. Heard the learned counsel for the appellant as well as the learned Additional Public Prosecutor for the State...",
    roomNo: 'Zoom Room #03 (Judicial Bench)',
    keyOutlines: [
      { stroke: 'H-G-H // K-R-T', phrase: "Hon'ble High Court", rule: 'Legal standard phrase' },
      { stroke: 'K-R-M // P-L', phrase: 'Criminal Appeal', rule: 'Joined phraseology' },
      { stroke: 'P-R-S-K-T-N', phrase: 'Learned Prosecution Counsel', rule: 'Contraction with medially halved stroke' }
    ]
  },
  {
    id: 'class-reporter-4',
    title: 'Parliament & Legislative Assembly Reporter 120+ WPM Elite Masterclass',
    shift: 'Evening Executive Bench',
    time: '5:30 PM – 7:30 PM',
    instructor: 'Senior Court Master',
    instructorRole: 'Ex-Parliament Reporter',
    speed: '120 - 140 WPM Elite',
    attendees: 64,
    isLive: false,
    tag: 'STARTS AT 5:30 PM ON ZOOM',
    badgeClass: 'badge-upcoming',
    zoomMeetingId: '891 4059 1133',
    zoomPasscode: 'ELITE120',
    zoomDirectUrl: 'https://zoom.us/j/89140591133?pwd=ELITE120',
    zoomAppUrl: 'zoommtg://zoom.us/join?confno=89140591133&pwd=ELITE120',
    zoomWebUrl: 'https://app.zoom.us/wc/89140591133/join',
    description: 'Rapid speech phraseography, advanced parliamentary contractions, and high-speed multi-speaker debate capture conducted in exclusive Zoom cohort.',
    todayTopic: 'Lok Sabha Finance Bill Clause-by-Clause Rapid Dictation',
    passageSnippet: "The Finance Bill was taken up for consideration in the Lok Sabha. Several amendments moved by the Hon'ble members from both Treasury and Opposition benches were examined clause by clause...",
    roomNo: 'Zoom Room #04 (Executive Chamber)',
    keyOutlines: [
      { stroke: 'F-N-N-S // B-L', phrase: 'Finance Bill Provision', rule: 'Halved N stroke with downward L' },
      { stroke: 'R-Z-L-U-S-H-N', phrase: 'Government Resolution', rule: 'Ray stroke through line' },
      { stroke: 'S-P-K-R // S-R', phrase: 'Mr. Speaker, Sir', rule: 'Special reporter prefix' }
    ]
  }
];

export default function OnlineClassView({ 
  user, 
  onStartTest, 
  onStartTypingTest, 
  onOpenCheckout,
  setCurrentTab,
  onlineClasses = [],
  selectedClassId = null
}) {
  const recommendedTest = STENO_TESTS[0];

  // Deduplicate instant sprint batches if multiple exist
  const allBatches = React.useMemo(() => {
    const raw = (onlineClasses && onlineClasses.length > 0) ? onlineClasses : ONLINE_CLASSES_DATA;
    const seen = new Set();
    const result = [];
    for (const b of raw) {
      const key = b.shift === 'Special Live Sprint' ? 'Special Live Sprint' : b.id;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(b);
      }
    }
    return result;
  }, [onlineClasses]);

  const getInitialBatch = () => {
    if (selectedClassId) {
      const matched = allBatches.find((b) => b.id === selectedClassId);
      if (matched) return matched;
    }
    const liveBatch = allBatches.find((b) => b.isLive);
    return liveBatch || allBatches[0];
  };

  const [selectedBatch, setSelectedBatch] = useState(getInitialBatch);

  // Synchronize when selectedClassId or onlineClasses changes
  useEffect(() => {
    if (selectedClassId) {
      const matched = allBatches.find((b) => b.id === selectedClassId);
      if (matched) {
        setSelectedBatch(matched);
        return;
      }
    }
    if (selectedBatch) {
      const updated = allBatches.find((b) => b.id === selectedBatch.id);
      if (updated) {
        setSelectedBatch(updated);
      }
    }
  }, [selectedClassId, allBatches]);

  // Real-time synchronization of Admin live broadcast announcements
  const [liveAnnouncement, setLiveAnnouncement] = useState(() => {
    return localStorage.getItem('shorthand_live_announcement') || '';
  });

  useEffect(() => {
    const handleStorage = (e) => {
      if (!e.key || e.key === 'shorthand_live_announcement') {
        setLiveAnnouncement(localStorage.getItem('shorthand_live_announcement') || '');
      }
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(() => {
      const stored = localStorage.getItem('shorthand_live_announcement') || '';
      setLiveAnnouncement((prev) => (prev !== stored ? stored : prev));
    }, 2000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'live' | 'upcoming' | 'replays'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedType, setCopiedType] = useState(null); // 'id' | 'pwd' | 'invite'
  const [showHandoverModal, setShowHandoverModal] = useState(false);

  // Daily Attendance Streak State
  const [streakCount, setStreakCount] = useState(14);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [showStreakToast, setShowStreakToast] = useState(false);

  const handleMarkAttendance = () => {
    setAttendanceMarked(true);
    setStreakCount((prev) => prev + 1);
    setShowStreakToast(true);
    setTimeout(() => setShowStreakToast(false), 4500);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const filteredBatches = allBatches.filter((batch) => {
    if (activeFilter === 'live' && !batch.isLive) return false;
    if (activeFilter === 'upcoming' && (batch.isLive || batch.badgeClass === 'badge-replay')) return false;
    if (activeFilter === 'replays' && batch.badgeClass !== 'badge-replay') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        batch.title.toLowerCase().includes(q) ||
        batch.shift.toLowerCase().includes(q) ||
        batch.todayTopic.toLowerCase().includes(q) ||
        batch.speed.toLowerCase().includes(q) ||
        batch.zoomMeetingId.includes(q)
      );
    }
    return true;
  });

  const cleanMeetingId = (selectedBatch.zoomMeetingId || '').replace(/\s+/g, '');
  const directZoomJoinLink = selectedBatch.zoomDirectUrl || `https://zoom.us/j/${cleanMeetingId}?pwd=${selectedBatch.zoomPasscode}`;
  const appZoomJoinLink = selectedBatch.zoomAppUrl || `zoommtg://zoom.us/join?confno=${cleanMeetingId}&pwd=${selectedBatch.zoomPasscode}`;
  const webZoomJoinLink = selectedBatch.zoomWebUrl || `https://app.zoom.us/wc/${cleanMeetingId}/join`;

  return (
    <div className="online-class-page-root">
      
      {/* Streak Success Toast */}
      {showStreakToast && (
        <div className="streak-toast-banner animate-bounce-in">
          <div className="streak-toast-icon">🔥</div>
          <div className="streak-toast-text">
            <strong>Attendance Locked! Day {streakCount} Streak Active</strong>
            <span>+50 Practice Points added to your Steno Leaderboard scorecard!</span>
          </div>
        </div>
      )}

      {/* Admin Broadcast Announcement Alert Banner */}
      {liveAnnouncement && (
        <div className="student-live-announcement-banner animate-fade-in">
          <div className="announcement-left">
            <span className="announcement-pulse-badge">📢 LIVE CANDIDATE NOTICE</span>
            <span className="announcement-text">{liveAnnouncement}</span>
          </div>
          <button 
            type="button" 
            className="btn-dismiss-announcement"
            onClick={() => setLiveAnnouncement('')}
            title="Dismiss notice"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 1. TOP HERO HEADER */}
      <div className="online-class-hero-header">
        <div className="zoom-official-status-strip">
          <div className="zoom-badge-pill">
            <Video size={13} />
            <span>OFFICIAL ZOOM LIVE CLASSROOM</span>
          </div>
          <div className="zoom-encryption-badge">
            <ShieldCheck size={13} className="text-emerald-600" />
            <span>256-Bit TLS End-to-End Encrypted Meeting</span>
          </div>
          
          {/* Daily Attendance Streak Button */}
          <div className="attendance-streak-pill">
            <Flame size={14} className="text-amber-500 fill-amber-500" />
            <span className="streak-count-txt">Day {streakCount} Streak</span>
            {attendanceMarked ? (
              <span className="attended-check-tag">
                <Check size={12} />
                <span>Present Today</span>
              </span>
            ) : (
              <button 
                type="button"
                className="btn-mark-present-now"
                onClick={handleMarkAttendance}
                title="Mark your attendance for today's live Zoom class"
              >
                Mark Present (+50 XP)
              </button>
            )}
          </div>
        </div>

        <div className="online-hero-title-row">
          <div>
            <h1 className="online-hero-title">Live Online Classes & Zoom Dictation Hub</h1>
            <p className="online-hero-sub">
              Join real-time daily Zoom speed dictations with Gagan Sir. Connect with 1 click directly in your browser or through the Zoom Desktop/Mobile App.
            </p>
          </div>

          <div className="online-stats-capsules">
            <div className="stat-capsule">
              <span className="capsule-num">{allBatches.length}</span>
              <span className="capsule-lbl">Zoom Batches</span>
            </div>
            <div className="stat-capsule highlight">
              <span className="capsule-num">{allBatches.reduce((acc, c) => acc + (c.attendees || 1), 0)}</span>
              <span className="capsule-lbl">Active Learners</span>
            </div>
            <div className="stat-capsule">
              <span className="capsule-num">{allBatches.some(b => b.isLive) ? '🔴 LIVE' : '80-140'}</span>
              <span className="capsule-lbl">{allBatches.some(b => b.isLive) ? 'On Air Now' : 'WPM Speed Tiers'}</span>
            </div>
          </div>
        </div>

        {/* Filter Pills & Search Bar */}
        <div className="online-toolbar-row">
          <div className="online-filter-pills-wrap">
            <button 
              type="button"
              className={`online-nav-pill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Batches ({allBatches.length})
            </button>
            <button 
              type="button"
              className={`online-nav-pill pill-live ${activeFilter === 'live' ? 'active' : ''}`}
              onClick={() => setActiveFilter('live')}
            >
              <span className="live-dot-mini" />
              Live Now ({allBatches.filter(b => b.isLive).length})
            </button>
            <button 
              type="button"
              className={`online-nav-pill ${activeFilter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveFilter('upcoming')}
            >
              Upcoming Today ({allBatches.filter(b => !b.isLive && b.badgeClass !== 'badge-replay').length})
            </button>
            <button 
              type="button"
              className={`online-nav-pill ${activeFilter === 'replays' ? 'active' : ''}`}
              onClick={() => setActiveFilter('replays')}
            >
              Recordings & Replays ({allBatches.filter(b => b.badgeClass === 'badge-replay').length})
            </button>
          </div>

          <div className="online-search-box">
            <Search size={15} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search batch, Meeting ID, or speed tier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. FEATURED SELECTED CLASS DIRECT ZOOM JOIN HUB (SPLIT COMMAND CENTER) */}
      <section className="zoom-join-showcase-section mt-4 mb-5">
        <div className={`zoom-join-showcase-card ${selectedBatch.isLive ? 'is-live-hub' : ''}`}>
          
          <div className="showcase-split-grid">
            
            {/* LEFT COLUMN: Broadcast Launchpad & Credentials */}
            <div className="showcase-left-col">
              
              {/* Status & Shift Meta */}
              <div className="showcase-status-bar">
                <span className={`card-status-pill ${selectedBatch.badgeClass}`}>
                  {selectedBatch.isLive && <span className="live-dot-mini" />}
                  {selectedBatch.tag || (selectedBatch.isLive ? '🔴 ZOOM LIVE CALL ACTIVE' : 'SCHEDULED BATCH')}
                </span>
                <span className="showcase-shift-badge">{selectedBatch.shift}</span>
                <span className="showcase-speed-badge font-mono">{selectedBatch.speed}</span>
              </div>

              {/* Title & Description */}
              <h2 className="showcase-main-title mt-1">{selectedBatch.title}</h2>
              <p className="showcase-description text-slate-600">
                {selectedBatch.description}
              </p>

              {/* Faculty Info Pill */}
              <div className="showcase-faculty-pill">
                <div className="faculty-avatar-bubble">
                  {selectedBatch.instructor ? selectedBatch.instructor.split(' ').map(n => n[0]).join('').slice(0, 2) : 'GS'}
                </div>
                <div className="faculty-info-text">
                  <span className="faculty-name font-bold text-slate-900">{selectedBatch.instructor}</span>
                  <div className="faculty-sub-text text-muted">
                    <span>{selectedBatch.instructorRole || 'Head Faculty'}</span>
                    <span className="dot-sep">•</span>
                    <span><Clock size={11} className="inline mr-0.5 text-slate-400" />{selectedBatch.time}</span>
                    <span className="dot-sep">•</span>
                    <span className="text-slate-500 font-mono">{selectedBatch.roomNo || 'Zoom Room #01'}</span>
                  </div>
                </div>
              </div>

              {/* High-Impact Main Join CTA */}
              <div className="showcase-main-cta mt-2">
                <a 
                  href={directZoomJoinLink}
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-join-zoom-hero"
                >
                  <Video size={22} className="flex-shrink-0" />
                  <div className="btn-hero-text">
                    <strong>{selectedBatch.isLive ? 'Join Live Zoom Call Now (1-Click)' : 'Open Zoom Meeting Room'}</strong>
                    <span>Direct Web & Desktop Launch • Zero Setup Required</span>
                  </div>
                  <ExternalLink size={16} className="btn-hero-ext flex-shrink-0" />
                </a>
              </div>

              {/* Quick Secondary Links */}
              <div className="showcase-secondary-links mt-2">
                <a 
                  href={appZoomJoinLink}
                  target="_blank" 
                  rel="noreferrer"
                  className="sub-link-pill"
                  title="Launch in Zoom Desktop/Mobile App"
                >
                  <Monitor size={14} />
                  <span>Launch in Zoom App</span>
                </a>

                <a 
                  href={webZoomJoinLink}
                  target="_blank" 
                  rel="noreferrer"
                  className="sub-link-pill"
                  title="Open Zoom Web Client in browser"
                >
                  <span>Browser Web Client</span>
                </a>

                <button 
                  type="button" 
                  className="sub-link-pill"
                  onClick={() => handleCopy(`Gaya Shorthand Classes - Zoom Live Class\nBatch: ${selectedBatch.title}\nTiming: ${selectedBatch.time}\nMeeting ID: ${selectedBatch.zoomMeetingId}\nPasscode: ${selectedBatch.zoomPasscode}\nDirect Join Link: ${directZoomJoinLink}`, 'invite')}
                  title="Copy full Zoom invitation message"
                >
                  <Share2 size={13} />
                  <span>{copiedType === 'invite' ? 'Invite Copied!' : 'Copy Zoom Invite'}</span>
                </button>
              </div>

              {/* Sleek Credentials Widget Bar */}
              <div className="showcase-creds-widget mt-2 font-mono">
                <div className="cred-widget-item">
                  <span className="cred-lbl">Meeting ID</span>
                  <div className="cred-num-row">
                    <strong>{selectedBatch.zoomMeetingId}</strong>
                    <button 
                      type="button"
                      className="btn-cred-copy-mini"
                      onClick={() => handleCopy(selectedBatch.zoomMeetingId, 'id')}
                      title="Copy Meeting ID"
                    >
                      {copiedType === 'id' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                <div className="cred-widget-item">
                  <span className="cred-lbl">Passcode</span>
                  <div className="cred-num-row">
                    <strong>{selectedBatch.zoomPasscode}</strong>
                    <button 
                      type="button"
                      className="btn-cred-copy-mini"
                      onClick={() => handleCopy(selectedBatch.zoomPasscode, 'pwd')}
                      title="Copy Passcode"
                    >
                      {copiedType === 'pwd' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                <div className="cred-widget-item cred-status-item">
                  <span className="cred-lbl">Room Security</span>
                  <div className="cred-num-row">
                    <span className="text-xs font-sans font-semibold text-emerald-700 flex items-center gap-1">
                      <ShieldCheck size={13} />
                      <span>Encrypted • Waiting Room</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Dictation Briefing, Passage & Practice Hub */}
            <div className="showcase-right-col">
              <div className="briefing-card-panel">
                
                <div className="briefing-panel-header">
                  <div className="flex items-center gap-2">
                    <FileText size={15} style={{ color: '#881337' }} />
                    <span className="briefing-title">TODAY'S DICTATION BRIEFING</span>
                  </div>
                  <span className="briefing-speed-pill font-mono">{selectedBatch.speed}</span>
                </div>

                {/* Topic Banner */}
                <div className="briefing-topic-box mt-2">
                  <span className="topic-sub-lbl">Focus Topic:</span>
                  <h4 className="topic-main-heading">{selectedBatch.todayTopic}</h4>
                </div>

                {/* Passage Snippet */}
                {selectedBatch.passageSnippet && (
                  <div className="briefing-passage-box mt-2">
                    <span className="passage-lbl">Dictation Passage Excerpt:</span>
                    <blockquote className="passage-quote-text">
                      "{selectedBatch.passageSnippet}"
                    </blockquote>
                  </div>
                )}

                {/* Key Shorthand Outlines */}
                {selectedBatch.keyOutlines && selectedBatch.keyOutlines.length > 0 && (
                  <div className="briefing-outlines-box mt-2">
                    <span className="outlines-title-lbl">Key Outlines for This Dictation:</span>
                    <div className="outlines-chips-grid mt-1">
                      {selectedBatch.keyOutlines.map((item, idx) => (
                        <div key={idx} className="outline-mini-chip">
                          <span className="steno-stroke font-mono font-bold ">{item.stroke}</span>
                          <span className="steno-phrase font-semibold">{item.phrase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Post-Dictation Practice Banner */}
                <div className="briefing-post-practice-banner mt-3">
                  <div className="post-practice-text">
                    <strong>Finished the Zoom dictation?</strong>
                    <span>Evaluate your typing speed & accuracy instantly:</span>
                  </div>

                  <div className="post-practice-buttons mt-2">
                    <button 
                      type="button"
                      className="btn-start-transcription-cta"
                      onClick={() => setShowHandoverModal(true)}
                    >
                      <Keyboard size={14} />
                      <span>Start Live Transcription Test</span>
                      <ArrowRight size={13} />
                    </button>

                    <button 
                      type="button"
                      className="btn-audio-vault-cta"
                      onClick={() => onStartTest(recommendedTest)}
                    >
                      <Headphones size={14} />
                      <span>Audio Vault</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. ALL DAILY ZOOM BATCHES & TIMETABLE GRID */}
      <section className="online-schedule-grid-section">
        <div className="schedule-section-header">
          <div>
            <h3 className="schedule-section-title">All Daily Zoom Online Batches & Links</h3>
            <p className="schedule-section-sub">
              Access live Zoom Meeting rooms, Meeting IDs, passcodes, and recorded video archives for all batches.
            </p>
          </div>

          <div className="schedule-count-pill font-mono">
            Showing {filteredBatches.length} Batches
          </div>
        </div>

        <div className="all-classes-cards-grid mt-3">
          {filteredBatches.map((batch) => {
            const isCurrentlySelected = selectedBatch.id === batch.id;
            const batchCleanId = (batch.zoomMeetingId || '').replace(/\s+/g, '');
            const batchDirectUrl = batch.zoomDirectUrl || `https://zoom.us/j/${batchCleanId}?pwd=${batch.zoomPasscode}`;

            return (
              <div 
                key={batch.id} 
                className={`all-class-card ${isCurrentlySelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedBatch(batch)}
              >
                {/* Top Strip: Shift Tag & Status Badge */}
                <div className="card-top-strip">
                  <span className="card-shift-tag">{batch.shift}</span>
                  <span className={`card-status-pill ${batch.badgeClass}`}>
                    {batch.isLive && <span className="live-dot-mini" />}
                    {batch.tag || (batch.isLive ? 'LIVE' : 'UPCOMING')}
                  </span>
                </div>

                {/* Batch Title */}
                <h4 className="card-batch-title">{batch.title}</h4>

                {/* Compact Credentials Strip */}
                <div className="card-zoom-cred-strip font-mono">
                  <div className="cred-cell-mini">
                    <span className="lbl-mini">Zoom ID:</span>
                    <strong className="val-mini">{batch.zoomMeetingId}</strong>
                    <button 
                      type="button" 
                      className="btn-cred-copy-nano"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(batch.zoomMeetingId, `batch-id-${batch.id}`);
                      }}
                      title="Copy Meeting ID"
                    >
                      {copiedType === `batch-id-${batch.id}` ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                    </button>
                  </div>

                  <div className="cred-cell-mini">
                    <span className="lbl-mini">Pass:</span>
                    <strong className="val-mini">{batch.zoomPasscode}</strong>
                    <button 
                      type="button" 
                      className="btn-cred-copy-nano"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(batch.zoomPasscode, `batch-pwd-${batch.id}`);
                      }}
                      title="Copy Passcode"
                    >
                      {copiedType === `batch-pwd-${batch.id}` ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                    </button>
                  </div>
                </div>

                {/* Specs Row: Timing & Speed */}
                <div className="card-specs-row">
                  <div className="spec-item">
                    <Clock size={12} className="text-slate-400" />
                    <span>{batch.time}</span>
                  </div>
                  <div className="spec-item">
                    <Target size={12} className="text-rose-600" />
                    <span className="font-semibold text-rose-800">{batch.speed}</span>
                  </div>
                  <div className="spec-item">
                    <Users size={12} style={{ color: '#881337' }} />
                    <span>{batch.attendees || 1} Learners</span>
                  </div>
                </div>

                {/* Focus Topic Strip */}
                <div className="card-topic-strip">
                  <span className="topic-lbl">Focus:</span>
                  <span className="topic-val">{batch.todayTopic}</span>
                </div>

                {/* Card Footer: Faculty & Actions */}
                <div className="card-footer-strip">
                  <div className="faculty-info">
                    <span className="fac-name">{batch.instructor}</span>
                    <span className="fac-room font-mono">{batch.roomNo || 'Zoom Room #01'}</span>
                  </div>

                  <div className="card-actions">
                    <a 
                      href={batchDirectUrl}
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-card-zoom-join"
                      onClick={(e) => e.stopPropagation()}
                      title="Open directly in Zoom"
                    >
                      <Video size={13} />
                      <span>Join Zoom</span>
                      <ExternalLink size={10} />
                    </a>

                    <button 
                      type="button" 
                      className={`btn-card-select-batch ${isCurrentlySelected ? 'is-active-btn' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBatch(batch);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                    >
                      <span>{isCurrentlySelected ? 'Selected' : 'Select'}</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. TEST HANDOVER MODAL */}
      {showHandoverModal && (
        <div className="handover-modal-backdrop" onClick={() => setShowHandoverModal(false)}>
          <div className="handover-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="handover-modal-header">
              <div className="header-badge">
                <Keyboard size={16} className="text-rose-600" />
                <span>EXAMINATION & SPEED EVALUATION HANDOVER</span>
              </div>
              <button 
                type="button" 
                className="btn-modal-close" 
                onClick={() => setShowHandoverModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="handover-modal-body">
              <h3>Choose Your Transcription Mode for Today's Lecture:</h3>
              <p>
                The passage dictated in today's Zoom class (<em>"{selectedBatch.todayTopic}"</em>) is calibrated for instant evaluation.
              </p>

              <div className="handover-options-grid">
                {/* Option 1: Full Shorthand Examination */}
                <div 
                  className="handover-option-card"
                  onClick={() => {
                    setShowHandoverModal(false);
                    onStartTest(recommendedTest);
                  }}
                >
                  <div className="opt-icon-squircle bg-rose-50 text-rose-700">
                    <Headphones size={24} />
                  </div>
                  <h4>Full Steno Dictation & Transcription</h4>
                  <p>
                    Audio dictation playback with 5-minute reading clock, mechanical typing lock, and real AI error percentage evaluation.
                  </p>
                  <span className="opt-cta-btn">Start Full Steno Exam →</span>
                </div>

                {/* Option 2: Direct Mechanical Typing Benchmark */}
                <div 
                  className="handover-option-card"
                  onClick={() => {
                    setShowHandoverModal(false);
                    const typingTestObj = TYPING_TESTS ? TYPING_TESTS[0] : recommendedTest;
                    if (onStartTypingTest) {
                      onStartTypingTest(typingTestObj);
                    } else {
                      onStartTest(recommendedTest);
                    }
                  }}
                >
                  <div className="opt-icon-squircle bg-rose-50 text-rose-800">
                    <Keyboard size={24} />
                  </div>
                  <h4>Direct Mechanical Typing Benchmark</h4>
                  <p>
                    Transcribe today's speech immediately on computer layout with real-time gross WPM, net WPM, and error highlighter.
                  </p>
                  <span className="opt-cta-btn">Start Typing Test →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
