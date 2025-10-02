import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { loginAdmin } from '../../adminApi';
import content from '../../data/content.json';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleNavigation = (href: string) => {
    if (href === '#') return;
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginAdmin(password);
      localStorage.setItem('isAdmin', 'true');
      setIsModalOpen(false);
      setPassword('');
      window.location.reload();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  onClick={() => navigate('/')} 
                  src="/logo.png" 
                  alt="Logo" 
                  className="h-10 w-10 cursor-pointer" 
                />
                <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">
                  {content.navigation.brand}
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                {content.footer.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                {content.footer.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className="hover:text-red-400 transition-colors duration-200"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>{content.footer.copyright}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Admin Login</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setPassword('');
                  setError('');
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              
              {error && (
                <p className="mt-2 text-red-500 text-sm">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;