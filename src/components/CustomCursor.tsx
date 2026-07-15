"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Game-style cursor matching the reference image:
 * - Clean filled triangle arrow shape (standard OS cursor silhouette)
 * - Blue → lighter blue gradient (top to bottom)
 * - Lagged soft glow dot trails behind
 */

// Standard OS cursor path — tip at (0,0), pointing upper-left
// Outer arrow shell + inner notch to create the classic cursor shape
const OUTER = "M 1 0 L 1 18 L 6 13 L 10 21 L 13.5 19.5 L 9.5 11.5 L 16 11.5 Z";

export function CustomCursor() {
  const [mounted, setMounted]     = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isDown, setIsDown]       = useState(false);

  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  const ax = useSpring(mx, { damping: 55, stiffness: 850, mass: 0.2 });
  const ay = useSpring(my, { damping: 55, stiffness: 850, mass: 0.2 });

  const tx = useSpring(mx, { damping: 25, stiffness: 140, mass: 0.6 });
  const ty = useSpring(my, { damping: 25, stiffness: 140, mass: 0.6 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const el = e.target as HTMLElement;
      setIsPointer(
        el.tagName === "A" || el.tagName === "BUTTON" ||
        !!el.closest("a") || !!el.closest("button") ||
        window.getComputedStyle(el).cursor === "pointer"
      );
    };
    const onDown = () => setIsDown(true);
    const onUp   = () => setIsDown(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mx, my]);

  if (!mounted) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">

        {/* Trailing glow */}
        <motion.div style={{ x: tx, y: ty }} className="absolute">
          <motion.div
            animate={{ width: isPointer ? 24 : 12, height: isPointer ? 24 : 12, opacity: 0.22 }}
            transition={{ duration: 0.2 }}
            className="rounded-full bg-blue-500 -translate-x-1/2 -translate-y-1/2 blur-md"
          />
        </motion.div>

        {/* Main cursor SVG */}
        <motion.div style={{ x: ax, y: ay }} className="absolute">
          <motion.svg
            width="20"
            height="26"
            viewBox="0 0 16 22"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ scale: isDown ? 0.8 : isPointer ? 0.9 : 1 }}
            transition={{ duration: 0.1 }}
            style={{ display: "block", overflow: "visible" }}
          >
            <defs>
              {/* Blue gradient matching the reference image */}
              <linearGradient id="cursor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#2962FF" />
                <stop offset="100%" stopColor="#82A8FF" />
              </linearGradient>

              {/* Soft drop shadow */}
              <filter id="cursor-drop" x="-30%" y="-20%" width="200%" height="200%">
                <feDropShadow dx="1.5" dy="2" stdDeviation="2" floodColor="rgba(41,98,255,0.30)" />
              </filter>
            </defs>

            {/* Cursor body — gradient fill, crisp edges */}
            <path
              d={OUTER}
              fill="url(#cursor-grad)"
              filter="url(#cursor-drop)"
            />
          </motion.svg>
        </motion.div>

      </div>
    </>
  );
}
