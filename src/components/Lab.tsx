import { lab } from '../data/content'
import './Lab.css'

export default function Lab() {
  return (
    <section id="lab" className="section grid-line">
      <div className="section-head">
        <p className="mono">Featured work / experiments</p>
        <h2>The Lab</h2>
      </div>
      <div className="lab-grid">
        {lab.map((item) => (
          <article key={item.title} className="lab-card">
            <p className="mono lab-tag">{item.tag}</p>
            <h3 data-text={item.title}>{item.title}</h3>
            <p className="lab-blurb">{item.blurb}</p>
            <span className="mono lab-cta">view concept →</span>
          </article>
        ))}
      </div>
    </section>
  )
}
