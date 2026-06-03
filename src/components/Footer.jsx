import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { profile } from '../content/portfolio.js'
import { useLenis } from '../lib/Lenis.jsx'
import Sparkle from './Sparkle.jsx'

export default function Footer() {
  const { scrollTo } = useLenis()
  const location = useLocation()
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  const goTo = (id) => {
    if (location.pathname === '/') scrollTo('#' + id)
    else navigate('/', { state: { section: id } })
  }

  return (
    <footer className="border-t border-line pt-16 pb-10">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-gold">
                <Sparkle size={14} />
              </span>
              <span className="font-display text-xl">{profile.name}</span>
            </div>
            <p className="text-dim text-sm max-w-[34ch]">
              {profile.role}. Currently {profile.location.toLowerCase()}.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-faint mb-4">Navigate</p>
            <ul className="flex flex-col gap-2.5">
              {['work', 'about', 'contact'].map((id) => (
                <li key={id}>
                  <button onClick={() => goTo(id)} className="link text-sm text-dim capitalize">
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-faint mb-4">Elsewhere</p>
            <ul className="flex flex-col gap-2.5 text-sm text-dim">
              <li>
                <a href={`mailto:${profile.email}`} className="link">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="link">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={profile.socials.security} target="_blank" rel="noopener noreferrer" className="link">
                  Security research ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="eyebrow text-faint" style={{ fontSize: '0.62rem' }}>
            © {year} {profile.name} — Designed & built by Netsakh
          </p>
          <p className="eyebrow text-faint hidden md:block" style={{ fontSize: '0.62rem' }}>
            Fraunces &amp; General Sans · Vite · React · Motion
          </p>
          <button
            onClick={() => scrollTo(0)}
            className="group flex items-center gap-2 eyebrow hover:text-gold transition-colors"
            style={{ fontSize: '0.62rem' }}
          >
            Back to top
            <ArrowUp
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-500 group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
