"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowUpRight,
  Github,
  Brain,
  Globe,
  Smartphone,
  Database,
  Star,
  GitFork,
  ExternalLink,
  Sparkles,
  Eye,
} from "lucide-react"

const projects = [
  {
    id: 1,
    title: "AI Health Assistant",
    description:
      "An intelligent health monitoring system using deep learning for disease prediction, symptom analysis, and personalized health recommendations.",
    image: "/projects/health-ai.jpg",
    tags: ["TensorFlow", "Python", "React", "FastAPI"],
    category: "AI/ML",
    icon: Brain,
    color: "from-violet-500 to-purple-600",
    stats: { stars: 128, forks: 45 },
    github: "https://github.com/Garvanand/health-ai",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Neural Style Transfer",
    description:
      "Real-time artistic style transfer application using convolutional neural networks. Transform photos into artwork in various artistic styles.",
    image: "/projects/style-transfer.jpg",
    tags: ["PyTorch", "OpenCV", "Next.js", "WebGL"],
    category: "Deep Learning",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
    stats: { stars: 89, forks: 32 },
    github: "https://github.com/Garvanand/style-transfer",
    demo: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Smart Campus Platform",
    description:
      "Full-stack IoT platform for campus management including attendance tracking, resource allocation, and real-time analytics dashboard.",
    image: "/projects/smart-campus.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "MQTT"],
    category: "Full Stack",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    stats: { stars: 156, forks: 67 },
    github: "https://github.com/Garvanand/smart-campus",
    demo: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Sentiment Analysis API",
    description:
      "Production-ready NLP API for real-time sentiment analysis with support for multiple languages and custom model fine-tuning.",
    image: "/projects/sentiment-api.jpg",
    tags: ["Transformers", "FastAPI", "Docker", "Redis"],
    category: "NLP",
    icon: Database,
    color: "from-emerald-500 to-teal-500",
    stats: { stars: 72, forks: 28 },
    github: "https://github.com/Garvanand/sentiment-api",
    demo: "#",
    featured: false,
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
    >
      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.5 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl blur-xl`}
      />

      <div className="relative h-full glass-card rounded-2xl overflow-hidden">
        {/* Image/Preview area */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-2xl`}
            >
              <project.icon className="h-10 w-10 text-white" />
            </motion.div>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`bg-gradient-to-r ${project.color} text-white border-0`}>
              {project.category}
            </Badge>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                Featured
              </Badge>
            </div>
          )}

          {/* Hover overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Button size="sm" variant="outline" className="rounded-full" asChild>
                    <Link href={project.github} target="_blank">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button size="sm" className={`rounded-full bg-gradient-to-r ${project.color}`} asChild>
                    <Link href={project.demo} target="_blank">
                      <Eye className="h-4 w-4 mr-2" />
                      Demo
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-muted/50 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {project.stats.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                {project.stats.forks}
              </span>
            </div>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function FuturisticProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 data-grid opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-2 text-sm font-medium glass-glow border-primary/30"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Portfolio
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work in AI/ML, full-stack development, and innovative solutions
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            size="lg"
            variant="outline"
            className="group px-8 py-6 text-lg glass border-primary/30 hover:border-primary/60"
            asChild
          >
            <Link href="/projects">
              View All Projects
              <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
