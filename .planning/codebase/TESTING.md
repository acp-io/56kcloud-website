# Testing Patterns

**Analysis Date:** 2026-02-11

## Test Framework

**Runner:**
- Storybook v7.6.7 - Primary testing and documentation tool
- Config: `apps/www/.storybook/main.ts`
- No Jest, Vitest, or other unit test runner detected

**Assertion Library:**
- Storybook test addon (@storybook/test) for interactive testing
- No separate assertion library (Jest expect, Vitest, etc.)

**Run Commands:**
```bash
npm run storybook                # Start Storybook dev server on port 6006
npm run build-storybook          # Build static Storybook for CI/hosting
npm run storybook:check          # Run storybook-checker script (custom validation)
```

**Storybook Configuration:**
- Port: 6006
- Autodocs enabled (tags: ['autodocs'])
- Next.js integration via @storybook/nextjs
- Tailwind CSS styling plugin
- Theming via custom preview configuration

## Test File Organization

**Location:**
- Test factories: `apps/www/src/tests/factories/`
- Storybook stories: Co-located with components (`component-name/component-name.stories.tsx`)
- No separate test directory for unit/integration tests

**Naming:**
- Story files: `{component-name}.stories.tsx`
- Factory files: `{singular-name}.factory.ts`
- Total of 16 factory files found

**Structure:**
```
apps/www/src/
├── components/
│   └── ui/
│       ├── atoms/
│       │   └── button/
│       │       ├── index.tsx
│       │       ├── button.model.ts
│       │       └── button.stories.tsx
│       ├── molecules/
│       │   └── tabs/
│       │       ├── index.tsx
│       │       └── tabs.stories.tsx
└── tests/
    └── factories/
        ├── cta.factory.ts
        ├── partner.factory.ts
        └── ... (16 total)
```

## Test Structure

**Suite Organization:**
```typescript
// From tabs.stories.tsx - Storybook component story pattern
import {Tabs, TabsContent, TabsList, TabsTrigger} from './index'
import type {Meta} from '@storybook/react'

const meta = {
  title: 'components/Molecules/Tabs',
  component: Tabs,
  tags: ['autodocs']
} satisfies Meta<typeof Tabs>

export default meta

export const Default = {
  name: 'Default',
  render: () => (
    <Tabs defaultValue='message'>
      <TabsList>
        <TabsTrigger value='message'>Message</TabsTrigger>
        <TabsTrigger value='calendar'>Calendar</TabsTrigger>
      </TabsList>
      <TabsContent value='message'>Message</TabsContent>
      <TabsContent value='calendar'>Calendar</TabsContent>
    </Tabs>
  )
}
```

**Patterns:**
- Meta configuration with title, component, and autodocs tag
- Named story exports (const Default, const Disabled, const WithError, etc.)
- Render function for story UI
- Component prop types: `satisfies Meta<typeof Component>`
- Autodocs tags enable automatic documentation generation
- Story name property for explicit naming

## Mocking

**Framework:** Faker.js v8.3.1 for data generation

**Patterns:**
```typescript
// From cta.factory.ts
import {CTAProps} from '@/models/cta.model'
import {buttonTones} from '@/components/ui/atoms/button/button.model'
import {faker} from '@faker-js/faker'

export type CtaFactoryProps = {
  tone?: (typeof buttonTones)[number]
  link?: string
  title?: string
}

export function ctaFactory(props?: CtaFactoryProps): CTAProps {
  return {
    tone: props?.tone || faker.helpers.arrayElement(buttonTones),
    link: props?.link || '/',
    title: props?.title || faker.lorem.words(2)
  }
}
```

**Patterns:**
```typescript
// From partner.factory.ts - Composing factories
import {Partner} from '@/models/partner.model'
import {faker} from '@faker-js/faker'
import {imageFactory} from './image.factory'

export default function partnerFactory(): Partner {
  return {
    id: faker.number.int(),
    name: faker.company.name(),
    link: faker.internet.url(),
    image: imageFactory({category: 'logo'})
  }
}
```

**What to Mock:**
- External API responses (use factories for data)
- Image data (imageFactory)
- Form data (factories with optional overrides)
- Business entities (Partner, CTA, CaseStudy, etc.)
- Variant selection from enums (faker.helpers.arrayElement)

**What NOT to Mock:**
- Component rendering (use actual components in stories)
- Tailwind styling (test actual CSS classes)
- Path aliasing (@/ imports)
- React hooks behavior (use real hooks)

## Fixtures and Factories

**Test Data:**
```typescript
// Factory with optional overrides
export function ctaFactory(props?: CtaFactoryProps): CTAProps {
  return {
    tone: props?.tone || faker.helpers.arrayElement(buttonTones),
    link: props?.link || '/',
    title: props?.title || faker.lorem.lorem.words(2)
  }
}

// Usage in story: Can override any field
export const WithSecondaryTone = {
  render: () => <CTAComponent {...ctaFactory({tone: 'secondary'})} />
}

// Or use defaults
export const Default = {
  render: () => <CTAComponent {...ctaFactory()} />
}
```

