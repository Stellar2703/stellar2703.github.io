"use client";

const TECH = [
  "Java", "Python", "JavaScript", "C", "Node.js", "Express.js",
  "Spring Boot", "REST APIs", "MySQL", "Docker", "Kubernetes",
  "AWS", "Jenkins", "Grafana", "OpenStack", "Git", "Linux",
  "Next.js", "React", "Data Structures", "System Design", "OOP",
];

const ITEMS = [...TECH, ...TECH];

export function TechMarquee() {
  return (
    <div id="tech-marquee" className="w-full overflow-hidden py-6 border-y border-border bg-card/60">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: "marquee 32s linear infinite",
        }}
      >
        {ITEMS.map((tech, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-4 py-1.5 text-xs font-semibold rounded-full border border-border bg-background text-muted hover:text-foreground hover:border-foreground/30 transition-all duration-200 select-none"
          >
            {tech}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
