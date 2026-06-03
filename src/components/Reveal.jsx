import { motion } from 'motion/react'
import { EASE } from '../lib/motion.js'

// Scroll-triggered reveal. Honors reduced motion via MotionConfig at the root.
export default function Reveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  y = 26,
  amount = 0.25,
  once = true,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
