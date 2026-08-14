'use client';
// INDEPENDENCE DAY THEME — ACTIVE: AUG 15 ONLY

import React, { useEffect, useState } from 'react';
import AshokChakra from './AshokChakra';
import Confetti from './Confetti';

export default function IndependenceDayOverlay() {
  const [show, setShow] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Check if it's already been shown this session
    const hasShown = sessionStorage.getItem('independenceOverlayShown');
    if (!hasShown) {
      setShow(true);
      sessionStorage.setItem('independenceOverlayShown', 'true');
    }
  }, []);

  useEffect(() => {
    let timer;
    if (show && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (show && countdown === 0) {
      setShow(false);
    }
    return () => clearTimeout(timer);
  }, [show, countdown]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A] text-white">
      <Confetti />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl">
        {/* Animated Flag elements */}
        <div className="flex space-x-2 mb-8 animate-wave-flag">
          <div className="w-8 h-32 bg-[#FF9933] rounded-sm"></div>
          <div className="w-8 h-32 bg-[#FFFFFF] rounded-sm flex items-center justify-center">
            <AshokChakra className="w-6 h-6" />
          </div>
          <div className="w-8 h-32 bg-[#138808] rounded-sm"></div>
        </div>

        <h1 className="text-4xl md:text-6xl font-heading font-black mb-4 tracking-wider uppercase text-glow-saffron">
          Happy Independence Day <span className="inline-block animate-wave-flag">🇮🇳</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-bold mb-2">
          Jai Hind · जय हिंद · வாழ்க இந்தியா
        </p>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          From Chennai, Thiran Private Ltd celebrates India's Independence Day with a renewed commitment to make quality education accessible to every Indian student — in their own language.
        </p>
        
        <p className="font-bold text-[#FFD700] mb-12 text-2xl">
          79 Years of Freedom. Endless possibilities.
        </p>

        <button 
          onClick={() => setShow(false)}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold transition-all flex items-center space-x-2 backdrop-blur-md group"
        >
          <span>Explore Thiran 🔴</span>
          {countdown > 0 && (
            <span className="text-sm text-gray-400 ml-2">({countdown}s)</span>
          )}
        </button>
      </div>
    </div>
  );
}
