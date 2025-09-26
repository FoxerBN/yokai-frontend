import { useState, useCallback } from 'react';
import { Article, ArticleFormData } from '../interfaces/ArticleProps';
import { CategoryCardProps } from '../interfaces/CategoryCardProps';
import mockArticlesData from '../data/mock-data.json';
import yokaiData from '../data/yokai.json';

// Utility hooks
const useSlugGenerator = () => {
  const generateSlug = useCallback((title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }, []);
  
  return { generateSlug };
};

const useReadingTime = () => {
  const calculateReadingTime = useCallback((content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    const readingTime = Math.ceil(words.length / wordsPerMinute);
    return Math.max(1, readingTime);
  }, []);
  
  return { calculateReadingTime };
};

const useDateFormatter = () => {
  const formatDate = useCallback((dateString: string, locale: string = 'sk-SK'): string => {
    return new Date(dateString).toLocaleDateString(locale);
  }, []);
  
  const formatDateTime = useCallback((dateString: string, locale: string = 'sk-SK'): string => {
    return new Date(dateString).toLocaleString(locale);
  }, []);
  
  return { formatDate, formatDateTime };
};

const useSourcesManager = () => {
  const parseSourcesFromText = useCallback((sourcesText: string): string[] => {
    return sourcesText
      .split('\n')
      .map(source => source.trim())
      .filter(source => source.length > 0);
  }, []);
  
  const stringifySources = useCallback((sources: string[]): string => {
    return sources.join('\n');
  }, []);
  
  const validateUrl = useCallback((url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, []);
  
  return { parseSourcesFromText, stringifySources, validateUrl };
};

// Main hook for article management
export const useCreateEditArticle = () => {
  // Initialize with mock data
  const [articles, setArticles] = useState<Article[]>(mockArticlesData as Article[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Get categories from yokai.json
  const categories: CategoryCardProps[] = yokaiData.categories;

  // Form state
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: 'Admin',
    category: 'yokai-animals', // Default to first category
    imageUrl: '',
    sourcesText: ''
  });

  // Using utility hooks
  const { generateSlug } = useSlugGenerator();
  const { calculateReadingTime } = useReadingTime();
  const { formatDate, formatDateTime } = useDateFormatter();
  const { parseSourcesFromText, stringifySources, validateUrl } = useSourcesManager();

  // Filter articles based on search
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get category name by id
  const getCategoryById = useCallback((categoryId: string): CategoryCardProps | undefined => {
    return categories.find(cat => cat.id === categoryId);
  }, [categories]);

  // Reset form - defined first to avoid dependency issues
  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      author: 'Admin',
      category: 'yokai-animals',
      imageUrl: '',
      sourcesText: ''
    });
    setEditingArticle(null);
    setIsEditing(false);
  }, []);

  // Handle form input changes
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

  // Handle add new article
  const handleAddArticle = useCallback(() => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    const readingTime = calculateReadingTime(formData.content);
    const sources = parseSourcesFromText(formData.sourcesText);

    const newArticle: Article = {
      _id: Date.now().toString(),
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      excerpt: formData.excerpt,
      author: formData.author,
      category: formData.category,
      imageUrl: formData.imageUrl,
      sources: sources,
      readingTime: readingTime,
      publishedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setArticles((prev) => [newArticle, ...prev]);
    resetForm();
  }, [formData, calculateReadingTime, parseSourcesFromText, resetForm]);

  // Handle edit article
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
      sourcesText: stringifySources(article.sources)
    });
  }, [stringifySources]);

  // Handle update article
  const handleUpdateArticle = useCallback(() => {
    if (!editingArticle || !formData.title.trim() || !formData.content.trim())
      return;

    const readingTime = calculateReadingTime(formData.content);
    const sources = parseSourcesFromText(formData.sourcesText);

    setArticles(prev => prev.map(article =>
      article._id === editingArticle._id
        ? { 
            ...article, 
            ...formData, 
            sources: sources,
            readingTime: readingTime,
            updatedAt: new Date().toISOString() 
          }
        : article
    ));
    resetForm();
  }, [editingArticle, formData, calculateReadingTime, parseSourcesFromText, resetForm]);

  // Handle delete article
  const handleDeleteArticle = useCallback((id: string) => {
    if (window.confirm("Ste si istí, že chcete vymazať tento článok?")) {
      setArticles((prev) => prev.filter((article) => article._id !== id));
    }
  }, []);

  // Search functionality
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
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
    handleInputChange,
    handleAddArticle,
    handleEditArticle,
    handleUpdateArticle,
    handleDeleteArticle,
    resetForm,
    handleSearch,
    setSearchTerm,

    // Utility functions
    generateSlug,
    calculateReadingTime,
    formatDate,
    formatDateTime,
    parseSourcesFromText,
    stringifySources,
    validateUrl,
    getCategoryById
  };
};
