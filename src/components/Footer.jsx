import React from 'react';
import { Phone, Mail, MapPin, Clock, Lock } from 'lucide-react';

export default function Footer({ onOpenCheckout, setCurrentTab, onOpenLegal }) {
  const currentYear = new Date().getFullYear();

  const handleNav = (tab) => {
    if (setCurrentTab) {
      setCurrentTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="clean-footer-wrapper bg-[#FAFAFA] border-t border-slate-200 text-slate-600 font-sans">
      <div className="clean-footer-container max-w-7xl mx-auto px-6 pt-16 pb-10">
        
        {/* Main 12-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
          
          {/* Column 1: Brand & Legacy (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit"
              onClick={() => handleNav('landing')}
              role="button"
              tabIndex={0}
            >
              <img 
                src="/assets/logo-big-s.png" 
                alt="Shorthand Plus" 
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div>
                <span className="block text-sm font-bold tracking-tight text-slate-900 leading-none">
                  SHORTHAND PLUS
                </span>
                <span className="block text-[11px] font-medium text-slate-500 mt-1">
                  Gaya Shorthand Classes · Est. 2012
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 max-w-xs">
              Guided by Shadab Sir (12+ Years Experience). Offline &amp; live online coaching for Pitman Shorthand (50–140 WPM), bilingual typing, and government computer diplomas.
            </p>

            <a 
              href="tel:+919204123453"
              className="mt-6 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2.5 rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors w-fit shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Helpline · +91 9204123453</span>
            </a>
          </div>

          {/* Column 2: Quick Navigation (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-900 mb-4">
              ACADEMY
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 list-none p-0 m-0">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('landing')}
                  className="text-left text-sm text-slate-600 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="text-left text-sm text-slate-600 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
                >
                  All Courses
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('classes')}
                  className="text-left text-sm text-slate-600 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
                >
                  Batches &amp; Live
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('about')}
                  className="text-left text-sm text-slate-600 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
                >
                  About Shadab Sir
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('dashboard')}
                  className="text-left text-sm text-slate-600 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
                >
                  Candidate Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Target Exams & Diplomas (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-900 mb-4">
              PROGRAMS &amp; EXAMS
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 list-none p-0 m-0">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="text-left text-sm text-slate-600 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
                >
                  SSC Stenographer Grade C &amp; D
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="text-left text-sm text-slate-600 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
                >
                  High Court &amp; Supreme Court PA/SPA
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="text-left text-sm text-slate-600 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
                >
                  BSF &amp; CRPF ASI Stenographer
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('courses')}
                  className="text-left text-sm text-slate-600 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
                >
                  Hindi (Kruti Dev / Mangal) &amp; English Typing
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNav('classes')}
                  className="text-left text-sm text-slate-600 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
                >
                  DCA, ADCA, PGDCA &amp; Tally Prime
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Gaya Center & Timings (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-900 mb-4">
              GAYA CENTER
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 list-none p-0 m-0">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <span className="leading-snug">Gaya College More, Opposite Cyber Thana, Gayaji, Bihar</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <span className="tabular-nums">+91 7870377214 / +91 9204123453</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <a 
                  href="mailto:stenoplus.in@gmail.com" 
                  className="hover:text-slate-900 transition-colors text-slate-600 no-underline"
                >
                  stenoplus.in@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <span className="tabular-nums">6:00 AM – 11:00 AM &amp; 3:00 PM – 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Clean Unified Bottom Bar */}
        <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-500 font-sans">
          
          {/* Left: Copyright */}
          <p className="m-0 leading-normal">
            &copy; {currentYear} Shorthand Plus (Gaya Shorthand Classes &middot; stenoplus.in). All rights reserved.
          </p>

          {/* Right: Legal & Staff Access */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
            >
              Terms
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
            >
              Privacy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('refund')}
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
            >
              Refund Policy
            </button>
            <button 
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('contact')}
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
            >
              Grievance &amp; Support
            </button>

            <span className="h-3 w-px bg-slate-300 hidden sm:inline-block" />

            <button 
              type="button"
              onClick={() => handleNav('admin')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors p-0 bg-transparent border-0 cursor-pointer font-sans"
              title="Authorized Faculty & Director Login Only (PIN Protected)"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Staff Access</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
