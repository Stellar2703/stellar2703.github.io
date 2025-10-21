"use client";
import { motion } from "framer-motion";
import { Briefcase, Circle } from "lucide-react";
import type { Resume } from "@/types/resume";
import { MotionCard } from "@/components/MotionCard";

export function ExperienceTimeline({ items }: { items: Resume["experience"] }) {
  return (
    <section className="w-full max-w-5xl mx-auto py-12 md:py-16">
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
          <Briefcase className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Career Journey</span>
        </motion.div>
        <h3 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">Experience</h3>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Building impactful solutions and driving innovation
        </p>
      </motion.div>

      <div className="relative">
        {/* Animated timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top"
        />

        <ul className="space-y-8">
          {items?.map((it, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-16"
            >
              {/* Timeline dot with pulse */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.2, type: "spring" }}
                className="absolute left-0 top-6"
              >
                <div className="relative">
                  <Circle className="w-12 h-12 text-purple-500 fill-purple-500/20" />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-purple-500/30"
                  />
                </div>
              </motion.div>

              <MotionCard delay={idx * 0.1} className="group">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                  {it.title}
                </h4>
                
                {it.bullets && it.bullets.length > 0 && (
                  <ul className="space-y-2">
                    {it.bullets.map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + i * 0.05 }}
                        className="flex items-start gap-3 text-foreground/70"
                      >
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </MotionCard>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
