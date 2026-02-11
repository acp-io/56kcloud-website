# Technology Stack

**Analysis Date:** 2026-02-11

## Languages

**Primary:**
- TypeScript 5.3.3 - Used across all applications
- JavaScript - Configuration and build files
- React - Frontend UI framework

**Secondary:**
- HTML/CSS - Template and styling
- Markdown - Content format for blog articles

## Runtime

**Environment:**
- Node.js 20.x - Primary runtime (specified in package.json engines)
- Node.js 18.x - CMS-specific requirement (apps/cms/package.json)

**Package Manager:**
- pnpm 9 - Monorepo package manager
- Lockfile: `pnpm-lock.yaml` - Present

## Frameworks

**Core:**
- Next.js 14.2.35 - Web framework for `apps/www`
- Strapi 4.25.4 - Headless CMS for `apps/cms`

**UI & Styling:**
- Tailwind CSS 3.4.5 - Utility-first CSS framework
- PostCSS 8.4.33 - CSS processor
- Autoprefixer 10.4.16 - Vendor prefixing
- Radix UI - Component library (`@radix-ui/react-*` packages)
- Framer Motion 10.17.9 - Animation library
- Lucide React 0.307.0 - Icon library
- Heroicons 2.1.1 - Hero SVG icons

**Component Development:**
- Storybook 7.6.7 - Component documentation and testing
- React 18.2.0 - Core library
- React DOM 18.2.0 - DOM rendering

## Key Dependencies

**Critical:**
- `@strapi/strapi` 4.25.4 - CMS core framework
- `@strapi/plugin-i18n` 4.25.4 - Internationalization plugin
- `@strapi/plugin-users-permissions` 4.25.4 - Authentication plugin
- `next` 14.2.35 - Web framework for www app

**UI & Components:**
- `class-variance-authority` 0.7.0 - Component variant management
- `clsx` 2.1.1 - Class name utilities
- `tailwind-merge` 2.4.0 - Merge Tailwind classes
- `tailwindcss-animate` 1.0.7 - Animation utilities

**Data & Forms:**
- `react-hook-form` 7.49.2 - Form state management
- `zod` 3.22.4 - Schema validation
- `pg` 8.11.3 - PostgreSQL client
- `better-sqlite3` 9.2.2 - SQLite database

**Content & Parsing:**
- `markdown-to-jsx` 7.4.0 - Markdown rendering
- `notion-to-tailwind` 0.0.12 - Notion to Tailwind conversion
- `open-graph-scraper` 6.3.2 - OG metadata extraction
- `react-syntax-highlighter` 15.5.0 - Code syntax highlighting

**Utilities:**
- `date-fns` 3.1.0 - Date manipulation
- `luxon` 3.4.4 - DateTime handling
- `humanize-duration` 3.31.0 - Duration formatting
- `slugify` 1.6.6 - URL slug generation
- `js-cookie` 3.0.5 - Cookie management
- `dotenv` 16.3.1 - Environment variable loading
- `plaiceholder` 3.0.0 - Image placeholder generation
- `react-image-size` 2.3.2 - Image size detection
- `react-responsive-masonry` 2.1.7 - Masonry layouts
- `react-confetti-explosion` 2.1.2 - Confetti animations
- `react-twitter-widgets` 1.11.0 - Twitter widget embedding

**Strapi Plugins:**
- `strapi-plugin-multi-select` 1.2.3 - Multi-select field type
- `strapi-plugin-placeholder` 4.4.0 - Placeholder generation
- `strapi-plugin-populate-deep` 3.0.1 - Deep populate queries
- `strapi-plugin-preview-button` 2.2.1 - Draft preview functionality
- `strapi-plugin-slugify` 2.3.8 - Slug auto-generation
- `strapi-plugin-translate` 1.2.4 - Translation interface
- `strapi-provider-translate-deepl` 1.1.12 - DeepL translation provider

**Cloud Storage:**
- `@strapi/provider-upload-aws-s3` 4.25.4 - AWS S3 file uploads

## Configuration

**Environment:**
- Uses environment variables from `.env` files (loaded by `dotenv`)
- `.env.example` files document required variables:
  - `apps/www/.env.example` - Next.js frontend config
  - `apps/cms/.env.example` - Strapi CMS config

**Key Environment Configs (www):**
- `NEXT_PUBLIC_HUBSPOT_API` - HubSpot API endpoint (client-side)
- `STRAPI_API_TOKEN` - Strapi API authentication token
- `STRAPI_API_URL` - Strapi backend URL
- `SLACK_BOT_URL` - Slack webhook for notifications
- `NEXT_API_TOKEN` - Next.js API route authentication
- `VERCEL_URL` - Vercel deployment detection

**Key Environment Configs (cms):**
- `DATABASE_*` - PostgreSQL connection settings
- `AWS_*` - S3 credentials and region
- `DEEPL_API_KEY` - DeepL translation API
- `APP_KEYS` - Strapi security keys
- `JWT_SECRET`, `ADMIN_JWT_SECRET` - Authentication secrets
- `REVALIDATE_*` - Webhook revalidation credentials

**Build:**
- `next.config.js` - Next.js configuration at `apps/www/next.config.js`
- `tailwind.config.ts` - Tailwind configuration at `apps/www/tailwind.config.ts`
- `tsconfig.json` - TypeScript config at root and `apps/www/`
- `postcss.config.js` - PostCSS configuration at `apps/www/postcss.config.js`

## Platform Requirements

**Development:**
- Node.js 20.x required
- pnpm 9 required
- No specific OS requirements documented

**Production:**
- Deployment to Vercel (for Next.js frontend)
- Deployment target for CMS: Self-hosted or cloud provider with Node.js support
- PostgreSQL database required for CMS
- AWS S3 bucket for media storage

---

*Stack analysis: 2026-02-11*
