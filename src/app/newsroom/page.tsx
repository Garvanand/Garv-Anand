'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnchorBrief, MediumArticle } from '@/types/newsroom';

export default function NewsroomPage() {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [brief, setBrief] = useState<AnchorBrief | null>(null);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingBrief, setLoadingBrief] = useState(true);
  const [error, setError] = useState('');
  const [time, setTime] = useState('');

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    const timer = setInterval(() => {
      setTime(new Date().toUTCString().split(' ')[4]);
    }, 1000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const fetchNews = async (forceRefresh = false) => {
    setLoadingArticles(true);
    setLoadingBrief(true);
    setError('');

    try {
      const url = forceRefresh ? `/api/medium?t=${Date.now()}` : '/api/medium';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch articles');
      const data: MediumArticle[] = await res.json();
      setArticles(data);
      setLoadingArticles(false);

      if (data.length > 0) {
        if (!forceRefresh) {
            localStorage.setItem('lastVisitedNewsroom', data[0].pubDate);
            window.dispatchEvent(new Event('newsroom-visited'));
        }

        const briefRes = await fetch('/api/newsroom/anchor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ articles: data }),
        });
        
        if (briefRes.ok) {
          const briefData: AnchorBrief = await briefRes.json();
          setBrief(briefData);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Broadcast offline');
    } finally {
      setLoadingArticles(false);
      setLoadingBrief(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const featuredArticle = articles[0];
  const standardArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-[#050508] text-[#F0F0FF] pb-24 selection:bg-[#00D4FF] selection:text-black">

      {/* GLOBAL BREAKING HEADER */}
      <div 
        className={`fixed left-0 right-0 z-50 flex h-10 sm:h-12 bg-black border-y border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'top-[56px] sm:top-[64px]' : 'top-[70px] sm:top-[110px]'
        }`}
      >
        <div className="bg-[#DC2626] px-6 flex items-center shrink-0 border-r-4 border-white">
          <span className="font-mono text-xs font-black tracking-tighter text-white uppercase italic animate-pulse">Breaking</span>
        </div>
        
        <div className="flex-1 overflow-hidden flex items-center">
          <div className="ticker-content flex whitespace-nowrap items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 px-8 items-center">
                {articles.map((a, j) => (
                  <a key={`${i}-${j}`} href={a.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <span className="w-1.5 h-1.5 bg-white rounded-full group-hover:scale-150 transition-transform" />
                    <span className="font-display text-sm font-black text-white group-hover:text-[#00D4FF] transition-colors">{a.title.toUpperCase()}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center px-6 bg-black border-l border-white/10 z-20 font-mono text-[10px] text-[#00D4FF] tracking-[0.3em] uppercase">
          Intel Dispatch // {new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .ticker-content { animation: ticker 50s linear infinite; }
        .ticker-content:hover { animation-play-state: paused; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .bulletin-ticker { animation: bulletin 30s linear infinite; }
        @keyframes bulletin { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}} />

      <main className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-12 pt-32 sm:pt-44">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* MAIN BROADCAST AREA */}
          <div className="lg:col-span-9 space-y-16">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 border-b-4 sm:border-b-[12px] border-white pb-6 sm:pb-10">
              <div>
                <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.8] mb-4 sm:mb-8">
                  Intel<br/>Dispatch
                </h1>
                <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 sm:gap-y-4 font-mono text-[10px] sm:text-xs font-black tracking-[0.2em] text-white uppercase bg-white/5 p-3 sm:p-4 border-l-4 border-[#00D4FF]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00D4FF] opacity-50">AUTHOR:</span>
                    <span>Garv Anand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00D4FF] opacity-50">ORIGIN:</span>
                    <span>VIT / AI-LAB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00D4FF] opacity-50">CLASS:</span>
                    <span className="text-[#DC2626]">Public Intel</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-2 h-8 ${i < 4 ? 'bg-[#00D4FF]' : 'bg-white/10'} border border-black`} />
                  ))}
                </div>
                <span className="font-mono text-[10px] font-black text-[#00D4FF] tracking-widest uppercase bg-white/5 px-2 py-0.5">INTEL STRENGTH: OPTIMAL</span>
              </div>
            </div>

            {/* AI ANCHOR DISPATCH */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
              <div className="sm:col-span-1 bg-white p-4 sm:p-6 flex flex-row sm:flex-col items-center sm:justify-center gap-4 sm:gap-0 sm:text-center">
                <div className="w-16 h-16 rounded-full border-4 border-black mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-black animate-pulse" />
                </div>
                <span className="font-mono text-[10px] font-black text-black uppercase tracking-widest">Lead Anchor<br/>GPT-OSS-120B</span>
              </div>
              
              <div className="sm:col-span-3 bg-white/[0.03] p-6 sm:p-10 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] font-black text-[#DC2626] opacity-30 group-hover:opacity-100 transition-opacity uppercase tracking-[0.5em]">Classified</div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-[2px] w-12 bg-[#00D4FF]" />
                    <span className="font-mono text-[10px] font-black text-[#00D4FF] uppercase tracking-widest italic">Live Analysis Dispatch</span>
                  </div>
                  {loadingBrief ? (
                    <div className="space-y-4">
                      <div className="h-6 bg-white/5 w-full animate-pulse" />
                      <div className="h-6 bg-white/5 w-5/6 animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <p className="font-display text-xl sm:text-3xl font-black text-white leading-tight uppercase tracking-tight">
                        {brief?.briefing || "SIGNAL RE-ACQUISITION IN PROGRESS. BROADCAST INTERFERENCE DETECTED."}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {brief?.topics.map(t => (
                          <span key={t} className="px-3 py-1 bg-white text-black font-mono text-[10px] font-black uppercase tracking-tighter italic">{t}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* FEATURED STORY */}
            {featuredArticle && (
              <a href={featuredArticle.link} target="_blank" rel="noopener noreferrer" className="group block border-4 border-white overflow-hidden bg-white/[0.02] hover:border-[#00D4FF] transition-colors">
                <div className="relative aspect-[16/7] bg-black overflow-hidden border-b-4 border-white">
                  {featuredArticle.thumbnail ? (
                    <Image src={featuredArticle.thumbnail} alt={featuredArticle.title} fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full bg-[#12121C]" />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                
                <div className="p-5 sm:p-8 md:p-12 space-y-4 sm:space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <span className="inline-block bg-[#00D4FF] text-black font-mono text-[10px] font-black px-3 py-1 uppercase italic tracking-tighter w-fit">Urgent Dispatch</span>
                    <div className="flex items-center gap-4 font-mono text-[10px] text-[#8B8BA7] uppercase tracking-widest">
                      <span>{new Date(featuredArticle.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-[#00D4FF]">•</span>
                      <span>{featuredArticle.readingTime} MIN READ</span>
                    </div>
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl md:text-7xl font-black text-white uppercase leading-[0.85] group-hover:text-[#00D4FF] transition-colors">
                    {featuredArticle.title}
                  </h2>

                  {brief?.signals?.find(s => s.url === featuredArticle.link)?.signal && (
                    <div className="bg-white p-5 sm:p-8 border-l-4 sm:border-l-[12px] border-[#00D4FF]">
                      <p className="font-display text-lg sm:text-2xl font-black text-black uppercase leading-tight italic">
                        "{brief.signals.find(s => s.url === featuredArticle.link)?.signal}"
                      </p>
                      <div className="mt-6 flex justify-between items-end border-t border-black/10 pt-4">
                        <span className="font-mono text-[9px] font-black text-black/40 uppercase tracking-widest">Source: Medium Archive</span>
                        <span className="font-mono text-xs font-black text-black uppercase underline decoration-4">Read Full Report →</span>
                      </div>
                    </div>
                  )}
                </div>
              </a>
            )}
          </div>

          {/* SIDEBAR: INTEL FEED */}
          <div className="lg:col-span-3 space-y-12">
            <div className="border-t-4 border-white pt-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-mono text-xs font-black tracking-[0.3em] uppercase text-white">Archives</h3>
                <div className="w-2 h-2 bg-[#00FF87] rounded-full animate-pulse" />
              </div>
              <div className="space-y-12">
                {loadingArticles ? (
                  [...Array(3)].map((_, i) => <div key={i} className="h-40 bg-white/5 animate-pulse" />)
                ) : (
                  standardArticles.map(article => (
                    <a key={article.link} href={article.link} target="_blank" rel="noopener noreferrer" className="group block space-y-4">
                      <div className="aspect-video relative overflow-hidden bg-black border border-white/10 group-hover:border-[#00D4FF] transition-colors">
                        {article.thumbnail && <Image src={article.thumbnail} alt={article.title} fill className="object-cover opacity-50 group-hover:opacity-100 transition-all" />}
                      </div>
                      <div className="space-y-2">
                        <div className="flex gap-3 font-mono text-[9px] font-bold text-[#8B8BA7] uppercase tracking-widest">
                          <span>{new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span>{article.readingTime}M READ</span>
                        </div>
                        <h4 className="font-display text-lg font-black text-white uppercase leading-tight group-hover:text-[#00D4FF] transition-colors line-clamp-3">
                          {article.title}
                        </h4>
                        <div className="h-[1px] w-0 group-hover:w-full bg-[#00D4FF] transition-all duration-500" />
                      </div>
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER MARKET BULLETIN */}
      <div className="fixed bottom-0 left-0 right-0 h-8 sm:h-10 bg-black border-t-2 border-white z-[60] hidden sm:flex items-stretch">
        <div className="bg-white px-4 flex items-center shrink-0">
          <span className="font-mono text-[10px] font-black text-black uppercase tracking-widest italic">Trend Monitor</span>
        </div>
        <div className="flex-1 overflow-hidden flex items-center bg-black/50">
          <div className="bulletin-ticker flex whitespace-nowrap items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 px-6 items-center font-mono text-[10px] font-black uppercase tracking-widest">
                <span className="text-[#00D4FF]">LLAMA-3.3 // BULLISH</span>
                <span className="text-white opacity-40">::</span>
                <span className="text-[#DC2626]"> Bespoke Wrappers // BEARISH</span>
                <span className="text-white opacity-40">::</span>
                <span className="text-[#00D4FF]">Context Engineering // RISING</span>
                <span className="text-white opacity-40">::</span>
                <span className="text-[#00FF87]">Agentic Workflows // DOMINANT</span>
                <span className="text-white opacity-40">::</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center px-6 border-l border-white/10 font-mono text-[9px] text-[#8B8BA7] uppercase tracking-widest">
          Node: Garv-Anand-Terminal-2.0
        </div>
      </div>
    </div>
  );
}
