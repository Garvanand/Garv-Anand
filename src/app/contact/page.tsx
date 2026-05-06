"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { GlowButton } from "@/components/shared/ui"
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  Send, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Fingerprint, 
  Cpu, 
  Briefcase,
  Lightbulb,
  Code2,
  Globe,
  Activity
} from "lucide-react"

const SOCIAL_NODES = [
  { id: "linkedin", icon: Linkedin, label: "Network", href: "https://linkedin.com/in/garv-anand-1bb36b270", color: "#0077b5" },
  { id: "github", icon: Github, label: "Source", href: "https://github.com/Garvanand", color: "#ffffff" },
  { id: "mail", icon: Mail, label: "Direct", href: "mailto:garvanand03@gmail.com", color: "#00D4FF" },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/918054182892", color: "#25D366" },
]

const TOPIC_MENU = [
  { id: "hiring", label: "Hiring / Internship", icon: Briefcase, desc: "Recruitment protocol", color: "#00FF87" },
  { id: "collab", label: "Collaboration", icon: Code2, desc: "Joint project build", color: "#00D4FF" },
  { id: "research", label: "Research Query", icon: Lightbulb, desc: "AI/ML investigation", color: "#7C3AED" },
  { id: "general", label: "Other / General", icon: Globe, desc: "Misc signal", color: "#FF3B3F" },
]