**Location:**
- `apps/www/src/tests/factories/` - All factory files
- 16 factory files: cta, company, icon, tag, solution, case-study, location, partner, team-member, feature, image, and others
- No separate fixtures directory; factories generate data on-demand

**Factory Naming Conventions:**
- Default export for single factory: `export default function partnerFactory() { }`
- Named export for factories with variants: `export function ctaFactory(props) { }`
- Return type matches the model type imported: `Partner`, `CTAProps`, etc.

## Coverage

**Requirements:** Not enforced (no test coverage configuration found)

**View Coverage:**
- Not applicable - no test runner with coverage reporting

**Testing Approach:**
- Storybook stories provide visual coverage documentation
- Autodocs tags generate auto-generated documentation from stories
- No quantitative coverage metrics tracked
- All component stories exported as named exports for autodocs

## Test Types

**Unit Tests:**
- No traditional unit tests found (no Jest/Vitest config)
- Storybook stories act as component unit tests
- Factory functions provide data for component testing

**Integration Tests:**
- No integration test framework detected
- Storybook interactions addon (@storybook/addon-interactions) available but not actively used
- API route testing: Done manually or in CI pipeline

**E2E Tests:**
- Playwright or Cypress not detected
- Not implemented in this codebase
- Recommended for future: Add e2e tests for critical user flows

## Common Patterns

**Component Story Structure:**
```typescript
// Basic story with automatic documentation
const meta = {
  title: 'components/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    tone: {options: buttonTones, control: {type: 'select'}},
    variant: {options: buttonVariants, control: {type: 'select'}}
  }
} satisfies Meta<typeof Button>

export default meta

// Story with render function
export const Default = {
  name: 'Default',
  render: () => <Button tone='primary' variant='default'>Click Me</Button>
}

// Story demonstrating all variants
export const AllTones = {
  name: 'All Tones',
  render: () => (
    <>
      {buttonTones.map((tone) => (
        <Button key={tone} tone={tone}>
          {tone}
        </Button>
      ))}
    </>
  )
}
```

**Async Testing:**
- Not formally implemented
- API calls tested via actual requests (no mocking framework)
- Use factories to create async test data

**Error Testing:**
- Input component accepts error prop
- Error displayed conditionally: `{error ? <div>{error}</div> : null}`
- Error story demonstrates error state:
  ```typescript
  export const WithError = {
    name: 'With error',
    render: () => <Input id='email' label='Email' error='Invalid email' />
  }
  ```

## Storybook Configuration Details

**Main Config (`apps/www/.storybook/main.ts`):**
- Framework: @storybook/nextjs
- Story patterns: `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Addons: links, essentials, onboarding, interactions, styling
- Webpack plugin for tsconfig path resolution
- Auto-generated types support

**Preview Config (`apps/www/.storybook/preview.ts`):**
- Global CSS import: `../src/styles/global.css`
- Tailwind config integration for theme colors
- Background preset: 56kcloud theme with background color from tailwind config
- Next.js app directory support enabled
- Control matchers for background/color properties

## Story Examples

**Button Story:**
```typescript
// button.stories.tsx
import {ButtonPropsImpl, buttonAlignments, buttonShapes, buttonSizes, buttonTones, buttonVariants} from './button.model'
import Button from './index'
import type {Meta} from '@storybook/react'

const meta = {
  title: 'components/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    tone: {options: buttonTones, control: {type: 'select'}},
    variant: {options: buttonVariants, control: {type: 'select'}},
    size: {options: buttonSizes, control: {type: 'select'}},
    shape: {options: buttonShapes, control: {type: 'select'}},
    align: {options: buttonAlignments, control: {type: 'select'}}
  }
} satisfies Meta<typeof Button>

export default meta

export const Default = {
  name: 'Default',
  render: () => <Button>Default Button</Button>
}
```

**Card Story:**
```typescript
// article.stories.tsx
export const Default = {
  name: 'Default',
  render: () => <ArticleCard {...articleCardFactory()} />
}
```

## Custom Testing Tools

**Storybook Checker Script:**
- Location: `/scripts/storybook-checker.ts`
- Run: `npm run storybook:check`
- Purpose: Custom validation of Storybook stories (not documented in codebase)
- Executable via tsx runner

## Testing Recommendations

1. **Add Unit Tests:** Consider Jest or Vitest for utility function testing
2. **Add E2E Tests:** Playwright or Cypress for critical user flows
3. **API Route Testing:** Add route handlers for testing `/api` endpoints
4. **Coverage Reporting:** Configure coverage thresholds for CI/CD
5. **Integration Tests:** Test component combinations with real data
6. **Visual Regression:** Consider Percy or similar for visual testing in Storybook

---

*Testing analysis: 2026-02-11*
