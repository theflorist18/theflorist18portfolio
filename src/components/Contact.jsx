import { ArrowUpRight } from 'lucide-react'
import { contact, profile } from '../content/portfolio.js'
import Reveal from './Reveal.jsx'
import Sparkle from './Sparkle.jsx'
import Magnetic from './Magnetic.jsx'

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 scroll-mt-20 border-t border-line">
      <div className="shell">
        <Reveal>
          <p className="eyebrow eyebrow--gold mb-8 flex items-center gap-2.5">
            <Sparkle size={11} />
            {contact.heading}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display-lg max-w-[16ch]">{contact.line}</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col gap-10">
          <Magnetic strength={0.35}>
            <a
              href={profile.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--solid"
              data-cursor
            >
              {contact.ctaLabel}
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </Magnetic>

          {/* the email, large */}
          <a
            href={`mailto:${profile.email}`}
            data-cursor
            className="group inline-flex items-center gap-3 font-display w-fit"
            style={{ fontSize: 'clamp(1.5rem, 1rem + 2.4vw, 3rem)', fontWeight: 340 }}
          >
            <span className="link" style={{ color: 'inherit' }}>
              {profile.email}
            </span>
            <ArrowUpRight
              className="text-gold transition-transform duration-500 ease-expo group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
              size={30}
              strokeWidth={1.25}
            />
          </a>
        </Reveal>

        {/* social row */}
        <Reveal delay={0.1} className="mt-16 flex flex-wrap gap-x-10 gap-y-4">
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link eyebrow">
            LinkedIn ↗
          </a>
          <a href={profile.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="link eyebrow">
            WhatsApp ↗
          </a>
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="link eyebrow">
            GitHub ↗
          </a>
          <a href={profile.socials.security} target="_blank" rel="noopener noreferrer" className="link eyebrow">
            Security research ↗
          </a>
        </Reveal>
      </div>
    </section>
  )
}
