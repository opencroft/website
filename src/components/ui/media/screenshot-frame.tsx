import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { Camera, ImageOff, X, ZoomIn } from 'lucide-react'
import { cn } from 'cn'
import { type Screenshot, screenshotSrc, screenshotSrcSet } from './screenshots'

// Whether shots load at all. Switched off, every frame shows its pending placeholder
// and requests no file: for a page that goes out before its shots are final.
const ScreenshotsEnabled = createContext(true)

export interface ScreenshotsSwitchProps {
  enabled: boolean
  children: ReactNode
}

/** Turns the shots of every frame inside it on or off. */
export function ScreenshotsSwitch({ enabled, children }: ScreenshotsSwitchProps) {
  return <ScreenshotsEnabled.Provider value={enabled}>{children}</ScreenshotsEnabled.Provider>
}

/** Whether the frames here load their shots; true outside any switch. */
export function useScreenshotsEnabled() {
  return useContext(ScreenshotsEnabled)
}

export interface ScreenshotFrameProps {
  shot: Screenshot
  /** Origin the files are served from. Empty on the website itself. */
  assetBase?: string
  /** Load at once rather than when scrolled near: for the shot above the fold. */
  priority?: boolean
  /** The img `sizes` hint: how wide the frame renders at each breakpoint. */
  sizes?: string
  /** Opens the full-size shot in a viewer on click, Enter or Space. On by default. */
  zoomable?: boolean
  /** Off for a decorative copy (a carousel's loop): still clickable, never tabbed to. */
  focusable?: boolean
  /** Told when the viewer opens and closes, e.g. to hold a moving carousel. */
  onViewerChange?: (open: boolean) => void
  className?: string
}

export function ScreenshotFrame({
  shot,
  assetBase = '',
  priority = false,
  sizes,
  zoomable = true,
  focusable = true,
  onViewerChange,
  className,
}: ScreenshotFrameProps) {
  const img = useRef<HTMLImageElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [failed, setFailed] = useState(false)
  const [open, setOpen] = useState(false)
  const pending = shot.pending || !useScreenshotsEnabled()

  // A file that failed before hydration never fires onError on the client, so
  // check the element once it is ours.
  useEffect(() => {
    const el = img.current
    if (el?.complete && el.naturalWidth === 0) setFailed(true)
  }, [])

  const phone = shot.device === 'phone'
  // Only a real picture opens: a pending shot or a missing file has nothing larger to show.
  const opens = zoomable && !pending && !failed

  const setViewer = (value: boolean) => {
    setOpen(value)
    onViewerChange?.(value)
  }

  const screen = (
    <div
      className={cn('relative overflow-hidden bg-background', phone ? 'rounded-[1.6rem]' : 'rounded-md border border-border/60')}
      style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
    >
      {pending ? (
        // A shot not taken yet: marked as such, so nobody reads it as a broken image.
        <div className='absolute inset-2 flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-blue-400/30 p-4 text-center'>
          <Camera aria-hidden='true' className='size-6 text-blue-400/70' />
          <p className='text-[0.65rem] font-semibold tracking-[0.14em] text-blue-300/80 uppercase'>Screenshot pending</p>
          <p className='line-clamp-3 max-w-xs text-xs text-muted-foreground'>{shot.caption}</p>
        </div>
      ) : failed ? (
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center'>
          <ImageOff aria-hidden='true' className='size-6 text-muted-foreground/60' />
          <p className='line-clamp-3 max-w-xs text-xs text-muted-foreground'>{shot.caption}</p>
        </div>
      ) : (
        <img
          ref={img}
          src={screenshotSrc(shot, assetBase)}
          srcSet={screenshotSrcSet(shot, assetBase)}
          sizes={sizes ?? (phone ? '(min-width: 640px) 260px, 60vw' : '(min-width: 1152px) 1100px, 94vw')}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
          onError={() => setFailed(true)}
          className='absolute inset-0 size-full object-cover object-top'
        />
      )}
      {opens && (
        // The cue: a small zoom mark that shows on hover and keyboard focus.
        <span
          aria-hidden='true'
          className='pointer-events-none absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover/frame:opacity-100 group-focus-visible/frame:opacity-100'
        >
          <ZoomIn className='size-4' />
        </span>
      )}
    </div>
  )

  const body: ReactNode = phone ? (
    screen
  ) : (
    <>
      <div aria-hidden='true' className='flex h-6 items-center gap-1.5 px-2.5 sm:h-7'>
        <span className='size-2 rounded-full bg-white/15 sm:size-2.5' />
        <span className='size-2 rounded-full bg-white/15 sm:size-2.5' />
        <span className='size-2 rounded-full bg-white/15 sm:size-2.5' />
      </div>
      {screen}
    </>
  )

  const frame = phone
    ? 'rounded-[2rem] border border-border bg-card p-1.5 shadow-2xl shadow-black/50'
    : 'rounded-xl border border-border bg-card p-1 shadow-2xl shadow-black/50'

  if (!opens) return <div className={cn(frame, className)}>{body}</div>

  return (
    <>
      <button
        ref={trigger}
        type='button'
        tabIndex={focusable ? undefined : -1}
        aria-haspopup='dialog'
        onClick={() => setViewer(true)}
        className={cn(
          frame,
          'group/frame block w-full cursor-zoom-in text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
          className,
        )}
      >
        {body}
        <span className='sr-only'>, open larger</span>
      </button>
      {open && (
        <ScreenshotViewer
          shot={shot}
          assetBase={assetBase}
          onClose={() => {
            setViewer(false)
            trigger.current?.focus({ preventScroll: true })
          }}
        />
      )}
    </>
  )
}

