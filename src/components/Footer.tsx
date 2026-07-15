"use client";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

type Props = {
  name?: string;
  urls?: {
    github?: string;
    linkedin?: string;
    email?: string;
    portfolio?: string;
    blog?: string;
  };
};

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Footer({ name = "Shashwath V R", urls = {} }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="border-t border-border bg-card mt-24">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-1.5">
            <p className="text-sm font-bold text-foreground tracking-tight">{name}</p>
            <p className="text-xs text-muted max-w-xs leading-relaxed">
              Software Engineer · Backend & Cloud · Open to opportunities
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs text-muted hover:text-foreground transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">© {year} {name}. All rights reserved.</p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {urls.github && (
              <a href={urls.github} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-all duration-200">
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {urls.linkedin && (
              <a href={urls.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center text-[#0077b5] hover:border-[#0077b5]/50 transition-all duration-200">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {urls.email && (
              <a href={`mailto:${urls.email}`}
                className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center text-[#ea4335] hover:border-[#ea4335]/50 transition-all duration-200">
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}
            {urls.portfolio && (
              <a href={urls.portfolio} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center text-violet-500 hover:border-violet-500/50 transition-all duration-200">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
