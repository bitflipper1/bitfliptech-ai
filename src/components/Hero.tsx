import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { hero } from '../data/content'
import { useDecode } from './useDecode'
import './Hero.css'

const ParticleField = lazy(() => import('./ParticleField'))

export default function Hero() {
  const line1 = useDecode(hero.headline[0], 300)
  const line2 = useDecode(hero.headline[1], 900)

  return (
    <header className="hero">
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
      <div className="hero-inner">
        <p className="mono">{hero.eyebrow}</p>
        <h1 aria-label={hero.headline.join(' ')}>
          <span aria-hidden="true">{line1 || ' '}</span>
          <span aria-hidden="true" className="hero-grad">
            {line2 || ' '}
          </span>
        </h1>
        <p className="hero-sub">{hero.sub}</p>
        <div className="hero-cta">
          <Link to={hero.ctaPrimary.href} className="btn btn-solid">
            {hero.ctaPrimary.label}
          </Link>
          <Link to={hero.ctaSecondary.href} className="btn btn-ghost">
            {hero.ctaSecondary.label}
          </Link>
        </div>
      </div>
      <div className="hero-scroll mono">scroll</div>
    </header>
  )
}
