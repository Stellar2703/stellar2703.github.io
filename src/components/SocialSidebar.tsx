"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

// ─── Brand SVG icons (official Simple Icons paths) ───────────────────────────

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.518 2.153 7.758-.025l.02-.022 4.921-4.97a2.884 2.884 0 0 0-.174-4.06l-3.53-3.455a2.884 2.884 0 0 0-4.06.174l-.905.914a1.874 1.874 0 0 0-.174 2.473 1.874 1.874 0 0 0 2.473.174l.905-.914a.294.294 0 0 1 .414.02l3.53 3.455a.294.294 0 0 1 .018.414l-4.92 4.97c-.228.23-.6.23-.83-.001l-4.315-4.231c-.467-.458-.907-1.019-1.271-1.818a4.63 4.63 0 0 1-.349-1.017 4.527 4.527 0 0 1-.062-2.362 4.35 4.35 0 0 1 .125-.513 4.266 4.266 0 0 1 1.209-2.104l3.854-4.126L14.454.438A1.374 1.374 0 0 0 13.483 0z" />
  </svg>
);

// Credly uses a badge/ribbon mark — using a simplified badge SVG
const CredlyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6s-4.298 9.6-9.6 9.6S2.4 17.302 2.4 12 6.698 2.4 12 2.4zm0 2.4a7.2 7.2 0 1 0 0 14.4A7.2 7.2 0 0 0 12 4.8zm0 2.4a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zm0 1.2a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2z" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  urls?: {
    github?: string;
    linkedin?: string;
    leetcode?: string;
    portfolio?: string;
    email?: string;
    credly?: string;
    blog?: string;
  };
};

// ─── Link definitions ─────────────────────────────────────────────────────────

const buildLinks = (urls: Props["urls"] = {}) => [
  {
    href:  urls.github,
    label: "GitHub",
    Icon:  GitHubIcon,
    // Force near-black in light mode so the icon is always visible on any bg
    color: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-500 dark:hover:border-gray-400",
  },
  {
    href:  urls.linkedin,
    label: "LinkedIn",
    Icon:  LinkedInIcon,
    color: "text-[#0A66C2] hover:bg-[#0A66C2]/8 hover:border-[#0A66C2]/50",
  },
  {
    href:  urls.leetcode,
    label: "LeetCode",
    Icon:  LeetCodeIcon,
    color: "text-[#FFA116] hover:bg-[#FFA116]/8 hover:border-[#FFA116]/50",
  },
  {
    href:  urls.credly || "https://www.credly.com/users/stellar2703",
    label: "Credly",
    Icon:  CredlyIcon,
    color: "text-[#FF6B00] hover:bg-[#FF6B00]/8 hover:border-[#FF6B00]/50",
  },
  {
    href:  urls.blog || urls.portfolio,
    label: "Portfolio",
    Icon:  GlobeIcon,
    color: "text-violet-600 dark:text-violet-400 hover:bg-violet-500/8 hover:border-violet-500/50",
  },
  {
    href:  `mailto:${urls.email}`,
    label: "Email",
    Icon:  MailIcon,
    color: "text-[#EA4335] hover:bg-[#EA4335]/8 hover:border-[#EA4335]/50",
  },
].filter(l => l.href && l.href !== "mailto:" && l.href !== "mailto:undefined");

// ─── Component ────────────────────────────────────────────────────────────────

export function SocialSidebar({ urls = {} }: Props) {
  const links = buildLinks(urls);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const zones = ["tech-marquee", "site-footer"];
    const active = new Set<string>();

    const observers = zones.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => {
        e.isIntersecting ? active.add(id) : active.delete(id);
        setVisible(active.size === 0);
      }, { threshold: 0.05 });
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, []);

  if (!links.length) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="social-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        >
          <div className="flex flex-col gap-2 p-2 rounded-2xl border border-border bg-card shadow-lg backdrop-blur-sm">
            {links.map(({ href, label, Icon, color }) => (
              <Link
                key={label}
                href={href!}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className={cn(
                  "group relative flex items-center justify-center w-9 h-9 rounded-xl",
                  "border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900",
                  "transition-all duration-200",
                  color
                )}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />

                {/* Tooltip — explicit neutral colors, never inherits parent hover */}
                <span className="absolute left-full ml-3 px-2.5 py-1 bg-gray-900 text-white text-[11px] font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap shadow-lg z-10">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SocialSidebar;