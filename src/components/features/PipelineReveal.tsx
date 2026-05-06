'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import intellectData from '@/data/intellect.json';

export function PipelineReveal() {
  const [activeProject, setActiveProject] = useState(intellectData.projects[0]);

  return (
    <div className="w-full text-white font-mono">
      {/* Selector */}
      <div className="flex space-x-6 mb-12 border-b border-white/10 pb-4">
        {intellectData.projects.map((proj) => (
          <button
            key={proj.id}
            onClick={() => setActiveProject(proj)}
            className={`text-xs tracking-widest uppercase transition-colors ${
              activeProject.id === proj.id ? 'text-[#00ffff] border-b border-[#00ffff] pb-1' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {proj.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Detail Panel */}
        <div className="w-full md:w-1/3">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold tracking-wider mb-4">{activeProject.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {activeProject.description}
            </p>
            <div className="glass-hud p-4 rounded-lg inline-block">
              <span className="text-[10px] text-cyan-500 uppercase block mb-1">Key Metric</span>
              <span className="text-sm font-bold text-[#b100ff]">{activeProject.metrics?.[0]}</span>
            </div>
          </motion.div>
        </div>

        {/* Pipeline Visualizer */}
        <div className="w-full md:w-2/3 mt-10 md:mt-0 overflow-x-auto no-scrollbar pb-10">
          <div className="flex items-center min-w-max">
            {activeProject.architectureFlow?.map((step, i) => (
              <div key={`${activeProject.id}-${step}`} className="flex items-center">
                
                {/* Node */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, borderColor: 'rgba(255,255,255,0.1)' }}
                  whileInView={{ opacity: 1, scale: 1, borderColor: '#00ffff' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  className="relative glass-hud px-6 py-3 rounded text-cyan-50 text-xs shadow-lg whitespace-nowrap z-10"
                >
                  <span className="absolute -top-3 left-4 text-[8px] text-cyan-600 bg-[#020617] px-1">STEP 0{i+1}</span>
                  {step}
                </motion.div>

                {/* Connecting Line */}
                {i !== (activeProject.architectureFlow?.length ?? 0) - 1 && (
                  <div className="relative w-12 md:w-20 h-[1px] bg-white/10 mx-2">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i * 0.2) + 0.3, duration: 0.4 }}
                      className="absolute top-0 left-0 w-full h-full bg-[#00ffff] origin-left shadow-[0_0_10px_#00ffff]"
                    />
                    {/* Flow Packet */}
                    <motion.div
                      initial={{ left: 0, opacity: 0 }}
                      animate={{ left: '100%', opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                      className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
