import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { TRANSITION_EASE } from './MotionPrimitives';

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

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCurrentTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header 
      initial={{ x: '-50%', y: -24, opacity: 0 }}
      animate={{ x: '-50%', y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: TRANSITION_EASE }}
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        width: 'calc(100% - 1.5rem)',
        maxWidth: '1180px',
        height: '64px',
        zIndex: 50,
        background: scrolled ? 'rgba(251, 248, 243, 0.96)' : 'rgba(251, 248, 243, 0.90)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid #E5DBD0',
        borderRadius: '9999px',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: scrolled 
          ? '0 12px 32px rgba(35, 20, 24, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.90)' 
          : '0 8px 24px rgba(35, 20, 24, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.90)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        boxSizing: 'border-box'
      }}
    >
      {/* Zone 1: Brand Lockup (Left) */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
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
            color: '#231418',
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
          <span style={{ width: '1px', height: '14px', background: '#E5DBD0', margin: '0 10px' }} />
          <span style={{ fontSize: '10px', fontWeight: 600, color: '#8A7B7E', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            GAYA &middot; EST. 2012
          </span>
        </div>
      </motion.div>

      {/* Zone 2: Navigation Pill Track (Center) */}
      <nav 
        className="sp-nav-center-links"
        style={{
          background: 'rgba(239, 231, 220, 0.85)',
          border: '1px solid #E5DBD0',
          padding: '4px',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          position: 'relative'
        }}
      >
        {navItems.map((item) => {
          const active = isNavActive(item.id);
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                position: 'relative',
                background: 'transparent',
                color: active ? '#231418' : '#594A4D',
                fontWeight: active ? 600 : 500,
                fontSize: '12px',
                padding: '6px 16px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.15s ease'
              }}
            >
              {active && (
                <motion.div
                  layoutId="nav-active-pill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#FFFFFF',
                    borderRadius: '9999px',
                    boxShadow: '0 1px 4px rgba(35, 20, 24, 0.08)',
                    zIndex: 1
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30
                  }}
                />
              )}
              <span 
                style={{ 
                  position: 'relative', 
                  zIndex: 2, 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px' 
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
              </span>
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
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => onOpenAdmission ? onOpenAdmission() : handleNavClick('courses')}
              title="Book 3 Free Demo Classes"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5DBD0',
                color: '#231418',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(35, 20, 24, 0.04)'
              }}
            >
              <Sparkles size={13} style={{ color: '#991B1B' }} />
              <span>Free Demo</span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => onOpenAuth ? onOpenAuth('student') : handleNavClick('dashboard')}
              title="Student Login Panel"
              style={{
                background: '#231418',
                color: '#FAF6F0',
                border: 'none',
                borderRadius: '9999px',
                padding: '7px 18px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(35, 20, 24, 0.25)',
                cursor: 'pointer'
              }}
            >
              <LogIn size={13} />
              <span>Student Login</span>
            </motion.button>
          </>
        ) : (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }} ref={userMenuRef}>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5DBD0',
                color: '#594A4D',
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
                  <LayoutDashboard size={13} color="#594A4D" />
                  <span>Dashboard</span>
                </>
              )}
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5DBD0',
                color: '#231418',
                borderRadius: '9999px',
                padding: '4px 12px 4px 6px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(35, 20, 24, 0.05)'
              }}
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              title="Account & Subscription Menu"
            >
              <div 
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: '#231418',
                  color: '#FAF6F0',
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
            </motion.button>

            {/* User Dropdown Popover */}
            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: TRANSITION_EASE }}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: '256px',
                    background: '#FFFFFF',
                    color: '#231418',
                    border: '1px solid #E5DBD0',
                    borderRadius: '16px',
                    boxShadow: '0 12px 32px rgba(35, 20, 24, 0.12)',
                    padding: '12px',
                    zIndex: 60,
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #EFE7DC' }}>
                    <strong style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#231418', lineHeight: 1.2 }}>{user.name}</strong>
                    <span style={{ display: 'block', fontSize: '12px', color: '#8A7B7E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px' }}>{user.email}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 600, background: '#EFE7DC', color: '#594A4D', padding: '2px 6px', borderRadius: '4px' }}>
                        {user.role === 'admin' ? 'Faculty Admin' : `Roll: ${user.rollNo}`}
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: 600, background: 'rgba(5, 150, 105, 0.1)', color: '#047857', padding: '2px 6px', borderRadius: '4px' }}>
                        {user.role === 'admin' ? 'Director Console' : (user.subscription?.isMonthlySubscription ? 'Monthly Pro' : 'Pro Active')}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '4px 0' }}>
                    <button 
                      style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#594A4D', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                      onClick={() => handleNavClick('dashboard')}
                    >
                      <LayoutDashboard size={14} color="#8A7B7E" />
                      <span>Candidate Dashboard</span>
                    </button>

                    <button 
                      style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#594A4D', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                      onClick={() => handleNavClick('online-classes')}
                    >
                      <Video size={14} color="#991B1B" />
                      <span>Live Google Meet Class</span>
                    </button>

                    <button 
                      style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#594A4D', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                      onClick={() => handleNavClick('tests')}
                    >
                      <Headphones size={14} color="#8A7B7E" />
                      <span>Audio Dictation Vault</span>
                    </button>

                    <button 
                      style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#594A4D', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
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
                        style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#594A4D', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        onClick={() => handleNavClick('admin')}
                      >
                        <ShieldCheck size={14} color="#D97706" />
                        <span>Director Admin Console</span>
                      </button>
                    )}
                  </div>

                  <div style={{ paddingTop: '4px', borderTop: '1px solid #EFE7DC' }}>
                    <button 
                      style={{ width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, color: '#991B1B', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onLogout) onLogout();
                      }}
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Mobile Menu Hamburger */}
        <button 
          className="sp-nav-mobile-btn"
          style={{
            background: 'none',
            border: 'none',
            color: '#231418',
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: TRANSITION_EASE }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: 'rgba(251, 248, 243, 0.98)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid #E5DBD0',
              borderRadius: '20px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 16px 40px rgba(35, 20, 24, 0.14)',
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
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#FAF6F0',
                  background: '#231418',
                  border: 'none',
                  cursor: 'pointer'
                } : {
                  textAlign: 'left',
                  padding: '10px 16px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#594A4D',
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
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#D97706',
                  background: 'rgba(35, 20, 24, 0.04)',
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
              <div style={{ paddingTop: '12px', marginTop: '4px', borderTop: '1px solid #E5DBD0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAdmission) onOpenAdmission();
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: '#FFFFFF',
                    border: '1px solid #E5DBD0',
                    color: '#231418',
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
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: '#231418',
                    color: '#FAF6F0',
                    border: 'none',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  Student Login
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}