import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import { Pause, Play } from 'lucide-react'
import { cn } from 'cn'
import { ScreenshotFrame, useScreenshotsEnabled } from './screenshot-frame'
import { SCREENSHOTS, type ScreenshotName } from './screenshots'

export interface CarouselSlide {
  shot: ScreenshotName
  /** The slide's name for screen readers, e.g. the app's name. */
  label: string
  /** One line under the screenshot. */
  caption: string
}

export interface ScreenshotCarouselProps {
  slides: CarouselSlide[]
  /** What the carousel holds, for assistive tech, e.g. "Apps". */
  label: string
  /** Origin the screenshots are served from. Empty on the website itself. */
  assetBase?: string
  /** The img `sizes` hint for one slide. */
  sizes?: string
  /** How fast the belt drifts, in pixels per second. */
  speed?: number
  className?: string
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

// Both edges fade into the page: 24px on a phone, up to 160px on a wide screen.
const FADE =
  'linear-gradient(to right, transparent, #000 clamp(24px, 8vw, 160px), #000 calc(100% - clamp(24px, 8vw, 160px)), transparent)'

const CONTROL =
  'inline-flex size-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'

export function ScreenshotCarousel({
  slides: allSlides,
  label,
  assetBase = '',
  sizes,
  speed = 35,
  className,
}: ScreenshotCarouselProps) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const id = useId()
  // A shot not taken yet stays off the belt: a moving row of placeholders reads as broken.
  // With every shot switched off the belt keeps them all, so the row keeps its place.
  const enabled = useScreenshotsEnabled()
  const slides = enabled ? allSlides.filter((slide) => !SCREENSHOTS[slide.shot].pending) : allSlides
  const count = slides.length
  const reduced = useReducedMotion()

  // With motion allowed the slides are drawn three times and the middle copy
  // is the real one. The belt drifts through the copies and jumps back by one
  // copy's width to the same picture, so the loop never shows an end. Under
  // reduced motion it is one still strip.
  const loop = !reduced && count > 1
  // Where the belt is, in fractional pixels: scrollLeft only keeps whole ones,
  // and a slow drift moves less than one pixel a frame.
  const offset = useRef(0)

  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  const [inView, setInView] = useState(false)
  // A slide open in the viewer holds the belt; closing it lets the belt go on,
  // unless the pause button holds it.
  const [viewing, setViewing] = useState(false)
  const moving = loop && playing && !hovered && !focused && !touched && inView && !viewing

  const step = () => {
    const el = track.current
    const [first, second] = el ? (Array.from(el.children) as HTMLElement[]) : []
    return first && second ? second.offsetLeft - first.offsetLeft : (el?.clientWidth ?? 0)
  }

  // Keep the belt inside the middle copy, by whole copies, so the picture never changes.
  const wrap = (left: number) => {
    const span = count * step()
    if (!loop || !span) return left
    while (left < span) left += span
    while (left >= 2 * span) left -= span
    return left
  }

  // The slide nearest the middle of the strip, for the screen-reader line.
  const settle = () => {
    const el = track.current
    const size = step()
    if (!el || !size) return
    setActive(((Math.round(el.scrollLeft / size) % count) + count) % count)
  }

