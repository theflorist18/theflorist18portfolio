import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Page from '../components/Page.jsx'
import Sparkle from '../components/Sparkle.jsx'

export default function NotFound() {
  return (
    <Page>
      <section className="min-h-[100svh] flex flex-col items-center justify-center text-center shell">
        <span className="text-gold mb-8">
          <Sparkle size={26} />
        </span>
        <p className="eyebrow text-faint mb-6">Error 404</p>
        <h1 className="display-lg mb-6">Nothing here</h1>
        <p className="lead max-w-[40ch] mb-12">
          This page drifted out of frame. Let us get you back to the work.
        </p>
        <Link to="/" className="btn">
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back home
        </Link>
      </section>
    </Page>
  )
}
