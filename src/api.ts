import axios from "axios";
import { PopularArticle, Article } from "./types";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch 6 most liked articles
export const getMostLikedArticles = async (): Promise<PopularArticle[]> => {
  try {
    const response = await api.get<PopularArticle[]>("/articles/popular");
    return response.data;
  } catch (error) {
    console.error("Error fetching popular articles:", error);
    throw error;
  }
};

//Fetch article by slug
export const getArticleBySlug = async (slug: string): Promise<Article> => {
  try {
    const response = await api.get<Article>(`/articles/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    throw error;
  }
};

// Increment view count
export const incrementViews = async (slug: string): Promise<void> => {
  try {
    await api.post(`/articles/${slug}/view`);
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
};

// Toggle like status
export const toggleLike = async (slug: string): Promise<{ likes: number; liked: boolean }> => {
  try {
    const response = await api.post(`/articles/${slug}/like`);
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

// Check if the article is liked by the user
export const checkLikeStatus = async (slug: string): Promise<boolean> => {
  try {
    const response = await api.get(`/articles/${slug}/like-status`);
    return response.data.liked;
  } catch (error) {
    console.error("Error checking like status:", error);
    return false;
  }
};

// Admin API - Get all articles with pagination
export const getAllArticles = async (page = 1, limit = 5): Promise<Article[]> => {
  try {
    const response = await api.get<Article[]>(`/articles?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all articles:", error);
    throw error;
  }
};

// Admin API - Quick search articles
export const quickSearchArticles = async (searchTerm: string, limit = 8): Promise<Partial<Article>[]> => {
  try {
    const response = await api.get<Partial<Article>[]>(`/articles/search/quick?q=${searchTerm}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error in quick search:", error);
    throw error;
  }
};

// Admin API - Get article count
export const getArticleCount = async (categorySlug?: string): Promise<number> => {
  try {
    const query = categorySlug ? `?category=${categorySlug}` : '';
    const response = await api.get<{ count: number }>(`/count/articles/count${query}`);
    return response.data.count;
  } catch (error) {
    console.error("Error getting article count:", error);
    throw error;
  }
};

// Admin API - Create new article
interface CreateArticleData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  sources?: string[];
  readingTime?: number;
}

export const createArticle = async (articleData: CreateArticleData): Promise<Article> => {
  try {
    const response = await api.post<Article>('/articles/create-article', articleData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

export default api;