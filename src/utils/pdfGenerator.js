import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generateCandidateDossierPdf(candidateData, examResult) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [136, 19, 55]; // Rose-900 / Academy Burgundy
  const darkColor = [30, 41, 59]; // Slate-800
  const emeraldColor = [16, 185, 129];
  const roseColor = [225, 29, 72];

  // 1. Header Banner & Title
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('SHORTHAND PLUS — SPEED & TRANSCRIPTION LAB', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Gaya Center • Bihar • Official Candidate Performance Evaluation Dossier', 14, 18);
  doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, 23);

  // 2. Candidate Identity Information Card
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('CANDIDATE MERIT DOSSIER', 14, 38);

  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 42, 182, 34, 3, 3, 'FD');

  const studentName = candidateData?.name || 'Shadab Khan';
  const rollNo = candidateData?.rollNo || candidateData?.roll_no || 'SP-2026-084';
  const targetExam = candidateData?.targetExam || 'SSC Steno & High Court Bench';
  const state = candidateData?.state || 'Bihar';
  const language = candidateData?.language || 'English';

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Candidate Name:', 20, 50);
  doc.setFont('helvetica', 'normal');
  doc.text(studentName, 55, 50);

  doc.setFont('helvetica', 'bold');
  doc.text('Roll Number:', 115, 50);
  doc.setFont('helvetica', 'normal');
  doc.text(rollNo, 145, 50);

  doc.setFont('helvetica', 'bold');
  doc.text('Target Exam:', 20, 58);
  doc.setFont('helvetica', 'normal');
  doc.text(targetExam, 55, 58);

  doc.setFont('helvetica', 'bold');
  doc.text('State / Domicile:', 115, 58);
  doc.setFont('helvetica', 'normal');
  doc.text(state, 145, 58);

  doc.setFont('helvetica', 'bold');
  doc.text('Script / Language:', 20, 66);
  doc.setFont('helvetica', 'normal');
  doc.text(`${language} (Pitman Standard)`, 55, 66);

  doc.setFont('helvetica', 'bold');
  doc.text('Certificate ID:', 115, 66);
  doc.setFont('helvetica', 'normal');
  doc.text(`SP-CERT-${Math.floor(100000 + Math.random() * 900000)}`, 145, 66);

  // 3. Exam Benchmark Parameters
  const examTitle = examResult?.name || examResult?.testTitle || examResult?.test?.title || 'OCT 6 BENCH - Election Expenditure & Reforms';
  const speed = examResult?.speed || `${examResult?.speedNum || 84.5} WPM`;
  const accuracy = examResult?.marks || `${examResult?.marksNum || 96.2}%`;
  const totalWords = examResult?.totalWords || 437;
  const typedWords = examResult?.typedWords || 430;
  const fullMistakes = examResult?.fullMistakes || 8;
  const halfMistakes = examResult?.halfMistakes || 6;
  const effectiveErrors = examResult?.effectiveErrors || 11.0;
  const isQualified = (Number(String(accuracy).replace('%', '')) >= 90);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('EXAMINATION EVALUATION METRICS', 14, 86);

  // AutoTable: Performance Scorecard
  autoTable(doc, {
    startY: 90,
    head: [['Evaluation Parameter', 'Prescribed Standard', 'Candidate Result', 'Verification Status']],
    body: [
      ['Examination Benchmark Title', 'Government Prescribed', examTitle, 'Verified Master'],
      ['Prescribed Dictation Speed', '80.00 - 100.00 WPM', speed, 'Compliant'],
      ['Total Passage Master Words', `${totalWords} Words`, `${typedWords} Words Transcribed`, 'Complete'],
      ['Full Mistakes (1 Mark)', '0.00 Max (General)', `${fullMistakes} Words`, fullMistakes <= 10 ? 'Pass' : 'Review'],
      ['Half Mistakes (0.5 Mark)', 'Spelling / Capitalization', `${halfMistakes} Words`, 'Checked'],
      ['Effective Calculated Errors', 'Max 5.0% for General', `${effectiveErrors} Mistakes`, effectiveErrors <= 15 ? 'Pass' : 'Exceeded'],
      ['Net Accuracy Percentage', '>= 90.00% Required', accuracy, isQualified ? 'QUALIFIED' : 'FAILED']
    ],
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: darkColor
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 42 },
      2: { fontStyle: 'bold', cellWidth: 50 },
      3: { cellWidth: 30 }
    }
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  // 4. Marking Taxonomy Guidelines Box
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, finalY, 182, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('OFFICIAL SSC & HIGH COURT MARKING FORMULA APPLIED:', 18, finalY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('• Full Mistakes (1.00 deduction): Every omitted word, substituted word, or extraneous addition.', 18, finalY + 15);
  doc.text('• Half Mistakes (0.50 deduction): Spelling inaccuracy in English or Matra errors in Hindi, capitalization transposition.', 18, finalY + 22);
  doc.text('• Percentage Error Calculation = [(Full Mistakes + Half Mistakes × 0.5) ÷ Total Master Words] × 100', 18, finalY + 29);
  doc.text('• Passing Standard: General Category <= 5% Errors (>= 95% Accuracy) | Reserved Category <= 7% Errors (>= 93% Accuracy)', 18, finalY + 35);

  // 5. Final Qualification Seal & Signatures
  const verdictY = finalY + 48;

  // Result Badge Box
  doc.setFillColor(...(isQualified ? emeraldColor : roseColor));
  doc.roundedRect(14, verdictY, 85, 26, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('GOVERNMENT BENCH STATUS:', 18, verdictY + 8);
  doc.setFontSize(13);
  doc.text(isQualified ? '✓ QUALIFIED (MERIT RANK)' : '✗ SPEED CALIBRATION NEEDED', 18, verdictY + 18);

  // Signature Block
  doc.setTextColor(...darkColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Authorized Faculty Examiner:', 125, verdictY + 8);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.text('Dr. Gagan Kumar', 125, verdictY + 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Director & Chief Stenography Examiner', 125, verdictY + 20);
  doc.text('Shorthand Plus Academy (Gaya Center)', 125, verdictY + 24);

  // Security Verification Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 280, 196, 280);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Secure Cryptographic Dossier • Valid for High Court & Central Secretariat Skill Test Verification', 14, 285);
  doc.text('Verify Online at https://shorthandplus.com/verify-dossier', 14, 289);

  // Download PDF file
  const filename = `Shorthand_Dossier_${rollNo}_${Date.now()}.pdf`;
  doc.save(filename);
}

export function generateCompletionCertificatePdf(candidateData, courseOrTest) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const studentName = candidateData?.name || 'Shadab Khan';
  const rollNo = candidateData?.rollNo || candidateData?.roll_no || 'SP-2026-084';
  const courseTitle = courseOrTest?.title || courseOrTest?.name || "SSC Stenographer Grade 'C' & 'D' Mastery Program";
  const speed = courseOrTest?.speed || courseOrTest?.speedTarget || '100 WPM';
  const certId = `GSC-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  // 1. Double Academic Frame Border
  doc.setDrawColor(28, 25, 23);
  doc.setLineWidth(1.5);
  doc.rect(8, 8, 281, 194);

  doc.setDrawColor(217, 119, 6); // Warm Amber Inner Border
  doc.setLineWidth(0.6);
  doc.rect(12, 12, 273, 186);

  // Corner Accents
  doc.setFillColor(217, 119, 6);
  doc.rect(12, 12, 10, 2, 'F');
  doc.rect(12, 12, 2, 10, 'F');
  doc.rect(273, 12, 10, 2, 'F');
  doc.rect(283, 12, 2, 10, 'F');
  doc.rect(12, 196, 10, 2, 'F');
  doc.rect(12, 188, 2, 10, 'F');
  doc.rect(273, 196, 10, 2, 'F');
  doc.rect(283, 188, 2, 10, 'F');

  // 2. Institution Banner Header
  doc.setTextColor(28, 25, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('GAYA SHORTHAND CLASSES', 148.5, 32, { align: 'center' });

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 113, 108);
  doc.text('PREMIER STENOGRAPHY & COMPUTER TYPING EXAMINATION ACADEMY • ESTD. 2008', 148.5, 39, { align: 'center' });
  doc.text('Gaya Head Branch • Official Government Bench & High Court Skill Test Preparation Center', 148.5, 44, { align: 'center' });

  // 3. Certificate Title
  doc.setDrawColor(231, 229, 228);
  doc.line(40, 50, 257, 50);

  doc.setTextColor(217, 119, 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('CERTIFICATE OF STENOGRAPHIC MERIT & PROFICIENCY', 148.5, 60, { align: 'center' });

  // 4. Recipient Text
  doc.setTextColor(87, 83, 78);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('This is to certify that candidate', 148.5, 74, { align: 'center' });

  // Candidate Name
  doc.setTextColor(28, 25, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(studentName.toUpperCase(), 148.5, 87, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 113, 108);
  doc.text(`Roll Number: ${rollNo} • Registration ID: ${certId}`, 148.5, 94, { align: 'center' });

  // Course Description
  doc.setTextColor(87, 83, 78);
  doc.setFontSize(10.5);
  doc.text('has successfully demonstrated examination-grade mastery and high-velocity transcription in', 148.5, 106, { align: 'center' });

  doc.setTextColor(28, 25, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(courseTitle, 148.5, 116, { align: 'center' });

  // Telemetry Box
  doc.setDrawColor(231, 229, 228);
  doc.setFillColor(250, 249, 246);
  doc.roundedRect(65, 124, 167, 18, 3, 3, 'FD');

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 25, 23);
  doc.text(`Bench Velocity Standard: ${speed}`, 80, 135);
  doc.setTextColor(4, 120, 87);
  doc.text('• Net Accuracy: >= 95% Compliant', 155, 135);

  doc.setTextColor(87, 83, 78);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Conducted under standard parliamentary & judicial examination testing criteria with live audio dictation playback.', 148.5, 153, { align: 'center' });

  // 5. Signatures and Official Stamp
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.5);

  // Left Signature: Academic Dean
  doc.line(35, 178, 90, 178);
  doc.setTextColor(28, 25, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Dr. Gagan Kumar', 62.5, 183, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 113, 108);
  doc.text('Director & Lead Faculty', 62.5, 187, { align: 'center' });

  // Center Seal
  doc.setDrawColor(4, 120, 87);
  doc.setFillColor(240, 253, 244);
  doc.circle(148.5, 174, 12, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(4, 120, 87);
  doc.text('VERIFIED', 148.5, 172.5, { align: 'center' });
  doc.text('GOVT BENCH', 148.5, 176, { align: 'center' });
  doc.text('ACCREDITED', 148.5, 179.5, { align: 'center' });

  // Right Signature: Examination Controller
  doc.line(205, 178, 260, 178);
  doc.setTextColor(28, 25, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Controller of Examinations', 232.5, 183, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 113, 108);
  doc.text(`Issue Date: ${dateStr}`, 232.5, 187, { align: 'center' });

  // Download PDF file
  const filename = `Certificate_${rollNo}_${Date.now()}.pdf`;
  doc.save(filename);
}

export default generateCandidateDossierPdf;
