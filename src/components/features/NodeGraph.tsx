'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveNode } from './InteractiveNode';
import intellectData from '@/data/intellect.json';

type ActiveNode = 'Projects' | 'Research' | 'Experience' | 'Skills' | null;

export function NodeGraph() {
  const [activeSegment, setActiveSegment] = useState<ActiveNode>(null);

  const nodes: { title: ActiveNode, cat: string }[] = [
    { title: 'Projects', cat: '01_Systems' },
    { title: 'Experience', cat: '02_Chronology' },
    { title: 'Skills', cat: '03_Tensor_Weights' },
    { title: 'Research', cat: '04_Publications' },
  ];

  return (
    <div className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center">
      {/* Central Core */}
      <motion.div 
        className="absolute w-40 h-40 rounded-full border border-[#00ffff]/30 flex flex-col items-center justify-center backdrop-blur-sm bg-black/20"
        animate={{
          boxShadow: ['0 0 20px rgba(0, 255, 255, 0.1)', '0 0 60px rgba(0, 255, 255, 0.4)', '0 0 20px rgba(0, 255, 255, 0.1)'],
        }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <span className="text-[#00ffff] font-mono text-[10px] tracking-[0.3em] uppercase">Core</span>
        <h1 className="text-xl font-bold tracking-widest text-white mt-1">GARV.AI</h1>
      </motion.div>

      {/* Orbiting Elements */}
      <AnimatePresence>
        {!activeSegment && nodes.map((node, i) => (
          <InteractiveNode 
            key={node.title}
            index={i}
            title={node.title}
            category={node.cat}
            onClick={() => setActiveSegment(node.title)}
          />
        ))}
      </AnimatePresence>

      {/* Display detail view when a node is clicked */}
      <AnimatePresence>
        {activeSegment && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            className="absolute z-30 inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <div className="w-full max-w-4xl p-8 border border-[#00ffff]/30 rounded-2xl bg-black/80 shadow-[0_0_50px_rgba(0,102,255,0.2)]">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <h2 className="text-2xl font-mono text-[#00ffff] uppercase tracking-widest flex items-center">
                  <span className="mr-3 w-3 h-3 bg-[#00ffff] rounded-sm animate-pulse" />
                  {activeSegment}_DATA
                </h2>
                <button 
                  onClick={() => setActiveSegment(null)}
                  className="px-4 py-2 text-xs font-mono text-white/60 hover:text-white border border-white/10 hover:border-[#00ffff] rounded transition-all"
                >
                  [ COLLAPSE_VIEW ]
                </button>
              </div>

              <div className="h-[60vh] overflow-y-auto no-scrollbar pr-4 text-sm font-mono space-y-6">
                {activeSegment === 'Projects' && intellectData.projects.map(p => (
                  <div key={p.id} className="p-4 border border-white/5 bg-white/5 rounded-lg hover:border-[#0066ff]/50 transition-all group">
                    <h3 className="text-lg text-white font-bold group-hover:text-[#00ffff]">{p.title}</h3>
                    <p className="text-gray-400 mt-2">{p.description}</p>
                    <div className="mt-4 flex space-x-2">
                      {p.architectureFlow?.map((flow, i) => (
                         <span key={i} className="text-[10px] px-2 py-1 bg-black rounded border border-[#00ffff]/20 text-[#00ffff]">
                           {flow}
                         </span>
                      ))}
                    </div>
                  </div>
                ))}
                {activeSegment === 'Experience' && intellectData.experience.map(e => (
                  <div key={e.id} className="p-4 border border-white/5 bg-white/5 rounded-lg border-l-2 border-l-[#0066ff]">
                    <div className="flex justify-between">
                      <h3 className="text-lg text-white font-bold">{e.role}</h3>
                      <span className="text-[#00ffff] text-xs">{e.date}</span>
                    </div>
                    <p className="text-gray-400 mt-1">{e.company}</p>
                    <p className="text-gray-300 mt-3 p-2 bg-black/40 rounded text-xs border border-white/5">{e.focus}</p>
                  </div>
                ))}
                {activeSegment === 'Skills' && (
                  <div className="grid grid-cols-3 gap-4">
                     {Object.entries(intellectData.skills).map(([category, skills]) => (
                        <div key={category} className="p-4 border border-white/10 rounded-lg bg-black/50">
                           <h4 className="text-[#00ffff] uppercase tracking-widest text-xs mb-3">{category}</h4>
                           <div className="flex flex-wrap gap-2">
                             {skills.map(s => (
                               <span key={s} className="px-2 py-1 text-[10px] border border-white/20 rounded text-gray-300 hover:border-[#00ffff] hover:text-[#00ffff] transition-colors cursor-default">
                                 {s}
                               </span>
                             ))}
                           </div>
                        </div>
                     ))}
                  </div>
                )}
                {activeSegment === 'Research' && (
                   <div className="flex h-full items-center justify-center text-gray-500 italic">
                     Querying distributed research nodes... Data currently compiling.
                   </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
