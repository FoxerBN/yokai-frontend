// src/pages/AdminPage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus, Edit3, Trash2, Search, Save, X,
  Calendar, User, Eye, Heart, Clock, Image, Link
} from "lucide-react";
import { useCreateEditArticle } from "../hooks/useCreateEditArticle";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    filteredArticles,
    searchTerm,
    isEditing,
    formData,
    categories,
    setSearchTerm,
    handleInputChange,
    handleNumberInputChange,
    handleAddArticle,
    handleEditArticle,
    handleUpdateArticle,
    handleDeleteArticle,
    resetForm,
    calculateReadingTime
  } = useCreateEditArticle();

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('sk-SK');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 mt-10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-300">Manage your articles</p>
        </div>

        {/* Article Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? "Edit Article" : "New Article"}
            </h2>
            {isEditing && (
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Form Grid */}
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
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
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
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
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
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  placeholder="Author name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.englishName} ({category.name})
                    </option>
                  ))}
                </select>
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
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
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
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
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
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
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
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none"
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
                rows={8}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none"
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
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none"
                placeholder="https://source1.com&#10;https://source2.com"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={isEditing ? handleUpdateArticle : handleAddArticle}
                disabled={!formData.title.trim() || !formData.content.trim()}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditing ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                {isEditing ? "Update" : "Add Article"}
              </button>

              {isEditing && (
                <button
                  onClick={resetForm}
                  className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg hover:border-red-500 hover:text-red-400 transition-all duration-200 flex items-center gap-2"
                >
                  <X className="h-5 w-5" />
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">
              Articles ({filteredArticles.length})
            </h2>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 w-full md:w-80"
                placeholder="Search articles..."
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div
                key={article._id}
                className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/50 hover:border-red-500/30 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      {article.imageUrl && (
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-20 h-16 object-cover rounded-lg border border-gray-600"
                        />
                      )}
                      <div className="flex-1">
                        <h3 
                          className="text-xl font-bold text-white mb-2 hover:text-red-400 cursor-pointer transition-colors"
                          onClick={() => navigate(`/article/${article.slug}`)}
                        >
                          {article.title}
                        </h3>
                        <p className="text-gray-300 mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(article.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {article.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readingTime} min
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 lg:mt-0">
                    <button
                      onClick={() => handleEditArticle(article)}
                      className="bg-blue-600/20 text-blue-400 p-2 rounded-lg hover:bg-blue-600/30 transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article._id)}
                      className="bg-red-600/20 text-red-400 p-2 rounded-lg hover:bg-red-600/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50 text-gray-400" />
                <p className="text-gray-400">
                  {searchTerm ? "No articles found" : "No articles yet"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;