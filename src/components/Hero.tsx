"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { DownloadResume } from "./DownloadResume";
import dynamic from "next/dynamic";

const ThreeCanvas = dynamic(
  () => import("./ThreeCanvas").then((mod) => mod.ThreeCanvas),
  { ssr: false }
);

// ── Inline typewriter (no external dependency) ────────────────────────────────
function Typewriter({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = texts[idx % texts.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1800);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 400);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setIdx(i => i + 1);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, idx, texts]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-indigo-400">|</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type Props = { name?: string; summary?: string };

export function Hero({ name = "", summary = "" }: Props) {
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center gap-4 px-6 overflow-hidden">
      {/* 3D Canvas — background layer */}
      <div className="absolute inset-0 z-0 opacity-70 dark:opacity-50 pointer-events-none">
        <ThreeCanvas />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 space-y-4 max-w-4xl flex flex-col items-center">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-widest text-accent uppercase"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-foreground"
        >
          {name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg sm:text-2xl lg:text-3xl font-semibold text-muted min-h-[1.5em]"
        >
          <Typewriter texts={["Software Engineer", "Backend Developer", "Cloud & DevOps Practitioner"]} />
        </motion.div>

        {summary && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-xl text-sm sm:text-base text-muted leading-relaxed"
          >
            {summary}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center gap-3.5 flex-wrap justify-center pt-2"
        >
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>View My Work</span>
            <ArrowDown className="size-4" />
          </Link>
          <DownloadResume />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1.5 text-muted/40"
        >
          <span className="text-[9px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-[1px] h-6 bg-border" />
        </motion.div>
      </motion.div>
    </section>
  );
}
