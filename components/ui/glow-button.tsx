'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  href?: string;
}

export function GlowButton({
  children,
  variant = 'primary',
  className,
  href,
  ...props
}: GlowButtonProps) {
  const base = cn(
    'relative inline-flex items-center justify-center gap-2',
    'px-6 py-2.5 rounded-lg font-mono text-sm tracking-wider',
    'transition-all duration-300 overflow-hidden',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]/50',
    // Particle burst pseudo-elements handled via group
    'group',
    {
      // Primary — cyan border glow
      'border border-[#00D4FF]/40 text-[#00D4FF] bg-[#00D4FF]/[0.04] hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/70 hover:shadow-[0_0_20px_rgba(0,212,255,0.2),0_0_40px_rgba(0,212,255,0.08)] active:scale-[0.98]': variant === 'primary',
      // Secondary — violet
      'border border-[#7C3AED]/40 text-[#7C3AED] bg-[#7C3AED]/[0.04] hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]/70 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] active:scale-[0.98]': variant === 'secondary',
      // Ghost
      'border border-white/[0.06] text-[#8B8BA7] hover:text-[#F0F0FF] hover:border-white/20 active:scale-[0.98]': variant === 'ghost',
    },
    className
  );

  // Particle burst — pure CSS via ::before / ::after siblings via data attributes
  const inner = (
    <>
      {/* Shimmer sweep on hover */}
      <span
        className={cn(
          'absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out',
          'bg-gradient-to-r from-transparent via-white/[0.05] to-transparent',
          'pointer-events-none'
        )}
        aria-hidden
      />
      {/* Corner sparks — CSS only, appear on hover */}
      {variant === 'primary' && (
        <>
          <span className="absolute top-0 left-0 w-1 h-1 rounded-full bg-[#00D4FF] opacity-0 group-hover:opacity-100 group-hover:animate-ping" aria-hidden />
          <span className="absolute top-0 right-0 w-1 h-1 rounded-full bg-[#00D4FF] opacity-0 group-hover:opacity-100 group-hover:animate-ping [animation-delay:150ms]" aria-hidden />
          <span className="absolute bottom-0 left-0 w-1 h-1 rounded-full bg-[#00D4FF] opacity-0 group-hover:opacity-100 group-hover:animate-ping [animation-delay:100ms]" aria-hidden />
          <span className="absolute bottom-0 right-0 w-1 h-1 rounded-full bg-[#00D4FF] opacity-0 group-hover:opacity-100 group-hover:animate-ping [animation-delay:200ms]" aria-hidden />
        </>
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={base}>
        {inner}
      </a>
    );
  }

  return (
    <button className={base} {...props}>
      {inner}
    </button>
  );
}
