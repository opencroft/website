import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface RevealProps {
  children: ReactNode
  className?: string
  /** Milliseconds to wait before revealing, to stagger items in a row. */
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion, or a browser without the observer: show at once.
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setStill(true)
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={
        still
          ? undefined
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(20px)',
              transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
            }
      }
    >
      {children}
    </div>
  )
}
