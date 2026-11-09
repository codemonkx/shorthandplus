import bcrypt from 'bcryptjs';
import db from './database.js';

export async function seedDatabase() {
  try {
    const userCountRow = await db.get('SELECT COUNT(*) as count FROM users');
    const userCount = Number(userCountRow?.count || 0);

    if (userCount === 0) {
      console.log('🌱 Seeding initial platform data (Users, Courses, Tests, Classes)...');

      // 1. Seed Users
      const salt = bcrypt.genSaltSync(10);
      const adminPassHash = bcrypt.hashSync('admin', salt);
      const studentPassHash = bcrypt.hashSync('shadab12345', salt);
      const demoPassHash = bcrypt.hashSync('student123', salt);

      const insertUserSql = `
        INSERT INTO users (name, email, password_hash, role, roll_no, mobile, state, language, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Admin Director
      await db.run(
        insertUserSql,
        'Dr. Gagan Kumar (Director)',
        'admin@gaya.com',
        adminPassHash,
        'admin',
        'FACULTY-01',
        '919204123453',
        'Bihar',
        'English',
        'Active'
      );

      // Primary Student Shadab Khan
      const shadabResult = await db.run(
        insertUserSql,
        'Shadab Khan',
        'shadabca@gmail.com',
        studentPassHash,
        'student',
        'SP-2026-084',
        '9876543210',
        'Bihar',
        'English',
        'Active'
      );
      const shadabId = shadabResult.lastInsertRowid || shadabResult.id || 2;

      // Additional Roster Students
      const roster = [
        { name: "Vishnupriya S.", email: "vishnupriya@gmail.com", rollNo: "SP-2026-005", state: "Tamil Nadu", status: "Active" },
        { name: "Sagar Kumar Singh", email: "sagar.steno@gmail.com", rollNo: "SP-2026-009", state: "Jharkhand", status: "Active" },
        { name: "Ananya Rathore", email: "ananya.r@yahoo.com", rollNo: "SP-2026-018", state: "Rajasthan", status: "Active" },
        { name: "Amit Sharma", email: "amit.steno99@gmail.com", rollNo: "SP-2026-024", state: "Delhi", status: "Active" },
        { name: "Pooja Verma", email: "pooja.v@gmail.com", rollNo: "SP-2026-033", state: "Uttar Pradesh", status: "Active" },
        { name: "Vikramaditya Roy", email: "vikram.roy@outlook.com", rollNo: "SP-2026-041", state: "West Bengal", status: "Expired" },
        { name: "Neha Kumari", email: "neha.steno@gmail.com", rollNo: "SP-2026-052", state: "Bihar", status: "Active" }
      ];

      for (const r of roster) {
        await db.run(insertUserSql, r.name, r.email, demoPassHash, 'student', r.rollNo, '9876500000', r.state, 'English', r.status);
      }

      // 2. Seed Active Enrollment for Shadab
      const nowIso = new Date().toISOString();
      const expiresAtIso = new Date(Date.now() + 248 * 24 * 60 * 60 * 1000).toISOString();

      await db.run(`
        INSERT INTO enrollments (user_id, plan_id, plan_name, amount, status, starts_at, expires_at, payment_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
        shadabId,
        'plan-12mo',
        '12 Month Unlimited (Shorthand + Typing)',
        1200,
        'Active',
        nowIso,
        expiresAtIso,
        'pay_mock_initial_enrollment'
      );

      // 3. Seed Courses
      const insertCourseSql = `
        INSERT INTO courses (id, title, category, badge, tag_color, speed_target, duration, fee, price, description, syllabus, mode, popular)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const coursesData = [
        {
          id: 'course-pitman',
          title: 'English Shorthand (Pitman Shorthand)',
          category: 'Shorthand Course (English)',
          badge: 'SSC & High Court Special',
          tagColor: 'badge-blue',
          speedTarget: '60, 80, 100 & 120 WPM',
          duration: '3 to 6 Months',
          fee: '₹6,000 (Complete)',
          price: 6000,
          description: 'Learn English Shorthand from Basic to Advanced Level with systematic guidance and practical training. This course is specially designed for students preparing for SSC Stenographer, High Court Stenographer, Personal Assistant (PA), Private Secretary (PS) and other government stenographer examinations.',
          syllabus: JSON.stringify([
            'Basic to Advanced Shorthand Training',
            'Pitman Shorthand Theory (Consonants & Vowels)',
            'Grammalogues and Phraseography',
            'Short Forms and Special Rules',
            'Word Formation and Sentence Practice',
            'Daily Dictation Practice',
            'Speed Development: 60, 80, 100 and 120 WPM',
            'Transcription Practice & Accuracy Improvement Techniques',
            'Exam-Oriented Mock Tests (SSC, High Court, PA/PS)'
          ]),
          mode: 'Classroom (Gaya Center) + Online Audio Portal Access',
          popular: 1
        },
        {
          id: 'course-hindi-steno',
          title: 'Hindi Shorthand (हिंदी आशुलिपि)',
          category: 'Shorthand Course (Hindi)',
          badge: 'Hindi Steno & Court Special',
          tagColor: 'badge-amber',
          speedTarget: '50, 80, 100 & 120+ WPM',
          duration: '3 to 6 Months',
          fee: '₹6,000 (Complete)',
          price: 6000,
          description: 'Learn Hindi Shorthand from Basic to Advanced Level through practical classes, regular dictation and transcription practice. This course is designed for students preparing for Hindi Stenographer, Court Stenographer and various government recruitment examinations.',
          syllabus: JSON.stringify([
            'Basic Hindi Shorthand Theory',
            'Hindi Shorthand Signs and Symbols',
            'Vowels and Consonants (स्वर एवं व्यंजन)',
            'Word Formation and Sentence Writing',
            'Shorthand Rules and Principles',
            'Daily Hindi Dictation Practice',
            'Speed Practice (50, 80, 100 & 120 WPM)',
            'Reading and Transcription (Kruti Dev 010 & Mangal)',
            'Accuracy Improvement Techniques',
            'Exam-Oriented Practice Tests'
          ]),
          mode: 'Classroom (Gaya Center) + Online Audio Portal Access',
          popular: 1
        },
        {
          id: 'course-court',
          title: 'High Court Judicial Speed & Legal Series',
          category: 'Judicial Bench',
          badge: 'Patna & Jharkhand HC',
          tagColor: 'badge-emerald',
          speedTarget: '80 → 110 WPM',
          duration: '2 to 3 Months',
          fee: '₹700 / Month',
          price: 700,
          description: 'Specialized courtroom transcription batch designed specifically for Patna High Court, Jharkhand Civil Courts, and State Judiciary Stenographer exams.',
          syllabus: JSON.stringify([
            'Authentic High Court Criminal & Civil Judgment Audio',
            'Legal Phrasing, Latin Maxims & Judicial Nomenclature',
            'Enforced 5-Minute Shorthand Reading Room Clock',
            'Strict Backspace Lock & Mechanical Keyboard Simulation',
            'Previous 10 Years Solved High Court Dictations'
          ]),
          mode: 'Dual Mode: Offline Gaya Center or Online Portal',
          popular: 0
        },
        {
          id: 'course-ssc',
          title: 'SSC Stenographer Grade C & D Crash Batch',
          category: 'Central Govt',
          badge: 'SSC Grade C & D',
          tagColor: 'badge-amber',
          speedTarget: '80 & 100 WPM',
          duration: '3 Months Intensive',
          fee: '₹249 / Month (Pass)',
          price: 249,
          description: 'Targeted preparation for Staff Selection Commission Grade C and D skill tests with real exam audio speed fluctuations and automated error calculation.',
          syllabus: JSON.stringify([
            'Parliamentary Speeches & Government Budget Passages',
            'SSC Strict Mistake Formula (Full & Half Mistake Evaluation)',
            'Daily 8:00 AM & 5:00 PM Live Speed Benchmark Tests',
            'All-India Batch Rank & Percentile Scorecards',
            'Kruti Dev 010 & Mangal Inscript Hindi Transcription'
          ]),
          mode: 'Daily Live Dictation + Unlimited Audio Archive',
          popular: 0
        },
        {
          id: 'course-diplomas',
          title: 'Computer Diplomas & Certified Typing (DCA / ADCA)',
          category: 'Govt Diplomas',
          badge: 'Govt. Recognized',
          tagColor: 'badge-purple',
          speedTarget: '30 → 50+ WPM Typing',
          duration: '6 to 12 Months',
          fee: 'Nominal Registration',
          price: 1500,
          description: 'The institute provides highly practical courses in Shorthand, Typing, and Advanced Diploma in Computer Applications (ADCA), DCA, TALLY etc., designed to help students build speed, accuracy, and efficiency for career growth in Government and private sectors. Alongside shorthand and typing, the ADCA program covers essential computer skills such as MS Office, Internet Applications, Tally, and more.',
          syllabus: JSON.stringify([
            'ADCA (1 Year) & DCA (6 Months) Complete Computer Syllabus',
            'MS Office Suite (Word, Excel, PowerPoint) & Internet Applications',
            'Tally Prime with GST Invoicing & Accounting',
            'English QWERTY & Hindi (Kruti Dev / Mangal) Typing Speed Studio',
            'Career-Oriented Training for Steno, Data Entry & Clerical Roles',
            'Certificate Verification System with Official QR Code'
          ]),
          mode: 'Gaya Offline Lab & Document Verification Support',
          popular: 0
        },
        {
          id: 'plan-1day',
          title: '1-Day Skill Sprint Pass',
          category: 'Skill Pass',
          badge: 'Trial',
          tagColor: 'badge-rose',
          speedTarget: 'Unlimited',
          duration: '1 Day Unlimited',
          fee: '₹20',
          price: 20,
          description: 'Full 24-hour unlimited access to all Shorthand and Typing skill tests.',
          syllabus: JSON.stringify([
            'Unlimited Steno Dictation Tests',
            'Unlimited Typing Speed Tests',
            'Live Algorithmic Evaluation',
            'Instant Batch Rank & Scorecard'
          ]),
          mode: 'Online Portal',
          popular: 0
        },
        {
          id: 'plan-1mo',
          title: 'Monthly Test Series Pass',
          category: 'Skill Pass',
          badge: 'Popular',
          tagColor: 'badge-amber',
          speedTarget: '60 - 120 WPM',
          duration: '1 Month Unlimited',
          fee: '₹249',
          price: 249,
          description: 'Best for active aspirants preparing for upcoming SSC or Court exams.',
          syllabus: JSON.stringify([
            'All SSC & State Steno Tests (60-120 WPM)',
            'Daily Live Dictations + Recordings',
            'English + Hindi Kruti Dev / Mangal Support',
            'Detailed Word-by-Word Error Breakdown'
          ]),
          mode: 'Online Portal',
          popular: 1
        },
        {
          id: 'plan-6mo',
          title: '6-Month Pro Scholar Pass',
          category: 'Skill Pass',
          badge: 'Best Value',
          tagColor: 'badge-blue',
          speedTarget: '60 - 120 WPM',
          duration: '6 Months Unlimited',
          fee: '₹899',
          price: 899,
          description: 'Comprehensive exam preparation with full archive access and practice drills.',
          syllabus: JSON.stringify([
            'Everything in Monthly Plan',
            'Unlimited High Court & SSC Mock Tests',
            '6-Month Access to Audio Vault',
            'Verified Certificate of Completion'
          ]),
          mode: 'Online Portal',
          popular: 0
        },
        {
          id: 'plan-12mo',
          title: 'Annual Career Master Pass',
          category: 'Skill Pass',
          badge: 'Ultimate',
          tagColor: 'badge-emerald',
          speedTarget: 'All Speeds',
          duration: '12 Months Unlimited',
          fee: '₹1,200',
          price: 1200,
          description: '365 days of complete mastery across all court and government secretariat exams.',
          syllabus: JSON.stringify([
            '365 Days Unlimited Access to All Tests',
            'Patna & Jharkhand High Court Dictations',
            'Basic & Advanced Pitman Course Material',
            'Official Shorthand Proficiency Certificate'
          ]),
          mode: 'Online Portal',
          popular: 0
        }
      ];

      for (const c of coursesData) {
        await db.run(
          insertCourseSql,
          c.id, c.title, c.category, c.badge, c.tagColor, c.speedTarget,
          c.duration, c.fee, c.price, c.description, c.syllabus, c.mode, c.popular
        );
      }

      // 4. Seed Tests
      const insertTestSql = `
        INSERT INTO tests (id, title, type, category, authority, speed_wpm, speed_str, duration, language, total_words, audio_url, audio_duration, difficulty, passage_text)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Steno Test 534
      await db.run(
        insertTestSql,
        534,
        'OCT 6 BENCH - Election Expenditure & Reforms',
        'steno',
        'SSC Steno Grade C & D',
        'Parliamentary Bench',
        80,
        '80 WPM',
        '10 Mins',
        'English',
        437,
        '/assets/sample-dictation.mp3',
        320,
        'Medium',
        `At the same time this is also opposed by some people who say that it will not reduce the election expenditure and will be an additional burden on the Government Exchequer. In Europe, in some countries like Germany, France and also in Japan this State funding system has been successfully implemented but in my opinion, instead of giving it in cash it can be paid in kind. For example, in the form of voter's slips, election propaganda material, posters or petrol coupons. It can be given in kind so that it cannot be misused and at the same time it will help the candidates who are honest and who do not have enough money to contest elections. Now I come to the question of holding simultaneous elections to the Lok Sabha and the State Assemblies. This is also a very important issue which requires national consensus. Frequent elections throughout the year disrupt the normal developmental activities of the Government. The administrative machinery remains busy in conducting elections. It also leads to massive expenditure by the political parties as well as the Election Commission. If elections to Parliament and the State Legislative Assemblies are held together once in five years, it will save a huge amount of public money and also provide stability to the governance. Therefore, the Government should initiate serious consultations with all political parties to evolve a practical mechanism for holding simultaneous elections in the near future. Finally, I would like to emphasize that the integrity of our democratic institutions depends upon the purity of our electoral process.`
      );

      // Steno Test 535
      await db.run(
        insertTestSql,
        535,
        'Patna High Court Legal Dictation - Criminal Appeal No. 412',
        'steno',
        'Patna High Court',
        'Patna High Court Bench',
        100,
        '100 WPM',
        '5 Mins',
        'English',
        512,
        '/assets/sample-dictation.mp3',
        300,
        'Hard',
        `In the High Court of Judicature at Patna, Criminal Appeal Number 412 of 2025. Heard learned counsel appearing for the appellant and learned Additional Public Prosecutor representing the State of Bihar. The instant criminal appeal has been preferred against the judgment of conviction and order of sentence passed by the learned Sessions Judge in Sessions Trial Number 182 of 2022, whereby and whereunder the appellant has been convicted under Section 302 read with Section 34 of the Indian Penal Code. The prosecution case, in brief, is that the informant lodged a written report stating therein that while his brother was returning from the agricultural field, the named accused persons intercepted him and assaulted him with sharp-cutting weapons. Learned counsel for the appellant submits that there are material contradictions in the testimonies of the prosecution witnesses and the medical evidence does not corroborate the ocular evidence. Having considered the rival submissions and on perusal of the record, the court directs the matter to be listed after two weeks for further arguments.`
      );

      // Typing Tests (101, 102, 103)
      const typingData = [
        {
          id: 101,
          title: 'Exercise 75 - Business Letters & Office Memorandums',
          words: 350,
          time: '10 Mins',
          cat: 'Central Secretariat Service',
          lang: 'English',
          speed: 40,
          passage: `With reference to your communication dated the fifteenth of October, I am directed to convey the sanction of the President of India to the implementation of the revised guidelines governing administrative procedures in ministerial departments. All subordinate offices are hereby instructed to expedite pending files and furnish a compliance report before the conclusion of the current fiscal quarter. Transparency and prompt disposal of public grievances must be accorded the highest priority at all levels.`
        },
        {
          id: 102,
          title: 'Exercise 68 - Judicial Precedents & Legal Terminology',
          words: 400,
          time: '10 Mins',
          cat: 'Judicial Bench',
          lang: 'English',
          speed: 45,
          passage: `The doctrine of stare decisis embodies the foundational principle that legal certainty is indispensable to the rule of law. When a coordinate bench has previously expounded a proposition of law after mature consideration, judicial discipline commands that subsequent benches of identical numerical strength adhere to that enunciated precept unless extraordinary circumstances necessitate reference to a larger constitutional bench.`
        },
        {
          id: 103,
          title: 'अभ्यास 22 - बिहार सिविल कोर्ट परीक्षा (हिंदी कृति देव)',
          words: 300,
          time: '10 Mins',
          cat: 'Civil Court Bench',
          lang: 'Hindi',
          speed: 35,
          passage: `प्रस्तुत याचिका में विचारणीय मुख्य प्रश्न यह है कि क्या अधीनस्थ न्यायालय द्वारा पारित आदेश विधि सम्मत एवं प्राकृतिक न्याय के सिद्धांतों के अनुकूल है। अभिलेखों के सूक्ष्म परीक्षण से यह स्पष्ट होता है कि याचिकाकर्ता को अपना पक्ष प्रस्तुत करने का समुचित अवसर प्रदान नहीं किया गया था। ऐसी स्थिति में विवादित आदेश निरस्त किए जाने योग्य है।`
        }
      ];

      for (const t of typingData) {
        await db.run(
          insertTestSql,
          t.id, t.title, 'typing', t.cat, t.cat, t.speed, `${t.speed} WPM`,
          t.time, t.lang, t.words, '', 0, 'Medium', t.passage
        );
      }

      // 5. Seed Test Results for Shadab Khan
      const insertResultSql = `
        INSERT INTO test_results (user_id, test_id, test_title, test_type, speed_wpm, accuracy_pct, total_words, typed_words, full_mistakes, half_mistakes, effective_errors, qualification_status, time_taken_secs)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await db.run(insertResultSql, shadabId, 534, 'OCT 6 BENCH - Election Expenditure & Reforms', 'steno', 84.5, 96.2, 437, 430, 8, 6, 11.0, 'Qualified (Rank #1)', 305);
      await db.run(insertResultSql, shadabId, 535, 'Patna High Court Legal Dictation - Criminal Appeal No. 412', 'steno', 92.0, 94.8, 512, 498, 14, 8, 18.0, 'Qualified (Rank #3)', 320);
      await db.run(insertResultSql, shadabId, 101, 'Exercise 75 - Business Letters & Office Memorandums', 'typing', 45.0, 98.2, 350, 348, 3, 4, 5.0, 'Qualified (Rank #2)', 460);

      // 6. Seed Live Classes
      const insertLiveClassSql = `
        INSERT INTO live_classes (id, title, shift, time, instructor, instructor_role, speed, course_id, attendees, is_live, tag, badge_class, zoom_meeting_id, zoom_passcode, zoom_direct_url, zoom_app_url, zoom_web_url, description, today_topic, room_no, mode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await db.run(
        insertLiveClassSql,
        'class-live-1',
        'SSC Stenographer Grade C & D — 80 WPM Live Speed Dictation & Transcription Lab',
        'Morning Core Batch',
        '8:30 AM – 10:30 AM',
        'Gagan Sir',
        'Head Faculty • 18+ Yrs Exp',
        '80 WPM Standard',
        'course-ssc',
        142,
        1,
        '🔴 ZOOM LIVE CALL ACTIVE',
        'badge-live',
        '842 9104 2281',
        'GAYA80WPM',
        'https://zoom.us/j/84291042281?pwd=GAYA80WPM',
        'zoommtg://zoom.us/join?confno=84291042281&pwd=GAYA80WPM',
        'https://app.zoom.us/wc/84291042281/join',
        'Interactive Zoom Video Call: Real-time 5-minute parliamentary dictation, instant stroke correction on digital whiteboard, live audio feedback, and strict transcription grading.',
        'Parliamentary Motion on State Infrastructure & Expenditure Audit',
        'Zoom Room #01 (Studio Live)',
        'Zoom Live Call + Shorthand Whiteboard + Typing Lab'
      );

      await db.run(
        insertLiveClassSql,
        'class-judiciary-3',
        'High Court Judicial Speed Bench: Criminal Appeals & Judgment Phrases',
        'Afternoon Judicial Series',
        '3:00 PM – 5:00 PM',
        'Gagan Sir & High Court Reporter',
        'Judicial Series Lead',
        '100 WPM Judicial',
        'course-court',
        115,
        0,
        'STARTS AT 3:00 PM ON ZOOM',
        'badge-upcoming',
        '879 3341 5520',
        'COURT100',
        'https://zoom.us/j/87933415520?pwd=COURT100',
        'zoommtg://zoom.us/join?confno=87933415520&pwd=COURT100',
        'https://app.zoom.us/wc/87933415520/join',
        'Authentic criminal appeals, civil revisions, and high-frequency legal Latin maxims calibrated strictly for High Court exams with live Zoom courtroom simulation.',
        'Patna High Court Cr. Appeal 412/2025 Bench Dictation',
        'Zoom Room #03 (Judicial Bench)',
        'Live Zoom Video Call + Audio Vault'
      );

      // 7. Seed Transactions
      const insertTxnSql = `
        INSERT INTO transactions (id, user_id, student_name, roll_no, plan_name, amount, mode, status, billing_cycle, date_str)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await db.run(insertTxnSql, 'TXN-98421', shadabId, 'Shadab Khan', 'SP-2026-084', '12-Month Annual Career Master', 1200, 'UPI (Paytm)', 'Auto-Verified', 'Annual', 'Today, 14:20');
      await db.run(insertTxnSql, 'TXN-98420', null, 'Vishnupriya S.', 'SP-2026-005', '12-Month Annual Career Master', 1200, 'UPI (GPay)', 'Auto-Verified', 'Annual', 'Today, 11:05');
      await db.run(insertTxnSql, 'TXN-98419', null, 'Rakesh Ranjan', 'SP-2026-092', 'Monthly Test Series', 249, 'Debit Card', 'Auto-Verified', 'Monthly Subscription', 'Yesterday, 19:40');
      await db.run(insertTxnSql, 'TXN-98418', null, 'Pooja Verma', 'SP-2026-033', 'High Court Judicial Speed Series', 700, 'UPI (PhonePe)', 'Auto-Verified', 'Monthly Course', 'Yesterday, 16:15');
      await db.run(insertTxnSql, 'TXN-98417', null, 'Sagar Kumar Singh', 'SP-2026-009', '6-Month Pro Scholar', 899, 'Net Banking', 'Auto-Verified', '6-Month', '09 Oct 2026');

      // 8. Seed Announcements
      const insertAnnSql = `
        INSERT INTO announcements (title, tag, date_str, description, is_live_banner)
        VALUES (?, ?, ?, ?, ?)
      `;

      await db.run(
        insertAnnSql,
        'Patna High Court Stenographer Recruitment 2026 Notification Out',
        'High Court',
        '10 Oct 2026',
        'Patna High Court has announced 129 vacancies for English & Hindi Court Reporters. Daily specialized dictations at 80 and 100 WPM are now live in the Steno Tests room.',
        0
      );
      await db.run(
        insertAnnSql,
        'SSC Stenographer Grade C & D Skill Test Batch Starting',
        'SSC Steno',
        '08 Oct 2026',
        'New full-length dictation series with strictly enforced backspace lock mode and automated SSC error calculation now available every morning at 8:00 AM.',
        0
      );
      await db.run(
        insertAnnSql,
        '🔴 SSC Stenographer Grade C & D 80 WPM live dictation is broadcasting now in Zoom Room #01. Students may join.',
        'Live Notice',
        'Live Now',
        'Broadcast banner for all online students.',
        1
      );

      console.log('✅ Initial database seed completed successfully!');
    }
  } catch (err) {
    console.error('Error during database seeding:', err);
  }
}
