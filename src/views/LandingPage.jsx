import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Headphones, 
  Keyboard, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Clock, 
  Users, 
  User,
  ChevronDown, 
  MessageSquare, 
  Lock, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Check, 
  ExternalLink,
  Volume2,
  Calendar,
  Layers,
  FileText,
  Zap
} from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';
import AcademyIllustration from '../components/AcademyIllustration';
import CustomSelect from '../components/CustomSelect';

const DEMO_SENTENCES = [
  "At the same time this is also opposed by some people who say that it will not reduce the election expenditure and will be an additional burden on the Government Exchequer.",
  "In Europe, in some countries like Germany, France and also in Japan this State funding system has been successfully implemented under statutory oversight.",
  "Frequent elections throughout the year disrupt the normal developmental activities of the Government and administrative machinery remains overburdened."
];

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const GOOGLE_REVIEWS = [
  {
    id: 1,
    name: "Anjali Verma",
    location: "Lucknow",
    badge: "SSC STENO",
    badgeType: "teal",
    rating: 5,
    title: "“My speed jumped from 60 to 100 WPM!”",
    text: "Amazing tool for stenography students. The variety of dictations and practice materials is outstanding. Rapid Steno made my SSC preparation very structured and effective.",
    avatarBg: "#ffedd5",
    avatarColor: "#ea580c"
  },
  {
    id: 2,
    name: "Suresh Yadav",
    location: "Patna",
    badge: "GOLD PASS",
    badgeType: "emerald",
    rating: 5,
    title: "“Sab kuch ek hi jagah mil gaya!”",
    text: "Pehle alag alag jagah se dictation, typing aur mock test dhundne padte the. Rapid Steno mein sab ek hi dashboard par hai. Gold Pass lene ke baad mujhe kisi aur cheez ki zaroorat hi nahi padi. Bahut hi cost-effective aur comprehensive platform hai.",
    avatarBg: "#dcfce7",
    avatarColor: "#15803d"
  },
  {
    id: 3,
    name: "Vikram Singh",
    location: "Allahabad",
    badge: "GOLD PASS",
    badgeType: "emerald",
    rating: 5,
    title: "“Worth every single penny!”",
    text: "Rapid Steno is a game-changer! The exam-style practice and progress tracking features are exactly what I needed. The mock tests feel just like the real exam environment.",
    avatarBg: "#f1f5f9",
    avatarColor: "#475569"
  },
  {
    id: 4,
    name: "Sumit Paswan",
    location: "Gaya",
    badge: "SSC STENO",
    badgeType: "teal",
    rating: 5,
    title: "“Gaya Shorthand Classes has excellent teachers!”",
    text: "Gaya Shorthand Classes by Shadab sir has excellent teachers! They are very professional and knowledgeable. Daily speed practice and mistake analysis made a huge difference.",
    avatarBg: "#fef3c7",
    avatarColor: "#b45309"
  },
  {
    id: 5,
    name: "Neha Joshi",
    location: "Bhopal",
    badge: "HINDI PASS",
    badgeType: "emerald",
    rating: 5,
    title: "“Hindi steno ke liye best platform!”",
    text: "Hindi dictation ki quality bahut achhi hai aur aawaz bilkul clear aati hai. Mistake analysis mein ye bhi batata hai ki konsa word kitni baar galat hua — ye feature kafi faydemand hai.",
    avatarBg: "#ffedd5",
    avatarColor: "#ea580c"
  },
  {
    id: 6,
    name: "Sonam Kumari",
    location: "Patna",
    badge: "GOLD PASS",
    badgeType: "emerald",
    rating: 5,
    title: "“Best Shorthand class in bihar level must join!”",
    text: "Best Shorthand class in bihar level must join and decide. Teachers are very skilled and helpful. Exam timer and exact court test simulations give you immense confidence.",
    avatarBg: "#e0e7ff",
    avatarColor: "#4338ca"
  },
  {
    id: 7,
    name: "Ritu Sharma",
    location: "Kanpur",
    badge: "SSC STENO",
    badgeType: "teal",
    rating: 5,
    title: "“Exam se pehle confidence full ho gaya!”",
    text: "SSC exam se ek mahine pehle maine subscribe kiya aur yeh decision bahut sahi raha. Daily mock tests se mera exam pressure khatam ho gaya. Jo mistakes main bar bar karti thi unka trend dikha aur unpar focus kiya. Result bahut achha aaya.",
    avatarBg: "#ffedd5",
    avatarColor: "#ea580c"
  },
  {
    id: 8,
    name: "Shanwahaz Bablu",
    location: "Jail Road, Gaya",
    badge: "PITMAN BATCH",
    badgeType: "teal",
    rating: 5,
    title: "“Pitman book revision feature is amazing!”",
    text: "Pitman book revision mein shorthand image aur text dono saath dikhta hai. Eye toggle feature se pehle image dekhkar guess karo phir text reveal karo — yeh revision technique zabardast hai.",
    avatarBg: "#ecfdf5",
    avatarColor: "#059669"
  },
  {
    id: 9,
    name: "Rakesh Kumar",
    location: "Patna High Court",
    badge: "HIGH COURT",
    badgeType: "burgundy",
    rating: 5,
    title: "“5-minute reading clock cracked my court test!”",
    text: "The 5-minute reading clock and strict backspace lock simulation helped me crack the Patna High Court Personal Assistant exam. Daily dictations have exact legal phrasing and high-speed accuracy.",
    avatarBg: "#fff1f2",
    avatarColor: "#881337"
  }
];

function GoogleReviewCard({ review }) {
  return (
    <div className="google-review-card">
      <div className="review-card-top-row">
        <div className="review-stars-row">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" className="review-star-gold" />
          ))}
        </div>
        <span className={`review-badge-pill review-badge-${review.badgeType}`}>
          {review.badge}
        </span>
      </div>

      <h3 className="review-card-headline">{review.title}</h3>

      <p className="review-card-body">{review.text}</p>

      <div className="review-card-author-row">
        <div 
          className="review-author-avatar-circle"
          style={{ backgroundColor: review.avatarBg, color: review.avatarColor }}
        >
          <User size={18} strokeWidth={2.4} />
        </div>
        <div className="review-author-meta-wrap">
          <h4 className="review-author-name-text">{review.name}</h4>
          <span className="review-author-location-text">{review.location}</span>
        </div>
      </div>
    </div>
  );
}

const REG_LANGUAGE_OPTIONS = [
  { value: "English", label: "English (Steno + Typing)" },
  { value: "Hindi Krutidev", label: "Hindi Krutidev (Steno + Typing)" },
  { value: "Hindi Inscript", label: "Hindi Inscript / Mangal (Steno + Typing)" }
];

