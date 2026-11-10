import React from 'react';
import { Monitor, Headphones, Wind, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

export default function AcademyIllustration() {
  return (
    <div className="academy-illustration-card">
      {/* Top Floating Feature Badges */}
      <div className="floating-badge badge-top-left">
        <Headphones size={13} className="text-amber-600" />
        <span>Studio Audio Broadcast</span>
      </div>

      <div className="floating-badge badge-top-right">
        <Monitor size={13} className="text-emerald-600" />
        <span>50+ High-Speed PCs</span>
      </div>

      {/* Main Vector SVG Illustration */}
      <div className="illustration-svg-wrap">
        <svg
          viewBox="0 0 540 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="academy-svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8F9FA" />
              <stop offset="100%" stopColor="#F8F9FA" />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="deskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8F9FA" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0.08)" />
            </linearGradient>
            <linearGradient id="highlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="paperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8F9FA" />
              <stop offset="100%" stopColor="#fdfbf7" />
            </linearGradient>

            {/* Soft Drop Shadow */}
            <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.08" />
            </filter>
            <filter id="deskShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.06" />
            </filter>
          </defs>

          {/* 1. Base Blueprint & Grid Background */}
          <rect width="540" height="340" rx="16" fill="url(#bgGrad)" />

          {/* Decorative Grid Lines */}
          <g stroke="rgba(0, 0, 0, 0.08)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
            <line x1="40" y1="0" x2="40" y2="340" />
            <line x1="120" y1="0" x2="120" y2="340" />
            <line x1="200" y1="0" x2="200" y2="340" />
            <line x1="280" y1="0" x2="280" y2="340" />
            <line x1="360" y1="0" x2="360" y2="340" />
            <line x1="440" y1="0" x2="440" y2="340" />
            <line x1="500" y1="0" x2="500" y2="340" />

            <line x1="0" y1="60" x2="540" y2="60" />
            <line x1="0" y1="130" x2="540" y2="130" />
            <line x1="0" y1="200" x2="540" y2="200" />
            <line x1="0" y1="270" x2="540" y2="270" />
          </g>

          {/* 2. Background Laboratory: Silhouette of Adjacent Computer Terminals (50+ PC Batch) */}
          <g opacity="0.45">
            {/* Terminal Left Background */}
            <rect x="50" y="80" width="70" height="48" rx="4" fill="#d6d3d1" />
            <rect x="54" y="84" width="62" height="38" rx="2" fill="#a8a29e" />
            <rect x="80" y="128" width="10" height="12" fill="#a8a29e" />
            <rect x="72" y="140" width="26" height="4" rx="2" fill="#a8a29e" />

            {/* Terminal Right Background */}
            <rect x="420" y="80" width="70" height="48" rx="4" fill="#d6d3d1" />
            <rect x="424" y="84" width="62" height="38" rx="2" fill="#a8a29e" />
            <rect x="450" y="128" width="10" height="12" fill="#a8a29e" />
            <rect x="442" y="140" width="26" height="4" rx="2" fill="#a8a29e" />

            {/* Wall AC Unit */}
            <rect x="220" y="24" width="100" height="24" rx="4" fill="#FFFFFF" stroke="#d6d3d1" strokeWidth="1.5" />
            <line x1="230" y1="36" x2="310" y2="36" stroke="#a8a29e" strokeWidth="1.5" />
            <circle cx="308" cy="30" r="2" fill="#047857" />
            {/* AC Airflow Curves */}
            <path d="M240 52 C245 60 255 60 260 68" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M270 52 C275 60 285 60 290 68" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </g>

          {/* 3. Main Examination Workstation Desk */}
          <g filter="url(#deskShadow)">
            {/* Desk Surface */}
            <path
              d="M 60 220 L 480 220 L 510 275 L 30 275 Z"
              fill="url(#deskGrad)"
              stroke="#a8a29e"
              strokeWidth="1.5"
            />
            {/* Front Desk Edge */}
            <rect x="30" y="275" width="480" height="12" rx="2" fill="#a8a29e" />
          </g>

          {/* 4. Centerpiece: High-Performance Exam Monitor */}
          <g filter="url(#cardShadow)">
            {/* Monitor Stand */}
            <rect x="260" y="190" width="20" height="34" rx="2" fill="#64748B" />
            <ellipse cx="270" cy="225" rx="36" ry="6" fill="#57534e" />

            {/* Monitor Outer Frame */}
            <rect x="175" y="70" width="190" height="125" rx="8" fill="#0F172A" stroke="#2D2D30" strokeWidth="2" />
            
            {/* Monitor Display Screen */}
            <rect x="182" y="77" width="176" height="111" rx="4" fill="url(#screenGrad)" />

            {/* Screen Header Bar: Examination Status */}
            <rect x="182" y="77" width="176" height="16" fill="#0F172A" />
            <circle cx="191" cy="85" r="2.5" fill="#ef4444" />
            <circle cx="198" cy="85" r="2.5" fill="#f59e0b" />
            <circle cx="205" cy="85" r="2.5" fill="#047857" />
            <text x="218" y="89" fill="#a8a29e" fontSize="7" fontFamily="sans-serif" fontWeight="bold">
              SSC GRADE D BENCH • 80 WPM
            </text>

            {/* Telemetry Pills on Screen */}
            <rect x="188" y="98" width="50" height="14" rx="3" fill="#0F172A" />
            <text x="194" y="108" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="monospace">80 WPM</text>

            <rect x="244" y="98" width="52" height="14" rx="3" fill="#064e3b" />
            <text x="250" y="108" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" fontFamily="monospace">98.4% ACC</text>

            <rect x="302" y="98" width="50" height="14" rx="3" fill="#451a03" />
            <text x="308" y="108" fill="#fde68a" fontSize="7.5" fontWeight="bold" fontFamily="monospace">04:32 REM</text>

            {/* Live Typing Passage Simulation on Screen */}
            <g opacity="0.9">
              {/* Correct typed lines */}
              <rect x="188" y="120" width="164" height="4" rx="1.5" fill="#d97706" />
              <rect x="188" y="128" width="145" height="4" rx="1.5" fill="#d97706" />
              <rect x="188" y="136" width="160" height="4" rx="1.5" fill="#d97706" />
              
              {/* Active typing word with cursor */}
              <rect x="188" y="144" width="70" height="4" rx="1.5" fill="#047857" />
              <rect x="261" y="142" width="2" height="8" rx="1" fill="#FFFFFF" />

              {/* Untyped passage preview */}
              <rect x="266" y="144" width="86" height="4" rx="1.5" fill="#57534e" />
              <rect x="188" y="152" width="155" height="4" rx="1.5" fill="#57534e" />
              <rect x="188" y="160" width="130" height="4" rx="1.5" fill="#57534e" />
            </g>

            {/* Bottom Screen Evaluation Indicator */}
            <rect x="188" y="172" width="164" height="10" rx="3" fill="#0F172A" stroke="#2D2D30" strokeWidth="1" />
            <text x="194" y="180" fill="#047857" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">
              ✓ Strict Examination Mode Active • Backspace Monitored
            </text>
          </g>

          {/* 5. Mechanical Exam Keyboard & Mouse */}
          <g filter="url(#cardShadow)">
            {/* Keyboard Body */}
            <path
              d="M 185 234 L 355 234 L 362 264 L 178 264 Z"
              fill="#FFFFFF"
              stroke="#d6d3d1"
              strokeWidth="1.5"
            />
            {/* Keycap Rows */}
            <rect x="190" y="238" width="158" height="3.5" rx="1" fill="rgba(0, 0, 0, 0.08)" />
            <rect x="188" y="244" width="163" height="3.5" rx="1" fill="rgba(0, 0, 0, 0.08)" />
            <rect x="186" y="250" width="167" height="3.5" rx="1" fill="rgba(0, 0, 0, 0.08)" />
            {/* Spacebar */}
            <rect x="230" y="256" width="80" height="4" rx="1.5" fill="#0F172A" />

            {/* Optical Mouse */}
            <ellipse cx="395" cy="248" rx="11" ry="16" fill="#FFFFFF" stroke="#d6d3d1" strokeWidth="1.5" />
            <line x1="395" y1="234" x2="395" y2="246" stroke="#a8a29e" strokeWidth="1" />
            <circle cx="395" cy="242" r="1.5" fill="#d97706" />
          </g>

          {/* 6. Left Desk: Official Shorthand Steno Pad & Pencil */}
          <g filter="url(#cardShadow)">
            {/* Shorthand Notepad (Pitman Pad) */}
            <rect x="80" y="210" width="76" height="58" rx="4" fill="url(#paperGrad)" stroke="rgba(0, 0, 0, 0.08)" strokeWidth="1.5" />
            
            {/* Top Spiral Wire Binding */}
            <circle cx="88" cy="210" r="2.5" fill="#64748B" />
            <circle cx="98" cy="210" r="2.5" fill="#64748B" />
            <circle cx="108" cy="210" r="2.5" fill="#64748B" />
            <circle cx="118" cy="210" r="2.5" fill="#64748B" />
            <circle cx="128" cy="210" r="2.5" fill="#64748B" />
            <circle cx="138" cy="210" r="2.5" fill="#64748B" />
            <circle cx="148" cy="210" r="2.5" fill="#64748B" />

            {/* Notebook Margin Line */}
            <line x1="86" y1="216" x2="86" y2="264" stroke="#fca5a5" strokeWidth="1" />

            {/* Authentic Pitman Shorthand Stroke Curves */}
            <g stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round" opacity="0.85">
              {/* Line 1 strokes */}
              <path d="M 94 223 C 98 220 102 225 106 222" />
              <path d="M 110 220 L 115 225" strokeWidth="2" />
              <path d="M 120 224 C 124 226 128 221 132 224" />
              <path d="M 137 222 L 144 222" />

              {/* Line 2 strokes */}
              <path d="M 94 233 L 99 238" strokeWidth="2" />
              <path d="M 104 235 C 108 238 112 233 116 236" />
              <path d="M 122 232 C 126 232 130 236 135 233" strokeWidth="2" />
              <path d="M 140 234 L 146 237" />

              {/* Line 3 strokes */}
              <path d="M 94 243 C 98 245 103 241 108 244" />
              <path d="M 114 244 L 120 241" />
              <path d="M 125 245 C 129 242 134 246 139 242" strokeWidth="2" />

              {/* Line 4 strokes */}
              <path d="M 94 253 L 102 253" strokeWidth="2" />
              <path d="M 108 255 C 112 252 116 257 121 254" />
              <path d="M 127 254 L 133 256" />
            </g>

            {/* Shorthand Sharpened Pencil */}
            <g transform="rotate(-25 135 245)">
              <rect x="130" y="205" width="6" height="52" rx="1" fill="#f59e0b" />
              <polygon points="130,257 136,257 133,264" fill="#d97706" />
              <polygon points="131.5,261 134.5,261 133,264" fill="#0F172A" />
              <rect x="130" y="202" width="6" height="4" rx="1" fill="#d6d3d1" />
              <rect x="130" y="198" width="6" height="4" rx="1" fill="#f43f5e" />
            </g>
          </g>

          {/* 7. Right Desk: Studio Broadcast Audio Station & Monitoring Headphones */}
          <g filter="url(#cardShadow)">
            {/* Audio Transmitter Console */}
            <rect x="420" y="210" width="70" height="46" rx="6" fill="#0F172A" stroke="#2D2D30" strokeWidth="1.5" />
            <text x="428" y="222" fill="#a8a29e" fontSize="6" fontWeight="bold" fontFamily="sans-serif">BROADCAST</text>
            
            {/* VU Meter Bars */}
            <rect x="428" y="227" width="5" height="12" rx="1" fill="#047857" />
            <rect x="435" y="224" width="5" height="15" rx="1" fill="#047857" />
            <rect x="442" y="222" width="5" height="17" rx="1" fill="#047857" />
            <rect x="449" y="225" width="5" height="14" rx="1" fill="#f59e0b" />
            <rect x="456" y="229" width="5" height="10" rx="1" fill="#ef4444" />

            {/* Volume Dial */}
            <circle cx="474" cy="233" r="8" fill="#2D2D30" stroke="#64748B" strokeWidth="1" />
            <line x1="474" y1="233" x2="479" y2="229" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />

            {/* Over-Ear Monitoring Headphones */}
            <path
              d="M 405 192 A 20 20 0 0 1 435 192"
              fill="none"
              stroke="#57534e"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Left Earcup */}
            <rect x="398" y="188" width="8" height="16" rx="4" fill="#0F172A" />
            {/* Right Earcup */}
            <rect x="434" y="188" width="8" height="16" rx="4" fill="#0F172A" />
          </g>

          {/* 8. Verified Exam Seal in Bottom Left Corner */}
          <g transform="translate(42, 298)">
            <rect width="112" height="26" rx="6" fill="#FFFFFF" stroke="rgba(0, 0, 0, 0.08)" strokeWidth="1" filter="url(#cardShadow)" />
            <circle cx="16" cy="13" r="6" fill="#f0fdf4" />
            <path d="M13 13 L15 15 L19 11" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="26" y="11" fill="#0F172A" fontSize="7" fontWeight="bold" fontFamily="sans-serif">ESTD. 2012</text>
            <text x="26" y="19" fill="#64748B" fontSize="6.5" fontFamily="sans-serif">Govt Exam Accredited</text>
          </g>
        </svg>
      </div>

      {/* Bottom Floating Feature Badges */}
      <div className="floating-badge badge-bottom-left">
        <Wind size={13} className="text-stone-700" />
        <span>Central Air-Conditioned</span>
      </div>

      <div className="floating-badge badge-bottom-right">
        <BookOpen size={13} className="text-amber-600" />
        <span>Pitman & Kruti Dev Desks</span>
      </div>

      {/* Bottom Description Footer */}
      <div className="illustration-caption-strip">
        <div className="caption-text-group">
          <div className="caption-title-line">
            <span className="live-status-dot" />
            <span className="caption-title">Modern 50+ PC Typing & Shorthand Lab</span>
          </div>
          <span className="caption-sub">
            Gaya Head Branch • Daily Speed Chambers & Real Audio Benches
          </span>
        </div>
      </div>
    </div>
  );
}
