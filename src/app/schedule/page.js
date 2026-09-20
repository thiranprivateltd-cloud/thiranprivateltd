'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Briefcase, 
  Building2, 
  Tv, 
  GraduationCap, 
  HelpCircle, 
  ExternalLink,
  ShieldCheck,
  Video,
  Mail,
  Check
} from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import GlassCard from '@/components/GlassCard';

// Default cal link from environment or fallback
const DEFAULT_CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || 'thiran-private-ltd-3iytyp';

const purposes = [
  {
    id: 'investment',
    title: 'Investment Inquiry',
    icon: Briefcase,
    badge: 'Google Meet • Outlook Sync',
    desc: 'Angel investors, venture funds & strategic growth discussions with leadership.',
    calLink: DEFAULT_CAL_LINK
  },
  {
    id: 'partnership',
    title: 'Partnership / Institution',
    icon: Building2,
    badge: 'Google Meet • Outlook Sync',
    desc: 'Colleges, schools, enterprise software & strategic institutional tie-ups.',
    calLink: DEFAULT_CAL_LINK
  },
  {
    id: 'press',
    title: 'Media & Press',
    icon: Tv,
    badge: 'Google Meet • Outlook Sync',
    desc: 'Interviews, podcast appearances, press coverage & publications.',
    calLink: DEFAULT_CAL_LINK
  },
  {
    id: 'guidance',
    title: 'Student & Career Guidance',
    icon: GraduationCap,
    badge: 'Google Meet • Outlook Sync',
    desc: 'NextStep early advisory, university counseling & student mentorship.',
    calLink: DEFAULT_CAL_LINK
  },
  {
    id: 'leadership',
    title: 'Executive Advisory',
    icon: HelpCircle,
    badge: 'Google Meet • Outlook Sync',
    desc: 'General executive queries, AI product strategy or technical collaboration.',
    calLink: DEFAULT_CAL_LINK
  }
];

export default function SchedulePage() {
  const [selectedPurpose, setSelectedPurpose] = useState(purposes[0].id);

  const currentPurposeObj = purposes.find((p) => p.id === selectedPurpose) || purposes[0];
  const activeCalLink = currentPurposeObj.calLink;
  const embedUrl = `https://cal.com/${activeCalLink}?theme=dark&embed=true`;

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#2B1420]/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionEyebrow icon={CalendarIcon} className="mb-4">
            CAL.COM CALENDAR SCHEDULING
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
            Powered by <strong>Cal.com</strong> with integrated <strong>Google Meet</strong> and <strong>Microsoft Outlook</strong> synchronization. Calendar invitations with video conference links will be automatically sent to your email.
          </motion.p>

          {/* Integration Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-gray-300"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center space-x-2">
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Meet Auto-Link</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Microsoft Outlook Sync</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4A54A]" />
              <span>Verified Executive Calendar</span>
            </span>
          </motion.div>
        </div>

        {/* Step 1: Purpose Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-5">
            <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
              1
            </span>
            <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
              Select Discussion Type
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {purposes.map((purpose) => {
              const Icon = purpose.icon;
              const isSelected = selectedPurpose === purpose.id;

              return (
                <button
                  key={purpose.id}
                  onClick={() => setSelectedPurpose(purpose.id)}
                  className={`text-left rounded-2xl p-4 border transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? 'bg-[#2B1420]/90 border-[#D4A54A] shadow-lg shadow-[#D4A54A]/10 scale-[1.01]'
                      : 'bg-white/[0.02] border-white/10 hover:border-[#D4A54A]/40 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-xl border transition-colors ${
                      isSelected
                        ? 'bg-[#D4A54A] text-[#1A1425] border-[#D4A54A]'
                        : 'bg-white/5 border-white/10 text-[#D4A54A]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="text-[#D4A54A] text-[10px] font-heading font-bold uppercase tracking-wider bg-[#D4A54A]/10 px-2 py-0.5 rounded-full border border-[#D4A54A]/30 flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Selected</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-sm font-bold text-white mb-1">
                    {purpose.title}
                  </h3>
                  <p className="text-xs text-[#B8A9A0] leading-relaxed mb-2">
                    {purpose.desc}
                  </p>
                  <div className="text-[10px] font-mono text-gray-400">
                    {purpose.badge}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Cal.com Embed Container */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
                2
              </span>
              <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                Choose Slot & Book via Cal.com
              </h2>
            </div>

            <a
              href={`https://cal.com/${activeCalLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#D4A54A] hover:underline"
            >
              <span>Open in full tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <GlassCard className="p-2 sm:p-4 border-[#D4A54A]/30 overflow-hidden rounded-3xl bg-[#1A1425]/95 shadow-2xl">
            <iframe
              src={embedUrl}
              title="Cal.com Scheduling Calendar"
              width="100%"
              height="700"
              frameBorder="0"
              className="w-full h-[700px] border-0 rounded-2xl bg-transparent"
              allow="camera; microphone; fullscreen; display-capture; autoplay"
            />
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
