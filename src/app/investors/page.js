'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { TrendingUp, FileText, CheckCircle, PieChart, ShieldAlert, BarChart3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import SectionEyebrow from '@/components/SectionEyebrow';
import GlassCard from '@/components/GlassCard';

export default function Investors() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const problemText = t('investors.problemText');
  const solutionList = t('investors.solutionList') || [];
  const whyNowList = t('investors.whyNowList') || [];
  const tractionList = t('investors.tractionList') || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('https://formspree.io/f/mgoqrjwn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry');
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4A54A', '#C1440E', '#2B1420']
      });

      setIsSubmitted(true);
      setFormData({ name: '', org: '', email: '', message: '' });
    } catch (error) {
      setErrorMsg('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#2B1420]/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <SectionEyebrow icon={TrendingUp} className="mb-4">
            {t('nav.investors')}
          </SectionEyebrow>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase text-glow-gold leading-tight"
          >
            {t('investors.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[#B8A9A0] text-sm md:text-base max-w-xl mx-auto mt-4"
          >
            {t('investors.subtitle')}
          </motion.p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Pitch Columns */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* The Problem */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-heading text-xl md:text-2xl font-black uppercase text-[#D4A54A] flex items-center space-x-3">
                <ShieldAlert className="w-5 h-5 text-[#C1440E] flex-shrink-0" />
                <span>{t('investors.problemTitle')}</span>
              </h2>
              <GlassCard variant="default" className="p-6 border-[#D4A54A]/20">
                <p className="font-body text-gray-300 text-sm md:text-base leading-relaxed">
                  {problemText}
                </p>
              </GlassCard>
            </motion.div>

            {/* The Solution */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-heading text-xl md:text-2xl font-black uppercase text-[#D4A54A] flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7A9B76] flex-shrink-0" />
                <span>{t('investors.solutionTitle')}</span>
              </h2>
              <GlassCard variant="default" className="p-6 border-[#D4A54A]/20 space-y-3">
                {solutionList.map((sol, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm font-body text-gray-200">
                    <span className="text-[#7A9B76] mt-0.5">✔</span>
                    <span>{sol}</span>
                  </div>
                ))}
              </GlassCard>
            </motion.div>

            {/* Why Now */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-heading text-xl md:text-2xl font-black uppercase text-[#D4A54A] flex items-center space-x-3">
                <PieChart className="w-5 h-5 text-[#D4A54A] flex-shrink-0" />
                <span>{t('investors.whyNowTitle')}</span>
              </h2>
              <GlassCard variant="default" className="p-6 border-[#D4A54A]/20 space-y-3">
                {whyNowList.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm font-body text-gray-200">
                    <span className="text-[#D4A54A] mt-0.5">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </GlassCard>
            </motion.div>

            {/* Traction */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-heading text-xl md:text-2xl font-black uppercase text-[#D4A54A] flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-[#7A9B76] flex-shrink-0" />
                <span>{t('investors.tractionTitle')}</span>
              </h2>
              <GlassCard variant="default" className="p-6 border-[#D4A54A]/20 space-y-3">
                {tractionList.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm font-body text-gray-200">
                    <span className="text-[#7A9B76] mt-0.5">➔</span>
                    <span>{item}</span>
                  </div>
                ))}
              </GlassCard>
            </motion.div>

          </div>

          {/* Seed Pitch Inquiry Split (Side sticky form) */}
          <div className="lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-24">
              
              {/* Seed pitch ask card */}
              <GlassCard variant="default" showMotif={true} className="p-8 border-[#D4A54A]/30 bg-[#2B1420]/70 space-y-6">
                <span className="text-[9px] font-heading font-bold text-[#D4A54A] tracking-widest uppercase bg-[#D4A54A]/10 px-3 py-1 rounded-md border border-[#D4A54A]/30">
                  Investment Pitch
                </span>
                <h3 className="font-heading text-2xl font-black text-white uppercase mt-4">
                  {t('investors.askTitle')}
                </h3>
                <p className="font-body text-[#B8A9A0] text-xs md:text-sm leading-relaxed">
                  {t('investors.askText')}
                </p>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-center text-xs uppercase font-heading font-bold">
                  <span className="text-gray-400">Proposed Ask:</span>
                  <span className="text-[#D4A54A] text-glow-gold text-base">₹15,00,000 INR</span>
                </div>
              </GlassCard>

              {/* Inquiry Form */}
              <GlassCard variant="default" className="p-8 border-[#D4A54A]/20 bg-[#1A1425]">
                <h3 className="font-heading text-lg font-black text-white uppercase mb-6">
                  {t('investors.formTitle')}
                </h3>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="investor-form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-2">
                          {t('investors.fields.name')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-[#D4A54A]/20 bg-white/[0.02] text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A] text-xs font-body transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-2">
                            {t('investors.fields.org')}
                          </label>
                          <input
                            type="text"
                            value={formData.org}
                            onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-[#D4A54A]/20 bg-white/[0.02] text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A] text-xs font-body transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-2">
                            {t('investors.fields.email')} *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-[#D4A54A]/20 bg-white/[0.02] text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A] text-xs font-body transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-2">
                          {t('investors.fields.message')} *
                        </label>
                        <textarea
                          rows="4"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-[#D4A54A]/20 bg-white/[0.02] text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A54A] text-xs font-body transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-center py-4 rounded-xl bg-[#D4A54A] hover:bg-[#c3943b] text-[#1A1425] font-heading font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Sending...' : t('investors.fields.submit')}</span>
                      </button>
                      {errorMsg && (
                        <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center space-x-2">
                          <span>{errorMsg}</span>
                        </div>
                      )}
                    </motion.form>
                  ) : (
                    <motion.div
                      key="investor-success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#7A9B76]/20 border border-[#7A9B76]/40 flex items-center justify-center mx-auto mb-4 text-[#7A9B76]">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h4 className="font-heading text-base font-black text-white uppercase">
                        Inquiry Received!
                      </h4>
                      <p className="font-body text-xs text-[#B8A9A0] mt-2 leading-relaxed">
                        {t('investors.fields.success')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
