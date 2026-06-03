import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Page from '../components/Page.jsx'
import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Work from '../components/Work.jsx'
import CarShowcase from '../components/CarShowcase.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import { useLenis } from '../lib/Lenis.jsx'
import { seo } from '../content/portfolio.js'

export default function Home() {
  const location = useLocation()
  const { scrollTo } = useLenis()

  useEffect(() => {
    document.title = seo.title
    const target = location.state?.section || (location.hash ? location.hash.replace('#', '') : null)
    if (target) {
      const t = setTimeout(() => scrollTo('#' + target, { duration: 1 }), 360)
      return () => clearTimeout(t)
    }
    scrollTo(0, { immediate: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Page>
      <Hero />
      <Marquee />
      <Work />
      <CarShowcase />
      <About />
      <Contact />
      <Footer />
    </Page>
  )
}
