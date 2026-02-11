# Architecture

**Analysis Date:** 2026-02-11

## Pattern Overview

**Overall:** Headless CMS with Next.js Jamstack Frontend

**Key Characteristics:**
- Content-driven architecture: Strapi CMS manages all content, frontend consumes via REST API
- Server-side rendering with static generation: Next.js renders pages at build time with ISR (Incremental Static Regeneration)
- Component-based UI with a three-tier hierarchy: atoms (primitives), molecules (simple components), organisms (page sections)
- Locale-aware routing: i18n middleware handles language detection and routing for en/fr/de
- Decoupled systems: CMS (Strapi) and website (Next.js) are separate applications communicating via APIs

## Layers

**CMS Layer (Strapi Backend):**
- Purpose: Manage all content (pages, articles, services, partners, case studies, team members). Provides REST API and admin UI.
- Location: `apps/cms/`
- Contains: Strapi configuration, data models (collections and single types in `src/api/`), custom plugins, extensions
- Depends on: PostgreSQL/SQLite database, AWS S3 for media storage, i18n plugin, custom revalidation webhook plugin
- Used by: Next.js website frontend via REST API calls

**Website Presentation Layer (Next.js Frontend):**
- Purpose: Render marketing website pages using content from CMS. Handles user-facing UI, routing, SEO, and caching.
- Location: `apps/www/`
- Contains: React components, page routes, API routes, utility functions, styles
- Depends on: Strapi CMS API, various React libraries (Radix UI, Framer Motion, Tailwind CSS)
- Used by: End users accessing the website

**Component Hierarchy (Atomic Design):**
- **Atoms** (`src/components/ui/atoms/`): Primitive components (Button, Badge, Avatar, Icon, DynamicImage, Input fields)
- **Molecules** (`src/components/ui/molecules/`): Simple combinations of atoms (Cards, Tabs, Navigation Menu, Tags, Markdown, Banners, Article/Case Study sections)
- **Organisms** (`src/components/ui/organisms/`): Complex sections composed of molecules (Hero sections, Blog sections, Service sections, CTA sections, Footer, Header, Contact form)

**Content Model Layer (`src/models/`):**
- Purpose: Define TypeScript interfaces for CMS data structures
- Location: `apps/www/src/models/`
- Contains: Type definitions for Article, Solution, Service, Partner, CaseStudy, Feature, Icon, Page, SEO, etc.
- Pattern: Each content type has a corresponding `.model.ts` file with exported types

**API Integration Layer (`src/utils/cms/`):**
- Purpose: Abstract CMS data fetching and provide a data transformation layer
- Location: `apps/www/src/utils/cms/`
- Contains: `endpoints.tsx` (getPageComponents, getPageSeo, getList functions), `renderer/components.tsx` (component blueprint registry)
- Pattern: Endpoints use generic Fetcher class to call Strapi API and transform snake_case responses to camelCase

**Configuration Layer (`configs/`):**
- Purpose: Centralize environment variables and shared configuration
- Location: `apps/www/configs/`
- Contains: `server.ts` (Strapi API credentials, Fetcher instance), `client.ts` (client-side config), `shared.ts` (locales configuration)
- Pattern: Environment variables imported and instantiated at module level, Fetcher configured with Strapi token and cache tags

**Routing & Localization Layer:**
- Purpose: Handle locale detection, URL routing, and language-aware page generation
- Location: `src/middleware.ts` (locale detection), `src/app/[locale]/` (locale-parameterized routes)
- Pattern: Middleware intercepts requests, detects locale from pathname/cookie/Accept-Language header, and redirects to locale-prefixed URL. All page routes use `[locale]` parameter.
- Locales: en (default), fr, de defined in `configs/shared.ts`

**API Routes Layer (`src/app/api/`):**
- Purpose: Server-side endpoints for CMS integration and external service callbacks
- Location: `apps/www/src/app/api/`
- Contains: `/revalidate` (ISR revalidation webhook from Strapi), `/draft` (draft mode toggle), `/og` (Open Graph image generation)
- Pattern: Each route is a directory with `route.ts` handler; uses Next.js server functions and middleware

## Data Flow

**Page Rendering Flow:**

1. User requests page (e.g., `/blog`)
2. Middleware detects locale and redirects if needed (e.g., to `/en/blog`)
3. Next.js route handler (`src/app/[locale]/blog/page.tsx`) executes
4. Page component calls `getDictionary(locale)` and `getPageComponents(pagePath, locale)`
5. `getPageComponents` calls `strapiFetcher.call()` which hits Strapi REST API (`/api/blog-page`)
6. Strapi returns component configuration with snake_case properties
7. Response transformed to camelCase via `snakeCaseObjectKeysToCamelCase()`
8. Component metadata extracted from `componentBlueprints` registry in `renderer/components.tsx`
9. `pageRenderer()` maps component configs to React components and renders page
10. Static HTML generated at build time; cached with revalidation tag `'strapi'`

**Dynamic Slug Pages (Articles, Services, Solutions, Partners, Case Studies):**

