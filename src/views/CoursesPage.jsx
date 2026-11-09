import React, { useState } from 'react';
import { 
  GraduationCap, 
  Crown, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Phone,
  MessageCircle,
  FileText
} from 'lucide-react';
import { PRICING_PLANS, TARGET_EXAMINATIONS, TEACHING_METHODOLOGY } from '../data/mockData';

const ACADEMY_COURSES = [
  {
    id: 'course-pitman',
    title: 'English Shorthand (Pitman Shorthand)',
    category: 'Shorthand Course (English)',
    badge: 'SSC & High Court Special',
    tagColor: 'badge-blue',
    speedTarget: '60, 80, 100 & 120 WPM',
    duration: '3 to 4 Months',
    fee: '₹4,500 (Complete)',
    description: 'Learn English Shorthand from Basic to Advanced Level with systematic guidance and practical training. This course is specially designed for students preparing for SSC Stenographer, High Court Stenographer, Personal Assistant (PA), Private Secretary (PS) and other government stenographer examinations.',
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
    mode: 'Classroom (Gaya Center) + Online Audio Portal Access',
    popular: true
  },
  {
    id: 'course-hindi-steno',
    title: 'Hindi Shorthand (हिंदी आशुलिपि)',
    category: 'Shorthand Course (Hindi)',
    badge: 'Hindi Steno & Court Special',
    tagColor: 'badge-amber',
    speedTarget: '50, 80, 100 & 120+ WPM',
    duration: '3 to 6 Months',
    fee: '₹6,000 (Complete)',
    description: 'Learn Hindi Shorthand from Basic to Advanced Level through practical classes, regular dictation and transcription practice. This course is designed for students preparing for Hindi Stenographer, Court Stenographer and various government recruitment examinations.',
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
    mode: 'Classroom (Gaya Center) + Online Audio Portal Access',
    popular: true
  },
  {
    id: 'course-english-typing',
    title: 'English Typing & Computer Typing Skills',
    category: 'Typing Course (English)',
    badge: 'Speed & Accuracy Mastery',
    tagColor: 'badge-purple',
    speedTarget: '30, 35, 40, 50 & 60+ WPM',
    duration: '1 to 3 Months',
    fee: '₹1,500 (Complete)',
    description: 'Develop professional English typing skills with proper finger placement, keyboard techniques and regular practical exercises. This course focuses on typing speed, accuracy and computer-based typing examination preparation.',
    syllabus: [
      'Keyboard Introduction',
      'Home Row and Finger Placement',
      'Touch Typing Techniques',
      'Word and Sentence Practice',
      'Paragraph Typing',
      'Speed Building Exercises',
      'Accuracy Improvement',
      'Online Typing Software Practice',
      'Computer-Based Typing Tests',
      'Speed Target: 30, 35, 40, 50 and 60+ WPM'
    ],
    mode: 'Classroom (Gaya Center) + Online Typing Software Access',
    popular: true
  },
  {
    id: 'course-hindi-typing',
    title: 'Hindi Typing & Hindi Computer Typing',
    category: 'Typing Course (Hindi)',
    badge: 'Kruti Dev & Mangal Special',
    tagColor: 'badge-amber',
    speedTarget: '30 → 50+ WPM',
    duration: '1 to 3 Months',
    fee: '₹1,500 (Complete)',
    description: 'Learn Hindi typing with practical keyboard training and regular typing exercises. This course is designed for students preparing for government typing examinations and office-related computer work.',
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
    mode: 'Classroom (Gaya Center) + Online Typing Software Access',
    popular: true
  },
  {
    id: 'course-bilingual-typing',
    title: 'English & Hindi Typing',
    category: 'Typing Course (Bilingual)',
    badge: 'Dual-Language Mastery',
    tagColor: 'badge-blue',
    speedTarget: '30 → 60+ WPM (Both Languages)',
    duration: '2 to 3 Months',
    fee: '₹2,500 (Complete)',
    description: 'Master both English (QWERTY) and Hindi (Kruti Dev 010 & Mangal Inscript) typing in a single comprehensive course. Specially designed for students preparing for High Court, Civil Court, BSSC, and Central/State government clerk examinations requiring bilingual typing proficiency.',
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
    mode: 'Classroom (Gaya Center) + Online Typing Software Access',
    popular: true
  },
  {
    id: 'course-court',
    title: 'High Court Judicial Speed & Legal Series',
    category: 'Judicial Bench',
    badge: 'Patna & Jharkhand HC',
    tagColor: 'badge-emerald',
    speedTarget: '80 → 110 WPM',
    duration: '2 to 3 Months',
    fee: '₹700 / Month',
    description: 'Specialized courtroom transcription batch designed specifically for Patna High Court, Jharkhand Civil Courts, and State Judiciary Stenographer exams.',
    syllabus: [
      'Authentic High Court Criminal & Civil Judgment Audio',
      'Legal Phrasing, Latin Maxims & Judicial Nomenclature',
      'Enforced 5-Minute Shorthand Reading Room Clock',
      'Strict Backspace Lock & Mechanical Keyboard Simulation',
      'Previous 10 Years Solved High Court Dictations'
    ],
    mode: 'Dual Mode: Offline Gaya Center or Online Portal',
    popular: false
  },
  {
    id: 'course-ssc',
    title: 'SSC Stenographer Grade C & D Crash Batch',
    category: 'Central Govt',
    badge: 'SSC Grade C & D',
    tagColor: 'badge-amber',
    speedTarget: '80 & 100 WPM',
    duration: '3 Months Intensive',
    fee: '₹350 / Month (Pass)',
    description: 'Targeted preparation for Staff Selection Commission Grade C and D skill tests with real exam audio speed fluctuations and automated error calculation.',
    syllabus: [
      'Parliamentary Speeches & Government Budget Passages',
      'SSC Strict Mistake Formula (Full & Half Mistake Evaluation)',
      'Daily 8:00 AM & 5:00 PM Live Speed Benchmark Tests',
      'All-India Batch Rank & Percentile Scorecards',
      'Kruti Dev 010 & Mangal Inscript Hindi Transcription'
    ],
    mode: 'Daily Live Dictation + Unlimited Audio Archive',
    popular: false
  },
  {
    id: 'course-diplomas',
    title: 'Computer Diplomas & Certified Typing (DCA / ADCA)',
    category: 'Govt Diplomas',
    badge: 'Govt. Recognized',
    tagColor: 'badge-purple',
    speedTarget: '30 → 50+ WPM Typing',
    duration: '6 to 12 Months',
    fee: 'Nominal Registration',
    description: 'The institute provides highly practical courses in Shorthand, Typing, and Advanced Diploma in Computer Applications (ADCA), DCA, TALLY etc., designed to help students build speed, accuracy, and efficiency for career growth in Government and private sectors. Alongside shorthand and typing, the ADCA program covers essential computer skills such as MS Office, Internet Applications, Tally, and more.',
    syllabus: [
      'ADCA (1 Year) & DCA (6 Months) Complete Computer Syllabus',
      'MS Office Suite (Word, Excel, PowerPoint) & Internet Applications',
      'Tally Prime with GST Invoicing & Accounting',
      'English QWERTY & Hindi (Kruti Dev / Mangal) Typing Speed Studio',
      'Career-Oriented Training for Steno, Data Entry & Clerical Roles',
      'Certificate Verification System with Official QR Code'
    ],
    mode: 'Gaya Offline Lab & Document Verification Support',
    popular: false
  }
];

