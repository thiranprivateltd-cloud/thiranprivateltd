'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Briefcase, 
  Building2, 
  Tv, 
  GraduationCap, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Send,
  CalendarCheck,
  Video,
  Download,
  Check,
  User,
  Sparkles,
  RefreshCw,
  Mail
} from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import GlassCard from '@/components/GlassCard';
import confetti from 'canvas-confetti';

// 1. Purpose Routing Configuration
const purposes = [
  {
    id: 'investment',
    title: 'Investment Inquiry',
    icon: Briefcase,
    desc: 'Angel investors, venture funds & strategic growth discussions with leadership.',
    peopleIds: ['varshith', 'dharshan', 'brundavanam']
  },
  {
    id: 'partnership',
    title: 'Partnership / Institution',
    icon: Building2,
    desc: 'Colleges, universities, schools, enterprise software & strategic institutional tie-ups.',
    peopleIds: ['rahav', 'mukunthan', 'praveena']
  },
  {
    id: 'press',
    title: 'Media / Press',
    icon: Tv,
    desc: 'Interviews, podcast appearances, press releases & publications.',
    peopleIds: ['akash', 'mukunthan']
  },
  {
    id: 'guidance',
    title: 'Student / Career Guidance',
    icon: GraduationCap,
    desc: 'NextStep advisory, student career mentorship & AI diagnostic sessions.',
    peopleIds: ['hariharan', 'keerthana']
  },
  {
    id: 'leadership',
    title: 'Executive Advisory',
    icon: HelpCircle,
    desc: 'General executive queries, AI product strategy or technical collaboration.',
    peopleIds: ['varshith', 'dharshan']
  }
];

// 2. Official Team Roster (Official Contact: thiranprivateltd@gmail.com)
const allPeople = [
  {
    id: 'varshith',
    name: 'Varshith G S',
    role: 'Founder & CEO',
    email: 'thiranprivateltd@gmail.com',
    subtitle: 'Strategic Vision, Capital & Leadership',
    initials: 'VG',
    image: '/founder.jpg'
  },
  {
    id: 'dharshan',
    name: 'Dharshan S',
    role: 'Co-Founder & COO',
    email: 'thiranprivateltd@gmail.com',
    subtitle: 'Operations, LaunchLab & Expansion',
    initials: 'DS',
    image: null
  },
  {
    id: 'brundavanam',
    name: 'Brundavanam P',
    role: 'Project Manager',
    email: 'thiranprivateltd@gmail.com',
    subtitle: 'Ecosystem Operations & Delivery',
    initials: 'BP',
    image: null
  },
  {
    id: 'rahav',
    name: 'Rahav V K',
    role: 'Product Manager',
    email: 'thiranprivateltd@gmail.com',
    subtitle: 'Product Strategy & Institutional Alliances',
    initials: 'RV',
    image: null
  },
  {
    id: 'mukunthan',
    name: 'Mukunthan S',
    role: 'Tech Lead',
    email: 'thiranprivateltd@gmail.com',
    subtitle: 'Platform Architecture & Tech Integrations',
    initials: 'MS',
    image: null
  },
  {
    id: 'praveena',
    name: 'Praveena R',
    role: 'HR Coordinator',
    email: 'thiranprivateltd@gmail.com',
    subtitle: 'Talent, Institutional Hiring & People Ops',
    initials: 'PR',
    image: null
  },
  {
    id: 'akash',
    name: 'Akash M',
    role: 'Digital Media Lead',
    email: 'thiranprivateltd@gmail.com',
    subtitle: 'Press Relations, Media & Broadcasts',
    initials: 'AM',
    image: null
  },
  {
    id: 'hariharan',
    name: 'Hari Haran V',
    role: 'Career Research Analyst',
    email: 'thiranprivateltd@gmail.com',
    subtitle: 'NextStep Student Counseling & AI Data',
    initials: 'HV',
    image: null
  },
  {
    id: 'keerthana',
    name: 'Keerthana P S',
    role: 'AI/ML Developer',
    email: 'thiranprivateltd@gmail.com',
    subtitle: 'NextStep Diagnostics & Technical Mentorship',
    initials: 'KP',
    image: null
  }
];

