"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundFX() {
  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-background" />

      {/* Very clean minimalist dots grid pattern */}
      <motion.div 
        className="absolute inset-0 bg-dots opacity-40 dark:opacity-20"
        style={{ 
          y,
          x: prefersReducedMotion ? 0 : mousePosition.x * 0.3,
        }}
      />
      
      {/* Elegant very soft radial light spotlight at top center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--border)_0%,transparent_70%)] opacity-50 dark:opacity-30 pointer-events-none" />
    </div>
  );
}
