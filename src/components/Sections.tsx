import { services, process, contact, story } from '../data/content'
import './Sections.css'

export function Services() {
  return (
    <section id="services" className="section grid-line">
      <div className="section-head">
        <p className="mono">What BitFlip does</p>
        <h2>Four ways in</h2>
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

export function StoryIntro() {
  return (
    <section id="story" className="section grid-line story">
      <p className="mono">{story.eyebrow}</p>
      <h2>{story.headline}</h2>
      <p className="story-intro">{story.intro}</p>
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
      <h2>{contact.headline}</h2>
      <p className="contact-sub">{contact.sub}</p>
      <div className="contact-links">
        <a href={`mailto:${contact.email}`} className="btn btn-solid">
          {contact.email}
        </a>
        <a
          href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.bookSubject)}`}
          className="btn btn-ghost"
        >
          Book a working session
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
