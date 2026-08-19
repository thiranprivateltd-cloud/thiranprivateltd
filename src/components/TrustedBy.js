'use client';
import { motion } from 'framer-motion';

export default function TrustedBy() {
  return (
    <section className="border-y border-white/5 bg-[#0D0D0D] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <p className="text-gray-500 font-heading text-xs font-bold uppercase tracking-widest mb-6">
          Trusted By
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
              <span className="text-xl">🎓</span>
            </div>
            <span className="font-heading font-black text-xl text-white tracking-tight">Vel Tech University</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
              <span className="text-xl">🏢</span>
            </div>
            <span className="font-heading font-black text-xl text-white tracking-tight">Brundavanam</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
