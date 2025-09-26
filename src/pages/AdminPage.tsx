import React, { useState } from 'react';
import { Plus, CreditCard as Edit3, Trash2, Search, Save, X, Calendar, User, Eye, Heart } from 'lucide-react';

interface Article {
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
}

// Mock data
const mockArticles: Article[] = [
  {
    _id: "68cee7d8fa71700cc7747e81",
    title: "Bakeneko: Mačka ktorá sa zmenila",
    slug: "bakeneko-macka-ktora-sa-zmenila",
    content: "Bakeneko je legendárna mačka obake, ktorá získala nadprirodzené schopnosti. Tieto mystické bytosti sú súčasťou japonského folklóru a predstavujú mačky, ktoré sa transformovali do nadprirodzenej formy. Podľa legendy sa mačka môže stať bakeneko, ak dosiahne určitý vek alebo zažije traumatickú udalosť...",
    excerpt: "Bakeneko je legendárna mačka obake, ktorá získala nadprirodzené schopnosti a stala sa súčasťou japonského folklóru.",
    author: "Admin",
    category: "68cee6fc67b167d77c065c18",
    publishedAt: "2024-01-15T00:00:00.000+00:00",
    views: 150,
    likes: 12,
    createdAt: "2025-09-20T17:43:52.100+00:00",
    updatedAt: "2025-09-20T17:43:52.100+00:00"
  },
  {
    _id: "68cee7d8fa71700cc7747e82",
    title: "Kitsune: Deväťchvostá líška",
    slug: "kitsune-devatchvosta-liska",
    content: "Kitsune sú inteligentné líšky z japonskej mytológie, ktoré majú schopnosť meniť svoju podobu. Čím staršia je kitsune, tým viac chvostov má - až do maximálneho počtu deviatich. Tieto mystické bytosti môžu byť dobré alebo zlé, v závislosti od ich charakteru a zámerov...",
    excerpt: "Kitsune sú mystické líšky z japonskej mytológie so schopnosťou zmeny podoby a až deviatimi chvostami.",
    author: "Admin", 
    category: "68cee6fc67b167d77c065c18",
    publishedAt: "2024-01-20T00:00:00.000+00:00",
    views: 203,
    likes: 18,
    createdAt: "2025-09-21T10:15:30.100+00:00",
    updatedAt: "2025-09-21T10:15:30.100+00:00"
  },
  {
    _id: "68cee7d8fa71700cc7747e83",
    title: "Tengu: Horskí bojovníci",
    slug: "tengu-horski-bojovnici", 
    content: "Tengu sú legendárni horskí démoni a bojovníci z japonskej mytológie. Tradične sa zobrazujú s dlhými nosmi alebo zobákmi a krídlami. Sú známi ako majstri bojových umení a často sa im pripisuje schopnosť učiť samurajov pokročilé techniky boja...",
    excerpt: "Tengu sú horskí démoni a majstri bojových umení z japonskej mytológie, známi svojimi dlhými nosmi.",
    author: "Admin",
    category: "68cee6fc67b167d77c065c18", 
    publishedAt: "2024-01-25T00:00:00.000+00:00",
    views: 89,
    likes: 7,
    createdAt: "2025-09-22T14:22:15.100+00:00",
    updatedAt: "2025-09-22T14:22:15.100+00:00"
  }
];

const AdminDashboard: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: 'Admin',
    category: '68cee6fc67b167d77c065c18'
  });

  // Filter articles based on search
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && { slug: generateSlug(value) })
    }));
  };

  // Handle add new article
  const handleAddArticle = () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    const newArticle: Article = {
      _id: Date.now().toString(),
      ...formData,
      publishedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setArticles(prev => [newArticle, ...prev]);
    resetForm();
  };

  // Handle edit article
  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setIsEditing(true);
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt,
      author: article.author,
      category: article.category
    });
  };

  // Handle update article
  const handleUpdateArticle = () => {
    if (!editingArticle || !formData.title.trim() || !formData.content.trim()) return;

    setArticles(prev => prev.map(article => 
      article._id === editingArticle._id 
        ? { ...article, ...formData, updatedAt: new Date().toISOString() }
        : article
    ));
    resetForm();
  };

  // Handle delete article
  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Ste si istí, že chcete vymazať tento článok?')) {
      setArticles(prev => prev.filter(article => article._id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      author: 'Admin',
      category: '68cee6fc67b167d77c065c18'
    });
    setEditingArticle(null);
    setIsEditing(false);
  };

  // Format date
  const formatDate = (dateString: string) => {
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
          <p className="text-xl text-gray-300">
            Spravujte vaše články a obsah
          </p>
        </div>

        {/* Article Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? 'Upraviť článok' : 'Nový článok'}
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

          <div className="flex gap-4">
            <button
              onClick={isEditing ? handleUpdateArticle : handleAddArticle}
              disabled={!formData.title.trim() || !formData.content.trim()}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isEditing ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {isEditing ? 'Aktualizovať' : 'Pridať článok'}
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
              <div key={article._id} className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/50 hover:border-red-500/30 transition-all group">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-300 mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
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
                    </div>
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
                  {searchTerm ? 'Žiadne články nenájdené' : 'Žiadne články'}
                </div>
                <p className="text-gray-500">
                  {searchTerm ? 'Skúste iné kľúčové slová' : 'Začnite pridaním nového článku'}
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