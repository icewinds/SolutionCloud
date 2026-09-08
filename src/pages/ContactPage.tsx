import contact from '../data/contact.json'
import site from '../data/site.json'
import type { ContactInfo, SiteContent } from '../types/content'
import { ContactForm } from '../components/ContactForm'
import { Section } from '../components/Section'
import { usePageMeta } from '../hooks/usePageMeta'
import './ContactPage.css'

const siteContent = site as SiteContent
const contactInfo = contact as ContactInfo

export function ContactPage() {
  usePageMeta(siteContent.seo.contact.title, siteContent.seo.contact.description)

  return (
    <Section heading={contactInfo.heading} intro={contactInfo.supportingMessage}>
      <div className="contact-layout">
        <aside className="contact-details" aria-label="Contact details">
          <div>
            <h3>Email</h3>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            {contactInfo.placeholders.email ? (
              <p className="placeholder-note">Placeholder — replace before publishing</p>
            ) : null}
          </div>

          <div>
            <h3>Phone</h3>
            <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}>{contactInfo.phone}</a>
            {contactInfo.placeholders.phone ? (
              <p className="placeholder-note">Placeholder — replace before publishing</p>
            ) : null}
          </div>

          <div>
            <h3>Location</h3>
            <p>{contactInfo.location}</p>
            {contactInfo.placeholders.location ? (
              <p className="placeholder-note">Placeholder — replace before publishing</p>
            ) : null}
          </div>

          <div>
            <h3>Online</h3>
            <ul className="contact-online">
              <li>
                <a href={contactInfo.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                {contactInfo.placeholders.linkedin ? (
                  <span className="placeholder-note"> Placeholder</span>
                ) : null}
              </li>
              <li>
                <a href={contactInfo.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <ContactForm contact={contactInfo} />
      </div>
    </Section>
  )
}
