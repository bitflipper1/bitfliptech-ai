import { useEffect } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Lab from './components/Lab'
import Timeline from './components/Timeline'
import CapabilityMap from './components/CapabilityMap'
import { Services, StoryIntro, Process, Contact } from './components/Sections'

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
    <div id="top">
      <Nav />
      <Hero />
      <main>
        <Services />
        <StoryIntro />
        <Timeline />
        <Lab />
        <CapabilityMap />
        <Process />
        <Contact />
      </main>
    </div>
  )
}
