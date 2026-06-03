import { Component, lazy, Suspense } from 'react'
import { useScroll, useReducedMotion } from 'motion/react'

// Heavy 3D libs load in their own chunk.
const DrivingCarScene = lazy(() => import('./DrivingCarScene.jsx'))

function canRender3D() {
  if (typeof window === 'undefined') return false
  try {
    const c = document.createElement('canvas')
    if (!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')))) return false
  } catch {
    return false
  }
  const conn = navigator.connection
  if (conn && conn.saveData) return false
  if (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory < 4) return false
  return true
}

class CanvasErrorBoundary extends Component {
  constructor(p) {
    super(p)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? null : this.props.children
  }
}

// A fixed, full-viewport 3D layer behind all page content. The Porsche drives in
// from the right, slaloms down the page, and speeds off the bottom — driven by
// whole-page scroll progress. Decorative only (pointer-events: none).
export default function DrivingCar() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll() // whole-document progress, 0..1
  const enabled = !reduce && canRender3D()

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ contain: 'strict' }}
    >
      <CanvasErrorBoundary>
        <Suspense fallback={null}>
          <DrivingCarScene progress={scrollYProgress} />
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  )
}
