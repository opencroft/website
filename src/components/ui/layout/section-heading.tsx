import type { ReactNode } from 'react'
import { cn } from 'cn'

// The brand gradient, stated once. Inline rather than a utility class so the
// component needs nothing from the site's stylesheet beyond the theme tokens.
const ACCENT_GRADIENT = 'linear-gradient(120deg, #60a5fa 0%, #a78bfa 55%, #3b82f6 100%)'

export function AccentText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn('bg-clip-text text-transparent', className)}
      style={{ backgroundImage: ACCENT_GRADIENT, WebkitBackgroundClip: 'text' }}
    >
      {children}
    </span>
  )
}

export type SectionHeadingAlign = 'center' | 'start'

const ALIGN: Record<SectionHeadingAlign, string> = {
  center: 'mx-auto items-center text-center',
  start: 'items-start text-left',
}

export interface SectionHeadingProps {
  /** The short accent line above the heading. */
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  align?: SectionHeadingAlign
  /** id for the heading, so the section can be aria-labelledby it. */
  id?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, lede, align = 'center', id, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex max-w-2xl flex-col', ALIGN[align], className)}>
      <p className='mb-3 text-xs font-semibold tracking-[0.18em] text-blue-400 uppercase sm:text-sm'>{eyebrow}</p>
      <h2 id={id} className='text-3xl font-bold tracking-tight text-balance sm:text-4xl'>
        {title}
      </h2>
      {lede && <p className='mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg'>{lede}</p>}
    </div>
  )
}
