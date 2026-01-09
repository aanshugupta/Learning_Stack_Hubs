
import React, { useState, useEffect, useMemo } from 'react';
import { fetchDailyNews } from '../services/geminiService';
import { NewsItem } from '../types';
import { Newspaper, Loader2, ExternalLink, RefreshCcw, Search, Clock } from 'lucide-react';

const DailyNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadNews = async () => {
    setLoading(true);
    const data = await fetchDailyNews();
    setNews(data);
    setLoading(false);
  };

  useEffect(() => { loadNews(); }, []);

  const filteredNews = useMemo(() => {
    if (!search.trim()) return news;
    const q = search.toLowerCase();
    return news.filter(n => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q) || n.category.toLowerCase().includes(q));
  }, [news, search]);

  const timestamp = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold font-montserrat flex items-center gap-4"><Newspaper className="text-cyan-400" size={40} /> Tech Pulse</h1>
          <p className="text-slate-400 mt-2">The latest breakthroughs in tech & AI.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Filter keywords..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-900 border border-slate-700 p-2 pl-10 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500" />
          </div>
          <button onClick={loadNews} disabled={loading} className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-xl text-cyan-400 font-bold hover:bg-slate-700 flex items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : <RefreshCcw size={20} />} Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => <div key={i} className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 animate-pulse h-64"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, idx) => (
            <div key={idx} className="group bg-slate-800/40 border border-slate-700 rounded-2xl p-6 flex flex-col hover:border-cyan-500/50 hover:shadow-2xl transition-all">
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase rounded-full border border-cyan-500/20">{item.category}</span>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase"><Clock size={12} /> {timestamp}</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{item.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow">{item.summary}</p>
              <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">{item.sourceName}</span>
                <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-400 text-sm font-bold hover:underline">Source <ExternalLink size={14} /></a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyNews;
