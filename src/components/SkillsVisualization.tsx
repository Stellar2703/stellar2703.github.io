"use client";
import { motion } from "framer-motion";
import { Code, Database, Cloud, Compass, Settings } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  skillsByCategory?: Record<string, string[]>;
};

const CATEGORIES: {
  name: string;
  icon: React.ElementType;
  accent: string;        // left border color
  iconColor: string;     // icon text color
  chipClass: string;     // skill chip style
}[] = [
  {
    name: "Programming",
    icon: Code,
    accent: "border-l-indigo-500",
    iconColor: "text-indigo-500",
    chipClass: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-800/60",
  },
  {
    name: "Backend & Databases",
    icon: Database,
    accent: "border-l-emerald-500",
    iconColor: "text-emerald-500",
    chipClass: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/60",
  },
  {
    name: "CS Fundamentals",
    icon: Compass,
    accent: "border-l-violet-500",
    iconColor: "text-violet-500",
    chipClass: "bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:ring-violet-800/60",
  },
  {
    name: "DevOps & Cloud",
    icon: Cloud,
    accent: "border-l-rose-500",
    iconColor: "text-rose-500",
    chipClass: "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:ring-rose-800/60",
  },
];

export function SkillsVisualization({ skillsByCategory = {} }: Props) {
  const categories = Object.keys(skillsByCategory);

  return (
    <section id="skills" className="w-full max-w-5xl mx-auto py-16 px-4">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider badge-purple mb-3">
          <Settings className="w-3.5 h-3.5" />
          <span>Technical Skills</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
          Skills & Expertise
        </h2>
        <p className="text-muted max-w-md mx-auto text-sm">
          Core competencies across software engineering, systems, and cloud
        </p>
      </motion.div>

      {/* Category Cards */}
      <div className="grid sm:grid-cols-2 gap-5">
        {categories.map((category, idx) => {
          const meta = CATEGORIES.find((c) => c.name === category);
          const Icon = (meta?.icon ?? Code) as React.ComponentType<{ className?: string }>;
          const skills = skillsByCategory[category] ?? [];

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.07 }}
              className={cn(
                // Clean card: white bg, subtle border, thick left accent
                "bg-card border border-border border-l-4 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300",
                meta?.accent ?? "border-l-slate-400"
              )}
            >
              {/* Card Header */}
              <div className="flex items-center gap-2.5 mb-4">
                <Icon
                  className={cn("w-5 h-5 flex-shrink-0", meta?.iconColor ?? "text-slate-500")}
                />
                <h3 className="text-base font-semibold text-foreground tracking-tight">
                  {category}
                </h3>
              </div>

              {/* Skill Chips */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-muted/10 text-foreground ring-1 ring-border transition-all duration-200 hover:ring-foreground/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}