import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';
import { TRANSITION_EASE } from './MotionPrimitives';

export default function FloatingContactDock() {
  const [showCallMenu, setShowCallMenu] = useState(false);

  return (
    <motion.aside 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.6, ease: TRANSITION_EASE }}
      className="floating-contact-dock" 
      aria-label="Quick Contact & Helpline Assistance"
      style={{
        position: 'fixed',
        bottom: '1.25rem', // bottom-5
        right: '1.25rem',  // right-5
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.625rem',
        fontFamily: 'var(--sp-font-sans, "Plus Jakarta Sans", system-ui, sans-serif)'
      }}
    >
      {/* Call Menu Popover */}
      <AnimatePresence>
        {showCallMenu && (
          <motion.div 
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: TRANSITION_EASE }}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 12px 36px rgba(35, 20, 24, 0.14), 0 2px 8px rgba(35, 20, 24, 0.04)',
              padding: '14px 16px',
              border: '1px solid #E8DFD3',
              marginBottom: '4px',
              width: '270px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#991B1B' }}>
                Institute Helplines
              </span>
              <button 
                onClick={() => setShowCallMenu(false)}
                aria-label="Close Call Menu"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A7B7E', padding: 2 }}
              >
                <X size={15} />
              </button>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#594A4D', margin: '0 0 10px', lineHeight: 1.35 }}>
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
                  background: '#FBF8F3',
                  border: '1px solid #E8DFD3',
                  borderRadius: '10px',
                  color: '#231418',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textDecoration: 'none'
                }}
              >
                <Phone size={15} color="#991B1B" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.6875rem', color: '#8A7B7E', fontWeight: 600 }}>Director (Shadab Sir)</span>
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
                  border: '1px solid #E8DFD3',
                  borderRadius: '10px',
                  color: '#231418',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textDecoration: 'none'
                }}
              >
                <Phone size={15} color="#231418" />
                <div>
                  <span style={{ display: 'block', fontSize: '0.6875rem', color: '#8A7B7E', fontWeight: 600 }}>Admissions Desk</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>+91 7870377214</span>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        
        {/* Direct Call Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setShowCallMenu(!showCallMenu)}
          aria-label="Direct Call Helpline"
          title="Direct Call Helpline (+91 9204123453 / 7870377214)"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: '#FFFFFF',
            color: '#231418',
            border: '1px solid #E8DFD3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(35, 20, 24, 0.08)',
            cursor: 'pointer'
          }}
        >
          <Phone size={18} />
        </motion.button>

        {/* WhatsApp Floating Button with gentle pulsing ring */}
        <div style={{ position: 'relative' }}>
          <span 
            className="sp-pulse-ring"
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              background: 'rgba(37, 211, 102, 0.35)',
              pointerEvents: 'none',
              animation: 'pulseRing 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite'
            }}
          />
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
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
              boxShadow: '0 4px 20px rgba(37, 211, 102, 0.38)',
              textDecoration: 'none',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1
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
          </motion.a>
        </div>

      </div>
    </motion.aside>
  );
}
