import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Zap, CheckCircle2, Gauge, AlertCircle, Headphones } from 'lucide-react';

const DEMO_SENTENCES = [
  "At the same time this is also opposed by some people who say that it will not reduce the election expenditure and will be an additional burden on the Government Exchequer.",
  "In Europe, in some countries like Germany, France and also in Japan this State funding system has been successfully implemented but in my opinion it can be paid in kind.",
  "Frequent elections throughout the year disrupt the normal developmental activities of the Government and the administrative machinery remains busy."
];

export default function LiveDemoWidget({ onStartFullTest }) {
  const [passageIndex, setPassageIndex] = useState(0);
  const targetText = DEMO_SENTENCES[passageIndex];
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let timer;
    if (startTime && !isCompleted) {
      timer = setInterval(() => {
        const secs = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
        setElapsedSeconds(secs);
        const wordsTyped = typedText.trim().length / 5;
        const currentWpm = Math.round((wordsTyped / (secs / 60)) || 0);
        setWpm(currentWpm);
      }, 500);
    }
    return () => clearInterval(timer);
  }, [startTime, isCompleted, typedText]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }
    setTypedText(val);

    let correctChars = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) {
        correctChars++;
      }
    }
    const acc = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setAccuracy(acc);

    if (val.length >= targetText.length) {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setTypedText('');
    setStartTime(null);
    setElapsedSeconds(0);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleNextPassage = () => {
    setPassageIndex((prev) => (prev + 1) % DEMO_SENTENCES.length);
    handleReset();
  };

  return (
    <div className="live-demo-card glass-panel-glow">
      <div className="demo-widget-header">
        <div className="demo-title-group">
          <span className="badge badge-indigo">
            <Zap size={12} />
            <span>Interactive Speed Lab</span>
          </span>
          <h3>Try The Exam Engine Live</h3>
        </div>

        <div className="demo-hud-stats">
          <div className="hud-metric">
            <span className="hud-label">Speed</span>
            <span className="hud-val font-mono gradient-text">{wpm} <small>WPM</small></span>
          </div>
          <div className="hud-metric">
            <span className="hud-label">Accuracy</span>
            <span className={`hud-val font-mono ${accuracy >= 95 ? 'text-emerald' : 'text-amber'}`}>
              {accuracy}%
            </span>
          </div>
          <div className="hud-metric">
            <span className="hud-label">Time</span>
            <span className="hud-val font-mono">{elapsedSeconds}s</span>
          </div>
        </div>
      </div>

      <div className="demo-passage-box">
        <div className="passage-char-stream">
          {targetText.split('').map((char, index) => {
            let status = 'pending';
            if (index < typedText.length) {
              status = typedText[index] === char ? 'correct' : 'wrong';
            }
            const isCursor = index === typedText.length;
            return (
              <span
                key={index}
                className={`stream-char ${status} ${isCursor ? 'cursor-char' : ''}`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>

      <div className="demo-input-container">
        <input
          ref={inputRef}
          type="text"
          className="demo-type-input"
          placeholder="Start typing the passage above to test your speed..."
          value={typedText}
          onChange={handleInputChange}
          disabled={isCompleted}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />

        <div className="demo-controls-bar">
          <button className="btn btn-secondary btn-sm" onClick={handleReset} title="Restart exercise">
            <RotateCcw size={15} />
            <span>Restart</span>
          </button>
          <button className="btn btn-outline btn-sm" onClick={handleNextPassage}>
            <span>Next Passage ({passageIndex + 1}/{DEMO_SENTENCES.length})</span>
          </button>
          <button className="btn btn-primary btn-sm ml-auto" onClick={onStartFullTest}>
            <Headphones size={15} />
            <span>Launch Full 10-Min Exam</span>
          </button>
        </div>
      </div>

      {isCompleted && (
        <div className="demo-completion-banner">
          <CheckCircle2 size={20} className="text-emerald" />
          <p>Passage Completed! Final Speed: <strong>{wpm} WPM</strong> with <strong>{accuracy}% Accuracy</strong>.</p>
        </div>
      )}
    </div>
  );
}
