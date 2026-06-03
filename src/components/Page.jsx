import { motion } from 'motion/react'

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.32, ease: 'easeInOut' } },
}

export default function Page({ children, className = '' }) {
  return (
    <motion.main variants={variants} initial="initial" animate="animate" exit="exit" className={className}>
      {children}
    </motion.main>
  )
}
