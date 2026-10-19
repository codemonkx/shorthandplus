import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Target, 
  Crown, 
  ChevronDown, 
  CreditCard, 
  LogOut, 
  ShieldCheck,
  Globe,
  Bell,
  LayoutDashboard,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function TopBar({ 
  currentTab, 
  setCurrentTab,
  user, 
  onToggleSidebar, 
  onOpenCheckout, 
  onOpenAuth, 
  onLogout 
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const getPageTitle = (tab) => {
    switch(tab) {
      case 'dashboard': return 'Candidate Dashboard & Telemetry';
      case 'online-classes': return 'Live Online Classroom & Daily Broadcasts';
      case 'steno-vault': return 'Stenography Dictation Vault';
      case 'typing-studio': return 'Typing Speed Studio';
      case 'results': return 'Examination Scorecards & Diff History';
      case 'pricing': return 'Subscription Passes & Pricing';
      default: return 'Candidate Command Center';
    }
  };

  return (
    <header className="saas-topbar">
      <div className="topbar-left">
        <button className="topbar-mobile-menu" onClick={onToggleSidebar} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <div className="topbar-title-block">
          <div className="topbar-breadcrumb-row">
            <span className="topbar-breadcrumb">Shorthand Plus</span>
            <span className="breadcrumb-slash">/</span>
            <span className="breadcrumb-active-section">Candidate Portal</span>
          </div>
          <h2 className="topbar-page-heading">{getPageTitle(currentTab)}</h2>
        </div>
      </div>

      <div className="topbar-right">
        {/* Telemetry Group */}
        <div className="topbar-telemetry-cluster">
          {/* Speed Target */}
          <div className="telemetry-pill target-pill" title="Current Examination Target Speed">
            <Target size={15} className="text-blue" />
            <span className="pill-bold font-mono">80 WPM</span>
            <span className="pill-sub">Target Goal</span>
          </div>

          {/* Subscription Status Chip */}
          {user ? (
            <div className="sub-status-chip" onClick={onOpenCheckout} title="Click to view subscription passes">
              <Crown size={13} className="text-amber" />
              <span className="chip-text">12-Mo Pro Active</span>
            </div>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={onOpenAuth}>
              Sign In
            </button>
          )}

          {/* Admin Quick Switcher */}
          <button 
            className="topbar-admin-btn"
            onClick={() => setCurrentTab('admin')}
            title="Director & Faculty Admin Console"
          >
            <ShieldCheck size={14} className="text-royal-blue" />
            <span>Admin</span>
          </button>
        </div>

        {/* User Profile Menu */}
        {user && (
          <div className="topbar-user-menu" ref={dropdownRef}>
            <button 
              className={`topbar-avatar-btn ${dropdownOpen ? 'active' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="Candidate Menu"
              aria-expanded={dropdownOpen}
            >
              <div className="avatar-circle">
                <span>{user.name.charAt(0)}</span>
                <span className="avatar-online-dot" />
              </div>
              <span className="avatar-name">{user.name.split(' ')[0]}</span>
              <ChevronDown size={14} className={`avatar-chevron ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="topbar-dropdown-menu luxury-user-popover">
                {/* Header User Card */}
                <div className="popover-user-card-header">
                  <div className="popover-avatar-row">
                    <div className="popover-avatar-lg">
                      <span>{user.name.charAt(0)}</span>
                      <span className="popover-online-badge" />
                    </div>
                    <div className="popover-user-identity">
                      <strong className="popover-display-name">{user.name}</strong>
                      <span className="popover-display-email">{user.email}</span>
                    </div>
                  </div>

                  <div className="popover-tags-row">
                    <span className="popover-roll-pill font-mono">
                      Roll: {user.rollNo || 'SP-2026-084'}
                    </span>
                    <span className="popover-tier-pill">
                      <Crown size={11} className="text-amber-500 mr-1" />
                      Pro Active
                    </span>
                  </div>

                  {/* Micro Telemetry Bar */}
                  <div className="popover-quick-stats-strip">
                    <div className="popover-stat-item">
                      <span className="popover-stat-num font-mono">{user?.stats?.currentStreak || 14}d</span>
                      <span className="popover-stat-label">Streak</span>
                    </div>
                    <div className="popover-stat-divider" />
                    <div className="popover-stat-item">
                      <span className="popover-stat-num font-mono">80 WPM</span>
                      <span className="popover-stat-label">Target</span>
                    </div>
                    <div className="popover-stat-divider" />
                    <div className="popover-stat-item">
                      <span className="popover-stat-num font-mono">Tier-II</span>
                      <span className="popover-stat-label">Ready</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Sections */}
                <div className="popover-links-container">
                  <div className="popover-menu-section-label">COMMAND CENTER</div>

                  <button 
                    className="popover-menu-link" 
                    onClick={() => { setDropdownOpen(false); setCurrentTab('dashboard'); }}
                  >
                    <div className="popover-icon-box bg-blue-soft">
                      <LayoutDashboard size={14} className="text-blue-600" />
                    </div>
                    <div className="popover-link-text">
                      <span className="popover-link-title">Candidate Dashboard</span>
                      <span className="popover-link-desc">Speed radar & practice stats</span>
                    </div>
                  </button>

                  <button 
                    className="popover-menu-link" 
                    onClick={() => { setDropdownOpen(false); setCurrentTab('results'); }}
                  >
                    <div className="popover-icon-box bg-purple-soft">
                      <Award size={14} className="text-purple-600" />
                    </div>
                    <div className="popover-link-text">
                      <span className="popover-link-title">My Scorecards & History</span>
                      <span className="popover-link-desc">Detailed error evaluations</span>
                    </div>
                  </button>

                  <button 
                    className="popover-menu-link" 
                    onClick={() => { setDropdownOpen(false); onOpenCheckout(); }}
                  >
                    <div className="popover-icon-box bg-amber-soft">
                      <CreditCard size={14} className="text-amber-600" />
                    </div>
                    <div className="popover-link-text">
                      <span className="popover-link-title">Subscription Passes</span>
                      <span className="popover-link-desc">Manage Pro access</span>
                    </div>
                    <span className="popover-active-badge">Active</span>
                  </button>

                  <div className="popover-menu-divider" />

                  <div className="popover-menu-section-label">PORTAL</div>

                  <button 
                    className="popover-menu-link" 
                    onClick={() => { setDropdownOpen(false); setCurrentTab('landing'); }}
                  >
                    <div className="popover-icon-box bg-slate-soft">
                      <Globe size={14} className="text-slate-600" />
                    </div>
                    <div className="popover-link-text">
                      <span className="popover-link-title">Public Website</span>
                      <span className="popover-link-desc">Return to home overview</span>
                    </div>
                    <ExternalLink size={12} className="text-slate-400" />
                  </button>

                  <button 
                    className="popover-menu-link" 
                    onClick={() => { setDropdownOpen(false); setCurrentTab('admin'); }}
                  >
                    <div className="popover-icon-box bg-indigo-soft">
                      <ShieldCheck size={14} className="text-indigo-600" />
                    </div>
                    <div className="popover-link-text">
                      <span className="popover-link-title">Admin Management</span>
                      <span className="popover-link-desc">Batch & audio moderation</span>
                    </div>
                    <span className="popover-admin-badge">Staff</span>
                  </button>

                  <div className="popover-menu-divider" />

                  <button 
                    className="popover-menu-link popover-signout-btn" 
                    onClick={() => { setDropdownOpen(false); onLogout(); }}
                  >
                    <div className="popover-icon-box bg-rose-soft">
                      <LogOut size={14} className="text-rose-600" />
                    </div>
                    <div className="popover-link-text">
                      <span className="popover-link-title text-rose-600">Sign Out</span>
                      <span className="popover-link-desc">End candidate session</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
