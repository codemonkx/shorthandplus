import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Zap, 
  QrCode, 
  Smartphone, 
  CreditCard, 
  ArrowRight, 
  Sparkles,
  Lock,
  User,
  Copy,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRICING_PLANS } from '../data/mockData';

export default function CheckoutModal({ isOpen, onClose, selectedPlanId, onActivatePlan }) {
  const [selectedPlan, setSelectedPlan] = useState(
    PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[0]
  );
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activatedSuccess, setActivatedSuccess] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('789');
  const [cardHolder, setCardHolder] = useState('Shadab Khan');

  useEffect(() => {
    if (selectedPlanId) {
      const match = PRICING_PLANS.find(p => p.id === selectedPlanId);
      if (match) setSelectedPlan(match);
    }
  }, [selectedPlanId]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    try {
      navigator.clipboard.writeText('919204123453@paytm');
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } catch {}
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActivatedSuccess(true);
      try {
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.55 },
          colors: ['#881337', '#10b981', '#f59e0b', '#8b5cf6']
        });
      } catch {}
      setTimeout(() => {
        onActivatePlan(selectedPlan);
        onClose();
        setActivatedSuccess(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="checkout-modal-backdrop" onClick={onClose}>
      <div className="checkout-modal-wrapper" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-modal-header">
          <div className="checkout-header-text">
            <span className="checkout-pre-badge">
              <ShieldCheck size={13} className="text-emerald-600 mr-1" />
              Secure 256-Bit Checkout
            </span>
            <h2 className="checkout-modal-title">Upgrade Your Pass</h2>
          </div>
          <button className="checkout-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {activatedSuccess ? (
          <div className="checkout-success-state">
            <div className="success-icon-ring">
              <CheckCircle2 size={44} className="text-emerald-600" />
            </div>
            <h3 className="success-state-title">Subscription Activated!</h3>
            <p className="success-state-desc">
              Your pass for <strong>{selectedPlan.name}</strong> ({selectedPlan.duration}) is now fully active. All drills and mock tests are unlocked.
            </p>
            <span className="success-txn-pill font-mono">
              TXN-{Date.now().toString().slice(-8)} • Verified
            </span>
          </div>
        ) : (
          <div className="checkout-modal-layout">
            {/* Left Column: Plan Selection */}
            <div className="checkout-plans-section">
              <div className="section-header-row">
                <span className="checkout-col-label">1. Select Subscription Tier</span>
              </div>
              <div className="checkout-plans-stack">
                {PRICING_PLANS.map((plan) => {
                  const isSelected = selectedPlan.id === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`checkout-plan-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      <div className="plan-radio-bubble">
                        {isSelected && <div className="plan-radio-dot" />}
                      </div>
                      <div className="plan-meta-col">
                        <div className="plan-title-row">
                          <span className="plan-title-text">{plan.name}</span>
                          {plan.badge && (
                            <span className="plan-tier-badge">{plan.badge}</span>
                          )}
                        </div>
                        <span className="plan-validity-text">{plan.duration}</span>
                      </div>
                      <div className="plan-price-block font-mono">
                        <span className="plan-currency">₹</span>
                        <span className="plan-price-num">{plan.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Payment Gateway & Summary */}
            <div className="checkout-payment-section">
              <div className="section-header-row">
                <span className="checkout-col-label">2. Payment Gateway</span>
              </div>

              {/* Payment Method Switcher */}
              <div className="payment-method-segmented-bar">
                <button
                  type="button"
                  className={`pm-seg-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={15} />
                  <span>Card / NetBanking</span>
                </button>
                <button
                  type="button"
                  className={`pm-seg-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <Smartphone size={15} />
                  <span>UPI & QR</span>
                </button>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="card-input-form-box">
                  <div className="checkout-input-field">
                    <label className="input-field-label">Card Number</label>
                    <div className="input-field-wrapper">
                      <CreditCard size={16} className="input-field-icon" />
                      <input
                        type="text"
                        className="checkout-text-input font-mono"
                        placeholder="4242 •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      <span className="card-type-chip">VISA</span>
                    </div>
                  </div>

                  <div className="checkout-dual-row">
                    <div className="checkout-input-field">
                      <label className="input-field-label">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        className="checkout-text-input font-mono"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div className="checkout-input-field">
                      <label className="input-field-label">CVV / CVC</label>
                      <div className="input-field-wrapper">
                        <Lock size={14} className="input-field-icon" />
                        <input
                          type="password"
                          maxLength={4}
                          className="checkout-text-input font-mono"
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="checkout-input-field">
                    <label className="input-field-label">Cardholder Name</label>
                    <div className="input-field-wrapper">
                      <User size={15} className="input-field-icon" />
                      <input
                        type="text"
                        className="checkout-text-input"
                        placeholder="Name on card"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment View */}
              {paymentMethod === 'upi' && (
                <div className="upi-input-panel-box">
                  <div className="upi-qr-card">
                    <div className="upi-qr-frame">
                      <QrCode size={110} className="qr-svg-view" />
                      <div className="qr-center-zap">
                        <Zap size={18} fill="#881337" className="text-emerald-700" />
                      </div>
                    </div>
                    <span className="upi-scan-hint">Scan with GPay, PhonePe, Paytm or BHIM</span>
                    <button 
                      type="button" 
                      className="upi-id-pill-button"
                      onClick={handleCopyUpi}
                    >
                      <span className="font-mono">919204123453@paytm</span>
                      {copiedUpi ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    </button>
                  </div>
                  <a
                    href={`upi://pay?pa=919204123453@paytm&pn=ShorthandPlus&am=${selectedPlan.price}&cu=INR`}
                    className="btn-launch-upi-direct"
                  >
                    <Smartphone size={15} />
                    <span>Pay via UPI App</span>
                  </a>
                </div>
              )}

              {/* Order Summary Box */}
              <div className="checkout-order-summary-card">
                <div className="order-summary-item-row">
                  <span className="summary-prop-label">Selected Plan</span>
                  <strong className="summary-prop-value">{selectedPlan.name}</strong>
                </div>
                <div className="order-summary-item-row">
                  <span className="summary-prop-label">Validity</span>
                  <span className="summary-badge-pill">{selectedPlan.duration}</span>
                </div>

                <div className="order-summary-line-divider" />

                <div className="order-summary-total-row">
                  <span className="summary-total-label">Total Amount Payable</span>
                  <span className="summary-total-price font-mono">₹{selectedPlan.price}</span>
                </div>

                <button
                  type="button"
                  className="btn-checkout-submit-pay"
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="processing-state-span">
                      <span className="spinner-loader-circle" />
                      Connecting Payment Gateway...
                    </span>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Instant Activate (₹{selectedPlan.price})</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div className="checkout-security-footer">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Instant unblocking • 100% Secure automated activation</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
