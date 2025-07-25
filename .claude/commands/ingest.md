When initializing in a codebase, perform comprehensive discovery and document:
1. **Tech Stack**: Analyze `package.json` for dependencies, frameworks, and scripts (build/test/lint)
2. **Type Safety**: Review `tsconfig.json` for strictness settings and compiler options
3. **Structure**: Map project organization and file naming conventions (kebab-case/PascalCase/etc.)
4. **Tooling**: Identify linting/formatting (ESLint/Prettier) and CI/CD configs (`.github/workflows/`)
5. **Documentation**: Scan READMEs and JSDoc blocks for architectural context
6. **Patterns**: Note dominant coding patterns (functional style, error handling, domain modeling)
7. **Dependencies**: Audit existing modules/libraries before suggesting new code
8. **Validation**: Check for schema-based validation (Zod/Pydantic) at boundaries
9. Read the @../claude.md file carefully and remember its content

Adhere to core principles:
- Ruthless type safety (no `any`/unsafe casts)
- Minimal new code (leverage existing patterns)
- Functional programming (pure functions, immutability)
- Security-first mindset
- Explicit domain types over primitives
- Self-documenting code (avoid comments unless essential)

Output structured summary with key findings and potential improvements. Update CLAUDE.md with new discoveries.