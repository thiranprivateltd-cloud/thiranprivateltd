'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';
import SectionEyebrow from '@/components/SectionEyebrow';
import GlassCard from '@/components/GlassCard';
import CTAButton from '@/components/CTAButton';
import ScrollReveal from '@/components/ScrollReveal';
import TrustedBy from '@/components/TrustedBy';
import { KolamDivider, BookGrowthIcon, JaliGradCapIcon } from '@/components/HeritageMotifs';

export default function WorkPage() {
  const cases = [
    {
      id: "grievance360",
      client: "Vel Tech University",
      tagline: "Enterprise Digital Redressal Architecture",
      title: "Grievance360 Platform",
      image: "/grievance360.png",
      deviceType: "browser",
      problem: "The university relied on fragmented, manual, or disjointed digital channels to track student and faculty complaints, leading to delayed resolution times, lost tickets, and an absence of transparent escalation trails.",
      solution: "We engineered Grievance360—a unified, role-based ticket management system featuring automated routing to designated campus departments, SLA monitoring, and live student progress tracking dashboards.",
      process: [
        "Architected with Next.js and secure cloud databases for real-time ticket streaming and immediate auditability.",
        "Ran multi-cohort usability testing with the student council to ensure friction-free submission on mobile devices.",
        "Integrated encrypted role-based routing between deans, department heads, and operational support staff."
      ],
      result: "Reduced average grievance resolution time by 60%. Achieved 100% ticket traceability and significantly elevated campus trust metrics."
    },
    {
      id: "brundavanam",
      client: "Private Enterprise Client",
      tagline: "High-Performance Digital Portal & Estate Management",
      title: "Brundavanam Portal",
      image: "/brundavanam.png",
      deviceType: "browser",
      problem: "The client needed a platform that served dual missions: a cinematic, high-end public brand experience for external visitors and an operational administrative portal for managing large-scale physical estate workflows.",
      solution: "Engineered a dual-purpose web platform featuring a heavily optimized, SEO-tuned Next.js frontend paired with an authenticated operational dashboard for internal team operations.",
      process: [
        "Crafted a bespoke Heritage-Modern aesthetic with custom glassmorphism and sub-second page transitions.",
        "Built responsive administrative workflows for estate scheduling, team coordination, and asset records.",
        "Enforced strict 98+ Lighthouse scores across performance, accessibility, best practices, and SEO."
      ],
      result: "Delivered on schedule with a 40% increase in verified digital customer inquiries and a dramatic reduction in administrative coordination overhead."
    }
  ];

  const internalProducts = [
    {
      title: "LaunchLab",
      badge: "Live B2B Engine",
      description: "Our digital craftsmanship agency division delivering enterprise software, custom platforms, and high-performance websites across India.",
      href: "https://launchlab-swart.vercel.app",
      isExternal: true,
      icon: Globe
    },
    {
      title: "NextStep",
      badge: "AI Guidance Engine (Beta)",
      description: "Multilingual psychometric testing and cognitive career mapping system engineered specifically for Indian students.",
      href: "/products#nextstep",
      isExternal: false,
      icon: BookGrowthIcon
    },
    {
      title: "thiran.in",
      badge: "Official Portal",
      description: "Our corporate website built with Heritage-Modern visual identity, Turbopack, and accessible multilingual state management.",
      href: "/",
      isExternal: false,
      icon: Cpu
    }
  ];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#2B1420]/60 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. PAGE HEADER */}
        <header className="text-center mb-24">
          <ScrollReveal delay={0}>
            <SectionEyebrow className="mb-4">
              PROOF OF EXECUTION
            </SectionEyebrow>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-6">
              We don't just plan. <br />
              <span className="text-[#D4A54A] text-glow-gold">We ship.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#D4A54A]/30 bg-[#2B1420]/70 text-xs font-mono text-[#D4A54A] font-bold">
              <span>2 client projects delivered. 0 excuses.</span>
            </div>
            <p className="font-body text-[#B8A9A0] text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
              We don't deal in hypothetical concepts. Here is concrete proof of delivered software, institutional partnerships, and measured outcomes.
            </p>
          </ScrollReveal>
        </header>

        {/* 2. FEATURED CASE STUDIES (FULL WIDTH ALTERNATING LAYOUT) */}
        <section className="space-y-32 mb-32">
          {cases.map((study, idx) => (
            <div 
              key={study.id}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}
            >
              {/* Device Frame / Screenshot Side */}
              <div className="w-full lg:w-1/2">
                <ScrollReveal delay={0.1}>
                  <div className="rounded-2xl p-2 sm:p-3 bg-[#2B1420]/80 border border-[#D4A54A]/30 shadow-2xl relative overflow-hidden group">
                    {/* Browser Chrome Header */}
                    <div className="w-full h-8 bg-[#1A1425] rounded-t-xl px-4 flex items-center justify-between border-b border-white/5 mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#C1440E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D4A54A]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#7A9B76]" />
                      </div>
                      <div className="text-[10px] font-mono text-gray-400 bg-white/5 px-4 py-0.5 rounded-full">
                        {study.id}.thiran.in
                      </div>
                      <div className="w-8" />
                    </div>

                    {/* Screenshot Preview */}
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[#111] flex items-center justify-center">
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1425] via-transparent to-transparent opacity-60" />
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Structured Story Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <ScrollReveal delay={0.2}>
                  <div>
                    <span className="text-[#D4A54A] font-mono font-bold text-xs tracking-widest uppercase block mb-1">
                      {study.client} • {study.tagline}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase tracking-tight">
                      {study.title}
                    </h2>
                  </div>
                </ScrollReveal>

                {/* Structured Breakdown Blocks with Kolam-line mini dividers */}
                <div className="space-y-4 pt-2">
                  <ScrollReveal delay={0.25}>
                    <div className="p-4 rounded-xl border border-white/5 bg-[#2B1420]/30">
                      <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-[#C1440E] mb-1.5 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C1440E] mr-2" />
                        The Problem
                      </h4>
                      <p className="text-sm font-body text-[#B8A9A0] leading-relaxed">
                        {study.problem}
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3}>
                    <div className="p-4 rounded-xl border border-[#D4A54A]/20 bg-[#2B1420]/40">
                      <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-[#D4A54A] mb-1.5 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A54A] mr-2" />
                        The Solution
                      </h4>
                      <p className="text-sm font-body text-gray-200 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.35}>
                    <div className="p-4 rounded-xl border border-white/5 bg-[#2B1420]/30">
                      <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-gray-300 mb-2 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2" />
                        Process & Decisions
                      </h4>
                      <ul className="space-y-1.5">
                        {study.process.map((step, sIdx) => (
                          <li key={sIdx} className="text-xs font-body text-[#B8A9A0] flex items-start">
                            <span className="text-[#D4A54A] mr-2">›</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.4}>
                    <div className="p-4 rounded-xl border border-[#7A9B76]/30 bg-[#7A9B76]/10">
                      <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-[#7A9B76] mb-1.5 flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-[#7A9B76]" />
                        The Measured Result
                      </h4>
                      <p className="text-sm font-body text-gray-100 font-medium leading-relaxed">
                        {study.result}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 3. "BEYOND CLIENT WORK" SECTION — INTERNAL PRODUCTS PROOF */}
        <section className="mb-28">
          <div className="text-center mb-12">
            <SectionEyebrow className="mb-3">
              INTERNAL INITIATIVES
            </SectionEyebrow>
            <h2 className="text-2xl sm:text-4xl font-black font-heading text-white uppercase tracking-tight mb-3">
              And the products we built for ourselves
            </h2>
            <p className="text-[#B8A9A0] text-sm max-w-lg mx-auto">
              The exact same engineering standards apply to our internal ventures and community platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {internalProducts.map((prod, idx) => {
              const IconComp = prod.icon;
              return (
                <ScrollReveal key={prod.title} delay={idx * 0.1}>
                  <GlassCard variant="default" className="p-6 h-full flex flex-col justify-between group border-[#D4A54A]/20">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#D4A54A]/10 border border-[#D4A54A]/30 flex items-center justify-center text-[#D4A54A]">
                          <IconComp className="w-5 h-5" color="#D4A54A" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4A54A] bg-[#D4A54A]/10 px-2.5 py-1 rounded-full border border-[#D4A54A]/25">
                          {prod.badge}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-bold text-white mb-2">
                        {prod.title}
                      </h3>
                      <p className="font-body text-xs text-[#B8A9A0] leading-relaxed mb-6">
                        {prod.description}
                      </p>
                    </div>

                    <div>
                      {prod.isExternal ? (
                        <a
                          href={prod.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-heading font-bold text-[#D4A54A] hover:text-white transition-colors"
                        >
                          <span>Visit Platform</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                        </a>
                      ) : (
                        <Link
                          href={prod.href}
                          className="inline-flex items-center text-xs font-heading font-bold text-[#D4A54A] hover:text-white transition-colors"
                        >
                          <span>Explore Details</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Link>
                      )}
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* 4. TRUST STRIP */}
        <div className="mb-24">
          <TrustedBy />
        </div>

        {/* 5. CLOSING CTA */}
        <section className="text-center max-w-3xl mx-auto glass-panel p-10 md:p-14 border-[#D4A54A]/30 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A54A]/5 rounded-full blur-3xl pointer-events-none" />
          
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase tracking-tight mb-4">
              Want to Build With Us?
            </h2>
            <p className="text-[#B8A9A0] text-sm leading-relaxed mb-8 max-w-lg mx-auto">
              Whether you are an educational institution seeking student systems or an enterprise looking for high-velocity software delivery, our LaunchLab team is ready to ship.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton href="/contact" variant="primary">
                Start a Conversation →
              </CTAButton>
              <CTAButton href="/careers" variant="secondary">
                Join as a Builder
              </CTAButton>
            </div>
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
}
