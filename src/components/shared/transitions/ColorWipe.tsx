'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const WIPE_COLORS = [
  '#FFFFFF', // White
  '#8B8BA7', // Grey
  '#12121C', // Darker
  '#050508'  // Background
];

export default function ColorWipe({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    setIsWiping(true);
    const timer = setTimeout(() => setIsWiping(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isWiping && (
          <div className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden">
            {WIPE_COLORS.map((color, i) => (
              <motion.div
                key={`wipe-${i}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.1, 
                  ease: [0.76, 0, 0.24, 1] 
                }}
                style={{ 
                  originY: 0,
                  backgroundColor: color,
                  zIndex: 1000 + i
                }}
                className="absolute inset-0"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {children}
      </motion.div>
    </>
  );
}
