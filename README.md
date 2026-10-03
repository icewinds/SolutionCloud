# SolutionCloud

Website for SolutionCloud: custom software, ERP (SYSPRO), banking and tax-system integration, automation and reporting for growing businesses, delivered with an AI-first approach.

**Your business is unique. Your software should be too.**

- **Live site:** https://solutioncloud.tech
- **Version:** 1.1.0 (`package.json`)
- **Stack:** React 19, React Router 7, TypeScript 5.8, Vite 7, ESLint 9. Plain CSS, no UI library.
- **Hosting:** GitHub Pages, deployed by GitHub Actions on every push to `main`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, common problems, services, featured projects, benefits, process |
| `/services` | Services with benefits and capabilities |
| `/projects` | All projects, filterable by category |
| `/projects/:projectId` | Case study: challenge, solution, solution flow, outcome, capabilities, technology |
| `/contact` | Contact details and enquiry form |

Unknown routes redirect to the home page.

## Editing content

All text lives in JSON files under `src/data/`. Change those files rather than the components.

| File | Contents |
| --- | --- |
| `site.json` | Company name, tagline, navigation, calls to action, page headings, problems, benefits, process steps, technologies, footer, and the SEO title and description for each page |
| `services.json` | The four services (`custom-software`, `integration-automation`, `data-reporting`, `technical-consulting`) |
| `projects.json` | Case studies, in display order |
| `contact.json` | Email, phone, location, LinkedIn, contact form settings and messages |

The types for these files are in `src/types/content.ts`.

### Adding a project

Add an object to `src/data/projects.json`. The order in the file is the order on the Projects page and the previous/next order on case study pages.

| Field | Notes |
| --- | --- |
| `id` | URL slug, e.g. `bank-payment-integrations` → `/projects/bank-payment-integrations` |
| `title`, `category` | The category becomes a filter button on the Projects page |
| `featured` | The first three featured projects appear on the home page |
| `shortDescription` | Card text and the page's meta description |
| `businessProblem`, `solution`, `outcome` | Case study sections |
| `capabilities`, `technologies` | Lists of strings |
| `businessArea`, `platforms`, `integration` | The "snapshot" box at the top of the case study |
| `solutionFlow` | Steps for the solution flow diagram; use `[]` to hide it |
| `relatedServiceIds` | Service `id`s from `services.json` |

Each new project gets its own page, and a sitemap entry, on the next build.

## Contact form

Enquiries are sent through [Web3Forms](https://web3forms.com) and delivered to the inbox registered with the access key in `form.web3formsAccessKey` in `src/data/contact.json`. The key is public by design. To deliver to a different inbox, change the email in the Web3Forms dashboard or create a new key and replace it.

If the key is empty, the form falls back to opening the visitor's email client.

## Search indexing

`npm run build` runs `scripts/prerender-routes.mjs` after the Vite build. It:

- writes an `index.html` for every route, each with its own title, description, canonical URL and `og:url`, so GitHub Pages returns HTTP 200 instead of serving `404.html`
- writes `sitemap.xml` and `robots.txt`

`SITE_URL` in that script must match the live domain. The site is verified in Google Search Console, and the sitemap is submitted as `https://solutioncloud.tech/sitemap.xml`.

## Development

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check, build for production, and generate the per-route pages, sitemap and robots.txt |
| `npm run preview` | Preview the production build at http://localhost:4173 |
| `npm run lint` | Run ESLint |

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`. It installs dependencies, runs `npm run build`, and deploys `dist/` to GitHub Pages. In the repository settings, **Pages → Source** must be set to **GitHub Actions**.

### Domain and DNS

- **GitHub:** the custom domain `solutioncloud.tech` is set under **Settings → Pages**, with **Enforce HTTPS** on.
- **Registrar:** DNS is managed at domains.co.za.

| Host | Type | Value |
| --- | --- | --- |
| `solutioncloud.tech` | A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| `www.solutioncloud.tech` | CNAME | `icewinds.github.io` |
| `solutioncloud.tech` | TXT | `google-site-verification=…` (Search Console) |

Leave the `MX`, `mail`, SPF/DKIM `TXT` and `SRV` records unchanged; they handle email for `@solutioncloud.tech`. Don't add a wildcard (`*`) record, because GitHub warns it allows subdomain takeover.

## Project structure

```text
.github/workflows/deploy.yml   Build and deploy to GitHub Pages
public/                        Static files copied as-is (favicon, 404.html SPA fallback)
scripts/prerender-routes.mjs   Post-build: per-route pages, sitemap.xml, robots.txt
src/
  components/                  Layout, header, footer and section components
  data/                        Site content (JSON)
  hooks/usePageMeta.ts         Updates title and meta tags on client-side navigation
  lib/                         Contact form submission and project presentation helpers
  pages/                       Home, Services, Projects, Project detail, Contact
  types/content.ts             Types for the content files
```
