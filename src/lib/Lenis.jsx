import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function LenisProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReduced()) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis

    let raf = 0
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = useCallback((target, options = {}) => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2, ...options })
      return
    }
    // Fallback (reduced motion / before init)
    const behavior = prefersReduced() ? 'auto' : 'smooth'
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior })
      return
    }
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior })
    }
  }, [])

  const stop = useCallback(() => lenisRef.current && lenisRef.current.stop(), [])
  const start = useCallback(() => lenisRef.current && lenisRef.current.start(), [])

  return (
    <LenisContext.Provider value={{ scrollTo, stop, start, lenisRef }}>
      {children}
    </LenisContext.Provider>
  )
}

export const useLenis = () =>
  useContext(LenisContext) || { scrollTo: () => {}, stop: () => {}, start: () => {} }
