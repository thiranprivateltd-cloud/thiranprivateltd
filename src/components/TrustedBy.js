'use client';
import { motion } from 'framer-motion';
import { InstitutionSilhouetteIcon, JaliGradCapIcon } from '@/components/HeritageMotifs';

export default function TrustedBy() {
  return (
    <section className="border-y border-[#D4A54A]/15 bg-[#2B1420]/30 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center relative z-10">
        <div className="flex items-center space-x-2 mb-6">
          <InstitutionSilhouetteIcon className="w-4 h-4 text-[#D4A54A]" />
          <p className="text-[#D4A54A] font-heading text-xs font-bold uppercase tracking-widest">
            Trusted By Educational & Enterprise Partners
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-80 hover:opacity-100 transition-all duration-500">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 px-5 py-3 rounded-2xl border border-[#D4A54A]/20 bg-[#1A1425]/70"
          >
            <div className="w-10 h-10 rounded-xl bg-[#D4A54A]/10 border border-[#D4A54A]/25 flex items-center justify-center text-[#D4A54A]">
              <JaliGradCapIcon className="w-5 h-5" color="#D4A54A" />
            </div>
            <span className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">Vel Tech University</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-3 px-5 py-3 rounded-2xl border border-[#D4A54A]/20 bg-[#1A1425]/70"
          >
            <div className="w-10 h-10 rounded-xl bg-[#D4A54A]/10 border border-[#D4A54A]/25 flex items-center justify-center text-[#D4A54A]">
              <InstitutionSilhouetteIcon className="w-5 h-5" color="#D4A54A" />
            </div>
            <span className="font-heading font-black text-lg sm:text-xl text-white tracking-tight">Brundavanam</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
