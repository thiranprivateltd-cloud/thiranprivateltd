// INDEPENDENCE DAY THEME — ACTIVE: AUG 15 ONLY
import React from 'react';

export default function AshokChakra({ className = "w-24 h-24" }) {
  return (
    <svg 
      className={`animate-spin-slow ${className}`}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" stroke="#000080" strokeWidth="2" />
      <circle cx="50" cy="50" r="40" stroke="#000080" strokeWidth="0.5" />
      <g stroke="#000080" strokeWidth="1.5">
        {[...Array(24)].map((_, i) => (
          <line 
            key={i} 
            x1="50" 
            y1="50" 
            x2="50" 
            y2="4" 
            transform={`rotate(${i * 15} 50 50)`} 
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="8" fill="#000080" />
    </svg>
  );
}
