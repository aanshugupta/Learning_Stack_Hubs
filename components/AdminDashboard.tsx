
import React, { useState, useMemo, useEffect } from 'react';
import { LogOut, Shield, Search, ArrowUpDown, X } from 'lucide-react';
import { MOCK_USERS_DATA, MOCK_COURSES } from '../constants';
import type { AdminViewUser } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [inputValue, setInputValue] = useState(''); // Raw input value from the search field
  const [searchTerm, setSearchTerm] = useState(''); // Debounced value used for filtering
  const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'progress'; direction: 'ascending' | 'descending' } | null>({ key: 'name', direction: 'ascending' });

  // Debounce effect for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300); // Wait 300ms after user stops typing to apply filter

    // Cleanup function to clear timeout on every keystroke
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]); // Effect runs only when the raw input value changes

  const courseMap = useMemo(() => {
    return new Map(MOCK_COURSES.map(course => [course.id, course.title]));
  }, []);

  const getOverallProgress = (user: AdminViewUser): number => {
    if (user.enrolledCourses.length === 0) return 0;
    const totalProgress = user.enrolledCourses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(totalProgress / user.enrolledCourses.length);
  };

  const requestSort = (key: 'name' | 'progress') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedAndFilteredUsers = useMemo(() => {
    let users = [...MOCK_USERS_DATA];

    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      users = users.filter(user =>
        user.name.toLowerCase().includes(lowercasedFilter) ||
        user.email.toLowerCase().includes(lowercasedFilter)
      );
    }

    if (sortConfig !== null) {
      users.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        if (sortConfig.key === 'progress') {
          aValue = getOverallProgress(a);
          bValue = getOverallProgress(b);
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return users;
  }, [searchTerm, sortConfig]);


  return (
    <div className="min-h-screen text-gray-200 bg-transparent p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Shield className="text-cyan-400" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-white">
              Welcome Admin
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-900/50 hover:bg-red-800/60 text-red-300 font-bold rounded-lg transition-all transform hover:scale-105"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </header>

        {/* User Management Table */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl shadow-black/20 overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold">User Management</h2>
              <p className="text-sm text-slate-400 mt-1">
                Overview of all registered users and their learning progress.
              </p>
            </div>
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full md:w-64 bg-slate-700 border border-slate-600 rounded-lg py-2 pl-10 pr-10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              />
              {inputValue && (
                <button
                    onClick={() => setInputValue('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Clear search"
                >
                    <X size={18} />
                </button>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="text-xs text-slate-400 uppercase bg-slate-900/60">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <button onClick={() => requestSort('name')} className="flex items-center gap-1 transition-colors hover:text-white">
                        User <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3">Courses Taken</th>
                  <th scope="col" className="px-6 py-3">
                    <button onClick={() => requestSort('progress')} className="flex items-center gap-1 transition-colors hover:text-white">
                        Overall Progress <ArrowUpDown size={14} />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredUsers.map(user => (
                  <tr key={user.id} className="bg-slate-800/60 border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img className="w-10 h-10 rounded-full" src={user.avatar} alt={`${user.name} avatar`} />
                        <div>
                          <div className="text-base font-semibold text-white">{user.name}</div>
                          <div className="font-normal text-slate-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ul className="list-disc list-inside space-y-1">
                        {user.enrolledCourses.map(c => (
                          <li key={c.courseId} className="text-xs">
                            {courseMap.get(c.courseId) || 'Unknown Course'} ({c.progress}%)
                          </li>
                        ))}
                         {user.enrolledCourses.length === 0 && <span className="text-xs text-slate-500">No courses enrolled</span>}
                      </ul>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-700 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full"
                            style={{ width: `${getOverallProgress(user)}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-white">{getOverallProgress(user)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