export default function CoursesPage({ courses = ACADEMY_COURSES, onSelectPlan, onOpenCheckout, onOpenAdmission, setCurrentTab }) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [passFilter, setPassFilter] = useState('all');

  const displayCourses = courses && courses.length > 0 ? courses : ACADEMY_COURSES;

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
    if (filterCategory === 'pitman') return cat.includes('foundation') || id.includes('pitman') || title.includes('pitman');
    if (filterCategory === 'hindi-steno') return (cat.includes('hindi') && cat.includes('shorthand')) || id === 'course-hindi-steno' || title.includes('हिंदी आशुलिपि');
    if (filterCategory === 'typing-eng') return id === 'course-english-typing' || (cat.includes('typing') && cat.includes('english'));
    if (filterCategory === 'typing-hindi') return id === 'course-hindi-typing' || (cat.includes('typing') && cat.includes('hindi'));
    if (filterCategory === 'typing-both') return id === 'course-bilingual-typing' || cat.includes('bilingual');
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
    <div className="courses-page-root">
      
      {/* 1. HERO HEADER */}
      <div className="courses-hero-banner" style={{ padding: '1rem 1.25rem 2rem', textAlign: 'center' }}>
        <div className="courses-hero-container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="courses-hero-badge" style={{ marginBottom: '0.85rem' }}>
            <Sparkles size={14} className="text-amber-500" />
            <span>OFFICIAL CURRICULUM & TEST PASSES • ESTD. 2012</span>
          </div>
          <h1 className="courses-hero-title" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.6rem)', fontWeight: 850, margin: '0 0 0.75rem', letterSpacing: '-0.025em', color: '#1c1917' }}>
            Stenography Courses & Examination Programs
          </h1>
          <p className="courses-hero-desc" style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.6, margin: 0 }}>
            From absolute zero in Pitman Shorthand to cracking High Court & SSC Stenographer skill tests at 50–140 WPM. Guided by experienced faculty <strong>Shadab Sir (12 Years Experience)</strong> with real-time dictations and exam simulations.
          </p>
        </div>
      </div>

      {/* CANONICAL COURSE LIST - WEBSITE / ADMISSION FORM */}
      <section style={{ maxWidth: 1200, margin: '0 auto 2.5rem', padding: '0 1.25rem' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e7e5e4',
          borderRadius: '16px',
          padding: '1.5rem 1.75rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Official Academic Curriculum
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 850, color: '#1c1917', margin: '0.15rem 0 0' }}>
                Course List — Website / Admission Form
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleSelectFilter('all')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: filterCategory === 'all' ? '1.5px solid #1c1917' : '1px solid #e7e5e4',
                  background: filterCategory === 'all' ? '#1c1917' : '#faf9f6',
                  color: filterCategory === 'all' ? '#ffffff' : '#57534e',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                All Courses
              </button>
              <button
                type="button"
                onClick={() => handleSelectFilter('court')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: filterCategory === 'court' ? '1.5px solid #7c3aed' : '1px solid #e7e5e4',
                  background: filterCategory === 'court' ? '#7c3aed' : '#faf9f6',
                  color: filterCategory === 'court' ? '#ffffff' : '#57534e',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                High Court Special
              </button>
              <button
                type="button"
                onClick={() => handleSelectFilter('ssc')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: filterCategory === 'ssc' ? '1.5px solid #d97706' : '1px solid #e7e5e4',
                  background: filterCategory === 'ssc' ? '#d97706' : '#faf9f6',
                  color: filterCategory === 'ssc' ? '#ffffff' : '#57534e',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                SSC Grade C & D
              </button>
              <button
                type="button"
                onClick={() => handleSelectFilter('diplomas')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: filterCategory === 'diplomas' ? '1.5px solid #0284c7' : '1px solid #e7e5e4',
                  background: filterCategory === 'diplomas' ? '#0284c7' : '#faf9f6',
                  color: filterCategory === 'diplomas' ? '#ffffff' : '#57534e',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Diplomas (ADCA/DCA)
              </button>
              <button
                type="button"
                onClick={() => onOpenAdmission ? onOpenAdmission() : null}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: '#047857',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(4, 120, 87, 0.25)'
                }}
              >
                <FileText size={14} color="#fde68a" />
                <span>Fill Online Admission Form</span>
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '0.75rem'
          }}>
            {[
              { sno: 1, name: 'English Shorthand', filter: 'pitman', desc: 'Pitman Basic to Advance' },
              { sno: 2, name: 'Hindi Shorthand', filter: 'hindi-steno', desc: 'हिंदी आशुलिपि & Court Special' },
              { sno: 3, name: 'English Typing', filter: 'typing-eng', desc: 'Touch Typing (30-60+ WPM)' },
              { sno: 4, name: 'Hindi Typing', filter: 'typing-hindi', desc: 'Kruti Dev 010 & Mangal' },
              { sno: 5, name: 'English & Hindi Typing', filter: 'typing-both', desc: 'Combined Dual-Language' }
            ].map((c) => (
              <div 
                key={c.sno}
                onClick={() => handleSelectFilter(c.filter)}
                style={{
                  background: filterCategory === c.filter ? '#fef3c7' : '#faf9f6',
                  border: filterCategory === c.filter ? '1.5px solid #d97706' : '1px solid #e7e5e4',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: filterCategory === c.filter ? '#d97706' : '#1c1917',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {c.sno}
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1c1917' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '0.73rem', color: '#78716c' }}>
                    {c.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET EXAMINATIONS BANNER */}
      <section style={{ maxWidth: 1200, margin: '0 auto 2.5rem', padding: '0 1.25rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #faf9f6 0%, #ffffff 100%)',
          border: '1px solid #e7e5e4',
          borderRadius: '16px',
          padding: '1.75rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#d97706',
                background: '#fef3c7',
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                display: 'inline-block',
                marginBottom: '0.35rem'
              }}>
                GOVERNMENT EXAMS COVERED
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
                कौन-कौन सी परीक्षाओं की तैयारी कराई जाती है?
              </h2>
              <p style={{ fontSize: '0.84rem', color: '#57534e', margin: '0.25rem 0 0' }}>
                Our courses provide skill-based training for various government stenographer and typing examinations.
              </p>
            </div>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#d97706',
              background: '#fffbeb',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #fde68a'
            }}>
              9 National & State Exam Benches
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0.85rem'
          }}>
            {TARGET_EXAMINATIONS.map((exam) => (
              <div
                key={exam.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e7e5e4',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1c1917' }}>
                    {exam.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#78716c' }}>
                    {exam.speed} • {exam.category}
                  </div>
                </div>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.45rem',
                  borderRadius: '6px',
                  background: exam.badgeColor === 'emerald' ? '#ecfdf5' : exam.badgeColor === 'blue' ? '#eff6ff' : exam.badgeColor === 'amber' ? '#fef3c7' : '#f5f5f4',
                  color: exam.badgeColor === 'emerald' ? '#047857' : exam.badgeColor === 'blue' ? '#1d4ed8' : exam.badgeColor === 'amber' ? '#b45309' : '#57534e',
                  flexShrink: 0
                }}>
                  {exam.speed}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ACADEMY COURSES GRID */}
      <section id="academy-courses" style={{ maxWidth: 1200, margin: '0 auto 3rem', padding: '0 1.25rem' }}>
        <div style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#d97706',
              background: '#fef3c7',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '0.45rem'
            }}>
              CLASSROOM & ONLINE CURRICULUM
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.35rem' }}>
              Structured Academy Batches
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#57534e', margin: '0 auto', maxWidth: 640 }}>
              Direct mentorship under experienced faculty <strong>Shadab Sir (12 Years Experience)</strong> with daily outline corrections and exam simulations.
            </p>
          </div>

          {/* Active Filter Pill Bar */}
          {filterCategory !== 'all' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '10px',
              padding: '0.65rem 1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ fontSize: '0.85rem', color: '#92400e', fontWeight: 600 }}>
                Filtered View: Showing {filteredCourses.length} of {displayCourses.length} programs
              </div>
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                style={{
                  background: '#1c1917',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Show All Programs
              </button>
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                style={{
                  background: '#ffffff',
                  border: course.popular ? '1.5px solid #d97706' : '1px solid #e7e5e4',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: course.popular ? '0 8px 30px rgba(217, 119, 6, 0.08)' : '0 4px 20px rgba(0, 0, 0, 0.03)',
                  overflow: 'hidden'
                }}
              >
                {course.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.25rem',
                    background: '#fef3c7',
                    border: '1px solid #fde68a',
                    color: '#b45309',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px'
                  }}>
                    ⭐ FLAGSHIP BATCH
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      background: '#eff6ff',
                      color: '#1d4ed8'
                    }}>
                      {course.badge}
                    </span>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      background: '#f5f5f4',
                      color: '#44403c'
                    }}>
                      {course.speedTarget}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: '#1c1917', lineHeight: 1.35, margin: '0 0 0.65rem' }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#57534e', lineHeight: 1.55, margin: '0 0 1.25rem' }}>
                    {course.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                    padding: '0.85rem 1rem',
                    background: '#faf9f6',
                    border: '1px solid #e7e5e4',
                    borderRadius: '10px',
                    marginBottom: '1.25rem',
                    fontSize: '0.82rem',
                    color: '#44403c'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={14} className="text-amber-600 shrink-0" />
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <GraduationCap size={14} className="text-amber-600 shrink-0" />
                      <span><strong>Mode:</strong> {course.mode}</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1c1917', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 0.65rem' }}>
                      What You Will Master:
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                      {course.syllabus.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: '#57534e', lineHeight: 1.4 }}>
                          <CheckCircle2 size={15} style={{ color: '#047857', flexShrink: 0, marginTop: '2px' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{
                  paddingTop: '1.15rem',
                  borderTop: '1px solid #e7e5e4',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  marginTop: 'auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#78716c', fontWeight: 600, textTransform: 'uppercase' }}>
                        Course Fee
                      </div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 850, color: '#1c1917', fontFamily: 'monospace' }}>
                        {course.fee}
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
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
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.6rem 1.15rem',
                        borderRadius: '8px',
                        background: '#047857',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.86rem',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(4, 120, 87, 0.25)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>Enroll Now</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                  <a
                    href={`https://wa.me/919204123453?text=${encodeURIComponent(`Hello Shorthand Plus, I want to inquire and enroll in ${course.title} (${course.fee}). Please provide batch timings and admission details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      background: '#15803d',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.84rem',
                      padding: '0.55rem 0.9rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      boxShadow: '0 2px 5px rgba(21, 128, 61, 0.2)'
                    }}
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Now</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 TEACHING METHODOLOGY (शिक्षण पद्धति) */}
      <section style={{ maxWidth: 1200, margin: '1rem auto 3rem', padding: '0 1.25rem' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e7e5e4',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#d97706',
              background: '#fef3c7',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '0.35rem'
            }}>
              STRUCTURED PEDAGOGY • GAYA SHORTHAND CLASSES
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
              Teaching Methodology (शिक्षण पद्धति)
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#57534e', margin: '0.35rem auto 0', maxWidth: 660 }}>
              Our 8-stage training methodology guided by <strong>Shadab Sir (12 Years Experience)</strong> ensures continuous speed and accuracy improvement.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            {TEACHING_METHODOLOGY.map((m) => (
              <div
                key={m.step}
                style={{
                  background: '#faf9f6',
                  border: '1px solid #e7e5e4',
                  borderRadius: '12px',
                  padding: '1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    fontFamily: 'monospace',
                    color: '#d97706',
                    background: '#fffbeb',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '6px',
                    border: '1px solid #fde68a'
                  }}>
                    {m.step}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#d97706' }}>
                    {m.hindi}
                  </span>
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1c1917' }}>
                  {m.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#57534e', lineHeight: 1.5 }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SUBSCRIPTION & TEST SERIES PASSES */}
      <section id="test-passes" style={{ maxWidth: 1200, margin: '0 auto 3.5rem', padding: '0 1.25rem' }}>
        <div style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#d97706',
              background: '#fef3c7',
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '0.45rem'
            }}>
              INSTANT TEST PORTAL ACCESS
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.35rem' }}>
              Online Test Series & Audio Vault Passes
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#57534e', margin: '0 auto', maxWidth: 640 }}>
              Instant access with UPI & QR code. Practice anytime with real exam reading rooms and automated error calculation.
            </p>

            {/* Passes Filter Bar */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', border: '1px solid #e7e5e4', padding: '0.35rem', borderRadius: '10px', marginTop: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setPassFilter('all')}
                style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: '7px',
                  border: 'none',
                  background: passFilter === 'all' ? '#1c1917' : 'transparent',
                  color: passFilter === 'all' ? '#ffffff' : '#57534e',
                  fontSize: '0.82rem',
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
                  padding: '0.4rem 0.9rem',
                  borderRadius: '7px',
                  border: 'none',
                  background: passFilter === 'passes' ? '#1c1917' : 'transparent',
                  color: passFilter === 'passes' ? '#ffffff' : '#57534e',
                  fontSize: '0.82rem',
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
                  padding: '0.4rem 0.9rem',
                  borderRadius: '7px',
                  border: 'none',
                  background: passFilter === 'special' ? '#1c1917' : 'transparent',
                  color: passFilter === 'special' ? '#ffffff' : '#57534e',
                  fontSize: '0.82rem',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}>
            {filteredPasses.map((plan) => {
              const isPro = plan.popular || plan.id === 'plan-12mo';
              return (
                <div 
                  key={plan.id} 
                  style={{
                    background: '#ffffff',
                    border: isPro ? '2px solid #d97706' : '1px solid #e7e5e4',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: isPro ? '0 8px 30px rgba(217, 119, 6, 0.08)' : '0 4px 16px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  {plan.badge && (
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1.25rem',
                      background: plan.popular ? '#fef3c7' : '#eff6ff',
                      border: plan.popular ? '1px solid #fde68a' : '1px solid #bfdbfe',
                      color: plan.popular ? '#b45309' : '#1d4ed8',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px'
                    }}>
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {plan.seriesTitle && (
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#0284c7', marginBottom: '0.25rem' }}>
                        {plan.seriesTitle}
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.22rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.45rem' }}>
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#57534e', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                      {plan.description}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                      {plan.originalPrice && (
                        <span style={{ textDecoration: 'line-through', color: '#dc2626', fontSize: '1.1rem', fontWeight: 700, marginRight: '0.2rem' }}>
                          ₹{plan.originalPrice}
                        </span>
                      )}
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1c1917' }}>₹</span>
                      <span style={{ fontSize: '2rem', fontWeight: 850, color: '#1c1917', fontFamily: 'monospace' }}>
                        {plan.price}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: '#78716c', fontWeight: 600 }}>
                        / {plan.duration}
                      </span>
                    </div>

                    <div style={{ height: '1px', background: '#e7e5e4', margin: '0 0 1.25rem' }} />

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                      {plan.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.84rem', color: '#57534e', lineHeight: 1.45 }}>
                          <CheckCircle2 size={15} style={{ color: '#047857', flexShrink: 0, marginTop: '2px' }} />
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
                        gap: '0.45rem',
                        width: '100%',
                        padding: '0.65rem 1rem',
                        borderRadius: '8px',
                        background: isPro ? '#1c1917' : '#047857',
                        color: '#ffffff',
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: isPro ? '0 2px 8px rgba(28, 25, 23, 0.2)' : '0 2px 8px rgba(4, 120, 87, 0.25)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Crown size={15} color={isPro ? '#f59e0b' : '#fde68a'} />
                      <span>Activate with UPI (₹{plan.price})</span>
                    </button>
                    <a
                      href={`https://wa.me/919204123453?text=${encodeURIComponent(`Hello Shorthand Plus, I want to enroll in ${plan.name} (₹${plan.price} / ${plan.duration}). Please guide me with enrollment.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.45rem',
                        background: '#15803d',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.84rem',
                        padding: '0.55rem 1rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        boxShadow: '0 2px 5px rgba(21, 128, 61, 0.2)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <MessageCircle size={15} />
                      <span>WhatsApp Now</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CONTACT & COUNSELING BANNER */}
      <section style={{ maxWidth: 1200, margin: '0 auto 3.5rem', padding: '0 1.25rem' }}>
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #fed7aa',
          borderRadius: '16px',
          padding: '2rem 2.25rem',
          boxShadow: '0 4px 20px rgba(217, 119, 6, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div style={{ maxWidth: 650 }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#d97706',
              display: 'inline-block',
              marginBottom: '0.25rem'
            }}>
              DIRECT FACULTY GUIDANCE
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 850, color: '#1c1917', margin: '0 0 0.35rem' }}>
              Unsure which course or speed batch is right for you?
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#57534e', margin: 0, lineHeight: 1.5 }}>
              Speak directly with our senior instructors or Head Faculty <strong>Shadab Sir (12 Years Experience)</strong> for a personalized skill assessment.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a 
              href="tel:+919204123453"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.4rem',
                borderRadius: '8px',
                background: '#1c1917',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(28, 25, 23, 0.25)'
              }}
            >
              <Phone size={15} color="#f59e0b" />
              <span>Call Helpline: +91 9204123453</span>
            </a>
            <a 
              href="https://wa.me/919204123453?text=Hello%20Shadab%20Sir%2C%20I%20need%20academic%20counseling%20for%20shorthand%20and%20typing%20courses."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.4rem',
                borderRadius: '8px',
                background: '#15803d',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(21, 128, 61, 0.25)'
              }}
            >
              <MessageCircle size={15} />
              <span>WhatsApp Counseling</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
