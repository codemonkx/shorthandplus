import React from 'react';
import { Phone, Mail, MapPin, Clock, Lock } from 'lucide-react';
import '../landing-redesign.css';

export default function Footer({ onOpenCheckout, setCurrentTab, onOpenLegal }) {
  const currentYear = new Date().getFullYear();

  const handleNav = (tab) => {
    if (setCurrentTab) {
      setCurrentTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="sp-footer clean-footer-wrapper">
      <div className="sp-footer-container clean-footer-container">
        
        {/* Main 12-Column Asymmetric Grid */}
        <div className="sp-footer-grid">
          
          {/* Column 1: Brand & Legacy (lg:col-span-4) */}
          <div className="sp-footer-col-brand">
            <div 
              className="sp-footer-brand-title"
              onClick={() => handleNav('landing')}
              role="button"
              tabIndex={0}
            >
              <div className="sp-footer-logo-wrap" style={{ width: '32px', height: '32px', overflow: 'hidden' }}>
                <img 
                  src="/assets/logo-big-s.png" 
                  alt="Shorthand Plus" 
                  className="sp-footer-logo-img"
                  style={{ height: '32px', width: '32px', maxHeight: '32px', maxWidth: '32px', objectFit: 'contain' }}
                />
              </div>
              <div>
                <span className="sp-footer-brand-name">
                  SHORTHAND PLUS
                </span>
                <span className="sp-footer-brand-sub">
                  Gaya Shorthand Classes &middot; Est. 2012
                </span>
              </div>
            </div>

            <p className="sp-footer-summary">
              Guided by Shadab Sir (12+ Years Experience). Offline &amp; live online coaching for Pitman Shorthand (50–140 WPM), bilingual typing, and government computer diplomas.
            </p>

            <a 
              href="tel:+919204123453"
              className="sp-footer-helpline-btn"
            >
              <Phone style={{ width: '14px', height: '14px', flexShrink: 0 }} />
              <span>Call Helpline &middot; +91 9204123453</span>
            </a>
          </div>

          {/* Column 2: Quick Navigation (lg:col-span-2) */}
          <div className="sp-footer-col-nav">
            <h4 className="sp-footer-heading">
              ACADEMY
            </h4>
            <ul className="sp-footer-links">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('landing')}
                  className="sp-footer-link-btn"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn"
                >
                  All Courses
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('classes')}
                  className="sp-footer-link-btn"
                >
                  Batches &amp; Live
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('about')}
                  className="sp-footer-link-btn"
                >
                  About Shadab Sir
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('dashboard')}
                  className="sp-footer-link-btn"
                >
                  Candidate Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Target Exams & Diplomas (lg:col-span-3) */}
          <div className="sp-footer-col-programs">
            <h4 className="sp-footer-heading">
              PROGRAMS &amp; EXAMS
            </h4>
            <ul className="sp-footer-links">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn"
                >
                  SSC Stenographer Grade C &amp; D
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn"
                >
                  High Court &amp; Supreme Court PA/SPA
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn"
                >
                  BSF &amp; CRPF ASI Stenographer
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn"
                >
                  Hindi (Kruti Dev / Mangal) &amp; English Typing
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('classes')}
                  className="sp-footer-link-btn"
                >
                  DCA, ADCA, PGDCA &amp; Tally Prime
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Gaya Center & Timings (lg:col-span-3) */}
          <div className="sp-footer-col-center">
            <h4 className="sp-footer-heading">
              GAYA CENTER
            </h4>
            <ul className="sp-footer-contact-list">
              <li className="sp-footer-contact-item">
                <MapPin className="sp-footer-contact-icon" />
                <span>Gaya College More, Opposite Cyber Thana, Gayaji, Bihar</span>
              </li>
              <li className="sp-footer-contact-item">
                <Phone className="sp-footer-contact-icon" />
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>+91 7870377214 / +91 9204123453</span>
              </li>
              <li className="sp-footer-contact-item">
                <Mail className="sp-footer-contact-icon" />
                <a 
                  href="mailto:stenoplus.in@gmail.com" 
                  className="sp-footer-email-link"
                >
                  stenoplus.in@gmail.com
                </a>
              </li>
              <li className="sp-footer-contact-item">
                <Clock className="sp-footer-contact-icon" />
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>6:00 AM – 11:00 AM &amp; 3:00 PM – 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Clean Unified Bottom Bar */}
        <div className="sp-footer-bottom">
          
          {/* Left: Copyright */}
          <p className="sp-footer-copyright">
            &copy; {currentYear} Shorthand Plus (Gaya Shorthand Classes &middot; stenoplus.in). All rights reserved.
          </p>

          {/* Right: Legal & Staff Access */}
          <div className="sp-footer-legal-group">
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="sp-footer-legal-btn"
            >
              Terms
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="sp-footer-legal-btn"
            >
              Privacy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('refund')}
              className="sp-footer-legal-btn"
            >
              Refund Policy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('contact')}
              className="sp-footer-legal-btn"
            >
              Grievance &amp; Support
            </button>

            <span className="sp-footer-divider" />

            <button 
              type="button"
              onClick={() => handleNav('admin')}
              className="sp-footer-staff-btn"
              title="Authorized Faculty & Director Login Only (PIN Protected)"
            >
              <Lock className="sp-footer-lock-icon" />
              <span>Staff Access</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
