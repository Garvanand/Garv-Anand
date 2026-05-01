'use client';

import { cn } from '@/lib/utils';

interface AIThinkingDotsProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap = {
  sm: 'w-1 h-1',
  md: 'w-1.5 h-1.5',
  lg: 'w-2 h-2',
};

export function AIThinkingDots({
  className,
  color = '#00D4FF',
  size = 'md',
  label,
}: AIThinkingDotsProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-3', className)}
      role="status"
      aria-label={label ?? 'AI is thinking'}
    >
      {label && (
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8B8BA7]">
          {label}
        </span>
      )}
      <span className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn('rounded-full inline-block', sizeMap[size])}
            style={{
              backgroundColor: color,
              boxShadow: `0 0 6px ${color}`,
              animation: `ai-dot-pulse 1.4s ease-in-out ${i * 0.16}s infinite`,
            }}
          />
        ))}
      </span>

      <style jsx>{`
        @keyframes ai-dot-pulse {
          0%, 80%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
      `}</style>
    </span>
  );
}
