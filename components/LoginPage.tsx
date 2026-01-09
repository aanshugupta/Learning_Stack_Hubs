
import React, { useState } from 'react';
import { User, Shield, Key, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (role: 'user' | 'admin', username?: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'user' && !username.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(activeTab, username || (activeTab === 'user' ? 'Alex Doe' : 'Admin User'));
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-2xl mb-4 border border-slate-700 shadow-inner">
             <Sparkles className="text-cyan-400" size={32} />
          </div>
          <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">LearnStackHub</h1>
          <p className="text-slate-400 text-sm mt-1">Intelligent Learning Ecosystem</p>
        </div>
        <div className="mb-8">
          <div className="flex bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/50 shadow-inner">
            <button onClick={() => setActiveTab('user')} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'user' ? 'bg-slate-700 text-cyan-400 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}><User size={16} className="inline mr-2" /> User</button>
            <button onClick={() => setActiveTab('admin')} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'admin' ? 'bg-slate-700 text-purple-400 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}><Shield size={16} className="inline mr-2" /> Admin</button>
          </div>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={activeTab === 'user' ? "Enter your name" : "Admin ID"} required className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3.5 px-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" />
          <input type="password" placeholder="Password" required className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3.5 px-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" />
          <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3">
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Fix: Added missing default export for LoginPage
export default LoginPage;
