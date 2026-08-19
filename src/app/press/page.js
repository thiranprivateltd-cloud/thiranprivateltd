'use client';
import { motion } from 'framer-motion';
import { Download, FileText, Image as ImageIcon } from 'lucide-react';

export default function Press() {
  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-500/5 text-[10px] font-heading font-bold uppercase tracking-widest text-blue-400 mb-4"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Media & Press</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase text-white leading-none mb-6"
          >
            Press Kit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
          >
            Everything you need to write about Thiran Private Ltd. For press inquiries, please contact us at hello@thiranprivateltd.com.
          </motion.p>
        </div>

        {/* Company Boilerplate */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-2xl mb-12"
        >
          <h2 className="text-2xl font-bold font-heading mb-4 text-white">Company Boilerplate</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Thiran Private Ltd is an Indian software ecosystem and educational technology firm founded in March 2026. Headquartered in Chennai, Thiran is dedicated to bridging the gap between academic learning and practical execution. Through its B2B division (LaunchLab) and its upcoming AI-driven consumer platform (NextStep), the company is building the infrastructure to empower the next generation of builders in India.
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <div><span className="text-gray-300">Founded:</span> March 2026</div>
            <div><span className="text-gray-300">HQ:</span> Chennai, India</div>
            <div><span className="text-gray-300">Founder & CEO:</span> G S Varshith</div>
          </div>
        </motion.div>

        {/* Brand Assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-heading text-white">Logos</h2>
              <ImageIcon className="w-5 h-5 text-gray-500" />
            </div>
            <div className="w-full h-32 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 overflow-hidden p-4">
              <img src="/logo-full.png" alt="Thiran Logo" className="object-contain w-full h-full" />
            </div>
            <button className="w-full py-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-colors">
              <Download className="w-4 h-4 mr-2" /> Download Logo Pack (.ZIP)
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-heading text-white">Executive Headshots</h2>
              <ImageIcon className="w-5 h-5 text-gray-500" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="w-full aspect-square bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/founder.jpg" alt="G S Varshith" className="object-cover w-full h-full" />
              </div>
              <div className="w-full aspect-square bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/executives.jpg" alt="Team Photo" className="object-cover w-full h-full" />
              </div>
            </div>
            <button className="w-full py-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-colors">
              <Download className="w-4 h-4 mr-2" /> Download Photos (.ZIP)
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