// Preset Slots Generator (Monday - Saturday strictly After 4:00 PM)
const presetSlots = [
  '04:00 PM - 04:30 PM',
  '04:30 PM - 05:00 PM',
  '05:30 PM - 06:00 PM',
  '06:30 PM - 07:00 PM',
  '07:30 PM - 08:00 PM',
  '08:30 PM - 09:00 PM'
];

export default function SchedulePage() {
  // Step 1: Purpose
  const [selectedPurpose, setSelectedPurpose] = useState('investment');
  // Step 2: Person (based on purpose)
  const [selectedPerson, setSelectedPerson] = useState(null);
  
  // Step 3: Date & Slot (Preset or Custom)
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(tomorrowStr);
  const [slotType, setSlotType] = useState('preset'); // 'preset' | 'custom'
  const [selectedSlot, setSelectedSlot] = useState(presetSlots[0]);
  const [customStartTime, setCustomStartTime] = useState('16:30');
  const [customDuration, setCustomDuration] = useState('30');
  const [bookedSlotsList, setBookedSlotsList] = useState([]);
  const [bookingError, setBookingError] = useState('');
  
  // Step 4: Form details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    mode: 'Google Meet',
    message: ''
  });
  
  // Step 5: Submission & Confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedData, setConfirmedData] = useState(null);

  // Filter available people based on selected purpose
  const currentPurposeObj = purposes.find((p) => p.id === selectedPurpose) || purposes[0];
  const availablePeople = allPeople.filter((person) => 
    currentPurposeObj.peopleIds.includes(person.id)
  );

  // Set default selected person when purpose changes
  useEffect(() => {
    if (availablePeople.length > 0 && (!selectedPerson || !currentPurposeObj.peopleIds.includes(selectedPerson.id))) {
      setSelectedPerson(availablePeople[0]);
    }
  }, [selectedPurpose]);

  // Fetch already booked slots when selectedPerson or selectedDate changes
  useEffect(() => {
    if (selectedPerson && selectedDate) {
      fetch(`/api/schedule?personEmail=${encodeURIComponent(selectedPerson.email)}&date=${selectedDate}`)
        .then(res => res.json())
        .then(data => {
          if (data.bookedSlots) {
            setBookedSlotsList(data.bookedSlots);
          }
        })
        .catch(() => {});
    }
  }, [selectedPerson, selectedDate]);

  const handlePurposeChange = (purposeId) => {
    setSelectedPurpose(purposeId);
    setBookingConfirmed(false);
    setBookingError('');
  };

  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
    setBookingConfirmed(false);
    setBookingError('');
  };

  // Get active time string
  const activeTimeSlot = slotType === 'preset' 
    ? selectedSlot 
    : `${customStartTime} (${customDuration} mins)`;

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!selectedPerson) return;

    setBookingError('');
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        purpose: currentPurposeObj?.title,
        personId: selectedPerson.id,
        personName: selectedPerson.name,
        personEmail: selectedPerson.email,
        date: selectedDate,
        timeSlot: activeTimeSlot,
        mode: formData.mode,
        message: formData.message
      };

      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setBookingError(data.error || 'Failed to submit request. That slot may be already taken.');
        setIsSubmitting(false);
        return;
      }

      setConfirmedData({
        ...payload,
        icsData: data.icsData,
        graphCalendar: data.graphCalendar,
        bookingId: data.bookingId
      });
      setBookingConfirmed(true);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#1D9E75', '#3B82F6']
      });

    } catch (err) {
      console.error('Error submitting booking:', err);
      setBookingError('An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadICSFile = () => {
    if (!confirmedData?.icsData) return;
    const blob = new Blob([confirmedData.icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Thiran_Meeting_${confirmedData.personName.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getOutlookWebLink = () => {
    if (!confirmedData) return '#';
    const title = encodeURIComponent(`[Thiran Meeting] ${confirmedData.purpose} with ${confirmedData.personName}`);
    const body = encodeURIComponent(`Scheduled session with ${confirmedData.personName} (${confirmedData.personEmail}).\n\nAgenda:\n${confirmedData.message}`);
    const location = encodeURIComponent(confirmedData.mode || 'Google Meet');
    
    const startIso = new Date(`${confirmedData.date}T16:30:00Z`).toISOString();
    const endIso = new Date(`${confirmedData.date}T17:00:00Z`).toISOString();
    
    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${body}&location=${location}&startdt=${startIso}&enddt=${endIso}`;
  };

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#2B1420]/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionEyebrow icon={CalendarIcon} className="mb-4">
            OFFICIAL SCHEDULING SYSTEM
          </SectionEyebrow>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4"
          >
            Schedule a <span className="text-[#D4A54A]">Meeting</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#B8A9A0] text-sm md:text-base max-w-2xl mx-auto"
          >
            Connect directly with Thiran leadership & specialist teams. Automated invitations will be dispatched with <strong>Google Meet</strong> video rooms and <strong>Microsoft Outlook</strong> calendar synchronization.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-gray-300"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center space-x-2">
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Meet & Video Conference</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Microsoft Outlook Sync</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-[#D4A54A]" />
              <span>24hr Prior Reminder Alert</span>
            </span>
          </motion.div>
        </div>

        {/* If Booking Confirmed: Show Success Card */}
        {bookingConfirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <GlassCard className="p-8 md:p-12 border-[#D4A54A]/50 text-center space-y-6 max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#D4A54A]/10 text-[#D4A54A] border border-[#D4A54A]/30 text-xs font-heading font-bold uppercase tracking-widest mb-3">
                  Request Dispatched to {confirmedData?.personName}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-black text-white">
                  Meeting Request Submitted
                </h2>
                <p className="text-sm text-gray-300 max-w-lg mx-auto mt-2">
                  A notification has been sent directly to <strong>{confirmedData?.personEmail}</strong>. Once confirmed by the host, the final Google Meet conference link and Outlook calendar invite will be delivered to <strong>{confirmedData?.email}</strong>.
                </p>
              </div>

              <div className="bg-[#1A1425]/90 border border-white/10 rounded-2xl p-6 max-w-xl mx-auto text-left space-y-3 text-xs md:text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Host Member:</span>
                  <span className="text-white font-bold">{confirmedData?.personName} ({confirmedData?.personEmail})</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Scheduled Date:</span>
                  <span className="text-[#D4A54A] font-bold">{confirmedData?.date}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Time Window:</span>
                  <span className="text-[#D4A54A] font-bold">{confirmedData?.timeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Meeting Platform:</span>
                  <span className="text-white">{confirmedData?.mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Attendee Email:</span>
                  <span className="text-white font-mono">{confirmedData?.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={downloadICSFile}
                  className="px-6 py-3.5 rounded-xl bg-[#D4A54A] text-[#1A1425] font-heading font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-[#D4A54A]/20 hover:bg-[#c3943b] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS Calendar Event</span>
                </button>

                <a
                  href={getOutlookWebLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 font-heading font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all"
                >
                  <span>Add to Outlook Web</span>
                  <ExternalLink className="w-4 h-4 text-[#D4A54A]" />
                </a>

                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="px-6 py-3.5 rounded-xl text-gray-400 hover:text-white font-heading text-xs font-bold uppercase tracking-wider"
                >
                  Schedule Another Session
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <div className="space-y-12">
            
            {/* ========================================================================= */}
            {/* STEP 1: SELECT PURPOSE */}
            {/* ========================================================================= */}
            <div>
              <div className="flex items-center space-x-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
                  1
                </span>
                <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                  Select Purpose
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {purposes.map((purpose) => {
                  const Icon = purpose.icon;
                  const isSelected = selectedPurpose === purpose.id;

                  return (
                    <button
                      key={purpose.id}
                      onClick={() => handlePurposeChange(purpose.id)}
                      className={`text-left rounded-2xl p-5 border transition-all duration-300 relative cursor-pointer group ${
                        isSelected
                          ? 'bg-[#2B1420]/90 border-[#D4A54A] shadow-lg shadow-[#D4A54A]/10 scale-[1.02]'
                          : 'bg-white/[0.02] border-white/10 hover:border-[#D4A54A]/40 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2.5 rounded-xl border transition-colors ${
                          isSelected
                            ? 'bg-[#D4A54A] text-[#1A1425] border-[#D4A54A]'
                            : 'bg-white/5 border-white/10 text-[#D4A54A] group-hover:border-[#D4A54A]/30'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && (
                          <span className="text-[#D4A54A] text-xs font-heading font-bold uppercase tracking-wider bg-[#D4A54A]/10 px-2.5 py-0.5 rounded-full border border-[#D4A54A]/30 flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>Active</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-base font-bold text-white mb-1.5">
                        {purpose.title}
                      </h3>
                      <p className="text-xs text-[#B8A9A0] leading-relaxed">
                        {purpose.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* STEP 2: SELECT TEAM MEMBER BASED ON PURPOSE */}
            {/* ========================================================================= */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
                    2
                  </span>
                  <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                    Select Team Member ({currentPurposeObj.title})
                  </h2>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {availablePeople.length} Host{availablePeople.length > 1 ? 's' : ''} Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {availablePeople.map((person) => {
                  const isSelected = selectedPerson?.id === person.id;

                  return (
                    <GlassCard
                      key={person.id}
                      className={`p-6 flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected ? 'ring-2 ring-[#D4A54A] bg-[#2B1420]/80' : 'hover:border-[#D4A54A]/40'
                      }`}
                      onClick={() => handlePersonSelect(person)}
                    >
                      <div>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/15 overflow-hidden flex items-center justify-center flex-shrink-0">
                            {person.image ? (
                              <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-heading font-bold text-base text-[#D4A54A] tracking-wider">
                                {person.initials}
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-heading text-base font-bold text-white truncate">
                              {person.name}
                            </h3>
                            <p className="text-xs font-semibold text-[#D4A54A] tracking-wide truncate">
                              {person.role}
                            </p>
                            <p className="text-[10px] font-mono text-gray-400 truncate mt-0.5">
                              {person.email}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-[#B8A9A0] mb-4">
                          {person.subtitle}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePersonSelect(person);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#D4A54A] text-[#1A1425] shadow-lg shadow-[#D4A54A]/20'
                            : 'bg-white/5 border border-white/15 text-white hover:bg-[#D4A54A]/10 hover:border-[#D4A54A]/40 hover:text-[#D4A54A]'
                        }`}
                      >
                        <span>{isSelected ? 'Selected Host' : 'Select Host'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </GlassCard>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* STEP 3 & STEP 4: SLOT SELECTION & FORM SUBMISSION */}
            {/* ========================================================================= */}
            {selectedPerson && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                
                {/* Step 3: Date & Slot Picker */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
                      3
                    </span>
                    <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                      Select Date & Slot
                    </h2>
                  </div>

                  <GlassCard className="p-6 space-y-5 border-white/10">
                    <div>
                      <label className="block text-xs font-heading uppercase tracking-wider text-gray-300 mb-2">
                        1. Choose Date
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4A54A]"
                      />
                    </div>

                    {/* Slot Type Toggle */}
                    <div>
                      <label className="block text-xs font-heading uppercase tracking-wider text-gray-300 mb-2">
                        2. Time Slot Preference (After 4:00 PM)
                      </label>
                      <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl border border-white/10 mb-4">
                        <button
                          type="button"
                          onClick={() => setSlotType('preset')}
                          className={`py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            slotType === 'preset' ? 'bg-[#D4A54A] text-[#1A1425]' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          Suggested Slots
                        </button>
                        <button
                          type="button"
                          onClick={() => setSlotType('custom')}
                          className={`py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            slotType === 'custom' ? 'bg-[#D4A54A] text-[#1A1425]' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          Custom Time
                        </button>
                      </div>

                      {slotType === 'preset' ? (
                        <div className="grid grid-cols-2 gap-2.5">
                          {presetSlots.map((slot) => {
                            const isSlotSelected = selectedSlot === slot;
                            const isBooked = bookedSlotsList.includes(slot);

                            return (
                              <button
                                key={slot}
                                type="button"
                                disabled={isBooked}
                                onClick={() => setSelectedSlot(slot)}
                                className={`p-3 rounded-xl border text-xs font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                                  isBooked 
                                    ? 'bg-white/[0.01] border-red-500/20 text-gray-500 opacity-50 cursor-not-allowed line-through'
                                    : isSlotSelected
                                    ? 'bg-[#2B1420] border-[#D4A54A] text-white shadow-md shadow-[#D4A54A]/20'
                                    : 'bg-white/[0.02] border-white/10 text-gray-300 hover:border-[#D4A54A]/40'
                                }`}
                              >
                                <span>{slot}</span>
                                {isBooked ? (
                                  <span className="text-[9px] text-red-400 uppercase font-bold tracking-wider">Booked</span>
                                ) : isSlotSelected ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A54A]" />
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-3 p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                          <p className="text-xs text-[#D4A54A] font-medium">
                            Specify start time and duration:
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] text-gray-400 uppercase mb-1">Start Time</label>
                              <input
                                type="time"
                                value={customStartTime}
                                onChange={(e) => setCustomStartTime(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-gray-400 uppercase mb-1">Duration</label>
                              <select
                                value={customDuration}
                                onChange={(e) => setCustomDuration(e.target.value)}
                                className="w-full bg-[#1A1425] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                              >
                                <option value="20">20 Minutes</option>
                                <option value="30">30 Minutes</option>
                                <option value="45">45 Minutes</option>
                                <option value="60">60 Minutes</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center space-x-3 text-xs text-gray-300">
                      <CalendarCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>Host Outlook Calendar invite automatically syncs with <strong>24-hour reminder</strong>.</span>
                    </div>
                  </GlassCard>
                </div>

                {/* Step 4 & 5: Form Details & Submit */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
                      4
                    </span>
                    <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                      Fill Out Details & Submit
                    </h2>
                  </div>

                  <GlassCard className="p-6 border-[#D4A54A]/30">
                    <form onSubmit={handleSubmitBooking} className="space-y-4">
                      {bookingError && (
                        <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-medium">
                          ⚠️ {bookingError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading uppercase tracking-wider text-gray-300 mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Anand Kumar"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading uppercase tracking-wider text-gray-300 mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="yourname@domain.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-heading uppercase tracking-wider text-gray-300 mb-1.5">
                            Organization / Institution
                          </label>
                          <input
                            type="text"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            placeholder="Optional (e.g. VC Fund, College)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-heading uppercase tracking-wider text-gray-300 mb-1.5">
                            Meeting Format / Mode *
                          </label>
                          <select
                            value={formData.mode}
                            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                            className="w-full bg-[#1A1425] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4A54A]"
                          >
                            <option value="Google Meet (Online Video)">Google Meet (Online Video)</option>
                            <option value="Phone Call (Voice)">Phone Call (Voice)</option>
                            <option value="In-Person Meeting (Office)">In-Person Meeting (At Thiran Office)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-heading uppercase tracking-wider text-gray-300 mb-1.5">
                          Brief Agenda / Discussion Points *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Please summarize the agenda, objectives or questions for the session..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A]"
                        />
                      </div>

                      <div className="p-3 bg-[#2B1420]/60 border border-[#D4A54A]/30 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Selected Host:</span>
                          <strong className="text-white">{selectedPerson.name} ({selectedPerson.email})</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date & Slot:</span>
                          <strong className="text-[#D4A54A]">{selectedDate} • {activeTimeSlot}</strong>
                        </div>
                      </div>

                      {/* STEP 5: SUBMIT */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-[#D4A54A] hover:bg-[#c3943b] text-[#1A1425] font-heading font-bold text-xs uppercase tracking-widest transition-all hover:scale-[1.01] flex items-center justify-center space-x-2 shadow-lg shadow-[#D4A54A]/20 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Submitting & Dispatching to Member...</span>
                        ) : (
                          <>
                            <span>Submit Request & Dispatch Confirmation</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </GlassCard>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
