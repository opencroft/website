export type ScreenshotDevice = 'desktop' | 'phone'

export type ScreenshotName =
  | 'hero-desktop'
  | 'hero-phone'
  | 'agent-setup'
  | 'canvas'
  | 'chat-list-phone'
  | 'chat-thread-phone'
  | 'automation'
  | 'app-my-work'
  | 'app-task-list'
  | 'tasks-board'
  | 'app-task'
  | 'app-workflow'
  | 'app-documentation'
  | 'app-git'
  | 'app-code-editor'
  | 'app-design-kit'
  | 'extension-editor'
  | 'backups'

export interface Screenshot {
  name: ScreenshotName
  device: ScreenshotDevice
  /** Intrinsic size of the largest file, which fixes the aspect ratio. */
  width: number
  height: number
  /** The exported widths, smallest first. */
  widths: readonly number[]
  alt: string
  /** One short line: what the shot proves. Also shown if the image fails. */
  caption: string
  /** Not taken yet. A frame draws a marked placeholder and requests no file. */
  pending?: boolean
}

const DESKTOP = { device: 'desktop', width: 1600, height: 1000, widths: [800, 1600] } as const
const PHONE = { device: 'phone', width: 780, height: 1688, widths: [390, 780] } as const

export const SCREENSHOTS: Record<ScreenshotName, Screenshot> = {
  'hero-desktop': {
    name: 'hero-desktop',
    ...DESKTOP,
    pending: true,
    alt: "The OpenCroft canvas: a Docker host running web, api and a new redis service, with api selected. Beside it, the ops agent's reply in the chat says what it added and what it changed on api.",
    caption: 'Select a service and ask; the agent makes the change and says what it did',
  },
  'hero-phone': {
    name: 'hero-phone',
    ...PHONE,
    pending: true,
    alt: "The same thread on a phone: the request with the api service quoted, and the agent's reply saying what it added and changed.",
    caption: 'The agent says what it changed',
  },
  'agent-setup': {
    name: 'agent-setup',
    ...DESKTOP,
    pending: true,
    alt: "An agent selected on the canvas and wired to the team's shared instructions, with its provider, harness and model in the inspector and its API key picked by name.",
    caption: 'Each agent with its own provider, model and instructions',
  },
  canvas: {
    name: 'canvas',
    ...DESKTOP,
    pending: true,
    alt: 'The OpenCroft canvas as a map of the stack: a Docker host running web, api and redis, with a secrets store, and schedules, scripts and agents around the edges.',
    caption: 'Your stack as nodes you can run',
  },
  'chat-list-phone': {
    name: 'chat-list-phone',
    ...PHONE,
    pending: true,
    alt: "The team's group chat on a phone: its topic naming the people and the agents, and threads in folders, each showing whether its agent is working, waiting or idle.",
    caption: 'One chat for the people and the agents',
  },
  'chat-thread-phone': {
    name: 'chat-thread-phone',
    ...PHONE,
    pending: true,
    alt: "A support thread on a phone: a pasted bug report and the agent's reply naming the task it filed and the answer it drafted.",
    caption: 'An agent turns a bug report into a task',
  },
  automation: {
    name: 'automation',
    ...DESKTOP,
    pending: true,
    alt: 'A weekday schedule wired to a script and a Send Message node, with its next runs in the inspector, and the morning report it delivered docked beside it with the agent reply.',
    caption: 'A schedule that hands its report to an agent',
  },
  'app-my-work': {
    name: 'app-my-work',
    ...DESKTOP,
    pending: true,
    alt: "Maya's My work page in Tasks: an approval that waits for her at the top, then the tasks assigned to her.",
    caption: 'My work: what needs you now',
  },
  'app-task-list': {
    name: 'app-task-list',
    ...DESKTOP,
    pending: true,
    alt: 'The Tasks list filtered to bugs, with an assignee column showing people and agents, and a saved view named Bugs.',
    caption: 'Every task in one list, in views you can save',
  },
  'tasks-board': {
    name: 'tasks-board',
    ...DESKTOP,
    alt: 'The Tasks board with columns from To Do to Done, each card showing its key, summary and the person or agent assigned to it.',
    caption: 'A task board shared by people and agents',
  },
  'app-task': {
    name: 'app-task',
    ...DESKTOP,
    pending: true,
    alt: "A task on its full page with the agent's report on it: a list, a table, and the related task and its review shown as links with their status.",
    caption: 'Agents report on the task itself',
  },
  'app-workflow': {
    name: 'app-workflow',
    ...DESKTOP,
    alt: 'A Bug fix workflow run in Tasks: the fix and the review done by agents, the next step waiting for a person to approve, and the merge still to come.',
    caption: 'A workflow where agents fix and review, and a person approves',
  },
  'app-documentation': {
    name: 'app-documentation',
    ...DESKTOP,
    alt: 'The Documentation app with a runbook open, and the chat docked beside it with an agent answering about that page.',
    caption: "Ask about the page you're reading in the chat beside it",
  },
  'app-git': {
    name: 'app-git',
    ...DESKTOP,
    alt: "The Git app: a branch's commits, with the selected commit's diff open side by side.",
    caption: 'Git: branches, commits and diffs in the browser',
  },
  'app-code-editor': {
    name: 'app-code-editor',
    ...DESKTOP,
    alt: "The Code app: a VS Code workbench on a folder of one of the space's machines, with a file open.",
    caption: 'A code editor in the browser, on your own machine',
  },
  'app-design-kit': {
    name: 'app-design-kit',
    ...DESKTOP,
    alt: 'The Design Kit app with its component library and one component rendered in a live preview.',
    caption: 'A component library with live previews',
  },
  'extension-editor': {
    name: 'extension-editor',
    ...DESKTOP,
    pending: true,
    alt: 'An extension open in the in-browser editor, with its source on one side and a live preview of its node on the other.',
    caption: 'An extension written in the browser',
  },
  backups: {
    name: 'backups',
    ...DESKTOP,
    pending: true,
    alt: 'The scheduled backups card, set to a daily backup kept for 14 days, and the list of backups it made, each with download and restore.',
    caption: 'Backups on a schedule, with download and restore',
  },
}

/** The folder the website serves the files from. */
export const SCREENSHOT_DIR = '/screenshots'

/** The website's public origin, for surfaces that are not the website (the kit preview). */
export const SCREENSHOT_PREVIEW_ORIGIN = 'https://opencroft.io'

function fileUrl(shot: Screenshot, width: number, assetBase: string) {
  return `${assetBase}${SCREENSHOT_DIR}/${shot.name}-${width}.webp`
}

/** The largest file: the img fallback src. `assetBase` is empty on the website itself. */
export function screenshotSrc(shot: Screenshot, assetBase = '') {
  return fileUrl(shot, shot.widths[shot.widths.length - 1], assetBase)
}

export function screenshotSrcSet(shot: Screenshot, assetBase = '') {
  return shot.widths.map((w) => `${fileUrl(shot, w, assetBase)} ${w}w`).join(', ')
}
