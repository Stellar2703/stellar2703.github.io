"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ORBS = [
  {
    gradient: "radial-gradient(circle at center, rgba(102,126,234,0.6), rgba(118,75,162,0.4), transparent 70%)",
    initial: { x: "-20%", y: "-10%" },
    animate: { x: "-10%", y: "10%" },
    size: "w-[600px] h-[600px]",
  },
  {
    gradient: "radial-gradient(circle at center, rgba(240,147,251,0.5), rgba(79,172,254,0.4), transparent 70%)",
    initial: { x: "80%", y: "20%" },
    animate: { x: "70%", y: "40%" },
    size: "w-[700px] h-[700px]",
  },
  {
    gradient: "radial-gradient(circle at center, rgba(0,242,254,0.55), rgba(102,126,234,0.35), transparent 70%)",
    initial: { x: "40%", y: "70%" },
    animate: { x: "50%", y: "60%" },
    size: "w-[550px] h-[550px]",
  },
];

export function BackgroundFX() {
  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - different for light/dark */}
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_top,#0f0a2e,#050510_50%,#000000)] bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100" />
      
      {/* Animated grid */}
      <motion.div 
        className="absolute inset-0 bg-grid opacity-20"
        style={{ y: y1 }}
      />
      
      {/* Dots pattern overlay */}
      <motion.div 
        className="absolute inset-0 bg-dots opacity-30"
        style={{ y: y2 }}
      />

      {/* Floating light orbs with parallax */}
      {ORBS.map((orb, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${orb.size} blur-[100px]`}
          style={{
            background: orb.gradient,
            left: orb.initial.x,
            top: orb.initial.y,
            x: prefersReducedMotion ? 0 : mousePosition.x * (idx + 1) * 0.5,
            y: prefersReducedMotion ? 0 : mousePosition.y * (idx + 1) * 0.5,
            opacity,
          }}
          initial={orb.initial}
          animate={prefersReducedMotion ? orb.initial : orb.animate}
          transition={{
            duration: 20 + idx * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Rotating gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, rgba(102,126,234,0.2), rgba(118,75,162,0.15), rgba(240,147,251,0.2), rgba(79,172,254,0.15), rgba(0,242,254,0.2), rgba(102,126,234,0.2))",
        }}
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* Spotlight effect following cursor */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
            left: "50%",
            top: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}

      {/* Floating geometric shapes */}
      {!prefersReducedMotion && (
        <>
          {/* Circle */}
          <motion.div
            className="absolute w-32 h-32 rounded-full border-2 border-purple-500/20"
            style={{ left: "15%", top: "20%" }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Triangle */}
          <motion.div
            className="absolute w-24 h-24"
            style={{ right: "20%", top: "30%", opacity: 0.15 }}
            animate={{
              y: [20, -20, 20],
              rotate: [0, -360],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          {/* Square */}
          <motion.div
            className="absolute w-20 h-20 border-2 border-blue-500/20 rounded-lg"
            style={{ left: "70%", bottom: "20%" }}
            animate={{
              y: [10, -10, 10],
              rotate: [45, 405],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Hexagon */}
          <motion.div
            className="absolute w-28 h-28"
            style={{ left: "10%", bottom: "25%", opacity: 0.15 }}
            animate={{
              y: [-15, 15, -15],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,2 93,25 93,75 50,98 7,75 7,25"
                fill="none"
                stroke="url(#grad2)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4facfe" />
                  <stop offset="100%" stopColor="#00f2fe" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </>
      )}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
