import { Reveal } from '../motion/reveal'
import { AccentText, SectionHeading } from '../layout/section-heading'

export function SiteWhy() {
  return (
    <section id='product' aria-labelledby='why-title' className='relative scroll-mt-16 py-20 sm:py-28'>
      <div className='mx-auto max-w-6xl px-5 sm:px-6'>
        <Reveal>
          <SectionHeading
            id='why-title'
            eyebrow='Why OpenCroft'
            title={
              <>
                Your agents <AccentText>see what you see</AccentText>
              </>
            }
            lede='Servers sit in one console, deploy configs in a repository, tasks in a tracker, runbooks in a wiki, and agents in a terminal tab that sees none of it. OpenCroft puts them in one workspace you host.'
          />
          <p className='mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg'>
            It's built in OpenCroft itself, with agents, to work with agents.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
