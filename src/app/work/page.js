'use client';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function WorkPage() {
  const cases = [
    {
      id: "grievance360",
      title: "Grievance360",
      client: "Vel Tech University",
      timeline: "Deployed 2026",
      summary: "A comprehensive digital grievance redressal ecosystem engineered for modern universities.",
      problem: "The university relied on fragmented, paper-based or disjointed digital systems to track student and faculty complaints, leading to slow resolution times, lost tickets, and a lack of transparency.",
      solution: "We architected Grievance360—a centralized, real-time ticket management system. It features role-based access control, automated routing to specific departments, and a transparent tracking dashboard for students.",
      process: "Built using Next.js and Firebase, we focused on high availability and immediate feedback loops. We conducted A/B testing with the student council to refine the UX before full campus rollout.",
      result: "Reduced average grievance resolution time by 60%. Achieved 100% ticket traceability and significantly improved student satisfaction scores regarding administration responsiveness."
    },
    {
      id: "brundavanam",
      title: "Brundavanam",
      client: "Private Client",
      timeline: "Delivered 2026",
      summary: "A premium digital presence and operational portal for a large-scale agricultural and lifestyle venture.",
      problem: "The client needed a digital platform that could simultaneously act as a high-end brand showcase and manage complex backend operations for their sprawling physical estate.",
      solution: "Developed a dual-purpose platform featuring a heavily optimized, SEO-friendly Next.js frontend for marketing, paired with a secure operational dashboard for internal estate management.",
      process: "We utilized our 'Dark Glassmorphism' design system to give the public face a premium, investor-grade look, while keeping the admin dashboard heavily data-focused and utilitarian.",
      result: "Successfully launched the platform ahead of schedule. The client reported a 40% increase in digital inquiries and a massive reduction in manual admin overhead."
    }
  ];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-accent/25 bg-accent/5 text-[10px] font-heading font-bold uppercase tracking-widest text-accent mb-4"
          >
            <span>Our Work</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight mb-6"
          >
            Proof of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Execution</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
          >
            We don't just talk about innovation. We build it, deploy it, and scale it. Here are detailed breakdowns of our recent enterprise and consumer deliveries.
          </motion.p>
        </div>

        {/* Case Studies */}
        <div className="space-y-32">
          {cases.map((study, idx) => (
            <motion.div 
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Image / Visual side */}
              <div className="w-full lg:w-1/2 aspect-[4/3] glass-panel rounded-2xl overflow-hidden relative group flex items-center justify-center bg-[#111]">
                 {study.id === 'grievance360' ? (
                   <img src="/grievance360.png" alt={study.title} className="object-cover w-full h-full" />
                 ) : study.id === 'brundavanam' ? (
                   <img src="/brundavanam.png" alt={study.title} className="object-cover w-full h-full" />
                 ) : (
                   <div className="text-gray-600 font-bold uppercase tracking-widest">[ Insert {study.title} Screenshot ]</div>
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
                 
                 {/* Floating badge */}
                 <div className="absolute bottom-6 left-6 px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 flex items-center space-x-2">
                   <CheckCircle2 className="w-4 h-4 text-teal-400" />
                   <span className="text-xs font-bold tracking-wider uppercase text-white">{study.timeline}</span>
                 </div>
              </div>

              {/* Content side */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                  <span className="text-teal-400 font-bold text-xs tracking-widest uppercase mb-2 block">Client: {study.client}</span>
                  <h2 className="text-3xl md:text-4xl font-black font-heading text-white">{study.title}</h2>
                  <p className="text-gray-400 text-lg mt-4 leading-relaxed">{study.summary}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-bold mb-2 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />The Problem</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{study.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />Our Solution & Process</h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-2">{study.solution}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{study.process}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />The Result</h4>
                    <p className="text-gray-300 text-sm leading-relaxed font-medium">{study.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center glass-panel p-12 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Ready to build something similar?</h2>
          <p className="text-gray-400 mb-8">Whether you need an enterprise dashboard or a consumer ecosystem, our LaunchLab team is ready to execute.</p>
          <Link href="/products#launchlab" className="inline-flex items-center px-8 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
            Explore LaunchLab <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
