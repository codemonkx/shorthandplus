import React, { useState } from 'react';
import { MessageCircle, Phone, X, Sparkles, FileText, ChevronUp } from 'lucide-react';

export default function FloatingContactDock() {
  const [showCallMenu, setShowCallMenu] = useState(false);

  return (
    <aside 
      className="floating-contact-dock" 
      aria-label="Quick Contact & Helpline Assistance"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Call Menu Popover */}
      {showCallMenu && (
        <div 
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0,0,0,0.06)',
            padding: '14px 16px',
            border: '1px solid #e7e5e4',
            marginBottom: '4px',
            width: '270px',
            animation: 'fadeInUp 0.2s ease-out'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#d97706' }}>
              Institute Helplines
            </span>
            <button 
              onClick={() => setShowCallMenu(false)}
              aria-label="Close Call Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716c', padding: 2 }}
            >
              <X size={15} />
            </button>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#44403c', margin: '0 0 10px', lineHeight: 1.35 }}>
            Direct helpline for admissions & guidance:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a 
              href="tel:+919204123453"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                background: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: '8px',
                color: '#92400e',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none'
              }}
            >
              <Phone size={15} color="#d97706" />
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#b45309', fontWeight: 600 }}>Director (Shadab Sir)</span>
                <span>+91 9204123453</span>
              </div>
            </a>
            <a 
              href="tel:+917870377214"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                background: '#faf9f6',
                border: '1px solid #e7e5e4',
                borderRadius: '8px',
                color: '#1c1917',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none'
              }}
            >
              <Phone size={15} color="#78716c" />
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#78716c', fontWeight: 600 }}>Admissions Helpline</span>
                <span>+91 7870377214</span>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Buttons Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        
        {/* Direct Call Button */}
        <button
          onClick={() => setShowCallMenu(!showCallMenu)}
          aria-label="Direct Call Helpline"
          title="Direct Call Helpline (+91 9204123453 / 7870377214)"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: '#ffffff',
            color: '#d97706',
            border: '1.5px solid #fde68a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.background = '#fef3c7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#ffffff';
          }}
        >
          <Phone size={20} />
        </button>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/919204123453?text=Hello%20Gaya%20Shorthand%20Classes,%20I%20want%20to%20inquire%20about%20Shorthand%20and%20Typing%20courses%20and%20admission."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp (+91 9204123453)"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: '#25D366',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(37, 211, 102, 0.4)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(37, 211, 102, 0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(37, 211, 102, 0.4)';
          }}
        >
          <MessageCircle size={28} />
          {/* Active online green dot */}
          <span 
            style={{
              position: 'absolute',
              top: '1px',
              right: '1px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '2px solid #25D366'
            }}
          />
        </a>

      </div>
    </aside>
  );
}

