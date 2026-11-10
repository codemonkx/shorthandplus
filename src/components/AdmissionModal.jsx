import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  FileText, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  CreditCard, 
  MessageCircle, 
  Printer, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ADMISSION_COURSES = [
  { id: 'eng-steno', name: 'English Shorthand (Pitman Basic to Advanced)', fee: '₹4,500 (3-4 Months)', price: 4500, type: 'Shorthand' },
  { id: 'hindi-steno', name: 'Hindi Shorthand (हिंदी आशुलिपि - Basic to 140 WPM)', fee: '₹4,500 (Complete)', price: 4500, type: 'Shorthand' },
  { id: 'eng-typing', name: 'English Typing & Computer Typing Skills', fee: '₹1,500 (Complete)', price: 1500, type: 'Typing' },
  { id: 'hindi-typing', name: 'Hindi Typing (Kruti Dev 010 & Mangal Font)', fee: '₹1,500 (Complete)', price: 1500, type: 'Typing' },
  { id: 'bilingual-typing', name: 'English & Hindi Typing (Bilingual Mastery)', fee: '₹2,500 (Complete)', price: 2500, type: 'Typing' },
  { id: 'patna-hc', name: 'Patna High Court Special Live Dictation', fee: '₹700 / Month', price: 700, type: 'Special' },
  { id: 'jharkhand-hc', name: 'Jharkhand High Court Special Live Dictation', fee: '₹700 / Month', price: 700, type: 'Special' },
  { id: 'adca-dca', name: 'Computer Diplomas (ADCA 1-Year / DCA 6-Month)', fee: 'Nominal Registration', price: 1200, type: 'Diploma' }
];

