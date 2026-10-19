import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import { STENO_TESTS } from '../data/mockData';

export default function DashboardView({ user, onStartTest, onViewResult, onNavigate }) {
  const recommended = STENO_TESTS[0];
  const [activeSpeed, setActiveSpeed] = useState(80);

  const speedTiers = [
    { wpm: 60, label: 'State Secretariat & District Courts', level: 'Foundation', color: 'emerald' },
    { wpm: 80, label: 'SSC Stenographer Grade D Bench', level: 'Active Target', color: 'blue', isTarget: true },
    { wpm: 100, label: 'High Court Bench & SSC Grade C', level: 'Advanced', color: 'indigo' },
    { wpm: 120, label: 'Parliamentary Reporter & Senior Bench', level: 'Elite', color: 'amber' }
  ];

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

  return (
    <div className="simple-dashboard-root">
      {/* =========================================================================
          1. CLEAN EXECUTIVE GREETING HEADER
          ========================================================================= */}
      <section className="dashboard-welcome-header">
        <div className="welcome-text-cluster">
          <div className="welcome-badge-line">
            <span className="welcome-status-pill">
              <span className="status-live-dot" />
              <span>SSC & HIGH COURT 2026 BATCH</span>
            </span>
            <span className="welcome-target-pill">
              <Target size={13} className="text-blue-500" />
              <span>Active Target: 80 WPM Bench</span>
            </span>
          </div>

          <h1 className="welcome-headline">
            Welcome back, <span className="welcome-name">{user?.name || 'Shadab Khan'}</span>
          </h1>

          <p className="welcome-subtext">
            Your stenographic accuracy is currently <strong className="text-emerald-700">95.8% (above passing cutoff)</strong>. Complete today's daily 80 WPM bench to maintain your practice rhythm.
          </p>
        </div>

        <div className="welcome-actions-cluster">
          <button 
            className="btn-welcome-primary"
            onClick={() => onStartTest(recommended.id)}
          >
            <Play size={16} fill="currentColor" />
            <span>Start Daily 80 WPM Test</span>
          </button>
          
          <button 
            className="btn-welcome-secondary"
            onClick={() => onNavigate('steno-vault')}
          >
            <Headphones size={15} />
            <span>Audio Vault</span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          2. ELEGANT 4-CARD METRIC STRIP
          ========================================================================= */}
      <section className="dashboard-metrics-strip">
        <div className="clean-metric-card">
          <div className="metric-header-row">
            <span className="metric-card-title">Dictation Speed</span>
            <div className="metric-icon-box bg-blue-light">
              <Zap size={16} className="text-blue-600" />
            </div>
          </div>
          <div className="metric-card-number font-mono">
            {user?.stats?.highestSpeed || 96} <small className="metric-unit">WPM</small>
          </div>
          <div className="metric-card-foot">
            <span className="metric-chip chip-blue">SSC Grade C Level</span>
            <span className="metric-caption">Peak Velocity</span>
          </div>
        </div>

        <div className="clean-metric-card">
          <div className="metric-header-row">
            <span className="metric-card-title">Mean Accuracy</span>
            <div className="metric-icon-box bg-emerald-light">
              <Target size={16} className="text-emerald-600" />
            </div>
          </div>
          <div className="metric-card-number font-mono text-emerald-600">
            {user?.stats?.avgAccuracy || 95.8}%
          </div>
          <div className="metric-card-foot">
            <span className="metric-chip chip-emerald">&lt; 5% Mistake Limit</span>
            <span className="metric-caption">Official Threshold</span>
          </div>
        </div>

        <div className="clean-metric-card">
          <div className="metric-header-row">
            <span className="metric-card-title">Completed Tests</span>
            <div className="metric-icon-box bg-purple-light">
              <FileCheck size={16} className="text-purple-600" />
            </div>
          </div>
          <div className="metric-card-number font-mono">
            {user?.stats?.totalTestsTaken || 42}
          </div>
          <div className="metric-card-foot">
            <span className="metric-chip chip-purple">+4 this week</span>
            <span className="metric-caption">Steno & Typing</span>
          </div>
        </div>

        <div className="clean-metric-card">
          <div className="metric-header-row">
            <span className="metric-card-title">Words Transcribed</span>
            <div className="metric-icon-box bg-amber-light">
              <Keyboard size={16} className="text-amber-600" />
            </div>
          </div>
          <div className="metric-card-number font-mono">
            {(user?.stats?.wordsTranscribed || 26850).toLocaleString()}
          </div>
          <div className="metric-card-foot">
            <span className="metric-chip chip-amber">Verified Lexicon</span>
            <span className="metric-caption">Eng & Hindi</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MAIN TWO-COLUMN WORKSPACE: DAILY TEST & SPEED TIERS
          ========================================================================= */}
      <section className="dashboard-main-grid">
        {/* Left Column: Today's Recommended Benchmark Card */}
        <div className="clean-featured-card">
          <div className="featured-card-top-row">
            <span className="featured-badge">
              <Sparkles size={12} className="text-amber-500 mr-1" />
              TODAY'S BENCHMARK DRILL
            </span>
            <span className="featured-speed-tag font-mono">80 WPM Standard</span>
          </div>

          <h3 className="featured-exam-title">{recommended.title}</h3>

          <p className="featured-exam-desc">
            Official full-length parliamentary dictation matching exact Staff Selection Commission (SSC Grade D) and High Court examination cadence.
          </p>

          <div className="featured-spec-chips">
            <div className="spec-chip">
              <Clock size={13} className="text-slate-400" />
              <span>5m Audio + 10m Typing</span>
            </div>
            <div className="spec-chip">
              <FileCheck size={13} className="text-slate-400" />
              <span>437 Words</span>
            </div>
            <div className="spec-chip">
              <ShieldCheck size={13} className="text-emerald-500" />
              <span>Strict Exam Mode</span>
            </div>
          </div>

          <div className="featured-card-actions">
            <button 
              className="btn-launch-featured"
              onClick={() => onStartTest(recommended.id)}
            >
              <Play size={15} fill="currentColor" />
              <span>Start Dictation Test</span>
              <ArrowRight size={14} className="ml-auto" />
            </button>
            
            <button 
              className="btn-browse-vault-link"
              onClick={() => onNavigate('steno-vault')}
            >
              Browse all 12 tests in Steno Vault →
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
          4. RECENT SESSIONS LEDGER (COMPACT & SIMPLE)
          ========================================================================= */}
      <section className="dashboard-recent-section">
        <div className="recent-section-header">
          <div>
            <h3 className="recent-section-title">Recent Practice Sessions</h3>
            <span className="recent-section-sub">Latest evaluated stenographic and typing transcripts</span>
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
