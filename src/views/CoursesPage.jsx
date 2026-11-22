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
  Sparkles,
  FileText
} from 'lucide-react';
import { PRICING_PLANS, TARGET_EXAMINATIONS, TEACHING_METHODOLOGY } from '../data/mockData';
import '../landing-redesign.css';

const ACADEMY_COURSES = [
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
    flagshipNum: '01',
    icon: 'Keyboard'
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
    flagshipNum: '03',
    icon: 'BookOpen'
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

  const rawCourses = courses && courses.length > 0 ? courses : ACADEMY_COURSES;

  // Filter out any self-paced pass entries that might be inside rawCourses so they are strictly kept in Section 4
  const displayCourses = rawCourses.filter(c => {
    const cid = (c.id || '').toLowerCase();
    const ctitle = (c.title || '').toLowerCase();
    // Exclude pass entries unless user explicitly is on 'passes' tab or searching
    if (cid.startsWith('plan-') || ctitle.includes('pass') || ctitle.includes('test series pass')) {
      return false;
    }
    return true;
  });

  const handleEnroll = (course) => {
    const coursePlanMap = {
      'course-pitman': { id: 'course-pitman', name: 'Basic Pitman Shorthand Course', price: 4500, duration: '3 to 4 Months (Complete Book)', description: 'Complete Pitman book theory, daily homework correction & audio vault access.' },
      'course-hindi-steno': { id: 'course-hindi-steno', name: 'Hindi Shorthand Course', price: 4500, duration: '3 to 6 Months (Complete)', description: 'Complete Hindi shorthand theory, speed dictations & transcription.' },
      'course-bilingual-typing': { id: 'course-bilingual-typing', name: 'Dual Typing Lab (English & Hindi)', price: 2500, duration: '2 to 3 Months', description: 'Dual language English QWERTY + Hindi Kruti Dev/Mangal typing course.' },
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

  // Filter courses by category tab AND search text
  const filteredCourses = (() => {
    // If 'passes' tab is selected, return pass objects adapted to course card shape
    if (filterCategory === 'passes') {
      const allPasses = [...corePasses, ...specializedPasses];
      if (!searchQuery.trim()) return allPasses;
      const q = searchQuery.toLowerCase().trim();
      return allPasses.filter(p => 
        (p.name || '').toLowerCase().includes(q) || 
        (p.description || '').toLowerCase().includes(q) ||
        (p.badge || '').toLowerCase().includes(q)
      );
    }

    return displayCourses.filter((course) => {
      const cat = (course.category || '').toLowerCase();
      const id = (course.id || '').toLowerCase();
      const title = (course.title || '').toLowerCase();
      const desc = (course.description || '').toLowerCase();
      const syllabusText = (course.syllabus || []).join(' ').toLowerCase();

      // 1. Category match
      let matchesCategory = true;
      if (filterCategory === 'pitman') matchesCategory = id === 'course-pitman' || title.includes('english shorthand') || title.includes('pitman');
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
  })();

  const CATEGORY_TABS = [
    { id: 'all', label: 'All Programs', count: displayCourses.length },
    { id: 'pitman', label: 'English Shorthand' },
    { id: 'hindi-steno', label: 'Hindi Shorthand' },
    { id: 'typing', label: 'Typing Lab' },
    { id: 'court', label: 'High Court Judicial' },
    { id: 'ssc', label: 'SSC Grade C & D' },
    { id: 'diplomas', label: 'Diplomas (ADCA/DCA)' },
    { id: 'passes', label: 'Online Passes' }
  ];

  // Distinguish Top 3 Core Flagship vs Specialized for the "All Programs" view when no search query is active
  const isDefaultAllView = filterCategory === 'all' && !searchQuery.trim();

  // Top 3 Core Flagship programs: Bilingual Typing, Hindi Shorthand, English Pitman
  const flagshipCourses = [
    displayCourses.find(c => c.id === 'course-bilingual-typing') || displayCourses[0],
    displayCourses.find(c => c.id === 'course-hindi-steno') || displayCourses[1],
    displayCourses.find(c => c.id === 'course-pitman') || displayCourses[2]
  ].filter(Boolean);

  // Remaining specialized programs for the expandable directory
  const specializedCourses = displayCourses.filter(c => !flagshipCourses.some(f => f.id === c.id));

  // Render a Flagship Spotlight Card
  const renderFlagshipCard = (course, index) => {
    const isSyllabusOpen = !!expandedSyllabus[course.id];
    const numLabel = `0${index + 1} · FLAGSHIP`;
    return (
      <div 
        key={course.id}
        style={{
          background: '#F7F5F0',
          border: '1px solid #D1CBBF',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(22, 22, 26, 0.04)',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box'
        }}
      >
        <div>
          {/* Top Metadata Header */}
          <div 
            style={{
              background: '#EFECE5',
              borderBottom: '1px solid #D6D0C4',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span 
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#991B1B'
              }}
            >
              {numLabel}
            </span>
            <span 
              style={{
                fontSize: '12px',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                color: '#16161A',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {course.speedTarget}
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 20px 20px', display: 'flex', flexDirection: 'column' }}>
            <h3 
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: '#16161A',
                margin: '0 0 8px 0',
                lineHeight: 1.3
              }}
            >
              {course.title}
            </h3>
            <p 
              style={{
                fontSize: '13px',
                color: '#44403C',
                lineHeight: 1.55,
                margin: '0 0 16px 0'
              }}
            >
              {course.description}
            </p>

            {/* Flush Specs Strip (Duration & Format) */}
            <div 
              style={{
                borderTop: '1px solid #E2DDD3',
                borderBottom: '1px solid #E2DDD3',
                padding: '12px 0',
                margin: '0 0 16px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '12px',
                color: '#44403C'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} style={{ color: '#57534E', flexShrink: 0 }} />
                <span><strong style={{ color: '#16161A', fontWeight: 600 }}>Duration:</strong> {course.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={14} style={{ color: '#57534E', flexShrink: 0 }} />
                <span><strong style={{ color: '#16161A', fontWeight: 600 }}>Format:</strong> {course.mode}</span>
              </div>
            </div>

            {/* Curriculum Highlights (Max 3) */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(course.highlights || course.syllabus.slice(0, 3)).slice(0, 3).map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#44403C', lineHeight: 1.45 }}>
                  <Check size={14} style={{ color: '#991B1B', marginTop: '2px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Expandable Syllabus Toggle */}
            <button
              type="button"
              onClick={() => toggleSyllabus(course.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#57534E',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 0',
                textAlign: 'left'
              }}
            >
              <span>{isSyllabusOpen ? 'Hide Full Syllabus' : `View Full Syllabus (${course.syllabus.length} Topics)`}</span>
              {isSyllabusOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {isSyllabusOpen && (
              <div 
                style={{
                  background: '#EFECE5',
                  border: '1px solid #D6D0C4',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginTop: '12px'
                }}
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {course.syllabus.map((s, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#44403C', lineHeight: 1.4 }}>
                      <span style={{ color: '#991B1B', fontWeight: 700 }}>&bull;</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer */}
        <div 
          style={{
            background: '#F3F0E9',
            borderTop: '1px solid #DFD9CD',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span 
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#16161A',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {course.fee}
              </span>
              {course.originalFee && (
                <span style={{ fontSize: '12px', color: '#78716C', textDecoration: 'line-through' }}>
                  {course.originalFee}
                </span>
              )}
            </div>
            <span style={{ fontSize: '11px', color: '#57534E', display: 'block', marginTop: '2px' }}>
              {course.feeType || 'Official Curriculum'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleEnroll(course)}
            style={{
              background: '#991B1B',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 6px rgba(153, 27, 27, 0.25)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7F1D1D'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#991B1B'}
          >
            <span>Enroll Now</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    );
  };

  // Render Standard Card (when searching or category selected)
  const renderStandardCard = (item) => {
    // Check if it's a pass item (from PRICING_PLANS)
    if (item.seriesTitle || item.price !== undefined && item.features) {
      return (
        <div 
          key={item.id}
          style={{
            background: '#F7F5F0',
            border: '1px solid #D1CBBF',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 16px rgba(22, 22, 26, 0.04)',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#991B1B' }}>
                ONLINE PASS
              </span>
              {item.badge && (
                <span style={{ fontSize: '10px', fontWeight: 600, background: '#EAE5DC', border: '1px solid #D6D0C4', color: '#44403C', padding: '2px 8px', borderRadius: '4px' }}>
                  {item.badge}
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#16161A', margin: '0 0 6px 0' }}>
              {item.name}
            </h3>
            <p style={{ fontSize: '12px', color: '#44403C', margin: '0 0 16px 0', lineHeight: 1.5 }}>
              {item.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0 0 16px 0' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#16161A', fontVariantNumeric: 'tabular-nums' }}>
                ₹{item.price}
              </span>
              <span style={{ fontSize: '12px', color: '#57534E' }}>
                / {item.duration}
              </span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {item.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#44403C' }}>
                  <Check size={14} style={{ color: '#991B1B', marginTop: '2px', flexShrink: 0 }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onSelectPlan) onSelectPlan(item.id);
              if (onOpenCheckout) onOpenCheckout(item.id);
            }}
            style={{
              width: '100%',
              background: '#991B1B',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Activate with UPI (₹{item.price})
          </button>
        </div>
      );
    }

    // Standard course item
    const isSyllabusOpen = !!expandedSyllabus[item.id];
    return (
      <div 
        key={item.id}
        style={{
          background: '#F7F5F0',
          border: '1px solid #D1CBBF',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(22, 22, 26, 0.04)',
          boxSizing: 'border-box'
        }}
      >
        <div>
          <div 
            style={{
              background: '#EFECE5',
              borderBottom: '1px solid #D6D0C4',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#991B1B' }}>
              {item.category}
            </span>
            <span style={{ fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: '#16161A', fontVariantNumeric: 'tabular-nums' }}>
              {item.speedTarget}
            </span>
          </div>

          <div style={{ padding: '24px 20px 20px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#16161A', margin: '0 0 8px 0', lineHeight: 1.3 }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '13px', color: '#44403C', lineHeight: 1.55, margin: '0 0 16px 0' }}>
              {item.description}
            </p>

            <div 
              style={{
                borderTop: '1px solid #E2DDD3',
                borderBottom: '1px solid #E2DDD3',
                padding: '12px 0',
                margin: '0 0 16px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '12px',
                color: '#44403C'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} style={{ color: '#57534E', flexShrink: 0 }} />
                <span><strong style={{ color: '#16161A', fontWeight: 600 }}>Duration:</strong> {item.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={14} style={{ color: '#57534E', flexShrink: 0 }} />
                <span><strong style={{ color: '#16161A', fontWeight: 600 }}>Format:</strong> {item.mode}</span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(item.highlights || (item.syllabus || []).slice(0, 3)).slice(0, 3).map((h, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#44403C' }}>
                  <Check size={14} style={{ color: '#991B1B', marginTop: '2px', flexShrink: 0 }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => toggleSyllabus(item.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#57534E',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 0',
                textAlign: 'left'
              }}
            >
              <span>{isSyllabusOpen ? 'Hide Full Syllabus' : `View Full Syllabus (${(item.syllabus || []).length} Topics)`}</span>
              {isSyllabusOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {isSyllabusOpen && item.syllabus && (
              <div 
                style={{
                  background: '#EFECE5',
                  border: '1px solid #D6D0C4',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginTop: '12px'
                }}
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {item.syllabus.map((s, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#44403C', lineHeight: 1.4 }}>
                      <span style={{ color: '#991B1B', fontWeight: 700 }}>&bull;</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div 
          style={{
            background: '#F3F0E9',
            borderTop: '1px solid #DFD9CD',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#16161A', fontVariantNumeric: 'tabular-nums' }}>
                {item.fee}
              </span>
              {item.originalFee && (
                <span style={{ fontSize: '12px', color: '#78716C', textDecoration: 'line-through' }}>
                  {item.originalFee}
                </span>
              )}
            </div>
            <span style={{ fontSize: '11px', color: '#57534E', display: 'block', marginTop: '2px' }}>
              {item.feeType || 'Official Curriculum'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleEnroll(item)}
            style={{
              background: '#991B1B',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <span>Enroll Now</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="sp-courses-root"
      style={{
        backgroundColor: '#ECE8E0',
        minHeight: '100vh',
        color: '#16161A',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        width: '100%',
        margin: 0,
        padding: 0
      }}
    >
      
      {/* =========================================================================
          SECTION 1: SEAMLESS WARM PARCHMENT HERO + FIND YOUR TRACK PANEL
          ========================================================================= */}
      <section 
        style={{
          backgroundColor: '#ECE8E0',
          borderBottom: '1px solid #D6D0C4',
          width: '100%',
          paddingTop: '112px',
          paddingBottom: '56px',
          position: 'relative'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
        >
          <div className="sp-courses-hero-2col">
            
            {/* Left Column: Headline & Credentials */}
            <div className="sp-courses-hero-col-left">
              {/* Eyebrow with tiny static 6px crimson dot */}
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#57534E',
                  marginBottom: '14px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#991B1B', display: 'inline-block', flexShrink: 0 }} />
                <span>ACADEMY CURRICULUM &middot; GAYA CENTER &amp; LIVE ONLINE</span>
              </div>

              {/* H1 */}
              <h1 
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 'clamp(2.1rem, 3.8vw, 3.25rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  color: '#16161A',
                  margin: '0 0 16px 0'
                }}
              >
                Stenography Courses &amp; <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#991B1B', fontSize: '1.08em', letterSpacing: 'normal' }}>Examination</span> Programs
              </h1>

              {/* Subheadline */}
              <p 
                style={{
                  fontSize: '16px',
                  lineHeight: 1.625,
                  color: '#44403C',
                  maxWidth: '580px',
                  margin: '0 0 24px 0'
                }}
              >
                From absolute zero in Pitman Shorthand to cracking High Court &amp; SSC Stenographer skill tests at 50–140 WPM. Guided by <strong style={{ color: '#16161A', fontWeight: 600 }}>Shadab Sir (12+ Years Experience)</strong> with real-time dictations and automated error calculation.
              </p>

              {/* Stat Bar */}
              <div 
                style={{
                  borderTop: '1px solid #D6D0C4',
                  paddingTop: '20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '12px 20px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#57534E'
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#991B1B' }} />
                  <span style={{ color: '#16161A', fontWeight: 600 }}>15+ Structured Programs</span>
                </div>
                <span style={{ color: '#B8B1A3' }}>&middot;</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#991B1B' }} />
                  <span>50–140 WPM Speed Range</span>
                </div>
                <span style={{ color: '#B8B1A3' }}>&middot;</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#991B1B' }} />
                  <span>Offline &amp; Live Google Meet</span>
                </div>
                <span style={{ color: '#B8B1A3' }}>&middot;</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#991B1B' }} />
                  <span>3 Free Demo Classes</span>
                </div>
              </div>
            </div>

            {/* Right Column: "Find Your Track" Quick-Selector Panel */}
            <div className="sp-courses-hero-col-right">
              <div 
                style={{
                  background: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 14px 34px rgba(22, 22, 26, 0.06)'
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <h3 
                    style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#16161A',
                      margin: '0 0 4px 0',
                      letterSpacing: '-0.015em'
                    }}
                  >
                    Not sure which batch fits?
                  </h3>
                  <p style={{ fontSize: '12px', color: '#57534E', margin: 0 }}>
                    Select your exam goal to filter matching programs below:
                  </p>
                </div>

                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '10px'
                  }}
                >
                  {/* Goal 1: Beginner */}
                  <button
                    type="button"
                    onClick={() => handleSelectFilter('pitman')}
                    style={{
                      background: '#EFECE5',
                      border: '1px solid #D6D0C4',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E4DFD5';
                      e.currentTarget.style.borderColor = 'rgba(153, 27, 27, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFECE5';
                      e.currentTarget.style.borderColor = '#D6D0C4';
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#16161A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Beginner (0 WPM)</span>
                      <ArrowRight size={12} style={{ color: '#991B1B' }} />
                    </span>
                    <span style={{ fontSize: '11px', color: '#57534E' }}>
                      Learn Pitman from Zero
                    </span>
                  </button>

                  {/* Goal 2: SSC Steno */}
                  <button
                    type="button"
                    onClick={() => handleSelectFilter('ssc')}
                    style={{
                      background: '#EFECE5',
                      border: '1px solid #D6D0C4',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E4DFD5';
                      e.currentTarget.style.borderColor = 'rgba(153, 27, 27, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFECE5';
                      e.currentTarget.style.borderColor = '#D6D0C4';
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#16161A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>SSC Steno (80–100)</span>
                      <ArrowRight size={12} style={{ color: '#991B1B' }} />
                    </span>
                    <span style={{ fontSize: '11px', color: '#57534E' }}>
                      Grade C &amp; D Speed Batch
                    </span>
                  </button>

                  {/* Goal 3: High Court */}
                  <button
                    type="button"
                    onClick={() => handleSelectFilter('court')}
                    style={{
                      background: '#EFECE5',
                      border: '1px solid #D6D0C4',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E4DFD5';
                      e.currentTarget.style.borderColor = 'rgba(153, 27, 27, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFECE5';
                      e.currentTarget.style.borderColor = '#D6D0C4';
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#16161A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>High Court Legal</span>
                      <ArrowRight size={12} style={{ color: '#991B1B' }} />
                    </span>
                    <span style={{ fontSize: '11px', color: '#57534E' }}>
                      Judicial Dictations
                    </span>
                  </button>

                  {/* Goal 4: Typing & Diplomas */}
                  <button
                    type="button"
                    onClick={() => handleSelectFilter('typing')}
                    style={{
                      background: '#EFECE5',
                      border: '1px solid #D6D0C4',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E4DFD5';
                      e.currentTarget.style.borderColor = 'rgba(153, 27, 27, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFECE5';
                      e.currentTarget.style.borderColor = '#D6D0C4';
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#16161A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Typing &amp; Diplomas</span>
                      <ArrowRight size={12} style={{ color: '#991B1B' }} />
                    </span>
                    <span style={{ fontSize: '11px', color: '#57534E' }}>
                      Hindi/English &amp; ADCA
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CLEAN SINGLE-ROW FILTER & SEARCH BAR
          ========================================================================= */}
      <div 
        style={{
          position: 'sticky',
          top: '76px',
          zIndex: 30,
          background: 'rgba(228, 223, 213, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #D1CBBF',
          padding: '10px 24px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          {/* Category Tabs: Floating pill look matching Navbar */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              padding: '2px 0'
            }}
            role="tablist"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = filterCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectFilter(tab.id)}
                  style={isActive ? {
                    background: '#F7F5F0',
                    color: '#16161A',
                    fontWeight: 600,
                    border: '1px solid #D1CBBF',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    boxShadow: '0 1px 3px rgba(22, 22, 26, 0.08)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  } : {
                    background: 'transparent',
                    color: '#57534E',
                    fontWeight: 500,
                    border: '1px solid transparent',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'colors 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#16161A';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#57534E';
                  }}
                >
                  {isActive && (
                    <span 
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#991B1B',
                        display: 'inline-block',
                        flexShrink: 0
                      }}
                    />
                  )}
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span style={{ fontSize: '11px', color: '#78716C', fontVariantNumeric: 'tabular-nums' }}>
                      ({tab.count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: Counter + Compact Search */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#57534E', whiteSpace: 'nowrap' }}>
              Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'program' : 'programs'}
            </span>
            
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#78716C', pointerEvents: 'none' }} />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search High Court, Pitman..."
                style={{
                  width: '100%',
                  height: '34px',
                  paddingLeft: '32px',
                  paddingRight: '28px',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '12px',
                  backgroundColor: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderRadius: '9999px',
                  color: '#16161A',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#991B1B'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#D1CBBF'}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#78716C',
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
          SECTION 3: DEDUPLICATED COACHING CATALOG (WARM PARCHMENT CANVAS)
          ========================================================================= */}
      <section 
        id="academy-courses" 
        style={{
          backgroundColor: '#ECE8E0',
          padding: '64px 0',
          width: '100%'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
        >

          {/* Empty Search Results State */}
          {filteredCourses.length === 0 && (
            <div 
              style={{
                background: '#F7F5F0',
                border: '1px solid #D1CBBF',
                borderRadius: '16px',
                padding: '48px 24px',
                textAlign: 'center',
                maxWidth: '560px',
                margin: '0 auto'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#16161A', margin: '0 0 8px 0' }}>
                No programs found
              </h3>
              <p style={{ fontSize: '13px', color: '#57534E', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                No course matches "{searchQuery}". Try searching for terms like "High Court", "Pitman", "Typing", or "ADCA".
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
                style={{
                  background: '#991B1B',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reset Search &amp; Filters
              </button>
            </div>
          )}

          {/* Layout Mode 1: Bespoke Split ("All Programs" default with Top 3 Flagship Spotlight + Table Directory) */}
          {isDefaultAllView && (
            <>
              {/* Part A: Flagship Programs Spotlight (Top 3 Courses) */}
              <div style={{ marginBottom: '24px' }}>
                <span 
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: '#57534E',
                    display: 'block',
                    marginBottom: '6px'
                  }}
                >
                  CORE ACADEMY PROGRAMS
                </span>
                <h2 
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: '#16161A',
                    margin: 0
                  }}
                >
                  Flagship Program Spotlight
                </h2>
              </div>

              {/* Top 3 Balanced Flagship Row */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '24px'
                }}
              >
                {flagshipCourses.map((course, idx) => renderFlagshipCard(course, idx))}
              </div>

              {/* Part B: Complete Coaching & Diploma Directory (Remaining Programs) */}
              <div style={{ marginTop: '72px' }}>
                <div 
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '20px'
                  }}
                >
                  <div>
                    <span 
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        color: '#57534E',
                        display: 'block',
                        marginBottom: '6px'
                      }}
                    >
                      SPECIALIZED TRACKS &amp; DIPLOMAS
                    </span>
                    <h2 
                      style={{
                        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontSize: 'clamp(1.35rem, 2.2vw, 1.625rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.025em',
                        color: '#16161A',
                        margin: 0
                      }}
                    >
                      Judicial Benches, Central Govt Batches &amp; Computer Diplomas
                    </h2>
                  </div>
                  <span style={{ fontSize: '12px', color: '#57534E', fontWeight: 500 }}>
                    Click any row to view full syllabus &darr;
                  </span>
                </div>

                {/* Directory Table Container */}
                <div 
                  style={{
                    background: '#F7F5F0',
                    border: '1px solid #D1CBBF',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 6px 20px rgba(22, 22, 26, 0.04)'
                  }}
                >
                  {specializedCourses.map((course, idx) => {
                    const isSyllabusOpen = !!expandedSyllabus[course.id];
                    const isLast = idx === specializedCourses.length - 1;
                    return (
                      <div 
                        key={course.id}
                        style={{
                          borderBottom: isLast && !isSyllabusOpen ? 'none' : '1px solid #DFD9CD'
                        }}
                      >
                        {/* Main Interactive Row */}
                        <div 
                          onClick={() => toggleSyllabus(course.id)}
                          style={{
                            padding: '18px 24px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 236, 229, 0.7)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {/* Left: Info */}
                          <div style={{ flex: '5 1 280px', minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#991B1B' }}>
                                {course.category}
                              </span>
                              {course.badge && (
                                <span style={{ fontSize: '10px', fontWeight: 600, color: '#44403C', background: '#EAE5DC', border: '1px solid #D6D0C4', padding: '1px 6px', borderRadius: '4px' }}>
                                  {course.badge}
                                </span>
                              )}
                            </div>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#16161A', margin: '0 0 4px 0' }}>
                              {course.title}
                            </h3>
                            <p style={{ fontSize: '12px', color: '#44403C', lineHeight: 1.45, margin: 0 }}>
                              {course.description}
                            </p>
                          </div>

                          {/* Center: Specs */}
                          <div style={{ flex: '3 1 180px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#44403C', background: '#EAE5DC', border: '1px solid #D6D0C4', padding: '3px 8px', borderRadius: '6px', fontVariantNumeric: 'tabular-nums' }}>
                              {course.speedTarget}
                            </span>
                            <span style={{ fontSize: '11px', fontWeight: 500, color: '#57534E', background: '#EFECE5', border: '1px solid #D6D0C4', padding: '3px 8px', borderRadius: '6px' }}>
                              {course.duration}
                            </span>
                          </div>

                          {/* Right: Fee + Actions */}
                          <div 
                            style={{ flex: '4 1 240px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '14px' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div style={{ textAlign: 'right' }}>
                              <span style={{ fontSize: '16px', fontWeight: 800, color: '#16161A', fontVariantNumeric: 'tabular-nums', display: 'block' }}>
                                {course.fee}
                              </span>
                              <span style={{ fontSize: '10px', color: '#57534E', display: 'block' }}>
                                {course.feeType || 'Official Curriculum'}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleSyllabus(course.id)}
                              style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#57534E',
                                background: 'transparent',
                                border: '1px solid #D1CBBF',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#EFECE5';
                                e.currentTarget.style.color = '#16161A';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#57534E';
                              }}
                            >
                              <span>{isSyllabusOpen ? 'Hide' : 'View Syllabus'}</span>
                              {isSyllabusOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleEnroll(course)}
                              style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                background: '#16161A',
                                color: '#F5F3EE',
                                padding: '7px 14px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'background-color 0.15s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#27272A'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16161A'}
                            >
                              <span>Enroll Now</span>
                            </button>
                          </div>
                        </div>

                        {/* Inline Expandable Syllabus Drawer */}
                        {isSyllabusOpen && (
                          <div 
                            style={{
                              background: 'rgba(239, 236, 229, 0.6)',
                              borderTop: '1px solid #DFD9CD',
                              padding: '20px 24px'
                            }}
                          >
                            <div 
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                                gap: '8px 24px',
                                fontSize: '12px',
                                color: '#44403C',
                                marginBottom: '16px'
                              }}
                            >
                              {course.syllabus.map((topic, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.45 }}>
                                  <span style={{ color: '#991B1B', fontWeight: 700 }}>&bull;</span>
                                  <span>{topic}</span>
                                </div>
                              ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid #D6D0C4' }}>
                              <button
                                type="button"
                                onClick={() => handleEnroll(course)}
                                style={{
                                  background: '#991B1B',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  padding: '8px 18px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}
                              >
                                <span>Enroll in This Batch</span>
                                <ArrowRight size={13} />
                              </button>
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
          {!isDefaultAllView && filteredCourses.length > 0 && (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px'
              }}
            >
              {filteredCourses.map((course) => renderStandardCard(course))}
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: PRACTICE PASSES & TEST SERIES (WARM PARCHMENT CANVAS)
          ========================================================================= */}
      <section 
        id="test-passes" 
        style={{
          backgroundColor: '#ECE8E0',
          borderTop: '1px solid #D6D0C4',
          padding: '80px 0',
          width: '100%'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
        >
          {/* Header Row */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px',
              marginBottom: '36px'
            }}
          >
            <div>
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#57534E',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                SELF-PACED EXAM ENGINE
              </span>
              <h2 
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: '#16161A',
                  margin: '0 0 6px 0'
                }}
              >
                Practice Passes &amp; Test Series
              </h2>
              <p style={{ fontSize: '14px', color: '#44403C', margin: 0, maxWidth: '560px' }}>
                Instant activation with UPI &amp; QR code. Practice anytime with real exam reading rooms and automated error calculation.
              </p>
            </div>

            {/* Recessed Warm Stone Segmented Toggle */}
            <div 
              style={{
                background: '#E4DFD5',
                border: '1px solid #D1CBBF',
                padding: '4px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              role="tablist"
            >
              <button
                type="button"
                onClick={() => setPassFilter('unlimited')}
                style={passFilter === 'unlimited' ? {
                  background: '#F7F5F0',
                  color: '#16161A',
                  fontWeight: 600,
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(22, 22, 26, 0.08)',
                  border: 'none',
                  cursor: 'pointer'
                } : {
                  background: 'transparent',
                  color: '#57534E',
                  fontWeight: 500,
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Duration Passes (4)
              </button>
              <button
                type="button"
                onClick={() => setPassFilter('special')}
                style={passFilter === 'special' ? {
                  background: '#F7F5F0',
                  color: '#16161A',
                  fontWeight: 600,
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(22, 22, 26, 0.08)',
                  border: 'none',
                  cursor: 'pointer'
                } : {
                  background: 'transparent',
                  color: '#57534E',
                  fontWeight: 500,
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Targeted Court &amp; Pitman Tracks (3)
              </button>
            </div>
          </div>

          {/* Row 1: Core Unlimited Duration Passes (4 Columns) */}
          {passFilter === 'unlimited' && (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}
            >
              {corePasses.map((plan) => {
                const isFeatured = plan.id === 'plan-1mo';
                return (
                  <div 
                    key={plan.id}
                    style={isFeatured ? {
                      background: '#FAF8F5',
                      border: '1px solid #C8C2B6',
                      borderTop: '4px solid #991B1B',
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 14px 34px rgba(22, 22, 26, 0.08)',
                      position: 'relative'
                    } : {
                      background: '#F7F5F0',
                      border: '1px solid #D1CBBF',
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative'
                    }}
                  >
                    <div>
                      {/* Top Micro-Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <span 
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.14em',
                            color: isFeatured ? '#991B1B' : '#57534E'
                          }}
                        >
                          {isFeatured ? 'MOST POPULAR' : (plan.seriesTitle || 'SKILL PASS')}
                        </span>
                        {plan.badge && !isFeatured && (
                          <span style={{ fontSize: '10px', fontWeight: 600, background: '#EAE5DC', border: '1px solid #D6D0C4', color: '#44403C', padding: '2px 8px', borderRadius: '4px' }}>
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#16161A', margin: '0 0 6px 0' }}>
                        {plan.name}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#44403C', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                        {plan.description}
                      </p>
                      
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0 0 20px 0' }}>
                        {plan.originalPrice && (
                          <span style={{ fontSize: '14px', color: '#78716C', textDecoration: 'line-through' }}>
                            ₹{plan.originalPrice}
                          </span>
                        )}
                        <span style={{ fontSize: '28px', fontWeight: 800, color: '#16161A', fontVariantNumeric: 'tabular-nums' }}>
                          ₹{plan.price}
                        </span>
                        <span style={{ fontSize: '12px', color: '#57534E' }}>
                          / {plan.duration}
                        </span>
                      </div>

                      <ul 
                        style={{
                          listStyle: 'none',
                          padding: '16px 0 0 0',
                          margin: '0 0 24px 0',
                          borderTop: '1px solid #DFD9CD',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}
                      >
                        {plan.features.map((feat, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#44403C', lineHeight: 1.4 }}>
                            <Check size={14} style={{ color: isFeatured ? '#991B1B' : '#57534E', marginTop: '2px', flexShrink: 0 }} />
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
                        style={isFeatured ? {
                          width: '100%',
                          background: '#991B1B',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '12px',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(153, 27, 27, 0.20)',
                          transition: 'background-color 0.15s ease'
                        } : {
                          width: '100%',
                          background: '#EFECE5',
                          border: '1px solid #D1CBBF',
                          color: '#16161A',
                          padding: '12px',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (isFeatured) {
                            e.currentTarget.style.backgroundColor = '#7F1D1D';
                          } else {
                            e.currentTarget.style.backgroundColor = '#16161A';
                            e.currentTarget.style.color = '#F5F3EE';
                            e.currentTarget.style.borderColor = '#16161A';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (isFeatured) {
                            e.currentTarget.style.backgroundColor = '#991B1B';
                          } else {
                            e.currentTarget.style.backgroundColor = '#EFECE5';
                            e.currentTarget.style.color = '#16161A';
                            e.currentTarget.style.borderColor = '#D1CBBF';
                          }
                        }}
                      >
                        <span>Activate with UPI (₹{plan.price})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Row 2: Court & Pitman Targeted Tracks (3 Columns) */}
          {passFilter === 'special' && (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px'
              }}
            >
              {specializedPasses.map((plan) => {
                return (
                  <div 
                    key={plan.id}
                    style={{
                      background: '#F7F5F0',
                      border: '1px solid #D1CBBF',
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#991B1B' }}>
                          TARGETED TRACK
                        </span>
                        {plan.badge && (
                          <span style={{ fontSize: '10px', fontWeight: 600, background: '#EAE5DC', border: '1px solid #D6D0C4', color: '#44403C', padding: '2px 8px', borderRadius: '4px' }}>
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#16161A', margin: '0 0 6px 0' }}>
                        {plan.name}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#44403C', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                        {plan.description}
                      </p>
                      
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0 0 20px 0' }}>
                        {plan.originalPrice && (
                          <span style={{ fontSize: '14px', color: '#78716C', textDecoration: 'line-through' }}>
                            ₹{plan.originalPrice}
                          </span>
                        )}
                        <span style={{ fontSize: '28px', fontWeight: 800, color: '#16161A', fontVariantNumeric: 'tabular-nums' }}>
                          ₹{plan.price}
                        </span>
                        <span style={{ fontSize: '12px', color: '#57534E' }}>
                          / {plan.duration}
                        </span>
                      </div>

                      <ul 
                        style={{
                          listStyle: 'none',
                          padding: '16px 0 0 0',
                          margin: '0 0 24px 0',
                          borderTop: '1px solid #DFD9CD',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}
                      >
                        {plan.features.map((feat, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#44403C', lineHeight: 1.4 }}>
                            <Check size={14} style={{ color: '#57534E', marginTop: '2px', flexShrink: 0 }} />
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
                        style={{
                          width: '100%',
                          background: '#EFECE5',
                          border: '1px solid #D1CBBF',
                          color: '#16161A',
                          padding: '12px',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#16161A';
                          e.currentTarget.style.color = '#F5F3EE';
                          e.currentTarget.style.borderColor = '#16161A';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#EFECE5';
                          e.currentTarget.style.color = '#16161A';
                          e.currentTarget.style.borderColor = '#D1CBBF';
                        }}
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
          SECTION 5: UNIFIED EDITORIAL SPREAD — TARGET EXAMS & 8-STAGE METHODOLOGY
          ========================================================================= */}
      <section 
        style={{
          backgroundColor: '#ECE8E0',
          borderTop: '1px solid #D6D0C4',
          padding: '80px 0',
          width: '100%'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
        >
          <div className="sp-courses-spread-12col">
            
            {/* Left Column (lg:col-span-5): Target Recruitment Coverage */}
            <div className="sp-courses-spread-left">
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#57534E',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                RECRUITMENT COVERAGE
              </span>
              <h2 
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: '#16161A',
                  margin: '0 0 10px 0'
                }}
              >
                National &amp; State Govt. Examinations.
              </h2>
              <p style={{ fontSize: '13px', color: '#44403C', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                Specialized speed batches calibrated for official notification criteria, vocabulary benches, and exam-hall backspace-lock rules.
              </p>

              {/* Clean hairline list */}
              <div 
                style={{
                  background: '#F7F5F0',
                  border: '1px solid #D1CBBF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(22, 22, 26, 0.04)'
                }}
              >
                {TARGET_EXAMINATIONS.map((exam, idx) => {
                  const isLast = idx === TARGET_EXAMINATIONS.length - 1;
                  return (
                    <div 
                      key={exam.id}
                      style={{
                        padding: '14px 18px',
                        borderBottom: isLast ? 'none' : '1px solid #DFD9CD',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EFECE5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#16161A' }}>
                          {exam.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#57534E', marginTop: '2px' }}>
                          {exam.category}
                        </div>
                      </div>
                      <span 
                        style={{
                          fontSize: '11px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 600,
                          color: '#991B1B',
                          fontVariantNumeric: 'tabular-nums',
                          flexShrink: 0
                        }}
                      >
                        {exam.speed}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column (lg:col-span-7): 8-Stage Teaching Methodology */}
            <div className="sp-courses-spread-right">
              <span 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#57534E',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                PROVEN PEDAGOGY
              </span>
              <h2 
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: '#16161A',
                  margin: '0 0 10px 0'
                }}
              >
                8-Stage Teaching Methodology (शिक्षण पद्धति)
              </h2>
              <p style={{ fontSize: '13px', color: '#44403C', lineHeight: 1.6, margin: '0 0 28px 0' }}>
                Guided by <strong style={{ color: '#16161A', fontWeight: 600 }}>Shadab Sir (12+ Years Experience)</strong> to systematically build accuracy and audio transcription speed from 50 to 140 WPM.
              </p>

              {/* Crisp 2-column numbered editorial grid on continuous parchment */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '28px 24px'
                }}
              >
                {TEACHING_METHODOLOGY.map((m, idx) => {
                  const stepNum = String(idx + 1).padStart(2, '0');
                  return (
                    <div 
                      key={m.step || idx}
                      style={{
                        borderTop: '1px solid #C8C2B6',
                        paddingTop: '16px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div 
                        style={{
                          fontSize: '12px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 700,
                          color: '#8C8578',
                          letterSpacing: '0.04em'
                        }}
                      >
                        {stepNum}
                      </div>
                      <div 
                        style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: '#16161A',
                          margin: '4px 0 2px 0'
                        }}
                      >
                        {m.title}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: '#78716C', marginBottom: '6px' }}>
                        {m.hindi}
                      </div>
                      <p style={{ fontSize: '12px', color: '#44403C', lineHeight: 1.6, margin: 0 }}>
                        {m.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: SOFT IVORY CLOSING CTA CARD
          ========================================================================= */}
      <section 
        style={{
          backgroundColor: '#ECE8E0',
          paddingBottom: '80px',
          width: '100%'
        }}
      >
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
        >
          <div 
            style={{
              background: '#F7F5F0',
              border: '1px solid #D1CBBF',
              borderLeft: '4px solid #991B1B',
              borderRadius: '16px',
              padding: '36px 40px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              boxShadow: '0 8px 28px rgba(22, 22, 26, 0.05)'
            }}
          >
            <div style={{ maxWidth: '620px' }}>
              <span 
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#57534E',
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                FREE DEMO &amp; COUNSELING
              </span>
              <h2 
                style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                  fontWeight: 700,
                  color: '#16161A',
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25
                }}
              >
                Not sure which course or <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#991B1B' }}>speed batch</span> is right for you?
              </h2>
              <p 
                style={{
                  fontSize: '14px',
                  color: '#44403C',
                  margin: 0,
                  lineHeight: 1.6
                }}
              >
                Speak directly with senior instructors or Head Faculty <strong style={{ color: '#16161A', fontWeight: 600 }}>Shadab Sir (12+ Years Experience)</strong> for a personalized skill assessment.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                type="button"
                onClick={() => {
                  if (onOpenAdmission) onOpenAdmission();
                }}
                style={{
                  background: '#991B1B',
                  color: '#FFFFFF',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 6px 18px rgba(153, 27, 27, 0.20)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7F1D1D'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#991B1B'}
              >
                <span>Book 3 Free Demo Classes &rarr;</span>
              </button>

              <a 
                href="tel:+919204123453"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#EFECE5',
                  border: '1px solid #D6D0C4',
                  color: '#16161A',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4DFD5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EFECE5'}
              >
                <Phone size={14} style={{ color: '#991B1B', flexShrink: 0 }} />
                <span>Call +91 9204123453</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
