"use client";
import { motion } from "framer-motion";
import resume from "@/data/resume.json";
import type { Resume } from "@/types/resume";
import { Hero } from "@/components/Hero";
import { SkillsVisualization } from "@/components/SkillsVisualization";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { CertificationsList } from "@/components/CertificationsList";
import { EducationList } from "@/components/EducationList";
import { ContactForm } from "@/components/ContactForm";
import { StatsBar } from "@/components/StatsBar";
import { Specializations } from "@/components/Specializations";
import { TechMarquee } from "@/components/TechMarquee";
import { Footer } from "@/components/Footer";
import { SectionNavigator } from "@/components/SectionNavigator";
import { User, Mail, MapPin, Globe, Award } from "lucide-react";
import SocialSidebar from "@/components/SocialSidebar";
import { EmailSidebar } from "@/components/EmailSidebar";

export default function Home() {
  const r = resume as Resume;
  const name = r.basics?.name || "";
  const summary = r.basics?.summary || "";
  const urls = {
    github: r.basics?.urls?.github,
    linkedin: r.basics?.urls?.linkedin,
    leetcode: r.basics?.urls?.leetcode,
    email: r.basics?.email,
    portfolio: r.basics?.urls?.portfolio,
    credly: r.basics?.urls?.credly,
    blog: r.basics?.urls?.blog,
  };

  return (
    <div className="relative min-h-screen">
      {/* Sidebars (desktop only) */}
      <SocialSidebar urls={urls} />
      <EmailSidebar email={urls.email} />
      <SectionNavigator />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-0 space-y-0">

        {/* ── Hero ── */}
        <section id="hero">
          <Hero name={name} summary={summary} />
        </section>

        {/* ── Stats Bar ── */}
        <section className="border-t border-border pt-12 pb-4 px-0">
          <StatsBar />
        </section>

        {/* ── About ── */}
        <section id="about" className="border-t border-border pt-16 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Title Column */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider badge-indigo mb-3">
                <User className="w-3.5 h-3.5" />
                <span>Profile</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">About Me</h2>
            </div>

            {/* Detail Column */}
            <div className="md:col-span-2 space-y-6">
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                I am a dedicated Software Engineer with a deep interest in distributed systems, clean code architectures,
                and cloud infrastructure. With strong fundamentals in Data Structures and Algorithms, I enjoy designing
                efficient systems and building robust backend and full-stack applications.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-muted/80 flex-shrink-0" />
                  <span>Located in {r.basics?.location || "Erode, India"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-muted/80 flex-shrink-0" />
                  <a href={`mailto:${r.basics?.email}`} className="hover:underline hover:text-foreground transition-colors truncate">
                    {r.basics?.email}
                  </a>
                </div>
                {r.languages && r.languages.length > 0 && (
                  <div className="flex items-center gap-2.5 sm:col-span-2">
                    <Globe className="w-4 h-4 text-muted/80 flex-shrink-0" />
                    <span>Languages: {r.languages.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Specializations ── */}
        <section className="border-t border-border pt-16 pb-4">
          <Specializations />
        </section>

        {/* ── Tech Marquee ── */}
      </main>

      {/* Full-width marquee (outside constrained main) */}
      <TechMarquee />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-0 space-y-0">

        {/* ── Skills ── */}
        <section className="border-t border-border pt-12">
          <SkillsVisualization skillsByCategory={r.skillsByCategory} />
        </section>

        {/* ── Education ── */}
        <section className="border-t border-border pt-12">
          <EducationList items={r.education} />
        </section>

        {/* ── Experience ── */}
        {r.experience?.length ? (
          <section id="experience" className="border-t border-border pt-12">
            <ExperienceTimeline items={r.experience} />
          </section>
        ) : null}

        {/* ── Projects ── */}
        {r.projects?.length ? (
          <section id="projects" className="border-t border-border pt-12">
            <ProjectsGrid items={r.projects} />
          </section>
        ) : null}

        {/* ── Certifications ── */}
        {r.certifications?.length ? (
          <section className="border-t border-border pt-12">
            <CertificationsList items={r.certifications} />
          </section>
        ) : null}

        {/* ── Achievements ── */}
        {r.leadership?.length ? (
          <section className="border-t border-border pt-16 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider badge-rose mb-3">
                  <Award className="w-3.5 h-3.5" />
                  <span>Impact</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Achievements</h2>
              </div>

              <div className="md:col-span-2">
                <div className="border border-border bg-card rounded-xl p-6 sm:p-8 shadow-sm">
                  <ul className="space-y-4">
                    {r.leadership.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted text-sm sm:text-base leading-relaxed">
                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>
        ) : null}

        {/* ── Contact ── */}
        <section id="contact" className="border-t border-border pt-12">
          <ContactForm />
        </section>

      </main>

      {/* ── Footer ── */}
      <Footer name={name} urls={urls} />
    </div>
  );
}
