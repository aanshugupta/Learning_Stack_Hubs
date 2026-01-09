
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Bot, Sparkles, User, Loader2, Minus, Maximize2 } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Message {
  role: 'assistant' | 'user';
  text: string;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hello Aanshu! ✨ I'm your Aionus Assistant. How can I help you master your learning goals today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: `You are the Aionus AI Learning Assistant. 
          Your tone is encouraging, professional, and concise. 
          The user's name is Aanshu.
          Provide short, educational answers. 
          If they ask about a mistake in a quiz, explain the underlying concept simply. 
          Focus on AI, Machine Learning, Web Development, and Data Science. 
          Avoid long paragraphs. Use bullet points if needed.`,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Could you rephrase?";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Connectivity hiccup! Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-cyan-500/20 hover:scale-110 active:scale-95 transition-all z-[100] group"
      >
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
        <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-full max-w-[380px] bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-[100] flex flex-col transition-all duration-300 ${isMinimized ? 'h-16 overflow-hidden' : 'h-[550px]'}`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/40 rounded-t-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 relative">
             <Bot size={22} />
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Aionus Assistant</h3>
            <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Always Active</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 text-slate-400 hover:text-white transition-colors">
            {isMinimized ? <Maximize2 size={16} /> : <Minus size={16} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'assistant' 
                  ? 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-none shadow-sm' 
                  : 'bg-cyan-600 text-white rounded-tr-none shadow-lg'
                }`}>
                  <div className="flex items-center gap-1.5 mb-1.5 opacity-50">
                    {msg.role === 'assistant' ? <Bot size={12} /> : <User size={12} />}
                    <span className="text-[9px] font-bold uppercase tracking-widest">{msg.role === 'assistant' ? 'AI Mentor' : 'Aanshu'}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none border border-slate-700/50 flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin text-cyan-400" />
                  <span className="text-xs text-slate-400 font-medium">Assistant is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about the lesson..."
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-4 pr-12 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:grayscale"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-3 flex justify-center gap-4 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
              <span className="flex items-center gap-1"><Sparkles size={8} /> Explain Mistakes</span>
              <span className="flex items-center gap-1"><Sparkles size={8} /> Simplified Concepts</span>
              <span className="flex items-center gap-1"><Sparkles size={8} /> Next Steps</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatAssistant;
