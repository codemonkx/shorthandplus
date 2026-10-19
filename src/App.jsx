import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
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

import { INITIAL_USER, STENO_TESTS, TYPING_TESTS, ONLINE_CLASSES_DATA } from './data/mockData';
import './App.css';

const tabToPath = (tab) => {
  if (!tab || tab === 'landing') return '/';
  if (tab === 'online-classes') return '/online-classes';
  return `/${tab}`;
};

const pathToTab = (pathname) => {
  const clean = (pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!clean || clean === 'landing') return 'landing';
  if (clean === 'leaderboard' || clean === 'bulletin') return 'dashboard'; // redirect legacy routes to dashboard
  if (clean === 'online-class' || clean === 'online-classes') return 'online-classes';
  const validTabs = [
    'courses', 
    'classes', 
    'online-classes',
    'tests', 
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
  const [user, setUser] = useState(INITIAL_USER);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('plan-1mo');

  // Centralized Live Online Classes State (Synchronized between Admin Creation and Student Join)
  const [onlineClasses, setOnlineClasses] = useState(() => {
    try {
      const saved = localStorage.getItem('shorthand_online_classes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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

  // Exam flow states: null | 'dictation' | 'exam' | 'evaluation'
  const [examStage, setExamStage] = useState(null);
  const [currentTest, setCurrentTest] = useState(STENO_TESTS[0]);
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
      // If user was in an exam view and pressed browser Back, return safely
      setExamStage(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleStartStenoTest = (testId) => {
    setReturnTab(currentTab);
    const target = STENO_TESTS.find((t) => t.id === testId) || STENO_TESTS[0];
    setCurrentTest(target);
    setExamStage('dictation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTypingTest = (typingExercise) => {
    setReturnTab(currentTab);
    const target = TYPING_TESTS.find((t) => t.id === typingExercise.id) || typingExercise;
    const adapted = {
      id: target.id,
      title: target.name,
      category: 'Typing Speed Studio',
      speed: 'Standard',
      language: target.language,
      duration: target.time,
      totalWords: target.words,
      passageText: target.passageText || `Judicial examination rules mandate strict accuracy and rhythmic cadence. Typing proficiency in both English and Hindi requires steady key transitions without looking at keyboard layout. Practice diligently to maintain high words-per-minute standards.`
    };
    setCurrentTest(adapted);
    setExamStage('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToTyping = () => {
    setExamStage('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitExam = (submission) => {
    setLatestSubmission(submission);
    setExamStage('evaluation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const target = STENO_TESTS.find((t) => t.id === testId) || STENO_TESTS[0];
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

  const handleActivatePlan = (plan) => {
    setUser((prev) => ({
      ...(prev || INITIAL_USER),
      subscription: {
        plan: plan.name,
        status: 'Active',
        daysRemaining: plan.duration.includes('12') ? 365 : plan.duration.includes('6') ? 180 : 30,
        isPaid: true
      }
    }));
  };

  // Full-Screen Exam Modes
  if (examStage === 'dictation') {
    return (
      <div className="exam-fullscreen-wrapper">
        <DictationRoom
          test={currentTest}
          onProceedToTyping={handleProceedToTyping}
          onCancel={handleExitExam}
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
          onStartQuickTest={() => handleStartStenoTest(534)}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="saas-main-viewport">
          <TopBar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            user={user}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onOpenCheckout={() => handleOpenCheckoutWithPlan()}
            onOpenAuth={() => setAuthModalOpen(true)}
            onLogout={() => setUser(null)}
          />
          <main className="saas-content-area">
            <EvaluationResult
              submission={latestSubmission}
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
          onLogout={() => setUser(null)}
        />
        <main className="public-main-content">
          {currentTab === 'landing' && (
            <LandingPage
              onStartFullTest={handleStartStenoTest}
              onOpenAuth={() => setAuthModalOpen(true)}
              onLoginSuccess={(u) => {
                setUser(u);
                setCurrentTab('dashboard');
              }}
              onOpenCheckout={() => handleOpenCheckoutWithPlan()}
              onSelectPlan={handleOpenCheckoutWithPlan}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'courses' && (
            <CoursesPage
              onSelectPlan={handleOpenCheckoutWithPlan}
              onOpenCheckout={() => handleOpenCheckoutWithPlan()}
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

          {currentTab === 'tests' && (
            <div className="public-page-padded-wrapper">
              <StenoTestsPage
                onStartTest={handleStartStenoTest}
                onStartTypingTest={handleStartTypingTest}
              />
            </div>
          )}

          {currentTab === 'about' && (
            <div className="public-page-padded-wrapper">
              <AboutAcademyView
                onOpenCheckout={() => handleOpenCheckoutWithPlan()}
                setCurrentTab={setCurrentTab}
              />
            </div>
          )}
        </main>
        <Footer 
          onOpenCheckout={() => handleOpenCheckoutWithPlan()}
          setCurrentTab={setCurrentTab}
        />

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={(u) => setUser(u)}
        />
        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          selectedPlanId={selectedPlanId}
          onActivatePlan={handleActivatePlan}
        />
      </div>
    );
  }

  // MODE C: Director & Institute Administration Console
  if (currentTab === 'admin') {
    return (
      <AdminPortalView 
        user={user}
        setCurrentTab={setCurrentTab}
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
        onStartQuickTest={() => handleStartStenoTest(534)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="saas-main-viewport">
        <TopBar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          user={user}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenCheckout={() => handleOpenCheckoutWithPlan()}
          onOpenAuth={() => setAuthModalOpen(true)}
          onLogout={() => setUser(null)}
        />

        <main className="saas-content-area">
          {currentTab === 'dashboard' && (
            <DashboardView
              user={user}
              onStartTest={handleStartStenoTest}
              onViewResult={handleViewResult}
              onNavigate={(tab) => setCurrentTab(tab)}
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
              onStartTest={handleStartStenoTest}
              onStartTypingTest={handleStartTypingTest}
            />
          )}

          {currentTab === 'typing-studio' && (
            <TypingTestsPage
              onStartTypingTest={handleStartTypingTest}
            />
          )}

          {currentTab === 'results' && (
            <ResultsHistoryPage
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
              setCurrentTab={setCurrentTab}
            />
          )}
        </main>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        selectedPlanId={selectedPlanId}
        onActivatePlan={handleActivatePlan}
      />
    </div>
  );
}
