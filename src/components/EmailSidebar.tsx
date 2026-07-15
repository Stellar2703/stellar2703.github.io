"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { email?: string };

export function EmailSidebar({ email }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const targets = ["tech-marquee", "site-footer"];
    const visibleSet = new Set<string>();

    const observers = targets.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) visibleSet.add(id);
        else visibleSet.delete(id);
        setVisible(visibleSet.size === 0);
      }, { threshold: 0.05 });
      o.observe(el);
      return o;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, []);

  if (!email) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="email-sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed right-7 bottom-24 z-50 hidden xl:flex flex-col items-center gap-3"
        >
          <a
            href={`mailto:${email}`}
            className="text-[10px] font-bold tracking-[0.18em] text-muted hover:text-indigo-500 transition-colors duration-200 select-none"
            style={{ writingMode: "vertical-rl" }}
          >
            {email}
          </a>
          <div className="w-px h-16 bg-border" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EmailSidebar;
