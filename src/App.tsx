import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Console from './components/Console'
import Home from './pages/Home'
import LabPage from './pages/LabPage'
import ArchivePage from './pages/ArchivePage'
import SensorSim from './pages/SensorSim'
import SafetySim from './pages/SafetySim'
import ServicesPage from './pages/ServicesPage'
import About from './pages/About'
import ContactPage from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1 })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      <Nav />
      <Console />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/lab/sensors" element={<SensorSim />} />
        <Route path="/lab/safety" element={<SafetySim />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
