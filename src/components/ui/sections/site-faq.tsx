import { ChevronDown } from 'lucide-react'
import { Reveal } from '../motion/reveal'
import { SectionHeading } from '../layout/section-heading'

interface Question {
  q: string
  a: string
}

const QUESTIONS: Question[] = [
  {
    q: 'What do I need to run it?',
    a: "A machine with Docker. The image runs on amd64 and arm64 and keeps its data in a built-in database inside one volume, or in your own PostgreSQL server. The machines you connect need a bash shell; Windows shells aren't supported yet. You can also build it from source with Node.js.",
  },
  {
    q: 'Is it another coding agent?',
    a: 'No. OpenCroft is where agents work. It drives coding agents such as Claude Code, Codex and OpenCode through the Agent Client Protocol (ACP), each on your own API key or subscription. Its built-in agent works with any OpenAI-compatible endpoint, including a model you host yourself.',
  },
  {
    q: 'Where does my data live?',
    a: 'OpenCroft keeps its data on your machine: its database, built in or your own PostgreSQL, and the files apps store in the data volume. Docs are commits in the git repository you connect. What an agent sends to a model goes to the provider you chose for that agent.',
  },
  {
    q: 'Is it ready for production?',
    a: 'Not yet. OpenCroft is in active development with no stable release, and configuration, storage and UI can change between versions. Take a backup before you update.',
  },
  {
    q: 'What does it cost?',
    a: 'OpenCroft is free and open source under AGPL-3.0. You pay for your own server and for the models your agents use.',
  },
  {
    q: 'Can I contribute?',
    a: "Not with code yet. The source is public, but the project doesn't accept outside contributions at the moment. Bug reports are welcome as GitHub issues, and you can extend it: build an extension and share it from a public git repository, or keep it on your own instance.",
  },
]

export function SiteFaq() {
  return (
    <section id='faq' aria-labelledby='faq-title' className='relative scroll-mt-16 py-20 sm:py-28'>
      <div className='mx-auto max-w-3xl px-5 sm:px-6'>
        <Reveal>
          <SectionHeading id='faq-title' eyebrow='FAQ' title='Before you run it' />
        </Reveal>

        <Reveal delay={100}>
          <div className='mt-12 divide-y divide-border rounded-xl border border-border bg-card/60'>
            {QUESTIONS.map((item) => (
              <details key={item.q} className='group'>
                <summary className='flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:px-6 [&::-webkit-details-marker]:hidden'>
                  <span className='min-w-0'>{item.q}</span>
                  <ChevronDown
                    aria-hidden='true'
                    className='size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180'
                  />
                </summary>
                <p className='px-5 pb-5 text-sm leading-relaxed text-pretty text-muted-foreground sm:px-6'>{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
