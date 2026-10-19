export const INITIAL_USER = {
  id: 28,
  name: "Shadab Khan",
  email: "shadabca@gmail.com",
  rollNo: "SP-2026-084",
  state: "Bihar",
  language: "English",
  subscription: {
    plan: "12 Month Unlimited (Shorthand + Typing)",
    status: "Active",
    daysRemaining: 248,
    expiryDate: "2027-06-15",
    isPaid: true
  },
  stats: {
    totalTestsTaken: 42,
    highestSpeed: 96,
    avgSpeed: 78,
    avgAccuracy: 92.4,
    currentStreak: 14,
    wordsTranscribed: 26850
  }
};

export const PRICING_PLANS = [
  {
    id: "plan-1day",
    name: "1-Day Skill Sprint",
    price: 20,
    duration: "1 Day Unlimited",
    badge: "Trial",
    description: "Full 24-hour unlimited access to all Shorthand and Typing skill tests.",
    features: [
      "Unlimited Steno Dictation Tests",
      "Unlimited Typing Speed Tests",
      "Live Algorithmic Evaluation",
      "Instant Batch Rank & Scorecard",
      "24-Hour Pass Access"
    ],
    popular: false
  },
  {
    id: "plan-1mo",
    name: "Monthly Test Series",
    price: 249,
    duration: "1 Month Unlimited",
    badge: "Popular",
    description: "Best for active aspirants preparing for upcoming SSC or Court exams.",
    features: [
      "All SSC & State Steno Tests (60-120 WPM)",
      "Daily Live Dictations + Recordings",
      "English + Hindi Kruti Dev / Mangal Support",
      "Detailed Word-by-Word Error Breakdown",
      "Leaderboard & Performance Analytics",
      "Priority Instructor Mentorship & Doubts"
    ],
    popular: true
  },
  {
    id: "plan-6mo",
    name: "6-Month Pro Scholar",
    price: 899,
    duration: "6 Months Unlimited",
    badge: "Best Value",
    description: "Comprehensive exam preparation with full archive access and practice drills.",
    features: [
      "Everything in Monthly Plan",
      "Unlimited High Court & SSC Mock Tests",
      "6-Month Access to Audio Vault",
      "Full Backspace Lock Exam Simulations",
      "Custom Speed Audio Player (0.8x - 1.2x)",
      "Verified Certificate of Completion"
    ],
    popular: false
  },
  {
    id: "plan-12mo",
    name: "Annual Career Master",
    price: 1200,
    duration: "12 Months Unlimited",
    badge: "Ultimate",
    description: "365 days of complete mastery across all court and government secretariat exams.",
    features: [
      "365 Days Unlimited Access to All Tests",
      "Patna & Jharkhand High Court Dictations",
      "Basic & Advanced Pitman Course Material",
      "All Hindi (Kruti Dev + Mangal) + English Tests",
      "VIP Mentorship & Daily Corrections",
      "Official Shorthand Proficiency Certificate"
    ],
    popular: false
  },
  {
    id: "plan-patna-hc",
    name: "Patna High Court Special",
    price: 700,
    duration: "1 Month High Court Batch",
    badge: "Court Exam",
    description: "Targeted court reporter dictation series for Patna High Court recruitment.",
    features: [
      "Legal Dictations & Court Judgments",
      "Strict High Court Exam Simulation HUD",
      "80 & 100 WPM Judicial Passages",
      "Daily Corrections & Error Categorization",
      "Legal Vocabulary & Shorthand Outlines"
    ],
    popular: false
  },
  {
    id: "plan-pitman",
    name: "Basic Pitman Shorthand Masterclass",
    price: 6000,
    duration: "3 to 4 Months Complete",
    badge: "Complete Course",
    description: "From absolute zero to 80+ WPM with full book coverage and daily correction.",
    features: [
      "Complete Pitman Shorthand Book (Theory + Practice)",
      "Daily Live Classes + Lifetime Recordings",
      "Daily Homework Correction by Senior Masters",
      "Stroke Outlines, Grammalogues & Contractions",
      "Guaranteed Speed Building to 80-100 WPM",
      "Government Exam Job Readiness Guarantee"
    ],
    popular: false
  }
];

