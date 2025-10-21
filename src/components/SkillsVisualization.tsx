"use client";
import { motion } from "framer-motion";
import { Zap, Code, Database, Cloud, Settings, TrendingUp } from "lucide-react";
import { useState } from "react";

type SkillCategory = {
  name: string;
  icon: React.ElementType;
  color: string;
  skills: Array<{ name: string; level: number }>;
};

export function SkillsVisualization({ skillsByCategory }: { skillsByCategory: Record<string, string[]> }) {
  const [activeCategory, setActiveCategory] = useState(0);
  
  // Map skills to categories with proficiency levels (you can adjust these)
  const skillCategories: SkillCategory[] = [
    {
      name: "Programming & CS",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Python", level: 95 },
        { name: "Data Structures & Algorithms", level: 90 },
        { name: "React", level: 88 },
        { name: "Node.js", level: 85 },
        { name: "OOP", level: 92 }
      ]
    },
    {
      name: "Cloud & Infrastructure",
      icon: Cloud,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "AWS", level: 85 },
        { name: "GCP", level: 90 },
        { name: "Azure", level: 80 },
        { name: "OpenStack", level: 75 },
        { name: "Proxmox", level: 82 }
      ]
    },
    {
      name: "DevOps & Tools",
      icon: Settings,
      color: "from-green-500 to-teal-500",
      skills: [
        { name: "Docker", level: 88 },
        { name: "Kubernetes", level: 85 },
        { name: "Jenkins", level: 80 },
        { name: "CI/CD", level: 87 },
        { name: "GitHub Actions", level: 83 }
      ]
    },
    {
      name: "Databases & Monitoring",
      icon: Database,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "Prometheus", level: 75 },
        { name: "Grafana", level: 78 },
        { name: "Netdata", level: 70 }
      ]
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4"
        >
          <TrendingUp className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">Expertise Level</span>
        </motion.div>
        <h3 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">Skills & Proficiency</h3>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Interactive visualization of my technical expertise across different domains
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Category Selector */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-foreground mb-6">Skill Categories</h4>
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  activeCategory === index
                    ? 'glass-card holo-border scale-105'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">{category.name}</h5>
                    <p className="text-sm text-foreground/60">
                      {category.skills.length} technologies
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Skills Proficiency Bars */}
        <div className="glass-card rounded-2xl p-6">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${skillCategories[activeCategory].color}`}>
                {(() => {
                  const Icon = skillCategories[activeCategory].icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
              {skillCategories[activeCategory].name}
            </h4>

            <div className="space-y-4">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm text-foreground/60">{skill.level}%</span>
                  </div>
                  
                  <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} relative`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ 
                        duration: 1,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1 + 0.5,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills Cloud (Enhanced) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12"
      >
        <h4 className="text-2xl font-bold text-center text-foreground mb-8">All Technologies</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.values(skillsByCategory || {}).flat().map((skill, i) => (
            <motion.div
              key={skill + i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.02,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.15,
                rotate: [-1, 1, -1, 0],
                transition: { duration: 0.3 },
              }}
              className="group relative"
            >
              <div className="relative px-4 py-2 rounded-xl glass-card holo-border cursor-pointer overflow-hidden">
                <span className="relative z-10 font-medium text-sm">
                  {skill}
                </span>
                
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-purple-400/50 rounded-xl opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}