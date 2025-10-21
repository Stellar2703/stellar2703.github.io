"use client";
import { motion } from "framer-motion";
import resume from "@/data/resume.json";
import type { Resume } from "@/types/resume";
import { Hero } from "@/components/Hero";
import { SkillsCloud } from "@/components/SkillsCloud";
import { SkillsVisualization } from "@/components/SkillsVisualization";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { CertificationsList } from "@/components/CertificationsList";
import { EducationList } from "@/components/EducationList";
import { ContactForm } from "@/components/ContactForm";
import { InteractiveResume } from "@/components/InteractiveResume";
import { InteractiveTerminal } from "@/components/InteractiveElements";
import { UniqueSections } from "@/components/UniqueSections";
import SocialSidebar from '@/components/SocialSidebar';
import LeadershipGallery from '@/components/LeadershipGallery';

export default function Home() {
  const r = resume as Resume;
  const name = r.basics?.name || "";
  const summary = r.basics?.summary || "";
  const titleGuess = "Cloud and DevOps Engineer and Full Stack Engineer";
  const urls = {
    github: r.basics?.urls?.github,
    linkedin: r.basics?.urls?.linkedin,
    leetcode: r.basics?.urls?.leetcode,
    email: r.basics?.email,
    portfolio: r.basics?.urls?.portfolio,
    credly: r.basics?.urls?.credly,
    blog: r.basics?.urls?.blog,
  };
  
  // Group skills by category for the visualization
  const skillsByCategory = {
    "Frontend": ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"],
    "Backend": ["Node.js", "Python", "Express", "REST APIs"],
    "Cloud": ["AWS", "GCP", "Azure", "Docker", "Kubernetes"],
    "Database": ["MySQL", "MongoDB", "PostgreSQL"],
    "DevOps": ["Jenkins", "CI/CD", "GitHub Actions", "Docker"],
    "Tools": ["Git", "VS Code", "Linux", "Bash"]
  };

  return (
    <div className="relative">
      {/* Social Sidebar */}
      <SocialSidebar urls={urls} />
      
      <main className="mx-auto max-w-7xl">
        <section id="hero">
          <Hero name={name} title={titleGuess} summary={summary} urls={urls} />
        </section>
        
        <div className="px-6 sm:px-10 space-y-8 md:space-y-12">
          {/* About Section with Interactive Terminal */}
          <section id="about" className="py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">About Me</h2>
              <p className="text-foreground/60 max-w-2xl mx-auto mb-12">
                Passionate full-stack developer with a love for creating innovative solutions and exploring new technologies
              </p>
            </motion.div>
            <InteractiveTerminal />
          </section>

          <section id="skills">
            <SkillsVisualization skillsByCategory={skillsByCategory} />
          </section>
          <section id="education">
            <EducationList items={r.education} />
          </section>
          {r.experience?.length ? (
            <section id="experience">
              <ExperienceTimeline items={r.experience} />
            </section>
          ) : null}
          {r.projects?.length ? (
            <section id="projects">
              <ProjectsGrid items={r.projects} />
            </section>
          ) : null}
          {r.certifications?.length ? (
            <section id="certifications">
              <CertificationsList items={r.certifications} />
            </section>
          ) : null}

          {/* Interactive Resume Section */}
          <InteractiveResume />

          {/* Unique Sections - Day Timeline & Learning Path */}
          <UniqueSections />
          
          {(r.leadership?.length || r.languages?.length) ? (
            <section className="w-full max-w-6xl mx-auto py-12">
              <div className="grid lg:grid-cols-2 gap-8">
                {r.leadership?.length ? (
                  <LeadershipGallery items={r.leadership} />
                ) : null}
                
                {r.languages?.length ? (
                  <div className="glass-card rounded-2xl p-8 space-y-4">
                    <h3 className="text-3xl font-bold gradient-text mb-6">Languages</h3>
                    <div className="flex flex-wrap gap-3">
                      {r.languages.map((lang, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-xl glass-card text-foreground/80 font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}
          
          {/* Contact Form */}
          <ContactForm />
        </div>
        
        <footer className="relative mt-24 mb-12 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Decorative line */}
            <div className="max-w-md mx-auto mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            </div>
            
            <div className="glass-card rounded-full inline-flex items-center gap-3 px-8 py-4 group hover:scale-105 transition-transform duration-300">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-foreground/60">
                Last updated {r.generatedAt ? new Date(r.generatedAt).toLocaleDateString() : "manually"}
              </span>
            </div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-purple-400/30"
                  style={{
                    left: `${20 + i * 30}%`,
                    bottom: "20%",
                  }}
                  animate={{
                    y: [-20, -60],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </footer>
      </main>
    </div>
  );
}
