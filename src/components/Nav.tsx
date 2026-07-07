import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'
import './Nav.css'

const links = [
  { label: 'Lab', to: '/lab' },
  { label: 'Archive', to: '/archive' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        <Logo />
        <span>bitfliptech.ai</span>
      </Link>
      <div className="nav-links">
        {links.map((l) => (
          <NavLink
            key={l.label}
            to={l.to}
            className={({ isActive }: { isActive: boolean }) => (isActive ? 'nav-active' : '')}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
