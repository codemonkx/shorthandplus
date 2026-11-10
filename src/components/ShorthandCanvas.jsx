import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  PenTool, 
  Eraser, 
  RotateCcw, 
  RotateCw, 
  Trash2, 
  Download, 
  FileText, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  Check, 
  Copy, 
  Layers, 
  Grid, 
  Maximize2, 
  Minimize2,
  Sliders,
  Award,
  Zap,
  Info
} from 'lucide-react';

export default function ShorthandCanvas({ 
  audioUrl = '/assets/sample-dictation.mp3',
  title = 'Interactive Shorthand Studio & Stylus Whiteboard',
  topic = 'Parliamentary Motion on State Infrastructure & Expenditure Audit',
  initialNotes = ''
}) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  // Drawing tools: 'pencil' (fine) | 'pen' (chisel/heavy) | 'highlighter' | 'eraser'
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#1D1D1F'); // Obsidian charcoal
  const [lineWidth, setLineWidth] = useState(2.5);
  const [showRuledLines, setShowRuledLines] = useState(true);
  const [canvasHeight, setCanvasHeight] = useState(380);
  
  // History for Undo / Redo
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  // Drawing state
  const isDrawing = useRef(false);
  const lastPoint = useRef(null);

  // Scratchpad state
  const [scratchpadText, setScratchpadText] = useState(initialNotes);
  const [copiedNote, setCopiedNote] = useState(false);
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' | 'scratchpad' | 'split'

  // Dictation Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(300);

  // Reference Outlines
  const REFERENCE_STROKES = [
    { label: 'P / B', stroke: '/', desc: 'P (Light) • B (Heavy downward)' },
    { label: 'T / D', stroke: '|', desc: 'T (Light) • D (Heavy vertical)' },
    { label: 'CH / J', stroke: '\\', desc: 'CH (Light) • J (Heavy downward)' },
    { label: 'K / G', stroke: '—', desc: 'K (Light) • G (Heavy horizontal)' },
    { label: 'F / V', stroke: ')', desc: 'F (Light) • V (Heavy curve)' },
    { label: 'ITH / THE', stroke: '(', desc: 'ITH (Light) • THE (Heavy curve)' },
    { label: 'S / Z', stroke: ')', desc: 'S (Light) • Z (Heavy reverse curve)' },
    { label: 'M / N', stroke: '⌒', desc: 'M (Upper arch) • N (Shallow arch)' },
    { label: 'ING', stroke: '⌣', desc: 'Heavy downward hook/nasal curve' },
    { label: 'L / R', stroke: '⌢', desc: 'L (Upward curve) • R (Ray or downward)' }
  ];

  const [activeRef, setActiveRef] = useState(REFERENCE_STROKES[0]);

  // Save canvas state to history
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setHistory((prev) => {
      const next = prev.slice(0, historyStep + 1);
      next.push(dataUrl);
      if (next.length > 25) next.shift(); // Cap memory to 25 steps
      return next;
    });
    setHistoryStep((prev) => Math.min(prev + 1, 24));
  }, [historyStep]);

  // Redraw canvas background (ruled paper guidelines)
  const drawBackground = useCallback((ctx, width, height) => {
    ctx.fillStyle = '#FFFFFF'; // Crisp White Canvas
    ctx.fillRect(0, 0, width, height);

    if (showRuledLines) {
      const lineSpacing = 32;
      ctx.lineWidth = 1;
      
      for (let y = lineSpacing; y < height; y += lineSpacing) {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)'; // Warm stone ruled line
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Subtle position indicator dots on the left margin
        ctx.fillStyle = '#d6d3d1';
        ctx.beginPath();
        ctx.arc(8, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Vertical left margin line (steno notebook style)
      ctx.strokeStyle = '#fecdd3'; // Pale blush red margin
      ctx.beginPath();
      ctx.moveTo(36, 0);
      ctx.lineTo(36, height);
      ctx.stroke();
    }
  }, [showRuledLines]);

  // Initialize Canvas resolution & background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);

    drawBackground(ctx, rect.width, canvasHeight);
    saveState();
  }, [canvasHeight, drawBackground, saveState]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext('2d');

      // Preserve existing image
      const tempImg = new Image();
      tempImg.src = canvas.toDataURL();
      tempImg.onload = () => {
        canvas.width = rect.width * dpr;
        canvas.height = canvasHeight * dpr;
        ctx.scale(dpr, dpr);
        drawBackground(ctx, rect.width, canvasHeight);
        ctx.drawImage(tempImg, 0, 0, rect.width, canvasHeight);
      };
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvasHeight, drawBackground]);

  // Re-draw background when showRuledLines toggles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    if (historyStep >= 0 && history[historyStep]) {
      const img = new Image();
      img.src = history[historyStep];
      img.onload = () => {
        ctx.clearRect(0, 0, rect.width, canvasHeight);
        drawBackground(ctx, rect.width, canvasHeight);
        ctx.drawImage(img, 0, 0, rect.width, canvasHeight);
      };
    }
  }, [canvasHeight, drawBackground, history, historyStep, showRuledLines]);

  // Drawing event handlers
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, pressure: 1 };
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pressure = e.pressure && e.pressure > 0 ? e.pressure : 1;
    return { x, y, pressure };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    isDrawing.current = true;
    const { x, y } = getCoordinates(e);
    lastPoint.current = { x, y };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 20;
    } else if (tool === 'pencil') {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    } else if (tool === 'pen') {
      // Calligraphy steno nib (thick voiced strokes)
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth * 2.2;
    } else if (tool === 'highlighter') {
      ctx.strokeStyle = '#f59e0b44'; // Amber translucent
      ctx.lineWidth = 16;
    }
  };

  const draw = (e) => {
    if (!isDrawing.current || !lastPoint.current) return;
    e.preventDefault();

    const { x, y, pressure } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Dynamic pressure simulation if available
    if (tool === 'pencil' && pressure !== 1) {
      ctx.lineWidth = lineWidth * (0.6 + pressure * 0.8);
    }

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    // Smooth quadratic curve midpoint
    const midX = (lastPoint.current.x + x) / 2;
    const midY = (lastPoint.current.y + y) / 2;
    ctx.quadraticCurveTo(lastPoint.current.x, lastPoint.current.y, midX, midY);
    ctx.stroke();

    lastPoint.current = { x, y };
  };

  const stopDrawing = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    lastPoint.current = null;
    saveState();
  };

  // Undo / Redo Handlers
  const handleUndo = () => {
    if (historyStep <= 0) return;
    const prevStep = historyStep - 1;
    setHistoryStep(prevStep);
    loadHistoryImage(history[prevStep]);
  };

  const handleRedo = () => {
    if (historyStep >= history.length - 1) return;
    const nextStep = historyStep + 1;
    setHistoryStep(nextStep);
    loadHistoryImage(history[nextStep]);
  };

  const loadHistoryImage = (dataUrl) => {
    const canvas = canvasRef.current;
    if (!canvas || !dataUrl) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      ctx.clearRect(0, 0, rect.width, canvasHeight);
      ctx.drawImage(img, 0, 0, rect.width, canvasHeight);
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, canvasHeight);
    drawBackground(ctx, rect.width, canvasHeight);
    saveState();
  };

  // Export Canvas as PNG
  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `shorthand-practice-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Export Scratchpad Notes as .txt
  const handleExportTXT = () => {
    const element = document.createElement('a');
    const file = new Blob([scratchpadText || 'No shorthand transcription text recorded.'], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `shorthand-scratchpad-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyScratchpad = () => {
    navigator.clipboard.writeText(scratchpadText);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2200);
  };

  // Audio Playback Controls
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSpeedChange = (spd) => {
    setAudioSpeed(spd);
    if (audioRef.current) {
      audioRef.current.playbackRate = spd;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Metrics
  const wordCount = scratchpadText.trim() ? scratchpadText.trim().split(/\s+/).length : 0;
  const charCount = scratchpadText.length;

  return (
    <div className="shorthand-canvas-container" style={{
      background: '#FFFFFF',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 4px 16px -2px rgba(28, 25, 23, 0.05)',
      fontFamily: 'inherit'
    }}>
      {/* 1. TOP HEADER & TELEMETRY */}
      <div style={{
        padding: '0.85rem 1.25rem',
        background: '#fafaf9',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: '#1D1D1F',
            color: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <PenTool size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#1D1D1F' }}>
                {title}
              </h3>
              <span style={{
                fontSize: '0.68rem',
                padding: '0.15rem 0.45rem',
                borderRadius: 4,
                background: '#ecfdf5',
                color: '#047857',
                border: '1px solid #a7f3d0',
                fontWeight: 600
              }}>
                1080P HD STYLUS READY
              </span>
            </div>
            <p style={{ margin: '0.1rem 0 0', fontSize: '0.78rem', color: '#78716c' }}>
              Focus: <span style={{ color: '#1D1D1F', fontWeight: 600 }}>{topic}</span>
            </p>
          </div>
        </div>

        {/* View Layout Switcher (Canvas / Split / Scratchpad) */}
        <div style={{
          display: 'flex',
          background: '#FFFFFF',
          padding: 3,
          borderRadius: 8,
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('canvas')}
            style={{
              padding: '0.3rem 0.65rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'canvas' ? '#1D1D1F' : 'transparent',
              color: activeTab === 'canvas' ? '#FFFFFF' : '#6E6E73',
              boxShadow: activeTab === 'canvas' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            Shorthand Whiteboard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('split')}
            style={{
              padding: '0.3rem 0.65rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'split' ? '#1D1D1F' : 'transparent',
              color: activeTab === 'split' ? '#FFFFFF' : '#6E6E73',
              boxShadow: activeTab === 'split' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            Dual Split Screen
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scratchpad')}
            style={{
              padding: '0.3rem 0.65rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'scratchpad' ? '#1D1D1F' : 'transparent',
              color: activeTab === 'scratchpad' ? '#FFFFFF' : '#6E6E73',
              boxShadow: activeTab === 'scratchpad' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            Candidate Scratchpad
          </button>
        </div>
      </div>

      {/* 2. AUDIO DICTATION BAR (INTEGRATED) */}
      <div style={{
        padding: '0.6rem 1.25rem',
        background: '#fafaf9',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={toggleAudio}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#1D1D1F',
              color: '#fafaf9',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
            title={isPlaying ? 'Pause Dictation' : 'Play Dictation'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 2 }} />}
          </button>

          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1D1D1F', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>Live Dictation Audio Track</span>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: '#78716c' }}>
                {formatTime(audioCurrentTime)} / {formatTime(audioDuration)}
              </span>
            </div>
            <div style={{ width: 140, height: 4, background: 'rgba(0, 0, 0, 0.08)', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${audioDuration > 0 ? (audioCurrentTime / audioDuration) * 100 : 0}%`,
                background: '#d97706',
                transition: 'width 0.2s linear'
              }} />
            </div>
          </div>
        </div>

        {/* Speed Controls (0.8x to 1.3x) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.74rem', color: '#78716c', fontWeight: 600, marginRight: 2 }}>Speed:</span>
          {[
            { spd: 0.8, label: '0.8x' },
            { spd: 1.0, label: '80 WPM' },
            { spd: 1.1, label: '88 WPM' },
            { spd: 1.2, label: '96 WPM' },
            { spd: 1.3, label: '104 WPM' }
          ].map((item) => (
            <button
              key={item.spd}
              type="button"
              onClick={() => handleSpeedChange(item.spd)}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.72rem',
                borderRadius: 4,
                border: '1px solid',
                borderColor: audioSpeed === item.spd ? '#1D1D1F' : 'rgba(0, 0, 0, 0.08)',
                background: audioSpeed === item.spd ? '#1D1D1F' : '#F5F5F7',
                color: audioSpeed === item.spd ? '#fafaf9' : '#44403c',
                fontWeight: audioSpeed === item.spd ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={(e) => {
            setAudioCurrentTime(e.target.currentTime);
            if (e.target.duration && !isNaN(e.target.duration)) {
              setAudioDuration(e.target.duration);
            }
          }}
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      {/* 3. TOOLBAR FOR SHORTHAND DRAWING */}
      {(activeTab === 'canvas' || activeTab === 'split') && (
        <div style={{
          padding: '0.6rem 1.25rem',
          background: '#FFFFFF',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {/* Tool Selection */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button
              type="button"
              onClick={() => { setTool('pencil'); setLineWidth(2.5); }}
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: 6,
                border: '1px solid',
                borderColor: tool === 'pencil' ? '#1D1D1F' : 'rgba(0, 0, 0, 0.08)',
                background: tool === 'pencil' ? '#1D1D1F' : '#fafaf9',
                color: tool === 'pencil' ? '#fafaf9' : '#1D1D1F',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}
              title="Fine Pitman Steno Pencil (Light strokes)"
            >
              <PenTool size={14} />
              <span>Lead Pencil (Fine)</span>
            </button>

            <button
              type="button"
              onClick={() => { setTool('pen'); setLineWidth(4.5); }}
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: 6,
                border: '1px solid',
                borderColor: tool === 'pen' ? '#1D1D1F' : 'rgba(0, 0, 0, 0.08)',
                background: tool === 'pen' ? '#1D1D1F' : '#fafaf9',
                color: tool === 'pen' ? '#fafaf9' : '#1D1D1F',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}
              title="Heavy Pitman Calligraphy Nib (Voiced strokes)"
            >
              <Sparkles size={14} />
              <span>Heavy Steno Nib</span>
            </button>

            <button
              type="button"
              onClick={() => setTool('eraser')}
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: 6,
                border: '1px solid',
                borderColor: tool === 'eraser' ? '#1D1D1F' : 'rgba(0, 0, 0, 0.08)',
                background: tool === 'eraser' ? '#1D1D1F' : '#fafaf9',
                color: tool === 'eraser' ? '#fafaf9' : '#1D1D1F',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}
              title="Precision Outline Eraser"
            >
              <Eraser size={14} />
              <span>Eraser</span>
            </button>

            {/* Ruled lines toggle */}
            <button
              type="button"
              onClick={() => setShowRuledLines(!showRuledLines)}
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: 6,
                border: '1px solid',
                borderColor: showRuledLines ? '#d97706' : 'rgba(0, 0, 0, 0.08)',
                background: showRuledLines ? '#fef3c7' : '#fafaf9',
                color: showRuledLines ? '#92400e' : '#78716c',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}
              title="Toggle Steno Notebook Ruled Guidelines"
            >
              <Grid size={14} />
              <span>{showRuledLines ? 'Ruled Lines: ON' : 'Plain Canvas'}</span>
            </button>
          </div>

          {/* Color Palettes & Stroke Width */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {[
                { hex: '#1D1D1F', label: 'Obsidian Graphite' },
                { hex: '#d97706', label: 'Honey Amber' },
                { hex: '#047857', label: 'Emerald' },
                { hex: '#b91c1c', label: 'Crimson' }
              ].map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: c.hex,
                    border: color === c.hex ? '2px solid #F83458' : '1px solid rgba(0, 0, 0, 0.12)',
                    outline: color === c.hex ? `2px solid ${c.hex}` : 'none',
                    cursor: 'pointer'
                  }}
                  title={c.label}
                />
              ))}
            </div>

            <div style={{ width: 1, height: 20, background: 'rgba(0, 0, 0, 0.08)' }} />

            {/* Undo / Redo / Clear / Export */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                type="button"
                onClick={handleUndo}
                disabled={historyStep <= 0}
                style={{
                  padding: '0.3rem 0.45rem',
                  borderRadius: 6,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  background: '#fafaf9',
                  color: historyStep <= 0 ? '#d6d3d1' : '#1D1D1F',
                  cursor: historyStep <= 0 ? 'not-allowed' : 'pointer'
                }}
                title="Undo Stroke (Ctrl+Z)"
              >
                <RotateCcw size={14} />
              </button>

              <button
                type="button"
                onClick={handleRedo}
                disabled={historyStep >= history.length - 1}
                style={{
                  padding: '0.3rem 0.45rem',
                  borderRadius: 6,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  background: '#fafaf9',
                  color: historyStep >= history.length - 1 ? '#d6d3d1' : '#1D1D1F',
                  cursor: historyStep >= history.length - 1 ? 'not-allowed' : 'pointer'
                }}
                title="Redo Stroke (Ctrl+Y)"
              >
                <RotateCw size={14} />
              </button>

              <button
                type="button"
                onClick={handleClear}
                style={{
                  padding: '0.3rem 0.45rem',
                  borderRadius: 6,
                  border: '1px solid #fecdd3',
                  background: '#fff1f2',
                  color: '#991b1b',
                  cursor: 'pointer'
                }}
                title="Clear Whiteboard"
              >
                <Trash2 size={14} />
              </button>

              <button
                type="button"
                onClick={handleExportPNG}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: 6,
                  border: '1px solid #1D1D1F',
                  background: '#1D1D1F',
                  color: '#fafaf9',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4
                }}
                title="Export Shorthand Strokes as PNG"
              >
                <Download size={13} />
                <span>Save PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN WORKSPACE (CANVAS + SCRATCHPAD) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: activeTab === 'split' ? '1fr 1fr' : '1fr',
        minHeight: canvasHeight,
        background: '#FFFFFF'
      }}>
        {/* WHITEBOARD CANVAS VIEW */}
        {(activeTab === 'canvas' || activeTab === 'split') && (
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: canvasHeight,
                display: 'block',
                cursor: tool === 'eraser' ? 'cell' : 'crosshair',
                touchAction: 'none'
              }}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />

            {/* Canvas Bottom Quick Outlines Cheat-Strip */}
            <div style={{
              position: 'absolute',
              bottom: 8,
              left: 12,
              right: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(243, 238, 227, 0.92)',
              backdropFilter: 'blur(4px)',
              padding: '0.4rem 0.75rem',
              borderRadius: 8,
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
                <span style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: 700, marginRight: 4 }}>
                  OUTLINES:
                </span>
                {REFERENCE_STROKES.map((ref, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveRef(ref)}
                    style={{
                      padding: '0.15rem 0.45rem',
                      fontSize: '0.72rem',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: activeRef.label === ref.label ? '#d97706' : 'rgba(0, 0, 0, 0.08)',
                      background: activeRef.label === ref.label ? 'rgba(248, 52, 88, 0.08)' : '#F5F5F7',
                      color: activeRef.label === ref.label ? '#92400e' : '#1D1D1F',
                      cursor: 'pointer',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <span className="font-mono font-bold" style={{ color: '#d97706' }}>{ref.stroke}</span>
                    <span>{ref.label}</span>
                  </button>
                ))}
              </div>

              <div style={{ fontSize: '0.72rem', color: '#78716c', flexShrink: 0, marginLeft: 8 }} className="font-mono">
                {activeRef.desc}
              </div>
            </div>
          </div>
        )}

        {/* CANDIDATE SCRATCHPAD VIEW */}
        {(activeTab === 'scratchpad' || activeTab === 'split') && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            borderLeft: activeTab === 'split' ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
            background: '#FFFFFF'
          }}>
            {/* Scratchpad Header */}
            <div style={{
              padding: '0.55rem 1rem',
              background: '#fafaf9',
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileText size={15} style={{ color: '#1D1D1F' }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1D1D1F' }}>
                  Student Transcription Scratchpad
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', color: '#78716c' }} className="font-mono">
                  {wordCount} words • {charCount} chars
                </span>
                <button
                  type="button"
                  onClick={handleCopyScratchpad}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.72rem',
                    borderRadius: 4,
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontWeight: 600
                  }}
                  title="Copy notes to clipboard"
                >
                  {copiedNote ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copiedNote ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportTXT}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.72rem',
                    borderRadius: 4,
                    border: '1px solid #1D1D1F',
                    background: '#1D1D1F',
                    color: '#fafaf9',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontWeight: 600
                  }}
                  title="Export scratchpad as .txt"
                >
                  <Download size={12} />
                  <span>Export .txt</span>
                </button>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              style={{
                flex: 1,
                minHeight: canvasHeight - 45,
                padding: '1rem',
                border: 'none',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: '#1D1D1F',
                background: '#FFFFFF'
              }}
              placeholder="Rapidly transcribe your shorthand outlines here while listening to the audio dictation... (Supports instant .txt file export for review)"
              value={scratchpadText}
              onChange={(e) => setScratchpadText(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* 5. FOOTER PROTOCOL INFO */}
      <div style={{
        padding: '0.5rem 1.25rem',
        background: '#fafaf9',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: '#78716c'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Zap size={13} style={{ color: '#d97706' }} />
          <span>Stylus Pressure Sensitivity & High-Resolution Vector Smoothing Enabled</span>
        </div>
        <div className="font-mono">
          Positions: 1st (Above line) • 2nd (On line) • 3rd (Through line)
        </div>
      </div>
    </div>
  );
}

