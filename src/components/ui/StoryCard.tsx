// src/components/ui/StoryCard.tsx

import React from 'react';
import { Zap, Eye, Heart, Clock, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Article } from '../../types';

interface StoryCardProps {
  article: Article;
  index: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ article, index }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {article.category.name}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        {/* Meta informácie */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {article.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {article.likes}
            </span>
          </div>
          {article.sources && article.sources.length > 0 && (
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Link className="h-3 w-3" />
              {article.sources.length}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {article.readingTime} min read
          </span>
          <button 
            onClick={() => navigate(`/article/${article.slug}`)}
            className="text-red-400 hover:text-red-300 transition-colors duration-200 flex items-center gap-1"
          >
            Read More <Zap className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;