# Refactoring Methodology

## What is Refactoring?

Refactoring means changing the internal structure of code without changing its external behavior. The public API remains unchanged, all tests continue to pass, but the code becomes cleaner, more maintainable, or more efficient. **Remember**: only refactor when it genuinely improves the code. not all code needs refactoring.

## When to Refactor

- Always assess after green: Once tests pass, before moving to the next test, evaluate if refactoring would add value
- When you see duplication: But understand what duplication really means (see DRY below)
- When names could be clearer: Variable names, function names, or type names that don't clearly express intent
- When structure could be simpler: Complex conditional logic, deeply nested code, or long functions
- When patterns emerge: After implementing several similar features, useful abstractions may become apparent

## Look for Useful Abstractions Based on Semantic Meaning

Create abstractions only when code shares the **same semantic meaning and purpose**. Don't abstract based on structural similarity alone. Duplicate code is far cheaper than the wrong abstraction.

**Questions to ask before abstracting:**

- Do these code blocks represent the same concept or different concepts that happen to look similar?
- If the business rules for one change, should the others change too?
- Would a developer reading this abstraction understand why these things are grouped together?
- Am I abstracting based on what the code IS (structure) or what it MEANS (semantics)?

## Understanding DRY - It's About Knowledge, Not Code

DRY (Don't Repeat Yourself) is about not duplicating knowledge in the system, not about eliminating all code that looks similar.

Not a DRY violation: Similar structure, different business meaning (e.g., `validateUserAge` vs `validateProductRating` - same structure, different business rules)

Is a DRY violation: Same business rule expressed in multiple places (e.g., free shipping threshold hardcoded in multiple classes)

## Refactoring Checklist

Before considering refactoring complete, verify:

- [ ]  The refactoring actually improves the code (if not, don't refactor)
- [ ]  All existing functionality still works (manual verification if no tests)
- [ ]  All static analysis tools pass (linting, type checking)
- [ ]  No new public APIs were added (only internal ones)
- [ ]  Code is more readable than before
- [ ]  Any duplication removed was duplication of knowledge, not just code
- [ ]  No speculative abstractions were created
- [ ]  The refactoring is committed separately from feature changes