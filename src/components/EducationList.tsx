"use client";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import type { Resume } from "@/types/resume";
import { MotionCard } from "@/components/MotionCard";

export function EducationList({ items }: { items: Resume["education"] }) {
  if (!items?.length) return null;
  
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
          <GraduationCap className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-green-400 uppercase tracking-wider">Academic Background</span>
        </motion.div>
        <h3 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">Education</h3>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Building a strong foundation in technology and innovation
        </p>
      </motion.div>

      <div className="space-y-6">
        {items.map((e, i) => (
          <MotionCard key={i} delay={i * 0.1} className="group">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1 space-y-3">
                <h4 className="text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-blue-400 transition-all">
                  {e.degree}
                </h4>
                
                <div className="flex items-center gap-2 text-foreground/80 font-medium">
                  <GraduationCap className="w-5 h-5 text-green-400" />
                  <span>{e.institution}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                  {(e.start || e.end) && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>{e.start} – {e.end}</span>
                    </div>
                  )}
                  {e.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span>{e.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative element */}
              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl glass-card">
                <GraduationCap className="w-8 h-8 text-green-400" />
              </div>
            </div>

            {/* Gradient accent bar */}
            <div className="mt-4 h-1 w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full" />
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
