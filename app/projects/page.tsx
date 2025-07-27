"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, Play, Search, Filter } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "Multimodal Speech Emotion Recognition",
    description:
      "Built a multimodal deep learning framework aimed at enhancing student engagement and actionable insights in virtual classrooms. The system integrates Bi-LSTM, CNN, and Transformer-based architectures to effectively extract and analyze emotional cues—acoustic, semantic, and linguistic—from both voice and video data. Leveraged the RAVDESS and CREMA-D datasets.",
    image: "/ai-sentiment-dashboard.png",
    technologies: ["RNNs", "TensorFlow", "LSTM","CNNs","Transformers", "NLP", "Flask", "React"],
    category: "AI/ML",
    domain: "Deep Learning",
    github: "https://github.com/Garvanand/SER.git",
    demo: "https://github.com/Garvanand/SER.git",
    featured: true,
  },
  {
    id: 2,
    title: "VITAL-AI",
    description:
      "Developed a comprehensive platform during a HackByte 3.0 at IIITDM Jabalpur that combines daily health monitoring (Google Fit sync, water and fasting trackers) with real-time disease risk prediction using Random Forest models. Designed intuitive UI dashboards and Flask APIs to visualize health trends, flag risks, and recommend doctor visits based on combined vitals and diagnostic results.",
    image: "/modern-task-management-interface.png",
    technologies: ["Next", "Flask", "Supabase", "Gemini API", "Tailwind", "Machine Learning"],
    category: "Full Stack",
    domain: "Healthcare",
    github: "https://github.com/Garvanand/VITAL-AI2",
    demo: "https://devfolio.co/projects/vitalai-59ee",
    featured: true,
  },
  {
    id: 3,
    title: "Document Approval System",
    description:
      "Built a platform to streamline the university’s document approval process by enabling online submission, tracking, and feedback—cutting approval time from days to hours and eliminating repeated physical visits.",
    image: "/object-detection-scene.png",
    technologies: ["React", "CSS", "Firebase"],
    category: "Software Development",
    domain: "Generic",
    github: "https://github.com/Garvanand/Document-Approval-System",
    demo: "https://document-approval-system-rho.vercel.app/",
    featured: true,
  },
  {
    id: 4,
    title: "Rajasthan Club website",
    description:
      "The Rajasthan Club Website, built with React and Tailwind CSS, showcases Rajasthan's culture, heritage, and events. This responsive, user-friendly platform offers an immersive experience, connecting enthusiasts to traditions, tourist spots, and community activities for our college club, blending creativity and functionality seamlessly.",
    image: "/modern-ecommerce-platform.png",
    technologies: ["React", "Tailwind"],
    category: "Frontend",
    domain: "Club Website",
    github: "https://github.com/Garvanand/Rajasthan_Club",
    demo: "https://rajasthan-club.vercel.app/",
    featured: false,
  },
  {
    id: 5,
    title: "Advanced Parkinson’s Detection",
    description:
      "Engineered a Bi-LSTM model to detect early Parkinson’s disease from speech, achieving 93% average accuracy with strong F1-score and precision on benchmarked datasets(with 195 entries).",
    image: "/medical-xray-classification.png",
    technologies: ["Python", "Bi-LSTM", "GAN", "GRUs", "Streamlit"],
    category: "AI/ML",
    domain: "Healthcare",
    github: "https://github.com/Garvanand/Parkinsons_detection-LSTM-",
    demo: "https://lstm-parkinsons.streamlit.app/",
    featured: false,
  },
  {
    id: 6,
    title: "Real-time Chat Application",
    description:
      "we're redefining financial advisory services with cutting-edge generative AI technology. Our mission is to democratize personalized financial advice, provide real-time insights, ensure transparency, and scale efficiently to meet diverse user needs.",
    image: "/placeholder-n95e2.png",
    technologies: ["React", "Node.js", "Shadcn", "MongoDB", "OpenAI API","Flask"],
    category: "Full Stack",
    domain: "Finance",
    github: "https://github.com/Dev-Team-VIT/Financial-Advisory-Bot",
    demo: "https://money-mantra-pi.vercel.app/",
    featured: false,
  },
  {
    id: 7,
    title: "Attendence Tracker",
    description:
      "An Attendance Tracker using Facial Recognition automates attendance marking by identifying individuals through facial features. It uses OpenCV (cv2) for real-time face detection and recognition, comparing detected faces with a pre-registered database. Recognized individuals are logged into a database with details like name, date, and time. The system features a tkinter GUI for user interaction, allowing attendance tracking, record viewing, and adding new faces.",
    image: "/stock-prediction-dashboard.png",
    technologies: ["Python", "OpenCV ", "tkinter", "Pandas"],
    category: "AI/ML",
    domain: "Finance",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
  {
    id: 8,
    title: "FinTrust",
    description:
      " A Fintech Anomaly Detection & Privacy Protection System! Our mission was to elevate security and privacy in fintech.",
    image: "/social-media-analytics-dashboard.png",
    technologies: ["Google Gemini", "Next.js", "BlockChain", "Smart Contracts", "MongoDB", ],
    category: "Full Stack",
    domain: "Analytics",
    github: "https://github.com/devansh728/Fintrust",
    demo: "https://fintrust-two.vercel.app/",
    featured: false,
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [domainFilter, setDomainFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
    const matchesDomain = domainFilter === "all" || project.domain === domainFilter

    return matchesSearch && matchesCategory && matchesDomain
  })

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]
  const domains = ["all", ...Array.from(new Set(projects.map((p) => p.domain)))]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold">My Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of AI/ML models and full-stack applications showcasing innovation, technical expertise, and
            problem-solving capabilities.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects, technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={domainFilter} onValueChange={setDomainFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain === "all" ? "All Domains" : domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    {project.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">Featured</Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 space-y-2">
                    <Badge variant={project.category === "AI/ML" ? "default" : "secondary"}>{project.category}</Badge>
                    <Badge variant="outline" className="block">
                      {project.domain}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-3">{project.description}</CardDescription>
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

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
