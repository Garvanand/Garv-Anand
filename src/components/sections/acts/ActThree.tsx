'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import intellectData from '@/data/intellect.json';
import { TechBadge } from '@/components/shared/ui';

export function ActThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll to horizontal translation (desktop only)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-82%']);

  // MOBILE: vertical card stack layout
  if (isMobile) {
    return (
      <section id="work" className="relative py-16 px-4 sm:px-6">
        <div className="mb-8">
          <span className="section-label">Act 03 / What I've Built</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)] mt-4">
            Systems in the wild.
          </h2>
        </div>

        <div className="space-y-4">
          {intellectData.projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.05 }}
              className="w-full"
            >
              <div className="glass-card rounded-xl p-5 sm:p-6 flex flex-col relative overflow-hidden group">
                {/* Color accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                  style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                />

                {/* Flagship badge */}
                {project.flagship && (
                  <div className="inline-flex items-center gap-1.5 mb-3 self-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-[var(--accent)]">Flagship</span>
                  </div>
                )}

                {/* Title */}
                <h3
                  className="font-display text-xl sm:text-2xl font-bold mb-1"
                  style={{
                    background: `linear-gradient(135deg, #F0F0FF 0%, ${project.color} 100%)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {project.title}
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] text-[var(--accent-2)] mb-3">{project.subtitle}</p>

                {/* Problem statement */}
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
                  {project.problem_statement}
                </p>

                {/* Impact metric */}
                <div className="mb-4 py-3 border-y border-[var(--border)]">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                    {project.metrics[0]?.value}
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[var(--text-dim)] mt-0.5">
                    {project.metrics[0]?.label}
                  </div>
                </div>

                {/* Tech stack chips */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3">
                  {project.tech_used.slice(0, 4).map((tech) => (
                    <TechBadge key={tech} label={tech} color={project.color} />
                  ))}
                  {project.tech_used.length > 4 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono border border-white/5 bg-white/5 text-[#8B8BA7]">
                      +{project.tech_used.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-auto pt-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors py-2">
                      Source ↗
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors py-2">
                      Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // DESKTOP: horizontal scroll layout
  return (
    <section ref={containerRef} id="work" className="relative" style={{ height: `${intellectData.projects.length * 35 + 50}vh` }}>
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
