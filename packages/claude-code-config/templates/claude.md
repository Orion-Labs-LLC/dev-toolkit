## Self-Documentation Instructions

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
- Frequent linting errors so you don’t keep repeating them

This ensures accumulated knowledge benefits future work.

Additional discovery requirements:

- Check existing dependencies before writing new code. Check package manifests, import statements, and module structures to gain an understanding of the codebase dependencies
- Reference infrastructure documentation: look for architecture guides, service maps, or infrastructure files in the project
- Follow existing patterns: understand the project's established conventions before introducing new approaches

---

## Core Philosophy

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

## Type Safety Principles

### NEVER BYPASS THE TYPE SYSTEM

- NO escape hatches: Avoid `any`, `unsafe`, `interface{}`, `void*`, `Object`, etc.
- NO type coercion unless the user approves it (e.g. it would be so much effort it’s not worth it)
- NO suppressing type errors (`@ts-ignore`, `# type: ignore`, etc.) without justification
- These rules apply to ALL code including tests, scripts, and prototypes
- Remember: Runtime safety equals compile-time safety in importance

### Prefer Explicit Types

- Favor explicit types over inference where it aids clarity and safety
- Use branded/wrapper types for domain concepts instead of primitives
- Leverage language-specific utility types (`Pick`, `Omit`, `Optional`, etc.)
- Create domain-specific types that represent your business concepts

```tsx
// TypeScript example
type UserId = string & { readonly brand: unique symbol };
type PaymentAmount = number & { readonly brand: unique symbol };

```

```python
# Python example
from typing import NewType
UserId = NewType('UserId', str)
PaymentAmount = NewType('PaymentAmount', Decimal)

```

```rust
// Rust example
#[derive(Debug, Clone)]
pub struct UserId(String);

#[derive(Debug, Clone)]
pub struct PaymentAmount(Decimal);

```

### Schema-First Development

Always define your data schemas first, then derive types from them:

1. Define schema with validation rules using your language's validation library
2. Derive types from schema
3. Use schema at all external boundaries (APIs, file I/O, user input, database)

Implementation by language:

- TypeScript: Zod
- Python: Pydantic

### Error Handling Philosophy

**Principle**: Make errors explicit and recoverable where possible

Prefer explicit error types:

