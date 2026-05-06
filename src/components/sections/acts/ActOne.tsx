'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import intellectData from '@/data/intellect.json';

const highlights = intellectData.projects.slice(0, 3).map(p => ({
  title: p.title,
  oneliner: p.signal,
  color: p.color,
  icon: p.title === 'ElderAI' ? '🗣️' : p.title === "Parkinson's Detection" ? '🧠' : '📊',
}));

export function ActOne() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.4], [-60, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.5], [60, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          style={{ opacity: leftOpacity }}
          className="mb-6"
        >
          <span className="section-label">Act 01 / The Problem I Solve</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — statement */}
          <motion.div style={{ x: leftX, opacity: leftOpacity }}>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.1] text-[var(--text)] mb-6">
              Most AI demos stop at{' '}
              <span className="line-through text-[var(--text-muted)] decoration-[var(--accent)]/40">
                Jupyter notebooks.
              </span>
            </h2>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.1] mb-8">
              I build systems that{' '}
              <span className="neon-text">ship.</span>
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed max-w-md">
              From YOLOv8 table detection processing 40-page PDFs at production scale,
              to voice-first AI companions that serve users who can't touch a screen —
              my work lives in production, not just in <span className="terminal-text">.ipynb</span> files.
            </p>
          </motion.div>

          {/* Right — 3 project icons */}
          <motion.div style={{ x: rightX, opacity: rightOpacity }} className="space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-xl p-5 flex items-start gap-4"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: item.color + '18', border: `1px solid ${item.color}30` }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[var(--text)] mb-0.5">{item.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] italic leading-relaxed">"{item.oneliner}"</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
