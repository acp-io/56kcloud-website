# Codebase Concerns

**Analysis Date:** 2026-02-11

## Dependency Version Constraints

**React and React-DOM Pinning Issue:**
- Issue: `react` and `react-dom` are pinned to `"x"` and `"^x"` in `apps/www/package.json` (lines 37-39) and `apps/cms/package.json` (lines 27-28). This is a non-standard version constraint that resolves unpredictably and makes reproducible builds impossible.
- Files: `apps/www/package.json`, `apps/cms/package.json`
- Impact: Builds are not reproducible. Different environments may install different versions. CI/CD becomes unreliable. Testing across versions becomes impossible.
- Fix approach: Replace all `"x"` and `"^x"` with explicit version numbers (e.g., `"18.3.1"`). Use `npm ci` with lock files to ensure reproducible installs.

**TypeScript Version Not Pinned:**
- Issue: `typescript` is pinned to `"x"` in both `apps/www/package.json` (line 84) and `apps/cms/package.json` (line 43). Same issue as React/React-DOM.
- Files: `apps/www/package.json`, `apps/cms/package.json`
- Impact: Type checking may behave differently across environments. Breaking changes in TypeScript could occur silently.
- Fix approach: Pin to a specific version (e.g., `"5.3.3"` is already used in root `package.json`).

**Missing @types Versions:**
- Issue: `@types/react`, `@types/node`, and `tsx` are also pinned to `"^x"` or `"x"` in `apps/www/package.json` (lines 69-84)
- Files: `apps/www/package.json`
- Impact: Type definitions may diverge from actual implementations causing type errors in different environments.
- Fix approach: Use explicit versions matching the dependencies they annotate.

**Faker-JS Version Mismatch:**
- Issue: `@faker-js/faker` is `"^x"` in `apps/www/package.json` (line 51) but `"^8.3.1"` in root `package.json` (line 33)
- Files: `apps/www/package.json`
- Impact: Different test data generation across environments.
- Fix approach: Align versions or use consistent constraints.

## Type Safety Issues

**Explicit Any Types:**
- Issue: Multiple files use `any` type with ESLint disable comments:
  - `apps/www/src/utils/toolbox.tsx` lines 74-75, 81-82, 95-96: Generic object manipulation functions
  - `apps/www/src/utils/cms/renderer/components.tsx` lines 52-53: Component blueprint registry
  - `apps/www/src/components/ui/atoms/button/index.tsx` lines 13-14: JSXElementConstructor type
- Files: `apps/www/src/utils/toolbox.tsx`, `apps/www/src/utils/cms/renderer/components.tsx`, `apps/www/src/components/ui/atoms/button/index.tsx`
- Impact: Loss of type safety in critical utility and renderer code. Refactoring becomes risky. IDE autocompletion unreliable.
- Fix approach: Create proper generic types or discriminated unions instead of using `any`. Example: `Record<string, unknown>` + type guards.

**CMS Plugin Type Assertions:**
- Issue: `apps/cms/src/plugins/revalidate-website/server/utils/get-service.ts` uses `@ts-ignore` (line 6) and controller uses `@ts-ignore` (line 2)
- Files: `apps/cms/src/plugins/revalidate-website/server/utils/get-service.ts`, `apps/cms/src/plugins/revalidate-website/server/controllers/index.ts`
- Impact: Strapi plugin integration bypasses type checking. Breaking changes in Strapi API would not be caught.
- Fix approach: Define proper TypeScript interfaces for Strapi plugin APIs or use typed wrapper functions.

**Cast-as-any in Populate:**
- Issue: `apps/cms/src/utils/toolbox.ts` line 33 casts `'deep'` as `any`: `populate: 'deep' as any`
- Files: `apps/cms/src/utils/toolbox.ts`
- Impact: Type system doesn't verify valid populate values.
- Fix approach: Type the populate parameter properly or use const assertion: `as const` instead of `as any`.

## React and Component Issues

**Disabled React Hooks Exhaustive Dependencies Rule:**
- Issue: `.eslintrc.json` line 23 disables `react-hooks/exhaustive-deps`
- Files: `.eslintrc.json`
- Impact: React hooks may reference stale closure variables, causing bugs with memoization, effects, and callbacks. Silent infinite loops or state inconsistencies.
- Fix approach: Enable the rule and fix all violations. This is a critical React safety rule.