export default function LandingPage({ 
  onStartFullTest, 
  onOpenAuth, 
  onLoginSuccess,
  onOpenCheckout, 
  onSelectPlan, 
  setCurrentTab 
}) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [pricingCategory, setPricingCategory] = useState('all'); // 'all' | 'passes' | 'courses'
  const [reviewsViewMode, setReviewsViewMode] = useState('stream'); // 'stream' | 'grid'
  const [isReviewsPaused, setIsReviewsPaused] = useState(false);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  // Student Admission Box Tab in Hero
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [loginEmail, setLoginEmail] = useState('shadabca@gmail.com');
  const [loginPassword, setLoginPassword] = useState('shadab12345');
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLang, setRegLang] = useState('English');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Interactive Live Test Preview in Hero / Sandbox
  const [activePreviewTab, setActivePreviewTab] = useState('steno'); // 'steno' | 'typing'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState('80 WPM');
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioTotalDuration, setAudioTotalDuration] = useState(320);
  const audioRef = useRef(null);

  // Live Typing Sandbox State
  const [passageIndex, setPassageIndex] = useState(0);
  const [typingFont, setTypingFont] = useState('english'); // 'english' | 'kruti'
  const targetText = DEMO_SENTENCES[passageIndex];
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedSecs, setElapsedSecs] = useState(0);
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const inputRef = useRef(null);

  // Audio Player Handlers
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  const handleSpeedChange = (speed) => {
    setAudioSpeed(speed);
    if (audioRef.current) {
      if (speed === '80 WPM') audioRef.current.playbackRate = 1.0;
      else if (speed === '100 WPM') audioRef.current.playbackRate = 1.15;
      else if (speed === '120 WPM') audioRef.current.playbackRate = 1.35;
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setAudioCurrentTime(Math.floor(audioRef.current.currentTime));
      if (audioRef.current.duration) {
        setAudioTotalDuration(Math.floor(audioRef.current.duration));
      }
    }
  };

  const formatSeconds = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Typing Sandbox Handlers
  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        const secs = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
        setElapsedSecs(secs);
        const words = typedText.trim().length / 5;
        const w = Math.round((words / (secs / 60)) || 0);
        setLiveWpm(w);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [startTime, typedText]);

  const handleTypingChange = (e) => {
    const val = e.target.value;
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }
    setTypedText(val);

    let correct = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) correct++;
    }
    const acc = val.length > 0 ? Math.round((correct / val.length) * 100) : 100;
    setLiveAccuracy(acc);
  };

  const handleResetTyping = () => {
    setTypedText('');
    setStartTime(null);
    setElapsedSecs(0);
    setLiveWpm(0);
    setLiveAccuracy(100);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleNextPassage = () => {
    setPassageIndex((prev) => (prev + 1) % DEMO_SENTENCES.length);
    handleResetTyping();
  };

  const handleHeroLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) return;

    setIsSubmittingAuth(true);

    setTimeout(() => {
      fireConfetti();
      
      const candidateUser = {
        name: loginEmail.toLowerCase().includes('shadab') ? 'Shadab Khan' : loginEmail.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
        email: loginEmail,
        rollNo: loginEmail.toLowerCase().includes('shadab') ? 'SP-2026-084' : `SP-2026-${Math.floor(100 + Math.random() * 900)}`,
        language: 'English',
        role: loginEmail.toLowerCase().includes('admin') ? 'admin' : 'student',
        subscription: {
          plan: '12 Month Unlimited Pro',
          status: 'Active',
          daysRemaining: 248,
          isPaid: true
        },
        stats: {
          currentStreak: 14,
          testsCompleted: 38,
          avgSpeed: 84,
          avgAccuracy: 95.8
        }
      };

      if (onLoginSuccess) {
        onLoginSuccess(candidateUser);
      } else if (setCurrentTab) {
        setCurrentTab('dashboard');
      }
      setIsSubmittingAuth(false);
    }, 350);
  };

  const handleHeroRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    setIsSubmittingAuth(true);

    setTimeout(() => {
      fireConfetti();

      const newCandidate = {
        name: regName.trim(),
        email: regEmail.trim(),
        mobile: regMobile.trim(),
        rollNo: `SP-2026-${Math.floor(100 + Math.random() * 900)}`,
        language: regLang,
        role: 'student',
        subscription: {
          plan: 'Scholar Free Pass',
          status: 'Active',
          daysRemaining: 30,
          isPaid: true
        },
        stats: {
          currentStreak: 1,
          testsCompleted: 0,
          avgSpeed: 0,
          avgAccuracy: 0
        }
      };

      if (onLoginSuccess) {
        onLoginSuccess(newCandidate);
      } else if (setCurrentTab) {
        setCurrentTab('dashboard');
      }
      setIsSubmittingAuth(false);
    }, 350);
  };

  const examBatches = [
    {
      id: "ssc-steno",
      badge: "National Level Exam",
      title: "SSC Stenographer Grade C & D (2026)",
      speed: "80 & 100 WPM",
      lang: "Hindi & English",
      desc: "Comprehensive daily dictation series based on parliamentary debates, budget speeches, and editorial passages with official 5-minute reading room and word diff evaluation.",
      features: [
        "Daily 80 WPM (Grade D) & 100 WPM (Grade C) Dictations",
        "Official 5-Minute Reading Clock & Audio Warning",
        "Full Error Analysis: Omissions, Additions, Spelling",
        "Instant All-India Batch Leaderboard"
      ],
      popular: true
    },
    {
      id: "patna-hc",
      badge: "High Court Special",
      title: "Patna High Court Morning Bench Batch",
      speed: "80 - 100 WPM",
      lang: "English Legal",
      desc: "Specialized judicial preparation with authentic high court judgments, legal phrasing, statutory citations, and strict backspace lock simulation.",
      features: [
        "Authentic High Court Judgments & Petitions",
        "Strict Backspace Lock & Strike Counting HUD",
        "Legal Vocabulary & Shorthand Outline Glossaries",
        "Daily Verification by High Court Steno Faculty"
      ],
      popular: false
    },
    {
      id: "jharkhand-hc",
      badge: "Judicial Series",
      title: "Jharkhand High Court & Civil Courts",
      speed: "80 - 100 WPM",
      lang: "Hindi & English",
      desc: "Dedicated test series for District and High Court stenographers with Kruti Dev 010 and Mangal Inscript typing engines and legal speed passages.",
      features: [
        "Civil Court & District Sessions Legal Passages",
        "Dual Font Engine: Kruti Dev 010 & Mangal Inscript",
        "Live Audio Dictations + Recorded Replay Library",
        "Weekly Full-Length Mock Skill Tests"
      ],
      popular: false
    },
    {
      id: "pitman-course",
      badge: "Complete Foundation",
      title: "Basic Pitman Shorthand Master Course",
      speed: "0 to 80+ WPM",
      lang: "Complete Book",
      desc: "Complete Pitman course from beginner strokes to 80 WPM in 3 to 4 months with live classes, recorded lectures, and daily handwritten homework correction.",
      features: [
        "Complete Pitman Shorthand Book Covered",
        "3 to 4 Months Structured Syllabus",
        "Daily Homework Correction by Gagan Sir",
        "Grammalogues, Phrasing & Contractions Mastery"
      ],
      popular: false
    },
    {
      id: "assembly-reporter",
      badge: "High Speed Series",
      title: "Parliament & Vidhan Sabha Reporter Batch",
      speed: "120 - 160 WPM",
      lang: "High Speed Speeches",
      desc: "Advanced speed series for Assembly and Parliament Reporter examinations with intense 5-minute and 10-minute speech transcripts.",
      features: [
        "120, 140 & 160 WPM Rapid Speech Dictations",
        "Parliamentary Bill & Resolution Terminology",
        "Advanced Phraseography Drills for High Speed",
        "Specialized Reporter Examination Simulations"
      ],
      popular: false
    },
    {
      id: "typing-studio",
      badge: "Speed & Accuracy",
      title: "Judicial Typing Mastery (Hindi & English)",
      speed: "35 - 50+ WPM",
      lang: "Kruti Dev / Mangal / English",
      desc: "Master high-speed keyboard typing with real-time backspace penalty monitoring, stroke error diagnosis, and government examination formats.",
      features: [
        "Authentic Kruti Dev 010 Font Integration",
        "Unicode Mangal Inscript Certified Passages",
        "Standard English QWERTY Typing Studio",
        "Official 10 & 15-Minute Exam Clock & Scoring"
      ],
      popular: false
    }
  ];

  const diplomas = [
    {
      code: "DCA",
      title: "Diploma in Computer Applications",
      duration: "6 Months",
      recognition: "Govt. Recognized Certification",
      syllabus: "Fundamentals, MS Office Suite (Word, Excel, PPT), Internet Technologies, Hindi & English Typing Speed Practice.",
      badge: "Most Demanded"
    },
    {
      code: "ADCA",
      title: "Advance Diploma in Computer Applications",
      duration: "12 Months (1 Year)",
      recognition: "State & Central Govt. Approved",
      syllabus: "Advanced MS Office, Database Management, Graphic Design Basics, Financial Accounting, Computer Hardware & Networking.",
      badge: "Comprehensive"
    },
    {
      code: "Tally Prime",
      title: "Tally Prime with GST Certification",
      duration: "3 Months",
      recognition: "Professional Accounting Diploma",
      syllabus: "Voucher Entry, Inventory Management, GST Invoicing, Balance Sheet Preparation, Bank Reconciliation, Payroll Accounting.",
      badge: "Corporate Ready"
    },
    {
      code: "Steno Speed",
      title: "Certified Shorthand Speed Certificate",
      duration: "80 / 100 / 120 WPM",
      recognition: "Gaya Shorthand Classes Verified",
      syllabus: "Official speed qualification certificate verified through recorded live audio examination, valid for document verification.",
      badge: "Skill Certified"
    }
  ];

  const institutionalPillars = [
    {
      title: "1,700+ Official Studio Audio Dictations",
      desc: "Studio-mastered audio recorded at exact, unvarying speeds (80, 100, 120 WPM) with neutral pronunciation and proper cadence matching government skill test halls."
    },
    {
      title: "Authentic 5-Minute Shorthand Reading Room",
      desc: "Simulates official SSC exam conditions: once the dictation ends, typing is locked for 5 minutes with a bell chime, allowing students to read and punctuate their handwritten notes."
    },
    {
      title: "Strict Backspace Lock Simulation",
      desc: "Real high court exams either penalize or completely disable backspace. Our software provides toggles for 'Allowed', 'Strike Penalty', and 'Completely Disabled'."
    },
    {
      title: "Dual Hindi Font Engine (Kruti Dev & Mangal)",
      desc: "Seamless support for both Kruti Dev 010 and Unicode Mangal Inscript. No font mismatch or broken characters during Hindi judicial examination preparation."
    },
    {
      title: "Official SSC Word-by-Word Diff Evaluation",
      desc: "Instant algorithmic scoring that categorizes Full Mistakes (omissions, substitutions, additions) and Half Mistakes (spelling, capitalization, punctuation) matching official SSC guidelines."
    },
    {
      title: "Hybrid Offline Academy + Online Cloud Sync",
      desc: "Practice from home anywhere in India or visit our modern 50+ PC computer lab in Gaya, Bihar with identical exam interfaces and synchronized progress tracking."
    }
  ];

  const faqs = [
    {
      q: "What is Gaya Shorthand Classes (ShorthandPlus)?",
      a: "Gaya Shorthand Classes is Bihar's premier stenography institute and online examination portal (https://shorthandplus.in/). Led by Director Gagan Sir for over 15 years, the academy prepares students for SSC Stenographer Grade C & D, Patna High Court, Jharkhand High Court, and central government secretariat reporter exams."
    },
    {
      q: "Can I try demo steno dictations and typing tests for free?",
      a: "Yes! Prospective students can take free Demo Steno Tests and Demo Typing Tests directly on the portal without paying any registration fee. Simply click 'Demo Steno Tests' or 'Demo Typing Tests' to begin immediately."
    },
    {
      q: "How does the official 5-minute shorthand reading room work?",
      a: "Just like in official SSC and High Court skill test centers, when the audio dictation finishes, transcription typing is locked. Candidates receive exactly 5 minutes of timed reading time with an automated audio chime to review handwritten outlines and resolve punctuation before digital typing starts."
    },
    {
      q: "Is Hindi typing supported in both Kruti Dev 010 and Mangal Inscript?",
      a: "Yes! ShorthandPlus natively supports both font layouts. We bundle the authentic Kruti-Dev-010 font engine and standard Unicode Mangal Inscript, ensuring zero character corruption during your Hindi court and state government exams."
    },
    {
      q: "How do I activate my subscription using UPI or QR Code?",
      a: "Simply click 'Pay & Activate' on your chosen plan. You can pay instantly using any UPI App (Google Pay, PhonePe, Paytm, BHIM) or Credit/Debit Card, and your subscription activates immediately with automated access."
    },
    {
      q: "Are the computer diplomas accepted in government document verifications?",
      a: "Yes. Gaya Shorthand Classes provides government-registered DCA, ADCA, Tally Prime, and verified Shorthand Speed Proficiency Certificates (80, 100, 120 WPM) that are valid for Central & State government job document verifications."
    }
  ];

  return (
    <div className="clean-homepage-wrapper">
      {/* Hidden audio element for interactive preview */}
      <audio 
        ref={audioRef} 
        src="/assets/sample-dictation.mp3" 
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={() => setIsPlayingAudio(false)} 
      />


      {/* 1. HERO SECTION WITH PROMINENT STUDENT ADMISSION & LOGIN BOX */}
      <section className="edtech-hero-section">
        <div className="edtech-hero-container">
          <div className="hero-grid-layout">
            
            {/* Left Column: Academy Value Proposition */}
            <div className="hero-left-column">
              <div className="hero-status-pill">
                <span className="pulse-dot-green" />
                <span>BIHAR'S PREMIER STENO & TYPING ACADEMY</span>
              </div>

              <h1 className="hero-main-title">
                Crack Government <span className="text-royal-blue">Stenographer & Typing</span> Exams With Real Simulations
              </h1>

              <p className="hero-main-description">
                India's leading examination software for <strong>SSC Stenographer Grade C & D</strong>, <strong>Patna High Court</strong>, <strong>Jharkhand High Court</strong>, and State Civil Courts. Featuring daily 80–120 WPM studio audio dictations, official 5-minute reading rooms, strict backspace lock simulations, and Kruti Dev 010 & Mangal typing engines.
              </p>

              {/* Instant CTAs */}
              <div className="hero-cta-cluster">
                <button 
                  className="btn-hero-primary"
                  onClick={() => {
                    fireConfetti();
                    onStartFullTest(534);
                  }}
                >
                  <Play size={18} />
                  <span>Start Free Demo Steno Test</span>
                </button>

                <button 
                  className="btn-hero-secondary"
                  onClick={() => {
                    fireConfetti();
                    setCurrentTab('typing-studio');
                  }}
                >
                  <Keyboard size={18} />
                  <span>Start Free Typing Test</span>
                </button>
              </div>

              {/* Trust Metric Counters */}
              <div className="hero-trust-bar">
                <div className="trust-item">
                  <div className="trust-number">1,700+</div>
                  <div className="trust-label">Audio Dictations</div>
                </div>
                <div className="trust-divider" />
                <div className="trust-item">
                  <div className="trust-number">10,000+</div>
                  <div className="trust-label">Selections in Govt. Jobs</div>
                </div>
                <div className="trust-divider" />
                <div className="trust-item">
                  <div className="trust-number">80-120</div>
                  <div className="trust-label">Certified WPM Speeds</div>
                </div>
                <div className="trust-divider" />
                <div className="trust-item">
                  <div className="trust-number">15+ Yrs</div>
                  <div className="trust-label">Teaching Legacy</div>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Student Portal & Admission Access Box */}
            <div className="hero-right-column">
              <div className="student-access-card-wrapper">
                <div className="student-access-card">
                <div className="card-top-header">
                  <div className="header-badge-row">
                    <div className="portal-icon-badge">
                      <GraduationCap size={22} className="portal-badge-icon" />
                    </div>
                    <div>
                      <div className="portal-title-flex">
                        <h3 className="portal-card-title">Student Portal Access</h3>
                        <span className="portal-live-badge">OFFICIAL</span>
                      </div>
                      <p className="portal-card-subtitle">Gaya Shorthand Classes • ShorthandPlus</p>
                    </div>
                  </div>
                </div>

                {/* Tabs: Login / Register */}
                <div className="portal-tab-switcher">
                  {/* Sliding active pill indicator */}
                  <div 
                    className={`portal-tab-slider ${authTab === 'register' ? 'is-register' : 'is-login'}`}
                    aria-hidden="true"
                  />
                  <button 
                    type="button"
                    className={`portal-tab-btn ${authTab === 'login' ? 'active' : ''}`}
                    onClick={() => setAuthTab('login')}
                  >
                    Student Login
                  </button>
                  <button 
                    type="button"
                    className={`portal-tab-btn ${authTab === 'register' ? 'active' : ''}`}
                    onClick={() => setAuthTab('register')}
                  >
                    New Registration
                  </button>
                </div>

                {/* LOGIN TAB CONTENT */}
                {authTab === 'login' ? (
                  <form className="portal-form" onSubmit={handleHeroLoginSubmit}>
                    <div className="form-group-field">
                      <label className="field-label">Registered Email Address</label>
                      <input 
                        type="email" 
                        className="field-input" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        required 
                      />
                    </div>

                    <div className="form-group-field">
                      <div className="field-label-split">
                        <label className="field-label">Password</label>
                        <button 
                          type="button"
                          onClick={() => alert("Please contact academy director at director@shorthandplus.in or +91 9204123453 to reset your candidate password.")}
                          className="forgot-link"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <input 
                        type="password" 
                        className="field-input" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        required 
                      />
                    </div>

                    <button type="submit" className="btn-portal-submit" disabled={isSubmittingAuth}>
                      <span>{isSubmittingAuth ? 'Signing In to Student Portal...' : 'Sign In to Student Portal →'}</span>
                    </button>

                    <div className="demo-shortcuts-divider">
                      <span>OR PRACTICE DEMO TESTS WITHOUT LOGIN</span>
                    </div>

                    <div className="demo-buttons-grid">
                      <button 
                        type="button"
                        className="btn-demo-pill"
                        onClick={() => onStartFullTest(534)}
                      >
                        <Play size={14} className="text-blue" />
                        <span>Demo Steno Tests</span>
                      </button>

                      <button 
                        type="button"
                        className="btn-demo-pill"
                        onClick={() => setCurrentTab('typing-studio')}
                      >
                        <Keyboard size={14} className="text-emerald" />
                        <span>Demo Typing Tests</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* REGISTER TAB CONTENT */
                  <form className="portal-form" onSubmit={handleHeroRegisterSubmit}>
                    <div className="form-group-field">
                      <label className="field-label">Student Full Name</label>
                      <input 
                        type="text" 
                        className="field-input" 
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar" 
                        required 
                      />
                    </div>

                    <div className="form-grid-two">
                      <div className="form-group-field">
                        <label className="field-label">Mobile Number</label>
                        <input 
                          type="tel" 
                          className="field-input" 
                          value={regMobile}
                          onChange={(e) => setRegMobile(e.target.value)}
                          placeholder="9876543210" 
                          required 
                        />
                      </div>
                      <div className="form-group-field">
                        <label className="field-label">Email Address</label>
                        <input 
                          type="email" 
                          className="field-input" 
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="you@email.com" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-group-field">
                      <label className="field-label">Select Medium & Language</label>
                      <CustomSelect 
                        value={regLang}
                        onChange={setRegLang}
                        options={REG_LANGUAGE_OPTIONS}
                      />
                    </div>

                    <button type="submit" className="btn-portal-submit" disabled={isSubmittingAuth}>
                      <span>{isSubmittingAuth ? 'Completing Registration...' : 'Complete Registration →'}</span>
                    </button>

                    <p className="register-switch-text">
                      Already registered?{' '}
                      <button 
                        type="button" 
                        className="text-link-btn"
                        onClick={() => setAuthTab('login')}
                      >
                        Login here
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          </div>
        </div>
      </section>


      {/* 2. INTERACTIVE LIVE STENO & TYPING TEST STUDIO (ON-PAGE TRIAL) */}
      <section className="live-preview-section">
        <div className="preview-container">
          <div className="section-header-centered">
            <span className="badge-subheading">LIVE SIMULATION ENGINE</span>
            <h2 className="section-title-large">
              Test Your Shorthand & Typing Speed Right Now
            </h2>
            <p className="section-description-text">
              Experience the authentic government examination interface before enrolling. Choose audio dictation or typing speed test.
            </p>
          </div>

          <div className="interactive-studio-card">
            {/* Studio Navigation Tabs */}
            <div className="studio-tabs-row">
              <button 
                className={`studio-tab-item ${activePreviewTab === 'steno' ? 'active' : ''}`}
                onClick={() => setActivePreviewTab('steno')}
              >
                <Headphones size={18} />
                <span>🎧 80-120 WPM Steno Audio Dictation</span>
              </button>
              <button 
                className={`studio-tab-item ${activePreviewTab === 'typing' ? 'active' : ''}`}
                onClick={() => setActivePreviewTab('typing')}
              >
                <Keyboard size={18} />
                <span>⌨️ Judicial Typing Speed Lab</span>
              </button>
            </div>

            {/* TAB 1: STENO AUDIO DICTATION PREVIEW */}
            {activePreviewTab === 'steno' && (
              <div className="studio-body-content">
                <div className="steno-player-grid">
                  <div className="player-left-panel">
                    <div className="steno-meta-strip">
                      <span className="meta-badge-blue">SSC GRADE D & PATNA HC</span>
                      <span className="meta-words font-mono">437 Words • 10 Mins Total</span>
                    </div>

                    <h3 className="dictation-track-title">
                      OCT 6 BENCH: Election Expenditure & Democratic Reforms
                    </h3>
                    <p className="dictation-track-notes">
                      Official government passage recorded in soundproof studio with professional pacing, clear enunciation, and natural sentence pauses.
                    </p>

                    {/* Speed Selector Buttons */}
                    <div className="speed-pills-cluster">
                      <span className="speed-label">Dictation Speed:</span>
                      {['80 WPM', '100 WPM', '120 WPM'].map((spd) => (
                        <button
                          key={spd}
                          className={`speed-pill-btn ${audioSpeed === spd ? 'active' : ''}`}
                          onClick={() => handleSpeedChange(spd)}
                        >
                          {spd}
                        </button>
                      ))}
                    </div>

                    {/* Audio Player Controls */}
                    <div className="audio-controller-bar">
                      <button 
                        className={`audio-big-play-btn ${isPlayingAudio ? 'playing' : ''}`}
                        onClick={toggleAudio}
                      >
                        {isPlayingAudio ? <Pause size={22} /> : <Play size={22} />}
                      </button>

                      <div className="audio-time-slider-area">
                        <div className="time-display-row font-mono">
                          <span>{formatSeconds(audioCurrentTime)}</span>
                          <span className="text-muted">/ {formatSeconds(audioTotalDuration)}</span>
                        </div>
                        <div className="audio-progress-track">
                          <div 
                            className="audio-progress-fill" 
                            style={{ width: `${(audioCurrentTime / (audioTotalDuration || 1)) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="waveform-animation-box">
                        {[40, 75, 100, 60, 90, 45, 80, 55, 95, 65, 85, 40].map((h, i) => (
                          <span 
                            key={i} 
                            className={`wave-bar ${isPlayingAudio ? 'active' : ''}`}
                            style={{ 
                              height: isPlayingAudio ? `${h}%` : '25%',
                              animationDelay: isPlayingAudio ? `${(i * 0.07).toFixed(2)}s` : '0s'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="player-right-panel">
                    <div className="reading-clock-preview-card">
                      <div className="clock-card-header">
                        <Clock size={18} className="text-royal-blue" />
                        <h4 className="clock-card-title">Official 5-Minute Reading Room</h4>
                      </div>
                      <p className="clock-card-desc">
                        When audio dictation ends, the examination software initiates a strict 5-minute countdown clock. Transcription typing remains locked while you read and punctuate your pencil shorthand notes.
                      </p>

                      <div className="clock-hud-display font-mono">
                        <div className="clock-digit-group">
                          <span className="digit-val">05</span>
                          <span className="digit-sub">MIN</span>
                        </div>
                        <span className="colon-blink">:</span>
                        <div className="clock-digit-group">
                          <span className="digit-val">00</span>
                          <span className="digit-sub">SEC</span>
                        </div>
                      </div>

                      <div className="clock-features-list">
                        <div className="feat-line">
                          <CheckCircle2 size={15} className="text-emerald" />
                          <span>Strict Backspace Lock Simulation Available</span>
                        </div>
                        <div className="feat-line">
                          <CheckCircle2 size={15} className="text-emerald" />
                          <span>Instant Word-by-Word SSC Error Evaluation</span>
                        </div>
                        <div className="feat-line">
                          <CheckCircle2 size={15} className="text-emerald" />
                          <span>All-India Batch Rank and Percentile Score</span>
                        </div>
                      </div>

                      <button 
                        className="btn-launch-full-exam"
                        onClick={() => onStartFullTest(534)}
                      >
                        <Play size={16} />
                        <span>Launch Full Examination Hall →</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE TYPING SPEED SANDBOX */}
            {activePreviewTab === 'typing' && (
              <div className="studio-body-content">
                <div className="typing-sandbox-layout">
                  <div className="sandbox-top-controls">
                    <div className="sandbox-font-toggle">
                      <span className="control-label">Typing Engine:</span>
                      <button 
                        className={`font-switch-btn ${typingFont === 'english' ? 'active' : ''}`}
                        onClick={() => setTypingFont('english')}
                      >
                        English QWERTY
                      </button>
                      <button 
                        className={`font-switch-btn ${typingFont === 'kruti' ? 'active' : ''}`}
                        onClick={() => setTypingFont('kruti')}
                      >
                        Hindi Kruti Dev 010
                      </button>
                    </div>

                    <div className="sandbox-metrics-row">
                      <div className="mini-metric-pill">
                        <span className="m-val font-mono">{liveWpm}</span>
                        <span className="m-label">Gross WPM</span>
                      </div>
                      <div className="mini-metric-pill">
                        <span className="m-val font-mono">{liveAccuracy}%</span>
                        <span className="m-label">Accuracy</span>
                      </div>
                      <div className="mini-metric-pill">
                        <span className="m-val font-mono">{elapsedSecs}s</span>
                        <span className="m-label">Time</span>
                      </div>
                    </div>
                  </div>

                  {/* Passage Text Container */}
                  <div className="sandbox-passage-card">
                    <p className={`passage-text-display ${typingFont === 'kruti' ? 'kruti-text' : ''}`}>
                      {targetText}
                    </p>
                  </div>

                  {/* Live Typing Input */}
                  <div className="sandbox-input-area">
                    <textarea
                      ref={inputRef}
                      className={`sandbox-textarea-field ${typingFont === 'kruti' ? 'kruti-input' : ''}`}
                      placeholder={typingFont === 'kruti' ? "Type in Kruti Dev 010 here..." : "Start typing the passage above to test your speed..."}
                      value={typedText}
                      onChange={handleTypingChange}
                      rows={4}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="sandbox-action-footer">
                    <div className="footer-left-actions">
                      <button className="btn-action-ghost" onClick={handleResetTyping}>
                        <RotateCcw size={15} />
                        <span>Reset Test</span>
                      </button>
                      <button className="btn-action-ghost" onClick={handleNextPassage}>
                        <span>Next Passage →</span>
                      </button>
                    </div>

                    <button 
                      className="btn-primary-action"
                      onClick={() => setCurrentTab('typing-studio')}
                    >
                      <Keyboard size={16} />
                      <span>Explore 50+ Full Typing Tests →</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. FEATURED EXAM BATCHES & LIVE DICTATION PROGRAMS */}
      <section className="courses-section">
        <div className="courses-container">
          <div className="section-header-centered">
            <span className="badge-subheading">ACADEMY BATCHES</span>
            <h2 className="section-title-large">
              Targeted Preparation Batches for Government Aspirants
            </h2>
            <p className="section-description-text">
              Curated syllabus, verified judicial dictations, and personalized homework corrections designed to help you clear skill tests in your first attempt.
            </p>
          </div>

          <div className="batches-cards-grid">
            {examBatches.map((batch) => (
              <div key={batch.id} className={`batch-card-item ${batch.popular ? 'popular-card' : ''}`}>
                {batch.popular && (
                  <div className="batch-popular-ribbon">⭐ MOST POPULAR BATCH</div>
                )}
                
                <div className="batch-card-header">
                  <span className="batch-category-badge">{batch.badge}</span>
                  <span className="batch-speed-tag font-mono">{batch.speed}</span>
                </div>

                <h3 className="batch-item-title">{batch.title}</h3>
                <p className="batch-item-desc">{batch.desc}</p>

                <div className="batch-features-list">
                  {batch.features.map((feat, idx) => (
                    <div key={idx} className="batch-feat-line">
                      <CheckCircle2 size={15} className="text-emerald shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="batch-footer-row">
                  <button 
                    className={`btn-batch-cta ${batch.popular ? 'primary' : 'outline'}`}
                    onClick={() => onSelectPlan('plan-1mo')}
                  >
                    <span>Enroll in Batch</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE GAYA SHORTHAND CLASSES (PLATFORM PILLARS) */}
      <section className="pillars-section">
        <div className="pillars-container">
          <div className="section-header-centered">
            <span className="badge-subheading">THE GAYA SHORTHAND ADVANTAGE</span>
            <h2 className="section-title-large">
              Engineered Strictly For Government Examination Rules
            </h2>
            <p className="section-description-text">
              Generic typing tutors fail because they ignore actual examination rules. ShorthandPlus simulates every exact requirement of official skill test centers.
            </p>
          </div>

          <div className="pillars-grid-cards">
            {institutionalPillars.map((pillar, idx) => (
              <div key={idx} className="pillar-card-box">
                <div className="pillar-index-circle">{idx + 1}</div>
                <h4 className="pillar-box-title">{pillar.title}</h4>
                <p className="pillar-box-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GOVERNMENT ACCREDITED DIPLOMAS & CERTIFICATIONS */}
      <section className="diplomas-section">
        <div className="diplomas-container">
          <div className="diplomas-banner-card">
            <div className="diplomas-banner-left">
              <span className="diploma-gold-pill">🏛️ GOVERNMENT RECOGNIZED</span>
              <h2 className="diplomas-title">
                Accredited Computer Diplomas & Shorthand Certificates
              </h2>
              <p className="diplomas-desc">
                Gaya Shorthand Classes issues certified DCA, ADCA, Tally Prime, and verified Shorthand Speed Certificates (80, 100, 120 WPM) accepted in Central & State Government document verifications.
              </p>
              <div className="diplomas-check-tags">
                <span>✓ Valid for SSC & High Court Job Verifications</span>
                <span>✓ Online Certificate Verification System</span>
                <span>✓ Offline Hands-on Computer Lab Training in Gaya</span>
              </div>
            </div>

            <div className="diplomas-banner-right">
              <button 
                className="btn-diploma-inquire"
                onClick={() => setCurrentTab('classes')}
              >
                <span>View All Diplomas & Fee Structure →</span>
              </button>
            </div>
          </div>

          <div className="diploma-cards-row">
            {diplomas.map((dip) => (
              <div key={dip.code} className="dip-card">
                <div className="dip-top-row">
                  <span className="dip-code-badge font-mono">{dip.code}</span>
                  <span className="dip-duration-badge">{dip.duration}</span>
                </div>
                <h4 className="dip-title">{dip.title}</h4>
                <p className="dip-recog">{dip.recognition}</p>
                <p className="dip-syllabus">{dip.syllabus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OFFICIAL PRICING PASSES & ACCOUNT ACTIVATION GUIDE */}
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="section-header-centered">
            <span className="badge-subheading">TRANSPARENT PASSES</span>
            <h2 className="section-title-large">
              Simple & Affordable Subscription Plans
            </h2>
            <p className="section-description-text">
              Choose your practice duration. Full access to all Shorthand dictation audio tests, typing tests, and live leaderboards.
            </p>

            {/* Category Segmented Switcher */}
            <div className="pricing-category-switcher">
              <button
                type="button"
                className={`pricing-cat-btn ${pricingCategory === 'all' ? 'active' : ''}`}
                onClick={() => setPricingCategory('all')}
              >
                <span>All Options (6)</span>
              </button>
              <button
                type="button"
                className={`pricing-cat-btn ${pricingCategory === 'passes' ? 'active' : ''}`}
                onClick={() => setPricingCategory('passes')}
              >
                <span>⚡ Test Series Passes (4)</span>
              </button>
              <button
                type="button"
                className={`pricing-cat-btn ${pricingCategory === 'courses' ? 'active' : ''}`}
                onClick={() => setPricingCategory('courses')}
              >
                <span>🎓 Special Batches & Masterclasses (2)</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className={`pricing-cards-grid ${pricingCategory === 'courses' ? 'two-col-grid' : ''}`}>
            {PRICING_PLANS.filter((plan) => {
              if (pricingCategory === 'passes') {
                return ['plan-1day', 'plan-1mo', 'plan-6mo', 'plan-12mo'].includes(plan.id);
              }
              if (pricingCategory === 'courses') {
                return ['plan-patna-hc', 'plan-pitman'].includes(plan.id);
              }
              return true;
            }).map((plan) => {
              const isPopular = plan.popular;
              return (
                <div 
                  key={plan.id} 
                  className={`pricing-card ${isPopular ? 'popular-pricing-card' : ''}`}
                >
                  {isPopular && (
                    <div className="pricing-popular-pill">
                      <Sparkles size={12} className="inline mr-1" />
                      MOST POPULAR • BEST FOR SSC
                    </div>
                  )}

                  <div className="pricing-card-header">
                    <div className="plan-badge-row">
                      <span className={`plan-badge-type badge-${plan.badge?.toLowerCase().replace(/\s+/g, '-')}`}>
                        {plan.badge}
                      </span>
                      {plan.id === 'plan-6mo' && (
                        <span className="plan-savings-pill">Save 40%</span>
                      )}
                      {plan.id === 'plan-12mo' && (
                        <span className="plan-savings-pill">Best Annual Value</span>
                      )}
                    </div>

                    <h3 className="plan-title-text">{plan.name}</h3>
                    
                    <div className="price-amount-row font-mono">
                      <span className="currency">₹</span>
                      <span className="price-value">{plan.price}</span>
                      <span className="duration-text">/ {plan.duration}</span>
                    </div>
                    
                    <p className="plan-desc-text">{plan.description}</p>
                  </div>

                  <div className="plan-features-block">
                    <span className="features-block-label">WHAT'S INCLUDED:</span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="plan-feat-item">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="plan-cta-buttons">
                    <button 
                      className={`btn-plan-pay ${isPopular ? 'primary' : 'outline'} w-full`}
                      onClick={() => onSelectPlan(plan.id)}
                    >
                      <span>Instant Activate (₹{plan.price})</span>
                      <ArrowRight size={15} />
                    </button>
                    <span className="plan-guarantee-note">Instant automated activation • Zero processing fees</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Trust & Guarantee Strip */}
          <div className="pricing-trust-strip">
            <div className="trust-pill-item">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>100% Secure 256-Bit SSL Gateway</span>
            </div>
            <div className="trust-pill-item">
              <Zap size={16} className="text-blue-600" />
              <span>Instant Automated Activation via UPI & QR</span>
            </div>
            <div className="trust-pill-item">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Zero Hidden Processing Charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OFFLINE COACHING CENTER & GAYA ACADEMY SHOWCASE */}
      <section className="offline-center-section">
        <div className="offline-center-container">
          <div className="offline-card-grid">
            <div className="offline-left-info">
              <span className="badge-subheading">OFFLINE ACADEMY</span>
              <h2 className="offline-heading">
                Visit Gaya Shorthand Classes In Person
              </h2>
              <p className="offline-bio">
                Established over 15 years ago by Director Gagan Sir, Gaya Shorthand Classes is recognized across Bihar as the epicenter of stenography and computer typing excellence.
              </p>

              <div className="center-detail-rows">
                <div className="center-detail-item">
                  <MapPin size={18} className="text-royal-blue shrink-0" />
                  <div>
                    <strong>Academy Address:</strong>
                    <p>Gaya Shorthand Classes, Near Railway Station / Tower Chowk, Gaya, Bihar - 823001</p>
                  </div>
                </div>

                <div className="center-detail-item">
                  <Calendar size={18} className="text-royal-blue shrink-0" />
                  <div>
                    <strong>Daily Batch Timings:</strong>
                    <p>Morning 6:00 AM – 11:00 AM | Evening 3:00 PM – 8:00 PM (Monday to Saturday)</p>
                  </div>
                </div>

                <div className="center-detail-item">
                  <Phone size={18} className="text-royal-blue shrink-0" />
                  <div>
                    <strong>Director Hotline & Helpline:</strong>
                    <p>+91 9204123453 (Director Office Helpline)</p>
                  </div>
                </div>
              </div>

              <a 
                href="tel:+919204123453"
                className="btn-contact-director"
              >
                <Phone size={16} />
                <span>Call Center Desk (+91 9204123453)</span>
              </a>
            </div>

            <div className="offline-right-showcase">
              <AcademyIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* 8. STUDENT SELECTIONS & GOOGLE REVIEWS */}
      <section className="testimonials-section google-reviews-section">
        <div className="testimonials-container">
          <div className="section-header-centered google-reviews-header">
            <div className="google-rating-summary-pill">
              <GoogleIcon />
              <div className="summary-pill-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span className="summary-pill-score">4.9 / 5.0</span>
              <span className="summary-pill-dot">•</span>
              <span className="summary-pill-text">140+ Google Reviews</span>
            </div>

            <h2 className="section-title-large">
              See how Gaya Shorthand Classes has helped students improve their stenography skills
            </h2>
            <p className="section-description-text">
              Real feedback from students who achieved high-speed accuracy, qualified court & SSC exams, and built lifelong careers.
            </p>

            {/* Interactive View Controller */}
            <div className="reviews-animation-controls">
              <button
                type="button"
                className={`reviews-ctrl-btn ${reviewsViewMode === 'stream' ? 'active' : ''}`}
                onClick={() => setReviewsViewMode('stream')}
              >
                <Sparkles size={14} />
                <span>Waterfall Stream</span>
              </button>
              <button
                type="button"
                className={`reviews-ctrl-btn ${reviewsViewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setReviewsViewMode('grid')}
              >
                <Layers size={14} />
                <span>Grid View</span>
              </button>
              {reviewsViewMode === 'stream' && (
                <button
                  type="button"
                  className={`reviews-ctrl-btn pause-toggle ${isReviewsPaused ? 'paused' : ''}`}
                  onClick={() => setIsReviewsPaused(!isReviewsPaused)}
                >
                  {isReviewsPaused ? <Play size={13} /> : <Pause size={13} />}
                  <span>{isReviewsPaused ? "Resume" : "Pause"}</span>
                </button>
              )}
            </div>
          </div>

          {reviewsViewMode === 'stream' ? (
            <div 
              className={`google-reviews-waterfall-stage ${isReviewsPaused ? 'is-paused' : ''}`}
              onMouseEnter={() => setIsReviewsPaused(true)}
              onMouseLeave={() => setIsReviewsPaused(false)}
            >
              {/* Column 1 */}
              <div className="waterfall-col col-1">
                <div className="waterfall-track track-col-1">
                  {[GOOGLE_REVIEWS[0], GOOGLE_REVIEWS[1], GOOGLE_REVIEWS[2], GOOGLE_REVIEWS[0], GOOGLE_REVIEWS[1], GOOGLE_REVIEWS[2]].map((rev, idx) => (
                    <GoogleReviewCard key={`c1-${idx}`} review={rev} />
                  ))}
                </div>
              </div>

              {/* Column 2 */}
              <div className="waterfall-col col-2">
                <div className="waterfall-track track-col-2">
                  {[GOOGLE_REVIEWS[3], GOOGLE_REVIEWS[4], GOOGLE_REVIEWS[5], GOOGLE_REVIEWS[3], GOOGLE_REVIEWS[4], GOOGLE_REVIEWS[5]].map((rev, idx) => (
                    <GoogleReviewCard key={`c2-${idx}`} review={rev} />
                  ))}
                </div>
              </div>

              {/* Column 3 */}
              <div className="waterfall-col col-3">
                <div className="waterfall-track track-col-3">
                  {[GOOGLE_REVIEWS[6], GOOGLE_REVIEWS[7], GOOGLE_REVIEWS[8], GOOGLE_REVIEWS[6], GOOGLE_REVIEWS[7], GOOGLE_REVIEWS[8]].map((rev, idx) => (
                    <GoogleReviewCard key={`c3-${idx}`} review={rev} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="google-reviews-masonry-grid">
              {GOOGLE_REVIEWS.map((review) => (
                <GoogleReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {/* Bottom Action: Read all reviews on Google */}
          <div className="google-reviews-bottom-action">
            <a 
              href="https://share.google/ABi8k1iS01v73qUQN" 
              target="_blank" 
              rel="noopener noreferrer"
              className="google-reviews-read-all-btn"
              id="btn-read-all-google-reviews"
            >
              <GoogleIcon />
              <span className="google-btn-text">Read all reviews on Google</span>
              <ExternalLink size={16} className="google-btn-external" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="section-header-centered">
            <span className="badge-subheading">NEED ASSISTANCE?</span>
            <h2 className="section-title-large">
              Frequently Asked Questions
            </h2>
            <p className="section-description-text">
              Have questions regarding admissions, subscription activation, or examination rules? We have answers.
            </p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item-card ${activeFaq === idx ? 'expanded' : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="faq-question-row">
                  <div className="faq-question-title-wrap">
                    <span className="faq-index-num">0{idx + 1}</span>
                    <h4 className="faq-question-text">{faq.q}</h4>
                  </div>
                  <div className={`faq-chevron-bubble ${activeFaq === idx ? 'active' : ''}`}>
                    <ChevronDown 
                      size={17} 
                      className={`faq-chevron ${activeFaq === idx ? 'rotate' : ''}`} 
                    />
                  </div>
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer-block">
                    <p className="faq-answer-text">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. BOTTOM ACADEMY CTA BANNER - HARMONIZED WITH BRAND THEME */}
      <section className="bottom-cta-banner">
        <div className="bottom-cta-container">
          <div className="bottom-cta-card">
            {/* Radiant Ambient Lighting */}
            <div className="cta-ambient-glow cta-ambient-glow-1" />
            <div className="cta-ambient-glow cta-ambient-glow-2" />
            <div className="cta-mesh-pattern" />

            <div className="cta-content-wrapper">
              <div className="bottom-cta-badge-pill">
                <Sparkles size={14} className="cta-badge-sparkle" />
                <span>BIHAR'S #1 RATED STENO & TYPING PORTAL</span>
              </div>

              <h2 className="bottom-cta-title">
                Ready to Achieve 80–120 WPM & Clear Your Skill Test?
              </h2>

              <p className="bottom-cta-desc">
                Join over 10,000+ candidates preparing for SSC Stenographer, High Court, and Central Secretariat recruitments with real exam audio, 5-minute reading clock, and instant mistyping evaluation.
              </p>

              <div className="bottom-cta-buttons">
                <button 
                  className="btn-cta-launch-harmonized"
                  onClick={() => onStartFullTest(534)}
                  id="btn-bottom-cta-launch"
                >
                  <Play size={18} fill="currentColor" />
                  <span>Launch Free Exam Demo</span>
                </button>
                <button 
                  className="btn-cta-secondary-harmonized"
                  onClick={() => setCurrentTab('courses')}
                  id="btn-bottom-cta-courses"
                >
                  <span>Explore Subscription Passes</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Trust & Guarantee Indicators */}
              <div className="bottom-cta-trust-strip">
                <div className="cta-trust-item">
                  <Star size={15} className="cta-trust-icon text-amber-300" fill="#fde047" />
                  <span>4.9/5 Rating (10,000+ Students)</span>
                </div>
                <div className="cta-trust-dot" />
                <div className="cta-trust-item">
                  <Clock size={15} className="cta-trust-icon" />
                  <span>5-Min Reading Clock & Backspace Lock</span>
                </div>
                <div className="cta-trust-dot" />
                <div className="cta-trust-item">
                  <ShieldCheck size={15} className="cta-trust-icon text-emerald-300" />
                  <span>Govt. Recognized Certification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
