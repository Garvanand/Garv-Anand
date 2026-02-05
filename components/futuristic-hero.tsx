"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Brain,
  Cpu,
  Database,
  Sparkles,
  ChevronDown,
  Terminal,
  Code2,
  Layers,
} from "lucide-react"

const roles = [
  "AI/ML Engineer",
  "Full Stack Developer",
  "Deep Learning Researcher",
  "GenAI Solutions Developer",
  "Computer Vision Enthusiast",
]

const stats = [
  { label: "Projects", value: "25+", icon: Code2 },
  { label: "Technologies", value: "40+", icon: Layers },
  { label: "Contributions", value: "500+", icon: Github },
  { label: "Models Trained", value: "50+", icon: Brain },
]

const techStack = [
  { name: "Python", color: "from-yellow-400 to-yellow-600" },
  { name: "TensorFlow", color: "from-orange-400 to-orange-600" },
  { name: "PyTorch", color: "from-red-400 to-red-600" },
  { name: "React", color: "from-cyan-400 to-cyan-600" },
  { name: "Next.js", color: "from-gray-400 to-gray-600" },
  { name: "Node.js", color: "from-green-400 to-green-600" },
]

export function FuturisticHero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Typing effect
  useEffect(() => {
    const role = roles[currentRole]
    const typeSpeed = isDeleting ? 30 : 80
    const pauseTime = isDeleting ? 500 : 2000

    if (!isDeleting && displayText === role) {
      setTimeout(() => setIsDeleting(true), pauseTime)
      return
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setCurrentRole((prev) => (prev + 1) % roles.length)
      return
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : role.slice(0, prev.length + 1)
      )
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentRole])

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8" />
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[80px]"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 data-grid opacity-30" />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-8 px-4 py-2 text-sm font-medium glass-glow border-primary/30"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for opportunities
              </Badge>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                <span className="block text-foreground">Hi, I&apos;m</span>
                <span className="block gradient-text-animated mt-2">Garv Anand</span>
              </h1>
            </motion.div>

            {/* Typing effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-16 sm:h-20 flex items-center justify-center mb-8"
            >
              <div className="flex items-center space-x-3 text-xl sm:text-2xl md:text-3xl">
                <Terminal className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <span className="text-muted-foreground font-mono">
                  {displayText}
                  <span className="animate-pulse text-primary">|</span>
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              B.Tech CSE (AI/ML) student at VIT Bhopal University. Building intelligent
              systems that bridge the gap between cutting-edge AI research and real-world
              applications. Microsoft Learn Student Ambassador.
            </motion.p>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${tech.color} text-white text-sm font-medium shadow-lg`}
                >
                  {tech.name}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden px-8 py-6 text-lg neon-glow"
                asChild
              >
                <Link href="/projects">
                  <span className="relative z-10 flex items-center">
                    Explore Projects
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg glass border-primary/30 hover:border-primary/60"
                asChild
              >
                <Link href="/resume">View Resume</Link>
              </Button>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card rounded-xl p-4 text-center tech-card"
                >
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center gap-4"
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/Garvanand",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/garv-anand-1bb36b270",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:garvanand03@gmail.com",
                  label: "Email",
                },
              ].map((social) => (
                <motion.div key={social.label} whileHover={{ scale: 1.1, y: -3 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full glass border border-border/50 hover:border-primary/50 hover:neon-glow"
                    asChild
                  >
                    <Link href={social.href} target="_blank" aria-label={social.label}>
                      <social.icon className="h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-muted-foreground"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[Brain, Cpu, Database, Sparkles].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-primary/20"
            style={{
              top: `${20 + index * 20}%`,
              left: index % 2 === 0 ? "5%" : "auto",
              right: index % 2 === 1 ? "5%" : "auto",
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Icon className="h-12 w-12 sm:h-16 sm:w-16" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
