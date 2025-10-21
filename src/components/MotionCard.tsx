"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";

type MotionCardProps = {
  className?: string;
  children: React.ReactNode;
  delay?: number;
};

export function MotionCard({ className, children, delay = 0 }: MotionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5);
    const yPct = (mouseY / height - 0.5);
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={cn(
          "group relative rounded-2xl p-6",
          "glass-card holo-border spotlight",
          "transition-all duration-300",
          isHovered && "pulse-glow",
          className
        )}
      >
        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 shimmer rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content with 3D depth */}
        <div
          style={{ transform: "translateZ(50px)" }}
          className="relative z-10"
        >
          {children}
        </div>

        {/* Glow effect following mouse */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${(mouseXSpring.get() + 0.5) * 100}% ${(mouseYSpring.get() + 0.5) * 100}%, rgba(102,126,234,0.2) 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