interface ScreenshotViewerProps {
  shot: Screenshot
  assetBase: string
  onClose: () => void
}

// The full-size shot in a modal dialog: the browser keeps focus inside it and
// closes it on Esc. A click outside the picture or the close button closes it too.
function ScreenshotViewer({ shot, assetBase, onClose }: ScreenshotViewerProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const phone = shot.device === 'phone'

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    el.showModal()
    // The page behind stays put while the viewer is open.
    const root = document.documentElement
    const overflow = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = overflow
      if (el.open) el.close()
    }
  }, [])

  // Every way out closes the dialog itself, while it is still in the page: the
  // browser leaves the modal state first, so the shot behind can take focus again,
  // and the dialog's close event does the rest. Unmounting it while open instead
  // would drop focus to the page.
  const close = () => dialog.current?.close()
  const closeOnBackdrop = (event: { target: EventTarget; currentTarget: EventTarget }) => {
    if (event.target === event.currentTarget) close()
  }

  return (
    <dialog
      ref={dialog}
      aria-label={shot.caption}
      onClose={onClose}
      onClick={closeOnBackdrop}
      className='fixed inset-0 m-0 size-full max-h-none max-w-none overflow-y-auto bg-background/95 p-0 text-foreground backdrop:bg-transparent'
    >
      <div onClick={closeOnBackdrop} className='flex min-h-full flex-col items-center justify-center p-3 pt-16 sm:p-8 sm:pt-16'>
        <button
          type='button'
          aria-label='Close'
          onClick={close}
          className='fixed top-3 right-3 z-10 inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/90 text-foreground transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
        >
          <X aria-hidden='true' className='size-5' />
        </button>
        <figure className='w-full max-w-[1600px]'>
          {/* Fit to the width on a phone (pinch to zoom in); on a larger screen the whole
              picture fits the screen, and a phone shot keeps its own narrow width. */}
          <img
            src={screenshotSrc(shot, assetBase)}
            width={shot.width}
            height={shot.height}
            alt={shot.alt}
            className={cn(
              'mx-auto h-auto w-full rounded-lg border border-border/60 bg-background sm:w-auto sm:max-w-full sm:max-h-[calc(100svh-11rem)]',
              phone && 'max-w-sm',
            )}
          />
          <figcaption className='mx-auto mt-4 max-w-2xl text-center'>
            <p className='text-sm font-medium text-foreground'>{shot.caption}</p>
            <p className='mt-1 text-sm leading-relaxed text-pretty text-muted-foreground'>{shot.alt}</p>
          </figcaption>
        </figure>
      </div>
    </dialog>
  )
}
