import React, { useRef } from "react";
import type { FloatingParticleProps } from "../../interfaces/FloatingParticlesProps";
const FloatingParticle: React.FC<FloatingParticleProps> = ({ delay }) => {
  const leftRef = useRef<string>(`${Math.random() * 100}%`);
  const topRef = useRef<string>(`${Math.random() * 100}%`);

  return (
    <div
      className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-80 z-10"
      style={{
        left: leftRef.current,
        top: topRef.current,
        animation: `float 6s ease-in-out infinite ${delay}s`,
        filter: "drop-shadow(0 0 6px rgba(251, 191, 36, 0.5))",
        willChange: "transform",
      }}
    />
  );
};

export default React.memo(FloatingParticle);
