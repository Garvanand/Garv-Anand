"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Code, Database, Globe, Cpu, Zap, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PerformanceMetrics } from "./performance-metrics"

const skillCategories = [
  {
    title: "AI/ML Frameworks",
    icon: Brain,
    skills: [
      { name: "TensorFlow", level: 85, color: "bg-orange-500" },
      { name: "PyTorch", level: 85, color: "bg-red-500" },
      { name: "Scikit-learn", level: 90, color: "bg-blue-500" },
      { name: "Keras", level: 90, color: "bg-red-600" },
      { name: "OpenCV", level: 85, color: "bg-green-500" },
      { name: "Hugging Face", level: 80, color: "bg-yellow-500" },
    ],
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Deep Learning",
    icon: Cpu,
    skills: [
      { name: "Neural Networks", level: 90, color: "bg-purple-500" },
      { name: "CNNs", level: 90, color: "bg-indigo-500" },
      { name: "RNNs/LSTMs", level: 80, color: "bg-pink-500" },
      { name: "Transformers", level: 80, color: "bg-cyan-500" },
      { name: "GANs", level: 90, color: "bg-violet-500" },
      { name: "Computer Vision", level: 85, color: "bg-emerald-500" },
    ],
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Programming Languages",
    icon: Code,
    skills: [
      { name: "Python", level: 95, color: "bg-yellow-500" },
      { name: "JavaScript", level: 75, color: "bg-yellow-400" },
      { name: "TypeScript", level: 60, color: "bg-blue-600" },
      { name: "SQL", level: 85, color: "bg-orange-500" },
      { name: "C++", level: 95, color: "bg-blue-700" },
    ],
    gradient: "from-green-500 to-teal-600",
  },
  {
    title: "Web Technologies",
    icon: Globe,
    skills: [
      { name: "React", level: 90, color: "bg-cyan-500" },
      { name: "Next.js", level: 75, color: "bg-black" },
      { name: "Node.js", level: 80, color: "bg-green-600" },
      { name: "FastAPI", level: 85, color: "bg-teal-500" },
      { name: "Flask", level: 90, color: "bg-gray-600" },
      { name: "Tailwind CSS", level: 85, color: "bg-cyan-400" },
    ],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Data & Cloud",
    icon: Database,
    skills: [
      { name: "Pandas", level: 95, color: "bg-blue-600" },
      { name: "NumPy", level: 95, color: "bg-blue-500" },
      { name: "MongoDB", level: 85, color: "bg-green-500" },
      { name: "PostgreSQL", level: 80, color: "bg-blue-700" },
      { name: "AWS", level: 60, color: "bg-orange-400" },
      { name: "Docker", level: 75, color: "bg-blue-600" },
    ],
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    title: "Tools & Platforms",
    icon: Zap,
    skills: [
      { name: "Jupyter", level: 95, color: "bg-orange-500" },
      { name: "Git", level: 85, color: "bg-red-500" },
      { name: "VS Code", level: 90, color: "bg-blue-600" },
      { name: "Colab", level: 90, color: "bg-yellow-500" },
      { name: "Streamlit", level: 90, color: "bg-red-400" },
      { name: "Azure", level: 75, color: "bg-blue-500" },
    ],
    gradient: "from-yellow-500 to-orange-600",
  },
]

export function EnhancedSkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const selectedCategoryData = skillCategories[selectedCategory]

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Technical Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive skill set spanning AI/ML technologies and modern development frameworks
          </p>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <PerformanceMetrics />
        </motion.div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Selector */}
          <div className="space-y-2">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Button
                  variant={selectedCategory === index ? "default" : "ghost"}
                  className="w-full justify-start h-auto p-4"
                  onClick={() => setSelectedCategory(index)}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${category.gradient} mr-3`}>
                    <category.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{category.title}</div>
                    <div className="text-xs text-muted-foreground">{category.skills.length} skills</div>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Skills Display */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${selectedCategoryData.gradient}`}>
                        <selectedCategoryData.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">{selectedCategoryData.title}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCategoryData.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="space-y-2"
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{skill.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {skill.level}%
                            </Badge>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full ${skill.color}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              style={{
                                boxShadow:
                                  hoveredSkill === skill.name ? `0 0 10px ${skill.color.replace("bg-", "")}` : "none",
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
