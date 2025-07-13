# Orion Labs Shared Configs

## Description

This project contains shared configurations to help us be more consistent with tooling across projects, and to spin up new projects faster. 

## Packages

### ts-tooling

#### Description
Contains a set of shared eslint, prettier, and tsconfig configurations for use in TypeScript projects. These configurations are highly opinionated, and make strong assumptions about the tech stack they're used in. ts-tooling is targeted for the following:

Frameworks:
- React > v19
- Next.js > v15
- Node.js > v23

Languages:
- TypeScript > v5

Libraries:
- TailwindCSS > v3 (for now 😬)

Build Tools:
- Modern bundlers (Vite, Esbuild, Bun)

Other:
- Heavily assumes ESM module resolution
- Node.js 23+ or Bun runtimes


As this config was intended to be very forward facing, assume limited/no backwards compatibility. These configs will also not be ideal for `tsc` as it reflects my personal preference of using bundlers for compiling projects. 

#### Features

##### ESLint Configurations:

Features: 
- Enforces strict type checking and stylistic consistency
- Enforces import organization with type import consistency
- Enforces accessibility best practices for React/Next.js
- Enforces Next.js development patterns and SEO optimization
- TailwindCSS class organization and best practices


Extends @eslint/js recommended rules and typescript-eslint strict + stylistic type-checked configurations. Includes plugins for:

Base config:

@eslint/js (recommended) - Core JavaScript linting rules
typescript-eslint (strictTypeChecked + stylisticTypeChecked) - Strict TypeScript-aware linting with style enforcement

React:

eslint-plugin-react - React-specific linting (hooks rules, JSX patterns)
eslint-plugin-react-hooks - Enforces Rules of Hooks for safe React usage
eslint-plugin-jsx-a11y - Accessibility linting for inclusive UIs
eslint-plugin-tailwindcss - TailwindCSS class organization and conflict detection

Next.js:

@next/eslint-plugin-next (recommended + core-web-vitals) - Next.js best practices and performance optimization

##### TSConfig Configurations:

Features:

Maximum type safety with all strict options enabled
Modern ESM module syntax with verbatimModuleSyntax
Environment-appropriate library definitions (DOM vs Node.js)
Bundler-optimized compilation (not tsc compatible)

Extends @tsconfig/strictest for maximum type safety and @total-typescript/tsconfig for modern environment-specific settings:

Base:

@tsconfig/strictest - Maximum TypeScript strictness (unused vars, unreachable code, exact optional properties, etc.)
Adds modern module syntax enforcement and build optimizations


React:

@total-typescript/tsconfig/bundler/dom/app - DOM types and bundler-optimized settings for React apps
Modern JSX transform (no React imports required)


Next.js:

Extends React config with Next.js TypeScript plugin integration
Optimized caching and build performance


Node.js:

@total-typescript/tsconfig/bundler/no-dom/app - Server-side types without DOM globals
Node.js type definitions included

## Getting Started

### Installation

1. Install the package:
```bash
pnpm install --D @boeschj/ts-tooling
```

2. Install peer dependencies:
```bash
npx install-ts-tooling-peerdeps
```

### Configuration

#### ESLint Setup

Create an `eslint.config.mjs` file in your project root if you don't have one already:

**Base TypeScript:**
```javascript
import config from '@boeschj/ts-tooling/eslint';
export default config;
```

**React Projects:**
```javascript
import { react } from '@boeschj/ts-tooling/eslint';
export default react;
```

**Next.js Projects:**
```javascript
import { next } from '@boeschj/ts-tooling/eslint';
export default next;
```

#### Prettier Setup

Create a `prettier.config.mjs` file in your project root:

```javascript
import config from '@boeschj/ts-tooling/prettier';
export default config;
```

#### TSConfig Setup

**Base TypeScript:**
```json
{
  "extends": "@boeschj/ts-tooling/tsconfig"
}
```

**React Projects:**
```json
{
  "extends": "@boeschj/ts-tooling/tsconfig/react"
}
```

**Next.js Projects:**
```json
{
  "extends": "@boeschj/ts-tooling/tsconfig/next"
}
```

**Node.js Projects:**
```json
{
  "extends": "@boeschj/ts-tooling/tsconfig/node"
}
```