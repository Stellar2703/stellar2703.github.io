"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = { value: number; suffix?: string; label: string; color: string };

function Counter({ value, suffix = "", duration = 1800 }: { value: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, value);
      setDisplay(start);
      if (start >= value) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const STATS: Stat[] = [
  { value: 3, suffix: "+", label: "Projects Shipped", color: "text-indigo-500" },
  { value: 4, suffix: "", label: "Certifications", color: "text-emerald-500" },
  { value: 6, suffix: " mo", label: "Industry Experience", color: "text-violet-500" },
  { value: 2, suffix: "", label: "Hackathon Wins", color: "text-rose-500" },
];

export function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden shadow-sm border border-border"
    >
      {STATS.map((s, i) => (
        <div key={i} className="bg-card px-6 py-6 flex flex-col items-center justify-center gap-1 text-center">
          <span className={`text-3xl sm:text-4xl font-black tabular-nums ${s.color}`}>
            <Counter value={s.value} suffix={s.suffix} />
          </span>
          <span className="text-xs text-muted font-medium tracking-wide uppercase">{s.label}</span>
        </div>
      ))}
    </motion.div>
  );
}
