import React, { useState, useMemo } from 'react';
import { 
  Keyboard, 
  Play, 
  Clock, 
  FileText, 
  Search, 
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Award,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Eye,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  X,
  Flame,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { TYPING_TESTS } from '../data/mockData';
import CustomSelect from '../components/CustomSelect';

export default function TypingTestsPage({ onStartTypingTest }) {
  const [selectedLang, setSelectedLang] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [previewTest, setPreviewTest] = useState(null);
  const [previewFontSize, setPreviewFontSize] = useState(16);

  const languages = ['All', 'English', 'Hindi (Kruti Dev)', 'Hindi (Mangal)'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  // Counts
  const engCount = useMemo(() => TYPING_TESTS.filter(t => t.language === 'English').length, []);
  const krutiCount = useMemo(() => TYPING_TESTS.filter(t => t.language.includes('Kruti')).length, []);
  const mangalCount = useMemo(() => TYPING_TESTS.filter(t => t.language.includes('Mangal')).length, []);

  // Filtered and sorted tests
  const filtered = useMemo(() => {
    return TYPING_TESTS.filter((t) => {
      const matchesLang = selectedLang === 'All' || t.language.includes(selectedLang);
      const matchesDiff = selectedDifficulty === 'All' || t.difficulty === selectedDifficulty;
      const query = search.toLowerCase();
      const matchesSearch = 
        t.name.toLowerCase().includes(query) ||
        (t.authority && t.authority.toLowerCase().includes(query)) ||
        (t.category && t.category.toLowerCase().includes(query)) ||
        (t.passageText && t.passageText.toLowerCase().includes(query));
      return matchesLang && matchesDiff && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'words-asc') return a.words - b.words;
      if (sortBy === 'words-desc') return b.words - a.words;
      if (sortBy === 'difficulty') {
        const order = { Easy: 1, Medium: 2, Hard: 3 };
        return order[a.difficulty] - order[b.difficulty];
      }
      return 0;
    });
  }, [selectedLang, selectedDifficulty, search, sortBy]);

  // Warmup drill
  const warmupDrill = useMemo(() => {
    return TYPING_TESTS.find(t => t.id === 107) || TYPING_TESTS[0];
  }, []);

  return (
    <div className="typing-studio-page-container">
      {/* =========================================================================
          EXECUTIVE HERO HEADER BANNER
          ========================================================================= */}
      <div className="typing-executive-hero">
        <div className="hero-ambient-glow" aria-hidden="true" />
        
        <div className="typing-hero-grid">
          {/* Left Column: Heading & Telemetry Badges */}
          <div className="typing-hero-left">
            <div className="hero-status-pill-row">
              <span className="hero-live-pulse-badge">
                <span className="hero-dot-pulse" />
                <span>OFFICIAL GOVT EXAM SPEED BENCHMARK</span>
              </span>
              <span className="hero-compliance-pill">
                <ShieldCheck size={13} className="text-rose-300" />
                <span>SSC CGL Tier-II & High Court Calibrated</span>
              </span>
            </div>

            <h1 className="typing-hero-title">
              Digital Typing Studio <span className="typing-hero-title-accent">& Keystroke Lab</span>
            </h1>

            <p className="typing-hero-description">
              Master high-cadence transcription with real-time keystroke telemetry, word-by-word error tracking, and strict backspace strike counting. Fully supports standard English QWERTY, Hindi Kruti Dev 010, and Hindi Mangal Inscript.
            </p>

            {/* Benchmark Metrics Strip */}
            <div className="typing-hero-metrics-ribbon">
              <div className="hero-metric-tile">
                <div className="hero-metric-label">Target Velocity</div>
                <div className="hero-metric-value">35 / 30 <span className="hero-metric-unit">WPM</span></div>
                <div className="hero-metric-caption">Eng / Hindi Standard</div>
              </div>

              <div className="hero-metric-tile">
                <div className="hero-metric-label">Pass Accuracy</div>
                <div className="hero-metric-value">95.0% <span className="hero-metric-unit">Min</span></div>
                <div className="hero-metric-caption">Max 5% Error Margin</div>
              </div>

              <div className="hero-metric-tile">
                <div className="hero-metric-label">Exam Duration</div>
                <div className="hero-metric-value">10 <span className="hero-metric-unit">Mins</span></div>
                <div className="hero-metric-caption">Official Timed Format</div>
              </div>

              <div className="hero-metric-tile">
                <div className="hero-metric-label">Calibrated Tests</div>
                <div className="hero-metric-value">{TYPING_TESTS.length} <span className="hero-metric-unit">Drills</span></div>
                <div className="hero-metric-caption">All Departments</div>
              </div>
            </div>
          </div>

          {/* Right Column: 60-Second Quick Warmup Sprint Widget */}
          <div className="typing-hero-right">
            <div className="quick-warmup-glass-card">
              <div className="warmup-card-header">
                <div className="warmup-icon-wrap">
                  <Flame size={20} className="text-rose-200" />
                </div>
                <div>
                  <div className="warmup-pill-tag">DAILY FINGER CALIBRATION</div>
                  <h3 className="warmup-heading">60-Sec Warmup Sprint</h3>
                </div>
              </div>

              <p className="warmup-body-text">
                Prime finger coordination and establish home-row cadence before committing to a 10-minute graded test.
              </p>

              <div className="warmup-spec-row">
                <div className="warmup-spec-item">
                  <Clock size={13} className="text-muted" />
                  <span>60 Seconds</span>
                </div>
                <div className="warmup-spec-item">
                  <FileText size={13} className="text-muted" />
                  <span>85 Words</span>
                </div>
                <div className="warmup-spec-item">
                  <Zap size={13} className="text-rose-200" />
                  <span>Target: 40 WPM</span>
                </div>
              </div>

              <button 
                className="btn-warmup-launch"
                onClick={() => onStartTypingTest(warmupDrill)}
              >
                <Play size={16} fill="currentColor" />
                <span>Launch Quick Warmup</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ADVANCED FILTER & DISCOVERY CONSOLE
          ========================================================================= */}
      <div className="typing-console-panel">
        <div className="console-top-row">
          {/* Search Box */}
          <div className="console-search-box">
            <Search size={18} className="search-icon-decor" />
            <input
              type="text"
              placeholder="Search by exercise name, legal/memo keywords, or exam body..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search ? (
              <button 
                className="console-search-clear" 
                onClick={() => setSearch('')}
                title="Clear search"
              >
                <X size={15} />
              </button>
            ) : (
              <span className="search-kbd-badge">Ctrl K</span>
            )}
          </div>

          {/* Sort Controls */}
          <div className="console-actions-cluster">
            <div className="console-sort-wrap">
              <CustomSelect
                className="filter-custom-select console-custom-select"
                value={sortBy}
                onChange={(val) => setSortBy(val)}
                prefixIcon={<SlidersHorizontal size={14} className="text-muted" />}
                options={[
                  { value: 'default', label: 'Sort: Official Order' },
                  { value: 'words-asc', label: 'Word Count: Low to High' },
                  { value: 'words-desc', label: 'Word Count: High to Low' },
                  { value: 'difficulty', label: 'Difficulty Level' }
                ]}
              />
            </div>

            {/* View Mode Toggle */}
            <div className="view-mode-toggle-group">
              <button 
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Cards Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Compact Syllabus Table"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Segmented Pills */}
        <div className="console-pills-row">
          <div className="segmented-filter-cluster">
            <span className="filter-cluster-label">Keyboard Layout:</span>
            <div className="segmented-pills-wrap">
              <button 
                className={`segmented-pill ${selectedLang === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedLang('All')}
              >
                <span>All Layouts</span>
                <span className="pill-count-bubble">{TYPING_TESTS.length}</span>
              </button>
              <button 
                className={`segmented-pill ${selectedLang === 'English' ? 'active' : ''}`}
                onClick={() => setSelectedLang('English')}
              >
                <span>English QWERTY</span>
                <span className="pill-count-bubble">{engCount}</span>
              </button>
              <button 
                className={`segmented-pill ${selectedLang === 'Hindi (Kruti Dev)' ? 'active' : ''}`}
                onClick={() => setSelectedLang('Hindi (Kruti Dev)')}
              >
                <span>Hindi Kruti Dev 010</span>
                <span className="pill-count-bubble">{krutiCount}</span>
              </button>
              <button 
                className={`segmented-pill ${selectedLang === 'Hindi (Mangal)' ? 'active' : ''}`}
                onClick={() => setSelectedLang('Hindi (Mangal)')}
              >
                <span>Hindi Mangal Inscript</span>
                <span className="pill-count-bubble">{mangalCount}</span>
              </button>
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="difficulty-pills-cluster">
            <span className="filter-cluster-label">Benchmark:</span>
            <div className="segmented-pills-wrap">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  className={`diff-pill ${selectedDifficulty === diff ? 'active' : ''} diff-${diff.toLowerCase()}`}
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff === 'All' ? 'All Difficulties' : diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Query Status Bar */}
        <div className="console-status-bar">
          <div className="status-text">
            Showing <strong className="text-slate-800">{filtered.length}</strong> of {TYPING_TESTS.length} calibrated tests
            {selectedLang !== 'All' && <span> • Layout: <em>{selectedLang}</em></span>}
            {selectedDifficulty !== 'All' && <span> • Difficulty: <em>{selectedDifficulty}</em></span>}
            {search && <span> • Query: "<em>{search}</em>"</span>}
          </div>

          {(selectedLang !== 'All' || selectedDifficulty !== 'All' || search || sortBy !== 'default') && (
            <button 
              className="btn-reset-filters"
              onClick={() => {
                setSelectedLang('All');
                setSelectedDifficulty('All');
                setSearch('');
                setSortBy('default');
              }}
            >
              <RotateCcw size={12} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN TEST CONTENT: GRID VIEW OR TABLE VIEW
          ========================================================================= */}
      {viewMode === 'grid' ? (
        <div className="typing-dossier-grid">
          {filtered.map((item) => {
            const isHindi = item.language.includes('Hindi');
            const dots = item.difficultyDots || (item.difficulty === 'Easy' ? 1 : item.difficulty === 'Medium' ? 2 : 3);
            const excerpt = item.passageText ? item.passageText.slice(0, 150) + '...' : 'Government official passage transcription exercise...';

            return (
              <div key={item.id} className="typing-dossier-card">
                {/* Card Top Authority & Badges */}
                <div className="card-authority-strip">
                  <div className="authority-tag">
                    <ShieldCheck size={13} className="text-blue-500" />
                    <span>{item.authority || 'SSC Standard'}</span>
                  </div>

                  <div className="card-right-badges">
                    <span className={`layout-pill ${isHindi ? 'pill-hindi' : 'pill-english'}`}>
                      <Keyboard size={12} />
                      <span>{item.language}</span>
                    </span>
                    <div className="difficulty-gauge-dots" title={`Difficulty: ${item.difficulty}`}>
                      <span className={`gauge-dot ${dots >= 1 ? 'filled filled-' + item.difficulty.toLowerCase() : ''}`} />
                      <span className={`gauge-dot ${dots >= 2 ? 'filled filled-' + item.difficulty.toLowerCase() : ''}`} />
                      <span className={`gauge-dot ${dots >= 3 ? 'filled filled-' + item.difficulty.toLowerCase() : ''}`} />
                      <span className="gauge-text">{item.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Card Header & Title */}
                <div className="card-main-meta">
                  <div className="card-category-sublabel">{item.category || 'Government Transcription'}</div>
                  <h3 className="card-exercise-heading">{item.name}</h3>
                </div>

                {/* Passage Preview Excerpt Box */}
                <div className="card-passage-excerpt-box">
                  <div className="excerpt-label-row">
                    <FileText size={12} className="text-muted" />
                    <span>MASTER PASSAGE EXCERPT</span>
                  </div>
                  <p className="excerpt-text font-serif">
                    "{excerpt}"
                  </p>
                </div>

                {/* Key Spec Chips */}
                <div className="card-telemetry-chips-row">
                  <div className="telemetry-chip">
                    <Clock size={13} className="chip-icon text-blue-500" />
                    <span>{item.time}</span>
                  </div>
                  <div className="telemetry-chip">
                    <FileText size={13} className="chip-icon text-purple-500" />
                    <span>{item.words} Words</span>
                  </div>
                  <div className="telemetry-chip">
                    <Zap size={13} className="chip-icon text-amber-500" />
                    <span>Target: {item.targetSpeed || '35 WPM'}</span>
                  </div>
                  <div className="telemetry-chip">
                    <Target size={13} className="chip-icon text-emerald-500" />
                    <span>Pass: 95% Acc</span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="card-footer-action-bar">
                  <button 
                    className="btn-card-inspect"
                    onClick={() => setPreviewTest(item)}
                    title="Inspect passage details and word count"
                  >
                    <Eye size={15} />
                    <span>Inspect</span>
                  </button>

                  <button 
                    className="btn-card-launch-exam"
                    onClick={() => onStartTypingTest(item)}
                  >
                    <Keyboard size={16} />
                    <span>Launch Speed Test</span>
                    <ArrowRight size={14} className="launch-arrow" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* =========================================================================
            SYLLABUS TABLE VIEW
            ========================================================================= */
        <div className="typing-syllabus-table-wrapper">
          <table className="typing-syllabus-table">
            <thead>
              <tr>
                <th>Exercise & Authority</th>
                <th>Layout</th>
                <th>Words</th>
                <th>Time</th>
                <th>Target Speed</th>
                <th>Difficulty</th>
                <th>Passage Preview</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isHindi = item.language.includes('Hindi');
                const dots = item.difficultyDots || (item.difficulty === 'Easy' ? 1 : item.difficulty === 'Medium' ? 2 : 3);
                const snippet = item.passageText ? item.passageText.slice(0, 65) + '...' : 'Official passage...';

                return (
                  <tr key={item.id} className="table-row-hover">
                    <td>
                      <div className="table-exercise-title">{item.name}</div>
                      <div className="table-exercise-authority">
                        <ShieldCheck size={12} className="text-blue-500 inline mr-1" />
                        <span>{item.authority || 'SSC Standard'} • {item.category}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`layout-pill ${isHindi ? 'pill-hindi' : 'pill-english'}`}>
                        {item.language}
                      </span>
                    </td>
                    <td className="font-mono font-semibold">{item.words}</td>
                    <td>{item.time}</td>
                    <td>
                      <span className="font-mono font-semibold text-amber-600">{item.targetSpeed || '35 WPM'}</span>
                    </td>
                    <td>
                      <div className="difficulty-gauge-dots">
                        <span className={`gauge-dot ${dots >= 1 ? 'filled filled-' + item.difficulty.toLowerCase() : ''}`} />
                        <span className={`gauge-dot ${dots >= 2 ? 'filled filled-' + item.difficulty.toLowerCase() : ''}`} />
                        <span className={`gauge-dot ${dots >= 3 ? 'filled filled-' + item.difficulty.toLowerCase() : ''}`} />
                        <span className="gauge-text">{item.difficulty}</span>
                      </div>
                    </td>
                    <td className="table-snippet-col font-serif">
                      "{snippet}"
                    </td>
                    <td className="text-right">
                      <div className="table-actions-group">
                        <button 
                          className="table-btn-preview" 
                          onClick={() => setPreviewTest(item)}
                          title="Inspect Passage"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          className="table-btn-launch"
                          onClick={() => onStartTypingTest(item)}
                        >
                          <Keyboard size={14} />
                          <span>Start</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty Search State */}
      {filtered.length === 0 && (
        <div className="typing-empty-results-box">
          <AlertCircle size={40} className="text-amber-500 mb-3" />
          <h3>No matching typing exercises found</h3>
          <p>Try clearing your search terms or selecting "All Layouts" to see available drills.</p>
          <button 
            className="btn btn-secondary mt-4"
            onClick={() => {
              setSelectedLang('All');
              setSelectedDifficulty('All');
              setSearch('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* =========================================================================
          PASSAGE INSPECTION & SYLLABUS PREVIEW MODAL
          ========================================================================= */}
      {previewTest && (
        <div className="passage-preview-modal-backdrop" onClick={() => setPreviewTest(null)}>
          <div className="passage-preview-modal-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="preview-modal-header">
              <div className="modal-title-cluster">
                <div className="modal-badge-row">
                  <span className="badge badge-blue">
                    <ShieldCheck size={12} className="mr-1" />
                    {previewTest.authority || 'SSC Standard'}
                  </span>
                  <span className={`badge ${previewTest.language.includes('Hindi') ? 'badge-amber' : 'badge-emerald'}`}>
                    <Keyboard size={12} className="mr-1" />
                    {previewTest.language}
                  </span>
                  <span className="badge badge-purple">{previewTest.difficulty} Level</span>
                </div>
                <h2 className="preview-modal-title">{previewTest.name}</h2>
              </div>

              <button 
                className="modal-close-icon-btn"
                onClick={() => setPreviewTest(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Toolbar: Font Size Controls */}
            <div className="preview-modal-toolbar">
              <div className="toolbar-left-stats">
                <span>Total Words: <strong>{previewTest.words}</strong></span>
                <span>•</span>
                <span>Exam Time: <strong>{previewTest.time}</strong></span>
                <span>•</span>
                <span>Target Speed: <strong>{previewTest.targetSpeed || '35 WPM'}</strong></span>
              </div>

              <div className="toolbar-zoom-ctrl">
                <span className="zoom-label">Preview Font Size:</span>
                <button 
                  className="zoom-btn"
                  onClick={() => setPreviewFontSize(Math.max(13, previewFontSize - 2))}
                  title="Decrease font size"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="font-mono text-sm">{previewFontSize}px</span>
                <button 
                  className="zoom-btn"
                  onClick={() => setPreviewFontSize(Math.min(22, previewFontSize + 2))}
                  title="Increase font size"
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            {/* Modal Body: Passage Text */}
            <div className="preview-modal-body">
              <div 
                className="preview-passage-card font-serif"
                style={{ fontSize: `${previewFontSize}px`, lineHeight: 1.7 }}
              >
                {previewTest.passageText}
              </div>

              {/* Exam Rules & Time Table */}
              <div className="preview-timetable-card">
                <h4 className="timetable-heading">Speed Velocity Benchmark Timetable</h4>
                <div className="timetable-grid">
                  <div className="time-metric-box">
                    <div className="time-metric-wpm">35 WPM</div>
                    <div className="time-metric-result">
                      {Math.ceil(previewTest.words / 35)}m {Math.round(((previewTest.words / 35) % 1) * 60)}s
                    </div>
                    <div className="time-metric-note">SSC CGL Standard</div>
                  </div>
                  <div className="time-metric-box">
                    <div className="time-metric-wpm">45 WPM</div>
                    <div className="time-metric-result">
                      {Math.ceil(previewTest.words / 45)}m {Math.round(((previewTest.words / 45) % 1) * 60)}s
                    </div>
                    <div className="time-metric-note">High Court Clerk</div>
                  </div>
                  <div className="time-metric-box">
                    <div className="time-metric-wpm">60 WPM</div>
                    <div className="time-metric-result">
                      {Math.ceil(previewTest.words / 60)}m {Math.round(((previewTest.words / 60) % 1) * 60)}s
                    </div>
                    <div className="time-metric-note">Mastery Velocity</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="preview-modal-footer">
              <div className="footer-notice">
                <AlertCircle size={15} className="text-amber-500 mr-2 flex-shrink-0" />
                <span>Anti-cheat active: Window switches and unauthorized key shortcuts will trigger warnings.</span>
              </div>

              <div className="footer-btns">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setPreviewTest(null)}
                >
                  Close Preview
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    const target = previewTest;
                    setPreviewTest(null);
                    onStartTypingTest(target);
                  }}
                >
                  <Keyboard size={16} />
                  <span>Start This Examination</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