export const STENO_TESTS = [
  {
    id: 534,
    title: "OCT 6 BENCH - Election Expenditure & Reforms",
    category: "SSC Steno Grade C & D",
    date: "09-10-2026",
    speed: "80 WPM",
    speedWpm: 80,
    language: "English",
    duration: "10 Mins",
    totalWords: 437,
    audioUrl: "/assets/sample-dictation.mp3",
    audioDuration: 320,
    attempts: 412,
    difficulty: "Medium",
    passageText: `At the same time this is also opposed by some people who say that it will not reduce the election expenditure and will be an additional burden on the Government Exchequer. In Europe, in some countries like Germany, France and also in Japan this State funding system has been successfully implemented but in my opinion, instead of giving it in cash it can be paid in kind. For example, in the form of voter's slips, election propaganda material, posters or petrol coupons. It can be given in kind so that it cannot be misused and at the same time it will help the candidates who are honest and who do not have enough money to contest elections. Now I come to the question of holding simultaneous elections to the Lok Sabha and the State Assemblies. This is also a very important issue which requires national consensus. Frequent elections throughout the year disrupt the normal developmental activities of the Government. The administrative machinery remains busy in conducting elections. It also leads to massive expenditure by the political parties as well as the Election Commission. If elections to Parliament and the State Legislative Assemblies are held together once in five years, it will save a huge amount of public money and also provide stability to the governance. Therefore, the Government should initiate serious consultations with all political parties to evolve a practical mechanism for holding simultaneous elections in the near future. Finally, I would like to emphasize that the integrity of our democratic institutions depends upon the purity of our electoral process.`
  },
  {
    id: 535,
    title: "Patna High Court Legal Dictation - Criminal Appeal No. 412",
    category: "Patna High Court",
    date: "10-10-2026",
    speed: "100 WPM",
    speedWpm: 100,
    language: "English",
    duration: "10 Mins",
    totalWords: 520,
    audioUrl: "/assets/sample-dictation.mp3",
    audioDuration: 312,
    attempts: 328,
    difficulty: "Hard",
    passageText: `This criminal appeal is directed against the judgment of conviction and order of sentence passed by the learned Additional Sessions Judge, whereby the appellants have been found guilty for the commission of offences punishable under Sections 302 and 34 of the Indian Penal Code. The prosecution case in brief is that on the fateful day the informant along with his brother was returning from the agricultural field when the accused persons intercepted them armed with lethal weapons. Learned senior counsel appearing on behalf of the appellants has strenuously argued that the medical evidence on record is completely inconsistent with the ocular testimony of the interested witnesses. It has been further contended that there was considerable unexplained delay in dispatching the First Information Report to the jurisdictional magistrate, which casts serious suspicion on the bona fides of the investigating agency. On the contrary, learned Additional Public Prosecutor supported the impugned judgment contending that the testimony of the eyewitnesses is consistent and natural, and minor discrepancies do not shake the substratum of the prosecution case.`
  },
  {
    id: 536,
    title: "झारखंड उच्च न्यायालय - दैनिक डिक्टेशन अभ्यास (Hindi Kruti Dev)",
    category: "Jharkhand High Court",
    date: "10-10-2026",
    speed: "80 WPM",
    speedWpm: 80,
    language: "Hindi (Kruti Dev)",
    duration: "10 Mins",
    totalWords: 410,
    audioUrl: "/assets/sample-dictation.mp3",
    audioDuration: 305,
    attempts: 284,
    difficulty: "Medium",
    passageText: `न्यायालय के समक्ष विचारणीय मुख्य प्रश्न यह है कि क्या अभियोजन पक्ष अभियुक्त के विरुद्ध लगाए गए आरोपों को संदेह से परे प्रमाणित करने में सफल रहा है। वर्तमान मामले के सभी साक्ष्यों का समग्र रूप से परिशीलन करने पर यह स्पष्ट होता है कि घटना स्थल पर स्वतंत्र गवाहों की उपस्थिति के बावजूद किसी भी तटस्थ व्यक्ति का बयान दर्ज नहीं किया गया। विधि का यह सुस्थापित सिद्धांत है कि अभियोजन पक्ष को अपने पैरों पर खड़ा होना पड़ता है और वह अभियुक्त की कमजोरियों का लाभ उठाकर दोषसिद्धि की मांग नहीं कर सकता।`
  },
  {
    id: 537,
    title: "Parliamentary Debate - Economic Policy & Industrial Growth",
    category: "Parliament Reporter",
    date: "08-10-2026",
    speed: "120 WPM",
    speedWpm: 120,
    language: "English",
    duration: "10 Mins",
    totalWords: 605,
    audioUrl: "/assets/sample-dictation.mp3",
    audioDuration: 300,
    attempts: 189,
    difficulty: "Hard",
    passageText: `Mr. Speaker, Sir, I rise to participate in this crucial discussion regarding the economic trajectory of our manufacturing sector. Over the past five years, our nation has made substantial strides in modernizing core infrastructure, enhancing domestic productivity, and attracting foreign direct investments across high-tech domains. However, we cannot remain oblivious to the persistent challenges encountered by micro, small, and medium enterprises. These decentralized industrial clusters represent the true backbone of our employment ecosystem. Unless we streamline the regulatory compliance mechanism and provide seamless credit access at concessional interest rates, we cannot attain our targeted economic potential.`
  },
  {
    id: 538,
    title: "Allahabad High Court Stage II - Civil Jurisdiction Appeal",
    category: "Allahabad High Court",
    date: "07-10-2026",
    speed: "80 WPM",
    speedWpm: 80,
    language: "English",
    duration: "10 Mins",
    totalWords: 440,
    audioUrl: "/assets/sample-dictation.mp3",
    audioDuration: 330,
    attempts: 375,
    difficulty: "Medium",
    passageText: `This civil revision petition arises out of an interlocutory order passed by the learned trial court rejecting the application under Order VII Rule 11 of the Code of Civil Procedure for rejection of the plaint. The principal contention advanced by the revisionist is that the underlying suit for declaration and partition is barred by the statutory period of limitation and fails to disclose a coherent cause of action. Having heard learned counsel for both contesting parties and examined the trial court record, we find that the question of limitation in the present dispute is an intricately mixed question of law and fact requiring oral and documentary evidence during trial.`
  },
  {
    id: 539,
    title: "SSC Stenographer Grade C - Ministry of External Affairs Protocol",
    category: "SSC Steno Grade C & D",
    date: "06-10-2026",
    speed: "100 WPM",
    speedWpm: 100,
    language: "English",
    duration: "10 Mins",
    totalWords: 510,
    audioUrl: "/assets/sample-dictation.mp3",
    audioDuration: 306,
    attempts: 298,
    difficulty: "Hard",
    passageText: `The bilateral consultative summit between the delegations concluded today with the signing of three comprehensive strategic memorandums of understanding concerning maritime domain awareness, green energy transmission, and regional disaster relief cooperation. Both sovereign governments reaffirmed their enduring commitment to international law and maritime freedom across navigational corridors. In the joint press communique, both ministers highlighted the imperative of diversifying semiconductor supply chains, encouraging student academic exchanges, and implementing counter-terrorism intelligence sharing protocols.`
  }
];

