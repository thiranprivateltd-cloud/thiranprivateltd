'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Heart, 
  Coffee, 
  Sparkles, 
  Flame, 
  Rocket, 
  Code2, 
  MessageSquare, 
  ArrowRight, 
  Clock, 
  Compass, 
  CheckCircle2,
  Terminal,
  Zap
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import SectionEyebrow from '@/components/SectionEyebrow';
import ScrollReveal from '@/components/ScrollReveal';

// Day in the life quotes (authentic & candid)
const dayInTheLife = [
  {
    name: "G S Varshith",
    role: "Founder & CEO (2nd Year College Student)",
    quote: "My mornings start with college lectures and my afternoons with pull requests, client demo calls for LaunchLab, and fine-tuning prompt chains for NextStep. Building a venture while studying isn't glamorous—it's gritty, energizing, and taught me that discipline beats motivation every single day.",
    time: "7:30 AM – 11:30 PM",
    focus: "Strategy & Engineering"
  },
  {
    name: "Samuel Ignitius",
    role: "Full Stack Developer",
    quote: "Nobody micromanages tickets here. If we agree an API needs restructuring for 10x faster response time in rural networks, I draft the PR, tag the team on Discord, and it's tested before midnight. The ownership is real.",
    time: "2:00 PM – 9:00 PM",
    focus: "React & NextStep APIs"
  },
  {
    name: "Keerthana P S",
    role: "AI/ML Developer",
    quote: "Testing psychometric models in regional languages (Tamil and Hindi) revealed nuances you never find in standard English datasets. We spend hours validating edge cases with real student surveys. Seeing recommendations actually click for a kid is unbeatable.",
    time: "10:00 AM – 6:30 PM",
    focus: "Multilingual AI Models"
  },
  {
    name: "Navasri N",
    role: "Content & Communication Manager",
    quote: "We don't do formal corporate jargon or endless status decks. Our sprint updates are direct, visual, and focused on what we shipped today and what we're solving tomorrow.",
    time: "11:00 AM – 5:30 PM",
    focus: "Storytelling & Brand"
  }
];

// Growth stories (before vs now)
const growthStories = [
  {
    name: "Mukunthan S",
    role: "Tech Lead, UI/UX Designer",
    initials: "MS",
    before: "Joined knowing UI Figma basics and component styling.",
    after: "Now leads design architecture for 3 distinct web platforms, building reusable design tokens and supervising front-end delivery across client portals."
  },
  {
    name: "Shaik Nabeela Rayees",
    role: "Backend Developer",
    initials: "SR",
    before: "Familiar with simple CRUD backends and local databases.",
    after: "Architected real-time assessment pipelines, database security schemas, and rate-limiting infrastructure for high-concurrency waitlist traffic."
  },
  {
    name: "Prakathesh C",
    role: "Tech Support Lead & Frontend Developer",
    initials: "PC",
    before: "Writing isolated React components without production deploy workflows.",
    after: "Oversees cross-browser QA, automated accessibility standards, and instant bug resolution for live users across Tamil Nadu."
  }
];

// Candid moments / highlights
const moments = [
  {
    tag: "Late Night Build",
    title: "LaunchLab v1 Deploy Night",
    desc: "11:42 PM in Chennai. Pizza boxes on the table, fixing the last SVG rendering bug before hitting production.",
    metric: "9.9/10 Client Score",
    color: "from-amber-500/20 to-orange-500/5"
  },
  {
    tag: "Student Field Testing",
    title: "NextStep Prototype Trials",
    desc: "Gathering live psychometric feedback directly with students from Tier-2 colleges to understand career confusion.",
    metric: "500+ Early Testers",
    color: "from-purple-500/20 to-indigo-500/5"
  },
  {
    tag: "Team Sync",
    title: "Sunday Open Brainstorm",
    desc: "Unfiltered discussions where a first-week volunteer has equal voice as the founder on roadmap decisions.",
    metric: "19 Core Builders",
    color: "from-emerald-500/20 to-teal-500/5"
  },
  {
    tag: "Tamil Nadu Roots",
    title: "From Erode to Chennai",
    desc: "Proudly grounded in South Indian work ethic—humble beginnings, relentless hustle, and boundless technical ambition.",
    metric: "Zero VC Bloat",
    color: "from-rose-500/20 to-pink-500/5"
  }
];

