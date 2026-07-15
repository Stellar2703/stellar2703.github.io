"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "hero",       label: "Home",       color: "bg-indigo-500"  },
  { id: "about",      label: "About",      color: "bg-violet-500"  },
  { id: "skills",     label: "Skills",     color: "bg-emerald-500" },
  { id: "experience", label: "Experience", color: "bg-indigo-500"  },
  { id: "projects",   label: "Projects",   color: "bg-rose-500"    },
  { id: "contact",    label: "Contact",    color: "bg-amber-500"   },
];

export function SectionNavigator() {
  const [active,  setActive]  = useState("hero");
  const [visible, setVisible] = useState(true);

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Hide when marquee or footer is on screen
  useEffect(() => {
    const zones = ["tech-marquee", "site-footer"];
    const active = new Set<string>();
    const observers = zones.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          active.add(id);
        } else {
          active.delete(id);
        }
        setVisible(active.size === 0);
      }, { threshold: 0.05 });
      o.observe(el);
      return o;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="section-nav"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="Page sections"
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3 items-end"
        >
          {SECTIONS.map(({ id, label, color }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-2.5 focus:outline-none"
                title={label}
              >
                {/* Label — shows on hover or when active */}
                <span className={cn(
                  "text-[10px] font-bold tracking-widest uppercase transition-all duration-200",
                  isActive
                    ? "opacity-100 text-foreground"
                    : "opacity-0 group-hover:opacity-50 text-muted translate-x-1 group-hover:translate-x-0"
                )}>
                  {label}
                </span>

                {/* Indicator bar */}
                <motion.div
                  animate={{
                    width:        isActive ? 22 : 6,
                    borderRadius: isActive ? 3 : 999,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={cn("h-[5px] flex-shrink-0 transition-opacity duration-200", color, isActive ? "opacity-100" : "opacity-25 group-hover:opacity-50")}
                />
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
