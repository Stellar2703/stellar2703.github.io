"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Code2 } from "lucide-react";
import type { Resume } from "@/types/resume";
import { cn } from "@/lib/cn";

export function ProjectsGrid({ items }: { items: Resume["projects"] }) {
  return (
    <section className="w-full max-w-7xl mx-auto py-12 md:py-16">
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
          <Code2 className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">Featured Work</span>
        </motion.div>
        <h3 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">Projects</h3>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Innovative solutions built with cutting-edge technologies
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {items?.map((p, i) => {
          const isSVG = (p.image || "").toLowerCase().endsWith(".svg");
          return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative"
          >
            <div className="glass-card rounded-2xl overflow-hidden hover-lift h-[450px] flex flex-col">
              {/* Project Image */}
              {p.image ? (
                <div className="relative h-48 flex-shrink-0 overflow-hidden bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-teal-500/10">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className={cn(
                      "transition-transform duration-700",
                      isSVG ? "object-contain p-6 group-hover:scale-105" : "object-cover group-hover:scale-110"
                    )}
                  />
                  {/* Overlay only for photos/screenshots; skip for SVG logos to preserve colors */}
                  {!isSVG && (
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
                  )}
                  
                  {/* Project number badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full glass-card flex items-center justify-center font-bold text-purple-400 text-lg backdrop-blur-xl">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              ) : (
                <div className="relative h-48 flex-shrink-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-teal-500/20 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-purple-400/40" />
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full glass-card flex items-center justify-center font-bold text-purple-400 text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 line-clamp-2">
                    {p.name}
                  </h4>
                  
                  {p.description && (
                    <p className="text-foreground/70 leading-relaxed line-clamp-3 h-[4.5rem] overflow-hidden">
                      {p.description}
                    </p>
                  )}
                </div>
                
                <div className="space-y-4">
                  {p.tags && (
                    <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
                      {p.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-foreground/80 hover:bg-white/10 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {p.tags.length > 4 && (
                        <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-foreground/60">
                          +{p.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  {p.url && (
                    <Link
                      href={p.url}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                      <span className="text-sm font-medium">View Project</span>
                      <ExternalLink className="size-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );})}
      </div>
    </section>
  );
}
