import React from 'react';
import { Moon, Zap } from 'lucide-react';
import type { StoryCardProps } from '../../interfaces/StoryCardProps';

const StoryCard: React.FC<StoryCardProps> = ({ story, index, getCategoryName }) => (
  <div
    className="group bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="relative overflow-hidden">
      <img
        src={story.image}
        alt={story.title}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
        {getCategoryName(story.category)}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-200">
        {story.title}
      </h3>
      <p className="text-gray-400 mb-4 line-clamp-3">
        {story.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Moon className="h-4 w-4" />
          {story.readTime}
        </span>
        <button className="text-red-400 hover:text-red-300 transition-colors duration-200 flex items-center gap-1">
          Read More <Zap className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

export default StoryCard;