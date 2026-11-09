import React, { useState } from 'react';
import { 
  GraduationCap, 
  Crown, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Phone,
  MessageCircle
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

export default function CoursesPage({ courses = ACADEMY_COURSES, onSelectPlan, onOpenCheckout, setCurrentTab }) {
  const [filterCategory, setFilterCategory] = useState('all');

  const displayCourses = courses && courses.length > 0 ? courses : ACADEMY_COURSES;

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

  return (
    <div className="courses-page-root">
      
      {/* 1. HERO HEADER */}
      <div className="courses-hero-banner">
        <div className="courses-hero-container">
          <div className="courses-hero-badge">
            <Sparkles size={14} className="text-amber-300" />
            <span>OFFICIAL CURRICULUM & TEST PASSES • ESTD. 2008</span>
          </div>
          <h1 className="courses-hero-title">
            Stenography Courses & Examination Programs
          </h1>
          <p className="courses-hero-desc">
            From absolute zero in Pitman Shorthand to cracking High Court & SSC Stenographer skill tests at 50–140 WPM. We provide Basic to Advance speed in shorthand with AI-based dictation and real-time evaluation.
          </p>

          {/* Filter Pills */}
          <div className="courses-category-pills">
            <button 
              className={`course-cat-pill ${filterCategory === 'all' ? 'active' : ''}`}
              onClick={() => setFilterCategory('all')}
            >
              <span>⭐ All Courses</span>
            </button>
            <button 
              className={`course-cat-pill ${filterCategory === 'pitman' ? 'active' : ''}`}
              onClick={() => setFilterCategory('pitman')}
            >
              <span>✍️ 1. English Shorthand</span>
            </button>
            <button 
              className={`course-cat-pill ${filterCategory === 'hindi-steno' ? 'active' : ''}`}
              onClick={() => setFilterCategory('hindi-steno')}
            >
              <span>🇮🇳 2. Hindi Shorthand</span>
            </button>
            <button 
              className={`course-cat-pill ${filterCategory === 'typing-eng' ? 'active' : ''}`}
              onClick={() => setFilterCategory('typing-eng')}
            >
              <span>⌨️ 3. English Typing</span>
            </button>
            <button 
              className={`course-cat-pill ${filterCategory === 'typing-hindi' ? 'active' : ''}`}
              onClick={() => setFilterCategory('typing-hindi')}
            >
              <span>🇮🇳 4. Hindi Typing</span>
            </button>
            <button 
              className={`course-cat-pill ${filterCategory === 'typing-both' ? 'active' : ''}`}
              onClick={() => setFilterCategory('typing-both')}
            >
              <span>🌐 5. English & Hindi Typing</span>
            </button>
            <button 
              className={`course-cat-pill ${filterCategory === 'court' ? 'active' : ''}`}
              onClick={() => setFilterCategory('court')}
            >
              <span>⚖️ High Court Series</span>
            </button>
            <button 
              className={`course-cat-pill ${filterCategory === 'ssc' ? 'active' : ''}`}
              onClick={() => setFilterCategory('ssc')}
            >
              <span>🏛️ SSC Grade C & D</span>
            </button>
            <button 
              className={`course-cat-pill ${filterCategory === 'diplomas' ? 'active' : ''}`}
              onClick={() => setFilterCategory('diplomas')}
            >
              <span>📜 Govt. Diplomas (DCA/ADCA)</span>
            </button>
          </div>
        </div>
      </div>

      {/* CANONICAL COURSE LIST - WEBSITE / ADMISSION FORM */}
      <section style={{ maxWidth: 1200, margin: '-1.5rem auto 2.5rem', padding: '0 1.25rem' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e7e5e4',
          borderRadius: '12px',
          padding: '1.25rem 1.75rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Official Academic Curriculum
              </span>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1c1917', margin: '0.15rem 0 0' }}>
                Course List — Website / Admission Form
              </h2>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#78716c', background: '#faf9f6', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #e7e5e4' }}>
              Select any course below to view syllabus & enroll
            </span>
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
                onClick={() => setFilterCategory(c.filter)}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
      <section className="courses-cards-section">
        <div className="courses-cards-container">
          <div className="section-header-compact">
            <span className="badge-subheading">CLASSROOM & ONLINE CURRICULUM</span>
            <h2 className="section-title-large">Structured Academy Batches</h2>
            <p className="section-description-text">
              Direct mentorship under experienced faculty Shadab Sir (12 Years Experience) with daily outline corrections and exam simulations.
            </p>
          </div>

          <div className="academy-courses-grid">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className={`course-program-card ${course.popular ? 'featured-program-card' : ''}`}
              >
                {course.popular && (
                  <div className="program-popular-ribbon">⭐ FLAGSHIP BATCH</div>
                )}

                <div className="course-card-top">
                  <div className="course-badge-row">
                    <span className={`badge ${course.tagColor}`}>{course.badge}</span>
                    <span className="course-speed-chip font-mono">{course.speedTarget}</span>
                  </div>
                  <h3 className="course-card-title">{course.title}</h3>
                  <p className="course-card-description">{course.description}</p>
                </div>

                <div className="course-meta-strip">
                  <div className="meta-strip-item">
                    <Clock size={15} className="text-royal-blue" />
                    <span><strong>Duration:</strong> {course.duration}</span>
                  </div>
                  <div className="meta-strip-item">
                    <GraduationCap size={15} className="text-royal-blue" />
                    <span><strong>Mode:</strong> {course.mode}</span>
                  </div>
                </div>

                <div className="course-syllabus-block">
                  <h4 className="syllabus-heading">What You Will Master:</h4>
                  <ul className="syllabus-checklist">
                    {course.syllabus.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} className="text-emerald shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="course-card-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div className="course-fee-block">
                      <span className="fee-label">Course Fee:</span>
                      <span className="fee-amount font-mono">{course.fee}</span>
                    </div>
                    <button 
                      className="btn-enroll-course"
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
                    >
                      <span>Enroll Now</span>
                      <ArrowRight size={16} />
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
                      borderRadius: '999px',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
      <section className="courses-pricing-passes-section" id="test-passes">
        <div className="courses-cards-container">
          <div className="section-header-compact text-center">
            <span className="badge-subheading">INSTANT TEST PORTAL ACCESS</span>
            <h2 className="section-title-large">Online Test Series & Audio Vault Passes</h2>
            <p className="section-description-text">
              Instant access with UPI & QR code. Practice anytime with real exam reading rooms and automated error calculation.
            </p>
          </div>

          <div className="pricing-cards-grid mt-4">
            {PRICING_PLANS.map((plan) => {
              const isPro = plan.popular || plan.id === 'plan-12mo';
              return (
                <div key={plan.id} className={`saas-card pricing-plan-card ${isPro ? 'pro-highlight' : ''}`}>
                  {plan.badge && (
                    <div className="plan-badge-ribbon">
                      <span className={`badge ${plan.popular ? 'badge-amber' : 'badge-blue'}`}>{plan.badge}</span>
                    </div>
                  )}
                  {plan.seriesTitle && (
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#0284c7', marginBottom: '0.25rem' }}>
                      {plan.seriesTitle}
                    </div>
                  )}
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc">{plan.description}</p>
                  
                  <div className="plan-price-block" style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {plan.originalPrice && (
                      <span style={{ textDecoration: 'line-through', color: '#dc2626', fontSize: '1.15rem', fontWeight: 700, marginRight: '0.2rem' }}>
                        ₹{plan.originalPrice}
                      </span>
                    )}
                    <span className="currency">₹</span>
                    <span className="amount font-mono">{plan.price}</span>
                    <span className="duration text-muted">/ {plan.duration}</span>
                  </div>

                  <div className="plan-divider" />

                  <ul className="plan-features-list">
                    {plan.features.map((feat, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="text-emerald check-feat" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="plan-footer-cta" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button 
                      className={`btn ${isPro ? 'btn-primary' : 'btn-secondary'} w-full`}
                      onClick={() => {
                        if (onSelectPlan) onSelectPlan(plan.id);
                        if (onOpenCheckout) onOpenCheckout(plan.id);
                      }}
                    >
                      <Crown size={16} className={isPro ? 'text-amber' : ''} />
                      <span>Activate with UPI (₹{plan.price})</span>
                    </button>
                    <a
                      href={`https://wa.me/919204123453?text=${encodeURIComponent(`Hello Shorthand Plus, I want to enroll in ${plan.name} (₹${plan.price} / ${plan.duration}). Please guide me with enrollment.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-plan-whatsapp w-full"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.45rem',
                        background: '#15803d',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        padding: '0.65rem 1rem',
                        borderRadius: '999px',
                        textDecoration: 'none',
                        boxShadow: '0 2px 6px rgba(21, 128, 61, 0.2)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <MessageCircle size={15} className="shrink-0" />
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
      <section className="courses-counseling-banner">
        <div className="courses-cards-container">
          <div className="counseling-card">
            <div className="counseling-text">
              <h3>Unsure which course or speed batch is right for you?</h3>
              <p>Speak directly with our senior instructors or Head Faculty Shadab Sir (12 Years Experience) for a personalized skill assessment.</p>
            </div>
            <a 
              href="tel:+919204123453"
              className="btn-counseling-call"
            >
              <Phone size={16} />
              <span>Free Academic Counseling (+91 9204123453)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
