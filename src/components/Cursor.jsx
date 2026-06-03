import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

// A small follower dot + a lagging ring that grows over interactive elements.
// Pointer-fine devices only; hidden for touch and reduced-motion.
export default function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 })

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    setEnabled(true)
    document.body.classList.add('has-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const t = e.target.closest && e.target.closest('a, button, [data-cursor]')
      setHovering(Boolean(t))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.body.classList.remove('has-cursor')
    }
    // x, y are stable motion values mutated via .set() in handlers, not read here
  }, [reduce])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.9 : 0.55 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        aria-hidden="true"
      />
    </>
  )
}