  // Start on the real first slide, centred, and keep it through a resize.
  useEffect(() => {
    const el = track.current
    if (!el) return
    offset.current = loop ? count * step() : 0
    el.scrollLeft = offset.current
    let width = el.clientWidth
    const observer = new ResizeObserver(() => {
      if (el.clientWidth === width) return
      const slide = Math.round(el.scrollLeft / Math.max(step(), 1))
      width = el.clientWidth
      offset.current = wrap(slide * step())
      el.scrollLeft = offset.current
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [loop, count])

  // The drift: a steady speed, frame by frame, from wherever the belt is now,
  // so a swipe or a trackpad scroll in between simply moves it along.
  useEffect(() => {
    const el = track.current
    if (!el || !moving) return
    offset.current = el.scrollLeft
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const seconds = Math.min(now - last, 100) / 1000
      last = now
      offset.current = wrap(offset.current + speed * seconds)
      el.scrollLeft = Math.round(offset.current)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      settle()
    }
  }, [moving, speed, count])

  // A swipe or trackpad scroll that comes to rest: back into the middle copy,
  // and name the slide in the middle.
  useEffect(() => {
    const el = track.current
    if (!el) return
    let timer = 0
    const rest = () => {
      window.clearTimeout(timer)
      const left = wrap(el.scrollLeft)
      if (left !== el.scrollLeft) el.scrollLeft = left
      settle()
    }
    const onScroll = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(rest, 150)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('scrollend', rest)
    return () => {
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('scrollend', rest)
      window.clearTimeout(timer)
    }
  }, [loop, count])

  // Move only while the carousel is on screen and the tab is showing.
  useEffect(() => {
    const el = root.current
    if (!el) return
    let onScreen = false
    const update = () => setInView(onScreen && document.visibilityState === 'visible')
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        update()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  // With focus on the track the arrow keys move it by one slide, as a swipe would.
  const onKeyDown = (event: KeyboardEvent) => {
    const el = track.current
    if (!el || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return
    event.preventDefault()
    const size = step()
    const slide = Math.round(el.scrollLeft / size) + (event.key === 'ArrowRight' ? 1 : -1)
    el.scrollTo({ left: slide * size, behavior: reduced ? 'auto' : 'smooth' })
  }

  // Keyboard focus holds the belt; a mouse click on a control does not, or
  // pressing play would leave it held by the button's own focus.
  const onFocus = (event: FocusEvent) => {
    if ((event.target as HTMLElement).matches(':focus-visible')) setFocused(true)
  }
  const onBlur = (event: FocusEvent) => {
    if (!root.current?.contains(event.relatedTarget as Node | null)) setFocused(false)
  }

  if (count === 0) return null
  const current = slides[active]

  return (
    <div
      ref={root}
      role='region'
      aria-roledescription='carousel'
      aria-label={label}
      onFocus={onFocus}
      onBlur={onBlur}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(false)}
      className={cn('min-w-0', className)}
    >
      {/* The one control: the belt is not switched by hand, only held. A swipe, a
          trackpad or, with focus on the track, the arrow keys still move it. */}
      {loop && (
        <div className='mb-4 flex justify-end'>
          <button
            type='button'
            aria-label={playing ? 'Pause the slides' : 'Play the slides'}
            onClick={() => setPlaying((value) => !value)}
            className={CONTROL}
          >
            {playing ? (
              <Pause aria-hidden='true' className='size-3.5' />
            ) : (
              <Play aria-hidden='true' className='size-3.5' />
            )}
          </button>
        </div>
      )}

      {/* The strip runs the full width of the screen, past the content column, and
          fades into the page at both edges, so slides drift in and out rather than
          being cut by a box. */}
      <div
        className='relative ml-[calc(50%-50vw)] w-screen'
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      >
        <div
          ref={track}
          tabIndex={0}
          role='group'
          aria-label={`${label}: slides`}
          onKeyDown={onKeyDown}
          onTouchStart={() => setTouched(true)}
          onTouchEnd={() => setTouched(false)}
          onTouchCancel={() => setTouched(false)}
          className={cn(
            'peer flex gap-4 overflow-x-auto overscroll-x-contain px-[calc(50%-min(43vw,28rem))] outline-none sm:gap-6',
            // Snapping would fight a drift of a fraction of a pixel a frame; the still strip keeps it.
            !loop && 'snap-x snap-mandatory',
          )}
          style={{ scrollbarWidth: 'none' }}
        >
          {Array.from({ length: loop ? 3 : 1 }, (_, copy) =>
            slides.map((slide, i) => {
              const real = !loop || copy === 1
              return (
                <div
                  key={`${copy}-${slide.shot}`}
                  id={real ? `${id}-${i}` : undefined}
                  role={real ? 'group' : undefined}
                  aria-roledescription={real ? 'slide' : undefined}
                  aria-label={real ? `${i + 1} of ${count}: ${slide.label}` : undefined}
                  aria-hidden={real ? undefined : true}
                  className='w-[min(86vw,56rem)] flex-none snap-center snap-always'
                >
                  <figure>
                    <ScreenshotFrame
                      shot={SCREENSHOTS[slide.shot]}
                      assetBase={assetBase}
                      sizes={sizes ?? '(min-width: 1042px) 896px, 86vw'}
                      focusable={real}
                      onViewerChange={setViewing}
                    />
                    <figcaption className='mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-pretty text-muted-foreground'>
                      {slide.caption}
                    </figcaption>
                  </figure>
                </div>
              )
            }),
          )}
        </div>
        {/* Keyboard focus on the track: a ring around the middle of the strip, where
            the fades never reach. */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-y-0 left-1/2 w-[min(calc(86vw+1rem),57rem)] -translate-x-1/2 rounded-2xl opacity-0 ring-2 ring-ring peer-focus-visible:opacity-100'
        />
      </div>

      {/* Quiet while the belt moves on its own; names the slide in the middle once it is held. */}
      <p aria-live={moving ? 'off' : 'polite'} className='sr-only'>
        {`${active + 1} of ${count}: ${current.label}`}
      </p>
    </div>
  )
}
