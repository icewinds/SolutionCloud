// Runs after `vite build`. GitHub Pages only returns 200 for files that exist, so every
// client-side route gets its own index.html (with its own title, description and canonical
// URL). Without this, deep links are served by 404.html and search engines skip them.
// Also writes sitemap.xml and robots.txt from the same route list.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

// Public URL of the site, without trailing slash. Change this when the custom domain goes live.
const SITE_URL = 'https://icewinds.github.io/SolutionCloud'

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))
const site = readJson('../src/data/site.json')
const projects = readJson('../src/data/projects.json')

const routes = [
  { path: '', ...site.seo.home },
  { path: 'services', ...site.seo.services },
  { path: 'projects', ...site.seo.projects },
  { path: 'contact', ...site.seo.contact },
  ...projects.map((project) => ({
    path: `projects/${project.id}`,
    title: `${project.title} | SolutionCloud`,
    description: project.shortDescription,
  })),
]

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const template = readFileSync('dist/index.html', 'utf8')
const urlFor = (path) => `${SITE_URL}/${path ? `${path}/` : ''}`

function render({ path, title, description }) {
  const url = escapeHtml(urlFor(path))
  const t = escapeHtml(title)
  const d = escapeHtml(description)
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(name="description"\s+content=")[^"]*"/, `$1${d}"`)
    .replace(/(property="og:title"\s+content=")[^"]*"/, `$1${t}"`)
    .replace(/(property="og:description"\s+content=")[^"]*"/, `$1${d}"`)
    .replace(
      '</head>',
      `  <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n  </head>`,
    )

  if (!html.includes(`<title>${t}</title>`) || !html.includes('rel="canonical"')) {
    throw new Error(`prerender-routes: could not inject meta tags for "/${path}"`)
  }
  return html
}

for (const route of routes) {
  const dir = route.path ? `dist/${route.path}` : 'dist'
  mkdirSync(dir, { recursive: true })
  writeFileSync(`${dir}/index.html`, render(route))
}

writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => `  <url><loc>${escapeHtml(urlFor(route.path))}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

console.log(`prerender-routes: wrote ${routes.length} pages, sitemap.xml and robots.txt`)
