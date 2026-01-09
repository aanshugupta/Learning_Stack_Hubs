import React from 'react';

interface CategoryCardProps {
  title: string;
  // FIX: Replaced JSX.Element with React.ReactElement for better compatibility
  icon: React.ReactElement;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon }) => {
  return (
    <div className="group p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 hover:border-cyan-400/50 cursor-pointer">
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="transition-transform duration-300 group-hover:scale-110 text-slate-400 group-hover:text-cyan-400">
                {/* FIX: Cast icon to any to allow size prop in cloneElement */}
                {React.cloneElement(icon as React.ReactElement<any>, { size: 40 })}
            </div>
            <h3 className="mt-4 text-md font-bold text-slate-200">{title}</h3>
        </div>
    </div>
  );
};

export default CategoryCard;