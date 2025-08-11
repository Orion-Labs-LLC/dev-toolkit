# T3 Stack Infrastructure Reference

## Core Stack

| Service | Purpose | When to Use |
|---------|---------|-------------|
| **[Vercel](https://vercel.com)** | Hosting, CI/CD | Next.js applications |
| **[Supabase](https://supabase.com)** | Database, Auth, Storage | PostgreSQL + real-time features |
| **[Cloudflare](https://cloudflare.com)** | CDN, DNS, Security | Global distribution + DDoS protection |
| **[NextAuth.js](https://next-auth.js.org)** | Authentication | Multi-provider auth in Next.js |
| **[Expo](https://expo.dev)** | Mobile Development | Cross-platform mobile apps |
| **[PNPM](https://pnpm.io)** | Package Manager | Faster npm alternative |
| **[Sentry](https://sentry.io)** | Error Tracking | Production error monitoring |
| **[UptimeRobot](https://uptimerobot.com)** | Uptime Monitoring | Service availability alerts |
| **[PostHog](https://posthog.com)** | Analytics | Product analytics + feature flags |
| **[SendGrid](https://sendgrid.com)** | Email & SMS | Transactional communications |
| **[Stripe](https://stripe.com)** | Payments | Payment processing |
| **[Vitest](https://vitest.dev)** | Testing | Unit + integration testing |

## Extensions

| Service | Purpose | When to Use |
|---------|---------|-------------|
| **[Upstash](https://upstash.com)** | Message Queues | Background jobs + async processing |
| **[Infisical](https://infisical.com)** | Secrets Management | Team environments + security compliance |
| **[Hashmark](https://github.com/boeschj/hashmark)** | Headless CMS | Content management |
| **[AWS OpenSearch](https://aws.amazon.com/opensearch-service)** | Search Engine | Full-text search capabilities |

## Architecture

- **Frontend**: [Next.js](https://nextjs.org) + [TypeScript](https://typescriptlang.org) + [Tailwind](https://tailwindcss.com) + [tRPC](https://trpc.io)
- **Mobile**: [Expo](https://expo.dev) (React Native) with shared codebase  
- **Database**: PostgreSQL via [Supabase](https://supabase.com) + [Prisma](https://prisma.io) ORM
- **Auth**: [NextAuth.js](https://next-auth.js.org) + [Supabase](https://supabase.com) Auth
- **APIs**: [tRPC](https://trpc.io) for type-safe client-server communication
- **Deployment**: [Vercel](https://vercel.com) with [GitHub](https://github.com) integration