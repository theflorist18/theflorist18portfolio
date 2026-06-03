import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { hero, profile } from '../content/portfolio.js'
import { EASE, stagger, fadeUp, lineMask } from '../lib/motion.js'
import { useLenis } from '../lib/Lenis.jsx'
import Magnetic from './Magnetic.jsx'
import Sparkle from './Sparkle.jsx'

export default function Hero() {
  const { scrollTo } = useLenis()
  const reduce = useReducedMotion()
  const lines = hero.headline.split('\n')

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* slow-rotating background sparkle — atmosphere */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12vw] top-[14vh] hidden sm:block"
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 2, ease: EASE, delay: 0.3 }}
      >
        <motion.div
          animate={reduce ? undefined : { rotate: 360 }}
          transition={reduce ? undefined : { duration: 90, ease: 'linear', repeat: Infinity }}
          style={{ color: 'rgba(200,169,106,0.07)' }}
        >
          <Sparkle size={520} />
        </motion.div>
      </motion.div>

      <div className="shell w-full relative z-10">
        <motion.div variants={stagger(0.12, 0.1)} initial="hidden" animate="show">
          {/* eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8 md:mb-10">
            <span className="text-gold">
              <Sparkle size={12} />
            </span>
            <p className="eyebrow">{hero.eyebrow}</p>
            <span className="h-px w-10 bg-line hidden sm:block" />
            <p className="eyebrow text-faint hidden sm:block">{profile.location}</p>
          </motion.div>

          {/* headline with masked line reveals */}
          <motion.h1 variants={stagger(0.1)} className="display-xl mb-10 md:mb-12">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineMask} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* lower row: subhead + actions */}
          <motion.div
            variants={stagger(0.1)}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end"
          >
            <motion.p variants={fadeUp} className="lead md:col-span-6 max-w-[44ch]">
              {hero.subhead}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="md:col-span-6 flex flex-col items-start md:items-end gap-5"
            >
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic strength={0.4}>
                  <button onClick={() => scrollTo('#work')} className="btn btn--solid">
                    {hero.ctaPrimary}
                    <ArrowDown size={16} strokeWidth={1.5} />
                  </button>
                </Magnetic>
                <button onClick={() => scrollTo('#about')} className="btn">
                  {hero.ctaSecondary}
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </button>
              </div>
              <p className="eyebrow text-faint">{hero.micro}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollTo('#work')}
        aria-label="Scroll to work"
        className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 text-faint hover:text-gold transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="eyebrow" style={{ fontSize: '0.62rem' }}>
          Scroll
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 7, 0] }}
          transition={reduce ? undefined : { duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
        >
          <ArrowDown size={16} strokeWidth={1.25} />
        </motion.span>
      </motion.button>
    </section>
  )
}
