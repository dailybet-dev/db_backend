# Integration boundaries

Provider adapters are intentionally interfaces only until DailyBet has the contracted provider, official version-specific integration pack, sandbox credentials, and approval to connect. Do not hard-code vendors into route handlers. Implement adapters in this folder and normalize vendor data into the domain contracts in `contracts.ts`.

## BetConstruct Swarm

DailyBet's intended sportsbook provider is BetConstruct Swarm. The public Swarm API manual available through BetConstruct Client Zone is version-specific; use the integration pack supplied for DailyBet's actual operator account and environment as the source of truth. Public manual: https://clientzone.betconstruct.com/media/download/k9fwj4/SWARM-API-1.2.19.pdf

Before implementing live calls, confirm with BetConstruct:
- the Swarm product/API version and whether the account uses direct API, a sportsbook iframe, or another integration mode
- sandbox and production endpoint(s), transport/protocol, site/operator identifiers, authentication/signature requirements, and allowed IPs if applicable
- event/market/odds subscription and reconnect rules, rate limits, bet placement parameters, price-change behavior, bet receipt/status queries, cashout support, and settlement notifications
- wallet model: provider-managed balance versus DailyBet/operator-managed wallet, and the exact callback/transaction contract
- supported currency (including UGX), languages, geolocation restrictions, and required compliance certification

Never infer endpoint paths, authentication fields, signatures, or request payloads from examples for a different product/version. Keep provider secrets in Railway backend service variables only; never use `NEXT_PUBLIC_*` for secrets. Keep the adapter disabled until the version-specific contract is verified.

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