// Culture principles
const principles = [
  {
    num: "01",
    title: "Ship before you feel completely ready",
    desc: "We learn 10x faster from live feedback than from private perfection. Working software in users' hands beats slide decks every single time."
  },
  {
    num: "02",
    title: "No ivory towers — founders code & PMs test",
    desc: "No one is too senior to fix a bug or talk to a student. Flat hierarchy, zero corporate politics, and maximum empathy for the end user."
  },
  {
    num: "03",
    title: "Rooted in Tier-2/3 reality, engineered for the world",
    desc: "We build for the student in Erode, Madurai, and Kanpur just as much as Bengaluru. Accessible bandwidth, local languages, and zero snobbery."
  },
  {
    num: "04",
    title: "Proof of execution over noise",
    desc: "We measure progress by working code, client satisfaction, and lives impacted—never by vanity buzzwords or inflated numbers."
  }
];

export default function LifeAtThiranPage() {
  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#15101E] text-white selection:bg-[#D4A54A] selection:text-[#1A1425]">
      {/* Warm Ambient Glows (Distinct human feel) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#D4A54A]/10 via-[#C1440E]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-[#2B1420]/70 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 1. Page Header (Warm, human, informal) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <SectionEyebrow icon={Heart} className="mb-4">
            LIFE AT THIRAN
          </SectionEyebrow>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            Behind the builds: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A54A] via-[#E8B86D] to-[#C1440E]">
              humans, hustle & late-night code
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-[#B8A9A0] font-body leading-relaxed max-w-2xl mx-auto"
          >
            We are a tight-knit crew of 19 student-builders, designers, and thinkers in Tamil Nadu creating real technology for millions of Indian students. Here is how we actually work, learn, and live.
          </motion.p>
        </div>

        {/* 2. The Environment (Honest, direct framing) */}
        <ScrollReveal className="mb-24">
          <div className="bg-gradient-to-br from-[#2B1420]/90 to-[#1A1425]/90 border border-[#D4A54A]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl">
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#D4A54A] mb-3 block">
                The Working Environment
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white mb-4">
                High autonomy, zero bureaucracy, and radical honesty.
              </h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                We don't have layers of middle management or endless approval chains. When someone joins Thiran, they are handed the keys to real repos, live customer projects, and genuine student feedback from day one. Decisions get made in quick Discord huddles and implemented the same afternoon. We embrace mistakes as the tuition fee for fast learning—as long as we reflect, adapt, and keep building forward.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 3. A Day in the Life (First-person routines) */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#D4A54A] mb-2 block">
              Daily Realities
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white">
              A Day in the Life
            </h2>
            <p className="text-xs md:text-sm text-[#B8A9A0] mt-2">
              Unfiltered quotes from real team members balancing college, code, and company building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dayInTheLife.map((item, idx) => (
              <ScrollReveal key={item.name} delay={idx * 0.1}>
                <div className="h-full bg-white/[0.03] border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:border-[#D4A54A]/40 transition-all group">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#D4A54A] font-mono mb-4 pb-3 border-b border-white/10">
                      <span className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.time}</span>
                      </span>
                      <span className="bg-[#D4A54A]/10 px-2.5 py-0.5 rounded-full border border-[#D4A54A]/20">
                        {item.focus}
                      </span>
                    </div>

                    <p className="text-sm text-gray-300 font-body leading-relaxed mb-6 italic">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-heading font-bold text-white text-sm">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#B8A9A0]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* 4. Moments Grid (Authentic photo & memory grid) */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#D4A54A] mb-2 block">
              Raw Memories
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white">
              Moments That Shaped Us
            </h2>
            <p className="text-xs md:text-sm text-[#B8A9A0] mt-2">
              The late nights, sprint wins, and genuine friendships behind every release.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {moments.map((moment, idx) => (
              <ScrollReveal key={moment.title} delay={idx * 0.1}>
                <div className={`h-full rounded-2xl p-6 bg-gradient-to-b ${moment.color} border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform`}>
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-heading font-bold tracking-wider uppercase text-[#D4A54A] mb-4">
                      {moment.tag}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white mb-2">
                      {moment.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed mb-4">
                      {moment.desc}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10 font-mono text-xs text-[#D4A54A] font-bold">
                    {moment.metric}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* 5. Growth Stories (Before vs After) */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#D4A54A] mb-2 block">
              Personal Trajectories
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white">
              How People Grow at Thiran
            </h2>
            <p className="text-xs md:text-sm text-[#B8A9A0] mt-2">
              What team members could do when they joined vs. what they own now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {growthStories.map((story, idx) => (
              <ScrollReveal key={story.name} delay={idx * 0.1}>
                <GlassCard className="h-full p-6 flex flex-col justify-between border-white/10 hover:border-[#D4A54A]/40">
                  <div>
                    <div className="flex items-center space-x-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#D4A54A]/10 border border-[#D4A54A]/30 flex items-center justify-center font-heading font-bold text-[#D4A54A] text-xs">
                        {story.initials}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-white text-sm">{story.name}</h4>
                        <p className="text-[11px] text-[#B8A9A0]">{story.role}</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                        <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                          When Joining:
                        </span>
                        <p className="text-gray-400">{story.before}</p>
                      </div>

                      <div className="bg-emerald-500/[0.05] border border-emerald-500/20 p-3 rounded-xl">
                        <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                          Now Owning:
                        </span>
                        <p className="text-gray-200">{story.after}</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* 6. What We Believe (Culture Principles) */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#D4A54A] mb-2 block">
              Core Tenets
            </span>
            <h2 className="font-heading text-2xl md:text-4xl font-extrabold text-white">
              What We Believe
            </h2>
            <p className="text-xs md:text-sm text-[#B8A9A0] mt-2">
              The operating code that keeps 19 people aligned without corporate friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p, idx) => (
              <ScrollReveal key={p.num} delay={idx * 0.1}>
                <div className="bg-white/[0.02] border border-white/10 hover:border-[#D4A54A]/40 rounded-2xl p-6 md:p-8 flex items-start space-x-5 transition-all">
                  <span className="font-mono text-2xl md:text-3xl font-black text-[#D4A54A]/60">
                    {p.num}
                  </span>
                  <div>
                    <h3 className="font-heading text-base md:text-lg font-bold text-white mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#B8A9A0] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* 7. Closing CTA */}
        <ScrollReveal>
          <div className="text-center bg-gradient-to-r from-[#2B1420] via-[#1A1425] to-[#2B1420] border border-[#D4A54A]/30 rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl">
            <div className="max-w-xl mx-auto space-y-4">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4A54A]/10 border border-[#D4A54A]/30 text-[#D4A54A] text-xs font-heading font-bold uppercase tracking-widest">
                <Rocket className="w-3.5 h-3.5" />
                <span>Join the Crew</span>
              </span>

              <h2 className="font-heading text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                Want to build with us?
              </h2>

              <p className="text-sm text-gray-300">
                Whether you're a student coder, UI designer, or researcher, we have high-ownership volunteer openings where you build real systems.
              </p>

              <div className="pt-4">
                <Link
                  href="/careers"
                  className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#D4A54A] hover:bg-[#c3943b] text-[#1A1425] font-heading font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-xl shadow-[#D4A54A]/20"
                >
                  <span>Explore Openings</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
