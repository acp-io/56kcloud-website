# Coding Conventions

**Analysis Date:** 2026-02-11

## Naming Patterns

**Files:**
- Component files: Lowercase with hyphens (`button/index.tsx`, `language-switcher/index.tsx`)
- Model files: Lowercase with suffix `.model.ts` (`location.model.ts`, `button.model.ts`)
- Factory files: Lowercase with suffix `.factory.ts` (`cta.factory.ts`, `partner.factory.ts`)
- Story files: Match component name with `.stories.tsx` suffix (`tabs.stories.tsx`, `button.stories.tsx`)
- API route files: `route.ts` in route segments (`/api/draft/route.ts`, `/api/revalidate/route.ts`)
- Utility files: Descriptive lowercase names (`hubspot.ts`, `toolbox.tsx`)
- Config files: Descriptive lowercase names (`client.ts`, `server.ts`, `shared.ts`)

**Functions:**
- camelCase for all functions (`protectedAPI`, `getLocale`, `ctaFactory`, `sendEmail`)
- Factory functions: Named as `{singularName}Factory` or `{singularName}factory` (`ctaFactory`, `partnerFactory`)
- Export default for single component per file
- Named exports for utility/helper functions
- Async functions: Use `async`/`await` pattern (avoid callbacks)

**Variables:**
- camelCase for all variables (`buttonProps`, `localeFromCookie`, `buttonPropsChildren`)
- Constants in model files: camelCase (`buttonTones`, `buttonSizes`, `sizeClasses`)
- Destructured props follow camelCase
- Unused variables marked with underscore prefix when eslint disabled: `const [_, val]`

**Types:**
- PascalCase for type/interface names (`ButtonProps`, `ButtonPropsImpl`, `CTAProps`, `LocationObject`)
- Type files use `.model.ts` suffix
- Zod schemas: lowercase with `Schema` suffix (`locationSchema`, `teamMemberSchema`)
- Type inference from Zod: `z.infer<typeof schema>` pattern
- Component prop types: `{ComponentName}Props` naming (`ButtonPropsImpl`, `RootLayoutProps`)

**Constants:**
- camelCase for const arrays/objects (`buttonTones = ['primary', 'secondary']`)
- Use `as const` for tuple types that need type-safe variants
- Group related variants in single const declarations

## Code Style

**Formatting:**
- Prettier v3.3.3 with custom config
- Print width: 120 characters
- Tab width: 2 spaces
- No tabs, spaces only
- No semicolons (semi: false)
- Single quotes for strings and JSX attributes
- Trailing comma: none
- No bracket spacing: `{cn(...)}` not `{ cn(...) }`
- Arrow functions always with parens: `(props) =>` not `props =>`
- Single attribute per line in JSX (singleAttributePerLine: true)

**Linting:**
- ESLint with TypeScript parser (@typescript-eslint/parser v8.3.0)
- Config: extends `next/core-web-vitals`, `eslint:recommended`, `plugin:@typescript-eslint/recommended`
- Max warnings: 0 (fails on any warning)
- Plugins: `@typescript-eslint`, `sort-imports-es6-autofix`, `react`
- Ignored patterns: `/dist`, `node_modules`, `/types/generated`, `/cdk.out`, `/storybook-static`

**Rules:**
- Import sorting enforced via `sort-imports-es6-autofix` (memberSyntaxSortOrder: none, all, multiple, single)
- `react-hooks/exhaustive-deps`: off
- `import/no-anonymous-default-export`: off
- `@next/next/no-html-link-for-pages`: off
- `no-extra-semi`: off

## Import Organization

**Order:**
1. External packages (React, Next.js, third-party libraries)
2. Internal absolute imports (using `@/` path alias)
3. Relative imports (not typically used due to path alias)

**Examples:**
```typescript
// External packages first
import {NextRequest, NextResponse} from 'next/server'
import {z} from 'zod'
import {faker} from '@faker-js/faker'

// Internal imports using @/ alias
import {cn} from '@/utils/toolbox'
import {Fetcher} from '@/models/fetcher.model'
import {buttonTones} from '@/components/ui/atoms/button/button.model'

// Config imports
import {nextAPIToken} from '../../../configs/server'
```

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in tsconfig.json)
- Always prefer absolute imports over relative paths for code within src/
- Cross-directory imports always use `@/` alias

