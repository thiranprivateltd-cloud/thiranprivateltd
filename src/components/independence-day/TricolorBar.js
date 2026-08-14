// INDEPENDENCE DAY THEME — ACTIVE: AUG 15 ONLY
import React from 'react';

export default function TricolorBar({ className = "" }) {
  return (
    <div className={`w-full flex h-1 ${className}`}>
      <div className="flex-1 bg-[#FF9933]"></div>
      <div className="flex-1 bg-[#FFFFFF]"></div>
      <div className="flex-1 bg-[#138808]"></div>
    </div>
  );
}
