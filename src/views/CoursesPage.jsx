import React, { useState } from 'react';
import { 
  GraduationCap, 
  Clock, 
  ArrowRight, 
  Phone, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Search,
  BookOpen,
  Keyboard,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { PRICING_PLANS, TARGET_EXAMINATIONS, TEACHING_METHODOLOGY } from '../data/mockData';
import '../landing-redesign.css';

const ACADEMY_COURSES = [
  {
    id: 'course-pitman',
    title: 'English Shorthand (Pitman)',
    category: 'English Shorthand',
    badge: 'SSC & Court Special',
    tagColor: 'amber',
    speedTarget: '60 to 120 WPM',
    duration: '3 to 4 Months',
    fee: '₹4,500',
    originalFee: '₹6,000',
    feeType: 'Complete Course',
    description: 'Master Pitman shorthand from basic consonant theory to 120 WPM high-speed dictations for SSC and High Court exams.',
    highlights: [
      'Complete Pitman book theory, grammalogues & phraseography',
      'Daily handwritten outline verification by Shadab Sir',
      'Speed dictations scaled from 60 to 120 WPM with reading room',
      'Computer transcription lab & automated error calculation'
    ],
    syllabus: [
      'Basic to Advanced Shorthand Training',
      'Pitman Shorthand Theory (Consonants & Vowels)',
      'Grammalogues and Phraseography',
      'Short Forms and Special Rules',
      'Word Formation and Sentence Practice',
      'Daily Dictation Practice',
      'Speed Development: 60, 80, 100 and 120 WPM',
      'Transcription Practice & Accuracy Improvement Techniques',
      'Exam-Oriented Mock Tests (SSC, High Court, PA/PS)'
    ],
    mode: 'Gaya Lab + Online Portal',
    popular: true,
    flagshipNum: '01',
    icon: 'BookOpen'
  },
  {
    id: 'course-hindi-steno',
    title: 'Hindi Shorthand (हिंदी आशुलिपि)',
    category: 'Hindi Shorthand',
    badge: 'State & High Court Special',
    tagColor: 'amber',
    speedTarget: '50 to 120+ WPM',
    duration: '3 to 6 Months',
    fee: '₹4,500',
    originalFee: '₹6,000',
    feeType: 'Complete Course',
    description: 'Complete Hindi shorthand training with regular speed dictations, outline rules, and transcription.',
    highlights: [
      'Complete Hindi shorthand theory (स्वर एवं व्यंजन नियम)',
      'Daily Hindi audio dictations from 50 to 120+ WPM',
      'Dual-font transcription support: Kruti Dev 010 & Mangal',
      'Targeted preparation for Patna HC, Civil Courts & SSC'
    ],
    syllabus: [
      'Basic Hindi Shorthand Theory',
      'Hindi Shorthand Signs and Symbols',
      'Vowels and Consonants (स्वर एवं व्यंजन)',
      'Word Formation and Sentence Writing',
      'Shorthand Rules and Principles',
      'Daily Hindi Dictation Practice',
      'Speed Practice (50, 80, 100 & 120 WPM)',
      'Reading and Transcription (Kruti Dev 010 & Mangal)',
      'Accuracy Improvement Techniques',
      'Exam-Oriented Practice Tests'
    ],
    mode: 'Gaya Lab + Online Portal',
    popular: true,
    flagshipNum: '02',
    icon: 'FileText'
  },
  {
    id: 'course-bilingual-typing',
    title: 'Dual Typing Lab (English & Hindi)',
    category: 'Typing Lab',
    badge: 'Dual Language',
    tagColor: 'blue',
    speedTarget: '30 to 60+ WPM',
    duration: '2 to 3 Months',
    fee: '₹2,500',
    originalFee: '₹3,500',
    feeType: 'Complete Dual Lab',
    description: 'Combined dual-language course covering English QWERTY and Hindi Kruti Dev 010 & Mangal in one package.',
    highlights: [
      'Complete English QWERTY touch-typing curriculum',
      'Complete Hindi Kruti Dev 010 + Mangal Inscript training',
      'Specialized for High Court, Civil Court & BSSC Clerk exams',
      'Online software with full mistake formula evaluation'
    ],
    syllabus: [
      'English QWERTY Touch Typing Mastery',
      'Hindi Keyboard Training (Kruti Dev 010 Layout)',
      'Hindi Mangal Inscript Unicode Font Mastery',
      'Remington (GAIL / CBI) Standard Keyboard Layout',
      'Bilingual Word, Sentence & Paragraph Practice',
      'Dual-Language Speed Building Exercises (30 to 60+ WPM)',
      'Real-Time Accuracy Improvement & Error Reduction',
      'Online Bilingual Typing Software Practice',
      'Court & Government Examination Simulated Tests'
    ],
    mode: 'Classroom Lab + Typing Software',
    popular: true,
    flagshipNum: '03',
    icon: 'Keyboard'
  },
  {
    id: 'course-court',
    title: 'High Court Judicial Speed Bench',
    category: 'Judicial Series',
    badge: 'Patna & Jharkhand HC',
    tagColor: 'purple',
    speedTarget: '80 to 110 WPM',
    duration: '1 to 3 Months',
    fee: '₹700',
    originalFee: '₹1,000',
    feeType: 'Monthly Pass',
    description: 'Courtroom dictation series with actual criminal appeals, bail orders, and judicial terminology.',
    highlights: [
      'Authentic High Court criminal & civil judgment audio',
      'Legal vocabulary, Latin maxims & judicial phrases',
      'Strict 5-minute reading room countdown clock',
      'Mechanical keyboard typing simulation & backspace lock'
    ],
    syllabus: [
      'Authentic High Court Criminal & Civil Judgment Audio',
      'Legal Phrasing, Latin Maxims & Judicial Nomenclature',
      'Enforced 5-Minute Shorthand Reading Room Clock',
      'Strict Backspace Lock & Mechanical Keyboard Simulation',
      'Previous 10 Years Solved High Court Dictations'
    ],
    mode: 'Gaya Lab + Online Portal',
    popular: false,
    icon: 'ShieldCheck'
  },
  {
    id: 'course-ssc',
    title: 'SSC Stenographer Grade C & D Batch',
    category: 'Central Govt',
    badge: 'Grade C & D Focus',
    tagColor: 'amber',
    speedTarget: '80 & 100 WPM',
    duration: '3 Months Intensive',
    fee: '₹350',
    originalFee: '₹500',
    feeType: 'Monthly Pass',
    description: 'Intensive speed preparation targeting SSC Grade C (100 WPM) and Grade D (80 WPM) skill tests.',
    highlights: [
      'Parliamentary speeches & union budget passage dictations',
      'Official SSC mistake formula: full & half mistake scoring',
      'Daily 8:00 AM & 5:00 PM benchmark speed tests',
      'All-India live merit rank & percentile leaderboard'
    ],
    syllabus: [
      'Parliamentary Speeches & Government Budget Passages',
      'SSC Strict Mistake Formula (Full & Half Mistake Evaluation)',
      'Daily 8:00 AM & 5:00 PM Live Speed Benchmark Tests',
      'All-India Batch Rank & Percentile Scorecards',
      'Kruti Dev 010 & Mangal Inscript Hindi Transcription'
    ],
    mode: 'Daily Live Dictation + Audio Archive',
    popular: false,
    icon: 'Award'
  },
  {
    id: 'course-diplomas',
    title: 'Computer Diplomas (ADCA / DCA)',
    category: 'Govt Diplomas',
    badge: 'Govt. Recognized',
    tagColor: 'purple',
    speedTarget: 'IT & Typing Skills',
    duration: '6 to 12 Months',
    fee: '₹1,200',
    originalFee: '₹1,800',
    feeType: 'Nominal Registration',
    description: 'Government recognized 6-month DCA and 1-year ADCA diploma programs with verifiable QR codes.',
    highlights: [
      'Official DCA (6 Mos) and ADCA (12 Mos) certification',
      'MS Office Suite (Word, Excel, PowerPoint) & Internet',
      'Tally Prime with GST invoicing & accounting',
      'QR code online certificate verification system'
    ],
    syllabus: [
      'ADCA (1 Year) & DCA (6 Months) Complete Computer Syllabus',
      'MS Office Suite (Word, Excel, PowerPoint) & Internet Applications',
      'Tally Prime with GST Invoicing & Accounting',
      'English QWERTY & Hindi (Kruti Dev / Mangal) Typing Speed Studio',
      'Career-Oriented Training for Steno, Data Entry & Clerical Roles',
      'Certificate Verification System with Official QR Code'
    ],
    mode: 'Gaya Lab + Govt Certification',
    popular: false,
    icon: 'GraduationCap'
  },
  {
    id: 'course-english-typing',
    title: 'English Touch Typing Mastery',
    category: 'Typing Lab',
    badge: 'Speed & Accuracy',
    tagColor: 'blue',
    speedTarget: '30 to 60+ WPM',
    duration: '1 to 3 Months',
    fee: '₹1,500',
    originalFee: '₹2,000',
    feeType: 'Complete Training',
    description: 'Scientific touch-typing with proper finger positioning, backspace lock simulation, and exam HUD.',
    highlights: [
      'Home row finger placement & touch-typing fundamentals',
      'Speed building drills from 30 WPM to 60+ WPM',
      'Exam software simulation with strict backspace lock',
      'Real-time gross speed, net speed, and error percentage'
    ],
    syllabus: [
      'Keyboard Introduction & Ergonomics',
      'Home Row and Finger Placement',
      'Touch Typing Techniques without Looking',
      'Word and Sentence Practice',
      'Paragraph Typing & Speed Drills',
      'Accuracy Improvement Drills',
      'Online Typing Software Practice',
      'Computer-Based Typing Tests',
      'Speed Target: 30, 35, 40, 50 and 60+ WPM'
    ],
    mode: 'Classroom Lab + Typing Software',
    popular: false,
    icon: 'Keyboard'
  },
  {
    id: 'course-hindi-typing',
    title: 'Hindi Typing (Kruti Dev & Mangal)',
    category: 'Typing Lab',
    badge: 'Kruti Dev 010 & Mangal',
    tagColor: 'amber',
    speedTarget: '30 to 50+ WPM',
    duration: '1 to 3 Months',
    fee: '₹1,500',
    originalFee: '₹2,000',
    feeType: 'Complete Training',
    description: 'Master Kruti Dev 010 and Mangal Inscript typing layouts required for Bihar and Central govt exams.',
    highlights: [
      'Kruti Dev 010 keyboard layout & special alt-codes',
      'Mangal Inscript & Remington (GAIL / CBI) training',
      'Paragraph drills on official govt test patterns',
      'Error scoring matching BSSC and High Court criteria'
    ],
    syllabus: [
      'Hindi Keyboard Introduction',
      'Kruti Dev 010 Typing Mastery',
      'Mangal Font Typing (Inscript Layout)',
      'Remington (GAIL / CBI) Keyboard Layout',
      'Word and Sentence Practice',
      'Paragraph Typing Exercises',
      'Speed and Accuracy Development',
      'Online Hindi Typing Software Practice',
      'Government Exam-Oriented Practice Tests'
    ],
    mode: 'Classroom Lab + Typing Software',
    popular: false,
    icon: 'Keyboard'
  }
];

export default function CoursesPage({ 
  courses = ACADEMY_COURSES, 
  onSelectPlan, 
  onOpenCheckout, 
  onOpenAdmission, 
  setCurrentTab 
}) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [passFilter, setPassFilter] = useState('unlimited');
  const [expandedSyllabus, setExpandedSyllabus] = useState({});

  const toggleSyllabus = (courseId) => {
    setExpandedSyllabus(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const displayCourses = courses && courses.length > 0 ? courses : ACADEMY_COURSES;

  const handleEnroll = (course) => {
    const coursePlanMap = {
      'course-pitman': { id: 'course-pitman', name: 'Basic Pitman Shorthand Course', price: 4500, duration: '3 to 4 Months (Complete Book)', description: 'Complete Pitman book theory, daily homework correction & audio vault access.' },
      'course-court': { id: 'course-court', name: 'High Court Judicial Speed Series', price: 700, duration: 'Monthly Subscription', description: 'Specialized High Court courtroom reporter transcription batch.' },
      'course-ssc': { id: 'course-ssc', name: 'SSC Stenographer Crash Batch', price: 350, duration: 'Monthly Subscription', description: 'Parliamentary speeches, live speed tests, and automated error calculation.' },
      'course-diplomas': { id: 'course-diplomas', name: 'Computer Diplomas (DCA / ADCA)', price: 1200, duration: 'Govt. Diploma Registration', description: 'Official government-accredited computer applications diploma.' }
    };
    const numFee = parseInt(String(course.fee || '').replace(/\D/g, '')) || 499;
    const planToOpen = coursePlanMap[course.id] || {
      id: course.id,
      name: course.title,
      price: numFee,
      duration: course.duration || 'Academy Batch Access',
      description: course.description || 'Complete batch curriculum with live and archive dictation access.'
    };
    if (onOpenCheckout) onOpenCheckout(planToOpen);
  };

  const handleSelectFilter = (categoryKey) => {
    setFilterCategory(categoryKey);
    const target = document.getElementById('academy-courses');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter courses by category tab AND search text
  const filteredCourses = displayCourses.filter((course) => {
    const cat = (course.category || '').toLowerCase();
    const id = (course.id || '').toLowerCase();
    const title = (course.title || '').toLowerCase();
    const desc = (course.description || '').toLowerCase();
    const syllabusText = (course.syllabus || []).join(' ').toLowerCase();

    // 1. Category match
    let matchesCategory = true;
    if (filterCategory === 'pitman') matchesCategory = id === 'course-pitman' || title.includes('english shorthand');
    else if (filterCategory === 'hindi-steno') matchesCategory = id === 'course-hindi-steno' || title.includes('hindi shorthand') || title.includes('हिंदी आशुलिपि');
    else if (filterCategory === 'typing') matchesCategory = cat.includes('typing') || id.includes('typing') || title.includes('typing');
    else if (filterCategory === 'court') matchesCategory = cat.includes('judicial') || id.includes('court') || title.includes('court');
    else if (filterCategory === 'ssc') matchesCategory = cat.includes('central') || id.includes('ssc') || title.includes('ssc');
    else if (filterCategory === 'diplomas') matchesCategory = cat.includes('diploma') || id.includes('diploma') || title.includes('diploma') || title.includes('dca');

    if (!matchesCategory) return false;

    // 2. Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        title.includes(q) || 
        desc.includes(q) || 
        cat.includes(q) || 
        syllabusText.includes(q) ||
        (course.speedTarget || '').toLowerCase().includes(q) ||
        (course.badge || '').toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    return true;
  });

  const CATEGORY_TABS = [
    { id: 'all', label: 'All Programs', count: displayCourses.length },
    { id: 'pitman', label: 'English Shorthand' },
    { id: 'hindi-steno', label: 'Hindi Shorthand' },
    { id: 'typing', label: 'Typing Lab' },
    { id: 'court', label: 'High Court Judicial' },
    { id: 'ssc', label: 'SSC Grade C & D' },
    { id: 'diplomas', label: 'Diplomas (ADCA/DCA)' }
  ];

  // Distinguish flagship vs specialized for the "All Programs" view when no search query is active
  const flagshipCourses = filteredCourses.filter(c => c.popular);
  const specializedCourses = filteredCourses.filter(c => !c.popular);
  const showSplitSections = filterCategory === 'all' && !searchQuery.trim() && flagshipCourses.length > 0 && specializedCourses.length > 0;

  // Symmetrical Passes splitting (4 core unlimited + 3 specialized)
  const corePasses = [
    PRICING_PLANS.find(p => p.id === 'plan-1day'),
    PRICING_PLANS.find(p => p.id === 'plan-1mo'),
    PRICING_PLANS.find(p => p.id === 'plan-6mo'),
    PRICING_PLANS.find(p => p.id === 'plan-12mo')
  ].filter(Boolean);

  const specializedPasses = [
    PRICING_PLANS.find(p => p.id === 'plan-patna-hc'),
    PRICING_PLANS.find(p => p.id === 'plan-jharkhand-hc'),
    PRICING_PLANS.find(p => p.id === 'plan-pitman')
  ].filter(Boolean);

  const renderFlagshipCard = (course, index) => {
    const isSyllabusOpen = !!expandedSyllabus[course.id];
    const numLabel = `0${index + 1} · FLAGSHIP`;
    return (
      <div key={course.id} className="sp-flagship-card">
        <div className="sp-flagship-accent-bar" />
        
        <div className="sp-flagship-body">
          {/* Top Micro-Row */}
          <div className="sp-flagship-top-band">
            <span className="sp-flagship-num">
              {numLabel}
            </span>
            <span className="sp-course-speed-badge">
              {course.speedTarget}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="sp-course-title">
            {course.title}
          </h3>
          <p className="sp-course-desc">
            {course.description}
          </p>

          {/* Flush Key-Value Specs */}
          <div className="sp-course-specs-strip">
            <div className="sp-course-spec-item">
              <Clock className="sp-course-spec-icon" />
              <span><strong>Duration:</strong> {course.duration}</span>
            </div>
            <div className="sp-course-spec-item">
              <GraduationCap className="sp-course-spec-icon" />
              <span><strong>Format:</strong> {course.mode}</span>
            </div>
          </div>

          {/* Curriculum Highlights (Max 3) */}
          <ul className="sp-course-highlights-list">
            {(course.highlights || course.syllabus.slice(0, 3)).slice(0, 3).map((item, idx) => (
              <li key={idx} className="sp-course-highlight-item">
                <Check className="sp-course-check-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Expandable Syllabus Toggle */}
          <button
            type="button"
            onClick={() => toggleSyllabus(course.id)}
            className="sp-course-syllabus-toggle"
          >
            <span>{isSyllabusOpen ? 'Hide Full Syllabus' : `View Full Syllabus (${course.syllabus.length} Topics)`}</span>
            {isSyllabusOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {isSyllabusOpen && (
            <div className="sp-course-syllabus-drawer">
              <ul>
                {course.syllabus.map((s, idx) => (
                  <li key={idx}>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="sp-course-footer">
          <div className="sp-course-price-wrap">
            <div className="sp-course-price-row">
              <span className="sp-course-price">
                {course.fee}
              </span>
              {course.originalFee && (
                <span className="sp-course-original-price">
                  {course.originalFee}
                </span>
              )}
            </div>
            <span className="sp-course-price-sub">
              {course.feeType || 'Official Curriculum'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleEnroll(course)}
            className="sp-course-enroll-btn"
          >
            <span>Enroll Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  };

  const renderStandardCard = (course) => {
    const isSyllabusOpen = !!expandedSyllabus[course.id];
    return (
      <div key={course.id} className="sp-course-card">
        <div>
          {/* Top Micro-Row */}
          <div className="sp-course-card-top">
            <span className="sp-course-category-label">
              {course.category}
            </span>
            <span className="sp-course-speed-badge">
              {course.speedTarget}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="sp-course-title">
            {course.title}
          </h3>
          <p className="sp-course-desc">
            {course.description}
          </p>

          {/* Flush Key-Value Specs */}
          <div className="sp-course-specs-strip">
            <div className="sp-course-spec-item">
              <Clock className="sp-course-spec-icon" />
              <span><strong>Duration:</strong> {course.duration}</span>
            </div>
            <div className="sp-course-spec-item">
              <GraduationCap className="sp-course-spec-icon" />
              <span><strong>Format:</strong> {course.mode}</span>
            </div>
          </div>

          {/* Curriculum Highlights (Max 3) */}
          <ul className="sp-course-highlights-list">
            {(course.highlights || course.syllabus.slice(0, 3)).slice(0, 3).map((item, idx) => (
              <li key={idx} className="sp-course-highlight-item">
                <Check className="sp-course-check-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Expandable Syllabus Toggle */}
          <button
            type="button"
            onClick={() => toggleSyllabus(course.id)}
            className="sp-course-syllabus-toggle"
          >
            <span>{isSyllabusOpen ? 'Hide Full Syllabus' : `View Full Syllabus (${course.syllabus.length} Topics)`}</span>
            {isSyllabusOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {isSyllabusOpen && (
            <div className="sp-course-syllabus-drawer">
              <ul>
                {course.syllabus.map((s, idx) => (
                  <li key={idx}>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="sp-course-footer">
          <div className="sp-course-price-wrap">
            <div className="sp-course-price-row">
              <span className="sp-course-price">
                {course.fee}
              </span>
              {course.originalFee && (
                <span className="sp-course-original-price">
                  {course.originalFee}
                </span>
              )}
            </div>
            <span className="sp-course-price-sub">
              {course.feeType || 'Official Curriculum'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleEnroll(course)}
            className="sp-course-enroll-btn"
          >
            <span>Enroll Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="sp-courses-root">
      
      {/* =========================================================================
          SECTION 1: DEEP INK EDITORIAL HERO & INTERACTIVE TRACK FINDER
          ========================================================================= */}
      <section className="sp-courses-dark-hero">
        <div className="sp-courses-hero-grid">
          
          {/* Left Column: Editorial Headline & Credentials */}
          <div className="sp-courses-hero-left">
            <span className="sp-courses-hero-eyebrow">
              ACADEMY CURRICULUM &middot; GAYA CENTER &amp; LIVE ONLINE
            </span>
            <h1 className="sp-courses-hero-h1">
              Stenography Courses &amp; <span className="sp-courses-hero-serif">Examination</span> Programs
            </h1>
            <p className="sp-courses-hero-subtext">
              From absolute zero in Pitman Shorthand to cracking High Court &amp; SSC Stenographer skill tests at 50–140 WPM. Guided by Shadab Sir (12+ Years Experience) with real-time dictations and automated error calculation.
            </p>

            <div className="sp-courses-hero-stats">
              <div className="sp-courses-hero-stat-item">
                <span className="sp-courses-hero-stat-dot" />
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>15+ Structured Programs</span>
              </div>
              <div className="sp-courses-hero-stat-item">
                <span className="sp-courses-hero-stat-dot" />
                <span>50–140 WPM Speed Range</span>
              </div>
              <div className="sp-courses-hero-stat-item">
                <span className="sp-courses-hero-stat-dot" />
                <span>3 Free Demo Classes</span>
              </div>
              <div className="sp-courses-hero-stat-item">
                <span className="sp-courses-hero-stat-dot" />
                <span>Gaya Lab + Live Portal</span>
              </div>
            </div>
          </div>

          {/* Right Column: "Find Your Track" Quick-Selector Panel */}
          <div className="sp-track-finder-panel">
            <div className="sp-track-finder-header">
              <h3 className="sp-track-finder-title">
                Find Your Ideal Track
              </h3>
              <p className="sp-track-finder-sub">
                Click your goal to filter programs below:
              </p>
            </div>

            <div className="sp-track-finder-grid">
              {/* Goal 1: Beginner */}
              <button
                type="button"
                onClick={() => handleSelectFilter('pitman')}
                className="sp-track-goal-btn"
              >
                <span className="sp-track-goal-title">
                  <span>Beginner (0 WPM)</span>
                  <ArrowRight size={12} style={{ color: '#94A3B8' }} />
                </span>
                <span className="sp-track-goal-sub">
                  Learn Pitman from Zero
                </span>
              </button>

              {/* Goal 2: SSC Steno */}
              <button
                type="button"
                onClick={() => handleSelectFilter('ssc')}
                className="sp-track-goal-btn"
              >
                <span className="sp-track-goal-title">
                  <span>SSC Steno (80–100)</span>
                  <ArrowRight size={12} style={{ color: '#94A3B8' }} />
                </span>
                <span className="sp-track-goal-sub">
                  Grade C &amp; D Speed Batch
                </span>
              </button>

              {/* Goal 3: High Court */}
              <button
                type="button"
                onClick={() => handleSelectFilter('court')}
                className="sp-track-goal-btn"
              >
                <span className="sp-track-goal-title">
                  <span>High Court Legal</span>
                  <ArrowRight size={12} style={{ color: '#94A3B8' }} />
                </span>
                <span className="sp-track-goal-sub">
                  Judicial Judgment Dictations
                </span>
              </button>

              {/* Goal 4: Typing & Diplomas */}
              <button
                type="button"
                onClick={() => handleSelectFilter('typing')}
                className="sp-track-goal-btn"
              >
                <span className="sp-track-goal-title">
                  <span>Typing &amp; Diplomas</span>
                  <ArrowRight size={12} style={{ color: '#94A3B8' }} />
                </span>
                <span className="sp-track-goal-sub">
                  Hindi/English &amp; ADCA/DCA
                </span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: STICKY GLASSMORPHIC FILTER & LIVE SEARCH BAR
          ========================================================================= */}
      <div className="sp-courses-sticky-bar">
        <div className="sp-courses-sticky-container">
          
          {/* Scrollable Horizontal Underline Tabs */}
          <div className="sp-courses-sticky-tabs" role="tablist">
            {CATEGORY_TABS.map((tab) => {
              const isActive = filterCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectFilter(tab.id)}
                  className={`sp-courses-filter-tab ${isActive ? 'is-active' : ''}`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="sp-courses-filter-count">({tab.count})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: Counter + Compact Search */}
          <div className="sp-courses-sticky-right">
            <span className="sp-courses-count-pill">
              Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'program' : 'programs'}
            </span>
            
            <div className="sp-courses-search-wrap-sticky">
              <Search size={13} className="sp-courses-search-icon" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Patna HC, Kruti Dev..."
                className="sp-courses-search-input-sticky"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '14px',
                    lineHeight: 1
                  }}
                  title="Clear search"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SECTION 3: CURATED FLAGSHIP TRIO & ACCORDION COURSE DIRECTORY
          ========================================================================= */}
      <section id="academy-courses" className="sp-courses-grid-section">
        <div className="sp-courses-container">

          {/* Empty Search Results State */}
          {filteredCourses.length === 0 && (
            <div className="sp-courses-empty-search">
              <h3 className="sp-courses-empty-title">No programs found</h3>
              <p className="sp-courses-empty-desc">
                No course matches "{searchQuery}". Try searching for terms like "High Court", "Pitman", "Typing", or "ADCA".
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
                className="sp-courses-clear-search-btn"
              >
                Reset Search &amp; Filters
              </button>
            </div>
          )}

          {/* Layout Mode 1: Bespoke Split ("All Programs" default with Flagship Spotlight + Table Directory) */}
          {showSplitSections && (
            <>
              {/* Part A: Flagship Programs Spotlight (Top 3 Courses) */}
              <div className="sp-flagship-section-header">
                <span className="sp-courses-eyebrow">PREMIER FOUNDATIONS</span>
                <h2 className="sp-courses-sub-h2">Flagship Programs Spotlight</h2>
              </div>

              <div className="sp-courses-cards-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
                {flagshipCourses.map((course, idx) => renderFlagshipCard(course, idx))}
              </div>

              {/* Part B: Interactive Expandable Course Directory (Remaining Programs) */}
              <div className="sp-directory-section">
                <div className="sp-directory-header">
                  <span className="sp-directory-eyebrow">
                    SPECIALIZED BATCHES &amp; EXAM SPEED TRACKS
                  </span>
                  <h2 className="sp-directory-h2">
                    Judicial Benches, Central Govt Batches &amp; Computer Diplomas
                  </h2>
                </div>

                <div className="sp-directory-table">
                  {specializedCourses.map((course) => {
                    const isSyllabusOpen = !!expandedSyllabus[course.id];
                    return (
                      <div key={course.id} className="sp-directory-row">
                        {/* Main Interactive Row */}
                        <div 
                          className="sp-directory-row-main"
                          onClick={() => toggleSyllabus(course.id)}
                        >
                          {/* Left: Info */}
                          <div className="sp-directory-col-info">
                            <div className="sp-directory-badge-wrap">
                              <span className="sp-directory-category-tag">
                                {course.category}
                              </span>
                              {course.badge && (
                                <span className="sp-directory-badge">
                                  {course.badge}
                                </span>
                              )}
                            </div>
                            <h3 className="sp-directory-title">
                              {course.title}
                            </h3>
                            <p className="sp-directory-desc">
                              {course.description}
                            </p>
                          </div>

                          {/* Center: Specs */}
                          <div className="sp-directory-col-specs">
                            <span className="sp-directory-spec-pill">
                              {course.speedTarget}
                            </span>
                            <span className="sp-directory-spec-pill">
                              {course.duration}
                            </span>
                          </div>

                          {/* Right: Fee + Actions */}
                          <div 
                            className="sp-directory-col-actions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="sp-directory-fee-block">
                              <span className="sp-directory-fee">
                                {course.fee}
                              </span>
                              <span className="sp-directory-fee-sub">
                                {course.feeType || 'Official Curriculum'}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleSyllabus(course.id)}
                              className="sp-directory-syllabus-btn"
                            >
                              <span>{isSyllabusOpen ? 'Hide Syllabus' : 'View Syllabus'}</span>
                              {isSyllabusOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleEnroll(course)}
                              className="sp-directory-enroll-btn"
                            >
                              <span>Enroll Now</span>
                            </button>
                          </div>
                        </div>

                        {/* Inline Expandable Syllabus Drawer */}
                        {isSyllabusOpen && (
                          <div className="sp-directory-drawer">
                            <div className="sp-directory-drawer-grid">
                              {course.syllabus.map((topic, i) => (
                                <div key={i} className="sp-directory-drawer-item">
                                  <span style={{ color: '#B91C1C', fontWeight: 700 }}>&bull;</span>
                                  <span>{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Layout Mode 2: Unified Filtered/Searched Grid */}
          {!showSplitSections && filteredCourses.length > 0 && (
            <div className="sp-courses-cards-grid">
              {filteredCourses.map((course) => renderStandardCard(course))}
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          SECTION C: EXAM COVERAGE DIRECTORY (PRESERVED)
          ========================================================================= */}
      <section className="sp-exams-section">
        <div className="sp-courses-container">
          <div className="sp-exams-header">
            <span className="sp-courses-eyebrow">
              EXAMINATION BENCHES COVERED
            </span>
            <h2 className="sp-section-h2" style={{ margin: '0.25rem 0 0.5rem' }}>
              National &amp; State Government Recruitment Examinations
            </h2>
            <p className="sp-courses-desc" style={{ maxWidth: '44rem' }}>
              Specialized speed batches calibrated for official notification criteria, vocabulary benches, and exam-hall backspace-lock rules.
            </p>
          </div>

          <div className="sp-exams-grid">
            {TARGET_EXAMINATIONS.map((exam) => (
              <div key={exam.id} className="sp-exam-cell">
                <div>
                  <div className="sp-exam-cell-title">
                    {exam.title}
                  </div>
                  <div className="sp-exam-cell-sub">
                    {exam.category}
                  </div>
                </div>
                <span className="sp-exam-cell-badge">
                  {exam.speed}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: STRUCTURED TRAINING METHODOLOGY (PRESERVED)
          ========================================================================= */}
      <section className="sp-methodology-section">
        <div className="sp-courses-container">
          <span className="sp-courses-eyebrow">
            STRUCTURED PEDAGOGY &middot; GAYA SHORTHAND CLASSES
          </span>
          <h2 className="sp-section-h2" style={{ margin: '0.25rem 0 0.5rem' }}>
            8-Stage Teaching Methodology (शिक्षण पद्धति)
          </h2>
          <p className="sp-courses-desc" style={{ maxWidth: '42rem' }}>
            Guided by <strong>Shadab Sir (12+ Years Experience)</strong> to systematically build accuracy and audio transcription speed from 50 to 140 WPM.
          </p>

          <div className="sp-methodology-grid">
            {TEACHING_METHODOLOGY.map((m, idx) => {
              const stepNum = String(idx + 1).padStart(2, '0');
              return (
                <div key={m.step || idx} className="sp-methodology-cell">
                  <div>
                    <div className="sp-methodology-num">{stepNum}</div>
                    <div className="sp-methodology-title">{m.title}</div>
                    <div className="sp-methodology-hindi">{m.hindi}</div>
                    <p className="sp-methodology-desc">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION E: ONLINE TEST SERIES & MOCK PASSES (HIGH-CONTRAST DISTINCTION)
          ========================================================================= */}
      <section id="test-passes" className="sp-passes-section">
        <div className="sp-courses-container">
          <div className="sp-passes-header-row">
            <div>
              <span className="sp-courses-eyebrow">
                DAILY SPEED DICTATIONS &amp; EXAM SIMULATION
              </span>
              <h2 className="sp-section-h2" style={{ margin: '0.25rem 0 0.5rem' }}>
                Practice Passes &amp; Test Series
              </h2>
              <p className="sp-courses-desc" style={{ maxWidth: '40rem' }}>
                Instant access with UPI &amp; QR code. Practice anytime with real exam reading rooms and automated error calculation.
              </p>
            </div>

            {/* Segmented Filter Control: 4 Duration Passes vs 3 Targeted Tracks */}
            <div className="sp-segmented-filter" role="tablist">
              <button
                type="button"
                onClick={() => setPassFilter('unlimited')}
                className={`sp-segmented-btn ${passFilter === 'unlimited' ? 'is-active' : ''}`}
              >
                Unlimited Duration Passes (4)
              </button>
              <button
                type="button"
                onClick={() => setPassFilter('special')}
                className={`sp-segmented-btn ${passFilter === 'special' ? 'is-active' : ''}`}
              >
                Targeted Court &amp; Pitman Tracks (3)
              </button>
            </div>
          </div>

          {/* Row 1: Core Unlimited Duration Passes (Balanced 4 Columns with Inverted Dark Card) */}
          {passFilter === 'unlimited' && (
            <div className="sp-passes-grid-4col">
              {corePasses.map((plan) => {
                // Highlight ONLY 1-Month Test Series (plan-1mo) with Inverted Dark Card
                const isInvertedDark = plan.id === 'plan-1mo';
                return (
                  <div 
                    key={plan.id} 
                    className={`sp-pass-card ${isInvertedDark ? 'is-inverted-dark' : ''}`}
                  >
                    {isInvertedDark ? (
                      <span className="sp-pass-badge">
                        MOST POPULAR &middot; 80–100 WPM
                      </span>
                    ) : plan.badge ? (
                      <span className="sp-pass-badge">
                        {plan.badge}
                      </span>
                    ) : null}

                    <div>
                      {plan.seriesTitle && (
                        <div className="sp-pass-series-title">
                          {plan.seriesTitle}
                        </div>
                      )}
                      <h3 className="sp-pass-title">
                        {plan.name}
                      </h3>
                      <p className="sp-pass-desc">
                        {plan.description}
                      </p>
                      
                      <div className="sp-pass-price-row">
                        {plan.originalPrice && (
                          <span className="sp-pass-original-price">
                            ₹{plan.originalPrice}
                          </span>
                        )}
                        <span className="sp-pass-currency">₹</span>
                        <span className="sp-pass-price">
                          {plan.price}
                        </span>
                        <span className="sp-pass-duration">
                          / {plan.duration}
                        </span>
                      </div>

                      <ul className="sp-pass-features-list">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="sp-pass-feature-item">
                            <Check className="sp-course-check-icon" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <button 
                        type="button"
                        onClick={() => {
                          if (onSelectPlan) onSelectPlan(plan.id);
                          if (onOpenCheckout) onOpenCheckout(plan.id);
                        }}
                        className={isInvertedDark ? 'sp-pass-btn-white' : 'sp-pass-btn-secondary'}
                      >
                        <span>Activate with UPI (₹{plan.price})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Row 2: Court & Pitman Targeted Tracks (Balanced 3 Columns) */}
          {passFilter === 'special' && (
            <div className="sp-passes-grid-3col">
              {specializedPasses.map((plan) => {
                return (
                  <div 
                    key={plan.id} 
                    className="sp-pass-card"
                  >
                    {plan.badge && (
                      <span className="sp-pass-badge">
                        {plan.badge}
                      </span>
                    )}

                    <div>
                      {plan.seriesTitle && (
                        <div className="sp-pass-series-title">
                          {plan.seriesTitle}
                        </div>
                      )}
                      <h3 className="sp-pass-title">
                        {plan.name}
                      </h3>
                      <p className="sp-pass-desc">
                        {plan.description}
                      </p>
                      
                      <div className="sp-pass-price-row">
                        {plan.originalPrice && (
                          <span className="sp-pass-original-price">
                            ₹{plan.originalPrice}
                          </span>
                        )}
                        <span className="sp-pass-currency">₹</span>
                        <span className="sp-pass-price">
                          {plan.price}
                        </span>
                        <span className="sp-pass-duration">
                          / {plan.duration}
                        </span>
                      </div>

                      <ul className="sp-pass-features-list">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="sp-pass-feature-item">
                            <Check className="sp-course-check-icon" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <button 
                        type="button"
                        onClick={() => {
                          if (onSelectPlan) onSelectPlan(plan.id);
                          if (onOpenCheckout) onOpenCheckout(plan.id);
                        }}
                        className="sp-pass-btn-secondary"
                      >
                        <span>Activate with UPI (₹{plan.price})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: BOTTOM DARK CTA BANNER (PRESERVED)
          ========================================================================= */}
      <section className="sp-courses-dark-banner-section">
        <div className="sp-courses-container">
          <div className="sp-courses-dark-banner-box">
            <div>
              <span style={{ 
                fontFamily: 'var(--sp-font-sans)',
                fontSize: '11px', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '0.16em', 
                color: '#94A3B8', 
                display: 'block', 
                marginBottom: '0.4rem' 
              }}>
                DIRECT FACULTY GUIDANCE
              </span>
              <h2 style={{ 
                fontFamily: 'var(--sp-font-sans)',
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#FFFFFF', 
                margin: '0 0 0.5rem', 
                letterSpacing: '-0.02em', 
                lineHeight: 1.25 
              }}>
                Unsure which course or speed batch is right for you?
              </h2>
              <p style={{ 
                fontFamily: 'var(--sp-font-sans)',
                fontSize: '0.875rem', 
                color: '#CBD5E1', 
                margin: 0, 
                lineHeight: 1.6, 
                maxWidth: '38rem' 
              }}>
                Speak directly with senior instructors or Head Faculty <strong>Shadab Sir (12+ Years Experience)</strong> for a personalized skill assessment.
              </p>
            </div>

            <a 
              href="tel:+919204123453"
              className="sp-courses-dark-banner-btn"
            >
              <Phone size={15} style={{ flexShrink: 0 }} />
              <span>Call Helpline &middot; +91 9204123453</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
