import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

// A single editorial row in the Selected Work list.
export default function ProjectCard({ study, index, onEnter, onMove, onLeave }) {
  return (
    <li
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group border-t border-line last:border-b"
    >
      <Link
        to={`/work/${study.slug}`}
        data-cursor
        className="block transition-colors duration-500 hover:bg-white/[0.015]"
        aria-label={`${study.title} — ${study.category}`}
      >
        <div className="shell grid grid-cols-12 items-center gap-y-3 gap-x-4 py-8 md:py-10 transition-[padding] duration-500 md:group-hover:pl-4">
          <span className="col-span-3 md:col-span-1 eyebrow text-faint">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="col-span-9 md:col-span-6">
            <h3
              className="font-display leading-[0.98] transition-colors duration-300 group-hover:text-gold"
              style={{ fontSize: 'clamp(1.9rem, 1.2rem + 2.4vw, 3.1rem)', fontWeight: 360 }}
            >
              {study.title}
            </h3>
            <p className="text-dim text-sm mt-2.5 max-w-[46ch] leading-relaxed">
              {study.tagline}
            </p>
          </div>

          <span
            className="hidden md:block md:col-span-3 eyebrow text-dim"
            style={{ letterSpacing: '0.16em' }}
          >
            {study.category}
          </span>

          <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-5">
            <span className="eyebrow text-faint hidden sm:block">{study.year}</span>
            <span className="text-dim transition-all duration-500 ease-expo group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight size={24} strokeWidth={1.25} />
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}
