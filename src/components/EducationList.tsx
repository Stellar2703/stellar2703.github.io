"use client";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import type { Resume } from "@/types/resume";
import { MotionCard } from "@/components/MotionCard";

export function EducationList({ items }: { items: Resume["education"] }) {
  if (!items?.length) return null;
  
  return (
    <section id="education" className="w-full max-w-4xl mx-auto py-16 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider badge-emerald mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic Background</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">Education</h2>
        <p className="text-muted max-w-md mx-auto text-sm sm:text-base">
          Education details and core engineering coursework
        </p>
      </motion.div>

      {/* Education Cards */}
      <div className="space-y-6">
        {items.map((e, i) => (
          <MotionCard key={i} delay={i * 0.1} className="border-t-2 border-t-emerald-500">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">
                  {e.degree}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                  <GraduationCap className="w-4.5 h-4.5 text-muted" />
                  <span>{e.institution}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-muted">
                  {(e.start || e.end) && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{e.start} – {e.end}</span>
                    </div>
                  )}
                  {e.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{e.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Coursework block */}
              <div className="sm:text-right text-left text-xs text-muted max-w-xs">
                <span className="font-semibold block text-foreground mb-1">Key Coursework</span>
                <span>Data Structures, Algorithms, Operating Systems, DBMS, Computer Networks, Cloud Computing</span>
              </div>
            </div>
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
