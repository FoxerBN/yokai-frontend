import React, { useState, useEffect } from 'react';
import { Save, X, User, Eye, Heart, Image, Link } from 'lucide-react';
import { Article } from '../../types';

interface ArticleData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  sources?: string[];
  readingTime?: number;
  _id?: string;
  views?: number;
  likes?: number;
}

interface EditArticleSectionProps {
  article: Article | null;
  onSave: (articleData: ArticleData) => Promise<void>;
  onCancel: () => void;
}

interface FormData {
  title: string;
  slug: string;
  author: string;
  category: string;
  views: number;
  likes: number;
  imageUrl: string;
  excerpt: string;
  content: string;
  sourcesText: string;
}

const EditArticleSection: React.FC<EditArticleSectionProps> = ({ article, onSave, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    author: 'foxerBN',
    category: '',
    views: 0,
    likes: 0,
    imageUrl: '',
    excerpt: '',
    content: '',
    sourcesText: '',
  });
  const [saving, setSaving] = useState(false);

  // Load article data when article changes
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        author: article.author || '',
        category: typeof article.category === 'object' ? article.category._id : article.category || '',
        views: article.views || 0,
        likes: article.likes || 0,
        imageUrl: article.imageUrl || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        sourcesText: article.sources?.join('\n') || '',
      });
    }
  }, [article]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const calculateReadingTime = (text: string): number => {
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required!');
      return;
    }

    if (!formData.category.trim()) {
      alert('Category is required! (Enter category slug, e.g., "kitsune")');
      return;
    }

    setSaving(true);
    
    try {
      const sources = formData.sourcesText
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      // Generate slug if not provided
      const slug = formData.slug || formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const articleData: ArticleData = {
        title: formData.title,
        slug: slug,
        category: formData.category,
        imageUrl: formData.imageUrl || undefined,
        excerpt: formData.excerpt,
        content: formData.content,
        sources: sources.length > 0 ? sources : undefined,
        readingTime: calculateReadingTime(formData.content),
      };

      // Only include views and likes if article already exists (editing)
      if (article) {
        articleData.views = formData.views;
        articleData.likes = formData.likes;
        articleData._id = article._id;
      }

      await onSave(articleData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {article ? 'Edit Article' : 'New Article'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Title and Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Article title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="article-slug"
            />
          </div>
        </div>

        {/* Author and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Author name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category Slug *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="e.g., kitsune, oni, yurei..."
              required
            />
            <p className="text-xs text-gray-400 mt-1">Enter category slug (not ID)</p>
          </div>
        </div>

        {/* Views and Likes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Eye className="inline h-4 w-4 mr-1" />
              Views
            </label>
            <input
              type="number"
              name="views"
              value={formData.views}
              onChange={handleNumberInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Heart className="inline h-4 w-4 mr-1" />
              Likes
            </label>
            <input
              type="number"
              name="likes"
              value={formData.likes}
              onChange={handleNumberInputChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Image className="inline h-4 w-4 mr-1" />
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Excerpt (short description)
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            placeholder="Short article description..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content *
            <span className="ml-2 text-xs text-gray-400">
              (Reading time: {calculateReadingTime(formData.content)} min)
            </span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={12}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            placeholder="Article content..."
            required
          />
        </div>

        {/* Sources */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Link className="inline h-4 w-4 mr-1" />
            Sources (one per line)
          </label>
          <textarea
            name="sourcesText"
            value={formData.sourcesText}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            placeholder="https://source1.com&#10;https://source2.com"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={!formData.title.trim() || !formData.content.trim() || saving}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                {article ? 'Update Article' : 'Create Article'}
              </>
            )}
          </button>

          <button
            onClick={onCancel}
            disabled={saving}
            className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg hover:border-red-500 hover:text-red-400 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="h-5 w-5" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditArticleSection;
