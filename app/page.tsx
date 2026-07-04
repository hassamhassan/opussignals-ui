import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScannerWidget from "@/components/ScannerWidget";

/** OpusEngine™ wordmark with the small superscript trademark, reused throughout. */
function OE() {
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

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero">
        <h1
          style={{
            fontSize: "clamp(24px,3.6vw,38px)",
            fontWeight: 700,
            marginBottom: "14px",
            letterSpacing: "-1px",
            lineHeight: 1.3,
          }}
        >
          OpusEngine
          <sup
            style={{
              fontSize: "50%",
              fontWeight: 300,
              verticalAlign: "super",
              lineHeight: 0,
            }}
          >
            &trade;
          </sup>{" "}
          gives you an unfair advantage
          <br />
          in the Stock Market.
        </h1>

        <div id="heroReveal" className="hero-reveal show">
          <div
            style={{
              fontSize: "clamp(20px,3vw,30px)",
              fontWeight: 600,
              color: "var(--gold2)",
              lineHeight: 1.25,
              marginBottom: "18px",
              letterSpacing: "-.5px",
            }}
          >
            Don&rsquo;t Trust Us &mdash; Test it Yourself.
          </div>

          <div
            className="eyebrow"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#B0C4D6",
              display: "block",
              marginBottom: "28px",
            }}
          >
            Less Noise &middot; More Conviction &middot; Powered by <OE />
          </div>

          <Link
            href="/faq"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Inter',sans-serif",
              fontSize: "14px",
              color: "var(--gold2)",
              border: "1px solid rgba(200,146,26,.5)",
              borderRadius: "6px",
              padding: "11px 22px",
              textDecoration: "none",
              background: "rgba(200,146,26,.06)",
              transition: "all .2s",
            }}
          >
            Want to learn more? Let&rsquo;s start with our FAQ page first &rarr;
          </Link>

          <a
            style={{
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
              marginTop: "68px",
              animation: "scrollcue 2s ease-in-out infinite",
            }}
            href="#conviction"
            aria-label="Scroll down"
          >
            <svg
              width="26"
              height="15"
              viewBox="0 0 26 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L13 12L24 2"
                stroke="var(--gold2)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* CONVICTION SECTION */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "24px 60px 48px",
          textAlign: "center",
        }}
        id="conviction"
      >
        <h2
          style={{
            fontSize: "clamp(24px,3.5vw,34px)",
            fontWeight: 500,
            color: "#fff",
            lineHeight: 1.3,
            marginBottom: "24px",
          }}
        >
          We Only Speak When We Have
          <br />
          <span style={{ color: "var(--gold2)", fontWeight: 500 }}>
            Very High Conviction.
          </span>
        </h2>

        <p className="hsub">
          Most screeners flood you with picks. We don&apos;t. <OE /> scans{" "}
          <strong>2,500+ stocks</strong> and surfaces a pick only when every
          layer confirms it.
        </p>

        <div className="conviction-stmt">
          &quot;We&apos;re so confident, we&apos;ll give you 3 picks right now
          &mdash; free, no email,
          <br />
          no credit card. That&apos;s not a trial. That&apos;s a
          demonstration.&quot;
        </div>
      </section>

      {/* PROOF SECTION — The Internet Never Forgets */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background:
            "linear-gradient(135deg,rgba(200,146,26,.08) 0%,rgba(13,27,46,.95) 100%)",
          borderTop: "1px solid rgba(200,146,26,.15)",
          borderBottom: "1px solid rgba(200,146,26,.15)",
          padding: "72px 60px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "20px",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "18px",
              fontWeight: 500,
            }}
          >
            &#9656; The Internet Never Forgets
          </div>
          <h2
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontSize: "clamp(22px,3vw,32px)",
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "20px",
              letterSpacing: "-.5px",
            }}
          >
            In 2013, Karim publicly documented every trade
            <br />
            before execution on Seeking Alpha.
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--gray)",
              lineHeight: 1.75,
              maxWidth: "640px",
              margin: "0 auto 32px",
              fontWeight: 300,
            }}
          >
            No hindsight. No cherry-picking. No deleted posts.
            <br />
            <strong style={{ color: "var(--cream)" }}>
              Every trade was time-stamped. The record still exists today.
            </strong>
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: "8px",
              background: "rgba(200,146,26,.08)",
              border: "2px solid rgba(200,146,26,.3)",
              borderRadius: "14px",
              padding: "24px 48px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                fontFamily: "'Cabinet Grotesk',sans-serif",
                fontSize: "clamp(28px,5vw,60px)",
                fontWeight: 500,
                color: "#fff",
                lineHeight: 1,
                letterSpacing: "-2px",
                alignItems: "center",
              }}
            >
              $10,000
            </span>
            <span
              style={{
                fontFamily: "'Cabinet Grotesk',sans-serif",
                fontSize: "clamp(42px,8vw,55px)",
                fontWeight: 500,
                color: "var(--gold2)",
                lineHeight: 1,
                letterSpacing: "-3px",
              }}
            >
              &rarr; $1,074,475
            </span>
          </div>
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "12px",
              color: "var(--gray2)",
              letterSpacing: "1px",
              marginBottom: "28px",
            }}
          >
            6 MONTHS · SEEKING ALPHA · 2013 · EVERY TRADE TIMESTAMPED BEFORE
            EXECUTION
          </div>
          <Link
            href="/about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "var(--gold)",
              textDecoration: "none",
              fontWeight: 600,
              border: "1px solid rgba(200,146,26,.3)",
              padding: "10px 22px",
              borderRadius: "6px",
              transition: "all .2s",
              background: "rgba(200,146,26,.06)",
            }}
          >
            View The Archive &rarr;
          </Link>
        </div>
      </div>

      {/* ABOUT SECTION (Karim) */}
      <div className="about-sec">
        <div className="about-inner">
          <div className="about-left">
            <div className="about-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img style={{ width: "100%" }} src="/kp.jpg" alt="Karim Pirani" />
            </div>
            <div className="about-name">Karim Pirani</div>
            <div className="about-title">Founder &amp; Architect</div>
            <div className="about-stat">
              <div className="about-stat-num">35+</div>
              <div className="about-stat-label">
                Years reading
                <br />
                market signals
              </div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">$1M+</div>
              <div className="about-stat-label">
                From 10K in
                <br />6 months · 2013
              </div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">100%</div>
              <div className="about-stat-label">
                Trades called
                <br />
                before execution
              </div>
            </div>
            <Link href="/about" className="about-link">
              Read the Full Story &rarr;
            </Link>
          </div>
          <div className="about-right">
            <div className="about-eyebrow">
              &#9656; About <OE />
            </div>
            <h2 className="about-headline">
              The Mind
              <br />
              <em style={{ fontWeight: 500, fontSize: "30px" }}>
                Behind The Methodology
              </em>
            </h2>
            <p className="about-body">
              <OE /> is the intelligence at the heart of OpusSignals.com &mdash;
              a sophisticated stock screening engine conceived, designed, and
              trained by <strong>Karim Pirani</strong>, a stock trading veteran
              who built his reputation reading charts and market signals to
              identify stocks ready to make a significant move to the upside.
            </p>
            <p className="about-body">
              An optimist by nature, Karim does not short stocks. <OE /> has been
              trained exclusively to identify{" "}
              <strong>bullish breakout candidates</strong> &mdash; stocks coiling
              to move up. Primarily a Point &amp; Figure chart reader, Karim
              layers RSI, 50 and 200-day moving averages, Bearish Resistance
              Lines, Bullish Support Lines, Bollinger Band contraction and
              expansion, Cup &amp; Handle patterns, volume participation, overall
              market sentiment, and more into a sophisticated and proprietary
              scoring methodology.{" "}
              <strong>
                The P&amp;F chart finds the setup. Everything else confirms the
                conviction.
              </strong>
            </p>
            <div className="about-highlight">
              <p>
                In January 2013, Karim launched a 6-month public trading
                experiment on Seeking Alpha called{" "}
                <strong>Options2Wealth</strong> &mdash; turning{" "}
                <strong>
                  $10,000 into $1,074,475 in exactly 6 months
                </strong>
                . Every single trade idea was posted publicly before execution,
                timestamped for the record. Not one trade was disclosed after the
                fact. Followers who tracked the blog made significant returns of
                their own. By the time Karim closed the experiment, readers were
                beseeching him not to stop.
              </p>
            </div>
            <p className="about-body">
              It is that unshakeable confidence in his methodology that led Karim
              to make an offer{" "}
              <strong>no other stock recommendation website has ever made</strong>
              : your first 3 picks, completely free &mdash; no email, no credit
              card, no strings attached.
              <br /> That&apos;s not a promotion. <em> That&apos;s conviction.</em>
            </p>
            <Link href="/about" className="about-link" style={{ fontSize: "13px" }}>
              Read Karim&apos;s full story including the Options2Wealth archive
              &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* SCANNER WIDGET (client, wired to backend) */}
      <ScannerWidget />

      {/* COMPACT ABOUT SECTION */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "rgba(13,27,46,.97)",
          borderBottom: "1px solid rgba(200,146,26,.12)",
          padding: "48px 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              background: "rgba(200,146,26,.12)",
              border: "1px solid rgba(200,146,26,.25)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              flexShrink: 0,
            }}
          >
            👤
          </div>
          <div>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "20px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "8px",
                fontWeight: 500,
              }}
            >
              &#9656; About <OE />
            </div>
            <p
              style={{
                fontSize: "15px",
                color: "var(--cream)",
                lineHeight: 1.7,
                fontWeight: 400,
                marginBottom: "10px",
              }}
            >
              <strong>Karim Pirani</strong> is a 35+ year stock trading veteran
              and Point &amp; Figure specialist. In 2013, he turned{" "}
              <strong style={{ color: "#5dba7d" }}>
                $10,000 into $1,074,475 in exactly 6 months
              </strong>{" "}
              on Seeking Alpha &mdash; every single trade posted publicly before
              execution, timestamped on record. Followers who piggy-backed on his
              trades made significant returns of their own. That same methodology
              &mdash; now systematized &mdash; powers every OpusSignal&trade;.
            </p>
            <Link
              href="/about"
              style={{
                fontSize: "13px",
                color: "var(--gold)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color .2s",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Read the full story including the Options2Wealth archive &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* QUALITY MANIFESTO */}
      <div className="manifesto" id="methodology">
        <div className="manifesto-inner">
          <div className="manifesto-left">
            <div className="sey">Our Philosophy</div>
            <h2>
              Quality Over Quantity.
              <br />
              <em>Always.</em>
            </h2>
            <p className="manifesto-stmt">
              Most stock screeners measure their value by how many picks they
              generate. We measure ours by how good each pick is.{" "}
              <strong>
                If <OE /> doesn&apos;t have very high conviction in a setup, we
                don&apos;t issue a tip.
              </strong>{" "}
              Not a lower-conviction tip. Not a &quot;worth watching&quot; tip.
              Nothing. Silence is confidence, not failure &mdash; it&apos;s the
              system working exactly as designed.
            </p>
            <p className="manifesto-stmt">
              The market doesn&apos;t offer high-conviction setups every day. When
              it does, we tell you. When it doesn&apos;t, we wait. That discipline
              is what separates a genuine signal from noise.
            </p>
            <div className="guarantee-box">
              <div className="gb-label">&#9656; Subscriber Guarantee</div>
              <div className="gb-text">
                Within every rolling <strong>5-trading-session window</strong>,
                subscribers receive a minimum of{" "}
                <strong>one high-conviction pick</strong> in their subscribed
                price range. Not a filler pick. Not a &quot;good enough&quot;
                setup. The real thing &mdash; or we don&apos;t send it.
              </div>
            </div>
          </div>
          <div className="manifesto-right">
            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "20px",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "12px",
                  fontWeight: 500,
                }}
              >
                &#9656; Signal Stack &mdash; <OE />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <span
                  style={{
                    background: "rgba(200,146,26,.12)",
                    border: "1px solid rgba(200,146,26,.3)",
                    color: "var(--gold2)",
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "11px",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontWeight: 600,
                  }}
                >
                  ⬛ P&amp;F Structure
                </span>
                {[
                  "📉 RSI Zone",
                  "📈 50 DMA",
                  "📈 200 DMA",
                  "〰️ BRL / BSL",
                  "🎯 Cup & Handle",
                  "📊 Bollinger Bands",
                  "🔊 Volume",
                  "✨ Golden Cross",
                  "🌡️ Market Sentiment",
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.1)",
                      color: "var(--cream)",
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "11px",
                      padding: "6px 12px",
                      borderRadius: "4px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mcard">
              <div className="micon">⬛</div>
              <div className="mc">
                <h4>P&amp;F Structure First. Always.</h4>
                <p>
                  No P&amp;F signal &mdash; no pick. Rule 1 of <OE />. It never
                  bends.
                </p>
              </div>
            </div>
            <div className="mcard">
              <div className="micon">📊</div>
              <div className="mc">
                <h4>Every Pick Must Be Corroborated</h4>
                <p>
                  Every signal layer must support the thesis. Every layer. Every
                  time. <strong>Partial corroboration is not enough.</strong>
                </p>
              </div>
            </div>
            <div className="mcard">
              <div className="micon">🎯</div>
              <div className="mc">
                <h4>One Pick. The Best One.</h4>
                <p>
                  The single highest-conviction opportunity in your range. And
                  that&apos;s the <em>OpusSignal&trade;</em>.
                </p>
              </div>
            </div>
            <div className="mcard">
              <div className="micon">🔒</div>
              <div className="mc">
                <h4>Methodology Stays Proprietary</h4>
                <p>
                  35+ years of market analysis &mdash; distilled into one signal,
                  on each scan. The secret sauce stays ours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="si">
          <div className="sn">2,500+</div>
          <div className="sl">Stocks Scanned Per Run</div>
        </div>
        <div className="si">
          <div className="sn">35+</div>
          <div className="sl">Years P&amp;F Expertise</div>
        </div>
        <div className="si">
          <div className="sn">4×</div>
          <div className="sl">Daily Scan Cycles</div>
        </div>
        <div className="si">
          <div className="sn">1</div>
          <div className="sl">Pick When Conviction Is There</div>
        </div>
      </div>

      {/* PROOF WINDOW */}
      <div className="proof">
        <div className="proof-grid">
          <div>
            <div className="sey">The Proof Window</div>
            <h2 className="set">
              We give you the picks first.
              <br />
              You judge the results.
            </h2>
            <p className="ses">
              We don&apos;t ask you to trust our methodology. We demonstrate it.{" "}
              <strong>
                3 high-conviction picks, completely free, no email, no credit
                card.
              </strong>{" "}
              Come back after 5 full trading sessions &mdash; real market days, no
              weekends, no holidays &mdash; for 2 more, on us. Then decide.
            </p>
          </div>
          <div className="timeline">
            <div className="ts">
              <div>
                <div className="ti hi">&#9656;</div>
              </div>
              <div className="tc">
                <div className="tl">Right Now</div>
                <div className="tt">3 free high-conviction picks</div>
                <div className="td">
                  Selected by <OE /> from 2,500+ stocks. No email. No friction.{" "}
                  <strong>Pure demonstration of quality.</strong>
                </div>
              </div>
            </div>
            <div className="ts">
              <div>
                <div className="ti">📈</div>
              </div>
              <div className="tc">
                <div className="tl">10 Full Trading Sessions</div>
                <div className="tt">Watch them perform</div>
                <div className="td">
                  10 real NYSE trading days. Weekends, holidays, and half-days
                  don&apos;t count. You&apos;ll know exactly how our conviction
                  translated into price action.
                </div>
              </div>
            </div>
            <div className="ts">
              <div>
                <div className="ti">✉️</div>
              </div>
              <div className="tc">
                <div className="tl">After Session 10</div>
                <div className="tt">2 more free picks &mdash; email required</div>
                <div className="td">
                  One simple ask after we&apos;ve already proven quality. Enter
                  your email and{" "}
                  <strong>2 fresh picks delivered immediately.</strong>
                </div>
              </div>
            </div>
            <div className="ts">
              <div>
                <div className="ti">🔓</div>
              </div>
              <div className="tc">
                <div className="tl">After Follow-Up</div>
                <div className="tt">Subscribe &mdash; on your terms</div>
                <div className="td">
                  You&apos;ve received 5 free picks total. Subscribe to receive
                  high-conviction picks in your price range every week &mdash;{" "}
                  <strong>minimum one per rolling 5-session window.</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="hiw" id="how-it-works">
        <div className="hiw-inner">
          <div className="sey">How It Works</div>
          <h2 className="set" style={{ marginBottom: "14px" }}>
            Simple. Focused. Deliberate.
          </h2>
          <p className="ses" style={{ marginBottom: "48px", maxWidth: "560px" }}>
            No charts to read. No data to interpret. Just the highest-conviction
            opportunity in your price range &mdash; when the market earns it.
          </p>
          <div className="steps">
            <div className="sc">
              <div className="snum">01</div>
              <h3 className="stit">Choose Your Price Range</h3>
              <p className="sbod">
                Select the range you trade &mdash; from micro-cap momentum at
                $2&ndash;$5 to premium leaders at $100&ndash;$500. <OE /> scans
                the <strong>Russell 2000 + S&amp;P 500</strong> within your range
                exclusively.
              </p>
            </div>
            <div className="sc">
              <div className="snum">02</div>
              <h3 className="stit">
                <OE /> Applies Every Filter
              </h3>
              <p className="sbod">
                P&amp;F structural signal, DMA direction and slope, RSI zone,
                volume participation, Golden Cross proximity, market regime.{" "}
                <strong>Every layer must confirm</strong> before a stock
                qualifies.
              </p>
            </div>
            <div className="sc">
              <div className="snum">03</div>
              <h3 className="stit">Only the Highest Conviction Surfaces</h3>
              <p className="sbod">
                The top-ranked qualifying stock in your range is your pick. Not a
                list. <strong>The pick.</strong> If nothing meets our conviction
                threshold today, nothing is issued. <br />
                <span style={{ color: "#ffffff" }}>
                  {" "}
                  Quality over Quantity &mdash; <em>always</em>
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* METHODOLOGY QUOTE */}
      <section className="meth">
        <div>
          <div className="qmark">&quot;</div>
          <p className="qtext">
            After 35 years of reading P&amp;F charts in real markets, one
            develops a feel for which setups have genuine conviction behind them
            and which ones are noise. <OE /> is that instinct, structured. When I
            see a pick that clears every layer of the methodology, I have very
            high confidence. When I don&apos;t see it &mdash; I wait. That
            patience is the edge.
          </p>
          <div className="qattr">
            &mdash; Karim Pirani, Founder &amp; Architect of <OE />
          </div>
        </div>
        <div className="mpoints">
          <div className="mp">
            <div className="mpi">⬛</div>
            <div className="mpc">
              <h4>P&amp;F First &mdash; Always</h4>
              <p>
                Every pick begins with a valid Point &amp; Figure structural
                signal. No P&amp;F event, no pick &mdash; no exceptions.
              </p>
            </div>
          </div>
          <div className="mp">
            <div className="mpi">📐</div>
            <div className="mpc">
              <h4>Multi-Layer Conviction Scoring</h4>
              <p>
                Trend strength, momentum, volume, volatility compression, and
                market context all scored simultaneously. Partial alignment is
                rejected.
              </p>
            </div>
          </div>
          <div className="mp">
            <div className="mpi">⏳</div>
            <div className="mpc">
              <h4>Patience Is the Strategy</h4>
              <p>
                No pick on a slow day is not a failure &mdash; it&apos;s
                discipline. The market earns our recommendation. We don&apos;t
                manufacture one to fill a quota.
              </p>
            </div>
          </div>
          <div className="mp">
            <div className="mpi">🔒</div>
            <div className="mpc">
              <h4>Proprietary Methodology</h4>
              <p>
                35+ years of market analysis &mdash; including RSI, DMA, volume,
                and overall market sentiment &mdash; have all been encoded in the{" "}
                <OE /> methodology. You get the output. The secret sauce stays
                ours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIDENCE BANNER */}
      <div className="conf-banner">
        <div className="conf-inner">
          <h2 className="conf-title">High Conviction Only</h2>
          <p className="conf-body">
            <strong style={{ color: "#C8921A" }}>
              {" "}
              We don&rsquo;t ask for your email or your credit card. No sign-up.
              We just give you our picks — cold.
            </strong>{" "}
            <br />
            That&apos;s not a marketing tactic. That&apos;s a statement of
            conviction. If we weren&apos;t absolutely certain of the quality, we
            wouldn&apos;t do it. 35 years of reading these signals gives us
            conviction.
          </p>

          {/* William Buchanan quote */}
          <div
            style={{
              maxWidth: "650px",
              margin: "28px auto",
              padding: "20px 28px",
              borderLeft: "3px solid #dcac47",
              background: "rgba(200,146,26,.06)",
              borderRadius: "0 8px 8px 0",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "17px",
                color: "#F8F3E8",
                lineHeight: 1.75,
                fontStyle: "italic",
                marginBottom: "10px",
              }}
            >
              &quot;Miss reading your blog. Would love for you to have another
              &apos;building a small fortune&apos; experience &mdash;{" "}
              <strong
                style={{ fontStyle: "italic", color: "#dcac47" }}
              >
                this time I would get in at ground level.
              </strong>
              &quot;
            </div>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "15px",
                color: "#dcac47",
                letterSpacing: "1.5px",
              }}
            >
              volatilis (William Earl Buchanan) · Seeking Alpha · April 29, 2018
              &mdash; Five years after the blog ended
            </div>
          </div>

          <a href="#free-picks" className="conf-cta">
            Get Your 3 Free Picks Now &rarr;
          </a>
        </div>
      </div>

      {/* PRICING */}
      <div className="pricing" id="pricing">
        <div className="pricing-inner">
          <div className="sey">Pricing</div>
          <h2 className="set" style={{ marginBottom: "10px" }}>
            Serious signals. Premium pricing.
          </h2>
          <p className="ses" style={{ marginBottom: 0, maxWidth: "620px" }}>
            If one high-conviction pick per week helps you make a single
            profitable trade, the subscription pays for itself. We price our
            service at what it&apos;s worth &mdash; not what the market will
            tolerate.
          </p>

          <div className="pgrid">
            <div className="pc">
              <div className="pname">Free Preview</div>
              <div className="pprice">
                <sup>$</sup>0
              </div>
              <div className="pper">to start &mdash; forever</div>
              <ul className="pfeats">
                <li>
                  <span className="ck">&#10003;</span>3 picks on first scan (no
                  email)
                </li>
                <li>
                  <span className="ck">&#10003;</span>2 more picks after 5 trading
                  sessions
                </li>
                <li>
                  <span className="ck">&#10003;</span>All 6 price ranges available
                </li>
                <li>
                  <span className="ck">&#10003;</span>Full conviction labels on
                  every pick
                </li>
                <li>
                  <span className="cx">✗</span>Ongoing picks access
                </li>
                <li>
                  <span className="cx">✗</span>Minimum 1 pick per 5-session window
                </li>
                <li>
                  <span className="cx">✗</span>Email briefings
                </li>
              </ul>
              {/* Free tier scrolls to the scanner widget */}
              <a href="#ranges" className="pbtn" style={{ display: "block", textDecoration: "none" }}>
                Start Free &mdash; No Sign-Up
              </a>
            </div>

            <div className="pc">
              <div className="pname">Single Range</div>
              <div className="pprice">
                <sup>$</sup>299
              </div>
              <div className="pper">
                per month · one price · one price range
              </div>
              <ul className="pfeats">
                <li>
                  <span className="ck">&#10003;</span>High-conviction picks in
                  your chosen range
                </li>
                <li>
                  <span className="ck">&#10003;</span>Guaranteed min. 1 pick per
                  5-session window
                </li>
                <li>
                  <span className="ck">&#10003;</span>Only issued when conviction
                  is very high
                </li>
                <li>
                  <span className="ck">&#10003;</span>Email delivery &mdash;
                  pre-market briefing
                </li>
                <li>
                  <span className="ck">&#10003;</span>Mobile-optimized dashboard
                </li>
                <li>
                  <span className="ck">&#10003;</span>Change your price range
                  anytime
                </li>
                <li>
                  <span className="cx">✗</span>Access to other 5 price ranges
                </li>
              </ul>
              {/* TEMP: public sign-up disabled — send buyers to Contact for now.
                  Restore href="/signup" (and Stripe checkout) to re-enable. */}
              <Link
                href="/contact"
                className="pbtn"
                style={{ display: "block", textDecoration: "none" }}
              >
                Subscribe &mdash; $299/mo
              </Link>
            </div>

            <div className="pc feat">
              <div className="pname">All-Access</div>
              <div className="pprice">
                <sup>$</sup>499
              </div>
              <div className="pper">
                per month · one price · all 6 price ranges
              </div>
              <ul className="pfeats">
                <li>
                  <span className="ck">&#10003;</span>High-conviction picks across
                  all 6 ranges
                </li>
                <li>
                  <span className="ck">&#10003;</span>Guaranteed min. 1 pick per
                  range per 5 sessions
                </li>
                <li>
                  <span className="ck">&#10003;</span>Only issued when conviction
                  is very high
                </li>
                <li>
                  <span className="ck">&#10003;</span>Daily pre-market +
                  post-market email briefings
                </li>
                <li>
                  <span className="ck">&#10003;</span>Priority scan queue
                </li>
                <li>
                  <span className="ck">&#10003;</span>Mobile-optimized dashboard
                </li>
                <li>
                  <span className="ck">&#10003;</span>14-day money-back guarantee
                </li>
              </ul>
              {/* TEMP: public sign-up disabled — send buyers to Contact for now.
                  Restore href="/signup" (and Stripe checkout) to re-enable. */}
              <Link
                href="/contact"
                className="pbtn pri"
                style={{ display: "block", textDecoration: "none" }}
              >
                Subscribe &mdash; $499/mo
              </Link>
            </div>
          </div>

          <p className="pnote">
            Annual plans available &mdash; <strong>save 2 months</strong>. Single
            Range: $249/mo · All-Access: $399/mo · billed annually.
          </p>

          <div
            style={{
              marginTop: "32px",
              background: "rgba(200,146,26,.06)",
              border: "1px solid rgba(200,146,26,.2)",
              borderRadius: "10px",
              padding: "20px 24px",
              maxWidth: "760px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "15px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "10px",
              }}
            >
              Important &mdash; Read Before Subscribing
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "#c3c3c3",
                lineHeight: 1.65,
              }}
            >
              We will only issue picks when <OE /> identifies a{" "}
              <strong style={{ color: "var(--cream)" }}>
                very high conviction setup
              </strong>
              . On days or weeks where no stock meets our standard,{" "}
              <strong style={{ color: "var(--cream)" }}>
                no pick is issued
              </strong>
              . Your guaranteed minimum of one pick per rolling 5-session window
              reflects our commitment to quality &mdash; not a quota system.{" "}
              <span style={{ color: "#fff" }}>
                <br />
                You are paying for the signal-to-noise ratio, not the volume of
                picks.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* MONEY BACK GUARANTEE */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background:
            "linear-gradient(135deg,rgba(27,107,58,.12) 0%,rgba(27,107,58,.04) 100%)",
          borderTop: "2px solid rgba(27,107,58,.3)",
          borderBottom: "2px solid rgba(27,107,58,.3)",
          padding: "80px 60px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          {/* Shield icon */}
          <div
            style={{
              width: "72px",
              height: "72px",
              background: "rgba(27,107,58,.15)",
              border: "2px solid rgba(27,107,58,.4)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "32px",
            }}
          >
            &#127961;
          </div>

          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "20px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#C8921A",
              marginBottom: "16px",
              fontWeight: 500,
            }}
          >
            &#9656; Our Guarantee
          </div>

          <h2
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "20px",
              letterSpacing: "-1px",
            }}
          >
            Performance-Backed.
            <br />
            <span style={{ color: "#5dba7d" }}>
              Money Back. No Questions Asked.
            </span>
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "#8899AA",
              lineHeight: 1.75,
              maxWidth: "720px",
              margin: "0 auto 40px",
              fontWeight: 300,
            }}
          >
            When you subscribe to OpusSignals.com at any level, your account is
            created immediately and every pick you receive from us will be{" "}
            <strong style={{ color: "#F8F3E8" }}>
              time-stamped with that stock&apos;s price at the time of delivery
            </strong>
            . You can monitor the performance of every recommendation we make, in
            real time, right from your account dashboard.
          </p>

          {/* Three pillars */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "20px",
              marginBottom: "40px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(27,107,58,.2)",
                borderRadius: "10px",
                padding: "24px",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>
                &#128336;
              </div>
              <h4
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "8px",
                }}
              >
                Every Pick Time-Stamped
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  color: "#8899AA",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                The moment a pick is delivered to your account, the ticker and
                entry price are locked in. Permanently. No ambiguity about when we
                issued it or at what price.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(27,107,58,.2)",
                borderRadius: "10px",
                padding: "24px",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>
                &#128200;
              </div>
              <h4
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "8px",
                }}
              >
                You Monitor the Progress
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  color: "#8899AA",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                Your account dashboard shows every pick we&apos;ve sent you, its
                entry price, and its current performance. Full transparency. You
                see exactly what we see.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(27,107,58,.2)",
                borderRadius: "10px",
                padding: "24px",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>
                &#128176;
              </div>
              <h4
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "8px",
                }}
              >
                We Track It Too
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  color: "#8899AA",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                We maintain a precise record of every pick in your account. If our
                win rate falls below 70%, we can see it immediately &mdash; and so
                can you.
              </p>
            </div>
          </div>

          {/* The guarantee statement */}
          <div
            style={{
              background: "rgba(27,107,58,.1)",
              border: "2px solid rgba(27,107,58,.35)",
              borderRadius: "12px",
              padding: "32px 36px",
              maxWidth: "780px",
              margin: "0 auto 32px",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "20px",
                textTransform: "uppercase",
                color: "#E5AA2A",
                marginBottom: "16px",
                fontWeight: 500,
              }}
            >
              The Guarantee
            </div>
            <p
              style={{
                fontSize: "17px",
                color: "#C2D2E0",
                lineHeight: 1.8,
                fontWeight: 300,
                fontStyle: "italic",
                marginBottom: "18px",
              }}
            >
              Legendary investor Peter Lynch said you only need to be right 60% of
              the time to be a successful investor. Our goal for <OE /> is to be
              right 70% of the time.
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "#F8F3E8",
                lineHeight: 1.8,
                fontWeight: 400,
              }}
            >
              Should our picks fail to deliver &mdash; meaning our win rate falls
              below{" "}
              <strong style={{ color: "#5dba7d" }}>
                70% of picks issued to your account
              </strong>{" "}
              &mdash; your subscription, upon request, will immediately be
              refunded. <strong style={{ color: "#fff" }}>
                No questions asked.
              </strong>{" "}
              Since we keep a precise record of every pick&apos;s performance in
              your account, we will be able to verify the results instantly and
              issue your refund without delay.
            </p>
          </div>

          {/* Two outcomes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              maxWidth: "680px",
              margin: "0 auto 32px",
            }}
          >
            <div
              style={{
                background: "rgba(139,26,26,.08)",
                border: "1px solid rgba(139,26,26,.25)",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>
                &#128533;
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#e07070",
                  marginBottom: "6px",
                }}
              >
                Win rate below 70%?
              </div>
              <div
                style={{ fontSize: "12px", color: "#8899AA", lineHeight: 1.55 }}
              >
                Full refund. Immediately. No questions asked. You have our word
                and our data to back it up.
              </div>
            </div>
            <div
              style={{
                background: "rgba(27,107,58,.08)",
                border: "1px solid rgba(27,107,58,.25)",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>
                &#127881;
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#5dba7d",
                  marginBottom: "6px",
                }}
              >
                Win rate 70% or above?
              </div>
              <div
                style={{ fontSize: "12px", color: "#8899AA", lineHeight: 1.55 }}
              >
                We&apos;ll kindly point to the data. A refund on a service that
                delivered isn&apos;t something we can honor in good conscience.
              </div>
            </div>
          </div>

          <p
            style={{
              fontSize: "15px",
              color: "#ffffff",
              fontStyle: "italic",
              fontFamily: "'Inter',sans-serif",
            }}
          >
            Our picks are tracked. Every one. That&apos;s what makes our guarantee
            meaningful &mdash; for both of us.
          </p>
        </div>
      </div>

      {/* POWERED BY */}
      <div className="powered">
        <div className="plabel">Powered by</div>
        <div className="plogo">
          OpusEngine
          <sup style={{ fontSize: "10px", fontWeight: 100 }}>TM</sup>
        </div>
        <p className="pdesc">
          OpusSignals.com is built on <OE /> &mdash; a proprietary Point &amp;
          Figure trading intelligence engine developed by Karim Pirani with 35+
          years of <br />
          active market expertise.
        </p>
        <a href="https://chart.opussignals.com" className="plink">
          Learn more at chart.opussignals.com &rarr;
        </a>
      </div>

      <Footer />
    </>
  );
}
