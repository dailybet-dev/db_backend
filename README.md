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

## Railway deployment

1. Create a Railway project and deploy this repository as its own service.
2. Add a Railway PostgreSQL service.
3. Add a reference variable on the backend service: `DATABASE_URL=${{Postgres.DATABASE_URL}}` (use your actual Railway PostgreSQL service name).
4. Set `CORS_ORIGINS` to the exact public frontend origin(s), comma-separated. Do not leave localhost as the only origin in production.
5. Deploy. Railway config builds Prisma Client and TypeScript, starts `npm run start`, and checks `/health`.
6. Do not configure production database migrations until checked-in Prisma migration files and a reviewed migration workflow exist.

The backend's `railway.json` contains the build, start, health-check, and restart settings.

## BetConstruct Swarm

Set `BETCONSTRUCT_SWARM_ENABLED=false` until BetConstruct supplies the API version-specific integration pack and sandbox credentials. See [integration prerequisites](src/integrations/README.md). The provider adapter and live betting routes are not implemented yet.

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
