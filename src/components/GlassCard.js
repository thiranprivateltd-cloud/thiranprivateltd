import { KolamCorner } from './HeritageMotifs';

export default function GlassCard({ 
  children, 
  variant = "default", 
  showMotif = false,
  className = "",
  ...props 
}) {
  const variantStyles = {
    default: "glass-card bg-[var(--card-bg)] border-[var(--card-border)] hover:border-[#D4A54A]/40",
    panel: "glass-panel bg-[var(--panel-bg)] border-[var(--card-border)]",
    elevated: "glass-card bg-[#2B1420]/80 border-[#D4A54A]/30 shadow-xl shadow-black/40",
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden ${selectedVariant} ${className}`}
      {...props}
    >
      {/* Optional Kolam Corner Motif inside featured cards */}
      {showMotif && (
        <div className="absolute top-0 right-0 pointer-events-none opacity-30 z-0">
          <KolamCorner position="top-right" className="w-20 h-20" />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
