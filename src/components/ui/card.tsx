import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: boolean;
}

export function Card({ glow, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-bg-card p-6 transition-all duration-300',
        'hover:border-border-bright hover:bg-bg-card-hover',
        glow && 'glow-border',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
