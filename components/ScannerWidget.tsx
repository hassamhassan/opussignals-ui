"use client";

import { useEffect, useState } from "react";
import {
  getFunnelSession,
  runFreeScan,
  submitLead,
  type FunnelState,
  type Pick,
  type PriceRange,
  type SessionStatus,
} from "@/lib/api";

// The 6 scanner ranges: display label -> backend PriceRange value + subtitle.
const RANGES: { value: PriceRange; label: string; sub: string }[] = [
  { value: "$2-$5", label: "$2 – $5", sub: "Micro-cap momentum" },
  { value: "$5-$10", label: "$5 – $10", sub: "Small-cap breakouts" },
  { value: "$10-$20", label: "$10 – $20", sub: "Growth plays" },
  { value: "$20-$50", label: "$20 – $50", sub: "Mid-cap movers" },
  { value: "$50-$100", label: "$50 – $100", sub: "Blue chip setups" },
  { value: "$100-$500", label: "$100 – $500", sub: "Premium leaders" },
];

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

export default function ScannerWidget() {
  const [funnelState, setFunnelState] = useState<FunnelState>("free_picks");
  const [session, setSession] = useState<SessionStatus | null>(null);
  const [selectedRange, setSelectedRange] = useState<PriceRange | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Results state.
  const [picks, setPicks] = useState<Pick[]>([]);
  const [scanned, setScanned] = useState(false);
  const [rangeDisplay, setRangeDisplay] = useState("");
  const [scanTime, setScanTime] = useState("");

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
        // Non-fatal: the widget still works, defaulting to the free-picks view.
        if (active && e instanceof Error) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, []);

  function selectRange(range: PriceRange) {
    setSelectedRange(range);
    // Selecting a new range clears any prior results (matches the static site).
    setScanned(false);
    setError(null);
  }

  async function handleScan() {
    setLoading(true);
    setError(null);
    try {
      const res = await runFreeScan(selectedRange ?? undefined);
      setFunnelState(res.funnel_state);
      setSession(res.session);
      setPicks(res.picks);
      setScanned(true);
      setRangeDisplay(
        selectedRange ? res.range : "Today's 3 High-Conviction Picks",
      );
      setScanTime(
        new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      );
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

  // What to show is driven off the backend funnel_state.
  const showEmailGate = funnelState === "email_gate";
  const showPaywall =
    funnelState === "paywall" || funnelState === "followup_picks";
  // The scan control is available while the visitor can still pull free picks.
  const showScanner = !showEmailGate && !showPaywall;

  return (
    <div className="widget">
      <div className="wlabel">
        &#9656; Live Scanner &mdash; OpusEngine
        <sup style={{ fontSize: "10px", fontWeight: 100 }}>TM</sup>
      </div>
      <h2>Select Your Price Range</h2>
      <p>
        Select the range you like to trade within &mdash; from micro-cap momentum
        at $2&ndash;$5 to premium leaders at $100&ndash;$500. <OpusEngine /> scans
        the Russell 2000 + S&amp;P 500 within your preferred range and surfaces
        its highest-conviction pick for you.
      </p>

      <div className="free-badge">
        &#10003; &nbsp;3 Free Picks &middot; No Email &middot; No Credit Card
        &middot; No Catch
      </div>

      <div className="ranges" id="ranges">
        {RANGES.map((r) => (
          <button
            key={r.value}
            type="button"
            className={`rb${selectedRange === r.value ? " sel" : ""}`}
            onClick={() => selectRange(r.value)}
          >
            <div className="rl">{r.label}</div>
            <div className="rs">{r.sub}</div>
          </button>
        ))}
      </div>
      <div className="range-note">
        Pick a range for a targeted scan, or run it as-is &mdash;{" "}
        <strong>today&apos;s 3 picks span multiple ranges</strong>.
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
            For informational purposes only. Not financial advice. Generated by
            proprietary <OpusEngine /> methodology. Past performance does not
            guarantee future results.
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

      {/* Visit 1 results */}
      {scanned && showScanner && (
        <div className="results on" id="results">
          <div className="rhead">
            <span className="rtitle">
              &#9656; High-Conviction Picks &mdash;{" "}
              <span id="rangeDisplay">{rangeDisplay}</span>
            </span>
            <span className="rbadge" id="scanTime">
              {scanTime}
            </span>
          </div>
          <div id="picksList">
            {picks.length > 0 ? (
              picks.map((p, i) => (
                <div
                  className="pick"
                  key={`${p.ticker}-${p.rank}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className="prank">#{p.rank}</span>
                  <span className="pticker">{p.ticker}</span>
                  <span className="pdesc">
                    {p.description || p.signal_badge}
                  </span>
                  <span className="psig">${p.price.toFixed(2)}</span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "24px 16px" }}>
                <p
                  style={{
                    color: "var(--cream)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  No high-conviction setup cleared the bar right now. <OpusEngine />{" "}
                  stays silent unless every layer confirms &mdash; check back
                  soon.
                </p>
              </div>
            )}
          </div>
          {picks.length > 0 && (
            <div className="snotice" id="snotice">
              <p>
                These are your{" "}
                <strong>3 free high-conviction picks</strong>. Track their
                performance, then come back after{" "}
                <strong>5 full trading sessions</strong> &mdash; no weekends, no
                holidays, no half-days &mdash; for{" "}
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
                OpusEngine&trade; identifies stocks that are showing signs of
                being ready to move higher &mdash; we don&apos;t advise on when
                to sell or how to lock in profits. Once you&apos;ve taken a
                position, when to exit is entirely your own call.
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
            Your <strong>2 new high-conviction picks</strong> are ready. Enter
            your email and we&apos;ll deliver them now &mdash; still completely
            free. No subscription required.
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
                if (e.key === "Enter") handleEmailSubmit();
              }}
            />
            <button
              type="button"
              className="egbtn"
              onClick={handleEmailSubmit}
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
            <span className="rtitle">
              &#9656; Your 2 Follow-Up Picks
            </span>
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
                <span className="pdesc">{p.description || p.signal_badge}</span>
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
            5 free picks total &mdash; 3 today, 2 more after 5 trading sessions.
            Now subscribe and let <OpusEngine /> find your{" "}
            <strong>next high-conviction opportunity</strong> every single week.
          </p>
          <button type="button" className="pwbtn" onClick={scrollToPricing}>
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
  );
}
