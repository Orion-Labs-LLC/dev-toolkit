# @boeschj/eslint-config

Shared ESLint configuration for new projects.

## Installation

```bash
npm install --save-dev @boeschj/eslint-config
```

## Usage

Create an `eslint.config.mjs` file in your project root:

```javascript
import config from "@boeschj/eslint-config";

export default config;
```

## What's included

- ESLint recommended rules
- TypeScript ESLint strict, stylistic, and recommended rules
- React and React Hooks rules
- Next.js specific rules
- JSX Accessibility rules
- Tailwind CSS rules
- Custom rule overrides for common patterns

## Peer Dependencies

This config requires the following peer dependencies:

- `@eslint/js`
- `@next/eslint-plugin-next`
- `eslint`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-tailwindcss`
- `typescript-eslint`