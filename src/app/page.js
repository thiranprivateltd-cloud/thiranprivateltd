'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { ArrowRight, BookOpen, Layers, CheckCircle2, Shield, Activity, Users, Globe2, Code2, Zap } from 'lucide-react';
import { useIndependenceDay } from '@/components/independence-day/IndependenceDayProvider';
import IndependenceDayBanner from '@/components/independence-day/IndependenceDayBanner';
import IndependenceDaySection from '@/components/independence-day/IndependenceDaySection';
import InvestorDashboard from '@/components/InvestorDashboard';
import AchievementsSection from '@/components/AchievementsSection';
import HeroParticles from '@/components/HeroParticles';
import CompanyTimeline from '@/components/CompanyTimeline';
import TrustedBy from '@/components/TrustedBy';
import ProductRoadmap from '@/components/ProductRoadmap';
import WaitlistCounter from '@/components/WaitlistCounter';

export default function Home() {
  const { t } = useTranslation();
  const isIndependenceDay = useIndependenceDay();

  return (
    <div className="min-h-screen py-10 relative overflow-hidden bg-[#0A0A0A]">
      {/* Refined subtle gradients instead of heavy neon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--theme-primary)]/10 rounded-[100%] blur-[120px] pointer-events-none -z-10" />

      {isIndependenceDay && <IndependenceDayBanner />}

      {/* 1. HERO SECTION - TYPOGRAPHY FIRST */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden">
        <HeroParticles />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center z-10"
        >
          {/* Typography-First Headline */}
          <h1 
            className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] font-heading font-black text-white uppercase tracking-tighter mix-blend-difference mb-8 hover:tracking-normal transition-[letter-spacing] duration-700 ease-in-out cursor-default"
          >
            Building India's <br/> Education Future
          </h1>
          
          <div className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />
          
          {/* Minimal Supporting Copy & Tagline */}
          <p className="text-gray-400 font-body text-sm md:text-base uppercase tracking-[0.3em] font-bold mb-10">
            Dream <span className="mx-2 text-gray-600">•</span> Build <span className="mx-2 text-gray-600">•</span> Launch
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center">
            <Link
              href="/products#nextstep"
              className="px-8 py-4 rounded-full bg-white text-black hover:bg-gray-200 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-105"
            >
              Explore Products
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-full bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest transition-all hover:border-white/50"
            >
              Our Story
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 1.5 TRUST STRIP */}
      <TrustedBy />

      {/* 2. INVESTOR DASHBOARD */}
      <InvestorDashboard />

      {/* 2.5 ACHIEVEMENTS SECTION */}
      <AchievementsSection />

      {/* 3. COMPANY TIMELINE */}
      <CompanyTimeline />

      {/* Independence Day Section */}
      {isIndependenceDay && <IndependenceDaySection />}

      {/* 3. PRODUCT SHOWCASE - BENTO BOX STYLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">{t('home.ecosystemTitle')}</h2>
          <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
            {t('home.ecosystemSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* NextStep Core Showcase */}
          <div className="col-span-1 md:col-span-8 glass-panel p-8 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4">
                                <BookOpen className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-bold text-white">{t('home.nextstepTitle')}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-accent/10 text-accent uppercase tracking-wider border border-accent/20">{t('home.activeBeta')}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-8">
                {t('home.nextstepDesc')}
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                  <span>                  {t('home.multilingualDiagnostics')}</span>
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                  <span>                  {t('home.realTimeAnalysis')}</span>
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                  <span>                  {t('home.privacyArchitecture')}</span>
                </li>
              </ul>
              
              <div className="flex flex-col items-start">
                <Link href="/products" className="inline-flex items-center text-sm font-semibold text-white hover:text-accent transition-colors">
                  {t('home.exploreNextStep')} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <WaitlistCounter />
              </div>
            </div>
            
            {/* UI Mockup Decorator */}
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-[400px] h-[300px] bg-[#1A1A1A] border border-white/10 rounded-tl-xl shadow-2xl p-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block">
              <div className="w-full h-8 border-b border-white/5 flex items-center space-x-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-1/3 bg-white/5 rounded" />
                <div className="h-2 w-full bg-white/5 rounded" />
                <div className="h-2 w-5/6 bg-white/5 rounded" />
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="h-20 bg-white/5 rounded" />
                  <div className="h-20 bg-white/5 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* LaunchLab */}
          <div className="col-span-1 md:col-span-4 glass-panel p-8 flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold text-white">{t('home.launchlabTitle')}</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                              {t('home.launchlabDescription')}
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{t('home.avgLighthouseScore')}</span>
                <span className="text-green-400 font-semibold">98+</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-[98%]" />
              </div>
            </div>
            <Link href="/products" className="inline-flex items-center text-sm font-semibold text-white hover:text-blue-400 transition-colors">
              {t('home.viewCaseStudies')} <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Infrastructure Metrics */}
          <div className="col-span-1 md:col-span-4 glass-panel p-8">
            <Activity className="w-5 h-5 text-gray-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">{t('home.technicalRigorTitle')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
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
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {t('home.teamDescription')}
              </p>
              <Link href="/team" className="inline-flex items-center text-sm font-semibold text-white transition-colors">
                {t('home.meetTeam')} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
              ))}
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">+13</div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
