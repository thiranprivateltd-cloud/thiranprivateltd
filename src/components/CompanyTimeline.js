'use client';
import { motion } from 'framer-motion';

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
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight mb-4">
            The Journey So Far
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From our founding to launching our first product, here is a timeline of our rapid execution and growth.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            <motion.div 
              className="w-full bg-gradient-to-b from-teal-500 to-blue-500 origin-top"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            />
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex items-center justify-between md:justify-normal ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#0A0A0A] border-2 border-teal-500 -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(29,158,117,0.5)] z-10">
                  <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 w-full md:w-5/12 glass-panel p-6 ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{milestone.icon}</span>
                    <span className="text-teal-400 font-bold text-sm uppercase tracking-widest">{milestone.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
