"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function SkillsCloud({ skills }: { skills: string[] }) {
  const list = skills || [];
  
  return (
    <section className="w-full max-w-6xl mx-auto py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4"
        >
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">Tech Stack</span>
        </motion.div>
        <h3 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">Skills & Technologies</h3>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          A comprehensive toolkit for building modern applications
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3">
        {list.map((s, i) => (
          <motion.div
            key={s + i}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.4,
              delay: i * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              scale: 1.1,
              rotate: [-1, 1, -1, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <div className="relative px-5 py-2.5 rounded-xl glass-card holo-border cursor-pointer overflow-hidden">
              <span className="relative z-10 font-medium text-sm sm:text-base">
                {s}
              </span>
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 blur-md bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
