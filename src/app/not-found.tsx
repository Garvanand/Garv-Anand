"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Link from "next/link"

export default function NotFound() {
  const [isClient, setIsClient] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smoothing for the follow effect
  const springConfig = { damping: 25, stiffness: 150 }
  const botX = useSpring(mouseX, springConfig)
  const botY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setIsClient(true)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 40)
      mouseY.set(e.clientY - 40)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  if (!isClient) return null

  return (
    <div className="min-h-[100dvh] bg-[#050508] text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-[#00D4FF]/30 px-4">
      
      {/* Background Latent Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random()
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* The "Neural Bot" - Hidden on mobile/touch devices */}
      <motion.div
        style={{
          x: botX,
          y: botY,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 50
        }}
        className="pointer-events-none hidden md:block"
      >
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 bg-[#00D4FF] blur-[30px] opacity-40 rounded-full animate-pulse" />
          
          {/* Bot Body */}
          <motion.div 
            className="w-16 h-16 bg-[#0A0A10] border-2 border-[#00D4FF] rounded-2xl flex items-center justify-center relative shadow-[0_0_20px_rgba(0,212,255,0.2)]"
            animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Eyes */}
            <div className="flex gap-3">
              <motion.div 
                className="w-2 h-4 bg-[#00D4FF] rounded-full"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              <motion.div 
                className="w-2 h-4 bg-[#00D4FF] rounded-full"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.1 }}
              />
            </div>

            {/* Mouth */}
            <div className="absolute bottom-3 w-4 h-[2px] bg-[#00D4FF]/40 rounded-full" />
          </motion.div>

          {/* Label */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-[#00D4FF] bg-black/80 px-2 py-1 rounded border border-[#00D4FF]/20">
            Scanning latent space...
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-[20vw] sm:text-[12vw] md:text-[8vw] font-black tracking-tighter leading-none mb-4 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
            404
          </h1>
          
          <div className="inline-block bg-[#00D4FF]/10 border border-[#00D4FF]/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8">
            <span className="font-mono text-[10px] sm:text-xs text-[#00D4FF] uppercase tracking-[0.15em] sm:tracking-[0.2em]">
              Error: Manifold Not Found
            </span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 max-w-2xl mx-auto text-[#F0F0FF]">
            Looks like this page drifted into a <span className="text-[#00D4FF]">non-invertible matrix.</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-[#8B8BA7] mb-8 sm:mb-12 max-w-lg mx-auto leading-relaxed">
            The data you are looking for is likely hidden in a high-dimensional pocket of the latent space. My bot is currently scanning, but it's lost too.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link 
              href="/"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#00D4FF] text-black font-display font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-300 text-sm sm:text-base w-full sm:w-auto text-center"
            >
              <div className="absolute inset-0 bg-[#00D4FF] blur-[20px] opacity-40 group-hover:opacity-60 transition-opacity" />
              <span className="relative">Recalibrate Home</span>
            </Link>

            <button 
              onClick={() => window.location.reload()}
              className="px-6 sm:px-8 py-3 sm:py-4 border border-white/10 text-white font-display font-bold uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all text-sm sm:text-base w-full sm:w-auto text-center"
            >
              Retry Sync
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer Fun */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 text-center px-4">
        <p className="font-mono text-[8px] sm:text-[10px] text-[#55556A] uppercase tracking-[0.3em] sm:tracking-[0.5em]">
          Dimensions Searched: 1,024 / Weights Optimized: NaN
        </p>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          body { cursor: none !important; }
          a, button { cursor: none !important; }
        }
      `}</style>
    </div>
  )
}
