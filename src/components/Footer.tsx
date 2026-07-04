import { contact } from '../data/content'
import './Sections.css'

export default function Footer() {
  return (
    <footer className="footer footer-global">
      <p className="mono footer-copy">© {new Date().getFullYear()} bitfliptech.ai</p>
      <nav className="footer-socials">
        {contact.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