## Error Handling

**Patterns:**
- Try-catch blocks for async operations (async/await, not promises)
- Error responses return HTTP status codes: `new Response('message', {status: 401})`
- API errors throw Error with message: `throw Error(\`${res.status} ${detail}\`)`
- Form validation errors stored in component state and rendered conditionally
- Rejected promises use `Promise.reject(error)` pattern
- No explicit error logging to external services observed
- Client-side errors: Optional chaining (`?.`) and nullish coalescing (`??`)

**Example from `protectedAPI`:**
```typescript
export async function protectedAPI(request: Request, success: () => Promise<Response>) {
  const token = request.headers.get('Authorization')
  if (token === nextAPIToken) {
    return await success()
  } else {
    return new Response('Unauthorized', {status: 401, statusText: 'Unauthorized'})
  }
}
```

## Logging

**Framework:** Direct `console.log` usage (no logger abstraction)

**Patterns:**
- Minimal logging observed: only one instance (`console.log(url)` in `/api/draft/route.ts`)
- No error logging framework in place
- No structured logging observed
- Recommended: Use structured logging for production debugging

## Comments

**When to Comment:**
- Function/component purpose: None observed (code is self-documenting)
- Complex logic: One eslint disable comment with reason marker: `// eslint-disable-next-line @typescript-eslint/no-explicit-any`
- Implementation notes: Rarely used

**JSDoc/TSDoc:**
- Not used in this codebase
- Recommended for public APIs and utility functions

## Function Design

**Size:**
- Most functions 5-15 lines
- Complex functions (Button component): up to 40+ lines acceptable when class-based
- Utility functions: 5-20 lines, split into smaller functions for reuse

**Parameters:**
- Single object parameter pattern preferred for components: `(props: ButtonPropsImpl) => {}`
- Destructuring used in function signatures: `({className, ...props}: React.ComponentProps<typeof TabsPrimitive.Root>)`
- Optional parameters marked with `?` in types
- Type-safe parameter passing via TypeScript interfaces

**Return Values:**
- Components: JSX.Element or explicit React component type
- Utilities: Typed return values (string, object, ReactNode array, etc.)
- API routes: NextResponse or Response objects
- Async functions: Promise types explicitly typed (e.g., `Promise<Response>`)

**Example patterns:**
```typescript
// Component with spread props destructuring
function Tabs({className, ...props}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={cn('flex flex-col gap-2', className)} {...props} />
}

// Class-based wrapper for complex prop logic
export class ButtonProps {
  constructor(props: ButtonPropsImpl) { /* initialization */ }
  public buttonVariants() { /* computed styles */ }
}

// Utility function with typed parameters and return
export function toQueryParam(string: string) {
  return slugify(string.toLowerCase())
}
```

## Module Design

**Exports:**
- Default export for single component per file: `export default forwardRef(Button)`
- Named exports for utilities: `export function cn(...) { }`
- Named exports for types: `export type LocationObject = z.infer<typeof locationSchema>`
- Multiple exports from models: Both schema and inferred type exported

**Barrel Files:**
- Used in UI components: `index.tsx` exports multiple sub-components
  ```typescript
  // From tabs/index.tsx
  export {Tabs, TabsList, TabsTrigger, TabsContent}
  ```
- Simplifies imports: `import {Tabs, TabsList} from '@/components/ui/molecules/tabs'`

**File Structure Pattern:**
- One component function per file (unless barrel export)
- Model/type definition separate file with `.model.ts` suffix
- Story file alongside component: `component-name/index.tsx` + `component-name/component-name.stories.tsx`
- Utilities grouped by domain: `/utils/cms`, `/utils/api`, `/utils/[domain]`

## TypeScript Configuration

**Strict Mode:** Enabled
- `strict: true` in tsconfig.json
- `forceConsistentCasingInFileNames: true`
- `noEmit: true` for src files
- Path resolution via `@/*` alias

**Type Safety:**
- `as const` used for literal types (button variants, sizes)
- Zod schemas for runtime validation and type inference
- React component types via `React.ComponentProps<typeof Component>`
- No `any` type except explicitly disabled with eslint comment

---

*Convention analysis: 2026-02-11*
