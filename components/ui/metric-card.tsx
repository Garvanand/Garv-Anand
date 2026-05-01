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
        'relative rounded-xl p-5 overflow-hidden',
        'bg-[#12121C] border border-white/[0.06]',
        'transition-all duration-300 group',
        'hover:border-[#00D4FF]/20 hover:shadow-[0_0_30px_rgba(0,212,255,0.04)]',
        className
      )}
    >
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-[#00D4FF]/[0.03] rounded-bl-full" />

      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="font-display text-3xl font-bold text-[#F0F0FF] leading-none mb-1.5">
            {value}
          </div>
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#8B8BA7]">
            {label}
          </div>
          {context && (
            <div className="font-mono text-[10px] text-[#55556A] mt-0.5">{context}</div>
          )}
        </div>

        {sparklineData && sparklineData.length > 0 && (
          <div className="w-20 h-10 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
            <SparklineChart data={sparklineData} color={sparklineColor} />
          </div>
        )}
      </div>
    </div>
  );
}
