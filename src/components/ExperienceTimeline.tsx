"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { Resume } from "@/types/resume";
import { MotionCard } from "@/components/MotionCard";

export function ExperienceTimeline({ items }: { items: Resume["experience"] }) {
  if (!items?.length) return null;

  return (
    <section id="experience" className="w-full max-w-4xl mx-auto py-16 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider badge-indigo mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Career Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">Experience</h2>
        <p className="text-muted max-w-md mx-auto text-sm sm:text-base">
          Recent work in building scalable systems and cloud-native solutions
        </p>
      </motion.div>

      {/* Timeline list — left line + dot approach */}
      <div className="relative">
        {/* Vertical line — starts below the first dot and ends above the last */}
        <div className="absolute left-0 top-3 bottom-3 w-px bg-border" />

        <div className="space-y-10">
          {items.map((it, idx) => (
            <div key={idx} className="relative pl-8">
              {/* Dot — centered on the left border line */}
              <div className="absolute left-0 top-[22px] -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-background z-10" />

              <MotionCard delay={idx * 0.1} className="border-t-2 border-t-indigo-500">
                <div className="flex flex-col gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                    {it.title}
                  </h3>

                  {it.bullets && it.bullets.length > 0 && (
                    <ul className="space-y-2.5">
                      {it.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                          <div className="mt-[7px] w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </MotionCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
