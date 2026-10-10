'use client';
import { motion } from 'framer-motion';
import { Download, FileText, Image as ImageIcon } from 'lucide-react';
import SectionEyebrow from '@/components/SectionEyebrow';
import GlassCard from '@/components/GlassCard';

export default function Press() {
  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#2B1420]/50 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <SectionEyebrow icon={FileText} className="mb-4">
            Media & Press
          </SectionEyebrow>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black uppercase text-glow-gold leading-none mb-6"
          >
            Press Kit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[#B8A9A0] text-sm md:text-base max-w-2xl mx-auto"
          >
            Everything you need to write about Thiran Private Ltd. For press inquiries, please contact us at hello@thiranprivateltd.com.
          </motion.p>
        </div>

        {/* Company Boilerplate */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <GlassCard variant="default" showMotif={true} className="p-8 md:p-12 border-[#D4A54A]/30">
            <h2 className="text-2xl font-bold font-heading mb-4 text-[#D4A54A]">Company Boilerplate</h2>
            <p className="text-[#B8A9A0] leading-relaxed mb-6 font-body">
              Thiran Private Ltd is an Indian software ecosystem and educational technology firm founded in March 2026. Headquartered in Chennai, Thiran is dedicated to bridging the gap between academic learning and practical execution. Through its B2B division (LaunchLab) and its upcoming AI-driven consumer platform (NextStep), the company is building the infrastructure to empower the next generation of builders in India.
            </p>
            <div className="flex flex-wrap gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">
              <div><span className="text-[#D4A54A]">Founded:</span> March 2026</div>
              <div><span className="text-[#D4A54A]">HQ:</span> Chennai, India</div>
              <div><span className="text-[#D4A54A]">Founder & CEO:</span> G S Varshith</div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Press Releases & Official Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold font-heading text-white">Press Releases & Official Documents</h2>
              <p className="text-xs text-[#B8A9A0] font-body mt-1">Official public announcements, circulars, and media releases from Thiran Private Ltd.</p>
            </div>
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full border border-[#D4A54A]/30 bg-[#D4A54A]/10 text-[#D4A54A] text-[10px] font-mono uppercase tracking-widest">
              Latest Releases
            </span>
          </div>

          <div className="space-y-4">
            {/* Call for Volunteers Document - 09-10-2026 */}
            <GlassCard variant="default" showMotif={true} className="p-6 md:p-8 border-[#D4A54A]/30 bg-[#2B1420]/30 hover:border-[#D4A54A]/50 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#D4A54A] bg-[#D4A54A]/10 px-2.5 py-1 rounded-full border border-[#D4A54A]/30">
                      Press Release
                    </span>
                    <span className="text-xs text-[#B8A9A0] font-mono">
                      📅 Published: October 09, 2026 (09-10-2026)
                    </span>
                    <span className="text-[10px] bg-[#7A9B76]/15 border border-[#7A9B76]/30 text-[#7A9B76] px-2 py-0.5 rounded-md font-mono">
                      Active
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
                    Thiran Invites CAs, CSs and Other Professionals to Join as Volunteer Advisors
                  </h3>

                  <p className="text-sm text-[#B8A9A0] font-body leading-relaxed max-w-3xl">
                    Thiran Private Ltd invites practicing Chartered Accountants (CAs), Company Secretaries (CSs), legal professionals, finance experts, and seasoned industry mentors across India to join as Volunteer Advisors to guide student founders, strengthen corporate governance, and mentor emerging builders across our ecosystem.
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400 pt-1">
                    <div><span className="text-[#D4A54A]">Ref:</span> TPR-2026-ADV-001</div>
                    <div><span className="text-[#D4A54A]">Format:</span> Official Press Release / Circular</div>
                    <div><span className="text-[#D4A54A]">Target Audience:</span> CAs, CSs, Legal & Domain Experts</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                  <button
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([
                        `=========================================================================\n` +
                        `THIRAN PRIVATE LTD - OFFICIAL PRESS RELEASE & INVITATION\n` +
                        `=========================================================================\n` +
                        `Date of Release : October 09, 2026 (09-10-2026)\n` +
                        `Reference Code  : TPR-2026-ADV-001\n` +
                        `Headquarters    : Chennai, Tamil Nadu, India\n\n` +
                        `SUBJECT:\n` +
                        `Thiran Invites CAs, CSs and Other Professionals to Join as Volunteer Advisors\n\n` +
                        `CHENNAI, INDIA — October 09, 2026:\n` +
                        `Thiran Private Ltd, an Indian software ecosystem and educational technology firm, has officially announced an open invitation for Chartered Accountants (CAs), Company Secretaries (CSs), legal advisors, and corporate veterans across India to join as Volunteer Advisors on its Advisory & Mentorship Council.\n\n` +
                        `OBJECTIVES OF THE ADVISORY COUNCIL:\n` +
                        `1. Corporate Governance & Statutory Compliance Guidance\n` +
                        `2. Financial Structuring, Auditing & Tax Strategy Advisory for Emerging Ventures\n` +
                        `3. Mentoring Student Entrepreneurs & LaunchLab Incubation Cohorts\n` +
                        `4. Curriculum Review for NextStep Career & Professional Programs\n` +
                        `5. Policy Insights on Corporate Law, Intellectual Property & Tech Regulation\n\n` +
                        `WHO CAN JOIN:\n` +
                        `- Qualified Chartered Accountants (ICAI members)\n` +
                        `- Qualified Company Secretaries (ICSI members)\n` +
                        `- Legal practitioners (Bar Council affiliated) specializing in Corporate & IP Law\n` +
                        `- Senior finance, taxation, risk management, and governance executives\n\n` +
                        `ENGAGEMENT MODEL & RECOGNITION:\n` +
                        `- Honorary Volunteer Advisory appointment\n` +
                        `- Public attribution on Thiran Advisory Council portal & communications\n` +
                        `- Opportunities to host masterclasses and mentor high-potential builders\n` +
                        `- Active participation in ecosystem roundtables and corporate board consultations\n\n` +
                        `EXPRESSION OF INTEREST:\n` +
                        `Interested professionals can send their profile, credentials, and letter of interest to:\n` +
                        `Email  : hello@thiranprivateltd.com / hrheadthiran@outlook.com\n` +
                        `Portal : https://thiranprivateltd.com/schedule\n\n` +
                        `Issued by:\n` +
                        `Corporate Relations & Media Division\n` +
                        `Thiran Private Ltd, Chennai, India\n`
                      ], { type: 'text/plain;charset=utf-8' });
                      element.href = URL.createObjectURL(file);
                      element.download = "Thiran-Press-Release-Volunteer-Advisors-09-10-2026.txt";
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="px-5 py-3 rounded-xl bg-[#D4A54A] hover:bg-[#c3943b] text-[#1A1425] font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-all hover:scale-105 shadow-md shadow-[#D4A54A]/20 cursor-pointer"
                  >
                    <Download className="w-4 h-4 mr-2" /> Download Document
                  </button>
                  <a
                    href="mailto:thiranprivateltd@gmail.com?subject=Expression%20of%20Interest%20-%20Volunteer%20Advisor%20(CA/CS/Professional)&body=Dear%20Thiran%20Team,%0A%0AI%20would%20like%20to%20express%20my%20interest%20in%20joining%20as%20a%20Volunteer%20Advisor%20following%20your%20Press%20Release%20dated%2009-10-2026.%0A%0AProfessional%20Background:%0AYears%20of%20Experience:%0AContact%20Number:"
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-colors text-center"
                  >
                    Inquire / Apply
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Brand Assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard variant="default" className="p-8 border-[#D4A54A]/25">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-heading text-white">Logos</h2>
                <ImageIcon className="w-5 h-5 text-[#D4A54A]" />
              </div>
              <div className="w-full h-32 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 overflow-hidden p-4">
                <img src="/logo-full.png" alt="Thiran Logo" className="object-contain w-full h-full" />
              </div>
              <button className="w-full py-3 rounded-full bg-[#D4A54A]/10 hover:bg-[#D4A54A]/20 border border-[#D4A54A]/35 text-[#D4A54A] font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-colors cursor-pointer">
                <Download className="w-4 h-4 mr-2" /> Download Logo Pack (.ZIP)
              </button>
            </GlassCard>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard variant="default" className="p-8 border-[#D4A54A]/25">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-heading text-white">Executive Headshots</h2>
                <ImageIcon className="w-5 h-5 text-[#D4A54A]" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="w-full aspect-square bg-white/5 border border-[#D4A54A]/20 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src="/founder.jpg" alt="G S Varshith" className="object-cover w-full h-full" />
                </div>
                <div className="w-full aspect-square bg-white/5 border border-[#D4A54A]/20 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src="/executives.jpg" alt="Team Photo" className="object-cover w-full h-full" />
                </div>
              </div>
              <button className="w-full py-3 rounded-full bg-[#D4A54A]/10 hover:bg-[#D4A54A]/20 border border-[#D4A54A]/35 text-[#D4A54A] font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-colors cursor-pointer">
                <Download className="w-4 h-4 mr-2" /> Download Photos (.ZIP)
              </button>
            </GlassCard>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
