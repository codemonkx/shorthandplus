import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Gauge, 
  FileText, 
  Download, 
  RotateCcw, 
  BarChart2, 
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_LEADERBOARD } from '../data/mockData';

export default function EvaluationResult({ 
  submission, 
  onRetake, 
  onBackToDashboard, 
  onBackToTests 
}) {
  const { test, typedText, timeTakenSecs, backspaceCount, tabSwitchWarnings } = submission;
  const [filterMode, setFilterMode] = useState('all');
  const [activeTab, setActiveTab] = useState('diff');

  const masterWords = test.passageText.trim().split(/\s+/);
  const userWords = (typedText || '').trim().split(/\s+/).filter(Boolean);

  let correctCount = 0;
  let fullMistakes = 0;
  let missingCount = 0;
  let extraCount = 0;

  const diffTokens = [];
  const maxLen = Math.max(masterWords.length, userWords.length);

  for (let i = 0; i < maxLen; i++) {
    const masterW = masterWords[i] || '';
    const userW = userWords[i] || '';

    if (!userW && masterW) {
      missingCount++;
      diffTokens.push({ type: 'missing', master: masterW, user: '', index: i });
    } else if (!masterW && userW) {
      extraCount++;
      diffTokens.push({ type: 'extra', master: '', user: userW, index: i });
    } else if (masterW.toLowerCase().replace(/[^a-z0-9]/gi, '') === userW.toLowerCase().replace(/[^a-z0-9]/gi, '')) {
      correctCount++;
      diffTokens.push({ type: 'correct', master: masterW, user: userW, index: i });
    } else {
      fullMistakes++;
      diffTokens.push({ type: 'wrong', master: masterW, user: userW, index: i });
    }
  }

  const totalMasterWords = masterWords.length;
  const accuracy = Math.max(0, Math.round(((totalMasterWords - fullMistakes - missingCount) / totalMasterWords) * 100));
  const timeMinutes = Math.max(0.5, (timeTakenSecs || 300) / 60);
  const grossWpm = Math.round(userWords.length / timeMinutes);
  const netWpm = Math.max(0, Math.round((correctCount - fullMistakes) / timeMinutes));

  useEffect(() => {
    if (accuracy >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [accuracy]);

  const filteredTokens = diffTokens.filter((token) => {
    if (filterMode === 'errors') return token.type === 'wrong';
    if (filterMode === 'missing') return token.type === 'missing';
    return true;
  });

  return (
    <div className="evaluation-result-page">
      <div className="scorecard-hero clean-scorecard-card">
        {/* Top Header Bar */}
        <div className="scorecard-top-bar">
          <div className="badge-row">
            <span className="eval-badge eval-badge-blue">🏛️ Official SSC / High Court Marking</span>
            <span className={`eval-badge ${accuracy >= 90 ? 'eval-badge-emerald' : accuracy >= 80 ? 'eval-badge-amber' : 'eval-badge-rose'}`}>
              Grade: {accuracy >= 95 ? 'A+ (Passed • Merit Rank)' : accuracy >= 80 ? 'B (Qualified)' : 'Needs Practice (Speed Cutoff)'}
            </span>
          </div>
          <div className="scorecard-actions-btn-group">
            <button className="btn-scorecard-action outline" onClick={() => window.print()}>
              <Download size={14} />
              <span>Print Scorecard</span>
            </button>
            <button className="btn-scorecard-action primary" onClick={onRetake}>
              <RotateCcw size={14} />
              <span>Retake Test</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="scorecard-main-stats-grid">
          {/* Card 1: Final Accuracy (Hero Card) */}
          <div className={`scorecard-kpi-box hero-kpi-card ${accuracy >= 80 ? 'passing' : 'failing'}`}>
            <div className="kpi-header-row">
              <span className="kpi-micro-title">FINAL ACCURACY</span>
              <Award size={16} className={accuracy >= 80 ? 'text-emerald' : 'text-rose'} />
            </div>
            <div className="kpi-value-container">
              <span className="kpi-giant-stat font-mono">{accuracy}%</span>
            </div>
            <p className="kpi-footer-note">
              Marked strictly under official SSC Grade C/D guidelines
            </p>
          </div>

          {/* Card 2: Net Transcription Speed */}
          <div className="scorecard-kpi-box">
            <div className="kpi-header-row">
              <span className="kpi-micro-title">NET SPEED</span>
              <Gauge size={16} className="text-royal-blue" />
            </div>
            <div className="kpi-value-container">
              <span className="kpi-primary-stat font-mono">{netWpm}</span>
              <span className="kpi-unit-pill">WPM</span>
            </div>
            <p className="kpi-footer-note">
              Gross Speed: <strong>{grossWpm} WPM</strong>
            </p>
          </div>

          {/* Card 3: Words Correct */}
          <div className="scorecard-kpi-box">
            <div className="kpi-header-row">
              <span className="kpi-micro-title">WORDS CORRECT</span>
              <CheckCircle2 size={16} className="text-emerald" />
            </div>
            <div className="kpi-value-container">
              <span className="kpi-primary-stat text-emerald font-mono">{correctCount}</span>
              <span className="kpi-ratio-denominator font-mono">/ {totalMasterWords}</span>
            </div>
            <p className="kpi-footer-note">
              Total Typed: <strong>{userWords.length} words</strong>
            </p>
          </div>

          {/* Card 4: Total Penalties / Errors */}
          <div className="scorecard-kpi-box">
            <div className="kpi-header-row">
              <span className="kpi-micro-title">TOTAL PENALTIES</span>
              <XCircle size={16} className="text-rose" />
            </div>
            <div className="kpi-value-container">
              <span className="kpi-primary-stat text-rose font-mono">{fullMistakes + missingCount}</span>
              <span className="kpi-unit-pill text-rose">errors</span>
            </div>
            <p className="kpi-footer-note">
              <strong>{fullMistakes}</strong> wrong • <strong>{missingCount}</strong> omitted
            </p>
          </div>

          {/* Card 5: Keystroke & Test Integrity */}
          <div className="scorecard-kpi-box">
            <div className="kpi-header-row">
              <span className="kpi-micro-title">INTEGRITY & BKSP</span>
              <AlertCircle size={16} className="text-amber" />
            </div>
            <div className="kpi-value-container">
              <span className="kpi-primary-stat font-mono">{backspaceCount}</span>
              <span className="kpi-unit-pill">strikes</span>
            </div>
            <p className="kpi-footer-note">
              <strong>{tabSwitchWarnings}</strong> tab switches detected
            </p>
          </div>
        </div>
      </div>

      <div className="eval-tabs-row">
        <button 
          className={`eval-tab-btn ${activeTab === 'diff' ? 'active' : ''}`}
          onClick={() => setActiveTab('diff')}
        >
          <FileText size={16} />
          <span>Word-by-Word Diff Inspection</span>
        </button>
        <button 
          className={`eval-tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Trophy size={16} />
          <span>Batch Ranking & Leaderboard</span>
        </button>
        <button 
          className={`eval-tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          <BarChart2 size={16} />
          <span>Evaluation Formula Guide</span>
        </button>
      </div>

      {activeTab === 'diff' && (
        <div className="diff-inspector-panel glass-panel">
          <div className="diff-controls-bar">
            <div className="legend-pills">
              <span className="legend-item"><span className="diff-char-correct">Correct</span></span>
              <span className="legend-item"><span className="diff-char-wrong">Spelling Error</span></span>
              <span className="legend-item"><span className="diff-char-missing">Omitted / Missed</span></span>
              <span className="legend-item"><span className="diff-char-extra">Extra Inserted</span></span>
            </div>

            <div className="filter-buttons-group ml-auto">
              <button 
                className={`filter-pill ${filterMode === 'all' ? 'active' : ''}`}
                onClick={() => setFilterMode('all')}
              >
                All Words ({diffTokens.length})
              </button>
              <button 
                className={`filter-pill ${filterMode === 'errors' ? 'active text-rose' : ''}`}
                onClick={() => setFilterMode('errors')}
              >
                Errors Only ({fullMistakes})
              </button>
              <button 
                className={`filter-pill ${filterMode === 'missing' ? 'active text-amber' : ''}`}
                onClick={() => setFilterMode('missing')}
              >
                Missing Only ({missingCount})
              </button>
            </div>
          </div>

          <div className="tokens-stream-container">
            {filteredTokens.map((token, idx) => {
              if (token.type === 'correct') {
                return (
                  <span key={idx} className="diff-token correct">
                    {token.user}{' '}
                  </span>
                );
              }
              if (token.type === 'wrong') {
                return (
                  <span key={idx} className="diff-token wrong">
                    <del>{token.user}</del>
                    <ins>{token.master}</ins>{' '}
                  </span>
                );
              }
              if (token.type === 'missing') {
                return (
                  <span key={idx} className="diff-token missing">
                    [{token.master}]{' '}
                  </span>
                );
              }
              if (token.type === 'extra') {
                return (
                  <span key={idx} className="diff-token extra">
                    +{token.user}+{' '}
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="leaderboard-panel glass-panel">
          <div className="panel-header">
            <h3>Live Batch Leaderboard — {test.title}</h3>
            <span className="badge badge-indigo">{MOCK_LEADERBOARD.length + 120} Candidates Evaluated</span>
          </div>

          <div className="table-responsive">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Candidate Name</th>
                  <th>Roll No</th>
                  <th>Speed</th>
                  <th>Correct</th>
                  <th>Mistakes</th>
                  <th>Marks (%)</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_LEADERBOARD.map((item) => (
                  <tr key={item.rank} className={item.name.includes('(You)') ? 'highlight-user-row' : ''}>
                    <td>
                      <span className={`rank-badge rank-${item.rank}`}>
                        #{item.rank}
                      </span>
                    </td>
                    <td>
                      <div className="candidate-name-cell">
                        <strong>{item.name}</strong>
                      </div>
                    </td>
                    <td className="font-mono">{item.rollNo}</td>
                    <td className="font-mono text-cyan">{item.speed}</td>
                    <td className="font-mono text-emerald">{item.correct}</td>
                    <td className="font-mono text-rose">{item.errors}</td>
                    <td>
                      <span className="badge badge-emerald font-mono">{item.marks}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="rules-panel glass-panel">
          <h3>Government Exam Evaluation Criteria (SSC & High Courts)</h3>
          <div className="rules-grid mt-3">
            <div className="rule-card">
              <h4>Full Mistakes (1 Mark Deduction)</h4>
              <ul>
                <li>Every omission of a word or figure.</li>
                <li>Every substitution of a wrong word or figure.</li>
                <li>Every addition of a word or figure not found in the passage.</li>
              </ul>
            </div>
            <div className="rule-card">
              <h4>Half Mistakes (0.5 Mark Deduction)</h4>
              <ul>
                <li>Spelling mistakes in English or Matra errors in Hindi.</li>
                <li>Wrong use of capital/small letters at the beginning of a sentence.</li>
                <li>Singular/plural transposition errors.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="eval-footer-nav mt-4">
        <div className="eval-footer-left-group">
          <button 
            className="btn btn-secondary" 
            onClick={onBackToTests || onBackToDashboard}
          >
            <span>← Back to Test Vault</span>
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={onBackToDashboard}
            style={{ marginLeft: '0.65rem' }}
          >
            <span>View Candidate Dashboard</span>
          </button>
        </div>
        <button className="btn btn-primary ml-auto" onClick={onRetake}>
          <RotateCcw size={16} />
          <span>Retake This Dictation</span>
        </button>
      </div>
    </div>
  );
}
