# Integration boundaries

Do not hard-code a sportsbook, casino, virtuals, or payment vendor into route handlers. Implement a server-side adapter for each contracted provider and normalize its events, markets, odds, bet responses, payment callbacks and settlement events into DailyBet domain types.

## Sportsbook adapter contract (planned)
- fetch sports, competitions, events, markets and odds
- subscribe to provider updates using the provider's supported transport
- validate selections and price changes server-side immediately before acceptance
- submit a bet with an idempotency key and store the provider's authoritative receipt
- reconcile unsettled bets and settlements from provider callbacks/polling

## Payments adapter contract (planned)
- initiate deposit/withdrawal through approved channels
- verify callback signatures and replay protection
- use idempotency keys and a double-entry/append-only ledger
- reconcile provider statements and transaction state

Provider contracts, credentials, sandbox accounts, settlement rules and licensing approvals are prerequisites. Never accept client-reported odds, balance, bet outcome or payment status as authoritative.
