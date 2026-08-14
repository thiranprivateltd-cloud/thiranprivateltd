// INDEPENDENCE DAY THEME — ACTIVE: AUG 15 ONLY
import React from 'react';

export default function IndependenceDaySection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#111b2d]/50 to-[#0A0A0A]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/5 via-transparent to-[#138808]/5 pointer-events-none" />
      
      {/* Subtle watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden select-none">
        <span className="text-[20vw] font-black font-heading whitespace-nowrap">JAI HIND</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-wider mb-6">
            Our Promise to India <span className="animate-wave-flag inline-block">🇮🇳</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            On this Independence Day, Thiran Private Ltd reaffirms its mission to transform education for every Indian student — regardless of their language, city, or background.
            <br className="hidden md:block" />
            <br className="hidden md:block" />
            <span className="text-[#FF9933] font-bold">From Chennai, we are building for Bharat.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl border-t-2 border-t-[#FF9933] bg-[#111b2d]/80 hover:bg-[#111b2d] transition-all">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#FF9933]"></span>
              <span>For Every Indian Student</span>
            </h3>
            <p className="text-gray-400">
              NextStep — career guidance built from the ground up, accessible in 3 Indian languages to ensure no student is left behind due to a language barrier.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl border-t-2 border-t-white bg-[#111b2d]/80 hover:bg-[#111b2d] transition-all">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span>Made in Tamil Nadu</span>
            </h3>
            <p className="text-gray-400">
              Built by Indian students, for Indian students. A grassroots movement starting in Chennai and aiming to create a global standard in education.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl border-t-2 border-t-[#138808] bg-[#111b2d]/80 hover:bg-[#111b2d] transition-all">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#138808]"></span>
              <span>Our Commitment</span>
            </h3>
            <p className="text-gray-400">
              Globally No.1 in Education — That's our goal. We are building the smartest ecosystem to empower the next 1.4 billion minds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
