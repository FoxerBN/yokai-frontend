import React from 'react';

interface FloatingParticleProps {
  delay: number;
}

const FloatingParticle: React.FC<FloatingParticleProps> = ({ delay }) => (
  <div 
    className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-60 animate-pulse"
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animation: `float 6s ease-in-out infinite ${delay}s`
    }}
  />
);

export default FloatingParticle;