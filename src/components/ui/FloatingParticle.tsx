import React, { useRef } from "react";

interface FloatingParticleProps {
  delay: number;
}

const FloatingParticle: React.FC<FloatingParticleProps> = ({ delay }) => {
  const leftRef = useRef<string>(`${Math.random() * 100}%`);
  const topRef = useRef<string>(`${Math.random() * 100}%`);

  return (
    <div
      className="absolute w-0.5 h-0.5 bg-amber-400 rounded-full opacity-90 z-10"
      style={{
        left: leftRef.current,
        top: topRef.current,
        animation: `float 6s ease-in-out infinite ${delay}s`,
        filter: "drop-shadow(0 0 10px rgba(251, 191, 36, 1))",
        willChange: "transform",
      }}
    />
  );
};

export default React.memo(FloatingParticle);