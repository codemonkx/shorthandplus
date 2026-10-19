import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw,
  Volume2, 
  VolumeX, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Headphones, 
  CheckCircle2, 
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  RefreshCw,
  Lock,
  FileText
} from 'lucide-react';

export default function DictationRoom({ test, onProceedToTyping, onCancel }) {
  const currentTest = test || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentTest.audioDuration || 320);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [readingTimer, setReadingTimer] = useState(300);
  const [readingTimerActive, setReadingTimerActive] = useState(false);
  const audioRef = useRef(null);

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
    setReadingTimerActive(true);
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

  // 5-Minute Shorthand Reading Timer
  useEffect(() => {
    let interval;
    if (readingTimerActive && readingTimer > 0) {
      interval = setInterval(() => {
        setReadingTimer((prev) => {
          if (prev <= 1) {
            setReadingTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [readingTimerActive, readingTimer]);

  const handleResetReadingTimer = () => {
    setReadingTimerActive(false);
    setReadingTimer(300);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const category = currentTest.category || 'SSC Steno Grade C & D';
  const speed = currentTest.speed || '80 WPM';
  const language = currentTest.language || 'English';
  const title = currentTest.title || 'OCT 6 BENCH - Election Expenditure & Reforms';
  const totalWords = currentTest.totalWords || 437;
  const testDuration = currentTest.duration || '10 Mins';

  // Reading room progress percentage (from 300 down to 0)
  const readingProgress = Math.max(0, Math.min(100, ((300 - readingTimer) / 300) * 100));

  return (
    <div className="dictation-station-root">
      <audio
        ref={audioRef}
        src={currentTest.audioUrl || '/assets/sample-dictation.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      <div className="dictation-station-container">
        
        {/* TOP COMMAND HUD BAR */}
        <header className="dict-hud-card">
          <div className="dict-hud-left">
            <button className="dict-btn-exit" onClick={onCancel} id="btn-exit-exam-hud">
              <ArrowLeft size={16} />
              <span>Exit Exam</span>
            </button>
            <div className="dict-hud-divider" />
            <div className="dict-hud-badges-wrap">
              <span className="dict-pill dict-pill-blue">{category}</span>
              <span className="dict-pill dict-pill-emerald">{speed}</span>
              <span className="dict-pill dict-pill-amber">{language}</span>
              <span className="dict-pill dict-pill-slate">{totalWords} Words</span>
              <span className="dict-pill dict-pill-slate">{testDuration} Total</span>
            </div>
          </div>

          <div className="dict-hud-center">
            <div className="dict-stepper">
              <div className="dict-step-item active">
                <span className="step-num-bubble">1</span>
                <span>Audio Dictation</span>
              </div>
              <span className="step-arrow-divider">→</span>
              <div className={`dict-step-item ${readingTimerActive ? 'active-amber' : ''}`}>
                <span className="step-num-bubble">2</span>
                <span>5-Min Reading</span>
              </div>
              <span className="step-arrow-divider">→</span>
              <div className="dict-step-item upcoming">
                <span className="step-num-bubble">3</span>
                <span>Transcription</span>
              </div>
            </div>
          </div>

          <div className="dict-hud-right">
            <div className="dict-security-badge">
              <span className="pulse-dot-green" />
              <span>Exam Environment Active</span>
            </div>
          </div>
        </header>

        {/* TITLE & HEADER BANNER */}
        <section className="dict-banner-header">
          <div className="banner-title-column">
            <div className="dict-badge-row">
              <span className="badge-official-bench">
                <Sparkles size={13} className="text-royal-blue" />
                <span>OFFICIAL STENOGRAPHY EXAMINATION SIMULATION</span>
              </span>
            </div>
            <h1 className="dict-main-title">{title}</h1>
            <p className="dict-main-subtitle">
              Listen to the soundproof studio dictation audio and take down pencil shorthand notes in your notebook. After the dictation, you have a mandatory 5-minute reading clock to review outlines before transcription.
            </p>
          </div>
        </section>

        {/* MAIN 2-COLUMN WORKSTATION */}
        <main className="dict-workstation-layout">
          
          {/* COLUMN 1 (60%): STUDIO AUDIO DECK & DICTATION BLUEPRINT */}
          <div className="dict-left-column">
            
            {/* 1. PROFESSIONAL STUDIO AUDIO CONSOLE */}
            <div className="pro-audio-deck-card">
              <div className="deck-header-row">
                <div className="deck-source-info">
                  <div className="audio-studio-chip">
                    <Headphones size={15} />
                    <span>Soundproof Studio Recording • 320kbps</span>
                  </div>
                  <div className={`deck-live-pill ${isPlaying ? 'playing' : ''}`}>
                    <span className="pulse-audio-dot" />
                    <span>{isPlaying ? 'Dictation Playing' : 'Dictation Ready'}</span>
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
                title="Click anywhere to Play / Pause"
              >
                {Array.from({ length: 54 }).map((_, i) => {
                  const progress = currentTime / (duration || 1);
                  const barProgress = i / 54;
                  const isActive = barProgress <= progress;
                  const height = isPlaying 
                    ? `${Math.max(22, Math.sin(i * 0.38 + currentTime * 3.5) * 48 + 48)}%` 
                    : `${Math.max(16, ((i % 6) + 2) * 13)}%`;
                  return (
                    <div
                      key={i}
                      className={`deck-waveform-bar ${isActive ? 'active' : ''}`}
                      style={{ height }}
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
                    className="btn-master-play" 
                    onClick={togglePlay}
                    title={isPlaying ? "Pause Dictation" : "Start Dictation Audio"}
                    id="btn-master-play"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="play-icon-nudge" />}
                  </button>

                  <button 
                    className="btn-deck-icon" 
                    onClick={() => handleSkip(-10)} 
                    title="Rewind 10 Seconds"
                  >
                    <RotateCcw size={17} />
                    <span className="icon-subtext">-10s</span>
                  </button>

                  <button 
                    className="btn-deck-icon" 
                    onClick={() => handleSkip(10)} 
                    title="Forward 10 Seconds"
                  >
                    <RotateCw size={17} />
                    <span className="icon-subtext">+10s</span>
                  </button>

                  {/* Volume Control */}
                  <div className="volume-control-wrap">
                    <button className="btn-deck-icon" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                      {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
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
                    <SlidersHorizontal size={14} />
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

            {/* 2. CANDIDATE SHORTHAND DICTATION GUIDELINES */}
            <div className="dictation-guidelines-card">
              <div className="guidelines-header">
                <FileText size={18} className="text-royal-blue" />
                <h3 className="guidelines-title">Candidate Shorthand Writing Protocol</h3>
              </div>

              <div className="guidelines-metrics-strip">
                <div className="g-metric-item">
                  <div className="g-metric-num text-royal-blue">{speed}</div>
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
              </div>

              <ul className="guidelines-points-list">
                <li>
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                  <span><strong>Maintain steady stroke pacing:</strong> Do not pause or lift pencil excessively during natural audio pauses.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                  <span><strong>Omission strategy:</strong> If an outline is missed, proceed immediately with the next sentence; do not cross out or scribble.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                  <span><strong>Automatic transition:</strong> When the dictation audio completes, the 5-minute reading clock will begin automatically.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* COLUMN 2 (40%): 5-MIN READING CLOCK, SECURITY RULES & PROCEED ACTION */}
          <div className="dict-right-column">
            
            {/* 3. OFFICIAL 5-MINUTE SHORTHAND READING CLOCK */}
            <div className={`dict-reading-room-card ${readingTimerActive ? 'timer-running' : ''}`}>
              <div className="reading-room-top">
                <div className="reading-badge-row">
                  <Clock size={18} className="text-amber-600" />
                  <span className="reading-badge-pill">MANDATORY EXAMINATION STAGE</span>
                </div>
                <h3 className="reading-card-title">Official 5-Minute Shorthand Reading Time</h3>
                <p className="reading-card-desc">
                  Carefully read, examine, and vocalize your written pencil shorthand notes before touching the computer keyboard.
                </p>
              </div>

              {/* BIG DIGITAL COUNTDOWN CLOCK */}
              <div className="reading-clock-container">
                <div className="reading-clock-big font-mono">
                  {formatTime(readingTimer)}
                </div>
                <div className="reading-clock-caption">
                  {readingTimerActive ? '⏳ Reading Room Clock Running...' : 'Click Start to begin 5-minute countdown'}
                </div>
                <div className="reading-progress-track">
                  <div 
                    className="reading-progress-fill" 
                    style={{ width: `${readingProgress}%` }} 
                  />
                </div>
              </div>

              {/* TIMER CONTROLS */}
              <div className="reading-timer-actions">
                {!readingTimerActive ? (
                  <button 
                    className="btn-timer-primary" 
                    onClick={() => setReadingTimerActive(true)}
                    id="btn-start-reading-timer"
                  >
                    <Play size={16} />
                    <span>Start 5-Min Timer Now</span>
                  </button>
                ) : (
                  <button 
                    className="btn-timer-secondary" 
                    onClick={() => setReadingTimerActive(false)}
                    id="btn-pause-reading-timer"
                  >
                    <Pause size={16} />
                    <span>Pause Timer</span>
                  </button>
                )}
                
                <button 
                  className="btn-timer-reset" 
                  onClick={handleResetReadingTimer} 
                  title="Reset timer to 05:00"
                >
                  <RefreshCw size={14} />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* 4. SECURITY & EXAMINATION PROTOCOLS */}
            <div className="dict-security-rules-card">
              <div className="security-rules-header">
                <ShieldCheck size={18} className="text-blue-600" />
                <h4 className="security-title">Strict Government Examination Protocols</h4>
              </div>

              <div className="security-rules-grid">
                <div className="security-rule-item">
                  <Lock size={15} className="text-amber-600 flex-shrink-0" />
                  <div>
                    <strong>Strict Backspace Lock:</strong> Configured on next screen as per Patna High Court / SSC rules.
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
            </div>

            {/* 5. PRIMARY PROCEED CALL TO ACTION */}
            <div className="dict-launch-box">
              <button 
                className="btn-proceed-transcription"
                onClick={onProceedToTyping}
                id="btn-proceed-to-transcription"
              >
                <span>Begin Typing Transcription (Stage 2)</span>
                <ArrowRight size={20} />
              </button>
              
              <p className="launch-guarantee-note">
                Transitions directly to the full-screen typing engine with real-time error calculation, backspace audits, and instant score certificate.
              </p>

              <button className="btn-cancel-test-link" onClick={onCancel}>
                Cancel Test & Return
              </button>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}