export default function ContactPage() {
  const [stage, setStage] = useState<"init" | "profile" | "objective" | "payload" | "transmitting" | "success" | any>("init")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    resourceLink: "",
  })
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 })

  const rotateX = useTransform(smoothY, [0, 1000], [3, -3])
  const rotateY = useTransform(smoothX, [0, 1500], [-3, 3])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const handleTransmit = async () => {
    setStage("transmitting")
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `[${formData.topic.toUpperCase()}] ${formData.name}`,
          message: `Topic: ${formData.topic}\nResource: ${formData.resourceLink}\n\n${formData.message}`,
        }),
      })
      if (!response.ok) throw new Error('Failed')
      await new Promise(r => setTimeout(r, 2000))
      setStage("success")
    } catch (e) {
      setStage("payload")
      alert("Transmission failed.")
    }
  }

  const getStageColor = () => {
    switch(stage) {
      case 'profile': return '#00D4FF';
      case 'objective': return '#7C3AED';
      case 'payload': return '#00FF87';
      default: return '#00D4FF';
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-[#050508] text-white flex flex-col justify-center px-6 md:px-12 py-12 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          className="absolute w-[1200px] h-[1200px] opacity-15 blur-[150px] rounded-full"
          animate={{ backgroundColor: getStageColor() }}
          style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        />
        <motion.div 
          className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"
          style={{ x: useTransform(smoothX, [0, 1500], [5, -5]), y: useTransform(smoothY, [0, 1000], [5, -5]) }}
        />
      </div>

      <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-8 lg:gap-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="px-2 py-0.5 bg-[#00FF87] text-black font-mono text-[9px] font-black uppercase tracking-widest rounded-sm">Nexus v3.2</div>
              <Activity className="w-3 h-3 text-[#00D4FF] animate-pulse" />
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.8] uppercase text-white">
              Sync <span className="text-white/20">Neural.</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <motion.div style={{ rotateX, rotateY }} className="lg:col-span-6 space-y-8">
            <div className="grid grid-cols-2 gap-3">
              {SOCIAL_NODES.map((node) => (
                <a key={node.id} href={node.href} target="_blank" className="p-6 bg-white/[0.04] border border-white/10 rounded-[32px] flex flex-col items-center group transition-all hover:bg-white/[0.08]">
                  <node.icon className="w-6 h-6 text-white/80 mb-4" />
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-white/40">{node.label}</span>
                </a>
              ))}
            </div>
            <div className="p-8 bg-white/[0.04] border border-white/10 rounded-[40px] space-y-8 backdrop-blur-3xl shadow-xl">
              <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-white/50">System Lifecycle</h3>
              <div className="space-y-6">
                <div className="flex justify-between font-mono text-[10px] font-black uppercase tracking-widest">
                  <span className="opacity-40">Identity</span>
                  <span className={formData.name ? "text-[#00FF87]" : "text-white/10"}>{formData.name ? "Verified" : "Pending"}</span>
                </div>
                <div className="flex justify-between font-mono text-[10px] font-black uppercase tracking-widest">
                  <span className="opacity-40">Objective</span>
                  <span className={formData.topic ? "text-[#00FF87]" : "text-white/10"}>{formData.topic ? "Classified" : "Pending"}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ rotateX, rotateY }} className="lg:col-span-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-[48px] p-8 md:p-16 backdrop-blur-3xl relative min-h-[550px] flex flex-col shadow-2xl">
              <AnimatePresence mode="wait">
                {stage === "init" && (
                  <motion.div key="init" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
                    <Cpu className="w-12 h-12 text-[#00D4FF] animate-pulse" />
                    <h2 className="font-display text-5xl font-black uppercase italic tracking-tighter">Access Link</h2>
                    <GlowButton onClick={() => setStage("profile")} variant="primary">Initialize →</GlowButton>
                  </motion.div>
                )}
                {stage === "profile" && (
                  <motion.div key="profile" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex-1 space-y-16">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#00D4FF] text-black flex items-center justify-center font-bold text-xl">01</div>
                      <div className="font-mono text-sm font-black uppercase tracking-widest text-[#00D4FF]">Identity Protocol</div>
                    </div>
                    <div className="space-y-10">
                      <div className="space-y-3">
                        <label className="font-mono text-[10px] font-black uppercase text-white/40">Full Name</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b-2 border-white/10 py-4 font-display text-4xl focus:outline-none focus:border-[#00D4FF] text-white italic font-black uppercase tracking-tight" />
                      </div>
                      <div className="space-y-3">
                        <label className="font-mono text-[10px] font-black uppercase text-white/40">Email Address</label>
                        <input type="text" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b-2 border-white/10 py-4 font-display text-4xl focus:outline-none focus:border-[#00D4FF] text-white italic font-black uppercase tracking-tight" />
                      </div>
                    </div>
                    <button onClick={() => setStage("objective")} className="font-display text-3xl font-black uppercase italic text-white flex items-center gap-3 hover:text-[#00D4FF] transition-all">Next <ArrowRight className="w-6 h-6" /></button>
                  </motion.div>
                )}
                {stage === "objective" && (
                  <motion.div key="objective" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex-1 space-y-12">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#7C3AED] text-black flex items-center justify-center font-bold text-xl">02</div>
                      <div className="font-mono text-sm font-black uppercase tracking-widest text-[#7C3AED]">Objective</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {TOPIC_MENU.map((item) => (
                        <button key={item.id} onClick={() => setFormData({...formData, topic: item.id})} className={`p-8 border-2 rounded-[32px] text-left transition-all ${formData.topic === item.id ? 'bg-white text-black' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                          <div className="font-display text-xl font-black uppercase italic">{item.label}</div>
                          <div className="font-mono text-[9px] uppercase mt-1 opacity-50">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <button onClick={() => setStage("profile")} className="font-display text-xl font-black uppercase italic text-white/30 hover:text-white transition-all">Back</button>
                      <button onClick={() => setStage("payload")} className="font-display text-3xl font-black uppercase italic text-white flex items-center gap-3 hover:text-[#00D4FF] transition-all">Next <ArrowRight /></button>
                    </div>
                  </motion.div>
                )}
                {stage === "payload" && (
                  <motion.div key="payload" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex-1 space-y-10">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#00FF87] text-black flex items-center justify-center font-bold text-xl">03</div>
                      <div className="font-mono text-sm font-black uppercase tracking-widest text-[#00FF87]">Payload</div>
                    </div>
                    <textarea rows={5} placeholder="Inject data..." className="w-full bg-white/5 border-2 border-white/10 rounded-[32px] p-8 font-display text-2xl text-white italic focus:border-[#00FF87] outline-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                    <button onClick={handleTransmit} className="px-12 py-5 bg-[#00FF87] text-black font-black uppercase italic rounded-2xl shadow-xl hover:scale-105 transition-all">Transmit Signal</button>
                  </motion.div>
                )}
                {stage === "transmitting" && (
                  <motion.div key="transmitting" className="flex-1 flex flex-col items-center justify-center space-y-8">
                    <Fingerprint className="w-16 h-16 text-[#00D4FF] animate-pulse" />
                    <h3 className="font-display text-5xl font-black italic tracking-tighter">Encrypting...</h3>
                  </motion.div>
                )}
                {stage === "success" && (
                  <motion.div key="success" className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                    <ShieldCheck className="w-24 h-24 text-[#00FF87]" />
                    <h2 className="font-display text-6xl font-black italic text-[#00FF87]">Sync Locked.</h2>
                    <GlowButton href="/" variant="ghost">Disconnect</GlowButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
