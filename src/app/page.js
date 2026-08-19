'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { ShieldCheck, Lightbulb, Target, ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function About() {
  const { t } = useTranslation();
  const timelineRef = useRef(null);

  // Parse timeline array from t() helper
  const timelineData = t('about.timeline') || [];
  const coreValues = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      title: t('about.values.integrity'),
      desc: t('about.values.integrityDesc')
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-[#4488CC]" />,
      title: t('about.values.innovation'),
      desc: t('about.values.innovationDesc')
    },
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: t('about.values.impact'),
      desc: t('about.values.impactDesc')
    }
  ];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1F3864]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#1D9E75]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-accent/25 bg-accent/5 text-[10px] font-heading font-bold uppercase tracking-widest text-accent mb-4"
          >
            <span>{t('nav.about')}</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase text-glow-blue leading-tight"
          >
            {t('about.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-4"
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
            className="glass-card rounded-3xl p-8 md:p-10 border border-white/5 bg-white/[0.01]"
          >
            <h2 className="font-heading text-2xl font-black text-white uppercase mb-6 flex items-center space-x-3">
              <span className="w-1.5 h-6 bg-accent rounded-full" />
              <span>{t('about.storyTitle')}</span>
            </h2>
            <p className="font-body text-gray-400 text-sm md:text-base leading-relaxed">
              {t('about.storyText')}
            </p>
          </motion.div>

          {/* Why Education Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-10 border border-primary/20 bg-white/[0.01]"
          >
            <h2 className="font-heading text-2xl font-black text-[#4488CC] uppercase mb-6 flex items-center space-x-3">
              <span className="w-1.5 h-6 bg-[#4488CC] rounded-full" />
              <span>{t('about.whyTitle')}</span>
            </h2>
            <p className="font-body text-gray-400 text-sm md:text-base leading-relaxed">
              {t('about.whyText')}
            </p>
          </motion.div>
        </div>

        {/* Mission Statement Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-r from-white/[0.01] to-[#1F3864]/10 p-10 md:p-12 mb-28 text-center"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
          <h2 className="font-heading text-3xl font-black uppercase text-glow-teal mb-6">
            {t('about.missionTitle')}
          </h2>
          <p className="font-heading text-lg md:text-2xl font-bold max-w-4xl mx-auto leading-relaxed text-gray-200">
            "{t('about.missionText')}"
          </p>
        </motion.div>

        {/* Core Values Section */}
        <div className="mb-28">
          <h2 className="font-heading text-3xl font-black text-center uppercase tracking-tight mb-16">
            {t('about.valuesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-8 border border-white/5 bg-[#0C0C0C]"
              >
                <div className="mb-6 flex justify-center md:justify-start">{value.icon}</div>
                <h3 className="font-heading text-lg font-black text-white uppercase mb-4 text-center md:text-left">
                  {value.title}
                </h3>
                <p className="font-body text-gray-400 text-xs md:text-sm leading-relaxed text-center md:text-left">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline (Animated Horizontal Scroll/Swipe) */}
        <div className="mb-10">
          <h2 className="font-heading text-3xl font-black text-center uppercase tracking-tight mb-16">
            {t('about.timelineTitle')}
          </h2>
          
          {/* Horizontal scroll timeline block */}
          <div 
            ref={timelineRef}
            className="flex overflow-x-auto pb-10 gap-8 scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {timelineData.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-[290px] md:w-[320px] glass-card rounded-2xl p-6 border border-white/5 bg-[#0C0C0C] snap-start relative flex flex-col justify-between"
              >
                {/* Visual node line */}
                <div className="absolute top-8 right-0 left-6 h-[1px] bg-white/5 -z-10 hidden md:block">
                  <div className="w-3 h-3 rounded-full bg-accent -translate-y-1 animate-pulse" />
                </div>

                <div>
                  <span className="font-heading text-xs font-bold text-accent uppercase tracking-widest block mb-4">
                    {milestone.date}
                  </span>
                  <h3 className="font-heading text-lg font-black text-white uppercase mb-3">
                    {milestone.title}
                  </h3>
                  <p className="font-body text-gray-400 text-xs leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
                
                {idx < timelineData.length - 1 && (
                  <div className="flex items-center text-gray-600 justify-end mt-6 md:hidden">
                    <span className="text-[9px] font-heading font-bold uppercase tracking-wider mr-1">Next</span>
                    <ArrowRight className="w-3 h-3 text-accent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center text-gray-500 text-xs mt-2 flex items-center justify-center space-x-2">
            <span className="animate-pulse">↔</span>
            <span>Swipe / Scroll Horizontally to view full journey</span>
          </div>
        </div>

      </div>
    </div>
  );
}
