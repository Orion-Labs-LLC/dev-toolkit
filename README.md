# @boeschj/ts-tooling

A unified TypeScript tooling configuration package that provides ESLint, Prettier, and TypeScript configurations for modern development.

## Features

- **ESLint configurations** for TypeScript, React, and Next.js projects
- **Prettier configuration** with optimized formatting rules and plugin support
- **TypeScript configurations** for base and Next.js projects
- **Single package** eliminates the need for multiple configuration dependencies
- **Built with tsup** for optimized ESM output with TypeScript declarations

## Installation

```bash
npm install @boeschj/ts-tooling
# or
pnpm add @boeschj/ts-tooling
# or
yarn add @boeschj/ts-tooling
```

## Peer Dependencies

You'll need to install the following peer dependencies:

```bash
pnpm add -D eslint@^9.20.0 prettier@^3.4.2 typescript@^5.8.3
```

### Optional dependencies (included as regular dependencies, but may need peer installation in some setups)
```bash
# For Next.js projects (optional)
pnpm add -D @next/eslint-plugin-next@^15.1.6

# For Tailwind CSS support (optional)  
pnpm add -D eslint-plugin-tailwindcss@^3.18.0 prettier-plugin-tailwindcss@^0.6.11
```

## Usage

### ESLint Configuration

#### Base TypeScript Configuration
```js
// eslint.config.js
import { eslint } from '@boeschj/ts-tooling';

export default eslint.base;
```

#### React Configuration
```js
// eslint.config.js
import { eslint } from '@boeschj/ts-tooling';

export default eslint.react;
```

#### Next.js Configuration
```js
// eslint.config.js
import { eslint } from '@boeschj/ts-tooling';

export default eslint.next;
```

### Prettier Configuration

```js
// prettier.config.js
import { prettier } from '@boeschj/ts-tooling';

export default prettier;
```

### TypeScript Configuration

#### Base Configuration
```json
// tsconfig.json
{
  "extends": "@boeschj/ts-tooling/tsconfig/base"
}
```

#### Next.js Configuration
```json
// tsconfig.json
{
  "extends": "@boeschj/ts-tooling/tsconfig/next"
}
```

## Alternative Import Methods

You can also import configurations directly:

```js
// Direct imports
import eslintBase from '@boeschj/ts-tooling/eslint/base';
import eslintReact from '@boeschj/ts-tooling/eslint/react';
import eslintNext from '@boeschj/ts-tooling/eslint/next';
import prettierConfig from '@boeschj/ts-tooling/prettier';
```

## Configuration Details

### ESLint Features
- **Base**: Strict TypeScript rules with stylistic checking
- **React**: Includes React, React Hooks, JSX A11y, and Tailwind CSS rules
- **Next.js**: Extends React config with Next.js specific rules
- **Smart ignores**: Automatically ignores build directories, config files, and test files

### Prettier Features
- **Import sorting** with `@ianvs/prettier-plugin-sort-imports`
- **Tailwind CSS class sorting** with `prettier-plugin-tailwindcss`
- **Optimized for React/Next.js** with smart import organization
- **Consistent formatting** across TypeScript, JavaScript, and JSX files

### TypeScript Features
- **Strict mode** enabled with comprehensive type checking
- **Modern target** (ES2020) with latest features
- **Bundler resolution** for modern build tools
- **Next.js optimized** configuration with path mapping

## Development

### Building
```bash
pnpm build
```

### Type Checking
```bash
pnpm typecheck
```

### Cleaning
```bash
pnpm clean
```

## License

MIT - see LICENSE file for details.

## Author

Jordan Boesch

