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

The site is configured for GitHub Pages under the repository path `/SolutionCloud/`.

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and deploys the `dist` folder to GitHub Pages.

In the repository settings, set **Pages → Source** to **GitHub Actions**.

## Contact placeholders

Replace placeholder values in `src/data/contact.json` before publishing.
