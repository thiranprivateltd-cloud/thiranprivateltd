'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    
    if (isTouchDevice) return;

    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('a') || target.closest('button')) {
        const classNames = target.className || '';
        if (typeof classNames === 'string' && (classNames.includes('bg-[#D4A54A]') || classNames.includes('bg-white') || classNames.includes('accent'))) {
          // Terracotta hover on key CTAs
          setCursorVariant('cta');
        } else {
          setCursorVariant('link');
        }
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      backgroundColor: '#D4A54A', // Gold dot
      boxShadow: '0 0 14px 3px rgba(212, 165, 74, 0.45)',
      scale: 1
    },
    link: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      backgroundColor: 'rgba(212, 165, 74, 0.85)',
      boxShadow: '0 0 20px 6px rgba(212, 165, 74, 0.5)',
      scale: 1.4
    },
    cta: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      backgroundColor: '#C1440E', // Terracotta on CTA hover
      boxShadow: '0 0 22px 7px rgba(193, 68, 14, 0.55)',
      scale: 1.5
    }
  };

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body {
            cursor: none;
          }
          a, button {
            cursor: none;
          }
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[100]"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 550,
          damping: 30,
          mass: 0.4
        }}
      />
    </>
  );
}
