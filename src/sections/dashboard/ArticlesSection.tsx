import React, { useState, useEffect, useCallback } from 'react';
import { Search, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllArticles, quickSearchArticles, getArticleCount } from '../../api';
import { Article } from '../../types';

interface ArticlesSectionProps {
  onEdit: (article: Article) => void;
  onNewArticle: () => void;
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ onEdit, onNewArticle }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Partial<Article>[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  const ARTICLES_PER_PAGE = 5;
  const totalPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllArticles(currentPage, ARTICLES_PER_PAGE);
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchTotalCount = useCallback(async () => {
    try {
      const count = await getArticleCount();
      setTotalCount(count);
    } catch (error) {
      console.error('Error fetching article count:', error);
    }
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) return;
    
    try {
      const results = await quickSearchArticles(searchTerm);
      setSearchResults(results);
      setShowSearchDropdown(true);
    } catch (error) {
      console.error('Error searching articles:', error);
    }
  }, [searchTerm]);

  // Fetch articles
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Fetch total count
  useEffect(() => {
    fetchTotalCount();
  }, [fetchTotalCount]);

  // Search functionality
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, handleSearch]);

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete article:', id);
  };

  const handleEditClick = (article: Article) => {
    onEdit(article);
  };

  const handleView = (slug: string) => {
    window.open(`/article/${slug}`, '_blank');
  };

  const handleSelectSearchResult = (slug: string) => {
    setSearchTerm('');
    setShowSearchDropdown(false);
    const article = articles.find(a => a.slug === slug);
    if (article) {
      onEdit(article);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Articles</h2>
          <p className="text-gray-400 mt-1">Total: {totalCount} articles</p>
        </div>
        <button 
          onClick={onNewArticle}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + New Article
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        {/* Search Dropdown */}
        {showSearchDropdown && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {searchResults.map((article) => (
              <button
                key={article._id}
                onClick={() => handleSelectSearchResult(article.slug!)}
                className="w-full text-left px-4 py-3 hover:bg-gray-600 transition-colors border-b border-gray-600 last:border-b-0"
              >
                <p className="text-white font-medium">{article.title}</p>
                <p className="text-gray-400 text-sm">{article.slug}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Articles Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          <p className="text-gray-400 mt-2">Loading articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No articles found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Views</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Likes</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Published</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                  <td className="py-4 px-4">
                    <p className="text-white font-medium">{article.title}</p>
                    <p className="text-gray-400 text-sm">{article.slug}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-300">
                      {typeof article.category === 'object' ? article.category.name : article.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{article.views || 0}</td>
                  <td className="py-4 px-4 text-gray-300">{article.likes || 0}</td>
                  <td className="py-4 px-4 text-gray-300">
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Draft'}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleView(article.slug)}
                        className="p-2 text-blue-400 hover:bg-gray-700 rounded transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditClick(article)}
                        className="p-2 text-green-400 hover:bg-gray-700 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="p-2 text-red-400 hover:bg-gray-700 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-400">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesSection;
