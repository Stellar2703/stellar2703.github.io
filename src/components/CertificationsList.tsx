"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Calendar } from "lucide-react";
import type { Resume } from "@/types/resume";

export function CertificationsList({ items }: { items: NonNullable<Resume["certifications"]> }) {
  if (!items?.length) return null;
  
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
          <Award className="w-4 h-4 text-teal-400" />
          <span className="text-sm font-medium text-teal-400 uppercase tracking-wider">Achievements</span>
        </motion.div>
        <h3 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">Certifications</h3>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Industry-recognized certifications and credentials
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group"
          >
            <div className="glass-card rounded-2xl overflow-hidden hover-lift h-full flex flex-col">
              {/* Certification Image/Badge */}
              {c.image ? (
                <div className="relative h-40 bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-purple-500/10 flex items-center justify-center p-6">
                  <div className="relative w-full h-full">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative h-40 bg-gradient-to-br from-teal-500/10 via-blue-500/10 to-purple-500/10 flex items-center justify-center">
                  <Award className="w-16 h-16 text-teal-400/60" />
                </div>
              )}
              
              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-blue-400 transition-all">
                  {c.name}
                </h4>
                
                {c.issuer && (
                  <p className="text-sm text-foreground/70 mb-3">
                    {c.issuer}
                  </p>
                )}
                
                {c.date && (
                  <div className="mt-auto flex items-center gap-2 text-xs text-foreground/60">
                    <Calendar className="w-3 h-3" />
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
