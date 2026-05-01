'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowButton } from '@/components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

type Tab = 'sentiment' | 'prompt' | 'compare';

export function LiveInferenceLab() {
  const [activeTab, setActiveTab] = useState<Tab>('sentiment');

  return (
    <div className="w-full glass-card rounded-2xl overflow-hidden border border-white/10">
      <div className="border-b border-white/10 bg-black/40 px-6 py-4 flex flex-wrap gap-6 items-center">
        <h3 className="font-display font-bold text-white text-lg mr-4">Live Inference Lab</h3>
        
        <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
          <TabButton active={activeTab === 'sentiment'} onClick={() => setActiveTab('sentiment')}>
            Sentiment
          </TabButton>
          <TabButton active={activeTab === 'prompt'} onClick={() => setActiveTab('prompt')}>
            Prompt Eng
          </TabButton>
          <TabButton active={activeTab === 'compare'} onClick={() => setActiveTab('compare')}>
            Benchmarks
          </TabButton>
        </div>
      </div>

      <div className="p-6 md:p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'sentiment' && <SentimentTab key="sentiment" />}
          {activeTab === 'prompt' && <PromptTab key="prompt" />}
          {activeTab === 'compare' && <CompareTab key="compare" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-md font-mono text-[10px] tracking-wider uppercase transition-all duration-200 ${
        active ? 'bg-[#00D4FF]/20 text-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.2)]' : 'text-[#8B8BA7] hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
    </button>
  );
}

// --- TAB 1: Sentiment ---
function SentimentTab() {
  const [text, setText] = useState('The UI is incredibly intuitive, but the latency spikes occasionally ruin the flow.');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ sentiment: string, confidence: number, reasoning: string, latencyMs: number } | null>(null);
  const [error, setError] = useState('');

  const analyze = async () => {
    if (!text) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/demo/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-4">
        <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7]">Input Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors resize-none"
          placeholder="Enter text to analyze..."
        />
        <GlowButton onClick={analyze} disabled={loading} className={loading ? 'opacity-50 pointer-events-none' : ''}>
          {loading ? 'Analyzing...' : 'Run Inference'}
        </GlowButton>
      </div>

      <div className="flex-1 bg-black/40 border border-white/10 rounded-lg p-6 flex flex-col justify-center min-h-[200px]">
        {error ? (
          <div className="text-red-400 font-mono text-sm">{error}</div>
        ) : result ? (
          <div className="space-y-6">
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7] mb-2">Prediction</div>
              <div className={`font-display text-4xl font-bold ${result.sentiment === 'POSITIVE' ? 'text-[#00FF87]' : result.sentiment === 'NEGATIVE' ? 'text-red-400' : 'text-yellow-400'}`}>
                {result.sentiment}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between font-mono text-[10px] uppercase mb-1.5 text-[#8B8BA7]">
                <span>Confidence</span>
                <span className="text-white">{(result.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${result.confidence * 100}%` }} 
                  className="h-full bg-[#00D4FF]"
                />
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7] mb-2">Reasoning</div>
              <p className="text-sm text-[#A0A0B8] leading-relaxed">{result.reasoning}</p>
            </div>

            <div className="pt-4 border-t border-white/5 font-mono text-[10px] tracking-wider text-[#55556A] flex justify-between">
              <span>Model: openai/gpt-oss-120b</span>
              <span>Latency: {result.latencyMs}ms</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-[#55556A] font-mono text-sm">
            Waiting for input...
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- TAB 2: Prompt Eng ---
function PromptTab() {
  const [sysPrompt, setSysPrompt] = useState('You are a technical AI assistant. Explain concepts using only analogies to cooking.');
  const [prompt, setPrompt] = useState('How does a Transformer model work?');
  const [temperature, setTemperature] = useState(0.7);
  
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt) return;
    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('/api/demo/completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt: sysPrompt, prompt, temperature })
      });
      
      if (!res.ok) throw new Error(await res.text());
      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setOutput(fullText);
      }
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const estTokens = Math.round((sysPrompt.length + prompt.length + output.length) / 4);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-5">
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7] mb-2 block">System Prompt</label>
          <textarea
            value={sysPrompt}
            onChange={(e) => setSysPrompt(e.target.value)}
            className="w-full h-20 bg-black/40 border border-white/10 rounded-lg p-3 text-white font-mono text-xs focus:outline-none focus:border-[#7C3AED]/50 resize-none"
          />
        </div>
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7] mb-2 block">User Message</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-16 bg-black/40 border border-white/10 rounded-lg p-3 text-white font-mono text-xs focus:outline-none focus:border-[#00D4FF]/50 resize-none"
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7]">Temperature</label>
            <span className="font-mono text-[10px] text-white">{temperature.toFixed(1)}</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.1" 
            value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-[#00D4FF]"
          />
        </div>
        <GlowButton onClick={generate} disabled={loading} variant="secondary" className={loading ? 'opacity-50 pointer-events-none' : ''}>
          {loading ? 'Streaming...' : 'Generate Stream'}
        </GlowButton>
      </div>

      <div className="flex-1 bg-black/40 border border-white/10 rounded-lg p-5 flex flex-col min-h-[300px]">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7] mb-3 flex justify-between items-center border-b border-white/5 pb-2">
          <span>Output</span>
          {output && <span className="text-[#55556A]">~{estTokens} tokens</span>}
        </div>
        <div className="flex-1 overflow-y-auto text-sm text-[#F0F0FF] leading-relaxed whitespace-pre-wrap font-mono">
          {output || <span className="text-[#55556A]">Awaiting generation...</span>}
          {loading && <span className="inline-block w-2 h-4 bg-[#00D4FF] animate-pulse ml-1 align-middle" />}
        </div>
      </div>
    </motion.div>
  );
}

// --- TAB 3: Compare ---
const benchmarkData = [
  { name: "Parkinson's (Ours)", accuracy: 97.71, isOurs: true },
  { name: "BioBERT Baseline", accuracy: 94.20, isOurs: false },
  { name: "SER Fusion (Ours)", accuracy: 89.50, isOurs: true },
  { name: "Wav2Vec Baseline", accuracy: 86.10, isOurs: false },
];

function CompareTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-6">
      <div className="max-w-2xl">
        <h4 className="font-display text-xl font-bold text-white mb-2">Empirical Baselines</h4>
        <p className="text-sm text-[#8B8BA7] leading-relaxed">
          I don't just build wrappers. My deep learning implementations consistently outperform standard industry baselines on benchmark datasets.
        </p>
      </div>

      <div className="h-[280px] w-full mt-4 bg-black/20 p-4 rounded-xl border border-white/5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={benchmarkData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis type="number" domain={[80, 100]} stroke="#55556A" fontSize={10} tickFormatter={(v) => `${v}%`} />
            <YAxis dataKey="name" type="category" width={120} stroke="#8B8BA7" fontSize={11} />
            <RechartsTooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ backgroundColor: '#12121C', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '8px' }}
              itemStyle={{ color: '#00D4FF', fontWeight: 'bold' }}
              formatter={(val: number) => [`${val}%`, 'Accuracy']}
            />
            <Bar dataKey="accuracy" barSize={24} radius={[0, 4, 4, 0]}>
              {benchmarkData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isOurs ? '#00D4FF' : '#55556A'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
