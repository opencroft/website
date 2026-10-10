import { Activity, House, Puzzle, Users, type LucideIcon } from 'lucide-react'
import { Reveal } from '../motion/reveal'
import { AccentText, SectionHeading } from '../layout/section-heading'

interface UseCase {
  icon: LucideIcon
  title: string
  body: string
}

const USE_CASES: UseCase[] = [
  {
    icon: House,
    title: 'Homelab',
    body: "Run your home server's containers from one canvas. Deploy, update images and read logs, with an agent that can look into a failing service.",
  },
  {
    icon: Users,
    title: 'Dev team',
    body: 'Agents for code, review and bug reports, working in the team chat, on the task board and in your repositories.',
  },
  {
    icon: Activity,
    title: 'Ops',
    body: 'Backups, health checks and morning reports run on schedules, and an agent reads the results and tells you what needs a person.',
  },
  {
    icon: Puzzle,
    title: 'Internal tools',
    body: 'Build the node, app or dashboard your team is missing as an extension, and keep it next to the infrastructure it controls.',
  },
]

export function SiteUseCases() {
  return (
    <section
      id='use-cases'
      aria-labelledby='use-cases-title'
      className='relative scroll-mt-16 border-y border-border/50 bg-card/30 py-20 sm:py-28'
    >
      <div className='mx-auto max-w-6xl px-5 sm:px-6'>
        <Reveal>
          <SectionHeading
            id='use-cases-title'
            eyebrow='Use cases'
            title={
              <>
                One workspace, from a homelab <AccentText>to a team's internal tools</AccentText>
              </>
            }
          />
        </Reveal>

        <ul className='mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4'>
          {USE_CASES.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={(i % 4) * 80} className='h-full'>
                <div className='h-full rounded-xl border border-border bg-card/60 p-5 sm:p-6'>
                  {/* On a phone the icon sits beside the title, so four stacked cards stay short. */}
                  <div className='flex items-center gap-3 sm:block'>
                    <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 sm:mb-4 sm:size-10'>
                      <item.icon aria-hidden='true' className='size-5' />
                    </div>
                    <h3 className='font-semibold'>{item.title}</h3>
                  </div>
                  <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{item.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
