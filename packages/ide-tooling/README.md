# @boeschj/ide-tooling

Interactive CLI tool for setting up IDE configuration files in your development projects.

## Features

- 🎯 **Interactive Setup** - Choose exactly which config files you want
- 📁 **Multiple IDE Support** - Cursor, VS Code, and more
- 🔄 **GitHub Actions** - Ready-to-use CI workflow
- 🤖 **Claude AI Integration** - Project configuration for Claude
- ⚠️ **Safe Overwrite** - Warns before overwriting existing files

## Installation

```bash
npm install -g @boeschj/ide-tooling
```

Or use directly with npx:

```bash
npx @boeschj/ide-tooling init
```

## Usage

Navigate to your project directory and run:

```bash
ide-tooling init
```

Or specify a target directory:

```bash
ide-tooling init /path/to/your/project
```

## What Gets Installed

The tool can install the following configuration files:

### `.cursorrules`

- Cursor IDE rules and coding preferences
- TypeScript/JavaScript best practices
- Git workflow guidelines

### `claude.md`

- Claude AI project configuration
- Project overview and setup instructions
- Development commands and standards

### `.vscode/settings.json`

- VS Code workspace settings
- TypeScript and formatting preferences
- Editor optimizations

### `.vscode/extensions.json`

- Recommended VS Code extensions
- Essential tools for TypeScript development
- Linting, formatting, and productivity extensions

### `.github/workflows/ci.yml`

- GitHub Actions CI workflow
- TypeScript build and test automation
- Security auditing with pnpm

## Interactive Experience

```
🚀 IDE Tooling Setup
Target directory: /path/to/project

Select which configuration files to copy:

📁 .cursorrules - Cursor IDE rules and preferences (y/n): y
📁 claude.md - Claude AI project configuration (y/n): y
📁 .vscode/settings.json - VS Code workspace settings (y/n): n
📁 .vscode/extensions.json - VS Code recommended extensions (y/n): y
📁 .github/workflows/ci.yml - GitHub Actions CI workflow (y/n): y

📋 Will copy 4 file(s):
  • .cursorrules
  • claude.md
  • .vscode/extensions.json
  • .github/workflows/ci.yml

Proceed with copying? (y/n): y

🔄 Copying files...

✓ Copied .cursorrules to /path/to/project/.cursorrules
✓ Copied claude.md to /path/to/project/claude.md
✓ Copied extensions.json to /path/to/project/.vscode/extensions.json
✓ Copied ci.yml to /path/to/project/.github/workflows/ci.yml

✨ Setup complete!
📁 Successfully copied 4/4 files

💡 Next steps:
1. Restart VS Code to apply new settings
2. Install recommended extensions when prompted
3. Update claude.md with project-specific information
```

## Template Files

All template files are designed to work with:

- **TypeScript** projects with strict configuration
- **ESLint** and **Prettier** for code quality
- **pnpm** as the package manager
- **Modern ES modules** and tooling

## Customization

After installation, you can customize any of the copied files to match your specific project needs. The templates provide a solid starting point with best practices built in.

## Related Packages

- [`@boeschj/ts-tooling`](../ts-tooling) - TypeScript, ESLint, and Prettier configurations

## License

MIT - see [LICENSE](../../LICENSE) for details.
