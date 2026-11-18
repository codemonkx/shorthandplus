import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  ShieldCheck, 
  FileCheck, 
  ChevronRight, 
  Zap, 
  Keyboard, 
  Headphones, 
  Award, 
  TrendingUp,
  BarChart3,
  Calendar,
  Sparkles,
  Video,
  CreditCard,
  RefreshCw,
  ExternalLink,
  Users,
  Bell,
  Radio,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { STENO_TESTS, TYPING_TESTS, INITIAL_TRANSACTIONS, ONLINE_CLASSES_DATA } from '../data/mockData';

export default function DashboardView({ 
  user, 
  onStartTest, 
  onViewResult, 
  onNavigate,
  stenoTests = STENO_TESTS,
  typingTests = TYPING_TESTS,
  transactions = INITIAL_TRANSACTIONS,
  onlineClasses = [],
  onOpenCheckout
}) {
  const allSteno = stenoTests && stenoTests.length > 0 ? stenoTests : STENO_TESTS;
  const allTyping = typingTests && typingTests.length > 0 ? typingTests : TYPING_TESTS;
  const recommended = allSteno[0] || STENO_TESTS[0];
  const [activeSpeed, setActiveSpeed] = useState(80);
  const [classFilterTab, setClassFilterTab] = useState('upcoming'); // 'upcoming' | 'completed'

  // Live real-time tick for countdown clocks
  const [nowTime, setNowTime] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNowTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const speedTiers = [
    { wpm: 60, label: 'State Secretariat & District Courts', level: 'Foundation', color: 'emerald' },
    { wpm: 80, label: 'SSC Stenographer Grade D Bench', level: 'Active Target', color: 'blue', isTarget: true },
    { wpm: 100, label: 'High Court Bench & SSC Grade C', level: 'Advanced', color: 'indigo' },
    { wpm: 120, label: 'Parliamentary Reporter & Senior Bench', level: 'Elite', color: 'amber' }
  ];

  // Active pass and course access resolution
  const hasActivePass = user?.subscription?.status === 'Active' || Boolean(user?.subscription?.isPaid) || user?.role === 'admin';
  const enrolledPlan = (user?.subscription?.plan || '').toLowerCase();
  const rawClasses = onlineClasses && onlineClasses.length > 0 ? onlineClasses : ONLINE_CLASSES_DATA;

  // Filter classes according to student's enrolled courses or pass
  const enrolledClasses = rawClasses.filter(cls => {
    if (user?.role === 'admin') return true;
    if (
      enrolledPlan.includes('12 month') ||
      enrolledPlan.includes('annual') ||
      enrolledPlan.includes('unlimited') ||
      enrolledPlan.includes('pro') ||
      enrolledPlan.includes('monthly test series') ||
      enrolledPlan.includes('scholar') ||
      enrolledPlan.includes('master')
    ) {
      return true;
    }
    if (user?.courseId && cls.courseId === user.courseId) return true;
    return hasActivePass;
  });

  // Calculate countdown string
  const getCountdownText = (item) => {
    if (item.status === 'live' || item.isLive) return '🔴 LIVE NOW';
    if (item.status === 'completed') return 'Completed';
    if (item.status === 'cancelled') return 'Cancelled';

    try {
      const datePart = item.scheduledDate || new Date().toISOString().split('T')[0];
      const timePart = item.startTime || item.time || '8:30 AM';
      const cleanTime = timePart.split('(')[0].trim();
      const targetDate = new Date(`${datePart} ${cleanTime}`);
      const diffMs = targetDate.getTime() - nowTime;

      if (isNaN(diffMs)) {
        return `Scheduled: ${cleanTime}`;
      }

      if (diffMs <= 0) {
        return 'Starting shortly • Waiting for host';
      }

      const diffSecs = Math.floor(diffMs / 1000);
      const hours = Math.floor(diffSecs / 3600);
      const minutes = Math.floor((diffSecs % 3600) / 60);
      const seconds = diffSecs % 60;

      if (hours > 24) {
        const days = Math.floor(hours / 24);
        return `Starts in ${days}d ${hours % 24}h`;
      }
      if (hours > 0) {
        return `Starts in ${hours}h ${minutes}m ${seconds}s`;
      }
      return `Starts in ${minutes}m ${seconds}s`;
    } catch {
      return 'Upcoming Class';
    }
  };

  // Find priority class for the top alert banner (Live Now or starting within 30m)
  const priorityLiveClass = enrolledClasses.find(c => c.status === 'live' || c.isLive);
  const priorityUpcomingClass = !priorityLiveClass ? enrolledClasses.find(c => {
    if (c.status === 'completed' || c.status === 'cancelled') return false;
    try {
      const datePart = c.scheduledDate || new Date().toISOString().split('T')[0];
      const timePart = (c.startTime || c.time || '8:30 AM').split('(')[0].trim();
      const target = new Date(`${datePart} ${timePart}`).getTime();
      const diff = target - nowTime;
      return diff > 0 && diff <= 30 * 60 * 1000;
    } catch {
      return false;
    }
  }) : null;

  // Split classes by tab
  const upcomingAndLiveClasses = enrolledClasses.filter(c => c.status !== 'completed');
  const completedClasses = enrolledClasses.filter(c => c.status === 'completed');

  const recentPractices = [
    {
      id: 534,
      title: 'OCT 6 BENCH - Election Expenditure & Reforms',
      date: '09 Oct 2026',
      speed: '78.0 WPM',
      accuracy: '92.9%',
      words: '422 / 437',
      status: 'Qualified (Rank #6)'
    },
    {
      id: 535,
      title: 'Patna High Court Criminal Appeal 412',
      date: '08 Oct 2026',
      speed: '82.5 WPM',
      accuracy: '94.2%',
      words: '495 / 520',
      status: 'Qualified (Rank #4)'
    },
    {
      id: 101,
      title: 'Exercise 75 - Business Letters & Office Memos',
      date: '04 Oct 2026',
      speed: '42.0 WPM',
      accuracy: '98.0%',
      words: '348 / 350',
      status: 'Qualified (Rank #2)'
    }
  ];

  // Filter transactions for student view
  const studentTransactions = transactions && transactions.length > 0 ? transactions.slice(0, 5) : INITIAL_TRANSACTIONS;

  return (
    <div className="simple-dashboard-root">
      {/* =========================================================================
          EXECUTIVE GREETING HEADER
          ========================================================================= */}
      <section className="dashboard-welcome-header">
        <div className="welcome-text-cluster">
          <div className="welcome-badge-line">
            <span className="welcome-status-pill">
              <span className="status-live-dot" />
              <span>SSC & HIGH COURT 2026 BATCH</span>
            </span>
            <span className="welcome-target-pill">
              <ShieldCheck size={12} className="text-burgundy" />
              <span>Roll: {user?.rollNo || 'SP-2026-BB4'}</span>
            </span>
          </div>

          <h1 className="welcome-headline">
            Welcome back, <span className="welcome-name">{user?.name || 'Shadab Khan'}</span>
          </h1>

          <p className="welcome-subtext">
            Your stenographic accuracy is currently <strong className="text-emerald-700">95.8% (above passing cutoff)</strong>. You have <strong>{allSteno.length} Audio Dictations</strong> and <strong>{allTyping.length} Typing Drills</strong> ready.
          </p>
        </div>

        <div className="welcome-actions-cluster">
          <button 
            className="btn-welcome-primary"
            onClick={() => onStartTest(recommended.id)}
          >
            <Play size={15} fill="currentColor" />
            <span>Start Daily 80 WPM Test</span>
          </button>
          
          <button 
            className="btn-welcome-secondary"
            onClick={() => onNavigate('typing-studio')}
          >
            <Keyboard size={15} />
            <span>Typing Studio ({allTyping.length})</span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          LIVE CLASS REMINDER BANNER (High Visibility Priority Callout)
          ========================================================================= */}
      {priorityLiveClass && (
        <section className="priority-live-banner" style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          border: '1.5px solid #e11d48',
          borderRadius: '16px',
          padding: '1.25rem 1.75rem',
          marginBottom: '1.75rem',
          boxShadow: '0 8px 24px rgba(225, 29, 72, 0.16)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '300px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: '#e11d48',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(225, 29, 72, 0.4)'
            }}>
              <Radio size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                <span style={{
                  background: 'rgba(225, 29, 72, 0.25)',
                  border: '1px solid #e11d48',
                  color: '#fecdd3',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  letterSpacing: '0.04em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f43f5e', animation: 'beaconPulse 1.2s infinite' }} />
                  GOOGLE MEET LIVE CLASS IN SESSION
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {priorityLiveClass.courseName}
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
                {priorityLiveClass.title}
              </h3>
              <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#cbd5e1' }}>
                Instructor: <strong>{priorityLiveClass.instructor}</strong> • Code: <code style={{ fontFamily: 'monospace', color: '#67e8f9' }}>{priorityLiveClass.meetCode}</code>
              </p>
            </div>
          </div>

          <a 
            href={priorityLiveClass.meetUrl || priorityLiveClass.googleMeetUrl || (priorityLiveClass.meetCode ? `https://meet.google.com/${priorityLiveClass.meetCode}` : 'https://meet.google.com/new')}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#0f766e',
              border: '1px solid #14b8a6',
              color: '#ffffff',
              padding: '0.8rem 1.6rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.92rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(15, 118, 110, 0.4)',
              transition: 'all 0.15s ease'
            }}
          >
            <Video size={17} />
            <span>Join Google Meet Classroom</span>
            <ExternalLink size={14} />
          </a>
        </section>
      )}

      {priorityUpcomingClass && (
        <section style={{
          background: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '14px',
          padding: '1rem 1.5rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} className="text-amber-600" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                  CLASS REMINDER • {getCountdownText(priorityUpcomingClass)}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#78716c' }}>({priorityUpcomingClass.courseName})</span>
              </div>
              <strong style={{ display: 'block', fontSize: '0.92rem', color: '#0f172a' }}>
                {priorityUpcomingClass.title}
              </strong>
            </div>
          </div>

          <a 
            href={priorityUpcomingClass.meetUrl || priorityUpcomingClass.googleMeetUrl || (priorityUpcomingClass.meetCode ? `https://meet.google.com/${priorityUpcomingClass.meetCode}` : 'https://meet.google.com/new')}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#0f172a',
              color: '#ffffff',
              padding: '0.55rem 1.1rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.82rem',
              textDecoration: 'none'
            }}
          >
            <span>Open Google Meet Room</span>
            <ExternalLink size={13} />
          </a>
        </section>
      )}

      {/* =========================================================================
          EXECUTIVE 4-METRIC KPI GRID
          ========================================================================= */}
      <section className="dashboard-kpi-grid">
        <div className="clean-kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-label">Shorthand Speed</span>
            <div className="kpi-icon-wrap is-emerald">
              <Zap size={16} />
            </div>
          </div>
          <div className="kpi-metric-row">
            <span className="kpi-number font-mono">82.5</span>
            <span className="kpi-unit">WPM</span>
          </div>
          <div className="kpi-trend-caption is-up">
            <TrendingUp size={12} />
            <span>Target: 80 WPM (Exceeded)</span>
          </div>
        </div>

        <div className="clean-kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-label">Transcription Accuracy</span>
            <div className="kpi-icon-wrap is-blue">
              <Target size={16} />
            </div>
          </div>
          <div className="kpi-metric-row">
            <span className="kpi-number font-mono">95.8%</span>
            <span className="kpi-unit">Ratio</span>
          </div>
          <div className="kpi-trend-caption is-up">
            <CheckCircle2 size={12} />
            <span>Cutoff: 93% (Passed)</span>
          </div>
        </div>

        <div className="clean-kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-label">Full Tests Completed</span>
            <div className="kpi-icon-wrap is-indigo">
              <FileCheck size={16} />
            </div>
          </div>
          <div className="kpi-metric-row">
            <span className="kpi-number font-mono">48</span>
            <span className="kpi-unit">Sessions</span>
          </div>
          <div className="kpi-trend-caption is-neutral">
            <span>+3 evaluations this week</span>
          </div>
        </div>

        <div className="clean-kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-card-label">Speed Tier Benchmark</span>
            <div className="kpi-icon-wrap is-amber">
              <Award size={16} />
            </div>
          </div>
          <div className="kpi-metric-row">
            <span className="kpi-number font-mono">{activeSpeed}</span>
            <span className="kpi-unit">WPM</span>
          </div>
          <div className="kpi-trend-caption is-up">
            <span>SSC Grade D & High Court</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORKBENCH 2-COLUMN SECTION: Practice Hub + Speed Tiers
          ========================================================================= */}
      <section className="dashboard-two-col-layout">
        {/* Left Column: Daily Steno Practice Hub */}
        <div className="clean-workbench-card">
          <div className="workbench-header">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-emerald font-bold">TODAY'S BENCHMARK</span>
                <span className="text-xs text-muted font-mono">{recommended.date}</span>
              </div>
              <h2 className="workbench-title">{recommended.title}</h2>
              <p className="workbench-description">
                Official audio dictation standard for SSC Grade D & State High Courts. Includes 5-minute audio with countdown and standard transcription editor.
              </p>
            </div>
          </div>

          <div className="workbench-specs-strip">
            <div className="spec-pill">
              <span className="spec-key">Speed</span>
              <strong className="spec-val font-mono">{recommended.speed}</strong>
            </div>
            <div className="spec-pill">
              <span className="spec-key">Words</span>
              <strong className="spec-val font-mono">{recommended.words}</strong>
            </div>
            <div className="spec-pill">
              <span className="spec-key">Difficulty</span>
              <strong className="spec-val text-amber-700">{recommended.difficulty}</strong>
            </div>
            <div className="spec-pill">
              <span className="spec-key">Authority</span>
              <strong className="spec-val text-slate-700">{recommended.source}</strong>
            </div>
          </div>

          <div className="workbench-cta-bar">
            <button 
              className="btn-start-primary"
              onClick={() => onStartTest(recommended.id)}
            >
              <Play size={16} fill="currentColor" />
              <span>Launch Audio Dictation</span>
            </button>

            <button 
              className="btn-start-secondary"
              onClick={() => onNavigate('steno-vault')}
            >
              <Headphones size={15} />
              <span>Browse All Dictations ({allSteno.length})</span>
            </button>
          </div>
        </div>

        {/* Right Column: Speed Category Tiers */}
        <div className="clean-speed-tiers-card">
          <div className="tiers-header">
            <h3 className="tiers-card-title">Practice by Speed Tier</h3>
            <span className="tiers-sublabel">Select a target WPM velocity</span>
          </div>

          <div className="tiers-list-group">
            {speedTiers.map((tier) => (
              <div 
                key={tier.wpm}
                className={`tier-row-item ${tier.isTarget ? 'is-target-tier' : ''}`}
                onClick={() => {
                  setActiveSpeed(tier.wpm);
                  onNavigate('steno-vault');
                }}
              >
                <div className="tier-wpm-box font-mono">
                  <span className="tier-number">{tier.wpm}</span>
                  <span className="tier-unit">WPM</span>
                </div>

                <div className="tier-info-center">
                  <span className="tier-title">{tier.label}</span>
                  <span className="tier-sub-badge">{tier.level}</span>
                </div>

                <ChevronRight size={16} className="tier-arrow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. MY LIVE CLASSES (GOOGLE MEET CLASSROOMS FOR ENROLLED COURSES)
          ========================================================================= */}
      <section className="dashboard-live-classes-section" style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
      }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#FEF2F2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Video size={18} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                My Live Classes
              </h3>
              {enrolledClasses.some(c => c.status === 'live' || c.isLive) && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  color: '#DC2626',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  textTransform: 'uppercase'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626', animation: 'beaconPulse 1.2s infinite' }} />
                  Live Now
                </span>
              )}
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>
              Interactive Google Meet classes, real-time speed dictations & expert feedback for your enrolled courses
            </p>
          </div>

          {/* Tab Filter Switches: Upcoming & Live vs Completed */}
          <div style={{
            display: 'inline-flex',
            background: '#F1F5F9',
            borderRadius: '10px',
            padding: '4px',
            gap: '4px'
          }}>
            <button
              type="button"
              onClick={() => setClassFilterTab('upcoming')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                background: classFilterTab === 'upcoming' ? '#0F172A' : 'transparent',
                color: classFilterTab === 'upcoming' ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease'
              }}
            >
              <span>Upcoming & Live</span>
              <span style={{
                background: classFilterTab === 'upcoming' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                padding: '1px 7px',
                borderRadius: '999px',
                fontSize: '0.72rem'
              }}>
                {upcomingAndLiveClasses.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setClassFilterTab('completed')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                background: classFilterTab === 'completed' ? '#0F172A' : 'transparent',
                color: classFilterTab === 'completed' ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease'
              }}
            >
              <span>Completed Sessions</span>
              <span style={{
                background: classFilterTab === 'completed' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)',
                padding: '1px 7px',
                borderRadius: '999px',
                fontSize: '0.72rem'
              }}>
                {completedClasses.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Upcoming & Live Classes */}
        {classFilterTab === 'upcoming' && (
          <div>
            {upcomingAndLiveClasses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem', background: '#F8FAFC', borderRadius: '12px' }}>
                <Radio size={36} style={{ color: '#94A3B8', margin: '0 auto 0.75rem' }} />
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>
                  No Live Classes Scheduled Right Now
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>
                  Classes scheduled by your teacher for your enrolled course will automatically appear here with a real-time countdown.
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
                gap: '1.25rem'
              }}>
                {upcomingAndLiveClasses.map((item) => {
                  const isLive = item.status === 'live' || item.isLive;
                  const isCancelled = item.status === 'cancelled';
                  const meetLink = item.meetUrl || item.googleMeetUrl || (item.meetCode ? `https://meet.google.com/${item.meetCode}` : 'https://meet.google.com/new');

                  return (
                    <div 
                      key={item.id}
                      style={{
                        background: '#FFFFFF',
                        border: isLive ? '2px solid #E11D48' : isCancelled ? '1px solid #FCA5A5' : '1px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: isLive ? '0 6px 20px rgba(225, 29, 72, 0.12)' : '0 2px 4px rgba(0, 0, 0, 0.02)',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      {/* Top Header Tag Row */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{
                            background: '#F1F5F9',
                            color: '#475569',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            maxWidth: '220px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {item.courseName || 'SSC Stenographer Course'}
                          </span>

                          {/* Status Badge */}
                          {isLive ? (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: '#FEE2E2',
                              color: '#DC2626',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '999px',
                              textTransform: 'uppercase'
                            }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626', animation: 'beaconPulse 1.2s infinite' }} />
                              Live Now
                            </span>
                          ) : isCancelled ? (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: '#FEE2E2',
                              color: '#991B1B',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '999px',
                              textTransform: 'uppercase'
                            }}>
                              <XCircle size={11} />
                              Cancelled
                            </span>
                          ) : (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: '#EFF6FF',
                              color: '#1D4ED8',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '999px',
                              textTransform: 'uppercase'
                            }}>
                              <Clock size={11} />
                              Upcoming
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 style={{
                          margin: '0 0 0.6rem',
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: '#0F172A',
                          lineHeight: 1.35
                        }}>
                          {item.title}
                        </h4>

                        {/* Class Info Meta Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '0.5rem',
                          fontSize: '0.78rem',
                          color: '#64748B',
                          background: '#F8FAFC',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '8px',
                          marginBottom: '0.85rem'
                        }}>
                          <div>
                            <span style={{ display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                              Teacher / Faculty
                            </span>
                            <strong style={{ color: '#1E293B' }}>{item.instructor || 'Shadab Sir'}</strong>
                          </div>
                          <div>
                            <span style={{ display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                              Speed Benchmark
                            </span>
                            <strong style={{ color: '#1E293B' }}>{item.speed || '80 WPM'}</strong>
                          </div>
                          <div>
                            <span style={{ display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                              Scheduled Date
                            </span>
                            <span style={{ color: '#1E293B', fontWeight: 600 }}>{item.scheduledDate || 'Today'}</span>
                          </div>
                          <div>
                            <span style={{ display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                              Time & Duration
                            </span>
                            <span style={{ color: '#1E293B', fontWeight: 600 }}>{item.startTime || item.time || '8:30 AM'} ({item.durationMins || 60}m)</span>
                          </div>
                        </div>

                        {/* Live / Countdown / Cancellation Box */}
                        {isLive ? (
                          <div style={{
                            background: '#FFF1F2',
                            border: '1px solid #FFE4E6',
                            borderRadius: '8px',
                            padding: '0.6rem 0.75rem',
                            marginBottom: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <Radio size={14} className="text-rose-600" />
                            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#9F1239' }}>
                              Teacher has launched Google Meet room. Click below to join live.
                            </span>
                          </div>
                        ) : isCancelled ? (
                          <div style={{
                            background: '#FEF2F2',
                            border: '1px solid #FEE2E2',
                            borderRadius: '8px',
                            padding: '0.6rem 0.75rem',
                            marginBottom: '0.85rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.5rem'
                          }}>
                            <AlertCircle size={14} className="text-rose-600" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <div>
                              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#991B1B' }}>
                                Class Cancelled by Teacher
                              </span>
                              <span style={{ fontSize: '0.72rem', color: '#7F1D1D' }}>
                                {item.cancelledReason || 'Cancelled due to institute schedule adjustment.'}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div style={{
                            background: '#F0FDF4',
                            border: '1px solid #DCFCE7',
                            borderRadius: '8px',
                            padding: '0.6rem 0.75rem',
                            marginBottom: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <Clock size={14} className="text-emerald-700" />
                              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>
                                Countdown:
                              </span>
                            </div>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803D', fontFamily: 'monospace' }}>
                              {getCountdownText(item)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions */}
                      <div style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                        {isLive ? (
                          <a
                            href={meetLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              width: '100%',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              background: '#0F766E',
                              color: '#FFFFFF',
                              padding: '0.65rem 1rem',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              textDecoration: 'none',
                              boxShadow: '0 2px 8px rgba(15, 118, 110, 0.3)'
                            }}
                          >
                            <Video size={16} />
                            <span>Join Class (Google Meet)</span>
                            <ExternalLink size={13} />
                          </a>
                        ) : isCancelled ? (
                          <button
                            type="button"
                            disabled
                            style={{
                              width: '100%',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              background: '#F1F5F9',
                              color: '#94A3B8',
                              padding: '0.65rem 1rem',
                              borderRadius: '8px',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              border: 'none',
                              cursor: 'not-allowed'
                            }}
                          >
                            <XCircle size={14} />
                            <span>Session Cancelled</span>
                          </button>
                        ) : (
                          <a
                            href={meetLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              width: '100%',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              background: '#0F172A',
                              color: '#FFFFFF',
                              padding: '0.65rem 1rem',
                              borderRadius: '8px',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                          >
                            <Video size={15} />
                            <span>Join Class (Google Meet)</span>
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Completed Sessions */}
        {classFilterTab === 'completed' && (
          <div>
            {completedClasses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem', background: '#F8FAFC', borderRadius: '12px' }}>
                <CheckCircle2 size={36} style={{ color: '#94A3B8', margin: '0 auto 0.75rem' }} />
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>
                  No Completed Class Records Yet
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>
                  Completed live sessions will appear here as your historical attendance log.
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
                gap: '1.25rem'
              }}>
                {completedClasses.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      opacity: 0.95
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{
                          background: '#E2E8F0',
                          color: '#475569',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}>
                          {item.courseName || 'Enrolled Course'}
                        </span>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: '#DCFCE7',
                          color: '#166534',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '999px',
                          textTransform: 'uppercase'
                        }}>
                          <CheckCircle2 size={11} />
                          Completed
                        </span>
                      </div>

                      <h4 style={{
                        margin: '0 0 0.6rem',
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        color: '#334155',
                        lineHeight: 1.35
                      }}>
                        {item.title}
                      </h4>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.5rem',
                        fontSize: '0.76rem',
                        color: '#64748B',
                        background: '#FFFFFF',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        marginBottom: '0.85rem',
                        border: '1px solid rgba(0, 0, 0, 0.05)'
                      }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                            Teacher
                          </span>
                          <strong style={{ color: '#1E293B' }}>{item.instructor || 'Shadab Sir'}</strong>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                            Date Attended
                          </span>
                          <span style={{ color: '#1E293B', fontWeight: 600 }}>{item.scheduledDate || 'Past Class'}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                            Duration
                          </span>
                          <span style={{ color: '#1E293B', fontWeight: 600 }}>{item.durationMins || 60} mins</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.68rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                            Status
                          </span>
                          <span style={{ color: '#15803D', fontWeight: 700 }}>Session Finished</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                      <button
                        type="button"
                        disabled
                        style={{
                          width: '100%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          background: '#F1F5F9',
                          color: '#64748B',
                          padding: '0.6rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          border: '1px solid #E2E8F0',
                          cursor: 'not-allowed'
                        }}
                      >
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        <span>Completed • Not Joinable</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* =========================================================================
          6. MONTHLY SUBSCRIPTION & BILLING LEDGER (TRANSACTIONS)
          ========================================================================= */}
      <section className="dashboard-subscription-ledger-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <CreditCard size={18} className="text-emerald-600" />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
                My Monthly Subscription & Billing Ledger
              </h3>
              <span className="badge badge-emerald" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                Monthly Recurring
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#78716c' }}>
              Active Pass: <strong>{user?.subscription?.plan || 'Monthly Test Series (Auto-Renews)'}</strong> • Renews automatically every month
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right', marginRight: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#78716c', display: 'block' }}>Next Monthly Renewal</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>
                {user?.subscription?.nextBillingDate || '23 Nov 2026'}
              </span>
            </div>
            <button 
              type="button" 
              onClick={() => onOpenCheckout ? onOpenCheckout('plan-1mo') : onNavigate('pricing')}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderColor: 'rgba(0, 0, 0, 0.08)', color: '#0F172A', background: '#FFFFFF' }}
            >
              <CreditCard size={14} />
              <span>Manage / Upgrade</span>
            </button>
          </div>
        </div>

        {/* Recent Monthly Transactions Table */}
        <div style={{ overflowX: 'auto', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '0.75rem', background: '#FFFFFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', color: '#57534e', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Transaction ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Subscription / Course</th>
                <th style={{ padding: '0.75rem 1rem' }}>Billing Frequency</th>
                <th style={{ padding: '0.75rem 1rem' }}>Date & Time</th>
                <th style={{ padding: '0.75rem 1rem' }}>Amount</th>
                <th style={{ padding: '0.75rem 1rem' }}>Payment Mode</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentTransactions.map((txn) => (
                <tr key={txn.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: 600, color: '#0F172A' }}>
                    {txn.id}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#0F172A' }}>
                    {txn.planName}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#57534e' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                      {txn.billingCycle || 'Monthly'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#57534e', fontFamily: 'monospace' }}>
                    {txn.dateStr}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: 700, color: '#0F172A' }}>
                    ₹{txn.amount}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#57534e' }}>
                    {txn.mode}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ background: '#f0fdf4', color: '#047857', border: '1px solid #dcfce7', padding: '0.2rem 0.5rem', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle2 size={12} />
                      <span>{txn.status || 'Verified'}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          7. RECENT SESSIONS LEDGER (COMPACT & SIMPLE)
          ========================================================================= */}
      <section className="dashboard-recent-section" style={{ marginTop: '1.5rem' }}>
        <div className="recent-section-header">
          <div>
            <h3 className="recent-section-title">Recent Practice Transcripts</h3>
            <span className="recent-section-sub">Latest evaluated stenographic audio and typing transcripts</span>
          </div>

          <button 
            className="btn-view-all-history"
            onClick={() => onNavigate('results')}
          >
            <span>View Full History</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="recent-sessions-list">
          {recentPractices.map((p) => (
            <div key={p.id} className="recent-session-row">
              <div className="session-left">
                <span className="session-title">{p.title}</span>
                <div className="session-meta">
                  <Calendar size={12} className="inline mr-1 text-slate-400" />
                  <span className="font-mono text-slate-500 mr-3">{p.date}</span>
                  <span className="session-words font-mono text-slate-500">{p.words} words</span>
                </div>
              </div>

              <div className="session-metrics">
                <div className="session-speed font-mono">{p.speed}</div>
                <div className="session-accuracy badge badge-emerald font-mono">{p.accuracy}</div>
                <span className="session-status badge badge-blue">{p.status}</span>
              </div>

              <button 
                className="btn-session-diff"
                onClick={() => onViewResult(p.id)}
              >
                <span>Inspect Diff</span>
                <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
