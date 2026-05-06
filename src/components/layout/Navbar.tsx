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
        height: scrolled ? 64 : 110,
        backgroundColor: scrolled ? 'rgba(5, 5, 8, 0.95)' : 'rgba(5, 5, 8, 0)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0)'
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center px-12 pointer-events-none"
    >
      <div className="flex items-center w-full h-full pointer-events-auto">
        
        {/* LEFT — GA MARK (HIGHLIGHTED) */}
        <Link href="/" className="relative flex items-center gap-4 cursor-pointer group no-underline shrink-0">
          <div className="relative">
            <motion.div 
              animate={{ rotate: scrolled ? 0 : 45 }}
              className="w-12 h-12 bg-white flex items-center justify-center border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:bg-transparent group-hover:text-white transition-colors duration-300"
            >
              <span className={`font-mono text-xl font-black transition-colors duration-300 ${scrolled ? '' : '-rotate-45'} text-black group-hover:text-white`}>GA</span>
            </motion.div>
            {/* Corner decorations */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-sm font-black text-white tracking-[0.3em] uppercase group-hover:text-[#00D4FF] transition-colors">Garv Anand</span>
            <AnimatePresence>
              {!scrolled && (
                <motion.span
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-mono text-[9px] text-white/40 tracking-[0.1em] uppercase"
                >
                  Neural Intelligence Engineer
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>

        {/* CENTER — THE NEURAL NETWORK */}
        <div ref={containerRef} className="relative flex-1 h-full hidden md:flex items-center justify-center mx-16">
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

        {/* RIGHT — RESUME */}
        <Link 
          href="/resume" 
          className="hidden md:flex items-center gap-2 font-mono text-[11px] font-black text-white tracking-[0.2em] no-underline hover:bg-white hover:text-black transition-all group shrink-0 border-2 border-white px-5 py-2"
        >
          RESUME ↗
        </Link>

        {/* MOBILE TRIGGER */}
        <div className="md:hidden flex-1 flex justify-end items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-4 cursor-pointer p-4 bg-white text-black font-mono text-[10px] font-black uppercase"
          >
            Menu
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#050508] z-[200] flex flex-col p-12 pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-mono text-2xl font-black text-white">GA</span>
              <button onClick={() => setIsMenuOpen(false)} className="font-mono text-xs font-black text-white border-2 border-white px-4 py-2">CLOSE</button>
            </div>
            <div className="flex flex-col gap-8">
              {NAV_NODES.map((node, i) => {
                const isSignal = node.label === 'SIGNAL';
                return (
                  <Link
                    key={node.label}
                    href={node.href}
                    onClick={(e) => {
                      handleSmoothScroll(e, node.href);
                      setIsMenuOpen(false);
                    }}
                    className="group"
                  >
                    <div className="flex flex-col">
                      <span className={`font-mono text-[10px] ${isSignal ? 'text-[#DC2626]' : 'text-white/40'}`}>0{i + 1} // {node.sub}</span>
                      <span className={`font-mono text-4xl font-black ${isSignal ? 'text-[#DC2626]' : 'text-white'} group-hover:translate-x-4 transition-transform`}>{node.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
