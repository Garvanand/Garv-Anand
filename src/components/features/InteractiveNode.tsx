'use client';

import { motion } from 'framer-motion';

export function InteractiveNode({
  title,
  category,
  index,
  onClick
}: {
  title: string;
  category: string;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      whileHover={{ scale: 1.15, boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.4)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: index * 0.1 
      }}
      onClick={onClick}
      className="absolute glass-panel rounded-full px-6 py-3 cursor-pointer text-white font-mono backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,102,255,0.2)] bg-black/40 hover:bg-black/60 z-20"
      style={{
        // Distribute them evenly in a circle around center
        left: `calc(50% + ${Math.cos((index * Math.PI * 2) / 4) * 250}px - 70px)`,
        top: `calc(50% + ${Math.sin((index * Math.PI * 2) / 4) * 250}px - 30px)`,
      }}
    >
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-[#00ffff] mb-1">{category}</span>
        <h3 className="text-sm font-semibold tracking-wide whitespace-nowrap">{title}</h3>
      </div>
    </motion.div>
  );
}
