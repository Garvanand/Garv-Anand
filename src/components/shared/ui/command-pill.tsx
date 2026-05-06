'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CommandPillProps {
  children: ReactNode;
  prefix?: string;  // e.g. "⌘" "⌥" "Ctrl" or a tech label like "v11"
  className?: string;
  variant?: 'default' | 'cyan' | 'violet' | 'green';
}

const variantStyles = {
  default: 'border-white/[0.10] text-[#8B8BA7] bg-white/[0.03] hover:border-white/20 hover:text-[#F0F0FF]',
  cyan:    'border-[#00D4FF]/25 text-[#00D4FF] bg-[#00D4FF]/[0.05] hover:border-[#00D4FF]/50 hover:shadow-[0_0_10px_rgba(0,212,255,0.1)]',
  violet:  'border-[#7C3AED]/25 text-[#7C3AED] bg-[#7C3AED]/[0.05] hover:border-[#7C3AED]/50 hover:shadow-[0_0_10px_rgba(124,58,237,0.1)]',
  green:   'border-[#00FF87]/25 text-[#00FF87] bg-[#00FF87]/[0.04] hover:border-[#00FF87]/50 hover:shadow-[0_0_10px_rgba(0,255,135,0.1)]',
};

export function CommandPill({
  children,
  prefix,
  className,
  variant = 'default',
}: CommandPillProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center gap-1.5',
        'px-2.5 py-1 rounded-md text-[11px] font-mono',
        'border transition-all duration-200 cursor-default select-none',
        'not-italic', // reset kbd italic
        variantStyles[variant],
        className
      )}
    >
      {prefix && (
        <>
          <span className="opacity-50 text-[10px]">{prefix}</span>
          <span className="opacity-20 text-[9px]">·</span>
        </>
      )}
      {children}
    </kbd>
  );
}
