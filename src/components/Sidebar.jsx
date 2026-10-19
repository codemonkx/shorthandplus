import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap,
  Headphones, 
  Keyboard, 
  BarChart3, 
  CreditCard, 
  Crown, 
  Phone,
  Play, 
  X,
  Globe,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  LifeBuoy,
  Video
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  onOpenCheckout, 
  onStartQuickTest,
  isOpen, 
  onClose 
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard & Telemetry', icon: LayoutDashboard },
    { id: 'online-classes', label: 'Online Class', icon: Video, badge: 'LIVE' },
    { id: 'steno-vault', label: 'Steno Dictation Vault', icon: Headphones },
    { id: 'typing-studio', label: 'Typing Speed Studio', icon: Keyboard },
    { id: 'results', label: 'My Scorecards & History', icon: BarChart3 },
    { id: 'pricing', label: 'Subscription & Passes', icon: CreditCard },
  ];

  const handleNav = (tabId) => {
    setCurrentTab(tabId);
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-mobile-backdrop" onClick={onClose} />}

      <aside className={`saas-sidebar ${isOpen ? 'open' : ''}`}>
        
        {/* Brand Header */}
        <div 
          className="sidebar-brand-box" 
          onClick={() => handleNav('landing')}
          style={{ cursor: 'pointer' }}
          title="Return to Public Website"
        >
          <div className="brand-cap-squircle">
            <GraduationCap size={20} color="#ffffff" strokeWidth={2.4} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Shorthand Plus</span>
            <span className="brand-badge-pro">Candidate Portal</span>
          </div>
          {onClose && (
            <button className="sidebar-close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Candidate Profile Widget */}
        {user && (
          <div className="sidebar-user-card">
            <div className="user-card-top">
              <div className="user-avatar-wrap">
                <div className="user-initial-bubble">{user.name.charAt(0)}</div>
                <span className="user-status-online" title="Online & Synced" />
              </div>
              <div className="user-info-text">
                <p className="user-name">{user.name}</p>
                <p className="user-roll font-mono">Roll: {user.rollNo}</p>
              </div>
            </div>
            <div className="user-plan-row">
              <span className="plan-badge">
                <Crown size={12} className="text-amber" />
                <span>12-Month Pro Active</span>
              </span>
              <span className="days-left-badge font-mono">{user.subscription?.daysRemaining || 248}d</span>
            </div>
          </div>
        )}

        {/* Quick Launch CTA Button */}
        <div className="sidebar-quick-cta">
          <button className="quick-test-btn" onClick={onStartQuickTest}>
            <Play size={14} fill="currentColor" />
            <span>Daily 80 WPM Bench</span>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="sidebar-nav-menu">
          <div className="nav-group-title">COMMAND CENTER</div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNav(item.id)}
              >
                <Icon size={17} className="nav-icon" />
                <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                {item.badge && (
                  <span className="sidebar-live-pill">{item.badge}</span>
                )}
                {isActive && <div className="active-indicator-bar" />}
              </button>
            );
          })}

          <button
            className={`sidebar-nav-item ${currentTab === 'admin' ? 'active' : ''}`}
            onClick={() => handleNav('admin')}
            style={{ marginTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}
            title="Director & Faculty Admin Console"
          >
            <ShieldCheck size={17} className="text-royal-blue" />
            <span style={{ flex: 1, textAlign: 'left' }}>Admin Console</span>
            <span className="sidebar-live-pill" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecdd3', fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>Staff</span>
            {currentTab === 'admin' && <div className="active-indicator-bar" />}
          </button>
        </nav>

        {/* Minimalist Institutional Footer Strip */}
        <div className="sidebar-footer-box">
          <button 
            className="sidebar-public-switch-link"
            onClick={() => handleNav('landing')}
            title="Return to Public Website"
          >
            <ArrowLeft size={13} />
            <span>Return to Public Website</span>
          </button>

          <div className="sidebar-institute-stamp">
            <span className="stamp-title">Gaya Shorthand Classes</span>
            <span className="stamp-sub">Official Govt Exam Engine • Est. 2008</span>
          </div>
        </div>

      </aside>
    </>
  );
}
