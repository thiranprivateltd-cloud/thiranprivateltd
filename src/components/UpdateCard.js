import GlassCard from '@/components/GlassCard';
import ScrollReveal from '@/components/ScrollReveal';

export default function UpdateCard({ entry, index = 0 }) {
  const { date, title, body, tags } = entry;

  return (
    <ScrollReveal delay={index * 0.1}>
      <GlassCard variant="default" showMotif={index === 0} className="relative group overflow-hidden border-[#D4A54A]/25">
        {/* Subtle accent corner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A54A]/5 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-40" />
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          {/* Date Label */}
          <span className="text-xs font-mono font-medium text-[#B8A9A0] tracking-wide">
            {date}
          </span>

          {/* Optional tags in gold outline style */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-heading font-medium tracking-wide border border-[#D4A54A]/40 text-[#D4A54A] bg-[#D4A54A]/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight mb-3">
          {title}
        </h2>

        {/* Body - plain language, 2-4 sentences, first person */}
        <p className="text-sm sm:text-base font-body text-gray-200 leading-relaxed">
          {body}
        </p>
      </GlassCard>
    </ScrollReveal>
  );
}
