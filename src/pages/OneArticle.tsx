// src/pages/OneArticle.tsx - upravená verzia s like funkciami

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleBySlug, incrementViews, toggleLike, checkLikeStatus } from '../api';
import { Article } from '../types';
import { 
  ArrowLeft, Clock, Eye, Heart, User, Calendar, 
  Link, Loader2, BookOpen 
} from 'lucide-react';

const OneArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      scrollTo(0, 0);
      if (!slug) return;
      
      try {
        setLoading(true);
        
        // Fetch article
        const data = await getArticleBySlug(slug);
        setArticle(data);
        setLikesCount(data.likes);
        
        // Increment views
        await incrementViews(slug);
        
        // Check like status
        const likeStatus = await checkLikeStatus(slug);
        setIsLiked(likeStatus);
        
      } catch (err) {
        setError('Článok sa nepodarilo načítať');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleLikeToggle = async () => {
    if (!slug || isLiking) return;
    
    setIsLiking(true);
    try {
      const result = await toggleLike(slug);
      setIsLiked(result.liked);
      setLikesCount(result.likes);
    } catch (err) {
      console.error('Failed to toggle like:', err);
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-red-400 animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error || 'Článok nebol nájdený'}</p>
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-red-400 transition-colors"
          >
            Späť na hlavnú stránku
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('sk-SK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Späť
        </button>

        {/* Hero image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-6 left-6">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {article.category.name}
            </span>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {article.title}
            </h1>
            <p className="text-xl text-gray-300">
              {article.excerpt}
            </p>
          </div>
        </div>

        {/* Meta info with Like button */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex flex-wrap items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readingTime} min čítania</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{article.views + 1} zobrazení</span>
              </div>
            </div>
            
            {/* Like button */}
            <button
              onClick={handleLikeToggle}
              disabled={isLiking}
              className={`flex items-center gap-2 px-4 py-2 mt-2 rounded-lg transition-all ${
                isLiked 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </button>
          </div>
        </div>

        {/* Japanese divider */}
        <div className="flex items-center justify-center my-12">
          <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-full" />
          <span className="text-red-500 text-2xl mx-6">妖</span>
          <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent w-full" />
        </div>

        {/* Content */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-red-400" />
            <span className="text-red-400 font-medium">Príbeh</span>
          </div>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
              {article.content}
            </p>
          </div>
        </div>

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 mt-8 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-4">
              <Link className="h-5 w-5 text-amber-400" />
              <h3 className="text-xl font-semibold text-amber-400">Zdroje</h3>
            </div>
            <ul className="space-y-2">
              {article.sources.map((source, index) => (
                <li key={index}>
                  <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-red-500">❯</span>
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Japanese style decoration */}
        <div className="text-center mt-16 text-6xl text-red-500/20">
          怪
        </div>
      </div>
    </div>
  );
};

export default OneArticle;