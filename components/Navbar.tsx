
import React from 'react';
import { Sparkles, LogOut } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import type { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  onNavClick: (page: Page) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavClick, onLogout }) => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-slate-900/80 backdrop-blur-md border-r border-slate-700/50 z-50 hidden md:flex flex-col">
      <div className="flex items-center space-x-2 px-6 py-5 border-b border-slate-700/50">
        <Sparkles className="text-cyan-400" size={28} />
        <h1 className="text-xl font-bold font-montserrat text-white">LearnStackHub</h1>
      </div>

      <nav className="flex-grow p-4 overflow-y-auto custom-scrollbar">
        <ul className="space-y-2">
          {NAV_LINKS.map(({ name, icon }) => (
            <li key={name}>
              <button
                onClick={() => onNavClick(name)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  activePage === name 
                  ? 'bg-slate-700 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {activePage === name && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-full animate-fade-in"></div>}
                {React.cloneElement(icon as React.ReactElement<any>, { className: activePage === name ? 'text-cyan-400' : ''})}
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-red-900/50 hover:bg-red-800/60 text-red-300 font-bold rounded-lg transition-all transform hover:scale-105"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
      </div>
    </aside>
  );
};

export default Sidebar;
