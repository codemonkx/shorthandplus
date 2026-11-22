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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-6xl bg-[#16161A]/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 sm:px-5 h-16 flex items-center justify-between shadow-[0_12px_36px_rgba(0,0,0,0.28)] transition-all">
      {/* Brand: Big S Logo + 'SHORTHAND PLUS' */}
      <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => handleNavClick('landing')} title="Shorthand Plus (Gaya Shorthand Classes)">
        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
          <img 
            src="/assets/logo-big-s.png" 
            alt="Shorthand Plus" 
            className="w-8 h-8 object-contain block"
          />
        </div>
        <span className="text-[#F5F3EE] font-bold tracking-tight text-sm uppercase">SHORTHAND PLUS</span>
      </div>

      {/* Center Navigation Links: Home, Courses, Classes, About */}
      <nav className="hidden md:flex items-center gap-1.5">
        {navItems.map((item) => {
          const active = isNavActive(item.id);
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={active 
                ? "bg-white/10 text-white font-semibold px-3.5 py-1.5 rounded-lg text-sm transition-colors cursor-pointer" 
                : "text-zinc-400 hover:text-white text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              }
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Section: Student Login / User Controls */}
      <div className="flex items-center gap-2">
        {!user ? (
          <>
            <button 
              type="button"
              onClick={() => onOpenAdmission ? onOpenAdmission() : handleNavClick('courses')}
              title="Book 3 Free Demo Classes"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 rounded-xl px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles size={13} className="text-[#F87171]" />
              <span>Free Demo</span>
            </button>

            <button 
              type="button"
              onClick={() => onOpenAuth ? onOpenAuth('student') : handleNavClick('dashboard')}
              title="Student Login Panel"
              className="bg-[#B91C1C] hover:bg-[#991B1B] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <LogIn size={13} />
              <span>Student Login</span>
            </button>
          </>
        ) : (
          <div className="relative flex items-center gap-2" ref={userMenuRef}>
            <button 
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 rounded-xl px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              onClick={() => handleNavClick(user?.role === 'admin' ? 'admin' : 'dashboard')}
              title={user?.role === 'admin' ? "Go to Director Admin Console" : "Go to Candidate Practice Dashboard"}
            >
              {user?.role === 'admin' ? (
                <>
                  <ShieldCheck size={13} className="text-amber-400" />
                  <span>Admin</span>
                </>
              ) : (
                <>
                  <LayoutDashboard size={13} className="text-zinc-300" />
                  <span>Dashboard</span>
                </>
              )}
            </button>

            <button 
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 rounded-xl px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              title="Account & Subscription Menu"
            >
              {user?.role === 'admin' ? (
                <ShieldCheck size={13} className="text-amber-400" />
              ) : (
                <Crown size={13} className="text-amber-400" />
              )}
              <span>{user.name.split(' ')[0]}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown Popover (Soft Ivory #F7F5F0) */}
            {userDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-[#F7F5F0] text-[#16161A] border border-[#D6D0C4] rounded-2xl shadow-xl p-3 z-50">
                <div className="px-3 py-2 border-b border-[#D6D0C4]/60">
                  <strong className="block text-sm font-bold text-[#16161A] leading-tight">{user.name}</strong>
                  <span className="block text-xs text-zinc-500 truncate mt-0.5">{user.email}</span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-semibold bg-[#EAE5DC] text-zinc-700 px-2 py-0.5 rounded">
                      {user.role === 'admin' ? 'Faculty Admin' : `Roll: ${user.rollNo}`}
                    </span>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      {user.role === 'admin' ? 'Director Console' : (user.subscription?.isMonthlySubscription ? 'Monthly Pro' : 'Pro Active')}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <button 
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-700 hover:bg-[#EAE5DC] flex items-center gap-2 transition-colors cursor-pointer"
                    onClick={() => handleNavClick('dashboard')}
                  >
                    <LayoutDashboard size={14} className="text-zinc-600" />
                    <span>Candidate Dashboard</span>
                  </button>

                  <button 
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-700 hover:bg-[#EAE5DC] flex items-center gap-2 transition-colors cursor-pointer"
                    onClick={() => handleNavClick('online-classes')}
                  >
                    <Video size={14} className="text-rose-600" />
                    <span>Live Google Meet Class</span>
                  </button>

                  <button 
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-700 hover:bg-[#EAE5DC] flex items-center gap-2 transition-colors cursor-pointer"
                    onClick={() => handleNavClick('tests')}
                  >
                    <Headphones size={14} className="text-zinc-600" />
                    <span>Audio Dictation Vault</span>
                  </button>

                  <button 
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-700 hover:bg-[#EAE5DC] flex items-center gap-2 transition-colors cursor-pointer"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      if (onOpenCheckout) onOpenCheckout();
                    }}
                  >
                    <CreditCard size={14} className="text-emerald-700" />
                    <span>Monthly Subscription Passes</span>
                  </button>

                  {user?.role === 'admin' && (
                    <button 
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-zinc-700 hover:bg-[#EAE5DC] flex items-center gap-2 transition-colors cursor-pointer"
                      onClick={() => handleNavClick('admin')}
                    >
                      <ShieldCheck size={14} className="text-amber-600" />
                      <span>Director Admin Console</span>
                    </button>
                  )}
                </div>

                <div className="pt-1 border-t border-[#D6D0C4]/60">
                  <button 
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-rose-700 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
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
          className="md:hidden text-zinc-300 hover:text-white p-1.5 transition-colors cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#16161A]/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${isNavActive(item.id) ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-white'}`}
            >
              {item.label}
            </button>
          ))}

          {user?.role === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${currentTab === 'admin' ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-white'}`}
            >
              <ShieldCheck size={14} className="text-amber-400 inline mr-2" />
              <span>Admin Console</span>
            </button>
          )}

          {!user && (
            <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdmission) onOpenAdmission();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-zinc-200 text-center cursor-pointer"
              >
                Free Demo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuth) onOpenAuth('student');
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#B91C1C] text-white text-center cursor-pointer"
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
