# SolutionCloud

With over 15 years of software development experience and an AI-first approach, SolutionCloud helps small and medium-sized businesses connect systems, automate processes and build practical software that solves real business problems.

**Your business is unique. Your software should be too.**

## Development

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Deployment

The site is served by GitHub Pages at https://solutioncloud.tech (custom domain set under **Settings → Pages**; DNS: apex `A` records to GitHub Pages, `www` `CNAME` to `icewinds.github.io`).

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and deploys the `dist` folder to GitHub Pages.

In the repository settings, set **Pages → Source** to **GitHub Actions**.

## Contact form

Enquiries are sent through [Web3Forms](https://web3forms.com). Create a free access key for the inbox that should receive them and put it in `form.web3formsAccessKey` in `src/data/contact.json` (the key is public by design). If the key is empty, the form falls back to opening the visitor's email client.

## Search indexing

`npm run build` runs `scripts/prerender-routes.mjs`, which writes an `index.html` for every route (so GitHub Pages returns 200 instead of 404) plus `sitemap.xml` and `robots.txt`. Update `SITE_URL` in that script if the site address changes.
