import { API_BASE } from "./apiBase";

// ── Backend enums / value types ───────────────────────────────────────────
// Mirror of app/schemas/common.py (PriceRange, PickHorizon) and the funnel
// state machine in app/db/models/funnel_session.py (FunnelState).

/** The 6 scanner price ranges. Values match the backend `PriceRange` enum
 * exactly and are what the `/scan?range=` query param expects. */
export type PriceRange =
  | "$2-$5"
  | "$5-$10"
  | "$10-$20"
  | "$20-$50"
  | "$50-$100"
  | "$100-$500";

/** Holding horizon a pick optimises for (app/schemas/common.py PickHorizon). */
export type PickHorizon = "short" | "swing" | "long";

/** Server-authoritative funnel state (app/db/models/funnel_session.py). */
export type FunnelState =
  | "free_picks"
  | "awaiting_sessions"
  | "email_gate"
  | "followup_picks"
  | "paywall";

/** Whether a scan returned real picks or fell back to a watch list. */
export type ScanState = "picks" | "watchlist";

// ── Response shapes (app/schemas/scan.py, lead.py, funnel.py) ─────────────

/** One high-conviction pick (app/schemas/scan.py PickSchema).
 * `details` is an internal scorecard and is intentionally NOT rendered. */
export interface Pick {
  rank: number;
  ticker: string;
  description: string;
  signal_badge: string;
  score: number;
  price: number;
  range: PriceRange;
  horizon: PickHorizon;
  horizon_label: string;
  target_pct: number;
  stop_pct: number;
  max_hold_sessions: number;
  confluence: number;
  details?: Record<string, unknown> | null;
  /** ISO date (YYYY-MM-DD) when this pick was generated. */
  pick_date?: string | null;
  /** Outcome tracking — populated on the dashboard for the user's received picks. */
  outcome_status?: "pending" | "success" | "failure" | null;
  outcome_return_pct?: number | null;
  outcome_sessions_held?: number | null;
}

/** A softer "watch list" entry served when no pick clears the bar. */
export interface WatchListItem {
  rank: number;
  ticker: string;
  description: string;
  watch_badge: string;
}

export interface SessionStatus {
  sessions_used: number;
  sessions_total: number;
}

/** GET /api/v1/scan response (app/schemas/scan.py ScanResponse). */
export interface ScanResponse {
  range: PriceRange;
  state: ScanState;
  funnel_state: FunnelState;
  session: SessionStatus;
  picks: Pick[];
  watchlist: WatchListItem[];
}

/** GET /api/v1/session response (app/schemas/funnel.py SessionResponse). */
export interface SessionResponse {
  sessions_used: number;
  sessions_total: number;
  funnel_state: FunnelState;
}

/** POST /api/v1/lead response (app/schemas/lead.py LeadResponse). */
export interface LeadResponse {
  funnel_state: FunnelState;
  picks: Pick[];
}

// ── Fetch helpers ─────────────────────────────────────────────────────────

const API_PREFIX = "/api/v1";

/** Default range sent to /scan when the visitor hasn't picked one — a mid-cap
 * range is a reasonable neutral choice. */
const DEFAULT_RANGE: PriceRange = "$20-$50";

async function readError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { detail?: unknown };
    if (typeof data.detail === "string") return data.detail;
    if (data.detail) return JSON.stringify(data.detail);
  } catch {
    /* fall through to status text */
  }
  return res.statusText || `Request failed (${res.status})`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${API_PREFIX}${path}`, {
      credentials: "include", // persist the httponly `os_funnel` cookie
      ...init,
    });
  } catch {
    throw new Error(
      "Couldn't reach the OpusEngine scanner. Please check your connection and try again.",
    );
  }
  if (!res.ok) {
    throw new Error(await readError(res));
  }
  return (await res.json()) as T;
}

/** Run a free scan across one or more ranges. The backend spreads the free
 * picks across the selected ranges (a single range returns all of them). Falls
 * back to a mid-cap range when none are selected. `horizon` is optional. */
export function runFreeScan(
  ranges?: PriceRange[],
  horizon?: PickHorizon,
): Promise<ScanResponse> {
  const params = new URLSearchParams();
  const list = ranges && ranges.length > 0 ? ranges : [DEFAULT_RANGE];
  for (const r of list) params.append("ranges", r);
  if (horizon) params.set("horizon", horizon);
  return request<ScanResponse>(`/scan?${params.toString()}`);
}

/** Fetch the anonymous visitor's current funnel status. */
export function getFunnelSession(): Promise<SessionResponse> {
  return request<SessionResponse>("/session");
}

/** Submit the email gate; returns the 2 follow-up picks and the new state. */
export function submitLead(email: string): Promise<LeadResponse> {
  return request<LeadResponse>("/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}
