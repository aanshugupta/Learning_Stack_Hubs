import React, { useState, useMemo } from 'react';
import { MOCK_COURSES, COURSE_CATEGORIES } from '../constants';
import CourseCard from './CourseCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { CourseCategory, CourseDifficulty } from '../types';

interface CoursesSectionProps {
  onSelectCourse: (courseId: string) => void;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    category: 'All' | CourseCategory;
    difficulty: 'All' | CourseDifficulty;
    price: 'All' | 'Free' | 'Paid';
  }>({
    category: 'All',
    difficulty: 'All',
    price: 'All',
  });

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ category: 'All', difficulty: 'All', price: 'All' });
  };

  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const matchesSearch = searchTerm === '' ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filters.category === 'All' || course.category === filters.category;
      const matchesDifficulty = filters.difficulty === 'All' || course.difficulty === filters.difficulty;
      
      const matchesPrice = filters.price === 'All' ||
        (filters.price === 'Free' && course.isFree) ||
        (filters.price === 'Paid' && !course.isFree);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
    });
  }, [searchTerm, filters]);

  const activeFilterCount = 
    (filters.category !== 'All' ? 1 : 0) +
    (filters.difficulty !== 'All' ? 1 : 0) +
    (filters.price !== 'All' ? 1 : 0) +
    (searchTerm !== '' ? 1 : 0);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-montserrat">Our Courses</h1>
        <p className="text-gray-400 mt-2">Find the perfect course to kickstart your learning journey.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 md:p-6 mb-8 flex flex-col gap-4 shadow-md">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for courses like 'Python' or 'React'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 pl-12 pr-4 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-[#00BCD4] transition-all"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <select value={filters.category} onChange={e => handleFilterChange('category', e.target.value)} className="bg-slate-700 border border-slate-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-[#00BCD4]">
                <option value="All">All Categories</option>
                {COURSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            {/* Difficulty Filter */}
            <select value={filters.difficulty} onChange={e => handleFilterChange('difficulty', e.target.value)} className="bg-slate-700 border border-slate-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-[#00BCD4]">
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
            
            {/* Price Filter */}
            <select value={filters.price} onChange={e => handleFilterChange('price', e.target.value)} className="bg-slate-700 border border-slate-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-[#00BCD4]">
                <option value="All">All Prices</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
            </select>
        </div>
         {activeFilterCount > 0 && (
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-gray-400">
              <span className="font-semibold text-[#4A90E2]">{filteredCourses.length}</span> results found with <span className="font-semibold text-[#4A90E2]">{activeFilterCount}</span> filters active.
            </div>
            <button onClick={clearFilters} className="flex items-center gap-2 text-sm text-[#00BCD4] hover:text-[#0097A7] transition-colors">
              <X size={14} /> Clear Filters
            </button>
          </div>
        )}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onSelectCourse={onSelectCourse} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 bg-slate-800 border border-slate-700 rounded-lg p-12">
            <h3 className="text-xl font-semibold text-gray-100">No Courses Found</h3>
            <p className="mt-2">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default CoursesSection;