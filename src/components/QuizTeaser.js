'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizTeaser() {
  const [step, setStep] = useState(0);

  const handleChoice = () => {
    setStep(1);
  };

  return (
    <div className="glass-panel p-8 mt-12 rounded-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl" />
      
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="step0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative z-10"
          >
            <h3 className="text-2xl font-bold font-heading text-white mb-2">What kind of builder are you?</h3>
            <p className="text-gray-400 mb-6 text-sm">Take a quick interactive preview of NextStep's cognitive analysis.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleChoice}
                className="flex-1 py-4 px-6 rounded-xl border border-white/10 bg-white/5 hover:bg-teal-500/10 hover:border-teal-500/50 transition-all text-left group"
              >
                <div className="text-xl mb-2 group-hover:scale-110 transition-transform origin-left">🧩</div>
                <div className="font-bold text-white text-sm">The Architect</div>
                <div className="text-xs text-gray-500 mt-1">I love designing systems and logic.</div>
              </button>
              
              <button 
                onClick={handleChoice}
                className="flex-1 py-4 px-6 rounded-xl border border-white/10 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/50 transition-all text-left group"
              >
                <div className="text-xl mb-2 group-hover:scale-110 transition-transform origin-left">🎨</div>
                <div className="font-bold text-white text-sm">The Visionary</div>
                <div className="text-xs text-gray-500 mt-1">I care about user experience and design.</div>
              </button>
              
              <button 
                onClick={handleChoice}
                className="flex-1 py-4 px-6 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/50 transition-all text-left group"
              >
                <div className="text-xl mb-2 group-hover:scale-110 transition-transform origin-left">⚡</div>
                <div className="font-bold text-white text-sm">The Hacker</div>
                <div className="text-xs text-gray-500 mt-1">I just want to ship code fast.</div>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10 text-center py-6"
          >
            <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-500/40">
              <span className="text-2xl animate-pulse">🧠</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Insight Logged.</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              In the full NextStep ecosystem, this data point connects with your academic performance and soft skills to map out real-world career paths.
            </p>
            <button 
              onClick={() => setStep(0)}
              className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors text-sm font-bold uppercase tracking-widest"
            >
              Reset Teaser
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