export const TYPING_TESTS = [
  { 
    id: 101, 
    name: "Exercise 75 - Business Letters & Office Memorandums", 
    language: "English", 
    words: 350, 
    time: "10 Mins", 
    difficulty: "Easy",
    difficultyDots: 1,
    authority: "SSC CGL / CHSL Tier-II",
    category: "Official Memorandum",
    targetSpeed: "35 WPM",
    avgAccuracy: "97.4%",
    completedCount: 1420,
    passageText: "To all Zonal Managers and Departmental Directors. Subject: Compliance guidelines regarding statutory expenditure audits and financial accounting protocols. In accordance with the recent executive directives issued by the Administrative Committee, all operating regional divisions are hereby instructed to submit their comprehensive quarterly expenditure statements within fifteen calendar days from the conclusion of the active reporting cycle. The internal audit committee has observed recurrent disparities in the allocation of discretionary contingency reserves. It is imperative that every disbursement exceeding the threshold of fifty thousand rupees must be supported by certified vouchers and authorized by the respective controlling officer. Non-compliance with these financial oversight instructions will attract immediate administrative inquiry. Furthermore, all procurement contracts negotiated during the preceding two quarters must be uploaded to the centralized enterprise resource portal for public transparency. Management relies upon your utmost dedication to uphold fiscal integrity and meticulous administrative discipline across every functional jurisdiction."
  },
  { 
    id: 102, 
    name: "Exercise 74 - High Court Judicial Precedents", 
    language: "English", 
    words: 420, 
    time: "10 Mins", 
    difficulty: "Medium",
    difficultyDots: 2,
    authority: "High Court Judicial Assistant",
    category: "Legal Judgment",
    targetSpeed: "42 WPM",
    avgAccuracy: "96.1%",
    completedCount: 980,
    passageText: "The primary question for determination before this constitutional bench pertains to the scope and operational ambit of statutory appeal provisions under administrative tribunal jurisdictions. Learned counsel appearing for the petitioner vigorously contends that procedural irregularities committed during the preliminary fact-finding inquiry went to the very root of natural justice, thereby rendering the subsequent dismissal order untenable in the eyes of law. Conversely, the learned Senior Counsel representing the respondent state submits that the administrative inquiry strictly adhered to statutory service regulations, providing the delinquent officer adequate opportunity to inspect the evidentiary records and cross-examine material witnesses. Having scrupulously evaluated the rival submissions and examined the records transmitted from the appellate tribunal, we are of the considered opinion that mere procedural lapse cannot vitiate an otherwise transparent departmental proceeding unless demonstrable prejudice is established on affidavit."
  },
  { 
    id: 103, 
    name: "Exercise 73 - Banking Regulations & Monetary Reforms", 
    language: "English", 
    words: 400, 
    time: "10 Mins", 
    difficulty: "Medium",
    difficultyDots: 2,
    authority: "RBI & Banking Clerical",
    category: "Fiscal Policy",
    targetSpeed: "40 WPM",
    avgAccuracy: "96.8%",
    completedCount: 1150,
    passageText: "Monetary policy formulation in emerging developing economies demands an intricate equilibrium between price stabilization mandates and sustainable macroeconomic credit expansion. Central banking authorities have consistently recognized that unregulated liquidity expansion without corresponding capital asset formation invariably triggers inflationary pressures across essential consumer commodity baskets. To insulate the commercial banking apparatus against systemic solvency risks, prudential capital adequacy standards have been revised upwards in alignment with international regulatory covenants. Commercial scheduled banks are mandated to fortify their risk evaluation metrics, accelerate prompt resolution of non-performing asset portfolios, and expand concessional microfinance credit avenues towards prioritized agricultural sectors. Digital payment ecosystems and real-time settlement platforms have substantially augmented transactional velocity, thereby reducing operating overheads and fostering comprehensive financial inclusion across rural and semi-urban demographic zones."
  },
  { 
    id: 104, 
    name: "Exercise 72 - हिंदी कृतिदेव अभ्यास - सामान्य प्रशासनिक पत्र", 
    language: "Hindi (Kruti Dev)", 
    words: 300, 
    time: "10 Mins", 
    difficulty: "Medium",
    difficultyDots: 2,
    authority: "State Secretariat & DSSSB",
    category: "Administrative Circular",
    targetSpeed: "30 WPM",
    avgAccuracy: "95.5%",
    completedCount: 890,
    passageText: "सभी विभागाध्यक्षों एवं क्षेत्रीय अधिकारियों को निर्देशित किया जाता है कि वे अपने कार्यालयों में लंबित मामलों के त्वरित निष्पादन हेतु विशेष अभियान संचालित करें। लोक सेवा के अधिकार अधिनियम के अंतर्गत प्राप्त सभी आवेदनों का निस्तारण निर्धारित समय सीमा के भीतर अनिवार्य रूप से सुनिश्चित किया जाए। किसी भी स्तर पर अनावश्यक विलंब को अनुशासनहीनता माना जाएगा तथा दोषी कर्मियों के विरुद्ध प्रशासनिक कार्रवाई की जाएगी। सभी कार्यालयों में स्वच्छता एवं अभिलेखों के सुव्यवस्थित रखरखाव पर विशेष ध्यान दिया जाना चाहिए।"
  },
  { 
    id: 105, 
    name: "Exercise 71 - हिंदी मंगल इनस्क्रिप्ट - न्यायिक निर्णय", 
    language: "Hindi (Mangal)", 
    words: 320, 
    time: "10 Mins", 
    difficulty: "Hard",
    difficultyDots: 3,
    authority: "Patna & Allahabad High Court",
    category: "Judicial Decision",
    targetSpeed: "32 WPM",
    avgAccuracy: "94.8%",
    completedCount: 760,
    passageText: "प्रस्तुत याचिका में विचारणीय मुख्य प्रश्न यह है कि क्या अधीनस्थ न्यायालय द्वारा पारित आदेश विधि सम्मत एवं प्राकृतिक न्याय के सिद्धांतों के अनुकूल है। अभिलेखों के सूक्ष्म परीक्षण से यह स्पष्ट होता है कि याचिकाकर्ता को अपना पक्ष प्रस्तुत करने का समुचित अवसर प्रदान नहीं किया गया था। ऐसी स्थिति में विवादित आदेश निरस्त किए जाने योग्य है तथा मामले को पुनर्विचार हेतु संबंधित न्यायालय को प्रतिप्रेषित किया जाना न्यायोचित होगा।"
  },
  { 
    id: 106, 
    name: "Exercise 70 - Constitutional Assembly Debates", 
    language: "English", 
    words: 450, 
    time: "10 Mins", 
    difficulty: "Hard",
    difficultyDots: 3,
    authority: "Parliamentary Reporter Bench",
    category: "Constitutional Debate",
    targetSpeed: "45 WPM",
    avgAccuracy: "95.2%",
    completedCount: 1310,
    passageText: "The debate on the distribution of legislative competencies between the Union and the federated states reflects the profound wisdom of the framers of our republican charter. When we deliberated upon the three comprehensive legislative lists, our paramount concern was the preservation of national territorial unity without strangling the organic autonomy necessary for regional governance. It was recognized that matters encompassing national defense, external diplomacy, interstate commerce, and fiscal currency must irrevocably vest within the sovereign jurisdiction of the Union Parliament. Concurrently, public health, local administration, police machinery, and provincial agrarian reforms were appropriately assigned to state legislatures to foster responsible democratic accountability."
  },
  {
    id: 107,
    name: "Warmup Sprint - 60-Second Keystroke Cadence",
    language: "English",
    words: 85,
    time: "1 Min",
    difficulty: "Easy",
    difficultyDots: 1,
    authority: "Daily Warmup Drill",
    category: "Speed Calibration",
    targetSpeed: "40 WPM",
    avgAccuracy: "98.5%",
    completedCount: 3410,
    passageText: "Speed and rhythmic consistency are the bedrock of examination success. Maintain an upright posture with fingers resting lightly over the home row keys. Press each letter with decisive cadence without glancing downward at the keyboard. Daily repetitive drills transform conscious thought into effortless muscle memory."
  }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: "Vishnupriya S.", rollNo: "SP-2026-005", typed: 437, speed: "84.58 WPM", correct: 426, errors: 11, marks: "97.48%", badge: "Gold" },
  { rank: 2, name: "Sagar Kumar Singh", rollNo: "SP-2026-009", typed: 432, speed: "81.20 WPM", correct: 418, errors: 14, marks: "96.75%", badge: "Silver" },
  { rank: 3, name: "Ananya Rathore", rollNo: "SP-2026-018", typed: 428, speed: "79.40 WPM", correct: 410, errors: 18, marks: "95.79%", badge: "Bronze" },
  { rank: 4, name: "Amit Sharma", rollNo: "SP-2026-024", typed: 425, speed: "77.10 WPM", correct: 402, errors: 23, marks: "94.58%", badge: null },
  { rank: 5, name: "Pooja Verma", rollNo: "SP-2026-033", typed: 419, speed: "75.80 WPM", correct: 395, errors: 24, marks: "94.27%", badge: null },
  { rank: 6, name: "Shadab Khan (You)", rollNo: "SP-2026-084", typed: 422, speed: "78.00 WPM", correct: 392, errors: 30, marks: "92.89%", badge: null }
];

