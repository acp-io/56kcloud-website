# Codebase Structure

**Analysis Date:** 2026-02-11

## Directory Layout

```
56kcloud-website/
├── apps/                                    # Monorepo workspaces
│   ├── www/                                # Next.js website frontend
│   │   ├── public/                         # Static assets, images
│   │   ├── src/
│   │   │   ├── app/                        # Next.js App Router (pages and routes)
│   │   │   ├── components/                 # React component hierarchy (atoms, molecules, organisms)
│   │   │   ├── models/                     # TypeScript type definitions for CMS data
│   │   │   ├── styles/                     # Global CSS, Tailwind config
│   │   │   ├── tests/                      # Test factories and test data
│   │   │   └── utils/                      # Utility functions, CMS integration, API helpers
│   │   ├── configs/                        # Environment config and shared constants
│   │   ├── next.config.js                  # Next.js configuration
│   │   ├── tsconfig.json                   # TypeScript compiler options
│   │   └── package.json
│   │
│   └── cms/                                # Strapi CMS backend
│       ├── src/
│       │   ├── api/                        # Strapi collection and single-type models
│       │   ├── plugins/                    # Custom Strapi plugins
│       │   ├── extensions/                 # Strapi extensions (middleware, policies)
│       │   ├── components/                 # Reusable content components (Strapi)
│       │   └── utils/                      # Helper functions
│       ├── config/                         # Strapi server configuration
│       └── package.json
│
├── configs/                                # Shared configuration (monorepo level)
├── scripts/                                # Utility scripts
├── .github/                                # GitHub Actions workflows
├── .planning/                              # GSD planning documents (auto-generated)
│   └── codebase/                          # Architecture and structure docs
├── package.json                            # Monorepo root
├── pnpm-workspace.yaml                     # pnpm workspace configuration
└── README.md                               # Development guide

```

## Directory Purposes

**`apps/www/`:**
- Purpose: Next.js marketing website frontend
- Contains: React components, page routes, API routes, styles, utilities
- Key files: `src/app/[locale]/page.tsx`, `src/components/`, `src/models/`, `configs/`

**`apps/www/src/app/`:**
- Purpose: Next.js App Router directory with page and API routes
- Contains: Layout files, page components, dynamic routes, API endpoint handlers
- Structure: `[locale]/` parameter routes pages by language; each content type (blog, services, etc.) has subdirectory with `page.tsx` and dynamic `[slug]/` routes

**`apps/www/src/components/ui/`:**
- Purpose: Atomic Design component library organized by scale
- Contains:
  - `atoms/`: Button, Badge, Avatar, Icon, DynamicImage, ComponentLayout, Inputs
  - `molecules/`: Cards (article, case-study, team-member, with-icon, text, cover), Banner, Tags, LanguageSwitcher, Tabs, Navigation, Markdown, Masonry
  - `organisms/`: Full page sections grouped by purpose (hero-sections, blog-sections, service-sections, content-sections, contact-sections, footer, header, etc.)

**`apps/www/src/models/`:**
- Purpose: TypeScript type definitions for CMS content models
- Contains: One `.model.ts` file per content type (article.model.ts, solution.model.ts, service.model.ts, etc.)
- Pattern: Each file exports type interface(s) used by components and API calls

**`apps/www/src/utils/`:**
- Purpose: Shared utility functions and integrations
- Contains:
  - `cms/`: CMS data fetching (endpoints.tsx), component rendering (renderer/components.tsx)
  - `api/`: API route helpers (protected-api.ts, headers.ts, options.ts)
  - `toolbox.tsx`: General utilities (cn for classname merging, date formatting, form data transformation, HubSpot integration)

**`apps/www/configs/`:**
- Purpose: Environment variables and configuration
- Contains:
  - `server.ts`: Strapi API URL, token, Fetcher instance, hostname, Slack webhook
  - `client.ts`: Client-side config
  - `shared.ts`: Locales (en, fr, de) and locale-to-language mapping

