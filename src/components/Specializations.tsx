"use client";
import { motion } from "framer-motion";
import { Database, CloudUpload, Lightbulb } from "lucide-react";

const SPECS = [
  {
    Icon:        Database,
    iconColor:   "#4f46e5",           // indigo-600
    iconBg:      "bg-indigo-100 dark:bg-indigo-950/60",
    accent:      "border-l-indigo-500",
    ring:        "hover:shadow-indigo-100 dark:hover:shadow-indigo-900/30",
    title:       "Backend Engineering",
    description: "Designing scalable REST APIs and distributed systems with Java, Spring Boot, Node.js, and Express — built for reliability, performance, and maintainability.",
    tags:        ["REST APIs", "Spring Boot", "Node.js", "MySQL", "System Design"],
  },
  {
    Icon:        CloudUpload,
    iconColor:   "#059669",           // emerald-600
    iconBg:      "bg-emerald-100 dark:bg-emerald-950/60",
    accent:      "border-l-emerald-500",
    ring:        "hover:shadow-emerald-100 dark:hover:shadow-emerald-900/30",
    title:       "DevOps & Cloud",
    description: "Containerizing, orchestrating, and deploying cloud-native workloads on AWS and OpenStack using Docker, Kubernetes, Jenkins CI/CD, and observability stacks.",
    tags:        ["Docker", "Kubernetes", "AWS", "Jenkins", "Grafana"],
  },
  {
    Icon:        Lightbulb,
    iconColor:   "#7c3aed",           // violet-600
    iconBg:      "bg-violet-100 dark:bg-violet-950/60",
    accent:      "border-l-violet-500",
    ring:        "hover:shadow-violet-100 dark:hover:shadow-violet-900/30",
    title:       "Problem Solving",
    description: "Competing on LeetCode and applying strong CS fundamentals — Data Structures, Algorithms, OOP, and OS concepts — to build efficient, elegant solutions under real constraints.",
    tags:        ["Data Structures", "Algorithms", "OOP", "OS", "Computer Networks"],
  },
];

export function Specializations() {
  return (
    <section className="w-full max-w-5xl mx-auto py-4 px-4">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider badge-indigo mb-3">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>What I Do</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
          Specializations
        </h2>
        <p className="text-muted max-w-md mx-auto text-sm">
          Core areas where I build, deploy, and solve with intent
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-5">
        {SPECS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className={`group bg-card border border-border border-l-4 ${s.accent} rounded-2xl p-6 shadow-sm hover:shadow-md ${s.ring} transition-all duration-300 flex flex-col gap-4`}
          >
            {/* Icon — no background, sits directly on card */}
            <s.Icon
              size={26}
              strokeWidth={2}
              color={s.iconColor}
            />

            <div className="space-y-2 flex-1">
              <h3 className="text-base font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.description}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {s.tags.map((t, ti) => (
                <span
                  key={ti}
                  className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-muted/10 text-muted ring-1 ring-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
