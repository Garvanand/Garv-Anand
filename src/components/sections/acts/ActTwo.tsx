'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import intellectData from '@/data/intellect.json';
import { CommandPill } from '@/components/shared/ui';

const rova = intellectData.experience.find(e => e.id === 'exp-rova')!;
const mlsa = intellectData.experience.find(e => e.id === 'exp-mlsa')!;

// Signal trace node data
const rovaNodes = [
  { label: 'YOLOv8 Table Detection', detail: 'Structured data extraction from noisy variable-layout PDFs', color: '#00D4FF' },
  { label: 'Table Transformer', detail: 'Cell-level parsing of detected table regions via Microsoft model', color: '#7C3AED' },
  { label: 'LlamaIndex RAG', detail: 'Semantic search pipeline over extracted document content', color: '#00FF87' },
  { label: 'LLaMA Parse', detail: 'Multi-format document parsing for downstream LLM consumption', color: '#f59e0b' },
];

export function ActTwo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const traceProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section ref={ref} className="relative min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Act 02 / How I Think</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text)] mt-4 sm:mt-6 mb-8 sm:mb-12">
            Signal trace — <span className="text-[var(--text-muted)]">where I've fired.</span>
          </h2>
        </motion.div>

        {/* Signal trace visualization */}
        <div className="relative">
          {/* Central trunk line */}
          <div className="absolute left-5 sm:left-8 md:left-12 top-0 bottom-0 w-[2px] bg-[var(--border)]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00D4FF] to-[#7C3AED] origin-top"
              style={{ scaleY: traceProgress, height: '100%' }}
            />
          </div>

          {/* ROVA — Main node */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="relative pl-12 sm:pl-20 md:pl-28 pb-6 sm:pb-8"
          >
            {/* Big pulse node */}
            <div className="absolute left-[12px] sm:left-[22px] md:left-[38px] top-2 z-10">
              <div className="relative">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.4)]" />
                <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#00D4FF] animate-ping opacity-30" />
              </div>
            </div>

            <div className="glass-card rounded-xl p-4 sm:p-6 border-[#00D4FF]/20">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#00D4FF]">{rova.period}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-dim)]" />
                <span className="text-sm text-[var(--text-muted)]">{rova.company}</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[var(--text)] mb-2">{rova.role}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4 max-w-lg">{rova.impact}</p>

              {/* Branching child nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-6">
                {rovaNodes.map((node, i) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    {/* Branch connector dot */}
                    <div className="mt-1.5 shrink-0">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: node.color, boxShadow: `0 0 8px ${node.color}40` }}
                      />
                    </div>
                    <div>
                      <span className="text-xs font-display font-semibold text-[var(--text)]">{node.label}</span>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-0.5">{node.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* MLSA — Secondary node */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative pl-12 sm:pl-20 md:pl-28 pb-6 sm:pb-8"
          >
            <div className="absolute left-[14px] sm:left-[25px] md:left-[41px] top-3 z-10">
              <div className="w-3 h-3 rounded-full bg-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.4)]" />
            </div>

            <div className="glass-card rounded-xl p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#7C3AED]">{mlsa.period}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-dim)]" />
                <span className="text-sm text-[var(--text-muted)]">{mlsa.company}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-[var(--text)] mb-1">{mlsa.role}</h3>
              <p className="text-sm text-[var(--text-muted)]">{mlsa.impact}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {mlsa.stack.map((t) => (
                  <CommandPill key={t} variant="violet">{t}</CommandPill>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Research — tertiary node */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative pl-12 sm:pl-20 md:pl-28"
          >
            <div className="absolute left-[15px] sm:left-[26px] md:left-[42px] top-3 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
            </div>

            <div className="glass-card rounded-xl p-4 sm:p-5">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#f59e0b]">Ongoing</span>
              <h3 className="font-display text-lg font-bold text-[var(--text)] mt-1 mb-1">Research — IEEE Publication</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Parkinson's Detection via Bi-LSTM — 93% accuracy. Paper submitted to IEEE (in review).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
