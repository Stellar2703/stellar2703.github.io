"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type MotionCardProps = {
  className?: string;
  children: React.ReactNode;
  delay?: number;
};

export function MotionCard({ className, children, delay = 0 }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      className={cn(
        "rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
