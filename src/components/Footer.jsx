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
    <footer className="sp-footer clean-footer-wrapper bg-[#16161A] text-[#A1A1AA] border-t border-[#27272A]">
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
                <span className="sp-footer-brand-name text-[#F5F3EE] font-bold">
                  SHORTHAND PLUS
                </span>
                <span className="sp-footer-brand-sub text-[#A1A1AA]">
                  Gaya Shorthand Classes &middot; Est. 2012
                </span>
              </div>
            </div>

            <p className="sp-footer-summary text-[#A1A1AA]">
              Guided by Shadab Sir (12+ Years Experience). Offline &amp; live online coaching for Pitman Shorthand (50–140 WPM), bilingual typing, and government computer diplomas.
            </p>

            <a 
              href="tel:+919204123453"
              className="sp-footer-helpline-btn bg-[#B91C1C] text-white hover:bg-[#991B1B] px-4 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <Phone style={{ width: '14px', height: '14px', flexShrink: 0 }} className="text-white" />
              <span>Call Helpline &middot; +91 9204123453</span>
            </a>
          </div>

          {/* Column 2: Quick Navigation (lg:col-span-2) */}
          <div className="sp-footer-col-nav">
            <h4 className="sp-footer-heading text-[#F5F3EE] font-semibold">
              ACADEMY
            </h4>
            <ul className="sp-footer-links list-none p-0 m-0" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('landing')}
                  className="sp-footer-link-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  All Courses
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('classes')}
                  className="sp-footer-link-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  Batches &amp; Live
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('about')}
                  className="sp-footer-link-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  About Shadab Sir
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('dashboard')}
                  className="sp-footer-link-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  Candidate Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Target Exams & Diplomas (lg:col-span-3) */}
          <div className="sp-footer-col-programs">
            <h4 className="sp-footer-heading text-[#F5F3EE] font-semibold">
              PROGRAMS &amp; EXAMS
            </h4>
            <ul className="sp-footer-links list-none p-0 m-0" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  SSC Stenographer Grade C &amp; D
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  High Court &amp; Supreme Court PA/SPA
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  BSF &amp; CRPF ASI Stenographer
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="sp-footer-link-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  Hindi (Kruti Dev / Mangal) &amp; English Typing
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('classes')}
                  className="sp-footer-link-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  DCA, ADCA, PGDCA &amp; Tally Prime
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Gaya Center & Timings (lg:col-span-3) */}
          <div className="sp-footer-col-center">
            <h4 className="sp-footer-heading text-[#F5F3EE] font-semibold">
              GAYA CENTER
            </h4>
            <ul className="sp-footer-contact-list list-none p-0 m-0" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li className="sp-footer-contact-item text-[#A1A1AA]">
                <MapPin className="sp-footer-contact-icon text-[#71717A]" />
                <span>Gaya College More, Opposite Cyber Thana, Gayaji, Bihar</span>
              </li>
              <li className="sp-footer-contact-item text-[#A1A1AA]">
                <Phone className="sp-footer-contact-icon text-[#71717A]" />
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>+91 7870377214 / +91 9204123453</span>
              </li>
              <li className="sp-footer-contact-item text-[#A1A1AA]">
                <Mail className="sp-footer-contact-icon text-[#71717A]" />
                <a 
                  href="mailto:stenoplus.in@gmail.com" 
                  className="sp-footer-email-link text-[#A1A1AA] hover:text-[#F5F3EE]"
                >
                  stenoplus.in@gmail.com
                </a>
              </li>
              <li className="sp-footer-contact-item text-[#A1A1AA]">
                <Clock className="sp-footer-contact-icon text-[#71717A]" />
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>6:00 AM – 11:00 AM &amp; 3:00 PM – 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Clean Unified Bottom Bar */}
        <div className="sp-footer-bottom border-t border-[#27272A] text-[#71717A]">
          
          {/* Left: Copyright */}
          <p className="sp-footer-copyright text-[#71717A]">
            &copy; {currentYear} Shorthand Plus (Gaya Shorthand Classes &middot; stenoplus.in). All rights reserved.
          </p>

          {/* Right: Legal & Staff Access */}
          <div className="sp-footer-legal-group">
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="sp-footer-legal-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
            >
              Terms
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="sp-footer-legal-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
            >
              Privacy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('refund')}
              className="sp-footer-legal-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
            >
              Refund Policy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('contact')}
              className="sp-footer-legal-btn text-[#A1A1AA] hover:text-[#F5F3EE]"
            >
              Grievance &amp; Support
            </button>

            <span className="sp-footer-divider bg-[#27272A]" />

            <button 
              type="button"
              onClick={() => handleNav('admin')}
              className="sp-footer-staff-btn text-[#D4D4D8] hover:text-white"
              title="Authorized Faculty & Director Login Only (PIN Protected)"
            >
              <Lock className="sp-footer-lock-icon text-[#71717A]" />
              <span>Staff Access</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
