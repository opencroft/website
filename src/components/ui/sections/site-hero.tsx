import { ChevronDown } from 'lucide-react'
import { CommandSnippet } from '../primitives/command-snippet'
import { GitHubMark } from '../primitives/github-mark'
import { LinkButton } from '../primitives/link-button'
import { Pill } from '../primitives/pill'
import { Reveal } from '../motion/reveal'
import { ScreenshotFrame } from '../media/screenshot-frame'
import { SCREENSHOTS } from '../media/screenshots'
import { AccentText } from '../layout/section-heading'
import { INSTALL_COMMAND, SITE_LINKS } from '../content/site-links'
import { Wordmark } from '../wordmark'

// A faint grid that fades out toward the edges, drawn inline so the section
// needs no utility from the site's stylesheet.
const GRID = {
  backgroundImage:
    'linear-gradient(rgb(96 165 250 / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(96 165 250 / 0.07) 1px, transparent 1px)',
  backgroundSize: '56px 56px',
  maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 100%)',
  WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 100%)',
}

export interface SiteHeroProps {
  /** Origin the screenshots are served from. Empty on the website itself. */
  assetBase?: string
  sourceHref?: string
  /** The command that runs OpenCroft. Defaults to the published image's. */
  command?: string
}

export function SiteHero({
  assetBase = '',
  sourceHref = SITE_LINKS.repository,
  command = INSTALL_COMMAND,
}: SiteHeroProps) {
  return (
    <section id='top' aria-labelledby='hero-title' className='relative overflow-hidden'>
      <div aria-hidden='true' className='absolute inset-0' style={GRID} />
      <div
        aria-hidden='true'
        className='absolute top-24 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px]'
      />
      <div
        aria-hidden='true'
        className='absolute top-72 left-[18%] size-[22rem] rounded-full bg-violet-500/10 blur-[100px]'
      />

      <div className='relative mx-auto max-w-6xl px-5 pb-20 text-center sm:px-6 sm:pb-28'>
        {/* The first screen: one screen tall less the nav (65px: h-16 and its border).
            The lockup to the button sit centred in it, and the caption with its chevron
            closes it as the cue to scroll; the shot starts at the fold. Type and spacing
            follow the screen's height, so all of it fits from 720px up. On a phone it may
            run longer, with the command still in view. */}
        <div className='flex min-h-[calc(100svh_-_65px)] flex-col'>
          <div className='flex flex-1 flex-col items-center justify-center py-8 sm:py-[clamp(0.5rem,1.5svh,2.5rem)]'>
            <Reveal className='flex justify-center'>
              {/* The lockup keeps its own left alignment inside the centred hero:
                  inherited centring pulls the name away from the mark. */}
              <div className='text-left text-foreground'>
                <span className='[@media(min-width:640px)_and_(min-height:860px)]:hidden'>
                  <Wordmark variant='medium' />
                </span>
                <span className='hidden [@media(min-width:640px)_and_(min-height:860px)]:inline'>
                  <Wordmark variant='large' />
                </span>
              </div>
            </Reveal>

            <Reveal delay={50} className='mt-6 sm:mt-[clamp(0.625rem,1.6svh,1.75rem)]'>
              <Pill dot>Self-hosted · Open source · AI agents</Pill>
            </Reveal>

            <Reveal delay={100}>
              <h1
                id='hero-title'
                className='mx-auto mt-6 max-w-4xl text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:mt-[clamp(0.625rem,1.6svh,1.5rem)] sm:text-[min(3.75rem,max(2.25rem,5.8svh))] lg:text-[min(4.5rem,max(2.25rem,5.8svh))]'
              >
                Your Infrastructure. Your Agents. <AccentText>Your Rules.</AccentText>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className='mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:mt-[clamp(0.625rem,1.6svh,1.5rem)] sm:max-w-3xl sm:text-[min(1.125rem,max(1rem,2.2svh))]'>
                Put your servers and containers on one canvas and run them from it: deploy, read logs, open a shell. AI
                agents work on the same canvas with your team, on the models you choose.
              </p>
            </Reveal>

            <Reveal delay={300} className='w-full'>
              <div id='install' className='mx-auto mt-8 max-w-3xl scroll-mt-24 sm:mt-[clamp(0.875rem,2svh,2rem)]'>
                {/* The command and the button only: the port is in the command, the app's
                    first screen asks for the admin account, and the closing section and
                    the FAQ carry the development status. */}
                <CommandSnippet label='Run it with Docker' command={command} />
                <div className='mt-5 flex justify-center sm:mt-[clamp(0.875rem,2svh,1.5rem)]'>
                  <LinkButton href={sourceHref} variant='secondary' size='lg' target='_blank' rel='noopener noreferrer'>
                    <GitHubMark />
                    View the source
                  </LinkButton>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Not in a Reveal: it sits in the last lines of the screen, where the reveal
              would never fire on load and the cue would stay hidden. */}
          <p className='mx-auto flex max-w-xl flex-col items-center gap-1 pb-6 text-sm text-pretty text-muted-foreground sm:pb-[clamp(0.5rem,1.6svh,1.5rem)]'>
            Select a service and ask. The agent makes the change and tells you what it did.
            <ChevronDown aria-hidden='true' className='size-4 text-blue-400/80' />
          </p>
        </div>

        <Reveal delay={450} className='relative'>
          <div
            aria-hidden='true'
            className='absolute inset-x-[10%] -bottom-10 h-24 rounded-full bg-blue-500/20 blur-3xl'
          />

          {/* A phone gets the phone shot alone: the desktop one is unreadable at this width. */}
          <div className='relative mx-auto w-[min(16rem,72vw)] sm:hidden'>
            <ScreenshotFrame shot={SCREENSHOTS['hero-phone']} assetBase={assetBase} sizes='72vw' />
          </div>

          {/* The desktop shot runs full width with no phone over it: its right side is the
              chat where the agent says what it changed, which an overlay would cover. */}
          <div className='relative hidden sm:block'>
            <ScreenshotFrame
              shot={SCREENSHOTS['hero-desktop']}
              assetBase={assetBase}
              priority
              sizes='(min-width: 1152px) 1100px, 94vw'
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
