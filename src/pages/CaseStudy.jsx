import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Page from '../components/Page.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import Sparkle from '../components/Sparkle.jsx'
import { studies, getStudy, studyIndexBySlug, profile } from '../content/portfolio.js'
import { useLenis } from '../lib/Lenis.jsx'
import NotFound from './NotFound.jsx'

function Block({ label, items, accent }) {
  return (
    <Reveal as="section" className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 py-10 md:py-14 border-t border-line">
      <div className="md:col-span-3">
        <p className="eyebrow flex items-center gap-2.5 md:sticky md:top-28">
          <span style={{ color: accent }}>
            <Sparkle size={9} />
          </span>
          {label}
        </p>
      </div>
      <div className="md:col-span-9 flex flex-col gap-5 max-w-[70ch]">
        {items.map((p, i) => (
          <p
            key={i}
            className="leading-relaxed"
            style={{ fontSize: 'clamp(1.05rem, 1rem + 0.4vw, 1.22rem)', color: 'var(--text)' }}
          >
            {p}
          </p>
        ))}
      </div>
    </Reveal>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const study = getStudy(slug)
  const { scrollTo } = useLenis()

  useEffect(() => {
    if (study) {
      document.title = `${study.title} — ${profile.name}`
      scrollTo(0, { immediate: true })
    }
  }, [study, scrollTo])

  if (!study) return <NotFound />

  const accent = study.accent
  const idx = studyIndexBySlug(slug)
  const next = studies[(idx + 1) % studies.length]

  return (
    <Page>
      <article style={{ '--accent': accent }}>
        {/* hero */}
        <header className="shell pt-32 md:pt-40 pb-10">
          <Reveal>
            <Link
              to="/"
              state={{ section: 'work' }}
              className="inline-flex items-center gap-2 eyebrow text-dim hover:text-gold transition-colors mb-12"
            >
              <ArrowLeft size={15} strokeWidth={1.5} />
              All work
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-7">
            <span className="eyebrow" style={{ color: accent }}>
              {study.category}
            </span>
            <span className="h-px w-8 bg-line" />
            <span className="eyebrow text-faint">{study.year}</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="display-xl mb-8" style={{ fontSize: 'clamp(3rem, 1.5rem + 7vw, 8rem)' }}>
              {study.title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="lead max-w-[52ch]">{study.tagline}</p>
          </Reveal>
        </header>

        {/* cover visual (accent gradient placeholder — swap for a real hero image) */}
        <Reveal delay={0.05} className="shell">
          <div
            className="relative w-full rounded-2xl md:rounded-3xl border border-line overflow-hidden"
            style={{
              aspectRatio: '16 / 8',
              background: `radial-gradient(110% 130% at 24% 14%, ${accent}, #0a0a0b 76%)`,
            }}
          >
            <div className="absolute top-6 right-6 text-white/60">
              <Sparkle size={22} />
            </div>
            <div className="absolute bottom-6 left-6">
              <span className="eyebrow text-white/70">{study.title} — overview</span>
            </div>
          </div>
        </Reveal>

        {/* meta + summary */}
        <div className="shell grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 py-16 md:py-20">
          <div className="md:col-span-3 flex flex-col gap-8">
            <div>
              <p className="eyebrow text-faint mb-3">Role</p>
              <ul className="flex flex-col gap-1.5">
                {study.role.map((r) => (
                  <li key={r} className="text-dim text-sm">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-faint mb-3">Tools</p>
              <div className="flex flex-wrap gap-2">
                {study.tools.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-9">
            <p
              className="font-display leading-snug max-w-[28ch]"
              style={{ fontSize: 'clamp(1.6rem, 1.1rem + 1.8vw, 2.6rem)', fontWeight: 350 }}
            >
              {study.summary}
            </p>
          </div>
        </div>

        {/* metrics */}
        <div className="shell">
          <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {study.metrics.map((m) => (
              <div key={m.label} className="bg-bg p-6 md:p-8">
                <p className="font-display" style={{ fontSize: 'clamp(1.8rem, 1.2rem + 1.6vw, 2.8rem)', color: accent }}>
                  {m.value}
                </p>
                <p className="eyebrow text-dim mt-3 leading-snug" style={{ letterSpacing: '0.1em' }}>
                  {m.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* narrative */}
        <div className="shell mt-16 md:mt-24">
          <Block label="Problem" items={study.problem} accent={accent} />
          <Block label="Research" items={study.research} accent={accent} />
          <Block label="Process" items={study.process} accent={accent} />
          <Block label="Solution" items={study.solution} accent={accent} />
          <Block label="Impact" items={study.impact} accent={accent} />
          <Block label="Reflection" items={study.reflection} accent={accent} />

          {/* deliverables */}
          <Reveal as="section" className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 py-10 md:py-14 border-t border-line">
            <div className="md:col-span-3">
              <p className="eyebrow flex items-center gap-2.5">
                <span style={{ color: accent }}>
                  <Sparkle size={9} />
                </span>
                Deliverables
              </p>
            </div>
            <ul className="md:col-span-9 grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-[70ch]">
              {study.deliverables.map((d) => (
                <li key={d} className="text-dim flex gap-3 leading-relaxed">
                  <span style={{ color: accent }} className="mt-2 shrink-0">
                    <span className="block w-1.5 h-1.5 rounded-full bg-current" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* next project */}
        <Link to={`/work/${next.slug}`} className="group block mt-12 border-t border-line" data-cursor>
          <div className="shell py-16 md:py-24 flex flex-col items-center text-center">
            <p className="eyebrow text-faint mb-5">Next project</p>
            <h2
              className="font-display transition-colors duration-300 group-hover:text-gold"
              style={{ fontSize: 'clamp(2.4rem, 1.4rem + 4vw, 5rem)', fontWeight: 350 }}
            >
              {next.title}
            </h2>
            <span className="mt-6 inline-flex items-center gap-2 eyebrow text-dim group-hover:text-gold transition-colors">
              View case study
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </div>
        </Link>

        <Footer />
      </article>
    </Page>
  )
}
