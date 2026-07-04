import { useEffect, useState } from 'react'

const GLYPHS = '01'

/** Scramble text through 0s and 1s, resolving left to right. */
export function useDecode(text: string, delayMs = 0, stepMs = 28) {
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text)
      return
    }
    let frame = 0
    let raf = 0
    let last = 0
    let started = false
    const start = performance.now() + delayMs

    const tick = (now: number) => {
      if (now < start) {
        setOut('')
        raf = requestAnimationFrame(tick)
        return
      }
      if (!started) {
        started = true
        last = now
      }
      if (now - last >= stepMs) {
        frame++
        last = now
      }
      const resolved = Math.floor(frame / 2)
      const next = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ' || i < resolved) return ch
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')
      setOut(next)
      if (resolved < text.length) raf = requestAnimationFrame(tick)
      else setOut(text)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delayMs, stepMs])

  return out
}
