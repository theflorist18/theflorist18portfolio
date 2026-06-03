import { marquee } from '../content/portfolio.js'
import Sparkle from './Sparkle.jsx'

export default function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="relative border-y border-line py-5 overflow-hidden select-none" aria-hidden="true">
      <div className="marquee">
        {items.map((word, i) => (
          <span key={i} className="flex items-center">
            <span
              className="eyebrow whitespace-nowrap px-7"
              style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}
            >
              {word}
            </span>
            <span style={{ color: 'var(--gold-soft)' }}>
              <Sparkle size={9} />
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
