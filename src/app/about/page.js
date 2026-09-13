'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { ShieldCheck, Lightbulb, Target, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import SectionEyebrow from '@/components/SectionEyebrow';
import { JaliPattern, KolamDivider } from '@/components/HeritageMotifs';
import GlassCard from '@/components/GlassCard';

export default function About() {
  const { t } = useTranslation();
  const timelineRef = useRef(null);

  const timelineData = t('about.timeline') || [];
  const coreValues = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#D4A54A]" />,
      title: t('about.values.integrity'),
      desc: t('about.values.integrityDesc')
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-[#D4A54A]" />,
      title: t('about.values.innovation'),
      desc: t('about.values.innovationDesc')
    },
    {
      icon: <Target className="w-8 h-8 text-[#D4A54A]" />,
      title: t('about.values.impact'),
      desc: t('about.values.impactDesc')
    }
  ];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#2B1420]/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Faint Jali Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <JaliPattern opacity={0.05} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-20">
          <SectionEyebrow className="mb-4">
            {t('nav.about')}
          </SectionEyebrow>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase text-glow-gold leading-tight"
          >
            {t('about.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[#B8A9A0] text-sm md:text-base max-w-xl mx-auto mt-4"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>

        {/* Story & Why Education Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-28">
          {/* Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard variant="default" showMotif={true} className="p-8 md:p-10 border-[#D4A54A]/25">
              <h2 className="font-heading text-2xl font-black text-white uppercase mb-6 flex items-center space-x-3">
                <span className="w-1.5 h-6 bg-[#D4A54A] rounded-full" />
                <span>{t('about.storyTitle')}</span>
              </h2>
              <p className="font-body text-[#B8A9A0] text-sm md:text-base leading-relaxed">
                {t('about.storyText')}
              </p>
            </GlassCard>
          </motion.div>

          {/* Why Education Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard variant="default" className="p-8 md:p-10 border-[#D4A54A]/25 bg-[#2B1420]/50">
              <h2 className="font-heading text-2xl font-black text-[#D4A54A] uppercase mb-6 flex items-center space-x-3">
                <span className="w-1.5 h-6 bg-[#D4A54A] rounded-full" />
                <span>{t('about.whyTitle')}</span>
              </h2>
              <p className="font-body text-[#B8A9A0] text-sm md:text-base leading-relaxed">
                {t('about.whyText')}
              </p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Mission Statement Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-[#D4A54A]/30 bg-[#2B1420]/60 p-10 md:p-12 mb-28 text-center shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D4A54A]/5 rounded-full blur-[80px]" />
          <h2 className="font-heading text-3xl font-black uppercase text-[#D4A54A] text-glow-gold mb-6">
            {t('about.missionTitle')}
          </h2>
          <p className="font-heading text-lg md:text-2xl font-bold max-w-4xl mx-auto leading-relaxed text-gray-100">
            "{t('about.missionText')}"
          </p>
        </motion.div>

        {/* Core Values Section */}
        <div className="mb-28">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-black uppercase tracking-tight text-white mb-4">
              {t('about.valuesTitle')}
            </h2>
            <div className="w-48 mx-auto">
              <KolamDivider />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <GlassCard variant="default" className="p-8 border-[#D4A54A]/20">
                  <div className="mb-6 flex justify-center md:justify-start">{value.icon}</div>
                  <h3 className="font-heading text-lg font-black text-white uppercase mb-4 text-center md:text-left">
                    {value.title}
                  </h3>
                  <p className="font-body text-[#B8A9A0] text-xs md:text-sm leading-relaxed text-center md:text-left">
                    {value.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline (Animated Horizontal Scroll/Swipe) */}
        <div className="mb-10">
          <h2 className="font-heading text-3xl font-black text-center uppercase tracking-tight mb-16">
            {t('about.timelineTitle')}
          </h2>
          
          <div 
            ref={timelineRef}
            className="flex overflow-x-auto pb-10 gap-8 scrollbar-thin scrollbar-thumb-[#D4A54A] scrollbar-track-transparent snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {timelineData.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-[290px] md:w-[320px] glass-card rounded-2xl p-6 border border-[#D4A54A]/25 bg-[#2B1420]/50 snap-start relative flex flex-col justify-between"
              >
                <div className="absolute top-8 right-0 left-6 h-[1px] bg-[#D4A54A]/15 -z-10 hidden md:block">
                  <div className="w-3 h-3 rounded-full bg-[#D4A54A] -translate-y-1 animate-pulse" />
                </div>

                <div>
                  <span className="font-heading text-xs font-bold text-[#D4A54A] uppercase tracking-widest block mb-4">
                    {milestone.date}
                  </span>
                  <h3 className="font-heading text-lg font-black text-white uppercase mb-3">
                    {milestone.title}
                  </h3>
                  <p className="font-body text-[#B8A9A0] text-xs leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
                
                {idx < timelineData.length - 1 && (
                  <div className="flex items-center text-gray-500 justify-end mt-6 md:hidden">
                    <span className="text-[9px] font-heading font-bold uppercase tracking-wider mr-1 text-[#D4A54A]">Next</span>
                    <ArrowRight className="w-3 h-3 text-[#D4A54A]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center text-[#B8A9A0] text-xs mt-2 flex items-center justify-center space-x-2">
            <span className="animate-pulse">↔</span>
            <span>Swipe / Scroll Horizontally to view full journey</span>
          </div>
        </div>

      </div>
    </div>
  );
}
