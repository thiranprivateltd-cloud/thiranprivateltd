'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  { name: "G S Varshith", role: "Founder & CEO", quote: "Building the future of education.", funFact: "2nd Year College Student", image: "/founder.jpg" },
  { name: "Dharshan S", role: "Co-Founder & COO", quote: "Execution is the game.", funFact: "D Spark Web Solutions Partner" },
  { name: "Brundavanam P", role: "Project manager", quote: "Ecosystem Operations & Delivery", funFact: "Master organizer." },
  { name: "Sasi", role: "Legal Mentor", quote: "Keeping us compliant.", funFact: "Reads contracts for fun." },
  { name: "Mukunthan S", role: "Tech Lead, UI/UX Designer", quote: "Design is how it works.", funFact: "Loves clean UI." },
  { name: "Samuel Ignitius", role: "Full Stack Developer", quote: "Code is poetry.", funFact: "React enthusiast." },
  { name: "Shaik Nabeela Rayees", role: "Backend Developer", quote: "Data is beautiful.", funFact: "Loves APIs." },
  { name: "Keerthana P S", role: "Ai/ML Developer", quote: "Machines can learn too.", funFact: "Python expert." },
  { name: "Hari Haran V", role: "Career Research Analyst", quote: "Finding patterns in chaos.", funFact: "Avid reader." },
  { name: "Mogesh J", role: "Data Analyst", quote: "Numbers don't lie.", funFact: "SQL wizard." },
  { name: "Prakathesh C", role: "Tech Support Lead & Frontend Developer", quote: "Helping one at a time.", funFact: "Always smiling." },
  { name: "Hariprasad H", role: "Integrated Testing Coordinator", quote: "Ensuring quality always.", funFact: "Bug hunter." },
  { name: "Navasri N", role: "Content & Communication Manager", quote: "Words matter.", funFact: "Social media guru." },
  { name: "Rahav V K", role: "Product Manager", quote: "Users first, always.", funFact: "Travels every weekend." },
  { name: "Arpit Kumar P", role: "Business Developer", quote: "Connecting with people.", funFact: "Talks to strangers." },
  { name: "Akash M", role: "Growth Manager, Digital Media", quote: "Telling our story.", funFact: "Growth hacker." },
  { name: "Kanmani G", role: "Growth Support, Data Coordinator", quote: "Data drives growth.", funFact: "Master organizer." },
  { name: "Lohidharani G S", role: "HR Admin, Community Manager", quote: "People are our strength.", funFact: "Community builder." },
  { name: "Vaishali S", role: "Operations Monitoring", quote: "Keeping the lights on.", funFact: "System optimizer." }
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center perspective-1000"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors hidden sm:block"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-0 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors hidden sm:block"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute w-full max-w-2xl glass-panel p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
          >
            {/* Photo Placeholder / Image */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
              {teamMembers[currentIndex].image ? (
                <img src={teamMembers[currentIndex].image} alt={teamMembers[currentIndex].name} className="object-cover w-full h-full" />
              ) : (
                <span className="text-4xl text-gray-600 font-bold uppercase tracking-widest">{teamMembers[currentIndex].name.substring(0, 2)}</span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white font-heading">{teamMembers[currentIndex].name}</h3>
                <span className="text-teal-400 font-bold text-sm tracking-widest uppercase">{teamMembers[currentIndex].role}</span>
              </div>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-3 -left-4 w-6 h-6 text-white/10" />
                <p className="text-gray-300 italic relative z-10">"{teamMembers[currentIndex].quote}"</p>
              </div>

              <div className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-400">
                <span className="text-gray-500 font-bold mr-2">FUN FACT:</span>
                {teamMembers[currentIndex].funFact}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Progress indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
        {teamMembers.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-teal-400' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
