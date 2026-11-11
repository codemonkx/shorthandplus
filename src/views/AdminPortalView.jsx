import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Users, 
  Headphones, 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Play, 
  Edit3, 
  Trash2, 
  Download, 
  RefreshCw, 
  Crown, 
  GraduationCap, 
  TrendingUp, 
  LayoutDashboard, 
  LayoutGrid, 
  Globe, 
  Award, 
  Bell, 
  Eye, 
  Check, 
  X, 
  Lock, 
  Key, 
  EyeOff, 
  ShieldAlert, 
  ArrowLeft,
  Mail,
  Gauge,
  Activity,
  Layers,
  Sparkles,
  UploadCloud,
  Mic,
  MicOff,
  Square,
  Pause,
  Volume2,
  Music,
  Paperclip,
  Keyboard,
  Video,
  Radio,
  Target,
  Copy,
  ExternalLink,
  Megaphone,
  Calendar,
  Zap,
  Share2,
  Send,
  ArrowRight,
  Save,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import { STENO_TESTS, TYPING_TESTS, PRICING_PLANS, INITIAL_ACADEMY_COURSES } from '../data/mockData';
import api, { setToken } from '../services/api';

const INITIAL_ADMIN_STUDENTS = [
  { id: 1, name: "Shadab Khan", rollNo: "SP-2026-084", email: "shadabca@gmail.com", targetExam: "Patna High Court", plan: "12-Month Pro Active", speed: 96, accuracy: 92.4, daysRemaining: 248, status: "Active" },
  { id: 2, name: "Vishnupriya S.", rollNo: "SP-2026-005", email: "vishnupriya@gmail.com", targetExam: "SSC Steno Grade C", plan: "12-Month Pro Active", speed: 84.5, accuracy: 97.4, daysRemaining: 310, status: "Active" },
  { id: 3, name: "Sagar Kumar Singh", rollNo: "SP-2026-009", email: "sagar.steno@gmail.com", targetExam: "Jharkhand High Court", plan: "6-Month Scholar", speed: 81.2, accuracy: 96.7, daysRemaining: 142, status: "Active" },
  { id: 4, name: "Ananya Rathore", rollNo: "SP-2026-018", email: "ananya.r@yahoo.com", targetExam: "SSC Steno Grade D", plan: "Monthly Test Series", speed: 79.4, accuracy: 95.7, daysRemaining: 18, status: "Active" },
  { id: 5, name: "Amit Sharma", rollNo: "SP-2026-024", email: "amit.steno99@gmail.com", targetExam: "Parliament Reporter", plan: "12-Month Pro Active", speed: 118, accuracy: 94.5, daysRemaining: 285, status: "Active" },
  { id: 6, name: "Pooja Verma", rollNo: "SP-2026-033", email: "pooja.v@gmail.com", targetExam: "Patna High Court", plan: "Monthly Test Series", speed: 75.8, accuracy: 94.2, daysRemaining: 6, status: "Active" },
  { id: 7, name: "Vikramaditya Roy", rollNo: "SP-2026-041", email: "vikram.roy@outlook.com", targetExam: "SSC Steno Grade D", plan: "1-Day Skill Sprint", speed: 68.0, accuracy: 88.5, daysRemaining: 0, status: "Expired" },
  { id: 8, name: "Neha Kumari", rollNo: "SP-2026-052", email: "neha.steno@gmail.com", targetExam: "Patna High Court", plan: "6-Month Scholar", speed: 82.0, accuracy: 93.1, daysRemaining: 95, status: "Active" }
];

const INITIAL_TRANSACTIONS = [
  { id: "TXN-98421", student: "Shadab Khan", rollNo: "SP-2026-084", plan: "12-Month Annual Career Master", amount: 2000, mode: "UPI (Paytm)", date: "Today, 14:20", status: "Auto-Verified" },
  { id: "TXN-98420", student: "Vishnupriya S.", rollNo: "SP-2026-005", plan: "12-Month Annual Career Master", amount: 2000, mode: "UPI (GPay)", date: "Today, 11:05", status: "Auto-Verified" },
  { id: "TXN-98419", student: "Rakesh Ranjan", rollNo: "SP-2026-092", plan: "Monthly Test Series", amount: 350, mode: "Debit Card", date: "Yesterday, 19:40", status: "Auto-Verified" },
  { id: "TXN-98418", student: "Pooja Verma", rollNo: "SP-2026-033", plan: "Monthly Test Series", amount: 350, mode: "UPI (PhonePe)", date: "Yesterday, 16:15", status: "Auto-Verified" },
  { id: "TXN-98417", student: "Sagar Kumar Singh", rollNo: "SP-2026-009", plan: "6-Month Pro Scholar", amount: 1100, mode: "Net Banking", date: "09 Oct 2026", status: "Auto-Verified" },
  { id: "TXN-98416", student: "Vikramaditya Roy", rollNo: "SP-2026-041", plan: "1-Day Skill Sprint", amount: 30, mode: "UPI (BHIM)", date: "08 Oct 2026", status: "Auto-Verified" }
];


const INITIAL_EXAM_ALERTS = [
  {
    id: 1,
    title: "SSC Stenographer Grade C & D 2026 Official Notification",
    dept: "Staff Selection Commission (SSC)",
    posts: "1,248 Vacancies",
    speedReq: "80 & 100 WPM",
    deadline: "28 Nov 2026",
    examDate: "Jan 2027",
    status: "Live & Broadcasted",
    urgent: true,
    link: "https://ssc.gov.in"
  },
  {
    id: 2,
    title: "Patna High Court English Stenographer Tier-II Admit Card",
    dept: "High Court of Judicature at Patna",
    posts: "185 Posts",
    speedReq: "80 WPM (English)",
    deadline: "Admit Card Out",
    examDate: "15 Dec 2026",
    status: "Live & Broadcasted",
    urgent: true,
    link: "http://patnahighcourt.gov.in"
  },
  {
    id: 3,
    title: "Jharkhand High Court Personal Assistant & Stenographer",
    dept: "High Court of Jharkhand, Ranchi",
    posts: "92 Posts",
    speedReq: "100 WPM (Eng & Hindi)",
    deadline: "10 Dec 2026",
    examDate: "Jan-Feb 2027",
    status: "Active",
    urgent: false,
    link: "https://jharkhandhighcourt.nic.in"
  },
  {
    id: 4,
    title: "Bihar Civil Court Stenographer & Clerk Final Skill Test Dates",
    dept: "District & Sessions Courts, Bihar",
    posts: "1,562 Posts",
    speedReq: "80 WPM (Bilingual)",
    deadline: "Skill Call Letters Live",
    examDate: "05 Jan 2027",
    status: "Active",
    urgent: false,
    link: "https://districts.ecourts.gov.in/patna"
  }
];

const INITIAL_ISSUED_DIPLOMAS = [
  {
    id: "GSC-DCA-2026-089",
    studentName: "Pooja Verma",
    rollNo: "SP-2026-033",
    program: "Diploma in Computer Application (DCA - 6 Months)",
    grade: "Grade A+ (94.2% Marks)",
    issueDate: "04 Nov 2026",
    dispatchStatus: "Verified & Dispatched",
    authBy: "Shadab Sir (Director)"
  },
  {
    id: "GSC-ADCA-2026-042",
    studentName: "Shadab Khan",
    rollNo: "SP-2026-084",
    program: "Advance Diploma in Computer Application (ADCA - 1 Year)",
    grade: "Grade A+ (98.0% Marks)",
    issueDate: "28 Oct 2026",
    dispatchStatus: "Verified & Dispatched",
    authBy: "Shadab Sir (Director)"
  },
  {
    id: "GSC-STN-2026-118",
    studentName: "Vishnupriya S.",
    rollNo: "SP-2026-005",
    program: "Pitman High-Speed Shorthand (100 WPM Certified)",
    grade: "100 WPM (97.4% Accuracy)",
    issueDate: "15 Oct 2026",
    dispatchStatus: "Verified & Dispatched",
    authBy: "Shadab Sir (Director)"
  },
  {
    id: "GSC-ADCA-2026-056",
    studentName: "Sagar Kumar Singh",
    rollNo: "SP-2026-009",
    program: "Advance Diploma in Computer Application (ADCA - 1 Year)",
    grade: "Grade A (91.5% Marks)",
    issueDate: "10 Oct 2026",
    dispatchStatus: "Ready for Center Pickup",
    authBy: "Shadab Sir (Director)"
  },
  {
    id: "GSC-STN-2026-125",
    studentName: "Amit Sharma",
    rollNo: "SP-2026-024",
    program: "Parliamentary Reporter Shorthand (120 WPM Certified)",
    grade: "120 WPM (94.5% Accuracy)",
    issueDate: "01 Oct 2026",
    dispatchStatus: "Verified & Dispatched",
    authBy: "Shadab Sir (Director)"
  },
  {
    id: "GSC-DCA-2026-095",
    studentName: "Neha Kumari",
    rollNo: "SP-2026-052",
    program: "Diploma in Computer Application (DCA - 6 Months)",
    grade: "Grade A (89.4% Marks)",
    issueDate: "22 Sep 2026",
    dispatchStatus: "Ready for Center Pickup",
    authBy: "Shadab Sir (Director)"
  }
];

