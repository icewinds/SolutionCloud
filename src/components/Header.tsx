import { NavLink } from 'react-router-dom'
import type { NavItem } from '../types/content'
import './Header.css'

interface HeaderProps {
  companyName: string
  navigation: NavItem[]
  ctaLabel: string
  ctaPath: string
  menuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
}

export function Header({
  companyName,
  navigation,
  ctaLabel,
  ctaPath,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="brand" onClick={onCloseMenu}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">{companyName}</span>
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={onToggleMenu}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' is-active' : ''}`
                  }
                  end={item.path === '/'}
                  onClick={onCloseMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to={ctaPath} className="button button-small" onClick={onCloseMenu}>
            {ctaLabel}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
