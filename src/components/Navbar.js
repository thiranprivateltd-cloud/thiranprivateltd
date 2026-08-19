'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { useIndependenceDay } from '@/components/independence-day/IndependenceDayProvider';
import TricolorBar from '@/components/independence-day/TricolorBar';

export default function Navbar() {
  const { language, setLanguage, t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isIndependenceDay = useIndependenceDay();

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: 'Story', href: '/story' },
    { name: 'Work', href: '/work' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.team'), href: '/team' },
    { name: t('nav.careers'), href: '/careers' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="sticky top-0 z-40 w-full glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image 
              src="/logo-full.png" 
              alt="Thiran Logo" 
              width={160} 
              height={40} 
              className="object-contain h-8 md:h-10 w-auto transition-transform group-hover:scale-105"
            />
            {isIndependenceDay && (
              <span className="text-2xl animate-wave-flag ml-2">🇮🇳</span>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors hover:text-white ${
                  isActive(link.href) ? 'text-accent' : 'text-gray-400'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Language Toggle & CTA (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-1 bg-white/[0.03] border border-white/10 rounded-full p-1">
              <Globe className="w-3.5 h-3.5 text-gray-500 ml-2 mr-1" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 text-[10px] font-heading font-bold rounded-full transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#1F3864] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-3">
              {isIndependenceDay && (
                <span className="hidden xl:inline-flex items-center text-[10px] font-bold text-[#FF9933] bg-[#FF9933]/10 px-2 py-1 rounded-full uppercase tracking-widest border border-[#FF9933]/20">
                  Happy Independence Day 🇮🇳
                </span>
              )}
              <Link
                href="/careers"
                className="px-5 py-2.5 rounded-full bg-[var(--theme-accent)] hover:opacity-90 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg shadow-accent/20 transition-all hover:scale-105"
              >
                {t('nav.join')}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            {/* Simple mobile language picker toggle */}
            <div className="flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-1">
              <button
                onClick={() => {
                  const nextIndex = (languages.findIndex(l => l.code === language) + 1) % languages.length;
                  setLanguage(languages[nextIndex].code);
                }}
                className="text-[10px] font-heading font-bold text-accent uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
              >
                <Globe className="w-3 h-3" />
                <span>{languages.find(l => l.code === language).label}</span>
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white p-1 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0D0D0D] border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-heading text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive(link.href)
                      ? 'bg-primary/20 text-accent border-l-4 border-accent'
                      : 'text-gray-400 hover:bg-white/[0.02] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-white/5 flex flex-col space-y-4 px-4">
                {/* Language Select inside Mobile Menu */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-body uppercase tracking-wider">Change Language</span>
                  <div className="flex space-x-1 bg-white/[0.03] border border-white/10 rounded-full p-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setMobileMenuOpen(false);
                        }}
                        className={`px-3 py-1 text-[10px] font-heading font-bold rounded-full transition-all cursor-pointer ${
                          language === lang.code
                            ? 'bg-[#1F3864] text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA */}
                <Link
                  href="/careers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3.5 rounded-xl bg-[#1D9E75] hover:bg-[#15805d] text-white font-heading font-bold text-xs uppercase tracking-widest shadow-lg transition-colors"
                >
                  {t('nav.join')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isIndependenceDay && <TricolorBar className="absolute bottom-0" />}
    </nav>
  );
}
