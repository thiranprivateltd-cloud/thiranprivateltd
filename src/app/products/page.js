'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { Layers, BookOpen, Sparkles, Check, Send, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import QuizTeaser from '@/components/QuizTeaser';

export default function Products() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(247); // Realistic starting student count

  // Read/Initialize local storage signup tracker
  useEffect(() => {
    const savedCount = localStorage.getItem('thiran_waitlist_count');
    if (savedCount) {
      setWaitlistCount(parseInt(savedCount, 10));
    } else {
      localStorage.setItem('thiran_waitlist_count', '247');
    }

    const alreadySignedUp = localStorage.getItem('thiran_waitlist_signup');
    if (alreadySignedUp === 'true') {
      setIsSubmitted(true);
    }
  }, []);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Trigger sweet feedback confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1D9E75', '#1F3864', '#4488CC']
    });

    const newCount = waitlistCount + 1;
    setWaitlistCount(newCount);
    localStorage.setItem('thiran_waitlist_count', newCount.toString());
    localStorage.setItem('thiran_waitlist_signup', 'true');
    setIsSubmitted(true);
    setEmail('');
  };

  const launchlabFeatures = t('products.launchlab.features') || [];
  const nextstepFeatures = t('products.nextstep.features') || [];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#1D9E75]/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[#1F3864]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#4488CC]/25 bg-[#4488CC]/5 text-[10px] font-heading font-bold uppercase tracking-widest text-[#4488CC] mb-4"
          >
            <span>{t('nav.products')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase text-glow-blue tracking-tight leading-none"
          >
            {t('products.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-4"
          >
            {t('products.subtitle')}
          </motion.p>
        </div>

        {/* Product Cards Container */}
        <div className="space-y-16">
          
          {/* PRODUCT 1: THIRAN LAUNCHLAB (LIVE) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-white/5 bg-[#0C0C0C]/80 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#1D9E75]/5 rounded-full blur-[80px]" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Product Info */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-[#1D9E75]/25 flex items-center justify-center text-accent">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3.5xl font-black text-white uppercase tracking-tight">
                      {t('products.launchlab.title')}
                    </h2>
                    <span className="text-[9px] font-heading font-bold text-accent tracking-widest uppercase">
                      Web Agency & Software Ecosystem
                    </span>
                  </div>
                </div>

                <p className="font-body text-gray-400 text-sm md:text-base leading-relaxed">
                  {t('products.launchlab.desc')}
                </p>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {launchlabFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-body text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-accent/15 border border-[#1D9E75]/30 flex items-center justify-center text-accent">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Available In Languages */}
                <div className="text-[10px] text-gray-500 font-heading font-bold uppercase tracking-wider flex items-center space-x-2">
                  <span>Available in:</span>
                  <span className="text-gray-300">English</span>
                  <span>·</span>
                  <span className="text-gray-300">தமிழ் (Tamil)</span>
                  <span>·</span>
                  <span className="text-gray-300">हिन्दी (Hindi)</span>
                </div>
              </div>

              {/* Call to Action Side */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end">
                <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#080808] w-full max-w-sm text-center lg:text-right space-y-6">
                  <div>
                    <span className="text-[9px] font-heading font-bold tracking-widest text-[#1D9E75] bg-[#1D9E75]/10 px-3 py-1.5 rounded-full border border-[#1D9E75]/20 uppercase">
                      {t('products.statusLive')}
                    </span>
                    <h3 className="font-heading text-lg font-black text-white uppercase mt-4">
                      Transform Your Digital Growth
                    </h3>
                    <p className="font-body text-gray-500 text-xs mt-1.5">
                      Premium web craftsmanship, designed to launch creators and businesses globally.
                    </p>
                  </div>
                  <a
                    href="https://launchlab-swart.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-4 rounded-xl bg-[#1D9E75] hover:bg-[#15805d] text-white font-heading font-bold text-xs uppercase tracking-widest shadow-lg shadow-accent/10 transition-all hover:scale-105 inline-flex items-center justify-center space-x-2"
                  >
                    <span>{t('products.launchlab.cta')}</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* PRODUCT 2: NEXTSTEP (COMING SOON & waitlist) */}
          <motion.div
            id="nextstep"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-primary/20 bg-[#0C0C0C]/80 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#4488CC]/5 rounded-full blur-[80px]" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Product Info */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/45 flex items-center justify-center text-[#4488CC]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3.5xl font-black text-white uppercase tracking-tight">
                      {t('products.nextstep.title')}
                    </h2>
                    <span className="text-[9px] font-heading font-bold text-[#4488CC] tracking-widest uppercase">
                      AI Career Guidance Platform
                    </span>
                  </div>
                </div>

                <p className="font-body text-gray-400 text-sm md:text-base leading-relaxed">
                  {t('products.nextstep.desc')}
                </p>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {nextstepFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-body text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-primary/15 border border-[#1F3864]/40 flex items-center justify-center text-[#4488CC]">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Waitlist stats */}
                <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.01]">
                  <Users className="w-4 h-4 text-accent animate-pulse" />
                  <span className="text-xs font-heading font-bold text-gray-300 uppercase tracking-wider">
                    <span className="text-accent">{waitlistCount}</span> {t('products.nextstep.waitlistCount')}
                  </span>
                </div>
              </div>

              {/* Interactive Waitlist Form Side */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end">
                <div className="glass-card rounded-2xl p-6 border border-primary/20 bg-[#080808] w-full max-w-sm text-center space-y-6">
                  <div>
                    <span className="text-[9px] font-heading font-bold tracking-widest text-[#4488CC] bg-[#4488CC]/10 px-3 py-1.5 rounded-full border border-[#4488CC]/20 uppercase">
                      {t('products.statusSoon')}
                    </span>
                    <h3 className="font-heading text-lg font-black text-white uppercase mt-4">
                      Secure Your Early Access
                    </h3>
                    <p className="font-body text-gray-500 text-xs mt-1.5">
                      Empower your educational decisions. Join India's upcoming student advisory network.
                    </p>
                  </div>

                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form
                        key="waitlist-form"
                        onSubmit={handleWaitlistSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('products.nextstep.emailPlaceholder')}
                          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white placeholder-gray-600 focus:outline-none focus:border-accent text-xs font-body transition-colors"
                        />
                        <button
                          type="submit"
                          className="w-full text-center py-3.5 rounded-lg bg-[#4488CC] hover:bg-[#346da5] text-white font-heading font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{t('products.nextstep.cta')}</span>
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success-message"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-4 rounded-lg bg-[#1D9E75]/10 border border-[#1D9E75]/30 text-center"
                      >
                        <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto mb-3 text-accent">
                          <Check className="w-5 h-5" />
                        </div>
                        <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
                          Waitlist Confirmed!
                        </h4>
                        <p className="font-body text-[10px] text-gray-400 mt-1 leading-normal">
                          {t('products.nextstep.successMsg')}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </motion.div>

          <QuizTeaser />

          {/* PRODUCT 3: FUTURE PRODUCT (VISION) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-10 border-dashed border-white/10 bg-transparent flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[9px] font-heading font-bold tracking-widest text-gray-500 bg-white/5 px-3 py-1.5 rounded-md border border-white/10 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                <span>{t('products.statusVision')}</span>
              </div>
              <h3 className="font-heading text-xl font-black text-white/60 uppercase">
                {t('products.future.title')}
              </h3>
              <p className="font-body text-gray-500 text-xs md:text-sm max-w-xl">
                {t('products.future.desc')}
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <a
                href="/about"
                className="px-6 py-3 rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/5 text-gray-500 hover:text-white font-heading font-bold text-xs uppercase tracking-widest transition-all"
              >
                {t('products.future.cta')}
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
