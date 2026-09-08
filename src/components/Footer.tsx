import { NavLink } from 'react-router-dom'
import type { ContactInfo, NavItem } from '../types/content'
import './Footer.css'

interface FooterProps {
  companyName: string
  tagline: string
  navigation: NavItem[]
  contact: ContactInfo
}

export function Footer({ companyName, tagline, navigation, contact }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{companyName}</p>
          <p className="footer-tagline">{tagline}</p>
        </div>

        <div>
          <p className="footer-heading">Explore</p>
          <ul className="footer-links">
            {navigation.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-heading">Contact</p>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a>
            </li>
            <li>{contact.location}</li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {year} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
