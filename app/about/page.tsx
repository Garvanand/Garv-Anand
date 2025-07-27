"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Award, BookOpen, Target, Download, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const achievements = [
  {
    title: "Academic Excellence",
    description: "Maintaining 8.83/10 CGPA in B.Tech CSE (AI/ML) at VIT Bhopal University",
    icon: GraduationCap,
  },
  {
    title: "Research Publication",
    description:
      "Submitted research paper on Parkinson's Detection to Elsevier's AI in Medicine journal (Scopus indexed)(In-Review)",
    icon: BookOpen,
  },
  {
    title: "Hackathon Success",
    description: "Top 20 in Bank of Baroda Hackathon (5,000+ participants), Top 5% in Amazon Sambhav Hackathon",
    icon: Award,
  },
  {
    title: "Microsoft Learn Student Ambassador(Beta)",
    description: "Delivered 3 Azure/AI workshops to 150+ students with 92% satisfaction rate",
    icon: Target,
  },
]

const coursework = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Database Management Systems",
  "Web Development",
  "Software Engineering",
]

const researchInterests = [
  "Multimodal Speech Emotion Recognition",
  "Medical AI & Healthcare Applications",
  "Computer Vision & Image Processing",
  "Natural Language Processing",
  "GenAI & Large Language Models",
  "Edge AI & Model Optimization",
]

const certifications = [
  "Applied ML in Python (University of Michigan)",
  "Android Club Winter of Code",
  "Google Code-in 2019",
  "Google Code-in 2018",
  "Microsoft Applied Skills: Build a natural language processing solution with Azure AI Language",
  "Microsoft Applied Skills: Build an Azure AI Vision solution",
  "Microsoft Applied Skills: Create an intelligent document processing solution with Azure AI Document Intelligence",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Computer Science undergraduate with strong AI/ML and full-stack development expertise, committed to using
            technology to solve real-world problems.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">My Journey</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I'm currently pursuing B.Tech in Computer Science Engineering with specialization in AI/ML at VIT
                    Bhopal University, maintaining a CGPA of 8.83/10. My journey into technology began with a
                    fascination for problem-solving and has evolved into a passion for artificial intelligence and its
                    applications in healthcare and real-world scenarios.
                  </p>
                  <p>
                    Worked as a GenAI Solution Developer Intern at ROVA (Botter Solutions Pvt Ltd), where I
                    engineer vision-parsing pipelines with LLaMA Parse, YOLOv11/v8, navigating real-world constraints
                    and debugging edge cases in a fast-paced startup environment.
                  </p>
                  <p>
                    As a Microsoft Learn Student Ambassador (Beta), I've delivered workshops on Azure and AI to over 150
                    students, achieving a 92% satisfaction rate. I believe in sharing knowledge and helping others grow
                    in the tech community.
                  </p>
                  <p>
                    My research work focuses on multimodal AI systems, particularly in healthcare applications. I've
                    developed a Bi-LSTM model for early Parkinson's disease detection achieving 93% accuracy, with
                    results submitted to Elsevier's AI in Medicine journal for publication.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Key Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <achievement.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Faridabad, India</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">+91 8054182892</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">garvanand03@gmail.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Education</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">B.Tech CSE (AI/ML)</div>
                    <div className="text-sm text-muted-foreground">VIT Bhopal University</div>
                    <div className="text-sm text-muted-foreground">2023 - 2027</div>
                    <div className="text-sm font-medium text-primary">CGPA: 8.83/10</div>
                  </div>
                  <div>
                    <div className="font-medium">Class 12 Science</div>
                    <div className="text-sm text-muted-foreground">Ryan International School, Delhi</div>
                    <div className="text-sm text-muted-foreground">2021</div>
                    <div className="text-sm font-medium text-primary">88.2%</div>
                  </div>
                  <div>
                    <div className="font-medium">Class 10 CBSE</div>
                    <div className="text-sm text-muted-foreground">Ryan International School, Faridabad</div>
                    <div className="text-sm text-muted-foreground">2019</div>
                    <div className="text-sm font-medium text-primary">96%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Relevant Coursework */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Relevant Coursework</h3>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course) => (
                    <Badge key={course} variant="secondary" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Research Interests */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Research Interests</h3>
                <div className="space-y-2">
                  {researchInterests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{interest}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Certifications</h3>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Competitive Programming */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Competitive Programming</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-sm">CodeChef</div>
                    <div className="text-sm text-muted-foreground">1537-rated with consistent participation</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">LeetCode</div>
                    <div className="text-sm text-muted-foreground">200+ problems solved across DSA domains</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="space-y-4">
              <Button className="w-full" asChild>
                <Link href="/resume">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/projects">View My Projects</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
