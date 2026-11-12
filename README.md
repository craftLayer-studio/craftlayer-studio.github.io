<p align="center">
  <a href="https://craftlayer-studio.github.io/">
    <img src="public/brand/logo-horizontal.svg" alt="CraftLayer Studio" height="48">
  </a>
</p>

# CraftLayer Studio website

Source for **https://craftlayer-studio.github.io/**, the website of CraftLayer Studio, a founder-led digital product engineering studio. We turn ideas into digital products: websites, SaaS products, AI applications, e-commerce, dashboards and internal tools.

The site is a Next.js App Router application exported to static HTML and deployed to GitHub Pages by GitHub Actions.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.4.6 (App Router, `output: 'export'`) |
| UI | React 19.3, TypeScript 5 |
| Design system | Meta Astryx 0.7.13 (`@astryxdesign/core`, `theme-neutral`, `cli`) with a custom built `craftlayer` theme |
| Styling | Astryx tokens + CSS Modules (no StyleX compiler, so `xstyle` is not used) |
| Fonts | Geist, Geist Mono, Instrument Serif, self-hosted at build time by `next/font` |
| Tests | Vitest + Testing Library (jsdom) |
| Hosting | GitHub Pages via `actions/deploy-pages` |

## Local development

Requirements: Node.js 20.9+ (22 LTS recommended) and pnpm 11 (the version is pinned in `packageManager`).

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest unit and component tests |
| `pnpm build` | Static export to `out/` |
| `pnpm theme:build` | Rebuild the Astryx theme after editing `src/themes/craftlayer/craftlayerTheme.ts` |
| `pnpm theme:check` | Fail if the built theme is out of date |

`dev` and `build` use `--webpack`. Turbopack needs native SWC bindings that require glibc 2.29+, which some Linux hosts lack; webpack with WASM SWC works everywhere, and CI uses the same bundler for parity.

## Static export

`next.config.ts` sets `output: 'export'`, `trailingSlash: true` and `images.unoptimized: true`. Every route becomes `route/index.html`, so direct links and refreshes work on GitHub Pages. Because Pages has no server, the site does not use Server Actions, middleware, ISR, cookies, request headers or runtime API routes. `/llms.txt`, `/portfolio.json`, `/sitemap.xml` and `/robots.txt` are force-static route handlers rendered at build time.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main` and on manual dispatch:

1. Install with `pnpm install --frozen-lockfile`.
2. Lint, typecheck, test.
3. Build and assert `out/index.html` exists.
4. Upload the Pages artifact and deploy it to the `github-pages` environment.

If any check fails, the deploy job never runs and the live site keeps its last good version. `ci.yml` runs the same checks on pull requests. Repository setting: **Settings → Pages → Source: GitHub Actions**.

## Environment variables

Copy `.env.example` to `.env.local` if needed.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | No | Public Formspree-compatible endpoint for the contact form. It is embedded in the browser bundle by design and is not a secret. When unset, the form opens the visitor's email app with a pre-filled `mailto:` message and says that nothing was sent or stored. |

Never put private keys in `NEXT_PUBLIC_*` variables: everything in this site ships to the browser. To use a provider in CI, add the endpoint as a repository variable and expose it to the build step.

## Content and honesty rules

- `src/data/projects.ts` is the single source of truth for portfolio content. It feeds the Work pages, case studies, JSON-LD, `/portfolio.json` and `/llms.txt`.
- Every project carries an honest label: in-house product, open-source project, community project, concept demonstration or client engagement.
- Every metric links to public evidence. No testimonials, client logos, team-size claims or invented results.
- The industry demos (Forge Fitness, Juniper Kitchen, Northstar Clinic) are fictional and labelled as concept demonstrations everywhere.

## SEO architecture

- Per-page metadata through `buildMetadata()` in `src/lib/seo.ts`: unique title and description, canonical URL, Open Graph and Twitter cards.
- JSON-LD from `src/lib/structured-data.ts` rendered by `src/components/seo/JsonLd.tsx`: ProfessionalService, WebSite, Person, Service, Article and BreadcrumbList. No ratings or reviews.
- `sitemap.xml` lists every page; `robots.txt` references this sitemap and the demos sitemap.
- `/llms.txt` and `/portfolio.json` give AI agents a structured summary. They are an experimental discovery aid, not a ranking factor.

## Brand assets

Logo files live in `public/brand/` (sources and exports in the workspace's `brand/` folder). See the brand guidelines before using them. The CraftLayer Studio name, logo and brand assets are not covered by the code licence.

## Custom domain

The site currently uses `https://craftlayer-studio.github.io/`. No custom domain is configured and no `CNAME` file exists. To add one later:

1. Verify the domain for the organization (GitHub → Organization settings → Pages → Verified domains).
2. Add DNS records: `A`/`AAAA` records for the apex pointing to GitHub Pages' published IPs, or a `CNAME` for a subdomain pointing to `craftlayer-studio.github.io`.
3. Set the custom domain in the repository's Pages settings (with Actions deployments, no `CNAME` file is needed) and enable **Enforce HTTPS** once the certificate is issued.
4. Update `site.url` in `src/lib/site.ts`. Canonical URLs, Open Graph URLs, the sitemap, robots.txt, JSON-LD and llms.txt all derive from it.
5. Redeploy, then confirm the certificate, canonical tags and that the old `github.io` URLs redirect.

## Contributing

Issues and pull requests are welcome. Keep changes small, run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` before opening a PR, and follow the honesty rules above. See the organization's [contributing guide](https://github.com/craftLayer-studio/.github/blob/main/CONTRIBUTING.md).

## Licence

Source code: MIT (see `LICENSE`). The CraftLayer Studio name, logo, brand assets in `public/brand/`, and written site content are © CraftLayer Studio, all rights reserved. Project screenshots in `public/work/` show third-party or founder products and are included for portfolio display only.
