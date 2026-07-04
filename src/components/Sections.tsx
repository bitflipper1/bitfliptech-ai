import { Link } from 'react-router-dom'
import { services, process, contact, story } from '../data/content'
import ContactForm from './ContactForm'
import './Sections.css'

export function Services({ detailed = false }: { detailed?: boolean }) {
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
            {detailed && (
              <ul className="svc-details">
                {s.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
      {!detailed && (
        <p className="svc-more">
          <Link to="/services" className="mono">
            full service breakdown →
          </Link>
        </p>
      )}
    </section>
  )
}

export function StoryIntro() {
  return (
    <section id="story" className="section grid-line story">
      <p className="mono">{story.eyebrow}</p>
      <h2>{story.headline}</h2>
      <p className="story-intro">{story.intro}</p>
      <p className="story-intro story-teaching">{story.teaching}</p>
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

export function CtaBanner() {
  return (
    <section className="section grid-line contact">
      <p className="mono">Next chapter</p>
      <h2>{contact.headline}</h2>
      <p className="contact-sub">{contact.sub}</p>
      <div className="contact-links">
        <Link to="/contact" className="btn btn-solid">
          Start a project
        </Link>
        <a
          href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.bookSubject)}`}
          className="btn btn-ghost"
        >
          Book a working session
        </a>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <p className="mono">Project inquiry / consulting / collaboration</p>
      <h2>{contact.headline}</h2>
      <p className="contact-sub">{contact.sub}</p>
      <ContactForm />
      <div className="contact-links contact-links-alt">
        <a href={`mailto:${contact.email}`} className="mono">
          {contact.email}
        </a>
        <a href={`tel:${contact.phone.replace(/-/g, '')}`} className="mono">
          {contact.phone}
        </a>
        <a
          href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.bookSubject)}`}
          className="mono"
        >
          Book a working session
        </a>
      </div>
    </section>
  )
}
