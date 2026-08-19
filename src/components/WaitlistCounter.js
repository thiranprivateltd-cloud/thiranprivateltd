'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WaitlistCounter() {
  const [count, setCount] = useState(500);

  useEffect(() => {
    // Simulated live connection until Firebase is wired up
    const interval = setInterval(() => {
      // Simulate sporadic signups
      if (Math.random() > 0.7) {
        setCount(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 mt-6 max-w-fit">
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
      </div>
      <div className="flex space-x-1 font-heading">
        <span className="text-gray-400 text-sm">Live Waitlist:</span>
        <motion.span 
          key={count}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-bold text-sm"
        >
          {count}
        </motion.span>
      </div>
    </div>
  );
}
