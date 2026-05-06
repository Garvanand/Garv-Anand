'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AdvancedAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [log, setLog] = useState<{role: 'sys' | 'user', msg: string}[]>([
    {role: 'sys', msg: 'A.G.E.N.T. v2.0 initialized. Connected to Garv.AI neural network.'},
    {role: 'sys', msg: "Type 'help', 'explain projects', 'show skills', or 'why hire'."}
  ]);
  
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log, open]);

  const handleSubmit = () => {
    if(!input.trim()) return;
    const cmd = input.trim().toLowerCase();
    
    setLog(prev => [...prev, {role: 'user', msg: cmd}]);
    setInput('');
    
    setTimeout(() => {
      let reply = "Processing context...";
      if(cmd.includes('explain')) reply = "Retrieving ElderAI schema: Extends beyond standard RAG. Multi-modal memory layer integrated successfully.";
      else if(cmd.includes('skills')) reply = "Primary tensors: TensorFlow, PyTorch. Secondary execution nodes: Next.js RSC, React, Flask, Docker.";
      else if(cmd.includes('hire')) reply = "Direct Contact Protocol active. Routing to: garvanand03@gmail.com. High expected ROI on systems architecture.";
      else if(cmd.includes('help')) reply = "Available commands: 'explain projects', 'show skills', 'why hire', 'clear'";
      else if(cmd.includes('clear')) { setLog([]); return; }
      else reply = `Command not recognized: "${cmd}". Parsing unstructured intent failed.`;
      
      setLog(prev => [...prev, {role: 'sys', msg: reply}]);
    }, 400);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        onClick={() => setOpen(true)}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full glass-hud border border-[#00ffff]/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:scale-110 transition-transform ${open ? 'hidden' : 'flex'}`}
      >
        <span className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse absolute top-3 right-3" />
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00ffff" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </motion.button>

      {/* Expanded Terminal Panel */}
      <AnimatePresence>
        {open && (
           <motion.div 
             initial={{ opacity: 0, y: 50, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 50, scale: 0.9 }}
             className="fixed bottom-6 right-6 w-[400px] h-[500px] z-50 glass-hud rounded-xl border border-[#00ffff]/30 flex flex-col overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.15)]"
           >
              {/* Header */}
              <div className="flex justify-between items-center bg-black/40 px-4 py-3 border-b border-white/5">
                <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse" />
                   <span className="text-[10px] font-mono text-[#00ffff] tracking-widest">AGENT // SHELL</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Log Window */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar font-mono text-xs">
                 {log.map((entry, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={entry.role === 'sys' ? 'text-cyan-400' : 'text-gray-300'}
                    >
                      <span className="opacity-50 mr-2">{entry.role === 'sys' ? 'SYS>' : 'USR>'}</span>
                      {/* Typewriter simulation for sys */}
                      {entry.role === 'sys' ? (
                        <Typewriter text={entry.msg} />
                      ) : (
                        entry.msg
                      )}
                    </motion.div>
                 ))}
                 <div ref={endRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/5 bg-black/20 flex items-center relative">
                 <span className="text-gray-500 font-mono text-xs mr-2">ACT&gt;</span>
                 <input 
                   autoFocus
                   value={input}
                   onChange={e => setInput(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                   placeholder="Enter command..."
                   className="w-full bg-transparent outline-none font-mono text-xs text-white placeholder:text-gray-600 focus:placeholder:opacity-0"
                 />
                 {input.trim() && (
                    <button onClick={handleSubmit} className="absolute right-4 text-[#00ffff]">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                 )}
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}
