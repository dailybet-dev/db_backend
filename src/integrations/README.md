# Integration boundaries

Provider adapters are intentionally interfaces only until DailyBet has selected and contracted a sportsbook/payment vendor and obtained sandbox credentials. Do not hard-code vendors into route handlers. Implement adapters in this folder and normalize vendor data into the domain contracts in `contracts.ts`.

## Sportsbook adapter
- fetch sports, competitions, events, markets and odds
- consume provider updates using its supported transport
- revalidate event status, selection and price server-side immediately before acceptance
- submit bets with idempotency keys and store the provider's authoritative receipt
- reconcile pending bets and settlement updates from provider callbacks/polling

## Payments adapter
- initiate deposits/withdrawals through approved channels
- verify callback signatures, raw payloads, timestamps and replay protection
- use idempotency keys and an append-only ledger
- reconcile provider statements and transaction state

Provider contracts, credentials, sandbox accounts, settlement rules and regulatory approvals are prerequisites. Never accept client-reported odds, balance, bet outcome or payment status as authoritative. Financial operations need database transactions, concurrency controls, explicit state machines and security review before activation.
