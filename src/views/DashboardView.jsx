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
  Sparkles,
  Video,
  CreditCard,
  RefreshCw,
  ExternalLink,
  Users
} from 'lucide-react';
import { STENO_TESTS, TYPING_TESTS, INITIAL_TRANSACTIONS } from '../data/mockData';

export default function DashboardView({ 
  user, 
  onStartTest, 
  onViewResult, 
  onNavigate,
  stenoTests = STENO_TESTS,
  typingTests = TYPING_TESTS,
  transactions = INITIAL_TRANSACTIONS,
  onOpenCheckout
}) {
  const allSteno = stenoTests && stenoTests.length > 0 ? stenoTests : STENO_TESTS;
  const allTyping = typingTests && typingTests.length > 0 ? typingTests : TYPING_TESTS;
  const recommended = allSteno[0] || STENO_TESTS[0];
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
          3. ELEGANT 4-CARD METRIC STRIP
          ========================================================================= */}
      <section className="dashboard-metrics-strip">
        <div className="clean-metric-card">
          <div className="metric-header-row">
            <span className="metric-card-title">Dictation Speed</span>
            <div className="metric-icon-box bg-amber-50">
              <Zap size={16} className="text-amber-600" />
            </div>
          </div>
          <div className="metric-card-number font-mono">
            {user?.stats?.highestSpeed || 96} <small className="metric-unit">WPM</small>
          </div>
          <div className="metric-card-foot">
            <span className="metric-chip chip-amber">SSC Grade C Level</span>
            <span className="metric-caption">Peak Velocity</span>
          </div>
        </div>

        <div className="clean-metric-card">
          <div className="metric-header-row">
            <span className="metric-card-title">Average Accuracy</span>
            <div className="metric-icon-box bg-emerald-light">
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
          </div>
          <div className="metric-card-number font-mono">
            {user?.stats?.avgAccuracy || 95.8}%
          </div>
          <div className="metric-card-foot">
            <span className="metric-chip chip-emerald">Above SSC Cutoff</span>
            <span className="metric-caption">Official Threshold</span>
          </div>
        </div>

        <div className="clean-metric-card">
          <div className="metric-header-row">
            <span className="metric-card-title">Available Drills</span>
            <div className="metric-icon-box bg-indigo-light">
              <Headphones size={16} className="text-indigo-600" />
            </div>
          </div>
          <div className="metric-card-number font-mono">
            {allSteno.length + allTyping.length}
          </div>
          <div className="metric-card-foot">
            <span className="metric-chip chip-indigo">{allSteno.length} Audio / {allTyping.length} Typing</span>
            <span className="metric-caption">All Practice Vaults</span>
          </div>
        </div>

        <div className="clean-metric-card">
          <div className="metric-header-row">
            <span className="metric-card-title">Practice Streak</span>
            <div className="metric-icon-box bg-amber-light">
              <Award size={16} className="text-amber-600" />
            </div>
          </div>
          <div className="metric-card-number font-mono">
            {user?.stats?.currentStreak || 14} <small className="metric-unit">Days</small>
          </div>
          <div className="metric-card-foot">
            <span className="metric-chip chip-amber">Disciplined Cadet</span>
            <span className="metric-caption">Daily Cadence</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. PRACTICE VAULTS: AUDIO DICTATIONS & TYPING SPEED (BALANCED 2-COLUMN GRID)
          ========================================================================= */}
      <section className="dashboard-main-grid">
        {/* Left Column: Recommended Daily Benchmark */}
        <div className="clean-featured-card">
          <div className="featured-card-top-content">
            <div className="featured-card-top-row">
              <span className="featured-badge">TODAY'S BENCHMARK</span>
              <span className="featured-speed-tag font-mono">{recommended.speed}</span>
            </div>
            <h3 className="featured-exam-title">{recommended.title}</h3>
            <p className="featured-exam-desc">
              Standard judicial and parliamentary transcript recorded with calibrated speech pauses and official evaluation rules.
            </p>

            <div className="featured-spec-chips">
              <div className="spec-chip">
                <Clock size={13} className="text-slate-400" />
                <span>5m Audio + 10m Typing</span>
              </div>
              <div className="spec-chip">
                <FileCheck size={13} className="text-slate-400" />
                <span>{recommended.totalWords || 437} Words</span>
              </div>
              <div className="spec-chip">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>Strict Exam Mode</span>
              </div>
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
              Browse all {allSteno.length} tests in Steno Vault →
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
          5. MONTHLY SUBSCRIPTION & BILLING LEDGER (TRANSACTIONS)
          ========================================================================= */}
      <section className="dashboard-subscription-ledger-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <CreditCard size={18} className="text-emerald-600" />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#1D1D1F' }}>
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
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1D1D1F', fontFamily: 'monospace' }}>
                {user?.subscription?.nextBillingDate || '23 Nov 2026'}
              </span>
            </div>
            <button 
              type="button" 
              onClick={() => onOpenCheckout ? onOpenCheckout('plan-1mo') : onNavigate('pricing')}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderColor: 'rgba(0, 0, 0, 0.08)', color: '#1D1D1F', background: '#FFFFFF' }}
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
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: 600, color: '#1D1D1F' }}>
                    {txn.id}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#1D1D1F' }}>
                    {txn.plan}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#78716c' }}>
                    {txn.billingCycle || 'Monthly Recurring'}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#78716c', fontFamily: 'monospace' }}>
                    {txn.date}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: 700, color: '#1D1D1F' }}>
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
          6. RECENT SESSIONS LEDGER (COMPACT & SIMPLE)
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
