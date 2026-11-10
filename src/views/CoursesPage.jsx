import React, { useState } from 'react';
import { 
  GraduationCap, 
  Crown, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Phone,
  FileText,
  Keyboard,
  BookOpen,
  Award,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { PRICING_PLANS, TARGET_EXAMINATIONS, TEACHING_METHODOLOGY } from '../data/mockData';

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
  }
];

const renderCourseIcon = (iconName) => {
  switch (iconName) {
    case 'BookOpen':
      return <BookOpen size={18} color="#2563EB" />;
    case 'FileText':
      return <FileText size={18} color="#2563EB" />;
    case 'Keyboard':
      return <Keyboard size={18} color="#2563EB" />;
    case 'ShieldCheck':
      return <ShieldCheck size={18} color="#059669" />;
    case 'Award':
      return <Award size={18} color="#D97706" />;
    case 'GraduationCap':
      return <GraduationCap size={18} color="#7C3AED" />;
    default:
      return <BookOpen size={18} color="#2563EB" />;
  }
};

export default function CoursesPage({ courses = ACADEMY_COURSES, onSelectPlan, onOpenCheckout, onOpenAdmission, setCurrentTab }) {
  const [filterCategory, setFilterCategory] = useState('all');
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

  const filteredCourses = displayCourses.filter((course) => {
    if (filterCategory === 'all') return true;
    const cat = (course.category || '').toLowerCase();
    const id = (course.id || '').toLowerCase();
    const title = (course.title || '').toLowerCase();
    if (filterCategory === 'pitman') return id === 'course-pitman' || title.includes('english shorthand');
    if (filterCategory === 'hindi-steno') return id === 'course-hindi-steno' || title.includes('hindi shorthand') || title.includes('हिंदी आशुलिपि');
    if (filterCategory === 'typing') return cat.includes('typing') || id.includes('typing') || title.includes('typing');
    if (filterCategory === 'court') return cat.includes('judicial') || id.includes('court') || title.includes('court');
    if (filterCategory === 'ssc') return cat.includes('central') || id.includes('ssc') || title.includes('ssc');
    if (filterCategory === 'diplomas') return cat.includes('diploma') || id.includes('diploma') || title.includes('diploma') || title.includes('dca');
    return true;
  });

  const filteredPasses = PRICING_PLANS.filter((plan) => {
    if (passFilter === 'all') return true;
    if (passFilter === 'passes') {
      return ['plan-1day', 'plan-1mo', 'plan-6mo', 'plan-12mo'].includes(plan.id);
    }
    if (passFilter === 'special') {
      return ['plan-patna-hc', 'plan-jharkhand-hc', 'plan-pitman'].includes(plan.id);
    }
    return true;
  });

  return (
    <div className="courses-page-root" style={{ background: '#F8FAFC', minHeight: '100vh', color: '#0F172A' }}>
      
      {/* 1. HERO HEADER */}
      <div className="courses-hero-banner" style={{ padding: '2rem 1.25rem 2.5rem', textAlign: 'center' }}>
        <div className="courses-hero-container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            color: '#2563EB',
            fontSize: '0.76rem',
            fontWeight: 800,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            marginBottom: '1rem'
          }}>
            <Sparkles size={14} color="#2563EB" />
            <span>OFFICIAL CURRICULUM & TEST PASSES • ESTD. 2012</span>
          </div>
          <h1 className="courses-hero-title" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', fontWeight: 850, margin: '0 0 0.85rem', letterSpacing: '-0.025em', color: '#0F172A' }}>
            Stenography Courses & Examination Programs
          </h1>
          <p className="courses-hero-desc" style={{ fontSize: '1.02rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
            From absolute zero in Pitman Shorthand to cracking High Court & SSC Stenographer skill tests at 50–140 WPM. Guided by experienced faculty <strong>Shadab Sir (12 Years Experience)</strong> with real-time dictations and exam simulations.
          </p>
        </div>
      </div>

      {/* 2. ACADEMY COURSES & PROGRAMS */}
      <section id="academy-courses" style={{ maxWidth: 1240, margin: '0 auto 3rem', padding: '0 1.25rem' }}>
        
        {/* Category Filter Pills (Independent buttons - NO big oval wrap) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {[
            { id: 'all', label: 'All Programs', count: displayCourses.length },
            { id: 'pitman', label: 'English Shorthand' },
            { id: 'hindi-steno', label: 'Hindi Shorthand' },
            { id: 'typing', label: 'Typing Lab' },
            { id: 'court', label: 'High Court Judicial' },
            { id: 'ssc', label: 'SSC Grade C & D' },
            { id: 'diplomas', label: 'Diplomas (ADCA/DCA)' }
          ].map((tab) => {
            const isActive = filterCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectFilter(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  border: isActive ? '1.5px solid #0F172A' : '1px solid rgba(0, 0, 0, 0.08)',
                  background: isActive ? '#0F172A' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#0F172A',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 2px 8px rgba(17, 17, 17, 0.2)' : '0 1px 3px rgba(17, 17, 17, 0.04)',
                  transition: 'all 0.18s ease'
                }}
              >
                <span>{tab.label}</span>
                {tab.count && (
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.1rem 0.45rem',
                    borderRadius: '9999px',
                    background: isActive ? '#2563EB' : '#F1F5F9',
                    color: isActive ? '#FFFFFF' : '#475569'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Course Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.75rem',
          alignItems: 'stretch'
        }}>
          {filteredCourses.map((course) => {
            const isSyllabusOpen = !!expandedSyllabus[course.id];
            return (
              <div
                key={course.id}
                style={{
                  background: '#FFFFFF',
                  border: course.popular ? '2px solid #2563EB' : '1px solid #E2E8F0',
                  borderRadius: '20px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: course.popular 
                    ? '0 12px 32px -4px rgba(37, 99, 235, 0.16), 0 2px 6px rgba(15, 23, 42, 0.04)' 
                    : '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Popular Flagship Ribbon */}
                {course.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    color: '#2563EB',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <Sparkles size={12} color="#2563EB" />
                    <span>POPULAR BATCH</span>
                  </div>
                )}

                <div>
                  {/* Category & Speed Pill Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', paddingRight: course.popular ? '8.5rem' : 0 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {renderCourseIcon(course.icon)}
                    </div>
                    <span style={{
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      color: '#2563EB',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase'
                    }}>
                      {course.category}
                    </span>
                    <span style={{
                      fontFamily: 'SF Mono, monospace',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      color: '#0F172A',
                      marginLeft: 'auto'
                    }}>
                      ⚡ {course.speedTarget}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 850,
                    color: '#0F172A',
                    lineHeight: 1.35,
                    margin: '0 0 0.5rem',
                    letterSpacing: '-0.015em'
                  }}>
                    {course.title}
                  </h3>
                  <p style={{
                    fontSize: '0.88rem',
                    color: '#64748B',
                    lineHeight: 1.5,
                    margin: '0 0 1rem'
                  }}>
                    {course.description}
                  </p>

                  {/* Quick Specs Pill Strip */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    marginBottom: '1.25rem',
                    fontSize: '0.8rem',
                    color: '#0F172A'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Clock size={14} color="#64748B" className="shrink-0" />
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <GraduationCap size={14} color="#64748B" className="shrink-0" />
                      <span><strong>Format:</strong> {course.mode}</span>
                    </div>
                  </div>

                  {/* High Impact Highlights */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <div style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#64748B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.6rem'
                    }}>
                      Key Highlights:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(course.highlights || course.syllabus.slice(0, 4)).map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.86rem', color: '#334155', lineHeight: 1.45 }}>
                          <Check size={14} style={{ color: '#059669', flexShrink: 0, marginTop: '2px', strokeWidth: 2.5 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Full Syllabus Toggle */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <button
                      type="button"
                      onClick={() => toggleSyllabus(course.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#2563EB',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: '0.2rem 0',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <span>{isSyllabusOpen ? 'Hide Full Syllabus' : `View Full Syllabus (${course.syllabus.length} Topics)`}</span>
                      {isSyllabusOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>

                    {isSyllabusOpen && (
                      <div style={{
                        marginTop: '0.5rem',
                        padding: '0.85rem 1rem',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px'
                      }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          {course.syllabus.map((s, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                              <span style={{ color: '#2563EB', fontWeight: 800 }}>•</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action & Fee Footer */}
                <div style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid #F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  marginTop: 'auto'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                      <span style={{ fontSize: '1.45rem', fontWeight: 850, color: '#0F172A', fontFamily: 'SF Mono, monospace' }}>
                        {course.fee}
                      </span>
                      {course.originalFee && (
                        <span style={{ fontSize: '0.9rem', color: '#94A3B8', textDecoration: 'line-through', fontWeight: 600 }}>
                          {course.originalFee}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>
                      {course.feeType || 'Official Curriculum'}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEnroll(course)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.28)',
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}
                  >
                    <span>Enroll Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TARGET EXAMINATIONS BANNER */}
      <section style={{ maxWidth: 1240, margin: '0 auto 3.5rem', padding: '0 1.25rem' }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '20px',
          padding: '2.25rem',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.04)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.75rem' }}>
            <div>
              <span style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#2563EB',
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                display: 'inline-block',
                marginBottom: '0.5rem'
              }}>
                GOVERNMENT EXAMS COVERED
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 850, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                कौन-कौन सी परीक्षाओं की तैयारी कराई जाती है?
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#64748B', margin: '0.35rem 0 0' }}>
                Our courses provide skill-based training for various government stenographer and typing examinations.
              </p>
            </div>
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#0F172A',
              background: '#F8FAFC',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: '1px solid #E2E8F0'
            }}>
              9 National & State Exam Benches
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {TARGET_EXAMINATIONS.map((exam) => (
              <div
                key={exam.id}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>
                    {exam.title}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
                    {exam.speed} • {exam.category}
                  </div>
                </div>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  color: '#2563EB',
                  flexShrink: 0
                }}>
                  {exam.speed}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 TEACHING METHODOLOGY (शिक्षण पद्धति) */}
      <section style={{ maxWidth: 1240, margin: '1rem auto 3.5rem', padding: '0 1.25rem' }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.04)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#059669',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '0.5rem'
            }}>
              STRUCTURED PEDAGOGY • GAYA SHORTHAND CLASSES
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 850, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Teaching Methodology (शिक्षण पद्धति)
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748B', margin: '0.45rem auto 0', maxWidth: 660 }}>
              Our 8-stage training methodology guided by <strong>Shadab Sir (12 Years Experience)</strong> ensures continuous speed and accuracy improvement.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}>
            {TEACHING_METHODOLOGY.map((m) => (
              <div
                key={m.step}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    fontFamily: 'SF Mono, monospace',
                    color: '#2563EB',
                    background: '#EFF6FF',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    border: '1px solid #BFDBFE'
                  }}>
                    {m.step}
                  </span>
                  <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#059669' }}>
                    {m.hindi}
                  </span>
                </div>
                <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#0F172A' }}>
                  {m.title}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.55 }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SUBSCRIPTION & TEST SERIES PASSES */}
      <section id="test-passes" style={{ maxWidth: 1240, margin: '0 auto 3.5rem', padding: '0 1.25rem' }}>
        <div style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#2563EB',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '0.5rem'
            }}>
              INSTANT TEST PORTAL ACCESS
            </span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 850, color: '#0F172A', margin: '0 0 0.45rem', letterSpacing: '-0.02em' }}>
              Online Test Series & Audio Vault Passes
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#64748B', margin: '0 auto', maxWidth: 640 }}>
              Instant access with UPI & QR code. Practice anytime with real exam reading rooms and automated error calculation.
            </p>

            {/* Passes Filter Bar */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '0.4rem', borderRadius: '12px', marginTop: '1.5rem', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)' }}>
              <button
                type="button"
                onClick={() => setPassFilter('all')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: passFilter === 'all' ? '#0F172A' : 'transparent',
                  color: passFilter === 'all' ? '#FFFFFF' : '#64748B',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                All Passes (7)
              </button>
              <button
                type="button"
                onClick={() => setPassFilter('passes')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: passFilter === 'passes' ? '#0F172A' : 'transparent',
                  color: passFilter === 'passes' ? '#FFFFFF' : '#64748B',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Daily & Monthly Passes (4)
              </button>
              <button
                type="button"
                onClick={() => setPassFilter('special')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: passFilter === 'special' ? '#0F172A' : 'transparent',
                  color: passFilter === 'special' ? '#FFFFFF' : '#64748B',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                High Court & Foundation (3)
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredPasses.map((plan) => {
              const isPro = plan.popular || plan.id === 'plan-12mo';
              return (
                <div 
                  key={plan.id} 
                  style={{
                    background: '#FFFFFF',
                    border: isPro ? '2px solid #2563EB' : '1px solid #E2E8F0',
                    borderRadius: '20px',
                    padding: '2rem 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: isPro 
                      ? '0 12px 32px -4px rgba(37, 99, 235, 0.16), 0 2px 6px rgba(15, 23, 42, 0.04)' 
                      : '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.04)'
                  }}
                >
                  {plan.badge && (
                    <div style={{
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.25rem',
                      background: isPro ? '#EFF6FF' : '#ECFDF5',
                      border: isPro ? '1px solid #BFDBFE' : '1px solid #A7F3D0',
                      color: isPro ? '#2563EB' : '#059669',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '999px'
                    }}>
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {plan.seriesTitle && (
                      <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#2563EB', marginBottom: '0.35rem' }}>
                        {plan.seriesTitle}
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 850, color: '#0F172A', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: 1.55, margin: '0 0 1.25rem' }}>
                      {plan.description}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {plan.originalPrice && (
                        <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '1.1rem', fontWeight: 700, marginRight: '0.2rem' }}>
                          ₹{plan.originalPrice}
                        </span>
                      )}
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>₹</span>
                      <span style={{ fontSize: '2.25rem', fontWeight: 850, color: '#0F172A', fontFamily: 'SF Mono, monospace' }}>
                        {plan.price}
                      </span>
                      <span style={{ fontSize: '0.84rem', color: '#64748B', fontWeight: 600 }}>
                        / {plan.duration}
                      </span>
                    </div>

                    <div style={{ height: '1px', background: '#F1F5F9', margin: '0 0 1.25rem' }} />

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {plan.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.86rem', color: '#334155', lineHeight: 1.45 }}>
                          <CheckCircle2 size={16} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                    <button 
                      type="button"
                      onClick={() => {
                        if (onSelectPlan) onSelectPlan(plan.id);
                        if (onOpenCheckout) onOpenCheckout(plan.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        background: isPro 
                          ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' 
                          : '#0F172A',
                        color: '#FFFFFF',
                        fontSize: '0.92rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: isPro 
                          ? '0 4px 14px rgba(37, 99, 235, 0.28)' 
                          : '0 2px 6px rgba(15, 23, 42, 0.15)',
                        transition: 'opacity 0.15s ease'
                      }}
                    >
                      <Crown size={16} color="#FFFFFF" />
                      <span>Activate with UPI (₹{plan.price})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CONTACT & COUNSELING BANNER */}
      <section style={{ maxWidth: 1240, margin: '0 auto 4rem', padding: '0 1.25rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: '24px',
          padding: '2.5rem 2.5rem',
          boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ maxWidth: 680 }}>
            <span style={{
              fontSize: '0.76rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#38BDF8',
              display: 'inline-block',
              marginBottom: '0.4rem'
            }}>
              DIRECT FACULTY GUIDANCE
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 850, color: '#FFFFFF', margin: '0 0 0.5rem', letterSpacing: '-0.015em' }}>
              Unsure which course or speed batch is right for you?
            </h3>
            <p style={{ fontSize: '0.94rem', color: '#CBD5E1', margin: 0, lineHeight: 1.6 }}>
              Speak directly with our senior instructors or Head Faculty <strong>Shadab Sir (12 Years Experience)</strong> for a personalized skill assessment.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <a 
              href="tel:+919204123453"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.85rem 1.6rem',
                borderRadius: '12px',
                background: '#2563EB',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
              }}
            >
              <Phone size={16} color="#FFFFFF" />
              <span>Call Helpline: +91 9204123453</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
