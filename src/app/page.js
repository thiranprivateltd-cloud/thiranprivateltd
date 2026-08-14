'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { ArrowRight, BookOpen, Layers, CheckCircle2, Shield, Activity, Users, Globe2, Code2, Zap } from 'lucide-react';
import { useIndependenceDay } from '@/components/independence-day/IndependenceDayProvider';
import IndependenceDayBanner from '@/components/independence-day/IndependenceDayBanner';
import IndependenceDaySection from '@/components/independence-day/IndependenceDaySection';

export default function Home() {
  const { t } = useTranslation();
  const isIndependenceDay = useIndependenceDay();

  return (
    <div className="min-h-screen py-10 relative overflow-hidden bg-[#0A0A0A]">
      {/* Refined subtle gradients instead of heavy neon */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--theme-primary)]/10 rounded-[100%] blur-[120px] pointer-events-none -z-10" />

      {isIndependenceDay && <IndependenceDayBanner />}

      {/* 1. HERO SECTION - EXECUTION FOCUSED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pt-16 md:pb-24 flex flex-col items-center text-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold tracking-wide text-gray-300 mb-8 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>{t('home.status')}</span>
          <ArrowRight className="w-3 h-3 ml-1 text-gray-500" />
        </motion.div>

        {/* Concrete Value Proposition */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mb-6"
        >
                    {t('home.heroHeading')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">{t('home.heroTitle')}</span> {t('home.heroTrail')}
        </motion.h1>

        {/* Realistic Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
        >
          {t('home.heroSubtext')}
        </motion.p>

        {/* Action-Oriented CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
        >
          <Link
            href="/products#nextstep"
            className="px-6 py-3 rounded-lg bg-white text-black hover:bg-gray-100 font-semibold text-sm transition-all flex items-center justify-center space-x-2"
          >
                        <span>{t('home.viewDemo')}</span>
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] text-white border border-white/10 font-semibold text-sm transition-all flex items-center justify-center space-x-2"
          >
                        <Layers className="w-4 h-4" />
            <span>{t('home.readCaseStudies')}</span>
          </Link>
        </motion.div>
      </section>

      {/* 2. REALISTIC TRUST METRICS */}
      <section className="border-y border-white/5 bg-[#0D0D0D] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {isIndependenceDay ? (
              <>
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <span className="text-3xl font-bold text-white mb-1">79 Years</span>
                  <span className="text-xs text-[#FF9933] font-medium uppercase tracking-wider">of Freedom 🇮🇳</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <span className="text-3xl font-bold text-white mb-1">1.4 Billion</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Indians We Build For</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <span className="text-3xl font-bold text-white mb-1">3</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Indian Languages Supported</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <span className="text-3xl font-bold text-white mb-1">1 Dream</span>
                  <span className="text-xs text-[#138808] font-medium uppercase tracking-wider">Education for All</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white mb-1">500+</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{t('home.waitlistLabel')}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white mb-1">9.9/10</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{t('home.launchlabRatingLabel')}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white mb-1">{t('home.supportedLanguagesCount')}</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{t('home.supportedLanguagesLabel')}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white mb-1">100%</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{t('home.bootstrappedLabel')}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

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
          <div className="col-span-1 md:col-span-8 bg-[#111111] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors flex flex-col justify-between overflow-hidden relative group">
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
              
              <Link href="/products" className="inline-flex items-center text-sm font-semibold text-white hover:text-accent transition-colors">
                {t('home.exploreNextStep')} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
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
          <div className="col-span-1 md:col-span-4 bg-[#111111] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors flex flex-col">
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
          <div className="col-span-1 md:col-span-4 bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors">
            <Activity className="w-5 h-5 text-gray-400 mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2">{t('home.technicalRigorTitle')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('home.technicalRigorBody')}
            </p>
          </div>

          {/* Team Metric */}
          <div className="col-span-1 md:col-span-8 bg-gradient-to-r from-[#111111] to-[#1A1A1A] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors flex items-center justify-between">
            <div className="max-w-md">
              <h3 className="text-lg font-bold text-white mb-2">{t('home.teamTitle')}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {t('home.teamDescription')}
              </p>
              <Link href="/team" className="inline-flex items-center text-sm font-semibold text-white transition-colors">
                {t('home.meetTeam')} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="hidden sm:flex flex-wrap gap-2 justify-end w-48">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* 4. EXECUTION TIMELINE */}
      <section className="border-t border-white/5 bg-[#0A0A0A] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">{t('home.roadmapTitle')}</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              {t('home.roadmapSubtitle')}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#111111] text-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111111] p-5 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-base">{t('home.foundationTitle')}</h3>
                  <span className="text-xs font-medium text-accent">{t('home.foundationDate')}</span>
                </div>
                <p className="text-sm text-gray-400">{t('home.foundationDesc')}</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#111111] text-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111111] p-5 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-base">{t('home.launchlabDeployedTitle')}</h3>
                  <span className="text-xs font-medium text-accent">{t('home.launchlabDeployedDate')}</span>
                </div>
                <p className="text-sm text-gray-400">{t('home.launchlabDeployedDesc')}</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#111111] text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <Zap className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111111] p-5 rounded-xl border border-white/5 border-l-4 border-l-accent">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-base">{t('home.nextstepMVPTitle')}</h3>
                  <span className="text-xs font-medium text-gray-500">{t('home.nextstepMVPStatus')}</span>
                </div>
                <p className="text-sm text-gray-400">{t('home.nextstepMVPDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
