export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  publishedAt: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  readingTime: number;
  imageUrl: string;
  sources: string[];
}

export interface ArticleFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  imageUrl: string;
  sourcesText: string;
}
