import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import AdmissionModal from './components/AdmissionModal';
import FloatingContactDock from './components/FloatingContactDock';
import ProfileSettingsModal from './components/ProfileSettingsModal';
import LegalPolicyModal from './components/LegalPolicyModal';
import DictationRoom from './components/DictationRoom';
import ExamEngine from './components/ExamEngine';
import EvaluationResult from './components/EvaluationResult';

import DashboardView from './views/DashboardView';
import StenoTestsPage from './views/StenoTestsPage';
import TypingTestsPage from './views/TypingTestsPage';
import ResultsHistoryPage from './views/ResultsHistoryPage';
import PricingPassesView from './views/PricingPassesView';
import AboutAcademyView from './views/AboutAcademyView';
import AdminPortalView from './views/AdminPortalView';
import LandingPage from './views/LandingPage';
import CoursesPage from './views/CoursesPage';
import ClassesPage from './views/ClassesPage';
import OnlineClassView from './views/OnlineClassView';
import AudioDictationAssessment from './components/AudioDictationAssessment';

import { INITIAL_USER, STENO_TESTS, TYPING_TESTS, ONLINE_CLASSES_DATA, INITIAL_TRANSACTIONS, INITIAL_ACADEMY_COURSES } from './data/mockData';
import api from './services/api';
import { evaluateTranscription } from './utils/diffEvaluation';
import './App.css';
import './theme-tryhackme.css';

const tabToPath = (tab) => {
  if (!tab || tab === 'landing') return '/';
  if (tab === 'online-classes') return '/online-classes';
  return `/${tab}`;
};

const pathToTab = (pathname) => {
  const clean = (pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean || clean === 'landing') return 'landing';
  if (clean === 'tests') return 'courses'; // redirect public tests to courses
  if (clean === 'leaderboard') return 'dashboard'; // redirect removed leaderboard to dashboard
  if (clean === 'bulletin') return 'dashboard'; // redirect legacy routes to dashboard
  if (clean === 'online-class' || clean === 'online-classes') return 'online-classes';
  const validTabs = [
    'courses', 
    'classes', 
    'online-classes',
    'about', 
    'admin', 
    'dashboard', 
    'steno-vault', 
    'typing-studio', 
    'results', 
    'pricing'
  ];
  return validTabs.includes(clean) ? clean : 'landing';
};

