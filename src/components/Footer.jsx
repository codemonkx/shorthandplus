import React from 'react';
import { GraduationCap, ShieldCheck, Award, Phone, Mail, MapPin, Clock, ArrowRight, Lock } from 'lucide-react';

export default function Footer({ onOpenCheckout, setCurrentTab, onOpenLegal }) {
  return (
    <footer className="clean-footer-wrapper">
      <div className="clean-footer-container">
        <div className="footer-columns-grid">
          
          {/* Column 1: Brand & Institution Overview */}
          <div className="footer-col brand-info-col">
            <div 
              className="footer-brand-title" 
              onClick={() => { setCurrentTab('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <div className="brand-logo-s-wrap footer-logo-wrap" style={{ width: '40px', height: '40px' }}>
                <img 
                  src="/assets/logo-big-s.png" 
                  alt="Steno Plus Big S Logo" 
                  style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
              <div className="footer-brand-text">
                <span className="brand-h1">SHORTHAND PLUS</span>
                <span className="brand-sub">Gaya Shorthand Classes • Learn Today, Lead Tomorrow!</span>
              </div>
            </div>

            <p className="footer-summary-text">
              Under experienced faculty <strong>Shadab Sir (12 Years Experience)</strong>, Gaya Shorthand Classes (SHORTHAND PLUS) is a professional training center (OFFLINE/ONLINE) dedicated to enhancing typing, shorthand, and computer skills with a modern approach to learning (50–140 WPM).
            </p>

            <div className="footer-trust-chips-row">
              <span className="footer-trust-chip">
                <ShieldCheck size={14} color="#D97706" />
                <span>AI-Based Real-Time Evaluation</span>
              </span>
              <span className="footer-trust-chip">
                <Award size={14} color="#D97706" />
                <span>50–140 WPM Certified Speeds</span>
              </span>
            </div>
          </div>

          {/* Column 2: Examination & Practice Rooms */}
          <div className="footer-col">
            <h4 className="footer-heading">Target Exam Benches</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => { setCurrentTab('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  SSC Stenographer Grade C & D
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Supreme Court Stenographer & SPA
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Delhi High Court PA / SPA Series
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Patna & Jharkhand High Court Dictations
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  BSF & CRPF ASI Stenographer Tests
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Hindi (Kruti Dev / Mangal) & English Typing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Accredited Diplomas */}
          <div className="footer-col">
            <h4 className="footer-heading">Computer Diplomas</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => { setCurrentTab('classes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  DCA (Diploma in Computer Applications - 6 Mos)
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('classes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  ADCA (Advance Diploma - 1 Year)
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('classes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Tally Prime with GST Certification
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('classes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  PGDCA Post Graduate Diploma
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('classes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Verified Shorthand Speed Certificate (50–140 WPM)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Gaya Offline Center & Contacts */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Academy Contact</h4>
            <ul className="footer-contact-details">
              <li>
                <MapPin size={16} color="#D97706" className="shrink-0" />
                <span>Gaya College More, Opposite Cyber Thana, Gayaji, Bihar</span>
              </li>
              <li>
                <Phone size={16} color="#D97706" className="shrink-0" />
                <span>Contact: +91 7870377214 / +91 9204123453</span>
              </li>
              <li>
                <Mail size={16} color="#D97706" className="shrink-0" />
                <a href="mailto:stenoplus.in@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                  stenoplus.in@gmail.com
                </a>
              </li>
              <li>
                <Clock size={16} color="#D97706" className="shrink-0" />
                <span>Daily Batches: 6:00 AM – 11:00 AM & 3:00 PM – 8:00 PM</span>
              </li>
            </ul>

            <a 
              href="tel:+919204123453"
              className="footer-director-call-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#D97706',
                color: '#FFFFFF',
                padding: '0.65rem 1.15rem',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
                marginTop: '1rem',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.28)'
              }}
            >
              <Phone size={15} />
              <span>Call Helpline (+91 9204123453)</span>
            </a>
          </div>

        </div>

        {/* Compliance & Legal Policies Strip (Razorpay & IT Rules Compliant) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center', alignItems: 'center', padding: '1rem 0', borderTop: '1px solid rgba(243, 238, 227,0.08)', fontSize: '0.74rem', color: '#a8a29e' }}>
          <a href="https://stenoplus.in" target="_blank" rel="noopener noreferrer" style={{ color: '#D97706', textDecoration: 'none', fontWeight: 600 }}>https://stenoplus.in</a>
          <span>•</span>
          <button onClick={() => onOpenLegal && onOpenLegal('terms')} style={{ background: 'none', border: 'none', color: '#a8a29e', cursor: 'pointer', padding: 0 }}>Terms & Conditions</button>
          <span>•</span>
          <button onClick={() => onOpenLegal && onOpenLegal('privacy')} style={{ background: 'none', border: 'none', color: '#a8a29e', cursor: 'pointer', padding: 0 }}>Privacy Policy</button>
          <span>•</span>
          <button onClick={() => onOpenLegal && onOpenLegal('refund')} style={{ background: 'none', border: 'none', color: '#a8a29e', cursor: 'pointer', padding: 0 }}>Cancellation & Refund Policy</button>
          <span>•</span>
          <button onClick={() => onOpenLegal && onOpenLegal('contact')} style={{ background: 'none', border: 'none', color: '#a8a29e', cursor: 'pointer', padding: 0 }}>Grievance Officer & Center Support</button>
        </div>

        {/* Bottom Copyright & Verification Strip */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} SHORTHAND PLUS (Gaya Shorthand Classes • stenoplus.in). All rights reserved.
          </p>
          <div className="footer-badges-strip">
            <span>Official Government Skill Test Software</span>
            <span className="dot-sep">•</span>
            <span>Accredited Examination Engine</span>
            <span className="dot-sep">•</span>
            <span>Govt. Certificate Verification System</span>
            <span className="dot-sep">•</span>
            <button 
              className="footer-admin-link-btn"
              onClick={() => { setCurrentTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              title="Authorized Faculty & Director Login Only (PIN Protected)"
            >
              <Lock size={11} className="inline-block mr-1 opacity-60" />
              <span>Staff Access</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
