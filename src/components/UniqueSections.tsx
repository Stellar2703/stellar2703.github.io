"use client";
import { motion } from "framer-motion";
import { 
  Clock, 
  Coffee, 
  Code2, 
  Users, 
  BookOpen, 
  Dumbbell,
  Moon,
  Sun,
  Calendar,
  TrendingUp,
  Target,
  Award,
  Zap
} from "lucide-react";
import { useState } from "react";

interface TimelineEvent {
  time: string;
  activity: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

interface LearningPath {
  skill: string;
  progress: number;
  status: "mastered" | "learning" | "planned";
  icon: React.ElementType;
  color: string;
}

const dayTimeline: TimelineEvent[] = [
  {
    time: "6:00 AM",
    activity: "Morning Routine",
    icon: Sun,
    color: "from-orange-400 to-yellow-400",
    description: "Start with meditation and planning the day"
  },
  {
    time: "7:00 AM", 
    activity: "Coffee & Learning",
    icon: Coffee,
    color: "from-amber-500 to-orange-500",
    description: "Tech news, documentation reading, and caffeine"
  },
  {
    time: "8:00 AM",
    activity: "Deep Work",
    icon: Code2,
    color: "from-blue-500 to-purple-500",
    description: "Core development work, complex problem solving"
  },
  {
    time: "12:00 PM",
    activity: "Team Collaboration",
    icon: Users,
    color: "from-green-500 to-teal-500",
    description: "Standups, code reviews, and team discussions"
  },
  {
    time: "2:00 PM",
    activity: "Research & Development",
    icon: BookOpen,
    color: "from-indigo-500 to-blue-500",
    description: "Exploring new technologies and best practices"
  },
  {
    time: "4:00 PM",
    activity: "Project Implementation",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    description: "Building features and deploying solutions"
  },
  {
    time: "6:00 PM",
    activity: "Workout",
    icon: Dumbbell,
    color: "from-red-500 to-pink-500",
    description: "Physical fitness and mental clarity"
  },
  {
    time: "8:00 PM",
    activity: "Personal Projects",
    icon: Target,
    color: "from-cyan-500 to-blue-500",
    description: "Side projects and skill enhancement"
  },
  {
    time: "10:00 PM",
    activity: "Wind Down",
    icon: Moon,
    color: "from-purple-600 to-indigo-600",
    description: "Reading, reflection, and preparation for tomorrow"
  }
];

const learningPaths: LearningPath[] = [
  { skill: "React & Next.js", progress: 95, status: "mastered", icon: Code2, color: "from-blue-500 to-cyan-500" },
  { skill: "Cloud Architecture", progress: 90, status: "mastered", icon: Award, color: "from-purple-500 to-pink-500" },
  { skill: "Machine Learning", progress: 75, status: "learning", icon: TrendingUp, color: "from-green-500 to-teal-500" },
  { skill: "Blockchain Development", progress: 45, status: "learning", icon: Zap, color: "from-orange-500 to-red-500" },
  { skill: "Cybersecurity", progress: 25, status: "planned", icon: Target, color: "from-indigo-500 to-purple-500" },
  { skill: "Mobile Development", progress: 15, status: "planned", icon: BookOpen, color: "from-pink-500 to-rose-500" }
];

export function UniqueSections() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'learning'>('timeline');

  return (
    <section className="w-full max-w-6xl mx-auto py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h3 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Behind the Code</h3>
        <p className="text-foreground/60 max-w-2xl mx-auto mb-8">
          Discover my daily routine and continuous learning journey
        </p>

        {/* Tab Selector */}
        <div className="inline-flex glass-card rounded-xl p-1">
          {(['timeline', 'learning'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {tab === 'timeline' ? (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Day Timeline
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Learning Path
                </div>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Day Timeline */}
      {activeTab === 'timeline' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-foreground">A Day in My Life</h4>
              <p className="text-foreground/60">How I structure my day for maximum productivity</p>
            </div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full" />
            
            <div className="space-y-8">
              {dayTimeline.map((event, index) => {
                const Icon = event.icon;
                
                return (
                  <motion.div
                    key={event.time}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    className="relative flex items-center gap-6 group"
                  >
                    {/* Timeline Icon */}
                    <motion.div
                      className={`relative z-10 p-3 rounded-xl bg-gradient-to-r ${event.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 group-hover:translate-x-2 transition-transform duration-300">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-2xl font-bold gradient-text">{event.time}</span>
                        <h5 className="text-lg font-semibold text-foreground">{event.activity}</h5>
                      </div>
                      <p className="text-foreground/70">{event.description}</p>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Learning Path */}
      {activeTab === 'learning' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-foreground">Continuous Learning Journey</h4>
                <p className="text-foreground/60">My path to mastering new technologies and skills</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {learningPaths.map((path, index) => {
                const Icon = path.icon;
                
                return (
                  <motion.div
                    key={path.skill}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    className="glass-card rounded-xl p-6 hover:holo-border group transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${path.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                            {path.skill}
                          </h5>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            path.status === 'mastered' 
                              ? 'bg-green-500/20 text-green-400'
                              : path.status === 'learning'
                                ? 'bg-blue-500/20 text-blue-400' 
                                : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {path.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold gradient-text">{path.progress}%</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${path.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${path.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1,
                          delay: index * 0.1 + 0.5,
                          ease: "easeOut"
                        }}
                      />
                      
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 2,
                          delay: index * 0.1 + 1,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Learning Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold gradient-text mb-2">5+</div>
              <p className="text-foreground/60">Technologies Mastered</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold gradient-text mb-2">100+</div>
              <p className="text-foreground/60">Hours Learning Monthly</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold gradient-text mb-2">3</div>
              <p className="text-foreground/60">New Skills This Year</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}