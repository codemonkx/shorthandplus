import React, { useState } from 'react';
import { X, Keyboard, Search, Sparkles, BookOpen, ExternalLink, Copy, Check } from 'lucide-react';

export default function HindiKeyboardModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('kruti'); // 'kruti' | 'mangal'
  const [copiedCode, setCopiedCode] = useState(null);
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const krutiAltCodes = [
    { char: 'क्र', code: 'd + z', desc: 'Kra (Half Ka + Ra)' },
    { char: 'प्र', code: 'i + z', desc: 'Pra (Pa + Paden Ra)' },
    { char: 'त्र', code: 'Alt + 0216', desc: 'Tra (Ta + Ra conjunct)' },
    { char: 'श्र', code: 'Alt + 0217', desc: 'Shra (Sha + Ra)' },
    { char: 'द्व', code: 'Alt + 0228', desc: 'Dwa (Da + Va conjunct)' },
    { char: 'द्य', code: 'Alt + 0229', desc: 'Dya (Vidya/Vidhyalay)' },
    { char: 'द्ध', code: 'Alt + 0227', desc: 'Ddha (Buddha/Shuddha)' },
    { char: 'द्ग', code: 'Alt + 0226', desc: 'Dga (Udgama)' },
    { char: 'ह्न', code: 'Alt + 0224', desc: 'Hna (Chinha)' },
    { char: 'ह्ल', code: 'Alt + 0225', desc: 'Hla (Aahlaad)' },
    { char: 'ऋ', code: 'Alt + 0210', desc: 'Rishi (Vowel Ri)' },
    { char: 'क्त', code: 'Alt + 0214', desc: 'Kta (Bhakti/Rakta)' },
    { char: 'ट्ट', code: 'Alt + 0199', desc: 'Tta (Patta/Khatta)' },
    { char: 'ठ्ठ', code: 'Alt + 0200', desc: 'Th-tha (Chittha)' },
    { char: 'ड्ड', code: 'Alt + 0201', desc: 'Dda (Gudda)' },
    { char: 'ड्ढ', code: 'Alt + 0202', desc: 'Ddha (Buddh)' },
    { char: '“', code: 'Alt + 0147', desc: 'Opening double inverted quote' },
    { char: '”', code: 'Alt + 0148', desc: 'Closing double inverted quote' },
    { char: '‘', code: 'Alt + 0145', desc: 'Opening single quote' },
    { char: '’', code: 'Alt + 0146', desc: 'Closing single quote' },
    { char: '!', code: 'Alt + 033', desc: 'Exclamation mark' },
    { char: '—', code: 'Alt + 0151', desc: 'Em-dash / Hyphen' },
    { char: '?', code: 'Shift + /', desc: 'Question mark' },
    { char: '।', code: 'Shift + A', desc: 'Poorna viraam (Full stop)' },
  ];

  const mangalShortcuts = [
    { char: 'अ / आ', keys: 'Shift+D / E', desc: 'Basic vowels' },
    { char: 'इ / ई', keys: 'F / R', desc: 'Chhoti / Badi Ee' },
    { char: 'उ / ऊ', keys: 'G / T', desc: 'Chhota / Bada Oo' },
    { char: 'ए / ऐ', keys: 'S / W', desc: 'Ay / Aye' },
    { char: 'क / ख', keys: 'K / Shift+K', desc: 'Ka / Kha' },
    { char: 'ग / घ', keys: 'I / Shift+I', desc: 'Ga / Gha' },
    { char: 'च / छ', keys: '; / Shift+;', desc: 'Cha / Chha' },
    { char: 'ज / झ', keys: 'P / Shift+P', desc: 'Ja / Jha' },
    { char: 'ट / ठ', keys: '\' / Shift+\'', desc: 'Ta / Tha' },
    { char: 'ड / ढ', keys: '[ / Shift+[', desc: 'Da / Dha' },
    { char: 'त / थ', keys: 'L / Shift+L', desc: 'Ta / Tha' },
    { char: 'द / ध', keys: 'O / Shift+O', desc: 'Da / Dha' },
    { char: 'न / म', keys: 'V / C', desc: 'Na / Ma' },
    { char: 'प / फ', keys: 'H / Shift+H', desc: 'Pa / Pha' },
    { char: 'ब / भ', keys: 'Y / Shift+Y', desc: 'Ba / Bha' },
    { char: 'य / र', keys: '/ / J', desc: 'Ya / Ra' },
    { char: 'ल / व', keys: 'N / B', desc: 'La / Va' },
    { char: 'श / ष / स', keys: 'M / Shift+, / M', desc: 'Sha / Sha / Sa' },
    { char: '् (हलन्त)', keys: 'D', desc: 'Halant for half characters' },
    { char: 'ा (मात्रा)', keys: 'E', desc: 'Aa ki Matra' },
    { char: 'ि / ी', keys: 'F / R', desc: 'Ee ki Matra' },
    { char: 'ु / ू', keys: 'G / T', desc: 'Oo ki Matra' },
  ];

  const filteredKruti = krutiAltCodes.filter(item => 
    item.char.includes(search) || 
    item.code.toLowerCase().includes(search.toLowerCase()) || 
    item.desc.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMangal = mangalShortcuts.filter(item => 
    item.char.includes(search) || 
    item.keys.toLowerCase().includes(search.toLowerCase()) || 
    item.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (code) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.15s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '740px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 48px -12px rgba(15, 23, 42, 0.25)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#F8FAFC'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: '#0F172A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Keyboard size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                Hindi Typing Layout Reference & Alt-Codes
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748B' }}>
                Official SSC & High Court typing examination keyboard keymap
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '6px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' }}>
            <button
              onClick={() => setActiveTab('kruti')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.86rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: activeTab === 'kruti' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'kruti' ? '#0F172A' : '#64748B',
                boxShadow: activeTab === 'kruti' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              Kruti Dev 010 (Alt-Codes)
            </button>
            <button
              onClick={() => setActiveTab('mangal')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.86rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: activeTab === 'mangal' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'mangal' ? '#0F172A' : '#64748B',
                boxShadow: activeTab === 'mangal' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              Mangal (Inscript Keymap)
            </button>
          </div>

          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={15} style={{ position: 'absolute', left: 10, top: 10, color: '#94A3B8' }} />
            <input 
              type="text"
              placeholder="Search letter or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px 6px 32px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.84rem'
              }}
            />
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'kruti' ? (
            <div>
              <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', fontSize: '0.82rem', color: '#1E40AF' }}>
                💡 <strong>How to type Alt-Codes:</strong> Hold the <kbd style={{ padding: '2px 5px', background: '#fff', borderRadius: '4px', border: '1px solid #93C5FD' }}>Alt</kbd> key down, type the 4-digit code on the <strong>Number Pad</strong>, then release <kbd style={{ padding: '2px 5px', background: '#fff', borderRadius: '4px', border: '1px solid #93C5FD' }}>Alt</kbd>.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {filteredKruti.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleCopy(item.code)}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '0.75rem 0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0F172A'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                          {item.char}
                        </span>
                        <code style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2563EB', background: '#DBEAFE', padding: '2px 6px', borderRadius: '4px' }}>
                          {item.code}
                        </code>
                      </div>
                      <span style={{ fontSize: '0.74rem', color: '#64748B', display: 'block', marginTop: '2px' }}>
                        {item.desc}
                      </span>
                    </div>
                    {copiedCode === item.code ? (
                      <Check size={14} color="#059669" />
                    ) : (
                      <Copy size={13} color="#94A3B8" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', fontSize: '0.82rem', color: '#065F46' }}>
                💡 <strong>Mangal Inscript Rules:</strong> Type consonants with right hand, vowels with left hand. To form half-letters, press <kbd style={{ padding: '2px 5px', background: '#fff', borderRadius: '4px', border: '1px solid #6EE7B7' }}>D</kbd> (Halant) between two consonants.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {filteredMangal.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '0.75rem 0.9rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                        {item.char}
                      </span>
                      <code style={{ fontSize: '0.84rem', fontWeight: 700, color: '#059669', background: '#D1FAE5', padding: '2px 6px', borderRadius: '4px' }}>
                        {item.keys}
                      </code>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#64748B', display: 'block', marginTop: '2px' }}>
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '0.85rem 1.5rem', borderTop: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}