**`apps/www/src/styles/`:**
- Purpose: Global styles and Tailwind configuration
- Contains: `global.css`, `tailwind.config.ts` (if present)

**`apps/www/src/tests/`:**
- Purpose: Test data and factory functions
- Contains: Subdirectory `factories/` with Faker-based factories for each content type (article.factory.ts, solution.factory.ts, etc.)

**`apps/cms/src/api/`:**
- Purpose: Strapi collection and single-type definitions
- Contains: Subdirectory per content type (article/, home-page/, blog-page/, etc.). Each contains `controllers/`, `services/`, `routes/`, `models/` (schema).

**`apps/cms/src/plugins/`:**
- Purpose: Custom Strapi plugins
- Contains: `revalidate-website/` plugin that posts webhook to Next.js `/api/revalidate` after content publish

## Key File Locations

**Entry Points:**
- `apps/www/src/app/layout.tsx`: Root HTML layout
- `apps/www/src/app/[locale]/layout.tsx`: Locale-aware layout with metadata and styles
- `apps/www/src/app/[locale]/page.tsx`: Home page (fetches 'home-page' from CMS)
- `apps/cms/src/index.ts`: Strapi bootstrap

**Configuration:**
- `apps/www/configs/server.ts`: Strapi API credentials and Fetcher instance
- `apps/www/configs/shared.ts`: Locale configuration
- `apps/www/tsconfig.json`: TypeScript paths (aliased @ to src/)
- `apps/www/next.config.js`: Next.js configuration

**Core Logic:**
- `apps/www/src/middleware.ts`: Locale detection and routing
- `apps/www/src/utils/cms/endpoints.tsx`: CMS data fetching (getPageComponents, getPageSeo, getList)
- `apps/www/src/utils/cms/renderer/components.tsx`: Component blueprint registry and page rendering
- `apps/www/src/models/fetcher.model.ts`: Generic HTTP client class

**API Routes:**
- `apps/www/src/app/api/revalidate/route.ts`: Webhook handler for ISR revalidation
- `apps/www/src/app/api/draft/route.ts`: Enable draft preview mode
- `apps/www/src/app/api/draft/disable/route.ts`: Disable draft preview mode
- `apps/www/src/app/api/og/route.ts`: Generate Open Graph images

**Testing:**
- `apps/www/src/tests/factories/`: Faker factories for test data (article.factory.ts, solution.factory.ts, etc.)

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `Button.tsx`, `HeroSimpleCenter.tsx`)
- Utilities: camelCase (e.g., `toolbox.tsx`, `endpoints.tsx`)
- Models/Types: kebab-case.model.ts (e.g., `article.model.ts`, `contact-us-form-data.model.ts`)
- Factories: kebab-case.factory.ts (e.g., `article.factory.ts`, `team-member.factory.ts`)
- Directories: kebab-case (e.g., `hero-sections`, `blog-sections`, `case-study`)

**Directories:**
- Feature domains: kebab-case with -sections suffix for organisms (e.g., `hero-sections`, `service-sections`, `content-sections`)
- Atomic levels: atoms, molecules, organisms
- CMS paths: single-type names use hyphens (e.g., 'home-page', 'blog-page', 'case-studies-page')

**Components & Functions:**
- React components: PascalCase (e.g., `HeroSimpleCenter`, `BlogThreeColumn`)
- Utility functions: camelCase (e.g., `getPageComponents`, `getPageSeo`, `createHsformsPayload`)
- Hook-like utilities: camelCase with subject first (e.g., `snakeCaseObjectKeysToCamelCase`, `removeUndefinedProperties`)

**Routes:**
- Locale parameter: `[locale]` in path
- Dynamic segments: `[slug]` for collection item routes
- API routes: RESTful naming (e.g., `/api/revalidate`, `/api/draft`)

## Where to Add New Code

