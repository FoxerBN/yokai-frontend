export interface StoryCardProps {
  story: {
    id: number;
    title: string;
    description: string;
    category: string;
    readTime: string;
    image: string;
  };
  index: number;
  getCategoryName: (categoryId: string) => string;
}