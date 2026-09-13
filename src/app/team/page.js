'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { Users } from 'lucide-react';
import TeamCarousel from '@/components/TeamCarousel';
import SectionEyebrow from '@/components/SectionEyebrow';

export default function Team() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#2B1420]/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <SectionEyebrow icon={Users} className="mb-4">
            {t('nav.team')}
          </SectionEyebrow>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase text-glow-gold leading-none"
          >
            {t('team.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[#B8A9A0] text-sm md:text-base max-w-xl mx-auto mt-4"
          >
            {t('team.subtitle')}
          </motion.p>
        </div>

        {/* TEAM CAROUSEL SECTION */}
        <div className="mb-16">
          <h2 className="font-heading text-xl font-black uppercase text-[#D4A54A] tracking-widest text-center mb-12 flex items-center justify-center space-x-3">
            <span className="w-8 h-px bg-[#D4A54A]/40" />
            <span>Meet The Team</span>
            <span className="w-8 h-px bg-[#D4A54A]/40" />
          </h2>
          <TeamCarousel />
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-[#D4A54A]/25 bg-[#D4A54A]/5 text-xs tracking-[0.3em] text-[#D4A54A] font-black uppercase italic"
          >
            <span>{t('team.bottomText')}</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
