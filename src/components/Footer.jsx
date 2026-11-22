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
    <footer className="sp-footer clean-footer-wrapper bg-[#18181B] text-zinc-400 border-t border-zinc-800">
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
              <div className="sp-footer-logo-wrap" style={{ width: '32px', height: '32px', overflow: 'hidden' }}>
                <img 
                  src="/assets/logo-big-s.png" 
                  alt="Shorthand Plus" 
                  className="sp-footer-logo-img"
                  style={{ height: '32px', width: '32px', maxHeight: '32px', maxWidth: '32px', objectFit: 'contain' }}
                />
              </div>
              <div>
                <span className="sp-footer-brand-name text-white font-bold">
                  SHORTHAND PLUS
                </span>
                <span className="sp-footer-brand-sub text-zinc-400">
                  Gaya Shorthand Classes &middot; Est. 2012
                </span>
              </div>
            </div>

            <p className="sp-footer-summary text-zinc-400">
              Guided by Shadab Sir (12+ Years Experience). Offline &amp; live online coaching for Pitman Shorthand (50–140 WPM), bilingual typing, and government computer diplomas.
            </p>

            <a 
              href="tel:+919204123453"
              className="sp-footer-helpline-btn bg-white text-zinc-950 hover:bg-zinc-200 px-4 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Phone style={{ width: '14px', height: '14px', flexShrink: 0 }} className="text-zinc-950" />
              <span>Call Helpline &middot; +91 9204123453</span>
            </a>
          </div>

          {/* Column 2: Quick Navigation (lg:col-span-2) */}
          <div className="sp-footer-col-nav">
            <h4 className="sp-footer-heading text-white font-semibold">
              ACADEMY
            </h4>
            <ul className="sp-footer-links">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('landing')}
                  className="sp-footer-link-btn text-zinc-400 hover:text-white"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn text-zinc-400 hover:text-white"
                >
                  All Courses
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('classes')}
                  className="sp-footer-link-btn text-zinc-400 hover:text-white"
                >
                  Batches &amp; Live
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('about')}
                  className="sp-footer-link-btn text-zinc-400 hover:text-white"
                >
                  About Shadab Sir
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('dashboard')}
                  className="sp-footer-link-btn text-zinc-400 hover:text-white"
                >
                  Candidate Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Target Exams & Diplomas (lg:col-span-3) */}
          <div className="sp-footer-col-programs">
            <h4 className="sp-footer-heading text-white font-semibold">
              PROGRAMS &amp; EXAMS
            </h4>
            <ul className="sp-footer-links">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn text-zinc-400 hover:text-white"
                >
                  SSC Stenographer Grade C &amp; D
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn text-zinc-400 hover:text-white"
                >
                  High Court &amp; Supreme Court PA/SPA
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn text-zinc-400 hover:text-white"
                >
                  BSF &amp; CRPF ASI Stenographer
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn text-zinc-400 hover:text-white"
                >
                  Hindi (Kruti Dev / Mangal) &amp; English Typing
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('classes')}
                  className="sp-footer-link-btn text-zinc-400 hover:text-white"
                >
                  DCA, ADCA, PGDCA &amp; Tally Prime
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Gaya Center & Timings (lg:col-span-3) */}
          <div className="sp-footer-col-center">
            <h4 className="sp-footer-heading text-white font-semibold">
              GAYA CENTER
            </h4>
            <ul className="sp-footer-contact-list">
              <li className="sp-footer-contact-item text-zinc-400">
                <MapPin className="sp-footer-contact-icon text-zinc-500" />
                <span>Gaya College More, Opposite Cyber Thana, Gayaji, Bihar</span>
              </li>
              <li className="sp-footer-contact-item text-zinc-400">
                <Phone className="sp-footer-contact-icon text-zinc-500" />
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>+91 7870377214 / +91 9204123453</span>
              </li>
              <li className="sp-footer-contact-item text-zinc-400">
                <Mail className="sp-footer-contact-icon text-zinc-500" />
                <a 
                  href="mailto:stenoplus.in@gmail.com" 
                  className="sp-footer-email-link text-zinc-400 hover:text-white"
                >
                  stenoplus.in@gmail.com
                </a>
              </li>
              <li className="sp-footer-contact-item text-zinc-400">
                <Clock className="sp-footer-contact-icon text-zinc-500" />
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>6:00 AM – 11:00 AM &amp; 3:00 PM – 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Clean Unified Bottom Bar */}
        <div className="sp-footer-bottom border-t border-zinc-800 text-zinc-500">
          
          {/* Left: Copyright */}
          <p className="sp-footer-copyright text-zinc-500">
            &copy; {currentYear} Shorthand Plus (Gaya Shorthand Classes &middot; stenoplus.in). All rights reserved.
          </p>

          {/* Right: Legal & Staff Access */}
          <div className="sp-footer-legal-group">
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="sp-footer-legal-btn text-zinc-400 hover:text-white"
            >
              Terms
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="sp-footer-legal-btn text-zinc-400 hover:text-white"
            >
              Privacy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('refund')}
              className="sp-footer-legal-btn text-zinc-400 hover:text-white"
            >
              Refund Policy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('contact')}
              className="sp-footer-legal-btn text-zinc-400 hover:text-white"
            >
              Grievance &amp; Support
            </button>

            <span className="sp-footer-divider bg-zinc-800" />

            <button 
              type="button"
              onClick={() => handleNav('admin')}
              className="sp-footer-staff-btn text-zinc-300 hover:text-white"
              title="Authorized Faculty & Director Login Only (PIN Protected)"
            >
              <Lock className="sp-footer-lock-icon text-zinc-400" />
              <span>Staff Access</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
