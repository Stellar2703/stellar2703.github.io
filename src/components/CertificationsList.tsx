"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Calendar } from "lucide-react";
import type { Resume } from "@/types/resume";

export function CertificationsList({ items }: { items: NonNullable<Resume["certifications"]> }) {
  if (!items?.length) return null;
  
  return (
    <section id="certifications" className="w-full max-w-6xl mx-auto py-16 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider badge-emerald mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Achievements</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">Certifications</h2>
        <p className="text-muted max-w-md mx-auto text-sm sm:text-base">
          Industry-certified credentials and platform specializations
        </p>
      </motion.div>

      {/* Certifications Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex"
          >
            <div className="border border-border border-t-2 border-t-emerald-500 bg-card rounded-xl overflow-hidden flex flex-col w-full hover:border-foreground/20 hover:shadow-md transition-all duration-300">
              {/* Badge/Logo Image container */}
              {c.image ? (
                <div className="relative h-32 bg-foreground/5 border-b border-border flex items-center justify-center p-6 flex-shrink-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative h-32 bg-foreground/5 border-b border-border flex items-center justify-center flex-shrink-0">
                  <Award className="w-10 h-10 text-muted/30" />
                </div>
              )}
              
              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground leading-snug mb-1 line-clamp-2">
                    {c.name}
                  </h3>
                  {c.issuer && (
                    <p className="text-xs text-muted mb-3 font-medium">
                      {c.issuer}
                    </p>
                  )}
                </div>
                
                {c.date && (
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted/80 tracking-wide uppercase">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{c.date}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
