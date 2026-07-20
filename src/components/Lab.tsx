import { Link } from 'react-router-dom'
import { lab } from '../data/content'
import './Lab.css'

export default function Lab() {
  return (
    <section id="lab" className="section grid-line">
      <div className="section-head">
        <p className="mono">Featured work / experiments</p>
        <h2>The Lab</h2>
        <p className="lab-note">
          Cards marked <span className="mono lab-live-mark">● live</span> are operable —
          real simulations, not screenshots.
        </p>
      </div>
      <div className="lab-grid">
        {lab.map((item) => (
          <article key={item.title} className={`lab-card ${item.run ? 'lab-card-live' : ''}`}>
            <p className="mono lab-tag">
              {item.tag}
              {item.run && <span className="lab-live-dot"> · ● live</span>}
            </p>
            <h3 data-text={item.title}>{item.title}</h3>
            <p className="lab-blurb">{item.blurb}</p>
            {item.run ? (
              <Link to={item.run} className="mono lab-cta lab-cta-live">
                run simulation →
              </Link>
            ) : (
              <span className="mono lab-cta lab-cta-fab">in fabrication · next release</span>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
