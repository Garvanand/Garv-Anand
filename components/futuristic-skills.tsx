"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Code2,
  Database,
  Cloud,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  GitBranch,
  Globe,
  Server,
  Palette,
} from "lucide-react"

const skillCategories = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    glowColor: "violet",
    skills: [
      { name: "TensorFlow", level: 92 },
      { name: "PyTorch", level: 88 },
      { name: "Scikit-learn", level: 95 },
      { name: "Keras", level: 90 },
      { name: "OpenCV", level: 85 },
      { name: "Hugging Face", level: 82 },
    ],
  },
  {
    title: "Deep Learning",
    icon: Cpu,
    color: "from-blue-500 to-cyan-500",
    glowColor: "blue",
    skills: [
      { name: "CNNs", level: 90 },
      { name: "RNNs/LSTMs", level: 85 },
      { name: "Transformers", level: 88 },
      { name: "GANs", level: 78 },
      { name: "Computer Vision", level: 87 },
      { name: "NLP", level: 84 },
    ],
  },
  {
    title: "Frontend Development",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    glowColor: "pink",
    skills: [
      { name: "React", level: 94 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "Three.js", level: 70 },
    ],
  },
  {
    title: "Backend & Cloud",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    glowColor: "emerald",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Python", level: 95 },
      { name: "FastAPI", level: 85 },
      { name: "AWS", level: 78 },
      { name: "Docker", level: 82 },
      { name: "PostgreSQL", level: 85 },
    ],
  },
]

const technologies = [
  "Python", "TensorFlow", "PyTorch", "React", "Next.js", "Node.js",
  "TypeScript", "AWS", "Docker", "PostgreSQL", "MongoDB", "Redis",
  "OpenAI", "LangChain", "Pinecone", "Supabase", "Vercel", "Git",
]

function SkillCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
        style={{
          background: `linear-gradient(135deg, var(--${category.glowColor}-500), var(--${category.glowColor}-700))`,
        }}
      />
      <div className="relative glass-card rounded-2xl p-6 h-full overflow-hidden tech-card">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
            <category.icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold">{category.title}</h3>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 + skillIndex * 0.05 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-xs text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.15 + skillIndex * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative corner */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${category.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
      </div>
    </motion.div>
  )
}

export function FuturisticSkills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[80px]" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-2 text-sm font-medium glass-glow border-primary/30"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Technical Expertise
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit spanning AI/ML, full-stack development, and cloud infrastructure
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 perspective-container">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Technologies marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-muted-foreground flex items-center justify-center">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              Technologies I Work With
            </h3>
          </div>

          <div className="relative overflow-hidden py-4">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

            {/* Scrolling technologies */}
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex space-x-6"
            >
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={`${tech}-${index}`}
                  className="flex-shrink-0 px-6 py-3 rounded-full glass border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <span className="text-sm font-medium whitespace-nowrap">{tech}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
