import './Nav.css'

const links = [
  { label: 'Lab', href: '#lab' },
  { label: 'Services', href: '#services' },
  { label: 'Story', href: '#story' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="nav-brand">
        <span className="nav-bit">[01]</span> bitfliptech.ai
      </a>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
