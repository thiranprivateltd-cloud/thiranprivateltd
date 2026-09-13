'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import SectionEyebrow from '@/components/SectionEyebrow';
import GlassCard from '@/components/GlassCard';
import CTAButton from '@/components/CTAButton';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedJali from '@/components/AnimatedJali';
import { 
  KolamDivider, 
  BookGrowthIcon, 
  JaliGradCapIcon, 
  PencilJourneyIcon, 
  GeometricChakra 
} from '@/components/HeritageMotifs';

export default function VisionPage() {
  const { t } = useTranslation();

  const missionPillars = [
    {
      id: "access",
      icon: BookGrowthIcon,
      title: "Universal Access",
      tagline: "Breaking linguistic & regional barriers",
      description: "Delivering career diagnostic models and cognitive assessments in native Indian languages (Tamil, Hindi, and English), reaching students beyond metro cities."
    },
    {
      id: "guidance",
      icon: JaliGradCapIcon,
      title: "Intelligent Guidance",
      tagline: "Data-driven, not opinion-driven",
      description: "Engineering psychometric frameworks and algorithmic career pathing that map genuine student cognitive strengths to modern, high-growth industries."
    },
    {
      id: "opportunity",
      icon: PencilJourneyIcon,
      title: "Real-World Execution",
      tagline: "Bridging degrees to builder capability",
      description: "Providing students with hands-on project creation environments through LaunchLab, transforming theoretical learning into deployable software craftsmanship."
    },
    {
      id: "transparency",
      icon: GeometricChakra,
      title: "Zero-Inflated Metrics",
      tagline: "Radical honesty & verified outcomes",
      description: "Operating with unyielding transparency. We publish real build logs, verified milestone counts, and live delivery timelines with zero artificial vanity stats."
    }
  ];

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#2B1420]/70 rounded-[100%] blur-[150px] pointer-events-none -z-10" />

      {/* 1. PAGE HEADER WITH FAINT LIVING JALI LATTICE */}
      <header className="relative w-full pt-6 pb-16 overflow-hidden">
        <AnimatedJali faint={true} opacityMultiplier={0.9} className="z-0" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal delay={0}>
            <SectionEyebrow className="mb-6">
              VISION & MISSION
            </SectionEyebrow>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tight leading-tight mb-6">
              Education for <span className="text-[#D4A54A] text-glow-gold">India</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-[#B8A9A0] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Why we exist at scale: our thesis on Indian education, cognitive diagnostics, and democratized career advisory for 1.4 billion dreams.
            </p>
          </ScrollReveal>
        </div>
      </header>

      {/* 2. VISION STATEMENT BLOCK — FULL WIDTH & GENEROUS WHITESPACE */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <KolamDivider />

        <div className="py-12 md:py-16 text-center">
          <ScrollReveal delay={0.1}>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4A54A] font-bold block mb-6">
              The North Star
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#FDFBF7] leading-relaxed max-w-4xl mx-auto">
              "A country where every student, regardless of their native language, background, or where they start, has an intelligent, clear path forward."
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="mt-8 text-xs font-heading font-bold uppercase tracking-widest text-[#B8A9A0]">
              — The Thiran Ecosystem Thesis
            </p>
          </ScrollReveal>
        </div>

        <KolamDivider />
      </section>

      {/* 3. MISSION PILLARS (4 CARDS GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <SectionEyebrow className="mb-3">
            STRATEGIC PILLARS
          </SectionEyebrow>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight mb-4">
            How We Execute the Mission
          </h2>
          <p className="text-[#B8A9A0] max-w-xl mx-auto text-sm">
            Four structural commitments that guide product development across LaunchLab and NextStep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {missionPillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <ScrollReveal key={pillar.id} delay={idx * 0.1}>
                <GlassCard 
                  variant="default" 
                  showMotif={idx === 0 || idx === 3}
                  className="p-8 md:p-10 border-[#D4A54A]/25 h-full flex flex-col justify-between group hover:border-[#D4A54A]/50 transition-all"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#D4A54A]/10 border border-[#D4A54A]/30 flex items-center justify-center text-[#D4A54A] mb-6 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" color="#D4A54A" />
                    </div>

                    <h3 className="font-heading text-2xl font-black text-white uppercase tracking-tight mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4A54A] mb-4">
                      {pillar.tagline}
                    </p>
                    <p className="font-body text-[#B8A9A0] text-sm md:text-base leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 4. "WHY NOW" / CONTEXT SECTION — WELL-SET BODY COPY WITH INLINE STAT */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <ScrollReveal>
          <div className="space-y-8 text-left md:text-justify">
            <div className="text-center md:text-left mb-6">
              <SectionEyebrow className="mb-3">
                SYSTEMIC PROBLEM
              </SectionEyebrow>
              <h2 className="text-3xl md:text-4xl font-black font-heading text-white uppercase tracking-tight">
                Why Education, Why Now?
              </h2>
            </div>

            <p className="text-base md:text-lg font-body text-[#FDFBF7] leading-relaxed">
              Every year across India, over <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#D4A54A]/15 border border-[#D4A54A]/35 text-[#D4A54A] font-mono font-bold text-sm md:text-base">35,000,000+ higher education students</span> enroll in degree programs with little to no individualized psychometric guidance. Millions choose the wrong course, graduate with theoretical knowledge disconnected from market reality, and find themselves without clear career agency.
            </p>

            <p className="text-sm md:text-base font-body text-[#B8A9A0] leading-relaxed">
              Existing career advisory solutions in India remain concentrated in Tier-1 private academies, expensive offline counselors, or English-only generic tests. Students in Tier-2 and Tier-3 cities—who represent the backbone of the country's youth dividend—are left behind by legacy tools.
            </p>

            <p className="text-sm md:text-base font-body text-[#B8A9A0] leading-relaxed">
              At Thiran, we believe that career guidance is an infrastructure problem, not a luxury service. By marrying regional accessibility with AI cognitive modeling, we are building platforms that empower young India to make smarter, self-directed decisions.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. CLOSING CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <KolamDivider className="mb-12" />

        <ScrollReveal>
          <div className="space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              See How We're Building This
            </h2>
            <p className="text-[#B8A9A0] text-sm max-w-md mx-auto">
              Inspect our production deployments, client deliverables, and live technology products.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <CTAButton href="/work" variant="primary">
                View Proof of Execution →
              </CTAButton>
              <CTAButton href="/products" variant="secondary">
                Explore Products
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
