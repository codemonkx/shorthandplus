import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Lock, 
  ShieldCheck, 
  Crown, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  Key, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Loader2,
  Calendar,
  Sparkles
} from 'lucide-react';
import CustomSelect from './CustomSelect';
import { api } from '../services/api';

export default function ProfileSettingsModal({ 
  isOpen, 
  onClose, 
  user, 
  onUpdateUser, 
  onOpenCheckout 
}) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security' | 'subscription'
  
  // Profile Fields
  const [name, setName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [state, setState] = useState(user?.state || 'Bihar');
  const [language, setLanguage] = useState(user?.language || 'English');
  
  // Security / Password Fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Status & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setMobile(user.mobile || '');
      setState(user.state || 'Bihar');
      setLanguage(user.language || 'English');
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatusMsg({ type: 'error', text: 'Candidate name cannot be empty.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await api.auth.updateProfile({
        name: name.trim(),
        mobile: mobile.trim(),
        state,
        language
      });

      if (res.user && onUpdateUser) {
        onUpdateUser(res.user);
      }
      setStatusMsg({ type: 'success', text: 'Candidate profile updated successfully!' });
      setTimeout(() => setStatusMsg(null), 3500);
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword) {
      setStatusMsg({ type: 'error', text: 'Please enter your current password.' });
      return;
    }
    if (newPassword.length < 6) {
      setStatusMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await api.auth.changePassword({
        currentPassword,
        newPassword
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setStatusMsg({ type: 'success', text: res.message || 'Password changed successfully!' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to change password.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: 540 }}
      >
        {/* Header */}
        <div className="auth-modal-header" style={{ paddingBottom: '0.85rem' }}>
          <div className="auth-header-brand-row">
            <div className="auth-brand-badge" style={{ background: '#1c1917', color: '#f59e0b' }}>
              <ShieldCheck size={22} />
            </div>
            <div className="auth-header-texts">
              <h2 className="auth-modal-title">Candidate Profile & Settings</h2>
              <p className="auth-modal-sub">
                Official candidate credentials & account security
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

        {/* Candidate Identifier Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          margin: '0 1.25rem 0.75rem',
          background: '#fafaf9',
          border: '1px solid #e7e5e4',
          borderRadius: 8
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: '#1c1917',
              color: '#fafaf9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1rem'
            }}>
              {user.name?.charAt(0) || 'C'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1c1917' }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#78716c' }} className="font-mono">
                Roll No: <strong style={{ color: '#d97706' }}>{user.rollNo || 'SP-2026-084'}</strong>
              </div>
            </div>
          </div>
          <span style={{
            fontSize: '0.72rem',
            padding: '0.2rem 0.55rem',
            background: '#ecfdf5',
            color: '#047857',
            border: '1px solid #a7f3d0',
            borderRadius: 6,
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}>
            <CheckCircle2 size={12} />
            Active Student
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs-segmented" style={{ margin: '0 1.25rem 1rem' }}>
          <button 
            type="button"
            className={`auth-segmented-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => { setActiveTab('profile'); setStatusMsg(null); }}
          >
            <User size={15} />
            <span>Profile Details</span>
          </button>
          <button 
            type="button"
            className={`auth-segmented-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => { setActiveTab('security'); setStatusMsg(null); }}
          >
            <Lock size={15} />
            <span>Change Password</span>
          </button>
          <button 
            type="button"
            className={`auth-segmented-btn ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => { setActiveTab('subscription'); setStatusMsg(null); }}
          >
            <Crown size={15} />
            <span>Pass Status</span>
          </button>
        </div>

        {/* Status Message Banner */}
        {statusMsg && (
          <div 
            className={`auth-alert-banner ${statusMsg.type}`}
            style={{ margin: '0 1.25rem 1rem' }}
          >
            <div className="auth-alert-icon">
              {statusMsg.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            </div>
            <div className="auth-alert-body">
              <span className="auth-alert-title">
                {statusMsg.type === 'error' ? 'Notice' : 'Success'}
              </span>
              <p className="auth-alert-text">{statusMsg.text}</p>
            </div>
          </div>
        )}

        {/* TAB 1: Profile Details */}
        {activeTab === 'profile' && (
          <form onSubmit={handleUpdateProfile} style={{ padding: '0 1.25rem 1.25rem' }}>
            <div className="auth-field-group">
              <label className="auth-field-label">Full Name</label>
              <div className="auth-input-wrapper">
                <User size={16} className="auth-input-icon" />
                <input 
                  type="text" 
                  className="auth-input-element" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="auth-field-group">
              <label className="auth-field-label">Registered Email (Read-Only)</label>
              <div className="auth-input-wrapper" style={{ background: '#f5f5f4' }}>
                <Mail size={16} className="auth-input-icon" style={{ color: '#a8a29e' }} />
                <input 
                  type="email" 
                  className="auth-input-element" 
                  value={user.email} 
                  disabled 
                  style={{ color: '#78716c', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="auth-field-group">
              <label className="auth-field-label">Mobile Number</label>
              <div className="auth-input-wrapper">
                <Phone size={16} className="auth-input-icon" />
                <input 
                  type="tel" 
                  className="auth-input-element" 
                  placeholder="e.g. 9876543210" 
                  value={mobile} 
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="auth-field-group">
                <label className="auth-field-label">State / UT</label>
                <div className="auth-input-wrapper">
                  <MapPin size={16} className="auth-input-icon" />
                  <input 
                    type="text" 
                    className="auth-input-element" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-field-group">
                <label className="auth-field-label">Exam Medium</label>
                <CustomSelect 
                  value={language} 
                  onChange={(val) => setLanguage(val)}
                  prefixIcon={<Globe size={16} />}
                  options={[
                    { value: 'English', label: 'English (Pitman)' },
                    { value: 'Hindi Kruti Dev', label: 'Hindi (Kruti Dev)' },
                    { value: 'Hindi Mangal', label: 'Hindi (Mangal)' }
                  ]}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={isSubmitting}
              style={{ marginTop: '0.5rem' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Updating Profile...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Profile Changes</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* TAB 2: Change Password */}
        {activeTab === 'security' && (
          <form onSubmit={handleChangePassword} style={{ padding: '0 1.25rem 1.25rem' }}>
            <div className="auth-field-group">
              <label className="auth-field-label">Current Password</label>
              <div className="auth-input-wrapper">
                <Key size={16} className="auth-input-icon" />
                <input 
                  type={showCurrentPassword ? 'text' : 'password'}
                  className="auth-input-element" 
                  placeholder="Enter current password"
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="auth-toggle-pwd-btn"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="auth-field-group">
              <label className="auth-field-label">New Password (Min 6 Characters)</label>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input 
                  type={showNewPassword ? 'text' : 'password'}
                  className="auth-input-element" 
                  placeholder="Enter new password"
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="auth-toggle-pwd-btn"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="auth-field-group">
              <label className="auth-field-label">Confirm New Password</label>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input 
                  type="password" 
                  className="auth-input-element" 
                  placeholder="Re-enter new password"
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={isSubmitting}
              style={{ marginTop: '0.5rem' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Update Security Password</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* TAB 3: Subscription & Roll Credentials */}
        {activeTab === 'subscription' && (
          <div style={{ padding: '0 1.25rem 1.25rem' }}>
            <div style={{
              background: '#fafaf9',
              border: '1px solid #e7e5e4',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#78716c', fontWeight: 600 }}>CURRENT PASS</span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  background: '#fef3c7',
                  color: '#92400e',
                  border: '1px solid #fde68a',
                  borderRadius: 4,
                  fontWeight: 700
                }}>
                  {user.subscription?.status || 'Active'}
                </span>
              </div>

              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.35rem' }}>
                {user.subscription?.plan || '12-Month Pro Active Pass'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#78716c' }}>VALIDITY REMAINING</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#d97706' }} className="font-mono">
                    {user.subscription?.daysRemaining || 248} Days
                  </div>
                </div>
                <div style={{ width: 1, height: 28, background: '#e7e5e4' }} />
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#78716c' }}>EXAM PREPARATION</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1c1917' }}>
                    SSC C/D & High Court
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="button" 
              className="auth-submit-btn"
              onClick={() => {
                onClose();
                if (onOpenCheckout) onOpenCheckout();
              }}
            >
              <CreditCard size={16} />
              <span>Extend or Upgrade Subscription Pass</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

