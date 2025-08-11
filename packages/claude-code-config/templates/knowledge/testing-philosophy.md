# Testing Philosophy

## Test Behavior, Not Implementation

Test through public interfaces and focus on business behavior. Let business behavior drive test coverage rather than chasing implementation details.

## Common Antipatterns to Avoid

- Mutation of data structures
- Nested conditionals beyond 2 levels
- Large functions (>20-30 lines typically indicates complexity)
- Clever abstractions over readable code
- Bypassing type system without clear justification