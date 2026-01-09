
import React from 'react';
import { Page, User, EnrolledCourse } from '../types';
import { MOCK_COURSES } from '../constants';
import { BookOpen, Zap, Target, Flame, TrendingUp, Clock, BrainCircuit, Sparkles } from 'lucide-react';

interface HeroProps {
    onSelectCourse: (courseId: string) => void;
    onNavClick: (page: Page) => void;
    user: User;
    enrollments: EnrolledCourse[];
}

const Hero: React.FC<HeroProps> = ({ onSelectCourse, onNavClick, user, enrollments }) => {
  // Current date for streak
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen max-w-7xl">
      {/* 1. Personalized Welcome Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 animate-fade-in gap-6">
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full blur-md opacity-30 animate-pulse"></div>
             <img src={user.avatar} alt="My Avatar" className="w-20 h-20 rounded-full border-4 border-slate-800 relative z-10 shadow-2xl object-cover bg-slate-800" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-cyan-500/20">
                AI Specialized Learner
              </span>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{today}</span>
            </div>
            <h1 className="font-montserrat text-4xl md:text-5xl font-black text-slate-100 flex items-center gap-3">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-sm">
                {user.name}
              </span> 
              <span className="flex items-center gap-1">
                <Sparkles className="text-yellow-400 animate-pulse" size={28} />
              </span>
            </h1>
            <p className="mt-1 text-slate-400 font-medium text-sm">
              Your neural ecosystem is primed. Continue the evolution. 🚀
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 mt-6 md:mt-0 bg-slate-900/40 p-4 rounded-3xl border border-slate-700/50 shadow-inner">
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-orange-400 font-bold text-xl">
              <Flame size={20} className="fill-orange-400" />
              <span>12 Day Streak</span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Mastery Level: {user.level}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Today's Target Section (Spans 2 columns) */}
        <section className="lg:col-span-2 space-y-6">
          <div className="group relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]">
            {/* Soft Glow Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-all duration-700 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-xl text-cyan-400">
                    <Target size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider">Today's Target</h2>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</p>
                  <p className="text-sm font-bold text-cyan-400">High Impact</p>
                </div>
              </div>

              {/* 3. Morphing Target Text */}
              <div className="mb-10 relative h-20">
                <div className="absolute inset-0 flex items-center transition-all duration-500 opacity-100 group-hover:opacity-0 group-hover:-translate-y-4">
                  <h3 className="text-3xl md:text-4xl font-black text-slate-100 font-montserrat tracking-tight">
                    Master Neural Network Architectures
                  </h3>
                </div>
                <div className="absolute inset-0 flex items-center transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                  <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-montserrat tracking-tight">
                    "Pushing limits is the only way to grow." 🚀
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Clock className="text-slate-500" size={18} />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Time Estimate</p>
                    <p className="text-sm font-bold text-slate-200">45 Minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BrainCircuit className="text-slate-500" size={18} />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Core Skill</p>
                    <p className="text-sm font-bold text-slate-200">Deep Learning</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-3">
                  <TrendingUp className="text-slate-500" size={18} />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Next Milestone</p>
                    <p className="text-sm font-bold text-slate-200">AI Specialist Certification</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="absolute bottom-6 right-8 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all hover:scale-110 active:scale-90 shadow-xl group/btn">
              <Zap size={24} className="group-hover/btn:text-cyan-400 transition-colors" />
            </button>
          </div>

          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-3 uppercase tracking-tighter">
              <BookOpen size={20} className="text-cyan-400" />
              Active Sub-Modules
            </h2>
            <button 
              onClick={() => onNavClick('Courses')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest"
            >
              View Full Syllabus &rarr;
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollments.slice(0, 2).map(enrollment => {
              const course = MOCK_COURSES.find(c => c.id === enrollment.courseId);
              if (!course) return null;

              return (
                <div key={course.id} className="group bg-slate-900/40 backdrop-blur-sm border border-slate-700/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/30 hover:shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 bg-slate-800 rounded-2xl text-cyan-400">
                        {React.cloneElement(course.icon as React.ReactElement<any>, { size: 24 })}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{course.difficulty}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 mb-1 leading-tight group-hover:text-cyan-400 transition-colors">{course.title}</h3>
                    <p className="text-slate-500 text-xs mb-6 line-clamp-1">{course.description}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</p>
                      <p className="text-xs font-black text-cyan-400">{enrollment.progress}%</p>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mb-4 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${enrollment.progress}%` }}></div>
                    </div>
                    <button 
                        onClick={() => onSelectCourse(course.id)}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all border border-slate-700/50"
                    >
                        Resume Module
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Side Stats Section */}
        <aside className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Consistency Streak Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Mastery Streak</h3>
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-3xl font-black text-white">12</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Current Days</p>
              </div>
              <div className="h-10 w-[1px] bg-slate-700"></div>
              <div className="text-center">
                <p className="text-3xl font-black text-cyan-400">48</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Max Streak</p>
              </div>
            </div>
            
            <div className="flex justify-between gap-2 mb-2">
               {['M','T','W','T','F','S','S'].map((day, i) => (
                 <div key={i} className={`flex flex-col items-center gap-2 flex-1`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${i < 4 ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                      {i < 4 ? <Flame size={14} className="fill-white" /> : day}
                    </div>
                 </div>
               ))}
            </div>
            <p className="text-center text-[10px] font-medium text-slate-500 mt-4 italic">Next badge: "Unstoppable Learner" in 3 days.</p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Time Studied</p>
                <p className="text-xl font-black text-white">14.2 <span className="text-[10px] text-slate-500">Hrs</span></p>
             </div>
             <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">XP Earned</p>
                <p className="text-xl font-black text-cyan-400">2,450</p>
             </div>
             <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Rank</p>
                <p className="text-xl font-black text-purple-400">Elite IV</p>
             </div>
             <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg Score</p>
                <p className="text-xl font-black text-green-400">92%</p>
             </div>
          </div>

          {/* New Discoveries Card */}
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-3xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3">
               <Sparkles className="text-cyan-400 opacity-20" size={40} />
             </div>
             <h4 className="text-sm font-bold text-white mb-2">Recommended for you</h4>
             <p className="text-xs text-slate-400 mb-4 leading-relaxed">Based on your progress in AI/ML, we recommend exploring <strong>Advanced Computer Vision</strong>.</p>
             <button 
              onClick={() => onNavClick('Courses')}
              className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest"
             >
               Explore Module &rarr;
             </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Hero;
