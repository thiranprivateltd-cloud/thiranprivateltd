'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';

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
    { label: "NextStep Waitlist", value: 500, suffix: "+", highlight: true },
    { label: "LaunchLab Projects", value: 12, suffix: "", highlight: false },
    { label: "Team Size", value: 19, suffix: "", highlight: false },
    { label: "Days Since Founding", value: daysSince, suffix: "", highlight: false },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassCard
              variant="default"
              showMotif={metric.highlight}
              className={`text-center p-6 ${metric.highlight ? 'border-[#D4A54A]/40' : ''}`}
            >
              <h4 className="text-3xl md:text-4xl font-extrabold font-heading text-white mb-1">
                <span className={metric.highlight ? "text-[#D4A54A] text-glow-gold" : "text-white"}>
                  <Counter to={metric.value} suffix={metric.suffix} />
                </span>
              </h4>
              <p className="text-xs uppercase tracking-wider text-[#B8A9A0] font-bold">
                {metric.label}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
