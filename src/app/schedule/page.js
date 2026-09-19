'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
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
  UserCheck
} from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import GlassCard from '@/components/GlassCard';
import ScrollReveal from '@/components/ScrollReveal';

// Purpose routing configuration
const purposes = [
  {
    id: 'investment',
    title: 'Investment Inquiry',
    icon: Briefcase,
    desc: 'Angel investors, venture funds & strategic growth partners.',
    peopleIds: ['varshith', 'dharshan', 'sasi']
  },
  {
    id: 'partnership',
    title: 'Partnership / Institution',
    icon: Building2,
    desc: 'Colleges, schools, enterprise software & strategic tie-ups.',
    peopleIds: ['varshith', 'dharshan', 'brundavanam']
  },
  {
    id: 'press',
    title: 'Media / Press',
    icon: Tv,
    desc: 'Interviews, podcast appearances, press releases & publications.',
    peopleIds: ['navasri', 'varshith']
  },
  {
    id: 'guidance',
    title: 'Student / Career Guidance',
    icon: GraduationCap,
    desc: 'NextStep early access questions & student career mentorship.',
    peopleIds: ['hariharan', 'keerthana']
  },
  {
    id: 'other',
    title: 'Other Inquiries',
    icon: HelpCircle,
    desc: 'General leadership queries, tech collaborations, or advisory.',
    peopleIds: ['varshith', 'brundavanam']
  }
];

// Available team & leadership profiles for booking
const allPeople = [
  {
    id: 'varshith',
    name: 'G S Varshith',
    role: 'Founder & CEO',
    subtitle: 'Strategic Vision, Product & Capital',
    type: 'founder', // direct calendar booking for investment/partnership, gated for others
    calLink: 'https://cal.com', // placeholder integration embed url
    image: '/founder.jpg',
    initials: 'GV'
  },
  {
    id: 'dharshan',
    name: 'Dharshan S',
    role: 'Co-Founder & COO',
    subtitle: 'Operations, LaunchLab & Partnerships',
    type: 'founder',
    calLink: 'https://cal.com',
    image: null,
    initials: 'DS'
  },
  {
    id: 'sasi',
    name: 'Sasi',
    role: 'Legal Mentor & Board Advisor',
    subtitle: 'Compliance & Institutional Structuring',
    type: 'advisor', // gated request form
    calLink: null,
    image: null,
    initials: 'SA'
  },
  {
    id: 'brundavanam',
    name: 'Brundavanam P',
    role: 'Project Manager',
    subtitle: 'Ecosystem Operations & Institutional Delivery',
    type: 'lead',
    calLink: 'https://cal.com',
    image: null,
    initials: 'BP'
  },
  {
    id: 'navasri',
    name: 'Navasri N',
    role: 'Content & Communication Manager',
    subtitle: 'Press Relations & Editorial Comms',
    type: 'lead',
    calLink: 'https://cal.com',
    image: null,
    initials: 'NN'
  },
  {
    id: 'hariharan',
    name: 'Hari Haran V',
    role: 'Career Research Analyst',
    subtitle: 'NextStep Student Counseling & AI Data',
    type: 'lead',
    calLink: 'https://cal.com',
    image: null,
    initials: 'HV'
  },
  {
    id: 'keerthana',
    name: 'Keerthana P S',
    role: 'AI/ML Developer',
    subtitle: 'NextStep Diagnostics & Technical Mentorship',
    type: 'lead',
    calLink: 'https://cal.com',
    image: null,
    initials: 'KP'
  }
];

