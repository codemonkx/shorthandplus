import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Clock, 
  Send, 
  Lock, 
  Unlock, 
  AlertOctagon, 
  ShieldAlert, 
  Keyboard, 
  Gauge, 
  FileCheck,
  X,
  Volume2,
  VolumeX,
  Smartphone,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Columns,
  Rows,
  BookOpen,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function ExamEngine({ test, onSubmitExam, onCancel }) {
  // Detect if current session is Stenography Dictation (blind paper notepad transcription) vs Typing Speed practice
  const isStenoDictation = useMemo(() => {
    if (test.testType === 'steno' || test.isSteno === true) return true;
    if (test.testType === 'typing' || test.category === 'Typing Speed Studio' || test.isSteno === false) return false;
    if (test.audioUrl || test.audioDuration || test.speedWpm || test.speaker) return true;
    const cat = (test.category || '').toLowerCase();
    const title = (test.title || test.name || '').toLowerCase();
    if (cat.includes('steno') || cat.includes('high court') || cat.includes('court') || cat.includes('reporter') || cat.includes('parliament')) return true;
    if (title.includes('steno') || title.includes('dictation') || title.includes('grade c') || title.includes('grade d')) return true;
    return false;
  }, [test]);

  const [typedText, setTypedText] = useState(() => {
    try {
      if (test?.id) {
        const saved = sessionStorage.getItem(`shorthand_exam_draft_${test.id}`);
        if (saved && saved.trim()) return saved;
      }
    } catch {}
    return '';
  });

  useEffect(() => {
    if (test?.id && typedText) {
      try {
        sessionStorage.setItem(`shorthand_exam_draft_${test.id}`, typedText);
      } catch {}
    }
  }, [typedText, test?.id]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [backspaceMode, setBackspaceMode] = useState('allowed'); // 'allowed' | 'counted' | 'locked'
  const [fontFamily, setFontFamily] = useState(
    test.language?.toLowerCase().includes('hindi') ? 'kruti' : 'latin'
  );
  const [layoutMode, setLayoutMode] = useState(() => (isStenoDictation ? 'notebook' : 'split'));
  const [fontSize, setFontSize] = useState(16); // px
  const [showKeyboardMap, setShowKeyboardMap] = useState(false);
  const [tabSwitchWarnings, setTabSwitchWarnings] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showMobileNotice, setShowMobileNotice] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 850;
  });
  
  const textareaRef = useRef(null);
  const passageRef = useRef(null);
  const initialTime = 600;

  // Master passage text
  const masterPassage = useMemo(() => {
    return test.passageText || 
      "Judicial examination rules mandate strict accuracy and rhythmic cadence. Typing proficiency in both English and Hindi requires steady key transitions without looking at keyboard layout. Practice diligently to maintain high words-per-minute standards.";
  }, [test.passageText]);

  const masterWords = useMemo(() => {
    return masterPassage.trim().split(/\s+/);
  }, [masterPassage]);

  // Telemetry metrics
  const typedWordsList = useMemo(() => {
    return typedText.trim() ? typedText.trim().split(/\s+/) : [];
  }, [typedText]);

  const wordsTyped = typedWordsList.length;
  const elapsedSecs = Math.max(1, initialTime - timeLeft);
  const grossWpm = Math.round((typedText.length / 5) / (elapsedSecs / 60)) || 0;

  // Real-time word accuracy calculation
  const liveAccuracy = useMemo(() => {
    if (wordsTyped === 0) return 100;
    let correctCount = 0;
    const compareLength = Math.min(wordsTyped, masterWords.length);
    for (let i = 0; i < compareLength; i++) {
      if (typedWordsList[i] === masterWords[i]) {
        correctCount++;
      }
    }
    return Math.max(0, Math.min(100, Math.round((correctCount / wordsTyped) * 100)));
  }, [typedWordsList, masterWords, wordsTyped]);

  const netWpm = Math.max(0, Math.round(grossWpm * (liveAccuracy / 100)));

  const handleFinalSubmit = useCallback(() => {
    try {
      soundEngine.playSuccessChime();
      if (test?.id) sessionStorage.removeItem(`shorthand_exam_draft_${test.id}`);
    } catch {}
    onSubmitExam({
      test,
      typedText,
      timeTakenSecs: elapsedSecs,
      backspaceCount,
      tabSwitchWarnings,
      accuracy: liveAccuracy,
      wpm: netWpm
    });
  }, [onSubmitExam, test, typedText, elapsedSecs, backspaceCount, tabSwitchWarnings, liveAccuracy, netWpm]);

  // Focus textarea on load
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleFinalSubmit]);

  // Cheating Prevention: Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchWarnings((prev) => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Key event handling for mechanical clicks, shortcut, and backspace mode
  const handleKeyDown = (e) => {
    // Quick submission shortcut: Ctrl + Enter or Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      setShowSubmitConfirm(true);
      return;
    }

    // Play mechanical sound
    if (soundEnabled) {
      if (e.key === ' ') {
        soundEngine.playKey('space');
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        soundEngine.playKey('backspace');
      } else if (e.key.length === 1) {
        soundEngine.playKey('default');
      }
    }

    if (e.key === 'Backspace' || e.keyCode === 8 || e.key === 'Delete' || e.keyCode === 46) {
      if (backspaceMode === 'locked') {
        e.preventDefault();
        return false;
      } else {
        setBackspaceCount((prev) => prev + 1);
      }
    }
  };

  const handleCopyCutPaste = (e) => {
    e.preventDefault();
    alert("Cheating Prevention: Cut, Copy, and Paste are disabled during examination.");
    return false;
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Keyboard mapping helper for Kruti Dev
  const krutiDevHints = [
    { key: "k", char: "ा (आ की मात्रा)", label: "Aa Matra" },
    { key: "l", char: "स", label: "Sa" },
    { key: "d", char: "क", label: "Ka" },
    { key: "f", char: "ि (इ की मात्रा)", label: "Chhoti Ee" },
    { key: "g", char: "ह", label: "Ha" },
    { key: "h", char: "ी (ई की मात्रा)", label: "Badi Ee" },
    { key: "j", char: "र", label: "Ra" },
    { key: "u", char: "न", label: "Na" },
    { key: "i", char: "प", label: "Pa" },
    { key: "m", char: "उ / ु", label: "U Matra" }
  ];

  return (
    <div className="exam-studio-master-wrapper">
      
      {/* 1. TOP EXECUTIVE COMMAND HUD */}
      <header className="exam-studio-hud">
        {/* Left: Test Identification */}
        <div className="hud-identity-cluster">
          <div className="hud-badge-tag-row">
            <span className={`hud-exam-pill ${isStenoDictation ? 'hud-pill-steno' : ''}`}>
              <ShieldCheck size={13} className={isStenoDictation ? "text-burgundy" : "text-amber-600"} />
              <span>{isStenoDictation ? 'STENO DICTATION TRANSCRIPTION' : 'SSC SKILL ENGINE'}</span>
            </span>
            <span className="hud-lang-pill font-mono">
              {test.language || 'English'}
            </span>
          </div>
          <h2 className="hud-test-title">{test.title}</h2>
        </div>

        {/* Center: Real-Time Telemetry Counters */}
        <div className="hud-telemetry-strip">
          {/* Digital Timer */}
          <div className={`hud-telemetry-item item-timer ${timeLeft < 120 ? 'timer-critical' : ''}`}>
            <div className={`telemetry-icon-box ${timeLeft < 120 ? 'icon-timer-critical' : 'icon-timer'}`}>
              <Clock size={15} />
            </div>
            <div className="telemetry-info">
              <span className="telemetry-number">{formatTimer(timeLeft)}</span>
              <span className="telemetry-label">Time Left</span>
            </div>
          </div>

          <div className="telemetry-divider" />

          {/* Speedometer */}
          <div className="hud-telemetry-item">
            <div className="telemetry-icon-box icon-speed">
              <Gauge size={15} />
            </div>
            <div className="telemetry-info">
              <span className="telemetry-number">
                {grossWpm} <small className="telemetry-unit">WPM</small>
              </span>
              <span className="telemetry-label">Gross Speed</span>
            </div>
          </div>

          <div className="telemetry-divider" />

          {/* Live Accuracy / Verification Telemetry */}
          <div className="hud-telemetry-item" title={isStenoDictation ? "Accuracy is evaluated by algorithmic audit upon submission" : "Live Accuracy"}>
            <div className={`telemetry-icon-box ${isStenoDictation ? 'icon-accuracy-steno' : (liveAccuracy >= 90 ? 'icon-accuracy-good' : 'icon-accuracy-warn')}`}>
              <Award size={15} />
            </div>
            <div className="telemetry-info">
              {isStenoDictation ? (
                <>
                  <span className="telemetry-number text-burgundy" style={{ fontSize: '0.88rem' }}>
                    Audit on Submit
                  </span>
                  <span className="telemetry-label">Evaluation Mode</span>
                </>
              ) : (
                <>
                  <span className={`telemetry-number ${liveAccuracy >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {liveAccuracy}%
                  </span>
                  <span className="telemetry-label">Accuracy</span>
                </>
              )}
            </div>
          </div>

          <div className="telemetry-divider" />

          {/* Word Counter */}
          <div className="hud-telemetry-item">
            <div className="telemetry-icon-box icon-words">
              <FileCheck size={15} />
            </div>
            <div className="telemetry-info">
              <span className="telemetry-number">
                {wordsTyped} <span className="telemetry-unit">/ {test.totalWords || masterWords.length}</span>
              </span>
              <span className="telemetry-label">Words Done</span>
            </div>
          </div>

          <div className="telemetry-divider" />

          {/* Backspaces */}
          <div className="hud-telemetry-item" title="Total Backspaces Recorded">
            <div className={`telemetry-icon-box ${backspaceMode === 'locked' ? 'icon-backspace-locked' : 'icon-backspace'}`}>
              <Keyboard size={15} />
            </div>
            <div className="telemetry-info">
              <span className={`telemetry-number ${backspaceMode === 'locked' && backspaceCount > 0 ? 'text-rose-600' : ''}`}>
                {backspaceCount}
              </span>
              <span className="telemetry-label">{backspaceMode === 'locked' ? 'Lock Mode' : 'Backspaces'}</span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="hud-actions-cluster">
          {/* Mechanical Clicks Toggle */}
          <button 
            type="button"
            className="btn-hud-sound" 
            onClick={() => setSoundEnabled(!soundEnabled)} 
            title={soundEnabled ? "Tactile mechanical key clicks enabled" : "Mechanical key clicks muted"}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: soundEnabled ? 'rgba(4, 120, 87, 0.12)' : 'rgba(120, 113, 108, 0.12)',
              color: soundEnabled ? '#047857' : '#78716c',
              border: `1px solid ${soundEnabled ? 'rgba(4, 120, 87, 0.3)' : 'rgba(120, 113, 108, 0.25)'}`,
              borderRadius: '9999px',
              padding: '0.4rem 0.75rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{soundEnabled ? 'Clicks: ON' : 'Clicks: OFF'}</span>
          </button>

          {onCancel && (
            <button className="btn-hud-exit" onClick={onCancel} title="Exit Session">
              <X size={15} />
              <span>Exit</span>
            </button>
          )}

          <button className="btn-hud-submit" onClick={() => setShowSubmitConfirm(true)}>
            <Send size={15} />
            <span>Submit Transcription</span>
          </button>
        </div>
      </header>

      {/* Mobile Physical Keyboard Advisory Banner */}
      {showMobileNotice && (
        <div style={{
          background: '#fffbeb',
          borderBottom: '1px solid #fde68a',
          color: '#92400e',
          padding: '0.55rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={16} className="text-amber-600 shrink-0" />
            <span>
              <strong>Physical Keyboard Recommended:</strong> Official High Court & SSC skill exams mandate a desktop keyboard. Connect an external keyboard or practice on a desktop/laptop for accurate evaluation.
            </span>
          </div>
          <button 
            type="button"
            onClick={() => setShowMobileNotice(false)} 
            style={{ color: '#92400e', padding: '0.2rem', cursor: 'pointer', border: 'none', background: 'none' }}
            aria-label="Dismiss notice"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Security Banner if Tab Switched */}
      {tabSwitchWarnings > 0 && (
        <div className="tab-switch-alert-banner">
          <ShieldAlert size={18} className="text-rose" />
          <span>Security Alert: {tabSwitchWarnings} unauthorized window switch(es) logged during this examination.</span>
        </div>
      )}

      {/* 2. WORKSTATION TOOLBAR (Layout Mode, Font, Backspace Rules) */}
      <div className="studio-control-toolbar">
        {/* Workspace View Mode Selector */}
        {isStenoDictation ? (
          <div className="steno-dictation-mode-notice">
            <BookOpen size={14} className="text-burgundy" />
            <span>
              <strong>Steno Dictation Mode:</strong> Reference text is hidden &bull; Transcribe directly from your shorthand notebook
            </span>
          </div>
        ) : (
          <div className="toolbar-control-group">
            <span className="control-label">Workspace View:</span>
            <div className="toolbar-pill-selector">
              <button 
                className={`toolbar-pill ${layoutMode === 'split' ? 'active' : ''}`}
                onClick={() => setLayoutMode('split')}
                title="Reference passage stacked above typing box"
              >
                <Rows size={14} />
                <span>Split (Passage Top)</span>
              </button>
              <button 
                className={`toolbar-pill ${layoutMode === 'side' ? 'active' : ''}`}
                onClick={() => setLayoutMode('side')}
                title="Side-by-side dual screen"
              >
                <Columns size={14} />
                <span>Side-by-Side</span>
              </button>
              <button 
                className={`toolbar-pill ${layoutMode === 'notebook' ? 'active' : ''}`}
                onClick={() => setLayoutMode('notebook')}
                title="Full screen typing for paper shorthand notebook typists"
              >
                <BookOpen size={14} />
                <span>Shorthand Notebook Mode</span>
              </button>
            </div>
          </div>
        )}

        {/* Backspace Mode */}
        <div className="toolbar-control-group">
          <span className="control-label">Backspace Mode:</span>
          <div className="toolbar-pill-selector">
            <button 
              className={`toolbar-pill ${backspaceMode === 'allowed' ? 'active' : ''}`}
              onClick={() => setBackspaceMode('allowed')}
            >
              <Unlock size={13} />
              <span>Allowed</span>
            </button>
            <button 
              className={`toolbar-pill ${backspaceMode === 'counted' ? 'active' : ''}`}
              onClick={() => setBackspaceMode('counted')}
            >
              <Keyboard size={13} />
              <span>Count Strikes</span>
            </button>
            <button 
              className={`toolbar-pill ${backspaceMode === 'locked' ? 'active locked' : ''}`}
              onClick={() => setBackspaceMode('locked')}
              title="Strict SSC Exam Simulation: Backspace disabled"
            >
              <Lock size={13} />
              <span>Strict Locked</span>
            </button>
          </div>
        </div>

        {/* Font / Script */}
        <div className="toolbar-control-group">
          <span className="control-label">Script:</span>
          <div className="toolbar-pill-selector">
            <button 
              className={`toolbar-pill ${fontFamily === 'latin' ? 'active' : ''}`}
              onClick={() => setFontFamily('latin')}
            >
              English QWERTY
            </button>
            <button 
              className={`toolbar-pill ${fontFamily === 'kruti' ? 'active' : ''}`}
              onClick={() => setFontFamily('kruti')}
            >
              कृतिदेव 010
            </button>
            <button 
              className={`toolbar-pill ${fontFamily === 'mangal' ? 'active' : ''}`}
              onClick={() => setFontFamily('mangal')}
            >
              मंगल (Inscript)
            </button>
          </div>
        </div>

        {/* Font Size Adjuster */}
        <div className="toolbar-control-group ml-auto font-size-group">
          <span className="control-label">Text:</span>
          <div className="toolbar-pill-selector">
            <button 
              className="toolbar-pill"
              onClick={() => setFontSize(prev => Math.max(13, prev - 1))}
              title="Decrease Font Size"
            >
              <ZoomOut size={13} />
            </button>
            <span className="font-size-indicator font-mono">{fontSize}px</span>
            <button 
              className="toolbar-pill"
              onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
              title="Increase Font Size"
            >
              <ZoomIn size={13} />
            </button>
          </div>

          {(fontFamily === 'kruti' || fontFamily === 'mangal') && (
            <button 
              className="btn-keyboard-guide-toggle"
              onClick={() => setShowKeyboardMap(!showKeyboardMap)}
              title="Toggle Hindi Keyboard Mapping"
            >
              <HelpCircle size={14} />
              <span>Key Guide</span>
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Hindi Key Mapping Reference */}
      {showKeyboardMap && (
        <div className="hindi-keymap-card">
          <div className="keymap-header">
            <strong>{fontFamily === 'kruti' ? 'Kruti Dev 010 Essential Key Mapping' : 'Mangal Inscript Key Mapping'}</strong>
            <button className="btn-close-map" onClick={() => setShowKeyboardMap(false)}><X size={14} /></button>
          </div>
          <div className="keymap-grid">
            {krutiDevHints.map((h, i) => (
              <div key={i} className="keymap-item">
                <kbd className="keymap-kbd font-mono">{h.key}</kbd>
                <span className="keymap-hindi font-kruti">{h.char}</span>
                <span className="keymap-desc">{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. DUAL-PANE OR SINGLE NOTEPAD WORKSPACE */}
      <div className={`studio-workspace-panes ${isStenoDictation ? 'layout-notebook steno-blind-workspace' : `layout-${layoutMode}`}`}>
        
        {/* Pane A: Master Reference Passage (ONLY for typing exercises, NEVER for Stenography Dictation) */}
        {!isStenoDictation && layoutMode !== 'notebook' && (
          <div className="workspace-pane master-passage-pane">
            <div className="pane-header-bar">
              <div className="pane-title-with-badge">
                <BookOpen size={15} className="text-amber-600" />
                <strong className="pane-heading">Master Examination Reference Passage</strong>
              </div>
              <span className="pane-counter-tag font-mono">
                {masterWords.length} Words Total
              </span>
            </div>

            <div 
              ref={passageRef}
              className="master-passage-viewport custom-scroll"
              style={{ fontSize: `${fontSize}px` }}
            >
              <p className={`passage-reading-content ${fontFamily === 'kruti' ? 'font-kruti' : fontFamily === 'mangal' ? 'font-devanagari' : ''}`}>
                {masterWords.map((word, index) => {
                  const isTyped = index < wordsTyped;
                  const isCurrent = index === wordsTyped;
                  const isCorrect = isTyped && typedWordsList[index] === word;
                  const isWrong = isTyped && !isCorrect;

                  let wordClass = 'p-word-pending';
                  if (isCurrent) wordClass = 'p-word-current';
                  else if (isCorrect) wordClass = 'p-word-correct';
                  else if (isWrong) wordClass = 'p-word-wrong';

                  return (
                    <span key={index} className={`passage-word ${wordClass}`}>
                      {word}{' '}
                    </span>
                  );
                })}
              </p>
            </div>
            
            <div className="pane-footer-legend">
              <div className="legend-item"><span className="legend-dot dot-correct" /><span>Transcribed</span></div>
              <div className="legend-item"><span className="legend-dot dot-current" /><span>Current Position</span></div>
              <div className="legend-item"><span className="legend-dot dot-pending" /><span>Remaining</span></div>
            </div>
          </div>
        )}

        {/* Pane B: Candidate Active Typing Workstation */}
        <div className={`workspace-pane candidate-editor-pane ${isStenoDictation ? 'steno-candidate-pane' : ''}`}>
          <div className="pane-header-bar">
            <div className="pane-title-with-badge">
              <Keyboard size={15} className={isStenoDictation ? "text-burgundy" : "text-emerald"} />
              <strong className="pane-heading">
                {isStenoDictation 
                  ? 'Candidate Shorthand Notebook Transcription Canvas' 
                  : 'Candidate Digital Transcription'}
              </strong>
            </div>

            <div className="pane-security-tags">
              {isStenoDictation && (
                <span className="security-tag tag-blind-transcription">
                  <BookOpen size={12} className="text-burgundy" />
                  <span>Blind Transcription (Notebook)</span>
                </span>
              )}
              <span className="security-tag">
                <ShieldCheck size={12} className="text-emerald" />
                <span>Anti-Cheat Active</span>
              </span>
              <span className="security-tag">
                <span>Backspace: <strong>{backspaceMode}</strong></span>
              </span>
            </div>
          </div>

          <div className="transcription-textarea-wrapper">
            <textarea
              ref={textareaRef}
              style={{ fontSize: `${fontSize}px` }}
              className={`transcription-textarea ${isStenoDictation ? 'textarea-steno-notepad' : ''} ${fontFamily === 'kruti' ? 'font-kruti' : fontFamily === 'mangal' ? 'font-devanagari' : ''}`}
              placeholder={
                isStenoDictation
                  ? (fontFamily === 'kruti'
                      ? "अपनी आशुलिपि (शॉर्टहैंड) नोटबुक से देखकर यहाँ अपनी प्रतिलिपि टाइप करें... (परीक्षा नियमों के अनुसार संदर्भ पाठ छिपा हुआ है)"
                      : "Transcribe directly from your paper shorthand notepad here under official exam conditions. (Master passage text is hidden during transcription)...")
                  : (fontFamily === 'kruti' 
                      ? "यहाँ संदर्भ गद्यांश को देखकर अपनी श्रुतलेख प्रतिलिपि टाइप करें..." 
                      : layoutMode === 'notebook'
                        ? "Type your shorthand notes transcription here under official exam conditions..."
                        : "Type the master reference passage text here. Words are tracked in real time...")
              }
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              onKeyDown={handleKeyDown}
              onCopy={handleCopyCutPaste}
              onCut={handleCopyCutPaste}
              onPaste={handleCopyCutPaste}
              onContextMenu={handleCopyCutPaste}
              spellCheck="false"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>

          {/* Bottom Editor Status & Progress Bar */}
          <div className="editor-footer-status-bar">
            <div className="footer-metric">
              <span>Characters: <strong className="font-mono">{typedText.length}</strong></span>
            </div>
            <div className="footer-metric">
              <span>Words: <strong className="font-mono">{wordsTyped}</strong> of <strong className="font-mono">{test.totalWords || masterWords.length}</strong></span>
            </div>
            <div className="footer-metric">
              <span>Progress: <strong className="font-mono">{Math.min(100, Math.round((wordsTyped / (test.totalWords || masterWords.length)) * 100))}%</strong></span>
            </div>

            <div className="footer-shortcuts-tip ml-auto">
              <span>{isStenoDictation ? 'Transcribing from paper shorthand notebook.' : 'Press Tab or click Submit when finished.'} Shortcut: <strong>Ctrl + Enter</strong></span>
            </div>
          </div>

          {/* Global Visual Progress Line */}
          <div className="exam-progress-bar-track">
            <div 
              className="exam-progress-bar-fill" 
              style={{ width: `${Math.min(100, Math.round((wordsTyped / (test.totalWords || masterWords.length)) * 100))}%` }} 
            />
          </div>
        </div>

      </div>

      {/* 4. SUBMIT CONFIRMATION MODAL */}
      {showSubmitConfirm && (
        <div className="modal-backdrop">
          <div className="modal-card exam-submit-modal text-center">
            <div className="modal-icon-bubble">
              <AlertOctagon size={36} className="text-amber" />
            </div>
            
            <h3 className="modal-submit-title">Submit Examination Paper?</h3>
            <p className="modal-submit-desc">
              {isStenoDictation ? (
                <>You have transcribed <strong className="text-burgundy">{wordsTyped} words</strong> from your shorthand notebook into the exam sheet.</>
              ) : (
                <>You have transcribed <strong className="text-amber-700 font-bold">{wordsTyped} words</strong> with an estimated accuracy of <strong className="text-emerald font-bold">{liveAccuracy}%</strong>.</>
              )}
            </p>

            <div className="modal-metrics-summary">
              <div className="summary-box">
                <span className="summary-label">Time Remaining</span>
                <strong className="summary-val font-mono">{formatTimer(timeLeft)}</strong>
              </div>
              <div className="summary-box">
                <span className="summary-label">Gross Velocity</span>
                <strong className="summary-val font-mono">{grossWpm} WPM</strong>
              </div>
              <div className="summary-box">
                <span className="summary-label">Backspace Strikes</span>
                <strong className="summary-val font-mono">{backspaceCount}</strong>
              </div>
            </div>

            <p className="modal-final-note">
              Once submitted, your paper will be algorithmically verified against the official master passage and graded under SSC error percentage norms.
            </p>

            <div className="modal-btn-row">
              <button className="btn btn-secondary" onClick={() => setShowSubmitConfirm(false)}>
                Continue Typing
              </button>
              <button className="btn btn-emerald" onClick={handleFinalSubmit}>
                Confirm & Submit Paper
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
