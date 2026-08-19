'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { Linkedin, Award, Shield, User, Users } from 'lucide-react';
import TeamCarousel from '@/components/TeamCarousel';

export default function Team() {
  const { t } = useTranslation();

  // Leadership Team Array
  const leaders = [
    {
      name: "G S Varshith",
      role: t('team.roles.ceo'),
      subtext: "2nd Year College Student | Erode ➔ Chennai",
      badge: "Founder",
      linkedin: "https://www.linkedin.com/in/varshithgs",
      youtube: "https://youtube.com/@codewithgsv?si=rOLkfx6fwxc45bS4",
      image: null // Fallback placeholder
    },
    {
      name: "Dharshan S",
      role: t('team.roles.coo'),
      subtext: "D Spark Web Solutions Partner",
      badge: "Co-Founder",
      linkedin: "https://www.linkedin.com/in/dharshan-s-32b7b332a/",
      youtube: null,
      image: null
    },
    {
      name: "Brundavanam Bose P",
      role: t('team.roles.pm'),
      subtext: "Ecosystem Operations & Delivery",
      badge: "Project Manager",
      linkedin: "#",
      youtube: null,
      image: null
    }
  ];

  // Advisors & Mentors array
  const advisors = [
    { name: "Sasi", role: "Legal Mentor", dept: "Legal & Compliance" }
  ];

  // 16 Volunteers list
  const volunteers = [
    { name: "Lohidharani G S", role: "HR Admin, Student Community Manager", dept: "HR & Community" },
    { name: "Mukunthan S", role: "Tech Lead, UI/UX Designer", dept: "Tech & Design" },
    { name: "Rahav V K", role: "Product Manager", dept: "Product" },
    { name: "Hari Haran V", role: "Career Research Analyst", dept: "Research" },
    { name: "Mogesh J", role: "Data Analyst", dept: "Data" },
    { name: "Shaik Nabeela rayees", role: "Backend Developer", dept: "Engineering" },
    { name: "Prakathesh C", role: "Tech Support Lead", dept: "Tech Support" },
    { name: "Keerthana P S", role: "AI/ML Developer", dept: "AI & ML" },
    { name: "Akash M", role: "Growth Manager, Digital Media Manager", dept: "Marketing" },
    { name: "Kanmani G", role: "Growth Support Manager, Data Coordinator", dept: "Marketing Support" },
    { name: "Arpit kumar P", role: "Business Developer", dept: "Business" },
    { name: "Navasri N", role: "Content & Communication Manager", dept: "PR & Content" },
    { name: "Nishanthini S", role: "Events Coordinator", dept: "Operations" },
    { name: "Samuel Ignitius", role: "Full Stack Developer", dept: "Engineering" },
    { name: "HariPrasad H", role: "Integrated testing Coordinator", dept: "Quality Assurance" },
    { name: "Vaishali S", role: "Operations Monitoring", dept: "Operations" }
  ];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#1F3864]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#1D9E75]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-accent/25 bg-accent/5 text-[10px] font-heading font-bold uppercase tracking-widest text-accent mb-4"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t('nav.team')}</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase text-glow-blue leading-none"
          >
            {t('team.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-4"
          >
            {t('team.subtitle')}
          </motion.p>
        </div>

        {/* TEAM CAROUSEL SECTION */}
        <div className="mb-16">
          <h2 className="font-heading text-xl font-black uppercase text-accent tracking-widest text-center mb-12 flex items-center justify-center space-x-3">
            <span className="w-8 h-px bg-accent/40" />
            <span>Meet The Team</span>
            <span className="w-8 h-px bg-accent/40" />
          </h2>
          <TeamCarousel />
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-white/5 bg-white/[0.01] text-xs tracking-[0.3em] text-gray-400 font-black uppercase italic"
          >
            <span>{t('team.bottomText')}</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
