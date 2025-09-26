import React from "react";
import { Category } from "../../types";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  return (
    <div
      className="group cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={`bg-center bg-cover p-6 rounded-xl shadow-lg
        transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 before:absolute before:inset-0
        before:bg-black before:opacity-70 before:rounded-xl relative`}
        style={{
          backgroundImage: `url('/images/${category.id}.jpg')`,
        }}
      >
        <div className="text-center relative z-10">
          <h3 className="text-xl font-bold text-white mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-white mb-3">
            {category.englishName}
          </p>
          <p className="text-sm text-white">
            {category.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;