export default function App() {
  // Initialize tab from current window URL path or fallback to landing
  const [currentTab, _setCurrentTab] = useState(() => {
    return pathToTab(window.location.pathname);
  });
  const [returnTab, setReturnTab] = useState('landing');
  const [user, setUser] = useState(() => {
    try {
      const isExplicitlyLoggedOut = localStorage.getItem('shorthand_user_logged_out');
      if (isExplicitlyLoggedOut === 'true') return null;
      const saved = localStorage.getItem('shorthand_current_user');
      if (saved) return JSON.parse(saved);
      return INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('student'); // 'student' | 'admin' | 'register'
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('plan-1mo');
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState('terms');
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);

  const handleOpenLegal = (tab = 'terms') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  // Set TryHackMe Cyber Dark Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'tryhackme');
  }, []);

  // Synchronize state with real backend on load
  useEffect(() => {
    const isExplicitlyLoggedOut = localStorage.getItem('shorthand_user_logged_out');
    if (isExplicitlyLoggedOut === 'true') {
      setUser(null);
    } else {
      api.auth.getMe().then((res) => {
        if (res?.user) {
          setUser(res.user);
          try {
            localStorage.setItem('shorthand_current_user', JSON.stringify(res.user));
          } catch {}
        }
      }).catch(() => {});
    }

    api.classes.getLive().then((res) => {
      if (res?.classes && res.classes.length > 0) setOnlineClasses(res.classes);
    }).catch(() => {});

    api.courses.getAll().then((res) => {
      if (res?.courses && res.courses.length > 0) setAcademyCourses(res.courses);
    }).catch(() => {});

    api.tests.getAll('steno').then((res) => {
      if (res?.tests && res.tests.length > 0) setStenoTests(res.tests);
    }).catch(() => {});

    api.tests.getAll('typing').then((res) => {
      if (res?.tests && res.tests.length > 0) setTypingTests(res.tests);
    }).catch(() => {});

    api.admin.getTransactions().then((res) => {
      if (res?.transactions && res.transactions.length > 0) setTransactions(res.transactions);
    }).catch(() => {});
  }, []);

  // Centralized Live Online Classes State
  const [onlineClasses, setOnlineClasses] = useState(() => {
    try {
      const saved = localStorage.getItem('shorthand_online_classes');
      if (saved) {
        let parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c) => ({
            ...c,
            instructor: (!c.instructor || c.instructor.includes('Gagan')) ? 'Shadab Sir' : c.instructor,
            instructorRole: (!c.instructorRole || c.instructorRole.includes('18+')) ? 'Faculty Director • 12 Years Experience' : c.instructorRole
          }));
        }
      }
    } catch (e) {
      console.warn('Failed to parse online classes from localStorage', e);
    }
    return ONLINE_CLASSES_DATA;
  });

  const [selectedOnlineClassId, setSelectedOnlineClassId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('shorthand_online_classes', JSON.stringify(onlineClasses));
    } catch (e) {
      console.warn('Failed to save online classes to localStorage', e);
    }
  }, [onlineClasses]);

  const handleCreateOnlineClass = (newClass) => {
    setOnlineClasses((prev) => [newClass, ...prev]);
  };

  const handleToggleLiveOnlineClass = (classId) => {
    setOnlineClasses((prev) => prev.map((c) => {
      if (c.id === classId) {
        const nextLive = !c.isLive;
        return {
          ...c,
          isLive: nextLive,
          tag: nextLive ? '🔴 ZOOM LIVE CALL ACTIVE' : "TODAY'S REPLAY & ZOOM ARCHIVE",
          badgeClass: nextLive ? 'badge-live' : 'badge-replay'
        };
      }
      return c;
    }));
  };

  const handleDeleteOnlineClass = (classId) => {
    setOnlineClasses((prev) => prev.filter((c) => c.id !== classId));
  };

  const handleUpdateOnlineClass = (updatedClass) => {
    setOnlineClasses((prev) => prev.map((c) => (c.id === updatedClass.id ? updatedClass : c)));
  };

  // Centralized Audio Dictations (Steno Tests) State
  const [stenoTests, setStenoTests] = useState(() => {
    try {
      const saved = localStorage.getItem('shorthand_steno_tests');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse steno tests from localStorage', e);
    }
    return STENO_TESTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('shorthand_steno_tests', JSON.stringify(stenoTests));
    } catch (e) {
      console.warn('Failed to save steno tests to localStorage', e);
    }
  }, [stenoTests]);

  const handleAddStenoTest = (newTest) => {
    setStenoTests((prev) => [newTest, ...prev]);
  };

  const handleUpdateStenoTest = (id, updatedFields) => {
    setStenoTests((prev) => prev.map((t) => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const handleDeleteStenoTest = (id) => {
    setStenoTests((prev) => prev.filter((t) => t.id !== id));
  };

  // Centralized Text Typing Tests State
  const [typingTests, setTypingTests] = useState(() => {
    try {
      const saved = localStorage.getItem('shorthand_typing_tests');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse typing tests from localStorage', e);
    }
    return TYPING_TESTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('shorthand_typing_tests', JSON.stringify(typingTests));
    } catch (e) {
      console.warn('Failed to save typing tests to localStorage', e);
    }
  }, [typingTests]);

  const handleAddTypingTest = (newExercise) => {
    setTypingTests((prev) => [newExercise, ...prev]);
  };

  const handleDeleteTypingTest = (id) => {
    setTypingTests((prev) => prev.filter((t) => t.id !== id));
  };

  // Centralized Monthly Transactions & Payment Ledger State
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('shorthand_transactions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse transactions from localStorage', e);
    }
    return INITIAL_TRANSACTIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('shorthand_transactions', JSON.stringify(transactions));
    } catch (e) {
      console.warn('Failed to save transactions to localStorage', e);
    }
  }, [transactions]);

  const handleAddTransaction = (newTxn) => {
    setTransactions((prev) => [newTxn, ...prev]);
  };

  // Centralized Academy Courses State (Dynamic Catalog)
  const [academyCourses, setAcademyCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('shorthand_academy_courses');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse academy courses from localStorage', e);
    }
    return INITIAL_ACADEMY_COURSES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('shorthand_academy_courses', JSON.stringify(academyCourses));
    } catch (e) {
      console.warn('Failed to save academy courses to localStorage', e);
    }
  }, [academyCourses]);

  const handleAddCourse = (newCourse) => {
    setAcademyCourses((prev) => [newCourse, ...prev]);
  };

  const handleUpdateCourse = (updatedCourse) => {
    setAcademyCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
  };

  const handleDeleteCourse = (courseId) => {
    setAcademyCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const handleOpenAuth = (tab = 'student') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  // Exam flow states: null | 'dictation' | 'exam' | 'evaluation'
  const [examStage, setExamStage] = useState(null);
  const [currentTest, setCurrentTest] = useState(stenoTests[0] || STENO_TESTS[0]);
  const [latestSubmission, setLatestSubmission] = useState(null);

  // Sync tab changes with browser URL and browser history (HTML5 History API)
  const setCurrentTab = (newTab, replace = false) => {
    _setCurrentTab(newTab);
    const targetPath = tabToPath(newTab);
    if (window.location.pathname !== targetPath) {
      if (replace) {
        window.history.replaceState({ tab: newTab }, '', targetPath);
      } else {
        window.history.pushState({ tab: newTab }, '', targetPath);
      }
    }
  };

  // Listen for browser Back and Forward navigation buttons (popstate)
  useEffect(() => {
    // Record initial history state if not present
    if (!window.history.state) {
      window.history.replaceState({ tab: currentTab }, '', tabToPath(currentTab));
    }

    const handlePopState = (event) => {
      if (event.state && event.state.tab) {
        _setCurrentTab(event.state.tab);
      } else {
        _setCurrentTab(pathToTab(window.location.pathname));
      }
      setExamStage(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Centralized Login Success Handler
  const handleLoginSuccess = (u) => {
    try {
      localStorage.removeItem('shorthand_user_logged_out');
      if (u) {
        localStorage.setItem('shorthand_current_user', JSON.stringify(u));
      }
    } catch {}
    setUser(u);
    setCurrentTab(u?.role === 'admin' ? 'admin' : 'dashboard');
    setAuthModalOpen(false);
  };

  // Centralized Logout Handler: Always clears session and redirects to Homepage (landing) from ANY page
  const handleLogout = () => {
    try {
      localStorage.setItem('shorthand_user_logged_out', 'true');
      localStorage.removeItem('shorthand_current_user');
      sessionStorage.removeItem('shorthand_admin_authenticated');
      api.auth.logout();
    } catch (e) {
      console.warn('Logout API error', e);
    }
    setUser(null);
    setCurrentTab('landing');
    setSidebarOpen(false);
    setExamStage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const checkAccessPermission = () => {
    if (!user) {
      handleOpenAuth('student');
      return false;
    }
    if (user.role === 'admin') return true;
    const isSubActive = user.subscription?.status === 'Active' && (user.subscription?.daysRemaining > 0 || user.subscription?.isPaid);
    if (!isSubActive) {
      setSelectedPlanId('plan-1mo');
      setCheckoutModalOpen(true);
      return false;
    }
    return true;
  };

  const handleStartStenoTest = (testId) => {
    if (!checkAccessPermission()) return;
    setReturnTab(currentTab);
    const target = stenoTests.find((t) => t.id === testId) || stenoTests[0] || STENO_TESTS[0];
    setCurrentTest({
      ...target,
      testType: 'steno',
      isSteno: true
    });
    setExamStage('dictation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTypingTest = (typingExercise) => {
    if (!checkAccessPermission()) return;
    setReturnTab(currentTab);
    const target = typingTests.find((t) => t.id === typingExercise.id) || typingExercise;
    const adapted = {
      id: target.id,
      title: target.name || target.title,
      category: 'Typing Speed Studio',
      speed: 'Standard',
      language: target.language || 'English',
      duration: target.time || target.duration || '10 Mins',
      totalWords: target.words || target.totalWords || 350,
      passageText: target.passageText || target.passage_text || `Judicial examination rules mandate strict accuracy and rhythmic cadence. Typing proficiency in both English and Hindi requires steady key transitions without looking at keyboard layout. Practice diligently to maintain high words-per-minute standards.`,
      testType: 'typing',
      isSteno: false
    };
    setCurrentTest(adapted);
    setExamStage('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToTyping = () => {
    setExamStage('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitExam = async (submission) => {
    setLatestSubmission(submission);
    setExamStage('evaluation');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Submit candidate examination result to database
    try {
      // Use official LCS evaluation engine for precise word alignment
      const evalMetrics = evaluateTranscription(
        submission.test.passageText || '',
        submission.typedText || '',
        submission.timeTakenSecs || 300
      );

      await api.tests.submitResult({
        testId: submission.test.id,
        testTitle: submission.test.title,
        testType: submission.test.type || 'steno',
        speedWpm: evalMetrics.netWpm,
        accuracyPct: evalMetrics.accuracy,
        totalWords: evalMetrics.totalMasterWords,
        typedWords: evalMetrics.totalTypedWords,
        fullMistakes: evalMetrics.fullMistakes,
        halfMistakes: evalMetrics.halfMistakes,
        effectiveErrors: evalMetrics.effectiveErrors,
        qualificationStatus: evalMetrics.qualificationStatus,
        timeTakenSecs: submission.timeTakenSecs,
        backspaceCount: submission.backspaceCount,
        tabSwitchWarnings: submission.tabSwitchWarnings
      });
    } catch (e) {
      console.warn('Exam submission recorded locally:', e);
    }
  };

  const handleRetakeExam = () => {
    setExamStage('dictation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitExam = (toDashboard = false) => {
    setExamStage(null);
    if (toDashboard) {
      setCurrentTab('dashboard');
    } else {
      setCurrentTab(returnTab || 'tests');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewResult = (testId) => {
    const target = stenoTests.find((t) => t.id === testId) || stenoTests[0] || STENO_TESTS[0];
    setLatestSubmission({
      test: target,
      typedText: target.passageText.slice(0, 380) + " election expenditure was opposed in state assemblies by parliament.",
      timeTakenSecs: 340,
      backspaceCount: 18,
      tabSwitchWarnings: 0
    });
    setExamStage('evaluation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCheckoutWithPlan = (planId) => {
    if (planId) setSelectedPlanId(planId);
    setCheckoutModalOpen(true);
  };

  const handleActivatePlan = (plan, paymentDetails) => {
    const isMonthly = (plan.duration && plan.duration.toLowerCase().includes('month')) || plan.id === 'plan-1mo' || plan.id === 'course-court' || plan.id === 'course-ssc';
    
    // Create and append transaction record to centralized transactions state
    const newTxn = {
      id: paymentDetails?.txnId || `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      student: user?.name || "Shadab Khan",
      rollNo: user?.rollNo || "SP-2026-084",
      plan: plan.name,
      amount: plan.price,
      mode: paymentDetails?.method || "UPI (Instant)",
      date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      billingCycle: isMonthly ? "Monthly Subscription" : plan.duration,
      status: "Auto-Verified"
    };
    handleAddTransaction(newTxn);

    const nextBilling = new Date();
    nextBilling.setMonth(nextBilling.getMonth() + 1);

    setUser((prev) => ({
      ...(prev || INITIAL_USER),
      subscription: {
        plan: plan.name,
        status: 'Active',
        isMonthlySubscription: isMonthly,
        monthlyAmount: `₹${plan.price} / Month`,
        nextBillingDate: nextBilling.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        daysRemaining: plan.duration && plan.duration.includes('12') ? 365 : plan.duration && plan.duration.includes('6') ? 180 : 30,
        isPaid: true
      }
    }));
  };

  // Full-Screen Exam Modes
  if (examStage === 'dictation') {
    return (
      <div className="exam-fullscreen-wrapper">
        <AudioDictationAssessment
          test={currentTest}
          user={user}
          onBackToVault={() => handleExitExam(false)}
          onViewHistory={() => {
            handleExitExam(false);
            setCurrentTab('results');
          }}
        />
      </div>
    );
  }

  if (examStage === 'exam') {
    return (
      <div className="exam-fullscreen-wrapper">
        <ExamEngine
          test={currentTest}
          onSubmitExam={handleSubmitExam}
          onCancel={handleExitExam}
        />
      </div>
    );
  }

  if (examStage === 'evaluation') {
    return (
      <div className="corporate-app-shell">
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          user={user}
          onOpenCheckout={() => handleOpenCheckoutWithPlan()}
          onStartQuickTest={() => handleStartStenoTest(stenoTests[0]?.id || 534)}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />
        <div className="saas-main-viewport">
          <TopBar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            user={user}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onOpenCheckout={() => handleOpenCheckoutWithPlan()}
            onOpenAuth={() => handleOpenAuth('student')}
            onLogout={handleLogout}
          />
          <main className="saas-content-area">
            <EvaluationResult
              submission={latestSubmission}
              user={user}
              onRetake={handleRetakeExam}
              onBackToDashboard={() => handleExitExam(true)}
              onBackToTests={() => handleExitExam(false)}
            />
          </main>
        </div>
      </div>
    );
  }

  // MODE A: Full Public Marketing Website (Home, Courses, Classes, Tests, About)
  const publicTabs = ['landing', 'courses', 'classes', 'tests', 'about'];
  if (publicTabs.includes(currentTab)) {
    return (
      <div className="public-website-shell">
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          user={user}
          onOpenCheckout={() => handleOpenCheckoutWithPlan()}
          onLogout={handleLogout}
          onOpenAuth={handleOpenAuth}
          onOpenAdmission={() => setAdmissionModalOpen(true)}
        />
        <main className="public-main-content">
          {currentTab === 'landing' && (
            <LandingPage
              onStartFullTest={handleStartStenoTest}
              onOpenAuth={() => handleOpenAuth('student')}
              onLoginSuccess={handleLoginSuccess}
              onOpenCheckout={() => handleOpenCheckoutWithPlan()}
              onSelectPlan={handleOpenCheckoutWithPlan}
              onOpenAdmission={() => setAdmissionModalOpen(true)}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'courses' && (
            <CoursesPage
              courses={academyCourses}
              onSelectPlan={handleOpenCheckoutWithPlan}
              onOpenCheckout={(plan) => handleOpenCheckoutWithPlan(plan)}
              onOpenAdmission={() => setAdmissionModalOpen(true)}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'classes' && (
            <ClassesPage
              onOpenCheckout={() => handleOpenCheckoutWithPlan()}
              setCurrentTab={setCurrentTab}
              onlineClasses={onlineClasses}
              onSelectClass={(classId) => {
                setSelectedOnlineClassId(classId);
                setCurrentTab('online-classes');
              }}
            />
          )}

          {currentTab === 'about' && (
            <div className="public-page-padded-wrapper">
              <AboutAcademyView
                onOpenCheckout={() => handleOpenCheckoutWithPlan()}
                onOpenAdmission={() => setAdmissionModalOpen(true)}
                setCurrentTab={setCurrentTab}
              />
            </div>
          )}
        </main>
        <Footer 
          onOpenCheckout={() => handleOpenCheckoutWithPlan()}
          setCurrentTab={setCurrentTab}
          onOpenLegal={handleOpenLegal}
        />

        <AuthModal
          isOpen={authModalOpen}
          initialTab={authModalTab}
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
        <AdmissionModal
          isOpen={admissionModalOpen}
          onClose={() => setAdmissionModalOpen(false)}
          onOpenCheckout={handleOpenCheckoutWithPlan}
        />
        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          selectedPlanId={selectedPlanId}
          onActivatePlan={handleActivatePlan}
          user={user}
          onOpenLegal={handleOpenLegal}
        />
        <ProfileSettingsModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          user={user}
          onUpdateUser={(updated) => {
            setUser(updated);
            try {
              localStorage.setItem('shorthand_current_user', JSON.stringify(updated));
            } catch {}
          }}
          onOpenCheckout={handleOpenCheckoutWithPlan}
        />
        <LegalPolicyModal
          isOpen={legalModalOpen}
          initialTab={legalModalTab}
          onClose={() => setLegalModalOpen(false)}
        />
        <FloatingContactDock 
          onOpenAdmission={() => setAdmissionModalOpen(true)} 
        />
      </div>
    );
  }

  // MODE C: Director & Institute Administration Console
  if (currentTab === 'admin') {
    if (user && user.role === 'student') {
      setCurrentTab('dashboard');
      return null;
    }

    return (
      <AdminPortalView 
        user={user}
        setCurrentTab={setCurrentTab}
        onLogout={handleLogout}
        onStartTest={handleStartStenoTest}
        onStartTypingTest={handleStartTypingTest}
        onlineClasses={onlineClasses}
        onCreateOnlineClass={handleCreateOnlineClass}
        onToggleLiveOnlineClass={handleToggleLiveOnlineClass}
        onDeleteOnlineClass={handleDeleteOnlineClass}
        onUpdateOnlineClass={handleUpdateOnlineClass}
        onJoinClassAsAdmin={(classId) => {
          setSelectedOnlineClassId(classId);
          setCurrentTab('online-classes');
        }}
        stenoTests={stenoTests}
        onAddStenoTest={handleAddStenoTest}
        onUpdateStenoTest={handleUpdateStenoTest}
        onDeleteStenoTest={handleDeleteStenoTest}
        typingTests={typingTests}
        onAddTypingTest={handleAddTypingTest}
        onDeleteTypingTest={handleDeleteTypingTest}
        transactions={transactions}
        courses={academyCourses}
        onAddCourse={handleAddCourse}
        onUpdateCourse={handleUpdateCourse}
        onDeleteCourse={handleDeleteCourse}
      />
    );
  }

  // MODE B: Candidate Portal (Dashboard, Steno Vault, Typing, Results, Leaderboard, Diplomas, Pricing)
  return (
    <div className="corporate-app-shell">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        onOpenCheckout={() => handleOpenCheckoutWithPlan()}
        onStartQuickTest={() => handleStartStenoTest(stenoTests[0]?.id || 534)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        onOpenProfileSettings={() => setProfileModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <div className="saas-main-viewport">
        <TopBar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          user={user}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenCheckout={() => handleOpenCheckoutWithPlan()}
          onOpenAuth={() => handleOpenAuth('student')}
          onLogout={handleLogout}
          onOpenProfileSettings={() => setProfileModalOpen(true)}
        />

        <main className="saas-content-area">
          {currentTab === 'dashboard' && (
            <DashboardView
              user={user}
              onStartTest={handleStartStenoTest}
              onViewResult={handleViewResult}
              onNavigate={(tab) => setCurrentTab(tab)}
              stenoTests={stenoTests}
              typingTests={typingTests}
              transactions={transactions}
              onOpenCheckout={handleOpenCheckoutWithPlan}
            />
          )}

          {currentTab === 'online-classes' && (
            <OnlineClassView
              user={user}
              onStartTest={handleStartStenoTest}
              onStartTypingTest={handleStartTypingTest}
              onOpenCheckout={() => handleOpenCheckoutWithPlan()}
              setCurrentTab={setCurrentTab}
              onlineClasses={onlineClasses}
              selectedClassId={selectedOnlineClassId}
            />
          )}

          {(currentTab === 'steno-vault' || currentTab === 'tests') && (
            <StenoTestsPage
              tests={stenoTests}
              typingTests={typingTests}
              onStartTest={handleStartStenoTest}
              onStartTypingTest={handleStartTypingTest}
            />
          )}

          {currentTab === 'typing-studio' && (
            <TypingTestsPage
              typingTests={typingTests}
              onStartTypingTest={handleStartTypingTest}
            />
          )}

          {currentTab === 'results' && (
            <ResultsHistoryPage
              user={user}
              onViewResult={handleViewResult}
            />
          )}

          {(currentTab === 'pricing' || currentTab === 'courses') && (
            <PricingPassesView
              onSelectPlan={handleOpenCheckoutWithPlan}
              onOpenCheckout={() => handleOpenCheckoutWithPlan()}
            />
          )}

          {currentTab === 'about' && (
            <AboutAcademyView
              onOpenCheckout={() => handleOpenCheckoutWithPlan()}
              onOpenAdmission={() => setAdmissionModalOpen(true)}
              setCurrentTab={setCurrentTab}
            />
          )}
        </main>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        initialTab={authModalTab}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <AdmissionModal
        isOpen={admissionModalOpen}
        onClose={() => setAdmissionModalOpen(false)}
        onOpenCheckout={handleOpenCheckoutWithPlan}
      />
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        selectedPlanId={selectedPlanId}
        onActivatePlan={handleActivatePlan}
        user={user}
        onOpenLegal={handleOpenLegal}
      />
      <ProfileSettingsModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        onUpdateUser={(updated) => {
          setUser(updated);
          try {
            localStorage.setItem('shorthand_current_user', JSON.stringify(updated));
          } catch {}
        }}
        onOpenCheckout={handleOpenCheckoutWithPlan}
      />
      <LegalPolicyModal
        isOpen={legalModalOpen}
        initialTab={legalModalTab}
        onClose={() => setLegalModalOpen(false)}
      />
      <FloatingContactDock 
        onOpenAdmission={() => setAdmissionModalOpen(true)} 
      />
    </div>
  );
}
