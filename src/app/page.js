'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { ArrowRight, CheckCircle2, Activity, Users } from 'lucide-react';
import InvestorDashboard from '@/components/InvestorDashboard';
import AchievementsSection from '@/components/AchievementsSection';
import HeroParticles from '@/components/HeroParticles';
import CompanyTimeline from '@/components/CompanyTimeline';
import TrustedBy from '@/components/TrustedBy';
import ProductRoadmap from '@/components/ProductRoadmap';
import WaitlistCounter from '@/components/WaitlistCounter';
import { 
  JaliPattern, 
  KolamDivider, 
  BookGrowthIcon, 
  JaliGradCapIcon 
} from '@/components/HeritageMotifs';
import CTAButton from '@/components/CTAButton';
import SectionEyebrow from '@/components/SectionEyebrow';
import GlassCard from '@/components/GlassCard';
import AnimatedJali from '@/components/AnimatedJali';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-10 relative overflow-hidden bg-[#1A1425]">
      {/* Subtle Indigo-Maroon Radial Vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#2B1420]/60 rounded-[100%] blur-[140px] pointer-events-none -z-10" />

      {/* 1. HERO SECTION - TYPOGRAPHY FIRST WITH ANIMATED LIVING JALI */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Living Jali Lattice Animation behind Hero */}
        <AnimatedJali opacityMultiplier={1} nodeSpacing={44} className="z-0" />

        {/* Gold & Cream Particles */}
        <HeroParticles />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center z-10"
        >
          <SectionEyebrow className="mb-6">
            EDUCATION · TECHNOLOGY · HERITAGE-MODERN
          </SectionEyebrow>

          {/* Typography-First Headline */}
          <h1 
            className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] leading-[0.88] font-heading font-black text-white uppercase tracking-tighter mix-blend-difference mb-8 hover:tracking-normal transition-[letter-spacing] duration-700 ease-in-out cursor-default"
          >
            Building India's <br/>
            <span className="text-[#D4A54A] text-glow-gold">Education Future</span>
          </h1>
          
          {/* Kolam-inspired divider line */}
          <div className="w-full max-w-xl my-4">
            <KolamDivider />
          </div>
          
          {/* Minimal Supporting Copy & Tagline */}
          <p className="text-[#B8A9A0] font-body text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] font-bold mb-10">
            Dream <span className="mx-2 text-[#D4A54A]">•</span> Build <span className="mx-2 text-[#D4A54A]">•</span> Launch
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center">
            <CTAButton href="/products#nextstep" variant="primary">
              Explore Products
            </CTAButton>
            <CTAButton href="/story" variant="secondary">
              Our Story
            </CTAButton>
          </div>
        </motion.div>
      </section>

      {/* 1.5 TRUST STRIP */}
      <TrustedBy />

      {/* 2. INVESTOR DASHBOARD */}
      <InvestorDashboard />

      {/* 2.2 MANIFESTO / VISION QUOTE WITH KOLAM DIVIDERS */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <KolamDivider />
        <div className="py-6">
          <blockquote className="text-xl md:text-2xl font-serif text-[#FDFBF7] italic leading-relaxed max-w-2xl mx-auto mb-4">
            "{t('home.visionQuote')}"
          </blockquote>
          <p className="text-xs uppercase tracking-widest font-heading font-bold text-[#D4A54A]">
            {t('home.visionAuthor')}
          </p>
          <p className="text-xs text-[#B8A9A0] mt-2 font-body">
            {t('home.visionSubtext')}
          </p>
        </div>
        <KolamDivider />
      </section>

      {/* 2.5 ACHIEVEMENTS SECTION */}
      <AchievementsSection />

      {/* 3. COMPANY TIMELINE */}
      <CompanyTimeline />

      {/* 4. PRODUCT SHOWCASE - BENTO BOX STYLE WITH HERITAGE TOKENS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-16">
          <SectionEyebrow className="mb-3">
            ECOSYSTEM ARCHITECTURE
          </SectionEyebrow>
          <h2 className="text-3xl font-bold text-white mb-3">{t('home.ecosystemTitle')}</h2>
          <p className="text-[#B8A9A0] max-w-2xl text-sm leading-relaxed">
            {t('home.ecosystemSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* NextStep Core Showcase */}
          <div className="col-span-1 md:col-span-8 glass-panel p-8 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4">
                <BookGrowthIcon className="w-6 h-6" color="#D4A54A" />
                <h3 className="text-xl font-bold text-white">{t('home.nextstepTitle')}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#D4A54A]/10 text-[#D4A54A] uppercase tracking-wider border border-[#D4A54A]/30">
                  {t('home.activeBeta')}
                </span>
              </div>
              <p className="text-[#B8A9A0] text-sm leading-relaxed max-w-md mb-8">
                {t('home.nextstepDesc')}
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A54A] mr-2 mt-0.5 flex-shrink-0" />
                  <span>{t('home.multilingualDiagnostics')}</span>
                </li>
                <li className="flex items-start text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A54A] mr-2 mt-0.5 flex-shrink-0" />
                  <span>{t('home.realTimeAnalysis')}</span>
                </li>
                <li className="flex items-start text-sm text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A54A] mr-2 mt-0.5 flex-shrink-0" />
                  <span>{t('home.privacyArchitecture')}</span>
                </li>
              </ul>
              
              <div className="flex flex-col items-start space-y-4">
                <Link href="/products" className="inline-flex items-center text-sm font-semibold text-white hover:text-[#D4A54A] transition-colors">
                  {t('home.exploreNextStep')} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
                <WaitlistCounter />
              </div>
            </div>
            
            {/* UI Mockup Decorator with Warm Tones */}
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-[400px] h-[300px] bg-[#1A1425] border border-[#D4A54A]/20 rounded-tl-xl shadow-2xl p-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block">
              <div className="w-full h-8 border-b border-white/5 flex items-center space-x-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C1440E]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4A54A]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#7A9B76]/80" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-1/3 bg-[#D4A54A]/20 rounded" />
                <div className="h-2 w-full bg-white/5 rounded" />
                <div className="h-2 w-5/6 bg-white/5 rounded" />
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="h-20 bg-white/5 rounded border border-[#D4A54A]/10" />
                  <div className="h-20 bg-white/5 rounded border border-[#D4A54A]/10" />
                </div>
              </div>
            </div>
          </div>

          {/* LaunchLab */}
          <div className="col-span-1 md:col-span-4 glass-panel p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <JaliGradCapIcon className="w-5 h-5" color="#D4A54A" />
                <h3 className="text-xl font-bold text-white">{t('home.launchlabTitle')}</h3>
              </div>
              <p className="text-[#B8A9A0] text-sm leading-relaxed mb-6">
                {t('home.launchlabDescription')}
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>{t('home.avgLighthouseScore')}</span>
                  <span className="text-[#7A9B76] font-bold">98+</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#7A9B76] w-[98%]" />
                </div>
              </div>
            </div>
            <Link href="/products" className="inline-flex items-center text-sm font-semibold text-white hover:text-[#D4A54A] transition-colors">
              {t('home.viewCaseStudies')} <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Infrastructure Metrics */}
          <div className="col-span-1 md:col-span-4 glass-panel p-8">
            <Activity className="w-5 h-5 text-[#D4A54A] mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">{t('home.technicalRigorTitle')}</h3>
            <p className="text-[#B8A9A0] text-sm leading-relaxed mb-6">
              {t('home.technicalRigorBody')}
            </p>
          </div>

          {/* Product Roadmap */}
          <div className="col-span-1 md:col-span-4">
            <ProductRoadmap />
          </div>

          {/* Team Metric */}
          <div className="col-span-1 md:col-span-4 glass-panel p-8 flex flex-col justify-between">
            <div className="max-w-md">
              <h3 className="text-lg font-bold text-white mb-2">{t('home.teamTitle')}</h3>
              <p className="text-[#B8A9A0] text-sm leading-relaxed mb-4">
                {t('home.teamDescription')}
              </p>
              <Link href="/team" className="inline-flex items-center text-sm font-semibold text-white hover:text-[#D4A54A] transition-colors">
                {t('home.meetTeam')} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/5 border border-[#D4A54A]/20" />
              ))}
              <div className="w-8 h-8 rounded-full bg-[#D4A54A]/20 border border-[#D4A54A]/40 flex items-center justify-center text-[10px] font-bold text-[#D4A54A]">+13</div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
