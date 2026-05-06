'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { RotatingWord } from '@/components/shared/RotatingWord';
import { HeroTerminal } from '@/components/sections/HeroTerminal';
import { GlowButton, MetricCard } from '@/components/shared/ui';

const CyanParticleScene = dynamic(() => import('@/components/webgl/CyanParticleScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050508]" />
});

const stagger = (i: number) => ({ delay: 0.1 * i });

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "15%"]);

  return (
    <>
      <section ref={ref} className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Three.js particle background */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <CyanParticleScene />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30 z-[1]" />

        {/* Availability chip — top left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ...stagger(0) }}
          className="absolute top-20 left-6 md:left-10 z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/[0.06]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF87]" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#00FF87]">
              Available for internships — Summer 2026
            </span>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div style={{ opacity, y }} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">

            {/* Left side — text */}
            <div className="max-w-2xl">
              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ...stagger(1), ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tighter"
              >
                <span className="text-[var(--text)]">Building AI that</span>
                <br />
                <RotatingWord />
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ...stagger(2) }}
                className="mt-6 font-mono text-sm md:text-base text-[var(--text-muted)] leading-relaxed"
              >
                B.Tech CSE (AI/ML) @ VIT{' '}
                <span className="text-[var(--text-dim)]">·</span>{' '}
                GenAI Intern @ ROVA{' '}
                <span className="text-[var(--text-dim)]">·</span>{' '}
                ElderAI Creator
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ...stagger(3) }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <GlowButton href="#work" variant="primary">See My Work</GlowButton>
                <GlowButton variant="secondary" onClick={() => setTerminalOpen(true)}>
                  Open Terminal
                </GlowButton>
              </motion.div>
            </div>

            {/* Right side — particle scene gets the space via the absolute background */}
          </div>

          {/* Stats row — bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ...stagger(4) }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl"
          >
            <MetricCard value="8.83" label="CGPA" context="/ 10" />
            <MetricCard value="456+" label="LeetCode" context="Problems Solved" />
            <MetricCard value="5,000+" label="Beaten" context="Hackathon Participants" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--text-dim)] mb-3">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--text-dim)] to-transparent" />
        </motion.div>
      </section>

      {/* Terminal overlay */}
      <AnimatePresence>
        {terminalOpen && <HeroTerminal onClose={() => setTerminalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
