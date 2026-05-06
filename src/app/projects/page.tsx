"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import intellectData from "@/data/intellect.json"
import { TechBadge, GlowButton, SectionReveal } from "@/components/shared/ui"
import { LiveInferenceLab } from "@/components/features/LiveInferenceLab"

const getProjectStatus = (id: string) => {
  if (id === 'proj-elderai' || id === 'proj-foodmind' || id === 'proj-kindkart' || id === 'proj-trustiq' || id === 'proj-rcbs' || id === 'proj-interview-ai') return 'Production';
  if (id === 'proj-parkinsons' || id === 'proj-ser' || id === 'proj-traffic-rl') return 'Research';
  if (id === 'proj-vitalai') return 'Hackathon';
  if (id === 'proj-drowseguard' || id === 'proj-youtube-solver') return 'System';
  if (id === 'proj-rajasthan-club') return 'Community';
  return 'Concept';
}

function AudioWaveform() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg
        className="absolute w-full h-full text-[#00FF87]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[...Array(20)].map((_, i) => (
          <motion.rect
            key={i}
            x={i * 5}
            y="50"
            width="2"
            height="10"
            fill="currentColor"
            initial={{ scaleY: 0.2 }}
            animate={{ scaleY: [0.2, Math.random() * 2 + 1, 0.2] }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
            style={{ transformOrigin: "center" }}
          />
        ))}
      </svg>
    </div>
  )
}

function ArchitectureDiagram({ steps }: { steps: any[] }) {
  return (
    <div className="relative mt-8 mb-6 bg-black/40 border border-white/5 rounded-xl p-6 hidden md:block">
      <div className="flex items-center justify-between relative z-10">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center max-w-[120px] relative">
            <div className="w-10 h-10 rounded-full bg-[#0D0D14] border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF] mb-3 shadow-[0_0_15px_rgba(0,212,255,0.1)]">
              {i + 1}
            </div>
            <div className="font-display text-[10px] font-bold text-white uppercase tracking-wider mb-1">
              {step.step}
            </div>
            <div className="text-[9px] text-[#8B8BA7] leading-tight font-mono">
              {step.detail}
            </div>
            {i < steps.length - 1 && (
              <div className="absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-[1px] bg-gradient-to-r from-[#00D4FF]/40 to-transparent translate-x-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const flagship = intellectData.projects.find(p => p.flagship) || intellectData.projects[0];
  const gridProjects = intellectData.projects.filter(p => !p.flagship);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20">
        {/* Header */}
        <SectionReveal>
          <span className="section-label">Project Archive</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-6 mb-12">
            Systems I've <span className="gradient-text">built.</span>
          </h1>
        </SectionReveal>

        {/* Featured Project */}
        <SectionReveal delay={0.1}>
          <div className="glass-card rounded-2xl overflow-hidden relative mb-20 border-[#00e87b]/20">
            <AudioWaveform />
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#00e87b] bg-[#00e87b]/10 px-2 py-1 rounded">
                  Featured Project
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#00D4FF] bg-[#00D4FF]/10 px-2 py-1 rounded">
                  {getProjectStatus(flagship.id)}
                </span>
                {flagship.dev_tag && (
                  <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-white bg-red-600 px-2 py-1 rounded shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-pulse">
                    {flagship.dev_tag}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                    {flagship.title}
                  </h2>
                  <p className="text-xl text-[#8B8BA7] font-display mb-6">
                    {flagship.subtitle}
                  </p>
                  
                  <div className="space-y-4 text-[15px] leading-relaxed text-[#A0A0B8]">
                    <p>
                      <strong>The Problem:</strong> {flagship.problem_statement}
                    </p>
                    <p>
                      <strong>The Solution:</strong> {flagship.my_specific_contribution}
                    </p>
                  </div>

                  <div className="mt-8 border-l-2 border-[#00e87b] pl-4 py-1 italic text-white/80 font-mono text-sm">
                    "{flagship.impact_metric}"
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  {flagship.architectureFlow && (
                    <ArchitectureDiagram steps={flagship.architectureFlow} />
                  )}

                  <div className="mt-6">
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#55556A] mb-3">Tech Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {flagship.tech_used.map(tech => (
                        <TechBadge key={tech} label={tech} color={flagship.color} />
                      ))}
                    </div>
                  </div>

                  {flagship.github && (
                    <div className="mt-8">
                      <GlowButton href={flagship.github} target="_blank" rel="noopener noreferrer" variant="primary">
                        View Source Code
                      </GlowButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Live Inference Lab */}
        <SectionReveal delay={0.15}>
          <div className="mb-20">
            <LiveInferenceLab />
          </div>
        </SectionReveal>

        {/* Project Grid */}
        <SectionReveal delay={0.2}>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {gridProjects.map((project, i) => {
              const status = getProjectStatus(project.id);
              const maxTech = 4;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-xl overflow-hidden relative group break-inside-avoid"
                  style={{ borderLeftWidth: '4px', borderLeftColor: project.color }}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/60 bg-white/5 px-2 py-1 rounded">
                          {status}
                        </div>
                        {project.dev_tag && (
                          <div className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-white bg-red-600 px-2 py-1 rounded shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-pulse">
                            {project.dev_tag}
                          </div>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#00D4FF] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-[#8B8BA7] mb-6 line-clamp-2">
                      {project.problem_statement}
                    </p>

                    <div className="mt-auto">
                      <div className="font-display text-4xl font-bold text-[#00D4FF] mb-1">
                        {project.metrics[0]?.value}
                      </div>
                      <div className="font-mono text-[10px] tracking-wider uppercase text-[#55556A] mb-6">
                        {project.metrics[0]?.label}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tech_used.slice(0, maxTech).map(tech => (
                          <TechBadge key={tech} label={tech} color={project.color} />
                        ))}
                        {project.tech_used.length > maxTech && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-mono border border-white/5 bg-white/5 text-[#8B8BA7]">
                            +{project.tech_used.length - maxTech} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
                      <GlowButton href={project.github || project.demo || "#"} target="_blank" rel="noopener noreferrer" variant="primary">
                        View Details
                      </GlowButton>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionReveal>

        {/* Back to home */}
        <div className="mt-20 text-center">
          <GlowButton href="/" variant="ghost">← Back Home</GlowButton>
        </div>
      </div>
    </div>
  )
}
