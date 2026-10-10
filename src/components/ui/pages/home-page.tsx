import { ScreenshotsSwitch } from '../media/screenshot-frame'
import { SITE_LINKS } from '../content/site-links'
import { SiteControl } from '../sections/site-control'
import { SiteCta } from '../sections/site-cta'
import { SiteFaq } from '../sections/site-faq'
import { SiteFeatures } from '../sections/site-features'
import { SiteFooter } from '../sections/site-footer'
import { SiteHero } from '../sections/site-hero'
import { SiteNav } from '../sections/site-nav'
import { SiteUseCases } from '../sections/site-use-cases'
import { SiteWhy } from '../sections/site-why'

export interface HomePageProps {
  /** Origin the screenshots are served from. Empty on the website itself. */
  assetBase?: string
  sourceHref?: string
  /** Off: every screenshot shows its pending placeholder and no file is requested. */
  screenshots?: boolean
}

// The page's background: the theme's navy across the middle, fading almost to black
// (5% of the navy left) at both sides. The nav carries the same fade.
const EDGE = 'color-mix(in srgb, #000 95%, var(--background))'
const BACKGROUND = {
  background: `linear-gradient(to right, ${EDGE}, var(--background) 35%, var(--background) 65%, ${EDGE})`,
}

export function HomePage({ assetBase = '', sourceHref = SITE_LINKS.repository, screenshots = true }: HomePageProps) {
  return (
    <ScreenshotsSwitch enabled={screenshots}>
      <div className='min-h-screen text-foreground' style={BACKGROUND}>
        <SiteNav sourceHref={sourceHref} />
        <main>
          <SiteHero assetBase={assetBase} sourceHref={sourceHref} />
          <SiteWhy />
          <SiteUseCases />
          <SiteFeatures assetBase={assetBase} />
          <SiteControl assetBase={assetBase} />
          <SiteFaq />
          <SiteCta sourceHref={sourceHref} />
        </main>
        <SiteFooter />
      </div>
    </ScreenshotsSwitch>
  )
}
