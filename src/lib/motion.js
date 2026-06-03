// Shared motion language — slow, deliberate, premium deceleration.
export const EASE = [0.22, 1, 0.36, 1] // easeOutExpo
export const EASE_OUT = [0.16, 1, 0.3, 1]

export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export const stagger = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// Masked line reveal — text rises from behind an overflow-hidden clip.
export const lineMask = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 1.05, ease: EASE } },
}
