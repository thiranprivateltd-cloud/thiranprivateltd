'use client';
// INDEPENDENCE DAY THEME — ACTIVE: AUG 15 ONLY

import React, { useEffect, useState } from 'react';

export default function Confetti() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles
    const colors = ['#FF9933', '#FFFFFF', '#138808'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 5}s`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute top-[-20px] rounded-sm opacity-70"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            backgroundColor: p.backgroundColor,
            animation: `float-up ${p.animationDuration} linear ${p.animationDelay} infinite`,
            // Reversing the float-up to make it fall down
            animationDirection: 'reverse'
          }}
        />
      ))}
    </div>
  );
}
