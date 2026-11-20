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
  const [passFilter, setPassFilter] = useState('all');
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

  const renderCourseCard = (course, isFlagship = false) => {
    const isSyllabusOpen = !!expandedSyllabus[course.id];
    return (
      <div key={course.id} className="sp-course-card">
        <div>
          {/* Top Micro-Row */}
          <div className="sp-course-card-top">
            <span className={isFlagship ? "sp-course-popular-tag" : "sp-course-category-label"}>
              {isFlagship ? `FLAGSHIP \u00B7 ${course.category}` : course.category}
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
          SECTION A: CLEAN EDITORIAL PAGE HEADER + UNDERLINE FILTER & SEARCH BAR
          ========================================================================= */}
      <section className="sp-courses-header-section">
        <div className="sp-courses-header-container">
          <span className="sp-courses-eyebrow">
            ACADEMY CURRICULUM &middot; OFFLINE &amp; LIVE ONLINE
          </span>
          <h1 className="sp-courses-h1">
            Stenography Courses &amp; <span className="sp-courses-serif-accent">Examination</span> Programs
          </h1>
          <p className="sp-courses-desc">
            From absolute zero in Pitman Shorthand to cracking High Court &amp; SSC Stenographer skill tests at 50–140 WPM. Guided by experienced faculty <strong>Shadab Sir (12 Years Experience)</strong> with real-time dictations and exam simulations.
          </p>
        </div>

        {/* Flush Single-Row Underline Filter & Search Toolbar */}
        <div className="sp-courses-filter-bar-wrap">
          <div className="sp-courses-filter-row">
            
            {/* Category Tabs */}
            <div className="sp-courses-filter-bar" role="tablist">
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

            {/* Compact Search & Counter Toolbar */}
            <div className="sp-courses-search-wrap">
              <span className="sp-courses-results-counter">
                Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'program' : 'programs'}
              </span>
              <div className="sp-courses-search-box">
                <Search size={14} className="sp-courses-search-icon" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Patna HC, Kruti Dev..."
                  className="sp-courses-search-input"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => setSearchQuery('')}
                    className="sp-courses-search-clear"
                    title="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION B: DECLUSTERED COURSE CATALOG (FLAGSHIP SPOTLIGHT + COMPACT ROWS)
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

          {/* Layout Mode 1: Split View ("All Programs" default with Flagship Spotlight + 2-Column Compact Rows) */}
          {showSplitSections && (
            <>
              {/* Part A: Flagship Programs Spotlight */}
              <div className="sp-flagship-section-header">
                <span className="sp-courses-eyebrow">PREMIER BATCHES</span>
                <h2 className="sp-courses-sub-h2">Flagship Programs Spotlight</h2>
              </div>

              <div className="sp-courses-cards-grid">
                {flagshipCourses.map((course) => renderCourseCard(course, true))}
              </div>

              {/* Part B: Specialized, Crash & Diploma Programs (Compact 2-Column Rows) */}
              <div className="sp-specialized-section-header">
                <div>
                  <span className="sp-courses-eyebrow">SPECIALIZED BATCHES &amp; DIPLOMAS</span>
                  <h3 className="sp-courses-sub-h2">Specialized Speed Benches &amp; Computer Diplomas</h3>
                </div>
                <span className="sp-specialized-counter">
                  {specializedCourses.length} Programs
                </span>
              </div>

              <div className="sp-compact-rows-grid">
                {specializedCourses.map((course) => (
                  <div key={course.id} className="sp-compact-course-row">
                    <div className="sp-compact-row-left">
                      <div className="sp-compact-meta-line">
                        <span>{course.category}</span>
                        <span className="sp-compact-dot">&middot;</span>
                        <span style={{ color: '#0F172A', fontVariantNumeric: 'tabular-nums' }}>
                          {course.speedTarget}
                        </span>
                      </div>
                      <h4 className="sp-compact-title">
                        {course.title}
                      </h4>
                      <p className="sp-compact-desc">
                        {course.description}
                      </p>
                      <div className="sp-compact-meta-strip">
                        <Clock size={12} className="sp-course-spec-icon" />
                        <span>{course.duration}</span>
                        <span className="sp-compact-dot">&middot;</span>
                        <GraduationCap size={12} className="sp-course-spec-icon" />
                        <span>{course.mode}</span>
                      </div>
                    </div>

                    <div className="sp-compact-row-right">
                      <span className="sp-compact-price">
                        {course.fee}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleEnroll(course)}
                        className="sp-compact-enroll-btn"
                      >
                        <span>View / Enroll &rarr;</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Layout Mode 2: Unified Filtered/Searched Grid */}
          {!showSplitSections && filteredCourses.length > 0 && (
            <div className="sp-courses-cards-grid">
              {filteredCourses.map((course) => renderCourseCard(course, course.popular))}
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
          SECTION E: ONLINE TEST SERIES & MOCK PASSES (SYMMETRICAL 4+3 GRID)
          ========================================================================= */}
      <section id="test-passes" className="sp-passes-section">
        <div className="sp-courses-container">
          <div className="sp-passes-header-row">
            <div>
              <span className="sp-courses-eyebrow">
                SELF-PACED PRACTICE ENGINE
              </span>
              <h2 className="sp-section-h2" style={{ margin: '0.25rem 0 0.5rem' }}>
                Online Test Series &amp; Mock Passes
              </h2>
              <p className="sp-courses-desc" style={{ maxWidth: '40rem' }}>
                Instant access with UPI &amp; QR code. Practice anytime with real exam reading rooms and automated error calculation.
              </p>
            </div>

            {/* Segmented Filter Control */}
            <div className="sp-segmented-filter" role="tablist">
              <button
                type="button"
                onClick={() => setPassFilter('all')}
                className={`sp-segmented-btn ${passFilter === 'all' ? 'is-active' : ''}`}
              >
                All Passes (7)
              </button>
              <button
                type="button"
                onClick={() => setPassFilter('passes')}
                className={`sp-segmented-btn ${passFilter === 'passes' ? 'is-active' : ''}`}
              >
                Daily &amp; Monthly (4)
              </button>
              <button
                type="button"
                onClick={() => setPassFilter('special')}
                className={`sp-segmented-btn ${passFilter === 'special' ? 'is-active' : ''}`}
              >
                High Court &amp; Foundation (3)
              </button>
            </div>
          </div>

          {/* Row 1: Core Unlimited Duration Passes (4 Columns) */}
          {(passFilter === 'all' || passFilter === 'passes') && (
            <div className="sp-passes-grid-4col">
              {corePasses.map((plan) => {
                // Highlight ONLY 1-Month Test Series (plan-1mo)
                const isRecommended = plan.id === 'plan-1mo';
                return (
                  <div 
                    key={plan.id} 
                    className={`sp-pass-card ${isRecommended ? 'is-recommended' : ''}`}
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
                        className={isRecommended ? 'sp-pass-btn-primary' : 'sp-pass-btn-secondary'}
                      >
                        <span>Activate with UPI (₹{plan.price})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Row 2: Exam-Specific & Full Book Passes (3 Columns) */}
          {(passFilter === 'all' || passFilter === 'special') && (
            <>
              {passFilter === 'all' && (
                <div className="sp-passes-row2-header">
                  <span className="sp-courses-eyebrow">
                    COURT SPECIALS &amp; COMPLETE PITMAN TRACK
                  </span>
                  <h3 className="sp-passes-row2-title">
                    Targeted Courtroom Dictations &amp; Foundation Course
                  </h3>
                </div>
              )}

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
            </>
          )}

        </div>
      </section>

      {/* =========================================================================
          SECTION F: BOTTOM DARK CTA BANNER (PRESERVED)
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
