'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { MessageSquare, ArrowUpRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useIndependenceDay } from '@/components/independence-day/IndependenceDayProvider';
import TricolorBar from '@/components/independence-day/TricolorBar';

export default function Footer() {
  const { t } = useTranslation();
  const [portalOpen, setPortalOpen] = useState(false);
  const portalRef = useRef(null);
  const isIndependenceDay = useIndependenceDay();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (portalRef.current && !portalRef.current.contains(e.target)) {
        setPortalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const portalLinks = [
    { name: 'Thiran Intrasphere', href: 'https://intrasphere-thiran.vercel.app/' },
    { name: 'Thiran SmartHub', href: 'https://thiran-attendance-pl3v.vercel.app/' },
  ];

  const quickLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.team'), href: '/team' },
    { name: t('nav.careers'), href: '/careers' },
    { name: t('nav.investors'), href: '/investors' },
    { name: t('nav.contact'), href: '/contact' },
  ];


  const products = [
    { name: "Thiran LaunchLab", href: "https://launchlab-swart.vercel.app" },
    { name: "NextStep", href: "/products#nextstep" }
  ];

  return (
    <footer className="relative bg-[#070707] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Company Column */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center group">
              <Image 
                src="/logo-full.png" 
                alt="Thiran Logo" 
                width={160} 
                height={40} 
                className="object-contain h-10 w-auto"
              />
            </Link>

            <p className="text-gray-400 font-body text-xs md:text-sm leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://youtube.com/@codewithgsv?si=rOLkfx6fwxc45bS4"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all hover:scale-105 ${
                  isIndependenceDay 
                    ? "hover:bg-[#FF9933]/10 text-gray-400 hover:text-[#FF9933]" 
                    : "hover:bg-red-600/10 text-gray-400 hover:text-red-500"
                }`}
                title="Code with GSV YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/thiran_groups?igsh=Y28wd252azMzZDc1"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all hover:scale-105 ${
                  isIndependenceDay
                    ? "hover:bg-[#138808]/10 text-gray-400 hover:text-[#138808]"
                    : "hover:bg-pink-600/10 text-gray-400 hover:text-pink-500"
                }`}
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/918056547565"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all hover:scale-105 ${
                  isIndependenceDay
                    ? "hover:bg-[#138808]/10 text-gray-400 hover:text-[#138808]"
                    : "hover:bg-green-600/10 text-gray-400 hover:text-green-500"
                }`}
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-white mb-6">
              {t('footer.quickLinks')}
            </h4>
                        <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent font-body text-xs md:text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {/* Portal dropdown */}
              <li ref={portalRef} className="relative">
                <button
                  type="button"
                  onClick={() => setPortalOpen(!portalOpen)}
                  className="flex items-center text-gray-400 hover:text-accent font-body text-xs md:text-sm transition-colors focus:outline-none"
                >
                  {t('nav.portal')}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </button>
                {portalOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-[#0A0A0A] border border-white/10 rounded-lg shadow-lg z-20">
                    {portalLinks.map((p) => (
                      <li key={p.href}>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-gray-400 hover:text-accent hover:bg-white/5 text-xs"
                        >
                          {p.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-white mb-6">
              {t('footer.products')}
            </h4>
            <ul className="space-y-3">
              {products.map((prod) => (
                <li key={prod.name}>
                  {prod.href.startsWith('http') ? (
                    <a
                      href={prod.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-accent font-body text-xs md:text-sm flex items-center group transition-colors"
                    >
                      <span>{prod.name}</span>
                      <ArrowUpRight className="w-3 h-3 ml-1 text-gray-600 group-hover:text-accent transition-colors" />
                    </a>
                  ) : (
                    <Link
                      href={prod.href}
                      className="text-gray-400 hover:text-accent font-body text-xs md:text-sm transition-colors"
                    >
                      {prod.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pb-4">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-gray-500 font-body text-[10px] uppercase tracking-wider text-center md:text-left">
              {t('footer.rights')}
            </p>
            {isIndependenceDay && (
              <>
                <span className="hidden md:inline-block text-gray-700">|</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#FF9933]">
                  Jai Hind — Happy Independence Day 🇮🇳
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-bold text-gray-300">
                  Proudly Made in India
                </span>
              </>
            )}
          </div>

          {/* Brand Mantra */}
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/[0.01] text-[10px] tracking-widest text-gray-400 font-semibold uppercase">
            <span>Dream</span>
            <span className="text-gray-600">•</span>
            <span>Build</span>
            <span className="text-gray-600">•</span>
            <span>Launch</span>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ml-0.5 ${isIndependenceDay ? 'bg-[#FF9933]' : 'bg-red-600'}`} />
          </div>

          <div className="flex space-x-4">
            <Link href="/privacy" className="text-gray-500 hover:text-white font-body text-[10px] uppercase tracking-wider transition-colors">
              {t('footer.privacy')}
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/terms" className="text-gray-500 hover:text-white font-body text-[10px] uppercase tracking-wider transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
      
      {isIndependenceDay && <TricolorBar className="absolute bottom-0" />}
    </footer>
  );
}
