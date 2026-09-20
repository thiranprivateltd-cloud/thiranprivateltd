'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, User, ArrowLeft, Video, ShieldCheck, Mail } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

function ConfirmedContent() {
  const searchParams = useSearchParams();
  const host = searchParams.get('host') || 'Thiran Team Member';
  const attendee = searchParams.get('attendee') || 'Attendee';
  const date = searchParams.get('date') || 'Upcoming';
  const slot = searchParams.get('slot') || 'Scheduled Time';
  const purpose = searchParams.get('purpose') || 'Discussion Session';

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#1A1425] text-white flex items-center justify-center">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4A54A]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#2B1420]/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 relative z-10">
        <GlassCard className="p-8 md:p-12 border-[#D4A54A]/40 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(16,185,129,0.25)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-heading font-bold uppercase tracking-widest mb-3">
              Meeting Confirmed & Scheduled
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-black text-white">
              Session Confirmed with {host}
            </h1>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mt-2">
              The meeting request has been approved. A confirmation email with the Google Meet conference link and Outlook calendar invite has been dispatched to <strong>{attendee}</strong>.
            </p>
          </div>

          <div className="bg-[#1A1425]/90 border border-white/10 rounded-2xl p-6 text-left space-y-3 text-xs md:text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-[#D4A54A]" />
                <span>Host Member:</span>
              </span>
              <strong className="text-white">{host}</strong>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span>Attendee:</span>
              </span>
              <strong className="text-white">{attendee}</strong>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4A54A]" />
                <span>Scheduled Date:</span>
              </span>
              <strong className="text-[#D4A54A]">{date}</strong>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Time Slot:</span>
              </span>
              <strong className="text-[#D4A54A]">{slot}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Purpose:</span>
              </span>
              <span className="text-gray-200">{purpose}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3.5 rounded-xl bg-[#D4A54A] text-[#1A1425] font-heading font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-[#D4A54A]/20 hover:bg-[#c3943b] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/schedule"
              className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 font-heading font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Schedule Another Session</span>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#1A1425] flex items-center justify-center text-white font-heading text-sm">
        Loading confirmation details...
      </div>
    }>
      <ConfirmedContent />
    </Suspense>
  );
}
