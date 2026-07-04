import { lazy, Suspense } from 'react'
import './Hero.css'

const ParticleField = lazy(() => import('./ParticleField'))

export default function Hero() {
  return (
    <header className="hero">
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
      <div className="hero-inner">
        <p className="mono">bitfliptech.ai — est. 2009, reborn ai-native</p>
        <h1>
          Chart the <span className="hero-grad">Digital Frontier</span>
        </h1>
        <p className="hero-sub">
          Strategic digital design and AI storytelling for authentic connection.
        </p>
        <div className="hero-cta">
          <a href="#timeline" className="btn btn-solid">
            17 years in 60 seconds
          </a>
          <a href="#contact" className="btn btn-ghost">
            Start a project
          </a>
        </div>
      </div>
      <div className="hero-scroll mono">scroll</div>
    </header>
  )
}
