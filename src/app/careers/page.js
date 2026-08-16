'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { Send, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Careers() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    skills: '',
    why: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const whyPoints = t('careers.whyPoints') || [];

 const roles = [
  {
    title: "Frontend Developer",
    dept: "Engineering",
    desc: "Build cinematic user interfaces and robust React frameworks for LaunchLab and NextStep platforms."
  },
  {
    title: "UI/UX Designer",
    dept: "Design",
    desc: "Craft stunning high-fidelity glassmorphic visual systems, interactive wireframes, and premium assets."
  },
  {
    title: "AI/ML Developer",
    dept: "Engineering",
    desc: "Develop psychometric algorithms and regional language models to guide student paths in NextStep."
  },
  {
    title: "Content & Communication Writer",
    dept: "Marketing & PR",
    desc: "Write engaging copies, educational resources, and multi-language announcements."
  },
  {
    title: "Client Acquisition / Partnerships Lead",
    dept: "Sales & Partnerships",
    desc: "Drive growth by building strategic partnerships and expanding our client base across the education sector."
  },
  {
    title: "Product Operations Lead",
    dept: "Operations",
    desc: "Ensure smooth delivery and operational excellence for our products from development to deployment."
  },
  {
    title: "Data & Analytics Engineer",
    dept: "Engineering",
    desc: "Build data pipelines and dashboards to extract actionable insights from student performance and engagement metrics."
  },
  {
    title: "Community & Campus Lead",
    dept: "Community",
    desc: "Foster and grow a vibrant community of students and educators across college campuses."
  },
  {
    title: "Research & Career Mapping Specialist",
    dept: "Research",
    desc: "Conduct in-depth research to map emerging career paths and build comprehensive guides for student counseling."
  },
  {
    title: "Events and Webinar Coordinator",
    dept: "Events",
    desc: "Plan, organize, and execute engaging events, webinars, workshops, and online sessions that connect students, educators, and industry professionals."
  }
];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('https://formspree.io/f/mgoqrjwn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send application');
      }

      // Trigger success confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#1D9E75', '#1F3864', '#4488CC']
      });

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', role: '', skills: '', why: '' });
    } catch (error) {
      setErrorMsg('Failed to send application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1F3864]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#1D9E75]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-accent/25 bg-accent/5 text-[10px] font-heading font-bold uppercase tracking-widest text-accent mb-4"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t('nav.careers')}</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-5.5xl font-black uppercase text-glow-blue leading-tight"
          >
            {t('careers.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-4"
          >
            {t('careers.subtitle')}
          </motion.p>
        </div>

        {/* Why Join Section */}
        <div className="mb-24">
          <h2 className="font-heading text-2xl font-black uppercase text-center mb-12">
            {t('careers.whyJoinTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 border border-white/5 bg-[#0C0C0C]/50 flex items-start space-x-4 hover:border-accent/35 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-accent/15 border border-[#1D9E75]/30 flex items-center justify-center text-accent flex-shrink-0 mt-1">
                  <ChevronRight className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-black text-white uppercase mb-2">
                    {point.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-gray-400 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Listings & Apply Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-white/5">
          
          {/* Active Roles */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-heading text-2xl font-black uppercase mb-8 flex items-center space-x-3">
              <span className="w-1.5 h-6 bg-[#4488CC] rounded-full" />
              <span>{t('careers.openingsTitle')}</span>
            </h2>

            <div className="space-y-4">
              {roles.map((role, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 4 }}
                  className="glass-card rounded-xl p-6 border border-white/5 bg-[#0C0C0C]/40 flex flex-col justify-between hover:border-primary/25 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-heading text-base font-black text-white uppercase">
                      {role.title}
                    </h3>
                    <span className="text-[8px] font-heading font-bold text-accent tracking-wider bg-accent/10 px-2 py-0.5 rounded border border-accent/20 uppercase">
                      Volunteer
                    </span>
                  </div>
                  <span className="text-[9px] font-body text-gray-500 uppercase tracking-widest block mt-1">
                    {role.dept}
                  </span>
                  <p className="font-body text-xs text-gray-400 mt-4 leading-relaxed">
                    {role.desc}
                  </p>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, role: role.title }));
                        document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[9px] font-heading font-bold uppercase tracking-widest text-[#4488CC] hover:text-white flex items-center space-x-1 transition-colors cursor-pointer"
                    >
                      <span>Apply For Role</span>
                      <span>➔</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div id="apply-form" className="lg:col-span-6">
            <div className="glass-card rounded-2xl p-8 border border-[#1F3864]/30 bg-[#0C0C0C]/80 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#1F3864]/5 rounded-full blur-[80px]" />
              
              <h2 className="font-heading text-2xl font-black uppercase mb-8 flex items-center space-x-3">
                <span className="w-1.5 h-6 bg-accent rounded-full" />
                <span>{t('careers.formTitle')}</span>
              </h2>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="careers-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-gray-500 block mb-2">
                        {t('careers.fields.name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white placeholder-gray-600 focus:outline-none focus:border-accent text-xs font-body transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-gray-500 block mb-2">
                          {t('careers.fields.email')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white placeholder-gray-600 focus:outline-none focus:border-accent text-xs font-body transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-gray-500 block mb-2">
                          {t('careers.fields.phone')}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white placeholder-gray-600 focus:outline-none focus:border-accent text-xs font-body transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-gray-500 block mb-2">
                        {t('careers.fields.role')} *
                      </label>
                      <select
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-accent text-xs font-body transition-colors [&>option]:bg-[#0D0D0D] [&>option]:text-white"
                      >
                        <option value="" disabled>Select a role...</option>
                        {roles.map((r, i) => (
                          <option key={i} value={r.title}>{r.title} (Volunteer)</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-gray-500 block mb-2">
                        {t('careers.fields.skills')}
                      </label>
                      <input
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="e.g. React, Node.js, Figma"
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white placeholder-gray-600 focus:outline-none focus:border-accent text-xs font-body transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-heading font-bold uppercase tracking-widest text-gray-500 block mb-2">
                        {t('careers.fields.why')}
                      </label>
                      <textarea
                        rows="4"
                        value={formData.why}
                        onChange={(e) => setFormData({ ...formData, why: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white placeholder-gray-600 focus:outline-none focus:border-accent text-xs font-body transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-center py-4 rounded-xl bg-[#1D9E75] hover:bg-[#15805d] text-white font-heading font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Sending...' : t('careers.fields.submit')}</span>
                    </button>
                    {errorMsg && (
                      <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center space-x-2">
                        <span>{errorMsg}</span>
                      </div>
                    )}
                  </motion.form>
                ) : (
                  <motion.div
                    key="careers-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/35 flex items-center justify-center text-accent mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading text-xl font-black text-white uppercase mb-3">
                      Application Submitted!
                    </h3>
                    <p className="font-body text-sm text-gray-400 max-w-sm leading-relaxed mb-8">
                      {t('careers.fields.success')}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-heading font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Submit Another Application
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
