import demos from '../data/demos.json'
import type { DemoShowcase } from '../types/content'
import { CTASection } from '../components/CTASection'
import { usePageMeta } from '../hooks/usePageMeta'
import './WebsiteDemosPage.css'

const showcase = demos as DemoShowcase
const base = import.meta.env.BASE_URL
const totalDemos = showcase.groups.reduce((sum, group) => sum + group.demos.length, 0)

const areaId = (area: string) => `area-${area.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

export function WebsiteDemosPage() {
  usePageMeta(showcase.seo.title, showcase.seo.description)

  return (
    <>
      <section className="section demos-intro" aria-labelledby="demos-heading">
        <div className="container">
          <header className="section-header demos-header">
            <p className="section-eyebrow">{showcase.page.eyebrow}</p>
            <h1 id="demos-heading">{showcase.page.heading}</h1>
            <p className="section-intro">{showcase.page.intro}</p>
          </header>

          <aside className="demos-notice" role="note" aria-labelledby="demos-notice-heading">
            <svg className="demos-notice-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M12 10.5v6M12 7.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <h2 id="demos-notice-heading">{showcase.notice.heading}</h2>
              <p>{showcase.notice.text}</p>
            </div>
          </aside>

          <nav className="demos-areas" aria-label="Jump to an area">
            <span className="demos-count">{totalDemos} concepts</span>
            {showcase.groups.map((group) => (
              <a key={group.area} className="services-jump" href={`#${areaId(group.area)}`}>
                {group.area}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {showcase.groups.map((group) => (
        <section
          key={group.area}
          id={areaId(group.area)}
          className="demos-group"
          aria-labelledby={`${areaId(group.area)}-heading`}
        >
          <div className="container">
            <header className="demos-group-header">
              <h2 id={`${areaId(group.area)}-heading`}>{group.area}</h2>
              <span>{group.demos.length} concepts</span>
            </header>

            <ul className="demos-grid">
              {group.demos.map((demo) => (
                <li key={demo.slug}>
                  <a
                    className="demo-card"
                    href={`${base}demos/${demo.slug}/`}
                    target="_blank"
                    rel="noopener"
                  >
                    <div className="demo-card-thumb">
                      <img
                        src={`${base}showcase/${demo.slug}.webp`}
                        alt={`Screenshot of the ${demo.name} concept demo`}
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="demo-card-label">{showcase.cardLabel}</span>
                    </div>
                    <div className="demo-card-body">
                      <h3>{demo.name}</h3>
                      <p className="demo-card-meta">
                        {demo.category}, {demo.location}
                      </p>
                      <p className="demo-card-foot">
                        <span className="demo-card-style">{demo.style}</span>
                        <span className="demo-card-open">
                          {showcase.openLabel}
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path
                              d="M6 3h7v7M13 3 4 12"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="square"
                            />
                          </svg>
                          <span className="sr-only"> (concept demo, opens in a new tab)</span>
                        </span>
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="demos-footnote" aria-label="About these demos">
        <div className="container">
          <p>{showcase.notice.text}</p>
        </div>
      </section>

      <CTASection cta={showcase.cta} />
    </>
  )
}
