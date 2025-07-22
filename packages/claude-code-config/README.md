# @boeschj/claude-code-config

Comprehensive Claude Code configuration package with specialized commands for different development workflows.

## Features

- 🤖 **Claude Configuration** - Project-specific Claude AI setup
- 🔍 **PR Review** - Structured pull request review guidelines
- 🔒 **Security Scanning** - Security analysis and vulnerability detection
- 🔧 **Refactoring** - Code refactoring best practices and patterns
- 🏗️ **Infrastructure** - Infrastructure review and optimization guidelines
- 🚀 **Project Initialization** - Complete project setup with best practices

## Installation

```bash
npm install -g @boeschj/claude-code-config
```

Or use directly with npx:

```bash
npx @boeschj/claude-code-config <command>
```

## Commands

### `claude-init`
Sets up basic Claude configuration for your project.

```bash
claude-init [target-directory]
```

Creates `claude.md` with comprehensive development guidelines and best practices.

### `claude-pr-review`
Generates PR review configuration and checklists.

```bash
claude-pr-review [target-directory]
```

Creates `.claude-pr-review.md` with:
- Code quality review checklist
- Security review guidelines
- Comment templates for common issues
- Blocking vs non-blocking issue classification

### `claude-security-scan`
Creates security analysis configuration.

```bash
claude-security-scan [target-directory]
```

Creates `.claude-security-scan.md` with:
- OWASP Top 10 vulnerability checks
- Input validation patterns
- Authentication and authorization review
- Dependency security scanning
- Infrastructure security guidelines

### `claude-refactor`
Sets up refactoring guidelines and patterns.

```bash
claude-refactor [target-directory]
```

Creates `.claude-refactor.md` with:
- When and how to refactor safely
- Common refactoring patterns
- DRY principle explained correctly
- Performance optimization guidelines
- Anti-pattern identification

### `claude-infrastructure`
Generates infrastructure review configuration.

```bash
claude-infrastructure [target-directory]
```

Creates `.claude-infrastructure.md` with:
- Cloud infrastructure best practices
- Container security and optimization
- Monitoring and observability setup
- Disaster recovery planning
- Cost optimization strategies

### `claude-init-project`
Complete project initialization with interactive setup.

```bash
claude-init-project
```

Interactive wizard that creates:
- **TypeScript Library** - Modern library with tsup, vitest, and full tooling
- **Web Application** - React + Vite setup with TypeScript
- **API Service** - Express.js API with security middleware

Features:
- Automatic project structure creation
- Pre-configured package.json with scripts
- TypeScript, ESLint, and Prettier configuration
- Testing setup with Vitest
- Build configuration with tsup/vite
- README with project-specific instructions
- Optional Claude configuration setup

## Configuration Files Created

### `claude.md`
Comprehensive development guidelines including:
- Self-documentation instructions
- Type safety principles (no `any`, branded types)
- Functional programming patterns
- Security-first mindset
- Performance optimization guidelines
- Code quality standards
- Refactoring methodology

### `.claude-pr-review.md`
PR review checklist covering:
- Type safety verification
- Security vulnerability checks
- Architecture and design review
- Testing requirements
- Documentation standards

### `.claude-security-scan.md`
Security analysis framework:
- Input validation patterns
- Authentication/authorization checks
- OWASP Top 10 vulnerability assessment
- Dependency security scanning
- Infrastructure security review

### `.claude-refactor.md`
Refactoring best practices:
- When to refactor (and when not to)
- Common refactoring patterns
- Understanding DRY correctly
- Performance considerations
- Safe refactoring workflow

### `.claude-infrastructure.md`
Infrastructure review guidelines:
- Cloud architecture patterns
- Container best practices
- Monitoring and alerting setup
- Disaster recovery planning
- Cost optimization strategies

## Usage Examples

### Setup Basic Claude Configuration
```bash
cd my-project
npx @boeschj/claude-code-config claude-init
```

### Generate Security Review Checklist
```bash
npx @boeschj/claude-code-config claude-security-scan
# Creates .claude-security-scan.md with comprehensive security guidelines
```

### Create New TypeScript Project
```bash
npx @boeschj/claude-code-config claude-init-project
# Interactive wizard for creating optimized TypeScript projects
```

### Setup PR Review Process
```bash
npx @boeschj/claude-code-config claude-pr-review
# Creates structured PR review guidelines for your team
```

## Integration with Development Workflow

### CI/CD Integration
Reference the generated configuration files in your CI/CD pipelines:

```yaml
# .github/workflows/review.yml
name: Code Review
on: [pull_request]

jobs:
  security-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Security Scan
        run: |
          # Use .claude-security-scan.md as reference
          npm audit
          npm run lint:security
```

### Team Adoption
1. Generate configuration files for your project type
2. Customize the generated templates for your specific needs
3. Share with your team for consistent practices
4. Reference during code reviews and security assessments

## Philosophy

This package embodies a **security-first, type-safe, functional** approach to development:

- **Type Safety**: Never bypass the type system without justification
- **Security**: Security considerations in every aspect of development
- **Functional Patterns**: Pure functions, immutability, composition
- **Minimal Code**: Leverage existing infrastructure and dependencies
- **Performance**: Optimize for build time and developer experience
- **Quality**: Comprehensive testing and static analysis

## Related Packages

- [`@boeschj/ts-tooling`](../ts-tooling) - TypeScript, ESLint, and Prettier configurations
- [`@boeschj/ide-tooling`](../ide-tooling) - IDE configuration and setup

## License

MIT - see [LICENSE](../../LICENSE) for details.