export default function AdmissionModal({ isOpen, onClose, onOpenCheckout }) {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    phone: '',
    whatsapp: '',
    sameAsPhone: true,
    email: '',
    gender: 'Male',
    courseId: 'eng-steno',
    mode: 'Offline Classroom (Gaya College More)',
    batchShift: 'Morning (8:30 AM – 10:30 AM)',
    targetExam: 'SSC Stenographer Grade C & D',
    address: '',
    experience: 'Beginner (Starting from basics)'
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'sameAsPhone') {
      setFormData(prev => ({
        ...prev,
        sameAsPhone: checked,
        whatsapp: checked ? prev.phone : prev.whatsapp
      }));
    } else {
      setFormData(prev => {
        const next = { ...prev, [name]: value };
        if (name === 'phone' && prev.sameAsPhone) {
          next.whatsapp = value;
        }
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your Full Name and Mobile Number.');
      return;
    }
    if (formData.phone.trim().replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const refNumber = `GSC-ADM-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedCourseObj = ADMISSION_COURSES.find(c => c.id === formData.courseId) || ADMISSION_COURSES[0];

    const admissionRecord = {
      ...formData,
      refNumber,
      selectedCourse: selectedCourseObj,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    try {
      const existing = JSON.parse(localStorage.getItem('gaya_student_admissions') || '[]');
      existing.unshift(admissionRecord);
      localStorage.setItem('gaya_student_admissions', JSON.stringify(existing));
    } catch {}

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    setIsSubmitting(false);
    setSubmittedData(admissionRecord);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const handleProceedToPayment = () => {
    if (!submittedData) return;
    onClose();
    if (onOpenCheckout) {
      onOpenCheckout({
        id: `plan-${submittedData.selectedCourse.id}`,
        name: `${submittedData.selectedCourse.name} (Admission Fee)`,
        price: submittedData.selectedCourse.price,
        duration: submittedData.selectedCourse.fee,
        description: `Official Admission enrollment for candidate ${submittedData.fullName} (Ref: ${submittedData.refNumber})`
      });
    }
  };

  return (
    <div 
      className="modal-overlay" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(28, 25, 23, 0.72)',
        backdropFilter: 'blur(5px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        overflowY: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.4rem 1.6rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          background: '#FFFFFF',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fef3c7', color: '#b45309', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
              <Sparkles size={12} />
              Session 2026 – 2027 Admission
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Gaya Shorthand Classes
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0' }}>
              Online Admission & Candidate Registration Form • Opp. Cyber Thana, Gaya
            </p>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close Admission Form"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              color: '#64748B'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.6rem' }}>
          {submittedData ? (
            /* Admission Confirmation Slip View */
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#dcfce7',
                color: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem' }}>
                Admission Application Submitted!
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#57534e', margin: '0 0 1.25rem' }}>
                Your admission request has been recorded. Please save your reference ID for classroom seat allotment.
              </p>

              {/* Printable Slip Card */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'left',
                marginBottom: '1.5rem',
                fontSize: '0.86rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Application Ref No.</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#d97706', fontFamily: 'monospace' }}>
                      {submittedData.refNumber}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>Submission Date</span>
                    <div style={{ fontSize: '0.82rem', color: '#44403c', fontWeight: 600 }}>
                      {submittedData.submittedAt}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <span style={{ color: '#64748B', fontSize: '0.76rem', display: 'block' }}>Candidate Name</span>
                    <strong>{submittedData.fullName}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', fontSize: '0.76rem', display: 'block' }}>Father's Name</span>
                    <strong>{submittedData.fatherName || '—'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', fontSize: '0.76rem', display: 'block' }}>Mobile & WhatsApp</span>
                    <strong>{submittedData.phone} {submittedData.whatsapp && submittedData.whatsapp !== submittedData.phone ? `/ ${submittedData.whatsapp}` : ''}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', fontSize: '0.76rem', display: 'block' }}>Selected Course</span>
                    <strong style={{ color: '#047857' }}>{submittedData.selectedCourse.name}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', fontSize: '0.76rem', display: 'block' }}>Course Fee</span>
                    <strong>{submittedData.selectedCourse.fee}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', fontSize: '0.76rem', display: 'block' }}>Training Mode & Shift</span>
                    <strong>{submittedData.mode} • {submittedData.batchShift}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <button
                  onClick={handleProceedToPayment}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: '#047857',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0.85rem 1.25rem',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(4, 120, 87, 0.25)'
                  }}
                >
                  <CreditCard size={17} />
                  <span>Pay Course / Admission Fee Online ({submittedData.selectedCourse.fee})</span>
                  <ArrowRight size={16} />
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  <a
                    href={`https://wa.me/919204123453?text=${encodeURIComponent(`Hello Gaya Shorthand Classes, I have submitted an online admission form.\n\n*Ref No:* ${submittedData.refNumber}\n*Candidate:* ${submittedData.fullName}\n*Course:* ${submittedData.selectedCourse.name} (${submittedData.selectedCourse.fee})\n*Phone:* ${submittedData.phone}\n*Mode:* ${submittedData.mode}\n\nPlease confirm my batch seat.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      background: '#15803d',
                      color: '#FFFFFF',
                      borderRadius: '10px',
                      padding: '0.75rem',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Slip</span>
                  </a>

                  <button
                    onClick={handlePrintSlip}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      color: '#0F172A',
                      borderRadius: '10px',
                      padding: '0.75rem',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <Printer size={16} />
                    <span>Print Slip</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setSubmittedData(null);
                    onClose();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Admission Form */
            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem'
                }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                    Candidate Full Name (विद्यार्थी का नाम) *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: '#FFFFFF'
                    }}
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                    Father's / Guardian Name (पिता का नाम)
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    placeholder="Enter father's name"
                    value={formData.fatherName}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: '#FFFFFF'
                    }}
                  />
                </div>

                {/* Mobile Calling Number */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                    Mobile Number (कॉलिंग नंबर) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: '#FFFFFF'
                    }}
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>
                      WhatsApp Number
                    </label>
                    <label style={{ fontSize: '0.75rem', color: '#57534e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input 
                        type="checkbox" 
                        name="sameAsPhone" 
                        checked={formData.sameAsPhone} 
                        onChange={handleChange} 
                      />
                      <span>Same as Mobile</span>
                    </label>
                  </div>
                  <input
                    type="tel"
                    name="whatsapp"
                    disabled={formData.sameAsPhone}
                    placeholder="WhatsApp number"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: formData.sameAsPhone ? '#F5F5F7' : '#FFFFFF'
                    }}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: '#FFFFFF'
                    }}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                    Gender (लिंग)
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: '#FFFFFF'
                    }}
                  >
                    <option value="Male">Male (पुरुष)</option>
                    <option value="Female">Female (महिला)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

              </div>

              {/* Course Selection & Batch Preferences */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.25rem'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#d97706', display: 'block', marginBottom: '0.75rem' }}>
                  Course & Batch Details
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  
                  {/* Course Dropdown */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                      Select Course (कोर्स चुनें) *
                    </label>
                    <select
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.7rem 0.85rem',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '8px',
                        fontSize: '0.92rem',
                        background: '#FFFFFF',
                        fontWeight: 600
                      }}
                    >
                      {ADMISSION_COURSES.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.name} — {course.fee}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mode */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                      Training Mode
                    </label>
                    <select
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        background: '#FFFFFF'
                      }}
                    >
                      <option value="Offline Classroom (Gaya College More)">Offline Classroom (Gaya College More Center)</option>
                      <option value="Online Live Class & Audio Portal">Online Live Class & Audio Portal</option>
                    </select>
                  </div>

                  {/* Batch Shift */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                      Preferred Batch Timing
                    </label>
                    <select
                      name="batchShift"
                      value={formData.batchShift}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        background: '#FFFFFF'
                      }}
                    >
                      <option value="Morning (6:00 AM – 8:00 AM)">Morning Early Bird (6:00 AM – 8:00 AM)</option>
                      <option value="Morning (8:30 AM – 10:30 AM)">Morning Core (8:30 AM – 10:30 AM)</option>
                      <option value="Afternoon (3:00 PM – 5:00 PM)">Afternoon Judicial Bench (3:00 PM – 5:00 PM)</option>
                      <option value="Evening (5:30 PM – 7:30 PM)">Evening Executive (5:30 PM – 7:30 PM)</option>
                    </select>
                  </div>

                  {/* Target Exam */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                      Target Government Exam
                    </label>
                    <select
                      name="targetExam"
                      value={formData.targetExam}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        background: '#FFFFFF'
                      }}
                    >
                      <option value="SSC Stenographer Grade C & D">SSC Stenographer Grade C & D</option>
                      <option value="Patna High Court Stenographer">Patna High Court Stenographer</option>
                      <option value="Jharkhand High Court Stenographer">Jharkhand High Court Stenographer</option>
                      <option value="Supreme Court / Delhi High Court SPA">Supreme Court / Delhi High Court SPA</option>
                      <option value="BSF / CRPF Paramilitary Steno">BSF / CRPF Paramilitary Steno</option>
                      <option value="Civil Court & State Secretariat">Civil Court & State Secretariat</option>
                      <option value="Fresh Beginner / Skill Building">Fresh Beginner / Skill Building</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                      City / District (पता / ज़िला)
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="e.g. Gaya, Jehanabad, Aurangabad, Patna"
                      value={formData.address}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        background: '#FFFFFF'
                      }}
                    />
                  </div>

                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: '#F83458',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.85rem 1.25rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(248, 52, 88, 0.28)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <FileText size={17} color="#FFFFFF" />
                <span>{isSubmitting ? 'Submitting Application...' : 'Submit Admission Application Form'}</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.85rem', fontSize: '0.78rem', color: '#64748B' }}>
                3 Demo Classes Included • No prior shorthand experience required • Helpline: 9204123453
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

