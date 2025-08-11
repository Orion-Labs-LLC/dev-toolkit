# Code Quality Standards

## Avoid Comments in Code

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

## Prefer Options Objects as Default

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

## Code Structure Rules

- No nested if/else statements or ternaries - use early returns, guard clauses, or composition
- Avoid deep nesting in general (max 2 levels)
- Keep functions small and focused on a single responsibility (typically 20-30 lines max)
- Prefer flat, readable code over "clever" abstractions
- Modular organization - consistent file and module structure
- Comprehensive type checking - both static analysis and runtime validation
- Maintain working state - all changes should keep the system in a functional state
- Follow semantic patterns - use consistent naming and organization conventions that make sense in your domain

## Accessibility and Usability

Design for inclusion and broad usability across all interfaces:

- APIs: Clear error messages, consistent response formats, comprehensive documentation
- CLI tools: Helpful usage text, consistent flag patterns, clear output formatting
- User interfaces: Semantic structure, consistent interaction patterns, clear visual hierarchy
- Code interfaces: Self-documenting function signatures, clear module boundaries, obvious error paths

## Naming Conventions

- Functions: Verb-based names (`calculateTotal`, `validatePayment`, `processOrder`)
- Types/Classes: Noun-based names (`PaymentRequest`, `UserProfile`, `OrderStatus`)
- Constants: Distinguished from variables (language-specific: UPPER_CASE, final, const, etc.)
- Files/Modules: Consistent with language conventions (kebab-case, snake_case, PascalCase)
- Be explicit over generic - prefer `getUserById` over `get`

## Functional Programming Approach

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