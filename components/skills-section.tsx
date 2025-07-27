"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Code, Database, Globe, Cpu, Zap } from "lucide-react"
import { motion } from "framer-motion"

const skillCategories = [
  {
    title: "AI/ML Technologies",
    icon: Brain,
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    color: "from-blue-500 to-purple-600",
  },
  {
    title: "Deep Learning",
    icon: Cpu,
    skills: ["Neural Networks", "CNNs", "RNNs", "Transformers", "GANs", "Computer Vision", "NLP"],
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Frontend Development",
    icon: Globe,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"],
    color: "from-green-500 to-teal-600",
  },
  {
    title: "Backend Development",
    icon: Code,
    skills: ["Node.js", "Express.js", "Python", "FastAPI", "REST APIs", "GraphQL"],
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Databases & Cloud",
    icon: Database,
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "AWS", "Docker", "Git"],
    color: "from-teal-500 to-cyan-600",
  },
  {
    title: "Tools & Frameworks",
    icon: Zap,
    skills: ["Jupyter", "VS Code", "Postman", "Figma", "Linux", "Vercel", "Netlify"],
    color: "from-yellow-500 to-orange-600",
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit spanning AI/ML technologies and modern web development frameworks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
