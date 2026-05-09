'use client';

import { usePathname } from 'next/navigation';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useMotionValueEvent 
} from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const NAV_NODES = [
  { label: 'MANIFESTO', sub: 'ACT_01', href: '/about' },
  { label: 'PROJECTS',  sub: 'ACT_03', href: '/projects' }, 
  { label: 'SIGNAL',    sub: 'INTEL',  href: '/newsroom' },
  { label: 'CONTACT',   sub: 'COMM',   href: '/contact' },
];

export default function NeuralNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 30);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const observeTarget = containerRef.current;
    if (!observeTarget) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    resizeObserver.observe(observeTarget);
    return () => resizeObserver.disconnect();
  }, []);

  const getActiveIndex = () => {
    return NAV_NODES.findIndex(n => {
      if (n.href.startsWith('/#')) {
        return pathname === '/' && typeof window !== 'undefined' && window.location.hash === n.href.substring(1);
      }
      return pathname === n.href;
    });
  };

  const activeIndex = getActiveIndex();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const id = href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={{ 
        height: scrolled ? 56 : 70,
        backgroundColor: scrolled ? 'rgba(5, 5, 8, 0.95)' : 'rgba(5, 5, 8, 0)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0)'
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center px-4 sm:px-6 md:px-12 pointer-events-none"
    >
      <div className="flex items-center w-full h-full pointer-events-auto">
        
        {/* LEFT — GA MARK */}
        <Link href="/" className="relative flex items-center gap-2 sm:gap-4 cursor-pointer group no-underline shrink-0">
          <div className="relative">
            <motion.div 
              animate={{ rotate: scrolled ? 0 : 45 }}
              className="w-9 h-9 sm:w-12 sm:h-12 bg-white flex items-center justify-center border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:bg-transparent group-hover:text-white transition-colors duration-300"
            >
              <span className={`font-mono text-base sm:text-xl font-black transition-colors duration-300 ${scrolled ? '' : '-rotate-45'} text-black group-hover:text-white`}>GA</span>
            </motion.div>
            {/* Corner decorations — hidden on small mobile */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white hidden sm:block" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white hidden sm:block" />
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm font-black text-white tracking-[0.15em] sm:tracking-[0.3em] uppercase group-hover:text-[#00D4FF] transition-colors">Garv Anand</span>
            <AnimatePresence>
              {!scrolled && (
                <motion.span
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-mono text-[7px] sm:text-[9px] text-white/40 tracking-[0.1em] uppercase hidden sm:block"
                >
                  Neural Intelligence Engineer
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>

        {/* CENTER — THE NEURAL NETWORK (desktop only, hidden below lg) */}
        <div ref={containerRef} className="relative flex-1 h-full hidden lg:flex items-center justify-center mx-8 xl:mx-16">
          {/* LAYER 1 — SVG edges */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          >
            {NAV_NODES.map((node, i) => {
              if (i === NAV_NODES.length - 1) return null;
              
              const startX = (i / (NAV_NODES.length - 1)) * dimensions.width;
              const endX = ((i + 1) / (NAV_NODES.length - 1)) * dimensions.width;
              const centerY = dimensions.height / 2;
              
              const isConnectedToActive = i === activeIndex || (i + 1) === activeIndex;
              const isSignalEdge = node.label === 'SIGNAL' || NAV_NODES[i+1].label === 'SIGNAL';

              return (
                <motion.line
                  key={`edge-${i}`}
                  x1={startX}
                  y1={centerY}
                  x2={endX}
                  y2={centerY}
                  stroke={isSignalEdge ? "#DC2626" : isConnectedToActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth="2"
                  strokeOpacity={isConnectedToActive ? 0.8 : 0.4}
                  strokeDasharray={isConnectedToActive ? "10 6" : "none"}
                  animate={isConnectedToActive ? { strokeDashoffset: [130, 0] } : {}}
                  transition={isConnectedToActive ? { duration: 1.5, repeat: Infinity, ease: 'linear' } : {}}
                />
              );
            })}
          </svg>

          {/* LAYER 2 — Nodes */}
          <div className="relative z-10 flex items-center w-full justify-between">
            {NAV_NODES.map((node, i) => {
              const isActive = i === activeIndex;
              const isHovered = hoveredIndex === i;
              const isSignal = node.label === 'SIGNAL';
              
              return (
                <Link
                  key={node.label}
                  href={node.href}
                  onClick={(e) => handleSmoothScroll(e, node.href)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                  className="relative flex flex-col items-center gap-2 cursor-pointer no-underline group"
                >
                  {/* SUB LABEL ABOVE */}
                  <motion.span
                    animate={{ 
                      opacity: (isHovered || isActive) ? 1 : 0.4,
                      color: isSignal ? "#DC2626" : "#FFFFFF"
                    }}
                    className="absolute bottom-full mb-4 font-mono text-[10px] font-bold tracking-[0.1em] whitespace-nowrap pointer-events-none"
                  >
                    {node.sub}
                  </motion.span>

                  {/* THE NODE CIRCLE */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        width: scrolled ? 10 : 12,
                        height: scrolled ? 10 : 12,
                        scale: isHovered ? 1.5 : 1,
                        backgroundColor: isSignal ? "#DC2626" : isActive ? "#FFFFFF" : isHovered ? "rgba(255, 255, 255, 0.2)" : "transparent",
                        borderColor: isSignal ? "#DC2626" : isActive ? "#FFFFFF" : isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.4)",
                        boxShadow: isSignal 
                          ? "0 0 20px rgba(220,38,36,0.6)" 
                          : isActive 
                            ? "0 0 25px rgba(255,255,255,0.6)" 
                            : "none"
                      }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="rounded-full border-2"
                    />

                    {/* PULSE RING */}
                    <AnimatePresence>
                      {(isActive || isSignal) && (
                        <motion.div
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 3.5, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                          className={`absolute inset-0 rounded-full border-2 pointer-events-none ${isSignal ? 'border-[#DC2626]' : 'border-white'}`}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* LABEL BELOW */}
                  <motion.span
                    animate={{
                      opacity: (isActive || isHovered) ? 1 : 0.6,
                      color: isSignal ? "#DC2626" : "#FFFFFF",
                      scale: (isActive || isHovered) ? 1.1 : 1
                    }}
                    className="absolute top-full mt-5 font-mono text-[11px] font-black tracking-[0.25em] whitespace-nowrap pointer-events-none uppercase drop-shadow-md"
                  >
                    {node.label}
                  </motion.span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT — RESUME (desktop only) */}
        <Link 
          href="/resume" 
          className="hidden lg:flex items-center gap-2 font-mono text-[11px] font-black text-white tracking-[0.2em] no-underline hover:bg-white hover:text-black transition-all group shrink-0 border-2 border-white px-5 py-2"
        >
          RESUME ↗
        </Link>

        {/* MOBILE TRIGGER */}
        <div className="lg:hidden flex-1 flex justify-end items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center gap-2 cursor-pointer p-3 sm:p-4 bg-white text-black font-mono text-[10px] font-black uppercase active:scale-95 transition-transform"
            aria-label="Open menu"
          >
            <span className="hidden sm:inline">Menu</span>
            <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU — Full-screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#050508] z-[200] flex flex-col pointer-events-auto overflow-y-auto"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            {/* Mobile menu header */}
            <div className="flex justify-between items-center px-6 py-5 sm:px-12 sm:py-8 shrink-0">
              <span className="font-mono text-xl sm:text-2xl font-black text-white">GA</span>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="font-mono text-xs font-black text-white border-2 border-white px-4 py-2 active:scale-95 transition-transform"
                aria-label="Close menu"
              >
                CLOSE
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-6 sm:gap-8 px-6 sm:px-12 flex-1 justify-center">
              {NAV_NODES.map((node, i) => {
                const isSignal = node.label === 'SIGNAL';
                const isActive = pathname === node.href;
                return (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, type: 'spring', damping: 20 }}
                  >
                    <Link
                      href={node.href}
                      onClick={(e) => {
                        handleSmoothScroll(e, node.href);
                        setIsMenuOpen(false);
                      }}
                      className="group block"
                    >
                      <div className="flex flex-col">
                        <span className={`font-mono text-[10px] ${isSignal ? 'text-[#DC2626]' : 'text-white/40'}`}>0{i + 1} // {node.sub}</span>
                        <span className={`font-mono text-3xl sm:text-4xl font-black ${
                          isActive ? 'text-[#00D4FF]' : isSignal ? 'text-[#DC2626]' : 'text-white'
                        } group-hover:translate-x-4 transition-transform`}>
                          {node.label}
                        </span>
                        {isActive && (
                          <div className="h-[2px] w-12 bg-[#00D4FF] mt-2" />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Resume link in mobile menu */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + NAV_NODES.length * 0.08, type: 'spring', damping: 20 }}
              >
                <Link
                  href="/resume"
                  onClick={() => setIsMenuOpen(false)}
                  className="group block"
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-white/40">0{NAV_NODES.length + 1} // CV</span>
                    <span className="font-mono text-3xl sm:text-4xl font-black text-white group-hover:translate-x-4 transition-transform">RESUME</span>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Bottom branding */}
            <div className="px-6 sm:px-12 py-6 sm:py-8 shrink-0 border-t border-white/10">
              <p className="font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase">
                Garv Anand — Neural Intelligence Engineer
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
