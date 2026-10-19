import React from 'react';
import { Crown, CheckCircle2, Zap, ArrowRight, ShieldCheck, QrCode } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

export default function PricingPassesView({ onSelectPlan, onOpenCheckout }) {
  return (
    <div className="portal-page-container">
      {/* Header Banner */}
      <div className="saas-card page-title-card">
        <div className="title-left">
          <div className="badge-row">
            <span className="badge badge-amber">Instant UPI & QR Code Activation</span>
            <span className="badge badge-emerald">Zero Processing Fees</span>
          </div>
          <h2>Subscription Passes & Test Series Access</h2>
          <p className="page-desc-text">
            Choose the test pass that matches your target exam timeline. All passes include unlimited dictations, backspace lock simulations, and Kruti Dev support.
          </p>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="pricing-cards-grid">
        {PRICING_PLANS.map((plan) => {
          const isPro = plan.popular || plan.id === 'plan-12mo';
          return (
            <div key={plan.id} className={`saas-card pricing-plan-card ${isPro ? 'pro-highlight' : ''}`}>
              {plan.badge && (
                <div className="plan-badge-ribbon">
                  <span className={`badge ${plan.popular ? 'badge-amber' : 'badge-blue'}`}>{plan.badge}</span>
                </div>
              )}
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-desc">{plan.description}</p>
              
              <div className="plan-price-block">
                <span className="currency">₹</span>
                <span className="amount font-mono">{plan.price}</span>
                <span className="duration text-muted">/ {plan.duration}</span>
              </div>

              <div className="plan-divider" />

              <ul className="plan-features-list">
                {plan.features.map((feat, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} className="text-emerald check-feat" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="plan-footer-cta">
                <button 
                  className={`btn ${isPro ? 'btn-primary' : 'btn-secondary'} w-full`}
                  onClick={() => {
                    if (onSelectPlan) onSelectPlan(plan.id);
                    if (onOpenCheckout) onOpenCheckout(plan.id);
                  }}
                >
                  <Crown size={16} className={isPro ? 'text-amber' : ''} />
                  <span>Activate with UPI (₹{plan.price})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
