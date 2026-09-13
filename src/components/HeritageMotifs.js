'use client';

/**
 * Reusable Heritage & Education Vector Motifs
 * Subtle line-art in gold/cream with 5-10% opacity, designed for textures & subtle accents.
 */

// 1. Jali Lattice Screen Pattern
export function JaliPattern({ className = "", opacity = 0.07 }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern id="jali-lattice" width="40" height="40" patternUnits="userSpaceOnUse">
          {/* Diamond octagon geometric lattice */}
          <path
            d="M20 0 L40 20 L20 40 L0 20 Z"
            fill="none"
            stroke="#D4A54A"
            strokeWidth="0.75"
          />
          <circle cx="20" cy="20" r="4" fill="none" stroke="#D4A54A" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="3" fill="none" stroke="#D4A54A" strokeWidth="0.75" />
          <circle cx="40" cy="0" r="3" fill="none" stroke="#D4A54A" strokeWidth="0.75" />
          <circle cx="0" cy="40" r="3" fill="none" stroke="#D4A54A" strokeWidth="0.75" />
          <circle cx="40" cy="40" r="3" fill="none" stroke="#D4A54A" strokeWidth="0.75" />
          <path
            d="M20 10 L30 20 L20 30 L10 20 Z"
            fill="none"
            stroke="#D4A54A"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#jali-lattice)" />
    </svg>
  );
}

