'use client';

import { motion } from 'framer-motion';
import intellectData from '@/data/intellect.json';

export function ActFour() {
  const { contact } = intellectData.profile;

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 md:px-10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[500px] rounded-full opacity-[0.04] blur-[100px] sm:blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00D4FF 0%, #7C3AED 40%, transparent 70%)' }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Act 04 / Let's Work Together</span>
        </motion.div>

        {/* Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-sm text-[var(--text-muted)] mt-8 mb-10 tracking-wide"
        >
          Open to Summer 2026 internships in AI/ML and GenAI engineering.
        </motion.p>

        {/* Large email */}
        <motion.a
          href={`mailto:${contact.email}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="block font-display text-xl sm:text-3xl md:text-5xl font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-300 mb-8 sm:mb-10 break-all"
        >
          {contact.email}
        </motion.a>

        {/* Social links — large type */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 md:gap-12"
        >
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 py-2"
          >
            LinkedIn
          </a>
          <span className="w-1 h-1 rounded-full bg-[var(--text-dim)] hidden sm:block" />
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 py-2"
          >
            GitHub
          </a>
          <span className="w-1 h-1 rounded-full bg-[var(--text-dim)] hidden sm:block" />
          <a
            href="/resume"
            className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 py-2"
          >
            Resume
          </a>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-20 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-dim)]"
        >
          Designed & built by Garv Anand — 2025
        </motion.p>
      </div>
    </section>
  );
}
