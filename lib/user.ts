// Authenticated data calls for a logged-in user's account dashboard.
// Everything here goes through authedFetch (bearer token + refresh-on-401).

import { API_BASE } from "@/lib/apiBase";
import { authedFetch } from "@/lib/auth";
import type { Pick, PriceRange } from "@/lib/api";

// ── Dashboard (mirror of app/schemas/dashboard.py) ─────────────────────────

/** app/schemas/dashboard.py::DashboardAccount */
export interface DashboardAccount {
  email: string;
  subscription_status: string;
  subscribed_ranges: string[];
  is_admin: boolean;
}

/** app/schemas/dashboard.py::DashboardCredit */
export interface DashboardCredit {
  credited_date: string; // ISO date the no-pick-day credit was issued
  reason: string;
}

/** app/schemas/dashboard.py::FreePickAllowance */
export interface FreePickAllowance {
  total: number;
  used: number;
  remaining: number;
}

/** app/schemas/performance.py::WinRateBucket */
export interface WinRateBucket {
  label: string; // "overall", a horizon ("swing"), or a price range ("$2-$5")
  wins: number;
  losses: number;
  pending: number;
  closed: number; // wins + losses (the denominator for win_rate)
  win_rate: number | null; // wins / closed, percent; null until something closes
}

/** app/schemas/performance.py::PerformanceResponse */
export interface PerformanceResponse {
  overall: WinRateBucket;
  by_horizon: WinRateBucket[];
  by_range: WinRateBucket[];
}

/** app/schemas/performance.py::GuaranteeStatus */
export interface GuaranteeStatus {
  scope: string; // "overall" or a price range
  window_sessions: number; // the rolling window size (trading sessions)
  sessions_evaluated: number; // distinct pick days actually found in the window
  wins: number;
  losses: number;
  closed: number;
  win_rate: number | null; // null until something closes in the window
  threshold: number; // the guaranteed minimum win-rate (percent)
  breached: boolean; // closed picks exist and win_rate is below the threshold
}

/** GET /api/v1/dashboard response (app/schemas/dashboard.py::DashboardResponse). */
export interface DashboardResponse {
  account: DashboardAccount;
  picks: Pick[];
  /** False only for a free account that hasn't claimed its picks yet. */
  claimed: boolean;
  /** Max ranges a free account may pick when claiming. */
  claim_max_ranges: number;
  performance: PerformanceResponse;
  guarantee: GuaranteeStatus;
  credits: DashboardCredit[];
  free_picks: FreePickAllowance;
}

/** Load the account dashboard for the current logged-in user. */
export async function fetchDashboard(signal?: AbortSignal): Promise<DashboardResponse> {
  const res = await authedFetch(`${API_BASE}/api/v1/dashboard`, { signal });
  if (!res.ok) throw new Error(`Could not load your dashboard (HTTP ${res.status}).`);
  return (await res.json()) as DashboardResponse;
}

/** POST /api/v1/dashboard/claim response (app/schemas/dashboard.py::ClaimResponse). */
export interface ClaimResponse {
  claimed: boolean;
  picks: Pick[];
}

/** Claim a free account's picks across the chosen ranges (one-time). */
export async function claimPicks(ranges: PriceRange[]): Promise<ClaimResponse> {
  const res = await authedFetch(`${API_BASE}/api/v1/dashboard/claim`, {
    method: "POST",
    body: { ranges },
  });
  if (res.status === 400) {
    const detail = await res
      .json()
      .then((d: { detail?: string }) => d.detail)
      .catch(() => null);
    throw new Error(detail || "Could not claim your picks.");
  }
  if (!res.ok) throw new Error(`Could not claim your picks (HTTP ${res.status}).`);
  return (await res.json()) as ClaimResponse;
}

// ── Checkout (mirror of app/schemas/checkout.py) ────────────────────────────

/** app/db/models/subscription.py::SubscriptionPlan */
export type SubscriptionPlan = "single_range" | "all_ranges";

export interface CheckoutArgs {
  plan: SubscriptionPlan;
  /** Required by the backend when plan === "single_range". */
  range?: PriceRange;
}

/** Create a Stripe Checkout session and redirect the browser to it.
 *  Body: { plan, range? } → response: { checkout_url }. */
export async function startCheckout(args: CheckoutArgs): Promise<void> {
  const res = await authedFetch(`${API_BASE}/api/v1/checkout`, {
    method: "POST",
    body: { plan: args.plan, range: args.range ?? null },
  });
  if (res.status === 422) {
    throw new Error("A single-range plan needs a price range.");
  }
  if (!res.ok) throw new Error(`Could not start checkout (HTTP ${res.status}).`);
  const { checkout_url } = (await res.json()) as { checkout_url: string };
  if (typeof window !== "undefined") window.location.href = checkout_url;
}
