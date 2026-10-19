import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, MapPin, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import CustomSelect from './CustomSelect';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [state, setState] = useState('Bihar');
  const [language, setLanguage] = useState('English');
  const [statusMsg, setStatusMsg] = useState(null);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setEmail('shadabca@gmail.com');
    setPassword('shadab12345');
    setStatusMsg({ type: 'info', text: 'Pre-filled with Shadab credentials!' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginTab) {
      if (email === 'shadabca@gmail.com' && password === 'shadab12345') {
        setStatusMsg({ type: 'success', text: 'Welcome back, Shadab! Logging in...' });
        try {
          confetti({ particleCount: 75, spread: 65, origin: { y: 0.55 } });
        } catch {}
        setTimeout(() => {
          onLoginSuccess({
            name: 'Shadab Khan',
            email: 'shadabca@gmail.com',
            rollNo: 'SP-2026-084',
            language: 'English',
            subscription: {
              plan: '12 Month Unlimited',
              status: 'Active',
              daysRemaining: 248,
              isPaid: true
            }
          });
          onClose();
        }, 600);
      } else {
        setStatusMsg({ type: 'error', text: 'Please enter valid registered credentials or use Quick Demo.' });
      }
    } else {
      setStatusMsg({ type: 'success', text: `Welcome ${name}! Your account has been registered.` });
      try {
        confetti({ particleCount: 85, spread: 70, origin: { y: 0.55 } });
      } catch {}
      setTimeout(() => {
        onLoginSuccess({
          name: name || 'Candidate',
          email: email,
          rollNo: 'SP-2026-' + Math.floor(100 + Math.random() * 900),
          language: language,
          subscription: {
            plan: '1-Day Free Trial',
            status: 'Active',
            daysRemaining: 1,
            isPaid: true
          }
        });
        onClose();
      }, 700);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card glass-panel-glow">
        <div className="modal-header">
          <div className="modal-tabs">
            <button 
              className={`modal-tab-btn ${isLoginTab ? 'active' : ''}`}
              onClick={() => { setIsLoginTab(true); setStatusMsg(null); }}
            >
              Sign In
            </button>
            <button 
              className={`modal-tab-btn ${!isLoginTab ? 'active' : ''}`}
              onClick={() => { setIsLoginTab(false); setStatusMsg(null); }}
            >
              Register New Account
            </button>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {isLoginTab && (
          <div className="demo-credentials-banner">
            <div>
              <p className="demo-banner-title">Quick Demo Credentials</p>
              <p className="demo-banner-sub">shadabca@gmail.com / shadab12345</p>
            </div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleFillDemo}>
              Auto-Fill
            </button>
          </div>
        )}

        {statusMsg && (
          <div className={`status-toast ${statusMsg.type}`}>
            {statusMsg.type === 'success' && <CheckCircle2 size={16} />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-content">
          {!isLoginTab && (
            <>
              <div className="form-field">
                <label>Full Name</label>
                <div className="input-group">
                  <User size={16} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="e.g. Rahul Sharma" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Mobile Number</label>
                <div className="input-group">
                  <Phone size={16} className="input-icon" />
                  <input 
                    type="tel" 
                    placeholder="10-digit mobile number" 
                    value={mobile} 
                    onChange={(e) => setMobile(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-field">
            <label>Email Address</label>
            <div className="input-group">
              <Mail size={16} className="input-icon" />
              <input 
                type="email" 
                placeholder="your.email@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-field">
            <label>Password</label>
            <div className="input-group">
              <Lock size={16} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          {!isLoginTab && (
            <div className="form-grid-2">
              <div className="form-field">
                <label>State</label>
                <div className="input-group">
                  <MapPin size={16} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="e.g. Bihar" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Primary Medium</label>
                <CustomSelect 
                  value={language} 
                  onChange={(val) => setLanguage(val)}
                  prefixIcon={<Globe size={16} />}
                  options={[
                    { value: 'English', label: 'English (Steno+Typing)' },
                    { value: 'Hindi Kruti Dev', label: 'Hindi Krutidev (Steno+Typing)' },
                    { value: 'Hindi Mangal', label: 'Hindi Inscript Mangal' }
                  ]}
                />
              </div>
            </div>
          )}

          <div className="form-submit-row">
            <button type="submit" className="btn btn-primary btn-lg w-full">
              <span>{isLoginTab ? 'Sign In to Portal' : 'Complete Registration'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        <div className="modal-footer-note">
          <p>Protected by 256-bit SSL encryption. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
