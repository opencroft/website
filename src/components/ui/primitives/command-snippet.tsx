import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from 'cn'

export interface CommandSnippetProps {
  command: string
  /** The box's title, e.g. "Run it on your server". */
  label: string
  /** One line under the box, e.g. what to do once the command runs. */
  note?: ReactNode
  className?: string
}

type CopyState = 'idle' | 'copied' | 'selected'

export function CommandSnippet({ command, label, note, className }: CommandSnippetProps) {
  const code = useRef<HTMLElement>(null)
  const pre = useRef<HTMLPreElement>(null)
  const [state, setState] = useState<CopyState>('idle')
  // Text cut off at the right edge: a fade there says the box scrolls sideways.
  const [more, setMore] = useState(false)

  useEffect(() => {
    const el = pre.current
    if (!el) return
    const measure = () => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    observer?.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      observer?.disconnect()
    }
  }, [command])

  useEffect(() => {
    if (state === 'idle') return
    const timer = setTimeout(() => setState('idle'), 2500)
    return () => clearTimeout(timer)
  }, [state])

  // Select the command so it can be copied by hand when the clipboard is refused.
  const select = () => {
    const el = code.current
    const selection = window.getSelection()
    if (!el || !selection) return
    const range = document.createRange()
    range.selectNodeContents(el)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setState('copied')
    } catch {
      select()
      setState('selected')
    }
  }

  return (
    <div className={cn('min-w-0', className)}>
      <div className='overflow-hidden rounded-xl text-left border border-border bg-card/80 shadow-lg shadow-black/30'>
        <div className='flex items-center justify-between gap-3 border-b border-border/70 py-1.5 pr-1.5 pl-4'>
          <span className='min-w-0 truncate text-xs font-medium text-muted-foreground'>{label}</span>
          <button
            type='button'
            onClick={copy}
            className='inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
          >
            {state === 'copied' ? (
              <Check aria-hidden='true' className='size-3.5 text-blue-400' />
            ) : (
              <Copy aria-hidden='true' className='size-3.5' />
            )}
            <span aria-live='polite'>
              {state === 'copied' ? 'Copied' : state === 'selected' ? 'Selected: press Ctrl+C' : 'Copy'}
            </span>
          </button>
        </div>
        <div className='relative'>
          {/* Where the command fits it stays on its line; where it doesn't (a phone) it
              wraps at its spaces, never inside a word, so all of it is in view. Only a
              word longer than the box scrolls. */}
          <pre
            ref={pre}
            className='overflow-x-auto px-3 py-3.5 font-mono text-xs leading-relaxed whitespace-pre-wrap text-foreground sm:px-4 sm:text-sm'
          >
            <code ref={code}>
              {/* Each word unbreakable, so a line ends only at a space: a path or an image
                  name never splits at its hyphen or slash. */}
              {command.split(/(\s+)/).map((part, i) =>
                !part || /^\s+$/.test(part) ? (
                  part
                ) : (
                  <span key={i} className='whitespace-nowrap'>
                    {part}
                  </span>
                ),
              )}
            </code>
          </pre>
          {more && (
            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-card to-transparent'
            />
          )}
        </div>
      </div>
      {note && <p className='mt-3 text-sm leading-relaxed text-pretty text-muted-foreground'>{note}</p>}
    </div>
  )
}
