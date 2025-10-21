"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Home, User, Briefcase, FolderGit2, Award, Menu, X, BookOpen, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

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
  const { scrollY } = useScroll();
  
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const blur = useTransform(scrollY, [0, 100], [0, 12]);

  useEffect(() => {
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
        style={{
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-background/95 border-b border-foreground/10"
        />
        
        <div className="relative max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold gradient-text cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              Portfolio
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "relative px-4 py-2 rounded-lg transition-all duration-300",
                    "hover:bg-white/5",
                    active === item.id && "text-blue-400"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="size-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </span>
                  {active === item.id && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/10 rounded-lg border border-white/20"
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
                className="relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/5 group"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="size-4" />
                  <span className="text-sm font-medium">Blog</span>
                </span>
                {/* External link indicator */}
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
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
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: mobileOpen ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute right-0 top-0 bottom-0 w-64 bg-background/95 backdrop-blur-xl border-l border-foreground/10 p-6"
        >
          <div className="flex flex-col gap-2 mt-16">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  "hover:bg-foreground/5",
                  active === item.id && "bg-foreground/10 text-blue-400"
                )}
              >
                <item.icon className="size-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            
            {/* Blog Link Mobile */}
            <Link
              href="https://stellar2703.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-foreground/5"
              onClick={() => setMobileOpen(false)}
            >
              <BookOpen className="size-5" />
              <span className="font-medium">Blog</span>
              <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
