// src/hooks/useCreateEditArticle.ts

import { useState, useCallback } from 'react';
import { Article, ArticleFormData, Category } from '../types';
import mockArticlesData from '../data/mock-data.json';
import yokaiData from '../data/yokai.json';

const INITIAL_FORM_DATA: ArticleFormData = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  author: 'Admin',
  category: 'yokai-animals',
  imageUrl: '',
  sourcesText: '',
  views: 0,
  likes: 0
};

export const useCreateEditArticle = () => {
  // State
  const [articles, setArticles] = useState<Article[]>(mockArticlesData as Article[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>(INITIAL_FORM_DATA);

  // Get categories from yokai.json
  const categories: Category[] = yokaiData.categories;

  // Utility functions
  const generateSlug = useCallback((title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }, []);

  const calculateReadingTime = useCallback((content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    return Math.max(1, Math.ceil(words.length / wordsPerMinute));
  }, []);

  const parseSourcesFromText = useCallback((sourcesText: string): string[] => {
    return sourcesText
      .split('\n')
      .map(source => source.trim())
      .filter(source => source.length > 0);
  }, []);

  const stringifySources = useCallback((sources: string[]): string => {
    return sources.join('\n');
  }, []);

  // Filter articles based on search
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form handlers
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && { slug: generateSlug(value) })
    }));
  }, [generateSlug]);

  const handleNumberInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setEditingArticle(null);
    setIsEditing(false);
  }, []);

  // CRUD Operations
  const handleAddArticle = useCallback(() => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required!');
      return;
    }

    const newArticle: Article = {
      _id: Date.now().toString(),
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      content: formData.content,
      excerpt: formData.excerpt,
      author: formData.author || 'Admin',
      category: formData.category,
      imageUrl: formData.imageUrl,
      sources: parseSourcesFromText(formData.sourcesText),
      readingTime: calculateReadingTime(formData.content),
      views: formData.views,
      likes: formData.likes,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setArticles(prev => [newArticle, ...prev]);
    resetForm();
  }, [formData, generateSlug, calculateReadingTime, parseSourcesFromText, resetForm]);

  const handleEditArticle = useCallback((article: Article) => {
    setEditingArticle(article);
    setIsEditing(true);
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt,
      author: article.author,
      category: article.category,
      imageUrl: article.imageUrl,
      sourcesText: stringifySources(article.sources),
      views: article.views,
      likes: article.likes
    });
  }, [stringifySources]);

  const handleUpdateArticle = useCallback(() => {
    if (!editingArticle || !formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required!');
      return;
    }

    setArticles(prev => prev.map(article =>
      article._id === editingArticle._id
        ? { 
            ...article,
            title: formData.title,
            slug: formData.slug || generateSlug(formData.title),
            content: formData.content,
            excerpt: formData.excerpt,
            author: formData.author,
            category: formData.category,
            imageUrl: formData.imageUrl,
            sources: parseSourcesFromText(formData.sourcesText),
            readingTime: calculateReadingTime(formData.content),
            views: formData.views,
            likes: formData.likes,
            updatedAt: new Date().toISOString()
          }
        : article
    ));
    resetForm();
  }, [editingArticle, formData, generateSlug, calculateReadingTime, parseSourcesFromText, resetForm]);

  const handleDeleteArticle = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setArticles(prev => prev.filter(article => article._id !== id));
    }
  }, []);

  return {
    // State
    articles,
    filteredArticles,
    searchTerm,
    editingArticle,
    isEditing,
    formData,
    categories,

    // Actions
    setSearchTerm,
    handleInputChange,
    handleNumberInputChange,
    handleAddArticle,
    handleEditArticle,
    handleUpdateArticle,
    handleDeleteArticle,
    resetForm,

    // Utilities
    calculateReadingTime,
    parseSourcesFromText,
    stringifySources
  };
};