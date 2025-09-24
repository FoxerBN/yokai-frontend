import React, { useEffect, useState } from "react";
import { Scroll, Eye } from "lucide-react";
import FloatingParticle from "../components/ui/FloatingParticle";
import content from "../data/content.json";

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 opacity-80" />

      {/* Hero Content */}
      <div
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="slide-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-white mb-2">{content.hero.title}</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
              {content.hero.subtitle}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            {content.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
              <Scroll className="h-5 w-5" />
              {content.hero.primaryButton}
            </button>
            <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg hover:border-red-500 hover:text-red-400 transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {content.hero.secondaryButton}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-red-400 to-transparent rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
