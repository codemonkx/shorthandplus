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
import { motion } from 'framer-motion';
import { FadeUp, StaggerContainer, StaggerItem, TRANSITION_EASE } from '../components/MotionPrimitives';
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
        className="bg-white border border-[#E8DFD3] hover:border-[#D4C6B6] rounded-2xl overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(35,20,24,0.04)] transition-all duration-200 hover:-translate-y-1"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8DFD3',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)'
        }}
      >
        <div>
          {/* Top Metadata Header */}
          <div 
            className="bg-[#F5EFE6] border-b border-[#E8DFD3] px-6 py-3 flex items-center justify-between"
            style={{
              backgroundColor: '#F5EFE6',
              borderBottom: '1px solid #E8DFD3',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span 
              className="text-[11px] font-bold uppercase tracking-wider text-[#991B1B]"
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#991B1B'
              }}
            >
              {numLabel}
            </span>
            <span 
              className="font-mono text-xs font-semibold text-[#231418] tabular-nums"
              style={{
                fontSize: '12px',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                color: '#231418',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {course.speedTarget}
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 
              className="text-lg font-bold text-[#231418] mb-2 leading-snug"
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#231418',
                margin: '0 0 8px 0',
                lineHeight: 1.3
              }}
            >
              {course.title}
            </h3>
            <p 
              className="text-[13px] text-[#594A4D] leading-relaxed mb-4"
              style={{
                fontSize: '13px',
                color: '#594A4D',
                lineHeight: 1.55,
                margin: '0 0 16px 0'
              }}
            >
              {course.description}
            </p>

            {/* Flush Specs Strip (Duration & Format) */}
            <div 
              style={{
                borderTop: '1px solid #EDE5DA',
                borderBottom: '1px solid #EDE5DA',
                padding: '12px 0',
                margin: '0 0 16px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '12px',
                color: '#594A4D'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} style={{ color: '#8A7B7E', flexShrink: 0 }} />
                <span><strong style={{ color: '#231418', fontWeight: 600 }}>Duration:</strong> {course.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={14} style={{ color: '#8A7B7E', flexShrink: 0 }} />
                <span><strong style={{ color: '#231418', fontWeight: 600 }}>Format:</strong> {course.mode}</span>
              </div>
            </div>

            {/* Curriculum Highlights (Max 3) */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(course.highlights || course.syllabus.slice(0, 3)).slice(0, 3).map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#594A4D', lineHeight: 1.45 }}>
                  <Check size={14} style={{ color: '#991B1B', marginTop: '2px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Expandable Syllabus Toggle */}
            <button
              type="button"
              onClick={() => toggleSyllabus(course.id)}
              className="text-xs font-semibold text-[#8A7B7E] hover:text-[#231418] inline-flex items-center gap-1 py-1 cursor-pointer transition-colors"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8A7B7E',
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
                className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl p-3.5 mt-3"
                style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E8DFD3',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  marginTop: '12px'
                }}
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {course.syllabus.map((s, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#594A4D', lineHeight: 1.4 }}>
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
          className="bg-[#FAF7F2] border-t border-[#EDE5DA] px-6 py-4 flex items-center justify-between gap-3"
          style={{
            backgroundColor: '#FAF7F2',
            borderTop: '1px solid #EDE5DA',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span 
                className="font-sans font-bold text-xl text-[#231418] tabular-nums"
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#231418',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {course.fee}
              </span>
              {course.originalFee && (
                <span className="text-xs text-[#8A7B7E] line-through font-sans tabular-nums" style={{ fontSize: '12px', color: '#8A7B7E', textDecoration: 'line-through' }}>
                  {course.originalFee}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#8A7B7E] block mt-0.5" style={{ fontSize: '11px', color: '#8A7B7E', display: 'block', marginTop: '2px' }}>
              {course.feeType || 'Official Curriculum'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleEnroll(course)}
            className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white px-5 py-2 rounded-full text-xs font-semibold shadow-[0_2px_8px_rgba(153,27,27,0.25)] flex items-center gap-1.5 cursor-pointer transition-colors"
            style={{
              backgroundColor: '#991B1B',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(153, 27, 27, 0.25)',
              transition: 'background-color 0.15s ease'
            }}
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
          className="bg-white border border-[#E8DFD3] rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(35,20,24,0.04)]"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8DFD3',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1B]" style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#991B1B' }}>
                ONLINE PASS
              </span>
              {item.badge && (
                <span className="text-[10px] font-semibold bg-[#EFE7DC] border border-[#E0D5C7] text-[#594A4D] px-2 py-0.5 rounded-full" style={{ fontSize: '10px', fontWeight: 600, background: '#EFE7DC', border: '1px solid #E0D5C7', color: '#594A4D', padding: '2px 8px', borderRadius: '9999px' }}>
                  {item.badge}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-[#231418] mb-1.5" style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '0 0 6px 0' }}>
              {item.name}
            </h3>
            <p className="text-xs text-[#594A4D] mb-4 leading-relaxed" style={{ fontSize: '12px', color: '#594A4D', margin: '0 0 16px 0', lineHeight: 1.5 }}>
              {item.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0 0 16px 0' }}>
              <span className="font-sans font-bold text-2xl text-[#231418] tabular-nums" style={{ fontSize: '24px', fontWeight: 700, color: '#231418', fontVariantNumeric: 'tabular-nums' }}>
                ₹{item.price}
              </span>
              <span className="text-xs text-[#8A7B7E]" style={{ fontSize: '12px', color: '#8A7B7E' }}>
                / {item.duration}
              </span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {item.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#594A4D' }}>
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
            className="w-full bg-[#991B1B] hover:bg-[#7F1D1D] text-white py-2.5 rounded-full text-xs font-semibold shadow-[0_2px_8px_rgba(153,27,27,0.25)] cursor-pointer transition-colors"
            style={{
              width: '100%',
              backgroundColor: '#991B1B',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px',
              borderRadius: '9999px',
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
        className="bg-white border border-[#E8DFD3] hover:border-[#D4C6B6] rounded-2xl overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(35,20,24,0.04)] transition-all duration-200"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E8DFD3',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)',
          boxSizing: 'border-box'
        }}
      >
        <div>
          <div 
            className="bg-[#F5EFE6] border-b border-[#E8DFD3] px-6 py-3 flex items-center justify-between"
            style={{
              backgroundColor: '#F5EFE6',
              borderBottom: '1px solid #E8DFD3',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#991B1B]" style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#991B1B' }}>
              {item.category}
            </span>
            <span className="font-mono text-xs font-semibold text-[#231418] tabular-nums" style={{ fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: '#231418', fontVariantNumeric: 'tabular-nums' }}>
              {item.speedTarget}
            </span>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <h3 className="text-lg font-bold text-[#231418] mb-2 leading-snug" style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '0 0 8px 0', lineHeight: 1.3 }}>
              {item.title}
            </h3>
            <p className="text-[13px] text-[#594A4D] leading-relaxed mb-4" style={{ fontSize: '13px', color: '#594A4D', lineHeight: 1.55, margin: '0 0 16px 0' }}>
              {item.description}
            </p>

            <div 
              style={{
                borderTop: '1px solid #EDE5DA',
                borderBottom: '1px solid #EDE5DA',
                padding: '12px 0',
                margin: '0 0 16px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '12px',
                color: '#594A4D'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={14} style={{ color: '#8A7B7E', flexShrink: 0 }} />
                <span><strong style={{ color: '#231418', fontWeight: 600 }}>Duration:</strong> {item.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={14} style={{ color: '#8A7B7E', flexShrink: 0 }} />
                <span><strong style={{ color: '#231418', fontWeight: 600 }}>Format:</strong> {item.mode}</span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(item.highlights || (item.syllabus || []).slice(0, 3)).slice(0, 3).map((h, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#594A4D' }}>
                  <Check size={14} style={{ color: '#991B1B', marginTop: '2px', flexShrink: 0 }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => toggleSyllabus(item.id)}
              className="text-xs font-semibold text-[#8A7B7E] hover:text-[#231418] inline-flex items-center gap-1 py-1 cursor-pointer transition-colors"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8A7B7E',
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
                className="bg-[#FAF7F2] border border-[#E8DFD3] rounded-xl p-3.5 mt-3"
                style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E8DFD3',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  marginTop: '12px'
                }}
              >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {item.syllabus.map((s, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '11px', color: '#594A4D', lineHeight: 1.4 }}>
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
          className="bg-[#FAF7F2] border-t border-[#EDE5DA] px-6 py-4 flex items-center justify-between gap-3"
          style={{
            backgroundColor: '#FAF7F2',
            borderTop: '1px solid #EDE5DA',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span className="font-sans font-bold text-xl text-[#231418] tabular-nums" style={{ fontSize: '20px', fontWeight: 700, color: '#231418', fontVariantNumeric: 'tabular-nums' }}>
                {item.fee}
              </span>
              {item.originalFee && (
                <span className="text-xs text-[#8A7B7E] line-through font-sans tabular-nums" style={{ fontSize: '12px', color: '#8A7B7E', textDecoration: 'line-through' }}>
                  {item.originalFee}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#8A7B7E] block mt-0.5" style={{ fontSize: '11px', color: '#8A7B7E', display: 'block', marginTop: '2px' }}>
              {item.feeType || 'Official Curriculum'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleEnroll(item)}
            className="bg-[#991B1B] hover:bg-[#7F1D1D] text-white px-5 py-2 rounded-full text-xs font-semibold shadow-[0_2px_8px_rgba(153,27,27,0.25)] flex items-center gap-1.5 cursor-pointer transition-colors"
            style={{
              backgroundColor: '#991B1B',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '9999px',
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
      className="sp-courses-root bg-[#FBF8F3] min-h-screen text-[#231418]"
      style={{
        backgroundColor: '#FBF8F3',
        minHeight: '100vh',
        color: '#231418',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        width: '100%',
        margin: 0,
        padding: 0
      }}
    >
      
      {/* =========================================================================
          SECTION 1: HERO SECTION WITH DECORATIVE PITMAN STROKES & 2x2 GOAL GRID
          ========================================================================= */}
      <section 
        className="relative overflow-hidden bg-[#FBF8F3] border-b border-[#E5DBD0] sp-courses-hero-padding"
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FBF8F3',
          borderBottom: '1px solid #E5DBD0',
          paddingTop: '128px',
          paddingBottom: '56px',
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
            width: '100%',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            position: 'relative',
            zIndex: 10,
            boxSizing: 'border-box'
          }}
        >
          <div className="sp-courses-hero-2col">
            
            {/* Left Column (lg:col-span-7 min-w-0) */}
            <div className="sp-courses-hero-col-left" style={{ minWidth: 0 }}>
              <FadeUp>
                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: '#8A7B7E',
                    marginBottom: '12px'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B', display: 'inline-block', flexShrink: 0 }} />
                  <span>ACADEMY CURRICULUM &middot; GAYA CENTER &amp; LIVE ONLINE</span>
                </div>

                <h1 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(2.35rem, 4vw, 3.65rem)',
                    fontWeight: 400,
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    color: '#231418',
                    marginTop: '12px',
                    marginBottom: '16px'
                  }}
                >
                  Stenography Courses &amp; <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>Examination</span> Programs
                </h1>

                <p 
                  style={{
                    fontSize: '16px',
                    color: '#594A4D',
                    lineHeight: 1.6,
                    maxWidth: '580px',
                    marginBottom: '24px'
                  }}
                >
                  From absolute zero in Pitman Shorthand to cracking High Court &amp; SSC Stenographer skill tests at 50–140 WPM. Guided by <strong style={{ color: '#231418', fontWeight: 600 }}>Shadab Sir (12+ Years Experience)</strong> with real-time dictations and automated error calculation.
                </p>

                <div 
                  style={{
                    borderTop: '1px solid #E5DBD0',
                    paddingTop: '20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '12px',
                    color: '#594A4D',
                    fontWeight: 500
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B' }} />
                    <span style={{ color: '#231418', fontWeight: 600 }}>15+ Structured Programs</span>
                  </div>
                  <span style={{ color: '#D8CCBE' }}>&middot;</span>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B' }} />
                    <span>50–140 WPM Speed Range</span>
                  </div>
                  <span style={{ color: '#D8CCBE' }}>&middot;</span>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B' }} />
                    <span>Offline &amp; Live Google Meet</span>
                  </div>
                  <span style={{ color: '#D8CCBE' }}>&middot;</span>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#991B1B' }} />
                    <span>3 Free Demo Classes</span>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right Column (lg:col-span-5 min-w-0 — Symmetrical 2x2 Goal Grid) */}
            <div className="sp-courses-hero-col-right" style={{ minWidth: 0 }}>
              <FadeUp delay={0.1}>
                <div 
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8DFD3',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 12px 32px rgba(35, 20, 24, 0.05)',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <h3 
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#231418',
                        margin: '0 0 4px 0'
                      }}
                    >
                      Not sure which batch fits?
                    </h3>
                    <p 
                      style={{
                        fontSize: '12px',
                        color: '#8A7B7E',
                        margin: 0
                      }}
                    >
                      Select your exam goal to filter matching programs below:
                    </p>
                  </div>

                  {/* STRICT 2x2 GRID */}
                  <div 
                    className="sp-courses-2x2-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      gap: '12px',
                      marginTop: '16px'
                    }}
                  >
                    {/* Goal 1: Beginner */}
                    <button
                      type="button"
                      onClick={() => handleSelectFilter('pitman')}
                      style={{
                        backgroundColor: '#FBF8F3',
                        border: '1px solid #E5DBD0',
                        borderRadius: '12px',
                        padding: '14px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#EFE7DC';
                        e.currentTarget.style.borderColor = 'rgba(153, 27, 27, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FBF8F3';
                        e.currentTarget.style.borderColor = '#E5DBD0';
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#231418', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>Beginner (0 WPM)</span>
                        <ArrowRight size={12} style={{ color: '#991B1B' }} />
                      </span>
                      <span style={{ fontSize: '11px', color: '#8A7B7E' }}>
                        Learn Pitman from Zero
                      </span>
                    </button>

                    {/* Goal 2: SSC Steno */}
                    <button
                      type="button"
                      onClick={() => handleSelectFilter('ssc')}
                      style={{
                        backgroundColor: '#FBF8F3',
                        border: '1px solid #E5DBD0',
                        borderRadius: '12px',
                        padding: '14px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#EFE7DC';
                        e.currentTarget.style.borderColor = 'rgba(153, 27, 27, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FBF8F3';
                        e.currentTarget.style.borderColor = '#E5DBD0';
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#231418', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>SSC Steno (80–100)</span>
                        <ArrowRight size={12} style={{ color: '#991B1B' }} />
                      </span>
                      <span style={{ fontSize: '11px', color: '#8A7B7E' }}>
                        Grade C &amp; D Speed Batch
                      </span>
                    </button>

                    {/* Goal 3: High Court */}
                    <button
                      type="button"
                      onClick={() => handleSelectFilter('court')}
                      style={{
                        backgroundColor: '#FBF8F3',
                        border: '1px solid #E5DBD0',
                        borderRadius: '12px',
                        padding: '14px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#EFE7DC';
                        e.currentTarget.style.borderColor = 'rgba(153, 27, 27, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FBF8F3';
                        e.currentTarget.style.borderColor = '#E5DBD0';
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#231418', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>High Court Legal</span>
                        <ArrowRight size={12} style={{ color: '#991B1B' }} />
                      </span>
                      <span style={{ fontSize: '11px', color: '#8A7B7E' }}>
                        Judicial Dictations
                      </span>
                    </button>

                    {/* Goal 4: Typing & Diplomas */}
                    <button
                      type="button"
                      onClick={() => handleSelectFilter('typing')}
                      style={{
                        backgroundColor: '#FBF8F3',
                        border: '1px solid #E5DBD0',
                        borderRadius: '12px',
                        padding: '14px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#EFE7DC';
                        e.currentTarget.style.borderColor = 'rgba(153, 27, 27, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FBF8F3';
                        e.currentTarget.style.borderColor = '#E5DBD0';
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#231418', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>Typing &amp; Diplomas</span>
                        <ArrowRight size={12} style={{ color: '#991B1B' }} />
                      </span>
                      <span style={{ fontSize: '11px', color: '#8A7B7E' }}>
                        Hindi/English &amp; ADCA
                      </span>
                    </button>
                  </div>
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SINGLE-ROW WARM SAND FILTER & SEARCH TOOLBAR
          ========================================================================= */}
      <div 
        className="sticky top-[72px] lg:top-[76px] z-30 bg-[#EFE7DC]/95 backdrop-blur-md border-b border-[#E0D5C7] w-full"
        style={{
          position: 'sticky',
          top: '76px',
          zIndex: 30,
          backgroundColor: 'rgba(239, 231, 220, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #E0D5C7',
          padding: '12px 0',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="sp-courses-container sp-courses-toolbar-desktop"
          style={{
            width: '100%',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            boxSizing: 'border-box'
          }}
        >
          {/* Category Tabs: Horizontal Single Row */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              flex: '1 1 auto',
              minWidth: 0
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
                    backgroundColor: '#FFFFFF',
                    color: '#231418',
                    fontWeight: 600,
                    border: '1px solid #E0D5C7',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    boxShadow: '0 1px 3px rgba(35, 20, 24, 0.06)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  } : {
                    background: 'transparent',
                    color: '#594A4D',
                    fontWeight: 500,
                    border: '1px solid transparent',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {isActive && (
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#991B1B', display: 'inline-block', flexShrink: 0 }} />
                  )}
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span style={{ fontSize: '11px', color: '#8A7B7E' }}>
                      ({tab.count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: Counter + Compact Fixed Search Pill */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0
            }}
          >
            <span 
              style={{
                fontSize: '12px',
                color: '#6E5E61',
                whiteSpace: 'nowrap'
              }}
            >
              Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'program' : 'programs'}
            </span>
            
            <div 
              style={{
                position: 'relative',
                width: '240px',
                height: '38px',
                flexShrink: 0
              }}
            >
              <Search 
                size={13} 
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#8A7B7E',
                  pointerEvents: 'none'
                }} 
              />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search High Court, Pitman..."
                style={{
                  width: '240px',
                  height: '38px',
                  paddingLeft: '34px',
                  paddingRight: '28px',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DCD0C2',
                  borderRadius: '9999px',
                  color: '#231418',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
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
                    background: 'transparent',
                    border: 'none',
                    color: '#8A7B7E',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '2px'
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
          SECTION 3: COACHING CATALOG (WARM CREAM #FBF8F3 CANVAS)
          ========================================================================= */}
      <section 
        id="academy-courses" 
        className="bg-[#FBF8F3] py-14 lg:py-16"
        style={{
          backgroundColor: '#FBF8F3',
          padding: '64px 0',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="sp-courses-container"
          style={{
            width: '100%',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            boxSizing: 'border-box'
          }}
        >

          {/* Empty Search Results State */}
          {filteredCourses.length === 0 && (
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8DFD3',
                borderRadius: '16px',
                padding: '48px 24px',
                textAlign: 'center',
                maxWidth: '520px',
                margin: '0 auto',
                boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '0 0 8px 0' }}>
                No programs found
              </h3>
              <p style={{ fontSize: '13px', color: '#594A4D', margin: '0 0 20px 0', lineHeight: 1.55 }}>
                No course matches "{searchQuery}". Try searching for terms like "High Court", "Pitman", "Typing", or "ADCA".
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
                style={{
                  backgroundColor: '#991B1B',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reset Search &amp; Filters
              </button>
            </div>
          )}

          {/* Layout Mode 1: Bespoke Split ("All Programs" default with Top 3 Flagship Spotlight + Directory) */}
          {isDefaultAllView && (
            <>
              {/* Part A: Flagship Programs Spotlight (Top 3 Courses) */}
              <FadeUp>
                <div style={{ marginBottom: '24px' }}>
                  <span 
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: '#8A7B7E',
                      display: 'block',
                      marginBottom: '6px'
                    }}
                  >
                    CORE ACADEMY PROGRAMS
                  </span>
                  <h2 
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: 'clamp(1.875rem, 3.2vw, 2.65rem)',
                      fontWeight: 400,
                      lineHeight: 1.1,
                      letterSpacing: '-0.015em',
                      color: '#231418',
                      margin: 0
                    }}
                  >
                    Flagship <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>program spotlight.</span>
                  </h2>
                </div>
              </FadeUp>

              {/* Top 3 Balanced Flagship Row */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '24px'
                }}
              >
                {flagshipCourses.map((course, idx) => (
                  <FadeUp key={course.id} delay={idx * 0.08}>
                    {renderFlagshipCard(course, idx)}
                  </FadeUp>
                ))}
              </div>

              {/* Part B: Complete Coaching & Diploma Directory (Remaining Programs) */}
              <div style={{ marginTop: '56px' }}>
                <FadeUp>
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
                          letterSpacing: '0.18em',
                          color: '#8A7B7E',
                          display: 'block',
                          marginBottom: '6px'
                        }}
                      >
                        SPECIALIZED TRACKS &amp; DIPLOMAS
                      </span>
                      <h2 
                        style={{
                          fontFamily: "'Instrument Serif', Georgia, serif",
                          fontSize: 'clamp(1.875rem, 3.2vw, 2.65rem)',
                          fontWeight: 400,
                          lineHeight: 1.1,
                          letterSpacing: '-0.015em',
                          color: '#231418',
                          margin: 0
                        }}
                      >
                        Judicial benches, central govt &amp; <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>computer diplomas.</span>
                      </h2>
                    </div>
                    <span style={{ fontSize: '12px', color: '#8A7B7E', fontWeight: 500 }}>
                      Click any row to view full syllabus &darr;
                    </span>
                  </div>
                </FadeUp>

                {/* Directory Table Outer Card Container */}
                <FadeUp delay={0.08}>
                  <div 
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E8DFD3',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(35, 20, 24, 0.04)',
                      marginTop: '24px'
                    }}
                  >
                    {specializedCourses.map((course, cIdx) => {
                      const isSyllabusOpen = !!expandedSyllabus[course.id];
                      const isLast = cIdx === specializedCourses.length - 1;
                      return (
                        <div 
                          key={course.id} 
                          style={{
                            borderBottom: isLast && !isSyllabusOpen ? 'none' : '1px solid #EDE5DA',
                            transition: 'background-color 0.15s ease'
                          }}
                        >
                          {/* Main Interactive Row */}
                          <div 
                            onClick={() => toggleSyllabus(course.id)}
                            style={{
                              padding: '20px 24px',
                              display: 'flex',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '16px',
                              cursor: 'pointer',
                              transition: 'background-color 0.15s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAF7F2'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            {/* Left: Info */}
                            <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#991B1B' }}>
                                  {course.category}
                                </span>
                                {course.badge && (
                                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#594A4D', backgroundColor: '#EFE7DC', border: '1px solid #E0D5C7', padding: '2px 8px', borderRadius: '9999px' }}>
                                    {course.badge}
                                  </span>
                                )}
                              </div>
                              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#231418', margin: '0 0 4px 0' }}>
                                {course.title}
                              </h3>
                              <p style={{ fontSize: '13px', color: '#594A4D', lineHeight: 1.5, margin: 0 }}>
                                {course.description}
                              </p>
                            </div>

                            {/* Middle Badges */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                              <span style={{ backgroundColor: '#EFE7DC', color: '#594A4D', borderRadius: '9999px', padding: '4px 12px', fontSize: '11px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                {course.speedTarget}
                              </span>
                              <span style={{ backgroundColor: '#EFE7DC', color: '#594A4D', borderRadius: '9999px', padding: '4px 12px', fontSize: '11px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                {course.duration}
                              </span>
                            </div>

                            {/* Right Price & Actions */}
                            <div 
                              style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div style={{ textAlign: 'right', minWidth: '110px' }}>
                                <span style={{ fontWeight: 700, fontSize: '16px', color: '#231418', display: 'block', fontVariantNumeric: 'tabular-nums' }}>
                                  {course.fee}
                                </span>
                                <span style={{ fontSize: '11px', color: '#8A7B7E', display: 'block' }}>
                                  {course.feeType || 'Official Curriculum'}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => toggleSyllabus(course.id)}
                                style={{
                                  backgroundColor: '#FBF8F3',
                                  border: '1px solid #E0D5C7',
                                  borderRadius: '9999px',
                                  padding: '8px 14px',
                                  fontSize: '12px',
                                  fontWeight: 500,
                                  color: '#231418',
                                  whiteSpace: 'nowrap',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                <span>{isSyllabusOpen ? 'Hide Syllabus ▴' : 'View Syllabus ▾'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleEnroll(course)}
                                style={{
                                  backgroundColor: '#231418',
                                  color: '#FAF6F0',
                                  borderRadius: '9999px',
                                  padding: '8px 18px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                  border: 'none',
                                  cursor: 'pointer'
                                }}
                              >
                                <span>Enroll Now</span>
                              </button>
                            </div>
                          </div>

                          {/* Inline Expandable Syllabus Drawer */}
                          {isSyllabusOpen && (
                            <div 
                              style={{
                                backgroundColor: '#FAF7F2',
                                borderTop: '1px solid #EDE5DA',
                                padding: '20px 24px'
                              }}
                            >
                              <div 
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                  gap: '12px',
                                  fontSize: '12px',
                                  color: '#594A4D',
                                  marginBottom: '16px'
                                }}
                              >
                                {course.syllabus.map((topic, i) => (
                                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.5 }}>
                                    <span style={{ color: '#991B1B', fontWeight: 700 }}>&bull;</span>
                                    <span>{topic}</span>
                                  </div>
                                ))}
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid #EDE5DA' }}>
                                <button
                                  type="button"
                                  onClick={() => handleEnroll(course)}
                                  style={{
                                    backgroundColor: '#991B1B',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    padding: '8px 20px',
                                    borderRadius: '9999px',
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
                </FadeUp>
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
              {filteredCourses.map((course, idx) => (
                <FadeUp key={course.id} delay={idx * 0.05}>
                  {renderStandardCard(course)}
                </FadeUp>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: PRACTICE PASSES & TEST SERIES (WARM SAND #EFE7DC CANVAS)
          ========================================================================= */}
      <section 
        id="test-passes" 
        className="bg-[#EFE7DC] border-y border-[#E0D5C7] py-14 lg:py-16"
        style={{
          backgroundColor: '#EFE7DC',
          borderTop: '1px solid #E0D5C7',
          borderBottom: '1px solid #E0D5C7',
          padding: '64px 0',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="sp-courses-container"
          style={{
            width: '100%',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            boxSizing: 'border-box'
          }}
        >
          {/* Header Row */}
          <FadeUp>
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
                    letterSpacing: '0.18em',
                    color: '#8A7B7E',
                    display: 'block',
                    marginBottom: '6px'
                  }}
                >
                  SELF-PACED EXAM ENGINE
                </span>
                <h2 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.875rem, 3.2vw, 2.65rem)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: '-0.015em',
                    color: '#231418',
                    margin: 0
                  }}
                >
                  Practice passes &amp; <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>test series.</span>
                </h2>
                <p style={{ fontSize: '14px', color: '#594A4D', maxWidth: '580px', margin: '6px 0 0 0' }}>
                  Instant activation with UPI &amp; QR code. Practice anytime with real exam reading rooms and automated error calculation.
                </p>
              </div>

              {/* Segmented Duration / Court Tracks Toggle */}
              <div 
                style={{
                  backgroundColor: '#E5DACB',
                  border: '1px solid #D8CBB9',
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
                    backgroundColor: '#FFFFFF',
                    color: '#231418',
                    fontWeight: 600,
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    boxShadow: '0 1px 3px rgba(35, 20, 24, 0.08)',
                    border: 'none',
                    cursor: 'pointer'
                  } : {
                    background: 'transparent',
                    color: '#594A4D',
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
                    backgroundColor: '#FFFFFF',
                    color: '#231418',
                    fontWeight: 600,
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    boxShadow: '0 1px 3px rgba(35, 20, 24, 0.08)',
                    border: 'none',
                    cursor: 'pointer'
                  } : {
                    background: 'transparent',
                    color: '#594A4D',
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
          </FadeUp>

          {/* Row 1: Core Unlimited Duration Passes (4 Columns) */}
          {passFilter === 'unlimited' && (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}
            >
              {corePasses.map((plan, idx) => {
                const isFeatured = plan.id === 'plan-1mo';
                return (
                  <FadeUp key={plan.id} delay={idx * 0.06}>
                    <div 
                      style={isFeatured ? {
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #DFD3C5',
                        borderTop: '4px solid #991B1B',
                        borderRadius: '16px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 14px 34px rgba(35, 20, 24, 0.08)',
                        height: '100%',
                        boxSizing: 'border-box'
                      } : {
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E8DFD3',
                        borderRadius: '16px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 18px rgba(35, 20, 24, 0.04)',
                        height: '100%',
                        boxSizing: 'border-box'
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
                              letterSpacing: '0.12em',
                              color: isFeatured ? '#991B1B' : '#8A7B7E'
                            }}
                          >
                            {isFeatured ? 'MOST POPULAR' : (plan.seriesTitle || 'SKILL PASS')}
                          </span>
                          {plan.badge && !isFeatured && (
                            <span style={{ fontSize: '10px', fontWeight: 600, backgroundColor: '#EFE7DC', border: '1px solid #E0D5C7', color: '#594A4D', padding: '2px 8px', borderRadius: '9999px' }}>
                              {plan.badge}
                            </span>
                          )}
                        </div>

                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '0 0 6px 0' }}>
                          {plan.name}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#594A4D', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                          {plan.description}
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0 0 20px 0' }}>
                          {plan.originalPrice && (
                            <span style={{ fontSize: '14px', color: '#8A7B7E', textDecoration: 'line-through', fontVariantNumeric: 'tabular-nums' }}>
                              ₹{plan.originalPrice}
                            </span>
                          )}
                          <span style={{ fontSize: '28px', fontWeight: 800, color: '#231418', fontVariantNumeric: 'tabular-nums' }}>
                            ₹{plan.price}
                          </span>
                          <span style={{ fontSize: '12px', color: '#8A7B7E' }}>
                            / {plan.duration}
                          </span>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', borderTop: '1px solid #EDE5DA', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {plan.features.map((feat, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#594A4D', lineHeight: 1.45 }}>
                              <Check size={14} style={{ color: isFeatured ? '#991B1B' : '#8A7B7E', marginTop: '2px', flexShrink: 0 }} />
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
                            backgroundColor: '#991B1B',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(153, 27, 27, 0.20)'
                          } : {
                            width: '100%',
                            backgroundColor: '#FBF8F3',
                            border: '1px solid #DCD0C2',
                            color: '#231418',
                            padding: '12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          <span>Activate with UPI (₹{plan.price})</span>
                        </button>
                      </div>
                    </div>
                  </FadeUp>
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
              {specializedPasses.map((plan, idx) => {
                return (
                  <FadeUp key={plan.id} delay={idx * 0.08}>
                    <div 
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E8DFD3',
                        borderRadius: '16px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 18px rgba(35, 20, 24, 0.04)',
                        height: '100%',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#991B1B' }}>
                            TARGETED TRACK
                          </span>
                          {plan.badge && (
                            <span style={{ fontSize: '10px', fontWeight: 600, backgroundColor: '#EFE7DC', border: '1px solid #E0D5C7', color: '#594A4D', padding: '2px 8px', borderRadius: '9999px' }}>
                              {plan.badge}
                            </span>
                          )}
                        </div>

                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#231418', margin: '0 0 6px 0' }}>
                          {plan.name}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#594A4D', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                          {plan.description}
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '0 0 20px 0' }}>
                          {plan.originalPrice && (
                            <span style={{ fontSize: '14px', color: '#8A7B7E', textDecoration: 'line-through', fontVariantNumeric: 'tabular-nums' }}>
                              ₹{plan.originalPrice}
                            </span>
                          )}
                          <span style={{ fontSize: '28px', fontWeight: 800, color: '#231418', fontVariantNumeric: 'tabular-nums' }}>
                            ₹{plan.price}
                          </span>
                          <span style={{ fontSize: '12px', color: '#8A7B7E' }}>
                            / {plan.duration}
                          </span>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', borderTop: '1px solid #EDE5DA', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {plan.features.map((feat, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#594A4D', lineHeight: 1.45 }}>
                              <Check size={14} style={{ color: '#8A7B7E', marginTop: '2px', flexShrink: 0 }} />
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
                            backgroundColor: '#FBF8F3',
                            border: '1px solid #DCD0C2',
                            color: '#231418',
                            padding: '12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          <span>Activate with UPI (₹{plan.price})</span>
                        </button>
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TARGET EXAMS & 8-STAGE METHODOLOGY (WARM CREAM #FBF8F3 CANVAS)
          ========================================================================= */}
      <section 
        className="bg-[#FBF8F3] py-14 lg:py-16"
        style={{
          backgroundColor: '#FBF8F3',
          padding: '64px 0',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="sp-courses-container"
          style={{
            width: '100%',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '24px',
            paddingRight: '24px',
            boxSizing: 'border-box'
          }}
        >
          <div className="sp-courses-spread-12col">
            
            {/* Left Column (lg:col-span-5): Target Recruitment Coverage */}
            <div className="sp-courses-spread-left" style={{ minWidth: 0 }}>
              <FadeUp>
                <span 
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: '#8A7B7E',
                    display: 'block',
                    marginBottom: '6px'
                  }}
                >
                  RECRUITMENT COVERAGE
                </span>
                <h2 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: '-0.015em',
                    color: '#231418',
                    marginBottom: '10px'
                  }}
                >
                  National &amp; state <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>govt. examinations.</span>
                </h2>
                <p style={{ fontSize: '13px', color: '#594A4D', lineHeight: 1.55, marginBottom: '24px' }}>
                  Specialized speed batches calibrated for official notification criteria, vocabulary benches, and exam-hall backspace-lock rules.
                </p>

                {/* Clean hairline directory card */}
                <div 
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8DFD3',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 18px rgba(35, 20, 24, 0.03)',
                    marginTop: '24px'
                  }}
                >
                  {TARGET_EXAMINATIONS.map((exam, idx) => {
                    const isLast = idx === TARGET_EXAMINATIONS.length - 1;
                    return (
                      <div 
                        key={exam.id}
                        style={{
                          padding: '14px 20px',
                          borderBottom: isLast ? 'none' : '1px solid #EDE5DA',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FAF7F2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#231418' }}>
                            {exam.title}
                          </div>
                          <div style={{ fontSize: '11px', color: '#8A7B7E', marginTop: '2px' }}>
                            {exam.category}
                          </div>
                        </div>
                        <span 
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#991B1B',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}
                        >
                          {exam.speed}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </FadeUp>
            </div>

            {/* Right Column (lg:col-span-7): 8-Stage Teaching Methodology */}
            <div className="sp-courses-spread-right" style={{ minWidth: 0 }}>
              <FadeUp delay={0.08}>
                <span 
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: '#8A7B7E',
                    display: 'block',
                    marginBottom: '6px'
                  }}
                >
                  PROVEN PEDAGOGY
                </span>
                <h2 
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: '-0.015em',
                    color: '#231418',
                    marginBottom: '10px'
                  }}
                >
                  8-Stage teaching <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>methodology</span> (शिक्षण पद्धति)
                </h2>
                <p style={{ fontSize: '13px', color: '#594A4D', lineHeight: 1.55, marginBottom: '28px' }}>
                  Guided by <strong style={{ color: '#231418', fontWeight: 600 }}>Shadab Sir (12+ Years Experience)</strong> to systematically build accuracy and audio transcription speed from 50 to 140 WPM.
                </p>

                {/* 2-column numbered editorial grid on continuous Warm Cream */}
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '24px'
                  }}
                >
                  {TEACHING_METHODOLOGY.map((m, idx) => {
                    const stepNum = String(idx + 1).padStart(2, '0');
                    return (
                      <div 
                        key={m.step || idx}
                        style={{
                          borderTop: '1px solid #E0D5C7',
                          paddingTop: '16px',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        <div 
                          style={{
                            fontFamily: "'Instrument Serif', Georgia, serif",
                            fontSize: '1.5rem',
                            lineHeight: 1,
                            color: '#8A7B7E',
                            fontWeight: 400
                          }}
                        >
                          {stepNum}
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#231418', marginTop: '6px', marginBottom: '2px' }}>
                          {m.title}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 500, color: '#78716C', marginBottom: '6px' }}>
                          {m.hindi}
                        </div>
                        <p style={{ fontSize: '12px', color: '#594A4D', lineHeight: 1.5, margin: 0 }}>
                          {m.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: OPEN WARM-GLOW PRE-FOOTER CTA (WARM CREAM #FBF8F3 CANVAS)
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
              FREE DEMO &amp; COUNSELING
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
              Not sure which course or <span className="italic text-[#991B1B]" style={{ fontStyle: 'italic', color: '#991B1B' }}>speed batch</span> is right for you?
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
              Speak directly with senior instructors or Head Faculty <strong style={{ color: '#231418', fontWeight: 600 }}>Shadab Sir (12+ Years Experience)</strong> for a personalized skill assessment.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <button 
                type="button"
                onClick={() => {
                  if (onOpenAdmission) onOpenAdmission();
                }}
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
                <span>Book 3 Free Demo Classes &rarr;</span>
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
                <span>Call +91 9204123453</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
