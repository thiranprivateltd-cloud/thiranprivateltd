'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';
import { 
  Lock, 
  LogOut, 
  Calendar, 
  ShieldAlert, 
  FileText, 
  Users, 
  Video, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  StopCircle,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EmployeePortal() {
  const { t } = useTranslation();
  
  // Auth state
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('meetings'); // 'meetings' | 'members' | 'notices'

  // Portal Data from storage
  const [members, setMembers] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [notices, setNotices] = useState([]);

  // Active Live Meet session tracking state
  const [activeSession, setActiveSession] = useState(null); // { meetingId, entryTimestamp, entryTimeStr }
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Load storage
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('thiran_portal_auth');
    const savedMember = sessionStorage.getItem('thiran_current_member');

    try {
      const savedMembers = localStorage.getItem('thiran_members');
      if (savedMembers) setMembers(JSON.parse(savedMembers));

      const savedMeetings = localStorage.getItem('thiran_meetings');
      if (savedMeetings) setMeetings(JSON.parse(savedMeetings));

      const savedNotices = localStorage.getItem('thiran_notices');
      if (savedNotices) setNotices(JSON.parse(savedNotices));

      if (sessionAuth === 'true') {
        setIsAuthenticated(true);
        if (savedMember) setCurrentMember(JSON.parse(savedMember));
      }
    } catch (err) {
      console.error("Error loading local storage in portal", err);
    }
  }, []);

  // Live session timer interval
  useEffect(() => {
    let timer;
    if (activeSession) {
      timer = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(timer);
  }, [activeSession]);

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = emailInput.toLowerCase().trim();

    // 1. Check if Master Admin Password
    if (passwordInput === 'thiranadmin2026' || passwordInput === 'gsv2026' || passwordInput === 'admin2026') {
      confetti({
        particleCount: 100,
        spread: 70,
        colors: ['#1D9E75', '#F59E0B', '#3B82F6']
      });
      sessionStorage.setItem('thiran_admin_auth', 'true');
      window.location.href = '/admin';
      return;
    }

    // 2. Check if global password or individual member credential
    const matchedMember = members.find(m => m.email === cleanEmail && m.password === passwordInput);
    
    if (matchedMember || passwordInput === 'thiranteam' || passwordInput === 'launch2026') {
      confetti({
        particleCount: 80,
        spread: 60,
        colors: ['#1F3864', '#1D9E75', '#4488CC']
      });

      const memberObj = matchedMember || { name: 'Team Member', role: 'Volunteer', email: cleanEmail || 'team@thiran.in', id: 'MEM-TEMP' };
      
      setIsAuthenticated(true);
      setCurrentMember(memberObj);
      setError('');
      setPasswordInput('');
      setEmailInput('');
      
      sessionStorage.setItem('thiran_portal_auth', 'true');
      sessionStorage.setItem('thiran_current_member', JSON.stringify(memberObj));
    } else {
      setError('Invalid email or password. For Admin Login, use master admin credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentMember(null);
    setActiveSession(null);
    sessionStorage.removeItem('thiran_portal_auth');
    sessionStorage.removeItem('thiran_current_member');
  };

  // JOIN GOOGLE MEET (AUTOMATED ATTENDANCE & TIME TRACKING)
  const handleJoinGoogleMeet = (meeting) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Set active session
    setActiveSession({
      meetingId: meeting.id,
      meetingNumber: meeting.number,
      entryTimestamp: Date.now(),
      entryTimeStr: timeStr
    });

    // Update meeting logs in storage with Entry Time
    if (currentMember && currentMember.id) {
      const updatedMeetings = meetings.map(m => {
        if (m.id === meeting.id) {
          const existingLogs = m.logs || {};
          const memberLog = existingLogs[currentMember.id] || {};
          
          return {
            ...m,
            logs: {
              ...existingLogs,
              [currentMember.id]: {
                ...memberLog,
                entryTime: timeStr,
                exitTime: 'In Session...',
                status: 'Present' // Marked present on join
              }
            }
          };
        }
        return m;
      });

      setMeetings(updatedMeetings);
      localStorage.setItem('thiran_meetings', JSON.stringify(updatedMeetings));
    }

    // Open Google Meet in new tab
    window.open(meeting.meetLink, '_blank');
  };

  // LEAVE GOOGLE MEET
  const handleLeaveGoogleMeet = () => {
    if (!activeSession) return;

    const now = new Date();
    const exitTimeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const durationMins = Math.max(1, Math.round((Date.now() - activeSession.entryTimestamp) / 60000));

    if (currentMember && currentMember.id) {
      const updatedMeetings = meetings.map(m => {
        if (m.id === activeSession.meetingId) {
          const existingLogs = m.logs || {};
          const memberLog = existingLogs[currentMember.id] || {};

          return {
            ...m,
            logs: {
              ...existingLogs,
              [currentMember.id]: {
                ...memberLog,
                exitTime: exitTimeStr,
                durationMinutes: durationMins,
                status: durationMins >= 1 ? 'Present' : 'Absent'
              }
            }
          };
        }
        return m;
      });

      setMeetings(updatedMeetings);
      localStorage.setItem('thiran_meetings', JSON.stringify(updatedMeetings));
    }

    setActiveSession(null);
  };

  const formatElapsed = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#0A0A0A] text-white font-body">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#1F3864]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#1D9E75]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            
            /* MEMBER LOGIN CARD */
            <motion.div
              key="portal-login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto py-12"
            >
              <div className="glass-card rounded-3xl p-8 border border-[#1F3864]/40 bg-[#0C0C0C]/90 text-center space-y-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#1F3864] rounded-xl flex items-center justify-center border border-white/10 shadow-lg mb-3">
                    <span className="font-heading text-white text-2xl font-black">T</span>
                  </div>
                  <h1 className="font-heading text-2xl font-black text-white uppercase">
                    Member Portal
                  </h1>
                  <p className="font-body text-gray-500 text-xs mt-1">
                    Sign in with your individual member credentials
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  <div>
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-2">
                      Member Email / Login ID
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. brundavanam@thiran.in"
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-accent text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-2">
                      Personal Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                      <input
                        type="password"
                        required
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-accent text-xs"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center space-x-2 text-[11px] text-red-400 font-bold uppercase bg-red-950/30 border border-red-500/30 px-3.5 py-2.5 rounded-xl">
                      <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-400" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full text-center py-3.5 rounded-xl bg-[#1D9E75] hover:bg-[#15805d] text-white font-heading font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20"
                  >
                    <span>Sign In to Member Portal</span>
                  </button>
                </form>

                <div className="pt-4 border-t border-white/5">
                  <a
                    href="/admin"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-teal-400 hover:text-teal-300 font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all block text-center"
                  >
                    <span>🛡️ Switch to Executive Admin Login (`/admin`)</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            
            /* MEMBER PORTAL DASHBOARD */
            <motion.div
              key="portal-dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Active Meeting Live Session Banner */}
              {activeSession && (
                <div className="glass-panel p-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 flex flex-col sm:flex-row justify-between items-center gap-4 animate-pulse">
                  <div className="flex items-center space-x-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <div>
                      <h4 className="font-heading font-bold text-white text-sm">
                        Active in {activeSession.meetingNumber}
                      </h4>
                      <div className="text-xs text-emerald-300 flex items-center space-x-3 mt-0.5">
                        <span>Entry Time: {activeSession.entryTimeStr}</span>
                        <span>•</span>
                        <span className="font-mono font-bold">Time Logged: {formatElapsed(elapsedSeconds)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleLeaveGoogleMeet}
                    className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-heading font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <StopCircle className="w-4 h-4" />
                    <span>Leave Meet & Log Hours</span>
                  </button>
                </div>
              )}

              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-[#0C0C0C]/80 border border-white/5 rounded-2xl p-6 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#1F3864] rounded-lg flex items-center justify-center border border-white/10 shadow-lg">
                    <span className="font-heading text-white text-xl font-black">T</span>
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-black text-white uppercase leading-none">
                      Welcome, {currentMember?.name || 'Team Member'}
                    </h2>
                    <span className="text-[10px] font-heading font-bold text-accent tracking-wider uppercase block mt-1">
                      {currentMember?.role || 'Member'} • {currentMember?.email || 'Authenticated'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white font-heading font-bold text-[10px] uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Layout split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Navigation Menu */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="glass-card rounded-2xl p-4 border border-white/5 bg-[#0C0C0C]/65 space-y-2">
                    
                    <span className="text-[8px] font-heading font-bold text-gray-500 uppercase tracking-widest block mb-4 px-2">
                      Portal Workspace
                    </span>

                    <button
                      onClick={() => setActiveTab('meetings')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
                        activeTab === 'meetings' ? 'bg-[#1F3864] text-white border border-[#4488CC]/30' : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>Google Meet & Attendance</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('members')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
                        activeTab === 'members' ? 'bg-[#1F3864] text-white border border-[#4488CC]/30' : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>Team Roster</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('notices')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-2.5 transition-colors cursor-pointer ${
                        activeTab === 'notices' ? 'bg-[#1F3864] text-white border border-[#4488CC]/30' : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Circulars</span>
                    </button>

                  </div>
                </div>

                {/* Dashboard display side */}
                <div className="lg:col-span-9">
                  <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/5 bg-[#0C0C0C]/40 min-h-[380px]">
                    <AnimatePresence mode="wait">
                      
                      {/* GOOGLE MEET & ATTENDANCE LOGS TAB */}
                      {activeTab === 'meetings' && (
                        <motion.div
                          key="meetings-tab"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-6"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-heading text-lg font-black uppercase text-white">
                              Google Meet Sessions & Attendance
                            </h3>
                          </div>

                          {meetings.length === 0 ? (
                            <div className="text-center py-16 text-gray-500 text-sm font-heading uppercase tracking-wider">
                              No Google Meet sessions scheduled yet.
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {meetings.map((meet) => {
                                const myLog = currentMember?.id ? meet.logs?.[currentMember.id] : null;
                                return (
                                  <div key={meet.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="space-y-1">
                                      <div className="flex items-center space-x-3">
                                        <h4 className="font-heading font-bold text-white text-base">{meet.number}</h4>
                                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                          meet.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gray-700 text-gray-400'
                                        }`}>
                                          {meet.status}
                                        </span>
                                      </div>
                                      <div className="text-xs text-gray-400 flex items-center space-x-3">
                                        <span>📅 {meet.date}</span>
                                        <span>⏰ {meet.startTime} - {meet.endTime}</span>
                                      </div>

                                      {/* Individual log details */}
                                      {myLog && (
                                        <div className="text-xs text-gray-400 mt-2 flex flex-wrap items-center gap-3 pt-2 border-t border-white/5 font-mono">
                                          <span>Entry: <strong className="text-teal-400">{myLog.entryTime}</strong></span>
                                          <span>Exit: <strong className="text-amber-400">{myLog.exitTime}</strong></span>
                                          <span>Duration: <strong className="text-white">{myLog.durationMinutes} mins</strong></span>
                                          <span>Status: <strong className={myLog.status === 'Present' ? 'text-emerald-400' : 'text-red-400'}>{myLog.status}</strong></span>
                                        </div>
                                      )}
                                    </div>

                                    {meet.status === 'Active' && (
                                      <button
                                        onClick={() => handleJoinGoogleMeet(meet)}
                                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-heading font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20"
                                      >
                                        <Video className="w-4 h-4" />
                                        <span>Join Google Meet</span>
                                        <ExternalLink className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* MEMBERS ROSTER TAB */}
                      {activeTab === 'members' && (
                        <motion.div
                          key="members-tab"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-6"
                        >
                          <h3 className="font-heading text-lg font-black uppercase text-white mb-4">
                            Company Team Roster
                          </h3>
                          
                          {members.length === 0 ? (
                            <div className="text-center py-16 text-gray-500 text-sm font-heading uppercase tracking-wider">
                              No team members listed yet.
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {members.map((member) => (
                                <div key={member.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                                  <h4 className="font-heading font-bold text-white text-base">{member.name}</h4>
                                  <span className="text-xs font-bold text-accent uppercase tracking-wider block">{member.role}</span>
                                  <p className="text-xs text-gray-400 leading-relaxed">{member.responsibilities}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* NOTICES TAB */}
                      {activeTab === 'notices' && (
                        <motion.div
                          key="notices-tab"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-6"
                        >
                          <h3 className="font-heading text-lg font-black uppercase text-white mb-4">
                            Official Circulars & Notices
                          </h3>
                          
                          {notices.length === 0 ? (
                            <div className="text-center py-16 text-gray-500 text-sm font-heading uppercase tracking-wider">
                              No active circulars.
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {notices.map((not) => (
                                <div key={not.id} className="glass-card rounded-xl p-5 border border-white/5 bg-[#080808]">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-heading text-sm font-black text-white uppercase">{not.title}</h4>
                                    <span className="text-[10px] font-heading font-bold text-gray-500 uppercase tracking-widest">{not.date}</span>
                                  </div>
                                  <p className="font-body text-xs text-gray-400 leading-relaxed">{not.desc}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
