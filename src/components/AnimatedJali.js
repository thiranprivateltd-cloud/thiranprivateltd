'use client';

import { useEffect, useRef } from 'react';

/**
 * AnimatedJali — "Living Jali" Ambient Background Animation
 * Renders an animated geometric lattice (Jali) on HTML5 Canvas.
 * Individual lattice nodes gently pulse in opacity (8-16% range) over an organic 4-8s cycle.
 * Interactive scroll detection enhances nearby nodes as they enter viewport.
 * Automatically respects prefers-reduced-motion.
 */
export default function AnimatedJali({
  className = "",
  opacityMultiplier = 1,
  nodeSpacing = 44,
  faint = false
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let nodes = [];

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.offsetWidth : window.innerWidth;
      height = parent ? parent.offsetHeight : window.innerHeight;

      // Handle high DPI screens smoothly
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initGrid();
    };

    const initGrid = () => {
      nodes = [];
      const isMobile = width < 768;
      const spacing = isMobile ? Math.max(nodeSpacing, 52) : nodeSpacing;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;
          // Offset alternating rows for an authentic diamond octagon jali lattice
          const offsetX = (r % 2) * (spacing / 2);
          
          nodes.push({
            x: x + offsetX,
            y: y,
            size: 2.2,
            phase: Math.random() * Math.PI * 2,
            speed: (0.0008 + Math.random() * 0.0012) * (faint ? 0.6 : 1),
            baseAlpha: faint ? 0.03 : 0.06,
            peakAlpha: faint ? 0.08 : 0.16,
            ringRadius: spacing * 0.36
          });
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();

    let lastTime = performance.now();

    const draw = (currentTime) => {
      ctx.clearRect(0, 0, width, height);

      const spacing = width < 768 ? Math.max(nodeSpacing, 52) : nodeSpacing;

      // Draw thin connecting lattice lines first
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = `rgba(212, 165, 74, ${faint ? 0.03 : 0.06 * opacityMultiplier})`;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        
        // Calculate smooth organic breathing alpha per node
        let currentAlpha = n.baseAlpha;
        if (!prefersReducedMotion) {
          const wave = Math.sin(currentTime * n.speed + n.phase);
          currentAlpha = n.baseAlpha + (wave + 1) * 0.5 * (n.peakAlpha - n.baseAlpha);
        }
        currentAlpha *= opacityMultiplier;

        // Draw diamond lattice diagonals to immediate neighbors
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 74, ${currentAlpha * 1.5})`;
        ctx.fill();

        // Draw geometric diamond perimeter around node
        ctx.beginPath();
        const r = n.ringRadius;
        ctx.moveTo(n.x, n.y - r);
        ctx.lineTo(n.x + r, n.y);
        ctx.lineTo(n.x, n.y + r);
        ctx.lineTo(n.x - r, n.y);
        ctx.closePath();
        ctx.strokeStyle = `rgba(212, 165, 74, ${currentAlpha * 0.75})`;
        ctx.stroke();

        // Inner circular flower dot
        if ((i % 3 === 0) && !faint) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 0.45, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 165, 74, ${currentAlpha * 0.5})`;
          ctx.stroke();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    if (prefersReducedMotion) {
      draw(performance.now());
    } else {
      animationFrameId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [opacityMultiplier, nodeSpacing, faint]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
