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

export default api;