**New Feature (New Page Type):**
- Primary code:
  - Model: Create `apps/www/src/models/new-feature.model.ts` with type definitions
  - CMS Schema: Create `apps/cms/src/api/new-feature/models/schema.graphql` with Strapi schema
  - CMS Routes: Add routes in `apps/cms/src/api/new-feature/routes/`
  - Page Route: Create `apps/www/src/app/[locale]/new-feature/page.tsx` following pattern of existing pages
  - Dynamic Routes: Add `apps/www/src/app/[locale]/new-feature/[slug]/page.tsx` with generateStaticParams
- Tests: Add `apps/www/src/tests/factories/new-feature.factory.ts`

**New Component:**
- Atom: `apps/www/src/components/ui/atoms/new-atom/NewAtom.tsx`
- Molecule: `apps/www/src/components/ui/molecules/new-molecule/NewMolecule.tsx`
- Organism: `apps/www/src/components/ui/organisms/new-section-type/NewSectionType.tsx`
- Register in component blueprint if it's a CMS-renderable section: Add to `componentBlueprints` object in `apps/www/src/utils/cms/renderer/components.tsx`
- Storybook story: `NewComponent.stories.tsx` in component directory

**Utilities:**
- CMS integration: `apps/www/src/utils/cms/new-integration.ts`
- General helpers: Add to `apps/www/src/utils/toolbox.tsx` or create new file if substantial
- API helpers: `apps/www/src/utils/api/new-helper.ts`

**Configuration/Environment:**
- New CMS integration: Add env var to `apps/www/configs/server.ts` and instantiate Fetcher/client
- Shared constants: Add to `apps/www/configs/shared.ts`

## Special Directories

**`apps/www/public/`:**
- Purpose: Static assets served directly by Next.js
- Generated: No
- Committed: Yes
- Contents: Favicon, apple-touch-icon, AWS badge images, value section backgrounds

**`apps/www/.next/`:**
- Purpose: Build output from Next.js compilation
- Generated: Yes (during `npm run build`)
- Committed: No (in .gitignore)

**`.planning/codebase/`:**
- Purpose: Auto-generated GSD planning documents (this directory)
- Generated: Yes (by GSD mapper tools)
- Committed: Yes
- Contents: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, STACK.md, INTEGRATIONS.md, CONCERNS.md

**`apps/www/src/old-components/`:**
- Purpose: Archive of deprecated components
- Generated: No
- Committed: Yes (but excluded from TypeScript compilation in tsconfig.json)

**`.storybook/`:**
- Purpose: Storybook configuration for component library
- Generated: No
- Committed: Yes
- Contents: preview.ts, main.ts configuration for running component stories

**`.github/workflows/`:**
- Purpose: GitHub Actions CI/CD workflows
- Generated: No
- Committed: Yes
- Usage: Automated testing, linting, deployment

## Import Path Conventions

**Path Alias:**
- `@/` resolves to `src/` directory (configured in tsconfig.json)
- Usage: `import { cn } from '@/utils/toolbox'`, `import { Article } from '@/models/article.model'`

**Import Organization in Files:**
- External packages first (React, Next.js, third-party libraries)
- Relative path imports from parent directories (using ../)
- Path alias imports from project root (@/)
- Type/interface imports together at top

## Database & Data

**Strapi Database:**
- Collections: Articles, Services, Solutions, Partners, CaseStudies, TeamMembers, Customers, Locations, Tags, etc.
- Single Types: HomePage, BlogPage, AboutUsPage, ContactUsPage, Footer
- Configured in `apps/cms/config/database.ts`
- Connection: PostgreSQL (production) or SQLite (development)

**Media Storage:**
- Provider: AWS S3 (production) via `@strapi/provider-upload-aws-s3`
- Local storage for development

**No Frontend Database:**
- Website is static/dynamic per-request; no local database
- All data comes from Strapi CMS API at request time
