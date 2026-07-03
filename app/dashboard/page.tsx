"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Pick } from "@/lib/api";
import { getToken, logout } from "@/lib/auth";
import {
  fetchDashboard,
  type DashboardResponse,
  type WinRateBucket,
} from "@/lib/user";
import "./dashboard.css";

const ACTIVE_STATUS = "active";

function fmtRate(bucket: { win_rate: number | null; closed: number }): string {
  if (bucket.win_rate === null) return "—";
  return `${Math.round(bucket.win_rate)}%`;
}

function PerfCard({ bucket }: { bucket: WinRateBucket }) {
  const na = bucket.win_rate === null;
  return (
    <div className="dash-perf">
      <div className="dash-perf-label">{bucket.label}</div>
      <div className={`dash-perf-rate${na ? " na" : ""}`}>
        {na ? "No data" : fmtRate(bucket)}
      </div>
      <div className="dash-perf-sub">
        {bucket.wins}W · {bucket.losses}L
        {bucket.pending > 0 ? ` · ${bucket.pending} open` : ""}
      </div>
    </div>
  );
}

function PickRow({ pick }: { pick: Pick }) {
  return (
    <div className="pick">
      <div className="prank">{pick.rank}</div>
      <div className="pticker">{pick.ticker}</div>
      <div className="pdesc">{pick.description}</div>
      <div className="psig">{pick.signal_badge}</div>
      <div className="dash-pick-price">${pick.price.toFixed(2)}</div>
      <div className="dash-pick-plan">
        <span className="tgt">+{Math.round(pick.target_pct)}%</span>
        {" / "}
        <span className="stp">-{Math.round(pick.stop_pct)}%</span>
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
      // authedFetch fires "os-session-expired" on an unrecoverable 401; that
      // handler redirects, so only show non-auth errors here.
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

            {/* Picks */}
            <div className="dash-card">
              <h2>Your picks</h2>
              <p className="dash-hint">
                Every pick is time-stamped when published. Monitor its target and
                stop, and track how it performs over the hold window.
              </p>
              {data.picks.length === 0 ? (
                <div className="dash-empty">
                  No published picks right now. OpusEngine stays silent when no
                  setup clears the conviction bar — check back soon.
                </div>
              ) : (
                data.picks.map((p) => <PickRow key={`${p.rank}-${p.ticker}`} pick={p} />)
              )}
            </div>

            {/* Performance */}
            <div className="dash-card">
              <h2>Performance</h2>
              <p className="dash-hint">
                Win rate on closed picks — overall and by holding horizon.
              </p>
              <div className="dash-perf-grid">
                <PerfCard bucket={data.performance.overall} />
                {data.performance.by_horizon.map((b) => (
                  <PerfCard key={b.label} bucket={b} />
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="dash-card">
              <h2>The 70% guarantee</h2>
              <div className="dash-guarantee">
                <div className="g-icon">{data.guarantee.breached ? "⚠️" : "🛡️"}</div>
                <div>
                  <div
                    className={`g-status ${data.guarantee.breached ? "breached" : "ok"}`}
                  >
                    {data.guarantee.breached
                      ? "Guarantee window breached"
                      : "On track"}
                  </div>
                  <div className="g-detail">
                    Rolling {data.guarantee.window_sessions}-session win rate:{" "}
                    {fmtRate(data.guarantee)} vs a{" "}
                    {Math.round(data.guarantee.threshold)}% guaranteed minimum
                    {data.guarantee.closed > 0
                      ? ` (${data.guarantee.wins}W · ${data.guarantee.losses}L across ${data.guarantee.closed} closed).`
                      : " (no closed picks in the window yet)."}
                  </div>
                </div>
              </div>
            </div>

            {/* Credits */}
            <div className="dash-card">
              <h2>Credits</h2>
              <p className="dash-hint">
                Credits issued for days without a qualifying pick.
              </p>
              {data.credits.length === 0 ? (
                <div className="dash-empty">No credits on your account.</div>
              ) : (
                data.credits.map((c, i) => (
                  <div key={`${c.credited_date}-${i}`} className="dash-credit">
                    <span className="c-date">{c.credited_date}</span>
                    <span className="c-reason">{c.reason}</span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
