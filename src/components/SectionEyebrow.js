'use client';

export default function SectionEyebrow({
  children,
  icon: Icon,
  className = '',
}) {
  return (
    <div
      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#D4A54A]/30 bg-[#D4A54A]/10 text-[10px] font-heading font-bold uppercase tracking-widest text-[#D4A54A] ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 mr-1" />}
      <span>{children}</span>
    </div>
  );
}
