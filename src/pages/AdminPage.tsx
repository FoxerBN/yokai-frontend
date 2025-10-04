import React, { useState } from "react";
import { FileText, Edit3 } from "lucide-react";
import ArticlesSection from "../sections/dashboard/ArticlesSection";
import EditArticleSection from "../sections/dashboard/EditArticleSection";
import { Article } from "../types";
import { createArticle } from "../api";

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'edit'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveTab('edit');
  };

  const handleNewArticle = () => {
    setSelectedArticle(null);
    setActiveTab('edit');
  };

  const handleSaveArticle = async (articleData: {
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
  }) => {
    try {
      if (selectedArticle) {
        // TODO: Implement update article API
        console.log('Updating article:', articleData);
        alert('Update article API not implemented yet');
      } else {
        // Create new article
        const newArticle = await createArticle({
          title: articleData.title,
          slug: articleData.slug,
          content: articleData.content,
          excerpt: articleData.excerpt,
          category: articleData.category,
          imageUrl: articleData.imageUrl,
          sources: articleData.sources,
          readingTime: articleData.readingTime,
        });
        console.log('Article created:', newArticle);
        alert('Article created successfully! 🎉');
        setActiveTab('articles');
        setSelectedArticle(null);
      }
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      console.error('Error saving article:', error);
      alert(axiosError.response?.data?.message || 'Failed to save article');
    }
  };

  const handleCancelEdit = () => {
    setSelectedArticle(null);
    setActiveTab('articles');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-300">Manage your content</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'articles'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <FileText className="h-5 w-5" />
            Articles
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'edit'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Edit3 className="h-5 w-5" />
            {selectedArticle ? 'Edit Article' : 'New Article'}
          </button>
        </div>

        {activeTab === 'articles' ? (
          <ArticlesSection 
            onEdit={handleEditArticle}
            onNewArticle={handleNewArticle}
          />
        ) : (
          <EditArticleSection 
            article={selectedArticle}
            onSave={handleSaveArticle}
            onCancel={handleCancelEdit}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
