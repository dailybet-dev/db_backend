export type DecimalOdds = string;

export type SportsbookSelection = {
  eventId: string;
  marketId: string;
  selectionId: string;
  odds: DecimalOdds;
};

export type NormalizedSport = { id: string; name: string; slug: string };
export type NormalizedEvent = {
  id: string;
  sportId: string;
  competition: string;
  homeName: string;
  awayName: string;
  startsAt: string;
  status: 'scheduled' | 'live' | 'suspended' | 'settled';
};
export type NormalizedMarket = {
  id: string;
  eventId: string;
  name: string;
  selections: Array<{ id: string; name: string; odds: DecimalOdds; suspended: boolean }>;
};
export type AcceptedBet = { providerBetId: string; acceptedAt: string; status: 'accepted' | 'pending' };

/** Implement only against a contracted sportsbook provider's official API. */
export interface SportsbookProvider {
  listSports(): Promise<NormalizedSport[]>;
  listEvents(input: { sportId?: string; from?: string; to?: string; liveOnly?: boolean }): Promise<NormalizedEvent[]>;
  listMarkets(eventId: string): Promise<NormalizedMarket[]>;
  placeBet(input: { customerReference: string; idempotencyKey: string; selections: SportsbookSelection[]; stakeMinor: bigint; currency: 'UGX' }): Promise<AcceptedBet>;
  getBet(providerBetId: string): Promise<AcceptedBet | null>;
}

export type PaymentIntent = { providerReference: string; status: 'pending' | 'succeeded' | 'failed'; amountMinor: bigint; currency: 'UGX' };

/** Never trust browser redirects as proof of payment; verify signed server callbacks. */
export interface PaymentsProvider {
  createDeposit(input: { userId: string; amountMinor: bigint; idempotencyKey: string; phoneNumber: string }): Promise<PaymentIntent>;
  createWithdrawal(input: { userId: string; amountMinor: bigint; idempotencyKey: string; phoneNumber: string }): Promise<PaymentIntent>;
  verifyWebhook(input: { rawBody: Buffer; headers: Record<string, string | string[] | undefined> }): Promise<{ providerReference: string; status: 'pending' | 'succeeded' | 'failed'; amountMinor: bigint; currency: 'UGX' }>;
}
