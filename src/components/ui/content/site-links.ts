import { createElement, Fragment } from 'react'

// Where the landing's links go. Sections take each href as a prop defaulting
// to one of these, so a destination changes here, once.
const REPOSITORY = 'https://github.com/opencroft/opencroft'

export const SITE_LINKS = {
  /** Get started leads to the repository until there is an install page. */
  getStarted: REPOSITORY,
  repository: REPOSITORY,
  /** Where bugs are reported. */
  issues: `${REPOSITORY}/issues`,
  /** The repository README is the documentation entry point for now. */
  docs: `${REPOSITORY}#readme`,
  license: `${REPOSITORY}/blob/HEAD/LICENSE`,
  licenseName: 'AGPL-3.0',
} as const

export type SiteLinks = typeof SITE_LINKS

// The published image's tag. There is no `latest`; `dev` and `nightly` are
// both pre-release builds, which the page says. Changing it here changes the
// command everywhere it is shown.
const IMAGE_TAG = 'dev'

/** The one command that runs OpenCroft, as the hero and the closing CTA show it. */
export const INSTALL_COMMAND = `docker run -p 9999:9999 -v opencroft-data:/app/data ghcr.io/opencroft/opencroft:${IMAGE_TAG}`

/**
 * The line under the command: what to do once it runs. Written with
 * createElement because this file stays .ts, the path installers already have.
 */
export function InstallNote() {
  return createElement(
    Fragment,
    null,
    'Then open ',
    createElement('code', { className: 'font-mono text-[0.9em] whitespace-nowrap text-foreground' }, 'http://localhost:9999'),
    ", or your server's address on port 9999, and create your admin account.",
  )
}
