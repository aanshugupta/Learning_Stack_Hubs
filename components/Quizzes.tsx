
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MOCK_QUIZZES_BY_CATEGORY, COURSE_CATEGORIES } from '../constants';
import { 
  CheckCircle, XCircle, RefreshCw, ChevronLeft, ChevronRight, 
  Clock, BrainCircuit, Target, ArrowRight, Award, ChevronDown, Check, X, ArrowLeft
} from 'lucide-react';
import type { QuizQuestion } from '../types';

const Quizzes: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const startQuiz = (category: string) => {
        const catQuestions = MOCK_QUIZZES_BY_CATEGORY[category] || [];
        setQuestions(catQuestions);
        setSelectedCategory(category);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setIsSubmitted(false);
        setShowReview(false);
        setTimeLeft(300);
        setIsDropdownOpen(false);
    };

    const handleRetry = () => {
        setSelectedCategory(null);
        setQuestions([]);
        setIsSubmitted(false);
        setShowReview(false);
    };
    
    const handleSubmit = useCallback(() => {
        setIsSubmitted(true);
    }, []);

    useEffect(() => {
        if (!selectedCategory || isSubmitted) return;
        if (timeLeft <= 0) { handleSubmit(); return; }
        const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, isSubmitted, handleSubmit, selectedCategory]);

    const score = useMemo(() => {
        return questions.reduce((acc, q) => acc + (userAnswers[q.id] === q.answer ? 1 : 0), 0);
    }, [questions, userAnswers]);

    const percentage = Math.round((score / questions.length) * 100);

    if (!selectedCategory) {
        return (
            <div className="container mx-auto px-6 py-12 animate-fade-in">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black font-montserrat tracking-tight mb-4">Assessment Center</h1>
                        <p className="text-slate-400 text-lg">Test your roadmap mastery across all course disciplines.</p>
                    </div>

                    <div className="relative">
                      <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-slate-900/40 border border-slate-700/50 rounded-2xl py-6 px-8 flex justify-between items-center text-left transition-all hover:border-cyan-500/50 shadow-2xl"
                      >
                        <div>
                          <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Step 1: Select Subject</p>
                          <p className="text-xl font-bold text-white">Choose a Course Quiz...</p>
                        </div>
                        <ChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute w-full mt-4 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                          {COURSE_CATEGORIES.map(cat => (
                            <button 
                              key={cat}
                              onClick={() => startQuiz(cat)}
                              className="w-full px-8 py-4 text-left text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-all border-b border-slate-800 last:border-0 flex justify-between items-center group"
                            >
                              <span className="font-bold">{cat}</span>
                              <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Expert Verified</span>
                                <ArrowRight size={14} />
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-12 p-8 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-3xl text-center">
                      <Target className="mx-auto text-slate-700 mb-4" size={48} />
                      <p className="text-slate-500 font-bold max-w-sm mx-auto">Validated certificates are awarded only to learners who score 80% or higher in final assessments.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isSubmitted && !showReview) {
        return (
            <div className="container mx-auto px-6 py-12 animate-fade-in">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-900/40 border border-slate-700/50 rounded-[2.5rem] p-12 shadow-2xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10"><Award size={160} className="text-cyan-400" /></div>
                        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8 ${percentage >= 80 ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}><Target size={48} /></div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 font-montserrat tracking-tight">{percentage >= 80 ? 'Mastery Verified!' : 'Needs Revision'}</h1>
                        <p className="text-slate-400 mb-10 text-lg">{selectedCategory} Assessment Results</p>
                        
                        <div className="flex justify-center gap-16 mb-12">
                            <div><p className="text-6xl font-black text-cyan-400">{score}/{questions.length}</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Total Points</p></div>
                            <div className="w-[1px] h-16 bg-slate-700 mt-2"></div>
                            <div><p className="text-6xl font-black text-purple-400">{percentage}%</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Accuracy</p></div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                          <button onClick={() => setShowReview(true)} className="px-10 py-4 bg-slate-800 text-white font-black rounded-2xl border border-slate-700 transition-all hover:bg-slate-700 hover:scale-105">Review Answers</button>
                          <button onClick={handleRetry} className="px-10 py-4 bg-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-900/20 transition-all hover:bg-cyan-500 hover:scale-105">Try Another Subject</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isSubmitted && showReview) {
        return (
          <div className="container mx-auto px-6 py-12 animate-fade-in">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => setShowReview(false)} className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-all"><ArrowLeft size={18} /> Back to Results</button>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Detailed Review</h2>
              </div>

              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const isCorrect = userAnswers[q.id] === q.answer;
                  return (
                    <div key={q.id} className={`bg-slate-900/40 border-2 rounded-3xl p-8 transition-all ${isCorrect ? 'border-green-500/30' : 'border-red-500/30'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Question {idx + 1}</span>
                        {isCorrect ? (
                          <div className="flex items-center gap-2 text-green-400 font-black text-xs uppercase"><Check size={16} /> Correct</div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-400 font-black text-xs uppercase"><X size={16} /> Incorrect</div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">{q.question}</h3>
                      
                      <div className="space-y-3 mb-6">
                        {q.options.map((opt, i) => {
                          const isUserChoice = userAnswers[q.id] === opt;
                          const isCorrectChoice = q.answer === opt;
                          return (
                            <div key={i} className={`p-4 rounded-xl text-sm font-bold flex justify-between items-center ${isCorrectChoice ? 'bg-green-500/20 text-green-300' : isUserChoice ? 'bg-red-500/20 text-red-300' : 'bg-slate-800/40 text-slate-500'}`}>
                              <span>{opt}</span>
                              {isCorrectChoice && <Check size={14} />}
                              {isUserChoice && !isCorrectChoice && <X size={14} />}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-4 bg-slate-900 rounded-2xl border-l-4 border-cyan-500">
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-2"><BrainCircuit size={12} /> Mentor Explanation</p>
                        <p className="text-sm text-slate-300 leading-relaxed italic">"{q.explanation}"</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center pt-8">
                 <button onClick={handleRetry} className="px-12 py-4 bg-cyan-600 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105">Return to Hub</button>
              </div>
            </div>
          </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-3xl mx-auto bg-slate-900/40 border border-slate-700/50 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                <div className="flex justify-between items-center mb-8">
                    <div><span className="px-4 py-1 bg-cyan-500/10 text-cyan-400 font-black uppercase text-[10px] tracking-widest rounded-full border border-cyan-500/20 mb-3 inline-block shadow-sm">{selectedCategory}</span><p className="text-sm text-slate-500 font-black">Step {currentQuestionIndex + 1} of {questions.length}</p></div>
                    <div className={`px-5 py-2.5 rounded-2xl text-sm font-black border transition-all flex items-center gap-2 ${timeLeft < 30 ? 'bg-red-500/10 border-red-500 text-red-400 animate-pulse shadow-lg shadow-red-900/20' : 'bg-slate-800/80 text-cyan-400'}`}><Clock size={18} />{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 mb-10 overflow-hidden shadow-inner"><div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div></div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-100 mb-12 leading-tight font-montserrat tracking-tight">{currentQuestion.question}</h2>
                <div className="space-y-4">
                    {currentQuestion.options.map((option, idx) => (
                        <button key={idx} onClick={() => setUserAnswers(p => ({ ...p, [currentQuestion.id]: option }))} className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-5 group ${userAnswers[currentQuestion.id] === option ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg' : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800'}`}><span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${userAnswers[currentQuestion.id] === option ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-900 group-hover:bg-slate-700'}`}>{String.fromCharCode(65 + idx)}</span><span className="font-bold text-lg">{option}</span></button>
                    ))}
                </div>
                <div className="mt-14 flex justify-between items-center pt-8 border-t border-slate-800">
                    <button onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))} disabled={currentQuestionIndex === 0} className="px-8 py-4 bg-slate-800 text-slate-300 font-black rounded-2xl disabled:opacity-20 border border-slate-700 transition-all hover:bg-slate-700">Previous</button>
                    {currentQuestionIndex === questions.length - 1 ? (<button onClick={handleSubmit} disabled={!userAnswers[currentQuestion.id]} className="px-12 py-4 bg-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-900/40 transition-all hover:scale-105 active:scale-95 disabled:opacity-50">Finalize Quiz</button>) : (<button onClick={() => setCurrentQuestionIndex(p => p + 1)} disabled={!userAnswers[currentQuestion.id]} className="px-12 py-4 bg-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-900/40 transition-all hover:scale-105 active:scale-95 disabled:opacity-50">Next Question</button>)}
                </div>
            </div>
        </div>
    );
};

export default Quizzes;
