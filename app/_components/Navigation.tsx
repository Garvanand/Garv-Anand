'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const navItems = [
  { label: '01 Manifesto', href: '/about' },
  { label: '02 Projects', href: '/projects' },
  { label: '03 Contact', href: '/#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[var(--bg)]/80 backdrop-blur-xl border-b border-white/[0.04]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-sm font-bold tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors">
            GARV ANAND
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/resume"
              className="font-mono text-[11px] px-4 py-1.5 border border-[var(--accent)]/30 text-[var(--accent)] rounded hover:bg-[var(--accent-dim)] transition-all duration-200"
            >
              Resume
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center space-y-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-[var(--text)] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[var(--text)] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Link href="/" className="font-display text-2xl font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                Home
              </Link>
            </motion.div>
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + 2) * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="font-display text-2xl font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  {item.label.split(' ')[1]}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Link href="/resume" className="font-display text-2xl font-bold text-[var(--accent)] hover:text-white transition-colors mt-4">
                Resume
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
