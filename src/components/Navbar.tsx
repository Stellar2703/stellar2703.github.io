"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Home, User, Briefcase, FolderGit2, Award, Menu, X, BookOpen, Mail, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useTheme } from "next-themes";

const NAV_ITEMS = [
  { id: "hero", label: "Home", icon: Home },
  { id: "skills", label: "Skills", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.id);
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActive(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
        style={{
          backgroundColor: useTransform(bgOpacity, () => `var(--glass-bg)`),
          borderColor: useTransform(borderOpacity, (v) => `rgba(15, 23, 42, ${v * 0.08})`),
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-semibold tracking-tight cursor-pointer hover:opacity-85 transition-opacity"
              onClick={() => scrollToSection("hero")}
            >
              Shashwath V R
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    active === item.id 
                      ? "text-foreground" 
                      : "text-muted hover:text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </span>
                  {active === item.id && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-foreground/5 rounded-lg border border-foreground/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              
              {/* Blog Link */}
              <Link
                href="https://stellar2703.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground transition-colors flex items-center gap-2"
              >
                <BookOpen className="size-4" />
                <span>Blog</span>
              </Link>

              {/* Divider */}
              <span className="w-px h-5 bg-border mx-2" />

              {/* Theme Toggle Button */}
              {mounted ? (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg hover:bg-foreground/5 text-muted hover:text-foreground transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
                </button>
              ) : (
                <span className="w-8.5 h-8.5 block" />
              )}
            </div>

            {/* Mobile Menu & Theme Button */}
            <div className="flex items-center gap-2 md:hidden">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg hover:bg-foreground/5 text-muted hover:text-foreground transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
                </button>
              )}
              
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg hover:bg-foreground/5 text-muted hover:text-foreground transition-colors"
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 md:hidden"
      >
        <motion.div
          initial={false}
          animate={{ opacity: mobileOpen ? 1 : 0 }}
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: mobileOpen ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute right-0 top-0 bottom-0 w-64 bg-background border-l border-border p-6 shadow-2xl"
        >
          <div className="flex flex-col gap-2 mt-16">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left",
                  active === item.id 
                    ? "bg-foreground/5 text-foreground" 
                    : "text-muted hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                <item.icon className="size-4.5" />
                <span>{item.label}</span>
              </button>
            ))}
            
            <Link
              href="https://stellar2703.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted hover:bg-foreground/5 hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <BookOpen className="size-4.5" />
              <span>Blog</span>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
