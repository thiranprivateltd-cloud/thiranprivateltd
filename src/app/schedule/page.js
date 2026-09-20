'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Check,
  User,
  Layers,
  ArrowRight
} from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import GlassCard from '@/components/GlassCard';

// Base Cal Link
const BASE_CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || 'thiran-private-ltd-3iytyp';

// Separate Cal Links per Category / Purpose
const categoryOptions = [
  {
    id: 'investment',
    title: 'Investment Inquiry',
    icon: Briefcase,
    badge: '30 Min • Google Meet & Outlook',
    desc: 'Angel investors, venture funds & strategic growth discussions with executive leadership.',
    calLink: process.env.NEXT_PUBLIC_CAL_LINK_INVESTMENT || `${BASE_CAL_LINK}/investment-inquiry`,
    fallbackLink: BASE_CAL_LINK,
    host: 'Varshith G S (CEO)'
  },
  {
    id: 'partnership',
    title: 'Partnership / Institution',
    icon: Building2,
    badge: '30 Min • Google Meet & Outlook',
    desc: 'Colleges, universities, schools, enterprise software & institutional tie-ups.',
    calLink: process.env.NEXT_PUBLIC_CAL_LINK_PARTNERSHIP || `${BASE_CAL_LINK}/partnerships`,
    fallbackLink: BASE_CAL_LINK,
    host: 'Rahav V K & Executive Team'
  },
  {
    id: 'press',
    title: 'Media & Press',
    icon: Tv,
    badge: '20 Min • Google Meet & Outlook',
    desc: 'Interviews, podcast appearances, digital press releases & public features.',
    calLink: process.env.NEXT_PUBLIC_CAL_LINK_PRESS || `${BASE_CAL_LINK}/press-media`,
    fallbackLink: BASE_CAL_LINK,
    host: 'Akash M (Digital Media)'
  },
  {
    id: 'guidance',
    title: 'Student & Career Guidance',
    icon: GraduationCap,
    badge: '30 Min • Google Meet & Outlook',
    desc: 'NextStep early advisory, AI career diagnostics & student mentorship sessions.',
    calLink: process.env.NEXT_PUBLIC_CAL_LINK_GUIDANCE || `${BASE_CAL_LINK}/career-guidance`,
    fallbackLink: BASE_CAL_LINK,
    host: 'NextStep Advisory Team'
  },
  {
    id: 'leadership',
    title: 'Executive Advisory',
    icon: HelpCircle,
    badge: '45 Min • Google Meet & Outlook',
    desc: 'General executive queries, technical strategy or corporate advisory.',
    calLink: process.env.NEXT_PUBLIC_CAL_LINK_LEADERSHIP || `${BASE_CAL_LINK}/executive-advisory`,
    fallbackLink: BASE_CAL_LINK,
    host: 'Executive Leadership'
  }
];

