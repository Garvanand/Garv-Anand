"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Code, Brain } from "lucide-react"

// Real project data based on Garv's resume
const projectData = [
  {
    name: "Multimodal Speech Emotion Recognition",
    type: "Deep Learning",
    technologies: ["Bi-LSTM", "Transformers", "CNNs", "RNNs"],
    metrics: {
      accuracy: 87,
      datasetSize: "RAVDESS + CREMA-D",
      linesOfCode: 10000,
      commits: 3,
    },
    status: "In Progress",
    timeline: "June 2025 - Present",
  },
  {
    name: "Advanced Parkinson's Detection",
    type: "AI Research",
    technologies: ["LSTM", "GRUs", "Python", "Neural Networks"],
    metrics: {
      accuracy: 93,
      datasetSize: "195 entries",
      linesOfCode: 1650,
      commits: 15,
    },
    status: "Published",
    timeline: "Jan 2025 - Feb 2025",
  },
  {
    name: "VITAL-AI",
    type: "Full-Stack",
    technologies: ["React", "TensorFlow", "Flask", "Random Forest"],
    metrics: {
      accuracy: 82,
      datasetSize: "Multiple Datasets",
      linesOfCode: 3200,
      commits: 15,
    },
    status: "Completed",
    timeline: "Feb 2025 - Mar 2025",
  },
  {
    name: "Document Approval System",
    type: "Software Development",
    technologies: ["React", "CSS", "Firebase"],
    metrics: {
      accuracy: 100,
      datasetSize: "Not Required",
      linesOfCode: 1890,
      commits: 4,
    },
    status: "Deployed",
    timeline: "June 2025 - July 2025",
  },
]

export function ProjectContributionsViz() {
  const [selectedProject, setSelectedProject] = useState(0)
  const [animatedMetrics, setAnimatedMetrics] = useState({
    accuracy: 0,
    linesOfCode: 0,
    commits: 0,
  })

  useEffect(() => {
    const project = projectData[selectedProject]

    // Reset metrics
    setAnimatedMetrics({ accuracy: 0, linesOfCode: 0, commits: 0 })

    // Animate metrics
    const animateMetric = (target: number, key: string) => {
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setAnimatedMetrics((prev) => ({ ...prev, [key]: Math.floor(current) }))
      }, 20)
    }

    const timeout = setTimeout(() => {
      animateMetric(project.metrics.accuracy, "accuracy")
      animateMetric(project.metrics.linesOfCode, "linesOfCode")
      animateMetric(project.metrics.commits, "commits")
    }, 300)

    return () => clearTimeout(timeout)
  }, [selectedProject])

  const getStatusColor = (status: string) => {
    const colors = {
      "In Progress": "bg-blue-500",
      Published: "bg-green-500",
      Completed: "bg-purple-500",
      Deployed: "bg-orange-500",
    }
    return colors[status as keyof typeof colors] || "bg-gray-500"
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      "Deep Learning": Brain,
      "AI Research": Brain,
      "Full-Stack": Code,
      "Software Development": BarChart3,
    }
    return icons[type as keyof typeof icons] || Code
  }

  const currentProject = projectData[selectedProject]
  const TypeIcon = getTypeIcon(currentProject.type)

  return (
    <div className="space-y-6">
      {/* Project Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projectData.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedProject === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedProject(index)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                  <Badge variant="outline" className="text-xs">
                    {project.type}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm line-clamp-2">{project.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{project.timeline}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project Details */}
      <motion.div
        key={selectedProject}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TypeIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl">{currentProject.name}</h3>
                <p className="text-sm text-muted-foreground font-normal">{currentProject.timeline}</p>
              </div>
              <Badge className={`ml-auto ${getStatusColor(currentProject.status)} text-white`}>
                {currentProject.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Technologies */}
            <div>
              <h4 className="font-semibold mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Project Metrics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">{animatedMetrics.accuracy}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy/Success Rate</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-500">{animatedMetrics.linesOfCode.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Lines of Code</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-500">{animatedMetrics.commits}</div>
                  <div className="text-sm text-muted-foreground">Git Commits</div>
                </div>
              </div>
            </div>

            {/* Dataset Info */}
            <div>
              <h4 className="font-semibold mb-2">Dataset/Data Source</h4>
              <p className="text-sm text-muted-foreground">{currentProject.metrics.datasetSize}</p>
            </div>

            {/* Progress Visualization */}
            <div>
              <h4 className="font-semibold mb-3">Development Progress</h4>
              <div className="space-y-2">
                {["Planning", "Development", "Testing", "Deployment"].map((phase, index) => {
                  const isCompleted = currentProject.status === "Completed" || currentProject.status === "Deployed"
                  const isInProgress = currentProject.status === "In Progress" && index <= 1
                  const isActive = isCompleted || isInProgress

                  return (
                    <div key={phase} className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isActive ? "bg-primary" : "bg-muted"
                        } transition-colors duration-300`}
                      />
                      <span className={`text-sm ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {phase}
                      </span>
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: isActive ? "100%" : "0%" }}
                          transition={{ duration: 0.8, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
