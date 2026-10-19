import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  Headphones, 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Play, 
  Edit3, 
  Trash2, 
  Download, 
  RefreshCw, 
  Crown, 
  GraduationCap, 
  TrendingUp, 
  LayoutDashboard, 
  Globe, 
  Award, 
  Bell, 
  Eye, 
  Check, 
  X, 
  Lock, 
  Key, 
  EyeOff, 
  ShieldAlert, 
  ArrowLeft,
  Mail,
  Gauge,
  Activity,
  Layers,
  Sparkles,
  UploadCloud,
  Mic,
  MicOff,
  Square,
  Pause,
  Volume2,
  Music,
  Paperclip,
  Keyboard,
  Video,
  Radio,
  Target,
  Copy,
  ExternalLink,
  Megaphone,
  Calendar,
  Zap,
  Share2,
  Send,
  ArrowRight
} from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import { STENO_TESTS, TYPING_TESTS, PRICING_PLANS } from '../data/mockData';

const INITIAL_ADMIN_STUDENTS = [
  { id: 1, name: "Shadab Khan", rollNo: "SP-2026-084", email: "shadabca@gmail.com", targetExam: "Patna High Court", plan: "12-Month Pro Active", speed: 96, accuracy: 92.4, daysRemaining: 248, status: "Active" },
  { id: 2, name: "Vishnupriya S.", rollNo: "SP-2026-005", email: "vishnupriya@gmail.com", targetExam: "SSC Steno Grade C", plan: "12-Month Pro Active", speed: 84.5, accuracy: 97.4, daysRemaining: 310, status: "Active" },
  { id: 3, name: "Sagar Kumar Singh", rollNo: "SP-2026-009", email: "sagar.steno@gmail.com", targetExam: "Jharkhand High Court", plan: "6-Month Scholar", speed: 81.2, accuracy: 96.7, daysRemaining: 142, status: "Active" },
  { id: 4, name: "Ananya Rathore", rollNo: "SP-2026-018", email: "ananya.r@yahoo.com", targetExam: "SSC Steno Grade D", plan: "Monthly Test Series", speed: 79.4, accuracy: 95.7, daysRemaining: 18, status: "Active" },
  { id: 5, name: "Amit Sharma", rollNo: "SP-2026-024", email: "amit.steno99@gmail.com", targetExam: "Parliament Reporter", plan: "12-Month Pro Active", speed: 118, accuracy: 94.5, daysRemaining: 285, status: "Active" },
  { id: 6, name: "Pooja Verma", rollNo: "SP-2026-033", email: "pooja.v@gmail.com", targetExam: "Patna High Court", plan: "Monthly Test Series", speed: 75.8, accuracy: 94.2, daysRemaining: 6, status: "Active" },
  { id: 7, name: "Vikramaditya Roy", rollNo: "SP-2026-041", email: "vikram.roy@outlook.com", targetExam: "SSC Steno Grade D", plan: "1-Day Skill Sprint", speed: 68.0, accuracy: 88.5, daysRemaining: 0, status: "Expired" },
  { id: 8, name: "Neha Kumari", rollNo: "SP-2026-052", email: "neha.steno@gmail.com", targetExam: "Patna High Court", plan: "6-Month Scholar", speed: 82.0, accuracy: 93.1, daysRemaining: 95, status: "Active" }
];

const INITIAL_TRANSACTIONS = [
  { id: "TXN-98421", student: "Shadab Khan", rollNo: "SP-2026-084", plan: "12-Month Annual Career Master", amount: 1200, mode: "UPI (Paytm)", date: "Today, 14:20", status: "Auto-Verified" },
  { id: "TXN-98420", student: "Vishnupriya S.", rollNo: "SP-2026-005", plan: "12-Month Annual Career Master", amount: 1200, mode: "UPI (GPay)", date: "Today, 11:05", status: "Auto-Verified" },
  { id: "TXN-98419", student: "Rakesh Ranjan", rollNo: "SP-2026-092", plan: "Monthly Test Series", amount: 249, mode: "Debit Card", date: "Yesterday, 19:40", status: "Auto-Verified" },
  { id: "TXN-98418", student: "Pooja Verma", rollNo: "SP-2026-033", plan: "Monthly Test Series", amount: 249, mode: "UPI (PhonePe)", date: "Yesterday, 16:15", status: "Auto-Verified" },
  { id: "TXN-98417", student: "Sagar Kumar Singh", rollNo: "SP-2026-009", plan: "6-Month Pro Scholar", amount: 899, mode: "Net Banking", date: "09 Oct 2026", status: "Auto-Verified" },
  { id: "TXN-98416", student: "Vikramaditya Roy", rollNo: "SP-2026-041", plan: "1-Day Skill Sprint", amount: 20, mode: "UPI (BHIM)", date: "08 Oct 2026", status: "Auto-Verified" }
];

