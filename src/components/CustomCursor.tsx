"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Trail springs - must be at top level
  const trailXSpring = useSpring(cursorX, { damping: 20, stiffness: 150 });
  const trailYSpring = useSpring(cursorY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    setMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsPointer(isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50">
      {/* Main cursor */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        className="absolute"
      >
        <motion.div
          animate={{
            scale: isPointer ? 1.5 : 1,
            opacity: isPointer ? 0.6 : 0.8,
          }}
          className="relative -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-8 h-8 rounded-full border-2 border-purple-400 bg-purple-400/10" />
          <div className="absolute inset-0 w-8 h-8 rounded-full border-2 border-pink-400 animate-ping opacity-20" />
        </motion.div>
      </motion.div>
      
      {/* Trail dot */}
      <motion.div
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-2 h-2 rounded-full bg-blue-400" />
      </motion.div>
    </div>
  );
}
