import React from 'react';
import { GraduationCap, ShieldCheck, Award, Phone, Mail, MapPin, Clock, ArrowRight, Lock } from 'lucide-react';

export default function Footer({ onOpenCheckout, setCurrentTab }) {
  return (
    <footer className="clean-footer-wrapper">
      <div className="clean-footer-container">
        <div className="footer-columns-grid">
          
          {/* Column 1: Brand & Institution Overview */}
          <div className="footer-col brand-info-col">
            <div 
              className="footer-brand-title" 
              onClick={() => { setCurrentTab('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ cursor: 'pointer' }}
            >
              <div className="brand-cap-squircle footer-cap-squircle">
                <GraduationCap size={22} color="#ffffff" strokeWidth={2.4} />
              </div>
              <div className="footer-brand-text">
                <span className="brand-h1">Shorthand Plus</span>
                <span className="brand-sub">Gaya Shorthand Classes • Est. 2008</span>
              </div>
            </div>

            <p className="footer-summary-text">
              Bihar's premier stenography and typing coaching institution, preparing aspirants for SSC Stenographer Grade C & D, High Courts, and Central Government Secretariat examinations since 2008.
            </p>

            <div className="footer-trust-chips-row">
              <span className="footer-trust-chip">
                <ShieldCheck size={14} className="text-emerald" />
                <span>SSC & High Court Exam Simulations</span>
              </span>
              <span className="footer-trust-chip">
                <Award size={14} className="text-amber" />
                <span>Govt. Recognized Diplomas</span>
              </span>
            </div>
          </div>

          {/* Column 2: Examination & Practice Rooms */}
          <div className="footer-col">
            <h4 className="footer-heading">Skill Test Rooms</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => { setCurrentTab('tests'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  SSC Steno Audio Dictations (80 & 100 WPM)
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('tests'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Patna High Court Morning Bench Audio
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('tests'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Jharkhand High Court Legal Series
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('tests'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  English QWERTY Typing Studio
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('tests'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Hindi Kruti Dev 010 & Mangal Inscript
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
                  Verified Shorthand Speed Certificate (80-120 WPM)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Gaya Offline Center & Contacts */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Academy Contact</h4>
            <ul className="footer-contact-details">
              <li>
                <MapPin size={16} className="contact-icon text-royal-blue shrink-0" />
                <span>Gaya Shorthand Classes, Near Railway Station / Tower Chowk, Gaya, Bihar - 823001</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon text-royal-blue shrink-0" />
                <span>Official Helpline: +91 9204123453</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon text-royal-blue shrink-0" />
                <span>director@shorthandplus.in</span>
              </li>
              <li>
                <Clock size={16} className="contact-icon text-royal-blue shrink-0" />
                <span>Daily Batches: 6:00 AM – 11:00 AM & 3:00 PM – 8:00 PM</span>
              </li>
            </ul>

            <a 
              href="tel:+919204123453"
              className="footer-director-call-btn"
            >
              <Phone size={15} className="footer-call-pulse-icon" />
              <span>Call Director Helpline (+91 9204123453)</span>
            </a>
          </div>

        </div>

        {/* Bottom Copyright & Verification Strip */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Gaya Shorthand Classes (ShorthandPlus). All rights reserved.
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
