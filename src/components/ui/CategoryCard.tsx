import React from 'react';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    englishName: string;
    description: string;
    color: string;
    icon: string;
  };
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
      orange: 'from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800',
      blue: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      green: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
      cyan: 'from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800',
      purple: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
      yellow: 'from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800',
      emerald: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
    };
    return colorMap[color] || colorMap.red;
  };

  return (
    <div
      className="group cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`bg-[url('data/kitsune.jpg')] bg-center bg-cover ${getColorClasses(category.color)} p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 before:absolute before:inset-0 before:bg-black before:opacity-60 before:rounded-xl relative`}>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white opacity-90 mb-2">{category.name}</h3>
          <p className="text-sm text-white mb-3 opacity-90">{category.englishName}</p>
          <p className="text-sm text-white opacity-90">{category.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;