export default function AdminPortalView({ 
  user, 
  setCurrentTab, 
  onStartTest, 
  onStartTypingTest,
  onlineClasses = [],
  onCreateOnlineClass,
  onToggleLiveOnlineClass,
  onDeleteOnlineClass,
  onUpdateOnlineClass,
  onJoinClassAsAdmin 
}) {
  // Check if already authenticated via session or role
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    if (user?.role === 'admin') return true;
    try {
      return sessionStorage.getItem('shorthand_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setPasscodeError('');

    const validCodes = ['8080', 'admin@gaya', 'gaya2026', 'admin'];
    setTimeout(() => {
      if (validCodes.includes(passcode.trim().toLowerCase())) {
        try {
          sessionStorage.setItem('shorthand_admin_authenticated', 'true');
        } catch {}
        setIsAdminAuthenticated(true);
      } else {
        setPasscodeError('Invalid Director PIN or Passcode. Access restricted to authorized faculty.');
      }
      setIsVerifying(false);
    }, 200);
  };

  const handleLockConsole = () => {
    try {
      sessionStorage.removeItem('shorthand_admin_authenticated');
    } catch {}
    setIsAdminAuthenticated(false);
    setPasscode('');
  };

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'students' | 'tests' | 'finance' | 'announcements'
  const [students, setStudents] = useState(INITIAL_ADMIN_STUDENTS);
  const [tests, setTests] = useState(STENO_TESTS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Active' | 'Expiring' | 'Expired'

  // Modals state
  const [newTestModalOpen, setNewTestModalOpen] = useState(false);
  const [newStudentModalOpen, setNewStudentModalOpen] = useState(false);
  const [newTypingModalOpen, setNewTypingModalOpen] = useState(false);
  const [newClassModalOpen, setNewClassModalOpen] = useState(false);
  const [vaultViewMode, setVaultViewMode] = useState('audio'); // 'audio' | 'typing'
  const [typingTests, setTypingTests] = useState(TYPING_TESTS);
  const [classFilterStatus, setClassFilterStatus] = useState('all'); // 'all' | 'live' | 'upcoming' | 'replays'
  const [classViewMode, setClassViewMode] = useState('grid'); // 'grid' | 'timetable'
  const [classSearchQuery, setClassSearchQuery] = useState('');
  const [copiedClassId, setCopiedClassId] = useState(null);
  const [editingClass, setEditingClass] = useState(null);
  
  // Live Announcement broadcast state
  const [broadcastNoticeText, setBroadcastNoticeText] = useState('');
  const [activeBroadcastNotice, setActiveBroadcastNotice] = useState(() => {
    try {
      return localStorage.getItem('shorthand_live_announcement') || '🔴 SSC Stenographer Grade C & D 80 WPM live dictation is broadcasting now in Zoom Room #01. Students may join.';
    } catch {
      return '';
    }
  });
  const [isBroadcastingNotice, setIsBroadcastingNotice] = useState(false);

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!broadcastNoticeText.trim()) return;
    try {
      localStorage.setItem('shorthand_live_announcement', broadcastNoticeText.trim());
    } catch {}
    setActiveBroadcastNotice(broadcastNoticeText.trim());
    setBroadcastNoticeText('');
    setIsBroadcastingNotice(false);
    alert('Notice broadcasted! All online students will see this banner immediately.');
  };

  const handleClearNotice = () => {
    try {
      localStorage.removeItem('shorthand_live_announcement');
    } catch {}
    setActiveBroadcastNotice('');
  };

  const handleCopyClassInvite = (item) => {
    const cleanId = item.zoomMeetingId.replace(/\s+/g, '');
    const directUrl = item.zoomDirectUrl || `https://zoom.us/j/${cleanId}?pwd=${item.zoomPasscode}`;
    const inviteText = `🏛️ GAYA SHORTHAND CLASSES — LIVE ZOOM CLASS INVITE\n\n` +
      `Batch: ${item.title}\n` +
      `Timing: ${item.time} (${item.shift})\n` +
      `Speed: ${item.speed} | Faculty: ${item.instructor} (${item.roomNo})\n` +
      `Topic Today: ${item.todayTopic}\n\n` +
      `Zoom Meeting ID: ${item.zoomMeetingId}\n` +
      `Passcode: ${item.zoomPasscode}\n` +
      `Join Direct: ${directUrl}`;
    navigator.clipboard.writeText(inviteText);
    setCopiedClassId(item.id);
    setTimeout(() => setCopiedClassId(null), 2500);
  };

  const handleQuickStartLive = () => {
    const existing = (onlineClasses || []).find(c => c.shift === 'Special Live Sprint' || c.id.startsWith('class-quick'));
    if (existing) {
      if (onToggleLiveOnlineClass && !existing.isLive) {
        onToggleLiveOnlineClass(existing.id);
      }
      alert(`Live broadcast session "${existing.title}" is already on air!`);
      return;
    }
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const cleanId = '84291042281';
    const quickBatch = {
      id: `class-quick-${Date.now()}`,
      title: `Special Impromptu Live Dictation Sprint (${timeNow})`,
      shift: 'Special Live Sprint',
      time: `${timeNow} – Live Now`,
      instructor: 'Gagan Sir',
      instructorRole: 'Head Faculty • On-Air',
      speed: '80 - 100 WPM Dynamic',
      attendees: 1,
      isLive: true,
      tag: '🔴 ZOOM LIVE CALL ACTIVE',
      badgeClass: 'badge-live',
      zoomMeetingId: '842 9104 2281',
      zoomPasscode: 'GAYA80WPM',
      zoomDirectUrl: `https://zoom.us/j/${cleanId}?pwd=GAYA80WPM`,
      zoomAppUrl: `zoommtg://zoom.us/join?confno=${cleanId}&pwd=GAYA80WPM`,
      zoomWebUrl: `https://app.zoom.us/wc/${cleanId}/join`,
      description: 'Impromptu high-speed dictation test broadcasted live on Zoom. Real-time stroke feedback and immediate typing transcription.',
      todayTopic: 'Live Parliamentary & Judicial Mixed Rapid Test',
      passageSnippet: 'Mr. Chairman Sir, we rise today to examine the emergent fiscal provisions outlined in the statutory report...',
      roomNo: 'Zoom Room #01 (Studio Live)'
    };
    if (onCreateOnlineClass) onCreateOnlineClass(quickBatch);
    alert('Impromptu Live Class created and launched on air! Students can join right now.');
  };

  const handleSaveEditClass = (e) => {
    e.preventDefault();
    if (!editingClass) return;
    if (onUpdateOnlineClass) {
      onUpdateOnlineClass(editingClass);
    }
    setEditingClass(null);
    alert('Class details successfully updated and synced with students!');
  };

  const filteredOnlineClasses = (onlineClasses || []).filter((batch) => {
    if (classFilterStatus === 'live' && !batch.isLive) return false;
    if (classFilterStatus === 'upcoming' && (batch.isLive || batch.badgeClass === 'badge-replay')) return false;
    if (classFilterStatus === 'replays' && batch.badgeClass !== 'badge-replay') return false;
    if (classSearchQuery.trim()) {
      const q = classSearchQuery.toLowerCase();
      return (
        batch.title.toLowerCase().includes(q) ||
        batch.shift.toLowerCase().includes(q) ||
        batch.todayTopic.toLowerCase().includes(q) ||
        batch.speed.toLowerCase().includes(q) ||
        (batch.instructor && batch.instructor.toLowerCase().includes(q)) ||
        (batch.zoomMeetingId && batch.zoomMeetingId.includes(q))
      );
    }
    return true;
  });

  // New Pure Text Typing Test Form
  const [typingTitle, setTypingTitle] = useState('');
  const [typingAuthority, setTypingAuthority] = useState('Patna High Court');
  const [typingCategory, setTypingCategory] = useState('Judicial Precedent');
  const [typingLanguage, setTypingLanguage] = useState('English');
  const [typingTargetSpeed, setTypingTargetSpeed] = useState('35 WPM');
  const [typingDuration, setTypingDuration] = useState('10 Mins');
  const [typingDifficulty, setTypingDifficulty] = useState('Medium');
  const [typingPassage, setTypingPassage] = useState('');
  const [typingWords, setTypingWords] = useState(0);
  const [typingFileName, setTypingFileName] = useState('');

  // New Test Form - Metadata
  const [testTitle, setTestTitle] = useState('');
  const [testCategory, setTestCategory] = useState('SSC Steno Grade C & D');
  const [testSpeed, setTestSpeed] = useState('80 WPM');
  const [testLanguage, setTestLanguage] = useState('English');
  const [testWords, setTestWords] = useState(420);
  const [testPassage, setTestPassage] = useState('');

  // Audio Upload & Recording States
  const [audioSourceType, setAudioSourceType] = useState('upload'); // 'upload' | 'sample' | 'record'
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState('');
  const [audioFileSize, setAudioFileSize] = useState('');
  const [audioDuration, setAudioDuration] = useState(300);
  const [audioUrl, setAudioUrl] = useState('/assets/sample-dictation.mp3');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcriptFileName, setTranscriptFileName] = useState('');

  const audioPlayerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingTimerRef = useRef(null);
  const recordingSecondsRef = useRef(0);

  // Clean up audio on unmount or modal close
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const formatDuration = (totalSec) => {
    if (!totalSec || isNaN(totalSec)) return '00:00';
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const updatePassage = (text) => {
    setTestPassage(text);
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setTestWords(words);
  };

  const handleAudioFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioFileName(file.name);
      setAudioFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
      const url = URL.createObjectURL(file);
      setAudioUrl(url);

      const tempAudio = new Audio(url);
      tempAudio.onloadedmetadata = () => {
        if (tempAudio.duration && !isNaN(tempAudio.duration)) {
          setAudioDuration(Math.round(tempAudio.duration));
        }
      };
    }
  };

  const handleTranscriptFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setTranscriptFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        if (typeof content === 'string') {
          updatePassage(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const toggleAudioPreview = () => {
    if (!audioPlayerRef.current) return;
    if (isPlayingPreview) {
      audioPlayerRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      audioPlayerRef.current.play().then(() => {
        setIsPlayingPreview(true);
      }).catch((err) => {
        console.warn('Audio play error', err);
        setIsPlayingPreview(false);
      });
    }
  };

  const handleAudioEnded = () => {
    setIsPlayingPreview(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setAudioFileName(`Faculty_Live_Dictation_${Date.now()}.mp3`);
        setAudioFileSize((blob.size / (1024 * 1024)).toFixed(2) + ' MB');
        setAudioDuration(recordingSecondsRef.current || 30);
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingSecondsRef.current = 0;
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(s => {
          const next = s + 1;
          recordingSecondsRef.current = next;
          return next;
        });
      }, 1000);
    } catch (err) {
      alert("Microphone permission was not granted or microphone not detected. You can use 'Upload Audio' or 'Pre-Recorded Sample' instead.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      }
      setIsRecording(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    }
  };

  // Handlers
  const handleCreateTest = (e) => {
    e.preventDefault();
    if (!testTitle.trim() || !testPassage.trim()) {
      alert("Please provide both a Dictation Title and Master Benchmark Passage.");
      return;
    }

    const finalAudioUrl = audioUrl || "/assets/sample-dictation.mp3";
    const finalDuration = audioDuration || Math.round((testWords / (parseInt(testSpeed) || 80)) * 60) || 300;

    const newTest = {
      id: Date.now(),
      title: testTitle,
      category: testCategory,
      speed: testSpeed,
      speedWpm: parseInt(testSpeed) || 80,
      language: testLanguage,
      duration: `${Math.ceil(finalDuration / 60)} Mins`,
      totalWords: Number(testWords) || 400,
      audioUrl: finalAudioUrl,
      audioDuration: finalDuration,
      attempts: 0,
      passageText: testPassage,
      audioFileName: audioFileName || 'calibrated-dictation.mp3'
    };

    setTests([newTest, ...tests]);
    setNewTestModalOpen(false);
    setTestTitle('');
    setTestPassage('');
    setAudioFile(null);
    setAudioFileName('');
    setAudioUrl('/assets/sample-dictation.mp3');
    setRecordedBlob(null);
    setIsPlayingPreview(false);
    setTranscriptFileName('');
    alert(`Success! Test "${newTest.title}" with audio track & master transcript has been published to the Audio Dictation Vault!`);
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim()) return;

    const newStudent = {
      id: Date.now(),
      name: studentName,
      rollNo: studentRoll,
      email: studentEmail,
      targetExam: studentExam,
      plan: studentPlan,
      speed: 70,
      accuracy: 90,
      daysRemaining: studentPlan.includes('12') ? 365 : studentPlan.includes('6') ? 180 : 30,
      status: "Active"
    };

    setStudents([newStudent, ...students]);
    setNewStudentModalOpen(false);
    setStudentName('');
    setStudentEmail('');
    alert(`Candidate "${newStudent.name}" enrolled successfully with Roll No ${newStudent.rollNo}!`);
  };

  const toggleStudentStatus = (id) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return s;
    }));
  };

  const extendStudentPlan = (id) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        return { ...s, daysRemaining: s.daysRemaining + 30, status: 'Active' };
      }
      return s;
    }));
    alert("Candidate subscription extended by +30 Days!");
  };

  const deleteTest = (id) => {
    if (confirm("Are you sure you want to remove this dictation test from the active vault?")) {
      setTests(tests.filter(t => t.id !== id));
    }
  };

  const updateTypingPassage = (text) => {
    setTypingPassage(text);
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setTypingWords(words);
  };

  const handleTypingFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setTypingFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        if (typeof content === 'string') {
          updateTypingPassage(content);
          if (!typingTitle.trim()) {
            const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
            setTypingTitle(cleanName);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleCreateTypingTest = (e) => {
    e.preventDefault();
    if (!typingTitle.trim() || !typingPassage.trim()) {
      alert("Please provide both an Exercise Title and Master Benchmark Passage text.");
      return;
    }

    const calculatedWords = typingWords || (typingPassage.trim() ? typingPassage.trim().split(/\s+/).length : 350);
    const difficultyDots = typingDifficulty === 'Easy' ? 1 : typingDifficulty === 'Medium' ? 2 : 3;

    const newExercise = {
      id: Date.now(),
      name: typingTitle,
      language: typingLanguage,
      words: calculatedWords,
      time: typingDuration,
      difficulty: typingDifficulty,
      difficultyDots,
      authority: typingAuthority,
      category: typingCategory,
      targetSpeed: typingTargetSpeed,
      avgAccuracy: "96.5%",
      completedCount: 0,
      passageText: typingPassage
    };

    TYPING_TESTS.unshift(newExercise);
    setTypingTests([newExercise, ...typingTests]);
    setNewTypingModalOpen(false);
    
    // Reset form
    setTypingTitle('');
    setTypingPassage('');
    setTypingWords(0);
    setTypingFileName('');
    setVaultViewMode('typing');

    alert(`Success! Text-Only Typing Exercise "${newExercise.name}" has been uploaded and published to the Typing Studio!`);
  };

  const deleteTypingTest = (id) => {
    if (confirm("Are you sure you want to delete this text typing exercise?")) {
      setTypingTests(prev => prev.filter(t => t.id !== id));
      const idx = TYPING_TESTS.findIndex(t => t.id === id);
      if (idx !== -1) TYPING_TESTS.splice(idx, 1);
    }
  };

  const loadSampleTypingPassage = (type) => {
    if (type === 'court') {
      const sample = `In the High Court of Judicature at Patna. Criminal Appeal No. 748 of 2024. The present appeal has been preferred against the judgment of conviction and order of sentence rendered by the learned Sessions Judge in Sessions Trial No. 112 of 2021, whereby the sole appellant has been convicted under Section 302 of the Indian Penal Code and sentenced to undergo rigorous imprisonment for life along with fine of ten thousand rupees. The prosecution case, as unfolded by the first informant in the fardbeyan recorded by the Station House Officer, is that on the date of occurrence at around 6:30 PM, the deceased was returning from the weekly village market. Near the irrigation canal culvert, the appellant armed with an iron rod intercepted the victim and inflicted fatal blow on his vital organs. The learned counsel appearing for the appellant has vigorously argued that there was no independent corroboration of the testimony of interested witnesses, and forensic recovery of weapon remains doubtful. We have carefully scrutinized the depositions of all prosecution witnesses and the medical autopsy report. In our considered opinion, the chain of circumstances points unerringly towards the guilt of the accused without reasonable doubt.`;
      updateTypingPassage(sample);
      setTypingTitle('Patna High Court Criminal Appeal Judgment');
      setTypingAuthority('Patna High Court');
      setTypingCategory('Judicial Precedent');
    } else if (type === 'ssc') {
      const sample = `Government of India, Staff Selection Commission. Recruitment to the post of Lower Division Clerk, Junior Secretariat Assistant and Data Entry Operators. In accordance with the executive guidelines and civil service examination regulations, the skill test shall be conducted on computer keyboards with standard QWERTY layout. The typing speed test of 35 words per minute in English or 30 words per minute in Hindi corresponds to approximately 10,500 key depressions per hour or 9,000 key depressions per hour respectively on the basis of average 5 key depressions for each word. Candidates must maintain strict posture and focus on the display monitor. Any deliberate alteration of the text software or unauthorized keystrokes will lead to immediate disqualification. The evaluation will account for total words typed, half mistakes, and full mistakes in accordance with the published examination scheme.`;
      updateTypingPassage(sample);
      setTypingTitle('SSC Tier-II Official Secretariat Memorandum');
      setTypingAuthority('SSC CGL / CHSL Tier-II');
      setTypingCategory('Official Memorandum');
    } else if (type === 'hindi') {
      const sample = `उच्च न्यायालय पटना। सिविल अपील संख्या ४५२। प्रस्तुत अपील विद्वान अधीनस्थ न्यायालय के निर्णय के विरुद्ध दाखिल की गई है। वादी ने अपने वाद पत्र में यह अभिकथन किया था कि विवादित भूमि पर उसका पैतृक अधिकार रहा है और प्रतिवादीगण बिना किसी वैध अधिकार के उस पर अतिक्रमण करने का प्रयास कर रहे हैं। दोनों पक्षों के साक्ष्यों का सम्यक अनुशीलन करने के पश्चात यह न्यायालय इस निष्कर्ष पर पहुंचता है कि प्रार्थी का स्वत्व पूर्ण रूप से सिद्ध होता है। अतः यह अपील स्वीकार की जाती है तथा वाद डिक्री किया जाता है।`;
      updateTypingPassage(sample);
      setTypingTitle('पटना उच्च न्यायालय - सिविल अपील निर्णय (हिंदी)');
      setTypingAuthority('Patna High Court');
      setTypingCategory('Judicial Precedent');
      setTypingLanguage('Hindi (Mangal)');
    }
  };

  // Quick Student Counts
  const countAll = students.length;
  const countActive = students.filter(s => s.status === 'Active' && s.daysRemaining > 0).length;
  const countExpiring = students.filter(s => s.daysRemaining > 0 && s.daysRemaining <= 30).length;
  const countExpired = students.filter(s => s.daysRemaining === 0 || s.status !== 'Active').length;

  // Filtered Students
  const filteredStudents = students.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      s.name.toLowerCase().includes(q) ||
      s.rollNo.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.targetExam.toLowerCase().includes(q);
    const matchesPlan = filterPlan === 'All' || s.plan.includes(filterPlan);
    const matchesStatus = statusFilter === 'All' ||
      (statusFilter === 'Active' && s.status === 'Active' && s.daysRemaining > 0) ||
      (statusFilter === 'Expiring' && s.daysRemaining > 0 && s.daysRemaining <= 30) ||
      (statusFilter === 'Expired' && (s.daysRemaining === 0 || s.status !== 'Active'));
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const getPassBadgeClass = (plan) => {
    if (!plan) return 'pass-default';
    if (plan.includes('12-Month')) return 'pass-annual';
    if (plan.includes('6-Month')) return 'pass-scholar';
    if (plan.includes('Monthly')) return 'pass-monthly';
    if (plan.includes('1-Day')) return 'pass-sprint';
    return 'pass-default';
  };

  // SECURITY CLEARANCE GATE
  if (!isAdminAuthenticated) {
    return (
      <div className="admin-lock-screen-wrapper">
        <div className="admin-lock-card">
          <div className="admin-lock-shield-badge">
            <Lock size={26} color="#ffffff" strokeWidth={2.2} />
          </div>

          <div className="admin-lock-header">
            <div className="badge-restricted-pill">
              <ShieldAlert size={12} />
              <span>Restricted Administration Clearance</span>
            </div>
            <h2>Director & Faculty Console</h2>
            <p>
              This portal manages confidential student admissions, exam question repositories, and financial records for Gaya Shorthand Classes.
            </p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="admin-lock-form">
            <label className="admin-lock-label" htmlFor="admin-pin-input">
              Faculty Master Passcode / PIN
            </label>
            <div className="admin-input-group">
              <Key size={16} className="input-icon-left" />
              <input
                id="admin-pin-input"
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setPasscodeError(''); }}
                placeholder="Enter Director Passcode..."
                className={`admin-passcode-input ${passcodeError ? 'input-error' : ''}`}
                autoFocus
              />
              <button
                type="button"
                className="input-eye-btn"
                onClick={() => setShowPasscode(!showPasscode)}
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {passcodeError && (
              <div className="admin-passcode-error">
                <AlertCircle size={14} />
                <span>{passcodeError}</span>
              </div>
            )}

            <div className="admin-pin-hint-card">
              <span className="hint-label">Faculty Demo Passcode:</span>
              <code className="hint-code" onClick={() => setPasscode('8080')}>8080</code>
            </div>

            <div className="admin-lock-actions">
              <button 
                type="button" 
                className="btn btn-secondary w-full"
                onClick={() => setCurrentTab('landing')}
              >
                <ArrowLeft size={15} />
                <span>Public Website</span>
              </button>
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={!passcode.trim() || isVerifying}
              >
                {isVerifying ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    <span>Authorize & Enter</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="admin-lock-footer-info">
            <span>© Gaya Shorthand Classes • Protected Academic Network</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-wrapper">
      
      {/* Top Admin Navigation Header */}
      <header className="admin-header-strip">
        <div className="admin-header-container">
          <div className="admin-brand-cluster">
            <div className="admin-badge-squircle">
              <ShieldCheck size={22} color="#ffffff" />
            </div>
            <div>
              <div className="admin-brand-title">
                <span>Director Administration Console</span>
                <span className="badge-admin-role">Super Admin</span>
              </div>
              <span className="admin-brand-sub">Gaya Shorthand Classes • ShorthandPlus Unified Management</span>
            </div>
          </div>

          <div className="admin-header-actions">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentTab('dashboard')}
              title="Switch to Student Candidate View"
            >
              <LayoutDashboard size={15} />
              <span>Student Portal</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setCurrentTab('landing')}
              title="Return to Public Website"
            >
              <Globe size={15} />
              <span>Public Website</span>
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setNewTestModalOpen(true)}
            >
              <Plus size={15} />
              <span>New Audio Dictation</span>
            </button>
            <button 
              className="btn btn-sm"
              onClick={() => setNewTypingModalOpen(true)}
              title="Upload Pure Text Typing Exercise (No Audio)"
              style={{ background: '#059669', color: '#ffffff', borderColor: '#059669', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700' }}
            >
              <Keyboard size={15} />
              <span>+ New Text Typing Test</span>
            </button>
            <button 
              className="btn btn-sm"
              onClick={() => {
                loadClassTemplate('ssc80');
                setNewClassModalOpen(true);
              }}
              title="Schedule or Go Live with an Online Zoom Class"
              style={{ background: '#881337', color: '#ffffff', borderColor: '#881337', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700' }}
            >
              <Video size={15} />
              <span>+ Schedule Live Class</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm text-rose"
              onClick={handleLockConsole}
              title="Lock Console & Clear Clearance Session"
            >
              <Lock size={14} />
              <span>Lock Console</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="admin-body-container">
        
        {/* KPI Summary Cards */}
        <div className="admin-kpi-grid">
          <div className="saas-card admin-kpi-card">
            <div className="kpi-icon-wrap bg-blue-subtle">
              <Users size={20} className="text-blue" />
            </div>
            <div className="kpi-info-col">
              <span className="kpi-label-text">Total Enrolled Aspirants</span>
              <div className="kpi-val-number font-mono">{students.length + 2838}</div>
              <span className="kpi-trend text-emerald font-mono">+24 new this week</span>
            </div>
          </div>

          <div className="saas-card admin-kpi-card">
            <div className="kpi-icon-wrap bg-emerald-subtle">
              <CreditCard size={20} className="text-emerald" />
            </div>
            <div className="kpi-info-col">
              <span className="kpi-label-text">Monthly Pass Revenue</span>
              <div className="kpi-val-number font-mono">₹3,48,200</div>
              <span className="kpi-trend text-emerald font-mono">100% Instant Digital UPI</span>
            </div>
          </div>

          <div className="saas-card admin-kpi-card">
            <div className="kpi-icon-wrap bg-purple-subtle">
              <Headphones size={20} className="text-royal-blue" />
            </div>
            <div className="kpi-info-col">
              <span className="kpi-label-text">Active Audio Dictations</span>
              <div className="kpi-val-number font-mono">{tests.length + 1716} Tests</div>
              <span className="kpi-trend text-blue font-mono">80, 100, 120, 140 WPM</span>
            </div>
          </div>

          <div className="saas-card admin-kpi-card">
            <div className="kpi-icon-wrap bg-rose-subtle">
              <Video size={20} className="text-rose-600" />
            </div>
            <div className="kpi-info-col">
              <span className="kpi-label-text">Live Zoom Batches</span>
              <div className="kpi-val-number font-mono">{onlineClasses.length} Batches</div>
              <span className="kpi-trend text-rose-600 font-mono">
                {onlineClasses.filter(c => c.isLive).length} Active Live Now
              </span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="admin-tabs-nav-bar">
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={16} />
            <span>Candidate Registry</span>
            <span className="admin-tab-count-pill">{students.length}</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
          >
            <Video size={16} />
            <span>Live Zoom Classes</span>
            <span className="admin-tab-count-pill font-mono">
              {onlineClasses.length} ({onlineClasses.filter(c => c.isLive).length} Live)
            </span>
          </button>
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
          >
            <Headphones size={16} />
            <span>Dictation & Test Vault</span>
            <span className="admin-tab-count-pill">{tests.length + typingTests.length}</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'finance' ? 'active' : ''}`}
            onClick={() => setActiveTab('finance')}
          >
            <CreditCard size={16} />
            <span>Pass Transactions</span>
            <span className="admin-tab-count-pill">UPI</span>
          </button>
          <button 
            type="button"
            className={`admin-nav-tab ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            <Bell size={16} />
            <span>Notices & Diplomas</span>
            <span className="admin-tab-count-pill">Govt</span>
          </button>
        </div>

        {/* TAB 1: Candidate Registry (Default) */}
        {activeTab === 'overview' && (
          <div className="saas-card admin-content-card">
            <div className="table-header-control-row">
              <div className="search-filter-pair">
                <div className="admin-search-box">
                  <Search size={16} className="text-muted" />
                  <input 
                    type="text"
                    placeholder="Search candidate by name, roll no, email, exam..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="clear-btn">×</button>}
                </div>
                <div className="admin-filter-dropdown">
                  <CustomSelect
                    className="filter-custom-select"
                    value={filterPlan}
                    onChange={(val) => setFilterPlan(val)}
                    prefixIcon={<Filter size={15} className="text-muted" />}
                    options={[
                      { value: 'All', label: 'All Subscription Plans' },
                      { value: '12-Month', label: '12-Month Annual' },
                      { value: '6-Month', label: '6-Month Scholar' },
                      { value: 'Monthly', label: 'Monthly Pass' },
                      { value: '1-Day', label: '1-Day Sprint' }
                    ]}
                  />
                </div>
              </div>

              <div className="admin-header-actions-right">
                <button 
                  className="btn-add-candidate-glow"
                  onClick={() => setNewStudentModalOpen(true)}
                >
                  <Plus size={16} />
                  <span>Add Candidate</span>
                </button>
              </div>
            </div>

            {/* Quick Status Chips Bar */}
            <div className="admin-status-chips-bar">
              <div className="chips-group">
                <button 
                  type="button"
                  className={`status-chip-btn ${statusFilter === 'All' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('All')}
                >
                  <span>All Aspirants</span>
                  <span className="chip-count">{countAll}</span>
                </button>
                <button 
                  type="button"
                  className={`status-chip-btn chip-active-state ${statusFilter === 'Active' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('Active')}
                >
                  <span className="chip-dot dot-emerald" />
                  <span>Active</span>
                  <span className="chip-count">{countActive}</span>
                </button>
                <button 
                  type="button"
                  className={`status-chip-btn chip-expiring-state ${statusFilter === 'Expiring' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('Expiring')}
                >
                  <span className="chip-dot dot-amber" />
                  <span>Expiring Soon (≤30d)</span>
                  <span className="chip-count">{countExpiring}</span>
                </button>
                <button 
                  type="button"
                  className={`status-chip-btn chip-expired-state ${statusFilter === 'Expired' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('Expired')}
                >
                  <span className="chip-dot dot-rose" />
                  <span>Expired / Suspended</span>
                  <span className="chip-count">{countExpired}</span>
                </button>
              </div>

              <div className="filter-result-pill">
                <span>Showing <strong>{filteredStudents.length}</strong> of <strong>{countAll}</strong> Candidates</span>
              </div>
            </div>

            <div className="table-responsive">
              <table className="corporate-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        <Users size={13} />
                        <span>Candidate</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Key size={13} />
                        <span>Roll Number</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Award size={13} />
                        <span>Target Exam</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <CreditCard size={13} />
                        <span>Current Pass</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Clock size={13} />
                        <span>Validity / Days Left</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Gauge size={13} />
                        <span>Steno Speed</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Activity size={13} />
                        <span>Status</span>
                      </div>
                    </th>
                    <th style={{ textAlign: 'right' }}>
                      <div className="th-content" style={{ justifyContent: 'flex-end' }}>
                        <span>Actions</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="empty-table-cell">
                        <div className="empty-state-box">
                          <AlertCircle size={32} className="text-muted" />
                          <h4>No matching candidates found</h4>
                          <p>Try refining your search keyword or clearing filters.</p>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => { setSearchQuery(''); setFilterPlan('All'); setStatusFilter('All'); }}
                          >
                            Reset All Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <div className="admin-user-cell">
                            <div className="admin-avatar-bubble">
                              {s.name.charAt(0)}
                            </div>
                            <div className="admin-user-info">
                              <span className="admin-user-fullname">{s.name}</span>
                              <span className="admin-user-email-text">
                                <Mail size={12} className="admin-inline-mail-icon" />
                                <span>{s.email}</span>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="admin-roll-capsule">
                            {s.rollNo}
                          </span>
                        </td>
                        <td>
                          <span className="admin-exam-capsule">
                            {s.targetExam}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-pass-chip ${getPassBadgeClass(s.plan)}`}>
                            <Crown size={12} />
                            <span>{s.plan}</span>
                          </span>
                        </td>
                        <td>
                          <div className="admin-validity-widget">
                            <div className="validity-text-row">
                              <span className={`validity-days-badge ${s.daysRemaining === 0 ? 'badge-expired' : s.daysRemaining <= 10 ? 'badge-urgent' : s.daysRemaining <= 30 ? 'badge-warning' : 'badge-good'}`}>
                                {s.daysRemaining === 0 ? 'Expired' : `${s.daysRemaining} days left`}
                              </span>
                            </div>
                            {s.daysRemaining > 0 && (
                              <div className="admin-validity-track">
                                <div 
                                  className={`admin-validity-progress ${s.daysRemaining <= 10 ? 'prog-red' : s.daysRemaining <= 30 ? 'prog-amber' : 'prog-green'}`} 
                                  style={{ width: `${Math.min(100, Math.round((s.daysRemaining / 365) * 100))}%` }} 
                                />
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="admin-speed-widget">
                            <div className="speed-main-val">
                              <Gauge size={13} className="text-royal-blue" />
                              <span className="speed-number">{s.speed}</span>
                              <span className="speed-unit">WPM</span>
                            </div>
                            <span className="accuracy-subval">{s.accuracy}% accuracy</span>
                          </div>
                        </td>
                        <td>
                          <span className={`admin-status-indicator ${s.status === 'Active' && s.daysRemaining > 0 ? 'is-active' : 'is-inactive'}`}>
                            <span className="pulse-dot" />
                            <span>{s.daysRemaining === 0 ? 'Expired' : s.status}</span>
                          </span>
                        </td>
                        <td>
                          <div className="admin-actions-cluster">
                            <button 
                              className="admin-btn-action btn-extend"
                              onClick={() => extendStudentPlan(s.id)}
                              title="Extend validity +30 days"
                            >
                              <Clock size={12} />
                              <span>+30d</span>
                            </button>
                            <button 
                              className={`admin-btn-action ${s.status === 'Active' && s.daysRemaining > 0 ? 'btn-suspend' : 'btn-activate'}`}
                              onClick={() => toggleStudentStatus(s.id)}
                              title={s.status === 'Active' ? 'Suspend candidate account' : 'Activate candidate account'}
                            >
                              {s.status === 'Active' && s.daysRemaining > 0 ? 'Suspend' : 'Activate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Dictation & Test Vault Manager */}
        {activeTab === 'tests' && (
          <div className="saas-card admin-content-card">
            {/* Vault Type Sub-navigation Toggle */}
            <div className="vault-subnav-toggle">
              <button 
                type="button"
                className={`vault-subnav-btn ${vaultViewMode === 'audio' ? 'active' : ''}`}
                onClick={() => setVaultViewMode('audio')}
              >
                <Headphones size={15} />
                <span>Audio Dictations (Shorthand)</span>
                <span className="vault-subnav-badge">{tests.length}</span>
              </button>
              <button 
                type="button"
                className={`vault-subnav-btn typing-active ${vaultViewMode === 'typing' ? 'active' : ''}`}
                onClick={() => setVaultViewMode('typing')}
              >
                <Keyboard size={15} />
                <span>Typing Exercises (Text Only)</span>
                <span className="vault-subnav-badge">{typingTests.length}</span>
              </button>
            </div>

            {vaultViewMode === 'audio' ? (
              <>
                <div className="table-header-control-row">
                  <div>
                    <h3 className="section-title-sm">Official Studio Audio Dictation Library</h3>
                    <p className="section-sub-sm">Calibrated speeds (80, 100, 120, 140 WPM) with 5-min reading rooms & master transcripts.</p>
                  </div>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => setNewTestModalOpen(true)}
                  >
                    <Plus size={15} />
                    <span>Upload New Audio Dictation</span>
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="corporate-table">
                    <thead>
                      <tr>
                        <th><div className="th-content"><Headphones size={13} /><span>Dictation Title</span></div></th>
                        <th><div className="th-content"><Award size={13} /><span>Category</span></div></th>
                        <th><div className="th-content"><Gauge size={13} /><span>Speed</span></div></th>
                        <th><div className="th-content"><Globe size={13} /><span>Language</span></div></th>
                        <th><div className="th-content"><FileText size={13} /><span>Words</span></div></th>
                        <th><div className="th-content"><span>Passage Excerpt</span></div></th>
                        <th style={{ textAlign: 'right' }}><div className="th-content" style={{ justifyContent: 'flex-end' }}><span>Action</span></div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tests.map((t) => (
                        <tr key={t.id}>
                          <td>
                            <div className="admin-dictation-cell">
                              <div className="dictation-audio-bubble">
                                <Headphones size={14} className="text-royal-blue" />
                              </div>
                              <div className="dictation-meta">
                                <span className="dictation-title-text">{t.title}</span>
                                <span className="dictation-id-sub">Ref Code: #{t.id}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="admin-exam-capsule">
                              {t.category}
                            </span>
                          </td>
                          <td>
                            <span className="admin-speed-badge font-mono">
                              {t.speed}
                            </span>
                          </td>
                          <td>
                            <span className="admin-lang-pill">
                              {t.language}
                            </span>
                          </td>
                          <td className="font-mono font-bold text-slate-700">{t.totalWords}</td>
                          <td>
                            <span className="dictation-excerpt-text" title={t.passageText}>
                              {t.passageText.slice(0, 75)}...
                            </span>
                          </td>
                          <td>
                            <div className="admin-actions-cluster">
                              <button 
                                className="admin-btn-action btn-preview"
                                onClick={() => onStartTest(t.id)}
                                title="Launch dictation test"
                              >
                                <Play size={12} />
                                <span>Preview</span>
                              </button>
                              <button 
                                className="admin-btn-action btn-delete"
                                onClick={() => deleteTest(t.id)}
                                title="Delete dictation from vault"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="table-header-control-row">
                  <div>
                    <h3 className="section-title-sm">Official Text-Only Typing Exercise Library</h3>
                    <p className="section-sub-sm">Pure text benchmark passages for Court, SSC & Clerical on-screen typing speed drills (No audio required).</p>
                  </div>
                  <button 
                    className="btn btn-sm"
                    onClick={() => setNewTypingModalOpen(true)}
                    style={{ background: '#059669', color: '#ffffff', borderColor: '#059669', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700' }}
                  >
                    <Keyboard size={15} />
                    <span>Upload New Text Typing Test</span>
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="corporate-table">
                    <thead>
                      <tr>
                        <th><div className="th-content"><Keyboard size={13} /><span>Exercise Name</span></div></th>
                        <th><div className="th-content"><Award size={13} /><span>Target Authority</span></div></th>
                        <th><div className="th-content"><Gauge size={13} /><span>Target Speed</span></div></th>
                        <th><div className="th-content"><Globe size={13} /><span>Language</span></div></th>
                        <th><div className="th-content"><Clock size={13} /><span>Duration</span></div></th>
                        <th><div className="th-content"><FileText size={13} /><span>Words</span></div></th>
                        <th><div className="th-content"><span>Passage Excerpt</span></div></th>
                        <th style={{ textAlign: 'right' }}><div className="th-content" style={{ justifyContent: 'flex-end' }}><span>Action</span></div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {typingTests.map((t) => (
                        <tr key={t.id}>
                          <td>
                            <div className="admin-dictation-cell">
                              <div className="dictation-audio-bubble" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                                <Keyboard size={14} style={{ color: '#059669' }} />
                              </div>
                              <div className="dictation-meta">
                                <span className="dictation-title-text">{t.name}</span>
                                <span className="dictation-id-sub">Ref ID: #{t.id} • {t.category || 'General Drill'}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="admin-exam-capsule">
                              {t.authority || 'High Court / SSC'}
                            </span>
                          </td>
                          <td>
                            <span className="admin-speed-badge font-mono" style={{ background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}>
                              {t.targetSpeed || '35 WPM'}
                            </span>
                          </td>
                          <td>
                            <span className="admin-lang-pill">
                              {t.language}
                            </span>
                          </td>
                          <td className="font-mono text-slate-600 font-semibold">{t.time}</td>
                          <td className="font-mono font-bold text-slate-700">{t.words}</td>
                          <td>
                            <span className="dictation-excerpt-text" title={t.passageText}>
                              {t.passageText ? t.passageText.slice(0, 80) + '...' : 'No excerpt'}
                            </span>
                          </td>
                          <td>
                            <div className="admin-actions-cluster">
                              <button 
                                className="admin-btn-action btn-preview"
                                onClick={() => {
                                  if (onStartTypingTest) {
                                    onStartTypingTest(t);
                                  } else {
                                    alert("Previewing test in typing view");
                                  }
                                }}
                                title="Launch test in Typing Studio"
                                style={{ background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}
                              >
                                <Play size={12} />
                                <span>Preview</span>
                              </button>
                              <button 
                                className="admin-btn-action btn-delete"
                                onClick={() => deleteTypingTest(t.id)}
                                title="Delete exercise from vault"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 3: Subscription & Revenue Logs */}
        {activeTab === 'finance' && (
          <div className="saas-card admin-content-card">
            <div className="table-header-control-row">
              <div>
                <h3 className="section-title-sm">Subscription Pass Transactions & UPI Logs</h3>
                <p className="section-sub-sm">All payments processed via UPI QR and direct gateway with instant activation.</p>
              </div>
              <div className="stat-pill-highlight font-mono">
                <span>Total Month: </span>
                <strong>₹3,48,200</strong>
              </div>
            </div>

            <div className="table-responsive">
              <table className="corporate-table">
                <thead>
                  <tr>
                    <th><div className="th-content"><Key size={13} /><span>Txn ID</span></div></th>
                    <th><div className="th-content"><Users size={13} /><span>Candidate</span></div></th>
                    <th><div className="th-content"><span>Roll No</span></div></th>
                    <th><div className="th-content"><CreditCard size={13} /><span>Plan Activated</span></div></th>
                    <th><div className="th-content"><span>Amount</span></div></th>
                    <th><div className="th-content"><span>Payment Channel</span></div></th>
                    <th><div className="th-content"><Clock size={13} /><span>Date & Time</span></div></th>
                    <th><div className="th-content"><CheckCircle2 size={13} /><span>Verification</span></div></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td><span className="admin-roll-capsule font-mono">{t.id}</span></td>
                      <td>
                        <div className="admin-user-cell">
                          <div className="admin-avatar-bubble avatar-sm">
                            {t.student.charAt(0)}
                          </div>
                          <span className="admin-user-fullname">{t.student}</span>
                        </div>
                      </td>
                      <td><span className="admin-roll-capsule">{t.rollNo}</span></td>
                      <td>
                        <span className={`admin-pass-chip ${getPassBadgeClass(t.plan)}`}>
                          <Crown size={11} />
                          <span>{t.plan}</span>
                        </span>
                      </td>
                      <td><span className="admin-revenue-amount font-mono">₹{t.amount}</span></td>
                      <td><span className="admin-exam-capsule">{t.mode}</span></td>
                      <td><span className="admin-date-text font-mono">{t.date}</span></td>
                      <td>
                        <span className="admin-status-indicator is-active">
                          <CheckCircle2 size={13} />
                          <span>{t.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Announcements & Diplomas */}
        {activeTab === 'announcements' && (
          <div className="saas-card admin-content-card">
            <div className="table-header-control-row">
              <div>
                <h3 className="section-title-sm">Recruitment Bulletin & Govt Diploma Issuance</h3>
                <p className="section-sub-sm">Manage court exam updates and student DCA, ADCA, Tally diploma certificates.</p>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => alert("Announcement published to candidate portal bulletin.")}
              >
                <Plus size={15} />
                <span>Publish New Exam Alert</span>
              </button>
            </div>

            <div className="admin-diploma-grid">
              <div className="saas-card diploma-stat-box">
                <GraduationCap size={28} className="text-blue" />
                <h4 className="stat-number font-mono">248</h4>
                <p className="stat-desc">DCA Diplomas Issued (6 Months)</p>
              </div>
              <div className="saas-card diploma-stat-box">
                <Award size={28} className="text-emerald" />
                <h4 className="stat-number font-mono">182</h4>
                <p className="stat-desc">ADCA Diplomas Issued (1 Year)</p>
              </div>
              <div className="saas-card diploma-stat-box">
                <ShieldCheck size={28} className="text-amber" />
                <h4 className="stat-number font-mono">415</h4>
                <p className="stat-desc">Verified Shorthand Speed Certificates</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Live Online Classes & Zoom Studio Management */}
        {activeTab === 'classes' && (
          <div className="saas-card admin-content-card">
            
            {/* Top Header Control Row */}
            <div className="table-header-control-row">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="section-title-sm">Live Online Zoom Batches & Dictation Studio</h3>
                  <span className={`badge ${onlineClasses.some(c => c.isLive) ? 'badge-live' : 'badge-replay'}`}>
                    {onlineClasses.filter(c => c.isLive).length} Class(es) Live Now
                  </span>
                </div>
                <p className="section-sub-sm">
                  Schedule, broadcast, and manage real-time Zoom video classrooms. Any class marked "Live" is instantly pushed to candidate portals with 1-click joining.
                </p>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex items-center gap-2 flex-wrap">
                <button 
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsBroadcastingNotice(!isBroadcastingNotice)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700' }}
                  title="Broadcast a live banner announcement to all online students"
                >
                  <Megaphone size={14} className="text-amber-600" />
                  <span>{isBroadcastingNotice ? 'Close Notice Form' : 'Broadcast Notice'}</span>
                </button>

                <button 
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleQuickStartLive}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700', color: '#dc2626', borderColor: '#fca5a5', background: '#fff1f2' }}
                  title="Instantly launch an impromptu live broadcast on Zoom"
                >
                  <Zap size={14} className="text-rose-600 fill-rose-600" />
                  <span>⚡ Instant Live Class</span>
                </button>

                <button 
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    loadClassTemplate('ssc80');
                    setNewClassModalOpen(true);
                  }}
                  style={{ background: '#881337', borderColor: '#881337', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: '700' }}
                >
                  <Video size={15} />
                  <span>+ Schedule Live Online Class</span>
                </button>
              </div>
            </div>

            {/* Broadcast Live Notice Composer (Expandable) */}
            {isBroadcastingNotice && (
              <form onSubmit={handlePostNotice} className="admin-notice-broadcast-box animate-fade-in mt-3 mb-3">
                <div className="notice-box-header">
                  <div className="flex items-center gap-2">
                    <Megaphone size={16} className="text-amber-600" />
                    <span className="font-bold text-sm text-slate-800">Broadcast Instant Alert to All Online Candidates</span>
                  </div>
                  <button 
                    type="button" 
                    className="btn-close-notice-box" 
                    onClick={() => setIsBroadcastingNotice(false)}
                  >
                    <X size={15} />
                  </button>
                </div>
                <div className="notice-box-body">
                  <input 
                    type="text" 
                    className="field-input" 
                    placeholder="e.g. 📢 Attention Aspirants: SSC 80 WPM Parliamentary dictation begins in 5 mins. Keep shorthand pads ready!"
                    value={broadcastNoticeText}
                    onChange={(e) => setBroadcastNoticeText(e.target.value)}
                    required
                  />
                  <div className="notice-actions-row mt-2">
                    <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#d97706', borderColor: '#d97706' }}>
                      <Send size={13} />
                      <span>Publish Banner to Students</span>
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsBroadcastingNotice(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Active Live Notice Banner Display (if set) */}
            {activeBroadcastNotice && (
              <div className="admin-active-notice-banner mt-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="notice-badge-pill">📢 LIVE STUDENT ALERT ACTIVE</span>
                  <span className="notice-text-content">{activeBroadcastNotice}</span>
                </div>
                <button 
                  type="button" 
                  className="btn-clear-active-notice" 
                  onClick={handleClearNotice}
                  title="Clear notice banner for students"
                >
                  <Trash2 size={13} />
                  <span>Clear Notice</span>
                </button>
              </div>
            )}

            {/* 4 Mini KPI Studio Cards */}
            <div className="admin-class-kpi-row mt-3 mb-3">
              <div className="class-kpi-capsule">
                <div className="capsule-icon bg-rose-50 text-rose-600">
                  <Radio size={16} />
                </div>
                <div className="capsule-col">
                  <span className="capsule-label">Live Broadcasts</span>
                  <strong className="capsule-val font-mono">
                    {onlineClasses.filter(c => c.isLive).length} On-Air
                  </strong>
                  <span className="capsule-sub text-rose-600">
                    {onlineClasses.some(c => c.isLive) ? 'Pulsing live call active' : 'All studios on standby'}
                  </span>
                </div>
              </div>

              <div className="class-kpi-capsule">
                <div className="capsule-icon bg-blue-50 text-blue-600">
                  <Calendar size={16} />
                </div>
                <div className="capsule-col">
                  <span className="capsule-label">Total Batches</span>
                  <strong className="capsule-val font-mono">{onlineClasses.length} Scheduled</strong>
                  <span className="capsule-sub text-muted">Covering 6:00 AM – 7:30 PM</span>
                </div>
              </div>

              <div className="class-kpi-capsule">
                <div className="capsule-icon bg-emerald-50 text-emerald-600">
                  <Users size={16} />
                </div>
                <div className="capsule-col">
                  <span className="capsule-label">Enrolled Students</span>
                  <strong className="capsule-val font-mono">
                    {onlineClasses.reduce((acc, c) => acc + (c.attendees || 1), 0)} Aspirants
                  </strong>
                  <span className="capsule-sub text-emerald-600">Active zoom learners</span>
                </div>
              </div>

              <div className="class-kpi-capsule">
                <div className="capsule-icon bg-purple-50 text-purple-600">
                  <ShieldCheck size={16} />
                </div>
                <div className="capsule-col">
                  <span className="capsule-label">Student Sync Engine</span>
                  <strong className="capsule-val font-mono text-emerald-700">✓ 100% Active</strong>
                  <span className="capsule-sub text-muted">Instant push to candidate app</span>
                </div>
              </div>
            </div>

            {/* Filter Pills, Search Bar & View Mode Switcher */}
            <div className="admin-class-filter-strip">
              <div className="filter-pills-group">
                <button 
                  type="button" 
                  className={`class-filter-pill ${classFilterStatus === 'all' ? 'active' : ''}`}
                  onClick={() => setClassFilterStatus('all')}
                >
                  All Classes ({onlineClasses.length})
                </button>
                <button 
                  type="button" 
                  className={`class-filter-pill ${classFilterStatus === 'live' ? 'active pill-live' : ''}`}
                  onClick={() => setClassFilterStatus('live')}
                >
                  <span className="live-dot-mini" />
                  Live Now ({onlineClasses.filter(c => c.isLive).length})
                </button>
                <button 
                  type="button" 
                  className={`class-filter-pill ${classFilterStatus === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setClassFilterStatus('upcoming')}
                >
                  Upcoming Scheduled ({onlineClasses.filter(c => !c.isLive && c.badgeClass !== 'badge-replay').length})
                </button>
                <button 
                  type="button" 
                  className={`class-filter-pill ${classFilterStatus === 'replays' ? 'active' : ''}`}
                  onClick={() => setClassFilterStatus('replays')}
                >
                  Archives & Replays ({onlineClasses.filter(c => c.badgeClass === 'badge-replay').length})
                </button>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Search Box */}
                <div className="admin-search-wrap-mini">
                  <Search size={14} className="text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search batch, Meeting ID, speed..."
                    value={classSearchQuery}
                    onChange={(e) => setClassSearchQuery(e.target.value)}
                    className="admin-mini-search-input"
                  />
                  {classSearchQuery && (
                    <button type="button" onClick={() => setClassSearchQuery('')} className="btn-clear-search">
                      <X size={12} />
                    </button>
                  )}
                </div>

                {/* View Mode Toggle: Grid vs Timetable */}
                <div className="admin-view-switcher-pills">
                  <button 
                    type="button" 
                    className={`btn-view-toggle ${classViewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setClassViewMode('grid')}
                    title="Grid Card View"
                  >
                    <span>Cards</span>
                  </button>
                  <button 
                    type="button" 
                    className={`btn-view-toggle ${classViewMode === 'timetable' ? 'active' : ''}`}
                    onClick={() => setClassViewMode('timetable')}
                    title="Daily Timetable Table View"
                  >
                    <span>Timetable</span>
                  </button>
                </div>
              </div>
            </div>

            {/* VIEW A: Class Cards Grid */}
            {classViewMode === 'grid' && (
              <div className="admin-classes-grid mt-3">
                {filteredOnlineClasses.map((item) => (
                  <div key={item.id} className={`admin-class-card ${item.isLive ? 'is-live-card' : ''}`}>
                    {/* Top Status & Tools Bar */}
                    <div className="card-top-bar">
                      <div className="card-status-container">
                        {item.isLive ? (
                          <span className="admin-status-pill-live">
                            <span className="live-pulsing-dot-admin" />
                            <span>LIVE NOW ON ZOOM</span>
                          </span>
                        ) : item.badgeClass === 'badge-replay' ? (
                          <span className="admin-status-pill-replay">
                            <span>RECORDED ARCHIVE</span>
                          </span>
                        ) : (
                          <span className="admin-status-pill-upcoming">
                            <Clock size={11} />
                            <span>SCHEDULED</span>
                          </span>
                        )}
                      </div>

                      <div className="card-tools-group">
                        <button 
                          type="button"
                          className="btn-card-tool-sleek"
                          onClick={() => handleCopyClassInvite(item)}
                          title="Copy Full Zoom Invite text"
                        >
                          {copiedClassId === item.id ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                        </button>
                        <button 
                          type="button"
                          className="btn-card-tool-sleek"
                          onClick={() => setEditingClass({ ...item })}
                          title="Edit this class details"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button 
                          type="button"
                          className="btn-card-tool-sleek btn-tool-delete"
                          onClick={() => {
                            if (confirm(`Delete online class "${item.title}"?`)) {
                              if (onDeleteOnlineClass) onDeleteOnlineClass(item.id);
                            }
                          }}
                          title="Delete this class"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Card Title & Meta Badges */}
                    <div className="card-title-section">
                      <h4 className="admin-card-title">{item.title}</h4>
                      <div className="card-pills-row">
                        <span className="card-shift-tag-sleek">{item.shift}</span>
                        <span className="card-speed-badge-sleek font-mono">{item.speed}</span>
                        <span className="card-room-tag-sleek font-mono">{item.roomNo}</span>
                      </div>
                    </div>

                    {/* Faculty & Schedule Timing Bar */}
                    <div className="admin-faculty-row">
                      <div className="faculty-avatar-circle-sleek">
                        {item.instructor.split(' ').map(n => n[0]).join('').slice(0, 2) || 'GS'}
                      </div>
                      <div className="faculty-meta-sleek">
                        <span className="faculty-name-sleek">{item.instructor}</span>
                        <div className="faculty-sub-sleek">
                          <span><Clock size={11} className="inline mr-1 text-slate-400" />{item.time}</span>
                          <span className="dot-sep">•</span>
                          <span className="text-blue-700 font-semibold">{item.attendees || 1} Aspirants</span>
                        </div>
                      </div>
                    </div>

                    {/* Zoom Credentials Strip */}
                    <div className="admin-creds-container">
                      <div className="cred-cell">
                        <span className="cred-mini-lbl">Zoom Meeting ID</span>
                        <div className="cred-val-copy">
                          <strong className="font-mono">{item.zoomMeetingId}</strong>
                          <button 
                            type="button" 
                            className="btn-copy-chip"
                            onClick={() => {
                              navigator.clipboard.writeText(item.zoomMeetingId);
                              setCopiedClassId(`id-${item.id}`);
                              setTimeout(() => setCopiedClassId(null), 2000);
                            }}
                            title="Copy Meeting ID"
                          >
                            {copiedClassId === `id-${item.id}` ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                          </button>
                        </div>
                      </div>

                      <div className="cred-cell">
                        <span className="cred-mini-lbl">Passcode</span>
                        <div className="cred-val-copy">
                          <strong className="font-mono">{item.zoomPasscode}</strong>
                          <button 
                            type="button" 
                            className="btn-copy-chip"
                            onClick={() => {
                              navigator.clipboard.writeText(item.zoomPasscode);
                              setCopiedClassId(`pwd-${item.id}`);
                              setTimeout(() => setCopiedClassId(null), 2000);
                            }}
                            title="Copy Passcode"
                          >
                            {copiedClassId === `pwd-${item.id}` ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                          </button>
                        </div>
                      </div>

                      <div className="cred-cell cell-launch">
                        <span className="cred-mini-lbl">Zoom App</span>
                        <a 
                          href={item.zoomAppUrl || `zoommtg://zoom.us/join?confno=${item.zoomMeetingId.replace(/\s+/g, '')}&pwd=${item.zoomPasscode}`}
                          target="_blank" 
                          rel="noreferrer" 
                          className="link-launch-zoom"
                          title="Open in Zoom Desktop App"
                        >
                          <span>Open</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>

                    {/* Topic Box (Clean, Editorial, Neutral) */}
                    <div className="admin-topic-card-sleek">
                      <span className="topic-card-lbl">TODAY'S DICTATION TOPIC</span>
                      <strong className="topic-card-name">{item.todayTopic}</strong>
                      {item.passageSnippet && (
                        <p className="topic-passage-snippet">
                          "{item.passageSnippet.slice(0, 95)}..."
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="admin-card-actions-sleek">
                      <button 
                        type="button"
                        className={`btn-live-toggle-sleek ${item.isLive ? 'live-active-btn' : 'live-standby-btn'}`}
                        onClick={() => {
                          if (onToggleLiveOnlineClass) onToggleLiveOnlineClass(item.id);
                        }}
                        title={item.isLive ? "End live broadcast" : "Start live broadcast on Zoom"}
                      >
                        {item.isLive ? (
                          <>
                            <Square size={13} />
                            <span>End Session</span>
                          </>
                        ) : (
                          <>
                            <Radio size={13} className="text-rose-600" />
                            <span>Go Live Now</span>
                          </>
                        )}
                      </button>

                      <button 
                        type="button"
                        className="btn-view-class-sleek"
                        onClick={() => {
                          if (onJoinClassAsAdmin) onJoinClassAsAdmin(item.id);
                          else setCurrentTab('online-classes');
                        }}
                        title="View Class Join Page"
                      >
                        <Eye size={13} />
                        <span>View Class Page</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW B: Timetable Schedule Matrix View */}
            {classViewMode === 'timetable' && (
              <div className="admin-timetable-table-wrap mt-3">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Shift & Timing</th>
                      <th>Batch Title & Speed</th>
                      <th>Dictation Topic</th>
                      <th>Meeting Credentials</th>
                      <th>Faculty & Studio</th>
                      <th>Live Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOnlineClasses.map((item) => (
                      <tr key={item.id} className={item.isLive ? 'row-live-highlight' : ''}>
                        <td>
                          <div className="timetable-shift-col">
                            <strong>{item.shift}</strong>
                            <span className="text-xs text-muted font-mono">{item.time}</span>
                          </div>
                        </td>
                        <td>
                          <div className="timetable-title-col">
                            <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                            <span className="badge-speed-pill font-mono">{item.speed}</span>
                          </div>
                        </td>
                        <td>
                          <span className="text-xs text-slate-700">{item.todayTopic}</span>
                        </td>
                        <td>
                          <div className="font-mono text-xs">
                            <div>ID: <strong>{item.zoomMeetingId}</strong></div>
                            <div className="text-muted">Pass: <strong>{item.zoomPasscode}</strong></div>
                          </div>
                        </td>
                        <td>
                          <div className="text-xs">
                            <strong className="text-slate-800">{item.instructor}</strong>
                            <div className="text-muted">{item.roomNo}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`card-status-pill ${item.badgeClass}`}>
                            {item.isLive && <span className="live-dot-mini" />}
                            {item.isLive ? 'LIVE' : item.badgeClass === 'badge-replay' ? 'Replay' : 'Upcoming'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="flex items-center justify-end gap-1">
                            <button 
                              type="button"
                              className={`btn-tbl-action ${item.isLive ? 'tbl-stop' : 'tbl-start'}`}
                              onClick={() => {
                                if (onToggleLiveOnlineClass) onToggleLiveOnlineClass(item.id);
                              }}
                              title={item.isLive ? "Stop live" : "Start live"}
                            >
                              {item.isLive ? <Square size={12} /> : <Radio size={12} />}
                              <span>{item.isLive ? 'Stop' : 'Go Live'}</span>
                            </button>

                            <button 
                              type="button"
                              className="btn-tbl-action tbl-enter"
                              onClick={() => {
                                if (onJoinClassAsAdmin) onJoinClassAsAdmin(item.id);
                                else setCurrentTab('online-classes');
                              }}
                              title="View Class Page"
                            >
                              <Eye size={12} />
                            </button>

                            <button 
                              type="button"
                              className="btn-tbl-action"
                              onClick={() => handleCopyClassInvite(item)}
                              title="Copy Invite"
                            >
                              <Copy size={12} />
                            </button>

                            <button 
                              type="button"
                              className="btn-tbl-action text-rose-600"
                              onClick={() => {
                                if (confirm(`Delete online class "${item.title}"?`)) {
                                  if (onDeleteOnlineClass) onDeleteOnlineClass(item.id);
                                }
                              }}
                              title="Delete Class"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

      </div>

      {/* MODAL 1: Upload New Dictation Test */}
      {newTestModalOpen && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide">
            {/* Hidden audio element for preview playback */}
            <audio 
              ref={audioPlayerRef} 
              src={audioUrl} 
              onEnded={handleAudioEnded}
              style={{ display: 'none' }}
            />

            <div className="modal-header">
              <div className="modal-title-wrap">
                <div className="modal-icon-squircle bg-blue-subtle">
                  <Headphones size={22} className="text-royal-blue" />
                </div>
                <div>
                  <h3 className="modal-main-title">Upload New Studio Dictation Audio Test</h3>
                  <p className="modal-sub-title">Calibrate voice audio recording with master shorthand transcript for automated diff evaluation</p>
                </div>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => {
                  if (isPlayingPreview && audioPlayerRef.current) audioPlayerRef.current.pause();
                  setIsPlayingPreview(false);
                  stopRecording();
                  setNewTestModalOpen(false);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="admin-modal-form-wrapper">
              <div className="admin-modal-scrollable-body">
                {/* Dictation Title */}
              <div className="form-group-field">
                <label className="field-label">Dictation Test Title</label>
                <input 
                  type="text"
                  className="field-input"
                  placeholder="e.g. Patna High Court Bench Judgment - Criminal Appeal 419"
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  required
                />
              </div>

              {/* Category & Speed */}
              <div className="grid-2-fields">
                <div className="form-group-field">
                  <label className="field-label">Target Examination Category</label>
                  <CustomSelect 
                    value={testCategory}
                    onChange={(val) => setTestCategory(val)}
                    options={[
                      { value: 'SSC Steno Grade C & D', label: 'SSC Steno Grade C & D' },
                      { value: 'Patna High Court', label: 'Patna High Court' },
                      { value: 'Jharkhand High Court', label: 'Jharkhand High Court' },
                      { value: 'Parliament Reporter', label: 'Parliament Reporter' },
                      { value: 'Civil Court Series', label: 'Civil Court Series' }
                    ]}
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Paced Dictation Speed</label>
                  <CustomSelect 
                    value={testSpeed}
                    onChange={(val) => setTestSpeed(val)}
                    options={[
                      { value: '80 WPM', label: '80 WPM (Standard SSC Grade D)' },
                      { value: '100 WPM', label: '100 WPM (High Court / SSC Grade C)' },
                      { value: '120 WPM', label: '120 WPM (Parliament / High Speed)' },
                      { value: '140 WPM', label: '140 WPM (Senior Assembly Reporter)' }
                    ]}
                  />
                </div>
              </div>

              {/* Language & Words Count */}
              <div className="grid-2-fields">
                <div className="form-group-field">
                  <label className="field-label">Language & Font Mode</label>
                  <CustomSelect 
                    value={testLanguage}
                    onChange={(val) => setTestLanguage(val)}
                    options={[
                      { value: 'English', label: 'English' },
                      { value: 'Hindi (Kruti Dev)', label: 'Hindi (Kruti Dev 010)' },
                      { value: 'Hindi (Mangal)', label: 'Hindi (Unicode Mangal)' }
                    ]}
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Total Words Count (Auto-calculated)</label>
                  <input 
                    type="number"
                    className="field-input font-mono"
                    value={testWords}
                    onChange={(e) => setTestWords(Number(e.target.value) || 0)}
                    required
                  />
                </div>
              </div>

              {/* ============================================================== */}
              {/* SECTION 1: STUDIO AUDIO DICTATION TRACK (UPLOAD & RECORDER)    */}
              {/* ============================================================== */}
              <div className="dictation-section-block">
                <div className="section-block-header">
                  <div className="header-left">
                    <span className="section-step-num">Step 1</span>
                    <div>
                      <h4 className="section-block-title">Studio Audio Dictation Track</h4>
                      <p className="section-block-desc">Provide calibrated voice dictation recorded at the selected speed.</p>
                    </div>
                  </div>

                  {/* Mode Selector */}
                  <div className="audio-source-pills">
                    <button
                      type="button"
                      className={`audio-mode-btn ${audioSourceType === 'upload' ? 'active' : ''}`}
                      onClick={() => setAudioSourceType('upload')}
                    >
                      <UploadCloud size={14} />
                      <span>Upload File</span>
                    </button>
                    <button
                      type="button"
                      className={`audio-mode-btn ${audioSourceType === 'sample' ? 'active' : ''}`}
                      onClick={() => {
                        setAudioSourceType('sample');
                        setAudioUrl('/assets/sample-dictation.mp3');
                        setAudioFileName('Studio_Calibrated_Dictation_Sample.mp3');
                        setAudioFileSize('3.4 MB');
                        setAudioDuration(300);
                      }}
                    >
                      <Music size={14} />
                      <span>Studio Sample</span>
                    </button>
                    <button
                      type="button"
                      className={`audio-mode-btn ${audioSourceType === 'record' ? 'active' : ''}`}
                      onClick={() => setAudioSourceType('record')}
                    >
                      <Mic size={14} />
                      <span>Record Mic</span>
                    </button>
                  </div>
                </div>

                {/* Audio Mode 1: File Upload Dropzone */}
                {audioSourceType === 'upload' && (
                  <div className="audio-upload-container">
                    {!audioFile ? (
                      <label className="audio-dropzone" htmlFor="dictation-audio-file-input">
                        <input
                          id="dictation-audio-file-input"
                          type="file"
                          accept="audio/mp3,audio/wav,audio/m4a,audio/ogg,audio/aac,audio/*"
                          style={{ display: 'none' }}
                          onChange={handleAudioFileUpload}
                        />
                        <div className="dropzone-content">
                          <div className="dropzone-icon-circle">
                            <UploadCloud size={24} className="text-royal-blue" />
                          </div>
                          <div className="dropzone-text">
                            <strong>Click to browse or drag & drop audio dictation file</strong>
                            <span>Supports MP3, WAV, M4A, OGG, AAC up to 50MB</span>
                          </div>
                          <span className="btn-browse-chip">Select Audio File</span>
                        </div>
                      </label>
                    ) : (
                      <div className="audio-loaded-card">
                        <div className="audio-file-meta-row">
                          <div className="meta-left">
                            <div className="audio-file-icon-box">
                              <Music size={18} />
                            </div>
                            <div className="audio-file-info">
                              <span className="file-name">{audioFileName}</span>
                              <span className="file-sub">{audioFileSize} • {formatDuration(audioDuration)} duration</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn-replace-audio"
                            onClick={() => {
                              if (isPlayingPreview && audioPlayerRef.current) audioPlayerRef.current.pause();
                              setAudioFile(null);
                              setAudioUrl('');
                              setIsPlayingPreview(false);
                            }}
                          >
                            <Trash2 size={13} />
                            <span>Remove Audio</span>
                          </button>
                        </div>

                        {/* Interactive Player Preview */}
                        <div className="audio-player-preview-deck">
                          <button
                            type="button"
                            className="btn-play-preview"
                            onClick={toggleAudioPreview}
                          >
                            {isPlayingPreview ? <Pause size={15} /> : <Play size={15} />}
                            <span>{isPlayingPreview ? 'Pause Audio' : 'Test Audio Playback'}</span>
                          </button>

                          <div className="audio-waveform-bars">
                            {[40, 75, 95, 60, 85, 45, 90, 70, 55, 80, 100, 65, 50, 85, 95, 60, 45, 75, 85, 40].map((h, i) => (
                              <span 
                                key={i} 
                                className={`wave-bar ${isPlayingPreview ? 'wave-animated' : ''}`}
                                style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                              />
                            ))}
                          </div>

                          <span className="audio-duration-tag font-mono">
                            {formatDuration(audioDuration)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Audio Mode 2: Studio Preset Sample */}
                {audioSourceType === 'sample' && (
                  <div className="audio-loaded-card sample-accent">
                    <div className="audio-file-meta-row">
                      <div className="meta-left">
                        <div className="audio-file-icon-box sample-icon">
                          <Headphones size={18} />
                        </div>
                        <div className="audio-file-info">
                          <span className="file-name">Official Studio Calibrated Dictation (High Court Standard)</span>
                          <span className="file-sub">3.4 MB • 05:00 Mins • Calibrated at exactly {testSpeed}</span>
                        </div>
                      </div>
                      <span className="badge-preset-verified">Studio Verified</span>
                    </div>

                    <div className="audio-player-preview-deck">
                      <button
                        type="button"
                        className="btn-play-preview"
                        onClick={toggleAudioPreview}
                      >
                        {isPlayingPreview ? <Pause size={15} /> : <Play size={15} />}
                        <span>{isPlayingPreview ? 'Pause Audio' : 'Play Sample Audio'}</span>
                      </button>

                      <div className="audio-waveform-bars">
                        {[50, 80, 60, 90, 70, 85, 40, 95, 65, 80, 75, 90, 60, 85, 100, 70, 55, 65, 80, 50].map((h, i) => (
                          <span 
                            key={i} 
                            className={`wave-bar ${isPlayingPreview ? 'wave-animated' : ''}`}
                            style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                          />
                        ))}
                      </div>

                      <span className="audio-duration-tag font-mono">
                        05:00
                      </span>
                    </div>
                  </div>
                )}

                {/* Audio Mode 3: Live Microphone Recording */}
                {audioSourceType === 'record' && (
                  <div className="audio-record-box">
                    <div className="record-status-row">
                      <div className="record-mic-indicator">
                        <div className={`record-pulse-ring ${isRecording ? 'recording-live' : ''}`}>
                          <Mic size={22} className={isRecording ? 'text-rose' : 'text-slate-600'} />
                        </div>
                        <div>
                          <strong>{isRecording ? 'Recording Live Dictation...' : recordedBlob ? 'Dictation Captured' : 'Ready to Record Voice Dictation'}</strong>
                          <p className="record-help-sub">
                            {isRecording 
                              ? 'Speak clearly into your microphone at calibrated speed. Click stop when finished.' 
                              : recordedBlob 
                                ? 'Your audio has been captured. You can test playback below or record again.' 
                                : 'Faculty can dictate directly from the browser without needing separate audio software.'}
                          </p>
                        </div>
                      </div>

                      <div className="record-timer-badge font-mono">
                        {formatDuration(recordingSeconds)}
                      </div>
                    </div>

                    <div className="record-controls-row">
                      {!isRecording ? (
                        <button
                          type="button"
                          className="btn-start-record"
                          onClick={startRecording}
                        >
                          <div className="rec-dot" />
                          <span>{recordedBlob ? 'Re-Record Dictation' : 'Start Recording'}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-stop-record"
                          onClick={stopRecording}
                        >
                          <Square size={14} />
                          <span>Stop & Save Recording</span>
                        </button>
                      )}

                      {recordedBlob && !isRecording && (
                        <button
                          type="button"
                          className="btn-play-preview"
                          onClick={toggleAudioPreview}
                        >
                          {isPlayingPreview ? <Pause size={14} /> : <Play size={14} />}
                          <span>{isPlayingPreview ? 'Pause' : 'Test Recording'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ============================================================== */}
              {/* SECTION 2: MASTER BENCHMARK PASSAGE (TEXT & FILE UPLOAD)       */}
              {/* ============================================================== */}
              <div className="dictation-section-block">
                <div className="section-block-header">
                  <div className="header-left">
                    <span className="section-step-num">Step 2</span>
                    <div>
                      <h4 className="section-block-title">Master Benchmark Transcript Passage</h4>
                      <p className="section-block-desc">
                        The official text against which student submissions are evaluated character-by-character.
                      </p>
                    </div>
                  </div>

                  {/* Text Upload & Quick Actions */}
                  <div className="transcript-actions-bar">
                    <label className="btn-upload-text-file" htmlFor="transcript-text-file-input">
                      <input 
                        id="transcript-text-file-input"
                        type="file"
                        accept=".txt,.doc,.docx,.rtf"
                        style={{ display: 'none' }}
                        onChange={handleTranscriptFileUpload}
                      />
                      <FileText size={13} />
                      <span>{transcriptFileName ? `Uploaded: ${transcriptFileName}` : 'Upload Text File (.txt)'}</span>
                    </label>

                    <button
                      type="button"
                      className="btn-paste-sample"
                      onClick={() => {
                        const samplePassage = "The learned counsel appearing on behalf of the appellant has vehemently contended that the High Court has committed a grave error of law in not appreciating the evidence of the prosecution witnesses in its proper perspective. It has been submitted that there are material contradictions and omissions in the statements of the witnesses which go to the root of the matter and shake the very foundation of the prosecution case. The prosecution has utterly failed to prove the guilt of the accused beyond all reasonable doubt. Having heard the learned advocates on both sides and upon perusal of the record, this Court is of the considered opinion that the findings recorded by the courts below suffer from no legal infirmity.";
                        updatePassage(samplePassage);
                        setTranscriptFileName('Standard_HighCourt_Sample_Passage.txt');
                      }}
                    >
                      <Sparkles size={13} />
                      <span>Insert Sample Passage</span>
                    </button>
                  </div>
                </div>

                <div className="transcript-editor-wrap">
                  <textarea 
                    className="field-input font-mono transcript-textarea"
                    rows={6}
                    placeholder="Type or paste the official dictation passage here, or click 'Upload Text File' above..."
                    value={testPassage}
                    onChange={(e) => updatePassage(e.target.value)}
                    required
                  />

                  {/* Live Word & Calibration Stats Footer */}
                  <div className="transcript-stats-strip">
                    <div className="stats-left">
                      <span className="word-count-badge">
                        Words: <strong className="font-mono">{testWords}</strong>
                      </span>
                      <span className="speed-pacing-badge">
                        Pacing: <strong className="font-mono">{testSpeed}</strong>
                      </span>
                      <span className="estimated-time-badge">
                        Est. Dictation Time: <strong className="font-mono">{formatDuration(Math.round((testWords / (parseInt(testSpeed) || 80)) * 60))}</strong>
                      </span>
                    </div>
                    {testPassage.trim() && (
                      <span className="badge-transcript-ready">
                        <CheckCircle2 size={12} />
                        <span>Passage Ready</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Synchronization Verification Strip */}
              <div className="dictation-sync-verify-strip">
                <div className="sync-col">
                  <span className="sync-label">Audio Track</span>
                  <span className={`sync-status ${audioUrl ? 'is-ready' : 'is-missing'}`}>
                    {audioUrl ? `✓ ${audioFileName || 'Audio Track Loaded'}` : '⚠ Audio Required'}
                  </span>
                </div>
                <div className="sync-divider" />
                <div className="sync-col">
                  <span className="sync-label">Benchmark Transcript</span>
                  <span className={`sync-status ${testPassage.trim() ? 'is-ready' : 'is-missing'}`}>
                    {testPassage.trim() ? `✓ ${testWords} Words Verified` : '⚠ Transcript Required'}
                  </span>
                </div>
                <div className="sync-divider" />
                <div className="sync-col">
                  <span className="sync-label">Calculated Pacing</span>
                  <span className="sync-status is-ready font-mono">
                    {testSpeed} ({testLanguage})
                  </span>
                </div>
              </div>

              </div>

              {/* Sticky Footer Actions - Always Pinned & Visible */}
              <div className="admin-modal-footer-sticky">
                <span className="footer-hint-text">
                  <ShieldCheck size={14} className="text-royal-blue" />
                  <span>Audio track synced with master transcript for automated diff evaluation</span>
                </span>

                <div className="admin-modal-footer-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      if (isPlayingPreview && audioPlayerRef.current) audioPlayerRef.current.pause();
                      setIsPlayingPreview(false);
                      stopRecording();
                      setNewTestModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-publish-glow">
                    <UploadCloud size={16} />
                    <span>Publish Dictation to Audio Vault</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add / Enroll Candidate */}
      {newStudentModalOpen && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Users size={20} className="text-blue" />
                <h3>Manual Student Enrollment & Pass Assignment</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setNewStudentModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="modal-form-body">
              <div className="form-group-field">
                <label className="field-label">Candidate Full Name</label>
                <input 
                  type="text"
                  className="field-input"
                  placeholder="e.g. Ramesh Kumar"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="grid-2-fields">
                <div className="form-group-field">
                  <label className="field-label">Email Address</label>
                  <input 
                    type="email"
                    className="field-input"
                    placeholder="student@gmail.com"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Generated Roll Number</label>
                  <input 
                    type="text"
                    className="field-input font-mono"
                    value={studentRoll}
                    onChange={(e) => setStudentRoll(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid-2-fields">
                <div className="form-group-field">
                  <label className="field-label">Subscription Pass</label>
                  <CustomSelect 
                    value={studentPlan}
                    onChange={(val) => setStudentPlan(val)}
                    options={[
                      { value: '12-Month Pro Active', label: '12-Month Annual Career Master' },
                      { value: '6-Month Scholar', label: '6-Month Pro Scholar' },
                      { value: 'Monthly Test Series', label: 'Monthly Test Series' },
                      { value: '1-Day Skill Sprint', label: '1-Day Skill Sprint' }
                    ]}
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Target Examination</label>
                  <CustomSelect 
                    value={studentExam}
                    onChange={(val) => setStudentExam(val)}
                    options={[
                      { value: 'SSC Steno Grade C & D', label: 'SSC Steno Grade C & D' },
                      { value: 'Patna High Court', label: 'Patna High Court' },
                      { value: 'Jharkhand High Court', label: 'Jharkhand High Court' },
                      { value: 'Parliament Reporter', label: 'Parliament Reporter' }
                    ]}
                  />
                </div>
              </div>

              <div className="modal-footer-btns">
                <button type="button" className="btn btn-secondary" onClick={() => setNewStudentModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Activate & Enroll Candidate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Upload Pure Text-Only Typing Exercise */}
      {newTypingModalOpen && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <div className="modal-icon-squircle" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                  <Keyboard size={22} style={{ color: '#059669' }} />
                </div>
                <div>
                  <h3 className="modal-main-title">Upload Pure Text Typing Exercise (No Audio)</h3>
                  <p className="modal-sub-title">Direct benchmark passage for Court, SSC & Clerical on-screen typing speed evaluation</p>
                </div>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setNewTypingModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTypingTest} className="admin-modal-form-wrapper">
              <div className="admin-modal-scrollable-body">
                {/* Row 1: Title & Target Authority */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Exercise Name / Title *</label>
                    <input 
                      type="text" 
                      className="field-input"
                      placeholder="e.g. Exercise 85 - Patna High Court Civil Jurisdiction Appeal"
                      value={typingTitle}
                      onChange={(e) => setTypingTitle(e.target.value)}
                      required
                    />
                    <span className="field-hint">A clear title indicating the test source or exercise series.</span>
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Target Examination Authority</label>
                    <CustomSelect 
                      value={typingAuthority}
                      onChange={(val) => setTypingAuthority(val)}
                      options={[
                        { value: 'Patna High Court', label: 'Patna High Court / Bihar Civil Court' },
                        { value: 'SSC CGL / CHSL Tier-II', label: 'SSC CGL / CHSL / Steno Tier-II' },
                        { value: 'Allahabad High Court', label: 'Allahabad High Court / RO / ARO' },
                        { value: 'Jharkhand High Court', label: 'Jharkhand High Court / Civil Court' },
                        { value: 'Delhi High Court / DSSSB', label: 'Delhi High Court / DSSSB' },
                        { value: 'RRB NTPC Typing', label: 'Railway RRB NTPC Junior Accounts' },
                        { value: 'Civil Court Clerk / Reader', label: 'District & Sessions Civil Court' }
                      ]}
                    />
                  </div>
                </div>

                {/* Row 2: Category & Language */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Passage Genre / Category</label>
                    <CustomSelect 
                      value={typingCategory}
                      onChange={(val) => setTypingCategory(val)}
                      options={[
                        { value: 'Judicial Precedent', label: 'Judicial Precedent & Case Law' },
                        { value: 'Official Memorandum', label: 'Official Memorandum & Order' },
                        { value: 'Editorial / Parliamentary', label: 'Editorial & Parliamentary' },
                        { value: 'Civil Law & Affidavit', label: 'Civil Law & Affidavit' },
                        { value: 'General Speed Drill', label: 'General Speed Drill' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Language & Font System</label>
                    <CustomSelect 
                      value={typingLanguage}
                      onChange={(val) => setTypingLanguage(val)}
                      options={[
                        { value: 'English', label: 'English (Standard QWERTY)' },
                        { value: 'Hindi (Kruti Dev)', label: 'Hindi (Kruti Dev 010)' },
                        { value: 'Hindi (Mangal)', label: 'Hindi (Mangal Remington GAIL)' }
                      ]}
                    />
                  </div>
                </div>

                {/* Row 3: Target Speed, Duration & Difficulty in 1 clean 3-col row! */}
                <div className="grid-3-fields">
                  <div className="form-group-field">
                    <label className="field-label">Benchmark Speed</label>
                    <CustomSelect 
                      value={typingTargetSpeed}
                      onChange={(val) => setTypingTargetSpeed(val)}
                      options={[
                        { value: '30 WPM', label: '30 WPM (SSC Tier-II Standard)' },
                        { value: '35 WPM', label: '35 WPM (High Court Standard)' },
                        { value: '40 WPM', label: '40 WPM (Senior Clerk / Steno)' },
                        { value: '45 WPM', label: '45 WPM (Court Reader / Reporter)' },
                        { value: '50 WPM', label: '50 WPM (Master Speed)' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Test Duration</label>
                    <CustomSelect 
                      value={typingDuration}
                      onChange={(val) => setTypingDuration(val)}
                      options={[
                        { value: '10 Mins', label: '10 Mins (Official Exam Benchmark)' },
                        { value: '5 Mins', label: '5 Mins (Quick Speed Drill)' },
                        { value: '15 Mins', label: '15 Mins (Endurance Stamina)' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Difficulty Grading</label>
                    <CustomSelect 
                      value={typingDifficulty}
                      onChange={(val) => setTypingDifficulty(val)}
                      options={[
                        { value: 'Easy', label: 'Easy (Simple Vocabulary & Common Words)' },
                        { value: 'Medium', label: 'Medium (Legal & Official Standard)' },
                        { value: 'Hard', label: 'Hard (Complex Terminology & Numbers)' }
                      ]}
                    />
                  </div>
                </div>

                {/* Master Benchmark Passage Section */}
                <div className="dictation-section-block" style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
                  <div className="section-block-header">
                    <div className="header-left">
                      <span className="section-step-num" style={{ background: '#059669' }}>Text Input</span>
                      <div>
                        <h4 className="section-block-title">Master Benchmark Text Passage *</h4>
                        <p className="section-block-desc">
                          Aspirants will see and type this exact text in the Typing Studio with live WPM & accuracy scoring.
                        </p>
                      </div>
                    </div>

                    <div className="transcript-actions-bar">
                      <label className="btn-upload-text-file" style={{ background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' }}>
                        <UploadCloud size={13} />
                        <span>{typingFileName ? `File: ${typingFileName}` : 'Upload .TXT File'}</span>
                        <input 
                          type="file" 
                          accept=".txt" 
                          onChange={handleTypingFileUpload}
                          style={{ display: 'none' }} 
                        />
                      </label>

                      <button 
                        type="button" 
                        className="btn-paste-sample"
                        onClick={() => loadSampleTypingPassage('court')}
                        title="Load sample High Court judgment passage"
                      >
                        <Sparkles size={12} />
                        <span>Court Judgment</span>
                      </button>

                      <button 
                        type="button" 
                        className="btn-paste-sample"
                        onClick={() => loadSampleTypingPassage('ssc')}
                        title="Load sample SSC Tier-II office memorandum"
                      >
                        <Sparkles size={12} />
                        <span>SSC Memo</span>
                      </button>

                      <button 
                        type="button" 
                        className="btn-paste-sample"
                        onClick={() => loadSampleTypingPassage('hindi')}
                        title="Load sample Hindi passage"
                      >
                        <Sparkles size={12} />
                        <span>Hindi Legal</span>
                      </button>

                      {typingPassage && (
                        <button
                          type="button"
                          className="btn-replace-audio"
                          onClick={() => {
                            updateTypingPassage('');
                            setTypingFileName('');
                          }}
                          title="Clear passage text"
                        >
                          <Trash2 size={12} />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="transcript-editor-wrap">
                    <textarea 
                      className="transcript-textarea"
                      placeholder="Paste or type the official exam passage here, or click 'Upload .TXT File' above. Supports English, Hindi Kruti Dev, or Unicode Mangal font..."
                      rows={5}
                      style={{ minHeight: '120px' }}
                      value={typingPassage}
                      onChange={(e) => updateTypingPassage(e.target.value)}
                      required
                    />

                    <div className="transcript-stats-strip">
                      <div className="stats-left">
                        <span>Total Words: <strong style={{ color: typingWords > 0 ? '#047857' : '#0f172a' }}>{typingWords} words</strong></span>
                        <span>Total Characters: <strong>{typingPassage.length} chars</strong></span>
                        <span>Target Speed: <strong style={{ color: '#059669' }}>{typingTargetSpeed}</strong></span>
                        <span>Duration: <strong>{typingDuration}</strong></span>
                      </div>
                      <div>
                        {typingPassage.trim() ? (
                          <span className="badge-transcript-ready">
                            <CheckCircle2 size={13} />
                            <span>Passage Calibrated & Ready</span>
                          </span>
                        ) : (
                          <span className="text-amber font-mono" style={{ fontSize: '0.76rem' }}>
                            * Paste or upload passage text to proceed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ready Banner */}
                <div className="dictation-sync-verify-strip" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#065f46' }}>Exercise Mode</span>
                    <span className="sync-status is-ready" style={{ color: '#059669' }}>
                      ⌨️ Pure Text Typing Drill (No Audio)
                    </span>
                  </div>
                  <div className="sync-divider" style={{ background: '#a7f3d0' }} />
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#065f46' }}>Target Exam</span>
                    <span className="sync-status is-ready font-mono" style={{ color: '#059669' }}>
                      {typingAuthority}
                    </span>
                  </div>
                  <div className="sync-divider" style={{ background: '#a7f3d0' }} />
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#065f46' }}>Calculated Words</span>
                    <span className="sync-status is-ready font-mono" style={{ color: '#059669' }}>
                      {typingWords} Words ({typingLanguage}) • {typingDifficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Actions - Always Pinned & Visible */}
              <div className="admin-modal-footer-sticky">
                <span className="footer-hint-text">
                  <ShieldCheck size={14} style={{ color: '#059669' }} />
                  <span>Pure text typing drill • No audio playback required • Evaluated live</span>
                </span>

                <div className="admin-modal-footer-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setNewTypingModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ 
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', 
                      borderColor: '#059669', 
                      color: '#ffffff',
                      boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)' 
                    }}
                  >
                    <Keyboard size={16} />
                    <span>Publish to Typing Test Studio</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Schedule / Create New Live Online Zoom Class */}
      {newClassModalOpen && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide">
            <form onSubmit={handlePublishOnlineClass} className="admin-modal-form-wrapper">
              
              {/* Header */}
              <div className="modal-header">
                <div>
                  <div className="modal-title-with-badge">
                    <span className="badge badge-purple" style={{ background: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}>
                      <Video size={13} />
                      <span>Live Classroom Studio</span>
                    </span>
                    <h3 className="modal-title">Schedule / Launch Live Online Class on Zoom</h3>
                  </div>
                  <p className="modal-subtitle">
                    Create or go live with a real-time shorthand & dictation session. This class is instantly synced and displayed to all students with 1-click joining.
                  </p>
                </div>
                <button 
                  type="button" 
                  className="btn-modal-close" 
                  onClick={() => setNewClassModalOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Quick Template Presets Bar */}
              <div className="modal-quick-presets-strip" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={13} style={{ color: '#2563eb' }} />
                  <span>Quick Presets:</span>
                </span>
                <button 
                  type="button" 
                  className="btn-template-pill"
                  onClick={() => loadClassTemplate('ssc80')}
                  style={{ fontSize: '0.75rem', padding: '0.28rem 0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer', fontWeight: '600', color: '#1e293b' }}
                >
                  ⚡ SSC Steno (80 WPM Morning)
                </button>
                <button 
                  type="button" 
                  className="btn-template-pill"
                  onClick={() => loadClassTemplate('judicial100')}
                  style={{ fontSize: '0.75rem', padding: '0.28rem 0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer', fontWeight: '600', color: '#1e293b' }}
                >
                  ⚖️ High Court Bench (100 WPM)
                </button>
                <button 
                  type="button" 
                  className="btn-template-pill"
                  onClick={() => loadClassTemplate('reporter120')}
                  style={{ fontSize: '0.75rem', padding: '0.28rem 0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', cursor: 'pointer', fontWeight: '600', color: '#1e293b' }}
                >
                  🏛️ Parliament Reporter (120+ WPM)
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="modal-body admin-modal-scrollable-body">
                {/* Row 1: Class Title */}
                <div className="form-group-field">
                  <label className="field-label">Official Live Class Title *</label>
                  <input 
                    type="text" 
                    className="field-input" 
                    placeholder="e.g. SSC Stenographer Grade C & D — 80 WPM Live Speed Dictation & Transcription Lab"
                    value={newClassTitle}
                    onChange={(e) => setNewClassTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Row 2: Shift, Time, Speed Tier, Instructor */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Batch Shift & Category</label>
                    <CustomSelect 
                      value={newClassShift}
                      onChange={(val) => setNewClassShift(val)}
                      options={[
                        { value: 'Morning Core Batch', label: 'Morning Core Batch (8:30 AM – 10:30 AM)' },
                        { value: 'Morning Early Bird', label: 'Morning Early Bird (6:00 AM – 8:00 AM)' },
                        { value: 'Afternoon Judicial Series', label: 'Afternoon Judicial Series (3:00 PM – 5:00 PM)' },
                        { value: 'Evening Executive Bench', label: 'Evening Executive Bench (5:30 PM – 7:30 PM)' },
                        { value: 'Special Weekend Sprint', label: 'Special Weekend Sprint (Sunday 9:00 AM)' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Schedule Timing</label>
                    <input 
                      type="text" 
                      className="field-input font-mono" 
                      placeholder="e.g. 8:30 AM – 10:30 AM"
                      value={newClassTime}
                      onChange={(e) => setNewClassTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Target Speed Tier & Faculty Instructor */}
                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Target Speed Tier</label>
                    <CustomSelect 
                      value={newClassSpeed}
                      onChange={(val) => setNewClassSpeed(val)}
                      options={[
                        { value: '80 WPM Standard', label: '80 WPM Standard (SSC Grade D Benchmark)' },
                        { value: '100 WPM Judicial', label: '100 WPM Judicial (High Court & SSC Grade C)' },
                        { value: '120 - 140 WPM Elite', label: '120 - 140 WPM Elite (Parliamentary Reporter)' },
                        { value: 'Beginners (0 - 60 WPM)', label: 'Beginners (0 - 60 WPM Theory & Strokes)' }
                      ]}
                    />
                  </div>

                  <div className="form-group-field">
                    <label className="field-label">Faculty / Master In-Charge</label>
                    <CustomSelect 
                      value={newClassInstructor}
                      onChange={(val) => setNewClassInstructor(val)}
                      options={[
                        { value: 'Gagan Sir', label: 'Gagan Sir (Head Faculty • 18+ Yrs Exp)' },
                        { value: 'Senior Court Master', label: 'Senior Court Master (Ex-Parliament Reporter)' },
                        { value: 'Judicial Bench Master', label: 'Judicial Bench Master (Patna High Court)' },
                        { value: 'Anjali Mam', label: 'Anjali Mam (Theory & Hindi Steno Master)' }
                      ]}
                    />
                  </div>
                </div>

                {/* Row 4: Zoom Credentials & Live Status Switch */}
                <div className="dictation-section-block" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <div className="section-block-header">
                    <div className="header-left">
                      <span className="section-step-num" style={{ background: '#16a34a' }}>Zoom Sync</span>
                      <div>
                        <h4 className="section-block-title" style={{ color: '#14532d' }}>Zoom Meeting Credentials & Live Broadcast Status *</h4>
                        <p className="section-block-desc" style={{ color: '#166534' }}>
                          Students can join automatically via direct link, or copy the Meeting ID & Passcode.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid-3-fields" style={{ marginTop: '0.75rem' }}>
                    <div className="form-group-field">
                      <label className="field-label" style={{ color: '#14532d' }}>Zoom Meeting ID *</label>
                      <input 
                        type="text" 
                        className="field-input font-mono font-bold" 
                        placeholder="842 9104 2281"
                        value={newClassMeetingId}
                        onChange={(e) => setNewClassMeetingId(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group-field">
                      <label className="field-label" style={{ color: '#14532d' }}>Zoom Passcode *</label>
                      <input 
                        type="text" 
                        className="field-input font-mono font-bold" 
                        placeholder="GAYA80WPM"
                        value={newClassPasscode}
                        onChange={(e) => setNewClassPasscode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group-field">
                      <label className="field-label" style={{ color: '#14532d' }}>Zoom Studio Room</label>
                      <input 
                        type="text" 
                        className="field-input" 
                        placeholder="Zoom Room #01 (Studio Live)"
                        value={newClassRoom}
                        onChange={(e) => setNewClassRoom(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Immediate Go-Live Radio Selector */}
                  <div style={{ marginTop: '0.85rem', padding: '0.75rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Radio size={18} style={{ color: newClassIsLive ? '#dc2626' : '#64748b' }} />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#0f172a' }}>
                          Broadcast Status for Students:
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {newClassIsLive 
                            ? '🔴 Marked LIVE NOW — shows pulsing red badge and enables 1-click In-Browser Video Studio.' 
                            : '⏳ Scheduled for Upcoming — candidates see start time and can bookmark.'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        type="button"
                        onClick={() => setNewClassIsLive(true)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid',
                          fontSize: '0.76rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          background: newClassIsLive ? '#dc2626' : '#ffffff',
                          color: newClassIsLive ? '#ffffff' : '#64748b',
                          borderColor: newClassIsLive ? '#dc2626' : '#cbd5e1'
                        }}
                      >
                        ● Go Live Now
                      </button>
                      <button 
                        type="button"
                        onClick={() => setNewClassIsLive(false)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid',
                          fontSize: '0.76rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          background: !newClassIsLive ? '#2563eb' : '#ffffff',
                          color: !newClassIsLive ? '#ffffff' : '#64748b',
                          borderColor: !newClassIsLive ? '#2563eb' : '#cbd5e1'
                        }}
                      >
                        ⏳ Schedule Upcoming
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 5: Today's Dictation Topic & Live Whiteboard Master Passage */}
                <div className="dictation-section-block" style={{ background: '#f8fafc', borderColor: '#e2e8f0', marginTop: '1rem' }}>
                  <div className="section-block-header">
                    <div className="header-left">
                      <span className="section-step-num" style={{ background: '#2563eb' }}>Dictation</span>
                      <div>
                        <h4 className="section-block-title">Today's Live Dictation Topic & Reference Passage *</h4>
                        <p className="section-block-desc">
                          This passage will be displayed on the student's reference card, whiteboard notes, and transcription review.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="form-group-field" style={{ marginTop: '0.75rem' }}>
                    <label className="field-label">Dictation Topic Header *</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      placeholder="e.g. Parliamentary Motion on State Infrastructure & Expenditure Audit"
                      value={newClassTopic}
                      onChange={(e) => setNewClassTopic(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-field" style={{ marginTop: '0.75rem' }}>
                    <label className="field-label">Reference Dictation Passage Text</label>
                    <textarea 
                      className="transcript-textarea"
                      placeholder="Paste or type the master dictation passage to be spoken on Zoom..."
                      rows={4}
                      style={{ minHeight: '100px' }}
                      value={newClassPassage}
                      onChange={(e) => setNewClassPassage(e.target.value)}
                    />
                  </div>
                </div>

                {/* Instant Availability Verification Strip */}
                <div className="dictation-sync-verify-strip" style={{ background: '#eff6ff', borderColor: '#bfdbfe', marginTop: '0.75rem' }}>
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#1e40af' }}>Target Speed</span>
                    <span className="sync-status is-ready font-mono" style={{ color: '#1d4ed8' }}>
                      {newClassSpeed}
                    </span>
                  </div>
                  <div className="sync-divider" style={{ background: '#bfdbfe' }} />
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#1e40af' }}>Zoom Direct Link</span>
                    <span className="sync-status is-ready font-mono" style={{ color: '#1d4ed8', fontSize: '0.75rem' }}>
                      zoom.us/j/{newClassMeetingId.replace(/\s+/g, '')}
                    </span>
                  </div>
                  <div className="sync-divider" style={{ background: '#bfdbfe' }} />
                  <div className="sync-col">
                    <span className="sync-label" style={{ color: '#1e40af' }}>Student Real-Time Sync</span>
                    <span className="sync-status is-ready font-mono" style={{ color: '#16a34a' }}>
                      ✓ Instant Push to Candidate Portal
                    </span>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Actions */}
              <div className="admin-modal-footer-sticky">
                <span className="footer-hint-text">
                  <ShieldCheck size={14} style={{ color: '#2563eb' }} />
                  <span>Verified Zoom Classroom • Students can join via In-Browser Studio or Zoom Desktop App</span>
                </span>

                <div className="admin-modal-footer-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setNewClassModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ 
                      background: 'linear-gradient(135deg, #881337 0%, #4c0519 100%)', 
                      borderColor: '#881337', 
                      color: '#ffffff',
                      boxShadow: '0 4px 14px rgba(136, 19, 55, 0.3)' 
                    }}
                  >
                    <Video size={16} />
                    <span>{newClassIsLive ? '🚀 Launch Class & Go Live Now' : '📅 Schedule Class for Students'}</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: Edit Online Class Details */}
      {editingClass && (
        <div className="modal-backdrop">
          <div className="saas-card modal-window admin-modal-wide">
            <form onSubmit={handleSaveEditClass} className="admin-modal-form-wrapper">
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">Edit Online Class Settings</h3>
                  <p className="modal-subtitle">Update schedule time, Zoom credentials, or today's dictation topic.</p>
                </div>
                <button type="button" className="btn-modal-close" onClick={() => setEditingClass(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body admin-modal-scrollable-body">
                <div className="form-group-field">
                  <label className="field-label">Class Title *</label>
                  <input 
                    type="text" 
                    className="field-input" 
                    value={editingClass.title} 
                    onChange={(e) => setEditingClass({ ...editingClass, title: e.target.value })} 
                    required 
                  />
                </div>

                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Batch Shift</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      value={editingClass.shift} 
                      onChange={(e) => setEditingClass({ ...editingClass, shift: e.target.value })} 
                    />
                  </div>
                  <div className="form-group-field">
                    <label className="field-label">Schedule Time</label>
                    <input 
                      type="text" 
                      className="field-input font-mono" 
                      value={editingClass.time} 
                      onChange={(e) => setEditingClass({ ...editingClass, time: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="grid-2-fields">
                  <div className="form-group-field">
                    <label className="field-label">Target Speed Tier</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      value={editingClass.speed} 
                      onChange={(e) => setEditingClass({ ...editingClass, speed: e.target.value })} 
                    />
                  </div>
                  <div className="form-group-field">
                    <label className="field-label">Faculty Instructor</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      value={editingClass.instructor} 
                      onChange={(e) => setEditingClass({ ...editingClass, instructor: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="grid-3-fields">
                  <div className="form-group-field">
                    <label className="field-label">Zoom Meeting ID *</label>
                    <input 
                      type="text" 
                      className="field-input font-mono font-bold" 
                      value={editingClass.zoomMeetingId} 
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\s+/g, '');
                        setEditingClass({ 
                          ...editingClass, 
                          zoomMeetingId: e.target.value,
                          zoomDirectUrl: `https://zoom.us/j/${clean}?pwd=${editingClass.zoomPasscode}`,
                          zoomAppUrl: `zoommtg://zoom.us/join?confno=${clean}&pwd=${editingClass.zoomPasscode}`
                        });
                      }} 
                      required 
                    />
                  </div>
                  <div className="form-group-field">
                    <label className="field-label">Zoom Passcode *</label>
                    <input 
                      type="text" 
                      className="field-input font-mono font-bold" 
                      value={editingClass.zoomPasscode} 
                      onChange={(e) => {
                        const clean = editingClass.zoomMeetingId.replace(/\s+/g, '');
                        setEditingClass({ 
                          ...editingClass, 
                          zoomPasscode: e.target.value,
                          zoomDirectUrl: `https://zoom.us/j/${clean}?pwd=${e.target.value}`,
                          zoomAppUrl: `zoommtg://zoom.us/join?confno=${clean}&pwd=${e.target.value}`
                        });
                      }} 
                      required 
                    />
                  </div>
                  <div className="form-group-field">
                    <label className="field-label">Studio Room</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      value={editingClass.roomNo} 
                      onChange={(e) => setEditingClass({ ...editingClass, roomNo: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="form-group-field">
                  <label className="field-label">Today's Dictation Topic *</label>
                  <input 
                    type="text" 
                    className="field-input" 
                    value={editingClass.todayTopic} 
                    onChange={(e) => setEditingClass({ ...editingClass, todayTopic: e.target.value })} 
                    required 
                  />
                </div>

                <div className="form-group-field">
                  <label className="field-label">Reference Dictation Passage Snippet</label>
                  <textarea 
                    className="transcript-textarea" 
                    rows={4} 
                    value={editingClass.passageSnippet || ''} 
                    onChange={(e) => setEditingClass({ ...editingClass, passageSnippet: e.target.value })} 
                  />
                </div>
              </div>

              <div className="admin-modal-footer-sticky">
                <span className="footer-hint-text">
                  <ShieldCheck size={14} className="text-blue-600" />
                  <span>Changes will immediately sync with all candidates</span>
                </span>
                <div className="admin-modal-footer-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingClass(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ background: '#881337' }}>
                    Save & Update Class
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
