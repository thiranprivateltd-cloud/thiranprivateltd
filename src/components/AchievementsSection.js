'use client';

import { motion } from 'framer-motion';
import { 
  Building2, 
  Calendar, 
  Users, 
  Rocket, 
  Globe, 
  Sparkles, 
  Briefcase, 
  FileText, 
  FileCheck, 
  Languages, 
  Star, 
  ShieldCheck, 
  Coins, 
  Award,
  Zap
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function AchievementsSection() {
  const categories = [
    {
      title: "Company",
      emoji: "🏢",
      items: [
        { label: "Founded", value: "6 Mar 2026", subtext: "Dorm room vision", icon: Calendar },
        { label: "Entity Status", value: "Incorporated", subtext: "Private Limited", icon: Building2 },
        { label: "Team Size", value: "19 Believers", subtext: "Engineers & Builders", icon: Users },
      ]
    },
    {
      title: "Products",
      emoji: "🌐",
      items: [
        { label: "LaunchLab", value: "Live B2B Engine", subtext: "Lighthouse 98+", icon: Rocket },
        { label: "thiran.in", value: "Official Portal", subtext: "Heritage-Modern UI", icon: Globe },
        { label: "NextStep", value: "AI Guidance Engine", subtext: "Active Beta", icon: Sparkles },
      ]
    },
    {
      title: "Work",
      emoji: "💼",
      items: [
        { label: "Client Delivery", value: "2 Enterprise Projects", subtext: "100% On-Time", icon: Briefcase },
        { label: "Impact", value: "Vel Tech & Brundavanam", subtext: "Proven Execution", icon: Award },
      ]
    },
    {
      title: "Operations",
      emoji: "📋",
      items: [
        { label: "Circulars", value: "5 Issued", subtext: "Internal Governance", icon: FileText },
        { label: "Docs Published", value: "10 Public Assets", subtext: "Transparency First", icon: FileCheck },
      ]
    },
    {
      title: "Brand",
      emoji: "🌍",
      items: [
        { label: "Languages", value: "3 Supported", subtext: "EN · தமிழ் · हिन्दी", icon: Languages },
        { label: "Social Reach", value: "4 Active Channels", subtext: "Community Driven", icon: Star },
      ]
    },
    {
      title: "Vision",
      emoji: "🎯",
      items: [
        { label: "Mission", value: "Global No. 1", subtext: "Education for India", icon: ShieldCheck },
        { label: "Capital", value: "100% Bootstrapped", subtext: "Sustainable Growth", icon: Coins },
      ]
    }
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#D4A54A]/30 bg-[#D4A54A]/10 text-[10px] font-heading font-bold uppercase tracking-widest text-[#D4A54A] mb-3">
          <span>Verified Milestones</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight mb-4">
          Built on Proven Execution
        </h2>
        <p className="text-[#B8A9A0] max-w-2xl mx-auto text-sm sm:text-base">
          Every number is real. Every milestone was earned through disciplined engineering and community commitment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <GlassCard key={idx} variant="default" className="p-6">
            <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-white/5">
              <span className="text-lg">{cat.emoji}</span>
              <h3 className="font-heading font-bold text-base text-[#D4A54A] uppercase tracking-wide">
                {cat.title}
              </h3>
            </div>
            <div className="space-y-4">
              {cat.items.map((item, itemIdx) => {
                const IconComponent = item.icon;
                return (
                  <div key={itemIdx} className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-[#D4A54A]/10 border border-[#D4A54A]/25 flex items-center justify-center text-[#D4A54A] flex-shrink-0 mt-0.5">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white font-heading">{item.value}</div>
                        <div className="text-[11px] text-[#B8A9A0]">{item.subtext}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase font-mono">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
