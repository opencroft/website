import type { HTMLAttributes } from 'react'
import { cn } from 'cn'

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  /** A small accent dot before the text, for a live or "new" signal. */
  dot?: boolean
}

export function Pill({ dot = false, className, children, ...props }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200',
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden='true' className='size-1.5 shrink-0 rounded-full bg-blue-400' />}
      <span className='truncate'>{children}</span>
    </span>
  )
}