**Unused Variable Assignments:**
- Issue: `apps/www/src/utils/toolbox.tsx` line 22 uses unused destructuring parameter `[_, val]`
- Files: `apps/www/src/toolbox.tsx`
- Impact: Minor - unused variables can be confusing but pattern is intentional to skip first element.
- Fix approach: Consider using Array.slice or clearer destructuring patterns.

**Icon Index Mutates on Large File:**
- Issue: `apps/www/src/components/ui/atoms/icon/index.tsx` is 1183 lines - a massive single-component file with 280+ heroicon imports. Line 1181 uses string concatenation to dynamically access icon: `icons[`${name}${type === 'solid' ? 'Solid' : 'Outline'}`]`
- Files: `apps/www/src/components/ui/atoms/icon/index.tsx`
- Impact: File is unmaintainable. Dynamic key access with string concatenation bypasses TypeScript checking. If icon name doesn't exist, silently returns undefined.
- Fix approach: Use a proper lookup object, split into multiple files per icon set, or use a dynamic import strategy.

## Array Mutation Issues

**Array.pop() Mutates Input:**
- Issue: `apps/www/src/utils/toolbox.tsx` line 76 in `assign()` function: `const lastKey = fields.pop() || ''` mutates the `fields` array parameter
- Files: `apps/www/src/utils/toolbox.tsx`
- Impact: Function has side effects - calling code may not expect the input array to be modified. This is a source of subtle bugs.
- Fix approach: Use `fields.at(-1)` and `fields.slice(0, -1)` to avoid mutation.

**Array.shift() Mutates Input:**
- Issue: `apps/www/src/utils/cms/renderer/components.tsx` line 127 in `pageRenderer()`: `const banner = components?.[0]?.component === 'banner' ? components.shift() : null` mutates the `components` parameter
- Files: `apps/www/src/utils/cms/renderer/components.tsx`
- Impact: Side effect - the function modifies the input array, which could cause the same banner component to be rendered twice or missing from subsequent renders if the array is reused.
- Fix approach: Use array slicing or filtering instead of shift(): `components?.slice(1)` combined with proper destructuring.

## CMS Data Handling

**Console.log Left in Production:**
- Issue: `apps/cms/src/utils/toolbox.ts` line 156 has `console.log(e)` in error handler
- Files: `apps/cms/src/utils/toolbox.ts`
- Impact: Error details may leak to console in production. Should be removed or handled via proper logging.
- Fix approach: Remove console.log or route through proper logging system.

**Disabled Banner Component:**
- Issue: `apps/cms/src/utils/toolbox.ts` lines 47-59: Banner component functionality is commented out with TODO-like comment
- Files: `apps/cms/src/utils/toolbox.ts`
- Impact: Dead code that may confuse developers. If banner feature needs to be re-enabled, the commented code might be out of sync with current codebase.
- Fix approach: Either delete permanently or move to feature flag/config. Create proper issue tracking if this is planned.

## Security Concerns

**Slack Webhook URL in Config:**
- Issue: `apps/www/src/app/api/revalidate/route.ts` line 6 imports `slackBotURL` from server config. Revalidation endpoint at `/api/revalidate` posts to Slack webhook.
- Files: `apps/www/src/app/api/revalidate/route.ts`, `apps/www/configs/server.ts`
- Impact: If webhook URL becomes public, attackers can spam Slack. No rate limiting visible on this endpoint.
- Fix approach: Implement rate limiting, verify secret tokens from CMS webhook, or use environment-based feature flags.

**Missing Error Handling in Fetcher:**
- Issue: `apps/www/src/models/fetcher.model.ts` lines 40-43: JSON parsing errors are silently caught and return empty object `{}`
- Files: `apps/www/src/models/fetcher.model.ts`
- Impact: API failures masked as successful responses. Client code receiving empty object doesn't know if request succeeded or failed.
- Fix approach: Return error indicator or throw the error up the stack. Client code should handle "empty response" specially.

