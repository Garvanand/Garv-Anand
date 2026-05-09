"use client"

import { Button } from "@/components/shared/ui/button"
import { Card, CardContent } from "@/components/shared/ui/card"
import { Download, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { MetricCard, GlowButton, SectionReveal } from "@/components/shared/ui"

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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pt-20 sm:pt-28 pb-16 sm:pb-20">
        <SectionReveal>
          <span className="section-label">Resume</span>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 sm:mt-6 mb-4">
            My <span className="gradient-text">credentials.</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-md mb-8">
            Download my complete resume or view it inline.
          </p>
        </SectionReveal>

        {/* Actions */}
        <SectionReveal delay={0.2}>
          <div className="flex flex-wrap gap-4 mb-10">
            <GlowButton variant="primary" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </GlowButton>
            <GlowButton
              variant="ghost"
              href="/resume/Garv_Anand_Resume.pdf"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
            </GlowButton>
          </div>
        </SectionReveal>

        {/* PDF Viewer */}
        <SectionReveal delay={0.3}>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="aspect-[8.5/11]">
              <iframe
                src="/resume/Garv_Anand_Resume.pdf"
                className="w-full h-full"
                title="Garv Anand Resume"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Highlights */}
        <SectionReveal delay={0.4}>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <MetricCard value="8.83" label="CGPA" context="/ 10 — VIT" />
            <MetricCard value="4+" label="ML Projects" context="Production & Research" />
            <MetricCard value="Top 1%" label="Hackathons" context="National Level" />
          </div>
        </SectionReveal>

        {/* Back */}
        <div className="mt-12 text-center">
          <GlowButton href="/" variant="ghost">← Back Home</GlowButton>
        </div>
      </div>
    </div>
  )
}
