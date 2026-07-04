import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import { Services, Process, Contact } from './components/Sections'

export default function App() {
  useEffect(() => {
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
      <Hero />
      <main>
        <Timeline />
        <Services />
        <Process />
        <Contact />
      </main>
    </>
  )
}
