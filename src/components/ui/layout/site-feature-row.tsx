import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from 'cn'
import { Reveal } from '../motion/reveal'

export interface SiteFeatureRowProps {
  title: string
  body: ReactNode
  /** Up to three short facts, listed under the body. */
  facts?: string[]
  /** The screenshot, pair of screenshots or carousel that proves the row. */
  media: ReactNode
  /** Media on the left from lg, so neighbouring rows alternate. */
  reverse?: boolean
  /** Text above and media across the full width, for media that needs the room. */
  wide?: boolean
  className?: string
}

export function SiteFeatureRow({
  title,
  body,
  facts = [],
  media,
  reverse = false,
  wide = false,
  className,
}: SiteFeatureRowProps) {
  return (
    <div className={cn('grid items-center gap-8', !wide && 'lg:grid-cols-12 lg:gap-12', className)}>
      <Reveal className={cn('min-w-0', wide ? 'max-w-3xl' : 'lg:col-span-5', !wide && reverse && 'lg:order-2')}>
        <h3 className='text-2xl font-bold tracking-tight text-balance sm:text-3xl'>{title}</h3>
        <div className='mt-4 text-base leading-relaxed text-pretty text-muted-foreground'>{body}</div>
        {facts.length > 0 && (
          <ul className='mt-6 space-y-3'>
            {facts.map((fact) => (
              <li key={fact} className='flex gap-3 text-sm leading-relaxed'>
                <Check aria-hidden='true' className='mt-0.5 size-4 shrink-0 text-blue-400' />
                <span className='min-w-0'>{fact}</span>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
      <Reveal delay={100} className={cn('min-w-0', !wide && 'lg:col-span-7', !wide && reverse && 'lg:order-1')}>
        {media}
      </Reveal>
    </div>
  )
}
