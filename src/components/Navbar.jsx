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
  Headphones
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  onOpenCheckout, 
  onLogout 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);

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

  // Nav Items: Home, Courses, Classes, Tests, About
  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'classes', label: 'Classes' },
    { id: 'tests', label: 'Tests' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCurrentTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isNavActive = (id) => {
    if (id === 'landing') return currentTab === 'landing';
    if (id === 'courses') return currentTab === 'courses' || currentTab === 'pricing';
    if (id === 'classes') return currentTab === 'classes';
    if (id === 'tests') return currentTab === 'tests' || currentTab === 'steno-vault' || currentTab === 'typing-studio';
    if (id === 'about') return currentTab === 'about';
    return currentTab === id;
  };

  return (
    <header className={`shorthand-navbar-root ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="shorthand-nav-container">
        
        {/* Brand: Blue squircle with Graduation Cap icon + 'Shorthand Plus' */}
        <div className="shorthand-brand-group" onClick={() => handleNavClick('landing')}>
          <div className="brand-cap-squircle">
            <GraduationCap size={20} color="#ffffff" strokeWidth={2.4} />
          </div>
          <span className="brand-name-text">Shorthand Plus</span>
        </div>

        {/* Center Navigation Links: Home, Courses, Classes, Tests, About */}
        <nav className="shorthand-nav-links">
          {navItems.map((item) => {
            const active = isNavActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-pill-item ${active ? 'active-pill' : 'inactive-link'}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Admin, Login, Sign Up / User Dropdown */}
        <div className="shorthand-nav-actions">


          {/* User Logged In State with Dropdown Menu */}
          {user ? (
            <div className="logged-user-actions" ref={userMenuRef}>
              <button 
                className="btn-pill-portal"
                onClick={() => handleNavClick('dashboard')}
                title="Go to Candidate Dashboard"
              >
                <LayoutDashboard size={15} />
                <span>Dashboard</span>
              </button>

              <div 
                className="user-pill-tag"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title="Account & Subscription Menu"
              >
                <Crown size={14} className="text-amber" />
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
                      <span className="badge badge-blue">Roll: {user.rollNo}</span>
                      <span className="badge badge-emerald">Pro Active</span>
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
                      <span>Subscription Passes</span>
                    </button>

                    <button 
                      className="nav-dropdown-link-btn"
                      onClick={() => handleNavClick('admin')}
                    >
                      <ShieldCheck size={15} className="text-royal-blue" />
                      <span>Admin Console (Staff)</span>
                    </button>
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
          ) : null}

          {/* Dedicated Full-Right Admin Button */}
          <button 
            type="button"
            className={`btn-navbar-admin-right ${currentTab === 'admin' ? 'active' : ''}`}
            onClick={() => handleNavClick('admin')}
            title="Director & Faculty Admin Console"
          >
            <ShieldCheck size={15} className="admin-icon-shield" />
            <span>Admin</span>
          </button>

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

            <button
              onClick={() => handleNavClick('admin')}
              className={`mobile-nav-link-row ${currentTab === 'admin' ? 'active' : ''}`}
            >
              <ShieldCheck size={16} className="text-royal-blue inline mr-2" />
              <span>Admin Console</span>
            </button>

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