**Locale Cookie Not Validated:**
- Issue: `apps/www/src/middleware.ts` line 27: `localeFromCookie = request.cookies.get('NEXT_LOCALE')?.value as keyof typeof localesMap` casts cookie value without validation
- Files: `apps/www/src/middleware.ts`
- Impact: Cookie value could be tampered with. If cast doesn't match valid locales, middleware might not work as expected.
- Fix approach: Validate cookie value against allowed locales array before casting.

## Performance Concerns

**Large SVG Component:**
- Issue: `apps/www/src/components/ui/svgs/map/index.tsx` is 2691 lines - entirely inline SVG code with hardcoded coordinates
- Files: `apps/www/src/components/ui/svgs/map/index.tsx`
- Impact: Large bundle size contribution. Not lazy-loadable. Cannot be cached separately. Difficult to update.
- Fix approach: Extract to separate SVG file or use dynamic SVG generation. Consider lazy loading or async components.

**Icon Component Always Renders:**
- Issue: `apps/www/src/components/ui/atoms/icon/index.tsx` - Icon component always imports all 280+ heroicon variants. Dynamic rendering at line 1181 means all are bundled.
- Files: `apps/www/src/components/ui/atoms/icon/index.tsx`
- Impact: Significant bundle bloat. Each icon import adds to bundle size even if not used.
- Fix approach: Use dynamic imports: `const Icon = dynamic(() => import(`@heroicons/react/${name}Icon`))`

**Nested Object Mutation in Merge:**
- Issue: `apps/www/src/utils/toolbox.tsx` lines 82-90: `mergeNestedObject()` mutates both input objects deeply
- Files: `apps/www/src/utils/toolbox.tsx`
- Impact: Shared object references may have unintended side effects across the application if objects are reused.
- Fix approach: Implement immutable merge using spread operators or structured cloning.

## Test Coverage Gaps

**No Unit Tests Found:**
- Issue: Search for `.test.*` or `.spec.*` files returns no results. Storybook stories present (90 files) but no unit/integration tests.
- Files: Tests directory not found
- Impact: Critical: No automated testing. Regressions can occur undetected. Refactoring is high-risk. Type coverage depends entirely on TypeScript.
- Fix approach: Implement Jest or Vitest with minimum coverage thresholds. Start with critical utilities and CMS data flow.

## Locale Handling Fragility

**Locale Assignment Side Effects:**
- Issue: `apps/www/src/middleware.ts` lines 29-31 use statement expressions for assignment: `!locale && (locale = getLocale(request))` without proper control flow
- Files: `apps/www/src/middleware.ts`
- Impact: Hard to read, error-prone. If `locale` is already undefined after line 29, line 31 may not execute as intended.
- Fix approach: Use proper if statements instead of logical assignment expressions.

## CMS API Fragility

**Hardcoded Upload File ID:**
- Issue: `apps/cms/src/utils/toolbox.ts` line 20: `await strapi.entityService.findOne('plugin::upload.file', 2335)` - hardcoded file ID for default SEO image
- Files: `apps/cms/src/utils/toolbox.ts`
- Impact: If file 2335 is deleted or moved to different environment, all SEO images break. Not portable across Strapi instances.
- Fix approach: Store default image file ID in environment config or add fallback logic.

**Unnecessary Deep Populate:**
- Issue: `apps/cms/src/utils/toolbox.ts` lines 83-96: `createPopulateArray()` generates all possible populate paths dynamically by iterating all Strapi components. This is broad and may include sensitive data.
- Files: `apps/cms/src/utils/toolbox.ts`
- Impact: Complex queries that might be slow. May expose internal CMS structure to API responses. Hard to reason about what's being fetched.
- Fix approach: Define explicit populate arrays per content type instead of dynamically generating them.

## Dependency Risk

**Deprecated/Unmaintained Packages:**
- Issue: `fs` package `"0.0.1-security"` in root `package.json` line 44 - this is a Node.js built-in that shouldn't be in dependencies
- Files: `package.json`
- Impact: Unnecessary dependency. Built-in modules should not be in package.json.
- Fix approach: Remove from dependencies. Use Node.js built-in `fs` module directly.

**child_process Package:**
- Issue: `child_process` package `"^1.0.2"` in `apps/www/package.json` line 22 - this is also a built-in Node module
- Files: `apps/www/package.json`
- Impact: Unnecessary NPM package. Should use built-in.
- Fix approach: Remove from dependencies.

---

*Concerns audit: 2026-02-11*
