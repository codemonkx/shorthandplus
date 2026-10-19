import React from 'react';
import { 
  Zap, 
  Crown, 
  Flame, 
  TrendingUp, 
  Award, 
  Clock, 
  Headphones, 
  Keyboard, 
  BarChart3, 
  ArrowRight, 
  Play, 
  CheckCircle2
} from 'lucide-react';
import { STENO_TESTS } from '../data/mockData';

export default function Dashboard({ user, onStartTest, onViewResult, setCurrentTab }) {
  const recommendedTest = STENO_TESTS[0];

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-welcome-banner glass-panel-glow">
        <div className="welcome-text-side">
          <div className="welcome-badge-row">
            <span className="badge badge-indigo">Candidate Command Center</span>
            <span className="badge badge-emerald">
              <Crown size={13} />
              <span>{user?.subscription?.plan || 'PRO Active'}</span>
            </span>
          </div>
          <h2>Welcome back, <span className="gradient-text">{user?.name || 'Aspirant'}</span>!</h2>
          <p>
            Your daily target is 2 full dictation transcriptions. Maintain your streak to guarantee selection in the upcoming skill exams.
          </p>
        </div>

        <div className="welcome-stats-badge">
          <div className="streak-circle font-mono">
            <Flame size={24} className="text-amber" />
            <span className="streak-num">{user?.stats?.currentStreak || 14}</span>
            <span className="streak-text">Days Streak</span>
          </div>
        </div>
      </div>

      <div className="kpi-cards-grid">
        <div className="kpi-card glass-panel">
          <div className="kpi-icon-row">
            <span className="kpi-title">Tests Completed</span>
            <div className="kpi-icon-bubble bg-indigo">
              <Headphones size={18} />
            </div>
          </div>
          <div className="kpi-number-row font-mono">
            <span>{user?.stats?.totalTestsTaken || 42}</span>
            <small className="kpi-trend text-emerald">+4 this week</small>
          </div>
          <p className="kpi-footer-note">Steno + Typing skill drills</p>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon-row">
            <span className="kpi-title">Peak Steno Speed</span>
            <div className="kpi-icon-bubble bg-cyan">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="kpi-number-row font-mono">
            <span>{user?.stats?.highestSpeed || 96}</span>
            <small className="kpi-unit">WPM</small>
          </div>
          <p className="kpi-footer-note">Qualified for SSC Grade C</p>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon-row">
            <span className="kpi-title">Average Accuracy</span>
            <div className="kpi-icon-bubble bg-emerald">
              <Award size={18} />
            </div>
          </div>
          <div className="kpi-number-row font-mono">
            <span className="text-emerald">{user?.stats?.avgAccuracy || 92.4}%</span>
            <small className="kpi-trend text-emerald">Above Cutoff</small>
          </div>
          <p className="kpi-footer-note">Error margin below 7% limit</p>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-icon-row">
            <span className="kpi-title">Words Transcribed</span>
            <div className="kpi-icon-bubble bg-purple">
              <Keyboard size={18} />
            </div>
          </div>
          <div className="kpi-number-row font-mono">
            <span>{(user?.stats?.wordsTranscribed || 26850).toLocaleString()}</span>
            <small className="kpi-unit">Words</small>
          </div>
          <p className="kpi-footer-note">Across English & Hindi modules</p>
        </div>
      </div>

      <div className="dashboard-content-split">
        <div className="featured-test-card glass-panel-glow">
          <div className="card-top-tag">
            <span className="badge badge-amber">Recommended Practice Today</span>
            <span className="badge badge-indigo font-mono">80 WPM</span>
          </div>

          <h3>{recommendedTest.title}</h3>
          <p className="test-lead-desc">
            Standard SSC Grade D examination format. 5-minute audio dictation, 5-minute reading period, followed by 10-minute digital transcription under exam constraints.
          </p>

          <div className="test-meta-pill-row">
            <span className="meta-pill"><Clock size={14} /> 10 Mins Exam</span>
            <span className="meta-pill"><Award size={14} /> 437 Words</span>
            <span className="meta-pill"><CheckCircle2 size={14} /> Backspace Lock Active</span>
          </div>

          <div className="card-action-bar">
            <button className="btn btn-primary btn-lg" onClick={() => onStartTest(recommendedTest.id)}>
              <Play size={18} />
              <span>Launch Audio Dictation Room</span>
            </button>
            <button className="btn btn-outline" onClick={() => setCurrentTab('steno-tests')}>
              Browse All Tests
            </button>
          </div>
        </div>

        <div className="speed-drill-shortcuts glass-panel">
          <h4 className="shortcuts-heading">Drill By Speed Category</h4>
          <p className="shortcuts-sub">Select your target exam threshold to start a tailored audio dictation.</p>

          <div className="speed-shortcuts-grid">
            <button className="speed-shortcut-card" onClick={() => setCurrentTab('steno-tests')}>
              <div className="speed-card-val font-mono">60 WPM</div>
              <span className="speed-card-title">Beginner Mastery</span>
              <span className="speed-card-badge">State Secretariat</span>
            </button>

            <button className="speed-shortcut-card active" onClick={() => setCurrentTab('steno-tests')}>
              <div className="speed-card-val font-mono">80 WPM</div>
              <span className="speed-card-title">SSC Grade D</span>
              <span className="speed-card-badge">Most Popular</span>
            </button>

            <button className="speed-shortcut-card" onClick={() => setCurrentTab('steno-tests')}>
              <div className="speed-card-val font-mono">100 WPM</div>
              <span className="speed-card-title">SSC Grade C / Court</span>
              <span className="speed-card-badge">High Court Bench</span>
            </button>

            <button className="speed-shortcut-card" onClick={() => setCurrentTab('steno-tests')}>
              <div className="speed-card-val font-mono">120 WPM</div>
              <span className="speed-card-title">Parliament Reporter</span>
              <span className="speed-card-badge">Rajya / Lok Sabha</span>
            </button>
          </div>
        </div>
      </div>

      <div className="recent-tests-section glass-panel">
        <div className="section-title-row">
          <div>
            <h3>Recent Test Performances</h3>
            <p>Word-by-word diff analysis and scorecards from your previous attempts.</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('results')}>
            <span>View Full Archive</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="table-responsive">
          <table className="recent-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Category</th>
                <th>Speed</th>
                <th>Words Typed</th>
                <th>Accuracy</th>
                <th>Evaluation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>OCT 6 BENCH - Election Reforms</strong>
                  <span className="table-date">Today, 08:30 AM</span>
                </td>
                <td><span className="badge badge-indigo">SSC Steno</span></td>
                <td className="font-mono">80 WPM</td>
                <td className="font-mono">422 / 437</td>
                <td><span className="badge badge-emerald font-mono">92.89%</span></td>
                <td><span className="text-emerald">Qualified (Rank #6)</span></td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => onViewResult(534)}>
                    View Diff
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Patna High Court Criminal Appeal 412</strong>
                  <span className="table-date">Yesterday, 07:15 PM</span>
                </td>
                <td><span className="badge badge-amber">Patna HC</span></td>
                <td className="font-mono">100 WPM</td>
                <td className="font-mono">495 / 520</td>
                <td><span className="badge badge-emerald font-mono">94.15%</span></td>
                <td><span className="text-emerald">Qualified (Rank #4)</span></td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => onViewResult(535)}>
                    View Diff
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Exercise 73 - Banking Regulations</strong>
                  <span className="table-date">08 Oct 2026</span>
                </td>
                <td><span className="badge badge-cyan">Typing Test</span></td>
                <td className="font-mono">75 WPM</td>
                <td className="font-mono">400 / 400</td>
                <td><span className="badge badge-emerald font-mono">97.50%</span></td>
                <td><span className="text-emerald">Rank #2 (Silver)</span></td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => onViewResult(534)}>
                    View Diff
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
