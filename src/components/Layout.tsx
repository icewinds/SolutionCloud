import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import contact from '../data/contact.json'
import site from '../data/site.json'
import type { ContactInfo, SiteContent } from '../types/content'
import { Footer } from './Footer'
import { Header } from './Header'

const siteContent = site as SiteContent
const contactInfo = contact as ContactInfo

export function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="app-shell">
      <a className="sr-only" href="#main-content">
        Skip to main content
      </a>
      <Header
        companyName={siteContent.companyName}
        navigation={siteContent.navigation}
        ctaLabel={siteContent.cta.primary.label}
        ctaPath={siteContent.cta.primary.path}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      <main id="main-content" className="main-content">
        <Outlet />
      </main>
      <Footer
        companyName={siteContent.footer.copyrightName}
        tagline={siteContent.footer.tagline}
        navigation={siteContent.navigation}
        contact={contactInfo}
      />
    </div>
  )
}
