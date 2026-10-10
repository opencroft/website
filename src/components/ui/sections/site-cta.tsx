import { CommandSnippet } from '../primitives/command-snippet'
import { GitHubMark } from '../primitives/github-mark'
import { LinkButton } from '../primitives/link-button'
import { Reveal } from '../motion/reveal'
import { AccentText } from '../layout/section-heading'
import { INSTALL_COMMAND, InstallNote, SITE_LINKS } from '../content/site-links'

const LINK =
  'font-medium text-blue-400 underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'

export interface SiteCtaProps {
  sourceHref?: string
  issuesHref?: string
  /** The command that runs OpenCroft. Defaults to the published image's. */
  command?: string
}

export function SiteCta({
  sourceHref = SITE_LINKS.repository,
  issuesHref = SITE_LINKS.issues,
  command = INSTALL_COMMAND,
}: SiteCtaProps) {
  return (
    <section aria-labelledby='cta-title' className='py-20 sm:py-28'>
      <div className='mx-auto max-w-4xl px-5 sm:px-6'>
        <Reveal>
          <div className='relative overflow-hidden rounded-2xl border border-border bg-card/60 px-3 py-14 text-center min-[360px]:px-4 sm:px-12 sm:py-16'>
            <div
              aria-hidden='true'
              className='absolute -top-16 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[80px]'
            />
            <h2 id='cta-title' className='relative text-3xl font-bold tracking-tight text-balance sm:text-4xl'>
              Give your agents <AccentText>a place to work</AccentText>
            </h2>
            <p className='relative mx-auto mt-4 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground'>
              Run OpenCroft on your own server, put your machines and services on the canvas, and hand your agents their
              first job.
            </p>
            <CommandSnippet
              label='Run it with Docker'
              command={command}
              note={<InstallNote />}
              className='relative mx-auto mt-8 max-w-3xl'
            />
            <p className='relative mt-4 text-sm text-pretty text-muted-foreground'>
              OpenCroft is in active development and hasn't reached a stable release yet.
            </p>
            <div className='relative mt-6 flex justify-center'>
              <LinkButton href={sourceHref} variant='secondary' size='lg' target='_blank' rel='noopener noreferrer'>
                <GitHubMark />
                View the source
              </LinkButton>
            </div>
            <p className='relative mx-auto mt-6 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground'>
              Not ready to run it yet?{' '}
              <a href={sourceHref} target='_blank' rel='noopener noreferrer' className={LINK}>
                Watch the repository on GitHub
              </a>{' '}
              to hear about releases, and report bugs as{' '}
              <a href={issuesHref} target='_blank' rel='noopener noreferrer' className={LINK}>
                issues
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
