"use client"

import { motion } from "framer-motion"
import { Navigation } from "../_components/Navigation"
import { SectionReveal, TechBadge } from "@/components/ui"
import intellectData from "../_data/intellect.json"

export default function AboutPage() {
  const rova = intellectData.experience.find(e => e.id === 'exp-rova');

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[#00D4FF]/30 selection:text-white">
      <Navigation />

      <main className="max-w-5xl mx-auto px-6 md:px-10 pt-32 pb-24">
        
        {/* SECTION 1: Why I Build AI */}
        <SectionReveal>
          <div className="mb-24">
            <h1 className="font-mono text-sm tracking-[0.2em] uppercase text-[#00D4FF] mb-8">
              Why I Build AI
            </h1>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-[#F0F0FF] max-w-4xl tracking-tight">
              Watching my grandfather struggle to navigate a basic smartphone app made me realize how much technology excludes people. That led me to build <span className="text-[#00D4FF]">ElderAI</span>, and it defined my entire philosophy: <span className="text-[#7C3AED]">I build AI systems for real people, not benchmarks.</span>
            </h2>
          </div>
        </SectionReveal>

        {/* SECTION 2: How I Work */}
        <SectionReveal delay={0.1}>
          <div className="mb-24">
            <div className="w-full h-[1px] bg-white/[0.05] mb-12" />
            <h3 className="font-mono text-sm tracking-[0.2em] uppercase text-[#8B8BA7] mb-10">
              How I Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
              <div>
                <h4 className="font-display text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00D4FF] rounded-full" />
                  Research → Production
                </h4>
                <p className="text-[#8B8BA7] leading-relaxed text-sm">
                  I don't stop at Jupyter notebook demos. I care deeply about latency, edge cases, and robust deployment architectures.
                </p>
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#7C3AED] rounded-full" />
                  Systems Thinking
                </h4>
                <p className="text-[#8B8BA7] leading-relaxed text-sm">
                  I see AI as pipelines, not just isolated models. Every component matters, from data ingestion to the final user interface.
                </p>
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00FF87] rounded-full" />
                  User Obsession
                </h4>
                <p className="text-[#8B8BA7] leading-relaxed text-sm">
                  I build for the person who will actually use the system. An intuitive, accessible experience is just as vital as model accuracy.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* SECTION 3: Experience */}
        <SectionReveal delay={0.2}>
          <div className="mb-24">
            <div className="w-full h-[1px] bg-white/[0.05] mb-12" />
            <h3 className="font-mono text-sm tracking-[0.2em] uppercase text-[#8B8BA7] mb-10">
              Experience Case Study
            </h3>
            
            {rova && (
              <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden border-[#00D4FF]/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4FF]/5 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
                  <div>
                    <h4 className="font-display text-3xl font-bold text-white mb-2">{rova.role}</h4>
                    <p className="text-lg text-[#00D4FF] font-mono">{rova.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block border border-white/10 rounded-full px-4 py-1.5 font-mono text-xs text-[#8B8BA7] bg-white/5">
                      {rova.period}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                  <div className="space-y-8">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7] mb-2">The Problem</div>
                      <p className="text-[#F0F0FF] leading-relaxed text-sm">
                        Enterprise clients had massive archives of 40+ page PDFs with complex, variable-layout tables and noisy scans. Traditional OCR completely failed to preserve the structured relationships needed for RAG pipelines.
                      </p>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7] mb-2">What I Built</div>
                      <p className="text-[#F0F0FF] leading-relaxed text-sm">
                        Engineered an end-to-end vision-parsing pipeline using YOLOv8 for region detection and Microsoft Table Transformer for cell-level parsing. Integrated this into a LlamaIndex RAG system for semantic querying over the extracted data.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7] mb-3">Tech Used</div>
                      <div className="flex flex-wrap gap-2">
                        {rova.stack.map(tech => (
                          <TechBadge key={tech} label={tech} color="#00D4FF" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7] mb-2">The Outcome</div>
                      <div className="glass-card bg-black/40 border-white/5 p-4 rounded-lg">
                        <p className="text-[#00FF87] font-mono text-sm leading-relaxed">
                          {rova.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SectionReveal>

        {/* SECTION 4: Skills */}
        <SectionReveal delay={0.3}>
          <div>
            <div className="w-full h-[1px] bg-white/[0.05] mb-12" />
            <h3 className="font-mono text-sm tracking-[0.2em] uppercase text-[#8B8BA7] mb-10">
              Technical Foundation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              
              {/* Quadrant 1 */}
              <div>
                <h4 className="font-display text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Core ML</h4>
                <div className="flex flex-wrap gap-2">
                  <TechBadge label="PyTorch" color="#ee4c2c" />
                  <TechBadge label="TensorFlow" color="#ff6f00" />
                  <TechBadge label="scikit-learn" color="#3498db" />
                  <TechBadge label="Bi-LSTM" color="#F0F0FF" />
                  <TechBadge label="CNNs" color="#F0F0FF" />
                  <TechBadge label="GANs" color="#F0F0FF" />
                  <TechBadge label="Transformers" color="#F0F0FF" />
                </div>
              </div>

              {/* Quadrant 2 */}
              <div>
                <h4 className="font-display text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Production Engineering</h4>
                <div className="flex flex-wrap gap-2">
                  <TechBadge label="FastAPI" color="#009688" />
                  <TechBadge label="Docker" color="#2496ed" />
                  <TechBadge label="Azure AI / ML" color="#0078d4" />
                  <TechBadge label="LangChain" color="#12121C" />
                  <TechBadge label="LlamaIndex" color="#12121C" />
                  <TechBadge label="LLaMA Parse" color="#12121C" />
                </div>
              </div>

              {/* Quadrant 3 */}
              <div>
                <h4 className="font-display text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Research Tools</h4>
                <div className="flex flex-wrap gap-2">
                  <TechBadge label="OpenCV" color="#5C3EE8" />
                  <TechBadge label="YOLOv8 / YOLOv11" color="#F0F0FF" />
                  <TechBadge label="Table Transformer" color="#F0F0FF" />
                  <TechBadge label="Whisper" color="#F0F0FF" />
                  <TechBadge label="Jupyter" color="#F37626" />
                  <TechBadge label="NumPy / Pandas" color="#4d77cf" />
                </div>
              </div>

              {/* Quadrant 4 */}
              <div>
                <h4 className="font-display text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Full-Stack</h4>
                <div className="flex flex-wrap gap-2">
                  <TechBadge label="Next.js" color="#000000" />
                  <TechBadge label="React" color="#61dafb" />
                  <TechBadge label="TypeScript" color="#3178c6" />
                  <TechBadge label="Tailwind CSS" color="#38b2ac" />
                  <TechBadge label="Flask" color="#ffffff" />
                  <TechBadge label="Streamlit" color="#ff4b4b" />
                  <TechBadge label="Supabase" color="#3ecf8e" />
                </div>
              </div>

            </div>
          </div>
        </SectionReveal>

      </main>
    </div>
  )
}
