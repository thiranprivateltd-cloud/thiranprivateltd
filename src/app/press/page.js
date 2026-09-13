'use client';
import { motion } from 'framer-motion';
import { Download, FileText, Image as ImageIcon } from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import GlassCard from '@/components/GlassCard';

export default function Press() {
  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#2B1420]/50 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <SectionEyebrow icon={FileText} className="mb-4">
            Media & Press
          </SectionEyebrow>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase text-glow-gold leading-none mb-6"
          >
            Press Kit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[#B8A9A0] text-sm md:text-base max-w-2xl mx-auto"
          >
            Everything you need to write about Thiran Private Ltd. For press inquiries, please contact us at hello@thiranprivateltd.com.
          </motion.p>
        </div>

        {/* Company Boilerplate */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <GlassCard variant="default" showMotif={true} className="p-8 md:p-12 border-[#D4A54A]/30">
            <h2 className="text-2xl font-bold font-heading mb-4 text-[#D4A54A]">Company Boilerplate</h2>
            <p className="text-[#B8A9A0] leading-relaxed mb-6 font-body">
              Thiran Private Ltd is an Indian software ecosystem and educational technology firm founded in March 2026. Headquartered in Chennai, Thiran is dedicated to bridging the gap between academic learning and practical execution. Through its B2B division (LaunchLab) and its upcoming AI-driven consumer platform (NextStep), the company is building the infrastructure to empower the next generation of builders in India.
            </p>
            <div className="flex flex-wrap gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
              <div><span className="text-[#D4A54A]">Founded:</span> March 2026</div>
              <div><span className="text-[#D4A54A]">HQ:</span> Chennai, India</div>
              <div><span className="text-[#D4A54A]">Founder & CEO:</span> G S Varshith</div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Brand Assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard variant="default" className="p-8 border-[#D4A54A]/25">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-heading text-white">Logos</h2>
                <ImageIcon className="w-5 h-5 text-[#D4A54A]" />
              </div>
              <div className="w-full h-32 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 overflow-hidden p-4">
                <img src="/logo-full.png" alt="Thiran Logo" className="object-contain w-full h-full" />
              </div>
              <button className="w-full py-3 rounded-full bg-[#D4A54A]/10 hover:bg-[#D4A54A]/20 border border-[#D4A54A]/35 text-[#D4A54A] font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-colors cursor-pointer">
                <Download className="w-4 h-4 mr-2" /> Download Logo Pack (.ZIP)
              </button>
            </GlassCard>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard variant="default" className="p-8 border-[#D4A54A]/25">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-heading text-white">Executive Headshots</h2>
                <ImageIcon className="w-5 h-5 text-[#D4A54A]" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="w-full aspect-square bg-white/5 border border-[#D4A54A]/20 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src="/founder.jpg" alt="G S Varshith" className="object-cover w-full h-full" />
                </div>
                <div className="w-full aspect-square bg-white/5 border border-[#D4A54A]/20 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src="/executives.jpg" alt="Team Photo" className="object-cover w-full h-full" />
                </div>
              </div>
              <button className="w-full py-3 rounded-full bg-[#D4A54A]/10 hover:bg-[#D4A54A]/20 border border-[#D4A54A]/35 text-[#D4A54A] font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-colors cursor-pointer">
                <Download className="w-4 h-4 mr-2" /> Download Photos (.ZIP)
              </button>
            </GlassCard>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
