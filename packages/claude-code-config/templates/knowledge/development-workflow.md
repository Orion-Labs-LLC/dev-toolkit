# Core Philosophy

EVERY LINE OF CODE YOU WRITE OR CHANGE IS A LIABILITY. Every single line of production code you write or change must be minimalistic and efficient code. Before writing code, you should ALWAYS look for an opportunity to reuse existing code, or utilize a dependency from the codebase.

I ruthlessly enforce type safety, write declarative, idiomatic code, and follow modern functional programming best practices. This is not a suggestion or a preference. it is the fundamental practice that enables all other principles in this document. All work should be done in small, incremental changes that maintain a working state throughout development.

## Key Principles

- Write Minimal new code: Leverage existing infrastructure and dependencies whenever possible
- Type safety first: Use the strictest type checking available in your language
- Functional patterns: Use pure functions, immutability, composition
- Performance focused: Optimize for both compile/build time and runtime
- Runtime validation: Validate all external data with schemas
- Idiomatic code: Follow language conventions and natural patterns
- Security mindset: Identify security gaps in code and notify the user immediately if you see anything. You should have a security-first mindset when you write your own code

## Performance Philosophy

Optimize for the right things:

- Build/compile time: Fast feedback loops enable rapid development
- Runtime performance: But only when it matters (profile first)
- Developer experience: Code that's easy to understand and modify
- Memory efficiency: Avoid unnecessary allocations and copies

Performance principles:

- Have the user measure before optimizing: Suggest profiling opportunities when you suspect something could have performance implications to identify actual bottlenecks
- Optimize algorithms before micro-optimizations: O(n²) to O(n log n) beats micro-optimizations
- Leverage language idioms: Use the patterns the language/runtime optimizes for
- AVOID PREMATURE OPTIMIZATIONS: Write clear code first, optimize when evidence shows need

# Development Workflow

## Process

1. Explore and understand - Read relevant code, understand existing patterns, don't write yet
2. Plan the approach - Think through the solution and how it fits existing architecture
3. Implement minimally - Write the simplest code that satisfies the requirements
4. Assess refactoring - Be specific about what improvements would add value
5. Commit with clear message - Use conventional commits

Critical workflow principle: If you find yourself writing code without understanding the expected behavior or how it fits the existing system, STOP and clarify requirements first.

## Expectations

When working with my code:

1. Think deeply before making any edits
2. USE EXISTING LIBRARIES AND INFRASTRUCTURE. I cannot overstate this enough. If you find yourself writing a custom useEffect hook for React data fetching, you should stop immediately and search for a dependency that can do this. If one does not exist, you should be searching the web for a new dependency to suggest to the user.
3. Understand the full context of the code and requirements by reading the codebase
4. Think from first principles - don't make assumptions about requirements or implementation
5. Ask clarifying questions when requirements are ambiguous
6. Keep project docs current - update this CLAUDE.md with learnings and discoveries, update existing JSDOC comments, README files, etc. as needed.

## Code Changes

When suggesting or making changes:

- Understand the testing approach. If tests exist, maintain coverage. Otherwise, identify situations where a test may be needed to prevent unintentional regressions (e.g. highly complex workflows)
- Use the strictest analysis available: Enable all linting, type checking, and static analysis tools
- Assess refactoring opportunities after implementing features (but only refactor if it adds value)
- After refactoring, verify all existing static analysis passes, then commit
- Respect the existing patterns and conventions discovered from the codebase
- Keep changes small and incremental
- Provide rationale for significant design decisions

## Communication

- Be explicit about trade-offs in different approaches and implementation choices
- Explain the reasoning behind significant design decisions
- Flag any deviations from these guidelines with clear justification
- Suggest improvements that align with these principles when you see opportunities
- When unsure, ask for clarification rather than making assumptions