import React from 'react';
import StoryCard from '../components/ui/StoryCard';
import yokaiData from '../data/yokai.json';
import content from '../data/content.json';

const FeaturedSection: React.FC = () => {
  const getCategoryName = (categoryId: string): string => {
    const category = yokaiData.categories.find(cat => cat.id === categoryId);
    return category ? category.englishName : 'Unknown';
  };

  return (
    <section id="stories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured <span className="text-red-400">Yokai Stories</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {content.sections.featuredStories.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {yokaiData.featuredStories.map((story, index) => (
          <StoryCard
            key={story.id}
            story={story}
            index={index}
            getCategoryName={getCategoryName}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;