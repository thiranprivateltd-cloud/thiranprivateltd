'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Users, 
  Mail, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Download, 
  Activity, 
  Send, 
  Search,
  Sparkles,
  Calendar,
  UserPlus,
  Trash2,
  Video,
  Clock,
  ExternalLink,
  Ban,
  Check,
  Filter,
  Layers,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminPortal() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('members'); // 'members' | 'activities' | 'attendance' | 'applications' | 'waitlist' | 'circulars'

  // Persistent States
  const [members, setMembers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [notices, setNotices] = useState([]);

  // Member Form State
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPass, setMemberPass] = useState('');
  const [memberResp, setMemberResp] = useState('');

  // Activity Form State
  const [activityMemberId, setActivityMemberId] = useState('');
  const [activityText, setActivityText] = useState('');

  // Meeting Form State
  const [meetingNumber, setMeetingNumber] = useState('');
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split('T')[0]);
  const [meetLink, setMeetLink] = useState('https://meet.google.com/abc-defg-hij');
  const [startTime, setStartTime] = useState('19:00');
  const [endTime, setEndTime] = useState('20:00');

  // Application Form & Filter State
  const [appName, setAppName] = useState('');
  const [appEmail, setAppEmail] = useState('');
  const [appRole, setAppRole] = useState('');
  const [appFilter, setAppFilter] = useState('All');
  const [appSearch, setAppSearch] = useState('');

  // Waitlist / Subscriber Form State
  const [waitName, setWaitName] = useState('');
  const [waitEmail, setWaitEmail] = useState('');
  const [waitLang, setWaitLang] = useState('English');
  const [subEmail, setSubEmail] = useState('');

  // Circular Form State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeDesc, setNoticeDesc] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('thiran_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }

    try {
      const savedMembers = localStorage.getItem('thiran_members');
      if (savedMembers) setMembers(JSON.parse(savedMembers));

      const savedActivities = localStorage.getItem('thiran_activities');
      if (savedActivities) setActivities(JSON.parse(savedActivities));

      const savedMeetings = localStorage.getItem('thiran_meetings');
      if (savedMeetings) setMeetings(JSON.parse(savedMeetings));

      const savedApps = localStorage.getItem('thiran_applications');
      if (savedApps) setApplications(JSON.parse(savedApps));

      const savedWait = localStorage.getItem('thiran_waitlist');
      if (savedWait) setWaitlist(JSON.parse(savedWait));

      const savedSubs = localStorage.getItem('thiran_subscribers');
      if (savedSubs) setSubscribers(JSON.parse(savedSubs));

      const savedNotices = localStorage.getItem('thiran_notices');
      if (savedNotices) setNotices(JSON.parse(savedNotices));
    } catch (err) {
      console.error("Failed to load local storage data", err);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('thiran_members', JSON.stringify(members));
      localStorage.setItem('thiran_activities', JSON.stringify(activities));
      localStorage.setItem('thiran_meetings', JSON.stringify(meetings));
      localStorage.setItem('thiran_applications', JSON.stringify(applications));
      localStorage.setItem('thiran_waitlist', JSON.stringify(waitlist));
      localStorage.setItem('thiran_subscribers', JSON.stringify(subscribers));
      localStorage.setItem('thiran_notices', JSON.stringify(notices));
    }
  }, [members, activities, meetings, applications, waitlist, subscribers, notices, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'thiranadmin2026' || password === 'gsv2026' || password === 'admin2026') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1D9E75', '#F59E0B', '#3B82F6']
      });
      setIsAuthenticated(true);
      setError('');
      setPassword('');
      sessionStorage.setItem('thiran_admin_auth', 'true');
    } else {
      setError('Invalid Master Admin Credentials. Access Denied.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('thiran_admin_auth');
  };

  // ADD MEMBER WITH CREDENTIALS
  const handleAddMember = (e) => {
    e.preventDefault();
    if (memberName && memberRole && memberEmail && memberPass) {
      const newMember = {
        id: `MEM-${Date.now()}`,
        name: memberName,
        role: memberRole,
        email: memberEmail.toLowerCase().trim(),
        password: memberPass,
        responsibilities: memberResp || 'Ecosystem Operations'
      };
      setMembers([...members, newMember]);
      
      // Auto log activity
      logActivity(newMember.name, `Joined Thiran Team Roster as ${memberRole}`);

      setMemberName('');
      setMemberRole('');
      setMemberEmail('');
      setMemberPass('');
      setMemberResp('');
    }
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  // MEMBER ACTIVITIES LOGGING
  const logActivity = (memberName, text) => {
    const newAct = {
      id: `ACT-${Date.now()}`,
      memberName: memberName || 'Executive Admin',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0]
    };
    setActivities([newAct, ...activities]);
  };

  const handleAddManualActivity = (e) => {
    e.preventDefault();
    if (activityMemberId && activityText) {
      const targetMember = members.find(m => m.id === activityMemberId);
      logActivity(targetMember ? targetMember.name : 'Team Member', activityText);
      setActivityText('');
    }
  };

  // APPLICATIONS MANAGEMENT (Declined, Shortlisted, Pending, Accepted)
  const handleAddApplication = (e) => {
    e.preventDefault();
    if (appName && appEmail && appRole) {
      const newApp = {
        id: `APP-${Date.now()}`,
        name: appName,
        email: appEmail,
        role: appRole,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending'
      };
      setApplications([newApp, ...applications]);
      setAppName('');
      setAppEmail('');
      setAppRole('');
    }
  };

  const handleUpdateAppStatus = (id, newStatus) => {
    setApplications(applications.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const handleDeleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const filteredApps = applications.filter(app => {
    const matchesFilter = appFilter === 'All' || app.status === appFilter;
    const matchesSearch = app.name.toLowerCase().includes(appSearch.toLowerCase()) || 
                          app.role.toLowerCase().includes(appSearch.toLowerCase()) ||
                          app.email.toLowerCase().includes(appSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // WAITLIST & SUBSCRIBERS MANAGEMENT
  const handleAddWaitlist = (e) => {
    e.preventDefault();
    if (waitEmail) {
      const newEntry = {
        id: `WAIT-${Date.now()}`,
        name: waitName || 'Student',
        email: waitEmail,
        language: waitLang,
        date: new Date().toISOString().split('T')[0]
      };
      setWaitlist([newEntry, ...waitlist]);
      setWaitName('');
      setWaitEmail('');
    }
  };

  const handleAddSubscriber = (e) => {
    e.preventDefault();
    if (subEmail) {
      const newSub = {
        id: `SUB-${Date.now()}`,
        email: subEmail,
        date: new Date().toISOString().split('T')[0],
        source: 'Admin Add'
      };
      setSubscribers([newSub, ...subscribers]);
      setSubEmail('');
    }
  };

  // ADD MEETING WITH GOOGLE MEET
  const handleAddMeeting = (e) => {
    e.preventDefault();
    if (meetingNumber) {
      const initialLogs = {};
      members.forEach(m => {
        initialLogs[m.id] = {
          status: 'NA',
          entryTime: '-',
          exitTime: '-',
          durationMinutes: 0
        };
      });

      const newMeeting = {
        id: `MEET-${Date.now()}`,
        number: meetingNumber.startsWith('#') ? meetingNumber : `#${meetingNumber}`,
        date: meetingDate,
        meetLink: meetLink || 'https://meet.google.com',
        startTime: startTime || '19:00',
        endTime: endTime || '20:00',
        status: 'Active',
        logs: initialLogs
      };

      setMeetings([newMeeting, ...meetings]);
      logActivity('Admin', `Scheduled ${newMeeting.number} for ${meetingDate}`);
      setMeetingNumber('');
    }
  };

  const handleEndMeeting = (meetingId) => {
    setMeetings(meetings.map(meet => {
      if (meet.id === meetingId) {
        const updatedLogs = { ...meet.logs };
        Object.keys(updatedLogs).forEach(mId => {
          const log = updatedLogs[mId];
          if (log.entryTime !== '-' && log.durationMinutes >= 1) {
            log.status = 'Present';
          } else if (log.status !== 'Present') {
            log.status = 'Absent';
          }
        });
        return { ...meet, status: 'Ended', logs: updatedLogs };
      }
      return meet;
    }));
  };

  const handleUpdateLogStatus = (meetingId, memberId, newStatus) => {
    setMeetings(meetings.map(meet => {
      if (meet.id === meetingId) {
        const currentLog = meet.logs?.[memberId] || { entryTime: '-', exitTime: '-', durationMinutes: 0 };
        
        let entry = currentLog.entryTime;
        let exit = currentLog.exitTime;
        let duration = currentLog.durationMinutes;

        if (newStatus === 'Present') {
          if (entry === '-' || !entry) entry = meet.startTime || '09:00 AM';
          if (exit === '-' || !exit) exit = meet.endTime || '10:00 AM';
          if (duration === 0) duration = 60;
        } else if (newStatus === 'Absent' || newStatus === 'NA') {
          entry = '-';
          exit = '-';
          duration = 0;
        }

        return {
          ...meet,
          logs: {
            ...meet.logs,
            [memberId]: {
              status: newStatus,
              entryTime: entry,
              exitTime: exit,
              durationMinutes: duration
            }
          }
        };
      }
      return meet;
    }));
  };

  const handleDeleteMeeting = (id) => {
    setMeetings(meetings.filter(m => m.id !== id));
  };

  // EXPORT CSV HELPERS (Using Blob + UTF-8 BOM to prevent # character URL truncation in Excel)
  const handleExportAttendanceCSV = () => {
    if (meetings.length === 0) return;
    let csv = "Meeting Number,Date,Member Name,Role,Email,Status,Entry Time,Exit Time,Duration (Mins)\n";
    meetings.forEach(meet => {
      members.forEach(member => {
        const log = meet.logs?.[member.id] || { status: 'NA', entryTime: '-', exitTime: '-', durationMinutes: 0 };
        csv += `"${meet.number}","${meet.date}","${member.name}","${member.role}","${member.email || '-'}","${log.status}","${log.entryTime}","${log.exitTime}","${log.durationMinutes} mins"\n`;
      });
    });
    downloadCSV(csv, `Attendance_Report_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleExportWaitlistCSV = () => {
    if (waitlist.length === 0 && subscribers.length === 0) return;
    let csv = "Type,Name/Email,Date,Details\n";
    waitlist.forEach(w => { csv += `"Waitlist","${w.name} (${w.email})","${w.date}","Lang: ${w.language}"\n`; });
    subscribers.forEach(s => { csv += `"Newsletter","${s.email}","${s.date}","Source: ${s.source}"\n`; });
    downloadCSV(csv, `Waitlist_Subscribers_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const downloadCSV = (rawCsvText, fileName) => {
    const blob = new Blob(["\uFEFF" + rawCsvText], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // CIRCULAR MANAGEMENT
  const handleAddNotice = (e) => {
    e.preventDefault();
    if (noticeTitle && noticeDesc) {
      const newNotice = {
        id: `CIRC-${Date.now()}`,
        title: noticeTitle,
        desc: noticeDesc,
        date: new Date().toISOString().split('T')[0]
      };
      setNotices([newNotice, ...notices]);
      setNoticeTitle('');
      setNoticeDesc('');
    }
  };

  return (
    <div className="min-h-screen py-24 relative overflow-hidden bg-[#070707] text-white font-body">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            
            /* LOGIN CARD */
            <motion.div
              key="admin-login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto py-16"
            >
              <div className="glass-panel rounded-3xl p-8 md:p-10 border border-teal-500/30 bg-[#0A0A0A]/90 text-center space-y-6 shadow-[0_0_50px_rgba(20,184,166,0.15)]">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-700 rounded-2xl flex items-center justify-center border border-white/20 shadow-lg mb-4">
                    <ShieldCheck className="w-8 h-8 text-black" />
                  </div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/10 text-teal-400 text-[10px] font-heading font-bold uppercase tracking-widest mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Executive Access</span>
                  </div>
                  <h1 className="font-heading text-2xl font-black text-white uppercase tracking-tight">
                    Admin Portal
                  </h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  <div>
                    <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-2">
                      Master Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-teal-500 text-xs transition-colors"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-xs text-red-400 font-bold uppercase bg-red-950/40 border border-red-500/30 px-3.5 py-2.5 rounded-xl">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-heading font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-teal-500/20"
                  >
                    Authenticate Admin
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            
            /* MAIN DASHBOARD VIEW */
            <motion.div
              key="admin-dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Header Bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center glass-panel rounded-3xl p-6 md:p-8 gap-4 border border-teal-500/30">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-700 rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                    <ShieldCheck className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                      Executive Admin Dashboard
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Applications, Waitlists, Member Activities, Credentials & Attendance
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-heading font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Exit</span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-white/10">
                <button
                  onClick={() => setActiveTab('members')}
                  className={`px-5 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'members' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Members ({members.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('activities')}
                  className={`px-5 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'activities' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>Member Activities ({activities.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-5 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'applications' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Applications ({applications.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('waitlist')}
                  className={`px-5 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'waitlist' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Waitlists & Subscriptions</span>
                </button>

                <button
                  onClick={() => setActiveTab('attendance')}
                  className={`px-5 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'attendance' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Google Meet & Time Logs</span>
                </button>

                <button
                  onClick={() => setActiveTab('circulars')}
                  className={`px-5 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'circulars' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Circulars ({notices.length})</span>
                </button>
              </div>

              {/* TAB PANELS */}
              <AnimatePresence mode="wait">
                
                {/* 1. MEMBERS TAB */}
                {activeTab === 'members' && (
                  <motion.div key="tab-members" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-teal-500/30 space-y-6">
                      <h3 className="font-heading font-black text-lg uppercase text-white">Add Team Member</h3>

                      <form onSubmit={handleAddMember} className="space-y-4">
                        <div>
                          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Full Name</label>
                          <input type="text" required value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="e.g. Brundavanam P" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500" />
                        </div>

                        <div>
                          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Role / Position</label>
                          <input type="text" required value={memberRole} onChange={(e) => setMemberRole(e.target.value)} placeholder="e.g. Project Manager" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Email / Login ID</label>
                            <input type="email" required value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} placeholder="brundavanam@thiran.in" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500" />
                          </div>

                          <div>
                            <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Password</label>
                            <input type="text" required value={memberPass} onChange={(e) => setMemberPass(e.target.value)} placeholder="Set password..." className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500" />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Roles & Responsibilities</label>
                          <textarea rows="2" value={memberResp} onChange={(e) => setMemberResp(e.target.value)} placeholder="Describe responsibilities..." className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500" />
                        </div>

                        <button type="submit" className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-heading font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2">
                          <Plus className="w-4 h-4" />
                          <span>Add Team Member</span>
                        </button>
                      </form>
                    </div>

                    <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                      <h3 className="font-heading font-black text-lg uppercase text-white">Company Team Roster</h3>

                      {members.length === 0 ? (
                        <div className="text-center py-16 text-gray-500 text-sm font-heading uppercase tracking-wider">
                          No members added yet. Use the form to populate your team.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {members.map((member) => (
                            <div key={member.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex justify-between items-start">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-heading font-bold text-white text-base">{member.name}</h4>
                                  <span className="px-2 py-0.5 rounded text-[9px] font-heading font-bold uppercase bg-teal-500/10 text-teal-400 border border-teal-500/20">{member.role}</span>
                                </div>
                                <div className="text-xs text-gray-400 flex items-center space-x-3 mt-1">
                                  <span>📧 {member.email}</span>
                                  <span>🔑 Pass: <code className="bg-white/10 px-1.5 py-0.5 rounded text-amber-300 font-mono">{member.password}</code></span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{member.responsibilities}</p>
                              </div>

                              <button onClick={() => handleDeleteMember(member.id)} className="text-gray-500 hover:text-red-400 transition-colors p-1" title="Remove Account">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 2. MEMBER ACTIVITIES TAB */}
                {activeTab === 'activities' && (
                  <motion.div key="tab-activities" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Log Activity Form */}
                    <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-teal-500/30 space-y-6">
                      <h3 className="font-heading font-black text-lg uppercase text-white">Log Member Activity</h3>

                      <form onSubmit={handleAddManualActivity} className="space-y-4">
                        <div>
                          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Select Team Member</label>
                          <select value={activityMemberId} onChange={(e) => setActivityMemberId(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500">
                            <option value="" disabled>Select a member...</option>
                            {members.map(m => (
                              <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Activity / Task Performed</label>
                          <textarea rows="3" required value={activityText} onChange={(e) => setActivityText(e.target.value)} placeholder="e.g. Completed NextStep UI review & logged into portal" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500" />
                        </div>

                        <button type="submit" className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-heading font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2">
                          <Plus className="w-4 h-4" />
                          <span>Record Activity</span>
                        </button>
                      </form>
                    </div>

                    {/* Activity Feed */}
                    <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                      <h3 className="font-heading font-black text-lg uppercase text-white">Live Member Activity Feed</h3>

                      {activities.length === 0 ? (
                        <div className="text-center py-16 text-gray-500 text-sm font-heading uppercase tracking-wider">
                          No member activity logged yet.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {activities.map((act) => (
                            <div key={act.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start space-x-3">
                              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                                <Activity className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-heading font-bold text-white text-sm">{act.memberName}</h4>
                                  <span className="text-[10px] font-mono text-gray-500">{act.date} • {act.timestamp}</span>
                                </div>
                                <p className="text-xs text-gray-300 mt-1">{act.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 3. NEW APPLICATIONS TAB (Declined, Shortlisted, Pending, Accepted) */}
                {activeTab === 'applications' && (
                  <motion.div key="tab-applications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                    {/* Add Application & Controls Bar */}
                    <div className="glass-panel p-6 rounded-3xl border border-teal-500/30 space-y-4">
                      <h3 className="font-heading font-black text-lg uppercase text-white">Add New Candidate Application</h3>

                      <form onSubmit={handleAddApplication} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <input type="text" required value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="Applicant Name" className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                        <input type="email" required value={appEmail} onChange={(e) => setAppEmail(e.target.value)} placeholder="Applicant Email" className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                        <input type="text" required value={appRole} onChange={(e) => setAppRole(e.target.value)} placeholder="Role (e.g. Frontend Dev)" className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                        
                        <button type="submit" className="py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-heading font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-1.5">
                          <Plus className="w-4 h-4" />
                          <span>Add Application</span>
                        </button>
                      </form>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="relative w-full md:w-80">
                        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                        <input type="text" value={appSearch} onChange={(e) => setAppSearch(e.target.value)} placeholder="Search candidate name, role..." className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white" />
                      </div>

                      <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
                        {['All', 'Pending', 'Shortlisted', 'Accepted', 'Declined'].map(status => (
                          <button key={status} onClick={() => setAppFilter(status)} className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer ${appFilter === status ? 'bg-white/20 text-white border border-white/30' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Applications Table */}
                    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
                      {filteredApps.length === 0 ? (
                        <div className="text-center py-16 text-gray-500 text-sm font-heading uppercase tracking-wider">
                          No applications found for current filter.
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs md:text-sm font-body text-gray-300">
                            <thead>
                              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-heading uppercase text-[10px] tracking-wider">
                                <th className="p-4">App ID</th>
                                <th className="p-4">Candidate</th>
                                <th className="p-4">Applied Role</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Current Status</th>
                                <th className="p-4 text-right">Update Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredApps.map((app) => (
                                <tr key={app.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                  <td className="p-4 font-mono text-xs text-teal-400 font-bold">{app.id}</td>
                                  <td className="p-4">
                                    <div className="font-bold text-white">{app.name}</div>
                                    <div className="text-[11px] text-gray-500">{app.email}</div>
                                  </td>
                                  <td className="p-4 text-gray-300 font-medium">{app.role}</td>
                                  <td className="p-4 text-gray-500 text-xs">{app.date}</td>
                                  <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider ${
                                      app.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                      app.status === 'Shortlisted' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                                      app.status === 'Declined' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                                      'bg-white/10 text-gray-400 border border-white/10'
                                    }`}>
                                      {app.status}
                                    </span>
                                  </td>
                                  <td className="p-4 text-right space-x-1.5">
                                    <button onClick={() => handleUpdateAppStatus(app.id, 'Shortlisted')} className={`px-2 py-1 rounded text-[9px] font-bold ${app.status === 'Shortlisted' ? 'bg-amber-500 text-black' : 'bg-white/5 text-amber-300'}`}>Shortlist</button>
                                    <button onClick={() => handleUpdateAppStatus(app.id, 'Accepted')} className={`px-2 py-1 rounded text-[9px] font-bold ${app.status === 'Accepted' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-emerald-300'}`}>Accept</button>
                                    <button onClick={() => handleUpdateAppStatus(app.id, 'Declined')} className={`px-2 py-1 rounded text-[9px] font-bold ${app.status === 'Declined' ? 'bg-red-500 text-white' : 'bg-white/5 text-red-400'}`}>Decline</button>
                                    <button onClick={() => handleDeleteApplication(app.id)} className="p-1 text-gray-500 hover:text-red-400 ml-2" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 4. WAITLISTS & SUBSCRIPTIONS TAB */}
                {activeTab === 'waitlist' && (
                  <motion.div key="tab-waitlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="font-heading font-black text-lg uppercase text-white">Waitlists & Newsletter Network</h3>
                      <button onClick={handleExportWaitlistCSV} className="px-4 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-2">
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* NextStep Waitlist */}
                      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                        <h4 className="font-heading font-black text-base uppercase text-teal-400">NextStep Waitlist ({waitlist.length})</h4>

                        <form onSubmit={handleAddWaitlist} className="flex gap-2">
                          <input type="text" value={waitName} onChange={(e) => setWaitName(e.target.value)} placeholder="Student Name" className="w-1/3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                          <input type="email" required value={waitEmail} onChange={(e) => setWaitEmail(e.target.value)} placeholder="Email" className="w-1/2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                          <button type="submit" className="px-4 py-2 rounded-xl bg-teal-500 text-black font-bold text-xs">Add</button>
                        </form>

                        <div className="space-y-2">
                          {waitlist.length === 0 ? <p className="text-gray-500 text-xs py-6 text-center">No waitlist entries yet.</p> : (
                            waitlist.map(w => (
                              <div key={w.id} className="p-3 rounded-xl bg-white/5 flex justify-between items-center text-xs">
                                <div><strong className="text-white">{w.name}</strong> <span className="text-gray-400">({w.email})</span></div>
                                <span className="text-gray-500">{w.date}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Newsletter Subscriptions */}
                      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                        <h4 className="font-heading font-black text-base uppercase text-amber-400">Newsletter Subscribers ({subscribers.length})</h4>

                        <form onSubmit={handleAddSubscriber} className="flex gap-2">
                          <input type="email" required value={subEmail} onChange={(e) => setSubEmail(e.target.value)} placeholder="Subscriber Email" className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                          <button type="submit" className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs">Add</button>
                        </form>

                        <div className="space-y-2">
                          {subscribers.length === 0 ? <p className="text-gray-500 text-xs py-6 text-center">No newsletter subscribers yet.</p> : (
                            subscribers.map(s => (
                              <div key={s.id} className="p-3 rounded-xl bg-white/5 flex justify-between items-center text-xs">
                                <span className="text-white font-bold">{s.email}</span>
                                <span className="text-gray-500">{s.date}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 5. GOOGLE MEET & ATTENDANCE TAB */}
                {activeTab === 'attendance' && (
                  <motion.div key="tab-attendance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                    <div className="glass-panel p-6 rounded-3xl border border-teal-500/30 space-y-4">
                      <h3 className="font-heading font-black text-lg uppercase text-white">Create Google Meet Session</h3>

                      <form onSubmit={handleAddMeeting} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Meeting #</label>
                          <input type="text" required value={meetingNumber} onChange={(e) => setMeetingNumber(e.target.value)} placeholder="Meeting #1" className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                        </div>

                        <div>
                          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Date</label>
                          <input type="date" required value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                        </div>

                        <div>
                          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Google Meet URL</label>
                          <input type="url" required value={meetLink} onChange={(e) => setMeetLink(e.target.value)} placeholder="https://meet.google.com/..." className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                        </div>

                        <div>
                          <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-gray-400 block mb-1">Start & End Time</label>
                          <div className="flex space-x-1">
                            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-1/2 px-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-1/2 px-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                          </div>
                        </div>

                        <button type="submit" className="mt-auto py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-heading font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-1.5">
                          <Plus className="w-4 h-4" />
                          <span>Schedule Meet</span>
                        </button>
                      </form>
                    </div>

                    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="font-heading font-black text-lg uppercase text-white">Google Meet Attendance & Entry/Exit Logs</h3>
                        <button onClick={handleExportAttendanceCSV} disabled={meetings.length === 0} className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center space-x-2">
                          <Download className="w-3.5 h-3.5" />
                          <span>Export CSV</span>
                        </button>
                      </div>

                      {meetings.length === 0 ? <p className="text-center py-16 text-gray-500 text-sm">No Google Meet sessions scheduled yet.</p> : (
                        <div className="space-y-6">
                          {meetings.map((meet) => (
                            <div key={meet.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-heading font-bold text-white text-lg">{meet.number} ({meet.date})</h4>
                                {meet.status === 'Active' && (
                                  <button onClick={() => handleEndMeeting(meet.id)} className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold">End Meet</button>
                                )}
                              </div>

                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse text-xs font-body text-gray-300">
                                  <thead>
                                    <tr className="border-b border-white/10 text-gray-500 font-heading uppercase text-[10px]">
                                      <th className="py-2">Member</th>
                                      <th className="py-2">Entry Time</th>
                                      <th className="py-2">Exit Time</th>
                                      <th className="py-2">Duration</th>
                                      <th className="py-2">Status</th>
                                      <th className="py-2 text-right">Manual Override</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {members.map(member => {
                                      const log = meet.logs?.[member.id] || { status: 'NA', entryTime: '-', exitTime: '-', durationMinutes: 0 };
                                      return (
                                        <tr key={member.id} className="border-b border-white/5">
                                          <td className="py-3 font-bold text-white">{member.name}</td>
                                          <td className="py-3 text-teal-400 font-mono">{log.entryTime}</td>
                                          <td className="py-3 text-amber-400 font-mono">{log.exitTime}</td>
                                          <td className="py-3 font-bold text-white">{log.durationMinutes} mins</td>
                                          <td className="py-3">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${log.status === 'Present' ? 'bg-emerald-500/20 text-emerald-300' : log.status === 'Absent' ? 'bg-red-500/20 text-red-300' : 'bg-white/5 text-gray-500'}`}>{log.status}</span>
                                          </td>
                                          <td className="py-3 text-right space-x-1">
                                            <button onClick={() => handleUpdateLogStatus(meet.id, member.id, 'Present')} className="px-2 py-1 rounded text-[9px] font-bold bg-white/5 hover:bg-emerald-500 hover:text-black">P</button>
                                            <button onClick={() => handleUpdateLogStatus(meet.id, member.id, 'Absent')} className="px-2 py-1 rounded text-[9px] font-bold bg-white/5 hover:bg-red-500 hover:text-white">A</button>
                                            <button onClick={() => handleUpdateLogStatus(meet.id, member.id, 'NA')} className="px-2 py-1 rounded text-[9px] font-bold bg-white/5 hover:bg-gray-600 hover:text-white">NA</button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 6. CIRCULARS TAB */}
                {activeTab === 'circulars' && (
                  <motion.div key="tab-circulars" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-teal-500/30 space-y-6">
                      <h3 className="font-heading font-black text-lg uppercase text-white">Broadcast Circular</h3>

                      <form onSubmit={handleAddNotice} className="space-y-4">
                        <input type="text" required value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} placeholder="Title" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                        <textarea rows="4" required value={noticeDesc} onChange={(e) => setNoticeDesc(e.target.value)} placeholder="Description..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white" />
                        <button type="submit" className="w-full py-3.5 rounded-xl bg-teal-500 text-black font-heading font-bold text-xs uppercase">Publish Circular</button>
                      </form>
                    </div>

                    <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                      <h3 className="font-heading font-black text-lg uppercase text-white">Circulars</h3>

                      {notices.map((not) => (
                        <div key={not.id} className="p-4 rounded-2xl bg-white/5 flex justify-between items-start">
                          <div>
                            <span className="text-xs text-teal-400 font-mono">{not.date}</span>
                            <h4 className="font-bold text-white text-sm mt-1">{not.title}</h4>
                            <p className="text-xs text-gray-400 mt-1">{not.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
