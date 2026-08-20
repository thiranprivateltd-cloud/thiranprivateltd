'use client';

import { motion } from 'framer-motion';
import { 
  Building2, 
  Calendar, 
  Users, 
  Rocket, 
  Globe, 
  Sparkles, 
  Briefcase, 
  FileText, 
  FileCheck, 
  Languages, 
  Star, 
  ShieldCheck, 
  Coins, 
  Award,
  Zap
} from 'lucide-react';

export default function AchievementsSection() {
  const categories = [
    {
      title: "Company",
      emoji: "🏢",
      items: [
        { label: "Founded", value: "6 Mar 2026", subtext: "Dorm room vision", icon: Calendar },
        { label: "Entity Status", value: "Incorporated", subtext: "Private Limited", icon: Building2 },
        { label: "Team Size", value: "19 Believers", subtext: "Engineers & Builders", icon: Users },
      ]
    },
    {
      title: "Products",
      emoji: "🌐",
      items: [
        { label: "LaunchLab", value: "Live B2B Engine", subtext: "Lighthouse 98+", icon: Rocket },
        { label: "thiran.in", value: "Official Portal", subtext: "Dark Glassmorphism", icon: Globe },
        { label: "NextStep", value: "AI Guidance Engine", subtext: "Active Beta", icon: Sparkles },
      ]
    },
    {
      title: "Work",
      emoji: "💼",
      items: [
        { label: "Client Delivery", value: "2 Enterprise Projects", subtext: "100% On-Time", icon: Briefcase },
        { label: "Impact", value: "Vel Tech & Brundavanam", subtext: "Proven Execution", icon: Award },
      ]
    },
    {
      title: "Operations",
      emoji: "📋",
      items: [
        { label: "Circulars", value: "5 Issued", subtext: "Internal Governance", icon: FileText },
        { label: "Docs Published", value: "10 Public Assets", subtext: "Transparancy First", icon: FileCheck },
      ]
    },
    {
      title: "Brand",
      emoji: "🌍",
      items: [
        { label: "Localization", value: "Trilingual Platform", subtext: "Tamil • English • Hindi", icon: Languages },
        { label: "Satisfaction", value: "9.9 / 10 Rating", subtext: "User Benchmark", icon: Star },
      ]
    }
  ];

  return (
    <section className="relative py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-heading font-bold uppercase tracking-widest mb-4"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Badge of Honor</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight"
          >
            168 Days. <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-amber-400">Here's What We Built.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-4"
          >
            Dense proof of execution, relentless momentum, and zero fluff.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12 mb-16">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
                <span className="text-xl">{cat.emoji}</span>
                <h3 className="font-heading text-xs font-black uppercase tracking-[0.2em] text-teal-400">
                  {cat.title}
                </h3>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, itemIdx) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.02, translateY: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-teal-500/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-teal-500/10 transition-colors" />
                      
                      <div className="flex items-start space-x-4 relative z-10">
                        <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-gray-500 block mb-1">
                            {item.label}
                          </span>
                          <h4 className="text-lg font-bold font-heading text-white tracking-tight group-hover:text-teal-300 transition-colors">
                            {item.value}
                          </h4>
                          <p className="text-[11px] font-body text-gray-400 mt-0.5">
                            {item.subtext}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Standout Stat Cards (2 Cards on own row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          
          {/* Card 1: Bootstrapped Pride */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-3xl p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-950/20 to-black overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.1)] group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <Coins className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-heading font-bold uppercase tracking-widest text-amber-400">
                100% Self-Funded & Independent
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-black font-heading text-amber-300 tracking-tight mb-2">
              ₹0 External Funding Taken
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm font-body leading-relaxed">
              Bootstrapped with discipline. We own our governance, our products, and our vision without dilution or external pressure.
            </p>
          </motion.div>

          {/* Card 2: Mission Statement */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-3xl p-8 border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-teal-950/20 to-black overflow-hidden shadow-[0_0_50px_rgba(20,184,166,0.1)] group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-[10px] font-heading font-bold uppercase tracking-widest text-teal-400">
                Core Purpose & Values
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight mb-2">
              Mission: Education for India
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm font-body leading-relaxed">
              Empowering students across tier-1, tier-2, and tier-3 India with accessible, multilingual AI tools for real-world career success.
            </p>
          </motion.div>

        </div>

        {/* MANIFESTO BRAND STATEMENT / CLOSING SLIDE */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              }
            }
          }}
          className="relative w-full py-28 sm:py-36 md:py-48 bg-[#040404] text-center overflow-hidden flex flex-col items-center justify-center my-12"
        >
          {/* Extremely subtle radial glow (teal, <10% opacity) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal-500/[0.06] rounded-full blur-[140px] pointer-events-none -z-0" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4 sm:space-y-6">
            
            {/* Line 1 */}
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-white tracking-tight leading-none"
            >
              WE STARTED WITH <span className="text-teal-400">ZERO</span>.
            </motion.h2>

            {/* Line 2 */}
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-white tracking-tight leading-none"
            >
              NOT <span className="text-teal-400">ZERO</span> IDEAS.
            </motion.h2>

            {/* Line 3 */}
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-white tracking-tight leading-none"
            >
              NOT <span className="text-teal-400">ZERO</span> AMBITION.
            </motion.h2>

            {/* Line 4 */}
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-white tracking-tight leading-none pt-4 sm:pt-6"
            >
              JUST <span className="text-teal-400">ZERO</span> EXTERNAL FUNDING.
            </motion.h2>

            {/* Line 5 */}
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-white tracking-tight leading-none pt-6 sm:pt-10"
            >
              168 DAYS LATER,
            </motion.h2>

            {/* Line 6 */}
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-white tracking-tight leading-none"
            >
              WE'RE BUILDING.
            </motion.h2>

            {/* Line 7: THIRAN Signature */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="pt-12 sm:pt-16 flex flex-col items-center"
            >
              <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent mb-6 sm:mb-8" />
              <span className="font-heading font-bold text-xs sm:text-sm md:text-base tracking-[0.6em] text-gray-400 uppercase">
                THIRAN
              </span>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
