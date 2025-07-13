# @boeschj/prettier-config

Shared Prettier configuration for new projects.

## Installation

```bash
npm install --save-dev @boeschj/prettier-config
```

## Usage

### Method 1: Package.json

Add to your `package.json`:

```json
{
  "prettier": "@boeschj/prettier-config"
}
```

### Method 2: Configuration File

Create a `.prettierrc.mjs` file:

```javascript
import config from "@boeschj/prettier-config";

export default config;
```

### Method 3: Extend Configuration

Create a `.prettierrc.mjs` file to customize:

```javascript
import baseConfig from "@boeschj/prettier-config";

export default {
  ...baseConfig,
  printWidth: 120, // Override specific options
};
```

## Prettier Ignore

Copy the included `.prettierignore` file to your project root, or add its contents to your existing `.prettierignore`.

## What's included

### Formatting Rules
- 100 character line width
- 2 space indentation
- Semicolons required
- Double quotes for strings
- Trailing commas (ES5 compatible)
- LF line endings
- Single attribute per line in JSX

### Plugins
- **Import Sorting**: Automatically sorts and groups imports
- **Tailwind CSS**: Sorts Tailwind classes for consistency

### Import Order
1. React imports
2. Next.js imports  
3. Third-party modules
4. Internal type imports (`@/types/*`)
5. Internal config imports (`@/config/*`)
6. Internal lib imports (`@/lib/*`)
7. Internal component imports (`@/components/*`)
8. Internal style imports (`@/styles/*`)
9. Internal app imports (`@/app/*`)
10. Relative imports

## Peer Dependencies

This config requires the following peer dependencies:

- `prettier`
- `@ianvs/prettier-plugin-sort-imports`
- `prettier-plugin-tailwindcss`

## Tailwind Configuration

If your project uses a custom Tailwind config path, you can override it:

```javascript
import baseConfig from "@boeschj/prettier-config";

export default {
  ...baseConfig,
  tailwindConfig: "./path/to/tailwind.config.js",
};
```