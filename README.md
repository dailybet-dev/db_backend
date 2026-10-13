# DailyBet Backend

TypeScript API foundation using Fastify, Zod, PostgreSQL/Prisma and security middleware. Designed to pair with `dailybet-dev/db_frontend` (Next.js + Tailwind).

## Local setup
Requirements: Node.js 20.9+, PostgreSQL.

```bash
cp .env.example .env
npm install
npm run prismaGenerate
npm run dev
```

API health: `GET http://localhost:4000/health`.

## Current status
This is an API scaffold, not a real-money sportsbook backend. Authentication, identity/age verification, account recovery, sportsbook provider adapters, wallet ledger services, mobile-money payment callbacks, bet acceptance, settlement, fraud/risk controls, admin operations and audit trails must be implemented and reviewed before production use. No provider credentials are included.

## Security direction
- Validate all inbound payloads and provider webhooks.
- Use server-side secrets, rate limits, secure session/token lifecycle and MFA for privileged operators.
- Use database transactions, idempotency keys, immutable financial audit trails and reconciliation for money movement.
- Treat provider events as untrusted until signature/sequence validation succeeds.
- Add automated tests, migrations, monitoring, backups and a deployment runbook before production.

## Uganda readiness
Confirm applicable gaming licences, payment-provider approval, age/identity checks, responsible-gambling controls, privacy obligations and tax requirements with the relevant Ugandan authorities and qualified counsel before accepting customers or wagers.
