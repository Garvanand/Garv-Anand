"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Play } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const featuredProjects = [
 
  {
    title: "Multimodal Speech Emotion Recognition",
    description:
      "Built a multimodal deep learning framework aimed at enhancing student engagement and actionable insights in virtual classrooms. The system integrates Bi-LSTM, CNN, and Transformer-based architectures to effectively extract and analyze emotional cues—acoustic, semantic, and linguistic—from both voice and video data. Leveraged the RAVDESS and CREMA-D datasets.",
    image: "/ai-sentiment-dashboard.png",
    technologies: ["RNNs", "TensorFlow", "LSTM","CNNs","Transformers", "NLP", "Flask", "React"],
    github:  "https://github.com/Garvanand/SER.git",
    demo: "https://github.com/Garvanand/SER.git",
    type:"AI/ML"
  },
  {
    
    title: "VITAL-AI",
    description:
      "Developed a comprehensive platform during a HackByte 3.0 at IIITDM Jabalpur that combines daily health monitoring (Google Fit sync, water and fasting trackers) with real-time disease risk prediction using Random Forest models. Designed intuitive UI dashboards and Flask APIs to visualize health trends, flag risks, and recommend doctor visits based on combined vitals and diagnostic results.",
    image: "/modern-task-management-interface.png",
    technologies: ["Next", "Flask", "Supabase", "Gemini API", "Tailwind", "Machine Learning"],
    
    github: "https://github.com/Garvanand/VITAL-AI2",
    demo: "https://devfolio.co/projects/vitalai-59ee",
    type: "Full Stack",
  },
  {
    title: "Document Approval System",
    description:
      "Built a platform to streamline the university’s document approval process by enabling online submission, tracking, and feedback—cutting approval time from days to hours and eliminating repeated physical visits.",
    image: "/object-detection-scene.png",
    technologies: ["React", "CSS", "Firebase"],
    
    github: "https://github.com/Garvanand/Document-Approval-System",
    demo: "https://document-approval-system-rho.vercel.app/",
    type: "Software Development",
  },
]

export function FeaturedProjects() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions that blend AI/ML expertise with modern web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={project.type === "AI/ML" ? "default" : "secondary"}>{project.type}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={project.github} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={project.demo} target="_blank">
                        <Play className="mr-2 h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" asChild>
            <Link href="/projects">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
