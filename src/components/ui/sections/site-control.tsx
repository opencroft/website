import { ArchiveRestore, Bot, Scale, Server, type LucideIcon } from 'lucide-react'
import { Reveal } from '../motion/reveal'
import { ScreenshotFrame } from '../media/screenshot-frame'
import { SCREENSHOTS } from '../media/screenshots'
import { AccentText, SectionHeading } from '../layout/section-heading'
import { SITE_LINKS } from '../content/site-links'

interface Fact {
  icon: LucideIcon
  value: string
  body: string
  /** Label of the item's link to the license; only the license item has one. */
  link?: string
}

const FACTS: Fact[] = [
  {
    icon: Server,
    value: 'Self-hosted',
    body: 'One container, with a built-in database in one volume, or your own PostgreSQL.',
  },
  {
    icon: Bot,
    value: 'Your models',
    body: 'Each agent has its own provider and model: API keys, a subscription you already pay for, or an OpenAI-compatible endpoint, including one you run yourself.',
  },
  {
    icon: ArchiveRestore,
    value: 'Backups built in',
    body: 'Snapshots of settings, secrets and spaces on a schedule you set, with download and restore.',
  },
  {
    icon: Scale,
    value: SITE_LINKS.licenseName,
    body: 'The source is public: read it, run it, change it. Extensions are MIT.',
    link: 'Read the license',
  },
]

export interface SiteControlProps {
  /** Origin the screenshots are served from. Empty on the website itself. */
  assetBase?: string
  licenseHref?: string
}

/** Self-hosting: what you run, what you own, and the backups that keep it. */
export function SiteControl({ assetBase = '', licenseHref = SITE_LINKS.license }: SiteControlProps) {
  return (
    <section
      id='self-hosted'
      aria-labelledby='self-hosted-title'
      className='relative scroll-mt-16 border-y border-border/50 bg-card/30 py-20 sm:py-28'
    >
      <div className='mx-auto max-w-6xl px-5 sm:px-6'>
        <Reveal>
          <SectionHeading
            id='self-hosted-title'
            eyebrow='Self-hosted'
            title={
              <>
                Yours to run, <AccentText>yours to change</AccentText>
              </>
            }
            lede='OpenCroft runs on a machine you control, and its source is public.'
          />
        </Reveal>

        {/* A short list beside the backups shot, not a second grid of cards: the use
            cases above already are one. */}
        <div className='mt-12 grid items-center gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-12'>
          <Reveal delay={100} className='lg:col-span-5'>
            <ul className='space-y-6'>
              {FACTS.map((fact) => (
                <li key={fact.value} className='flex gap-4'>
                  <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400'>
                    <fact.icon aria-hidden='true' className='size-5' />
                  </div>
                  <div className='min-w-0'>
                    <p className='font-semibold'>{fact.value}</p>
                    <p className='mt-1 text-sm leading-relaxed text-pretty text-muted-foreground'>{fact.body}</p>
                    {fact.link && (
                      <a
                        href={licenseHref}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='mt-2 inline-block text-sm font-medium text-blue-400 underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
                      >
                        {fact.link}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className='min-w-0 lg:col-span-7'>
            <figure>
              <ScreenshotFrame
                shot={SCREENSHOTS.backups}
                assetBase={assetBase}
                sizes='(min-width: 1152px) 660px, (min-width: 1024px) 56vw, 94vw'
              />
              <figcaption className='mt-4 text-center text-sm text-muted-foreground'>{SCREENSHOTS.backups.caption}</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
