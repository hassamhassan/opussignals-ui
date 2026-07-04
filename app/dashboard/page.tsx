"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Pick, PriceRange } from "@/lib/api";
import { getToken, logout } from "@/lib/auth";
import { claimPicks, fetchDashboard, type DashboardResponse } from "@/lib/user";
import "./dashboard.css";

const ACTIVE_STATUS = "active";

// The 6 price ranges a free account can claim across.
const CLAIM_RANGES: { value: PriceRange; label: string; sub: string }[] = [
  { value: "$2-$5", label: "$2 – $5", sub: "Micro-cap momentum" },
  { value: "$5-$10", label: "$5 – $10", sub: "Small-cap breakouts" },
  { value: "$10-$20", label: "$10 – $20", sub: "Growth plays" },
  { value: "$20-$50", label: "$20 – $50", sub: "Mid-cap movers" },
  { value: "$50-$100", label: "$50 – $100", sub: "Blue chip setups" },
  { value: "$100-$500", label: "$100 – $500", sub: "Premium leaders" },
];

/** One-time range picker for a free account to claim its 5 free picks. */
function ClaimPanel({
  maxRanges,
  claiming,
  error,
  onClaim,
}: {
  maxRanges: number;
  claiming: boolean;
  error: string | null;
  onClaim: (ranges: PriceRange[]) => void;
}) {
  const [selected, setSelected] = useState<PriceRange[]>([]);
  const toggle = (r: PriceRange) =>
    setSelected((prev) =>
      prev.includes(r)
        ? prev.filter((x) => x !== r)
        : prev.length >= maxRanges
          ? prev
          : [...prev, r],
    );
  return (
    <div className="claim">
      <p className="dash-hint">
        Pick up to <strong>{maxRanges} ranges</strong> and we&apos;ll assign your{" "}
        <strong>{maxRanges} free picks</strong>, spread across the ranges you
        choose. One-time choice &mdash; after this, new picks appear here
        automatically.
      </p>
      <div className="claim-ranges">
        {CLAIM_RANGES.map((r) => {
          const sel = selected.includes(r.value);
          const capped = !sel && selected.length >= maxRanges;
          return (
            <button
              key={r.value}
              type="button"
              className={`claim-rb${sel ? " sel" : ""}`}
              onClick={() => toggle(r.value)}
              disabled={capped || claiming}
              aria-pressed={sel}
            >
              <span className="claim-rl">{r.label}</span>
              <span className="claim-rs">{r.sub}</span>
            </button>
          );
        })}
      </div>
      {error && <div className="auth-error">{error}</div>}
      <button
        className="pbtn pri"
        style={{ width: "auto", padding: "12px 24px" }}
        disabled={selected.length === 0 || claiming}
        onClick={() => onClaim(selected)}
      >
        {claiming ? "Claiming…" : `Get my ${maxRanges} free picks`}
      </button>
    </div>
  );
}

