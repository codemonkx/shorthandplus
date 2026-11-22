import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

export default function FloatingContactDock() {
  const [showCallMenu, setShowCallMenu] = useState(false);

  return (
    <aside 
      className="floating-contact-dock fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5" 
      aria-label="Quick Contact & Helpline Assistance"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.625rem',
        fontFamily: 'var(--sp-font-sans, "Plus Jakarta Sans", system-ui, sans-serif)'
      }}
    >
      {/* Call Menu Popover */}
      {showCallMenu && (
        <div 
          style={{
            background: '#FFFFFF',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.16), 0 2px 8px rgba(15, 23, 42, 0.06)',
            padding: '14px 16px',
            border: '1px solid #E2E8F0',
            marginBottom: '4px',
            width: '270px',
            animation: 'fadeInUp 0.2s ease-out'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#B91C1C' }}>
              Institute Helplines
            </span>
            <button 
              onClick={() => setShowCallMenu(false)}
              aria-label="Close Call Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: 2 }}
            >
              <X size={15} />
            </button>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: '0 0 10px', lineHeight: 1.35 }}>
            Direct helpline for admissions &amp; guidance:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a 
              href="tel:+919204123453"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                color: '#0F172A',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}
            >
              <Phone size={15} color="#B91C1C" />
              <div>
                <span style={{ display: 'block', fontSize: '0.6875rem', color: '#64748B', fontWeight: 600 }}>Director (Shadab Sir)</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>+91 9204123453</span>
              </div>
            </a>
            <a 
              href="tel:+917870377214"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                color: '#0F172A',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}
            >
              <Phone size={15} color="#0F172A" />
              <div>
                <span style={{ display: 'block', fontSize: '0.6875rem', color: '#64748B', fontWeight: 600 }}>Admissions Desk</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>+91 7870377214</span>
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
            background: '#FFFFFF',
            color: '#0F172A',
            border: '1px solid #CBD5E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.background = '#F8FAFC';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#FFFFFF';
          }}
        >
          <Phone size={19} />
        </button>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/919204123453?text=Hello%20Gaya%20Shorthand%20Classes,%20I%20want%20to%20inquire%20about%20Shorthand%20and%20Typing%20courses%20and%20admission."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp (+91 9204123453)"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#25D366',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(37, 211, 102, 0.35)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(37, 211, 102, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(37, 211, 102, 0.35)';
          }}
        >
          <MessageCircle size={26} />
          {/* Active online dot */}
          <span 
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '2px solid #25D366'
            }}
          />
        </a>

      </div>
    </aside>
  );
}
