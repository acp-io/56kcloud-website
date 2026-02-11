# External Integrations

**Analysis Date:** 2026-02-11

## APIs & External Services

**HubSpot:**
- Forms and contact management
  - SDK/Client: Custom `Fetcher` class in `src/models/fetcher.model.ts`
  - Portal ID: `7685644`
  - Form ID: `dae441f1-1a90-49d9-8381-d09982785614`
  - Region: `na1`
  - Auth: `NEXT_PUBLIC_HUBSPOT_API` environment variable
  - Usage: Contact form submission via `src/utils/hubspot.ts`
  - Calendar embedding: Meetings scheduled at https://meetings.hubspot.com/sandro4

**Slack:**
- Webhook notifications
  - Auth: `SLACK_BOT_URL` environment variable
  - Purpose: Notifications when content is revalidated in CMS
  - Implementation: `apps/www/src/app/api/revalidate/route.ts`
  - Message format: Block-formatted Slack messages with revalidation details

**DeepL:**
- Content translation
  - SDK/Provider: `strapi-provider-translate-deepl` 1.1.12
  - API Key: `DEEPL_API_KEY` environment variable
  - API Endpoint: `https://api.deepl.com`
  - Implementation: Integrated in Strapi via `config/plugins.ts`
  - Configuration: Translates string, text, richtext, component, and dynamiczone types
  - Formality: Default setting

## Data Storage

**Databases:**
- **PostgreSQL** (Primary)
  - Connection: Environment variables in `.env`
    - `DATABASE_HOST`
    - `DATABASE_PORT` (default: 5432)
    - `DATABASE_NAME` (default: strapi)
    - `DATABASE_USERNAME` (default: strapi)
    - `DATABASE_PASSWORD`
    - `DATABASE_USE_SSL` (default: true with `rejectUnauthorized: false`)
    - Alternative: `DATABASE_URL` for full connection string
  - Client: `pg` 8.11.3
  - Config file: `apps/cms/config/database.ts`
  - Parser: `pg-connection-string` 2.6.2

- **SQLite** (Fallback for CMS dev)
  - Client: `better-sqlite3` 9.2.2
  - Used as alternative database for local development

**File Storage:**
- **AWS S3** (Primary)
  - Provider: `@strapi/provider-upload-aws-s3` 4.25.4
  - Credentials:
    - `AWS_ACCESS_KEY_ID`
    - `AWS_ACCESS_SECRET`
    - `AWS_REGION`
    - `AWS_BUCKET`
  - Configuration: `apps/cms/config/plugins.ts`
  - Default ACL: `public-read`
  - Signed URL expiry: 15 minutes
  - Max upload size: 200MB per file
  - Form data limit: 256MB
  - Remote patterns configured in `apps/www/next.config.js`:
    - `56k-strapi.s3.eu-central-1.amazonaws.com`
    - `56kcloud-cms-assets.s3.us-east-1.amazonaws.com`

**Caching:**
- Next.js built-in caching with revalidation tags
  - Tag: `strapi` - used for content revalidation
  - ISR (Incremental Static Regeneration) via `next: {tags: ['strapi']}`
  - Revalidation triggered via `apps/www/src/app/api/revalidate/route.ts`

## Authentication & Identity

**Auth Provider:**
- Custom JWT-based with Strapi
  - Implementation: `@strapi/plugin-users-permissions` 4.25.4
  - Secrets:
    - `JWT_SECRET` - API authentication
    - `ADMIN_JWT_SECRET` - Admin panel authentication
    - `API_TOKEN_SALT` - API token generation
    - `TRANSFER_TOKEN_SALT` - Token transfer security
  - CMS admin access: Role-based permissions
  - Website API access: Bearer token in headers

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Strapi built-in logger middleware: `strapi::logger`
- Standard console logging for Next.js
- Form data and request logging through middleware

## CI/CD & Deployment

