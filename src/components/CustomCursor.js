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
        if (typeof classNames === 'string' && (classNames.includes('bg-white') || classNames.includes('bg-[#1D9E75]') || classNames.includes('accent'))) {
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
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.3)',
      scale: 1
    },
    link: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      backgroundColor: 'rgba(29, 158, 117, 1)',
      boxShadow: '0 0 20px 8px rgba(29, 158, 117, 0.4)',
      scale: 1.5
    },
    cta: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      backgroundColor: 'rgba(220, 38, 38, 1)',
      boxShadow: '0 0 20px 8px rgba(220, 38, 38, 0.4)',
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
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[100]"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
    </>
  );
}
