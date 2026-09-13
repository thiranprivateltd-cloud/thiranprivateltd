import ScrollReveal from '@/components/ScrollReveal';
import UpdateCard from '@/components/UpdateCard';
import SectionEyebrow from '@/components/SectionEyebrow';
import { buildLogs } from '@/data/updates';
import { KolamDivider } from '@/components/HeritageMotifs';

export const metadata = {
  title: "Building Thiran — Updates & Build Log | Thiran Private Ltd",
  description: "Weekly notes on what we shipped, what broke, and what we learned at Thiran Private Ltd.",
};

export default function UpdatesPage() {
  const entries = buildLogs;
  const isShortList = entries.length < 3;

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Background glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#2B1420]/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <header className="text-center mb-16 sm:mb-20">
          <ScrollReveal delay={0}>
            <SectionEyebrow className="mb-4">
              BUILD LOG
            </SectionEyebrow>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-tight mb-4">
              Building Thiran, in public
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-[#B8A9A0] text-sm sm:text-base max-w-xl mx-auto mb-6">
              Weekly notes on what we shipped, what broke, and what we learned.
            </p>
          </ScrollReveal>

          <div className="w-full max-w-md mx-auto">
            <KolamDivider />
          </div>
        </header>

        {/* Reverse-chronological list of entries */}
        <section className="space-y-6">
          {entries.map((entry, index) => (
            <UpdateCard key={entry.id || index} entry={entry} index={index} />
          ))}

          {/* Empty / Future State message */}
          {isShortList && (
            <ScrollReveal delay={entries.length * 0.1}>
              <div className="pt-8 pb-4 text-center">
                <p className="text-sm font-medium font-body text-[#B8A9A0] italic">
                  More soon — we ship weekly.
                </p>
              </div>
            </ScrollReveal>
          )}
        </section>

      </div>
    </div>
  );
}
