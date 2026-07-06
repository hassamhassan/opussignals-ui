"use client";

import { useEffect, useRef, useState } from "react";
import {
  getFunnelSession,
  runFreeScan,
  submitLead,
  type FunnelState,
  type Pick,
  type SessionStatus,
} from "@/lib/api";

const INTRO_KEY = "os_seen_intro";

/** Reusable OpusEngine™ wordmark with the small superscript trademark. */
function OpusEngine() {
  return (
    <span style={{ textTransform: "none" }}>
      OpusEngine
      <sup
        style={{
          fontSize: "60%",
          fontWeight: 300,
          verticalAlign: "super",
          lineHeight: 0,
        }}
      >
        &trade;
      </sup>
    </span>
  );
}

/** Format an ISO date (YYYY-MM-DD) as "June 15, 2026". */
function formatPickDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
  return `${months[m - 1]} ${d}, ${y}`;
}

/** Pre-scan intro modal — shown once per session before the first scan. */
function PreScanIntro({ onProceed }: { onProceed: () => void }) {
  return (
    <div className="intro-overlay">
      <div className="intro-card">
        <div className="intro-lock">🔒</div>
        <h3 className="intro-title">
          Before You See Today&apos;s Picks &mdash;{" "}
          <span className="intro-karim">A Quick Word From Karim</span>
        </h3>
        <p className="intro-body">
          Our{" "}
          <strong>
            <OpusEngine />
          </strong>{" "}
          is live and scanning the market right now &mdash; and we only speak
          when the conviction is very high.
        </p>
        <p className="intro-body">
          The 3 picks you&apos;re about to see are{" "}
          <strong>real, live, high-conviction picks</strong> &mdash; not a
          demo, not a simulation. Closing prices as of today&apos;s market
          close.
        </p>
        <div className="intro-badge">
          <span className="intro-cal">&#10003;</span>
          Live &mdash; Real High-Conviction Picks
        </div>
        <blockquote className="intro-quote">
          &ldquo;We only speak when we have very high conviction. Today,
          we&apos;re speaking.&rdquo;
        </blockquote>
        <button type="button" className="scanbtn" onClick={onProceed}>
          Show Me My 3 Picks &rarr;
        </button>
      </div>
    </div>
  );
}

/** Shown when the scan ran but today's picks haven't been published yet. Plain,
 * static message — no animation, so it never reads as "stuck loading". */
function PicksNotPublished({ pickDate }: { pickDate?: string }) {
  return (
    <div className="calibrating">
      <div className="cal-title">Today&apos;s picks aren&apos;t published yet</div>
      <p className="cal-body">
        <OpusEngine /> has finished scanning
        {pickDate ? ` for ${formatPickDate(pickDate)}` : ""}, but today&apos;s
        high-conviction picks haven&apos;t been released yet. They&apos;re
        reviewed before going live &mdash; please check back shortly.
      </p>
      <div className="cal-badge">
        &#9656; &nbsp;High-conviction or nothing
      </div>
    </div>
  );
}

/** Shown after the free picks are used, while the proof window is running.
 *  The server stops serving picks here — the 2 follow-up picks arrive via email
 *  once the window closes. */
function AwaitingWindow({ remaining }: { remaining: number }) {
  return (
    <div className="calibrating">
      <div className="cal-title">Your free picks are locked in</div>
      <p className="cal-body">
        You&apos;ve used your 3 free picks. Track how they perform &mdash; your 2
        follow-up picks unlock in <strong>{remaining}</strong> full trading
        session{remaining === 1 ? "" : "s"} (no weekends or holidays), then
        we&apos;ll email them to you.
      </p>
      <div className="cal-badge">&#9656; &nbsp;Proof window in progress</div>
    </div>
  );
}

