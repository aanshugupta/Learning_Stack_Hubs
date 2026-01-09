
import React from 'react';
import type { Course } from '../types';
import { Clock, IndianRupee } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelectCourse }) => {
  const difficultyColor = {
    'Beginner': 'bg-green-500/20 text-green-300',
    'Intermediate': 'bg-amber-500/20 text-amber-300',
    'Advanced': 'bg-red-500/20 text-red-300',
  };
  return (
    <div className="group relative bg-slate-800 border border-slate-700 rounded-lg p-6 flex flex-col transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10">
      <div className="relative">
        <div className="flex items-center space-x-4 mb-4">
          {course.icon}
          <h3 className="text-2xl font-bold text-gray-100">{course.title}</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 text-xs">
           <span className={`px-2 py-1 rounded-full font-semibold ${difficultyColor[course.difficulty]}`}>
             {course.difficulty}
           </span>
            <span className="px-2 py-1 rounded-full font-semibold bg-blue-500/20 text-blue-300 flex items-center gap-1">
             <Clock size={14} /> {course.duration}
           </span>
           {!course.isFree && (
             <span className="px-3 py-1 rounded-full font-black bg-gradient-to-r from-yellow-600 to-amber-400 text-white flex items-center gap-1 shadow-lg shadow-amber-900/20 uppercase tracking-tighter">
               <IndianRupee size={12} /> {course.price}
             </span>
           )}
           {course.isFree && (
              <span className="px-2 py-1 rounded-full font-semibold bg-emerald-500/20 text-emerald-300">
                Free
              </span>
           )}
        </div>

        <p className="text-gray-400 flex-grow text-sm">{course.description}</p>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-gray-400 font-mono text-xs">{course.category}</span>
          <button 
            onClick={() => onSelectCourse(course.id)}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 text-white font-bold rounded-full transition-all transform hover:scale-105"
          >
            {course.isFree ? 'Start Now' : 'Join Course'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
