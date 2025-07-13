# @boeschj/tsconfig

Shared TypeScript configuration for new projects.

## Installation

```bash
npm install --save-dev @boeschj/tsconfig
```

## Usage

### Base Configuration

For general TypeScript projects, extend the base configuration in your `tsconfig.json`:

```json
{
  "extends": "@boeschj/tsconfig"
}
```

### Next.js Configuration

For Next.js projects, use the Next.js-specific configuration:

```json
{
  "extends": "@boeschj/tsconfig/next.json"
}
```

### Custom Paths

If you need custom path mappings, you can override them:

```json
{
  "extends": "@boeschj/tsconfig/next.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"]
    }
  }
}
```

## What's included

### Base Configuration
- ES2020 target with modern library support
- Strict TypeScript checking
- Module resolution for modern bundlers
- JSX preservation for framework processing
- Enhanced type safety options

### Next.js Configuration
- Extends base configuration
- Next.js plugin integration
- Standard Next.js file includes
- Path mapping for `@/*` imports

## Available Configurations

- `@boeschj/tsconfig` - Base TypeScript configuration
- `@boeschj/tsconfig/base.json` - Base configuration (explicit)
- `@boeschj/tsconfig/next.json` - Next.js specific configuration