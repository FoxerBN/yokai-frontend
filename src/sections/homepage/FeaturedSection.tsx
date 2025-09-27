// src/sections/homepage/FeaturedSection.tsx

import React, { useEffect, useState } from 'react';
import StoryCard from '../../components/ui/StoryCard';
import { Article } from '../../types';
import { getMostLikedArticles } from '../../api';
import content from '../../data/content.json';
import { Loader2 } from 'lucide-react';

const FeaturedSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularArticles = async () => {
      try {
        setLoading(true);
        const data = await getMostLikedArticles();
        setArticles(data);
      } catch (err) {
        setError('Failed to load popular articles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 text-red-400 animate-spin" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center text-red-400">
          <p>{error}</p>
        </div>
      </section>
    );
  }

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
        {articles.map((article, index) => (
          <StoryCard
            key={article._id}
            article={article}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;