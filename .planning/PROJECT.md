# 56k.cloud Redirect App

## What This Is

A minimal redirect application that permanently redirects all traffic from 56k.cloud to the equivalent pages on acp.io. The 56k.cloud website has been replaced by acp.io, and this app ensures existing links, bookmarks, and search engine indexes are properly redirected to preserve SEO value and user experience.

## Core Value

Every incoming request to 56k.cloud must result in a 301 permanent redirect to the correct page on acp.io — or to the acp.io homepage if no mapping exists.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] All requests to 56k.cloud return a 301 permanent redirect
- [ ] Redirect targets are controlled by a JSON mapping file (`redirects.json`)
- [ ] Blog posts with identical slugs redirect to the same slug on acp.io (preserving language prefix)
- [ ] Services, solutions, case studies, and about-us pages redirect to their acp.io equivalents
- [ ] Pages with no clear acp.io equivalent redirect to the acp.io homepage
- [ ] Language prefixes (en/fr/de) are preserved in redirects
- [ ] Paths not in the JSON mapping default to the acp.io homepage
- [ ] All existing code, content, CMS, components, and assets not needed for redirects are removed
- [ ] The app remains deployable on Vercel with the same project configuration

### Out of Scope

- Serving any HTML content — this is redirects only
- The Strapi CMS app — no longer needed
- Blog content, images, or any static assets
- Storybook, component library, design system
- HubSpot integration, Slack webhooks, API routes
- Sitemap generation — acp.io handles this now

## Context

- **Current stack:** Next.js 14 monorepo (apps/www + apps/cms) deployed on Vercel
- **Target state:** Minimal Next.js app with middleware-based redirects, no CMS
- **Both sites use identical URL structure:** `/{lang}/{section}/{slug}` with locales en, fr, de
- **Sitemap overlap:** ~90% of 56k.cloud paths have exact matches on acp.io
- **Fuzzy mappings needed:**
  - `solutions/edge-iot` → `solutions/industrial-iot`
  - `solutions/iot-edge-and-cloud-integration` → `solutions/industrial-iot`
- **No acp.io equivalent (redirect to homepage):**
  - `solutions/foundations`, `solutions/cloud-connect`
  - `services/Iot-reference-architecture`, `services/vm-container-migration`, `services/cloud-operations-aws`

## Constraints

- **Hosting:** Vercel — same deployment pipeline, same domain configuration
- **Response type:** HTTP 301 (permanent redirect) only
- **Target domain:** `https://www.acp.io`
- **Mapping source:** Single `redirects.json` file for easy manual editing

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Next.js middleware for redirects | Already deployed on Vercel, middleware handles all requests before routing | — Pending |
| Strip to single app (remove CMS, monorepo) | CMS and content are no longer needed — simplify to bare minimum | — Pending |
| JSON mapping file without language prefix | Language prefix (en/fr/de) is handled by code, JSON maps path-after-locale only | — Pending |
| Default unmapped paths to acp.io homepage | Better UX than 404 — user always lands somewhere useful | — Pending |

---
*Last updated: 2026-02-11 after initialization*
