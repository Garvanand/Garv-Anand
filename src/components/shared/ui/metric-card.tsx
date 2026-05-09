'use client';

import { cn } from '@/lib/utils';
import { SparklineChart } from './sparkline-chart';

interface MetricCardProps {
  value: string;
  label: string;
  context?: string;
  sparklineData?: number[];
  sparklineColor?: string;
  className?: string;
}

export function MetricCard({
  value,
  label,
  context,
  sparklineData,
  sparklineColor = '#00D4FF',
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg sm:rounded-xl p-3 sm:p-5 overflow-hidden',
        'bg-[#12121C] border border-white/[0.06]',
        'transition-all duration-300 group',
        'hover:border-[#00D4FF]/20 hover:shadow-[0_0_30px_rgba(0,212,255,0.04)]',
        className
      )}
    >
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-8 sm:w-12 h-8 sm:h-12 bg-[#00D4FF]/[0.03] rounded-bl-full" />

      <div className="flex items-end justify-between gap-2 sm:gap-4">
        <div className="min-w-0">
          <div className="font-display text-xl sm:text-3xl font-bold text-[#F0F0FF] leading-none mb-1 sm:mb-1.5 truncate">
            {value}
          </div>
          <div className="font-mono text-[8px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-[#8B8BA7]">
            {label}
          </div>
          {context && (
            <div className="font-mono text-[8px] sm:text-[10px] text-[#55556A] mt-0.5 hidden sm:block">{context}</div>
          )}
        </div>

        {sparklineData && sparklineData.length > 0 && (
          <div className="w-14 sm:w-20 h-8 sm:h-10 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity hidden sm:block">
            <SparklineChart data={sparklineData} color={sparklineColor} />
          </div>
        )}
      </div>
    </div>
  );
}
