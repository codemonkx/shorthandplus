import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw,
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ArrowLeft, 
  Headphones, 
  CheckCircle2, 
  ShieldCheck, 
  SlidersHorizontal, 
  Sparkles, 
  Lock, 
  FileText,
  Award,
  Zap,
  PenTool
} from 'lucide-react';
import ShorthandCanvas from './ShorthandCanvas';

export default function DictationRoom({ test, onProceedToTyping, onCancel }) {
  const currentTest = test || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTest.audioDuration || 300);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [showDigitalCanvas, setShowDigitalCanvas] = useState(false);
  const [inReadingPhase, setInReadingPhase] = useState(false);
  const [readingTimeLeft, setReadingTimeLeft] = useState(300); // 5 minutes reading timer
  const audioRef = useRef(null);

  useEffect(() => {
    let timer = null;
    if (inReadingPhase && readingTimeLeft > 0) {
      timer = setInterval(() => {
        setReadingTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onProceedToTyping();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [inReadingPhase, readingTimeLeft, onProceedToTyping]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Global keyboard shortcuts (Space = Play/Pause, Ctrl+Enter or Enter = Proceed)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onProceedToTyping();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, onProceedToTyping]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((e) => console.log('Audio play error:', e));
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioCompleted(true);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleSkip = (seconds) => {
    if (!audioRef.current) return;
    const newTime = Math.min(Math.max(0, currentTime + seconds), duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const category = currentTest.category || 'Patna High Court';
  const speed = currentTest.speed || '100 WPM';
  const language = currentTest.language || 'English';
  const title = currentTest.title || 'Patna High Court Legal Dictation - Criminal Appeal No. 412';
  const totalWords = currentTest.totalWords || 512;
  const testDuration = currentTest.duration || '5 Mins Total';

  return (
    <div className="dictation-station-root">
      <audio
        ref={audioRef}
        src={currentTest.audioUrl || (language?.toLowerCase().includes('hindi') ? '/assets/sample-dictation-hindi.mp3' : '/assets/sample-dictation.mp3')}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      <div className="dictation-station-container">
        
        {/* EXECUTIVE STENO COMMAND HUD (Consolidated & Compact) */}
        <header className="dict-executive-hud">
          <div className="dict-hud-top-row">
            <div className="dict-hud-left-group">
              <button className="dict-btn-exit" onClick={onCancel} id="btn-exit-exam-hud" title="Exit to Steno Vault">
                <ArrowLeft size={15} />
                <span>Exit Exam</span>
              </button>
              
              <div className="dict-hud-divider" />
              
              <div className="dict-badge-row">
                <span className="badge-official-bench">
                  <Sparkles size={12} className="text-burgundy" />
                  <span>OFFICIAL STENOGRAPHY EXAMINATION SIMULATION</span>
                </span>
                <span className="dict-pill dict-pill-burgundy">{category}</span>
                <span className="dict-pill dict-pill-emerald">{speed}</span>
                <span className="dict-pill dict-pill-slate">{language}</span>
                <span className="dict-pill dict-pill-slate">{totalWords} Words</span>
                <span className="dict-pill dict-pill-slate">{testDuration}</span>
              </div>
            </div>

            <div className="dict-hud-right-group">
              <div className="dict-security-badge">
                <span className="pulse-dot-green" />
                <span>Exam Environment Active</span>
              </div>
              <button 
                className="btn-quick-transcription-cta"
                onClick={onProceedToTyping}
                title="Proceed directly to Typing Transcription"
              >
                <span>Begin Transcription (Stage 2)</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="dict-hud-bottom-row">
            <div className="dict-title-wrap">
              <h1 className="dict-main-title">{title}</h1>
              <p className="dict-main-subtitle">
                Listen to the soundproof studio dictation audio and take down shorthand outlines in your notebook. When ready, proceed directly to typing transcription.
              </p>
            </div>

            <div className="dict-stepper">
              <div className="dict-step-item active">
                <span className="step-num-bubble">1</span>
                <span>Audio Dictation</span>
              </div>
              <span className="step-arrow-divider">→</span>
              <div className="dict-step-item upcoming">
                <span className="step-num-bubble">2</span>
                <span>Typing Transcription</span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN 2-COLUMN WORKSTATION */}
        <main className="dict-workstation-layout">
          
          {/* COLUMN 1 (60%): STUDIO AUDIO DECK & PROTOCOL */}
          <div className="dict-left-column">
            
            {/* 1. PROFESSIONAL STUDIO AUDIO CONSOLE */}
            <div className="pro-audio-deck-card">
              <div className="deck-header-row">
                <div className="deck-source-info">
                  <div className="audio-studio-chip">
                    <Headphones size={14} />
                    <span>Soundproof Studio Recording • 320kbps</span>
                  </div>
                  <div className={`deck-live-pill ${isPlaying ? 'playing' : ''}`}>
                    <span className="pulse-audio-dot" />
                    <span>{isPlaying ? 'Dictation Audio Playing' : audioCompleted ? 'Dictation Completed' : 'Dictation Ready'}</span>
                  </div>
                </div>

                <div className="deck-clock-display font-mono">
                  <span className="current-time">{formatTime(currentTime)}</span>
                  <span className="separator">/</span>
                  <span className="total-duration">{formatTime(duration)}</span>
                </div>
              </div>

              {/* DYNAMIC INTERACTIVE EQUALIZER WAVEFORM */}
              <div 
                className="deck-waveform-wrapper" 
                onClick={togglePlay}
                title="Click anywhere on waveform to Play / Pause audio (or press Space)"
              >
                {Array.from({ length: 56 }).map((_, i) => {
                  const progress = currentTime / (duration || 1);
                  const barProgress = i / 56;
                  const isActive = barProgress <= progress;
                  
                  // Waveform height calculation
                  let heightPct;
                  if (isPlaying) {
                    const wave = Math.sin(i * 0.42 + currentTime * 4.2) * 0.4 + 0.6;
                    const harmonic = Math.cos(i * 0.2 + currentTime * 2.8) * 0.2;
                    heightPct = Math.max(18, Math.min(96, (wave + harmonic) * 85));
                  } else {
                    const staticProfile = Math.sin(i * 0.25) * 0.35 + 0.55;
                    heightPct = Math.max(16, staticProfile * 75);
                  }

                  return (
                    <div
                      key={i}
                      className={`deck-waveform-bar ${isActive ? 'active' : ''}`}
                      style={{ height: `${heightPct}%` }}
                    />
                  );
                })}
              </div>

              {/* SCRUB TRACK SLIDER */}
              <div className="deck-slider-row">
                <input
                  type="range"
                  className="deck-scrub-slider"
                  min={0}
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek audio position"
                />
              </div>

              {/* MASTER CONTROLS BAR */}
              <div className="deck-controls-toolbar">
                <div className="transport-cluster">
                  <button 
                    className={`btn-master-play ${isPlaying ? 'is-playing' : ''}`}
                    onClick={togglePlay}
                    title={isPlaying ? "Pause Dictation (Space)" : "Start Dictation Audio (Space)"}
                    id="btn-master-play"
                  >
                    {isPlaying ? <Pause size={22} /> : <Play size={22} className="play-icon-nudge" />}
                  </button>

                  <button 
                    className="btn-deck-icon" 
                    onClick={() => handleSkip(-10)} 
                    title="Rewind 10 Seconds"
                  >
                    <RotateCcw size={16} />
                    <span className="icon-subtext">-10s</span>
                  </button>

                  <button 
                    className="btn-deck-icon" 
                    onClick={() => handleSkip(10)} 
                    title="Forward 10 Seconds"
                  >
                    <RotateCw size={16} />
                    <span className="icon-subtext">+10s</span>
                  </button>

                  {/* Volume Control */}
                  <div className="volume-control-wrap">
                    <button className="btn-deck-icon-subtle" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                      {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={isMuted ? 0 : volume} 
                      onChange={handleVolumeChange}
                      className="deck-volume-slider" 
                      aria-label="Audio Volume"
                    />
                  </div>
                </div>

                {/* Speed Multiplier Presets */}
                <div className="deck-speed-cluster">
                  <span className="speed-group-label">
                    <SlidersHorizontal size={13} />
                    <span>Speed:</span>
                  </span>
                  {[0.8, 0.9, 1.0, 1.1, 1.2].map((spd) => (
                    <button
                      key={spd}
                      className={`btn-speed-chip ${playbackSpeed === spd ? 'active' : ''}`}
                      onClick={() => setPlaybackSpeed(spd)}
                    >
                      {spd === 1.0 ? '1.0x (Exam)' : `${spd}x`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* DIGITAL CANVAS TOGGLE STRIP */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setShowDigitalCanvas(!showDigitalCanvas)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 8,
                  border: '1px solid #1c1917',
                  background: showDigitalCanvas ? '#1c1917' : '#ffffff',
                  color: showDigitalCanvas ? '#fafaf9' : '#1c1917',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}
              >
                <PenTool size={14} />
                <span>{showDigitalCanvas ? 'Hide Digital Stylus Canvas' : 'Draw Outlines On-Screen (Digital Stylus Pad)'}</span>
              </button>
            </div>

            {/* EMBEDDED DIGITAL SHORTHAND CANVAS */}
            {showDigitalCanvas && (
              <div style={{ marginBottom: '1.25rem' }}>
                <ShorthandCanvas 
                  audioUrl={currentTest.audioUrl || '/assets/sample-dictation.mp3'}
                  title={`Digital Shorthand Pad • ${currentTest.title || 'Official Exam Dictation'}`}
                  topic={currentTest.title || 'Official Parliamentary Dictation Bench'}
                />
              </div>
            )}

            {/* 2. CANDIDATE SHORTHAND DICTATION GUIDELINES & BENCHMARKS */}
            <div className="dictation-guidelines-card">
              <div className="guidelines-header">
                <FileText size={17} className="text-burgundy" />
                <h3 className="guidelines-title">Candidate Shorthand Writing Protocol & Benchmarks</h3>
              </div>

              <div className="guidelines-metrics-strip">
                <div className="g-metric-item">
                  <div className="g-metric-num text-burgundy">{speed}</div>
                  <div className="g-metric-label">Target Certified Speed</div>
                </div>
                <div className="g-metric-divider" />
                <div className="g-metric-item">
                  <div className="g-metric-num">{formatTime(duration)}</div>
                  <div className="g-metric-label">Total Audio Duration</div>
                </div>
                <div className="g-metric-divider" />
                <div className="g-metric-item">
                  <div className="g-metric-num">{totalWords}</div>
                  <div className="g-metric-label">Passage Word Length</div>
                </div>
                <div className="g-metric-divider" />
                <div className="g-metric-item">
                  <div className="g-metric-num text-emerald-600">95.0%</div>
                  <div className="g-metric-label">Min Passing Accuracy</div>
                </div>
              </div>

              <ul className="guidelines-points-list">
                <li>
                  <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                  <span><strong>Maintain steady pencil stroke pacing:</strong> Do not pause or lift pencil excessively during natural audio pauses.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                  <span><strong>Omission strategy:</strong> If an outline is missed, proceed immediately with the next sentence; never scribble or cross out outlines in notebook.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                  <span><strong>Direct transition:</strong> When you are ready, launch typing transcription to transcribe your notes into the examination engine.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* COLUMN 2 (40%): PRIMARY LAUNCH ACTION, METRICS & SECURITY RULES */}
          <div className="dict-right-column">
            
            {/* 1. PRIMARY PROCEED CALL TO ACTION */}
            <div className="dict-launch-box">
              {inReadingPhase ? (
                <div style={{ textAlign: 'center' }}>
                  <div className="launch-box-badge-row" style={{ justifyContent: 'center' }}>
                    <Clock size={16} className="text-amber-600 animate-pulse" />
                    <span className="launch-stage-tag" style={{ background: '#FEF3C7', color: '#92400E' }}>STAGE 2 • 5-MINUTE READING PERIOD</span>
                  </div>
                  
                  <div style={{ margin: '1.25rem 0' }}>
                    <div style={{ fontSize: '2.75rem', fontWeight: 800, fontFamily: 'monospace', color: '#D97706', letterSpacing: '2px' }}>
                      {formatTime(readingTimeLeft)}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#78716C', marginTop: '0.25rem', fontWeight: 600 }}>
                      SILENT READING TIME REMAINING
                    </div>
                  </div>

                  <p className="launch-box-desc" style={{ fontSize: '0.78rem', color: '#57534E', lineHeight: 1.5 }}>
                    Read through your handwritten pencil shorthand notes. Review ambiguous strokes, vowels, and punctuation. Typing will automatically launch when the timer expires.
                  </p>

                  <button 
                    className="btn-proceed-transcription"
                    onClick={onProceedToTyping}
                    style={{ background: '#1C1917', width: '100%', marginTop: '0.75rem' }}
                  >
                    <span>Skip Reading & Begin Typing Now →</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setInReadingPhase(false); setReadingTimeLeft(300); }}
                    style={{ background: 'none', border: 'none', color: '#78716C', fontSize: '0.74rem', marginTop: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Cancel Reading Phase & Return
                  </button>
                </div>
              ) : (
                <>
                  <div className="launch-box-badge-row">
                    <Award size={16} className="text-burgundy" />
                    <span className="launch-stage-tag">STAGE 2 • TRANSCRIPTION WORKFLOW</span>
                  </div>
                  
                  <h3 className="launch-box-title">Ready for Transcription?</h3>
                  <p className="launch-box-desc">
                    Transcribe your pencil shorthand outlines into the government-certified examination engine for algorithmic speed and accuracy evaluation.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <button 
                      className="btn-proceed-transcription"
                      onClick={() => setInReadingPhase(true)}
                      style={{ background: '#D97706', borderColor: '#B45309', color: '#FFFFFF' }}
                    >
                      <Clock size={18} />
                      <span>Start Official 5-Min Reading Period</span>
                    </button>

                    <button 
                      className="btn-proceed-transcription"
                      onClick={onProceedToTyping}
                      id="btn-proceed-to-transcription"
                      style={{ background: '#1C1917' }}
                    >
                      <span>Direct Typing (Skip Reading Phase)</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  
                  <div className="launch-shortcut-hint">
                    <Zap size={13} className="text-burgundy" />
                    <span>Quick shortcut: Press <strong>Ctrl + Enter</strong> anytime to proceed</span>
                  </div>

                  <p className="launch-guarantee-note">
                    Official SSC Grade C/D & High Court guidelines enforce a 5-minute silent reading window before typing begins.
                  </p>
                </>
              )}
            </div>

            {/* 2. SECURITY & EXAMINATION PROTOCOLS */}
            <div className="dict-security-rules-card">
              <div className="security-rules-header">
                <ShieldCheck size={17} className="text-burgundy" />
                <h4 className="security-title">Strict Government Examination Protocols</h4>
              </div>

              <div className="security-rules-grid">
                <div className="security-rule-item">
                  <Lock size={15} className="text-rose-600 flex-shrink-0" />
                  <div>
                    <strong>Strict Backspace Lock:</strong> Configured on typing screen as per High Court and SSC commission rules.
                  </div>
                </div>
                <div className="security-rule-item">
                  <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                  <div>
                    <strong>Clipboard Protected:</strong> Copy, cut, and paste shortcuts are disabled to guarantee exam integrity.
                  </div>
                </div>
                <div className="security-rule-item">
                  <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                  <div>
                    <strong>Anti-Tab Switch Radar:</strong> Leaving the active exam window registers security audit strikes.
                  </div>
                </div>
              </div>

              <div className="security-card-footer">
                <button className="btn-cancel-test-link" onClick={onCancel}>
                  Cancel Test & Return to Vault
                </button>
              </div>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}
