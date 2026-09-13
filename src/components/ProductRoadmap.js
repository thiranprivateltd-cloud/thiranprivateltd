'use client';
import { CheckCircle2, CircleDashed, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ProductRoadmap() {
  const roadmapItems = [
    {
      status: "live",
      title: "LaunchLab",
      desc: "Project Development Platform",
      icon: <CheckCircle2 className="w-5 h-5 text-[#D4A54A]" />
    },
    {
      status: "live",
      title: "thiran.in",
      desc: "Corporate Website Redesign",
      icon: <CheckCircle2 className="w-5 h-5 text-[#D4A54A]" />
    },
    {
      status: "building",
      title: "NextStep",
      desc: "AI Career Guidance Ecosystem",
      icon: <Loader2 className="w-5 h-5 text-[#D4A54A] animate-spin" />
    },
    {
      status: "planned",
      title: "Intrasphere v2",
      desc: "Internal Ops Dashboard",
      icon: <CircleDashed className="w-5 h-5 text-gray-500" />
    }
  ];

  return (
    <div className="glass-panel p-8 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <h3 className="text-xl font-bold text-white">Public Roadmap</h3>
          <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-[#D4A54A]">Live</span>
        </div>
        
        <div className="space-y-6">
          {roadmapItems.map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                  item.status === 'live' ? 'bg-[#D4A54A]/10 border-[#D4A54A]/35' :
                  item.status === 'building' ? 'bg-[#D4A54A]/15 border-[#D4A54A]/50' :
                  'bg-white/5 border-white/10'
                }`}>
                  {item.icon}
                </div>
                {index !== roadmapItems.length - 1 && (
                  <div className="w-px h-8 bg-white/10 my-2" />
                )}
              </div>
              
              <div className="pt-1">
                <h4 className={`font-bold ${
                  item.status === 'live' ? 'text-white' :
                  item.status === 'building' ? 'text-[#D4A54A]' :
                  'text-gray-500'
                }`}>{item.title}</h4>
                <p className="text-xs text-[#B8A9A0] mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5">
        <Link 
          href="/updates" 
          className="inline-flex items-center text-xs font-heading font-bold uppercase tracking-wider text-[#D4A54A] hover:text-white transition-colors group"
        >
          <span>See our full build log</span>
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
