"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Code2 } from "lucide-react";
import type { Resume } from "@/types/resume";
import { cn } from "@/lib/cn";
import { useState } from "react";

type Project = NonNullable<Resume["projects"]>[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const description = project.description || "";
  const isLongDescription = description.length > 160;
  const displayDescription = isDescExpanded || !isLongDescription
    ? description
    : `${description.slice(0, 160)}...`;

  const tags = project.tags || [];
  const displayTags = isTagsExpanded ? tags : tags.slice(0, 4);
  const hasMoreTags = tags.length > 4;
  const isSVG = (project.image || "").toLowerCase().endsWith(".svg");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex"
    >
      <div className="border border-border border-t-2 border-t-rose-500 bg-card rounded-xl overflow-hidden flex flex-col h-full w-full hover:border-foreground/20 hover:shadow-md transition-all duration-300">
        {/* Project Image */}
        {project.image ? (
          <div className="relative h-44 flex-shrink-0 bg-foreground/5 border-b border-border overflow-hidden">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className={cn(
                "transition-transform duration-500",
                isSVG ? "object-contain p-6 hover:scale-102" : "object-cover hover:scale-105"
              )}
            />
          </div>
        ) : (
          <div className="relative h-44 flex-shrink-0 bg-foreground/5 border-b border-border flex items-center justify-center">
            <Code2 className="w-12 h-12 text-muted/30" />
          </div>
        )}
        
        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground line-clamp-1">
              {project.name}
            </h3>
            
            {project.description && (
              <p className="text-sm text-muted leading-relaxed">
                {displayDescription}
                {isLongDescription && (
                  <span className="block mt-1">
                    <button
                      onClick={() => setIsDescExpanded(!isDescExpanded)}
                      className="text-xs text-accent font-bold hover:underline focus:outline-none cursor-pointer inline-block"
                    >
                      {isDescExpanded ? "Show Less" : "Read Full Description..."}
                    </button>
                  </span>
                )}
              </p>
            )}
          </div>
          
          <div className="space-y-4 pt-4">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {displayTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] rounded border border-rose-500/20 bg-rose-500/5 text-rose-700 dark:text-rose-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {hasMoreTags && (
                  <button
                    onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                    className="px-2 py-0.5 text-[11px] rounded bg-rose-500 text-white hover:bg-rose-600 transition-colors font-bold focus:outline-none cursor-pointer border border-transparent shadow-sm"
                  >
                    {isTagsExpanded ? "Show Less" : `+${tags.length - 4} more`}
                  </button>
                )}
              </div>
            )}
            
            {/* Links */}
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
              >
                <span>View Project</span>
                <ExternalLink className="size-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsGrid({ items }: { items: Resume["projects"] }) {
  if (!items?.length) return null;

  return (
    <section id="projects" className="w-full max-w-6xl mx-auto py-16 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider badge-rose mb-3">
          <Code2 className="w-3.5 h-3.5" />
          <span>Featured Work</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">Projects</h2>
        <p className="text-muted max-w-md mx-auto text-sm sm:text-base">
          Selected projects demonstrating full-stack and cloud engineering experience
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
