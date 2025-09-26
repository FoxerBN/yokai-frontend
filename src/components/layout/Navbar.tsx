import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import content from '../../data/content.json';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();
  
  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img 
              onClick={() => navigate('/')} 
              src="/logo.png" 
              alt="Logo" 
              className="h-10 w-10 cursor-pointer" 
            />
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">
              {content.navigation.brand}
            </span>
            <button 
              onClick={() => setIsAdmin(!isAdmin)} 
              className="text-gray-300 hover:text-red-400 transition-colors duration-200"
            >
              {isAdmin ? 'Admin' : 'Login'}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {content.navigation.links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
                  className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                >
                  Dashboard
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-red-400 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {content.navigation.links.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                {link.name}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => handleNavigation('/admin')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;