// INDEPENDENCE DAY THEME — ACTIVE: AUG 15 ONLY
import React from 'react';

export default function FloatingFlags() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0 overflow-hidden h-64 hidden md:block" aria-hidden="true">
      {/* Bottom Left Flag */}
      <div className="absolute bottom-8 left-8 opacity-20 animate-wave-flag" style={{ animationDuration: '3s' }}>
        <div className="text-6xl">🇮🇳</div>
      </div>
      
      {/* Bottom Right Flag */}
      <div className="absolute bottom-12 right-12 opacity-20 animate-wave-flag" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
        <div className="text-6xl">🇮🇳</div>
      </div>
      
      {/* Middle subtle flag */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-10 animate-wave-flag" style={{ animationDuration: '4s' }}>
        <div className="text-4xl">🇮🇳</div>
      </div>
    </div>
  );
}
