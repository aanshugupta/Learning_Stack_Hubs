
import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Course, Topic } from '../types';
import { 
  ArrowLeft, CheckCircle, ChevronLeft, ChevronRight, 
  Circle, Play, Terminal, RotateCcw, BookOpen, 
  Code2, AlertCircle, HelpCircle, Trophy, Sparkles, Lock, Clock, Info, ShieldCheck, IndianRupee, Zap, Star, Loader2, CreditCard, Cpu, MessageCircle, BrainCircuit
} from 'lucide-react';
// @ts-ignore
import confetti from 'canvas-confetti';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onAwardCertificate: (courseName: string) => void;
  isUnlocked: boolean;
  onUnlock: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onAwardCertificate, isUnlocked, onUnlock }) => {
  const [activeTopic, setActiveTopic] = useState<Topic>(course.topics[0]);
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [userCode, setUserCode] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [challengeResult, setChallengeResult] = useState<'none' | 'success' | 'fail'>('none');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  // Knowledge Check State
  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<'none' | 'correct' | 'wrong'>('none');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const progress = useMemo(() => {
    if (course.topics.length === 0) return 0;
    return (completedTopics.size / course.topics.length) * 100;
  }, [completedTopics, course.topics.length]);

  useEffect(() => {
    if (progress === 100) onAwardCertificate(course.title);
  }, [progress, course.title, onAwardCertificate]);

  useEffect(() => {
    setUserCode(activeTopic.codingChallenge?.initialCode || '');
    setTerminalOutput([]);
    setChallengeResult('none');
    setQuizSelection(null);
    setQuizResult('none');
    setAiFeedback(null);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }, [activeTopic]);

  const activeTopicIndex = course.topics.findIndex(t => t.id === activeTopic.id);
  // Only first 2 modules (index 0 and 1) are free for paid courses
  const isPremiumLocked = !course.isFree && activeTopicIndex >= 2 && !isUnlocked;

  const triggerConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00BCD4', '#FBBE24', '#22C55E'] });
  };

  const handleProcessPayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setShowPaymentModal(false);
      onUnlock();
      triggerConfetti();
    }, 2000);
  };

  const handleCheckCode = () => {
    if (!activeTopic.codingChallenge) return;
    setIsRunning(true);
    setAiFeedback(null);
    setTerminalOutput(['> Initializing Python kernel...', '> Loading environment...', '> Running logic...']);
    
    setTimeout(() => {
      const regex = new RegExp(activeTopic.codingChallenge!.solutionPattern, 'i');
      if (regex.test(userCode.trim())) {
        setChallengeResult('success');
        setTerminalOutput(prev => [...prev, '✓ EXECUTION SUCCESSFUL', '---', `Result: Input validated against pattern.`]);
        triggerConfetti();
        handleToggleComplete(activeTopic.id, true);
      } else {
        setChallengeResult('fail');
        setTerminalOutput(prev => [...prev, '✖ LOGIC ERROR DETECTED', '---', 'Traceback: LogicMismatchError at module level.', 'Explanation: Your code does not satisfy the challenge requirements.']);
      }
      setIsRunning(false);
    }, 1500);
  };

  const explainErrorWithAI = () => {
    if (!activeTopic.codingChallenge) return;
    setAiFeedback("Analyzing your code snippet... It seems you might be missing a specific comparison or return value. Remember, AI logic often relies on precise thresholds.");
  };

  const handleQuizSubmit = () => {
    if (!activeTopic.miniQuiz || quizSelection === null) return;
    if (quizSelection === activeTopic.miniQuiz.correctIndex) {
      setQuizResult('correct');
      triggerConfetti();
      handleToggleComplete(activeTopic.id, true);
    } else {
      setQuizResult('wrong');
    }
  };

  const handleToggleComplete = (topicId: string, forceValue?: boolean) => {
    setCompletedTopics(prev => {
      const newSet = new Set(prev);
      if (forceValue !== undefined) forceValue ? newSet.add(topicId) : newSet.delete(topicId);
      else newSet.has(topicId) ? newSet.delete(topicId) : newSet.add(topicId);
      return newSet;
    });
  };
  
  const handleNavigation = (direction: 'next' | 'prev') => {
    const currentIndex = course.topics.findIndex(t => t.id === activeTopic.id);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < course.topics.length) {
      setActiveTopic(course.topics[newIndex]);
      setActiveTab('theory');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative max-w-7xl">
      <div className="flex justify-between items-center mb-6 no-print">
        <button onClick={onBack} className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
          <ArrowLeft size={20} /> <span className="font-bold">Back to Courses</span>
        </button>
        <div className="flex items-center gap-4">
           <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{course.category}</span>
           <div className="h-4 w-[1px] bg-slate-700"></div>
           <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">v2.0 Extended</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[800px]">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-80 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-3xl p-6 shadow-xl no-print self-start sticky top-8">
          <div className="mb-8">
             <h2 className="text-xl font-black mb-4 text-slate-100 font-montserrat tracking-tight leading-tight">{course.title}</h2>
             <div className="flex justify-between text-[10px] text-slate-500 mb-2 font-black uppercase tracking-widest">
                <span>Course Completion</span> <span>{Math.round(progress)}%</span>
             </div>
             <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
             </div>
          </div>
          <nav className="space-y-1 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Mastery path</h3>
            {course.topics.map((topic, index) => {
              const isActive = activeTopic.id === topic.id;
              const isCompleted = completedTopics.has(topic.id);
              const isPremiumLockedModule = !course.isFree && index >= 2 && !isUnlocked;
              return (
                <button 
                  key={topic.id} 
                  onClick={() => setActiveTopic(topic)} 
                  className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all group ${
                    isActive 
                    ? 'bg-cyan-500/10 border border-cyan-500/50 text-cyan-400' 
                    : 'hover:bg-slate-800 border border-transparent text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${isCompleted ? 'text-green-400' : isActive ? 'text-cyan-400' : 'text-slate-600'} transition-colors`}>
                      {isCompleted ? <CheckCircle size={18} /> : isPremiumLockedModule ? <Lock size={18} className="text-amber-600" /> : <Circle size={18} />}
                    </div>
                    <div>
                      <span className={`text-sm font-bold block truncate max-w-[160px] ${isActive ? 'text-cyan-400' : 'group-hover:text-slate-200'} ${isPremiumLockedModule ? 'opacity-50' : ''}`}>{topic.title}</span>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{isPremiumLockedModule ? 'Premium' : topic.duration}</span>
                    </div>
                  </div>
                  {isPremiumLockedModule && <div className="text-[8px] px-2 py-0.5 bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded font-black uppercase">Lock</div>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Main Pane */}
        <main className="flex-grow">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-full">
            {isPremiumLocked ? (
              <div className="flex-grow flex flex-col items-center justify-center p-12 text-center animate-fade-in bg-gradient-to-b from-slate-900/0 to-slate-900">
                <div className="w-24 h-24 bg-amber-500/20 rounded-[2rem] flex items-center justify-center text-amber-500 mb-8 border border-amber-500/30 animate-pulse relative">
                   <Lock size={48} />
                   <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg animate-bounce">BUY NOW</div>
                </div>
                <h2 className="text-4xl font-black text-white mb-4 font-montserrat tracking-tight leading-tight">Advanced Module Locked</h2>
                <p className="text-slate-400 max-w-lg mb-10 text-lg">You've mastered the foundations. To access the remaining {course.topics.length - 2} modules and the Capstone Project, upgrade to Premium Access.</p>
                <div className="bg-slate-800/80 p-10 rounded-[2.5rem] max-w-sm w-full border border-slate-700 shadow-2xl transition-all hover:border-cyan-500/50 group">
                  <div className="text-6xl font-black text-white mb-2 tracking-tighter group-hover:text-cyan-400 transition-colors">₹{course.price}</div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">One-time Lifetime Access</p>
                  <button onClick={() => setShowPaymentModal(true)} className="w-full py-5 bg-gradient-to-r from-yellow-600 to-amber-500 text-white font-black rounded-2xl shadow-xl shadow-amber-900/30 transition-all transform hover:scale-105 active:scale-95">Unlock Curriculum Now</button>
                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
                     <ShieldCheck size={12} /> Money-back Guarantee
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                {/* Module Header */}
                <div className="p-8 border-b border-slate-700/50 bg-slate-800/20">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <button onClick={() => setActiveTab('theory')} className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'theory' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/20' : 'text-slate-400 hover:bg-slate-800'}`}>Theory Base</button>
                    <button onClick={() => setActiveTab('practice')} className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'practice' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-slate-400 hover:bg-slate-800'}`}>Coding Lab</button>
                  </div>
                  <h1 className="text-4xl font-black text-slate-100 font-montserrat tracking-tight leading-tight">{activeTopic.title}</h1>
                </div>

                {/* Dynamic Body */}
                <div ref={scrollContainerRef} className="p-8 flex-grow overflow-y-auto max-h-[600px] custom-scrollbar">
                  {activeTab === 'theory' ? (
                    <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
                      <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: activeTopic.content }} />
                      
                      {activeTopic.miniQuiz && (
                         <div className="mt-12 p-8 bg-slate-800/40 rounded-[2.5rem] border border-slate-700/50 shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                               <BrainCircuit className="text-cyan-400" /> Knowledge Check
                            </h3>
                            <p className="text-slate-200 text-lg font-medium mb-8">{activeTopic.miniQuiz.question}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {activeTopic.miniQuiz.options.map((opt, i) => (
                                 <button 
                                  key={i} 
                                  onClick={() => setQuizSelection(i)} 
                                  className={`p-5 rounded-2xl text-left border-2 transition-all font-bold ${quizSelection === i ? 'bg-cyan-500/10 border-cyan-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                                 >
                                    <span className="mr-3 text-slate-500">{String.fromCharCode(65 + i)}.</span> {opt}
                                 </button>
                               ))}
                            </div>
                            <div className="mt-8 flex items-center gap-6">
                               <button onClick={handleQuizSubmit} className="px-10 py-4 bg-cyan-600 text-white font-black rounded-2xl shadow-xl hover:bg-cyan-500 transition-all">Submit Answer</button>
                               {quizResult === 'correct' && <div className="text-green-400 font-bold flex items-center gap-2 animate-fade-in"><CheckCircle size={20}/> Correct! Next module enabled.</div>}
                               {quizResult === 'wrong' && <div className="text-red-400 font-bold flex items-center gap-2 animate-fade-in"><AlertCircle size={20}/> Try again!</div>}
                            </div>
                         </div>
                      )}
                    </div>
                  ) : (
                    <div className="animate-fade-in space-y-8 h-full flex flex-col">
                      <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3"><Cpu size={20} className="text-purple-400" /> Lab Mission</h3>
                        <p className="text-slate-300 leading-relaxed font-medium">{activeTopic.codingChallenge?.task}</p>
                      </div>

                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 flex-grow">
                        <div className="flex flex-col gap-2">
                           <div className="flex items-center justify-between px-2">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Compiler v3.4</span>
                              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Language: Python</span>
                           </div>
                           <textarea 
                              value={userCode}
                              onChange={(e) => setUserCode(e.target.value)}
                              className="flex-grow w-full h-[350px] bg-slate-950 border border-slate-800 rounded-3xl p-8 font-mono text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all resize-none shadow-2xl selection:bg-cyan-500/20"
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">System Console</span>
                           <div className="flex-grow bg-black/80 rounded-3xl p-8 font-mono text-xs text-slate-400 border border-slate-800 shadow-2xl overflow-y-auto custom-scrollbar">
                              {terminalOutput.map((line, i) => (
                                <div key={i} className={`mb-1.5 ${line.includes('✖') ? 'text-red-400' : line.includes('✓') ? 'text-green-400 font-black' : 'text-slate-500'}`}>{line}</div>
                              ))}
                              {!isRunning && terminalOutput.length === 0 && <div className="opacity-20 italic">Awaiting source execution...</div>}
                              {isRunning && <div className="text-cyan-400 animate-pulse">Running neural verification...</div>}
                           </div>
                           {challengeResult === 'fail' && (
                             <button onClick={explainErrorWithAI} className="mt-2 text-[10px] font-black text-purple-400 hover:text-purple-300 uppercase tracking-widest flex items-center gap-2 px-2">
                               <MessageCircle size={14} /> Explain Error with AI Mentor
                             </button>
                           )}
                           {aiFeedback && (
                             <div className="mt-2 p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-xs text-purple-200 animate-fade-in italic">
                               <Sparkles size={12} className="inline mr-2" /> {aiFeedback}
                             </div>
                           )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button 
                          onClick={handleCheckCode} 
                          disabled={isRunning} 
                          className="px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl shadow-xl shadow-cyan-900/30 transition-all flex items-center gap-3 disabled:opacity-50"
                        >
                          {isRunning ? <Loader2 className="animate-spin" /> : <Play size={20} />} Run & Verify Logic
                        </button>
                        {challengeResult === 'success' && (
                          <div className="text-green-400 font-black flex items-center gap-2 animate-fade-in"><Trophy size={24} /> Lesson Mastered! Access to next step granted.</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Footer */}
                <div className="p-8 bg-slate-900/80 border-t border-slate-800 flex justify-between items-center no-print">
                   <button 
                    onClick={() => handleNavigation('prev')} 
                    disabled={course.topics[0].id === activeTopic.id} 
                    className="flex items-center gap-3 px-6 py-4 bg-slate-800 rounded-2xl text-slate-400 hover:text-white disabled:opacity-20 transition-all font-bold"
                   >
                     <ChevronLeft /> Previous
                   </button>

                   <div className="flex gap-4">
                      {!completedTopics.has(activeTopic.id) && (
                        <button onClick={() => handleToggleComplete(activeTopic.id, true)} className="px-8 py-4 bg-slate-800 text-slate-200 font-black rounded-2xl border border-slate-700 hover:bg-slate-700">Mark as Read</button>
                      )}
                      <button 
                        onClick={() => handleNavigation('next')} 
                        disabled={course.topics[course.topics.length-1].id === activeTopic.id || !completedTopics.has(activeTopic.id)}
                        className={`flex items-center gap-3 px-12 py-4 rounded-2xl font-black transition-all shadow-xl ${completedTopics.has(activeTopic.id) ? 'bg-cyan-600 text-white shadow-cyan-900/30 hover:bg-cyan-500' : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'}`}
                      >
                        {course.topics[course.topics.length-1].id === activeTopic.id ? 'Course End' : 'Next Step'} <ChevronRight />
                      </button>
                   </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[300] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(0,188,212,0.1)] animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-white font-montserrat">Secure Checkout</h2>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={32} /></button>
            </div>
            <div className="bg-slate-800/80 p-6 rounded-3xl mb-8 flex items-center justify-between border border-slate-700 shadow-inner">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400"><CreditCard size={28} /></div>
                  <span className="font-black text-slate-300 text-lg">Course Access</span>
               </div>
               <span className="text-3xl font-black text-white">₹{course.price}</span>
            </div>
            <div className="space-y-4 mb-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Card details</label>
                <input type="text" placeholder="Card Number" className="w-full bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-mono" defaultValue="4242 4242 4242 4242" />
              </div>
              <div className="flex gap-4">
                <input type="text" placeholder="MM/YY" className="flex-1 bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-mono" defaultValue="12/26" />
                <input type="text" placeholder="CVC" className="flex-1 bg-slate-950 border border-slate-800 p-5 rounded-2xl text-white font-mono" defaultValue="***" />
              </div>
            </div>
            <button onClick={handleProcessPayment} disabled={isPaying} className="w-full py-5 bg-cyan-600 text-white font-black rounded-2xl flex items-center justify-center gap-4 text-xl shadow-2xl shadow-cyan-900/40 hover:bg-cyan-500 transition-all transform active:scale-95">
              {isPaying ? <Loader2 className="animate-spin" /> : <ShieldCheck size={24} />} 
              {isPaying ? 'Processing...' : 'Complete Payment'}
            </button>
            <p className="mt-6 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">Secured by Stripe-AES256 Encryption</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Placeholder for X icon if missing
const X = ({size, className}: {size: number, className?: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default CourseDetail;
