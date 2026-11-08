import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Award, 
  Medal, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  Users, 
  Zap, 
  Gauge, 
  Calendar, 
  MapPin,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import api from '../services/api';

export default function LeaderboardView({ onStartTest, setCurrentTab, user }) {
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'steno' | 'typing'
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeaderboard = () => {
    setIsLoading(true);
    api.tests.getLeaderboard ? 
      api.tests.getLeaderboard({ type: activeCategory === 'all' ? undefined : activeCategory })
        .then(res => {
          if (res?.leaderboard && Array.isArray(res.leaderboard)) {
            setLeaderboardData(res.leaderboard);
          }
        })
        .catch(() => {})
        .finally(() => setIsLoading(false))
      : setIsLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [activeCategory]);

  const filteredData = leaderboardData.filter(item => {
    const matchCat = activeCategory === 'all' || item.testType === activeCategory;
    const matchQuery = !searchQuery.trim() || 
      item.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.testTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const topThree = filteredData.slice(0, 3);
  const remainingRanks = filteredData.slice(3);

  return (
    <div className="leaderboard-page-wrapper" style={{ minHeight: '100vh', background: '#FAF9F6', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#FEF3C7', border: '1px solid #FDE68A', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, color: '#92400E', marginBottom: '0.75rem' }}>
            <Trophy size={14} className="text-amber-600" />
            <span>ALL-INDIA MERIT RANKINGS • LIVE SPEED COHORT</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1C1917', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
            National Mock Test Leaderboard
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#78716C', maxWidth: '650px', margin: '0 auto', lineHeight: 1.5 }}>
            Real-time rankings of stenography and typing aspirants across Bihar, Jharkhand, UP, and Eastern India preparing for SSC Grade C/D and High Court skill tests.
          </p>
        </div>

        {/* Top 3 Podium (Gold, Silver, Bronze) */}
        {topThree.length >= 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem', alignItems: 'end' }}>
            
            {/* Rank 2 (Silver) */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E7E5E4',
              borderRadius: '14px',
              padding: '1.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#71717A', color: '#FFFFFF', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 800 }}>
                #2 SILVER MEDAL
              </div>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#F4F4F5', border: '2px solid #D4D4D8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem auto 0.75rem auto', fontSize: '1.25rem', fontWeight: 800, color: '#52525B' }}>
                {topThree[1].candidateName.charAt(0)}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1C1917', margin: '0 0 0.2rem 0' }}>{topThree[1].candidateName}</h3>
              <div style={{ fontSize: '0.75rem', color: '#78716C', marginBottom: '0.75rem' }}>{topThree[1].rollNo} • {topThree[1].state}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', background: '#FAF9F6', padding: '0.6rem', borderRadius: '8px', border: '1px solid #E7E5E4' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1C1917', fontFamily: 'monospace' }}>{topThree[1].speedNum}</div>
                  <div style={{ fontSize: '0.65rem', color: '#78716C', textTransform: 'uppercase' }}>Net WPM</div>
                </div>
                <div style={{ width: '1px', background: '#E7E5E4' }} />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857', fontFamily: 'monospace' }}>{topThree[1].accuracyNum}%</div>
                  <div style={{ fontSize: '0.65rem', color: '#78716C', textTransform: 'uppercase' }}>Accuracy</div>
                </div>
              </div>
            </div>

            {/* Rank 1 (Gold - Elevated) */}
            <div style={{
              background: '#FFFFFF',
              border: '2px solid #D97706',
              borderRadius: '16px',
              padding: '1.75rem 1.5rem',
              textAlign: 'center',
              boxShadow: '0 8px 28px rgba(217, 119, 6, 0.12)',
              position: 'relative',
              transform: 'translateY(-8px)'
            }}>
              <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#D97706', color: '#FFFFFF', padding: '0.25rem 0.95rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Crown size={13} />
                <span>#1 ALL-INDIA CHAMPION</span>
              </div>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#FEF3C7', border: '3px solid #D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem auto 0.75rem auto', fontSize: '1.6rem', fontWeight: 800, color: '#B45309' }}>
                {topThree[0].candidateName.charAt(0)}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1C1917', margin: '0 0 0.2rem 0' }}>{topThree[0].candidateName}</h3>
              <div style={{ fontSize: '0.78rem', color: '#78716C', marginBottom: '0.85rem' }}>{topThree[0].rollNo} • {topThree[0].state}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', background: '#FEF3C7', padding: '0.75rem', borderRadius: '10px', border: '1px solid #FDE68A' }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#92400E', fontFamily: 'monospace' }}>{topThree[0].speedNum}</div>
                  <div style={{ fontSize: '0.68rem', color: '#92400E', textTransform: 'uppercase', fontWeight: 700 }}>Net WPM</div>
                </div>
                <div style={{ width: '1px', background: '#FDE68A' }} />
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#047857', fontFamily: 'monospace' }}>{topThree[0].accuracyNum}%</div>
                  <div style={{ fontSize: '0.68rem', color: '#047857', textTransform: 'uppercase', fontWeight: 700 }}>Accuracy</div>
                </div>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E7E5E4',
              borderRadius: '14px',
              padding: '1.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#B45309', color: '#FFFFFF', padding: '0.2rem 0.75rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 800 }}>
                #3 BRONZE MEDAL
              </div>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#FFFBEB', border: '2px solid #FDE68A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.5rem auto 0.75rem auto', fontSize: '1.25rem', fontWeight: 800, color: '#B45309' }}>
                {topThree[2].candidateName.charAt(0)}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1C1917', margin: '0 0 0.2rem 0' }}>{topThree[2].candidateName}</h3>
              <div style={{ fontSize: '0.75rem', color: '#78716C', marginBottom: '0.75rem' }}>{topThree[2].rollNo} • {topThree[2].state}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', background: '#FAF9F6', padding: '0.6rem', borderRadius: '8px', border: '1px solid #E7E5E4' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1C1917', fontFamily: 'monospace' }}>{topThree[2].speedNum}</div>
                  <div style={{ fontSize: '0.65rem', color: '#78716C', textTransform: 'uppercase' }}>Net WPM</div>
                </div>
                <div style={{ width: '1px', background: '#E7E5E4' }} />
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857', fontFamily: 'monospace' }}>{topThree[2].accuracyNum}%</div>
                  <div style={{ fontSize: '0.65rem', color: '#78716C', textTransform: 'uppercase' }}>Accuracy</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Controls Bar: Filters & Search */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E7E5E4', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All India Overall' },
              { id: 'steno', label: '🎙️ Steno Dictations (80/100 WPM)' },
              { id: 'typing', label: '⌨️ Typing Speed Studio' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: activeCategory === tab.id ? '#D97706' : '#E7E5E4',
                  background: activeCategory === tab.id ? '#FEF3C7' : '#FFFFFF',
                  color: activeCategory === tab.id ? '#92400E' : '#57534E',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#78716C' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate, roll no..."
              style={{
                width: '100%',
                padding: '0.45rem 1rem 0.45rem 2.2rem',
                borderRadius: '8px',
                border: '1px solid #E7E5E4',
                background: '#FAF9F6',
                fontSize: '0.8rem',
                color: '#1C1917',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Leaderboard Table Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E7E5E4', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: '#FAF9F6', borderBottom: '1px solid #E7E5E4', color: '#78716C', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Rank</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Candidate</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Examination Mock</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Speed</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Accuracy</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Errors</th>
                  <th style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => {
                  const rankNum = index + 1;
                  const isTopThree = rankNum <= 3;
                  return (
                    <tr 
                      key={row.id}
                      style={{ 
                        borderBottom: '1px solid #F5F5F4',
                        background: isTopThree ? 'rgba(254, 243, 199, 0.15)' : 'transparent',
                        transition: 'background 0.1s ease'
                      }}
                    >
                      <td style={{ padding: '0.9rem 1.25rem', fontWeight: 800, color: rankNum === 1 ? '#D97706' : rankNum === 2 ? '#71717A' : rankNum === 3 ? '#B45309' : '#57534E' }}>
                        {rankNum === 1 ? '🥇 #1' : rankNum === 2 ? '🥈 #2' : rankNum === 3 ? '🥉 #3' : `#${rankNum}`}
                      </td>
                      <td style={{ padding: '0.9rem 1rem' }}>
                        <div style={{ fontWeight: 700, color: '#1C1917' }}>{row.candidateName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#78716C' }}>{row.rollNo} • {row.state}</div>
                      </td>
                      <td style={{ padding: '0.9rem 1rem', color: '#44403C' }}>
                        <div>{row.testTitle}</div>
                        <div style={{ fontSize: '0.7rem', color: '#A8A29E' }}>{row.date || 'Recent Bench'}</div>
                      </td>
                      <td style={{ padding: '0.9rem 1rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: 700, color: '#1C1917', fontSize: '0.92rem' }}>
                        {row.speedNum} <span style={{ fontSize: '0.7rem', color: '#78716C', fontWeight: 500 }}>WPM</span>
                      </td>
                      <td style={{ padding: '0.9rem 1rem', textAlign: 'center', fontFamily: 'monospace', fontWeight: 700, color: '#047857', fontSize: '0.92rem' }}>
                        {row.accuracyNum}%
                      </td>
                      <td style={{ padding: '0.9rem 1rem', textAlign: 'center', fontSize: '0.75rem', color: '#78716C' }}>
                        {row.fullMistakes} full / {row.halfMistakes} half
                      </td>
                      <td style={{ padding: '0.9rem 1.25rem', textAlign: 'right' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.6rem',
                          borderRadius: '9999px',
                          background: '#ECFDF5',
                          color: '#047857',
                          border: '1px solid #A7F3D0'
                        }}>
                          ✓ Qualified
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Strip */}
        <div style={{ marginTop: '2.5rem', background: '#1C1917', color: '#FAF9F6', borderRadius: '14px', padding: '1.75rem 2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 0.35rem 0' }}>Want to enter the National Merit Leaderboard?</h3>
            <p style={{ fontSize: '0.82rem', color: '#D6D3D1', margin: 0 }}>
              Attempt official 80 WPM / 100 WPM audio dictation tests and see your national rank calculate instantly.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('tests')}
            style={{
              background: '#D97706',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)'
            }}
          >
            <span>Attempt Official Mock Now</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
