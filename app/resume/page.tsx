"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export default function ResumePage() {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/resume/Garv_Anand_Resume.pdf"
    link.download = "Garv_Anand_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
          <h1 className="text-4xl sm:text-5xl font-bold">Resume</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Download my complete resume or view it online to learn more about my experience, skills, and achievements.
          </p>
        </motion.div>

        {/* Resume Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button size="lg" className="flex items-center" onClick={handleDownload}>
            <Download className="mr-2 h-5 w-5" />
            Download PDF Resume
          </Button>
          <Button size="lg" variant="outline" className="flex items-center bg-transparent" asChild>
            <a href="/resume/Garv_Anand_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-5 w-5" />
              View in New Tab
            </a>
          </Button>
        </motion.div>

        {/* Resume Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardContent className="p-0">
              <div className="aspect-[8.5/11] bg-muted/30 rounded-lg overflow-hidden">
                <iframe src="/resume/Resume(garv).pdf" className="w-full h-full" title="Garv Anand Resume" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resume Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Resume Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">8.83/10</div>
                <div className="text-sm text-muted-foreground">Current CGPA</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">4+ Major</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">AI/ML/DL</div>
                <div className="text-sm text-muted-foreground">Enthusiast</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
