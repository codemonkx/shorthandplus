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
            background: '#FAF7F2',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(17, 17, 17, 0.16), 0 2px 8px rgba(17, 17, 17, 0.06)',
            padding: '14px 16px',
            border: '1.5px solid rgba(17, 17, 17, 0.14)',
            marginBottom: '4px',
            width: '270px',
            animation: 'fadeInUp 0.2s ease-out'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D9541E' }}>
              Institute Helplines
            </span>
            <button 
              onClick={() => setShowCallMenu(false)}
              aria-label="Close Call Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555555', padding: 2 }}
            >
              <X size={15} />
            </button>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#555555', margin: '0 0 10px', lineHeight: 1.35 }}>
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
                background: 'rgba(217, 84, 30, 0.08)',
                border: '1px solid rgba(217, 84, 30, 0.25)',
                borderRadius: '8px',
                color: '#111111',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none'
              }}
            >
              <Phone size={15} color="#D9541E" />
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#D9541E', fontWeight: 700 }}>Director (Shadab Sir)</span>
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
                background: '#EBE5D8',
                border: '1px solid rgba(17, 17, 17, 0.12)',
                borderRadius: '8px',
                color: '#111111',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none'
              }}
            >
              <Phone size={15} color="#111111" />
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: '#555555', fontWeight: 600 }}>Admissions Helpline</span>
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
            background: '#FAF7F2',
            color: '#111111',
            border: '1.5px solid rgba(17, 17, 17, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(17, 17, 17, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.background = '#EBE5D8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#FAF7F2';
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
            background: '#D9541E',
            color: '#FAF7F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(217, 84, 30, 0.35)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(217, 84, 30, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(217, 84, 30, 0.35)';
          }}
        >
          <MessageCircle size={28} />
          {/* Active online dot */}
          <span 
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              background: '#F3EEE3',
              border: '2px solid #D9541E'
            }}
          />
        </a>

      </div>
    </aside>
  );
}

