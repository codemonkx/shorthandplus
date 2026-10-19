import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Search, 
  Award, 
  TrendingUp, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  ShieldCheck,
  Zap,
  Target,
  FileText,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  HelpCircle,
  Eye,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  AlertCircle,
  LayoutGrid,
  List
} from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

export default function ResultsHistoryPage({ onViewResult }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [showMarkingGuide, setShowMarkingGuide] = useState(false);

  const myHistory = [
    {
      id: 534,
      date: '09-10-2026',
      name: 'OCT 6 BENCH - Election Expenditure & Reforms',
      category: 'SSC Steno Grade D',
      authority: 'Staff Selection Commission (SSC)',
      totalWords: 437,
      typedWords: 422,
      speed: '78.00 WPM',
      speedNum: 78.0,
      fullMistakes: 18,
      halfMistakes: 12,
      effectiveErrors: 24.0,
      marks: '92.89%',
      marksNum: 92.89,
      status: 'Qualified (Rank #6)',
      statusType: 'qualified'
    },
    {
      id: 535,
      date: '08-10-2026',
      name: 'Patna High Court Criminal Appeal 412',
      category: 'Patna High Court',
      authority: 'Patna High Court Judicial Bench',
      totalWords: 520,
      typedWords: 495,
      speed: '82.50 WPM',
      speedNum: 82.5,
      fullMistakes: 15,
      halfMistakes: 12,
      effectiveErrors: 21.0,
      marks: '94.15%',
      marksNum: 94.15,
      status: 'Qualified (Rank #4)',
      statusType: 'qualified'
    },
    {
      id: 537,
      date: '06-10-2026',
      name: 'Parliamentary Debate - Economic Policy',
      category: 'Parliament Reporter',
      authority: 'Lok Sabha Secretariat',
      totalWords: 605,
      typedWords: 570,
      speed: '96.20 WPM',
      speedNum: 96.2,
      fullMistakes: 28,
      halfMistakes: 18,
      effectiveErrors: 37.0,
      marks: '89.40%',
      marksNum: 89.40,
      status: 'Qualified (Rank #8)',
      statusType: 'qualified'
    },
    {
      id: 101,
      date: '04-10-2026',
      name: 'Exercise 75 - Business Letters & Office Memorandums',
      category: 'Typing Studio',
      authority: 'Central Secretariat Service',
      totalWords: 350,
      typedWords: 348,
      speed: '42.00 WPM',
      speedNum: 42.0,
      fullMistakes: 4,
      halfMistakes: 6,
      effectiveErrors: 7.0,
      marks: '98.00%',
      marksNum: 98.00,
      status: 'Qualified (Rank #2)',
      statusType: 'qualified'
    },
    {
      id: 536,
      date: '02-10-2026',
      name: 'Allahabad High Court Writ Petition 882',
      category: 'High Court Bench',
      authority: 'Allahabad High Court',
      totalWords: 480,
      typedWords: 472,
      speed: '84.00 WPM',
      speedNum: 84.0,
      fullMistakes: 14,
      halfMistakes: 8,
      effectiveErrors: 18.0,
      marks: '96.25%',
      marksNum: 96.25,
      status: 'Qualified (Rank #3)',
      statusType: 'qualified'
    },
    {
      id: 538,
      date: '28-09-2026',
      name: 'Central Administrative Tribunal Order 119',
      category: 'SSC Steno Grade C',
      authority: 'Central Administrative Tribunal (CAT)',
      totalWords: 550,
      typedWords: 538,
      speed: '80.50 WPM',
      speedNum: 80.5,
      fullMistakes: 20,
      halfMistakes: 14,
      effectiveErrors: 27.0,
      marks: '95.09%',
      marksNum: 95.09,
      status: 'Qualified (Rank #5)',
      statusType: 'qualified'
    }
  ];

  const categories = ['All', 'SSC Steno Grade D', 'Patna High Court', 'High Court Bench', 'Parliament Reporter', 'Typing Studio'];

  const filteredHistory = useMemo(() => {
    return myHistory.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.authority.toLowerCase().includes(search.toLowerCase());
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || (selectedStatus === 'Qualified' && item.statusType === 'qualified');
      return matchesSearch && matchesCat && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'speed-desc') return b.speedNum - a.speedNum;
      if (sortBy === 'speed-asc') return a.speedNum - b.speedNum;
      if (sortBy === 'marks-desc') return b.marksNum - a.marksNum;
      if (sortBy === 'marks-asc') return a.marksNum - b.marksNum;
      return 0; // Default date order
    });
  }, [myHistory, search, selectedCategory, selectedStatus, sortBy]);

  return (
    <div className="results-history-page-container">
      {/* =========================================================================
          EXECUTIVE HERO HEADER BANNER
          ========================================================================= */}
      <div className="results-executive-hero">
        <div className="hero-ambient-glow" aria-hidden="true" />

        <div className="results-hero-grid">
          <div className="results-hero-left">
            <div className="hero-status-pill-row">
              <span className="hero-live-pulse-badge">
                <span className="hero-dot-pulse" />
                <span>OFFICIAL SSC & HIGH COURT EVALUATION PROTOCOL</span>
              </span>
              <span className="hero-compliance-pill">
                <ShieldCheck size={13} className="text-rose-300" />
                <span>Forensic Word-by-Word Diff Algorithm Active</span>
              </span>
            </div>

            <h1 className="results-hero-title">
              Candidate Examination Scorecards <span className="results-hero-title-accent">& Velocity History</span>
            </h1>

            <p className="results-hero-description">
              Review full-fidelity forensic transcripts, breakdown of half vs full mistakes (SSC CGL & High Court benchmark), and monitor velocity progression across active examination batches.
            </p>

            <div className="results-hero-actions-row">
              <button 
                className="btn-results-guide-toggle"
                onClick={() => setShowMarkingGuide(!showMarkingGuide)}
              >
                <HelpCircle size={15} className="text-rose-200" />
                <span>{showMarkingGuide ? 'Hide Official Scoring Rules' : 'View Official SSC & HC Scoring Rules'}</span>
                {showMarkingGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              <button 
                className="btn-results-download-report"
                onClick={() => alert("Candidate Performance Dossier generated and downloaded as PDF.")}
              >
                <Download size={15} />
                <span>Export Official Dossier (PDF)</span>
              </button>
            </div>
          </div>

          {/* Quick Summary Pill Card */}
          <div className="results-hero-right">
            <div className="results-standing-glass-card">
              <div className="standing-card-top">
                <div className="standing-icon-wrap">
                  <Award size={22} className="text-rose-200" />
                </div>
                <div>
                  <div className="standing-sublabel">BATCH MERIT STATUS</div>
                  <h3 className="standing-heading">Top 5% Candidate</h3>
                </div>
              </div>

              <div className="standing-stat-box">
                <div className="standing-stat-item">
                  <span className="standing-num font-mono">42</span>
                  <span className="standing-lbl">Tests Taken</span>
                </div>
                <div className="standing-divider" />
                <div className="standing-stat-item">
                  <span className="standing-num font-mono text-white">94.15%</span>
                  <span className="standing-lbl">Peak Accuracy</span>
                </div>
                <div className="standing-divider" />
                <div className="standing-stat-item">
                  <span className="standing-num font-mono text-white">#4</span>
                  <span className="standing-lbl">Batch Rank</span>
                </div>
              </div>

              <div className="standing-footer-text">
                <CheckCircle2 size={13} className="text-rose-300" />
                <span>Eligible for SSC Grade D & High Court benchmarks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COLLAPSIBLE OFFICIAL SSC & HIGH COURT MARKING GUIDE
          ========================================================================= */}
      {showMarkingGuide && (
        <div className="official-marking-guide-card">
          <div className="guide-header">
            <ShieldCheck size={18} className="text-blue-500" />
            <h3 className="guide-title">Official Government Examination Mistake Classification Standards</h3>
          </div>

          <div className="guide-rules-grid">
            <div className="guide-rule-box">
              <div className="rule-badge-wrap">
                <span className="rule-type-badge badge-full-mistake">1.0 FULL MISTAKE</span>
              </div>
              <ul className="rule-list">
                <li><strong>Omission:</strong> Every word completely omitted from the master dictation.</li>
                <li><strong>Substitution:</strong> Every incorrect word typed in place of the master word.</li>
                <li><strong>Addition:</strong> Every extra or unauthorized word not present in the master passage.</li>
              </ul>
            </div>

            <div className="guide-rule-box">
              <div className="rule-badge-wrap">
                <span className="rule-type-badge badge-half-mistake">0.5 HALF MISTAKE</span>
              </div>
              <ul className="rule-list">
                <li><strong>Spelling Errors:</strong> Typographical or phonetic transpositions in typed words.</li>
                <li><strong>Punctuation & Caps:</strong> Failure to capitalize formal nouns or start of sentences.</li>
                <li><strong>Grammar & Number:</strong> Singular word typed in plural or vice versa.</li>
              </ul>
            </div>

            <div className="guide-rule-box">
              <div className="rule-badge-wrap">
                <span className="rule-type-badge badge-qualify-cutoff">QUALIFYING CUTOFFS</span>
              </div>
              <ul className="rule-list">
                <li><strong>SSC Steno Grade 'C':</strong> Maximum 5% mistake limit (UR / General category).</li>
                <li><strong>SSC Steno Grade 'D':</strong> Maximum 7% mistake limit (UR / General category).</li>
                <li><strong>High Court Benches:</strong> 90% Net Accuracy threshold required for judicial appointment.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          4-COLUMN EXECUTIVE KPI CARDS GRID
          ========================================================================= */}
      <div className="results-kpi-grid">
        {/* KPI 1 */}
        <div className="results-kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-card-label">Total Attempted Tests</span>
            <div className="kpi-icon-bubble bg-blue-subtle">
              <FileCheck size={18} className="text-blue-600" />
            </div>
          </div>
          <div className="kpi-card-value font-mono">42</div>
          <div className="kpi-card-meta">
            <span className="kpi-badge-chip chip-blue">32 Steno • 10 Typing</span>
            <span className="kpi-sub-trend text-emerald-600 font-semibold">
              <TrendingUp size={12} className="inline mr-1" />
              +5 this week
            </span>
          </div>
          <div className="kpi-progress-bar-bg">
            <div className="kpi-progress-bar-fill bg-blue-500" style={{ width: '100%' }} />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="results-kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-card-label">Mean Stenographic Velocity</span>
            <div className="kpi-icon-bubble bg-amber-subtle">
              <Zap size={18} className="text-amber-600" />
            </div>
          </div>
          <div className="kpi-card-value font-mono">
            78.0 <span className="kpi-unit">WPM</span>
          </div>
          <div className="kpi-card-meta">
            <span className="kpi-badge-chip chip-emerald">Within SSC Cutoff</span>
            <span className="kpi-sub-trend text-blue-600 font-semibold">
              Target: 80.0 WPM (97.5%)
            </span>
          </div>
          <div className="kpi-progress-bar-bg">
            <div className="kpi-progress-bar-fill bg-amber-500" style={{ width: '97.5%' }} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="results-kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-card-label">Peak Accuracy Score</span>
            <div className="kpi-icon-bubble bg-emerald-subtle">
              <Target size={18} className="text-emerald-600" />
            </div>
          </div>
          <div className="kpi-card-value font-mono text-emerald-600">94.15%</div>
          <div className="kpi-card-meta">
            <span className="kpi-badge-chip chip-emerald">Patna HC Level</span>
            <span className="kpi-sub-trend text-emerald-600 font-semibold">
              Min Cutoff: 90.0%
            </span>
          </div>
          <div className="kpi-progress-bar-bg">
            <div className="kpi-progress-bar-fill bg-emerald-500" style={{ width: '94.15%' }} />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="results-kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-card-label">Current Batch Rank</span>
            <div className="kpi-icon-bubble bg-purple-subtle">
              <Award size={18} className="text-purple-600" />
            </div>
          </div>
          <div className="kpi-card-value font-mono text-purple-600">#4</div>
          <div className="kpi-card-meta">
            <span className="kpi-badge-chip chip-amber">Top 5% Candidate</span>
            <span className="kpi-sub-trend text-purple-600 font-semibold">
              Batch: SP-2026
            </span>
          </div>
          <div className="kpi-progress-bar-bg">
            <div className="kpi-progress-bar-fill bg-purple-500" style={{ width: '95%' }} />
          </div>
        </div>
      </div>

      {/* =========================================================================
          RECENT EXAMS VELOCITY SPARKSTRIP
          ========================================================================= */}
      <div className="recent-velocity-strip-card">
        <div className="strip-header">
          <div className="strip-header-left">
            <Sparkles size={16} className="text-blue-500" />
            <h4 className="strip-title">Recent 6 Submissions Velocity & Accuracy Curve</h4>
          </div>
          <span className="strip-tag">Latest Active Evaluation Cycle</span>
        </div>

        <div className="strip-tiles-grid">
          {myHistory.map((item) => (
            <div key={item.id} className="velocity-tile" onClick={() => onViewResult(item.id)}>
              <div className="tile-top-row">
                <span className="tile-date font-mono">{item.date}</span>
                <span className="tile-speed font-mono">{item.speed}</span>
              </div>
              <div className="tile-title-truncate">{item.name}</div>
              <div className="tile-bottom-row">
                <span className="tile-accuracy-badge font-mono">{item.marks}</span>
                <span className="tile-errors font-mono">{item.effectiveErrors} err</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          EXAM SUBMISSION LOGS PANEL (STREAMLINED 5-COLUMN TABLE & CARD MODE)
          ========================================================================= */}
      <div className="results-table-panel">
        <div className="table-header-control-row">
          <div className="table-title-cluster">
            <h3 className="table-title">Forensic Exam Submission Logs</h3>
            <span className="table-count-pill">{filteredHistory.length} Record{filteredHistory.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="table-tools-cluster">
            {/* Search Box */}
            <div className="table-search-input-box">
              <Search size={15} className="search-icon-decor" />
              <input
                type="text"
                placeholder="Search by test name, authority, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="clear-btn" onClick={() => setSearch('')}>×</button>
              )}
            </div>

            {/* Sort Control */}
            <div className="table-sort-wrap">
              <CustomSelect
                className="filter-custom-select table-custom-select"
                value={sortBy}
                onChange={(val) => setSortBy(val)}
                prefixIcon={<SlidersHorizontal size={13} className="text-muted" />}
                options={[
                  { value: 'date-desc', label: 'Newest First' },
                  { value: 'speed-desc', label: 'Highest Speed' },
                  { value: 'speed-asc', label: 'Lowest Speed' },
                  { value: 'marks-desc', label: 'Highest Accuracy' },
                  { value: 'marks-asc', label: 'Lowest Accuracy' }
                ]}
              />
            </div>

            {/* View Mode Toggle */}
            <div className="results-view-mode-toggle">
              <button 
                className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Table Ledger View"
              >
                <List size={16} />
              </button>
              <button 
                className={`view-mode-btn ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => setViewMode('cards')}
                title="Dossier Cards Grid View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills Row */}
        <div className="table-filter-pills-row">
          <span className="filter-pill-label">Category:</span>
          <div className="pills-scroll-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`table-filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {(selectedCategory !== 'All' || search || sortBy !== 'date-desc') && (
            <button 
              className="reset-table-filters-btn"
              onClick={() => {
                setSelectedCategory('All');
                setSearch('');
                setSortBy('date-desc');
              }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* VIEW 1: CONSOLIDATED 5-COLUMN HIGH-DENSITY STREAMLINED TABLE */}
        {viewMode === 'table' ? (
          <div className="table-responsive-wrapper">
            <table className="results-streamlined-table">
              <thead>
                <tr>
                  <th style={{ width: '42%' }}>Examination Dossier & Authority</th>
                  <th style={{ width: '18%' }}>Speed & Words</th>
                  <th style={{ width: '16%' }}>Mistakes Analysis</th>
                  <th style={{ width: '14%' }}>Net Accuracy & Merit</th>
                  <th style={{ width: '10%' }} className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((row, idx) => {
                  const percentTyped = Math.round((row.typedWords / row.totalWords) * 100);

                  return (
                    <tr key={row.id} className="streamlined-row-hover">
                      {/* Column 1: Examination Dossier */}
                      <td>
                        <div className="dossier-cell-primary">
                          <span className="dossier-idx-badge font-mono">#{idx + 1}</span>
                          <span className="dossier-exam-title">{row.name}</span>
                        </div>
                        <div className="dossier-cell-meta">
                          <span className="dossier-category-pill">{row.category}</span>
                          <span className="dossier-meta-bullet">•</span>
                          <span className="dossier-date-text font-mono">
                            <Calendar size={11} className="inline mr-1 text-slate-400" />
                            {row.date}
                          </span>
                          <span className="dossier-meta-bullet">•</span>
                          <span className="dossier-authority-text">
                            <ShieldCheck size={11} className="inline mr-1 text-blue-500" />
                            {row.authority}
                          </span>
                        </div>
                      </td>

                      {/* Column 2: Speed & Words */}
                      <td>
                        <div className="metric-cell-speed">
                          <span className="metric-speed-number font-mono">{row.speed}</span>
                        </div>
                        <div className="metric-cell-words">
                          <span className="metric-words-text font-mono">
                            {row.typedWords} / {row.totalWords} words
                          </span>
                          <span className="metric-percent-sub font-mono">({percentTyped}%)</span>
                        </div>
                      </td>

                      {/* Column 3: Forensic Mistakes Analysis */}
                      <td>
                        <div className="metric-error-pill-row">
                          <span className="mistake-pill font-mono">{row.effectiveErrors} errors</span>
                        </div>
                        <div className="metric-sub-mistakes text-slate-500">
                          {row.fullMistakes} Full • {row.halfMistakes} Half
                        </div>
                      </td>

                      {/* Column 4: Net Accuracy & Merit Status */}
                      <td>
                        <div>
                          <span className="badge badge-emerald font-mono font-bold">{row.marks}</span>
                        </div>
                        <div className="metric-status-sub text-slate-600 font-medium">
                          {row.status}
                        </div>
                      </td>

                      {/* Column 5: Action */}
                      <td className="text-right">
                        <button 
                          className="btn-inspect-diff-action"
                          onClick={() => onViewResult(row.id)}
                          title="Inspect forensic word-by-word diff transcript"
                        >
                          <Eye size={13} />
                          <span>Inspect Diff</span>
                          <ArrowRight size={12} className="arrow-icon" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* VIEW 2: EXECUTIVE DOSSIER CARDS GRID VIEW */
          <div className="results-cards-grid">
            {filteredHistory.map((row, idx) => {
              const percentTyped = Math.round((row.typedWords / row.totalWords) * 100);

              return (
                <div key={row.id} className="results-dossier-card">
                  <div className="card-top-strip">
                    <span className="badge badge-navy text-xs">{row.category}</span>
                    <span className="card-date-badge font-mono text-xs text-slate-500">
                      <Calendar size={11} className="inline mr-1" />
                      {row.date}
                    </span>
                  </div>

                  <h4 className="card-exam-title">{row.name}</h4>
                  
                  <div className="card-authority-text text-xs text-slate-500">
                    <ShieldCheck size={12} className="inline mr-1 text-blue-500" />
                    {row.authority}
                  </div>

                  {/* 3-Tile Spec Strip */}
                  <div className="card-spec-grid">
                    <div className="card-spec-tile">
                      <span className="card-spec-label">Speed</span>
                      <span className="card-spec-val font-mono text-blue-600">{row.speed}</span>
                    </div>
                    <div className="card-spec-tile">
                      <span className="card-spec-label">Words</span>
                      <span className="card-spec-val font-mono">{row.typedWords}/{row.totalWords}</span>
                    </div>
                    <div className="card-spec-tile">
                      <span className="card-spec-label">Errors</span>
                      <span className="card-spec-val font-mono text-rose-600">{row.effectiveErrors} err</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="card-footer-strip">
                    <div className="card-score-badge-cluster">
                      <span className="badge badge-emerald font-mono font-bold">{row.marks}</span>
                      <span className="card-rank-sub text-xs text-emerald-700 font-semibold">{row.status}</span>
                    </div>

                    <button 
                      className="btn-inspect-diff-action"
                      onClick={() => onViewResult(row.id)}
                    >
                      <Eye size={13} />
                      <span>Inspect Diff</span>
                      <ArrowRight size={12} className="arrow-icon" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty Search State */}
        {filteredHistory.length === 0 && (
          <div className="results-empty-search-state">
            <AlertCircle size={36} className="text-amber-500 mb-2" />
            <h4>No examination logs found</h4>
            <p>No records matched your search query or selected category filter.</p>
            <button 
              className="btn btn-secondary btn-sm mt-3"
              onClick={() => {
                setSelectedCategory('All');
                setSearch('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
