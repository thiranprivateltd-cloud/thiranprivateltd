'use client';
import { motion } from 'framer-motion';
import { PencilJourneyIcon } from '@/components/HeritageMotifs';
import GlassCard from '@/components/GlassCard';

export default function CompanyTimeline() {
  const milestones = [
    {
      date: "Mar 2026",
      title: "Company Founded",
      description: "Thiran Private Ltd incorporated in Chennai, India, with a vision to revolutionize the education ecosystem.",
      icon: "🏢"
    },
    {
      date: "May 2026",
      title: "LaunchLab Goes Live",
      description: "Our flagship project development platform launches, empowering students to build real-world products.",
      icon: "🚀"
    },
    {
      date: "Aug 2026",
      title: "NextStep Initialization",
      description: "Began development on our AI-powered career guidance ecosystem. Waitlist crosses 500+ signups.",
      icon: "🧠"
    }
  ];

  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: "100%", 
      transition: { duration: 1.5, ease: "easeInOut" } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#1A1425]/40">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#D4A54A]/30 bg-[#D4A54A]/10 text-[10px] font-heading font-bold uppercase tracking-widest text-[#D4A54A] mb-3">
            <PencilJourneyIcon className="w-3.5 h-3.5" color="#D4A54A" />
            <span>Execution Milestones</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight mb-4">
            The Journey So Far
          </h2>
          <p className="text-[#B8A9A0] max-w-xl mx-auto text-sm sm:text-base">
            From our founding in Chennai to building scalable education tools, here is our execution pathway.
          </p>
        </motion.div>

        <div className="relative border-l-2 border-[#D4A54A]/25 ml-4 md:ml-32 space-y-12 pb-8">
          {milestones.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Gold Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#1A1425] border-2 border-[#D4A54A] group-hover:scale-125 transition-transform" />
              
              {/* Date tag for desktop */}
              <div className="md:absolute md:-left-32 md:top-1 text-xs font-mono font-bold uppercase tracking-wider text-[#D4A54A] mb-2 md:mb-0">
                {item.date}
              </div>

              <GlassCard variant="default" className="p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-xl font-bold font-heading text-white">{item.title}</h3>
                </div>
                <p className="text-[#B8A9A0] text-sm leading-relaxed">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
