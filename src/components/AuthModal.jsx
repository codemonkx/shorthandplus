import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Mail, User, MapPin, Globe, CheckCircle2, 
  ArrowRight, ShieldCheck, GraduationCap, Key, Eye, EyeOff, 
  AlertCircle, Info, Loader2, Sparkles, UserPlus 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import CustomSelect from './CustomSelect';
import { api, setToken } from '../services/api';

export const ADMISSION_COURSES = [
  { value: 'English Shorthand', label: '1. English Shorthand' },
  { value: 'Hindi Shorthand', label: '2. Hindi Shorthand' },
  { value: 'English Typing', label: '3. English Typing' },
  { value: 'Hindi Typing', label: '4. Hindi Typing' },
  { value: 'English & Hindi Typing', label: '5. English & Hindi Typing' }
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialTab = 'student' }) {
  // authMode: 'student' | 'admin' | 'register' | 'forgot'
  const [authMode, setAuthMode] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('Bihar');
  const [language, setLanguage] = useState('English Shorthand');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Sign-In state
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);
  const [googleCustomEmail, setGoogleCustomEmail] = useState('');
  const [googleCustomName, setGoogleCustomName] = useState('');

  const handleGoogleSignIn = async (selectedEmail = null, selectedName = null) => {
    setIsSubmitting(true);
    setStatusMsg(null);

    // If real GIS client is loaded and VITE_GOOGLE_CLIENT_ID is configured
    if (!selectedEmail && window.google?.accounts?.id && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            const res = await api.auth.googleLogin({
              credential: response.credential,
              mode: authMode === 'admin' ? 'admin' : 'student'
            });
            if (res.token) setToken(res.token);
            if (res.user?.role === 'admin') {
              try { sessionStorage.setItem('shorthand_admin_authenticated', 'true'); } catch {}
            }
            confetti({ particleCount: 75, spread: 65, origin: { y: 0.55 }, colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'] });
            setStatusMsg({ type: 'success', text: `Welcome ${res.user?.name || 'User'}! Signed in with Google.` });
            setTimeout(() => {
              onLoginSuccess(res.user);
              onClose();
            }, 500);
          } catch (err) {
            setStatusMsg({ type: 'error', text: err.message || 'Google authentication failed.' });
          } finally {
            setIsSubmitting(false);
          }
        }
      });
      window.google.accounts.id.prompt();
      return;
    }

    const emailToUse = selectedEmail || (authMode === 'admin' ? 'stenoplus.in@gmail.com' : 'shadabca@gmail.com');
    const nameToUse = selectedName || (authMode === 'admin' ? 'Shadab Sir (Director)' : 'Shadab Khan');

    try {
      const res = await api.auth.googleLogin({
        email: emailToUse,
        name: nameToUse,
        mode: authMode === 'admin' ? 'admin' : 'student'
      });
      if (res.token) setToken(res.token);
      if (res.user?.role === 'admin') {
        try { sessionStorage.setItem('shorthand_admin_authenticated', 'true'); } catch {}
      }
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.55 }, colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'] });
      setStatusMsg({ type: 'success', text: `Welcome ${res.user?.name}! Signed in via Google.` });
      setShowGoogleChooser(false);
      setTimeout(() => {
        onLoginSuccess(res.user);
        onClose();
      }, 500);
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Google sign-in failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Forgot password specific state (Email Recovery)
  const [forgotStep, setForgotStep] = useState(1); // 1 = enter email, 2 = enter otp & new pwd
  const [recoveryCode, setRecoveryCode] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [smtpConfigured, setSmtpConfigured] = useState(true);

  useEffect(() => {
    if (initialTab) {
      setAuthMode(initialTab);
      setStatusMsg(null);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleFillStudentDemo = () => {
    setEmail('shadabca@gmail.com');
    setPassword('shadab12345');
    setStatusMsg({ 
      type: 'info', 
      text: 'Student demo credentials pre-filled! Click "Login to Student Portal" below.' 
    });
  };

  const handleFillAdminDemo = () => {
    setEmail('admin@gaya.com');
    setAdminPasscode('8080');
    setStatusMsg({ 
      type: 'info', 
      text: 'Faculty Director credentials pre-filled! Click "Login to Faculty Admin Portal" below.' 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      if (authMode === 'admin') {
        const res = await api.auth.login({ 
          mode: 'admin', 
          email: email || 'admin@gaya.com', 
          adminPasscode: adminPasscode || '8080' 
        });

        if (res.token) setToken(res.token);
        try {
          sessionStorage.setItem('shorthand_admin_authenticated', 'true');
          confetti({ particleCount: 75, spread: 65, origin: { y: 0.55 }, colors: ['#0F172A', '#d97706', '#f59e0b'] });
        } catch {}

        setStatusMsg({ type: 'success', text: 'Faculty Director verified! Opening Admin Portal...' });
        setTimeout(() => {
          onLoginSuccess(res.user);
          onClose();
        }, 500);
      } else if (authMode === 'student') {
        const res = await api.auth.login({ email, password });
        if (res.token) setToken(res.token);

        try {
          confetti({ particleCount: 75, spread: 65, origin: { y: 0.55 } });
        } catch {}

        setStatusMsg({ type: 'success', text: 'Welcome back! Logging into your candidate dashboard...' });
        setTimeout(() => {
          onLoginSuccess(res.user);
          onClose();
        }, 500);
      } else if (authMode === 'register') {
        // Register Mode
        const res = await api.auth.register({ name, email, password, state, language });
        if (res.token) setToken(res.token);

        try {
          confetti({ particleCount: 85, spread: 70, origin: { y: 0.55 } });
        } catch {}

        setStatusMsg({ type: 'success', text: `Welcome ${name}! Your student roll number has been generated.` });
        setTimeout(() => {
          onLoginSuccess(res.user);
          onClose();
        }, 500);
      } else if (authMode === 'forgot') {
        // Self-Service Email Forgot Password
        if (forgotStep === 1) {
          if (!email || !email.includes('@')) {
            setStatusMsg({ type: 'error', text: 'Please enter your registered student email address.' });
            setIsSubmitting(false);
            return;
          }
          const res = await api.auth.forgotPassword(email);
          setRecoveryCode(''); // Keep blank so candidate types in the code from their email
          setForgotStep(2);
          if (res.smtpConfigured === false) {
            setSmtpConfigured(false);
            setStatusMsg({ 
              type: 'error', 
              text: res.message || 'Outbound SMTP is not configured in .env. Real email could not be delivered.' 
            });
          } else {
            setSmtpConfigured(true);
            setStatusMsg({ type: 'info', text: res.message || `Verification code sent to ${email}! Check your email inbox.` });
          }
        } else {
          if (!recoveryCode || recoveryCode.trim().length < 6) {
            setStatusMsg({ type: 'error', text: 'Please enter the 6-digit verification code sent to your email.' });
            setIsSubmitting(false);
            return;
          }
          if (!resetNewPassword || resetNewPassword.length < 6) {
            setStatusMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
            setIsSubmitting(false);
            return;
          }
          if (resetNewPassword !== resetConfirmPassword) {
            setStatusMsg({ type: 'error', text: 'New passwords do not match. Please re-enter both passwords.' });
            setIsSubmitting(false);
            return;
          }
          const res = await api.auth.resetPassword({
            email,
            code: recoveryCode.trim(),
            newPassword: resetNewPassword
          });
          setStatusMsg({ type: 'success', text: res.message || 'Password successfully updated! Redirecting to login...' });
          setTimeout(() => {
            setAuthMode('student');
            setPassword(resetNewPassword);
            setForgotStep(1);
            setResetNewPassword('');
            setResetConfirmPassword('');
          }, 1500);
        }
      }
    } catch (err) {
      setStatusMsg({ 
        type: 'error', 
        text: err.message || 'Authentication failed. Please verify your credentials and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 490 }}>
        {/* Brand Header */}
        <div className="auth-modal-header">
          <div className="auth-header-brand-row">
            <div className="auth-brand-badge" style={{ background: '#FFFFFF', border: '1.5px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {authMode === 'admin' ? (
                <ShieldCheck size={22} color="#d97706" />
              ) : authMode === 'forgot' ? (
                <Key size={22} color="#d97706" />
              ) : (
                <img src="/assets/logo-big-s.png" alt="Big S Logo" style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />
              )}
            </div>
            <div className="auth-header-texts">
              <h2 className="auth-modal-title">
                {authMode === 'admin' 
                  ? 'Faculty Admin Portal' 
                  : authMode === 'register' 
                    ? 'Candidate Registration' 
                    : authMode === 'forgot'
                      ? 'Reset Password via Email'
                      : 'Student Portal Login'}
              </h2>
              <p className="auth-modal-sub">
                {authMode === 'admin' 
                  ? 'Authorized director & faculty access gate' 
                  : authMode === 'register' 
                    ? 'Create your account to unlock exam dictations' 
                    : authMode === 'forgot'
                      ? (forgotStep === 1 
                          ? 'Enter your registered email address to receive a secure 6-digit recovery code' 
                          : `Enter the 6-digit verification code sent to ${email}`)
                      : 'Access your daily dictations, speed tests & results'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-icon-btn" 
            onClick={onClose} 
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Segmented Tab Switcher or Forgot Back Banner */}
        {authMode === 'forgot' ? (
          <div style={{ margin: '0.5rem 1.25rem 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button 
              type="button"
              className="auth-switch-link"
              onClick={() => { setAuthMode('student'); setStatusMsg(null); setForgotStep(1); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 600, color: '#0F172A', background: '#FFFFFF', padding: '0.35rem 0.75rem', borderRadius: 6, border: '1px solid rgba(0, 0, 0, 0.08)' }}
            >
              ← Back to Student Login
            </button>
            <span style={{ fontSize: '0.75rem', color: '#78716c' }} className="font-mono">
              Step {forgotStep} of 2
            </span>
          </div>
        ) : (
          <div className="auth-tabs-segmented">
            <button 
              type="button"
              className={`auth-segmented-btn ${authMode === 'student' ? 'active' : ''}`}
              onClick={() => { setAuthMode('student'); setStatusMsg(null); }}
            >
              <GraduationCap size={15} />
              <span>Student Login</span>
            </button>
            <button 
              type="button"
              className={`auth-segmented-btn ${authMode === 'admin' ? 'active' : ''}`}
              onClick={() => { setAuthMode('admin'); setStatusMsg(null); }}
            >
              <ShieldCheck size={15} />
              <span>Admin Login</span>
            </button>
            <button 
              type="button"
              className={`auth-segmented-btn ${authMode === 'register' ? 'active' : ''}`}
              onClick={() => { setAuthMode('register'); setStatusMsg(null); }}
            >
              <User size={15} />
              <span>Register</span>
            </button>
          </div>
        )}

        {/* One-Click Demo Helper Cards */}
        {authMode === 'student' && (
          <div className="auth-demo-card">
            <div className="auth-demo-info">
              <div className="auth-demo-avatar">
                <Sparkles size={16} />
              </div>
              <div className="auth-demo-texts">
                <span className="auth-demo-title">Student Demo Account</span>
                <span className="auth-demo-creds">shadabca@gmail.com • shadab12345</span>
              </div>
            </div>
            <button 
              type="button" 
              className="auth-demo-btn" 
              onClick={handleFillStudentDemo}
            >
              <span>Auto-Fill</span>
            </button>
          </div>
        )}

        {authMode === 'admin' && (
          <div className="auth-demo-card" style={{ background: '#FFFFFF', borderColor: 'rgba(0, 0, 0, 0.08)' }}>
            <div className="auth-demo-info">
              <div className="auth-demo-avatar" style={{ background: '#FFFFFF', color: '#0F172A' }}>
                <Key size={16} />
              </div>
              <div className="auth-demo-texts">
                <span className="auth-demo-title" style={{ color: '#0F172A' }}>Director Demo Access</span>
                <span className="auth-demo-creds" style={{ color: '#78716c' }}>admin@gaya.com • Passcode: 8080</span>
              </div>
            </div>
            <button 
              type="button" 
              className="auth-demo-btn" 
              onClick={handleFillAdminDemo}
              style={{ borderColor: '#d6d3d1', color: '#0F172A' }}
            >
              <span>Auto-Fill</span>
            </button>
          </div>
        )}

        {/* Prominent High-Contrast Alert Banner */}
        {statusMsg && (
          <div className={`auth-alert-banner ${statusMsg.type}`}>
            <div className="auth-alert-icon">
              {statusMsg.type === 'error' && <AlertCircle size={18} />}
              {statusMsg.type === 'success' && <CheckCircle2 size={18} />}
              {statusMsg.type === 'info' && <Info size={18} />}
            </div>
            <div className="auth-alert-body">
              <span className="auth-alert-title">
                {statusMsg.type === 'error' ? 'Authentication Failed' : statusMsg.type === 'success' ? 'Verification Complete' : 'Quick Notice'}
              </span>
              <p className="auth-alert-text">{statusMsg.text}</p>
            </div>
          </div>
        )}

        {/* Main Authentication Form */}
        <form onSubmit={handleSubmit} className="auth-form-stack">
          {/* Register Mode Exclusive Candidate Name */}
          {authMode === 'register' && (
            <div className="auth-field-group">
              <label className="auth-field-label">Candidate Full Name</label>
              <div className="auth-input-wrapper">
                <User size={16} className="auth-input-icon" />
                <input 
                  type="text" 
                  className="auth-input-element"
                  placeholder="e.g. Rahul Sharma" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required 
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          {/* Email field (for all modes) */}
          <div className="auth-field-group">
            <label className="auth-field-label">
              <span>
                {authMode === 'forgot' 
                  ? 'Registered Candidate Email' 
                  : authMode === 'admin' 
                    ? 'Faculty Admin Email' 
                    : 'Student Email Address'}
              </span>
            </label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-input-icon" />
              <input 
                type="email" 
                className="auth-input-element"
                placeholder={authMode === 'admin' ? 'admin@gaya.com' : 'shadabca@gmail.com'} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
                autoComplete="email"
                disabled={authMode === 'forgot' && forgotStep === 2}
              />
            </div>
            {authMode === 'forgot' && forgotStep === 1 && (
              <span style={{ fontSize: '0.74rem', color: '#78716c', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Mail size={13} className="text-amber-600 flex-shrink-0" />
                <span>We will dispatch an official 6-digit verification code directly to this email address.</span>
              </span>
            )}
          </div>

          {/* Password or Admin Passcode or Forgot Form Fields */}
          {authMode === 'forgot' ? (
            <>
              {forgotStep === 2 && (
                <>
                  {!smtpConfigured ? (
                    <div style={{
                      background: '#fffbeb',
                      border: '1px solid #fde68a',
                      borderRadius: '8px',
                      padding: '0.75rem 0.85rem',
                      marginBottom: '0.85rem',
                      fontSize: '0.76rem',
                      color: '#92400e',
                      lineHeight: 1.45
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                        <AlertCircle size={15} className="text-amber-600 flex-shrink-0" />
                        <span>SMTP Email Server Not Configured</span>
                      </div>
                      <p style={{ margin: 0 }}>
                        Real email could not be sent to <strong>{email}</strong> because <code>SMTP_USER</code> and <code>SMTP_PASS</code> are not set in <code>.env</code>. The code was logged to your server terminal for testing.
                      </p>
                    </div>
                  ) : (
                    <div style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '8px',
                      padding: '0.75rem 0.85rem',
                      marginBottom: '0.85rem',
                      fontSize: '0.78rem',
                      color: '#57534e',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                      <span>6-Digit recovery code dispatched to <strong>{email}</strong>. (Check inbox / spam).</span>
                    </div>
                  )}

                  <div className="auth-field-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <label className="auth-field-label" style={{ margin: 0 }}>
                        <span>6-Digit Email Verification Code</span>
                      </label>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const res = await api.auth.forgotPassword(email);
                            setRecoveryCode('');
                            if (res.smtpConfigured === false) {
                              setSmtpConfigured(false);
                              setStatusMsg({ type: 'error', text: res.message || 'Outbound SMTP is not configured in .env.' });
                            } else {
                              setSmtpConfigured(true);
                              setStatusMsg({ type: 'info', text: 'Fresh verification code dispatched to your email!' });
                            }
                          } catch (e) {
                            setStatusMsg({ type: 'error', text: e.message || 'Failed to resend code.' });
                          }
                        }}
                        style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.74rem', color: '#d97706', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Resend Code to Email
                      </button>
                    </div>
                    <div className="auth-input-wrapper">
                      <Key size={16} className="auth-input-icon" />
                      <input 
                        type="text" 
                        className="auth-input-element font-mono"
                        placeholder="e.g. 849201" 
                        value={recoveryCode} 
                        onChange={(e) => setRecoveryCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required 
                        maxLength={6}
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="auth-field-group">
                    <label className="auth-field-label">
                      <span>Create New Password (Min 6 Characters)</span>
                    </label>
                    <div className="auth-input-wrapper">
                      <Lock size={16} className="auth-input-icon" />
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        className="auth-input-element"
                        placeholder="Enter your new password" 
                        value={resetNewPassword} 
                        onChange={(e) => setResetNewPassword(e.target.value)}
                        required 
                        minLength={6}
                      />
                      <button 
                        type="button" 
                        className="auth-toggle-pwd-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="auth-field-group">
                    <label className="auth-field-label">
                      <span>Confirm New Password</span>
                    </label>
                    <div className="auth-input-wrapper">
                      <Lock size={16} className="auth-input-icon" />
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        className="auth-input-element"
                        placeholder="Re-enter your new password" 
                        value={resetConfirmPassword} 
                        onChange={(e) => setResetConfirmPassword(e.target.value)}
                        required 
                        minLength={6}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          ) : authMode === 'admin' ? (
            <div className="auth-field-group">
              <label className="auth-field-label">Director Security Passcode</label>
              <div className="auth-input-wrapper">
                <Key size={16} className="auth-input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="auth-input-element"
                  placeholder="Master passcode (e.g. 8080)" 
                  value={adminPasscode} 
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  required 
                  autoComplete="current-password"
                />
                <button 
                  type="button" 
                  className="auth-toggle-pwd-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <span style={{ fontSize: '0.74rem', color: '#78716c', marginTop: '0.2rem' }}>
                Default security PIN: <strong>8080</strong>
              </span>
            </div>
          ) : (
            <div className="auth-field-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0.35rem' }}>
                <label className="auth-field-label" style={{ margin: 0 }}>
                  <span>{authMode === 'register' ? 'Create Password' : 'Password'}</span>
                </label>
                {authMode === 'student' && (
                  <button 
                    type="button" 
                    onClick={() => { setAuthMode('forgot'); setStatusMsg(null); setForgotStep(1); }}
                    style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.78rem', color: '#d97706', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="auth-input-element"
                  placeholder={authMode === 'register' ? 'Min 6 characters' : 'Enter your password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  autoComplete={authMode === 'register' ? 'new-password' : 'current-password'}
                />
                <button 
                  type="button" 
                  className="auth-toggle-pwd-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          {/* Register Mode Medium & State */}
          {authMode === 'register' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="auth-field-group">
                <label className="auth-field-label">State / UT</label>
                <div className="auth-input-wrapper">
                  <MapPin size={16} className="auth-input-icon" />
                  <input 
                    type="text" 
                    className="auth-input-element"
                    placeholder="e.g. Bihar" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="auth-field-group">
                <label className="auth-field-label">Target Course for Admission</label>
                <CustomSelect 
                  value={language} 
                  onChange={(val) => setLanguage(val)}
                  prefixIcon={<Globe size={16} />}
                  options={ADMISSION_COURSES}
                />
              </div>
            </div>
          )}

          {/* Submit Action Button */}
          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Authenticating with Portal...</span>
              </>
            ) : (
              <>
                <span>
                  {authMode === 'admin' 
                    ? 'Login to Faculty Admin Portal' 
                    : authMode === 'student' 
                      ? 'Login to Student Portal' 
                      : authMode === 'forgot'
                        ? (forgotStep === 1 ? 'Send Recovery Code to Email' : 'Verify Email Code & Update Password')
                        : 'Complete Registration & Start Tests'}
                </span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Continue with Google Option */}
          {authMode !== 'forgot' && (
            <>
              <div className="google-auth-divider">
                <span>OR</span>
              </div>

              <button
                type="button"
                className="btn-continue-google"
                onClick={() => handleGoogleSignIn()}
                disabled={isSubmitting}
              >
                <GoogleIcon />
                <span>
                  {authMode === 'admin' 
                    ? 'Continue with Google (Director)' 
                    : authMode === 'register' 
                      ? 'Register with Google' 
                      : 'Continue with Google'}
                </span>
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.45rem' }}>
                <button
                  type="button"
                  onClick={() => setShowGoogleChooser(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.74rem',
                    color: '#64748B',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  Sign in with another Google Email →
                </button>
              </div>
            </>
          )}
        </form>

        {/* Footer Navigation Switcher */}
        <div className="auth-switch-footer">
          {authMode === 'forgot' && (
            <p style={{ margin: 0 }}>
              Remembered your password?{' '}
              <button 
                type="button" 
                className="auth-switch-link"
                onClick={() => { setAuthMode('student'); setStatusMsg(null); setForgotStep(1); }}
              >
                Sign In to Student Portal
              </button>
            </p>
          )}

          {authMode === 'student' && (
            <p style={{ margin: 0 }}>
              New aspirant?{' '}
              <button 
                type="button" 
                className="auth-switch-link"
                onClick={() => { setAuthMode('register'); setStatusMsg(null); }}
              >
                Create a Free Student Account
              </button>
            </p>
          )}

          {authMode === 'register' && (
            <p style={{ margin: 0 }}>
              Already registered?{' '}
              <button 
                type="button" 
                className="auth-switch-link"
                onClick={() => { setAuthMode('student'); setStatusMsg(null); }}
              >
                Sign In to Your Account
              </button>
            </p>
          )}

          {authMode === 'admin' && (
            <p style={{ margin: 0 }}>
              Student or Aspirant?{' '}
              <button 
                type="button" 
                className="auth-switch-link"
                onClick={() => { setAuthMode('student'); setStatusMsg(null); }}
              >
                Go to Student Login
              </button>
            </p>
          )}

          <div className="auth-ssl-badge">
            <Lock size={12} />
            <span>256-Bit SSL Encrypted • Shorthand Plus Enterprise Authentication</span>
          </div>
        </div>

        {/* Google Account Chooser Modal */}
        {showGoogleChooser && (
          <div className="google-account-chooser-modal" onClick={() => setShowGoogleChooser(false)}>
            <div className="google-account-chooser-card" onClick={(e) => e.stopPropagation()}>
              <div className="google-chooser-header">
                <GoogleIcon />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>
                    Sign in with Google
                  </h4>
                  <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748B' }}>
                    {authMode === 'admin' ? 'Faculty Director Clearance Access' : 'Shorthand Plus Candidate Portal'}
                  </p>
                </div>
              </div>

              {/* Preset Account Option */}
              <div 
                className="google-account-item"
                onClick={() => handleGoogleSignIn(
                  authMode === 'admin' ? 'stenoplus.in@gmail.com' : 'shadabca@gmail.com', 
                  authMode === 'admin' ? 'Shadab Sir (Director)' : 'Shadab Khan'
                )}
              >
                <div className="google-account-avatar" style={{ background: '#0F172A' }}>
                  {authMode === 'admin' ? 'SP' : 'SK'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>
                    {authMode === 'admin' ? 'Shadab Sir (Director)' : 'Shadab Khan'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {authMode === 'admin' ? 'stenoplus.in@gmail.com • Verified Faculty Lead' : 'shadabca@gmail.com • Student Aspirant'}
                  </div>
                </div>
                <CheckCircle2 size={16} color="#059669" />
              </div>

              {/* Custom Google Account Form */}
              <div style={{ marginTop: '1rem', padding: '0.9rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                  Or enter your Gmail address:
                </span>
                <input 
                  type="email"
                  className="field-input"
                  placeholder="e.g. yourname@gmail.com"
                  value={googleCustomEmail}
                  onChange={(e) => setGoogleCustomEmail(e.target.value)}
                  style={{ marginBottom: '0.5rem', background: '#FFFFFF' }}
                />
                <input 
                  type="text"
                  className="field-input"
                  placeholder="Your Full Name"
                  value={googleCustomName}
                  onChange={(e) => setGoogleCustomName(e.target.value)}
                  style={{ marginBottom: '0.65rem', background: '#FFFFFF' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                    onClick={() => setShowGoogleChooser(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem', background: '#0F172A', borderColor: '#0F172A' }}
                    disabled={!googleCustomEmail.includes('@') || isSubmitting}
                    onClick={() => handleGoogleSignIn(googleCustomEmail.trim(), googleCustomName.trim() || 'Candidate Aspirant')}
                  >
                    {isSubmitting ? 'Authenticating...' : 'Sign In with Google'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
