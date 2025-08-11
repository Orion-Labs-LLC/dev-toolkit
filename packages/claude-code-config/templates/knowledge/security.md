# Security Guidelines

## Input Validation

- Enforce Defense in Depth: Multiple layers of security
- Be aware of CVEs and follow OWASP guidelines
- When something goes wrong, default to secure state
- Follow Principle of Least Privilege: Give minimum necessary permissions

```typescript
// Always validate at boundaries
const UserEmailSchema = z.string().email().max(255);
const UserIdSchema = z.string().uuid();

// Validate before processing
export async function resetPassword(input: unknown) {
  const parsed = ResetPasswordSchema.parse(input);
  // Now TypeScript knows the shape
}
```

## Security Checklist

- [ ]  All inputs validated with schemas
- [ ]  SQL injection prevented (use parameterized queries)
- [ ]  XSS prevented (escape output)
- [ ]  Dependencies scanned for vulnerabilities
- [ ]  Secrets never in code (use environment variables)
- [ ]  Authentication before authorization
- [ ]  Rate limiting on public endpoints