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
  Keyboard
} from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/mockData';

const DAILY_BATCHES = [
  {
    id: 'batch-morning-1',
    time: '6:00 AM – 8:00 AM',
    shift: 'Morning Early Bird',
    title: 'Basic Pitman Shorthand Theory & New Strokes',
    speed: 'Beginners (0 - 60 WPM)',
    instructor: 'Gagan Sir',
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
    instructor: 'Gagan Sir & Senior Faculty',
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
    instructor: 'Gagan Sir',
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

export default function ClassesPage({ onOpenCheckout, setCurrentTab, onlineClasses = [], onSelectClass }) {
  const [activeTab, setActiveTab] = useState('online-live'); // 'online-live' | 'batches' | 'timetable' | 'diplomas' | 'notices'
  const [copiedId, setCopiedId] = useState(false);

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
      <div className="classes-hero-banner">
        <div className="classes-hero-container">
          <div className="classes-hero-badge">
            <Sparkles size={14} className="text-amber-300" />
            <span>ACADEMY BATCH TIMINGS & SCHEDULE • ESTD. 2008</span>
          </div>
          <h1 className="classes-hero-title">
            Classroom Batches, Timetable & Live Dictations
          </h1>
          <p className="classes-hero-desc">
            Attend daily in-person classes at our Gaya academy or access live broadcast Zoom dictations from anywhere. Six daily batches spanning 6:00 AM to 8:00 PM.
          </p>

          {/* Tab Navigation Switcher */}
          <div className="classes-nav-tabs">
            <button 
              className={`class-nav-tab ${activeTab === 'online-live' ? 'active tab-live-active' : ''}`}
              onClick={() => setActiveTab('online-live')}
            >
              <span className="live-dot-mini" />
              <span>🔴 Live Zoom Studio (Online)</span>
            </button>
            <button 
              className={`class-nav-tab ${activeTab === 'batches' ? 'active' : ''}`}
              onClick={() => setActiveTab('batches')}
            >
              <span>🏛️ Daily Academy Batches</span>
            </button>
            <button 
              className={`class-nav-tab ${activeTab === 'timetable' ? 'active' : ''}`}
              onClick={() => setActiveTab('timetable')}
            >
              <span>📅 Weekly Timetable</span>
            </button>
            <button 
              className={`class-nav-tab ${activeTab === 'diplomas' ? 'active' : ''}`}
              onClick={() => setActiveTab('diplomas')}
            >
              <span>📜 Govt. Diplomas (DCA/ADCA)</span>
            </button>
            <button 
              className={`class-nav-tab ${activeTab === 'notices' ? 'active' : ''}`}
              onClick={() => setActiveTab('notices')}
            >
              <span>🔔 Recruitment Notices</span>
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
            <div className="online-live-hero-card">
              <div className="hero-card-left">
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
                  Conducted by <strong>{activeClass?.instructor || 'Gagan Sir'}</strong> ({activeClass?.instructorRole || '18+ Yrs Exp'}). {activeClass?.description || 'Real-time 5-minute parliamentary dictation, synchronized digital shorthand whiteboard with interactive student drawing, live audio player with 0.8x-1.3x pacing, and immediate transcription grading.'}
                </p>

                {/* Zoom Credentials Box */}
                <div className="live-hero-creds-strip">
                  <div className="cred-bubble">
                    <span className="lbl">Meeting ID:</span>
                    <strong className="font-mono">{activeClass?.zoomMeetingId || '842 9104 2281'}</strong>
                    <button 
                      type="button" 
                      className="btn-inline-copy"
                      onClick={handleCopyId}
                      title="Copy Meeting ID"
                    >
                      {copiedId ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      <span>{copiedId ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="cred-bubble">
                    <span className="lbl">Passcode:</span>
                    <strong className="font-mono">{activeClass?.zoomPasscode || 'GAYA80WPM'}</strong>
                  </div>
                  <div className="cred-bubble">
                    <span className="lbl">Schedule:</span>
                    <span>{activeClass?.time || '8:30 AM – 10:30 AM (Daily)'}</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="live-hero-actions-row">
                  <button 
                    type="button"
                    className="btn-enter-live-studio"
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
                    className="btn-launch-external-zoom"
                  >
                    <ExternalLink size={15} />
                    <span>Launch in Zoom Desktop App</span>
                  </a>
                </div>
              </div>

              {/* Right Preview Card / Whiteboard Teaser */}
              <div className="hero-card-right">
                <div className="mini-stream-preview-box">
                  <div className="mini-stream-header font-mono">
                    <span className="mini-rec-dot" />
                    <span>STUDIO WHITEBOARD FEED • 1080P HD</span>
                  </div>
                  <div className="mini-stream-body">
                    <div className="mini-teacher-badge">
                      <span className="mini-avatar">GS</span>
                      <div>
                        <span className="mini-name">Gagan Sir (Host)</span>
                        <span className="mini-role">Live Audio Dictating</span>
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

                  <div className="mini-stream-footer">
                    <button 
                      className="btn-mini-launch"
                      onClick={() => setCurrentTab('online-classes')}
                    >
                      <span>Join Interactive Session Now</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Online Classes Features Trio */}
            <div className="online-features-cards-grid mt-4">
              <div className="online-feat-card">
                <div className="feat-icon-squircle bg-blue-50 text-blue-600">
                  <Video size={22} />
                </div>
                <h3>Dual-Mode Shorthand Whiteboard</h3>
                <p>
                  Watch teacher strokes live or switch to your own interactive HTML5 stylus canvas to trace outlines with fine pencil or heavy calligraphy pens.
                </p>
              </div>

              <div className="online-feat-card">
                <div className="feat-icon-squircle bg-rose-50 text-rose-600">
                  <Volume2 size={22} />
                </div>
                <h3>Speed-Controlled Dictation Engine</h3>
                <p>
                  Built-in audio player with 0.8x, 1.0x, 1.1x, 1.2x, and 1.3x multipliers. Practice at custom speeds without pitch distortion.
                </p>
              </div>

              <div className="online-feat-card">
                <div className="feat-icon-squircle bg-emerald-50 text-emerald-600">
                  <Keyboard size={22} />
                </div>
                <h3>1-Click Typing Test Handover</h3>
                <p>
                  Immediately transition from the live Zoom dictation into the exam typing engine to transcribe your strokes with instant accuracy metrics.
                </p>
              </div>
            </div>

            {/* All 4 Daily Zoom Batches Schedule */}
            <div className="online-schedule-summary-box mt-4">
              <div className="schedule-box-header">
                <h3>All 4 Daily Online Zoom Dictation Batches</h3>
                <p>All online sessions are recorded and available for replay 24/7 in the Candidate Portal.</p>
              </div>

              <div className="online-batches-horizontal-grid">
                {(onlineClasses && onlineClasses.length > 0 ? onlineClasses : [
                  { id: 'class-theory-2', time: '6:00 AM – 8:00 AM', badgeClass: 'badge-replay', tag: 'Recording Ready', title: 'Basic Pitman Theory & New Strokes', speed: 'Beginners (0 - 60 WPM)', zoomMeetingId: '815 6742 9904' },
                  { id: 'class-live-1', isLive: true, time: '8:30 AM – 10:30 AM', badgeClass: 'badge-live', tag: '● Active Live', title: 'SSC Grade C & D 80 WPM Speed Lab', speed: '80 WPM Standard', zoomMeetingId: '842 9104 2281' },
                  { id: 'class-judicial-3', time: '3:00 PM – 5:00 PM', badgeClass: 'badge-upcoming', tag: 'Starts 3:00 PM', title: 'High Court Judicial 100 WPM Bench', speed: '100 WPM Judicial', zoomMeetingId: '879 3341 5520' },
                  { id: 'class-reporter-4', time: '5:30 PM – 7:30 PM', badgeClass: 'badge-upcoming', tag: 'Starts 5:30 PM', title: 'Assembly Reporter 120+ WPM Elite', speed: '120-140 WPM', zoomMeetingId: '891 4059 1133' }
                ]).map((b) => (
                  <div key={b.id} className={`online-batch-mini-card ${b.isLive ? 'is-active-now' : ''}`}>
                    <div className="mini-card-top">
                      <span className={`batch-shift-pill ${b.isLive ? 'bg-rose-600 text-white' : ''}`}>{b.time}</span>
                      <span className={`badge ${b.badgeClass}`}>{b.tag}</span>
                    </div>
                    <h4>{b.title}</h4>
                    <p className={`font-mono text-xs ${b.isLive ? 'text-rose-800 font-semibold' : 'text-muted'}`}>
                      {b.speed} • Zoom ID: {b.zoomMeetingId}
                    </p>
                    <button 
                      className={`btn-join-batch-link ${b.isLive ? 'font-bold text-rose-700' : ''}`}
                      onClick={() => {
                        if (onSelectClass) {
                          onSelectClass(b.id);
                        } else {
                          setCurrentTab('online-classes');
                        }
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
                    <td>Gagan Sir</td>
                    <td>Vowels, Stroke Angles & Daily Homework Check</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-bold text-royal-blue">8:30 AM – 10:30 AM</td>
                    <td><strong>SSC Steno Grade C & D</strong></td>
                    <td><span className="badge badge-amber font-mono">80 WPM</span></td>
                    <td>Computer Lab 1 (50 PCs)</td>
                    <td>Gagan Sir & Lab Head</td>
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
                    <td>Gagan Sir</td>
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
                      onClick={() => setCurrentTab('tests')}
                    >
                      <span>Practice Exam Tests →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 3. BOTTOM OFFLINE CENTER INFO */}
      <section className="classes-center-strip">
        <div className="classes-content-container">
          <div className="classes-center-box">
            <div className="center-box-left">
              <div className="center-icon-wrap">
                <Building size={24} className="text-royal-blue" />
              </div>
              <div>
                <h4>Join Offline Classroom at Gaya Center</h4>
                <p>Near Railway Station / Tower Chowk, Gaya, Bihar - 823001 • Batches run daily Monday to Saturday</p>
              </div>
            </div>
            <a 
              href="tel:+919204123453"
              className="btn-center-call"
            >
              <Phone size={16} />
              <span>Call Director Desk: +91 9204123453</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
