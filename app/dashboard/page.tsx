"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Pick } from "@/lib/api";
import { getToken, logout } from "@/lib/auth";
import { fetchDashboard, type DashboardResponse } from "@/lib/user";
import "./dashboard.css";

const ACTIVE_STATUS = "active";

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
                  {isSubscriber &&
                    (ranges.length > 0 ? (
                      ranges.map((r) => (
                        <span key={r} className="dash-badge gold">
                          {r}
                        </span>
                      ))
                    ) : (
                      <span className="dash-badge">All ranges</span>
                    ))}
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

            {/* Picks — the funnel picks are locked in automatically and tracked here */}
            <div className="dash-card">
              <h2>Your picks</h2>
              <p className="dash-hint">
                Every pick is time-stamped to its closing price on the day it was
                published. Win or loss is determined after the hold window closes.
              </p>
              {data.picks.length === 0 ? (
                <div className="dash-empty">
                  Your picks will appear here as soon as they&apos;re published.
                  OpusEngine stays silent when no setup clears the conviction bar
                  — check back soon.
                </div>
              ) : (
                data.picks.map((p) => (
                  <PickRow key={`${p.pick_date}-${p.ticker}`} pick={p} />
                ))
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
