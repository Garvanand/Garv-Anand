"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Github, Linkedin, Mail, Play } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { AINetworkVisualization } from "./ai-neural-network"

const aiTerms = [
  "Student",
  "AI/ML Engineer",
  "GenAI Solution Developer",
  "Microsoft Learn Student Ambassador",
  "Full-Stack Developer",
  "Research Enthusiast",
  "Problem Solver",
]

export function EnhancedHeroSection() {
  const [currentTerm, setCurrentTerm] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTerm((prev) => (prev + 1) % aiTerms.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSkills = () => {
    const skillsSection = document.getElementById("skills")
    skillsSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    📍 VIT
                  </span>
                </motion.div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Garv Anand
                  </span>
                </h1>

                <div className="h-16 flex items-center">
                  <motion.p
                    key={currentTerm}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl sm:text-2xl text-muted-foreground"
                  >
                    {aiTerms[currentTerm]}
                  </motion.p>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-muted-foreground max-w-2xl"
              >
                B.Tech CSE (AI/ML) student with expertise in deep learning, computer vision, and full-stack development.
                Currently working as GenAI Solution Developer Intern at ROVA, building vision-parsing pipelines with
                cutting-edge AI technologies.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="group" asChild>
                  <Link href="/projects">
                    <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Explore My Projects
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group bg-transparent" asChild>
                  <Link href="/resume">
                    <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Download Resume
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex space-x-4"
              >
                {[
                  { icon: Github, href: "https://github.com/Garvanand", label: "GitHub" },
                  { icon: Linkedin, href: "www.linkedin.com/in/garv-anand-1bb36b270", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:garvanand03@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <Button key={label} variant="ghost" size="icon" className="group" asChild>
                    <Link href={href} target="_blank">
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </Link>
                  </Button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - AI Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <AINetworkVisualization />

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -top-4 -right-4 bg-background/80 backdrop-blur-sm border rounded-lg p-3 shadow-lg"
            >
              <div className="text-sm font-medium">CGPA</div>
              <div className="text-2xl font-bold text-primary">8.83/10</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -bottom-4 -left-4 bg-background/80 backdrop-blur-sm border rounded-lg p-3 shadow-lg"
            >
              <div className="text-sm font-medium">CodeChef Rating</div>
              <div className="text-2xl font-bold text-secondary">1537</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        onClick={scrollToSkills}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="p-2 rounded-full border border-primary/20 hover:border-primary/40 transition-colors"
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </motion.div>
      </motion.button>
    </section>
  )
}
