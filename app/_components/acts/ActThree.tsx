'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import intellectData from '../../_data/intellect.json';
import { TechBadge } from '@/components/ui';

export function ActThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(intellectData.projects.length - 1) * 60}%`]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${intellectData.projects.length * 80}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-10 mb-8">
          <span className="section-label">Act 03 / What I've Built</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text)] mt-4">
            Systems in the wild.
          </h2>
        </div>

        {/* Horizontal scroll track */}
        <motion.div
          style={{ x }}
          className="flex gap-6 px-6 md:px-10"
        >
          {intellectData.projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="shrink-0 w-[380px] md:w-[440px]"
            >
              <div className="glass-card rounded-xl p-7 h-full flex flex-col relative overflow-hidden group">
                {/* Color accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                />

                {/* Flagship badge */}
                {project.flagship && (
                  <div className="inline-flex items-center gap-1.5 mb-4 self-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-[var(--accent)]">Flagship</span>
                  </div>
                )}

                {/* Title */}
                <h3
                  className="font-display text-2xl font-bold mb-1"
                  style={{
                    background: `linear-gradient(135deg, #F0F0FF 0%, ${project.color} 100%)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {project.title}
                </h3>
                <p className="font-mono text-[11px] text-[var(--accent-2)] mb-4">{project.subtitle}</p>

                {/* Problem statement */}
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 flex-1">
                  {project.problem_statement}
                </p>

                {/* Impact metric — BIG */}
                <div className="mb-5 py-4 border-y border-[var(--border)]">
                  <div className="font-display text-3xl font-bold text-[var(--text)]">
                    {project.metrics[0]?.value}
                  </div>
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-dim)] mt-1">
                    {project.metrics[0]?.label}
                  </div>
                </div>

                {/* Tech stack chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech_used.slice(0, 5).map((tech) => (
                    <TechBadge key={tech} label={tech} color={project.color} />
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-auto pt-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                      Source ↗
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                      Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll progress indicator */}
        <div className="px-6 md:px-10 mt-6">
          <div className="max-w-xs h-[2px] bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] rounded-full origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-dim)] mt-2">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}
