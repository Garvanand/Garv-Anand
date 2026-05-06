'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface TerminalEntry {
  role: 'sys' | 'user';
  msg: string;
  isStreaming?: boolean;
}

export function HeroTerminal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [log, setLog] = useState<TerminalEntry[]>([
    { role: 'sys', msg: 'GARV.AI v2.0 — neural shell initialized.' },
    { role: 'sys', msg: "Commands: 'whoami'  'projects'  'skills'  'resume'  'contact'  'ask <question>'  'clear'" },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [log, isThinking]);

  const handleCommand = async (rawCmd: string, baseCmd: string, args: string[]) => {

    if (baseCmd === 'clear') {
      setLog([]);
      return;
    }

    if (baseCmd === 'whoami') {
      setLog(p => [...p, { role: 'sys', msg: '> Garv Anand\n> B.Tech CSE (AI/ML) @ VIT\n> GenAI Intern @ ROVA' }]);
      return;
    }
    if (baseCmd === 'projects') {
      setLog(p => [...p, { role: 'sys', msg: '> ElderAI (Voice-first AI for elderly)\n> Parkinson\'s Detection (93% accuracy)\n> VITAL-AI' }]);
      return;
    }
    if (baseCmd === 'skills') {
      setLog(p => [...p, { role: 'sys', msg: '> Vision: YOLOv8/v11, Table Transformer\n> NLP: LangChain, LlamaIndex, Whisper\n> ML Core: PyTorch, scikit-learn' }]);
      return;
    }
    if (baseCmd === 'contact') {
      setLog(p => [...p, { role: 'sys', msg: '> Email: garvanand03@gmail.com\n> LinkedIn: /in/garv-anand-1bb36b270\n> GitHub: Garvanand' }]);
      return;
    }
    if (baseCmd === 'resume') {
      setLog(p => [...p, { role: 'sys', msg: '> Resume available at: /resume' }]);
      return;
    }
    
    if (baseCmd === 'ask') {
      const question = args.slice(1).join(' ');
      if (!question) {
        setLog(p => [...p, { role: 'sys', msg: '> Error: Please provide a question (e.g. "ask what is ElderAI")' }]);
        return;
      }

      setIsThinking(true);
      // Create empty message for streaming
      setLog(p => [...p, { role: 'sys', msg: '', isStreaming: true }]);

      try {
        const response = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command: question }),
        });

        if (!response.ok) {
          const errText = await response.text();
          setLog(p => {
            const newLog = [...p];
            newLog[newLog.length - 1] = { role: 'sys', msg: `> Error: ${errText}` };
            return newLog;
          });
          setIsThinking(false);
          return;
        }

        if (!response.body) return;

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullMsg = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const textChunk = decoder.decode(value, { stream: true });
          fullMsg += textChunk;
          
          setLog(p => {
            const newLog = [...p];
            newLog[newLog.length - 1] = { role: 'sys', msg: fullMsg, isStreaming: true };
            return newLog;
          });
        }
        
        // Finalize streaming
        setLog(p => {
          const newLog = [...p];
          newLog[newLog.length - 1] = { role: 'sys', msg: fullMsg, isStreaming: false };
          return newLog;
        });

      } catch (err) {
        setLog(p => {
          const newLog = [...p];
          newLog[newLog.length - 1] = { role: 'sys', msg: `> Error connecting to agent` };
          return newLog;
        });
      } finally {
        setIsThinking(false);
      }
      return;
    }

    setLog(p => [...p, { role: 'sys', msg: `> Command not found: ${rawCmd}\n> Try: 'ask <question>'` }]);
  };

  const handleSubmit = () => {
    const rawCmd = input.trim();
    if (!rawCmd) return;
    
    setLog(p => [...p, { role: 'user', msg: rawCmd }]);
    setInput('');
    
    const args = rawCmd.split(' ');
    const baseCmd = args[0].toLowerCase();
    handleCommand(rawCmd, baseCmd, args);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-50 w-[420px] h-[460px] rounded-xl flex flex-col overflow-hidden terminal-scanline"
      style={{
        background: '#050508',
        border: '1px solid #00FF87',
        boxShadow: '0 0 20px rgba(0, 255, 135, 0.1)',
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .terminal-scanline::after {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
          z-index: 10;
        }
        .markdown-terminal p { margin-bottom: 0.5em; }
        .markdown-terminal code { background: rgba(0,255,135,0.1); padding: 0.1rem 0.3rem; border-radius: 2px; }
        .markdown-terminal pre { background: rgba(0,255,135,0.05); padding: 0.5rem; border-radius: 4px; overflow-x: auto; margin-bottom: 0.5em; }
        .markdown-terminal strong { color: #fff; font-weight: bold; }
        .markdown-terminal ul { padding-left: 1rem; list-style-type: square; margin-bottom: 0.5em; }
      `}} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#00FF87]/30 bg-[#00FF87]/10 relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00FF87] rounded-full animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#00FF87]">GARV.AI // SHELL</span>
        </div>
        <button
          onClick={onClose}
          className="text-[#00FF87]/60 hover:text-[#00FF87] transition-colors"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Log */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-[11px] leading-relaxed text-[#00FF87] relative z-20">
        {log.map((entry, i) => (
          <div key={i} className="flex gap-2">
            <span className="shrink-0 mt-[1px] opacity-50">{entry.role === 'sys' ? 'sys>' : 'you>'}</span>
            <div className={entry.role === 'user' ? 'text-white' : ''}>
              {entry.role === 'sys' ? (
                <div className="markdown-terminal whitespace-pre-wrap">
                  <ReactMarkdown>{entry.msg}</ReactMarkdown>
                  {entry.isStreaming && <span className="inline-block w-1.5 h-3 bg-[#00FF87] animate-pulse ml-1 align-middle" />}
                </div>
              ) : (
                entry.msg
              )}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex gap-2 text-[#00FF87]/70">
            <span className="shrink-0 mt-[1px] opacity-50">sys></span>
            <span className="animate-pulse">processing...</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#00FF87]/30 bg-[#00FF87]/5 flex items-center gap-2 relative z-20">
        <span className="text-[#00FF87] font-mono text-xs animate-pulse">█</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          disabled={isThinking}
          placeholder="type command..."
          className="flex-1 bg-transparent outline-none font-mono text-xs text-[#00FF87] placeholder:text-[#00FF87]/30"
          spellCheck={false}
        />
      </div>
    </motion.div>
  );
}