**Hosting:**
- **Frontend (www):** Vercel (Next.js)
  - Deployment detection: `VERCEL_URL` environment variable
  - Hostname: `www.56k.cloud`
  - Draft preview: Handled by `PREVIEW_HOST` environment variable

- **Backend (cms):** Self-hosted or cloud provider with Node.js
  - Typical deployment: Docker-based with PostgreSQL
  - Alternative SQLite for development

**CI Pipeline:**
- GitHub Actions (`.github/workflows/ci.yml`)
  - **Linter job:** Runs on PRs
    - Tool: pnpm
    - Command: `pnpm run lint`
  - **Build job:** Runs on PRs
    - Command: `pnpm run build` (CMS build only)
    - Note: Vercel handles www build independently
  - **Component check job:** Storybook validation
    - Node.js: 20.x
    - Check for missing component stories
    - Auto-comments PR with results

## Environment Configuration

**Required env vars (www):**
- `NEXT_PUBLIC_HUBSPOT_API` - HubSpot API endpoint
- `STRAPI_API_TOKEN` - Strapi bearer token
- `STRAPI_API_URL` - Strapi backend URL
- `SLACK_BOT_URL` - Slack webhook URL
- `NEXT_API_TOKEN` - API route protection
- `PORT` (optional) - Development server port (default: 3000)

**Required env vars (cms):**
- `HOST` - Server hostname (default: 0.0.0.0)
- `PORT` - Server port (default: 1337)
- `DATABASE_*` - PostgreSQL connection details
- `AWS_*` - S3 bucket and credentials
- `APP_KEYS` - Array of security keys for CSRF/session
- `JWT_SECRET` - API authentication secret
- `ADMIN_JWT_SECRET` - Admin panel secret
- `API_TOKEN_SALT` - API token generation salt
- `TRANSFER_TOKEN_SALT` - Transfer token salt
- `DEEPL_API_KEY` - DeepL translation API key
- `STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE` - Default locale
- `REVALIDATE_ENDPOINT` - Website revalidation URL
- `REVALIDATE_TOKEN` - Revalidation API token
- `PREVIEW_HOST` - Preview/draft URL base (e.g., draft.56k.cloud)
- `WEBSITE_HOST` - Production website host

**Secrets location:**
- Environment variables stored in `.env` files (not committed)
- `.env.example` files document structure without secrets
- Production secrets stored in deployment platform (Vercel, etc.)

## Webhooks & Callbacks

**Incoming:**
- **Strapi to Vercel:** Content revalidation webhook
  - Endpoint: `apps/www/src/app/api/revalidate/route.ts`
  - Method: POST
  - Authentication: Bearer token via `protectedAPI` wrapper
  - Trigger: When content is published in Strapi
  - Action: Revalidates Next.js cache tag `strapi` and posts to Slack

**Outgoing:**
- **Strapi preview-button plugin:** Links to draft preview
  - Endpoints generated per content type (article, case-study, service, solution, partner, home-page, blog-page, about-us-page, partners-page, case-studies-page, foundations-page)
  - Draft URL format: `{PREVIEW_HOST}/api/draft?url=/{locale}/{type}/{slug}`
- **Strapi revalidate-website plugin:** Triggers website rebuild
  - Plugin location: `apps/cms/src/plugins/revalidate-website`
  - Endpoint configured via `REVALIDATE_ENDPOINT`
  - Token: `REVALIDATE_TOKEN`

## Data Flow Summary

1. **Content Creation:** Editor logs into Strapi CMS at `cms.56k.cloud`
2. **Content Publishing:** Editor publishes content, triggering webhook
3. **Cache Revalidation:** Webhook calls Next.js API route at `www.56k.cloud/api/revalidate`
4. **Database Query:** Next.js fetches updated content from Strapi API via `STRAPI_API_URL`
5. **Media Access:** Images served from S3 buckets per remote patterns
6. **Notification:** Slack webhook notified of revalidation completion
7. **User Access:** Updated content visible on public website

---

*Integration audit: 2026-02-11*
