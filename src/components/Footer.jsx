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
    <footer 
      className="sp-footer clean-footer-wrapper" 
      style={{
        backgroundColor: '#231418',
        color: '#CBBCC0',
        borderTop: '1px solid #3A2329'
      }}
    >
      <div className="sp-footer-container clean-footer-container max-w-7xl mx-auto px-6 pt-16 pb-10">
        
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
              <div 
                className="sp-footer-logo-wrap" 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  minWidth: '32px', 
                  minHeight: '32px', 
                  maxWidth: '32px', 
                  maxHeight: '32px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  flexShrink: 0 
                }}
              >
                <img 
                  src="/assets/logo-big-s.png" 
                  alt="Shorthand Plus" 
                  className="sp-footer-logo-img"
                  style={{ 
                    height: '32px', 
                    width: '32px', 
                    maxHeight: '32px', 
                    maxWidth: '32px', 
                    objectFit: 'contain',
                    display: 'block' 
                  }}
                />
              </div>
              <div>
                <span className="sp-footer-brand-name" style={{ color: '#FAF6F0', fontWeight: 700 }}>
                  SHORTHAND PLUS
                </span>
                <span className="sp-footer-brand-sub" style={{ color: '#CBBCC0' }}>
                  Gaya Shorthand Classes &middot; Est. 2012
                </span>
              </div>
            </div>

            <p className="sp-footer-summary" style={{ color: '#CBBCC0' }}>
              Guided by Shadab Sir (12+ Years Experience). Offline &amp; live online coaching for Pitman Shorthand (50–140 WPM), bilingual typing, and government computer diplomas.
            </p>

            <a 
              href="tel:+919204123453"
              className="sp-footer-helpline-btn"
              style={{
                backgroundColor: '#991B1B',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '10px 20px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                marginTop: '1.25rem',
                transition: 'background-color 0.2s ease',
                boxShadow: '0 2px 8px rgba(153, 27, 27, 0.35)'
              }}
            >
              <Phone style={{ width: '14px', height: '14px', flexShrink: 0 }} />
              <span>Call Helpline (+91 9204123453)</span>
            </a>
          </div>

          {/* Column 2: Quick Navigation (lg:col-span-2) */}
          <div className="sp-footer-col-nav">
            <h4 className="sp-footer-heading" style={{ color: '#FAF6F0' }}>
              ACADEMY
            </h4>
            <ul className="sp-footer-links list-none p-0 m-0" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('landing')}
                  className="sp-footer-link-btn"
                  style={{ color: '#B8A5AA' }}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn"
                  style={{ color: '#B8A5AA' }}
                >
                  All Courses
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('classes')}
                  className="sp-footer-link-btn"
                  style={{ color: '#B8A5AA' }}
                >
                  Batches &amp; Live
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('about')}
                  className="sp-footer-link-btn"
                  style={{ color: '#B8A5AA' }}
                >
                  About Shadab Sir
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('dashboard')}
                  className="sp-footer-link-btn"
                  style={{ color: '#B8A5AA' }}
                >
                  Candidate Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Target Exams & Diplomas (lg:col-span-3) */}
          <div className="sp-footer-col-programs">
            <h4 className="sp-footer-heading" style={{ color: '#FAF6F0' }}>
              PROGRAMS &amp; EXAMS
            </h4>
            <ul className="sp-footer-links list-none p-0 m-0" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn"
                  style={{ color: '#B8A5AA' }}
                >
                  SSC Stenographer Grade C &amp; D
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn"
                  style={{ color: '#B8A5AA' }}
                >
                  High Court &amp; Supreme Court PA/SPA
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn"
                  style={{ color: '#B8A5AA' }}
                >
                  BSF &amp; CRPF ASI Stenographer
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn"
                  style={{ color: '#B8A5AA' }}
                >
                  Hindi (Kruti Dev / Mangal) &amp; English Typing
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('classes')}
                  className="sp-footer-link-btn"
                  style={{ color: '#B8A5AA' }}
                >
                  DCA, ADCA, PGDCA &amp; Tally Prime
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Gaya Center & Timings (lg:col-span-3) */}
          <div className="sp-footer-col-center">
            <h4 className="sp-footer-heading" style={{ color: '#FAF6F0' }}>
              GAYA CENTER
            </h4>
            <ul className="sp-footer-contact-list list-none p-0 m-0" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li className="sp-footer-contact-item" style={{ color: '#CBBCC0' }}>
                <MapPin className="sp-footer-contact-icon" style={{ color: '#A89397' }} />
                <span>Gaya College More, Opposite Cyber Thana, Gayaji, Bihar</span>
              </li>
              <li className="sp-footer-contact-item" style={{ color: '#CBBCC0' }}>
                <Phone className="sp-footer-contact-icon" style={{ color: '#A89397' }} />
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>+91 7870377214 / +91 9204123453</span>
              </li>
              <li className="sp-footer-contact-item" style={{ color: '#CBBCC0' }}>
                <Mail className="sp-footer-contact-icon" style={{ color: '#A89397' }} />
                <a 
                  href="mailto:stenoplus.in@gmail.com" 
                  className="sp-footer-email-link"
                  style={{ color: '#CBBCC0' }}
                >
                  stenoplus.in@gmail.com
                </a>
              </li>
              <li className="sp-footer-contact-item" style={{ color: '#CBBCC0' }}>
                <Clock className="sp-footer-contact-icon" style={{ color: '#A89397' }} />
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>6:00 AM – 11:00 AM &amp; 3:00 PM – 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Clean Unified Bottom Bar */}
        <div 
          className="sp-footer-bottom" 
          style={{ 
            borderTop: '1px solid #3A2329', 
            color: '#A89397' 
          }}
        >
          
          {/* Left: Copyright */}
          <p className="sp-footer-copyright" style={{ color: '#A89397' }}>
            &copy; {currentYear} Shorthand Plus (Gaya Shorthand Classes &middot; stenoplus.in). All rights reserved.
          </p>

          {/* Right: Legal & Staff Access */}
          <div className="sp-footer-legal-group">
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="sp-footer-legal-btn"
              style={{ color: '#CBBCC0' }}
            >
              Terms
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="sp-footer-legal-btn"
              style={{ color: '#CBBCC0' }}
            >
              Privacy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('refund')}
              className="sp-footer-legal-btn"
              style={{ color: '#CBBCC0' }}
            >
              Refund Policy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('contact')}
              className="sp-footer-legal-btn"
              style={{ color: '#CBBCC0' }}
            >
              Grievance &amp; Support
            </button>

            <span className="sp-footer-divider" style={{ background: '#3A2329' }} />

            <button 
              type="button"
              onClick={() => handleNav('admin')}
              className="sp-footer-staff-btn"
              style={{ color: '#CBBCC0' }}
              title="Authorized Faculty & Director Login Only (PIN Protected)"
            >
              <Lock className="sp-footer-lock-icon" style={{ color: '#A89397' }} />
              <span>Staff Access</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}