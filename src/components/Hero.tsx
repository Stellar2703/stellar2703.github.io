"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useState, useEffect } from "react";
import { DownloadResume } from "./DownloadResume";
import { TypingAnimation } from "./InteractiveElements";

type Props = {
  name?: string;
  title?: string;
  summary?: string;
  urls?: { github?: string; linkedin?: string; portfolio?: string; email?: string };
};

export function Hero({ name = "", title = "", summary = "", urls = {} }: Props) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center gap-8 px-6 overflow-hidden">
      {/* Floating particles */}
      {mounted && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div style={{ y, opacity }} className="relative z-10 space-y-8">


        {/* Main heading with stagger effect */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.6, 0.01, 0.05, 0.95],
            }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter gradient-text mb-4 relative"
          >
            {name.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="inline-block mr-4"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Glowing underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-1 w-48 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm"
          />
        </div>

        {/* Dynamic typing subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          <div className="text-xl sm:text-3xl lg:text-4xl font-medium text-foreground/90 max-w-3xl mx-auto">
            <TypingAnimation
              texts={[
                "Full Stack Developer",
                "Cloud and DevOps Engineer", 
                "DevOps and Cloud Specialist",
                "Infrastructure Engineer",
                "Professional Cloud Architect"
              ]}
              className="gradient-text"
              speed={80}
              deleteSpeed={40}
              pauseDuration={2000}
            />
          </div>
        </motion.div>

        {/* Summary with glass effect */}
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed glass-card rounded-2xl p-6">
              {summary}
            </p>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center max-w-full px-4"
        >
          <Link
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full glass-card holo-border overflow-hidden font-semibold text-sm sm:text-base lg:text-lg hover:scale-105 transition-transform"
          >
            <span className="relative z-10 whitespace-nowrap">View My Work</span>
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <ArrowDown className="size-4 sm:size-5" />
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <DownloadResume />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-foreground/40"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