export const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Patna High Court Stenographer Recruitment 2026 Notification Out",
    date: "10 Oct 2026",
    tag: "High Court",
    description: "Patna High Court has announced 129 vacancies for English & Hindi Court Reporters. Daily specialized dictations at 80 and 100 WPM are now live in the Steno Tests room."
  },
  {
    id: 2,
    title: "SSC Stenographer Grade C & D Skill Test Batch Starting",
    date: "08 Oct 2026",
    tag: "SSC Steno",
    description: "New full-length dictation series with strictly enforced backspace lock mode and automated SSC error calculation now available every morning at 8:00 AM."
  },
  {
    id: 3,
    title: "Govt-Recognized Computer Diplomas & Shorthand Certificates",
    date: "05 Oct 2026",
    tag: "Certification",
    description: "Enroll for DCA, ADCA, TALLY, and PGDCA diplomas along with verified Shorthand Speed Proficiency Certificates (valid for all Central & State government job verifications)."
  }
];

export const ONLINE_CLASSES_DATA = [
  {
    id: 'class-live-1',
    title: 'SSC Stenographer Grade C & D — 80 WPM Live Speed Dictation & Transcription Lab',
    shift: 'Morning Core Batch',
    time: '8:30 AM – 10:30 AM',
    instructor: 'Gagan Sir',
    instructorRole: 'Head Faculty • 18+ Yrs Exp',
    speed: '80 WPM Standard',
    attendees: 142,
    isLive: true,
    tag: '🔴 ZOOM LIVE CALL ACTIVE',
    badgeClass: 'badge-live',
    zoomMeetingId: '842 9104 2281',
    zoomPasscode: 'GAYA80WPM',
    zoomDirectUrl: 'https://zoom.us/j/84291042281?pwd=GAYA80WPM',
    zoomAppUrl: 'zoommtg://zoom.us/join?confno=84291042281&pwd=GAYA80WPM',
    zoomWebUrl: 'https://app.zoom.us/wc/84291042281/join',
    description: 'Interactive Zoom Video Call: Real-time 5-minute parliamentary dictation, instant stroke correction on digital whiteboard, live audio feedback, and strict transcription grading.',
    todayTopic: 'Parliamentary Motion on State Infrastructure & Expenditure Audit',
    passageSnippet: "Mr. Speaker Sir, the motion was introduced in the House concerning national infrastructure expenditure and audited revenue accounts for the fiscal year 2025-2026. The state government along with the Auditor General presented a comprehensive assessment of capital allocations...",
    roomNo: 'Zoom Room #01 (Studio Live)',
    mode: 'Zoom Live Call + Shorthand Whiteboard + Typing Lab',
    difficulty: 'Intermediate',
    keyOutlines: [
      { stroke: 'P-R-L-M-T', phrase: 'Parliamentary Motion', rule: 'Contraction • P on line with Ray loop', path: [[40, 60], [70, 30], [110, 45], [140, 25], [170, 60]] },
      { stroke: 'S // G-V', phrase: 'State Government', rule: 'Intersected Stroke • S circle crossing Gay', path: [[60, 40], [90, 70], [80, 50], [100, 50]] },
      { stroke: 'K-S-P-N-D', phrase: 'Expenditure & Revenue', rule: 'Advanced Phraseography • Halving principle', path: [[30, 40], [70, 40], [100, 70], [130, 70]] },
      { stroke: 'D-T-R // J-N', phrase: 'Auditor General', rule: 'Compound phrase • Light vowel position', path: [[50, 20], [50, 70], [90, 40], [120, 60]] }
    ]
  },
  {
    id: 'class-theory-2',
    title: 'Basic Pitman Shorthand Theory: Vowel Positions, Circles & Hook Formations',
    shift: 'Morning Early Bird',
    time: '6:00 AM – 8:00 AM',
    instructor: 'Gagan Sir',
    instructorRole: 'Founder & Senior Master',
    speed: 'Beginners (0 - 60 WPM)',
    attendees: 98,
    isLive: false,
    tag: "TODAY'S REPLAY & ZOOM ARCHIVE",
    badgeClass: 'badge-replay',
    zoomMeetingId: '815 6742 9904',
    zoomPasscode: 'PITMAN2026',
    zoomDirectUrl: 'https://zoom.us/j/81567429904?pwd=PITMAN2026',
    zoomAppUrl: 'zoommtg://zoom.us/join?confno=81567429904&pwd=PITMAN2026',
    zoomWebUrl: 'https://app.zoom.us/wc/81567429904/join',
    description: 'Comprehensive consonant joinings, light/heavy vowels, diphthongs, and initial R and L hooks with daily outline verification over Zoom video recording.',
    todayTopic: 'Chapter 14: Compound Consonants & Intersected Words',
    passageSnippet: "The student of shorthand must practice light and heavy strokes with careful pen pressure. Light strokes represent voiceless consonants while heavy strokes denote voiced consonants...",
    roomNo: 'Zoom Room #02 (Theory Hall)',
    mode: 'Zoom Recorded Session + Outline Check',
    difficulty: 'Beginner',
    keyOutlines: [
      { stroke: 'B-R-K-S', phrase: 'Book-keeper & Secretary', rule: 'Vowel placement at 3rd place', path: [[40, 30], [40, 70], [80, 70], [110, 40]] },
      { stroke: 'M-N-S-T-R', phrase: 'Honorable Minister', rule: 'Large loop representation', path: [[30, 50], [70, 50], [100, 30], [120, 60]] },
      { stroke: 'K-M-P-N', phrase: 'Joint Stock Company', rule: 'Intersected K stroke', path: [[40, 40], [80, 40], [70, 20], [70, 60]] }
    ]
  },
  {
    id: 'class-judiciary-3',
    title: 'High Court Judicial Speed Bench: Criminal Appeals & Judgment Phrases',
    shift: 'Afternoon Judicial Series',
    time: '3:00 PM – 5:00 PM',
    instructor: 'Gagan Sir & High Court Reporter',
    instructorRole: 'Judicial Series Lead',
    speed: '100 WPM Judicial',
    attendees: 115,
    isLive: false,
    tag: 'STARTS AT 3:00 PM ON ZOOM',
    badgeClass: 'badge-upcoming',
    zoomMeetingId: '879 3341 5520',
    zoomPasscode: 'COURT100',
    zoomDirectUrl: 'https://zoom.us/j/87933415520?pwd=COURT100',
    zoomAppUrl: 'zoommtg://zoom.us/join?confno=87933415520&pwd=COURT100',
    zoomWebUrl: 'https://app.zoom.us/wc/87933415520/join',
    description: 'Authentic criminal appeals, civil revisions, and high-frequency legal Latin maxims calibrated strictly for High Court exams with live Zoom courtroom simulation.',
    todayTopic: 'Patna High Court Cr. Appeal 412/2025 Bench Dictation',
    passageSnippet: "In the High Court of Judicature at Patna, Criminal Appeal Number 412 of 2025. Heard the learned counsel for the appellant as well as the learned Additional Public Prosecutor for the State...",
    roomNo: 'Zoom Room #03 (Judicial Bench)',
    mode: 'Live Zoom Video Call + Audio Vault',
    difficulty: 'Advanced',
    keyOutlines: [
      { stroke: 'H-G-H // K-R-T', phrase: "Hon'ble High Court", rule: 'Legal standard phrase', path: [[40, 70], [60, 30], [90, 50], [120, 30]] },
      { stroke: 'K-R-M // P-L', phrase: 'Criminal Appeal', rule: 'Joined phraseology', path: [[30, 40], [70, 40], [100, 70], [120, 30]] },
      { stroke: 'P-R-S-K-T-N', phrase: 'Learned Prosecution Counsel', rule: 'Contraction with medially halved stroke', path: [[40, 30], [40, 70], [80, 50], [120, 50]] }
    ]
  },
  {
    id: 'class-reporter-4',
    title: 'Parliament & Legislative Assembly Reporter 120+ WPM Elite Masterclass',
    shift: 'Evening Executive Bench',
    time: '5:30 PM – 7:30 PM',
    instructor: 'Senior Court Master',
    instructorRole: 'Ex-Parliament Reporter',
    speed: '120 - 140 WPM Elite',
    attendees: 64,
    isLive: false,
    tag: 'STARTS AT 5:30 PM ON ZOOM',
    badgeClass: 'badge-upcoming',
    zoomMeetingId: '891 4059 1133',
    zoomPasscode: 'ELITE120',
    zoomDirectUrl: 'https://zoom.us/j/89140591133?pwd=ELITE120',
    zoomAppUrl: 'zoommtg://zoom.us/join?confno=89140591133&pwd=ELITE120',
    zoomWebUrl: 'https://app.zoom.us/wc/89140591133/join',
    description: 'Rapid speech phraseography, advanced parliamentary contractions, and high-speed multi-speaker debate capture conducted in exclusive Zoom cohort.',
    todayTopic: 'Lok Sabha Finance Bill Clause-by-Clause Rapid Dictation',
    passageSnippet: "The Finance Bill was taken up for consideration in the Lok Sabha. Several amendments moved by the Hon'ble members from both Treasury and Opposition benches were examined clause by clause...",
    roomNo: 'Zoom Room #04 (Executive Chamber)',
    mode: 'Elite Zoom Live Call + Rapid Transcription',
    difficulty: 'Mastery',
    keyOutlines: [
      { stroke: 'F-N-N-S // B-L', phrase: 'Finance Bill Provision', rule: 'Halved N stroke with downward L', path: [[30, 30], [60, 60], [90, 40], [110, 70]] },
      { stroke: 'R-Z-L-U-S-H-N', phrase: 'Government Resolution', rule: 'Ray stroke through line', path: [[40, 60], [80, 20], [110, 40], [130, 60]] },
      { stroke: 'S-P-K-R // S-R', phrase: 'Mr. Speaker, Sir', rule: 'Special reporter prefix', path: [[30, 50], [60, 20], [90, 50], [120, 20]] }
    ]
  }
];

