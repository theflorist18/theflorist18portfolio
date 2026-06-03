import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useLenis } from '../lib/Lenis.jsx'
import { profile } from '../content/portfolio.js'
import { EASE } from '../lib/motion.js'
import Sparkle from './Sparkle.jsx'

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollTo } = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const goTo = (id) => {
    setOpen(false)
    if (location.pathname === '/') {
      scrollTo('#' + id)
    } else {
      navigate('/', { state: { section: id } })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'bg-[rgba(10,10,11,0.72)] backdrop-blur-md border-b border-line'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex items-center justify-between" style={{ height: '4.75rem' }}>
          <Link
            to="/"
            onClick={() => location.pathname === '/' && scrollTo(0)}
            className="flex items-center gap-2.5 group"
            aria-label={`${profile.name} — home`}
          >
            <span className="text-gold transition-transform duration-700 ease-expo group-hover:rotate-[135deg]">
              <Sparkle size={15} />
            </span>
            <span className="font-display text-[1.12rem] tracking-tight">{profile.name}</span>
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => goTo(s.id)}
                className="eyebrow hover:text-gold transition-colors duration-300"
                style={{ letterSpacing: '0.18em' }}
              >
                {s.label}
              </button>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="btn"
              style={{ padding: '0.7em 1.2em', fontSize: '0.72rem' }}
            >
              Get in touch
            </a>
          </div>

          <button
            className="md:hidden text-ink p-2 -mr-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex flex-col gap-[6px] items-end">
              <span
                className={`block h-px bg-current transition-all duration-300 ${
                  open ? 'w-6 translate-y-[7px] rotate-45' : 'w-6'
                }`}
              />
              <span
                className={`block h-px bg-current transition-all duration-300 ${
                  open ? 'opacity-0' : 'w-4'
                }`}
              />
              <span
                className={`block h-px bg-current transition-all duration-300 ${
                  open ? 'w-6 -translate-y-[7px] -rotate-45' : 'w-5'
                }`}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg md:hidden flex flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="shell flex flex-col gap-1">
              {SECTIONS.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => goTo(s.id)}
                  className="font-display display-md text-left py-2 hover:text-gold transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.12, duration: 0.6, ease: EASE }}
                >
                  {s.label}
                </motion.button>
              ))}
              <motion.a
                href={`mailto:${profile.email}`}
                className="eyebrow eyebrow--gold mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
              >
                {profile.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
