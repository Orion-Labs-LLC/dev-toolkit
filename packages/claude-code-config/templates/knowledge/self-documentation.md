# Self-Documentation Instructions

When working in any project, you MUST discover and document the tech stack by reading these files:

1. Tech Stack: Check `package.json` for frameworks, libraries, and dependencies
2. Build Tools: Check `package.json` scripts section for build, test, lint commands
3. TypeScript Config: Read `tsconfig.json` for strict mode settings and compiler options
4. Project Structure: Examine the file system to understand component organization
5. Naming Conventions: Observe existing files to understand naming patterns (kebab-case, etc.)
6. Linting/Formatting: Check `package.json` for ESLint/Prettier configuration
7. CI/CD: Look for `.github/workflows/` or similar CI configuration
8. Codebase documentation - README files or JSDOC code blocks.

At the end of every significant change, update this CLAUDE.md file with:

- Any new patterns discovered
- Gotchas or learnings that you wish you knew when you started
- Architecture decisions made
- Any deviations from these principles and their justification
- Frequent linting errors so you don't keep repeating them

This ensures accumulated knowledge benefits future work.

Additional discovery requirements:

- Check existing dependencies before writing new code. Check package manifests, import statements, and module structures to gain an understanding of the codebase dependencies
- Reference infrastructure documentation: look for architecture guides, service maps, or infrastructure files in the project
- Follow existing patterns: understand the project's established conventions before introducing new approaches