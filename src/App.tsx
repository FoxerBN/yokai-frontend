import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './sections/HeroSection';
import FeaturedSection from './sections/FeaturedSection';
import CategoriesSection from './sections/CategoriesSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          25% { transform: translateY(-20px) rotate(90deg); opacity: 1; }
          50% { transform: translateY(-40px) rotate(180deg); opacity: 0.8; }
          75% { transform: translateY(-20px) rotate(270deg); opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>

      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <Footer />
    </div>
  );
}

export default App;