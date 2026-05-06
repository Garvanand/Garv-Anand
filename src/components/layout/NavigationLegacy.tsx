'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Manifesto', href: '/about', code: 'ACT.01' },
  { label: 'Projects', href: '/projects', code: 'ACT.03' },
  { label: 'Signal', href: '/newsroom', code: 'INTEL' },
  { label: 'Contact', href: '/contact', code: 'COMM' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasNewSignal, setHasNewSignal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const checkUnread = async () => {
      try {
        const res = await fetch('/api/medium');
        if (res.ok) {
          const articles = await res.json();
          if (articles.length > 0) {
            const latestPub = new Date(articles[0].pubDate).getTime();
            const lastVisited = localStorage.getItem('lastVisitedNewsroom');
            if (!lastVisited || latestPub > new Date(lastVisited).getTime()) {
              setHasNewSignal(true);
            }
          }
        }
      } catch (e) {}
    };
    checkUnread();

    const onVisited = () => setHasNewSignal(false);
    window.addEventListener('newsroom-visited', onVisited);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('newsroom-visited', onVisited);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center pt-6">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto relative px-2 py-2 rounded-full border transition-all duration-500 ${
            scrolled 
              ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
              : 'bg-transparent border-transparent'
          }`}
        >
          <div className="flex items-center gap-1 md:gap-2">
            {/* Branding / Home */}
            <Link 
              href="/" 
              className="px-4 py-2 flex items-center gap-3 group"
            >
              <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-180 transition-transform duration-500">
                <div className="-rotate-45 group-hover:-rotate-180 transition-transform duration-500 font-display text-[10px] font-black text-black">GA</div>
              </div>
              <span className="hidden md:block font-display text-xs font-black tracking-tighter text-white uppercase group-hover:text-[#00D4FF] transition-colors">Garv Anand</span>
            </Link>

            <div className="h-4 w-[1px] bg-white/10 mx-1" />

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href.startsWith('/#') && pathname === '/');
                const isSignal = item.label === 'Signal';
                
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-full transition-all duration-300 group flex flex-col items-center justify-center ${
                      isSignal 
                        ? 'bg-[#DC2626] text-white hover:bg-white hover:text-black shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                        : isActive 
                          ? 'text-white' 
                          : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-[8px] opacity-50 tracking-widest leading-none mb-1 group-hover:opacity-100">{item.code}</span>
                    <span className="font-display text-[10px] font-black uppercase tracking-tight leading-none">
                      {item.label}
                    </span>
                    
                    {/* Active Indicator */}
                    {isActive && !isSignal && (
                      <motion.div 
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/5 rounded-full -z-10 border border-white/10"
                      />
                    )}

                    {/* Notification Pulse for Signal */}
                    {isSignal && hasNewSignal && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="h-4 w-[1px] bg-white/10 mx-1" />

            {/* Resume Button */}
            <Link
              href="/resume"
              className="px-5 py-2 rounded-full bg-white text-black font-display text-[10px] font-black uppercase hover:bg-[#00D4FF] transition-colors"
            >
              Resume
            </Link>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Toggle (only visible on small screens when scrolled or in specific contexts) */}
      <div className="md:hidden fixed bottom-8 right-6 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center p-10"
          >
            <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#00D4FF] transition-all group"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-[#00D4FF] tracking-widest">{item.code}</span>
                      <span className="font-display text-3xl font-black text-white uppercase">{item.label}</span>
                    </div>
                    <span className="text-white/20 group-hover:text-white transition-colors">→</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/resume"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center p-6 rounded-2xl bg-white text-black font-display text-2xl font-black uppercase"
                >
                  Resume
                </Link>
              </motion.div>
            </div>
            
            <button 
              onClick={() => setMobileOpen(false)}
              className="mt-12 font-mono text-[10px] text-white/40 uppercase tracking-[0.5em] hover:text-white transition-colors"
            >
              Close Terminal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
