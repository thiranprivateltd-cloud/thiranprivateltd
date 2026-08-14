// INDEPENDENCE DAY THEME — ACTIVE: AUG 15 ONLY
import React from 'react';

export default function IndependenceDayBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-[#FF9933]/20 via-white/10 to-[#138808]/20 border-b border-white/10 py-3 px-4 text-center z-40 relative backdrop-blur-md">
      <p className="text-sm md:text-base font-bold flex items-center justify-center space-x-2">
        <span className="animate-wave-flag inline-block text-lg">🇮🇳</span>
        <span>
          Celebrating India's Independence Day — Building the future of Indian Education — from Chennai
        </span>
        <span className="animate-wave-flag inline-block text-lg">🇮🇳</span>
      </p>
    </div>
  );
}
