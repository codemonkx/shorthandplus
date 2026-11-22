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
      setScrolled(window.scrollY > 24);
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

  // Nav Items: Home, Courses, Batches & Live, About
  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'classes', label: 'Batches & Live' },
    { id: 'about', label: 'About' },
  ];

  const isNavActive = (id) => {
    if (id === 'landing') return currentTab === 'landing';
    if (id === 'courses') return currentTab === 'courses' || currentTab === 'pricing';
    if (id === 'classes') return currentTab === 'classes';
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
    <header 
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 1.5rem)',
        maxWidth: '1180px',
        height: '64px',
        zIndex: 50,
        background: scrolled ? 'rgba(247, 245, 240, 0.96)' : 'rgba(247, 245, 240, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid #D1CBBF',
        borderRadius: '9999px',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: scrolled 
          ? '0 14px 38px rgba(22, 22, 26, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85)' 
          : '0 10px 32px rgba(22, 22, 26, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box'
      }}
    >
      {/* Zone 1: Brand Lockup (Left) */}
      <div 
        onClick={() => handleNavClick('landing')} 
        title="Shorthand Plus (Gaya Shorthand Classes)"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        <img 
          src="/assets/logo-big-s.png" 
          alt="Shorthand Plus" 
          style={{
            width: '32px',
            height: '32px',
            objectFit: 'contain',
            flexShrink: 0,
            display: 'block'
          }}
        />
        <span 
          style={{
            color: '#16161A',
            fontWeight: 800,
            fontSize: '14px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}
        >
          SHORTHAND PLUS
        </span>
        <div className="sp-nav-brand-meta">
          <span style={{ width: '1px', height: '14px', background: '#D1CBBF', margin: '0 10px' }} />
          <span style={{ fontSize: '10px', fontWeight: 600, color: '#6B665C', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            GAYA &middot; EST. 2012
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Pill Track (Center) */}
      <nav 
        className="sp-nav-center-links"
        style={{
          background: 'rgba(231, 226, 216, 0.85)',
          border: '1px solid #D6D0C4',
          padding: '4px',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '2px'
        }}
      >
        {navItems.map((item) => {
          const active = isNavActive(item.id);
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={active ? {
                background: '#FAF8F5',
                color: '#16161A',
                fontWeight: 600,
                fontSize: '12px',
                padding: '6px 16px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(22, 22, 26, 0.08)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              } : {
                background: 'transparent',
                color: '#57534E',
                fontWeight: 500,
                fontSize: '12px',
                padding: '6px 16px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {active && (
                <span 
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#991B1B',
                    display: 'inline-block',
                    flexShrink: 0
                  }}
                />
              )}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Zone 3: User Controls & CTAs (Right) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0
        }}
      >
        {!user ? (
          <>
            <button 
              type="button"
              onClick={() => onOpenAdmission ? onOpenAdmission() : handleNavClick('courses')}
              title="Book 3 Free Demo Classes"
              style={{
                background: '#EFECE5',
                border: '1px solid #D6D0C4',
                color: '#16161A',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Sparkles size={13} style={{ color: '#991B1B' }} />
              <span>Free Demo</span>
            </button>

            <button 
              type="button"
              onClick={() => onOpenAuth ? onOpenAuth('student') : handleNavClick('dashboard')}
              title="Student Login Panel"
              style={{
                background: '#B91C1C',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '7px 18px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 1px 3px rgba(185, 28, 28, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <LogIn size={13} />
              <span>Student Login</span>
            </button>
          </>
        ) : (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }} ref={userMenuRef}>
            <button 
              style={{
                background: '#EFECE5',
                border: '1px solid #D6D0C4',
                color: '#44403C',
                borderRadius: '9999px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
              onClick={() => handleNavClick(user?.role === 'admin' ? 'admin' : 'dashboard')}
              title={user?.role === 'admin' ? "Go to Director Admin Console" : "Go to Candidate Practice Dashboard"}
            >
              {user?.role === 'admin' ? (
                <>
                  <ShieldCheck size={13} color="#D97706" />
                  <span>Admin</span>
                </>
              ) : (
                <>
                  <LayoutDashboard size={13} color="#57534E" />
                  <span>Dashboard</span>
                </>
              )}
            </button>

            <button 
              style={{
                background: '#FAF8F5',
                border: '1px solid #D1CBBF',
                color: '#16161A',
                borderRadius: '9999px',
                padding: '4px 12px 4px 6px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(22, 22, 26, 0.05)'
              }}
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              title="Account & Subscription Menu"
            >
              <div 
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#991B1B',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span>{user.name ? user.name.split(' ')[0] : 'Account'}</span>
              <ChevronDown size={12} style={{ transition: 'transform 0.2s', transform: userDropdownOpen ? 'rotate(180deg)' : 'none' }} />
            </button>

            {/* User Dropdown Popover (Soft Ivory #F7F5F0) */}
            {userDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  width: '256px',
                  background: '#F7F5F0',
                  color: '#16161A',
                  border: '1px solid #D6D0C4',
                  borderRadius: '14px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
                  padding: '12px',
                  zIndex: 60,
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(214, 208, 196, 0.6)' }}>
                  <strong style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#16161A', lineHeight: 1.2 }}>{user.name}</strong>
                  <span style={{ display: 'block', fontSize: '12px', color: '#78716C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px' }}>{user.email}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, background: '#EAE5DC', color: '#57534E', padding: '2px 6px', borderRadius: '4px' }}>
                      {user.role === 'admin' ? 'Faculty Admin' : `Roll: ${user.rollNo}`}
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 600, background: 'rgba(5, 150, 105, 0.1)', color: '#047857', padding: '2px 6px', borderRadius: '4px' }}>
                      {user.role === 'admin' ? 'Director Console' : (user.subscription?.isMonthlySubscription ? 'Monthly Pro' : 'Pro Active')}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '4px 0' }}>
                  <button 
                    style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#44403C', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    onClick={() => handleNavClick('dashboard')}
                  >
                    <LayoutDashboard size={14} color="#78716C" />
                    <span>Candidate Dashboard</span>
                  </button>

                  <button 
                    style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#44403C', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    onClick={() => handleNavClick('online-classes')}
                  >
                    <Video size={14} color="#E11D48" />
                    <span>Live Google Meet Class</span>
                  </button>

                  <button 
                    style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#44403C', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    onClick={() => handleNavClick('tests')}
                  >
                    <Headphones size={14} color="#78716C" />
                    <span>Audio Dictation Vault</span>
                  </button>

                  <button 
                    style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#44403C', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    onClick={() => {
                      setUserDropdownOpen(false);
                      if (onOpenCheckout) onOpenCheckout();
                    }}
                  >
                    <CreditCard size={14} color="#047857" />
                    <span>Monthly Subscription Passes</span>
                  </button>

                  {user?.role === 'admin' && (
                    <button 
                      style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#44403C', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                      onClick={() => handleNavClick('admin')}
                    >
                      <ShieldCheck size={14} color="#D97706" />
                      <span>Director Admin Console</span>
                    </button>
                  )}
                </div>

                <div style={{ paddingTop: '4px', borderTop: '1px solid rgba(214, 208, 196, 0.6)' }}>
                  <button 
                    style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#BE123C', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    onClick={() => {
                      setUserDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Hamburger */}
        <button 
          className="sp-nav-mobile-btn"
          style={{
            background: 'none',
            border: 'none',
            color: '#16161A',
            padding: '6px',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: 'rgba(247, 245, 240, 0.98)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid #D6D0C4',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
            boxSizing: 'border-box'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={isNavActive(item.id) ? {
                textAlign: 'left',
                padding: '10px 16px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#FFFFFF',
                background: '#16161A',
                border: 'none',
                cursor: 'pointer'
              } : {
                textAlign: 'left',
                padding: '10px 16px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#57534E',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}

          {user?.role === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              style={{
                textAlign: 'left',
                padding: '10px 16px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#D97706',
                background: 'rgba(22, 22, 26, 0.06)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ShieldCheck size={14} color="#D97706" />
              <span>Admin Console</span>
            </button>
          )}

          {!user && (
            <div style={{ paddingTop: '12px', marginTop: '4px', borderTop: '1px solid rgba(214, 208, 196, 0.6)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdmission) onOpenAdmission();
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'rgba(22, 22, 26, 0.06)',
                  border: '1px solid rgba(22, 22, 26, 0.12)',
                  color: '#16161A',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                Free Demo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuth) onOpenAuth('student');
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: '#B91C1C',
                  color: '#FFFFFF',
                  border: 'none',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                Student Login
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
