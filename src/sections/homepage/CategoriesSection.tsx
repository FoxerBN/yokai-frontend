import React from 'react';
import CategoryCard from '../../components/ui/CategoryCard';
import { Category } from '../../types';
import yokaiData from '../../data/yokai.json';
import content from '../../data/content.json';

const CategoriesSection: React.FC = () => {
  const categories: Category[] = yokaiData.categories;
  
  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Yokai <span className="text-red-400">Categories</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {content.sections.categories.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