export default function SchedulePage() {
  const [selectedPurpose, setSelectedPurpose] = useState('investment');
  const [selectedPerson, setSelectedPerson] = useState(null);
  
  // Gated form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter people matching current purpose
  const currentPurposeObj = purposes.find((p) => p.id === selectedPurpose);
  const availablePeople = allPeople.filter((person) => 
    currentPurposeObj?.peopleIds.includes(person.id)
  );

  // Check if current person + purpose has direct calendar access vs gated request
  // Direct calendar for Founders is enabled only for Investment & Partnership to preserve bandwidth
  const hasDirectCalendar = (person) => {
    if (person.type === 'advisor') return false;
    if (person.type === 'founder') {
      return selectedPurpose === 'investment' || selectedPurpose === 'partnership';
    }
    return true; // regular leads have open calendar slots for their designated area
  };

  const handlePurposeChange = (purposeId) => {
    setSelectedPurpose(purposeId);
    setSelectedPerson(null);
    setFormSubmitted(false);
  };

  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
    setFormSubmitted(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // 1. Post to Schedule API
      await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          purpose: currentPurposeObj?.title,
          personName: selectedPerson?.name,
          message: formData.message,
          type: 'Gated Request'
        })
      });

      // 2. Persist to local bookings for instant Admin Portal viewing
      const existingBookings = JSON.parse(localStorage.getItem('thiran_meeting_requests') || '[]');
      const newBooking = {
        id: `REQ-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        organization: formData.organization || '-',
        purpose: currentPurposeObj?.title || 'General',
        personName: selectedPerson?.name || 'Team Member',
        message: formData.message,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending Review'
      };
      localStorage.setItem('thiran_meeting_requests', JSON.stringify([newBooking, ...existingBookings]));

      setFormSubmitted(true);
    } catch (err) {
      console.error('Error submitting booking request:', err);
      setFormSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#2B1420]/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionEyebrow icon={Calendar} className="mb-4">
            SCHEDULE A MEETING
          </SectionEyebrow>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4"
          >
            Let's <span className="text-[#D4A54A]">talk</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center space-x-2 text-[#B8A9A0] text-sm md:text-base"
          >
            <Clock className="w-4 h-4 text-[#D4A54A]" />
            <span>We typically respond within 2 business days</span>
          </motion.div>
        </div>

        {/* 2. Step 1: Purpose Selector */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
              1
            </span>
            <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
              What is the purpose of your meeting?
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
                      <span className="text-[#D4A54A] text-xs font-heading font-bold uppercase tracking-wider bg-[#D4A54A]/10 px-2.5 py-0.5 rounded-full border border-[#D4A54A]/30">
                        Selected
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

        {/* 3. Step 2: Person Selector (Filtered by Purpose) */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
              2
            </span>
            <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
              Select team member or leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePeople.map((person) => {
              const isSelected = selectedPerson?.id === person.id;
              const directCal = hasDirectCalendar(person);

              return (
                <GlassCard
                  key={person.id}
                  className={`p-6 flex flex-col justify-between transition-all ${
                    isSelected ? 'ring-2 ring-[#D4A54A] bg-[#2B1420]/70' : ''
                  }`}
                >
                  <div>
                    {/* Header with Photo/Initials */}
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

                      <div>
                        <h3 className="font-heading text-base font-bold text-white">
                          {person.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#D4A54A] tracking-wide">
                          {person.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-[#B8A9A0] mb-5">
                      {person.subtitle}
                    </p>

                    <div className="flex items-center space-x-2 text-[11px] text-gray-400 mb-6">
                      {directCal ? (
                        <span className="inline-flex items-center text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          Direct calendar booking available
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-amber-400/90 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                          Reviewed request (link sent within 2 business days)
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handlePersonSelect(person)}
                    className={`w-full py-2.5 px-4 rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D4A54A] text-[#1A1425] shadow-lg shadow-[#D4A54A]/20'
                        : 'bg-white/5 border border-white/15 text-white hover:bg-[#D4A54A]/10 hover:border-[#D4A54A]/40 hover:text-[#D4A54A]'
                    }`}
                  >
                    <span>{isSelected ? 'Selected' : (directCal ? 'Book Time' : 'Request Meeting')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* 4. Step 3: Booking Action (Direct Calendar Embed OR Gated Request Form) */}
        <AnimatePresence mode="wait">
          {selectedPerson && (
            <motion.div
              key={selectedPerson.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-12"
            >
              <div className="flex items-center space-x-3 mb-6">
                <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
                  3
                </span>
                <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                  {hasDirectCalendar(selectedPerson) 
                    ? `Pick a slot with ${selectedPerson.name}`
                    : `Submit meeting request for ${selectedPerson.name}`
                  }
                </h2>
              </div>

              {hasDirectCalendar(selectedPerson) ? (
                /* CALENDAR EMBED WIDGET */
                <GlassCard className="p-6 md:p-8 border-[#D4A54A]/30">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
                    <div>
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Calendar Connected</span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-white">
                        {selectedPerson.name} — 30 Min Discussion
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Focus: {currentPurposeObj?.title}
                      </p>
                    </div>

                    <a
                      href={selectedPerson.calLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-heading text-[#D4A54A] hover:bg-[#D4A54A]/10 transition-colors flex items-center space-x-1.5"
                    >
                      <span>Open in new tab</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Clean branded calendar mock embed with interactive booking simulation */}
                  <div className="bg-[#1A1425]/90 border border-white/10 rounded-2xl p-6 sm:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left: meeting details */}
                      <div className="space-y-4">
                        <h4 className="font-heading text-sm font-bold text-[#D4A54A] uppercase tracking-wider">
                          Meeting Agenda & Terms
                        </h4>
                        <div className="space-y-3 text-xs text-gray-300">
                          <p className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>30 Minutes • Google Meet / Zoom</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <UserCheck className="w-4 h-4 text-gray-400" />
                            <span>Direct 1-on-1 with {selectedPerson.name}</span>
                          </p>
                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed pt-2">
                          Please ensure you have a brief summary or deck ready for context if this is regarding investment or institutional partnership.
                        </p>
                      </div>

                      {/* Right: Embedded Interactive Booking Picker */}
                      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center">
                        <p className="text-xs font-heading font-semibold text-gray-300 mb-4">
                          Select Next Available Working Window
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {['Tomorrow, 3:00 PM', 'Tomorrow, 5:30 PM', 'Thursday, 11:00 AM', 'Thursday, 4:00 PM'].map((slot, i) => (
                            <button
                              key={i}
                              onClick={() => alert(`Selected slot: ${slot} with ${selectedPerson.name}. Confirmation email will be sent.`)}
                              className="py-2.5 px-2 rounded-lg bg-[#2B1420]/80 border border-[#D4A54A]/30 text-xs font-medium text-white hover:bg-[#D4A54A] hover:text-[#1A1425] transition-all cursor-pointer"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-gray-500">
                          Times displayed in your local timezone (IST)
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ) : (
                /* GATED REQUEST FORM */
                <GlassCard className="p-6 md:p-10 border-[#D4A54A]/30">
                  {formSubmitted ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-white">
                        Request Received
                      </h3>
                      <p className="text-sm text-gray-300 max-w-md mx-auto">
                        We'll review your request with <strong className="text-[#D4A54A]">{selectedPerson.name}</strong> and send a direct scheduling link within 2 business days.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs font-heading font-bold text-white hover:bg-white/10 transition-colors cursor-pointer mt-4"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-6 pb-4 border-b border-white/10">
                        <h3 className="font-heading text-xl font-bold text-white">
                          Schedule Request for {selectedPerson.name}
                        </h3>
                        <p className="text-xs text-[#B8A9A0] mt-1">
                          Advisory and special leadership sessions are curated to ensure relevant preparation.
                        </p>
                      </div>

                      <form onSubmit={handleSubmitForm} className="space-y-4 max-w-2xl">
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
                              placeholder="name@organization.com"
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
                              placeholder="Optional (e.g. VC Firm, University)"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-heading uppercase tracking-wider text-gray-300 mb-1.5">
                              Selected Purpose
                            </label>
                            <input
                              type="text"
                              disabled
                              value={currentPurposeObj?.title || ''}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-[#D4A54A] font-semibold cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-heading uppercase tracking-wider text-gray-300 mb-1.5">
                            Brief Agenda / Message *
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Share a short summary of what you'd like to discuss..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A]"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="px-8 py-3.5 rounded-full bg-[#D4A54A] hover:bg-[#c3943b] text-[#1A1425] font-heading font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 flex items-center space-x-2 shadow-lg shadow-[#D4A54A]/20 cursor-pointer"
                          >
                            <span>Submit Request</span>
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </GlassCard>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
