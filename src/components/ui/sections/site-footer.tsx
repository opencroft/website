import { GitHubMark } from '../primitives/github-mark'
import { SITE_LINKS } from '../content/site-links'
import { Wordmark } from '../wordmark'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'On this page',
    links: [
      { label: 'Product', href: '#product' },
      { label: 'Use cases', href: '#use-cases' },
      { label: 'Self-hosting', href: '#self-hosted' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: SITE_LINKS.docs, external: true },
      { label: 'Source code', href: SITE_LINKS.repository, external: true },
      { label: `License (${SITE_LINKS.licenseName})`, href: SITE_LINKS.license, external: true },
    ],
  },
]

function external(link: FooterLink) {
  return link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

export function SiteFooter() {
  return (
    <footer className='border-t border-border/60'>
      <div className='mx-auto max-w-6xl px-5 py-12 sm:px-6'>
        <div className='grid gap-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]'>
          <div className='min-w-0'>
            <span className='text-foreground'>
              <Wordmark />
            </span>
            <p className='mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground'>
              Your infrastructure and your AI agents on one self-hosted canvas.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className='text-sm font-semibold'>{column.title}</h2>
              <ul className='mt-3 space-y-2'>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...external(link)}
                      className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className='mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row sm:items-center'>
          <p className='text-xs text-muted-foreground'>
            © {new Date().getFullYear()} OpenCroft. Open source under the {SITE_LINKS.licenseName} license.
          </p>
          <a
            href={SITE_LINKS.repository}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='OpenCroft on GitHub'
            className='-m-2 inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground'
          >
            <GitHubMark className='size-5' />
          </a>
        </div>
      </div>
    </footer>
  )
}