1. `generateStaticParams()` fetches all slugs via `getList('articles')` etc.
2. For each locale and slug combination, creates static route
3. At request time, `getPageComponents(`articles/${slug}`, locale)` fetches that article's component body
4. If fetch fails (404), `notFound()` returns 404 page
5. Page cached with `'strapi'` tag for ISR

**Content Revalidation Flow:**

1. Editor publishes content in Strapi CMS
2. Strapi custom plugin `revalidate-website` (in `apps/cms/src/plugins/revalidate-website/`) triggers
3. POST request sent to `/api/revalidate` with editor username
4. Next.js handler validates request via `protectedAPI()` middleware
5. `revalidateTag('strapi')` purges all cached pages with that tag
6. Slack webhook posts notification to team channel
7. Website automatically regenerates stale pages on next request

**State Management:**
- No global state management. Each page independently fetches CMS data at request time.
- Locale state: Stored in cookie (`NEXT_LOCALE`) and URL pathname
- Draft mode: Uses Next.js `draftMode()` to toggle preview of unpublished content. Draft state stored in secure cookie.

## Key Abstractions

**Fetcher Class:**
- Purpose: Generic HTTP client for API communication with retry logic and error handling
- File: `src/models/fetcher.model.ts`
- Pattern: Constructor takes baseUrl and RequestInit options. `call()` method accepts path, options, and query params. Merges options with base config, constructs URL with query string, executes fetch, and returns parsed JSON or rejects on error.
- Usage: Instantiated in `configs/server.ts` as `strapiFetcher` with Strapi baseURL and auth token

**Component Blueprint Registry:**
- Purpose: Map CMS component slugs to React component imports
- File: `src/utils/cms/renderer/components.tsx`
- Pattern: Plain object where keys are component identifiers (e.g., 'hero-simple-center') and values are React component imports. Enables dynamic component selection based on CMS data.
- Design: Centralized registry allows CMS to define page structure without frontend code changes (as long as component exists)

**Dictionary (i18n Translations):**
- Purpose: Provide locale-specific text/labels
- File: `src/app/[locale]/dictionaries.ts`
- Pattern: Each locale has a corresponding JSON translation file imported and returned as Dictionary object
- Usage: Passed to `pageRenderer()` which supplies translations to components that need them

**PageComponents & ComponentBlueprint:**
- Purpose: Type definitions for CMS component metadata and render instructions
- File: `src/models/page.model.ts` and `src/utils/cms/renderer/components.tsx`
- Pattern: PageComponents is array of ComponentBlueprint objects. Each Blueprint has `component` (identifier) and `props` (camelCased data from CMS). pageRenderer iterates array and renders matching components.

## Entry Points

**Website Entry (`apps/www/`):**
- Location: `src/app/layout.tsx` (root) → `src/app/[locale]/layout.tsx` (locale layout) → specific page routes
- Triggers: HTTP requests to / or any locale-prefixed path
- Responsibilities: Set up HTML structure, metadata, fonts, global styles; render locale-specific layout; delegate to page components

**CMS Entry (`apps/cms/`):**
- Location: `src/index.ts` (Strapi bootstrap)
- Triggers: CMS server startup
- Responsibilities: Register custom plugins (revalidate-website webhook), set up data models, configure i18n

**Revalidation Webhook:**
- Location: `src/app/api/revalidate/route.ts`
- Triggers: POST from Strapi after content publish
- Responsibilities: Verify request authenticity, purge Next.js ISR cache, notify Slack

**Draft Preview:**
- Location: `src/app/api/draft/route.ts` and `src/app/api/draft/disable/route.ts`
- Triggers: Query parameter ?draft=true or disable preview button click
- Responsibilities: Enable/disable Next.js draft mode, redirect to preview URL

## Error Handling

**Strategy:** Try-catch blocks at API boundary; graceful fallbacks; 404 handling for missing content

**Patterns:**
- CMS endpoint calls wrapped in try-catch; returns `undefined` on error (`getPageSeo`, `getPageComponents`)
- Missing dynamic page content triggers `notFound()` which renders 404 page
- Fetcher class catches network errors and rejects promise; API route handlers catch and return error Response
- Missing environment variables detected at config import time; empty string default (logs as missing during runtime)

## Cross-Cutting Concerns

**Logging:** Console-based via built-in `console.log/error`. No centralized logging library detected.

**Validation:** Form validation via `react-hook-form` and `zod` for contact form submission. CMS data assumed valid from Strapi API.

**Authentication:**
- CMS: Strapi users-permissions plugin handles editor authentication
- Website: `protectedAPI()` wrapper validates revalidation webhook requests using API token from env var
- Draft preview: Secure cookie-based (Next.js draftMode)

**Caching:**
- Static pages cached at build time with ISR via Next.js `generateStaticParams()` and cache tags
- Strapi API responses include `next: {tags: ['strapi']}` for on-demand revalidation
- Client-side: Tailwind CSS, font optimization (Inter preloaded selectively)

**Internationalization:**
- Locale detection via middleware: URL pathname, cookie, Accept-Language header (in order)
- URL-based routing: All routes prefixed with locale (e.g., /en/blog, /fr/blog)
- Static params generation: Each page with dynamic content built for all locales
- Translations loaded per-locale from `dictionaries.ts`
