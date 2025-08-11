# Type Safety Principles

## NEVER BYPASS THE TYPE SYSTEM

- NO escape hatches: Avoid `any`, `unsafe`, `interface{}`, `void*`, `Object`, etc.
- NO type coercion unless the user approves it (e.g. it would be so much effort it's not worth it)
- NO suppressing type errors (`@ts-ignore`, `# type: ignore`, etc.) without justification
- These rules apply to ALL code including tests, scripts, and prototypes
- Remember: Runtime safety equals compile-time safety in importance

## Prefer Explicit Types

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

## Schema-First Development

Always define your data schemas first, then derive types from them:

1. Define schema with validation rules using your language's validation library
2. Derive types from schema
3. Use schema at all external boundaries (APIs, file I/O, user input, database)

Implementation by language:

- TypeScript: Zod
- Python: Pydantic

## Error Handling Philosophy

**Principle**: Make errors explicit and recoverable where possible

Prefer explicit error types:

- Exceptions with clear hierarchy (Python, Java, C#)
- Explicit error returns (Go)
- Optional/Maybe types for nullable values

## Domain Modeling Principles

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