export default function ScannerWidget() {
  const [funnelState, setFunnelState] = useState<FunnelState>("free_picks");
  const [session, setSession] = useState<SessionStatus | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-scan intro modal.
  const [showIntro, setShowIntro] = useState(false);
  const pendingScanRef = useRef(false);

  // Results state.
  const [picks, setPicks] = useState<Pick[]>([]);
  const [scanned, setScanned] = useState(false);
  const [picksNotPublished, setPicksNotPublished] = useState(false);
  const [pickDate, setPickDate] = useState<string | null>(null);
  const [scanTimeLabel, setScanTimeLabel] = useState("");

  // Email gate state.
  const [email, setEmail] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [followupPicks, setFollowupPicks] = useState<Pick[]>([]);

  // On mount, learn the current funnel state from the backend.
  useEffect(() => {
    let active = true;
    getFunnelSession()
      .then((s) => {
        if (!active) return;
        setFunnelState(s.funnel_state);
        setSession({
          sessions_used: s.sessions_used,
          sessions_total: s.sessions_total,
        });
      })
      .catch((e: unknown) => {
        if (active && e instanceof Error) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, []);

  async function doScan() {
    setLoading(true);
    setError(null);
    setPicksNotPublished(false);
    try {
      const res = await runFreeScan();
      setFunnelState(res.funnel_state);
      setSession(res.session);
      setScanned(true);

      if (res.picks.length === 0) {
        setPicks([]);
        setPickDate(null);
        setScanTimeLabel("");
        // Empty picks in the free-picks window means the admin hasn't published
        // yet. Empty in any later funnel state (proof window / gate / paywall)
        // is the server enforcing the free cap — handled by the funnel UI, not
        // the "not published" message.
        setPicksNotPublished(res.funnel_state === "free_picks");
      } else {
        setPicks(res.picks);
        const date = res.picks[0]?.pick_date ?? null;
        setPickDate(date);
        setScanTimeLabel(
          date
            ? `Closing Prices · ${formatPickDate(date)}`
            : new Date().toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              }),
        );
        setPicksNotPublished(false);
      }
    } catch (e: unknown) {
      setError(
        e instanceof Error
          ? e.message
          : "Something went wrong running your scan. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleScan() {
    // Show the intro modal on the very first scan (once per session).
    if (!pendingScanRef.current && typeof sessionStorage !== "undefined" && !sessionStorage.getItem(INTRO_KEY)) {
      setShowIntro(true);
      pendingScanRef.current = true;
      return;
    }
    void doScan();
  }

  function handleIntroProceed() {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(INTRO_KEY, "1");
    }
    setShowIntro(false);
    void doScan();
  }

  async function handleEmailSubmit() {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    setEmailSubmitting(true);
    setError(null);
    try {
      const res = await submitLead(trimmed);
      setFunnelState(res.funnel_state);
      setFollowupPicks(res.picks);
    } catch (e: unknown) {
      setError(
        e instanceof Error
          ? e.message
          : "We couldn't deliver your picks. Please check your email and try again.",
      );
    } finally {
      setEmailSubmitting(false);
    }
  }

  function scrollToPricing() {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  }

  const showEmailGate = funnelState === "email_gate";
  const showPaywall =
    funnelState === "paywall" || funnelState === "followup_picks";
  const showScanner = !showEmailGate && !showPaywall;

  return (
    <>
      {showIntro && <PreScanIntro onProceed={handleIntroProceed} />}

      <div className="widget" id="free-picks">
        <div className="wlabel">
          &#9656; Live Scanner &mdash; OpusEngine
          <sup style={{ fontSize: "10px", fontWeight: 100 }}>TM</sup>
        </div>
        <h2>Today&apos;s 3 Free High-Conviction Picks</h2>
        <p>
          <OpusEngine /> scans the Russell 3000 + S&amp;P 500 across every price
          range and only speaks when conviction is very high. Run your free scan
          to see <strong>3 of today&apos;s high-conviction picks</strong> &mdash;
          no selection needed.
        </p>

        <div className="free-badge">
          &#10003; &nbsp;3 Free Picks &middot; No Email &middot; No Credit
          Card &middot; No Catch
        </div>

        {showScanner && (
          <>
            <button
              type="button"
              className="scanbtn"
              onClick={handleScan}
              disabled={loading}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Run My Free Scan
            </button>
            <div className="disc">
              For informational purposes only. Not financial advice. Generated
              by proprietary <OpusEngine /> methodology. Past performance does
              not guarantee future results.
            </div>
          </>
        )}

        <div className={`loading${loading ? " on" : ""}`} id="loading">
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          Scanning 2,500+ stocks for high-conviction setups...
        </div>

        {error && (
          <div
            style={{
              marginTop: "16px",
              background: "rgba(139,26,26,.1)",
              border: "1px solid rgba(139,26,26,.35)",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "13px",
              color: "#e07070",
              lineHeight: 1.55,
            }}
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Picks not published yet — admin hasn't released today's picks */}
        {scanned && picksNotPublished && showScanner && (
          <PicksNotPublished pickDate={pickDate ?? undefined} />
        )}

        {/* Free picks used — proof window running (server stops serving picks) */}
        {scanned && !picksNotPublished && picks.length === 0 && showScanner &&
          funnelState === "awaiting_sessions" && (
            <AwaitingWindow
              remaining={
                session
                  ? Math.max(session.sessions_total - session.sessions_used, 0)
                  : 10
              }
            />
          )}

        {/* Visit 1 results */}
        {scanned && picks.length > 0 && showScanner && (
          <div className="results on" id="results">
            <div className="rhead">
              <span className="rtitle">
                &#9656; Today&apos;s 3 High-Conviction Picks
              </span>
              <span className="rbadge" id="scanTime">
                {scanTimeLabel}
              </span>
            </div>
            <div id="picksList">
              {picks.map((p, i) => (
                <div
                  className="pick"
                  key={`${p.ticker}-${p.rank}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className="prank">#{p.rank}</span>
                  <span className="pticker">{p.ticker}</span>
                  <span className="pdesc">
                    {p.pick_date
                      ? `Closing Price ${formatPickDate(p.pick_date)}`
                      : p.description || p.signal_badge}
                  </span>
                  <span className="psig">${p.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            {picks.length > 0 && (
              <div className="snotice" id="snotice">
                <p>
                  These are your{" "}
                  <strong>3 free high-conviction picks</strong>. Track their
                  performance, then come back after{" "}
                  <strong>5 full trading sessions</strong> &mdash; no
                  weekends, no holidays, no half-days &mdash; for{" "}
                  <strong>2 more picks, completely free</strong>. After that,
                  decide if you want to subscribe.
                </p>
                <div className="stimer">
                  ↻ &nbsp;Your 2 follow-up picks unlock in{" "}
                  {session
                    ? Math.max(
                        session.sessions_total - session.sessions_used,
                        0,
                      )
                    : 5}{" "}
                  full trading sessions
                </div>
                <p
                  style={{
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(200,146,26,.15)",
                    fontSize: "12px",
                    color: "#8A99AE",
                  }}
                >
                  OpusEngine&trade; identifies stocks that are showing signs
                  of being ready to move higher &mdash; we don&apos;t advise
                  on when to sell or how to lock in profits. Once you&apos;ve
                  taken a position, when to exit is entirely your own call.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Email gate — after the proof window elapses */}
        {showEmailGate && (
          <div className="email-gate on" id="emailGate">
            <div className="eg-title">
              10 Trading Sessions Complete &mdash; How Did We Do?
            </div>
            <p className="eg-sub">
              Your <strong>2 new high-conviction picks</strong> are ready.
              Enter your email and we&apos;ll deliver them now &mdash; still
              completely free. No subscription required.
            </p>
            <div className="erow">
              <input
                type="email"
                className="einput"
                id="emailInput"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void handleEmailSubmit();
                }}
              />
              <button
                type="button"
                className="egbtn"
                onClick={() => void handleEmailSubmit()}
                disabled={emailSubmitting}
              >
                {emailSubmitting ? "Sending…" : "Get My 2 Picks →"}
              </button>
            </div>
            <div className="eg-disc">
              One email with your picks. No spam. Unsubscribe anytime.
            </div>
          </div>
        )}

        {/* Follow-up picks delivered after the email gate, before the paywall */}
        {followupPicks.length > 0 && (
          <div className="results on" style={{ marginTop: "10px" }}>
            <div className="rhead">
              <span className="rtitle">&#9656; Your 2 Follow-Up Picks</span>
            </div>
            <div>
              {followupPicks.map((p, i) => (
                <div
                  className="pick"
                  key={`fu-${p.ticker}-${p.rank}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className="prank">#{p.rank}</span>
                  <span className="pticker">{p.ticker}</span>
                  <span className="pdesc">
                    {p.pick_date
                      ? `Closing Price ${formatPickDate(p.pick_date)}`
                      : p.description || p.signal_badge}
                  </span>
                  <span className="psig">${p.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Paywall */}
        {showPaywall && (
          <div className="paywall on" id="paywall">
            <div className="pw-title">You&apos;ve Seen What We Can Do</div>
            <p className="pw-sub">
              5 free picks total &mdash; 3 today, 2 more after 5 trading
              sessions. Now subscribe and let <OpusEngine /> find your{" "}
              <strong>next high-conviction opportunity</strong> every single
              week.
            </p>
            <button
              type="button"
              className="pwbtn"
              onClick={scrollToPricing}
            >
              View Pricing &amp; Subscribe &rarr;
            </button>
            <div className="pw-plans">
              <div className="pw-plan">
                <div className="pw-price">
                  <sup>$</sup>299
                </div>
                <div className="pw-name">Single Range</div>
              </div>
              <div className="pw-plan feat">
                <div className="pw-price">
                  <sup>$</sup>499
                </div>
                <div className="pw-name">All 6 Ranges</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
