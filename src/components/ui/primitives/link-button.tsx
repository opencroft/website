import type { AnchorHTMLAttributes } from 'react'
import { cn } from 'cn'

export type LinkButtonVariant = 'primary' | 'secondary' | 'ghost'
export type LinkButtonSize = 'sm' | 'md' | 'lg'

const VARIANT: Record<LinkButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground shadow-lg shadow-blue-600/25 hover:bg-blue-500',
  secondary: 'border border-border bg-card text-foreground hover:border-blue-400/40 hover:bg-accent',
  ghost: 'text-muted-foreground hover:bg-accent hover:text-foreground',
}

const SIZE: Record<LinkButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-3.5 text-sm',
  md: 'h-10 gap-2 px-5 text-sm',
  lg: 'h-12 gap-2 px-6 text-base',
}

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkButtonVariant
  size?: LinkButtonSize
}

export function LinkButton({ variant = 'primary', size = 'md', className, ...props }: LinkButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...props}
    />
  )
}
