import React from 'react';
import { Ghost } from 'lucide-react';
import content from '../../data/content.json';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Ghost className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">
                {content.navigation.brand}
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              {content.footer.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              {content.footer.categories.map((category) => (
                <li key={category.name}>
                  <a href={category.href} className="hover:text-red-400 transition-colors duration-200">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              {content.footer.links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-red-400 transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;