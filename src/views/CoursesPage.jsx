import React, { useState } from 'react';
import { 
  GraduationCap, 
  Crown, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Phone
} from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

const ACADEMY_COURSES = [
  {
    id: 'course-pitman',
    title: 'Basic Pitman Shorthand Masterclass',
    category: 'Foundation',
    badge: 'Beginner to 80 WPM',
    tagColor: 'badge-blue',
    speedTarget: '0 → 80 WPM',
    duration: '3 to 4 Months',
    fee: '₹6,000 (Complete)',
    description: 'Comprehensive foundation course starting from stroke geometry, vowel positions, circles, loops, hooks, to grammalogues and speed phrasing.',
    syllabus: [
      'Complete Pitman Shorthand Theory (All 24 Chapters)',
      'Handwritten Outline Checks & Daily Correction by Gagan Sir',
      'Grammalogues, Contractions & Phraseography Drill',
      'Progressive Speed Dictations: 40 → 60 → 80 WPM',
      'Includes Official Book & Printed Practice Workbook'
    ],
    mode: 'Offline Classroom (Gaya) + Audio Lab Access',
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
    fee: '₹249 / Month (Pass)',
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
    description: 'Government-accredited computer applications diplomas accepted in all Central & State government document verifications and ministerial clerk posts.',
    syllabus: [
      'DCA (6 Months) & ADCA (1 Year) Curriculum',
      'Tally Prime with GST Certification',
      'English QWERTY & Hindi (Kruti Dev / Mangal) Typing Studio',
      'Certificate Verification System with Official QR Code',
      'Valid for High Courts, BSSC, SSC, Banking & Railways'
    ],
    mode: 'Gaya Offline Lab & Document Verification Support',
    popular: false
  }
];

export default function CoursesPage({ onSelectPlan, onOpenCheckout, setCurrentTab }) {
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredCourses = ACADEMY_COURSES.filter((course) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'pitman') return course.id === 'course-pitman';
    if (filterCategory === 'court') return course.id === 'course-court';
    if (filterCategory === 'ssc') return course.id === 'course-ssc';
    if (filterCategory === 'diplomas') return course.id === 'course-diplomas';
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
            From absolute zero in Pitman Shorthand to cracking the High Court & SSC Stenographer skill tests at 80–120 WPM. Choose an academy course or activate an unlimited test series pass.
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
              <span>✍️ Pitman Foundation (0-80 WPM)</span>
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

      {/* 2. ACADEMY COURSES GRID */}
      <section className="courses-cards-section">
        <div className="courses-cards-container">
          <div className="section-header-compact">
            <span className="badge-subheading">CLASSROOM & ONLINE CURRICULUM</span>
            <h2 className="section-title-large">Structured Academy Batches</h2>
            <p className="section-description-text">
              Direct mentorship under Director Gagan Sir with daily outline corrections and exam simulations.
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

                <div className="course-card-footer">
                  <div className="course-fee-block">
                    <span className="fee-label">Course Fee:</span>
                    <span className="fee-amount font-mono">{course.fee}</span>
                  </div>
                  <button 
                    className="btn-enroll-course"
                    onClick={() => {
                      if (onOpenCheckout) onOpenCheckout('plan-1mo');
                    }}
                  >
                    <span>Enroll Now</span>
                    <ArrowRight size={16} />
                  </button>
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
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc">{plan.description}</p>
                  
                  <div className="plan-price-block">
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

                  <div className="plan-footer-cta">
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
              <p>Speak directly with our senior instructors or Director Gagan Sir for a personalized skill assessment.</p>
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
