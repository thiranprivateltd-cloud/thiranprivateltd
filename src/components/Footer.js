'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { MessageSquare, ArrowUpRight, ChevronDown, Mail, ArrowRight, Shield, Globe, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useIndependenceDay } from '@/components/independence-day/IndependenceDayProvider';
import TricolorBar from '@/components/independence-day/TricolorBar';

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const portalLinks = [
    { name: 'Thiran Intrasphere', href: 'https://intrasphere-thiran.vercel.app/' },
    { name: 'Thiran SmartHub', href: 'https://thiran-attendance-pl3v.vercel.app/' },
  ];

  const companyLinks = [
    { name: t('nav.home'), href: '/' },
    { name: 'Story', href: '/story' },
    { name: 'Work & Cases', href: '/work' },
    { name: t('nav.team'), href: '/team' },
    { name: 'Investors', href: '/investors' },
    { name: t('nav.careers'), href: '/careers' },
    { name: 'Press & Media', href: '/press' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const ecosystemProducts = [
    { name: "NextStep AI Engine", href: "/products#nextstep" },
    { name: "Thiran LaunchLab", href: "https://launchlab-swart.vercel.app" },
    { name: "Grievance360 Platform", href: "/work" },
    { name: "Brundavanam Portal", href: "/work" }
  ];

  return (
    <footer className="relative bg-[#060606] border-t border-white/10 pt-20 pb-8 overflow-hidden">
      {/* Background Orbs & Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-teal-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Massive Background Typography Watermark */}
      <div className="absolute bottom-[-2vw] left-1/2 -translate-x-1/2 text-[18vw] font-black font-heading text-white/[0.015] uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
        THIRAN
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP CALLOUT: Newsletter / Waitlist Glass Box */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl mb-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/10 text-teal-400 text-[10px] font-heading font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>Stay Updated</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black font-heading text-white uppercase tracking-tight">
              Join the Thiran Intelligence Network
            </h3>
            <p className="text-gray-400 text-xs md:text-sm">
              Get monthly updates on product deployments, career insights, and investment announcements.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-heading font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 cursor-pointer"
            >
              <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Column (Spans 2 cols on LG) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <Image 
                src="/logo-full.png" 
                alt="Thiran Logo" 
                width={180} 
                height={45} 
                className="object-contain h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            <p className="text-gray-400 font-body text-xs md:text-sm leading-relaxed max-w-sm">
              Thiran Private Ltd is an Indian technology & education ecosystem building AI guidance engines (NextStep) and enterprise software platforms (LaunchLab). Headquartered in Chennai, Tamil Nadu.
            </p>

            {/* Headquarters details */}
            <div className="text-xs text-gray-500 space-y-1 font-mono">
              <p>📍 HQ: Chennai, Tamil Nadu, India</p>
              <p>🌱 Origin: Erode, Tamil Nadu</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://youtube.com/@codewithgsv?si=rOLkfx6fwxc45bS4"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all hover:scale-110"
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
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/30 transition-all hover:scale-110"
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
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-green-500 hover:bg-green-500/10 hover:border-green-500/30 transition-all hover:scale-110"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/varshithgs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all hover:scale-110"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Ecosystem Products */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-teal-400 mb-6">
              Ecosystem
            </h4>
            <ul className="space-y-3 text-xs">
              {ecosystemProducts.map((prod) => (
                <li key={prod.name}>
                  {prod.href.startsWith('http') ? (
                    <a
                      href={prod.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <span>{prod.name}</span>
                      <ArrowUpRight className="w-3 h-3 ml-1 text-gray-600 group-hover:text-teal-400 transition-colors" />
                    </a>
                  ) : (
                    <Link href={prod.href} className="text-gray-400 hover:text-white transition-colors">
                      {prod.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-teal-400 mb-6">
              Company
            </h4>
            <ul className="space-y-3 text-xs">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Portals & Internal */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-teal-400 mb-6">
              Portals
            </h4>
            <ul className="space-y-3 text-xs">
              {portalLinks.map((portal) => (
                <li key={portal.href}>
                  <a
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>{portal.name}</span>
                    <ArrowUpRight className="w-3 h-3 ml-1 text-gray-600 group-hover:text-teal-400 transition-colors" />
                  </a>
                </li>
              ))}
              <li>
                <Link href="/portal" className="text-gray-400 hover:text-white transition-colors">
                  LaunchLab Client Portal
                </Link>
              </li>
            </ul>

            {/* Status indicator */}
            <div className="mt-8 pt-4 border-t border-white/5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-gray-500 text-[11px]">
              © {new Date().getFullYear()} Thiran Private Ltd. All rights reserved.
            </p>
            {isIndependenceDay && (
              <>
                <span className="hidden md:inline-block text-gray-700">|</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#FF9933]">
                  Jai Hind — Happy Independence Day 🇮🇳
                </span>
              </>
            )}
          </div>

          {/* Mantra */}
          <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-heading font-black tracking-widest text-gray-400 uppercase">
            <span>Dream</span>
            <span className="text-gray-600">•</span>
            <span>Build</span>
            <span className="text-gray-600">•</span>
            <span>Launch</span>
          </div>

          <div className="flex space-x-4 text-[11px] text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>

      {isIndependenceDay && <TricolorBar className="absolute bottom-0" />}
    </footer>
  );
}
