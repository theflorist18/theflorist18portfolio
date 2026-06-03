import { ArrowUpRight } from 'lucide-react'
import { about, skills, profile } from '../content/portfolio.js'
import Reveal from './Reveal.jsx'
import Sparkle from './Sparkle.jsx'

export default function About() {
  const [lead, ...rest] = about.paragraphs

  return (
    <section id="about" className="relative py-24 md:py-36 scroll-mt-20 border-t border-line">
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* prose */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow eyebrow--gold mb-8 flex items-center gap-2.5">
              <Sparkle size={11} />
              {about.heading}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="display-md font-display mb-10 max-w-[20ch]" style={{ fontWeight: 350 }}>
              {lead}
            </p>
          </Reveal>

          <div className="flex flex-col gap-6 max-w-[60ch]">
            {rest.map((p, i) => (
              <Reveal as="p" key={i} delay={0.05 * i} className="text-dim leading-relaxed">
                {p}
              </Reveal>
            ))}
          </div>

          {/* philosophy pull-quote */}
          <Reveal className="mt-12 pl-6 border-l" style={{ borderColor: 'var(--gold-soft)' }}>
            <p
              className="font-display italic leading-snug"
              style={{ fontSize: 'clamp(1.4rem, 1rem + 1.4vw, 2rem)', fontWeight: 340 }}
            >
              {about.philosophy}
            </p>
          </Reveal>
        </div>

        {/* portrait + skills */}
        <div className="lg:col-span-5 lg:col-start-8">
          {/* PORTRAIT — replace this placeholder block with a real photo:
              <img src="/your-portrait.jpg" alt="Netsakh Walewangko" className="w-full rounded-2xl" /> */}
          <Reveal>
            <div className="relative aspect-[4/5] rounded-2xl border border-line overflow-hidden bg-elev">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(90% 80% at 70% 10%, rgba(200,169,106,0.16), transparent 60%), radial-gradient(80% 70% at 10% 100%, rgba(120,110,150,0.1), transparent 60%)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-display select-none"
                  style={{ fontSize: 'clamp(7rem, 18vw, 12rem)', lineHeight: 1, color: 'rgba(237,234,227,0.08)' }}
                >
                  {profile.monogram}
                </span>
              </div>
              <div className="absolute top-5 left-5" style={{ color: 'var(--gold-soft)' }}>
                <Sparkle size={18} />
              </div>
              <div className="absolute bottom-5 left-5">
                <p className="eyebrow text-dim">{profile.name}</p>
                <p className="eyebrow text-faint mt-1" style={{ fontSize: '0.62rem' }}>
                  {profile.role}
                </p>
              </div>
            </div>
          </Reveal>

          {/* skills */}
          <div className="mt-10">
            {skills.map((group, i) => (
              <Reveal key={group.group} delay={0.04 * i} className="py-5 border-t border-line">
                <p className="eyebrow text-faint mb-3">{group.group}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-dim text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {/* cross-link to security portfolio */}
          <Reveal delay={0.05}>
            <a
              href={profile.socials.security}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex items-center justify-between gap-4 py-5 border-t border-line hover:border-[color:var(--gold-soft)] transition-colors"
            >
              <span className="text-dim text-sm group-hover:text-ink transition-colors">
                I also do security research
              </span>
              <span className="text-gold flex items-center gap-1.5 eyebrow">
                el_portafolio
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
