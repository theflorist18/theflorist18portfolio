import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { LenisProvider } from './lib/Lenis.jsx'
import Nav from './components/Nav.jsx'
import Cursor from './components/Cursor.jsx'
import DrivingCar from './components/DrivingCar.jsx'
import Home from './pages/Home.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import NotFound from './pages/NotFound.jsx'

// Derive the router basename from Vite's base ('/theflorist18portfolio/').
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

// Full-page 3D background car — home page only.
function BackgroundCar() {
  const { pathname } = useLocation()
  return pathname === '/' ? <DrivingCar /> : null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={basename}>
        <LenisProvider>
          <Cursor />
          <BackgroundCar />
          <Nav />
          <AnimatedRoutes />
        </LenisProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
