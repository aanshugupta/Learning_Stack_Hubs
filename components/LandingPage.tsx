
import React from 'react';
import { Sparkles } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <div className="relative z-10">
        <div className="animate-fade-in-down">
          <h1 className="font-montserrat text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-slate-200 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            LearnStackHub
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            The ultimate AI-Powered ecosystem for modern learners. 
            Build your path, master your stack, and join the elite.
          </p>
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={onGetStarted}
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-2xl hover:shadow-cyan-500/50 text-white font-bold text-lg rounded-full transition-all transform hover:scale-110"
          >
            Start Learning
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
          <Sparkles className="absolute top-1/4 left-1/4 w-32 h-32 text-cyan-500 animate-pulse" />
          <Sparkles className="absolute bottom-1/4 right-1/4 w-24 h-24 text-purple-500 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default LandingPage;
