'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-heading font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer';

  const variants = {
    // Primary variant: gold fill with dark indigo text
    primary: 'bg-[#D4A54A] hover:bg-[#c3943b] text-[#1A1425] shadow-lg shadow-[#D4A54A]/20 hover:shadow-[#D4A54A]/35 hover:scale-105 px-6 py-3.5',
    // Secondary outline variant
    secondary: 'bg-transparent border border-[#D4A54A]/35 hover:border-[#D4A54A] text-[#FDFBF7] hover:bg-[#D4A54A]/10 px-6 py-3.5',
    // Terracotta accent variant (for urgency/highlights)
    terracotta: 'bg-[#C1440E] hover:bg-[#a93a0b] text-[#FDFBF7] shadow-lg shadow-[#C1440E]/20 hover:scale-105 px-6 py-3.5',
    // Subtle ghost
    ghost: 'bg-white/5 hover:bg-white/10 text-[#FDFBF7] border border-white/10 px-5 py-2.5',
  };

  const combinedStyles = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles} {...props}>
        <span>{children}</span>
        {Icon ? <Icon className="w-3.5 h-3.5 ml-2" /> : null}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles} {...props}>
      <span>{children}</span>
      {Icon ? <Icon className="w-3.5 h-3.5 ml-2" /> : null}
    </button>
  );
}
