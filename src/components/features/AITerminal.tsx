'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function AITerminal() {
  const [input, setInput] = useState('');
  const [log, setLog] = useState<{role: 'ai' | 'user', msg: string}[]>([
    {role: 'ai', msg: 'Neural interface active. Connected to GARV-ANAND intelligence core.'},
    {role: 'ai', msg: 'Awaiting query...'}
  ]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setLog(prev => [...prev, { role: 'user', msg: userMsg }]);
    setInput('');
    
    // Simulate LLM response briefly for effect
    setTimeout(() => {
      let aiResponse = "Processing query...";
      if(userMsg.toLowerCase().includes("hire")) {
         aiResponse = "Initializing contact protocol. Direct channel: garvanand03@gmail.com";
      } else if(userMsg.toLowerCase().includes("skills")) {
         aiResponse = "Accessing neural weights... Proficient in TensorFlow, WebGL, Next.js, and PyTorch.";
      } else {
         aiResponse = `Analyzing conceptual space for: "${userMsg}". Neural index retrieval in progress...`;
      }
      setLog(prev => [...prev, { role: 'ai', msg: aiResponse }]);
    }, 600);
  };

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 right-6 w-96 backdrop-blur-xl bg-black/40 border border-[#00ffff]/20 rounded-xl p-5 shadow-[0_0_30px_rgba(0,255,255,0.05)] font-mono text-[11px] z-50 pointer-events-auto"
    >
      <div className="flex items-center space-x-2 mb-3 border-b border-white/10 pb-2">
        <div className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse" />
        <span className="text-[#00ffff] uppercase tracking-widest font-semibold">Terminal AI</span>
      </div>
      
      <div className="h-44 overflow-y-auto space-y-3 mb-3 no-scrollbar flex flex-col justify-end">
        {log.map((l, i) => (
          <div key={i} className={l.role === 'ai' ? 'text-[#00ffff]' : 'text-gray-300'}>
            <span className="opacity-40">{l.role === 'ai' ? 'SYS_>' : 'USR_>'}</span> {l.msg}
          </div>
        ))}
      </div>
      
      <div className="relative">
        <span className="absolute left-0 top-[2px] opacity-40 text-gray-300">ACT_&gt;</span>
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if(e.key === 'Enter') handleSubmit();
          }}
          className="w-full bg-transparent border-none outline-none text-[#0066ff] pl-[35px] placeholder:text-[#0066ff]/40"
          placeholder="Execute command..."
        />
      </div>
    </motion.div>
  );
}
