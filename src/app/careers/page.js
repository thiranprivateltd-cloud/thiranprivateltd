'use client';
import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { ArrowRight, Briefcase, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Careers() {
  const { t } = useTranslation();

  const jobs = [
    {
      id: "frontend-engineer",
      title: "Senior Frontend Engineer",
      team: "LaunchLab",
      location: "Chennai / Hybrid",
      type: "Full-Time",
      description: "Build high-performance, pixel-perfect user interfaces using Next.js and Tailwind CSS."
    },
    {
      id: "ai-researcher",
      title: "AI/ML Researcher Intern",
      team: "NextStep Core",
      location: "Remote",
      type: "Internship",
      description: "Research and implement cognitive assessment models to power the NextStep guidance engine."
    },
    {
      id: "product-manager",
      title: "Product Manager",
      team: "Ecosystem Operations",
      location: "Chennai",
      type: "Full-Time",
      description: "Drive product strategy and execution across both our B2B and B2C ventures."
    }
  ];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-red-500/25 bg-red-500/5 text-[10px] font-heading font-bold uppercase tracking-widest text-red-400 mb-4"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Us</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase text-white leading-none mb-6"
          >
            Build The Future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-gray-400 text-sm md:text-base max-w-2xl mx-auto"
          >
            We don't hire employees; we partner with builders. If you want to solve hard problems in education and technology, there is a seat for you here.
          </motion.p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between group hover:border-red-500/30 transition-colors"
            >
              <div className="flex-1 mb-6 md:mb-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-red-400 bg-red-500/10 px-2 py-1 rounded">
                    {job.team}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mb-2">{job.title}</h3>
                <p className="text-gray-400 text-sm max-w-lg mb-4">{job.description}</p>
                
                <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1" /> {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" /> {job.type}
                  </div>
                </div>
              </div>

              <div>
                <a 
                  href="#apply-form"
                  className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/10 hover:bg-white text-white hover:text-black rounded-lg font-bold text-sm uppercase tracking-widest transition-all group-hover:scale-105"
                >
                  Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Application Form */}
        <motion.div 
          id="apply-form"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 glass-panel rounded-2xl"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4">Application Form</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">Fill out the form below. Your application will be sent directly to our HR team and Founder.</p>
          </div>

          <form 
            action="https://formsubmit.co/thiranprivateltd@gmail.com" 
            method="POST" 
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* CC the HR email */}
            <input type="hidden" name="_cc" value="hrheadthiran@outlook.com" />
            {/* Disable captcha for smoother UX or keep it. We'll disable it for now */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Career Application from Website" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                <input type="text" name="name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                <input type="tel" name="phone" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Role Applying For</label>
                <select name="role" required defaultValue="" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors appearance-none">
                  <option value="" disabled>Select a role...</option>
                  <option value="Senior Frontend Engineer">Senior Frontend Engineer</option>
                  <option value="AI/ML Researcher Intern">AI/ML Researcher Intern</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="General Application">General Application</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Portfolio / LinkedIn / GitHub URL</label>
              <input type="url" name="portfolio" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="https://" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Why Thiran?</label>
              <textarea name="message" rows="4" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-colors" placeholder="Tell us what you want to build..."></textarea>
            </div>

            <div className="text-center pt-4">
              <button type="submit" className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm uppercase tracking-widest transition-all hover:scale-105">
                Submit Application <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
