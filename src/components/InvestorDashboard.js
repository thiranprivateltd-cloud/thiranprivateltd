'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Counter component for animated numbers
const Counter = ({ from = 0, to, duration = 2, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;
      
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * (to - from) + from));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        } else {
          setCount(to);
        }
      };
      
      animationFrame = requestAnimationFrame(updateCount);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function InvestorDashboard() {
  const [daysSince, setDaysSince] = useState(0);

  useEffect(() => {
    const foundingDate = new Date('2026-03-06T00:00:00Z');
    const today = new Date();
    const diffTime = Math.abs(today - foundingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysSince(diffDays);
  }, []);

  const metrics = [
    { label: "NextStep Waitlist", value: 500, suffix: "+", accent: "accent-red" },
    { label: "LaunchLab Projects", value: 12, suffix: "", accent: "" },
    { label: "Team Size", value: 19, suffix: "", accent: "" },
    { label: "Days Since Founding", value: daysSince, suffix: "", accent: "" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400">Live Investor Dashboard</h2>
          </div>
          <h3 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight">
            Real-time Growth Metrics
          </h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className={`glass-panel p-8 flex flex-col justify-between h-48 group ${metric.accent}`}
            >
              <h4 className="text-gray-400 font-medium text-sm tracking-wide">{metric.label}</h4>
              <div className="text-5xl font-black font-heading text-white group-hover:scale-105 transition-transform duration-300 origin-left">
                {metric.value > 0 ? (
                  <Counter from={0} to={metric.value} suffix={metric.suffix} />
                ) : (
                  <span>0</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