export default function AdminPortalView({ 
  user, 
  setCurrentTab, 
  onLogout,
  onStartTest, 
  onStartTypingTest,
  onlineClasses = [],
  onCreateOnlineClass,
  onToggleLiveOnlineClass,
  onDeleteOnlineClass,
  onUpdateOnlineClass,
  onJoinClassAsAdmin,
  stenoTests,
  onAddStenoTest,
  onUpdateStenoTest,
  onDeleteStenoTest,
  typingTests: propTypingTests,
  onAddTypingTest,
  onDeleteTypingTest,
  transactions: propTransactions,
  courses: propCourses,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse
}) {
  // Check if already authenticated via session or role
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    if (user?.role === 'admin') return true;
    try {
      return sessionStorage.getItem('shorthand_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setPasscodeError('');

    try {
      const pinRes = await api.auth.verifyAdminPin(passcode);
      if (pinRes?.token) {
        setToken(pinRes.token);
      }
      try {
        sessionStorage.setItem('shorthand_admin_authenticated', 'true');
      } catch {}
      setIsAdminAuthenticated(true);
    } catch (err) {
      setPasscodeError(err.message || 'Invalid Director PIN or Passcode. Access restricted to authorized faculty.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLockConsole = () => {
    try {
      sessionStorage.removeItem('shorthand_admin_authenticated');
    } catch {}
    setIsAdminAuthenticated(false);
    setPasscode('');
  };

  const [activeTab, setActiveTab] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('adminTab') || 'overview';
    } catch {
      return 'overview';
    }
  }); // 'overview' | 'students' | 'tests' | 'finance' | 'announcements'
  const [students, setStudents] = useState(INITIAL_ADMIN_STUDENTS);
  const [backendStats, setBackendStats] = useState(null);

  // Fetch real students, transactions, and cohort stats from backend when admin unlocked
  useEffect(() => {
    if (isAdminAuthenticated) {
      api.admin.getStudents().then((res) => {
        if (res?.students && res.students.length > 0) {
          setStudents(res.students);
        }
      }).catch(() => {});

      api.admin.getTransactions().then((res) => {
        if (res?.transactions && res.transactions.length > 0) {
          setLocalTransactions(res.transactions);
        }
      }).catch(() => {});

      api.admin.getStats().then((res) => {
        if (res?.stats) {
          setBackendStats(res.stats);
        }
      }).catch(() => {});
    }
  }, [isAdminAuthenticated]);
  
  // Use centralized props if passed, otherwise fallback to local/mockData
  const [localTests, setLocalTests] = useState(STENO_TESTS);
  const tests = stenoTests && stenoTests.length > 0 ? stenoTests : localTests;

  const [localTypingTests, setLocalTypingTests] = useState(TYPING_TESTS);
  const typingTests = propTypingTests && propTypingTests.length > 0 ? propTypingTests : localTypingTests;

  const [localTransactions, setLocalTransactions] = useState(INITIAL_TRANSACTIONS);
  const transactions = propTransactions && propTransactions.length > 0 ? propTransactions : localTransactions;

  const totalRevenue = useMemo(() => {
    if (backendStats?.totalRevenue) {
      return backendStats.totalRevenue;
    }
    return transactions.reduce((acc, t) => {
      const amt = typeof t.amount === 'number' 
        ? t.amount 
        : parseFloat(String(t.amount).replace(/[^0-9.]/g, '')) || 0;
      return acc + amt;
    }, 0);
  }, [backendStats, transactions]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Active' | 'Expiring' | 'Expired'

  // Pagination states
  const [candidatePage, setCandidatePage] = useState(1);
  const [candidatePageSize, setCandidatePageSize] = useState(10);
  const [txnPage, setTxnPage] = useState(1);
  const [txnPageSize, setTxnPageSize] = useState(10);

  // Modals state
  const [newTestModalOpen, setNewTestModalOpen] = useState(false);
  const [newStudentModalOpen, setNewStudentModalOpen] = useState(false);
  const [newTypingModalOpen, setNewTypingModalOpen] = useState(false);
  const [newClassModalOpen, setNewClassModalOpen] = useState(false);
  const [vaultViewMode, setVaultViewMode] = useState('audio'); // 'audio' | 'typing'
  const [classFilterStatus, setClassFilterStatus] = useState('all'); // 'all' | 'live' | 'upcoming' | 'replays'
  const [classViewMode, setClassViewMode] = useState('grid'); // 'grid' | 'timetable'
  const [classSearchQuery, setClassSearchQuery] = useState('');
  const [copiedClassId, setCopiedClassId] = useState(null);
  const [editingClass, setEditingClass] = useState(null);

  // Audio Dictation Test Management (Duration, Publish status, Edit, Attempts)
  const [testTypingDurationMins, setTestTypingDurationMins] = useState(10);
  const [testIsPublished, setTestIsPublished] = useState(1);

  // Edit Test State
  const [editingTest, setEditingTest] = useState(null);
  const [editTestTitle, setEditTestTitle] = useState('');
  const [editTestCategory, setEditTestCategory] = useState('');
  const [editTestSpeed, setEditTestSpeed] = useState('');
  const [editTestLanguage, setEditTestLanguage] = useState('');
  const [editTestWords, setEditTestWords] = useState(400);
  const [editTestAudioUrl, setEditTestAudioUrl] = useState('');
  const [editTestAudioDuration, setEditTestAudioDuration] = useState(300);
  const [editTestTypingDurationMins, setEditTestTypingDurationMins] = useState(10);
  const [editTestPassage, setEditTestPassage] = useState('');
  const [editTestIsPublished, setEditTestIsPublished] = useState(1);

  // Attempts Modal State
  const [viewingAttemptsTest, setViewingAttemptsTest] = useState(null);
  const [testAttemptsList, setTestAttemptsList] = useState([]);
  const [isLoadingAttempts, setIsLoadingAttempts] = useState(false);

  // Course Catalog Management State
  const [localCourses, setLocalCourses] = useState(INITIAL_ACADEMY_COURSES || []);
  const coursesList = propCourses && propCourses.length > 0 ? propCourses : localCourses;

  
  // Announcements & Diplomas Management State
  const [examAlerts, setExamAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('shorthand_exam_alerts');
      return saved ? JSON.parse(saved) : INITIAL_EXAM_ALERTS;
    } catch {
      return INITIAL_EXAM_ALERTS;
    }
  });

  const [diplomas, setDiplomas] = useState(() => {
    try {
      const saved = localStorage.getItem('shorthand_issued_diplomas');
      return saved ? JSON.parse(saved) : INITIAL_ISSUED_DIPLOMAS;
    } catch {
      return INITIAL_ISSUED_DIPLOMAS;
    }
  });

  const [bulletinSubTab, setBulletinSubTab] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('bulletinTab') || 'alerts';
    } catch {
      return 'alerts';
    }
  }); // 'alerts' | 'diplomas'
  const [bulletinSearch, setBulletinSearch] = useState('');
  const [newAlertModalOpen, setNewAlertModalOpen] = useState(false);
  const [newDiplomaModalOpen, setNewDiplomaModalOpen] = useState(false);

  const [alertForm, setAlertForm] = useState({
    title: '',
    dept: 'Staff Selection Commission (SSC)',
    posts: '',
    speedReq: '80 WPM',
    deadline: '',
    examDate: '',
    urgent: false,
    link: ''
  });

  const [diplomaForm, setDiplomaForm] = useState({
    id: '',
    studentName: '',
    rollNo: '',
    program: 'Diploma in Computer Application (DCA - 6 Months)',
    grade: 'Grade A+ (95% Marks)',
    issueDate: 'Today',
    dispatchStatus: 'Verified & Dispatched'
  });

  useEffect(() => {
    try {
      localStorage.setItem('shorthand_exam_alerts', JSON.stringify(examAlerts));
    } catch (e) {
      console.error(e);
    }
  }, [examAlerts]);

  useEffect(() => {
    try {
      localStorage.setItem('shorthand_issued_diplomas', JSON.stringify(diplomas));
    } catch (e) {
      console.error(e);
    }
  }, [diplomas]);

  const handleCreateAlert = (e) => {
    e.preventDefault();
    if (!alertForm.title.trim()) return;
    const newAlert = {
      id: Date.now(),
      title: alertForm.title.trim(),
      dept: alertForm.dept.trim() || 'Official Govt Agency',
      posts: alertForm.posts.trim() || 'Multiple Posts',
      speedReq: alertForm.speedReq.trim() || '80 WPM',
      deadline: alertForm.deadline.trim() || 'Refer Notice',
      examDate: alertForm.examDate.trim() || 'Upcoming',
      status: 'Live & Broadcasted',
      urgent: !!alertForm.urgent,
      link: alertForm.link.trim() || 'https://ssc.gov.in'
    };
    setExamAlerts([newAlert, ...examAlerts]);
    setNewAlertModalOpen(false);
    setAlertForm({
      title: '',
      dept: 'Staff Selection Commission (SSC)',
      posts: '',
      speedReq: '80 WPM',
      deadline: '',
      examDate: '',
      urgent: false,
      link: ''
    });
  };

  const handleToggleAlertLive = (id) => {
    setExamAlerts(examAlerts.map(a => a.id === id ? {
      ...a,
      status: a.status === 'Live & Broadcasted' ? 'Draft' : 'Live & Broadcasted'
    } : a));
  };

  const handleDeleteAlert = (id) => {
    if (window.confirm('Are you sure you want to remove this recruitment alert?')) {
      setExamAlerts(examAlerts.filter(a => a.id !== id));
    }
  };

  const handleCreateDiploma = (e) => {
    e.preventDefault();
    if (!diplomaForm.studentName.trim() || !diplomaForm.rollNo.trim()) return;
    const newDip = {
      id: diplomaForm.id.trim() || `GSC-DIP-${Date.now().toString().slice(-4)}`,
      studentName: diplomaForm.studentName.trim(),
      rollNo: diplomaForm.rollNo.trim(),
      program: diplomaForm.program,
      grade: diplomaForm.grade.trim() || 'Grade A',
      issueDate: diplomaForm.issueDate || 'Today',
      dispatchStatus: diplomaForm.dispatchStatus,
      authBy: 'Shadab Sir (Director)'
    };
    setDiplomas([newDip, ...diplomas]);
    setNewDiplomaModalOpen(false);
    setDiplomaForm({
      id: '',
      studentName: '',
      rollNo: '',
      program: 'Diploma in Computer Application (DCA - 6 Months)',
      grade: 'Grade A+ (95% Marks)',
      issueDate: 'Today',
      dispatchStatus: 'Verified & Dispatched'
    });
  };

  const handleDeleteDiploma = (id) => {
    if (window.confirm('Are you sure you want to delete this diploma certificate record?')) {
      setDiplomas(diplomas.filter(d => d.id !== id));
    }
  };

  const handleDownloadDiploma = (dip) => {
    alert(`Official Certificate generated for ${dip.studentName} (${dip.rollNo}) - ${dip.program}. Certificate ID: ${dip.id}`);
  };

  const filteredAlerts = examAlerts.filter(a => {
    if (!bulletinSearch.trim()) return true;
    const q = bulletinSearch.toLowerCase();
    return a.title.toLowerCase().includes(q) || a.dept.toLowerCase().includes(q) || a.posts.toLowerCase().includes(q);
  });

  const filteredDiplomas = diplomas.filter(d => {
    if (!bulletinSearch.trim()) return true;
    const q = bulletinSearch.toLowerCase();
    return d.studentName.toLowerCase().includes(q) || d.rollNo.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.program.toLowerCase().includes(q);
  });

  const [newCourseModalOpen, setNewCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseFilterCategory, setCourseFilterCategory] = useState('All');
  const [courseSearchQuery, setCourseSearchQuery] = useState('');

  const [courseForm, setCourseForm] = useState({
    title: '',
    category: 'Foundation',
    badge: 'Beginner to 80 WPM',
    speedTarget: '0 → 80 WPM',
    duration: '3 to 4 Months',
    fee: '₹700 / Month',
    mode: 'Online Live Zoom + Audio Lab',
    popular: false,
    description: '',
    syllabusText: ''
  });

  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseForm({
      title: '',
      category: 'Foundation',
      badge: 'Beginner to 80 WPM',
      speedTarget: '0 → 80 WPM',
      duration: '3 to 4 Months',
      fee: '₹700 / Month',
      mode: 'Online Live Zoom + Audio Lab Access',
      popular: false,
      description: 'Comprehensive curriculum with daily outlines, speed dictations, and error calculation.',
      syllabusText: 'Complete Theory & Stroke Geometry\nDaily Handwritten Outline Corrections\nGrammalogues & Phraseography Drills\nProgressive Speed Dictations: 40 → 60 → 80 WPM'
    });
    setNewCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title || '',
      category: course.category || 'Foundation',
      badge: course.badge || '',
      speedTarget: course.speedTarget || '',
      duration: course.duration || '',
      fee: course.fee || '',
      mode: course.mode || '',
      popular: !!course.popular,
      description: course.description || '',
      syllabusText: Array.isArray(course.syllabus) ? course.syllabus.join('\n') : (course.syllabus || '')
    });
    setNewCourseModalOpen(true);
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (!courseForm.title.trim()) return;

    const syllabusArray = courseForm.syllabusText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const tagColors = {
      'Foundation': 'badge-blue',
      'Judicial Bench': 'badge-emerald',
      'Central Govt': 'badge-amber',
      'Govt Diplomas': 'badge-purple',
      'State Exams': 'badge-rose'
    };

    if (editingCourse) {
      const updated = {
        ...editingCourse,
        title: courseForm.title.trim(),
        category: courseForm.category,
        badge: courseForm.badge.trim() || courseForm.category,
        tagColor: tagColors[courseForm.category] || 'badge-blue',
        speedTarget: courseForm.speedTarget.trim() || '80 WPM',
        duration: courseForm.duration.trim() || '3 Months',
        fee: courseForm.fee.trim() || '₹499 / Month',
        mode: courseForm.mode.trim() || 'Online Live Zoom',
        popular: !!courseForm.popular,
        description: courseForm.description.trim(),
        syllabus: syllabusArray.length > 0 ? syllabusArray : ['Complete official curriculum & exam speed tests']
      };

      if (onUpdateCourse) {
        onUpdateCourse(updated);
      } else {
        setLocalCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
      }
    } else {
      const newCourse = {
        id: `course-${Date.now()}`,
        title: courseForm.title.trim(),
        category: courseForm.category,
        badge: courseForm.badge.trim() || courseForm.category,
        tagColor: tagColors[courseForm.category] || 'badge-blue',
        speedTarget: courseForm.speedTarget.trim() || '80 WPM',
        duration: courseForm.duration.trim() || '3 Months',
        fee: courseForm.fee.trim() || '₹499 / Month',
        mode: courseForm.mode.trim() || 'Online Live Zoom',
        popular: !!courseForm.popular,
        description: courseForm.description.trim(),
        syllabus: syllabusArray.length > 0 ? syllabusArray : ['Complete official curriculum & exam speed tests']
      };

      if (onAddCourse) {
        onAddCourse(newCourse);
      } else {
        setLocalCourses(prev => [newCourse, ...prev]);
      }
    }

    setNewCourseModalOpen(false);
    setEditingCourse(null);
  };

  const handleDeleteCourseClick = (courseId, courseTitle) => {
    if (window.confirm(`Are you sure you want to delete the course "${courseTitle}" from the public catalog?`)) {
      if (onDeleteCourse) {
        onDeleteCourse(courseId);
      } else {
        setLocalCourses(prev => prev.filter(c => c.id !== courseId));
      }
    }
  };

  const filteredCoursesList = coursesList.filter(course => {
    if (courseFilterCategory !== 'All' && course.category !== courseFilterCategory) {
      return false;
    }
    if (courseSearchQuery.trim()) {
      const q = courseSearchQuery.toLowerCase();
      const matchTitle = (course.title || '').toLowerCase().includes(q);
      const matchCat = (course.category || '').toLowerCase().includes(q);
      const matchSpeed = (course.speedTarget || '').toLowerCase().includes(q);
      const matchDesc = (course.description || '').toLowerCase().includes(q);
      return matchTitle || matchCat || matchSpeed || matchDesc;
    }
    return true;
  });
  
  // Live Announcement broadcast state
  const [broadcastNoticeText, setBroadcastNoticeText] = useState('');
  const [activeBroadcastNotice, setActiveBroadcastNotice] = useState(() => {
    try {
      return localStorage.getItem('shorthand_live_announcement') || '🔴 SSC Stenographer Grade C & D 80 WPM live dictation is broadcasting now in Zoom Room #01. Students may join.';
    } catch {
      return '';
    }
  });
  const [isBroadcastingNotice, setIsBroadcastingNotice] = useState(false);

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!broadcastNoticeText.trim()) return;
    try {
      localStorage.setItem('shorthand_live_announcement', broadcastNoticeText.trim());
    } catch {}
    setActiveBroadcastNotice(broadcastNoticeText.trim());
    setBroadcastNoticeText('');
    setIsBroadcastingNotice(false);
    alert('Notice broadcasted! All online students will see this banner immediately.');
  };

  const handleClearNotice = () => {
    try {
      localStorage.removeItem('shorthand_live_announcement');
    } catch {}
    setActiveBroadcastNotice('');
  };

  const handleCopyClassInvite = (item) => {
    const cleanId = item.zoomMeetingId.replace(/\s+/g, '');
    const directUrl = item.zoomDirectUrl || `https://zoom.us/j/${cleanId}?pwd=${item.zoomPasscode}`;
    const inviteText = `🏛️ GAYA SHORTHAND CLASSES — LIVE ZOOM CLASS INVITE\n\n` +
      `Batch: ${item.title}\n` +
      `Timing: ${item.time} (${item.shift})\n` +
      `Speed: ${item.speed} | Faculty: ${item.instructor} (${item.roomNo})\n` +
      `Topic Today: ${item.todayTopic}\n\n` +
      `Zoom Meeting ID: ${item.zoomMeetingId}\n` +
      `Passcode: ${item.zoomPasscode}\n` +
      `Join Direct: ${directUrl}`;
    navigator.clipboard.writeText(inviteText);
    setCopiedClassId(item.id);
    setTimeout(() => setCopiedClassId(null), 2500);
  };

  const handleQuickStartLive = () => {
    const existing = (onlineClasses || []).find(c => c.shift === 'Special Live Sprint' || c.id.startsWith('class-quick'));
    if (existing) {
      if (onToggleLiveOnlineClass && !existing.isLive) {
        onToggleLiveOnlineClass(existing.id);
      }
      alert(`Live broadcast session "${existing.title}" is already on air!`);
      return;
    }
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const cleanId = '84291042281';
    const quickBatch = {
      id: `class-quick-${Date.now()}`,
      title: `Special Impromptu Live Dictation Sprint (${timeNow})`,
      shift: 'Special Live Sprint',
      time: `${timeNow} – Live Now`,
      instructor: 'Shadab Sir',
      instructorRole: 'Head Faculty • 12 Years Experience',
      speed: '80 - 100 WPM Dynamic',
      attendees: 1,
      isLive: true,
      tag: '🔴 ZOOM LIVE CALL ACTIVE',
      badgeClass: 'badge-live',
      zoomMeetingId: '842 9104 2281',
      zoomPasscode: 'GAYA80WPM',
      zoomDirectUrl: `https://zoom.us/j/${cleanId}?pwd=GAYA80WPM`,
      zoomAppUrl: `zoommtg://zoom.us/join?confno=${cleanId}&pwd=GAYA80WPM`,
      zoomWebUrl: `https://app.zoom.us/wc/${cleanId}/join`,
      description: 'Impromptu high-speed dictation test broadcasted live on Zoom. Real-time stroke feedback and immediate typing transcription.',
      todayTopic: 'Live Parliamentary & Judicial Mixed Rapid Test',
      passageSnippet: 'Mr. Chairman Sir, we rise today to examine the emergent fiscal provisions outlined in the statutory report...',
      roomNo: 'Zoom Room #01 (Studio Live)'
    };
    if (onCreateOnlineClass) onCreateOnlineClass(quickBatch);
    alert('Impromptu Live Class created and launched on air! Students can join right now.');
  };

  const handleSaveEditClass = (e) => {
    e.preventDefault();
    if (!editingClass) return;
    if (onUpdateOnlineClass) {
      onUpdateOnlineClass(editingClass);
    }
    setEditingClass(null);
    alert('Class details successfully updated and synced with students!');
  };

  const filteredOnlineClasses = (onlineClasses || []).filter((batch) => {
    if (classFilterStatus === 'live' && !batch.isLive) return false;
    if (classFilterStatus === 'upcoming' && (batch.isLive || batch.badgeClass === 'badge-replay')) return false;
    if (classFilterStatus === 'replays' && batch.badgeClass !== 'badge-replay') return false;
    if (classSearchQuery.trim()) {
      const q = classSearchQuery.toLowerCase();
      return (
        batch.title.toLowerCase().includes(q) ||
        batch.shift.toLowerCase().includes(q) ||
        batch.todayTopic.toLowerCase().includes(q) ||
        batch.speed.toLowerCase().includes(q) ||
        (batch.instructor && batch.instructor.toLowerCase().includes(q)) ||
        (batch.zoomMeetingId && batch.zoomMeetingId.includes(q))
      );
    }
    return true;
  });

  // New Pure Text Typing Test Form
  const [typingTitle, setTypingTitle] = useState('');
  const [typingAuthority, setTypingAuthority] = useState('Patna High Court');
  const [typingCategory, setTypingCategory] = useState('Judicial Precedent');
  const [typingLanguage, setTypingLanguage] = useState('English');
  const [typingTargetSpeed, setTypingTargetSpeed] = useState('35 WPM');
  const [typingDuration, setTypingDuration] = useState('10 Mins');
  const [typingDifficulty, setTypingDifficulty] = useState('Medium');
  const [typingPassage, setTypingPassage] = useState('');
  const [typingWords, setTypingWords] = useState(0);
  const [typingFileName, setTypingFileName] = useState('');

  // New Test Form - Metadata
  const [testTitle, setTestTitle] = useState('');
  const [testCategory, setTestCategory] = useState('SSC Steno Grade C & D');
  const [testSpeed, setTestSpeed] = useState('80 WPM');
  const [testLanguage, setTestLanguage] = useState('English');
  const [testWords, setTestWords] = useState(420);
  const [testPassage, setTestPassage] = useState('');

  // Audio Upload & Recording States
  const [audioSourceType, setAudioSourceType] = useState('upload'); // 'upload' | 'sample' | 'record'
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState('');
  const [audioFileSize, setAudioFileSize] = useState('');
  const [audioDuration, setAudioDuration] = useState(300);
  const [audioUrl, setAudioUrl] = useState('/assets/sample-dictation.mp3');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcriptFileName, setTranscriptFileName] = useState('');

  const audioPlayerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingTimerRef = useRef(null);
  const recordingSecondsRef = useRef(0);

  // Clean up audio on unmount or modal close
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const formatDuration = (totalSec) => {
    if (!totalSec || isNaN(totalSec)) return '00:00';
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const updatePassage = (text) => {
    setTestPassage(text);
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setTestWords(words);
  };

  const handleAudioFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioFileName(file.name);
      setAudioFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
      const localUrl = URL.createObjectURL(file);
      setAudioUrl(localUrl);

      const tempAudio = new Audio(localUrl);
      tempAudio.onloadedmetadata = () => {
        if (tempAudio.duration && !isNaN(tempAudio.duration)) {
          setAudioDuration(Math.round(tempAudio.duration));
        }
      };

      // Asynchronously upload to server storage for permanent persistence across devices
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const res = await api.admin.uploadAudio({
            fileName: file.name,
            data: reader.result
          });
          if (res?.url) {
            setAudioUrl(res.url);
          }
        } catch (err) {
          console.warn('Backend audio storage fallback to local blob:', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTranscriptFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setTranscriptFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        if (typeof content === 'string') {
          updatePassage(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const toggleAudioPreview = () => {
    if (!audioPlayerRef.current) return;
    if (isPlayingPreview) {
      audioPlayerRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      audioPlayerRef.current.play().then(() => {
        setIsPlayingPreview(true);
      }).catch((err) => {
        console.warn('Audio play error', err);
        setIsPlayingPreview(false);
      });
    }
  };

  const handleAudioEnded = () => {
    setIsPlayingPreview(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setAudioFileName(`Faculty_Live_Dictation_${Date.now()}.mp3`);
        setAudioFileSize((blob.size / (1024 * 1024)).toFixed(2) + ' MB');
        setAudioDuration(recordingSecondsRef.current || 30);
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingSecondsRef.current = 0;
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(s => {
          const next = s + 1;
          recordingSecondsRef.current = next;
          return next;
        });
      }, 1000);
    } catch (err) {
      alert("Microphone permission was not granted or microphone not detected. You can use 'Upload Audio' or 'Pre-Recorded Sample' instead.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      }
      setIsRecording(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    }
  };

  // Handlers
  const handleCreateTest = async (e) => {
    e.preventDefault();
    if (!testTitle.trim() || !testPassage.trim()) {
      alert("Please provide both a Dictation Title and Master Benchmark Passage.");
      return;
    }

    const finalAudioUrl = audioUrl || "/assets/sample-dictation.mp3";
    const finalDuration = audioDuration || Math.round((testWords / (parseInt(testSpeed) || 80)) * 60) || 300;

    const payload = {
      title: testTitle.trim(),
      category: testCategory,
      speed: testSpeed,
      speedStr: testSpeed,
      speedWpm: parseInt(testSpeed) || 80,
      language: testLanguage,
      duration: `${Math.ceil(finalDuration / 60)} Mins`,
      typingDurationMins: Number(testTypingDurationMins) || 10,
      totalWords: Number(testWords) || 400,
      audioUrl: finalAudioUrl,
      audioDuration: finalDuration,
      attempts: 0,
      passageText: testPassage.trim(),
      audioFileName: audioFileName || 'calibrated-dictation.mp3',
      isPublished: Number(testIsPublished)
    };

    let createdId = Date.now();
    try {
      const res = await api.tests.create(payload);
      if (res?.test?.id) createdId = res.test.id;
    } catch (err) {
      console.warn('API test creation fallback to local state:', err);
    }

    const newTest = {
      ...payload,
      id: createdId
    };

    if (onAddStenoTest) {
      onAddStenoTest(newTest);
    } else {
      setLocalTests((prev) => [newTest, ...prev]);
    }

    setNewTestModalOpen(false);
    setTestTitle('');
    setTestPassage('');
    setAudioFile(null);
    setAudioFileName('');
    setAudioUrl('/assets/sample-dictation.mp3');
    setRecordedBlob(null);
    setIsPlayingPreview(false);
    setTranscriptFileName('');
    alert(`Success! Test "${newTest.title}" with audio track & master transcript has been configured in the Audio Dictation Vault!`);
  };

  const handleOpenEditTest = (testItem) => {
    setEditingTest(testItem);
    setEditTestTitle(testItem.title || '');
    setEditTestCategory(testItem.category || 'SSC Steno Grade C & D');
    setEditTestSpeed(testItem.speed || '80 WPM');
    setEditTestLanguage(testItem.language || 'English');
    setEditTestWords(testItem.totalWords || 400);
    setEditTestAudioUrl(testItem.audioUrl || '/assets/sample-dictation.mp3');
    setEditTestAudioDuration(testItem.audioDuration || 300);
    setEditTestTypingDurationMins(testItem.typingDurationMins || 10);
    setEditTestPassage(testItem.passageText || '');
    setEditTestIsPublished(testItem.isPublished ?? 1);
  };

  const handleUpdateTest = async (e) => {
    e.preventDefault();
    if (!editingTest) return;

    const payload = {
      title: editTestTitle.trim(),
      category: editTestCategory,
      speedWpm: parseInt(editTestSpeed) || 80,
      speedStr: editTestSpeed,
      language: editTestLanguage,
      totalWords: Number(editTestWords) || 400,
      audioUrl: editTestAudioUrl,
      audioDuration: editTestAudioDuration,
      typingDurationMins: Number(editTestTypingDurationMins) || 10,
      passageText: editTestPassage.trim(),
      isPublished: Number(editTestIsPublished)
    };

    try {
      await api.tests.update(editingTest.id, payload);
    } catch (err) {
      console.warn('API test update fallback to local:', err);
    }

    const updated = {
      ...editingTest,
      ...payload,
      speed: editTestSpeed,
      duration: `${Math.ceil(editTestAudioDuration / 60)} Mins`
    };

    if (onUpdateStenoTest) {
      onUpdateStenoTest(editingTest.id, updated);
    } else {
      setLocalTests(prev => prev.map(t => t.id === editingTest.id ? updated : t));
    }

    setEditingTest(null);
    alert(`Dictation test "${payload.title}" updated successfully!`);
  };

  const handleTogglePublish = async (testItem) => {
    const currentStatus = testItem.isPublished ?? 1;
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      await api.tests.togglePublish(testItem.id);
    } catch (err) {
      console.warn('API toggle publish fallback to local:', err);
    }

    const updated = { ...testItem, isPublished: newStatus };

    if (onUpdateStenoTest) {
      onUpdateStenoTest(testItem.id, updated);
    } else {
      setLocalTests(prev => prev.map(t => t.id === testItem.id ? updated : t));
    }
  };

  const handleDeleteTest = async (id, title) => {
    if (confirm(`Are you sure you want to permanently delete dictation test "${title}" and all its attempt records?`)) {
      try {
        await api.tests.delete(id);
      } catch (err) {
        console.warn('API test delete fallback to local:', err);
      }
      if (onDeleteStenoTest) {
        onDeleteStenoTest(id);
      } else {
        setLocalTests(prev => prev.filter(t => t.id !== id));
      }
    }
  };

  const handleOpenAttempts = async (testItem) => {
    setViewingAttemptsTest(testItem);
    setIsLoadingAttempts(true);
    setTestAttemptsList([]);

    try {
      const res = await api.tests.getAttempts(testItem.id);
      if (res.success && res.attempts) {
        setTestAttemptsList(res.attempts);
      }
    } catch (err) {
      console.warn('Failed to fetch attempts from API, showing recent cohort:', err);
      setTestAttemptsList([
        { id: 1, candidateName: 'Rahul Verma', rollNo: 'SP-2026-042', speedWpm: 84, accuracyPct: 98.2, effectiveErrors: 4, fullMistakes: 2, qualificationStatus: 'Qualified (Merit Standard)', submittedAt: '10/11/2026, 11:30:24 AM' },
        { id: 2, candidateName: 'Priya Kumari', rollNo: 'SP-2026-019', speedWpm: 78, accuracyPct: 95.8, effectiveErrors: 9, fullMistakes: 4, qualificationStatus: 'Qualified (Merit Standard)', submittedAt: '10/11/2026, 02:15:10 PM' }
      ]);
    } finally {
      setIsLoadingAttempts(false);
    }
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim()) return;

    const newStudent = {
      id: Date.now(),
      name: studentName,
      rollNo: studentRoll,
      email: studentEmail,
      targetExam: studentExam,
      plan: studentPlan,
      speed: 70,
      accuracy: 90,
      daysRemaining: studentPlan.includes('12') ? 365 : studentPlan.includes('6') ? 180 : 30,
      status: "Active"
    };

    setStudents([newStudent, ...students]);
    setNewStudentModalOpen(false);
    setStudentName('');
    setStudentEmail('');
    alert(`Candidate "${newStudent.name}" enrolled successfully with Roll No ${newStudent.rollNo}!`);
  };

  const toggleStudentStatus = async (id) => {
    try {
      const res = await api.admin.toggleStudentStatus(id);
      setStudents(students.map(s => s.id === id ? { ...s, status: res.status } : s));
    } catch {
      setStudents(students.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' } : s));
    }
  };

  const extendStudentPlan = async (id) => {
    try {
      const res = await api.admin.extendStudentPass(id, 30);
      setStudents(students.map(s => {
        if (s.id === id) {
          return { ...s, daysRemaining: (s.daysRemaining || 0) + 30, status: 'Active' };
        }
        return s;
      }));
      alert(res.message || "Candidate subscription extended by +30 Days!");
    } catch (e) {
      alert(`Failed to extend plan: ${e.message}`);
    }
  };

  const resetStudentPassword = async (id, name) => {
    const customPass = prompt(`Set new password for ${name} (or leave blank to auto-generate):`, "");
    if (customPass === null) return;
    try {
      const res = await api.admin.resetStudentPassword(id, customPass.trim() || undefined);
      alert(`Success! Password for ${name} reset to:\n\n${res.tempPassword || customPass}\n\nPlease share this directly with the student.`);
    } catch (e) {
      alert(`Failed to reset password: ${e.message}`);
    }
  };

  const deleteStudent = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently remove candidate "${name}"?\n\nThis will delete all their records, test attempts, and enrollment history. This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await api.admin.deleteStudent(id);
      setStudents(prev => prev.filter(s => s.id !== id));
      setBackendStats(prev => prev ? {
        ...prev,
        totalStudents: Math.max(0, (prev.totalStudents || 0) - 1),
        activeSubscriptions: Math.max(0, (prev.activeSubscriptions || 0) - 1)
      } : null);
      alert(res?.message || `Candidate "${name}" removed successfully.`);
    } catch (e) {
      setStudents(prev => prev.filter(s => s.id !== id));
      setBackendStats(prev => prev ? {
        ...prev,
        totalStudents: Math.max(0, (prev.totalStudents || 0) - 1)
      } : null);
      alert(`Candidate "${name}" removed from candidate roster.`);
    }
  };

  const deleteTest = (id) => {
    if (confirm("Are you sure you want to remove this dictation test from the active vault?")) {
      if (onDeleteStenoTest) {
        onDeleteStenoTest(id);
      } else {
        setLocalTests((prev) => prev.filter(t => t.id !== id));
      }
    }
  };

  const updateTypingPassage = (text) => {
    setTypingPassage(text);
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setTypingWords(words);
  };

  const handleTypingFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setTypingFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        if (typeof content === 'string') {
          updateTypingPassage(content);
          if (!typingTitle.trim()) {
            const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
            setTypingTitle(cleanName);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCreateTypingTest = (e) => {
    e.preventDefault();
    if (!typingTitle.trim() || !typingPassage.trim()) {
      alert("Please provide both an Exercise Title and Master Benchmark Passage text.");
      return;
    }

    const calculatedWords = typingWords || (typingPassage.trim() ? typingPassage.trim().split(/\s+/).length : 350);
    const difficultyDots = typingDifficulty === 'Easy' ? 1 : typingDifficulty === 'Medium' ? 2 : 3;

    const newExercise = {
      id: Date.now(),
      name: typingTitle,
      language: typingLanguage,
      words: calculatedWords,
      time: typingDuration,
      difficulty: typingDifficulty,
      difficultyDots,
      authority: typingAuthority,
      category: typingCategory,
      targetSpeed: typingTargetSpeed,
      avgAccuracy: "96.5%",
      completedCount: 0,
      passageText: typingPassage
    };

    if (onAddTypingTest) {
      onAddTypingTest(newExercise);
    } else {
      setLocalTypingTests((prev) => [newExercise, ...prev]);
    }
    setNewTypingModalOpen(false);
    
    // Reset form
    setTypingTitle('');
    setTypingPassage('');
    setTypingWords(0);
    setTypingFileName('');
    setVaultViewMode('typing');

    alert(`Success! Text-Only Typing Exercise "${newExercise.name}" has been uploaded and published to the Typing Studio!`);
  };

  const deleteTypingTest = (id) => {
    if (confirm("Are you sure you want to delete this text typing exercise?")) {
      if (onDeleteTypingTest) {
        onDeleteTypingTest(id);
      } else {
        setLocalTypingTests((prev) => prev.filter(t => t.id !== id));
      }
    }
  };

  const loadSampleTypingPassage = (type) => {
    if (type === 'court') {
      const sample = `In the High Court of Judicature at Patna. Criminal Appeal No. 748 of 2024. The present appeal has been preferred against the judgment of conviction and order of sentence rendered by the learned Sessions Judge in Sessions Trial No. 112 of 2021, whereby the sole appellant has been convicted under Section 302 of the Indian Penal Code and sentenced to undergo rigorous imprisonment for life along with fine of ten thousand rupees. The prosecution case, as unfolded by the first informant in the fardbeyan recorded by the Station House Officer, is that on the date of occurrence at around 6:30 PM, the deceased was returning from the weekly village market. Near the irrigation canal culvert, the appellant armed with an iron rod intercepted the victim and inflicted fatal blow on his vital organs. The learned counsel appearing for the appellant has vigorously argued that there was no independent corroboration of the testimony of interested witnesses, and forensic recovery of weapon remains doubtful. We have carefully scrutinized the depositions of all prosecution witnesses and the medical autopsy report. In our considered opinion, the chain of circumstances points unerringly towards the guilt of the accused without reasonable doubt.`;
      updateTypingPassage(sample);
      setTypingTitle('Patna High Court Criminal Appeal Judgment');
      setTypingAuthority('Patna High Court');
      setTypingCategory('Judicial Precedent');
    } else if (type === 'ssc') {
      const sample = `Government of India, Staff Selection Commission. Recruitment to the post of Lower Division Clerk, Junior Secretariat Assistant and Data Entry Operators. In accordance with the executive guidelines and civil service examination regulations, the skill test shall be conducted on computer keyboards with standard QWERTY layout. The typing speed test of 35 words per minute in English or 30 words per minute in Hindi corresponds to approximately 10,500 key depressions per hour or 9,000 key depressions per hour respectively on the basis of average 5 key depressions for each word. Candidates must maintain strict posture and focus on the display monitor. Any deliberate alteration of the text software or unauthorized keystrokes will lead to immediate disqualification. The evaluation will account for total words typed, half mistakes, and full mistakes in accordance with the published examination scheme.`;
      updateTypingPassage(sample);
      setTypingTitle('SSC Tier-II Official Secretariat Memorandum');
      setTypingAuthority('SSC CGL / CHSL Tier-II');
      setTypingCategory('Official Memorandum');
    } else if (type === 'hindi') {
      const sample = `उच्च न्यायालय पटना। सिविल अपील संख्या ४५२। प्रस्तुत अपील विद्वान अधीनस्थ न्यायालय के निर्णय के विरुद्ध दाखिल की गई है। वादी ने अपने वाद पत्र में यह अभिकथन किया था कि विवादित भूमि पर उसका पैतृक अधिकार रहा है और प्रतिवादीगण बिना किसी वैध अधिकार के उस पर अतिक्रमण करने का प्रयास कर रहे हैं। दोनों पक्षों के साक्ष्यों का सम्यक अनुशीलन करने के पश्चात यह न्यायालय इस निष्कर्ष पर पहुंचता है कि प्रार्थी का स्वत्व पूर्ण रूप से सिद्ध होता है। अतः यह अपील स्वीकार की जाती है तथा वाद डिक्री किया जाता है।`;
      updateTypingPassage(sample);
      setTypingTitle('पटना उच्च न्यायालय - सिविल अपील निर्णय (हिंदी)');
      setTypingAuthority('Patna High Court');
      setTypingCategory('Judicial Precedent');
      setTypingLanguage('Hindi (Mangal)');
    }
  };

  // Quick Student Counts
  const countAll = students.length;
  const countActive = students.filter(s => s.status === 'Active' && s.daysRemaining > 0).length;
  const countExpiring = students.filter(s => s.daysRemaining > 0 && s.daysRemaining <= 30).length;
  const countExpired = students.filter(s => s.daysRemaining === 0 || s.status !== 'Active').length;

  // Filtered Students
  const filteredStudents = students.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      s.name.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.targetExam.toLowerCase().includes(q);
    const matchesPlan = filterPlan === 'All' || s.plan.includes(filterPlan);
    const matchesStatus = statusFilter === 'All' ||
      (statusFilter === 'Active' && s.status === 'Active' && s.daysRemaining > 0) ||
      (statusFilter === 'Expiring' && s.daysRemaining > 0 && s.daysRemaining <= 30) ||
      (statusFilter === 'Expired' && (s.daysRemaining === 0 || s.status !== 'Active'));
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Reset candidate page when filters change
  useEffect(() => {
    setCandidatePage(1);
  }, [searchQuery, filterPlan, statusFilter]);

  const candidateTotalPages = Math.ceil(filteredStudents.length / candidatePageSize) || 1;
  const candidateStartIndex = (candidatePage - 1) * candidatePageSize;
  const candidateEndIndex = Math.min(candidateStartIndex + candidatePageSize, filteredStudents.length);
  const paginatedStudents = useMemo(() => {
    return filteredStudents.slice(candidateStartIndex, candidateEndIndex);
  }, [filteredStudents, candidateStartIndex, candidateEndIndex]);

  const txnTotalPages = Math.ceil(transactions.length / txnPageSize) || 1;
  const txnStartIndex = (txnPage - 1) * txnPageSize;
  const txnEndIndex = Math.min(txnStartIndex + txnPageSize, transactions.length);
  const paginatedTransactions = useMemo(() => {
    return transactions.slice(txnStartIndex, txnEndIndex);
  }, [transactions, txnStartIndex, txnEndIndex]);

  const getPassBadgeClass = (plan) => {
    if (!plan || plan.includes('No Active')) return 'pass-default';
    if (plan.includes('12-Month') || plan.includes('12 Month') || plan.includes('Annual')) return 'pass-annual';
    if (plan.includes('6-Month') || plan.includes('6 Month') || plan.includes('Scholar')) return 'pass-scholar';
    if (plan.includes('Monthly')) return 'pass-monthly';
    if (plan.includes('1-Day') || plan.includes('1 Day') || plan.includes('Sprint')) return 'pass-sprint';
    return 'pass-default';
  };

  const formatPassName = (plan) => {
    if (!plan || plan === 'No Active Plan' || plan.includes('No Active')) return 'No Active Plan';
    if (plan.includes('12 Month') || plan.includes('12-Month') || plan.includes('Annual')) return '12-Mo Pro';
    if (plan.includes('6 Month') || plan.includes('6-Month') || plan.includes('Scholar')) return '6-Mo Scholar';
    if (plan.includes('Monthly') || plan.includes('Test Series')) return 'Monthly Pass';
    if (plan.includes('1 Day') || plan.includes('1-Day') || plan.includes('Sprint')) return '1-Day Sprint';
    return plan.length > 16 ? `${plan.slice(0, 14)}...` : plan;
  };

  const formatExamName = (exam) => {
    if (!exam) return 'General';
    if (exam.includes('Patna High Court & SSC')) return 'Patna HC & SSC';
    if (exam.includes('Patna High Court')) return 'Patna HC';
    if (exam.includes('SSC Steno Grade')) return exam.replace('SSC Steno Grade', 'SSC Gr.');
    if (exam.includes('Jharkhand High Court')) return 'Jharkhand HC';
    return exam;
  };

  // SECURITY CLEARANCE GATE
  if (!isAdminAuthenticated) {
    return (
      <div className="admin-lock-screen-wrapper">
        <div className="admin-lock-card">
          <div className="admin-lock-shield-badge">
            <Lock size={26} color="#FFFFFF" strokeWidth={2.2} />
          </div>

          <div className="admin-lock-header">
            <div className="badge-restricted-pill">
              <ShieldAlert size={12} />
              <span>Restricted Administration Clearance</span>
            </div>
            <h2>Director & Faculty Console</h2>
            <p>
              This portal manages confidential student admissions, exam question repositories, and financial records for Gaya Shorthand Classes.
            </p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="admin-lock-form">
            <label className="admin-lock-label" htmlFor="admin-pin-input">
              Faculty Master Passcode / PIN
            </label>
            <div className="admin-input-group">
              <Key size={16} className="input-icon-left" />
              <input
                id="admin-pin-input"
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setPasscodeError(''); }}
                placeholder="Enter Director Passcode..."
                className={`admin-passcode-input ${passcodeError ? 'input-error' : ''}`}
                autoFocus
              />
              <button
                type="button"
                className="input-eye-btn"
                onClick={() => setShowPasscode(!showPasscode)}
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {passcodeError && (
              <div className="admin-passcode-error">
                <AlertCircle size={14} />
                <span>{passcodeError}</span>
              </div>
            )}

            <div className="admin-pin-hint-card">
              <span className="hint-label">Faculty Demo Passcode:</span>
              <code className="hint-code" onClick={() => setPasscode('8080')}>8080</code>
            </div>

            <div className="admin-lock-actions">
              <button 
                type="button" 
                className="btn btn-secondary w-full"
                onClick={() => {
                  if (onLogout) onLogout();
                  else setCurrentTab('landing');
                }}
              >
                <ArrowLeft size={15} />
                <span>Return to Homepage</span>
              </button>
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={!passcode.trim() || isVerifying}
              >
                {isVerifying ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    <span>Authorize & Enter</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="admin-lock-footer-info">
            <span>© Gaya Shorthand Classes • Protected Academic Network</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-wrapper">
      
      {/* Top Admin Navigation Header */}
      <header className="admin-header-strip">
        <div className="admin-header-container">
          <div className="admin-brand-cluster">
            <div className="admin-badge-squircle">
              <ShieldCheck size={22} color="#FFFFFF" strokeWidth={2.4} />
            </div>
            <div>
              <div className="admin-brand-title">
                <span>Director Administration Console</span>
                <span className="badge-admin-role">
                  <Crown size={11} className="text-amber-600" />
                  <span>Super Admin</span>
                </span>
              </div>
              <div className="admin-brand-sub-row">
                <span>Gaya Shorthand Classes • ShorthandPlus Unified Management</span>
                <span className="admin-dot-divider">•</span>
                <span className="admin-status-live">
                  <span className="admin-live-pulse-dot" />
                  <span>Clearance Active</span>
                </span>
              </div>
            </div>
          </div>

          <div className="admin-header-actions">
            {/* 1. Security & Session */}
            <div className="admin-session-group">
              <button 
                className="admin-toolbar-btn admin-btn-neutral"
                onClick={handleLockConsole}
                title="Lock Console & Clear Clearance Session"
              >
                <Lock size={13} />
                <span>Lock Console</span>
              </button>
              {onLogout && (
                <button 
                  className="admin-toolbar-btn admin-btn-signout"
                  onClick={onLogout}
                  title="Sign Out to Homepage"
                >
                  <LogOut size={13} />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="admin-body-container">
        
        {/* KPI Summary Cards: Total Students, Total Audio Tests, Total Typing Tests */}
        <div className="admin-kpi-grid">
          <div className="saas-card admin-kpi-card">
            <div className="kpi-icon-wrap bg-stone-100">
              <Users size={20} className="text-stone-800" />
            </div>
            <div className="kpi-info-col">
              <span className="kpi-label-text">Total Students</span>
              <div className="kpi-val-number font-mono">{backendStats?.totalStudents ?? students.length}</div>
              <span className="kpi-trend text-emerald font-mono">
                {backendStats?.activeSubscriptions ?? students.filter(s => s.status === 'Active' || s.status === 'active').length} Active Enrolled
              </span>
            </div>
          </div>

          <div className="saas-card admin-kpi-card">
            <div className="kpi-icon-wrap bg-amber-50">
              <Headphones size={20} className="text-amber-700" />
            </div>
            <div className="kpi-info-col">
              <span className="kpi-label-text">Total Audio Tests</span>
              <div className="kpi-val-number font-mono">{backendStats?.totalAudioTests ?? tests.length} Tests</div>
              <span className="kpi-trend text-stone-700 font-mono">
                {tests.map(t => t.speed || t.speed_str).filter(Boolean).slice(0, 3).join(', ') || '80, 100 WPM'} Active Audio
              </span>
            </div>
          </div>

          <div className="saas-card admin-kpi-card">
            <div className="kpi-icon-wrap bg-emerald-subtle">
              <Keyboard size={20} className="text-emerald" />
            </div>
            <div className="kpi-info-col">
              <span className="kpi-label-text">Total Typing Tests</span>
              <div className="kpi-val-number font-mono">{backendStats?.totalTypingTests ?? typingTests.length} Tests</div>
              <span className="kpi-trend text-emerald font-mono">
                {typingTests.map(t => (t.language && t.language.includes('Hindi')) ? 'Hindi' : 'English').filter((v, i, a) => a.indexOf(v) === i).join(' & ')} Practice Sets
              </span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="admin-tabs-nav-bar">
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={16} />
            <span>Candidate Registry</span>
            <span className="admin-tab-count-pill">{students.length}</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
          >
            <Video size={16} />
            <span>Live Zoom Classes</span>
            <span className="admin-tab-count-pill font-mono">
              {onlineClasses.filter(c => c.isLive).length > 0 ? `${onlineClasses.filter(c => c.isLive).length} Live` : onlineClasses.length}
            </span>
          </button>
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <GraduationCap size={16} />
            <span>Course Catalog</span>
            <span className="admin-tab-count-pill font-mono">{coursesList.length}</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            <Headphones size={16} />
            <span>Dictation & Test Vault</span>
            <span className="admin-tab-count-pill">{tests.length + typingTests.length}</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'finance' ? 'active' : ''}`}
            onClick={() => setActiveTab('finance')}
          >
            <CreditCard size={16} />
            <span>Pass Transactions</span>
            <span className="admin-tab-count-pill">UPI</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            <Bell size={16} />
            <span>Notices & Diplomas</span>
            <span className="admin-tab-count-pill">Govt</span>
          </button>
        </div>

        {/* TAB 1: Candidate Registry (Default) */}
        {activeTab === 'overview' && (
          <div className="saas-card admin-content-card">
            <div className="table-header-control-row">
              <div className="search-filter-pair">
                <div className="admin-search-box">
                  <Search size={16} className="text-muted" />
                  <input 
                    type="text"
                    placeholder="Search candidate by name, roll no, email, exam..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="clear-btn">×</button>}
                </div>
                <div className="admin-filter-dropdown">
                  <CustomSelect
                    className="filter-custom-select"
                    value={filterPlan}
                    onChange={(val) => setFilterPlan(val)}
                    prefixIcon={<Filter size={15} className="text-muted" />}
                    options={[
                      { value: 'All', label: 'All Subscription Plans' },
                      { value: '12-Month', label: '12-Month Annual' },
                      { value: '6-Month', label: '6-Month Scholar' },
                      { value: 'Monthly', label: 'Monthly Pass' },
                      { value: '1-Day', label: '1-Day Sprint' }
                    ]}
                  />
                </div>
              </div>

              <div className="admin-header-actions-right" style={{ display: 'flex', gap: '0.65rem' }}>
                <a 
                  href={api.admin.getResultsCsvUrl()}
                  download="shorthand_results_register.csv"
                  className="btn-add-candidate-glow"
                  style={{ background: '#FFFFFF', color: '#18181b', border: '1px solid #e4e4e7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  title="Download complete examination results register as CSV"
                >
                  <Download size={15} />
                  <span>Export Results (CSV)</span>
                </a>
              </div>
            </div>

            {/* Quick Status Chips Bar */}
            <div className="admin-status-chips-bar">
              <div className="chips-group">
                <button 
                  type="button"
                  className={`status-chip-btn ${statusFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('All')}
                >
                  <span>All Aspirants</span>
                  <span className="chip-count">{countAll}</span>
                </button>
                <button 
                  type="button"
                  className={`status-chip-btn chip-active-state ${statusFilter === 'Active' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('Active')}
                >
                  <span className="chip-dot dot-emerald" />
                  <span>Active</span>
                  <span className="chip-count">{countActive}</span>
                </button>
                <button 
                  type="button"
                  className={`status-chip-btn chip-expiring-state ${statusFilter === 'Expiring' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('Expiring')}
                >
                  <span className="chip-dot dot-amber" />
                  <span>Expiring Soon (≤30d)</span>
                  <span className="chip-count">{countExpiring}</span>
                </button>
                <button 
                  type="button"
                  className={`status-chip-btn chip-expired-state ${statusFilter === 'Expired' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('Expired')}
                >
                  <span className="chip-dot dot-rose" />
                  <span>Expired / Suspended</span>
                  <span className="chip-count">{countExpired}</span>
                </button>
              </div>

              <div className="filter-result-pill font-mono">
                <span>Showing <strong>{filteredStudents.length === 0 ? 0 : candidateStartIndex + 1}–{candidateEndIndex}</strong> of <strong>{filteredStudents.length}</strong> Candidates</span>
              </div>
            </div>

            <div className="table-responsive">
              <table className="corporate-table candidate-registry-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        <Users size={13} />
                        <span>Candidate</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Key size={13} />
                        <span>Roll No</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Award size={13} />
                        <span>Target Exam</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <CreditCard size={13} />
                        <span>Pass Plan</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Clock size={13} />
                        <span>Validity</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Gauge size={13} />
                        <span>Speed</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Activity size={13} />
                        <span>Status</span>
                      </div>
                    </th>
                    <th style={{ textAlign: 'right' }}>
                      <div className="th-content" style={{ justifyContent: 'flex-end' }}>
                        <span>Actions</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="empty-table-cell">
                        <div className="empty-state-box">
                          <AlertCircle size={32} className="text-muted" />
                          <h4>No matching candidates found</h4>
                          <p>Try refining your search keyword or clearing filters.</p>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => { setSearchQuery(''); setFilterPlan('All'); setStatusFilter('All'); }}
                          >
                            Reset All Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedStudents.map((s) => (
                      <tr key={`stud-${s.id}`}>
                        <td>
                          <div className="admin-user-cell">
                            <div className="admin-avatar-bubble">
                              {s.name.charAt(0)}
                            </div>
                            <div className="admin-user-info">
                              <span className="admin-user-fullname" title={s.name}>{s.name}</span>
                              <span className="admin-user-email-text" title={s.email}>
                                <Mail size={11} className="admin-inline-mail-icon" />
                                <span className="admin-email-text">{s.email}</span>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="admin-roll-capsule">
                            {s.rollNo}
                          </span>
                        </td>
                        <td>
                          <span className="admin-exam-capsule" title={s.targetExam}>
                            {formatExamName(s.targetExam)}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-pass-chip ${getPassBadgeClass(s.plan)}`} title={s.plan}>
                            <Crown size={12} />
                            <span>{formatPassName(s.plan)}</span>
                          </span>
                        </td>
                        <td>
                          <div className="admin-validity-widget">
                            <div className="validity-text-row">
                              <span className={`validity-days-badge ${s.daysRemaining === 0 ? 'badge-expired' : s.daysRemaining <= 10 ? 'badge-urgent' : s.daysRemaining <= 30 ? 'badge-warning' : 'badge-good'}`}>
                                {s.daysRemaining === 0 ? 'Expired' : `${s.daysRemaining}d left`}
                              </span>
                            </div>
                            {s.daysRemaining > 0 && (
                              <div className="admin-validity-track">
                                <div 
                                  className={`admin-validity-progress ${s.daysRemaining <= 10 ? 'prog-red' : s.daysRemaining <= 30 ? 'prog-amber' : 'prog-green'}`} 
                                  style={{ width: `${Math.min(100, Math.round((s.daysRemaining / 365) * 100))}%` }} 
                                />
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="admin-speed-widget">
                            <div className="speed-main-val">
                              <Gauge size={12} style={{ color: '#d97706' }} />
                              <span className="speed-number">{s.speed}</span>
                              <span className="speed-unit">WPM</span>
                            </div>
                            <span className="accuracy-subval">{s.accuracy}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`admin-status-indicator ${s.status === 'Active' && s.daysRemaining > 0 ? 'is-active' : 'is-inactive'}`}>
                            <span className="pulse-dot" />
                            <span>{s.daysRemaining === 0 ? 'Expired' : s.status}</span>
                          </span>
                        </td>
                        <td>
                          <div className="admin-actions-cluster">
                            <button 
                              className="admin-btn-action btn-extend"
                              onClick={() => extendStudentPlan(s.id)}
                              title="Extend validity +30 days (Saved to Database)"
                              style={{ padding: '0.24rem 0.45rem', fontSize: '0.72rem' }}
                            >
                              <Clock size={11} />
                              <span>+30d</span>
                            </button>
                            <button 
                              className="admin-btn-action"
                              onClick={() => resetStudentPassword(s.id, s.name)}
                              title="Reset student password"
                              style={{ background: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0', padding: '0.24rem 0.45rem', fontSize: '0.72rem' }}
                            >
                              <Key size={11} />
                              <span>Reset</span>
                            </button>
                            <button 
                              className={`admin-btn-action ${s.status === 'Active' && s.daysRemaining > 0 ? 'btn-suspend' : 'btn-activate'}`}
                              onClick={() => toggleStudentStatus(s.id)}
                              title={s.status === 'Active' ? 'Suspend candidate account' : 'Activate candidate account'}
                              style={{ padding: '0.24rem 0.45rem', fontSize: '0.72rem' }}
                            >
                              {s.status === 'Active' && s.daysRemaining > 0 ? 'Suspend' : 'Activate'}
                            </button>
                            <button 
                              type="button"
                              className="admin-btn-action btn-delete"
                              onClick={() => deleteStudent(s.id, s.name)}
                              title={`Permanently remove ${s.name} from portal`}
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Candidate Pagination Controls */}
            {filteredStudents.length > 0 && (
              <div 
                className="admin-table-pagination" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  padding: '0.9rem 1.15rem',
                  marginTop: '0.85rem',
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.84rem', color: '#64748B' }}>
                  <span>
                    Showing <strong style={{ color: '#0F172A' }}>{candidateStartIndex + 1}–{candidateEndIndex}</strong> of <strong style={{ color: '#0F172A' }}>{filteredStudents.length}</strong> candidates
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem' }}>Rows per page:</span>
                    <select 
                      value={candidatePageSize}
                      onChange={(e) => {
                        setCandidatePageSize(Number(e.target.value));
                        setCandidatePage(1);
                      }}
                      style={{
                        padding: '0.28rem 0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#0F172A',
                        cursor: 'pointer'
                      }}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => setCandidatePage(prev => Math.max(prev - 1, 1))}
                    disabled={candidatePage <= 1}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                      background: candidatePage <= 1 ? '#F1F5F9' : '#FFFFFF',
                      color: candidatePage <= 1 ? '#94A3B8' : '#0F172A',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: candidatePage <= 1 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <ChevronLeft size={14} />
                    <span>Previous</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {Array.from({ length: candidateTotalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === candidateTotalPages || Math.abs(p - candidatePage) <= 1)
                      .reduce((acc, p, idx, arr) => {
                        if (idx > 0 && p - arr[idx - 1] > 1) {
                          acc.push(-1);
                        }
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, idx) => {
                        if (p === -1) {
                          return <span key={`ellipsis-${idx}`} style={{ padding: '0 4px', color: '#94A3B8', fontSize: '0.82rem' }}>...</span>;
                        }
                        const isActive = p === candidatePage;
                        return (
                          <button
                            key={`cand-page-${p}`}
                            type="button"
                            onClick={() => setCandidatePage(p)}
                            style={{
                              minWidth: '30px',
                              height: '30px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '6px',
                              border: isActive ? '1px solid #0F172A' : '1px solid #E2E8F0',
                              background: isActive ? '#0F172A' : '#FFFFFF',
                              color: isActive ? '#FFFFFF' : '#0F172A',
                              fontSize: '0.82rem',
                              fontWeight: isActive ? 700 : 500,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {p}
                          </button>
                        );
                      })
                    }
                  </div>

                  <button
                    type="button"
                    onClick={() => setCandidatePage(prev => Math.min(prev + 1, candidateTotalPages))}
                    disabled={candidatePage >= candidateTotalPages}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                      background: candidatePage >= candidateTotalPages ? '#F1F5F9' : '#FFFFFF',
                      color: candidatePage >= candidateTotalPages ? '#94A3B8' : '#0F172A',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: candidatePage >= candidateTotalPages ? 'not-allowed' : 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>Next</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Dictation & Test Vault Manager */}
        {activeTab === 'tests' && (
          <div className="saas-card admin-content-card">
            {/* Vault Type Sub-navigation Toggle */}
            <div className="vault-subnav-toggle">
              <button 
                type="button"
                className={`vault-subnav-btn ${vaultViewMode === 'audio' ? 'active' : ''}`}
                onClick={() => setVaultViewMode('audio')}
              >
                <Headphones size={15} />
                <span>Audio Dictations (Shorthand)</span>
                <span className="vault-subnav-badge">{tests.length}</span>
              </button>
              <button 
                type="button"
                className={`vault-subnav-btn typing-active ${vaultViewMode === 'typing' ? 'active' : ''}`}
                onClick={() => setVaultViewMode('typing')}
              >
                <Keyboard size={15} />
                <span>Typing Exercises (Text Only)</span>
                <span className="vault-subnav-badge">{typingTests.length}</span>
              </button>
            </div>

            {vaultViewMode === 'audio' ? (
              <>
                <div className="table-header-control-row">
                  <div>
                    <h3 className="section-title-sm">Official Studio Audio Dictation Library</h3>
                    <p className="section-sub-sm">Calibrated speeds (80, 100, 120, 140 WPM) with 5-min reading rooms & master transcripts.</p>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setNewTestModalOpen(true)}
                  >
                    <Plus size={15} />
                    <span>Upload New Audio Dictation</span>
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="corporate-table">
                    <thead>
                      <tr>
                        <th><div className="th-content"><Headphones size={13} /><span>Dictation Title</span></div></th>
                        <th><div className="th-content"><Award size={13} /><span>Category</span></div></th>
                        <th><div className="th-content"><Gauge size={13} /><span>Speed</span></div></th>
                        <th><div className="th-content"><Globe size={13} /><span>Language</span></div></th>
                        <th><div className="th-content"><Clock size={13} /><span>Words & Typing Duration</span></div></th>
                        <th><div className="th-content"><span>Status</span></div></th>
                        <th style={{ textAlign: 'right' }}><div className="th-content" style={{ justifyContent: 'flex-end' }}><span>Action</span></div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tests.map((t) => (
                        <tr key={`steno-test-${t.id}`}>
                          <td>
                            <div className="admin-dictation-cell">
                              <div className="dictation-audio-bubble">
                                <Headphones size={14} className="text-royal-blue" />
                              </div>
                              <div className="dictation-meta">
                                <span className="dictation-title-text">{t.title}</span>
                                <span className="dictation-id-sub">Ref Code: #{t.id}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="admin-exam-capsule">
                              {t.category}
                            </span>
                          </td>
                          <td>
                            <span className="admin-speed-badge font-mono">
                              {t.speed}
                            </span>
                          </td>
                          <td>
                            <span className="admin-lang-pill">
                              {t.language}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <strong className="font-mono text-slate-800 text-xs">{t.totalWords || 450} Words</strong>
                              <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>
                                ⏱ {t.typingDurationMins || 10} Mins Typing
                              </span>
                            </div>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleTogglePublish(t)}
                              style={{
                                background: (t.isPublished ?? 1) === 1 ? 'rgba(16, 185, 129, 0.08)' : '#F1F5F9',
                                color: (t.isPublished ?? 1) === 1 ? '#059669' : '#64748B',
                                border: (t.isPublished ?? 1) === 1 ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(0,0,0,0.1)',
                                padding: '3px 8px',
                                borderRadius: '999px',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              title={(t.isPublished ?? 1) === 1 ? "Published to students. Click to unpublish." : "Unpublished draft. Click to publish."}
                            >
                              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: (t.isPublished ?? 1) === 1 ? '#059669' : '#94A3B8' }} />
                              <span>{(t.isPublished ?? 1) === 1 ? 'Published' : 'Draft'}</span>
                            </button>
                          </td>
                          <td>
                            <div className="admin-actions-cluster">
                              <button 
                                className="admin-btn-action btn-preview"
                                onClick={() => onStartTest(t.id)}
                                title="Launch dictation test simulation"
                              >
                                <Play size={12} />
                                <span>Preview</span>
                              </button>
                              <button 
                                type="button"
                                className="admin-btn-action"
                                onClick={() => handleOpenAttempts(t)}
                                title="View candidate attempts and results"
                                style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.1)', color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                              >
                                <Users size={12} />
                                <span>Attempts</span>
                              </button>
                              <button 
                                type="button"
                                className="admin-btn-action"
                                onClick={() => handleOpenEditTest(t)}
                                title="Edit test information and duration"
                                style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.1)', color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                              >
                                <Edit3 size={12} />
                                <span>Edit</span>
                              </button>
                              <button 
                                type="button"
                                className="admin-btn-action btn-delete"
                                onClick={() => handleDeleteTest(t.id, t.title)}
                                title="Delete dictation from vault with confirmation"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="table-header-control-row">
                  <div>
                    <h3 className="section-title-sm">Official Text-Only Typing Exercise Library</h3>
                    <p className="section-sub-sm">Pure text benchmark passages for Court, SSC & Clerical on-screen typing speed drills (No audio required).</p>
                  </div>
                  <button 
                    className="btn btn-sm"
                    onClick={() => setNewTypingModalOpen(true)}
                    style={{ background: '#059669', color: '#FFFFFF', borderColor: '#059669', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700' }}
                  >
                    <Keyboard size={15} />
                    <span>Upload New Text Typing Test</span>
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="corporate-table">
                    <thead>
                      <tr>
                        <th><div className="th-content"><Keyboard size={13} /><span>Exercise Name</span></div></th>
                        <th><div className="th-content"><Award size={13} /><span>Target Authority</span></div></th>
                        <th><div className="th-content"><Gauge size={13} /><span>Target Speed</span></div></th>
                        <th><div className="th-content"><Globe size={13} /><span>Language</span></div></th>
                        <th><div className="th-content"><Clock size={13} /><span>Duration</span></div></th>
                        <th><div className="th-content"><FileText size={13} /><span>Words</span></div></th>
                        <th><div className="th-content"><span>Passage Excerpt</span></div></th>
                        <th style={{ textAlign: 'right' }}><div className="th-content" style={{ justifyContent: 'flex-end' }}><span>Action</span></div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {typingTests.map((t) => (
                        <tr key={`typing-test-${t.id}`}>
                          <td>
                            <div className="admin-dictation-cell">
                              <div className="dictation-audio-bubble" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                                <Keyboard size={14} style={{ color: '#059669' }} />
                              </div>
                              <div className="dictation-meta">
                                <span className="dictation-title-text">{t.name}</span>
                                <span className="dictation-id-sub">Ref ID: #{t.id} • {t.category || 'General Drill'}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="admin-exam-capsule">
                              {t.authority || 'High Court / SSC'}
                            </span>
                          </td>
                          <td>
                            <span className="admin-speed-badge font-mono" style={{ background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}>
                              {t.targetSpeed || '35 WPM'}
                            </span>
                          </td>
                          <td>
                            <span className="admin-lang-pill">
                              {t.language}
                            </span>
                          </td>
                          <td className="font-mono text-slate-600 font-semibold">{t.time}</td>
                          <td className="font-mono font-bold text-slate-700">{t.words}</td>
                          <td>
                            <span className="dictation-excerpt-text" title={t.passageText}>
                              {t.passageText ? t.passageText.slice(0, 80) + '...' : 'No excerpt'}
                            </span>
                          </td>
                          <td>
                            <div className="admin-actions-cluster">
                              <button 
                                className="admin-btn-action btn-preview"
                                onClick={() => {
                                  if (onStartTypingTest) {
                                    onStartTypingTest(t);
                                  } else {
                                    alert("Previewing test in typing view");
                                  }
                                }}
                                title="Launch test in Typing Studio"
                              >
                                <Play size={12} />
                                <span>Preview</span>
                              </button>
                              <button 
                                className="admin-btn-action btn-delete"
                                onClick={() => deleteTypingTest(t.id)}
                                title="Delete exercise from vault"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 3: Subscription & Revenue Logs */}
        {activeTab === 'finance' && (
          <div className="saas-card admin-content-card">
            <div className="table-header-control-row">
              <div>
                <h3 className="section-title-sm">Subscription Pass Transactions & UPI Logs</h3>
                <p className="section-sub-sm">All payments processed via UPI QR and direct gateway with instant activation.</p>
              </div>
              <div className="stat-pill-highlight font-mono">
                <span>Total Revenue: </span>
                <strong>₹{totalRevenue.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="table-responsive">
              <table className="corporate-table">
                <thead>
                  <tr>
                    <th><div className="th-content"><Key size={13} /><span>Txn ID</span></div></th>
                    <th><div className="th-content"><Users size={13} /><span>Candidate</span></div></th>
                    <th><div className="th-content"><span>Roll No</span></div></th>
                    <th><div className="th-content"><CreditCard size={13} /><span>Plan Activated</span></div></th>
                    <th><div className="th-content"><span>Amount</span></div></th>
                    <th><div className="th-content"><span>Payment Channel</span></div></th>
                    <th><div className="th-content"><Clock size={13} /><span>Date & Time</span></div></th>
                    <th><div className="th-content"><CheckCircle2 size={13} /><span>Verification</span></div></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((t) => (
                    <tr key={`txn-${t.id}`}>
                      <td><span className="admin-roll-capsule font-mono">{t.id}</span></td>
                      <td>
                        <div className="admin-user-cell">
                          <div className="admin-avatar-bubble avatar-sm">
                            {t.student.charAt(0)}
                          </div>
                          <span className="admin-user-fullname">{t.student}</span>
                        </div>
                      </td>
                      <td><span className="admin-roll-capsule">{t.rollNo}</span></td>
                      <td>
                        <span className={`admin-pass-chip ${getPassBadgeClass(t.plan)}`}>
                          <Crown size={11} />
                          <span>{t.plan}</span>
                        </span>
                      </td>
                      <td><span className="admin-revenue-amount font-mono">₹{t.amount}</span></td>
                      <td><span className="admin-exam-capsule">{t.mode}</span></td>
                      <td><span className="admin-date-text font-mono">{t.date}</span></td>
                      <td>
                        <span className="admin-status-indicator is-active">
                          <CheckCircle2 size={13} />
                          <span>{t.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Transactions Pagination Controls */}
            {transactions.length > 0 && (
              <div 
                className="admin-table-pagination" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  padding: '0.9rem 1.15rem',
                  marginTop: '0.85rem',
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.84rem', color: '#64748B' }}>
                  <span>
                    Showing <strong style={{ color: '#0F172A' }}>{txnStartIndex + 1}–{txnEndIndex}</strong> of <strong style={{ color: '#0F172A' }}>{transactions.length}</strong> transactions
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.8rem' }}>Rows per page:</span>
                    <select 
                      value={txnPageSize}
                      onChange={(e) => {
                        setTxnPageSize(Number(e.target.value));
                        setTxnPage(1);
                      }}
                      style={{
                        padding: '0.28rem 0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#0F172A',
                        cursor: 'pointer'
                      }}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => setTxnPage(prev => Math.max(prev - 1, 1))}
                    disabled={txnPage <= 1}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                      background: txnPage <= 1 ? '#F1F5F9' : '#FFFFFF',
                      color: txnPage <= 1 ? '#94A3B8' : '#0F172A',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: txnPage <= 1 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <ChevronLeft size={14} />
                    <span>Previous</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {Array.from({ length: txnTotalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === txnTotalPages || Math.abs(p - txnPage) <= 1)
                      .reduce((acc, p, idx, arr) => {
                        if (idx > 0 && p - arr[idx - 1] > 1) {
                          acc.push(-1);
                        }
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, idx) => {
                        if (p === -1) {
                          return <span key={`ellipsis-txn-${idx}`} style={{ padding: '0 4px', color: '#94A3B8', fontSize: '0.82rem' }}>...</span>;
                        }
                        const isActive = p === txnPage;
                        return (
                          <button
                            key={`txn-page-${p}`}
                            type="button"
                            onClick={() => setTxnPage(p)}
                            style={{
                              minWidth: '30px',
                              height: '30px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '6px',
                              border: isActive ? '1px solid #0F172A' : '1px solid #E2E8F0',
                              background: isActive ? '#0F172A' : '#FFFFFF',
                              color: isActive ? '#FFFFFF' : '#0F172A',
                              fontSize: '0.82rem',
                              fontWeight: isActive ? 700 : 500,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {p}
                          </button>
                        );
                      })
                    }
                  </div>

                  <button
                    type="button"
                    onClick={() => setTxnPage(prev => Math.min(prev + 1, txnTotalPages))}
                    disabled={txnPage >= txnTotalPages}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0',
                      background: txnPage >= txnTotalPages ? '#F1F5F9' : '#FFFFFF',
                      color: txnPage >= txnTotalPages ? '#94A3B8' : '#0F172A',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: txnPage >= txnTotalPages ? 'not-allowed' : 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>Next</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

                {/* TAB 4: Announcements & Diplomas */}
        {activeTab === 'announcements' && (
          <div className="saas-card admin-content-card" style={{ padding: '1.75rem 2rem' }}>
            
            {/* Header Control Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Megaphone size={20} color="#0F172A" />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                    Recruitment Bulletin & Govt Diploma Issuance
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#64748B', margin: 0 }}>
                  Publish real-time exam notifications, court vacancy alerts, and manage student DCA, ADCA & speed certificates.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button 
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setNewAlertModalOpen(true)}
                  style={{ background: '#0F172A', borderColor: '#0F172A', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px', padding: '0.55rem 1.15rem', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  <Plus size={15} />
                  <span>Publish New Exam Alert</span>
                </button>
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setNewDiplomaModalOpen(true)}
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#0F172A', display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '8px', padding: '0.55rem 1.15rem', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  <Award size={15} />
                  <span>Issue Student Diploma</span>
                </button>
              </div>
            </div>

            {/* Top 3 Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
              
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '14px', padding: '1.25rem 1.4rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <GraduationCap size={24} color="#10B981" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0, fontFamily: 'monospace' }}>
                      {diplomas.filter(d => d.program?.includes('DCA') && !d.program?.includes('ADCA')).length || 1}
                    </h4>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '999px' }}>
                      Govt Recognized
                    </span>
                  </div>
                  <p style={{ fontSize: '0.84rem', fontWeight: 600, color: '#334155', margin: '0 0 2px' }}>DCA Diplomas Issued</p>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>6-Month Fundamental Computer Syllabus</span>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '14px', padding: '1.25rem 1.4rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={24} color="#6366F1" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0, fontFamily: 'monospace' }}>
                      {diplomas.filter(d => d.program?.includes('ADCA')).length || 1}
                    </h4>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6366F1', background: 'rgba(99, 102, 241, 0.1)', padding: '2px 8px', borderRadius: '999px' }}>
                      ISO 9001 Valid
                    </span>
                  </div>
                  <p style={{ fontSize: '0.84rem', fontWeight: 600, color: '#334155', margin: '0 0 2px' }}>ADCA Diplomas Issued</p>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>1-Year Advance Applications & Tally Prime</span>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '14px', padding: '1.25rem 1.4rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(5, 150, 105, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={24} color="#059669" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <h4 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: 0, fontFamily: 'monospace' }}>
                      {diplomas.filter(d => d.program?.includes('Speed') || d.program?.includes('Shorthand')).length || diplomas.length}
                    </h4>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', background: 'rgba(5, 150, 105, 0.1)', padding: '2px 8px', borderRadius: '999px' }}>
                      SSC / Court Calibrated
                    </span>
                  </div>
                  <p style={{ fontSize: '0.84rem', fontWeight: 600, color: '#334155', margin: '0 0 2px' }}>Shorthand Speed Certificates</p>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>50–140 WPM Graded Pitman Benchmarks</span>
                </div>
              </div>

            </div>

            {/* Sub-Navigation & Filter Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', background: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setBulletinSubTab('alerts')}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: bulletinSubTab === 'alerts' ? '#0F172A' : 'transparent',
                    color: bulletinSubTab === 'alerts' ? '#FFFFFF' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Megaphone size={14} />
                  <span>Active Recruitment Bulletins ({examAlerts.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBulletinSubTab('diplomas')}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: bulletinSubTab === 'diplomas' ? '#0F172A' : 'transparent',
                    color: bulletinSubTab === 'diplomas' ? '#FFFFFF' : '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <GraduationCap size={14} />
                  <span>Issued Diplomas & Certificates ({diplomas.length})</span>
                </button>
              </div>

              <div style={{ position: 'relative', width: '280px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder={bulletinSubTab === 'alerts' ? "Search alerts by exam, dept..." : "Search by student name, roll no..."}
                  value={bulletinSearch}
                  onChange={(e) => setBulletinSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.45rem 0.75rem 0.45rem 2rem',
                    fontSize: '0.84rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    background: '#FFFFFF',
                    color: '#0F172A',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

            </div>

            {/* TAB CONTENT A: Recruitment Alerts */}
            {bulletinSubTab === 'alerts' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
                {filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: '14px',
                      padding: '1.35rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                      transition: 'transform 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#2563EB' }}>
                          {alert.dept}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {alert.urgent && (
                            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#DC2626', background: 'rgba(220, 38, 38, 0.08)', padding: '2px 6px', borderRadius: '4px' }}>
                              Urgent
                            </span>
                          )}
                          <span style={{ 
                            fontSize: '0.68rem', 
                            fontWeight: 700, 
                            color: alert.status === 'Live & Broadcasted' ? '#10B981' : '#64748B', 
                            background: alert.status === 'Live & Broadcasted' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(100, 116, 139, 0.08)', 
                            padding: '2px 8px', 
                            borderRadius: '999px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {alert.status === 'Live & Broadcasted' && (
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                            )}
                            {alert.status}
                          </span>
                        </div>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0 0 10px', lineHeight: 1.35 }}>
                        {alert.title}
                      </h4>

                      <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '10px 12px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '1rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Vacancies</span>
                          <strong style={{ fontSize: '0.82rem', color: '#0F172A' }}>{alert.posts}</strong>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Speed Req</span>
                          <strong style={{ fontSize: '0.82rem', color: '#2563EB' }}>{alert.speedReq}</strong>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Deadline</span>
                          <strong style={{ fontSize: '0.82rem', color: '#0F172A' }}>{alert.deadline}</strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <a 
                        href={alert.link} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', textDecoration: 'none' }}
                      >
                        <span>Official Notice</span>
                        <ExternalLink size={12} />
                      </a>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleAlertLive(alert.id)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            border: '1px solid rgba(0,0,0,0.1)',
                            background: alert.status === 'Live & Broadcasted' ? '#FFFFFF' : '#0F172A',
                            color: alert.status === 'Live & Broadcasted' ? '#0F172A' : '#FFFFFF'
                          }}
                        >
                          {alert.status === 'Live & Broadcasted' ? 'Pause' : 'Broadcast'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAlert(alert.id)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid rgba(220, 38, 38, 0.2)',
                            background: '#FFFFFF',
                            color: '#DC2626',
                            cursor: 'pointer'
                          }}
                          title="Delete alert"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT B: Issued Diplomas Table */}
            {bulletinSubTab === 'diplomas' && (
              <div className="table-responsive">
                <table className="corporate-table">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-content">
                          <Key size={13} />
                          <span>Cert ID / Roll No</span>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          <Users size={13} />
                          <span>Candidate Name</span>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          <Award size={13} />
                          <span>Program & Course</span>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          <ShieldCheck size={13} />
                          <span>Grade & Benchmark</span>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          <Calendar size={13} />
                          <span>Issue Date</span>
                        </div>
                      </th>
                      <th>
                        <div className="th-content">
                          <CheckCircle2 size={13} />
                          <span>Dispatch Status</span>
                        </div>
                      </th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDiplomas.map((dip) => (
                      <tr key={dip.id}>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0F172A' }}>{dip.id}</span>
                          <span style={{ display: 'block', fontSize: '0.74rem', color: '#64748B' }}>{dip.rollNo}</span>
                        </td>
                        <td>
                          <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>{dip.studentName}</strong>
                          <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748B' }}>Signed: {dip.authBy}</span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#334155' }}>{dip.program}</span>
                        </td>
                        <td>
                          <span style={{ 
                            fontSize: '0.76rem', 
                            fontWeight: 700, 
                            color: dip.grade.includes('A+') ? '#059669' : '#2563EB',
                            background: dip.grade.includes('A+') ? 'rgba(5, 150, 105, 0.08)' : 'rgba(37, 99, 235, 0.08)',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {dip.grade}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.82rem', color: '#64748B' }}>{dip.issueDate}</span>
                        </td>
                        <td>
                          <span style={{ 
                            fontSize: '0.76rem', 
                            fontWeight: 700, 
                            color: dip.dispatchStatus.includes('Verified') ? '#10B981' : '#F59E0B',
                            background: dip.dispatchStatus.includes('Verified') ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                            padding: '3px 8px',
                            borderRadius: '999px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dip.dispatchStatus.includes('Verified') ? '#10B981' : '#F59E0B' }} />
                            {dip.dispatchStatus}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={() => handleDownloadDiploma(dip)}
                              style={{
                                padding: '5px 10px',
                                borderRadius: '6px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                background: '#FFFFFF',
                                color: '#0F172A',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              title="Download verified diploma certificate"
                            >
                              <Download size={12} />
                              <span>Certificate</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteDiploma(dip.id)}
                              style={{
                                padding: '5px 8px',
                                borderRadius: '6px',
                                border: '1px solid rgba(220, 38, 38, 0.2)',
                                background: '#FFFFFF',
                                color: '#DC2626',
                                cursor: 'pointer'
                              }}
                              title="Delete record"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}


        {/* TAB 5: Live Online Classes & Zoom Studio Management */}
        {activeTab === 'classes' && (
          <div className="saas-card admin-content-card">
            
            {/* 1. Executive Studio Header Command Bar */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
              flexWrap: 'wrap',
              marginBottom: '1.25rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem', flex: 1, minWidth: '320px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: onlineClasses.some(c => c.isLive) ? 'linear-gradient(135deg, #E11D48, #BE123C)' : 'linear-gradient(135deg, #0F172A, #334155)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  flexShrink: 0,
                  boxShadow: onlineClasses.some(c => c.isLive) ? '0 4px 14px rgba(225, 29, 72, 0.25)' : '0 4px 14px rgba(15, 23, 42, 0.15)'
                }}>
                  <Radio size={22} color="#FFFFFF" />
                  {onlineClasses.some(c => c.isLive) && (
                    <span style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      width: '12px',
                      height: '12px',
                      background: '#10B981',
                      border: '2px solid #FFFFFF',
                      borderRadius: '50%'
                    }} />
                  )}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.25 }}>
                      Live Online Zoom Batches & Dictation Studio
                    </h3>
                    {onlineClasses.some(c => c.isLive) ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#DC2626',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626' }} />
                        <span>{onlineClasses.filter(c => c.isLive).length} Class Live On-Air</span>
                      </span>
                    ) : (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        background: '#F1F5F9',
                        border: '1px solid rgba(0,0,0,0.06)',
                        color: '#64748B',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}>
                        <Clock size={11} />
                        <span>All Studios Standby</span>
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0.25rem 0 0', lineHeight: 1.45, maxWidth: '680px' }}>
                    Schedule, broadcast, and orchestrate real-time Zoom video classrooms. Any class marked "Live" is instantly pushed to candidate portals with 1-click joining.
                  </p>
                </div>
              </div>

              {/* Studio Action Suite */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button 
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '40px',
                    padding: '0 1.1rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    background: isBroadcastingNotice ? '#FEF3C7' : '#FFFFFF',
                    border: isBroadcastingNotice ? '1px solid #F59E0B' : '1px solid rgba(217, 119, 6, 0.3)',
                    color: '#B45309'
                  }}
                  onClick={() => setIsBroadcastingNotice(!isBroadcastingNotice)}
                  title="Broadcast a live announcement ticker to all student dashboards"
                >
                  <Megaphone size={14} className="text-amber-600" />
                  <span>{isBroadcastingNotice ? 'Close Notice Form' : 'Broadcast Notice'}</span>
                </button>

                <button 
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '40px',
                    padding: '0 1.1rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    background: '#FFFFFF',
                    border: '1px solid rgba(225, 29, 72, 0.3)',
                    color: '#E11D48'
                  }}
                  onClick={handleQuickStartLive}
                  title="Instantly launch an impromptu live broadcast on Zoom"
                >
                  <Zap size={14} className="fill-rose-500 text-rose-500" />
                  <span>Instant Live Class</span>
                </button>

                <button 
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '40px',
                    padding: '0 1.25rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    background: '#0F172A',
                    border: '1px solid #0F172A',
                    color: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.18)'
                  }}
                  onClick={() => {
                    loadClassTemplate('ssc80');
                    setNewClassModalOpen(true);
                  }}
                  title="Schedule and configure a new Zoom online class batch"
                >
                  <Plus size={15} />
                  <span>Schedule Live Online Class</span>
                </button>
              </div>
            </div>

            {/* Broadcast Live Notice Composer (Expandable) */}
            {isBroadcastingNotice && (
              <form onSubmit={handlePostNotice} style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '14px', padding: '1.25rem', marginTop: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Megaphone size={16} className="text-amber-600" />
                    <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#92400E' }}>Broadcast Instant Alert to All Online Candidates</span>
                  </div>
                  <button 
                    type="button" 
                    style={{ background: 'transparent', border: 'none', color: '#B45309', cursor: 'pointer', padding: '4px' }}
                    onClick={() => setIsBroadcastingNotice(false)}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div>
                  <input 
                    type="text" 
                    style={{ width: '100%', background: '#FFFFFF', border: '1px solid #F59E0B', borderRadius: '8px', padding: '0.65rem 1rem', fontSize: '0.85rem', color: '#0F172A', boxSizing: 'border-box' }}
                    placeholder="e.g. 📢 Attention Aspirants: SSC 80 WPM Parliamentary dictation begins in 5 mins. Keep shorthand pads ready!"
                    value={broadcastNoticeText}
                    onChange={(e) => setBroadcastNoticeText(e.target.value)}
                    required
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.75rem' }}>
                    <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#D97706', border: '1px solid #D97706', color: '#FFFFFF', padding: '0.45rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                      <Send size={13} />
                      <span>Publish Banner to Students</span>
                    </button>
                    <button type="button" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.1)', color: '#475569', padding: '0.45rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => setIsBroadcastingNotice(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Active Live Notice Banner Display (if set) */}
            {activeBroadcastNotice && (
              <div style={{
                background: '#FEF2F2',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '12px',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                marginTop: '1rem',
                marginBottom: '1.25rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: '#DC2626',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.5px'
                  }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFFFFF' }} />
                    <span>STUDENT ALERT ACTIVE</span>
                  </span>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#991B1B', fontWeight: 600, lineHeight: 1.4 }}>
                    {activeBroadcastNotice}
                  </p>
                </div>
                <button 
                  type="button" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#DC2626',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                  onClick={handleClearNotice}
                  title="Clear notice banner for students"
                >
                  <Trash2 size={13} />
                  <span>Clear Notice</span>
                </button>
              </div>
            )}

            {/* 4 Executive KPI Studio Telemetry Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '1rem',
              marginTop: '1.25rem',
              marginBottom: '1.25rem'
            }}>
              {/* Card 1: Live Broadcasts */}
              <div style={{
                background: '#FFFFFF',
                border: onlineClasses.some(c => c.isLive) ? '1px solid rgba(225, 29, 72, 0.3)' : '1px solid rgba(0,0,0,0.07)',
                borderRadius: '14px',
                padding: '1.15rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(225, 29, 72, 0.08)',
                  color: '#E11D48',
                  border: '1px solid rgba(225, 29, 72, 0.15)',
                  flexShrink: 0
                }}>
                  <Radio size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748B', fontWeight: 700 }}>
                    Live Broadcasts
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '2px 0' }}>
                    <strong style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                      {onlineClasses.filter(c => c.isLive).length} On-Air
                    </strong>
                    {onlineClasses.some(c => c.isLive) && (
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                    )}
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: onlineClasses.some(c => c.isLive) ? '#DC2626' : '#64748B' }}>
                    {onlineClasses.some(c => c.isLive) ? 'Pulsing live call active' : 'All studios on standby'}
                  </span>
                </div>
              </div>

              {/* Card 2: Total Batches */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '14px',
                padding: '1.15rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(245, 158, 11, 0.08)',
                  color: '#D97706',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  flexShrink: 0
                }}>
                  <Calendar size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748B', fontWeight: 700 }}>
                    Total Batches
                  </span>
                  <div style={{ margin: '2px 0' }}>
                    <strong style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                      {onlineClasses.length} Scheduled
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B' }}>
                    Covering 6:00 AM – 7:30 PM
                  </span>
                </div>
              </div>

              {/* Card 3: Enrolled Students */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '14px',
                padding: '1.15rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(16, 185, 129, 0.08)',
                  color: '#059669',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  flexShrink: 0
                }}>
                  <Users size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748B', fontWeight: 700 }}>
                    Enrolled Students
                  </span>
                  <div style={{ margin: '2px 0' }}>
                    <strong style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                      {onlineClasses.reduce((acc, c) => acc + (c.attendees || 1), 0)} Aspirants
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#059669' }}>
                    Active zoom learners
                  </span>
                </div>
              </div>

              {/* Card 4: Student Sync Engine */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: '14px',
                padding: '1.15rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(147, 51, 234, 0.08)',
                  color: '#7C3AED',
                  border: '1px solid rgba(147, 51, 234, 0.2)',
                  flexShrink: 0
                }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748B', fontWeight: 700 }}>
                    Student Sync Engine
                  </span>
                  <div style={{ margin: '2px 0' }}>
                    <strong style={{ fontSize: '1.35rem', fontWeight: 800, color: '#059669', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                      ✓ 100% Active
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#64748B' }}>
                    Instant push to candidate app
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Pills, Search Bar & View Mode Switcher */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '14px',
              padding: '0.65rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <button 
                  type="button" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    background: classFilterStatus === 'all' ? '#0F172A' : '#FFFFFF',
                    color: classFilterStatus === 'all' ? '#FFFFFF' : '#475569',
                    boxShadow: classFilterStatus === 'all' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  onClick={() => setClassFilterStatus('all')}
                >
                  <span>All Classes</span>
                  <span style={{
                    padding: '1px 6px',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    background: classFilterStatus === 'all' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)'
                  }}>
                    {onlineClasses.length}
                  </span>
                </button>
                <button 
                  type="button" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    background: classFilterStatus === 'live' ? '#DC2626' : '#FFFFFF',
                    color: classFilterStatus === 'live' ? '#FFFFFF' : '#475569',
                    boxShadow: classFilterStatus === 'live' ? '0 1px 3px rgba(220,38,38,0.2)' : 'none'
                  }}
                  onClick={() => setClassFilterStatus('live')}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: classFilterStatus === 'live' ? '#FFFFFF' : '#DC2626' }} />
                  <span>Live Now</span>
                  <span style={{
                    padding: '1px 6px',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    background: classFilterStatus === 'live' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)'
                  }}>
                    {onlineClasses.filter(c => c.isLive).length}
                  </span>
                </button>
                <button 
                  type="button" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    background: classFilterStatus === 'upcoming' ? '#0F172A' : '#FFFFFF',
                    color: classFilterStatus === 'upcoming' ? '#FFFFFF' : '#475569',
                    boxShadow: classFilterStatus === 'upcoming' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  onClick={() => setClassFilterStatus('upcoming')}
                >
                  <span>Upcoming Scheduled</span>
                  <span style={{
                    padding: '1px 6px',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    background: classFilterStatus === 'upcoming' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)'
                  }}>
                    {onlineClasses.filter(c => !c.isLive && c.badgeClass !== 'badge-replay').length}
                  </span>
                </button>
                <button 
                  type="button" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    background: classFilterStatus === 'replays' ? '#0F172A' : '#FFFFFF',
                    color: classFilterStatus === 'replays' ? '#FFFFFF' : '#475569',
                    boxShadow: classFilterStatus === 'replays' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                  onClick={() => setClassFilterStatus('replays')}
                >
                  <span>Archives & Replays</span>
                  <span style={{
                    padding: '1px 6px',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    background: classFilterStatus === 'replays' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)'
                  }}>
                    {onlineClasses.filter(c => c.badgeClass === 'badge-replay').length}
                  </span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {/* Search Box */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  width: '260px'
                }}>
                  <Search size={14} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search batch, instructor, room..."
                    value={classSearchQuery}
                    onChange={(e) => setClassSearchQuery(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8rem', width: '100%' }}
                  />
                  {classSearchQuery && (
                    <button type="button" onClick={() => setClassSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* View Mode Toggle: Grid vs Timetable */}
                <div style={{ display: 'flex', background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', padding: '2px' }}>
                  <button 
                    type="button" 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      background: classViewMode === 'grid' ? '#0F172A' : 'transparent',
                      color: classViewMode === 'grid' ? '#FFFFFF' : '#64748B'
                    }}
                    onClick={() => setClassViewMode('grid')}
                    title="Grid Card View"
                  >
                    <LayoutGrid size={13} />
                    <span>Cards</span>
                  </button>
                  <button 
                    type="button" 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      background: classViewMode === 'timetable' ? '#0F172A' : 'transparent',
                      color: classViewMode === 'timetable' ? '#FFFFFF' : '#64748B'
                    }}
                    onClick={() => setClassViewMode('timetable')}
                    title="Daily Timetable Table View"
                  >
                    <Calendar size={13} />
                    <span>Timetable</span>
                  </button>
                </div>
              </div>
            </div>

            {/* VIEW A: Class Cards Grid */}
            {classViewMode === 'grid' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '1.25rem',
                marginTop: '1.25rem'
              }}>
                {filteredOnlineClasses.map((item) => (
                  <div key={item.id} style={{
                    background: '#FFFFFF',
                    border: item.isLive ? '1.5px solid rgba(225, 29, 72, 0.4)' : '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '16px',
                    padding: '1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: item.isLive ? '0 4px 20px rgba(225, 29, 72, 0.08)' : '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'all 0.15s ease'
                  }}>
                    {/* Top Status & Tools Bar */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div>
                          {item.isLive ? (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '3px 10px',
                              borderRadius: '999px',
                              background: 'rgba(225, 29, 72, 0.08)',
                              border: '1px solid rgba(225, 29, 72, 0.25)',
                              color: '#E11D48',
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em'
                            }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E11D48' }} />
                              <span>LIVE NOW ON ZOOM</span>
                            </span>
                          ) : item.badgeClass === 'badge-replay' ? (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '3px 10px',
                              borderRadius: '999px',
                              background: 'rgba(100, 116, 139, 0.08)',
                              border: '1px solid rgba(0,0,0,0.06)',
                              color: '#475569',
                              fontSize: '0.7rem',
                              fontWeight: 700
                            }}>
                              <span>RECORDED ARCHIVE</span>
                            </span>
                          ) : (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '3px 10px',
                              borderRadius: '999px',
                              background: '#F1F5F9',
                              border: '1px solid rgba(0,0,0,0.06)',
                              color: '#0F172A',
                              fontSize: '0.7rem',
                              fontWeight: 700
                            }}>
                              <Clock size={11} />
                              <span>SCHEDULED</span>
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <button 
                            type="button"
                            style={{
                              background: '#F8FAFC',
                              border: '1px solid rgba(0,0,0,0.08)',
                              borderRadius: '6px',
                              padding: '5px 7px',
                              cursor: 'pointer',
                              color: '#475569',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onClick={() => handleCopyClassInvite(item)}
                            title="Copy Full Zoom Invite text"
                          >
                            {copiedClassId === item.id ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                          </button>
                          <button 
                            type="button"
                            style={{
                              background: '#F8FAFC',
                              border: '1px solid rgba(0,0,0,0.08)',
                              borderRadius: '6px',
                              padding: '5px 7px',
                              cursor: 'pointer',
                              color: '#475569',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onClick={() => setEditingClass({ ...item })}
                            title="Edit this class details"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button 
                            type="button"
                            style={{
                              background: '#FEF2F2',
                              border: '1px solid rgba(220, 38, 38, 0.2)',
                              borderRadius: '6px',
                              padding: '5px 7px',
                              cursor: 'pointer',
                              color: '#DC2626',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onClick={() => {
                              if (confirm(`Delete online class "${item.title}"?`)) {
                                if (onDeleteOnlineClass) onDeleteOnlineClass(item.id);
                              }
                            }}
                            title="Delete this class"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Card Title & Meta Badges */}
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.35, margin: '0 0 0.65rem' }}>
                        {item.title}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                        <span style={{ background: '#F1F5F9', color: '#334155', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                          {item.shift}
                        </span>
                        <span style={{ background: 'rgba(37, 99, 235, 0.08)', color: '#2563EB', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                          {item.speed}
                        </span>
                        <span style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.06)', color: '#64748B', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600 }}>
                          {item.roomNo}
                        </span>
                      </div>

                      {/* Faculty & Schedule Timing Bar */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        background: '#F8FAFC',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.05)',
                        marginBottom: '0.85rem'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: '#0F172A',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          flexShrink: 0
                        }}>
                          {item.instructor.split(' ').map(n => n[0]).join('').slice(0, 2) || 'GS'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: 'block', fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>
                            {item.instructor}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#64748B' }}>
                            <span><Clock size={10} className="inline mr-1 text-slate-400" />{item.time}</span>
                            <span>•</span>
                            <span style={{ fontWeight: 600, color: '#334155' }}>{item.attendees || 1} Aspirants</span>
                          </div>
                        </div>
                      </div>

                      {/* Zoom Credentials Strip */}
                      <div style={{
                        background: '#F8FAFC',
                        border: '1px solid rgba(0,0,0,0.06)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        display: 'grid',
                        gridTemplateColumns: '1.4fr 1fr auto',
                        gap: '8px',
                        alignItems: 'center',
                        marginBottom: '0.85rem'
                      }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748B' }}>Meeting ID</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <strong style={{ fontSize: '0.78rem', color: '#0F172A', fontFamily: 'monospace' }}>{item.zoomMeetingId}</strong>
                            <button 
                              type="button" 
                              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px', color: '#64748B' }}
                              onClick={() => {
                                navigator.clipboard.writeText(item.zoomMeetingId);
                                setCopiedClassId(`id-${item.id}`);
                                setTimeout(() => setCopiedClassId(null), 2000);
                              }}
                              title="Copy Meeting ID"
                            >
                              {copiedClassId === `id-${item.id}` ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748B' }}>Passcode</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <strong style={{ fontSize: '0.78rem', color: '#0F172A', fontFamily: 'monospace' }}>{item.zoomPasscode}</strong>
                            <button 
                              type="button" 
                              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px', color: '#64748B' }}
                              onClick={() => {
                                navigator.clipboard.writeText(item.zoomPasscode);
                                setCopiedClassId(`pwd-${item.id}`);
                                setTimeout(() => setCopiedClassId(null), 2000);
                              }}
                              title="Copy Passcode"
                            >
                              {copiedClassId === `pwd-${item.id}` ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <a 
                            href={item.zoomAppUrl || `zoommtg://zoom.us/join?confno=${item.zoomMeetingId.replace(/\s+/g, '')}&pwd=${item.zoomPasscode}`}
                            target="_blank" 
                            rel="noreferrer" 
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '3px',
                              background: '#0F172A',
                              color: '#FFFFFF',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                            title="Open in Zoom Desktop App"
                          >
                            <span>Open</span>
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>

                      {/* Topic Box */}
                      <div style={{
                        background: '#FFFFFF',
                        border: '1px solid rgba(0,0,0,0.06)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        marginBottom: '1rem'
                      }}>
                        <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94A3B8', marginBottom: '2px' }}>
                          TODAY'S DICTATION TOPIC
                        </span>
                        <strong style={{ display: 'block', fontSize: '0.82rem', color: '#0F172A', lineHeight: 1.35 }}>
                          {item.todayTopic}
                        </strong>
                        {item.passageSnippet && (
                          <p style={{ margin: '4px 0 0', fontSize: '0.72rem', color: '#64748B', fontStyle: 'italic', lineHeight: 1.35 }}>
                            "{item.passageSnippet.slice(0, 95)}..."
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <button 
                        type="button"
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          background: item.isLive ? '#FEF2F2' : '#FFFFFF',
                          border: item.isLive ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid rgba(37, 99, 235, 0.3)',
                          color: item.isLive ? '#DC2626' : '#2563EB'
                        }}
                        onClick={() => {
                          if (onToggleLiveOnlineClass) onToggleLiveOnlineClass(item.id);
                        }}
                        title={item.isLive ? "End live broadcast" : "Start live broadcast on Zoom"}
                      >
                        {item.isLive ? (
                          <>
                            <Square size={13} />
                            <span>End Session</span>
                          </>
                        ) : (
                          <>
                            <Radio size={13} className="text-rose-600" />
                            <span>Go Live Now</span>
                          </>
                        )}
                      </button>

                      <button 
                        type="button"
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          background: '#0F172A',
                          border: '1px solid #0F172A',
                          color: '#FFFFFF'
                        }}
                        onClick={() => {
                          if (onJoinClassAsAdmin) onJoinClassAsAdmin(item.id);
                          else setCurrentTab('online-classes');
                        }}
                        title="View Class Join Page"
                      >
                        <Eye size={13} />
                        <span>View Class Page</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW B: Timetable Schedule Matrix View */}
            {classViewMode === 'timetable' && (
              <div className="admin-timetable-table-wrap mt-3">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Shift & Timing</th>
                      <th>Batch Title & Speed</th>
                      <th>Dictation Topic</th>
                      <th>Meeting Credentials</th>
                      <th>Faculty & Studio</th>
                      <th>Live Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOnlineClasses.map((item) => (
                      <tr key={item.id} className={item.isLive ? 'row-live-highlight' : ''}>
                        <td>
                          <div className="timetable-shift-col">
                            <strong>{item.shift}</strong>
                            <span className="text-xs text-muted font-mono">{item.time}</span>
                          </div>
                        </td>
                        <td>
                          <div className="timetable-title-col">
                            <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                            <span className="badge-speed-pill font-mono">{item.speed}</span>
                          </div>
                        </td>
                        <td>
                          <span className="text-xs text-slate-700">{item.todayTopic}</span>
                        </td>
                        <td>
                          <div className="font-mono text-xs">
                            <div>ID: <strong>{item.zoomMeetingId}</strong></div>
                            <div className="text-muted">Pass: <strong>{item.zoomPasscode}</strong></div>
                          </div>
                        </td>
                        <td>
                          <div className="text-xs">
                            <strong className="text-slate-800">{item.instructor}</strong>
                            <div className="text-muted">{item.roomNo}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`card-status-pill ${item.badgeClass}`}>
                            {item.isLive && <span className="live-dot-mini" />}
                            {item.isLive ? 'LIVE' : item.badgeClass === 'badge-replay' ? 'Replay' : 'Upcoming'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="flex items-center justify-end gap-1">
                            <button 
                              type="button"
                              className={`btn-tbl-action ${item.isLive ? 'tbl-stop' : 'tbl-start'}`}
                              onClick={() => {
                                if (onToggleLiveOnlineClass) onToggleLiveOnlineClass(item.id);
                              }}
                              title={item.isLive ? "Stop live" : "Start live"}
                            >
                              {item.isLive ? <Square size={12} /> : <Radio size={12} />}
                              <span>{item.isLive ? 'Stop' : 'Go Live'}</span>
                            </button>

                            <button 
                              type="button" 
                              className="btn-tbl-action tbl-enter"
                              onClick={() => {
                                if (onJoinClassAsAdmin) onJoinClassAsAdmin(item.id);
                                else setCurrentTab('online-classes');
                              }}
                              title="View Class Page"
                            >
                              <Eye size={12} />
                            </button>

                            <button 
                              type="button" 
                              className="btn-tbl-action"
                              onClick={() => handleCopyClassInvite(item)}
                              title="Copy Invite"
                            >
                              <Copy size={12} />
                            </button>

                            <button 
                              type="button" 
                              className="btn-tbl-action text-rose-600"
                              onClick={() => {
                                if (confirm(`Delete online class "${item.title}"?`)) {
                                  if (onDeleteOnlineClass) onDeleteOnlineClass(item.id);
                                }
                              }}
                              title="Delete Class"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

        {/* TAB: Course Catalog & Examination Batches Management */}
        {activeTab === 'courses' && (
          <div className="saas-card admin-content-card">
            
            {/* Top Header Control Row */}
            <div className="table-header-control-row">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="section-title-sm">Academy Courses & Examination Batches</h3>
                  <span className="badge badge-blue">
                    {coursesList.length} Active Published Programs
                  </span>
                </div>
                <p className="section-sub-sm">
                  Publish, modify, and manage institutional curriculum displayed to candidates on the public Courses page. Any changes or new batches automatically sync with the enrollment and checkout flow.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCurrentTab('courses')}
                  title="View how candidates see the course page"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Eye size={14} />
                  <span>View Public Page</span>
                </button>

                <button 
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleOpenAddCourse}
                  style={{ background: '#0F172A', borderColor: '#0F172A', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700' }}
                >
                  <Plus size={15} />
                  <span>+ Add New Course Batch</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="search-filter-pair mt-2" style={{ maxWidth: '100%' }}>
              <div className="admin-search-box" style={{ flex: '1 1 320px' }}>
                <Search size={15} className="text-muted" />
                <input 
                  type="text" 
                  placeholder="Search courses by name, category, or speed target..."
                  value={courseSearchQuery}
                  onChange={(e) => setCourseSearchQuery(e.target.value)}
                />
                {courseSearchQuery && (
                  <button 
                    type="button" 
                    onClick={() => setCourseSearchQuery('')} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="admin-filter-select-wrapper" style={{ minWidth: '220px' }}>
                <CustomSelect
                  value={courseFilterCategory}
                  onChange={(val) => setCourseFilterCategory(val)}
                  options={[
                    { value: 'All', label: 'All Categories' },
                    { value: 'Foundation', label: 'Foundation (Pitman)' },
                    { value: 'Judicial Bench', label: 'Judicial Bench (Court)' },
                    { value: 'Central Govt', label: 'Central Govt (SSC)' },
                    { value: 'Govt Diplomas', label: 'Govt Diplomas (DCA/ADCA)' },
                    { value: 'State Exams', label: 'State & Police Exams' }
                  ]}
                />
              </div>

              <span className="text-xs text-muted font-mono" style={{ whiteSpace: 'nowrap' }}>
                Showing {filteredCoursesList.length} of {coursesList.length} courses
              </span>
            </div>

            {/* Courses Cards Grid */}
            {filteredCoursesList.length === 0 ? (
              <div className="table-empty-state" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
                <GraduationCap size={40} className="text-stone-400 mx-auto mb-2" />
                <h4 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>No Courses Found</h4>
                <p style={{ color: '#78716c', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                  No course matched your filter criteria. Try clearing the search or add a new course batch.
                </p>
                <button 
                  type="button" 
                  className="btn btn-primary btn-sm" 
                  onClick={handleOpenAddCourse}
                  style={{ background: '#0F172A', borderColor: '#0F172A', color: '#FFFFFF' }}
                >
                  <Plus size={14} />
                  <span>Create New Course</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem', marginTop: '0.5rem' }}>
                {filteredCoursesList.map((course) => (
                  <div 
                    key={course.id}
                    style={{
                      background: '#FFFFFF',
                      border: course.popular ? '1.5px solid #d6d3d1' : '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '16px',
                      padding: '1.4rem',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      boxShadow: course.popular ? '0 10px 25px -5px rgba(28, 25, 23, 0.08)' : '0 4px 12px -2px rgba(28, 25, 23, 0.03)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {course.popular && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: '#0F172A',
                        color: '#FFFFFF',
                        fontSize: '0.68rem',
                        fontWeight: '800',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.04em'
                      }}>
                        ⭐ FLAGSHIP BATCH
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                      <span className={`badge ${course.tagColor || 'badge-amber'}`} style={{ fontSize: '0.72rem' }}>
                        {course.badge || course.category}
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0F172A', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        {course.speedTarget}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                      {course.title}
                    </h4>

                    <p style={{ fontSize: '0.825rem', color: '#57534e', lineHeight: 1.45, marginBottom: '0.85rem', flex: '1 0 auto' }}>
                      {course.description}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '0.75rem 0.85rem', borderRadius: '10px', marginBottom: '0.9rem', fontSize: '0.78rem', color: '#44403c' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <Clock size={13} style={{ color: '#78716c' }} />
                        <span><strong>Duration:</strong> {course.duration}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <GraduationCap size={13} style={{ color: '#78716c' }} />
                        <span><strong>Mode:</strong> {course.mode}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <CreditCard size={13} style={{ color: '#047857' }} />
                        <span><strong>Fee:</strong> <strong className="font-mono" style={{ color: '#047857', fontSize: '0.875rem' }}>{course.fee}</strong></span>
                      </div>
                    </div>

                    {/* Syllabus snippet */}
                    {Array.isArray(course.syllabus) && course.syllabus.length > 0 && (
                      <div style={{ marginBottom: '1rem', borderTop: '1px dashed rgba(0, 0, 0, 0.08)', paddingTop: '0.65rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Curriculum Highlights ({course.syllabus.length} Topics):
                        </span>
                        <ul style={{ margin: '0.4rem 0 0 0', paddingLeft: '1.1rem', fontSize: '0.75rem', color: '#57534e', lineHeight: 1.4 }}>
                          {course.syllabus.slice(0, 3).map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '0.2rem' }}>{item}</li>
                          ))}
                          {course.syllabus.length > 3 && (
                            <li style={{ color: '#0F172A', fontWeight: '600', listStyle: 'none', marginLeft: '-1.1rem', marginTop: '0.2rem' }}>
                              +{course.syllabus.length - 3} more curriculum topics included
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Actions Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button 
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenEditCourse(course)}
                          title="Edit course details, fee or syllabus"
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>
                        <button 
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleDeleteCourseClick(course.id, course.title)}
                          title="Delete course from catalog"
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.55rem', color: '#e11d48' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <button 
                        type="button"
                        className="btn btn-sm"
                        onClick={() => setCurrentTab('courses')}
                        style={{ background: '#FFFFFF', color: '#0F172A', fontSize: '0.75rem', padding: '0.35rem 0.65rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', border: '1px solid rgba(0, 0, 0, 0.08)' }}
                        title="View on candidate course enrollment page"
                      >
                        <span>Preview</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </div>

      {/* MODAL 1: Upload New Dictation Test */}
      {newTestModalOpen && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide">
            {/* Hidden audio element for preview playback */}
            <audio 
              ref={audioPlayerRef} 
              src={audioUrl} 
              onEnded={handleAudioEnded}
              style={{ display: 'none' }}
            />

            <div className="modal-header">
              <div className="modal-title-wrap">
                <div className="modal-icon-squircle bg-amber-50">
                  <Headphones size={22} className="text-amber-700" />
                </div>
                <div>
                  <h3 className="modal-main-title">Upload New Studio Dictation Audio Test</h3>
                  <p className="modal-sub-title">Calibrate voice audio recording with master shorthand transcript for automated diff evaluation</p>
                </div>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => {
                  if (isPlayingPreview && audioPlayerRef.current) audioPlayerRef.current.pause();
                  setIsPlayingPreview(false);
                  stopRecording();
                  setNewTestModalOpen(false);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="admin-modal-form-wrapper">
              <div className="admin-modal-scrollable-body">
                {/* Dictation Title */}
              <div className="form-group-field">
                <label className="field-label">Dictation Test Title</label>
                <input 
                  type="text"
                  className="field-input"
                  placeholder="e.g. Patna High Court Bench Judgment - Criminal Appeal 419"
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  required
                />
              </div>

              {/* Category & Speed */}
              <div className="grid-2-fields">
                <div className="form-group-field">
                  <label className="field-label">Target Examination Category</label>
                  <CustomSelect 
                    value={testCategory}
                    onChange={(val) => setTestCategory(val)}
                    options={[
                      { value: 'SSC Steno Grade C & D', label: 'SSC Steno Grade C & D' },
                      { value: 'Patna High Court', label: 'Patna High Court' },
                      { value: 'Jharkhand High Court', label: 'Jharkhand High Court' },
                      { value: 'Parliament Reporter', label: 'Parliament Reporter' },
                      { value: 'Civil Court Series', label: 'Civil Court Series' }
                    ]}
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Paced Dictation Speed</label>
                  <CustomSelect 
                    value={testSpeed}
                    onChange={(val) => setTestSpeed(val)}
                    options={[
                      { value: '80 WPM', label: '80 WPM (Standard SSC Grade D)' },
                      { value: '100 WPM', label: '100 WPM (High Court / SSC Grade C)' },
                      { value: '120 WPM', label: '120 WPM (Parliament / High Speed)' },
                      { value: '140 WPM', label: '140 WPM (Senior Assembly Reporter)' }
                    ]}
                  />
                </div>
              </div>

              {/* Language & Words Count */}
              <div className="grid-2-fields">
                <div className="form-group-field">
                  <label className="field-label">Language & Font Mode</label>
                  <CustomSelect 
                    value={testLanguage}
                    onChange={(val) => setTestLanguage(val)}
                    options={[
                      { value: 'English', label: 'English' },
                      { value: 'Hindi (Kruti Dev)', label: 'Hindi (Kruti Dev 010)' },
                      { value: 'Hindi (Mangal)', label: 'Hindi (Unicode Mangal)' }
                    ]}
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Total Words Count (Auto-calculated)</label>
                  <input 
                    type="number"
                    className="field-input font-mono"
                    value={testWords}
                    onChange={(e) => setTestWords(Number(e.target.value) || 0)}
                    required
                  />
                </div>
              </div>

              {/* Fixed Typing Duration & Publish Status */}
              <div className="grid-2-fields">
                <div className="form-group-field">
                  <label className="field-label">Fixed Typing Duration (Stage 2)</label>
                  <CustomSelect 
                    value={String(testTypingDurationMins)}
                    onChange={(val) => setTestTypingDurationMins(Number(val))}
                    options={[
                      { value: '5', label: '5 Minutes' },
                      { value: '10', label: '10 Minutes (Standard Exam)' },
                      { value: '15', label: '15 Minutes' },
                      { value: '20', label: '20 Minutes' },
                      { value: '30', label: '30 Minutes' }
                    ]}
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Initial Publish Status</label>
                  <CustomSelect 
                    value={String(testIsPublished)}
                    onChange={(val) => setTestIsPublished(Number(val))}
                    options={[
                      { value: '1', label: 'Published (Active for Candidates)' },
                      { value: '0', label: 'Draft / Unpublished (Hidden)' }
                    ]}
                  />
                </div>
              </div>

              {/* ============================================================== */}
              {/* SECTION 1: STUDIO AUDIO DICTATION TRACK (UPLOAD & RECORDER)    */}
              {/* ============================================================== */}
              <div className="dictation-section-block">
                <div className="section-block-header">
                  <div className="header-left">
                    <span className="section-step-num">Step 1</span>
                    <div>
                      <h4 className="section-block-title">Studio Audio Dictation Track</h4>
                      <p className="section-block-desc">Provide calibrated voice dictation recorded at the selected speed.</p>
                    </div>
                  </div>

                  {/* Mode Selector */}
                  <div className="audio-source-pills">
                    <button
                      type="button"
                      className={`audio-mode-btn ${audioSourceType === 'upload' ? 'active' : ''}`}
                      onClick={() => setAudioSourceType('upload')}
                    >
                      <UploadCloud size={14} />
                      <span>Upload File</span>
                    </button>
                    <button
                      type="button"
                      className={`audio-mode-btn ${audioSourceType === 'sample' ? 'active' : ''}`}
                      onClick={() => {
                        setAudioSourceType('sample');
                        setAudioUrl('/assets/sample-dictation.mp3');
                        setAudioFileName('Studio_Calibrated_Dictation_Sample.mp3');
                        setAudioFileSize('3.4 MB');
                        setAudioDuration(300);
                      }}
                    >
                      <Music size={14} />
                      <span>Studio Sample</span>
                    </button>
                    <button
                      type="button"
                      className={`audio-mode-btn ${audioSourceType === 'record' ? 'active' : ''}`}
                      onClick={() => setAudioSourceType('record')}
                    >
                      <Mic size={14} />
                      <span>Record Mic</span>
                    </button>
                  </div>
                </div>

                {/* Audio Mode 1: File Upload Dropzone */}
                {audioSourceType === 'upload' && (
                  <div className="audio-upload-container">
                    {!audioFile ? (
                      <label className="audio-dropzone" htmlFor="dictation-audio-file-input">
                        <input
                          id="dictation-audio-file-input"
                          type="file"
                          accept="audio/mp3,audio/wav,audio/m4a,audio/ogg,audio/aac,audio/*"
                          style={{ display: 'none' }}
                          onChange={handleAudioFileUpload}
                        />
                        <div className="dropzone-content">
                          <div className="dropzone-icon-circle">
                            <UploadCloud size={24} className="text-royal-blue" />
                          </div>
                          <div className="dropzone-text">
                            <strong>Click to browse or drag & drop audio dictation file</strong>
                            <span>Supports MP3, WAV, M4A, OGG, AAC up to 50MB</span>
                          </div>
                          <span className="btn-browse-chip">Select Audio File</span>
                        </div>
                      </label>
                    ) : (
                      <div className="audio-loaded-card">
                        <div className="audio-file-meta-row">
                          <div className="meta-left">
                            <div className="audio-file-icon-box">
                              <Music size={18} />
                            </div>
                            <div className="audio-file-info">
                              <span className="file-name">{audioFileName}</span>
                              <span className="file-sub">{audioFileSize} • {formatDuration(audioDuration)} duration</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn-replace-audio"
                            onClick={() => {
                              if (isPlayingPreview && audioPlayerRef.current) audioPlayerRef.current.pause();
                              setAudioFile(null);
                              setAudioUrl('');
                              setIsPlayingPreview(false);
                            }}
                          >
                            <Trash2 size={13} />
                            <span>Remove Audio</span>
                          </button>
                        </div>

                        {/* Interactive Player Preview */}
                        <div className="audio-player-preview-deck">
                          <button
                            type="button"
                            className="btn-play-preview"
                            onClick={toggleAudioPreview}
                          >
                            {isPlayingPreview ? <Pause size={15} /> : <Play size={15} />}
                            <span>{isPlayingPreview ? 'Pause Audio' : 'Test Audio Playback'}</span>
                          </button>

                          <div className="audio-waveform-bars">
                            {[40, 75, 95, 60, 85, 45, 90, 70, 55, 80, 100, 65, 50, 85, 95, 60, 45, 75, 85, 40].map((h, i) => (
                              <span 
                                key={i} 
                                className={`wave-bar ${isPlayingPreview ? 'wave-animated' : ''}`}
                                style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                              />
                            ))}
                          </div>

                          <span className="audio-duration-tag font-mono">
                            {formatDuration(audioDuration)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Audio Mode 2: Studio Preset Sample */}
                {audioSourceType === 'sample' && (
                  <div className="audio-loaded-card sample-accent">
                    <div className="audio-file-meta-row">
                      <div className="meta-left">
                        <div className="audio-file-icon-box sample-icon">
                          <Headphones size={18} />
                        </div>
                        <div className="audio-file-info">
                          <span className="file-name">Official Studio Calibrated Dictation (High Court Standard)</span>
                          <span className="file-sub">3.4 MB • 05:00 Mins • Calibrated at exactly {testSpeed}</span>
                        </div>
                      </div>
                      <span className="badge-preset-verified">Studio Verified</span>
                    </div>

                    <div className="audio-player-preview-deck">
                      <button
                        type="button"
                        className="btn-play-preview"
                        onClick={toggleAudioPreview}
                      >
                        {isPlayingPreview ? <Pause size={15} /> : <Play size={15} />}
                        <span>{isPlayingPreview ? 'Pause Audio' : 'Play Sample Audio'}</span>
                      </button>

                      <div className="audio-waveform-bars">
                        {[50, 80, 60, 90, 70, 85, 40, 95, 65, 80, 75, 90, 60, 85, 100, 70, 55, 65, 80, 50].map((h, i) => (
                          <span 
                            key={i} 
                            className={`wave-bar ${isPlayingPreview ? 'wave-animated' : ''}`}
                            style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                          />
                        ))}
                      </div>

                      <span className="audio-duration-tag font-mono">
                        05:00
                      </span>
                    </div>
                  </div>
                )}

                {/* Audio Mode 3: Live Microphone Recording */}
                {audioSourceType === 'record' && (
                  <div className="audio-record-box">
                    <div className="record-status-row">
                      <div className="record-mic-indicator">
                        <div className={`record-pulse-ring ${isRecording ? 'recording-live' : ''}`}>
                          <Mic size={22} className={isRecording ? 'text-rose' : 'text-slate-600'} />
                        </div>
                        <div>
                          <strong>{isRecording ? 'Recording Live Dictation...' : recordedBlob ? 'Dictation Captured' : 'Ready to Record Voice Dictation'}</strong>
                          <p className="record-help-sub">
                            {isRecording 
                              ? 'Speak clearly into your microphone at calibrated speed. Click stop when finished.' 
                              : recordedBlob 
                                ? 'Your audio has been captured. You can test playback below or record again.' 
                                : 'Faculty can dictate directly from the browser without needing separate audio software.'}
                          </p>
                        </div>
                      </div>

                      <div className="record-timer-badge font-mono">
                        {formatDuration(recordingSeconds)}
                      </div>
                    </div>

                    <div className="record-controls-row">
                      {!isRecording ? (
                        <button
                          type="button"
                          className="btn-start-record"
                          onClick={startRecording}
                        >
                          <div className="rec-dot" />
                          <span>{recordedBlob ? 'Re-Record Dictation' : 'Start Recording'}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-stop-record"
                          onClick={stopRecording}
                        >
                          <Square size={14} />
                          <span>Stop & Save Recording</span>
                        </button>
                      )}

                      {recordedBlob && !isRecording && (
                        <button
                          type="button"
                          className="btn-play-preview"
                          onClick={toggleAudioPreview}
                        >
                          {isPlayingPreview ? <Pause size={14} /> : <Play size={14} />}
                          <span>{isPlayingPreview ? 'Pause' : 'Test Recording'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ============================================================== */}
              {/* SECTION 2: MASTER BENCHMARK PASSAGE (TEXT & FILE UPLOAD)       */}
              {/* ============================================================== */}
              <div className="dictation-section-block">
                <div className="section-block-header">
                  <div className="header-left">
                    <span className="section-step-num">Step 2</span>
                    <div>
                      <h4 className="section-block-title">Master Benchmark Transcript Passage</h4>
                      <p className="section-block-desc">
                        The official text against which student submissions are evaluated character-by-character.
                      </p>
                    </div>
                  </div>

                  {/* Text Upload & Quick Actions */}
                  <div className="transcript-actions-bar">
                    <label className="btn-upload-text-file" htmlFor="transcript-text-file-input">
                      <input 
                        id="transcript-text-file-input"
                        type="file"
                        accept=".txt,.doc,.docx,.rtf"
                        style={{ display: 'none' }}
                        onChange={handleTranscriptFileUpload}
                      />
                      <FileText size={13} />
                      <span>{transcriptFileName ? `Uploaded: ${transcriptFileName}` : 'Upload Text File (.txt)'}</span>
                    </label>

                    <button
                      type="button"
                      className="btn-paste-sample"
                      onClick={() => {
                        const samplePassage = "The learned counsel appearing on behalf of the appellant has vehemently contended that the High Court has committed a grave error of law in not appreciating the evidence of the prosecution witnesses in its proper perspective. It has been submitted that there are material contradictions and omissions in the statements of the witnesses which go to the root of the matter and shake the very foundation of the prosecution case. The prosecution has utterly failed to prove the guilt of the accused beyond all reasonable doubt. Having heard the learned advocates on both sides and upon perusal of the record, this Court is of the considered opinion that the findings recorded by the courts below suffer from no legal infirmity.";
                        updatePassage(samplePassage);
                        setTranscriptFileName('Standard_HighCourt_Sample_Passage.txt');
                      }}
                    >
                      <Sparkles size={13} />
                      <span>Insert Sample Passage</span>
                    </button>
                  </div>
                </div>

                <div className="transcript-editor-wrap">
                  <textarea 
                    className="field-input font-mono transcript-textarea"
                    rows={6}
                    placeholder="Type or paste the official dictation passage here, or click 'Upload Text File' above..."
                    value={testPassage}
                    onChange={(e) => updatePassage(e.target.value)}
                    required
                  />

                  {/* Live Word & Calibration Stats Footer */}
                  <div className="transcript-stats-strip">
                    <div className="stats-left">
                      <span className="word-count-badge">
                        Words: <strong className="font-mono">{testWords}</strong>
                      </span>
                      <span className="speed-pacing-badge">
                        Pacing: <strong className="font-mono">{testSpeed}</strong>
                      </span>
                      <span className="estimated-time-badge">
                        Est. Dictation Time: <strong className="font-mono">{formatDuration(Math.round((testWords / (parseInt(testSpeed) || 80)) * 60))}</strong>
                      </span>
                    </div>
                    {testPassage.trim() && (
                      <span className="badge-transcript-ready">
                        <CheckCircle2 size={12} />
                        <span>Passage Ready</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Synchronization Verification Strip */}
              <div className="dictation-sync-verify-strip">
                <div className="sync-col">
                  <span className="sync-label">Audio Track</span>
                  <span className={`sync-status ${audioUrl ? 'is-ready' : 'is-missing'}`}>
                    {audioUrl ? `✓ ${audioFileName || 'Audio Track Loaded'}` : '⚠ Audio Required'}
                  </span>
                </div>
                <div className="sync-divider" />
                <div className="sync-col">
                  <span className="sync-label">Benchmark Transcript</span>
                  <span className={`sync-status ${testPassage.trim() ? 'is-ready' : 'is-missing'}`}>
                    {testPassage.trim() ? `✓ ${testWords} Words Verified` : '⚠ Transcript Required'}
                  </span>
                </div>
                <div className="sync-divider" />
                <div className="sync-col">
                  <span className="sync-label">Calculated Pacing</span>
                  <span className="sync-status is-ready font-mono">
                    {testSpeed} ({testLanguage})
                  </span>
                </div>
              </div>

              </div>

              {/* Sticky Footer Actions - Always Pinned & Visible */}
              <div className="admin-modal-footer-sticky">
                <span className="footer-hint-text">
                  <ShieldCheck size={14} className="text-royal-blue" />
                  <span>Audio track synced with master transcript for automated diff evaluation</span>
                </span>

                <div className="admin-modal-footer-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      if (isPlayingPreview && audioPlayerRef.current) audioPlayerRef.current.pause();
                      setIsPlayingPreview(false);
                      stopRecording();
                      setNewTestModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-publish-glow">
                    <UploadCloud size={16} />
                    <span>Publish Dictation to Audio Vault</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add / Enroll Candidate */}
      {newStudentModalOpen && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Users size={20} className="text-stone-800" />
                <h3>Manual Student Enrollment & Pass Assignment</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setNewStudentModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="modal-form-body">
              <div className="form-group-field">
                <label className="field-label">Candidate Full Name</label>
                <input 
                  type="text"
                  className="field-input"
                  placeholder="e.g. Ramesh Kumar"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="grid-2-fields">
                <div className="form-group-field">
                  <label className="field-label">Email Address</label>
                  <input 
                    type="email"
                    className="field-input"
                    placeholder="student@gmail.com"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Generated Roll Number</label>
                  <input 
                    type="text"
                    className="field-input font-mono"
                    value={studentRoll}
                    onChange={(e) => setStudentRoll(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid-2-fields">
                <div className="form-group-field">
                  <label className="field-label">Subscription Pass</label>
                  <CustomSelect 
                    value={studentPlan}
                    onChange={(val) => setStudentPlan(val)}
                    options={[
                      { value: '12-Month Pro Active', label: '12-Month Annual Career Master' },
                      { value: '6-Month Scholar', label: '6-Month Pro Scholar' },
                      { value: 'Monthly Test Series', label: 'Monthly Test Series' },
                      { value: '1-Day Skill Sprint', label: '1-Day Skill Sprint' }
                    ]}
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Target Examination</label>
                  <CustomSelect 
                    value={studentExam}
                    onChange={(val) => setStudentExam(val)}
                    options={[
                      { value: 'SSC Steno Grade C & D', label: 'SSC Steno Grade C & D' },
                      { value: 'Patna High Court', label: 'Patna High Court' },
                      { value: 'Jharkhand High Court', label: 'Jharkhand High Court' },
                      { value: 'Parliament Reporter', label: 'Parliament Reporter' }
                    ]}
                  />
                </div>
              </div>

              <div className="modal-footer-btns">
                <button type="button" className="btn btn-secondary" onClick={() => setNewStudentModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Activate & Enroll Candidate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Upload Pure Text-Only Typing Exercise */}
      {newTypingModalOpen && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <div className="modal-icon-squircle" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                  <Keyboard size={22} style={{ color: '#059669' }} />
                </div>
                <div>
                  <h3 className="modal-main-title">Upload Pure Text Typing Exercise (No Audio)</h3>
                  <p className="modal-sub-title">Direct benchmark passage for Court, SSC & Clerical on-screen typing speed evaluation</p>
                </div>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setNewTypingModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTypingTest} className="admin-modal-form-wrapper">
              <div className="admin-modal-scrollable-body">
                {/* Row 1: Title & Target Authority */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Exercise Name / Title *</label>
                    <input 
                      type="text" 
                      className="field-input"
                      placeholder="e.g. Exercise 85 - Patna High Court Civil Jurisdiction Appeal"
                      value={typingTitle}
                      onChange={(e) => setTypingTitle(e.target.value)}
                      required
                    />
                    <span className="field-hint">A clear title indicating the test source or exercise series.</span>
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Target Examination Authority</label>
                    <CustomSelect 
                      value={typingAuthority}
                      onChange={(val) => setTypingAuthority(val)}
                      options={[
                        { value: 'Patna High Court', label: 'Patna High Court / Bihar Civil Court' },
                        { value: 'SSC CGL / CHSL Tier-II', label: 'SSC CGL / CHSL / Steno Tier-II' },
                        { value: 'Allahabad High Court', label: 'Allahabad High Court / RO / ARO' },
                        { value: 'Jharkhand High Court', label: 'Jharkhand High Court / Civil Court' },
                        { value: 'Delhi High Court / DSSSB', label: 'Delhi High Court / DSSSB' },
                        { value: 'RRB NTPC Typing', label: 'Railway RRB NTPC Junior Accounts' },
                        { value: 'Civil Court Clerk / Reader', label: 'District & Sessions Civil Court' }
                      ]}
                    />
                  </div>
                </div>

                {/* Row 2: Category & Language */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Passage Genre / Category</label>
                    <CustomSelect 
                      value={typingCategory}
                      onChange={(val) => setTypingCategory(val)}
                      options={[
                        { value: 'Judicial Precedent', label: 'Judicial Precedent & Case Law' },
                        { value: 'Official Memorandum', label: 'Official Memorandum & Order' },
                        { value: 'Editorial / Parliamentary', label: 'Editorial & Parliamentary' },
                        { value: 'Civil Law & Affidavit', label: 'Civil Law & Affidavit' },
                        { value: 'General Speed Drill', label: 'General Speed Drill' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Language & Font System</label>
                    <CustomSelect 
                      value={typingLanguage}
                      onChange={(val) => setTypingLanguage(val)}
                      options={[
                        { value: 'English', label: 'English (Standard QWERTY)' },
                        { value: 'Hindi (Kruti Dev)', label: 'Hindi (Kruti Dev 010)' },
                        { value: 'Hindi (Mangal)', label: 'Hindi (Mangal Remington GAIL)' }
                      ]}
                    />
                  </div>
                </div>

                {/* Row 3: Target Speed, Duration & Difficulty in 1 clean 3-col row! */}
                <div className="grid-3-fields">
                  <div className="form-group-field">
                    <label className="field-label">Benchmark Speed</label>
                    <CustomSelect 
                      value={typingTargetSpeed}
                      onChange={(val) => setTypingTargetSpeed(val)}
                      options={[
                        { value: '30 WPM', label: '30 WPM (SSC Tier-II Standard)' },
                        { value: '35 WPM', label: '35 WPM (High Court Standard)' },
                        { value: '40 WPM', label: '40 WPM (Senior Clerk / Steno)' },
                        { value: '45 WPM', label: '45 WPM (Court Reader / Reporter)' },
                        { value: '50 WPM', label: '50 WPM (Master Speed)' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Test Duration</label>
                    <CustomSelect 
                      value={typingDuration}
                      onChange={(val) => setTypingDuration(val)}
                      options={[
                        { value: '10 Mins', label: '10 Mins (Official Exam Benchmark)' },
                        { value: '5 Mins', label: '5 Mins (Quick Speed Drill)' },
                        { value: '15 Mins', label: '15 Mins (Endurance Stamina)' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Difficulty Grading</label>
                    <CustomSelect 
                      value={typingDifficulty}
                      onChange={(val) => setTypingDifficulty(val)}
                      options={[
                        { value: 'Easy', label: 'Easy (Simple Vocabulary & Common Words)' },
                        { value: 'Medium', label: 'Medium (Legal & Official Standard)' },
                        { value: 'Hard', label: 'Hard (Complex Terminology & Numbers)' }
                      ]}
                    />
                  </div>
                </div>

                {/* Master Benchmark Passage Section */}
                <div className="dictation-section-block" style={{ background: '#FFFFFF', borderColor: '#e2e8f0' }}>
                  <div className="section-block-header">
                    <div className="header-left">
                      <span className="section-step-num" style={{ background: '#059669' }}>Text Input</span>
                      <div>
                        <h4 className="section-block-title">Master Benchmark Text Passage *</h4>
                        <p className="section-block-desc">
                          Aspirants will see and type this exact text in the Typing Studio with live WPM & accuracy scoring.
                        </p>
                      </div>
                    </div>

                    <div className="transcript-actions-bar">
                      <label className="btn-upload-text-file" style={{ background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}>
                        <UploadCloud size={13} />
                        <span>{typingFileName ? `File: ${typingFileName}` : 'Upload .TXT File'}</span>
                        <input 
                          type="file" 
                          accept=".txt" 
                          onChange={handleTypingFileUpload}
                          style={{ display: 'none' }} 
                        />
                      </label>

                      <button 
                        type="button" 
                        className="btn-paste-sample"
                        onClick={() => loadSampleTypingPassage('court')}
                        title="Load sample High Court judgment passage"
                      >
                        <Sparkles size={12} />
                        <span>Court Judgment</span>
                      </button>

                      <button 
                        type="button" 
                        className="btn-paste-sample"
                        onClick={() => loadSampleTypingPassage('ssc')}
                        title="Load sample SSC Tier-II office memorandum"
                      >
                        <Sparkles size={12} />
                        <span>SSC Memo</span>
                      </button>

                      <button 
                        type="button" 
                        className="btn-paste-sample"
                        onClick={() => loadSampleTypingPassage('hindi')}
                        title="Load sample Hindi passage"
                      >
                        <Sparkles size={12} />
                        <span>Hindi Legal</span>
                      </button>

                      {typingPassage && (
                        <button
                          type="button"
                          className="btn-replace-audio"
                          onClick={() => {
                            updateTypingPassage('');
                            setTypingFileName('');
                          }}
                          title="Clear passage text"
                        >
                          <Trash2 size={12} />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="transcript-editor-wrap">
                    <textarea 
                      className="transcript-textarea"
                      placeholder="Paste or type the official exam passage here, or click 'Upload .TXT File' above. Supports English, Hindi Kruti Dev, or Unicode Mangal font..."
                      rows={5}
                      style={{ minHeight: '120px' }}
                      value={typingPassage}
                      onChange={(e) => updateTypingPassage(e.target.value)}
                      required
                    />

                    <div className="transcript-stats-strip">
                      <div className="stats-left">
                        <span>Total Words: <strong style={{ color: typingWords > 0 ? '#047857' : '#0F172A' }}>{typingWords} words</strong></span>
                        <span>Total Characters: <strong>{typingPassage.length} chars</strong></span>
                        <span>Target Speed: <strong style={{ color: '#059669' }}>{typingTargetSpeed}</strong></span>
                        <span>Duration: <strong>{typingDuration}</strong></span>
                      </div>
                      <div>
                        {typingPassage.trim() ? (
                          <span className="badge-transcript-ready">
                            <CheckCircle2 size={13} />
                            <span>Passage Calibrated & Ready</span>
                          </span>
                        ) : (
                          <span className="text-amber font-mono" style={{ fontSize: '0.76rem' }}>
                            * Paste or upload passage text to proceed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ready Banner */}
                <div className="dictation-sync-verify-strip" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#065f46' }}>Exercise Mode</span>
                    <span className="sync-status is-ready" style={{ color: '#059669' }}>
                      ⌨️ Pure Text Typing Drill (No Audio)
                    </span>
                  </div>
                  <div className="sync-divider" style={{ background: '#a7f3d0' }} />
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#065f46' }}>Target Exam</span>
                    <span className="sync-status is-ready font-mono" style={{ color: '#059669' }}>
                      {typingAuthority}
                    </span>
                  </div>
                  <div className="sync-divider" style={{ background: '#a7f3d0' }} />
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#065f46' }}>Calculated Words</span>
                    <span className="sync-status is-ready font-mono" style={{ color: '#059669' }}>
                      {typingWords} Words ({typingLanguage}) • {typingDifficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Actions - Always Pinned & Visible */}
              <div className="admin-modal-footer-sticky">
                <span className="footer-hint-text">
                  <ShieldCheck size={14} style={{ color: '#059669' }} />
                  <span>Pure text typing drill • No audio playback required • Evaluated live</span>
                </span>

                <div className="admin-modal-footer-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setNewTypingModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ 
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', 
                      borderColor: '#059669', 
                      color: '#FFFFFF',
                      boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)' 
                    }}
                  >
                    <Keyboard size={16} />
                    <span>Publish to Typing Test Studio</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Schedule / Create New Live Online Zoom Class */}
      {newClassModalOpen && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide">
            <form onSubmit={handlePublishOnlineClass} className="admin-modal-form-wrapper">
              
              {/* Header */}
              <div className="modal-header">
                <div>
                  <div className="modal-title-with-badge">
                    <span className="badge badge-purple" style={{ background: '#FFFFFF', color: '#0F172A', borderColor: 'rgba(0, 0, 0, 0.08)' }}>
                      <Video size={13} />
                      <span>Live Classroom Studio</span>
                    </span>
                    <h3 className="modal-title">Schedule / Launch Live Online Class on Zoom</h3>
                  </div>
                  <p className="modal-subtitle">
                    Create or go live with a real-time shorthand & dictation session. This class is instantly synced and displayed to all students with 1-click joining.
                  </p>
                </div>
                <button 
                  type="button" 
                  className="btn-modal-close" 
                  onClick={() => setNewClassModalOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Quick Template Presets Bar */}
              <div className="modal-quick-presets-strip" style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#57534e', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={13} style={{ color: '#d97706' }} />
                  <span>Quick Presets:</span>
                </span>
                <button 
                  type="button" 
                  className="btn-template-pill"
                  onClick={() => loadClassTemplate('ssc80')}
                  style={{ fontSize: '0.75rem', padding: '0.28rem 0.65rem', borderRadius: '6px', border: '1px solid rgba(0, 0, 0, 0.08)', background: '#FFFFFF', cursor: 'pointer', fontWeight: '600', color: '#0F172A' }}
                >
                  ⚡ SSC Steno (80 WPM Morning)
                </button>
                <button 
                  type="button" 
                  className="btn-template-pill"
                  onClick={() => loadClassTemplate('judicial100')}
                  style={{ fontSize: '0.75rem', padding: '0.28rem 0.65rem', borderRadius: '6px', border: '1px solid rgba(0, 0, 0, 0.08)', background: '#FFFFFF', cursor: 'pointer', fontWeight: '600', color: '#0F172A' }}
                >
                  ⚖️ High Court Bench (100 WPM)
                </button>
                <button 
                  type="button" 
                  className="btn-template-pill"
                  onClick={() => loadClassTemplate('reporter120')}
                  style={{ fontSize: '0.75rem', padding: '0.28rem 0.65rem', borderRadius: '6px', border: '1px solid rgba(0, 0, 0, 0.08)', background: '#FFFFFF', cursor: 'pointer', fontWeight: '600', color: '#0F172A' }}
                >
                  🏛️ Parliament Reporter (120+ WPM)
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="modal-body admin-modal-scrollable-body">
                {/* Row 1: Class Title */}
                <div className="form-group-field">
                  <label className="field-label">Official Live Class Title *</label>
                  <input 
                    type="text" 
                    className="field-input" 
                    placeholder="e.g. SSC Stenographer Grade C & D — 80 WPM Live Speed Dictation & Transcription Lab"
                    value={newClassTitle}
                    onChange={(e) => setNewClassTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Row 2: Shift, Time, Speed Tier, Instructor */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Batch Shift & Category</label>
                    <CustomSelect 
                      value={newClassShift}
                      onChange={(val) => setNewClassShift(val)}
                      options={[
                        { value: 'Morning Core Batch', label: 'Morning Core Batch (8:30 AM – 10:30 AM)' },
                        { value: 'Morning Early Bird', label: 'Morning Early Bird (6:00 AM – 8:00 AM)' },
                        { value: 'Afternoon Judicial Series', label: 'Afternoon Judicial Series (3:00 PM – 5:00 PM)' },
                        { value: 'Evening Executive Bench', label: 'Evening Executive Bench (5:30 PM – 7:30 PM)' },
                        { value: 'Special Weekend Sprint', label: 'Special Weekend Sprint (Sunday 9:00 AM)' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Schedule Timing</label>
                    <input 
                      type="text" 
                      className="field-input font-mono" 
                      placeholder="e.g. 8:30 AM – 10:30 AM"
                      value={newClassTime}
                      onChange={(e) => setNewClassTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Target Speed Tier & Faculty Instructor */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Target Speed Tier</label>
                    <CustomSelect 
                      value={newClassSpeed}
                      onChange={(val) => setNewClassSpeed(val)}
                      options={[
                        { value: '80 WPM Standard', label: '80 WPM Standard (SSC Grade D Benchmark)' },
                        { value: '100 WPM Judicial', label: '100 WPM Judicial (High Court & SSC Grade C)' },
                        { value: '120 - 140 WPM Elite', label: '120 - 140 WPM Elite (Parliamentary Reporter)' },
                        { value: 'Beginners (0 - 60 WPM)', label: 'Beginners (0 - 60 WPM Theory & Strokes)' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Faculty / Master In-Charge</label>
                    <CustomSelect 
                      value={newClassInstructor}
                      onChange={(val) => setNewClassInstructor(val)}
                      options={[
                        { value: 'Shadab Sir', label: 'Shadab Sir (Director & Head Faculty • 12 Yrs Exp)' },
                        { value: 'Senior Court Master', label: 'Senior Court Master (Ex-Parliament Reporter)' },
                        { value: 'Judicial Bench Master', label: 'Judicial Bench Master (Patna High Court)' },
                        { value: 'Anjali Mam', label: 'Anjali Mam (Theory & Hindi Steno Master)' }
                      ]}
                    />
                  </div>
                </div>

                {/* Row 4: Zoom Credentials & Live Status Switch */}
                <div className="dictation-section-block" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <div className="section-block-header">
                    <div className="header-left">
                      <span className="section-step-num" style={{ background: '#16a34a' }}>Zoom Sync</span>
                      <div>
                        <h4 className="section-block-title" style={{ color: '#14532d' }}>Zoom Meeting Credentials & Live Broadcast Status *</h4>
                        <p className="section-block-desc" style={{ color: '#166534' }}>
                          Students can join automatically via direct link, or copy the Meeting ID & Passcode.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid-3-fields" style={{ marginTop: '0.75rem' }}>
                    <div className="form-group-field">
                      <label className="field-label" style={{ color: '#14532d' }}>Zoom Meeting ID *</label>
                      <input 
                        type="text" 
                        className="field-input font-mono font-bold" 
                        placeholder="842 9104 2281"
                        value={newClassMeetingId}
                        onChange={(e) => setNewClassMeetingId(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group-field">
                      <label className="field-label" style={{ color: '#14532d' }}>Zoom Passcode *</label>
                      <input 
                        type="text" 
                        className="field-input font-mono font-bold" 
                        placeholder="GAYA80WPM"
                        value={newClassPasscode}
                        onChange={(e) => setNewClassPasscode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group-field">
                      <label className="field-label" style={{ color: '#14532d' }}>Zoom Studio Room</label>
                      <input 
                        type="text" 
                        className="field-input" 
                        placeholder="Zoom Room #01 (Studio Live)"
                        value={newClassRoom}
                        onChange={(e) => setNewClassRoom(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Immediate Go-Live Radio Selector */}
                  <div style={{ marginTop: '0.85rem', padding: '0.75rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Radio size={18} style={{ color: newClassIsLive ? '#dc2626' : '#78716c' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#0F172A' }}>
                          Broadcast Status for Students:
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#78716c' }}>
                          {newClassIsLive 
                            ? '🔴 Marked LIVE NOW — shows pulsing red badge and enables 1-click In-Browser Video Studio.' 
                            : '⏳ Scheduled for Upcoming — candidates see start time and can bookmark.'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        type="button"
                        onClick={() => setNewClassIsLive(true)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid',
                          fontSize: '0.76rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          background: newClassIsLive ? '#DC2626' : '#F8FAFC',
                          color: newClassIsLive ? '#FFFFFF' : '#64748B',
                          borderColor: newClassIsLive ? '#dc2626' : '#d6d3d1'
                        }}
                      >
                        ● Go Live Now
                      </button>
                      <button 
                        type="button"
                        onClick={() => setNewClassIsLive(false)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid',
                          fontSize: '0.76rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          background: !newClassIsLive ? '#0F172A' : '#F5F5F7',
                          color: !newClassIsLive ? '#FFFFFF' : '#64748B',
                          borderColor: !newClassIsLive ? '#0F172A' : '#d6d3d1'
                        }}
                      >
                        ⏳ Schedule Upcoming
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 5: Today's Dictation Topic & Live Whiteboard Master Passage */}
                <div className="dictation-section-block" style={{ background: '#FFFFFF', borderColor: 'rgba(0, 0, 0, 0.08)', marginTop: '1rem' }}>
                  <div className="section-block-header">
                    <div className="header-left">
                      <span className="section-step-num" style={{ background: '#0F172A', color: '#FFFFFF' }}>Dictation</span>
                      <div>
                        <h4 className="section-block-title">Today's Live Dictation Topic & Reference Passage *</h4>
                        <p className="section-block-desc">
                          This passage will be displayed on the student's reference card, whiteboard notes, and transcription review.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="form-group-field" style={{ marginTop: '0.75rem' }}>
                    <label className="field-label">Dictation Topic Header *</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      placeholder="e.g. Parliamentary Motion on State Infrastructure & Expenditure Audit"
                      value={newClassTopic}
                      onChange={(e) => setNewClassTopic(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-field" style={{ marginTop: '0.75rem' }}>
                    <label className="field-label">Reference Dictation Passage Text</label>
                    <textarea 
                      className="transcript-textarea"
                      placeholder="Paste or type the master dictation passage to be spoken on Zoom..."
                      rows={4}
                      style={{ minHeight: '100px' }}
                      value={newClassPassage}
                      onChange={(e) => setNewClassPassage(e.target.value)}
                    />
                  </div>
                </div>

                {/* Instant Availability Verification Strip */}
                <div className="dictation-sync-verify-strip" style={{ background: '#FFFFFF', borderColor: 'rgba(0, 0, 0, 0.08)', marginTop: '0.75rem' }}>
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#57534e' }}>Target Speed</span>
                    <span className="sync-status is-ready font-mono" style={{ color: '#0F172A' }}>
                      {newClassSpeed}
                    </span>
                  </div>
                  <div className="sync-divider" style={{ background: 'rgba(0, 0, 0, 0.08)' }} />
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#57534e' }}>Zoom Direct Link</span>
                    <span className="sync-status is-ready font-mono" style={{ color: '#0F172A', fontSize: '0.75rem' }}>
                      zoom.us/j/{newClassMeetingId.replace(/\s+/g, '')}
                    </span>
                  </div>
                  <div className="sync-divider" style={{ background: 'rgba(0, 0, 0, 0.08)' }} />
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#57534e' }}>Student Real-Time Sync</span>
                    <span className="sync-status is-ready font-mono" style={{ color: '#059669' }}>
                      ✓ Instant Push to Candidate Portal
                    </span>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Actions */}
              <div className="admin-modal-footer-sticky">
                <span className="footer-hint-text">
                  <ShieldCheck size={14} style={{ color: '#10b981' }} />
                  <span>Verified Zoom Classroom • Students can join via In-Browser Studio or Zoom Desktop App</span>
                </span>

                <div className="admin-modal-footer-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setNewClassModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ 
                      background: 'linear-gradient(135deg, #18181b 0%, #4c0519 100%)', 
                      borderColor: '#18181b', 
                      color: '#FFFFFF',
                      boxShadow: '0 4px 14px rgba(136, 19, 55, 0.3)' 
                    }}
                  >
                    <Video size={16} />
                    <span>{newClassIsLive ? '🚀 Launch Class & Go Live Now' : '📅 Schedule Class for Students'}</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: Edit Online Class Details */}
      {editingClass && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide">
            <form onSubmit={handleSaveEditClass} className="admin-modal-form-wrapper">
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">Edit Online Class Settings</h3>
                  <p className="modal-subtitle">Update schedule time, Zoom credentials, or today's dictation topic.</p>
                </div>
                <button type="button" className="btn-modal-close" onClick={() => setEditingClass(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body admin-modal-scrollable-body">
                <div className="form-group-field">
                  <label className="field-label">Class Title *</label>
                  <input 
                    type="text" 
                    className="field-input" 
                    value={editingClass.title} 
                    onChange={(e) => setEditingClass({ ...editingClass, title: e.target.value })} 
                    required 
                  />
                </div>

                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Batch Shift</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      value={editingClass.shift} 
                      onChange={(e) => setEditingClass({ ...editingClass, shift: e.target.value })} 
                    />
                  </div>
                  <div className="form-group-field">
                    <label className="field-label">Schedule Time</label>
                    <input 
                      type="text" 
                      className="field-input font-mono" 
                      value={editingClass.time} 
                      onChange={(e) => setEditingClass({ ...editingClass, time: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Target Speed Tier</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      value={editingClass.speed} 
                      onChange={(e) => setEditingClass({ ...editingClass, speed: e.target.value })} 
                    />
                  </div>
                  <div className="form-group-field">
                    <label className="field-label">Faculty Instructor</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      value={editingClass.instructor} 
                      onChange={(e) => setEditingClass({ ...editingClass, instructor: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="grid-3-fields">
                  <div className="form-group-field">
                    <label className="field-label">Zoom Meeting ID *</label>
                    <input 
                      type="text" 
                      className="field-input font-mono font-bold" 
                      value={editingClass.zoomMeetingId} 
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\s+/g, '');
                        setEditingClass({ 
                          ...editingClass, 
                          zoomMeetingId: e.target.value,
                          zoomDirectUrl: `https://zoom.us/j/${clean}?pwd=${editingClass.zoomPasscode}`,
                          zoomAppUrl: `zoommtg://zoom.us/join?confno=${clean}&pwd=${editingClass.zoomPasscode}`
                        });
                      }} 
                      required 
                    />
                  </div>
                  <div className="form-group-field">
                    <label className="field-label">Zoom Passcode *</label>
                    <input 
                      type="text" 
                      className="field-input font-mono font-bold" 
                      value={editingClass.zoomPasscode} 
                      onChange={(e) => {
                        const clean = editingClass.zoomMeetingId.replace(/\s+/g, '');
                        setEditingClass({ 
                          ...editingClass, 
                          zoomPasscode: e.target.value,
                          zoomDirectUrl: `https://zoom.us/j/${clean}?pwd=${e.target.value}`,
                          zoomAppUrl: `zoommtg://zoom.us/join?confno=${clean}&pwd=${e.target.value}`
                        });
                      }} 
                      required 
                    />
                  </div>
                  <div className="form-group-field">
                    <label className="field-label">Studio Room</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      value={editingClass.roomNo} 
                      onChange={(e) => setEditingClass({ ...editingClass, roomNo: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="form-group-field">
                  <label className="field-label">Today's Dictation Topic *</label>
                  <input 
                    type="text" 
                    className="field-input" 
                    value={editingClass.todayTopic} 
                    onChange={(e) => setEditingClass({ ...editingClass, todayTopic: e.target.value })} 
                    required 
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Reference Dictation Passage Snippet</label>
                  <textarea 
                    className="transcript-textarea" 
                    rows={4} 
                    value={editingClass.passageSnippet || ''} 
                    onChange={(e) => setEditingClass({ ...editingClass, passageSnippet: e.target.value })} 
                  />
                </div>
              </div>

              <div className="admin-modal-footer-sticky">
                <span className="footer-hint-text">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Changes will immediately sync with all candidates</span>
                </span>
                <div className="admin-modal-footer-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingClass(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ background: '#18181b' }}>
                    Save & Update Class
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: Add / Edit Course Catalog Batch */}
      {newCourseModalOpen && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide">
            <form onSubmit={handleSaveCourse} className="admin-modal-form-wrapper">
              
              {/* Header */}
              <div className="modal-header">
                <div>
                  <div className="modal-title-with-badge">
                    <span className="badge badge-blue">
                      <GraduationCap size={13} />
                      <span>Academy Curriculum</span>
                    </span>
                    <h3 className="modal-title">
                      {editingCourse ? 'Edit Academy Course Batch' : 'Create New Academy Course Batch'}
                    </h3>
                  </div>
                  <p className="modal-subtitle">
                    Configure curriculum details, speed benchmarks, and tuition fee. Once saved, this batch immediately displays on the candidate portal with automatic checkout mapping.
                  </p>
                </div>
                <button 
                  type="button" 
                  className="btn-modal-close" 
                  onClick={() => {
                    setNewCourseModalOpen(false);
                    setEditingCourse(null);
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <div className="admin-modal-body-scrollable">
                <div className="modal-grid-two-col">
                  {/* Field: Title */}
                  <div className="field-group span-two">
                    <label className="field-label">
                      <span>Course Title *</span>
                      <span className="field-sub">Official name of the preparation program or batch</span>
                    </label>
                    <input 
                      type="text" 
                      className="field-input font-bold" 
                      placeholder="e.g. RRB Stenographer & Clerk Exam Mastery 2026"
                      value={courseForm.title}
                      onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                      required
                    />
                  </div>

                  {/* Field: Category */}
                  <div className="field-group">
                    <label className="field-label">
                      <span>Exam Category *</span>
                      <span className="field-sub">Curriculum classification</span>
                    </label>
                    <CustomSelect
                      value={courseForm.category}
                      onChange={(val) => setCourseForm({ ...courseForm, category: val })}
                      options={[
                        { value: 'Foundation', label: 'Foundation (Pitman Shorthand)' },
                        { value: 'Judicial Bench', label: 'Judicial Bench (High Courts)' },
                        { value: 'Central Govt', label: 'Central Govt (SSC Grade C & D)' },
                        { value: 'Govt Diplomas', label: 'Govt Diplomas (DCA / ADCA)' },
                        { value: 'State Exams', label: 'State & Police Stenographer' }
                      ]}
                    />
                  </div>

                  {/* Field: Badge Tag */}
                  <div className="field-group">
                    <label className="field-label">
                      <span>Badge / Tag Label</span>
                      <span className="field-sub">e.g. Beginner to 80 WPM, Patna & Jharkhand HC</span>
                    </label>
                    <input 
                      type="text" 
                      className="field-input" 
                      placeholder="e.g. SSC Grade C & D Special"
                      value={courseForm.badge}
                      onChange={(e) => setCourseForm({ ...courseForm, badge: e.target.value })}
                    />
                  </div>

                  {/* Field: Target Speed */}
                  <div className="field-group">
                    <label className="field-label">
                      <span>Target Speed Benchmark *</span>
                      <span className="field-sub">e.g. 0 → 80 WPM, 80 & 100 WPM, 120 WPM</span>
                    </label>
                    <input 
                      type="text" 
                      className="field-input font-mono" 
                      placeholder="e.g. 80 → 110 WPM"
                      value={courseForm.speedTarget}
                      onChange={(e) => setCourseForm({ ...courseForm, speedTarget: e.target.value })}
                      required
                    />
                  </div>

                  {/* Field: Duration */}
                  <div className="field-group">
                    <label className="field-label">
                      <span>Duration *</span>
                      <span className="field-sub">e.g. 3 to 4 Months, 1 Month Intensive</span>
                    </label>
                    <input 
                      type="text" 
                      className="field-input" 
                      placeholder="e.g. 3 Months Intensive"
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                      required
                    />
                  </div>

                  {/* Field: Fee */}
                  <div className="field-group">
                    <label className="field-label">
                      <span>Course Fee / Pricing *</span>
                      <span className="field-sub">Display fee (e.g. ₹700 / Month, ₹6,000 (Complete))</span>
                    </label>
                    <input 
                      type="text" 
                      className="field-input font-mono font-bold" 
                      placeholder="e.g. ₹700 / Month"
                      value={courseForm.fee}
                      onChange={(e) => setCourseForm({ ...courseForm, fee: e.target.value })}
                      required
                    />
                  </div>

                  {/* Field: Delivery Mode */}
                  <div className="field-group">
                    <label className="field-label">
                      <span>Delivery Mode</span>
                      <span className="field-sub">Offline Center or Online Live Zoom</span>
                    </label>
                    <input 
                      type="text" 
                      className="field-input" 
                      placeholder="e.g. Online Live Zoom + Audio Lab Access"
                      value={courseForm.mode}
                      onChange={(e) => setCourseForm({ ...courseForm, mode: e.target.value })}
                    />
                  </div>

                  {/* Field: Flagship Popular Toggle */}
                  <div className="field-group span-two" style={{ background: '#FFFFFF', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #e4e4e7' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={courseForm.popular}
                        onChange={(e) => setCourseForm({ ...courseForm, popular: e.target.checked })}
                        style={{ width: '18px', height: '18px', accentColor: '#18181b', cursor: 'pointer' }}
                      />
                      <div>
                        <strong style={{ color: '#18181b', fontSize: '0.9rem' }}>⭐ Flagship / Featured Course Badge</strong>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#78716c' }}>
                          Highlight this program at the top of the course catalog with a golden "FLAGSHIP BATCH" banner.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Field: Description */}
                  <div className="field-group span-two">
                    <label className="field-label">
                      <span>Course Overview & Summary</span>
                      <span className="field-sub">Explain who this course is for and the key benefits</span>
                    </label>
                    <textarea 
                      className="field-textarea" 
                      rows={3}
                      placeholder="Comprehensive shorthand training designed specifically for government exam aspirants..."
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    />
                  </div>

                  {/* Field: Syllabus Textarea */}
                  <div className="field-group span-two">
                    <label className="field-label">
                      <span>Curriculum & Syllabus Highlights (One topic per line)</span>
                      <span className="field-sub">These will display as checkmark bullet points on the course card</span>
                    </label>
                    <textarea 
                      className="field-textarea font-mono" 
                      rows={5}
                      placeholder="Complete Theory & Stroke Geometry&#10;Handwritten Outline Checks Daily&#10;Grammalogues & Phraseography Drills&#10;Previous 10 Years Solved Dictations"
                      value={courseForm.syllabusText}
                      onChange={(e) => setCourseForm({ ...courseForm, syllabusText: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="admin-modal-footer-sticky">
                <span className="footer-hint-text">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Immediate synchronization with public course catalog & checkout</span>
                </span>
                <div className="admin-modal-footer-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setNewCourseModalOpen(false);
                      setEditingCourse(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ background: '#0F172A', borderColor: '#0F172A', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <CheckCircle2 size={15} />
                    <span>{editingCourse ? 'Save & Update Course' : 'Publish Course Batch'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* MODAL: Publish New Exam Alert */}
      {newAlertModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setNewAlertModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Megaphone size={18} color="#2563EB" />
                <h3 className="modal-title">Publish New Recruitment Exam Alert</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setNewAlertModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleCreateAlert} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Exam Title *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Supreme Court of India Personal Assistant & Steno 2026"
                  value={alertForm.title}
                  onChange={(e) => setAlertForm({ ...alertForm, title: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Department / Body
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Supreme Court of India"
                    value={alertForm.dept}
                    onChange={(e) => setAlertForm({ ...alertForm, dept: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Total Vacancies
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 210 Vacancies"
                    value={alertForm.posts}
                    onChange={(e) => setAlertForm({ ...alertForm, posts: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Speed Requirement
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 100 WPM English"
                    value={alertForm.speedReq}
                    onChange={(e) => setAlertForm({ ...alertForm, speedReq: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Application Deadline
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 15 Jan 2027"
                    value={alertForm.deadline}
                    onChange={(e) => setAlertForm({ ...alertForm, deadline: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Official Notification URL
                </label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={alertForm.link}
                  onChange={(e) => setAlertForm({ ...alertForm, link: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <input 
                  type="checkbox" 
                  id="urgentAlertCheckbox"
                  checked={alertForm.urgent}
                  onChange={(e) => setAlertForm({ ...alertForm, urgent: e.target.checked })}
                  style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                />
                <label htmlFor="urgentAlertCheckbox" style={{ fontSize: '0.84rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                  Mark as High Priority / Urgent Notice
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setNewAlertModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: '#0F172A', borderColor: '#0F172A', color: '#FFFFFF' }}>
                  Publish Live Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Issue Student Diploma */}
      {newDiplomaModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setNewDiplomaModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="#0F172A" />
                <h3 className="modal-title">Issue Verified Student Diploma / Certificate</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setNewDiplomaModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleCreateDiploma} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Candidate Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Rahul Kumar"
                    value={diplomaForm.studentName}
                    onChange={(e) => setDiplomaForm({ ...diplomaForm, studentName: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Roll Number *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. SP-2026-095"
                    value={diplomaForm.rollNo}
                    onChange={(e) => setDiplomaForm({ ...diplomaForm, rollNo: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Certification Program *
                </label>
                <select
                  value={diplomaForm.program}
                  onChange={(e) => setDiplomaForm({ ...diplomaForm, program: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#FFFFFF', boxSizing: 'border-box' }}
                >
                  <option value="Diploma in Computer Application (DCA - 6 Months)">Diploma in Computer Application (DCA - 6 Months)</option>
                  <option value="Advance Diploma in Computer Application (ADCA - 1 Year)">Advance Diploma in Computer Application (ADCA - 1 Year)</option>
                  <option value="Pitman High-Speed Shorthand (80 WPM Certified)">Pitman High-Speed Shorthand (80 WPM Certified)</option>
                  <option value="Pitman High-Speed Shorthand (100 WPM Certified)">Pitman High-Speed Shorthand (100 WPM Certified)</option>
                  <option value="Parliamentary Reporter Shorthand (120 WPM Certified)">Parliamentary Reporter Shorthand (120 WPM Certified)</option>
                  <option value="Professional Bilingual Computer Typing (Hindi & English)">Professional Bilingual Computer Typing (Hindi & English)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Grade / Accuracy Score
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Grade A+ (96.5% Marks)"
                    value={diplomaForm.grade}
                    onChange={(e) => setDiplomaForm({ ...diplomaForm, grade: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Dispatch / Collection Status
                  </label>
                  <select
                    value={diplomaForm.dispatchStatus}
                    onChange={(e) => setDiplomaForm({ ...diplomaForm, dispatchStatus: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#FFFFFF', boxSizing: 'border-box' }}
                  >
                    <option value="Verified & Dispatched">Verified & Dispatched</option>
                    <option value="Ready for Center Pickup">Ready for Center Pickup</option>
                    <option value="Under Quality Printing">Under Quality Printing</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setNewDiplomaModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ background: '#0F172A', borderColor: '#0F172A', color: '#FFFFFF' }}>
                  Issue Diploma Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Dictation Test */}
      {editingTest && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <div className="modal-icon-squircle bg-amber-50">
                  <Edit3 size={22} className="text-amber-700" />
                </div>
                <div>
                  <h3 className="modal-main-title">Edit Audio Dictation Test</h3>
                  <p className="modal-sub-title">Update dictation parameters, master benchmark transcript, audio URL, or typing duration</p>
                </div>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setEditingTest(null)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateTest} className="admin-modal-form-wrapper">
              <div className="admin-modal-scrollable-body">
                {/* Dictation Title */}
                <div className="form-group-field">
                  <label className="field-label">Dictation Test Title *</label>
                  <input 
                    type="text"
                    className="field-input"
                    value={editTestTitle}
                    onChange={(e) => setEditTestTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Category & Speed */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Target Examination Category</label>
                    <CustomSelect 
                      value={editTestCategory}
                      onChange={(val) => setEditTestCategory(val)}
                      options={[
                        { value: 'SSC Steno Grade C & D', label: 'SSC Steno Grade C & D' },
                        { value: 'Patna High Court', label: 'Patna High Court' },
                        { value: 'Jharkhand High Court', label: 'Jharkhand High Court' },
                        { value: 'Parliament Reporter', label: 'Parliament Reporter' },
                        { value: 'Civil Court Series', label: 'Civil Court Series' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Paced Dictation Speed</label>
                    <CustomSelect 
                      value={editTestSpeed}
                      onChange={(val) => setEditTestSpeed(val)}
                      options={[
                        { value: '80 WPM', label: '80 WPM (Standard SSC Grade D)' },
                        { value: '100 WPM', label: '100 WPM (High Court / SSC Grade C)' },
                        { value: '120 WPM', label: '120 WPM (Parliament / High Speed)' },
                        { value: '140 WPM', label: '140 WPM (Senior Assembly Reporter)' }
                      ]}
                    />
                  </div>
                </div>

                {/* Language & Words Count */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Language & Font Mode</label>
                    <CustomSelect 
                      value={editTestLanguage}
                      onChange={(val) => setEditTestLanguage(val)}
                      options={[
                        { value: 'English', label: 'English' },
                        { value: 'Hindi (Kruti Dev)', label: 'Hindi (Kruti Dev 010)' },
                        { value: 'Hindi (Mangal)', label: 'Hindi (Unicode Mangal)' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Total Words Count</label>
                    <input 
                      type="number"
                      className="field-input font-mono"
                      value={editTestWords}
                      onChange={(e) => setEditTestWords(Number(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>

                {/* Fixed Typing Duration & Publish Status */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Fixed Typing Duration (Stage 2)</label>
                    <CustomSelect 
                      value={String(editTestTypingDurationMins)}
                      onChange={(val) => setEditTestTypingDurationMins(Number(val))}
                      options={[
                        { value: '5', label: '5 Minutes' },
                        { value: '10', label: '10 Minutes (Standard Exam)' },
                        { value: '15', label: '15 Minutes' },
                        { value: '20', label: '20 Minutes' },
                        { value: '30', label: '30 Minutes' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Publish Status</label>
                    <CustomSelect 
                      value={String(editTestIsPublished)}
                      onChange={(val) => setEditTestIsPublished(Number(val))}
                      options={[
                        { value: '1', label: 'Published (Visible to Candidates)' },
                        { value: '0', label: 'Draft / Unpublished (Hidden from Candidates)' }
                      ]}
                    />
                  </div>
                </div>

                {/* Audio Track URL */}
                <div className="form-group-field">
                  <label className="field-label">Audio Recording URL / Asset Path</label>
                  <input 
                    type="text"
                    className="field-input font-mono"
                    value={editTestAudioUrl}
                    onChange={(e) => setEditTestAudioUrl(e.target.value)}
                    required
                  />
                  <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                    Calibrated dictation audio (e.g. <code>/assets/sample-dictation.mp3</code>)
                  </span>
                </div>

                {/* Master Benchmark Transcript Passage */}
                <div className="form-group-field">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label className="field-label" style={{ margin: 0 }}>Master Benchmark Transcript Passage *</label>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Words: <strong className="font-mono">{editTestWords}</strong>
                    </span>
                  </div>
                  <textarea 
                    className="field-input font-mono"
                    rows={7}
                    value={editTestPassage}
                    onChange={(e) => {
                      const text = e.target.value;
                      setEditTestPassage(text);
                      const w = text.trim() ? text.trim().split(/\s+/).length : 0;
                      setEditTestWords(w);
                    }}
                    placeholder="Enter the official benchmark text for evaluation..."
                    required
                    style={{ lineHeight: 1.6 }}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#dc2626', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                    🔒 Security: This transcript remains strictly on the server and is never transmitted to students before submission.
                  </span>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="admin-modal-footer-sticky">
                <span className="footer-hint-text">
                  <ShieldCheck size={14} className="text-royal-blue" />
                  <span>Updates will immediately reflect in test sessions</span>
                </span>
                <div className="admin-modal-footer-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setEditingTest(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ background: '#0F172A', borderColor: '#0F172A', color: '#FFFFFF' }}>
                    <Save size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: View Student Attempts */}
      {viewingAttemptsTest && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide" style={{ maxWidth: '960px' }}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <div className="modal-icon-squircle bg-emerald-50">
                  <Award size={22} className="text-emerald-700" />
                </div>
                <div>
                  <h3 className="modal-main-title">Candidate Evaluation Records</h3>
                  <p className="modal-sub-title">
                    Attempts for "{viewingAttemptsTest.title}" ({viewingAttemptsTest.speed} • {viewingAttemptsTest.language})
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setViewingAttemptsTest(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-scrollable-body" style={{ padding: '1.25rem 1.5rem' }}>
              {isLoadingAttempts ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  <div className="spinner" style={{ margin: '0 auto 1rem', width: '28px', height: '28px' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Fetching candidate evaluation records from database...</p>
                </div>
              ) : testAttemptsList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#F8FAFC', borderRadius: '14px', border: '1px dashed #cbd5e1' }}>
                  <Award size={36} color="#94a3b8" style={{ margin: '0 auto 0.75rem', display: 'block' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.35rem' }}>No Candidate Attempts Yet</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '420px', margin: '0 auto' }}>
                    No students have completed this audio dictation exam yet. Submissions with calculated WPM, accuracy %, and error breakdowns will appear here automatically.
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 700, color: '#475569', borderRadius: '8px 0 0 8px' }}>Candidate</th>
                        <th style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Speed (WPM)</th>
                        <th style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Accuracy</th>
                        <th style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Mistakes</th>
                        <th style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 700, color: '#475569' }}>Status</th>
                        <th style={{ textAlign: 'right', padding: '10px 12px', fontWeight: 700, color: '#475569', borderRadius: '0 8px 8px 0' }}>Submitted At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testAttemptsList.map((att, idx) => {
                        const isQual = (att.qualificationStatus || '').toLowerCase().includes('qualified') && !(att.qualificationStatus || '').toLowerCase().includes('not');
                        return (
                          <tr key={att.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px' }}>
                              <div style={{ fontWeight: 700, color: '#0F172A' }}>{att.candidateName || att.studentName || 'Anonymous Student'}</div>
                              <div style={{ fontSize: '0.76rem', color: '#64748b', fontFamily: 'monospace' }}>{att.rollNo || att.studentRoll || 'REG-PENDING'}</div>
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                              <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem', fontFamily: 'monospace' }}>
                                {att.speedWpm || att.wpm || 0}
                              </span>
                              <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block' }}>WPM</span>
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                              <span style={{ fontWeight: 800, color: (att.accuracyPct || att.accuracy || 0) >= 95 ? '#059669' : '#dc2626', fontSize: '0.95rem', fontFamily: 'monospace' }}>
                                {att.accuracyPct || att.accuracy || 0}%
                              </span>
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                              <span style={{ fontWeight: 700, color: '#e11d48', fontFamily: 'monospace' }}>
                                {att.effectiveErrors ?? att.errors ?? 0}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>
                                (S: {att.substitutionsCount ?? 0} | O: {att.omissionsCount ?? 0} | A: {att.insertionsCount ?? 0})
                              </span>
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                              <span style={{
                                display: 'inline-block',
                                padding: '3px 10px',
                                borderRadius: '999px',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                background: isQual ? '#ECFDF5' : '#FEF2F2',
                                color: isQual ? '#059669' : '#DC2626',
                                border: `1px solid ${isQual ? '#A7F3D0' : '#FECACA'}`
                              }}>
                                {isQual ? '✓ Qualified' : '✕ Disqualified'}
                              </span>
                            </td>
                            <td style={{ padding: '12px', textAlign: 'right', fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>
                              {att.submittedAt ? new Date(att.submittedAt).toLocaleString() : 'Recent'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="admin-modal-footer-sticky" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.84rem', color: '#64748b', fontWeight: 600 }}>
                Total Submissions: <strong style={{ color: '#0F172A' }}>{testAttemptsList.length}</strong>
              </span>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setViewingAttemptsTest(null)}
              >
                Close Records
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}