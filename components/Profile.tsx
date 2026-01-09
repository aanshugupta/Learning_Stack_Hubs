
import React, { useMemo, useState, useRef } from 'react';
import { 
  User as UserIcon, BookOpen, Target, CheckCircle, Clock, 
  TrendingUp, Award, Zap, BrainCircuit, Calendar, 
  BarChart3, Sparkles, ArrowRight, ShieldCheck, Flame, Edit3, Save, X, Camera, Upload, Grid
} from 'lucide-react';
import type { User, EnrolledCourse, Page } from '../types';
import { MOCK_COURSES } from '../constants';

interface ProfileProps {
  user: User;
  onUpdateUser: (user: User) => void;
  enrollments: EnrolledCourse[];
  onNavClick?: (page: Page) => void;
  onSelectCourse?: (courseId: string) => void;
}

const PREDEFINED_AVATARS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Learn',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper'
];

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, enrollments, onNavClick, onSelectCourse }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [showAvatarGallery, setShowAvatarGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const learningStats = useMemo(() => {
    if (enrollments.length === 0) return { overallProgress: 0, completed: 0, inProgress: 0 };
    const total = enrollments.reduce((sum, e) => sum + e.progress, 0);
    return { 
      overallProgress: Math.round(total / enrollments.length), 
      completed: enrollments.filter(e => e.progress === 100).length, 
      inProgress: enrollments.filter(e => e.progress < 100).length 
    };
  }, [enrollments]);

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
    setShowAvatarGallery(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPredefinedAvatar = (url: string) => {
    setEditedUser(prev => ({ ...prev, avatar: url }));
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-8 shadow-2xl relative">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <img 
                  src={isEditing ? editedUser.avatar : user.avatar} 
                  alt="Avatar" 
                  className={`w-32 h-32 rounded-full border-4 ${isEditing ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'border-slate-800'} bg-slate-800 object-cover transition-all duration-500`} 
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-cyan-500 rounded-full text-white hover:scale-110 transition-transform shadow-lg">
                      <Camera size={18} />
                    </button>
                    <button onClick={() => setShowAvatarGallery(!showAvatarGallery)} className="p-2 bg-purple-500 rounded-full text-white hover:scale-110 transition-transform shadow-lg">
                      <Grid size={18} />
                    </button>
                  </div>
                )}
              </div>
              {isEditing && (
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest animate-pulse">Change Avatar</span>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
            
            <div className="text-center md:text-left flex-grow space-y-2">
               {isEditing ? (
                 <div className="space-y-4 max-w-md">
                   <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Display Name</label>
                    <input 
                      className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-2xl font-black w-full focus:ring-2 focus:ring-cyan-500 outline-none mt-1 transition-all" 
                      value={editedUser.name} 
                      onChange={e => setEditedUser({...editedUser, name: e.target.value})} 
                      placeholder="Full Name"
                    />
                   </div>
                   <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Learning Role</label>
                    <input 
                      className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-slate-300 text-sm w-full block focus:ring-2 focus:ring-cyan-500 outline-none mt-1" 
                      value={editedUser.role} 
                      onChange={e => setEditedUser({...editedUser, role: e.target.value})} 
                      placeholder="Role (e.g. AI Specialist)"
                    />
                   </div>
                 </div>
               ) : (
                 <>
                   <h1 className="text-4xl font-black text-white font-montserrat tracking-tight">{user.name}</h1>
                   <p className="text-cyan-400 font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                     <ShieldCheck size={14} /> {user.role}
                   </p>
                 </>
               )}
               <p className="text-slate-400 text-sm">{user.email}</p>
            </div>
            
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave} 
                    className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black shadow-xl shadow-cyan-900/30 transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Save size={20} /> Save Changes
                  </button>
                  <button 
                    onClick={() => { setIsEditing(false); setEditedUser(user); setShowAvatarGallery(false); }} 
                    className="flex items-center gap-2 px-8 py-3 bg-slate-800 text-white rounded-2xl font-black border border-slate-700 hover:bg-slate-700 transition-all"
                  >
                    <X size={20} /> Cancel
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="flex items-center gap-2 px-8 py-3 bg-slate-800 text-slate-300 rounded-2xl font-black border border-slate-700 hover:bg-slate-700 hover:text-white transition-all shadow-lg"
                >
                  <Edit3 size={20} /> Manage Profile
                </button>
              )}
            </div>
          </div>

          {/* Avatar Selection Grid */}
          {isEditing && showAvatarGallery && (
            <div className="mt-8 p-6 bg-slate-800/60 rounded-3xl border border-slate-700 animate-fade-in">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Select an Avatar Gallery</h3>
              <div className="flex flex-wrap gap-4">
                {PREDEFINED_AVATARS.map((url, i) => (
                  <button 
                    key={i} 
                    onClick={() => selectPredefinedAvatar(url)}
                    className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all hover:scale-110 ${editedUser.avatar === url ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-slate-700 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={url} alt={`Avatar option ${i}`} className="w-full h-full object-cover" />
                    {editedUser.avatar === url && (
                      <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center">
                        <CheckCircle size={24} className="text-cyan-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Snapshot Stats */}
            <div className="bg-slate-900/40 border border-slate-700/50 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp size={120} />
              </div>
              <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 uppercase tracking-tighter">
                <BarChart3 size={20} className="text-cyan-400" /> Mastery Progress
              </h2>
              <div className="w-full bg-slate-800 rounded-full h-4 mb-8 overflow-hidden shadow-inner border border-slate-700/50">
                <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 h-full transition-all duration-1000 shadow-[0_0_15px_rgba(34,211,238,0.4)]" style={{ width: `${learningStats.overallProgress}%` }}></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/30 text-center">
                  <p className="text-4xl font-black text-white">{learningStats.overallProgress}%</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Overall Mastery</p>
                </div>
                <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/30 text-center">
                  <p className="text-4xl font-black text-white">{learningStats.completed}</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Courses Done</p>
                </div>
                <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/30 text-center">
                  <p className="text-4xl font-black text-white">{learningStats.inProgress}</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Active Modules</p>
                </div>
              </div>
            </div>

            {/* Active Enrollments */}
            <div className="bg-slate-900/40 border border-slate-700/50 rounded-3xl p-8">
               <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 uppercase tracking-tighter">
                <Flame size={20} className="text-orange-400" /> Current Trajectory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrollments.length > 0 ? enrollments.map(e => {
                  const course = MOCK_COURSES.find(c => c.id === e.courseId);
                  if (!course) return null;
                  return (
                    <div key={e.courseId} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-3xl group hover:border-cyan-400/50 transition-all hover:bg-slate-800 shadow-lg">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-slate-900 rounded-2xl text-cyan-400 group-hover:scale-110 transition-transform">
                          {React.cloneElement(course.icon as React.ReactElement<any>, { size: 24 })}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">{course.title}</h4>
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{course.category}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Step {Math.floor(e.progress / 10)}</span>
                        <span className="text-sm font-black text-cyan-400">{e.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-1000 shadow-sm" style={{ width: `${e.progress}%` }}></div>
                      </div>
                      <button 
                        onClick={() => onSelectCourse?.(course.id)}
                        className="mt-6 w-full py-3 bg-slate-700 hover:bg-cyan-600 hover:text-white text-slate-200 text-xs font-black rounded-2xl transition-all uppercase tracking-widest border border-slate-600"
                      >
                        Resume Module
                      </button>
                    </div>
                  );
                }) : (
                  <div className="col-span-full p-12 text-center bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
                    <p className="text-slate-500 font-bold">No active enrollments found. Explore the course catalog to begin.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            {/* Learning Insights Card */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-3xl p-8 space-y-6 shadow-2xl">
              <h2 className="text-lg font-bold text-white uppercase tracking-tighter flex items-center gap-3">
                <Sparkles size={18} className="text-yellow-400" /> Learning Analytics
              </h2>
              <div className="space-y-4">
                {/* Study Time */}
                <div className="flex flex-col gap-1 p-5 bg-slate-800/40 rounded-3xl border border-slate-700/30 transition-all hover:bg-slate-800/60">
                  <span className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-1">
                    <Clock size={12} className="text-cyan-400" /> Total Study Time
                  </span>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input 
                        className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-white text-sm font-bold focus:ring-2 focus:ring-cyan-500 outline-none w-full" 
                        value={editedUser.analytics.studyTimeThisWeek} 
                        onChange={e => setEditedUser({...editedUser, analytics: {...editedUser.analytics, studyTimeThisWeek: e.target.value}})} 
                        placeholder="e.g. 14.2 Hours"
                      />
                    </div>
                  ) : (
                    <span className="text-2xl font-black text-white">{user.analytics.studyTimeThisWeek}</span>
                  )}
                </div>

                {/* Best Day */}
                <div className="flex flex-col gap-1 p-5 bg-slate-800/40 rounded-3xl border border-slate-700/30 transition-all hover:bg-slate-800/60">
                  <span className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2 mb-1">
                    <Calendar size={12} className="text-purple-400" /> Prime Productivity Day
                  </span>
                  {isEditing ? (
                    <select 
                      className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-white text-sm font-bold focus:ring-2 focus:ring-cyan-500 outline-none w-full"
                      value={editedUser.analytics.bestStudyDay}
                      onChange={e => setEditedUser({...editedUser, analytics: {...editedUser.analytics, bestStudyDay: e.target.value}})}
                    >
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'N/A'].map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-2xl font-black text-white">{user.analytics.bestStudyDay}</span>
                  )}
                </div>

                {/* Consistency Slider */}
                <div className="flex flex-col gap-1 p-5 bg-slate-800/40 rounded-3xl border border-slate-700/30 transition-all hover:bg-slate-800/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                      <TrendingUp size={12} className="text-orange-400" /> Focus Consistency
                    </span>
                    <span className="text-lg font-black text-cyan-400">{isEditing ? editedUser.analytics.consistencyScore : user.analytics.consistencyScore}%</span>
                  </div>
                  {isEditing ? (
                    <input 
                      type="range" 
                      min="0" 
                      max="100"
                      className="w-full mt-4 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                      value={editedUser.analytics.consistencyScore} 
                      onChange={e => setEditedUser({...editedUser, analytics: {...editedUser.analytics, consistencyScore: parseInt(e.target.value)}})} 
                    />
                  ) : (
                    <div className="w-full bg-slate-700 rounded-full h-1.5 mt-4 overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full shadow-[0_0_15px_rgba(250,204,21,0.4)]" style={{ width: `${user.analytics.consistencyScore}%` }}></div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[9px] text-slate-500 italic px-2 leading-relaxed">
                * Analytics represent your synaptic activity within the LearnStackHub ecosystem. Manage wisely.
              </p>
            </div>

            {/* Achievement Badges */}
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-3xl p-8 text-center shadow-xl">
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Neural Achievements</h2>
              <div className="grid grid-cols-4 gap-4">
                {[Zap, Award, ShieldCheck, BrainCircuit].map((Icon, i) => (
                  <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${i < 2 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800 text-slate-600 border border-slate-700 opacity-40 grayscale'}`}>
                    <Icon size={20} />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Profile;
