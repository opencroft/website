import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-accent/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-accent hover:bg-accent-bright text-white shadow-lg shadow-accent/25':
            variant === 'primary',
          'border border-border hover:border-border-bright bg-bg-card hover:bg-bg-card-hover text-text-primary':
            variant === 'secondary',
          'text-text-secondary hover:text-text-primary hover:bg-bg-card/50':
            variant === 'ghost',
        },
        {
          'px-3.5 py-2 text-sm': size === 'sm',
          'px-5 py-2.5 text-sm': size === 'md',
          'px-7 py-3 text-base': size === 'lg',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