// Separate Cal Links per Team Member
const teamMembers = [
  {
    id: 'varshith',
    name: 'Varshith G S',
    role: 'Founder & CEO',
    email: 'ceothiran@outlook.com',
    calLink: `${BASE_CAL_LINK}`,
    initials: 'VG',
    image: '/founder.jpg',
    specialty: 'Capital, Strategy & Vision'
  },
  {
    id: 'dharshan',
    name: 'Dharshan S',
    role: 'Co-Founder & COO',
    email: 'coothiran@outlook.com',
    calLink: `${BASE_CAL_LINK}`,
    initials: 'DS',
    image: null,
    specialty: 'Operations & Expansion'
  },
  {
    id: 'rahav',
    name: 'Rahav V K',
    role: 'Product Manager',
    email: 'productmanagerthiran@outlook.com',
    calLink: `${BASE_CAL_LINK}`,
    initials: 'RV',
    image: null,
    specialty: 'Institutional Alliances'
  },
  {
    id: 'akash',
    name: 'Akash M',
    role: 'Digital Media Lead',
    email: 'digitalmediathiran@outlook.com',
    calLink: `${BASE_CAL_LINK}`,
    initials: 'AM',
    image: null,
    specialty: 'Press & Media Relations'
  },
  {
    id: 'guidance_lead',
    name: 'NextStep Guidance Team',
    role: 'Student & Career Advisory',
    email: 'careerresearchanalystthiran@outlook.com',
    calLink: `${BASE_CAL_LINK}`,
    initials: 'NS',
    image: null,
    specialty: 'Career Counseling'
  }
];

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState('category'); // 'category' | 'member'
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0].id);
  const [selectedMember, setSelectedMember] = useState(teamMembers[0].id);

  const activeCategory = categoryOptions.find((c) => c.id === selectedCategory) || categoryOptions[0];
  const activeMember = teamMembers.find((m) => m.id === selectedMember) || teamMembers[0];

  const activeCalLink = viewMode === 'category' ? activeCategory.calLink : activeMember.calLink;
  const activeTitle = viewMode === 'category' ? activeCategory.title : `${activeMember.name} (${activeMember.role})`;
  
  const embedUrl = `https://cal.com/${activeCalLink}?theme=dark&embed=true`;

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#2B1420]/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
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
            Select your preferred discussion topic or team member below to access their dedicated <strong>Cal.com</strong> calendar, integrated with <strong>Google Meet</strong> and <strong>Microsoft Outlook</strong>.
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
              <span>Google Meet Video Auto-Link</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Microsoft Outlook Sync</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4A54A]" />
              <span>Direct Cal.com Link</span>
            </span>
          </motion.div>
        </div>

        {/* View Mode Switcher: By Topic vs By Team Member */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-1">
            <button
              onClick={() => setViewMode('category')}
              className={`px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === 'category'
                  ? 'bg-[#D4A54A] text-[#1A1425] shadow-lg shadow-[#D4A54A]/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>By Discussion Topic</span>
            </button>

            <button
              onClick={() => setViewMode('member')}
              className={`px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === 'member'
                  ? 'bg-[#D4A54A] text-[#1A1425] shadow-lg shadow-[#D4A54A]/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>By Team Member</span>
            </button>
          </div>
        </div>

        {/* Step 1: Selector Tabs */}
        <AnimatePresence mode="wait">
          {viewMode === 'category' ? (
            <motion.div 
              key="category-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
                  1
                </span>
                <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                  Select Discussion Type (Separate Cal Link)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {categoryOptions.map((purpose) => {
                  const Icon = purpose.icon;
                  const isSelected = selectedCategory === purpose.id;

                  return (
                    <button
                      key={purpose.id}
                      onClick={() => setSelectedCategory(purpose.id)}
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
                            <span>Active</span>
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
                        Host: <strong className="text-gray-300">{purpose.host}</strong>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="member-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
                  1
                </span>
                <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                  Select Team Member (Separate Cal Link)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {teamMembers.map((member) => {
                  const isSelected = selectedMember === member.id;

                  return (
                    <button
                      key={member.id}
                      onClick={() => setSelectedMember(member.id)}
                      className={`text-left rounded-2xl p-4 border transition-all duration-300 relative cursor-pointer ${
                        isSelected
                          ? 'bg-[#2B1420]/90 border-[#D4A54A] shadow-lg shadow-[#D4A54A]/10 scale-[1.01]'
                          : 'bg-white/[0.02] border-white/10 hover:border-[#D4A54A]/40 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gray-800 border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-heading font-bold text-xs text-[#D4A54A]">
                              {member.initials}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading text-sm font-bold text-white truncate">
                            {member.name}
                          </h3>
                          <p className="text-[11px] text-[#D4A54A] font-medium truncate">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-[#B8A9A0] leading-relaxed">
                        {member.specialty}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Cal.com Embed Container */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-full bg-[#D4A54A] text-[#1A1425] font-black text-xs flex items-center justify-center font-heading">
                2
              </span>
              <h2 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wider text-white">
                Book Slot for: <span className="text-[#D4A54A]">{activeTitle}</span>
              </h2>
            </div>

            <a
              href={`https://cal.com/${activeCalLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#D4A54A] hover:underline"
            >
              <span>cal.com/{activeCalLink} (Full Tab)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <GlassCard className="p-2 sm:p-4 border-[#D4A54A]/30 overflow-hidden rounded-3xl bg-[#1A1425]/95 shadow-2xl">
            <iframe
              key={activeCalLink}
              src={embedUrl}
              title={`Cal.com Scheduling - ${activeTitle}`}
              width="100%"
              height="720"
              frameBorder="0"
              className="w-full h-[720px] border-0 rounded-2xl bg-transparent"
              allow="camera; microphone; fullscreen; display-capture; autoplay"
            />
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
