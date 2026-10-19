import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  GraduationCap, 
  CheckCircle2
} from 'lucide-react';

export default function AboutAcademyView({ onOpenCheckout, setCurrentTab }) {
  return (
    <div className="about-page-wrapper">
      <div className="about-page-container">
        
        {/* Hero Section */}
        <div className="about-hero-header">
          <span className="about-badge-gold">🏛️ ESTABLISHED 2008 • GAYA, BIHAR</span>
          <h1 className="about-hero-title">About Gaya Shorthand Classes</h1>
          <p className="about-hero-subtitle">
            Bihar's premier coaching academy and online examination portal for Stenography (Shorthand) and High-Speed Computer Typing.
          </p>
        </div>

        {/* 2-Column Story Section */}
        <div className="about-story-grid">
          <div className="about-story-card">
            <h2 className="story-card-heading">Our Legacy & Mission</h2>
            <p className="story-card-text">
              Founded over 15 years ago by <strong>Director Gagan Sir</strong>, Gaya Shorthand Classes began with a single vision: to provide government job aspirants across Bihar and Eastern India with the highest quality stenography training at nominal fees.
            </p>
            <p className="story-card-text">
              Over the last decade and a half, our academy has trained more than <strong>10,000+ candidates</strong> who are currently serving as Stenographers and Personal Assistants in the <strong>Supreme Court, Patna High Court, Jharkhand High Court, Rajasthan High Court, Staff Selection Commission (SSC Grade C & D)</strong>, Central Secretariats, and State Assemblies.
            </p>
            <div className="story-stats-row">
              <div className="story-stat-box">
                <span className="stat-big font-mono">15+</span>
                <span className="stat-label">Years Mentoring</span>
              </div>
              <div className="story-stat-box">
                <span className="stat-big font-mono">10,000+</span>
                <span className="stat-label">Govt. Selections</span>
              </div>
              <div className="story-stat-box">
                <span className="stat-big font-mono">1,700+</span>
                <span className="stat-label">Audio Dictations</span>
              </div>
            </div>
          </div>

          <div className="about-director-card">
            <div className="director-badge-header">
              <div className="director-avatar-box">
                <GraduationCap size={28} className="text-white" />
              </div>
              <div>
                <h3 className="director-name">Gagan Sir</h3>
                <p className="director-title">Founder & Head Academic Director</p>
              </div>
            </div>
            <p className="director-quote">
              "Stenography is not just a skill—it is an art of muscle memory, rhythm, and rigorous daily discipline. Our platform bridges the gap between traditional classroom dictation and modern computer-based skill examinations."
            </p>
            <div className="director-highlights-list">
              <div className="highlight-item">
                <CheckCircle2 size={16} className="text-emerald shrink-0" />
                <span>Specialist in Pitman English & Hindi Shorthand (80–140 WPM)</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={16} className="text-emerald shrink-0" />
                <span>Daily handwritten outline verification & speed pacing</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={16} className="text-emerald shrink-0" />
                <span>Direct mentorship for Judicial & High Court recruitments</span>
              </div>
            </div>
            <a 
              href="tel:+919204123453"
              className="btn-director-wa"
              style={{ background: '#881337' }}
            >
              <Phone size={16} />
              <span>Direct Academy Helpline (+91 9204123453)</span>
            </a>
          </div>
        </div>

        {/* Center Location & Timings */}
        <div className="about-contact-banner">
          <div className="contact-banner-grid">
            <div className="contact-info-col">
              <h3 className="contact-box-title">Gaya Center Location & Contact</h3>
              
              <div className="contact-detail-row">
                <MapPin size={18} className="text-royal-blue shrink-0" />
                <div>
                  <strong>Academy Address:</strong>
                  <p>Gaya Shorthand Classes, Near Railway Station / Tower Chowk, Gaya, Bihar - 823001</p>
                </div>
              </div>

              <div className="contact-detail-row">
                <Clock size={18} className="text-royal-blue shrink-0" />
                <div>
                  <strong>Daily Batch Timings:</strong>
                  <p>Morning 6:00 AM – 11:00 AM | Evening 3:00 PM – 8:00 PM (Monday to Saturday)</p>
                </div>
              </div>

              <div className="contact-detail-row">
                <Phone size={18} className="text-royal-blue shrink-0" />
                <div>
                  <strong>Admission Helpline:</strong>
                  <p>+91 9204123453 (Director Office Helpline)</p>
                </div>
              </div>

              <div className="contact-detail-row">
                <Mail size={18} className="text-royal-blue shrink-0" />
                <div>
                  <strong>Official Email:</strong>
                  <p>director@shorthandplus.in / support@shorthandplus.in</p>
                </div>
              </div>
            </div>

            <div className="contact-action-col">
              <div className="visit-booking-card">
                <h4 className="visit-title">Book a Free Classroom Demo</h4>
                <p className="visit-sub">
                  Visit our center in Gaya to attend a free trial dictation session and assess your typing speed.
                </p>
                <a 
                  href="tel:+919204123453"
                  className="btn-book-visit"
                >
                  <Phone size={16} />
                  <span>Call Admission Desk (+91 9204123453)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
