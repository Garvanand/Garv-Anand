'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import intellectData from '../../_data/intellect.json';

export function RadialIntelMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Flatten skills into array for mapping
  const coreSkills = Object.entries(intellectData.skills).flatMap(([cat, skills]) => 
     skills.map(skill => ({ cat, skill }))
  );

  return (
    <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center font-mono">
      {/* Background Radar Sweeps */}
      <div className="absolute inset-4 rounded-full border border-dashed border-[#00ffff]/20 animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-16 rounded-full border border-dashed border-[#b100ff]/20 animate-[spin_40s_linear_infinite_reverse]" />
      <div className="absolute inset-32 rounded-full border border-white/5 bg-[#020617]/50 backdrop-blur" />

      {/* Connection Lines (SVGs) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-200 -200 400 400">
         {coreSkills.map((s, i) => {
           const angle = (i * (Math.PI * 2)) / coreSkills.length;
           const radius = hoveredNode === s.skill ? 180 : 150;
           const x = Math.cos(angle) * radius;
           const y = Math.sin(angle) * radius;
           
           return (
             <motion.line
               key={`line-${s.skill}`}
               x1={0} y1={0} x2={x} y2={y}
               stroke={hoveredNode === s.skill ? '#00ffff' : 'rgba(255,255,255,0.05)'}
               strokeWidth={hoveredNode === s.skill ? 2 : 1}
               animate={{ x2: x, y2: y }}
               transition={{ type: 'spring', stiffness: 50, damping: 20 }}
             />
           )
         })}
      </svg>

      {/* Center Core */}
      <motion.div 
        animate={{ boxShadow: hoveredNode ? '0 0 40px rgba(0,255,255,0.4)' : '0 0 20px rgba(177,0,255,0.2)' }}
        className="absolute z-20 w-20 h-20 rounded-full glass-hud flex items-center justify-center flex-col shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-500"
      >
        <div className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse mb-1" />
        <span className="text-[8px] uppercase tracking-widest text-[#00ffff]">Intelligence</span>
      </motion.div>

      {/* Orbital Nodes */}
      {coreSkills.map((s, i) => {
         const angle = (i * (Math.PI * 2)) / coreSkills.length;
         // Base radius is 150px
         const radius = 150;
         const x = Math.cos(angle) * radius;
         const y = Math.sin(angle) * radius;

         return (
           <motion.div
             key={s.skill}
             className="absolute z-30"
             style={{ x, y, xOrigin: "50%", yOrigin: "50%" }}
             animate={{
                x: hoveredNode === s.skill ? Math.cos(angle) * 180 : x,
                y: hoveredNode === s.skill ? Math.sin(angle) * 180 : y,
             }}
           >
             <button
               onMouseEnter={() => setHoveredNode(s.skill)}
               onMouseLeave={() => setHoveredNode(null)}
               className={`glass-hud px-3 py-1 rounded text-[10px] uppercase tracking-wider backdrop-blur transition-all ${
                 hoveredNode === s.skill ? 'border-[#00ffff] text-[#00ffff] scale-110' : 'border-white/10 text-gray-400 hover:text-white'
               } whitespace-nowrap -translate-x-1/2 -translate-y-1/2`}
             >
               {s.skill}
             </button>
           </motion.div>
         );
      })}
    </div>
  );
}