/** Format ISO date (YYYY-MM-DD) as "Jun 15, 2026". */
function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[m - 1]} ${d}, ${y}`;
}

/** Per-pick outcome badge. */
function OutcomeBadge({ pick }: { pick: Pick }) {
  const status = pick.outcome_status;
  if (!status || status === "pending") {
    // Compute sessions remaining based on pick_date if available, else show "Open".
    return <span className="outcome-badge pending">Open</span>;
  }
  if (status === "success") {
    const ret = pick.outcome_return_pct != null
      ? ` +${pick.outcome_return_pct.toFixed(1)}%`
      : "";
    return <span className="outcome-badge success">Win{ret}</span>;
  }
  const ret = pick.outcome_return_pct != null
    ? ` ${pick.outcome_return_pct.toFixed(1)}%`
    : "";
  return <span className="outcome-badge failure">Loss{ret}</span>;
}

function PickRow({ pick }: { pick: Pick }) {
  return (
    <div className="dash-pick-row">
      <div className="dash-pick-meta">
        <div className="dash-pick-head">
          <span className="pticker">{pick.ticker}</span>
          <OutcomeBadge pick={pick} />
        </div>
        <div className="dash-pick-sub">
          {pick.pick_date && (
            <span className="dash-pick-date">
              Closing Price {fmtDate(pick.pick_date)}
            </span>
          )}
        </div>
      </div>
      <div className="dash-pick-right">
        <div className="dash-pick-price">${pick.price.toFixed(2)}</div>
      </div>
    </div>
  );
}

/** Mini track record for the user's own picks. */
function MyTrackRecord({ picks }: { picks: Pick[] }) {
  const closed = picks.filter(p => p.outcome_status && p.outcome_status !== "pending");
  const wins = closed.filter(p => p.outcome_status === "success").length;
  const losses = closed.filter(p => p.outcome_status === "failure").length;
  const open = picks.filter(p => !p.outcome_status || p.outcome_status === "pending").length;

  if (closed.length === 0) {
    return (
      <div className="dash-track-empty">
        Pick outcomes appear here after their hold window closes. Check back soon.
      </div>
    );
  }

  const rate = Math.round((wins / closed.length) * 100);
  const rateClass = rate >= 70 ? "good" : rate >= 50 ? "ok" : "low";

  return (
    <div className="dash-track-grid">
      <div className="dash-track-stat">
        <div className={`dash-track-rate ${rateClass}`}>{rate}%</div>
        <div className="dash-track-label">Win rate</div>
      </div>
      <div className="dash-track-stat">
        <div className="dash-track-num win">{wins}</div>
        <div className="dash-track-label">Wins</div>
      </div>
      <div className="dash-track-stat">
        <div className="dash-track-num loss">{losses}</div>
        <div className="dash-track-label">Losses</div>
      </div>
      <div className="dash-track-stat">
        <div className="dash-track-num">{open}</div>
        <div className="dash-track-label">Open</div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetchDashboard());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load your dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClaim = useCallback(
    async (ranges: PriceRange[]) => {
      setClaiming(true);
      setClaimError(null);
      try {
        const res = await claimPicks(ranges);
        if (!res.claimed || res.picks.length === 0) {
          setClaimError(
            "Today's picks aren't published yet — check back shortly and claim then.",
          );
        } else {
          await load(); // reload so the dashboard shows the claimed picks
        }
      } catch (err) {
        setClaimError(
          err instanceof Error ? err.message : "Could not claim your picks.",
        );
      } finally {
        setClaiming(false);
      }
    },
    [load],
  );

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    void load();

    const onExpired = () => router.replace("/login");
    window.addEventListener("os-session-expired", onExpired);
    return () => window.removeEventListener("os-session-expired", onExpired);
  }, [router, load]);

  async function onSignOut() {
    await logout();
    router.push("/");
  }

  const account = data?.account;
  const isSubscriber = account?.subscription_status === ACTIVE_STATUS;
  const ranges = account?.subscribed_ranges ?? [];

  return (
    <>
      <Nav />
      <div className="dash-page">
        {loading && <div className="dash-state">Loading your account…</div>}

        {!loading && error && (
          <div className="dash-state">
            <div>
              <div className="auth-error">{error}</div>
              <button className="pbtn" style={{ width: "auto", padding: "10px 20px" }} onClick={() => void load()}>
                Try again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && data && account && (
          <>
            {/* Account header */}
            <div className="dash-head">
              <div>
                <div className="dash-eyebrow">▸ Your Account</div>
                <div className="dash-email">{account.email}</div>
                <div className="dash-badges">
                  <span className={`dash-badge${isSubscriber ? " active" : ""}`}>
                    {isSubscriber ? "Subscriber" : "Free account"}
                  </span>
                  {account.is_admin && <span className="dash-badge gold">Admin</span>}
                  {isSubscriber && ranges.length > 0 ? (
                    ranges.map((r) => (
                      <span key={r} className="dash-badge gold">
                        {r}
                      </span>
                    ))
                  ) : (
                    <span className="dash-badge">
                      {isSubscriber ? "All ranges" : "Free"}
                    </span>
                  )}
                </div>
              </div>
              <button className="dash-signout" onClick={() => void onSignOut()}>
                Sign out
              </button>
            </div>

            {/* Free-user strip + subscribe CTA */}
            {!isSubscriber && (
              <div className="dash-free">
                <div className="dash-free-copy">
                  Free picks:{" "}
                  <strong>
                    {data.free_picks.used}/{data.free_picks.total} used
                  </strong>
                  {" — "}
                  subscribe to unlock every pick across your ranges, timestamped
                  and tracked.
                </div>
                <Link href="/#pricing" className="pbtn pri">
                  Subscribe
                </Link>
              </div>
            )}

            {/* Picks — free accounts claim once, then picks appear here */}
            <div className="dash-card">
              <h2>Your picks</h2>
              {!isSubscriber && !data.claimed ? (
                <ClaimPanel
                  maxRanges={data.claim_max_ranges}
                  claiming={claiming}
                  error={claimError}
                  onClaim={handleClaim}
                />
              ) : (
                <>
                  <p className="dash-hint">
                    Every pick is time-stamped to its closing price on the day it
                    was published. Win or loss is determined after the hold window
                    closes.
                  </p>
                  {data.picks.length === 0 ? (
                    <div className="dash-empty">
                      No published picks right now. OpusEngine stays silent when no
                      setup clears the conviction bar — check back soon.
                    </div>
                  ) : (
                    data.picks.map((p) => (
                      <PickRow key={`${p.pick_date}-${p.ticker}`} pick={p} />
                    ))
                  )}
                </>
              )}
            </div>

            {/* Your track record — only picks you received */}
            {data.picks.length > 0 && (
              <div className="dash-card">
                <h2>Your track record</h2>
                <p className="dash-hint">
                  Win / loss on picks you received from us, based on the closing
                  price when the pick was published.
                </p>
                <MyTrackRecord picks={data.picks} />
              </div>
            )}

            {/* Credits */}
            {data.credits.length > 0 && (
              <div className="dash-card">
                <h2>Credits</h2>
                <p className="dash-hint">
                  Credits issued for days without a qualifying pick.
                </p>
                {data.credits.map((c, i) => (
                  <div key={`${c.credited_date}-${i}`} className="dash-credit">
                    <span className="c-date">{c.credited_date}</span>
                    <span className="c-reason">{c.reason}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
