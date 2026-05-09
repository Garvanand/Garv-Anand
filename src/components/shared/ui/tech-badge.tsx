'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TechBadgeProps {
  label: string;
  icon?: ReactNode;
  className?: string;
  color?: string; // optional hex for the glow
}

export function TechBadge({ label, icon, className, color = '#00D4FF' }: TechBadgeProps) {
  const glowRgb = hexToRgb(color);

  return (
    <span
      className={cn(
        'group inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-mono tracking-wider',
        'border border-white/[0.06] bg-white/[0.03] text-[#8B8BA7]',
        'transition-all duration-200 cursor-default select-none',
        'hover:text-[#F0F0FF] hover:border-white/20',
        className
      )}
      style={{
        ['--glow' as string]: glowRgb ? `rgba(${glowRgb}, 0.15)` : 'transparent',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${glowRgb ? `rgba(${glowRgb}, 0.2)` : 'transparent'}`;
        (e.currentTarget as HTMLElement).style.borderColor = glowRgb ? `rgba(${glowRgb}, 0.4)` : '';
        (e.currentTarget as HTMLElement).style.color = color;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '';
        (e.currentTarget as HTMLElement).style.borderColor = '';
        (e.currentTarget as HTMLElement).style.color = '';
      }}
    >
      {icon && (
        <span className="w-3 h-3 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
          {icon}
        </span>
      )}
      {label}
    </span>
  );
}

function hexToRgb(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null;
}
