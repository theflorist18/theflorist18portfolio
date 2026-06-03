import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { studies } from '../content/portfolio.js'
import ProjectCard from './ProjectCard.jsx'
import Reveal from './Reveal.jsx'
import Sparkle from './Sparkle.jsx'

export default function Work() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const px = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 })
  const py = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 })

  const onMove = (e) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return (
    <section id="work" className="relative py-24 md:py-36 scroll-mt-20">
      <div className="shell">
        <Reveal className="flex items-end justify-between mb-12 md:mb-20">
          <div>
            <p className="eyebrow eyebrow--gold mb-5 flex items-center gap-2.5">
              <Sparkle size={11} />
              Selected work
            </p>
            <h2 className="display-lg">Selected work</h2>
          </div>
          <span className="eyebrow text-faint hidden md:block">
            {String(studies.length).padStart(2, '0')} — projects
          </span>
        </Reveal>
      </div>

      <ul onMouseLeave={() => setActive(null)}>
        {studies.map((study, i) => (
          <ProjectCard
            key={study.slug}
            study={study}
            index={i}
            onEnter={() => setActive(i)}
            onMove={onMove}
          />
        ))}
      </ul>

      {/* floating cursor-follow preview (desktop, motion-on) */}
      {!reduce && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-30 hidden lg:block"
          style={{ x: px, y: py }}
          aria-hidden="true"
        >
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                style={{ marginLeft: -160, marginTop: -110 }}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.82 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="w-[320px] h-[212px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative"
                  style={{
                    background: `radial-gradient(120% 130% at 28% 18%, ${studies[active].accent}, #0a0a0b 78%)`,
                  }}
                >
                  <div className="absolute top-5 right-5 text-white/70">
                    <Sparkle size={16} />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="eyebrow text-white/70">{studies[active].category}</span>
                    <p className="font-display text-3xl text-white mt-1">{studies[active].title}</p>
                    <p className="eyebrow text-white/80 mt-2">View case study →</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}