- Exceptions with clear hierarchy (Python, Java, C#)
- Explicit error returns (Go)
- Optional/Maybe types for nullable values

### Domain Modeling Principles

Create types that represent your domain concepts, not just technical primitives:

Replace primitives with domain types:

- `UserId` instead of `string`
- `EmailAddress` instead of `string`
- `PaymentAmount` instead of `number`
- `PostalCode` instead of `string`

Benefits:

- Prevents mixing up similar-typed parameters
- Makes function signatures self-documenting
- Enables domain-specific validation
- Catches errors at compile time

Implementation varies by language:

- Strong typing: Use branded types, newtypes, or wrapper structs
- Runtime validation: Embed validation in type constructors
- Serialization: Ensure domain types serialize/deserialize correctly

## Code Quality Standards

### Avoid Comments in Code

Generally, code should be self-documenting through clear naming and structure. Comments often indicate that the code itself is not clear enough.

```tsx
// Avoid: Comments explaining what the code does
const calculateDiscount = (price: number, customer: Customer): number => {
  // Check if customer is premium
  if (customer.tier === "premium") {
    return price * 0.8; // Apply 20% discount for premium customers
  }
  return price * 0.9; // Regular customers get 10% discount
};

// Good: Self-documenting code with clear names
const PREMIUM_DISCOUNT_MULTIPLIER = 0.8;
const STANDARD_DISCOUNT_MULTIPLIER = 0.9;

const isPremiumCustomer = (customer: Customer): boolean => {
  return customer.tier === "premium";
};

const calculateDiscount = (price: number, customer: Customer): number => {
  const discountMultiplier = isPremiumCustomer(customer)
    ? PREMIUM_DISCOUNT_MULTIPLIER
    : STANDARD_DISCOUNT_MULTIPLIER;

  return price * discountMultiplier;
};

```

**Exceptions**:

- Sometimes we need to communicate why, not what, code is doing. The following are examples where code comments are necessary
    - Business logic that contradicts intuition
    - TODOs with issue tracker references
    - JSDOC style comment that enriches intellisense for ease of use/comprehension by future developers

### Prefer Options Objects as Default

Use options objects for function parameters as the default pattern. Only use positional parameters when there's a clear, compelling reason (e.g., single-parameter pure functions, well-established conventions like `map(item => item.value)`).

```tsx
// Avoid: Multiple positional parameters
const createPayment = (
  amount: number,
  currency: string,
  cardId: string,
  customerId: string,
  description?: string
): Payment => { /* implementation */ };

// Good: Options object with clear property names
type CreatePaymentOptions = {
  amount: number;
  currency: string;
  cardId: string;
  customerId: string;
  description?: string;
};

const createPayment = (options: CreatePaymentOptions): Payment => {
  const { amount, currency, cardId, customerId, description } = options;
  // implementation
};

```

### Code Structure Rules

- No nested if/else statements or ternaries - use early returns, guard clauses, or composition
- Avoid deep nesting in general (max 2 levels)
- Keep functions small and focused on a single responsibility (typically 20-30 lines max)
- Prefer flat, readable code over “clever” abstractions
- Modular organization - consistent file and module structure
- Comprehensive type checking - both static analysis and runtime validation
- Maintain working state - all changes should keep the system in a functional state
- Follow semantic patterns - use consistent naming and organization conventions that make sense in your domain

### Accessibility and Usability

Design for inclusion and broad usability across all interfaces:

- APIs: Clear error messages, consistent response formats, comprehensive documentation
- CLI tools: Helpful usage text, consistent flag patterns, clear output formatting
- User interfaces: Semantic structure, consistent interaction patterns, clear visual hierarchy
- Code interfaces: Self-documenting function signatures, clear module boundaries, obvious error paths

### Naming Conventions

- Functions: Verb-based names (`calculateTotal`, `validatePayment`, `processOrder`)
- Types/Classes: Noun-based names (`PaymentRequest`, `UserProfile`, `OrderStatus`)
- Constants: Distinguished from variables (language-specific: UPPER_CASE, final, const, etc.)
- Files/Modules: Consistent with language conventions (kebab-case, snake_case, PascalCase)
- Be explicit over generic - prefer `getUserById` over `get`

### Functional Programming Approach

Follow a "functional light" philosophy across all languages:

- No data mutation. Work with immutable data structures only.
- Pure functions wherever possible. Same inputs always produce same outputs
- use Composition as the primary mechanism for code reuse
- Early returns over nested conditionals
- Prefer language-native collection methods (`map`, `filter`, `reduce`) over imperative loops

**Avoid:**

- Clever abstractions that obscure intent
- FP patterns that don't fit the language idioms
- Premature abstraction for abstraction's sake
- Imperative code in general

---

## Refactoring Methodology

### What is Refactoring?

Refactoring means changing the internal structure of code without changing its external behavior. The public API remains unchanged, all tests continue to pass, but the code becomes cleaner, more maintainable, or more efficient. **Remember**: only refactor when it genuinely improves the code. not all code needs refactoring.

### When to Refactor

- Always assess after green: Once tests pass, before moving to the next test, evaluate if refactoring would add value
- When you see duplication: But understand what duplication really means (see DRY below)
- When names could be clearer: Variable names, function names, or type names that don't clearly express intent
- When structure could be simpler: Complex conditional logic, deeply nested code, or long functions
- When patterns emerge: After implementing several similar features, useful abstractions may become apparent

### Look for Useful Abstractions Based on Semantic Meaning

Create abstractions only when code shares the **same semantic meaning and purpose**. Don't abstract based on structural similarity alone. Duplicate code is far cheaper than the wrong abstraction.

**Questions to ask before abstracting:**

- Do these code blocks represent the same concept or different concepts that happen to look similar?
- If the business rules for one change, should the others change too?
- Would a developer reading this abstraction understand why these things are grouped together?
- Am I abstracting based on what the code IS (structure) or what it MEANS (semantics)?

### Understanding DRY - It's About Knowledge, Not Code

DRY (Don't Repeat Yourself) is about not duplicating knowledge in the system, not about eliminating all code that looks similar.

Not a DRY violation: Similar structure, different business meaning (e.g., `validateUserAge` vs `validateProductRating` - same structure, different business rules)

Is a DRY violation: Same business rule expressed in multiple places (e.g., free shipping threshold hardcoded in multiple classes)

### Refactoring Checklist

Before considering refactoring complete, verify:

- [ ]  The refactoring actually improves the code (if not, don't refactor)
- [ ]  All existing functionality still works (manual verification if no tests)
- [ ]  All static analysis tools pass (linting, type checking)
- [ ]  No new public APIs were added (only internal ones)
- [ ]  Code is more readable than before
- [ ]  Any duplication removed was duplication of knowledge, not just code
- [ ]  No speculative abstractions were created
- [ ]  The refactoring is committed separately from feature changes

---

## Security Guidelines

### Input Validation

- Enforce Defense in Depth: Multiple layers of security
- Be aware of CVEs and follow OWASP guidelines
- When something goes wrong, default to secure state
- Follow Principle of Least Privilege: Give minimum necessary permissions

typescript

`*// Always validate at boundaries*
const UserEmailSchema = z.string().email().max(255);
const UserIdSchema = z.string().uuid();

*// Validate before processing*
export async function resetPassword(input: unknown) {
  const parsed = ResetPasswordSchema.parse(input);
  *// Now TypeScript knows the shape*
}`

### Security Checklist

- [ ]  All inputs validated with schemas
- [ ]  SQL injection prevented (use parameterized queries)
- [ ]  XSS prevented (escape output)
- [ ]  Dependencies scanned for vulnerabilities
- [ ]  Secrets never in code (use environment variables)
- [ ]  Authentication before authorization
- [ ]  Rate limiting on public endpoints

---

## Development Workflow

### Process

1. Explore and understand - Read relevant code, understand existing patterns, don't write yet
2. Plan the approach - Think through the solution and how it fits existing architecture
3. Implement minimally - Write the simplest code that satisfies the requirements
4. Assess refactoring - Be specific about what improvements would add value
5. Commit with clear message - Use conventional commits

Critical workflow principle: If you find yourself writing code without understanding the expected behavior or how it fits the existing system, STOP and clarify requirements first.

### Version Control

- Conventional commits: `feat:`, `fix:`, `refactor:`, `test:`
- Small, focused commits that maintain working state
- Commit working code before any refactoring

---

## Working with Claude

### Expectations

When working with my code:

1. Think deeply before making any edits
2. USE EXISTING LIBRARIES AND INFRASTRUCTURE. I cannot overstate this enough. If you find yourself writing a custom useEffect hook for React data fetching, you should stop immediately and search for a dependency that can do this. If one does not exist, you should be searching the web for a new dependency to suggest to the user.
3. Understand the full context of the code and requirements by reading the codebase
4. Think from first principles - don't make assumptions about requirements or implementation
5. Ask clarifying questions when requirements are ambiguous
6. Keep project docs current - update this CLAUDE.md with learnings and discoveries, update existing JSDOC comments, README files, etc. as needed.

### Code Changes

When suggesting or making changes:

- Understand the testing approach. If tests exist, maintain coverage. Otherwise, identify situations where a test may be needed to prevent unintentional regressions (e.g. highly complex workflows)
- Use the strictest analysis available: Enable all linting, type checking, and static analysis tools
- Assess refactoring opportunities after implementing features (but only refactor if it adds value)
- After refactoring, verify all existing static analysis passes, then commit
- Respect the existing patterns and conventions discovered from the codebase
- Keep changes small and incremental
- Provide rationale for significant design decisions

### Communication

- Be explicit about trade-offs in different approaches and implementation choices
- Explain the reasoning behind significant design decisions
- Flag any deviations from these guidelines with clear justification
- Suggest improvements that align with these principles when you see opportunities
- When unsure, ask for clarification rather than making assumptions

---

## Testing Philosophy

### Test Behavior, Not Implementation

Test through public interfaces and focus on business behavior. Let business behavior drive test coverage rather than chasing implementation details.

### Common Antipatterns to Avoid

- Mutation of data structures
- Nested conditionals beyond 2 levels
- Large functions (>20-30 lines typically indicates complexity)
- Clever abstractions over readable code
- Bypassing type system without clear justification

---

## Summary

The key is to write clean, testable, functional code that evolves through small, safe increments. Every change should be driven by a test that describes the desired behavior, and the implementation should be the simplest thing that makes that test pass. When in doubt, favor simplicity and readability over cleverness.