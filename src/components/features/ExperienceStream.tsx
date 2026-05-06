'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import intellectData from '@/data/intellect.json';

export function ExperienceStream() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const streamTranslateX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="relative w-full h-[80vh] flex items-center bg-[#020617] overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="absolute left-10 text-xs font-mono text-[#b100ff] uppercase tracking-widest opacity-80 z-20">
        03 / Signal Vector
      </div>

      {/* Wrapping Motion div for horizontal scroll parallax */}
      <motion.div 
        style={{ x: streamTranslateX }} 
        className="flex items-center pl-[20vw] pr-[50vw] space-x-24 z-10 w-max"
      >
        {intellectData.experience.map((exp, i) => (
          <div key={exp.id} className="relative flex flex-col items-center">
            
            {/* The Horizontal Line connection to previous node */}
            {i !== 0 && (
               <div className="absolute top-[48px] right-[50%] w-24 h-[1px] bg-white/10">
                 <motion.div 
                   initial={{ scaleX: 0 }}
                   whileInView={{ scaleX: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8 }}
                   className="absolute inset-0 bg-[#00ffff] origin-left shadow-[0_0_10px_#00ffff]"
                 />
                 <motion.div
                   animate={{ x: [0, 96] }}
                   transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                   className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"
                 />
               </div>
            )}

            {/* The Node */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="glass-hud w-24 h-24 rounded-full flex flex-col items-center justify-center relative z-20 hover:scale-110 transition-transform cursor-pointer group"
            >
              <div className="absolute inset-2 rounded-full border border-dashed border-[#00ffff]/30 group-hover:animate-spin-slow" />
              <span className="text-[#00ffff] text-xs font-bold pt-1">{exp.date}</span>
            </motion.div>

            {/* Content Payload */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center max-w-xs"
            >
              <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
              <p className="text-sm text-cyan-400 font-mono mb-2 uppercase">{exp.company}</p>
              <p className="text-xs text-gray-400 font-mono border border-white/10 p-2 rounded bg-black/40 inline-block">{exp.focus}</p>
            </motion.div>
          </div>
        ))}
        
        {/* Origin / Terminator Nodes */}
        <div className="relative flex items-center justify-center">
           <div className="absolute right-[50%] w-24 h-[1px] bg-white/10">
             <div className="absolute inset-0 bg-gradient-to-r from-[#00ffff] to-transparent opacity-50" />
           </div>
           <div className="w-16 h-16 rounded-full border border-[#b100ff]/30 flex items-center justify-center text-[10px] text-gray-500 font-mono tracking-widest relative z-20 bg-black">
             ORIGIN
           </div>
        </div>

      </motion.div>
    </div>
  );
}
