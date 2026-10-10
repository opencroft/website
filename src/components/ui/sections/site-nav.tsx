import { useId, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from 'cn'
import { GitHubMark } from '../primitives/github-mark'
import { LinkButton } from '../primitives/link-button'
import { SITE_LINKS } from '../content/site-links'
import { Wordmark } from '../wordmark'

const SECTIONS = [
  { label: 'Product', href: '#product' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Self-hosting', href: '#self-hosted' },
  { label: 'FAQ', href: '#faq' },
]

// The page's side fade, at 75% under the blur: almost black at both sides, the
// theme's navy across the middle 30%, as on the home page behind it.
const translucent = (color: string) => `color-mix(in srgb, ${color} 75%, transparent)`
const EDGE = translucent('color-mix(in srgb, #000 95%, var(--background))')
const MIDDLE = translucent('var(--background)')
const BACKGROUND = { background: `linear-gradient(to right, ${EDGE}, ${MIDDLE} 35%, ${MIDDLE} 65%, ${EDGE})` }

export interface SiteNavProps {
  /** Where Install goes: the hero's command, on the same page. */
  installHref?: string
  sourceHref?: string
  /** Start with the phone menu open. The menu only shows below md. */
  defaultOpen?: boolean
  className?: string
}

export function SiteNav({
  installHref = '#install',
  sourceHref = SITE_LINKS.repository,
  defaultOpen = false,
  className,
}: SiteNavProps) {
  const [open, setOpen] = useState(defaultOpen)
  const menuId = useId()

  return (
    <header className={cn('sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl', className)} style={BACKGROUND}>
      <nav aria-label='Main' className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6'>
        <a href='#top' aria-label='OpenCroft, back to top' className='min-w-0 text-foreground'>
          <Wordmark />
        </a>

        <ul className='hidden items-center gap-7 md:flex'>
          {SECTIONS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className='text-sm text-muted-foreground transition-colors hover:text-foreground'>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className='hidden items-center gap-2 md:flex'>
          <LinkButton href={sourceHref} variant='ghost' size='sm' target='_blank' rel='noopener noreferrer'>
            <GitHubMark />
            GitHub
          </LinkButton>
          <LinkButton href={installHref} size='sm'>
            Install
          </LinkButton>
        </div>

        <button
          type='button'
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className='-mr-2 inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden'
        >
          {open ? <X className='size-5' /> : <Menu className='size-5' />}
        </button>
      </nav>

      {open && (
        <div id={menuId} className='border-t border-border/60 md:hidden'>
          <ul className='mx-auto flex max-w-6xl flex-col px-5 py-2'>
            {SECTIONS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className='block py-3 text-base text-muted-foreground transition-colors hover:text-foreground'
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className='mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 pb-5'>
            <LinkButton href={sourceHref} variant='secondary' target='_blank' rel='noopener noreferrer'>
              <GitHubMark />
              GitHub
            </LinkButton>
            <LinkButton href={installHref} onClick={() => setOpen(false)}>
              Install
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  )
}
