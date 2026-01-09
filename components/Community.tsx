
import React, { useState } from 'react';
import { Send, ThumbsUp, MessageSquare, Sparkles, Reply } from 'lucide-react';
import type { User, Post, Comment } from '../types';

const initialPosts: Post[] = [
  { id: 1, author: 'Jane Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', time: '2h ago', content: 'What are the best frameworks for AI development in 2024?', likes: 12, replies: [] },
  { id: 2, author: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', time: '5h ago', content: 'Just finished the MERN stack modules! Feeling great.', likes: 45, replies: [{ id: 101, author: 'Alex Demo', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', time: '1h ago', content: 'Great job! Which module was hardest?' }] },
];

interface CommunityProps {
  user: User;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    const p: Post = { id: Date.now(), author: user.name, avatar: user.avatar, time: 'Just now', content: newPost, likes: 0, replies: [] };
    setPosts([p, ...posts]);
    setNewPost('');
  };

  const handleReplySubmit = (postId: number) => {
    if (!replyText.trim()) return;
    const c: Comment = { id: Date.now(), author: user.name, avatar: user.avatar, time: 'Just now', content: replyText };
    setPosts(posts.map(p => p.id === postId ? { ...p, replies: [...p.replies, c] } : p));
    setReplyText('');
    setReplyingTo(null);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Forum Discussion</h1>
        <p className="text-slate-400 mt-2">Collaborate with fellow learners across the ecosystem.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 mb-8">
          <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Start a new discussion..." rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none mb-4" />
          <div className="flex justify-end"><button onClick={handlePostSubmit} disabled={!newPost.trim()} className="px-8 py-3 bg-cyan-600 text-white font-black rounded-2xl hover:scale-105 transition-all">Share Post</button></div>
        </div>

        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.id} className="bg-slate-900/40 border border-slate-700/50 rounded-3xl p-6 hover:border-cyan-500/30 transition-all">
              <div className="flex gap-4 mb-4">
                <img src={post.avatar} alt="" className="w-12 h-12 rounded-full bg-slate-800" />
                <div>
                   <h4 className="font-bold text-white text-lg">{post.author}</h4>
                   <p className="text-xs text-slate-500 uppercase font-black">{post.time}</p>
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">{post.content}</p>
              <div className="flex gap-6 text-slate-500 border-t border-slate-800 pt-4">
                <button className="flex items-center gap-2 hover:text-cyan-400"><ThumbsUp size={16} /> {post.likes}</button>
                <button onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)} className="flex items-center gap-2 hover:text-cyan-400"><Reply size={16} /> Reply</button>
              </div>

              {/* Nested Replies */}
              <div className="mt-6 ml-10 space-y-4">
                {post.replies.map(reply => (
                  <div key={reply.id} className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 flex gap-3">
                    <img src={reply.avatar} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="flex items-baseline gap-2 mb-1"><span className="font-bold text-sm text-white">{reply.author}</span><span className="text-[10px] text-slate-500 font-black">{reply.time}</span></div>
                      <p className="text-sm text-slate-400">{reply.content}</p>
                    </div>
                  </div>
                ))}
                {replyingTo === post.id && (
                  <div className="mt-4 flex gap-2">
                    <input autoFocus value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Type a reply..." className="flex-grow bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:outline-none" />
                    <button onClick={() => handleReplySubmit(post.id)} className="px-6 py-2 bg-cyan-600 text-white font-bold rounded-xl text-xs">Send</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
