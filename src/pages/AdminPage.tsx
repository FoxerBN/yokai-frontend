import React from "react";
import { NavLink } from "react-router-dom";
import {
  Plus,
  CreditCard as Edit3,
  Trash2,
  Search,
  Save,
  X,
  Calendar,
  User,
  Eye,
  Heart,
  Clock,
  Image,
  Link,
} from "lucide-react";

import { useCreateEditArticle } from "../hooks/useCreateEditArticle";

const AdminDashboard: React.FC = () => {
  const {
    // State
    articles,
    filteredArticles,
    searchTerm,
    isEditing,
    formData,

    // Actions
    handleInputChange,
    handleAddArticle,
    handleEditArticle,
    handleUpdateArticle,
    handleDeleteArticle,
    resetForm,
    setSearchTerm,

    // Utility functions
    calculateReadingTime,
    formatDate
  } = useCreateEditArticle();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 mt-10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-300">Spravujte vaše články a obsah</p>
        </div>

        {/* Article Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? "Upraviť článok" : "Nový článok"}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Názov článku
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                placeholder="Zadajte názov článku..."
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
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                placeholder="slug-artiklu"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Image className="inline h-4 w-4 mr-1" />
              URL obrázka
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              placeholder="https://example.com/obrazok.jpg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Krátky popis (excerpt)
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
              placeholder="Krátky popis článku..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Obsah článku
              <span className="ml-2 text-xs text-gray-400">
                (Odhadovaný čas čítania: {calculateReadingTime(formData.content)} min)
              </span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={8}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
              placeholder="Napíšte obsah článku..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Link className="inline h-4 w-4 mr-1" />
              Zdroje (jeden na riadok)
            </label>
            <textarea
              name="sourcesText"
              value={formData.sourcesText}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
              placeholder="https://wikipedia.org/article1
https://source2.com/article2
https://source3.com/article3"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={isEditing ? handleUpdateArticle : handleAddArticle}
              disabled={!formData.title.trim() || !formData.content.trim()}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isEditing ? (
                <Save className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              {isEditing ? "Aktualizovať" : "Pridať článok"}
            </button>

            {isEditing && (
              <button
                onClick={resetForm}
                className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg hover:border-red-500 hover:text-red-400 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                <X className="h-5 w-5" />
                Zrušiť
              </button>
            )}
          </div>
        </div>

        {/* Search and Articles List */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">
              Všetky články ({articles.length})
            </h2>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all w-full md:w-80"
                placeholder="Hľadať články..."
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div
                key={article._id}
                className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/50 hover:border-red-500/30 transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      {article.imageUrl && (
                        <div className="flex-shrink-0">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-20 h-16 object-cover rounded-lg border border-gray-600"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                          <NavLink to={`/article/${article.slug}`}>{article.title}</NavLink>
                        </h3>
                        <p className="text-gray-300 mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {article.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readingTime} min čítania
                      </div>
                    </div>

                    {article.sources.length > 0 && (
                      <div className="text-sm text-gray-500">
                        <Link className="inline h-3 w-3 mr-1" />
                        {article.sources.length} {article.sources.length === 1 ? 'zdroj' : 'zdrojov'}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-4 lg:mt-0">
                    <button
                      onClick={() => handleEditArticle(article)}
                      className="bg-blue-600/20 text-blue-400 p-2 rounded-lg hover:bg-blue-600/30 transition-colors"
                      title="Upraviť článok"
                    >
                      <Edit3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article._id)}
                      className="bg-red-600/20 text-red-400 p-2 rounded-lg hover:bg-red-600/30 transition-colors"
                      title="Vymazať článok"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  {searchTerm ? "Žiadne články nenájdené" : "Žiadne články"}
                </div>
                <p className="text-gray-500">
                  {searchTerm
                    ? "Skúste iné kľúčové slová"
                    : "Začnite pridaním nového článku"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
