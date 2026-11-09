import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Menu, 
  X,
  Crown,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  LogOut,
  CreditCard,
  Headphones,
  LogIn,
  Video,
  Sparkles,
  Keyboard,
  FileText
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  onOpenCheckout, 
  onLogout,
  onOpenAuth,
  onOpenAdmission
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);

  // Sliding Nav Indicator State & Refs
  const navContainerRef = useRef(null);
  const navItemRefs = useRef({});
  const [hasMounted, setHasMounted] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Nav Items: Home, Courses, Classes, About
  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'classes', label: 'Classes' },
    { id: 'about', label: 'About' },
  ];

  const isNavActive = (id) => {
    if (id === 'landing') return currentTab === 'landing';
    if (id === 'courses') return currentTab === 'courses' || currentTab === 'pricing';
    if (id === 'classes') return currentTab === 'classes' || currentTab === 'online-classes';
    if (id === 'about') return currentTab === 'about';
    return currentTab === id;
  };

  const updateIndicator = (overrideId) => {
    const targetId = overrideId || navItems.find((item) => isNavActive(item.id))?.id;
    if (targetId && navItemRefs.current[targetId] && navContainerRef.current) {
      const activeEl = navItemRefs.current[targetId];
      const containerEl = navContainerRef.current;
      
      const activeRect = activeEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();

      setIndicatorStyle({
        left: activeRect.left - containerRect.left,
        top: activeRect.top - containerRect.top,
        width: activeRect.width,
        height: activeRect.height,
        opacity: 1,
      });
    } else if (!targetId) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  useEffect(() => {
    updateIndicator();
    
    // Enable animation after initial positioning so it doesn't fly in on page load
    const timer = setTimeout(() => {
      updateIndicator();
      setHasMounted(true);
    }, 40);

    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => updateIndicator());
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentTab]);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    updateIndicator(id);
    setCurrentTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`shorthand-navbar-root ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="shorthand-nav-container">
        
        {/* Brand: Big S Logo + 'Shorthand Plus' */}
        <div className="shorthand-brand-group" onClick={() => handleNavClick('landing')} title="Shorthand Plus (Gaya Shorthand Classes)">
          <div className="brand-logo-s-wrap">
            <img 
              src="/assets/logo-big-s.png" 
              alt="Steno Plus Big S Logo" 
              className="brand-logo-s-img"
            />
          </div>
          <span className="brand-name-text">Shorthand Plus</span>
        </div>

        {/* Center Navigation Links: Home, Courses, Classes, Tests, About with Animated Sliding Pill */}
        <nav className="shorthand-nav-links" ref={navContainerRef}>
          {/* Animated Moving Pill Indicator */}
          <span 
            className={`nav-sliding-pill ${hasMounted ? 'is-animated' : ''}`}
            style={{
              transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
              width: `${indicatorStyle.width}px`,
              height: `${indicatorStyle.height}px`,
              opacity: indicatorStyle.opacity,
            }}
            aria-hidden="true"
          />

          {navItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <button
                key={item.id}
                ref={(el) => { navItemRefs.current[item.id] = el; }}
                onClick={() => handleNavClick(item.id)}
                className={`nav-pill-item ${active ? 'active-pill' : 'inactive-link'}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Admission, Pay Fee, Student Login / User Dropdown, Admin */}
        <div className="shorthand-nav-actions">
          {/* 1. Admission Button (Emerald Pill) */}
          <button 
            type="button"
            className="btn-pill-admission"
            onClick={() => onOpenAdmission ? onOpenAdmission() : null}
            title="Online Admission Form (Session 2026-27)"
          >
            <GraduationCap size={13} color="#fde68a" />
            <span>Admission</span>
          </button>

          {/* 2. Pay Fee Button (White Pill) */}
          <button 
            type="button"
            className="btn-pill-payfee"
            onClick={() => onOpenCheckout ? onOpenCheckout() : null}
            title="Online Fee Payment & Test Passes"
          >
            <CreditCard size={13} />
            <span>Pay Fee</span>
          </button>

          {/* 3. Student Login Panel or Logged In User State */}
          {!user ? (
            <button 
              type="button"
              className="btn-pill-portal"
              onClick={() => onOpenAuth ? onOpenAuth('student') : handleNavClick('dashboard')}
              title="Student Login Panel"
            >
              <LogIn size={13} />
              <span>Student Login</span>
            </button>
          ) : (
            <div className="logged-user-actions" ref={userMenuRef}>
              <button 
                className="btn-pill-portal"
                onClick={() => handleNavClick(user?.role === 'admin' ? 'admin' : 'dashboard')}
                title={user?.role === 'admin' ? "Go to Director Admin Console" : "Go to Candidate Practice Dashboard"}
              >
                {user?.role === 'admin' ? (
                  <>
                    <ShieldCheck size={14} className="text-amber-400" />
                    <span>Admin</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard size={14} />
                    <span>Dashboard</span>
                  </>
                )}
              </button>

              <div 
                className="user-pill-tag"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title="Account & Subscription Menu"
              >
                {user?.role === 'admin' ? (
                  <ShieldCheck size={14} className="text-amber-500" />
                ) : (
                  <Crown size={14} className="text-amber" />
                )}
                <span>{user.name.split(' ')[0]}</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* User Dropdown Popover */}
              {userDropdownOpen && (
                <div className="navbar-user-dropdown-card">
                  <div className="nav-dropdown-header">
                    <strong className="user-dropdown-name">{user.name}</strong>
                    <span className="user-dropdown-email">{user.email}</span>
                    <div className="user-dropdown-badge-row">
                      <span className="badge badge-blue">
                        {user.role === 'admin' ? 'Faculty Admin' : `Roll: ${user.rollNo}`}
                      </span>
                      <span className="badge badge-emerald">
                        {user.role === 'admin' ? 'Director Console' : (user.subscription?.isMonthlySubscription ? 'Monthly Pro' : 'Pro Active')}
                      </span>
                    </div>
                  </div>

                  <div className="nav-dropdown-divider" />

                  <div className="nav-dropdown-links-list">
                    <button 
                      className="nav-dropdown-link-btn"
                      onClick={() => handleNavClick('dashboard')}
                    >
                      <LayoutDashboard size={15} className="text-royal-blue" />
                      <span>Candidate Dashboard</span>
                    </button>

                    <button 
                      className="nav-dropdown-link-btn"
                      onClick={() => handleNavClick('online-classes')}
                    >
                      <Video size={15} className="text-rose-600" />
                      <span>Live Zoom Online Class</span>
                    </button>

                    <button 
                      className="nav-dropdown-link-btn"
                      onClick={() => handleNavClick('tests')}
                    >
                      <Headphones size={15} className="text-royal-blue" />
                      <span>Audio Dictation Vault</span>
                    </button>

                    <button 
                      className="nav-dropdown-link-btn"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onOpenCheckout) onOpenCheckout();
                      }}
                    >
                      <CreditCard size={15} className="text-emerald" />
                      <span>Monthly Subscription Passes</span>
                    </button>

                    {user?.role === 'admin' && (
                      <button 
                        className="nav-dropdown-link-btn"
                        onClick={() => handleNavClick('admin')}
                      >
                        <ShieldCheck size={15} className="text-royal-blue" />
                        <span>Director Admin Console</span>
                      </button>
                    )}
                  </div>

                  <div className="nav-dropdown-divider" />

                  <button 
                    className="nav-dropdown-signout-btn"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 4. Admin Button (Golden Pill from Reference) */}
          {(!user || user?.role !== 'admin') && (
            <button 
              type="button"
              className="btn-pill-admin"
              onClick={() => onOpenAuth ? onOpenAuth('admin') : handleNavClick('admin')}
              title="Director & Faculty Admin Console"
            >
              <ShieldCheck size={13} color="#d97706" />
              <span>Admin</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button 
            className="mobile-menu-burger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="shorthand-mobile-drawer">
          <div className="mobile-drawer-inner">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-link-row ${isNavActive(item.id) ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}

            {(!user || user?.role === 'admin') && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`mobile-nav-link-row ${currentTab === 'admin' ? 'active' : ''}`}
              >
                <ShieldCheck size={16} className="text-royal-blue inline mr-2" />
                <span>Admin Console</span>
              </button>
            )}

            {!user && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e7e5e4' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAdmission) onOpenAdmission();
                  }}
                  className="btn-pill-admission w-full"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px',
                    background: '#047857',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700
                  }}
                >
                  <FileText size={15} color="#fde68a" />
                  <span>Online Admission Form</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenCheckout) onOpenCheckout();
                  }}
                  className="btn-pill-fee w-full"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px',
                    background: '#ffffff',
                    color: '#1c1917',
                    border: '1px solid #e7e5e4',
                    borderRadius: '8px',
                    fontWeight: 600
                  }}
                >
                  <CreditCard size={15} className="text-emerald-600" />
                  <span>Pay Fees Online</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth('student');
                  }}
                  className="btn-pill-portal w-full"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px'
                  }}
                >
                  <LogIn size={15} />
                  <span>Student Login</span>
                </button>
              </div>
            )}

            {user ? (
              <div className="mobile-drawer-user-section">
                <div className="mobile-user-info-box">
                  <strong>{user.name}</strong>
                  <span className="text-xs text-muted block">Roll: {user.rollNo}</span>
                </div>
                <button 
                  className="btn-pill-portal w-full"
                  onClick={() => handleNavClick('dashboard')}
                >
                  <LayoutDashboard size={15} />
                  <span>Open Dashboard</span>
                </button>
                <button 
                  className="btn-pill-login w-full mt-2 text-rose"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                >
                  <LogOut size={14} className="inline mr-1" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  );
}