// 2. Kolam Geometric Corner Motif
export function KolamCorner({ className = "", position = "top-right" }) {
  const rotationClass = {
    "top-right": "",
    "top-left": "-scale-x-100",
    "bottom-right": "-scale-y-100",
    "bottom-left": "-scale-100",
  }[position] || "";

  return (
    <svg
      className={`pointer-events-none w-24 h-24 sm:w-32 sm:h-32 text-[#D4A54A] opacity-20 ${rotationClass} ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Kolam Dots */}
      <circle cx="20" cy="20" r="1.5" fill="#D4A54A" />
      <circle cx="40" cy="20" r="1.5" fill="#D4A54A" />
      <circle cx="60" cy="20" r="1.5" fill="#D4A54A" />
      <circle cx="80" cy="20" r="1.5" fill="#D4A54A" />

      <circle cx="20" cy="40" r="1.5" fill="#D4A54A" />
      <circle cx="40" cy="40" r="1.5" fill="#D4A54A" />
      <circle cx="60" cy="40" r="1.5" fill="#D4A54A" />
      <circle cx="80" cy="40" r="1.5" fill="#D4A54A" />

      <circle cx="20" cy="60" r="1.5" fill="#D4A54A" />
      <circle cx="40" cy="60" r="1.5" fill="#D4A54A" />
      <circle cx="60" cy="60" r="1.5" fill="#D4A54A" />

      <circle cx="20" cy="80" r="1.5" fill="#D4A54A" />
      <circle cx="40" cy="80" r="1.5" fill="#D4A54A" />

      {/* Looping Kolam Lines */}
      <path
        d="M20 10 C30 10 30 30 40 30 C50 30 50 10 60 10 C70 10 70 30 80 30 C90 30 90 20 90 10"
        stroke="#D4A54A"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M10 20 C10 30 30 30 30 40 C30 50 10 50 10 60 C10 70 30 70 30 80 C30 90 20 90 10 90"
        stroke="#D4A54A"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M20 20 Q50 20 50 50 Q50 80 80 80"
        stroke="#D4A54A"
        strokeWidth="0.75"
        strokeDasharray="3,3"
      />
      <path
        d="M80 20 L20 80"
        stroke="#D4A54A"
        strokeWidth="0.5"
      />
    </svg>
  );
}

// 3. Kolam Section Divider
export function KolamDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center space-x-3 w-full py-6 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4A54A]/30 to-[#D4A54A]/60" />
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-[#D4A54A] opacity-70">
        <circle cx="20" cy="10" r="2" fill="#D4A54A" />
        <circle cx="10" cy="10" r="1.5" fill="#D4A54A" />
        <circle cx="30" cy="10" r="1.5" fill="#D4A54A" />
        <path d="M5 10 Q10 2 20 10 Q30 18 35 10" stroke="#D4A54A" strokeWidth="0.75" />
        <path d="M5 10 Q10 18 20 10 Q30 2 35 10" stroke="#D4A54A" strokeWidth="0.75" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-r from-[#D4A54A]/60 via-[#D4A54A]/30 to-transparent" />
    </div>
  );
}

// 4. Temple Architecture Silhouette Line (Gopuram / Heritage Line)
export function TempleSilhouette({ className = "" }) {
  return (
    <svg
      className={`pointer-events-none text-[#D4A54A] ${className}`}
      viewBox="0 0 300 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tiered Gopuram Silhouette Outline */}
      <path
        d="M150 10 L154 20 L160 20 L156 32 L166 32 L162 46 L174 46 L168 62 L182 62 L176 80 L192 80 L186 100 L210 100 L210 115 L90 115 L90 100 L114 100 L108 80 L124 80 L118 62 L132 62 L126 46 L138 46 L134 32 L144 32 L140 20 L146 20 Z"
        stroke="#D4A54A"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Finial / Kalasam on top */}
      <circle cx="150" cy="7" r="2.5" stroke="#D4A54A" strokeWidth="1" />
      {/* Central arch entrance */}
      <path
        d="M140 115 C140 98 160 98 160 115"
        stroke="#D4A54A"
        strokeWidth="1"
      />
      {/* Stepped base lines */}
      <line x1="60" y1="115" x2="240" y2="115" stroke="#D4A54A" strokeWidth="1" />
      <line x1="30" y1="118" x2="270" y2="118" stroke="#D4A54A" strokeWidth="0.5" strokeDasharray="4,4" />
    </svg>
  );
}

// 5. Abstract Geometric Wheel / Chakra Motif
export function GeometricChakra({ className = "", size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={`text-[#D4A54A] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="18" stroke="#D4A54A" strokeWidth="1" />
      <circle cx="20" cy="20" r="14" stroke="#D4A54A" strokeWidth="0.5" strokeDasharray="2,2" />
      <circle cx="20" cy="20" r="4" stroke="#D4A54A" strokeWidth="1" fill="#D4A54A" fillOpacity="0.15" />
      {/* 12 spokes */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="20"
          y1="6"
          x2="20"
          y2="16"
          stroke="#D4A54A"
          strokeWidth="0.75"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
    </svg>
  );
}

// 6. Education Line Icons: Book with Rising Graph
export function BookGrowthIcon({ className = "w-6 h-6", color = "#D4A54A" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 5.5 C5.5 4.5 9 5.5 12 7 C15 5.5 18.5 4.5 22 5.5 V18.5 C18.5 17.5 15 18.5 12 20 C9 18.5 5.5 17.5 2 18.5 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 7 V20" stroke={color} strokeWidth="1.5" />
      {/* Rising graph stroke */}
      <path
        d="M5 14 L8.5 11 L11.5 13 L19 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 8 H19 V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 7. Geometric Jali Graduation Cap Outline
export function JaliGradCapIcon({ className = "w-6 h-6", color = "#D4A54A" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Diamond Cap */}
      <path
        d="M12 3 L22 8.5 L12 14 L2 8.5 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Geometric Jali Inset */}
      <path
        d="M12 6.5 L17 9.25 L12 12 L7 9.25 Z"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="1.5,1.5"
      />
      {/* Headband */}
      <path
        d="M6 11 V16.5 C6 16.5 8.5 19.5 12 19.5 C15.5 19.5 18 16.5 18 16.5 V11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Tassel */}
      <path
        d="M20 10 V16.5 C20 17 21 17.5 21 17.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 8. Pencil Journey Route Icon
export function PencilJourneyIcon({ className = "w-6 h-6", color = "#D4A54A" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 20 C6 20 6 15 10 15 C14 15 14 10 18 10"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="2,2"
        strokeLinecap="round"
      />
      <circle cx="3" cy="20" r="1.5" fill={color} />
      {/* Stylus at end */}
      <path
        d="M18 10 L21 4 L15 7 Z"
        stroke={color}
        strokeWidth="1.2"
        fill={color}
        fillOpacity="0.2"
      />
    </svg>
  );
}

// 9. Institution Building Line Silhouette
export function InstitutionSilhouetteIcon({ className = "w-6 h-6", color = "#D4A54A" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Pediment triangle */}
      <path d="M2 8 L12 2 L22 8 H2 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Pillars */}
      <line x1="5" y1="8" x2="5" y2="18" stroke={color} strokeWidth="1.5" />
      <line x1="9.5" y1="8" x2="9.5" y2="18" stroke={color} strokeWidth="1.5" />
      <line x1="14.5" y1="8" x2="14.5" y2="18" stroke={color} strokeWidth="1.5" />
      <line x1="19" y1="8" x2="19" y2="18" stroke={color} strokeWidth="1.5" />
      {/* Base steps */}
      <line x1="2" y1="18" x2="22" y2="18" stroke={color} strokeWidth="1.5" />
      <line x1="1" y1="21" x2="23" y2="21" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
