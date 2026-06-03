import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useScroll, useReducedMotion } from 'motion/react'
import Reveal from './Reveal.jsx'
import Sparkle from './Sparkle.jsx'
import CarPoster from './CarPoster.jsx'

// Heavy 3D libs (three / r3f / drei) load in their own chunk, only when needed.
const Car3DScene = lazy(() => import('./Car3DScene.jsx'))

function canRender3D() {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    const gl = window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))
    if (!gl) return false
  } catch {
    return false
  }
  // Degrade to the static poster on clearly constrained devices.
  const conn = navigator.connection
  if (conn && conn.saveData) return false
  if (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory < 4) return false
  return true
}

export default function CarShowcase() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [inView, setInView] = useState(false)
  const [canWebGL] = useState(canRender3D)

  // Drive the scene from this section's scroll progress (0 entering -> 1 leaving).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: '300px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const use3D = !reduce && canWebGL

  return (
    <section
      ref={ref}
      aria-label="Interactive 3D — scroll to drive"
      className="relative overflow-hidden border-t border-line py-16 md:py-24"
    >
      {/* spotlight backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 50% 45%, rgba(200,169,106,0.10), transparent 70%)',
        }}
      />

      <div className="shell relative">
        <Reveal className="flex items-end justify-between gap-6 mb-8 md:mb-10">
          <div>
            <p className="eyebrow eyebrow--gold mb-4 flex items-center gap-2.5">
              <Sparkle size={11} />
              In motion
            </p>
            <h2 className="display-md max-w-[16ch]">Built in the browser</h2>
          </div>
          <p className="eyebrow text-faint hidden md:block max-w-[22ch] text-right leading-relaxed">
            {use3D ? 'Real-time 3D · scroll to drive' : 'Real-time 3D (motion reduced)'}
          </p>
        </Reveal>
      </div>

      {/* stage */}
      <div className="relative w-full h-[58vh] min-h-[360px] max-h-[640px]">
        {use3D ? (
          <Suspense fallback={<CarPoster subtle />}>
            {inView ? <Car3DScene progress={scrollYProgress} /> : <CarPoster subtle />}
          </Suspense>
        ) : (
          <CarPoster />
        )}
      </div>
    </section>
  )
}
