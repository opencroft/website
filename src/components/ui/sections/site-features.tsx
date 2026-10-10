import { type CarouselSlide, ScreenshotCarousel } from '../media/screenshot-carousel'
import { ScreenshotFrame } from '../media/screenshot-frame'
import { SCREENSHOTS } from '../media/screenshots'
import { SiteFeatureRow } from '../layout/site-feature-row'

const ROW_SHOT_SIZES = '(min-width: 1152px) 660px, (min-width: 1024px) 56vw, 94vw'

// The belt's order: a tour of Tasks first, then the other apps. A slide whose shot
// is still pending stays off the belt until it lands.
const APPS: CarouselSlide[] = [
  {
    shot: 'app-my-work',
    label: 'My work',
    caption: 'My work shows what needs you now. Agents read the same list for themselves.',
  },
  {
    shot: 'app-task-list',
    label: 'Tasks',
    caption: 'Every task in one list, filtered your way, in views you can save.',
  },
  {
    shot: 'tasks-board',
    label: 'Board',
    caption: 'One board for the whole team, with tasks assigned to people and agents alike.',
  },
  {
    shot: 'app-task',
    label: 'Task',
    caption: 'Agents report on the task itself, and every task key in the report links with its status.',
  },
  {
    shot: 'app-workflow',
    label: 'Workflows',
    caption: 'One agent fixes the bug, another reviews it, and the merge waits for a person to approve.',
  },
  {
    shot: 'app-documentation',
    label: 'Docs',
    caption: "Ask in the chat beside the page you're reading. The agent knows which page you mean.",
  },
  {
    shot: 'app-git',
    label: 'Git',
    caption: 'Worktrees side by side, and a full git client to review a change and commit it.',
  },
  {
    shot: 'app-code-editor',
    label: 'Code',
    caption: 'The VS Code workbench in your browser, open on a folder on any machine in the space.',
  },
  {
    shot: 'app-design-kit',
    label: 'Design Kit',
    caption: 'Your own component library with live previews, which agents can read and edit too.',
  },
]

export interface SiteFeaturesProps {
  /** Origin the screenshots are served from. Empty on the website itself. */
  assetBase?: string
}

/** The five feature rows, alternating sides, each with the screenshot that proves it. */
export function SiteFeatures({ assetBase = '' }: SiteFeaturesProps) {
  return (
    <section id='features' aria-labelledby='features-title' className='relative scroll-mt-16 overflow-x-clip py-20 sm:py-28'>
      <h2 id='features-title' className='sr-only'>
        What OpenCroft does
      </h2>
      <div className='mx-auto flex max-w-6xl flex-col gap-24 px-5 sm:gap-32 sm:px-6'>
        <SiteFeatureRow
          title='Build your stack as nodes'
          body='Add this machine, WSL or any server over SSH, then the Docker hosts and the services that run on them, and wire them together. Machine and service cards control the real thing: deploy a service, read its logs or open a shell inside it.'
          facts={[
            'Services from an image or your own Dockerfile, with ports, secrets and health checks',
            'Passwords and API keys are stored encrypted, and nodes use them by name',
          ]}
          media={<ScreenshotFrame shot={SCREENSHOTS.canvas} assetBase={assetBase} sizes={ROW_SHOT_SIZES} />}
        />

        <SiteFeatureRow
          reverse
          title='Select a node, ask an agent'
          body='The agent knows exactly which server or service you mean. Agents can add nodes, change them and wire them up, and when a choice is yours, they ask you in the chat.'
          facts={[
            'Each agent gets its own model, instructions and tools',
            'Shared instructions on the canvas and pinned notes give every agent the same brief',
            'Agents run commands through the same terminals you use',
          ]}
          media={<ScreenshotFrame shot={SCREENSHOTS['agent-setup']} assetBase={assetBase} sizes={ROW_SHOT_SIZES} />}
        />

        <SiteFeatureRow
          title='Your team and your agents in one chat'
          body='Every project has its own group chat, where people and agents work in threads, one agent per thread. Anyone on the team can read what an agent was asked and what it did.'
          facts={[
            'Write while an agent is busy. Your message waits its turn, or you send it in right away',
            'Set how often each agent picks up new messages, from right away to once a day',
            'Replies can carry tables, callouts and collapsible details, and a task key becomes a link with its status',
          ]}
          media={
            <div className='mx-auto grid max-w-md grid-cols-2 gap-4 sm:gap-6'>
              <ScreenshotFrame
                shot={SCREENSHOTS['chat-list-phone']}
                assetBase={assetBase}
                sizes='(min-width: 640px) 210px, 45vw'
              />
              <ScreenshotFrame
                shot={SCREENSHOTS['chat-thread-phone']}
                assetBase={assetBase}
                sizes='(min-width: 640px) 210px, 45vw'
              />
            </div>
          }
        />

        <SiteFeatureRow
          reverse
          title='Work that starts on its own'
          body="A schedule or an incoming web request runs a script, and the script can hand its result to an agent's thread. Use it for nightly backups, a report every weekday morning or a webhook from another tool."
          facts={[
            'Scripts in Python or Node.js',
            'Schedules like weekdays at 09:00 UTC',
            'Each chat decides which automations may post into it',
          ]}
          media={<ScreenshotFrame shot={SCREENSHOTS.automation} assetBase={assetBase} sizes={ROW_SHOT_SIZES} />}
        />

        <SiteFeatureRow
          title='Tasks, docs, git and code, or an app you build yourself'
          body='Tasks, docs, git, a code editor and a design kit are extensions, each in its own public repository. Add the ones a project needs; agents use them too. Missing one? Write your own node or app in the browser, with a live preview of your node, or ask an agent to write it.'
          wide
          media={<ScreenshotCarousel label='Apps' slides={APPS} assetBase={assetBase} />}
        />
      </div>
    </section>
  )
}
