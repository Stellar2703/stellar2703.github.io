"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Award } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Custom LeetCode icon component
const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.518 2.153 7.758-.025l.02-.022 4.921-4.97a2.884 2.884 0 0 0-.174-4.06l-3.53-3.455a2.884 2.884 0 0 0-4.06.174l-.905.914a1.874 1.874 0 0 0-.174 2.473 1.874 1.874 0 0 0 2.473.174l.905-.914a.294.294 0 0 1 .414.02l3.53 3.455a.294.294 0 0 1 .018.414l-4.92 4.97c-.228.23-.6.23-.83-.001l-4.315-4.231c-.467-.458-.907-1.019-1.271-1.818a4.63 4.63 0 0 1-.349-1.017 4.527 4.527 0 0 1-.062-2.362 4.35 4.35 0 0 1 .125-.513 4.266 4.266 0 0 1 1.209-2.104l3.854-4.126L14.454.438A1.374 1.374 0 0 0 13.483 0z"/>
  </svg>
);

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

export function SocialSidebar({ urls = {} }: Props) {
  const [isHeroSection, setIsHeroSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        // Smoother detection - start fading when hero is 40% visible
        const heroHeight = heroRect.height;
        const visibleHeight = Math.min(heroRect.bottom, window.innerHeight) - Math.max(heroRect.top, 0);
        const visibilityPercent = Math.max(0, visibleHeight / heroHeight);
        const isInHero = visibilityPercent > 0.4;
        setIsHeroSection(isInHero);
      }
    };

    // Use throttled scroll for butter-smooth performance
    let ticking = false;
    const smoothHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', smoothHandleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', smoothHandleScroll);
  }, []);

  const socialLinks = [
    {
      href: urls.github,
      icon: Github,
      label: "GitHub",
      color: "hover:text-gray-400"
    },
    {
      href: urls.linkedin,
      icon: Linkedin,
      label: "LinkedIn", 
      color: "hover:text-blue-400"
    },
    {
      href: urls.leetcode,
      icon: LeetCodeIcon,
      label: "LeetCode",
      color: "hover:text-orange-400"
    },
    {
      href: urls.credly || "https://www.credly.com/users/stellar2703", // Add your Credly URL
      icon: Award,
      label: "Credly",
      color: "hover:text-yellow-400"
    },
    {
      href: urls.blog || urls.portfolio,
      icon: ExternalLink,
      label: "Blog",
      color: "hover:text-purple-400"
    },
    {
      href: `mailto:${urls.email}`,
      icon: Mail,
      label: "Email",
      color: "hover:text-green-400"
    }
  ].filter(link => link.href && link.href !== "mailto:" && link.href.trim() !== "");

  if (socialLinks.length === 0 || !isHeroSection) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ 
        opacity: isHeroSection ? 1 : 0, 
        x: isHeroSection ? 0 : -50,
        scale: isHeroSection ? 1 : 0.9
      }}
      transition={{ 
        duration: 0.6, 
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="glass-card rounded-2xl p-3 flex flex-col gap-3">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          
          return (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ 
                opacity: isHeroSection ? 1 : 0, 
                x: isHeroSection ? 0 : -20,
                scale: isHeroSection ? 1 : 0.8
              }}
              transition={{ 
                duration: 0.5,
                delay: isHeroSection ? 0.4 + index * 0.08 : 0,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Link
                href={link.href!}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-foreground/70 transition-all duration-200 ease-out ${link.color} hover:bg-white/10 hover:scale-105`}
                title={link.label}
              >
                {link.label === "LeetCode" ? (
                  <LeetCodeIcon className="w-5 h-5 group-hover:scale-105 transition-transform duration-200 ease-out" />
                ) : (
                  <Icon className="w-5 h-5 group-hover:scale-105 transition-transform duration-200 ease-out" />
                )}
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: -8, scale: 0.9 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute left-full ml-3 px-3 py-1.5 bg-black/90 backdrop-blur text-white text-sm rounded-lg pointer-events-none whitespace-nowrap"
                >
                  {link.label}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-black/90" />
                </motion.div>

                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-current opacity-0 group-hover:opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1],
                  }}
                />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Connecting line to content */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isHeroSection ? 1 : 0, 
          opacity: isHeroSection ? 1 : 0 
        }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 left-full w-6 h-0.5 bg-gradient-to-r from-purple-400/40 to-transparent transform -translate-y-1/2"
      />
    </motion.div>
  );
}

export default SocialSidebar;