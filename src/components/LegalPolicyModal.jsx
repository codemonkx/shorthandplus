import React, { useState } from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Mail, Phone, MapPin, Building, Award, CheckCircle2 } from 'lucide-react';

export default function LegalPolicyModal({ isOpen, onClose, initialTab = 'terms' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" style={{ zIndex: 9999 }}>
      <div 
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl overflow-hidden shadow-2xl"
        style={{ background: '#FAF9F6', border: '1px solid #E7E5E4' }}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b" style={{ background: '#FFFFFF', borderColor: '#E7E5E4' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ background: '#1C1917' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold" style={{ color: '#1C1917' }}>Academy Legal Policies & Compliance</h2>
              <p className="text-xs" style={{ color: '#78716C' }}>Gaya Shorthand Classes • Shorthand Plus Portal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: '#78716C', background: '#F5F5F4' }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b px-6 gap-2" style={{ background: '#FAF9F6', borderColor: '#E7E5E4' }}>
          {[
            { id: 'terms', label: 'Terms & Conditions', icon: FileText },
            { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
            { id: 'refund', label: 'Refund & Cancellation', icon: RefreshCw },
            { id: 'contact', label: 'Contact & Grievance', icon: Mail },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
                  isActive ? 'border-amber-600 text-stone-900' : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
                style={{
                  borderBottomColor: isActive ? '#D97706' : 'transparent',
                  color: isActive ? '#1C1917' : '#78716C'
                }}
              >
                <Icon size={14} className={isActive ? 'text-amber-600' : ''} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 text-xs leading-relaxed space-y-4" style={{ color: '#44403C' }}>
          
          {/* 1. TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">1. Acceptance of Terms</h3>
              <p>
                By accessing, registering, or enrolling in any mock examination or diploma batch on Shorthand Plus (operated by Gaya Shorthand Classes, Gaya, Bihar), you agree to be bound by these Terms and Conditions and our Academic Examination Guidelines.
              </p>

              <h3 className="text-sm font-bold text-stone-900">2. Student User Accounts & Security</h3>
              <p>
                Each candidate is assigned a unique Roll Number (e.g., SP-2026-XXX). You are solely responsible for maintaining the confidentiality of your credentials and password. Unauthorized account sharing, scraping of audio dictations, or redistribution of copyrighted examination passages is strictly prohibited and subject to immediate account termination without refund.
              </p>

              <h3 className="text-sm font-bold text-stone-900">3. Examination Conduct & Anti-Cheating Protocol</h3>
              <p>
                All typing and stenography examinations are evaluated strictly under official SSC and High Court rules. Browser tab-switching proctoring and backspace lock constraints are enforced during official timed mocks to simulate real government examination conditions.
              </p>

              <h3 className="text-sm font-bold text-stone-900">4. Intellectual Property</h3>
              <p>
                All voice recordings, customized shorthand outlines, legal phrasing compilations, and PDF evaluation dossiers remain the exclusive intellectual property of Gaya Shorthand Classes.
              </p>
            </div>
          )}

          {/* 2. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">1. Information We Collect</h3>
              <p>
                We collect your name, email address, chosen shorthand medium (English / Hindi Kruti Dev / Mangal), state of residence, exam speed results, and payment reference IDs for pass activation and official certificate verification.
              </p>

              <h3 className="text-sm font-bold text-stone-900">2. Use of Information</h3>
              <p>
                Your personal details are used strictly to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Generate your government-standard Roll Number and certificate records.</li>
                <li>Dispatch password reset OTP verification codes directly to your registered student email.</li>
                <li>Calculate national mock test leaderboards and speed percentile rankings.</li>
              </ul>

              <h3 className="text-sm font-bold text-stone-900">3. Data Security & Storage</h3>
              <p>
                Passwords are encrypted using industry-standard salted <code>bcrypt</code> hashing. All network transactions utilize 256-bit TLS/SSL encryption. We do not store sensitive card or UPI credentials on our servers; payments are processed securely via RBI-compliant gateway partners (Razorpay).
              </p>

              <h3 className="text-sm font-bold text-stone-900">4. No Data Reselling</h3>
              <p>
                Gaya Shorthand Classes will never sell, rent, or lease candidate contact details to third-party marketing agencies.
              </p>
            </div>
          )}

          {/* 3. REFUND & CANCELLATION POLICY */}
          {activeTab === 'refund' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg border flex items-start gap-3" style={{ background: '#FEF3C7', borderColor: '#FDE68A', color: '#92400E' }}>
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs font-bold">Transparent 7-Day Free Trial & Purchase Assurance</strong>
                  <span className="text-xs">
                    Every new registered candidate receives 7 days of unrestricted access to sample dictations before choosing a subscription pass.
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-stone-900">1. Digital Pass Activations</h3>
              <p>
                Due to the instantaneous digital activation of dictation audio files, question banks, and server transcription evaluation resources upon payment, subscriptions are generally non-refundable once significant mock tests have been consumed.
              </p>

              <h3 className="text-sm font-bold text-stone-900">2. Technical Failure Refunds</h3>
              <p>
                If an amount is debited from your account due to a payment gateway timeout or multiple billing for the same plan, the duplicate transaction will be refunded automatically to your original payment method within 5–7 business days.
              </p>

              <h3 className="text-sm font-bold text-stone-900">3. How to Request a Billing Review</h3>
              <p>
                If you encounter any billing discrepancy, please write to <strong>stenoplus.in@gmail.com</strong> with your registered Roll Number and Razorpay Transaction ID within 48 hours of payment.
              </p>
            </div>
          )}

          {/* 4. CONTACT & GRIEVANCE REDRESSAL */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">Academy Operational Headquarters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border space-y-2" style={{ background: '#FFFFFF', borderColor: '#E7E5E4' }}>
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <MapPin size={16} className="text-amber-600" />
                    <span>Physical Center & Online Portal</span>
                  </div>
                  <p className="text-stone-600">
                    SHORTHAND PLUS (Gaya Shorthand Classes)<br />
                    Gaya College More, Opp. Cyber Thana<br />
                    Gaya, Bihar, India<br />
                    Portal: <a href="https://stenoplus.in" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline font-semibold">https://stenoplus.in</a>
                  </p>
                </div>

                <div className="p-4 rounded-lg border space-y-2" style={{ background: '#FFFFFF', borderColor: '#E7E5E4' }}>
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <Phone size={16} className="text-amber-600" />
                    <span>Direct Helpline & Email</span>
                  </div>
                  <p className="text-stone-600">
                    Helpline No.: +91 9204123453<br />
                    Email: <a href="mailto:stenoplus.in@gmail.com" className="text-amber-700 underline">stenoplus.in@gmail.com</a><br />
                    Timing: 6:00 AM – 8:00 PM Daily (Monday to Saturday)
                  </p>
                </div>
              </div>

              <h3 className="text-sm font-bold text-stone-900">Grievance Officer (IT Rules Compliance)</h3>
              <p>
                In accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021, the designated Grievance Officer for SHORTHAND PLUS is:
              </p>
              <div className="p-3 rounded-lg border" style={{ background: '#F5F5F4', borderColor: '#E7E5E4' }}>
                <p className="font-semibold text-stone-900">Grievance Officer: Faculty Director Desk</p>
                <p>Email: <a href="mailto:stenoplus.in@gmail.com" className="text-amber-700 underline">stenoplus.in@gmail.com</a></p>
                <p>Website: <a href="https://stenoplus.in" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline">https://stenoplus.in</a></p>
                <p>Response Time: Within 24–48 working hours.</p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t flex justify-end" style={{ background: '#FFFFFF', borderColor: '#E7E5E4' }}>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#1C1917' }}
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
}

