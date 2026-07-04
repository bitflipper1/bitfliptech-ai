import { services, process, contact } from '../data/content'
import './Sections.css'

export function Services() {
  return (
    <section id="services" className="section grid-line">
      <div className="section-head">
        <p className="mono">What we do</p>
        <h2>We ♥ well-designed apps and AI.</h2>
      </div>
      <div className="svc-grid">
        {services.map((s) => (
          <article key={s.tag} className="svc-card">
            <p className="mono">{s.tag}</p>
            <h3>{s.title}</h3>
            <p>{s.blurb}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section id="process" className="section grid-line">
      <div className="section-head">
        <p className="mono">How we work</p>
        <h2>Four steps. No mystery.</h2>
      </div>
      <ol className="proc-list">
        {process.map((p, i) => (
          <li key={p.step}>
            <span className="mono">0{i + 1}</span>
            <h3>{p.step}</h3>
            <p>{p.blurb}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section grid-line contact">
      <p className="mono">Next chapter</p>
      <h2>
        Your brand belongs on <span className="contact-grad">the timeline.</span>
      </h2>
      <div className="contact-links">
        <a href={`mailto:${contact.email}`} className="btn btn-solid">
          {contact.email}
        </a>
        <a href={`tel:${contact.phone.replace(/-/g, '')}`} className="btn btn-ghost">
          {contact.phone}
        </a>
      </div>
      <footer className="footer">
        <p className="mono footer-copy">© {new Date().getFullYear()} bitfliptech.ai</p>
        <nav className="footer-socials">
          {contact.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </nav>
      </footer>
    </section>
  )
}
