'use client';
import { motion } from 'framer-motion';

export default function StoryPage() {
  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-teal-900/10 rounded-[100%] blur-[120px] pointer-events-none -z-10" />

      <article className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-teal-400 font-bold text-xs tracking-[0.3em] uppercase">Founder's Note</span>
          <h1 className="text-5xl md:text-7xl font-black font-heading mt-4 mb-6">
            From Erode to the Ecosystem
          </h1>
          <p className="text-gray-400 italic text-lg">"I didn't want to wait for the future of education. I wanted to build it."</p>
        </motion.div>

        {/* Placeholder for Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-video rounded-2xl glass-panel mb-16 overflow-hidden relative flex items-center justify-center bg-[#111]"
        >
          <img src="/founder.jpg" alt="Founder G S Varshith" className="object-cover w-full h-full" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <p className="lead text-xl text-gray-300 font-medium mb-8">
            <span className="text-5xl float-left mr-3 mt-[-8px] text-teal-400 font-heading">E</span>
            very great company starts with a simple observation that you can't unsee. For me, growing up as a student in Erode, the observation was obvious: the gap between academic learning and real-world execution was massive.
          </p>

          <p className="text-gray-400 mb-6">
            Millions of students in India graduate every year, armed with degrees but starved of direction. We are taught to consume information, but rarely are we empowered to build, launch, and scale real solutions.
          </p>

          <h2 className="text-2xl font-bold font-heading text-white mt-12 mb-6">The Breaking Point</h2>
          
          <p className="text-gray-400 mb-6">
            When I moved to Chennai for my college education, I realized this wasn't just a local problem—it was systemic. The tools for career guidance were outdated, relying on rigid structures rather than dynamic, AI-driven personalization. I realized that if I wanted a platform that actually understood a student's unique potential, I would have to build it myself.
          </p>

          {/* Placeholder for secondary image */}
          <div className="w-full h-[400px] rounded-xl border border-white/10 bg-[#111] my-10 overflow-hidden relative">
            <img src="/early-days.jpg" alt="Early Days Team" className="object-cover w-full h-full" />
          </div>

          <h2 className="text-2xl font-bold font-heading text-white mt-12 mb-6">Founding Thiran</h2>

          <p className="text-gray-400 mb-6">
            In March 2026, Thiran Private Ltd was born out of a dorm room vision. We didn't just want to build another ed-tech app; we wanted to build an ecosystem. We started with LaunchLab to give students a hands-on project development environment, and we are now architecting NextStep—an AI ecosystem that doesn't just suggest careers, but actively guides students toward them.
          </p>

          <blockquote className="border-l-4 border-teal-500 pl-6 my-10 italic text-xl text-gray-300">
            "We are not here to change how students learn. We are here to change what they are capable of building."
          </blockquote>

          <p className="text-gray-400 mb-12">
            Today, we are a team of 19 passionate builders, researchers, and operators. We are entirely bootstrapped, relentlessly focused on execution, and deeply committed to the 1.4 billion dreams of this country.
          </p>

          <div className="flex items-center space-x-4 pt-8 border-t border-white/10">
            <div className="w-12 h-12 rounded-full bg-teal-900/50 flex items-center justify-center text-teal-400 font-bold border border-teal-500/30">
              GSV
            </div>
            <div>
              <h4 className="text-white font-bold">G S Varshith</h4>
              <p className="text-gray-500 text-sm">Founder & CEO, Thiran Private Ltd</p>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
