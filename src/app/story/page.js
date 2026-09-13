'use client';
import { motion } from 'framer-motion';
import { TempleSilhouette, KolamDivider } from '@/components/HeritageMotifs';
import SectionEyebrow from '@/components/SectionEyebrow';

export default function StoryPage() {
  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#2B1420]/50 rounded-[100%] blur-[140px] pointer-events-none -z-10" />

      <article className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Temple Architecture Silhouette Line Accent */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex justify-center mb-6"
        >
          <div className="w-48 h-20 opacity-40">
            <TempleSilhouette className="w-full h-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionEyebrow className="mb-4">
            FOUNDER'S NOTE
          </SectionEyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading mt-2 mb-6">
            From Erode to the Ecosystem
          </h1>
          <p className="text-[#D4A54A] font-serif italic text-lg md:text-xl">
            "I didn't want to wait for the future of education. I wanted to build it."
          </p>
        </motion.div>

        <KolamDivider className="mb-12" />

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-video rounded-2xl glass-panel mb-16 overflow-hidden relative flex items-center justify-center bg-[#2B1420]/60 border border-[#D4A54A]/25 shadow-2xl"
        >
          <img src="/founder.jpg" alt="Founder G S Varshith" className="object-cover w-full h-full" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none text-[#FDFBF7]"
        >
          <p className="lead text-xl text-gray-200 font-medium mb-8">
            <span className="text-5xl float-left mr-3 mt-[-8px] text-[#D4A54A] font-heading font-black">E</span>
            very great company starts with a simple observation that you can't unsee. For me, growing up as a student in Erode, the observation was obvious: the gap between academic learning and real-world execution was massive.
          </p>

          <p className="text-[#B8A9A0] mb-6">
            Millions of students in India graduate every year, armed with degrees but starved of direction. We are taught to consume information, but rarely are we empowered to build, launch, and scale real solutions.
          </p>

          <h2 className="text-2xl font-bold font-heading text-white mt-12 mb-6">The Breaking Point</h2>
          
          <p className="text-[#B8A9A0] mb-6">
            When I moved to Chennai for my college education, I realized this wasn't just a local problem—it was systemic. The tools for career guidance were outdated, relying on rigid structures rather than dynamic, AI-driven personalization. I realized that if I wanted a platform that actually understood a student's unique potential, I would have to build it myself.
          </p>

          {/* Secondary image */}
          <div className="w-full h-[400px] rounded-xl border border-[#D4A54A]/20 bg-[#2B1420]/40 my-10 overflow-hidden relative shadow-lg">
            <img src="/early-days.jpg" alt="Early Days Team" className="object-cover w-full h-full" />
          </div>

          <h2 className="text-2xl font-bold font-heading text-white mt-12 mb-6">Founding Thiran</h2>

          <p className="text-[#B8A9A0] mb-6">
            In March 2026, Thiran Private Ltd was born out of a dorm room vision. We didn't just want to build another ed-tech app; we wanted to build an ecosystem. We started with LaunchLab to give students a hands-on project development environment, and we are now architecting NextStep—an AI ecosystem that doesn't just suggest careers, but actively guides students toward them.
          </p>

          <blockquote className="border-l-4 border-[#D4A54A] pl-6 my-10 font-serif italic text-xl text-[#FDFBF7] bg-[#2B1420]/30 py-3 rounded-r-lg">
            "We are not here to change how students learn. We are here to change what they are capable of building."
          </blockquote>

          <p className="text-[#B8A9A0] mb-12">
            Today, we are a team of 19 passionate builders, researchers, and operators. We are entirely bootstrapped, relentlessly focused on execution, and deeply committed to the 1.4 billion dreams of this country.
          </p>

          <div className="flex items-center space-x-4 pt-8 border-t border-[#D4A54A]/20">
            <div className="w-12 h-12 rounded-full bg-[#D4A54A]/20 flex items-center justify-center text-[#D4A54A] font-bold border border-[#D4A54A]/40">
              GSV
            </div>
            <div>
              <h4 className="text-white font-bold">G S Varshith</h4>
              <p className="text-[#B8A9A0] text-sm">Founder & CEO, Thiran Private Ltd</p>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
