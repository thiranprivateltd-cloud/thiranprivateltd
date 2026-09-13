'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';

/**
 * IntroScreen — "Handwritten Signature Trace" Animation (Slower, Elegant Pacing)
 * 
 * SEQUENCE:
 * 1. Screen opens on solid var(--bg-primary) (deep indigo, #1A1425)
 * 2. "Thiran" appears letter by letter using an SVG path stroke-draw animation 
 *    on cursive handwritten calligraphy in gold ink (#D4A54A), drawn smoothly left to right (~2.2s)
 * 3. Once fully written, the handwritten strokes crossfade cleanly into the final 
 *    bold logo typeface & emblem (~500ms)
 * 4. Final logo holds center-screen for ~700ms so users can comfortably absorb it
 * 5. Logo scales down gently (1 -> 0.88) and fades out (500ms) as the hero section appears
 * 
 * SKIP/REFRESH LOGIC:
 * - Plays smoothly on every refresh and page load
 * - "Skip" text link at bottom-right, fades in early, always clickable
 * - prefers-reduced-motion: final logo fades in directly, no stroke drawing
 */
export default function IntroScreen() {
  const { completeIntro, showIntro } = useTranslation();
  const [showSkipLink, setShowSkipLink] = useState(false);
  const [phase, setPhase] = useState('tracing'); // 'tracing' | 'crossfade' | 'held' | 'exiting'
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (!showIntro) return;

    // Reset phase to tracing whenever intro mounts
    setPhase('tracing');

    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(reducedMotion);

    // Skip link appears after 300ms
    const skipTimer = setTimeout(() => {
      setShowSkipLink(true);
    }, 300);

    if (reducedMotion) {
      // Reduced motion: skip handwritten trace, show final logo immediately
      setPhase('held');
      const exitTimer = setTimeout(() => {
        completeIntro('en');
      }, 1000);
      return () => {
        clearTimeout(skipTimer);
        clearTimeout(exitTimer);
      };
    }

    // Phase 1: Handwritten signature trace draws smoothly (0 to 2200ms)
    // Phase 2: Crossfade to official typography (2250ms to 2800ms)
    const crossfadeTimer = setTimeout(() => {
      setPhase('crossfade');
    }, 2250);

    // Phase 3: Hold official logo (2800ms to 3500ms)
    const holdTimer = setTimeout(() => {
      setPhase('held');
    }, 2800);

    // Phase 4: Scale down (1 -> 0.88) and fade out (3500ms to 4000ms)
    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 3500);

    // Complete transition
    const completeTimer = setTimeout(() => {
      completeIntro('en');
    }, 4050);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(crossfadeTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [showIntro, completeIntro]);

  if (!showIntro) return null;

  const handleSkip = () => {
    completeIntro('en');
  };

  // Gracefully timed handwritten cursive paths for "T - h - i - r - a - n" + Flourish Underline
  const letterPaths = [
    // T (Crossbar top flourish + downstem loop)
    { id: 'T-bar', d: "M 80 65 C 105 45, 145 45, 185 52 C 160 56, 135 68, 130 92 C 124 122, 130 148, 145 152", duration: 0.55, delay: 0.05 },
    { id: 'T-cross', d: "M 105 92 C 125 90, 150 88, 170 90", duration: 0.25, delay: 0.45 },
    // h (Ascender loop + rounded arch)
    { id: 'h-stem', d: "M 170 152 C 188 140, 205 60, 215 50 C 224 42, 215 76, 204 112 C 198 132, 194 152, 194 152 C 194 152, 210 115, 230 115 C 244 115, 248 130, 248 152", duration: 0.5, delay: 0.6 },
    // i (Downstem + dot)
    { id: 'i-stem', d: "M 248 152 C 258 132, 268 116, 282 116 C 292 116, 288 136, 292 152", duration: 0.3, delay: 1.0 },
    { id: 'i-dot', d: "M 288 94 C 290 92, 292 94, 290 96", duration: 0.12, delay: 1.25 },
    // r (Shoulder wave + downstroke)
    { id: 'r-stroke', d: "M 292 152 C 302 132, 316 116, 326 116 C 334 116, 338 124, 334 128 C 334 128, 348 118, 362 122 C 368 128, 362 142, 368 152", duration: 0.38, delay: 1.3 },
    // a (Counter circle + closing stem)
    { id: 'a-loop', d: "M 368 152 C 378 132, 394 116, 412 116 C 388 116, 378 132, 378 144 C 378 154, 394 156, 408 152 M 408 122 C 412 132, 412 146, 422 152", duration: 0.42, delay: 1.55 },
    // n (Double arch + cursive release flourish)
    { id: 'n-stroke', d: "M 422 152 C 432 132, 442 116, 452 116 C 446 128, 446 142, 452 152 M 452 130 C 462 116, 476 116, 486 126 C 492 136, 492 148, 512 145", duration: 0.45, delay: 1.8 },
    // Underline Calligraphy Flourish
    { id: 'underline', d: "M 95 174 C 220 166, 380 166, 520 172", duration: 0.45, delay: 1.95 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A1425] text-white overflow-hidden select-none">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#2B1420]/70 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Logo Transition Container */}
      <motion.div
        animate={
          phase === 'exiting'
            ? { opacity: 0, scale: 0.88 }
            : { opacity: 1, scale: 1 }
        }
        transition={{
          duration: phase === 'exiting' ? 0.5 : 0.7,
          ease: phase === 'exiting' ? [0.4, 0, 1, 1] : [0.16, 1, 0.3, 1]
        }}
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6"
      >
        <div className="relative w-full aspect-[16/8] max-h-[260px] flex items-center justify-center">
          {/* Layer 1: Handwritten Calligraphy Stroke Animation */}
          <AnimatePresence>
            {(phase === 'tracing' || phase === 'crossfade') && !prefersReducedMotion && (
              <motion.div
                key="handwritten-layer"
                initial={{ opacity: 1 }}
                animate={{ opacity: phase === 'crossfade' ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 600 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full overflow-visible"
                >
                  {/* Subtle gold ink blur aura */}
                  <g filter="drop-shadow(0 0 12px rgba(212, 165, 74, 0.6))">
                    {letterPaths.map((letter) => (
                      <motion.path
                        key={letter.id}
                        d={letter.d}
                        stroke="#D4A54A"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: letter.duration,
                          delay: letter.delay,
                          ease: [0.25, 0.1, 0.25, 1.0] // Silk smooth ease
                        }}
                      />
                    ))}
                  </g>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Layer 2: Official Typography & Heritage Emblem Crossfade */}
          <AnimatePresence>
            {(phase === 'crossfade' || phase === 'held' || phase === 'exiting' || prefersReducedMotion) && (
              <motion.div
                key="official-brand-layer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                {/* Chakra / Motifs Emblem */}
                <div className="mb-2">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="16" stroke="#D4A54A" strokeWidth="1.5" opacity="0.8" />
                    <circle cx="24" cy="24" r="10" stroke="#D4A54A" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
                    <circle cx="24" cy="24" r="3.5" fill="#D4A54A" />
                    <line x1="4" y1="24" x2="10" y2="24" stroke="#D4A54A" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="38" y1="24" x2="44" y2="24" stroke="#D4A54A" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="24" y1="4" x2="24" y2="10" stroke="#D4A54A" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="24" y1="38" x2="24" y2="44" stroke="#D4A54A" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Official Brand Wordmark */}
                <h1 className="font-heading text-4xl sm:text-6xl font-black uppercase text-[#D4A54A] tracking-[0.24em] drop-shadow-[0_0_24px_rgba(212,165,74,0.45)]">
                  THIRAN
                </h1>

                {/* Subtitle */}
                <p className="mt-2 text-xs sm:text-sm font-body uppercase tracking-[0.3em] text-[#E8D5B5] font-bold">
                  Smarter Steps Forward
                </p>

                <p className="mt-1 text-[10px] font-body uppercase tracking-[0.2em] text-[#B8A9A0]/80">
                  Dream · Build · Launch
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Skip Text Link Bottom-Right */}
      <AnimatePresence>
        {showSkipLink && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 right-8 z-20"
          >
            <button
              onClick={handleSkip}
              className="text-xs font-heading font-medium tracking-wider text-[#B8A9A0]/70 hover:text-[#D4A54A] transition-colors cursor-pointer py-1 px-2"
              aria-label="Skip intro animation"
            >
              Skip
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
