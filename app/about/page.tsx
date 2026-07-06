"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./about.css";

// Note: metadata cannot be exported from a Client Component; the app-wide
// default in layout.tsx applies.
// Original <title>: "Karim Pirani — $10K to $1.07M in 6 Months | OpusSignals"

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Chart?: any;
    __elonChartDrawn?: boolean;
    openSaModal?: (key: string) => void;
  }
}

/** OpusEngine™ wordmark with the small superscript trademark. */
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

/** Small helper: open a Seeking Alpha (or other) URL in a popup window,
 *  faithfully reproducing the original `onclick="window.open(...)"` behavior. */
function openPopup(url: string, name = "SAPopup") {
  if (typeof window !== "undefined") {
    window.open(url, name, "width=1000,height=700,scrollbars=yes,resizable=yes");
  }
}

const SA_POSTS: Record<
  string,
  { title: string; date: string; url: string; body: string }
> = {
  sprint: {
    title: "Sprint: The Most Beautiful Cup And Handle Pattern Ever",
    date: "February 17, 2013 · Options2Wealth · Seeking Alpha",
    url: "https://seekingalpha.com/instablog/6566781-options2wealth/1561171-sprint-the-most-beautiful-cup-and-handle-pattern-ever",
    body: `<p>On Sunday evening, February 17th 2013 — before markets opened Tuesday — Karim published this post publicly on Seeking Alpha, announcing he would substantially increase his Sprint position at the open.</p>
    <div class="sa-modal-excerpt">"When checking the technical health of a stock, I rely on its Point and Figure (P&F) chart first... what I saw was a Cup and Handle pattern that was more perfectly formed than any I personally have ever seen in my 20 years of stock picking."</div>
    <p>Karim had already held Sprint May $6 calls for 6+ weeks. In this post he announced buying 337 more contracts to reach 500 total — and called the exact P&F breakout level:</p>
    <div class="sa-modal-excerpt">"When the stock price prints $6.50, it will be the break of a double top on Sprint's Point and Figure chart as well — all very bullish indeed."</div>
    <p>Sprint broke out on April 15, 2013 — nearly two months later. Patience rewarded. Every word of this analysis was timestamped on Seeking Alpha before the stock moved.</p>`,
  },
  methodology: {
    title: "Methodology Used To Identify My Stock / Option Picks",
    date: "December 31, 2012 · Options2Wealth · Seeking Alpha",
    url: "https://seekingalpha.com/instablog/6566781-options2wealth/1410431-methodology-used-to-identify-my-stock-option-picks",
    body: `<p>Published on December 31st, 2012 — before a single trade was executed — this post documented Karim's complete 5-step investment methodology publicly on Seeking Alpha. It is the blueprint for what would become OpusEngine<sup style="font-size:60%;font-weight:300;vertical-align:super;line-height:0">™</sup>.</p>
    <div class="sa-modal-excerpt">"1) The very first thing I do is check the stock's technical analysis using the Point and Figure chart. All potential investment opportunities MUST pass this initial test before I will conduct any further analysis. Period.<br/><br/>2) I then check the stock's relative strength versus its 50 day and 200 day SMA.<br/><br/>3) Next I check to see whether the market favors the sector.<br/><br/>4) I then do an in depth analysis of its fundamentals — cash position, debt, sales growth, profitability, insider buying, quality of management.<br/><br/>5) The final check is the health of the general economy."</div>
    <p>This post proves the methodology existed before the returns — not the other way around. OpusEngine<sup style="font-size:60%;font-weight:300;vertical-align:super;line-height:0">™</sup> is this methodology, systematized.</p>`,
  },
  "spwr-bet": {
    title: "The Reasons Behind My Big Bet On SunPower",
    date: "April 22, 2013 · Options2Wealth · Seeking Alpha",
    url: "https://seekingalpha.com/instablog/6566781-options2wealth/1779711-the-reasons-behind-my-big-bet-on-sunpower",
    body: `<p>Three days before SunPower made its major breakout, Karim documented his complete pre-breakout analysis publicly. Every signal layer — P&F, RSI, MACD, Bollinger Bands, and fundamentals — analyzed simultaneously before the stock moved.</p>
    <div class="sa-modal-excerpt">"SPWR's charts, both Candlesticks and Point and Figure, look pretty darn good. The stock price is butting heads with the downward sloping Bearish Resistant line. When the stock price prints $11.50 it will have penetrated its Bearish Resistant line. A subsequent print of $12.00 will not only be a Double Top breakout but also serve as the confirmation signal of a MAJOR trend reversal. I am betting this should catapult the stock price all the way up to $23 within 2 months."</div>
    <p>RSI was below 50. MACD was in oversold territory. Bollinger Bands were converging. Japan solar forecasts had doubled. Saudi Arabia's $110B solar program was imminent. Three days later, on April 25th, SPWR broke out exactly as described — volume 2x normal, stock up 10%+ in a single day.</p>`,
  },
  apple: {
    title: "The Impending Move In Apple...",
    date: "July 26, 2013 · Options2Wealth · Seeking Alpha",
    url: "https://seekingalpha.com/instablog/6566781-options2wealth/2068932-the-impending-move-in-apple",
    body: `<p>With Apple trading around $440 after a painful slide from $700+, Karim called the bottom publicly — flagging a Bearish Resistance Line pierce on the P&F chart as the signal.</p>
    <div class="sa-modal-excerpt">"When AAPL gapped up and printed $444, it broke through its bearish resistance line sitting at $440. I believe that this break of the bearish resistance line is very significant. My humble prediction is that Apple has made its lows and has just started the inevitable march upward in pursuit of its recent $700+ peak — in other words, a $260+ move in Apple's stock price could be in the offing."</div>
    <p>Karim also connected Apple's recovery to the Nasdaq's eventual all-time high — predicting the Nasdaq would break through 5,000 within 6–9 months. Apple subsequently made a massive multi-year bull run, and the Nasdaq hit new all-time highs in 2015.</p>`,
  },
  nasdaq: {
    title: "The Nasdaq Correction Is Over...imho",
    date: "May 26, 2014 · Options2Wealth · Seeking Alpha",
    url: "https://seekingalpha.com/instablog/6566781-options2wealth/2943063-the-nasdaq-correction-is-over-imho",
    body: `<p>With the Nasdaq having fallen 9.74% from its March 2014 high, Karim called the correction over at 4,185 — using fear as a contrarian indicator and David Tepper's nervousness as the signal that the bottom was in.</p>
    <div class="sa-modal-excerpt">"There is way too much fear in the markets, which, to me, serves as the contrarian indicator. The markets love to climb the wall of fear — more fear, the better. And when I read headlines like David Tepper... was getting nervous, to me, that was yet another signal that the Nasdaq has established a bottom and is heading higher."</div>
    <p>Karim predicted new near-term highs within 2–4 weeks and eventual all-time highs above 5,132 — a level not seen since the dot-com bubble in March 2000. David Tepper turned bullish on CNBC exactly 10 days after this post. The Nasdaq hit new all-time highs in 2015.</p>`,
  },
  nasdaq2015: {
    title: "The NASDAQ Is On The Launchpad In Pursuit Of A Multi-Year Breakout!",
    date: "March 30, 2015 · Options2Wealth · Seeking Alpha",
    url: "https://seekingalpha.com/instablog/6566781-options2wealth/3440791-the-nasdaq-is-on-the-launchpad",
    body: `<p>With the Nasdaq having twice touched 5,000 and retreated, Karim called the Triple Top breakout — predicting the index would decisively break through 5,050 on its P&F chart and go on to set new all-time highs above 5,128 for the first time since March 2000.</p>
    <div class="sa-modal-excerpt">"The NASDAQ will make a third attempt at the 5,000 mark and form a triple top when it again prints 5,000 on its PnF chart. And as the saying goes 'Third Time is the Charm' — this time it should decisively break out. The break will occur when the index prints 5,050. The next target is 5,128, set all the way back in March of 2000."</div>
    <p>The Nasdaq hit new all-time highs shortly after. Follower William Earl Buchanan (volatilis) confirmed: <em>"Great call on Nasdaq!!"</em></p>`,
  },
};

export default function AboutPage() {
  // Renders the ELON Chart.js chart once Chart.js is available.
  function drawElonChart() {
    if (typeof window === "undefined" || !window.Chart) return;
    const canvas = document.getElementById("elonChartEMBED");
    if (!canvas || window.__elonChartDrawn) return;
    window.__elonChartDrawn = true;

    const labels = [
      "Oct 15", "Oct 22", "Oct 29", "Nov 5", "Nov 12", "Nov 14 ★", "Nov 19",
      "Nov 26", "Dec 3", "Dec 10", "Dec 17", "Dec 24", "Dec 31", "Jan 7",
      "Jan 14", "Jan 21", "Jan 28", "Feb 4", "Feb 11", "Feb 18", "Feb 25",
      "Mar 3", "Mar 10", "Mar 17 ▲",
    ];
    const prices = [
      6.0, 6.8, 7.2, 7.8, 8.2, 8.5, 10.5, 13.8, 18.5, 24.0, 30.0, 37.0, 44.0,
      56.0, 69.0, 79.0, 86.0, 92.0, 97.0, 104.0, 110.0, 112.0, 114.0, 115.0,
    ];
    const callIdx = 5;
    const peakIdx = 23;
    const bgColors = prices.map((_, i) =>
      i === callIdx ? "#ef4444" : i === peakIdx ? "#22c55e" : "#dcac47"
    );
    const borderColors = prices.map((_, i) =>
      i === callIdx ? "#ef4444" : i === peakIdx ? "#22c55e" : "#0D1B2E"
    );
    const radii = prices.map((_, i) =>
      i === callIdx || i === peakIdx ? 9 : 5
    );
    const borderWidths = prices.map((_, i) =>
      i === callIdx || i === peakIdx ? 0 : 2
    );
    const hoverRadii = prices.map((_, i) =>
      i === callIdx || i === peakIdx ? 13 : 9
    );

    new window.Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "ELON",
            data: prices,
            borderColor: "#dcac47",
            borderWidth: 2.5,
            tension: 0.35,
            fill: true,
            backgroundColor: "rgba(220,172,71,0.07)",
            pointBackgroundColor: bgColors,
            pointBorderColor: borderColors,
            pointRadius: radii,
            pointBorderWidth: borderWidths,
            pointHoverRadius: hoverRadii,
            pointHoverBackgroundColor: bgColors,
            pointHoverBorderColor: "#ffffff",
            pointHoverBorderWidth: 2.5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(10,22,40,0.95)",
            borderColor: "rgba(220,172,71,0.3)",
            borderWidth: 1,
            titleColor: "#F8F3E8",
            bodyColor: "#8A99AE",
            padding: 12,
            titleFont: { size: 12, weight: "500" },
            bodyFont: { size: 12 },
            caretSize: 5,
            cornerRadius: 6,
            displayColors: false,
            callbacks: {
              title: function (ctx: any) {
                const i = ctx[0].dataIndex;
                if (i === callIdx) return "★ Nov 14, 1999 — Public Call";
                if (i === peakIdx) return "▲ Mar 2000 — Peak";
                return ctx[0].label;
              },
              label: function (ctx: any) {
                const p = ctx.parsed.y;
                const i = ctx.dataIndex;
                const base = "Price: $" + p.toFixed(2);
                const pct = Math.round(((p - 8.5) / 8.5) * 100);
                if (i === callIdx)
                  return [base, "Silicon Investor msgid 11920168", "Entry point"];
                if (i === peakIdx)
                  return [
                    base,
                    "+" + Math.round(((115 - 8.5) / 8.5) * 100) + "% from entry",
                  ];
                return [base, (pct >= 0 ? "+" : "") + pct + "% vs entry"];
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#8A99AE",
              font: { size: 10 },
              maxRotation: 45,
              autoSkip: true,
              maxTicksLimit: 13,
            },
            grid: { color: "rgba(200,146,26,0.08)", lineWidth: 0.5 },
          },
          y: {
            ticks: {
              color: "#8A99AE",
              font: { size: 10 },
              callback: function (v: any) {
                return "$" + v;
              },
            },
            grid: { color: "rgba(200,146,26,0.08)", lineWidth: 0.5 },
            min: 0,
            max: 130,
          },
        },
      },
    });
  }

  useEffect(() => {
    // In case Chart.js already loaded (e.g., client-side nav), try to draw.
    drawElonChart();

    // Faithfully reproduce the SA modal handlers from the source page.
    window.openSaModal = (key: string) => {
      const post = SA_POSTS[key];
      if (!post) return;
      const t = document.getElementById("saModalTitle");
      const d = document.getElementById("saModalDate");
      const b = document.getElementById("saModalBody");
      const l = document.getElementById("saModalLink") as HTMLAnchorElement | null;
      const o = document.getElementById("saOverlay");
      if (t) t.textContent = post.title;
      if (d) d.textContent = post.date;
      if (b) b.innerHTML = post.body;
      if (l) l.href = post.url;
      if (o) o.classList.add("on");
      document.body.style.overflow = "hidden";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeSaModal(e: React.MouseEvent) {
    const overlay = document.getElementById("saOverlay");
    if (e.target === overlay) {
      overlay?.classList.remove("on");
      document.body.style.overflow = "";
    }
  }

  function closeSaModalBtn() {
    document.getElementById("saOverlay")?.classList.remove("on");
    document.body.style.overflow = "";
  }

  return (
    <div className="about-page">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"
        strategy="afterInteractive"
        onLoad={() => drawElonChart()}
      />
      <Nav />

      {/* BIO HERO */}
      <div className="bio-hero">
        <div className="bio-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img style={{ width: "100%" }} src="/kp.jpg" alt="Karim Pirani" />
        </div>
        <div>
          <div className="bio-eyebrow">
            ▸ Founder &amp; Architect of OpusEngine
            <sup
              style={{
                fontSize: "60%",
                fontWeight: 300,
                verticalAlign: "super",
                lineHeight: 0,
              }}
            >
              ™
            </sup>
          </div>
          <h1 className="bio-name">Karim Pirani</h1>
          <p className="bio-subtitle">
            Stock trading veteran. Point &amp; Figure specialist. The mind who
            turned{" "}
            <strong>$10,000 into $1,074,475 in exactly 6 months</strong> — every
            trade called publicly before execution.
          </p>
          <div className="stat-row">
            <div className="stat-box">
              <div className="stat-num">
                35<sup>+</sup>
              </div>
              <div className="stat-lbl">
                Years reading
                <br />
                market signals
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-num">
                $1M<sup>+</sup>
              </div>
              <div className="stat-lbl">
                From $10K
                <br />
                in 6 months
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-num">
                100<sup>%</sup>
              </div>
              <div className="stat-lbl">
                Trades timestamped
                <br />
                before execution
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-num">0</div>
              <div className="stat-lbl">
                Short positions.
                <br />
                Ever.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* THE PERSON */}
      <div className="bio-section full">
        <div className="section-label">▸ The Person</div>
        <h2 className="section-title">
          An Optimist Who Only
          <br />
          <em>Bets on the Upside</em>
        </h2>
        <p className="bio-p">
          Karim Pirani has been reading stock charts for over 25 years — long
          before algorithmic trading, long before machine learning, long before
          anyone was talking about AI-powered screeners. His edge was built the
          old-fashioned way: sitting with charts, learning to see patterns that
          others missed, and developing the patience to wait for the setup to
          fully form before acting.
        </p>
        <p className="bio-p">
          An optimist by nature, Karim has never shorted a stock. Not once. His
          entire methodology is built around one question:{" "}
          <strong>which stocks are coiling to move up?</strong> <OE /> has been
          trained exclusively to answer that question. It does not look for stocks
          to short, does not issue bearish signals, and does not benefit from
          market downturns. If the market isn&apos;t presenting high-conviction
          bullish setups — <OE /> stays silent.
        </p>
        <div className="bio-quote">
          <p>
            &quot;After 25+ years of reading P&amp;F charts along with other market
            signals, you develop a feel for which setups have genuine conviction
            behind them and which ones are noise. <OE /> is that instinct,
            structured. When I see a pick that clears every layer of my methodology
            honed over 25+ years, I have very high confidence. When I don&apos;t —
            I won&apos;t share a pick for the sake of sharing. That patience is the
            edge.&quot;
          </p>
          <cite>
            — Karim Pirani, Founder &amp; Architect of <OE />
          </cite>
        </div>
      </div>

      <div className="divider"></div>

      {/* THE METHODOLOGY */}
      <div className="bio-section">
        <div className="section-label">
          ▸ The Methodology &nbsp;
          <span
            className="sa-link"
            style={{ fontSize: "10px" }}
            onClick={() =>
              openPopup(
                "https://seekingalpha.com/instablog/6566781-options2wealth/1410431-methodology-used-to-identify-my-stock-option-picks"
              )
            }
          >
            View Original 2012 Post ↗
          </span>
        </div>
        <h2 className="section-title">
          P&amp;F First.
          <br />
          <em>Everything Else Confirms.</em>
        </h2>
        <p className="bio-p">
          Karim is primarily a Point &amp; Figure chart reader — a discipline that
          strips away time and focuses purely on price movement. P&amp;F charts
          filter out the noise that confuses most technical analysts and reveal the
          underlying supply and demand dynamics of a stock with unusual clarity.
          Over 25+ years, Karim has developed an intuitive mastery of P&amp;F
          patterns that forms the foundation of every trade decision he makes.
        </p>
        <p className="bio-p">
          But P&amp;F alone is not the complete picture. Karim layers additional
          signals on top of the structural P&amp;F analysis to sharpen conviction
          and filter out false positives. Every signal below must support the
          thesis before a pick qualifies:
        </p>
        <div className="signals-grid">
          <div className="signal-chip">
            <div className="signal-icon">⬛</div>
            <div className="signal-name">P&amp;F Structure</div>
            <div className="signal-desc">
              The foundation. Double/Triple Top breakouts, BRL pierce, Cup &amp;
              Handle — every pick starts here.
            </div>
          </div>
          <div className="signal-chip">
            <div className="signal-icon">📉</div>
            <div className="signal-name">RSI</div>
            <div className="signal-desc">
              Momentum indicator. Ideal entry zones and overbought exit signals
              both factored in.
            </div>
          </div>
          <div className="signal-chip">
            <div className="signal-icon">📈</div>
            <div className="signal-name">50 &amp; 200 DMA</div>
            <div className="signal-desc">
              Trend direction, slope, and rate of change. Both DMAs must support
              the bullish thesis.
            </div>
          </div>
          <div className="signal-chip">
            <div className="signal-icon">〰️</div>
            <div className="signal-name">BRL &amp; BSL</div>
            <div className="signal-desc">
              Bearish Resistance Lines and Bullish Support Lines — the structural
              spine of P&amp;F analysis.
            </div>
          </div>
          <div className="signal-chip">
            <div className="signal-icon">🎯</div>
            <div className="signal-name">Cup &amp; Handle</div>
            <div className="signal-desc">
              One of Karim&apos;s most powerful patterns. Three conviction tiers
              from developing to confirmed breakout.
            </div>
          </div>
          <div className="signal-chip">
            <div className="signal-icon">📊</div>
            <div className="signal-name">Bollinger Bands</div>
            <div className="signal-desc">
              Volatility compression identifies coiling stocks with stored energy
              ready to release.
            </div>
          </div>
          <div className="signal-chip">
            <div className="signal-icon">🔊</div>
            <div className="signal-name">Volume</div>
            <div className="signal-desc">
              Participation confirms conviction. Volume 2x+ average on a breakout
              is signal, not noise.
            </div>
          </div>
          <div className="signal-chip">
            <div className="signal-icon">✨</div>
            <div className="signal-name">Golden Cross</div>
            <div className="signal-desc">
              50 DMA crossing above 200 DMA — and the anticipation of it — is a
              powerful bullish catalyst.
            </div>
          </div>
          <div className="signal-chip">
            <div className="signal-icon">🌡️</div>
            <div className="signal-name">Market Sentiment</div>
            <div className="signal-desc">
              CNN Fear &amp; Greed Index, VIX, and SPY trend all factor into the
              market regime gate.
            </div>
          </div>
        </div>
        <p className="bio-p">
          All of these signals are factored into a sophisticated and proprietary
          scoring methodology encoded in <OE />.{" "}
          <strong>The methodology stays proprietary. You get the output.</strong>
        </p>
      </div>

      <div className="divider"></div>

      {/* OPTIONS2WEALTH */}
      <div className="bio-section full">
        <div className="section-label">
          ▸ Options2Wealth — Seeking Alpha, 2013
        </div>
        <h2 className="section-title">
          $10,000 to $1,074,475.
          <br />
          <em>In Exactly 6 Months.</em>
        </h2>

        <p className="bio-p">
          In January 2013, Karim launched a public trading experiment on Seeking
          Alpha — one of the world&apos;s most respected financial publishing
          platforms — called <strong>Options2Wealth</strong>. The rules were
          simple and unforgiving: every single trade idea had to be posted on the
          blog <em>before</em> execution. No exceptions. Every post was
          timestamped by Seeking Alpha&apos;s platform. There was no way to go back
          and claim a trade after the fact.
        </p>

        <div className="callout">
          <div className="callout-label">▸ The Rules of the Experiment</div>
          <p>
            <strong>
              1. Every trade idea posted publicly before execution.
            </strong>{" "}
            Timestamped by Seeking Alpha. Impossible to reverse-engineer or
            cherry-pick.{" "}
            <strong>
              2. Every chart, every analysis, every rationale — documented.
            </strong>{" "}
            Readers could see exactly why Karim expected a breakout before the
            stock moved.{" "}
            <strong>3. Six months. Starting capital: $10,000.</strong> No leverage
            exceptions, no hidden accounts, no post-hoc adjustments. The public
            record is the record.
          </p>
        </div>

        <p className="bio-p">
          The experiment used options on stocks that Karim&apos;s methodology
          identified as high-conviction breakout candidates. Each blog post
          included Point &amp; Figure charts, candlestick charts, and a detailed
          explanation of the setup — why the stock was coiling, what signals were
          converging, and what the expected move looked like.
        </p>

        {/* Sprint callout */}
        <div className="sprint-box">
          <div className="sprint-ticker">
            ▸ Sprint Corporation (S) · February 17, 2013 ·{" "}
            <span
              className="sa-link"
              onClick={() =>
                openPopup(
                  "https://seekingalpha.com/instablog/6566781-options2wealth/1561171-sprint-the-most-beautiful-cup-and-handle-pattern-ever"
                )
              }
            >
              View Original Post on Seeking Alpha ↗
            </span>
          </div>
          <h3 className="sprint-title">
            &quot;Sprint: The Most Beautiful Cup &amp; Handle
            <br />
            <em>Pattern Ever&quot;</em>
          </h3>
          <p className="sprint-body">
            On Sunday evening, February 17, 2013 — before markets opened Tuesday —
            Karim published one of the most memorable posts of the Options2Wealth
            experiment. He had been following Sprint since December 2012, when he
            first checked its Point &amp; Figure chart after reading a bullish
            analysis elsewhere. The P&amp;F pattern looked compelling. Then he
            pulled up its 3-year weekly candlestick chart.
            <br />
            <br />
            <strong>
              &quot;What I saw was a Cup and Handle pattern that was more perfectly
              formed than any I personally have ever seen in my 20 years of stock
              picking.&quot;
            </strong>
            <br />
            <br />
            Karim had already been building a position in Sprint May $6 calls for
            6+ weeks. On the night of February 17th, he announced publicly that he
            would substantially increase his position Tuesday morning — buying 337
            additional contracts to bring the Options2Wealth portfolio to 500
            contracts total. He also called the exact P&amp;F breakout level:{" "}
            <strong>
              &quot;When the stock price prints $6.50, it will be the break of a
              double top on Sprint&apos;s Point &amp; Figure chart.&quot;
            </strong>
            <br />
            <br />
            Sprint didn&apos;t move immediately. For weeks it tested Karim&apos;s
            patience, forming a sloping handle. He held. Then it broke out exactly
            as the chart predicted — confirming both the Cup &amp; Handle pattern
            and the P&amp;F double top breakout simultaneously. The trade made a
            significant contribution to pushing the Options2Wealth portfolio past
            $1,000,000.
          </p>
          <div className="sprint-result">
            <div className="sprint-arrow">↗</div>
            <div>
              <div className="sprint-outcome">
                P&amp;F Double Top + C&amp;H breakout confirmed.
              </div>
              <div className="sprint-outcome-sub">
                Called publicly Sunday Feb 17, 2013. Timestamped before execution.
                The chart was right.
              </div>
            </div>
          </div>
        </div>

        <p className="bio-p">
          But Sprint was just one of many. The Options2Wealth portfolio reached
          $1,074,475 from dozens of documented, timestamped, publicly-called
          trades across the 6-month experiment — not from a single lucky bet. The
          consistency of the methodology across multiple trades is what makes the
          record meaningful.
        </p>

        <p className="bio-p">
          <strong>One important detail:</strong> The 6-month timeframe was planned
          and committed to publicly on Day 1 — December 30th, 2012. It was not a
          sudden decision to close. By May 2013, the portfolio had already crossed
          $1,000,000 — one month early. Karim&apos;s wife and friends suggested
          closing then to lock in the impressive result. He turned them down and
          continued trading the same disciplined way, without shifting to a
          defensive posture. On June 28, 2013 — the last trading day of June,
          exactly as committed on Day 1 — he closed the experiment. Final value:{" "}
          <strong>$1,074,475.06.</strong>{" "}
          <span
            className="sa-link"
            style={{ fontSize: "11px" }}
            onClick={() =>
              openPopup(
                "https://seekingalpha.com/instablog/6566781-options2wealth/2034682-back-to-sun-diego"
              )
            }
          >
            View Final Tally Post &#8599;
          </span>
        </p>

        {/* CORROBORATION SECTION */}
        <div
          style={{
            background: "rgba(220,172,71,0.07)",
            borderLeft: "4px solid #C8921A",
            borderRadius: "0 10px 10px 0",
            padding: "28px 32px",
            margin: "36px 0",
            maxWidth: "820px",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#C8921A",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Independent Corroboration
          </div>
          <p className="bio-p" style={{ marginTop: 0 }}>
            What most people don&apos;t know is that while Options2Wealth was
            running publicly on Seeking Alpha, Karim was simultaneously managing a
            real client account at Charles Schwab — for a close friend who was
            going through serious financial hardship and needed real results, not a
            demonstration. That account started four weeks before O2W launched, was
            traded using the same methodology, and experienced a nearly identical
            parabolic ride over the same period.
          </p>
          <p className="bio-p">
            The client needed to be more conservative than O2W — he required
            liquidity to keep his business afloat, and at times withdrew
            significant sums for that purpose. Even so, the account grew from under{" "}
            <strong style={{ color: "#C8921A" }}>$15,000</strong> to over{" "}
            <strong style={{ color: "#C8921A" }}>$752,000</strong> in the same
            seven-month window — before withdrawals for business expenses.
          </p>
          <p className="bio-p">
            When O2W concluded and drew attention, a professional fact-checker and
            ghost writer flew in from Canada to verify the track record in person.
            He sat with Karim&apos;s client at a Starbucks for two hours. The
            client voluntarily brought his actual paper Charles Schwab statements
            to that meeting and walked him through everything Karim had accomplished
            — not just for the O2W blog, but for him personally, with real money, at
            a real regulated brokerage.
          </p>
          <p className="bio-p" style={{ marginBottom: 0 }}>
            The fact-checker came away a believer. At the time, Karim was
            simultaneously managing his own TD Ameritrade portfolio, his
            client&apos;s Schwab account, the Options2Wealth public blog, and his
            startup SafeList Ventures — all at the same time. The O2W demonstration
            portfolio tracked the same methodology on a standardized $10,000
            starting balance. The real-money results tell the same story.
          </p>
          <p
            className="bio-p"
            style={{
              marginBottom: 0,
              marginTop: "16px",
              fontSize: "13px",
              color: "#8A99AE",
              fontStyle: "italic",
            }}
          >
            Charles Schwab brokerage statements documenting this client account are
            available to verified institutional inquiries and members of the press
            upon request.
          </p>
        </div>

        <p className="bio-p">
          As the experiment progressed, followers began to understand the value of
          his transparency. Some started piggy-backing on the trades — buying the
          same options Karim was buying, after seeing his public analysis before
          execution. <strong>They too made significant returns.</strong> By the
          time Karim closed the experiment, readers were <em>beseeching</em> him not
          to stop.
        </p>

        <div className="bio-quote">
          <p>
            &quot;Every post I made on Options2Wealth included the P&amp;F chart,
            the candlestick chart, my complete analysis, and exactly why I expected
            a breakout — before I made a single trade. The timestamp is the proof.
            There is nothing to cherry-pick because everything was called in
            sequence, in public, in real time.&quot;
          </p>
          <cite>— Karim Pirani</cite>
        </div>

        <p
          className="bio-p"
          style={{ fontStyle: "italic", color: "#8899AA", fontSize: "13px" }}
        >
          All posts referenced on this page were copied directly from Seeking Alpha
          and reproduced here with their original publication dates. The posts
          remain accessible on Seeking Alpha for independent verification. A
          complete printed archive of every post is also privately maintained. The
          record stands.
        </p>
      </div>

      <div className="divider"></div>

      {/* SPWR BIG BET */}
      <div className="bio-section full">
        <div className="section-label">
          ▸ The SPWR Analysis — April 22, 2013 &nbsp;
          <span
            className="sa-link"
            style={{ fontSize: "10px" }}
            onClick={() =>
              openPopup(
                "https://seekingalpha.com/instablog/6566781-options2wealth/1779711-the-reasons-behind-my-big-bet-on-sunpower"
              )
            }
          >
            View Original Post ↗
          </span>
        </div>
        <h2 className="section-title">
          <OE />
          <br />
          <em>In Real Time. Before It Existed.</em>
        </h2>
        <p className="bio-p">
          On April 22nd, 2013 — three days before SunPower made its major breakout
          — Karim published a detailed pre-breakout analysis on Seeking Alpha. This
          post is perhaps the most complete demonstration of what would become{" "}
          <OE /> methodology in the entire archive. Every signal layer documented
          simultaneously, before the stock moved.
        </p>
        <div className="callout">
          <div className="callout-label">
            &#9656; The Pre-Breakout Signal Stack — SPWR · April 22, 2013
          </div>
          <p>
            <strong style={{ color: "var(--gold2)" }}>P&amp;F:</strong> Approaching
            BRL. Pierce target: <strong>$11.50</strong>. Double Top confirmation:{" "}
            <strong>$12.00</strong>. Price target:{" "}
            <strong>$23 within 2 months.</strong>
            <br />
            <br />
            <strong style={{ color: "var(--gold2)" }}>RSI:</strong> Below 50 — room
            to run. &nbsp;<strong style={{ color: "var(--gold2)" }}>MACD:</strong>{" "}
            Oversold. &nbsp;
            <strong style={{ color: "var(--gold2)" }}>Bollinger Bands:</strong>{" "}
            Converging for a pincer move.
            <br />
            <br />
            <strong style={{ color: "var(--gold2)" }}>Fundamentals:</strong> Japan
            solar forecast doubling to 6.1–9.4GW; Saudi Arabia $110B solar program
            imminent; SPWR analyst meeting in May.
            <br />
            <br />
            <em>
              Three days later, SPWR broke out exactly as described. Volume 2x
              normal. Stock up 10%+ in a single day. BRL pierce and Double Top
              breakout confirmed simultaneously.
            </em>
          </p>
        </div>
        <p className="bio-p">
          In Karim&apos;s own words after the breakout:{" "}
          <em>
            &quot;Those who don&apos;t believe in technical analysis and only
            subscribe to fundamental analysis could not have seen this move coming,
            because the company&apos;s fundamentals have yet to catch up with
            today&apos;s trend reversal signal. Only those who were paying close
            attention to SPWR stock&apos;s technical moves were able to take
            advantage of today&apos;s move, which was telegraphed to geeks like me
            way in advance.&quot;
          </em>
        </p>
        <p className="bio-p">
          That paragraph is the entire philosophy of <OE /> — written in 2013,
          before the product existed.
        </p>
      </div>

      <div className="divider"></div>

      {/* WHAT FOLLOWERS SAID */}
      <div className="bio-section full">
        <div className="section-label">&#9656; What Followers Said</div>
        <h2 className="section-title">
          Real People.
          <br />
          <em>Real Words. Real Returns.</em>
        </h2>
        <p className="bio-p" style={{ color: "#8899AA" }}>
          These are real comments from Options2Wealth followers on Seeking Alpha —
          timestamped, publicly posted, unedited. Karim never solicited a single
          testimonial. These came organically from people who followed a public
          blog and made their own investment decisions.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            margin: "28px 0",
          }}
        >
          {[
            {
              quote: (
                <>
                  &quot;I actually took my play money and followed just a few of
                  Karim&apos;s moves starting in February. It was a bumpy ride at
                  first... But as of 6/18,{" "}
                  <strong style={{ color: "#5dba7d", fontStyle: "normal" }}>
                    I am up 1900%.
                  </strong>{" "}
                  While it isn&apos;t 10,000%, I cannot complain now that my play
                  money is serious money!&quot;
                </>
              ),
              attr: "Play.Money · Seeking Alpha · June 19, 2013",
            },
            {
              quote: (
                <>
                  &quot;
                  <strong style={{ fontStyle: "normal", color: "var(--cream)" }}>
                    His results are putting Jim Cramer to shame!
                  </strong>{" "}
                  He&apos;ll be in a category of his own.{" "}
                  <strong style={{ fontStyle: "normal", color: "#5dba7d" }}>
                    I&apos;d gladly pay subscription fees for this type of advice.
                  </strong>
                  &quot;
                </>
              ),
              attr: "Invest2Win786 · Seeking Alpha · June 20, 2013",
            },
            {
              quote: (
                <>
                  &quot;I have just started options trading over the last few weeks
                  from following this blog. I started with about $7,000.{" "}
                  <strong style={{ fontStyle: "normal", color: "#5dba7d" }}>
                    I am up 89%.
                  </strong>
                  &quot;
                </>
              ),
              attr: "Solararon · Seeking Alpha · June 17, 2013",
            },
            {
              quote: (
                <>
                  &quot;I started only one month ago investing based upon the
                  knowledge I have gained from this blog and talking with Karim.{" "}
                  <strong style={{ fontStyle: "normal", color: "#5dba7d" }}>
                    In that one month my investment has grown more than 250%.
                  </strong>{" "}
                  Not bad for a start and for one month. I look forward to making
                  many more investments in the future.&quot;
                </>
              ),
              attr: "Dr. Wayne Label, Ph.D. · Seeking Alpha · June 6, 2013",
            },
            {
              quote: (
                <>
                  &quot;Thanks for sharing your fantastic options investment
                  adventure with all of us. I too made some money every so often
                  when I tried mirroring your moves. One skill that I need to work
                  on is{" "}
                  <strong style={{ fontStyle: "normal", color: "var(--cream)" }}>
                    &apos;patience&apos;
                  </strong>
                  . Had I been patient and not exited my positions every time the
                  stock had a volatile down day or two, I would be a lot richer.
                  But thanks to you, I hopefully will be able to stay the course
                  next time. Today I am{" "}
                  <strong style={{ fontStyle: "normal", color: "#5dba7d" }}>
                    &apos;richer&apos; from the experience
                  </strong>{" "}
                  I gained from your sharing. Thanks and God Bless You!&quot;
                </>
              ),
              attr: "goferit · Seeking Alpha · July 18, 2013",
            },
            {
              quote: (
                <>
                  &quot;The only reason/motivation could be:{" "}
                  <strong style={{ fontStyle: "normal", color: "#5dba7d" }}>
                    &apos;Show/help others how we can earn money in equity market
                    with good planning, research&apos;. You are doing it for us.
                    Respect.
                  </strong>{" "}
                  God bless you and your family sir.&quot;
                </>
              ),
              attr: "Karthik (11828801) · Seeking Alpha · June 15, 2013",
            },
            {
              quote: (
                <>
                  &quot;I remember offering him to manage funds for me for a 55% cut
                  of the profits, to which he politely declined and stated he&apos;d
                  rather teach me the &apos;HOW&apos; through his blog.{" "}
                  <strong style={{ fontStyle: "normal", color: "#5dba7d" }}>
                    My returns: GALE 825% · SUNE 413% · SPWR 374% · TSL 334% · SCTY
                    208%.
                  </strong>
                  &quot;
                </>
              ),
              attr: "Invest2Win786 · Seeking Alpha · February 9, 2014",
            },
            {
              quote: (
                <>
                  &quot;
                  <strong style={{ fontStyle: "normal", color: "var(--cream)" }}>
                    I invested 20k in SPWR and GALE and in 3 months I had 100K for a
                    total of 80k in profits.
                  </strong>{" "}
                  Without any doubt I decided to donate 20% of my profits to
                  DonorNation... As a doctor working for the last 7 years in an
                  institution dedicated only to cancer care you can only understand
                  never to take life for granted.&quot;
                </>
              ),
              attr: "gamena71 (Dr. Gabe) · Seeking Alpha · February 20, 2014",
            },
            {
              quote: (
                <>
                  &quot;I stumbled upon your blog about a week and a half ago — I
                  was Google fishing for 3 box reversals. Could not stop reading
                  your posts.{" "}
                  <strong style={{ fontStyle: "normal", color: "#5dba7d" }}>
                    You demolished any doubts of anyone that started reading your
                    blogs in the beginnings.
                  </strong>{" "}
                  My wife is Thai and we are building a house for her grandmother in
                  Thailand. If nothing else, you have opened my eyes to options and
                  I hope to use what you have taught me wisely to help other
                  people.&quot;
                </>
              ),
              attr:
                "volatilis (William Earl Buchanan) · Seeking Alpha · February 9, 2014",
            },
            {
              quote: (
                <>
                  &quot;Hello Karim,{" "}
                  <strong style={{ fontStyle: "normal", color: "var(--cream)" }}>
                    Miss reading your blogs.
                  </strong>{" "}
                  Would love for you to have another &apos;building a small
                  fortune&apos; experience and this time I would get in at ground
                  level.&quot;
                </>
              ),
              attr:
                "volatilis (William Earl Buchanan) · Seeking Alpha · April 29, 2018 — 5 years later, still asking for more",
            },
            {
              quote: <>&quot;Great call on Nasdaq!!&quot;</>,
              attr:
                "volatilis (William Earl Buchanan) · Seeking Alpha · April 23, 2015 — confirming the Nasdaq call",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.07)",
                borderRadius: "10px",
                padding: "22px 24px",
                borderLeft: "3px solid var(--gold2)",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--cream)",
                  lineHeight: 1.75,
                  marginBottom: "12px",
                  fontStyle: "italic",
                }}
              >
                {t.quote}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "10px",
                  color: "var(--gold)",
                  letterSpacing: "1px",
                }}
              >
                {t.attr}
              </div>
            </div>
          ))}
        </div>
        <p
          className="bio-p"
          style={{ fontStyle: "italic", color: "#445566", fontSize: "13px" }}
        >
          All comments above are publicly posted on Seeking Alpha with original
          timestamps. Unedited and unsolicited. These are real people who followed
          a public blog and made their own investment decisions.
        </p>
      </div>

      <div className="divider"></div>

      {/* THE GIVING CHAPTER */}
      <div className="bio-section full">
        <div className="section-label">&#9656; Beyond Trading — 2014</div>
        <h2 className="section-title">
          The Giver.
          <br />
          <em>Not Just The Trader.</em>
        </h2>
        <p className="bio-p">
          After the Options2Wealth experiment ended, followers were beseeching
          Karim to continue. Having managed money professionally and advised
          clients for fees, he had no interest in returning to that model. He
          preferred to teach the &quot;how&quot;.
        </p>
        <p className="bio-p">
          In January 2014, Karim recommended Adam Grant&apos;s book{" "}
          <em>Give and Take</em> to his followers. In February 2014, he announced a
          new direction: a private newsletter, invitation-only, completely free.
          The only ask: donate a percentage of trading profits to a charity of your
          choice through his DonorNation.org platform.
        </p>
        <div className="bio-quote">
          <p>
            &quot;The newsletter will only be available by invitation and only to
            those who are &apos;Givers.&apos; Instead of charging a fee, I only ask
            of those who receive my newsletter to donate, every quarter, a
            percentage of their adjusted profits to a non-profit of their choice
            through my DonorNation.org platform.&quot;
          </p>
          <cite>— Karim Pirani, February 8, 2014</cite>
        </div>
        <p className="bio-p">
          The response: 70 comments, followers from around the world pledging
          15%–30% of their profits to charity. A doctor whose foundation helped
          children with cancer. An engineer who taught kids. Someone who left his
          job and moved to Guatemala to do charity work. Someone building a house
          for his wife&apos;s grandmother in Thailand. All drawn together by a free
          trading blog that asked nothing in return.
        </p>
      </div>

      <div className="divider"></div>

      {/* PUBLIC MARKET CALLS */}
      <div className="bio-section full">
        <div className="section-label">&#9656; The Public Record</div>
        <h2 className="section-title">
          A Decade of
          <br />
          <em>Documented Market Calls</em>
        </h2>
        <p className="bio-p">
          The Options2Wealth experiment was not an isolated event. It was part of a
          consistent pattern of public, timestamped market calls spanning over a
          decade — each one documented before the move, each one verifiable.
        </p>

        <div
          style={{ display: "flex", flexDirection: "column", gap: 0, margin: "28px 0" }}
        >
          <div className="tl-item">
            <div>
              <div className="tl-dot hi">&#9733;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">June 6, 2010</div>
              <div className="tl-title">
                Dow Bottom Called at 9,931 &nbsp;
                <span
                  className="sa-link"
                  style={{ fontSize: "11px" }}
                  onClick={() =>
                    openPopup(
                      "https://seekingalpha.com/article/208657-fridays-controlled-descent-in-equities-a-perfect-storm-is-brewing"
                    )
                  }
                >
                  View Article &#8599;{" "}
                  <span style={{ fontSize: "9px", opacity: 0.65 }}>
                    (SA account may be required)
                  </span>
                </span>{" "}
                &nbsp;
                <span
                  className="sa-link"
                  style={{ fontSize: "11px" }}
                  onClick={() =>
                    openPopup("https://seekingalpha.com/user/665090")
                  }
                >
                  View Profile &#8599;
                </span>
              </div>
              <div className="tl-desc">
                With the Dow below 10,000 and a Seeking Alpha blogger predicting
                doom, Karim made his first public comment:{" "}
                <em>
                  &quot;This market is going up and the ride is going to be a
                  doozy.&quot;
                </em>{" "}
                He received 29 thumbs down. The Dow rose 20% in 6 months and
                another 40%+ over the next 3 years.
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot hi">&#9733;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">December 2012 – June 2013</div>
              <div className="tl-title">
                Options2Wealth — $10,000 → $1,074,475&nbsp;
                <span
                  className="sa-link"
                  style={{ fontSize: "11px" }}
                  onClick={() =>
                    openPopup(
                      "https://seekingalpha.com/instablog/6566781-options2wealth/2034682-back-to-sun-diego"
                    )
                  }
                >
                  View Final Tally Post &#8599;
                </span>
              </div>
              <div className="tl-desc">
                Six months. Every trade publicly documented before execution. Every
                post timestamped. Starting capital: $10,000. Final value:
                $1,074,475+. The record still exists on Seeking Alpha.
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot hi">&#9733;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">July 26, 2013</div>
              <div className="tl-title">
                Apple Bottom Called — BRL Pierce at $440 &nbsp;
                <span
                  className="sa-link"
                  style={{ fontSize: "11px" }}
                  onClick={() =>
                    openPopup(
                      "https://seekingalpha.com/instablog/6566781-options2wealth/2068932-the-impending-move-in-apple"
                    )
                  }
                >
                  View Post ↗
                </span>
              </div>
              <div className="tl-desc">
                Called Apple&apos;s bottom publicly when the stock was at $440,
                flagging a BRL pierce on the P&amp;F chart. Predicted a $260+ move
                toward the prior high. Apple subsequently made a massive multi-year
                bull run. Karim also called the Golden Cross imminent within 12–15
                trading sessions — confirmed within the predicted window.
                <br />
                <span
                  style={{
                    fontSize: "10px",
                    color: "#8A99AE",
                    fontStyle: "italic",
                  }}
                >
                  * All prices reflect pre-split figures. Apple executed a 7-for-1
                  split (June 2014) and a 4-for-1 split (August 2020).
                  Split-adjusted: $440 entry ≈ $15.71 · $700+ target ≈ $25.00.
                </span>
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot hi">&#9733;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">May 26, 2014</div>
              <div className="tl-title">
                Nasdaq Correction Called Over at 4,185 &nbsp;
                <span
                  className="sa-link"
                  style={{ fontSize: "11px" }}
                  onClick={() =>
                    openPopup(
                      "https://seekingalpha.com/instablog/6566781-options2wealth/2943063-the-nasdaq-correction-is-over-imho"
                    )
                  }
                >
                  View Post ↗
                </span>
              </div>
              <div className="tl-desc">
                Called the end of the Nasdaq correction publicly — using fear as a
                contrarian indicator, with David Tepper&apos;s nervousness as the
                signal. Predicted new near-term highs within 2–4 weeks and eventual
                all-time highs above 5,132. David Tepper turned bullish 10 days
                later. The Nasdaq hit new all-time highs in 2015.
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot hi">&#9733;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">March 30, 2015</div>
              <div className="tl-title">
                Nasdaq Triple Top Breakout Called at 5,050 &nbsp;
                <span
                  className="sa-link"
                  style={{ fontSize: "11px" }}
                  onClick={() =>
                    openPopup(
                      "https://seekingalpha.com/instablog/6566781-options2wealth/3440791-the-nasdaq-is-on-the-launchpad"
                    )
                  }
                >
                  View Post ↗
                </span>
              </div>
              <div className="tl-desc">
                Called the Nasdaq Triple Top breakout when the index printed 5,050
                on its P&amp;F chart — predicting the first new all-time high above
                5,132 since the dot-com bubble in March 2000. Predicted it within 30
                days. The Nasdaq broke through to new all-time highs shortly after.
                Follower William Earl Buchanan confirmed:{" "}
                <em>&quot;Great call on Nasdaq!!&quot;</em>
              </div>
            </div>
          </div>
        </div>
        <p className="bio-p">
          The thread running through every call: charts first, fear as a contrarian
          indicator, patience to wait for the setup, and the conviction to go
          public before the move.
        </p>
      </div>

      <div className="divider"></div>

      {/* FROM O2W TO OPUSENGINE */}
      <div className="bio-section full">
        <div className="section-label">
          &#9656; From Options2Wealth to <OE />
        </div>
        <h2 className="section-title">
          Systematizing
          <br />
          <em>25+ Years of P&amp;F Instinct</em>
        </h2>
        <p className="bio-p">
          The Options2Wealth experiment proved something Karim had always believed:
          that a disciplined, repeatable methodology applied consistently across
          multiple setups — documented transparently — could generate extraordinary
          returns. The question was how to systematize that methodology so it could
          scan thousands of stocks simultaneously, not just the handful a human
          analyst could monitor at once.
        </p>
        <p className="bio-p">
          <OE /> is the answer to that question. It encodes 25+ years of P&amp;F
          pattern recognition, signal layering, and conviction scoring into an automated
          screening engine that scans the Russell 3000 and S&amp;P 500 —
          approximately 3,000 stocks — and surfaces only the setups that meet
          Karim&apos;s very high conviction standard.
        </p>
        <p className="bio-p">
          The same discipline that governed Options2Wealth governs <OE /> today:{" "}
          <strong>if the conviction isn&apos;t there, the signal isn&apos;t issued.</strong>{" "}
          <OE /> doesn&apos;t manufacture picks to fill a quota. It finds them when
          the market presents them — and stays silent when it doesn&apos;t.
        </p>
        <div className="callout">
          <div className="callout-label">&#9656; The Connection</div>
          <p>
            The Cup &amp; Handle pattern that Karim identified on Sprint in 2013 —{" "}
            <em>&quot;the most beautiful Cup &amp; Handle chart I have ever seen&quot;</em>{" "}
            — is built into <OE /> as one of the highest-conviction signals in the
            entire library.{" "}
            <strong>
              When <OE /> identifies a Cup &amp; Handle today, it is drawing on the
              same 25+ years of P&amp;F pattern recognition that called Sprint before it
              broke out.
            </strong>
          </p>
        </div>
      </div>

      <div className="divider"></div>

      {/* TIMELINE */}
      <div className="bio-section full">
        <div className="section-label">&#9656; The Journey</div>
        <h2 className="section-title">
          25+ Years.
          <br />
          <em>One Methodology.</em>
        </h2>
        <div className="timeline">
          <div className="tl-item">
            <div>
              <div className="tl-dot hi">&#9733;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">November 14, 1999 — 12:50 AM</div>
              <div className="tl-title">
                Echelon Corporation (ELON) — Public Bull Call at $8.50 &nbsp;
                <span
                  className="sa-link"
                  style={{ fontSize: "11px" }}
                  onClick={() =>
                    openPopup(
                      "https://www.siliconinvestor.com/readmsg.aspx?msgid=11920168",
                      "SIPopup"
                    )
                  }
                >
                  View Original SI Post &#8599;
                </span>
              </div>
              <div className="tl-desc">
                Posted publicly on Silicon Investor (username: <strong>contax</strong>
                ) at 12:50 AM, Karim laid out a detailed bull thesis on Echelon
                Corporation — a post-PC networking company — while the stock was
                trading around $8.50. The thesis was built on the board of
                directors: Arthur Rock (co-founder of Intel, lead Intel director
                since its founding) and A.C. Markkula (Apple&apos;s original seed
                investor) both sat on Echelon&apos;s board. Four members responded
                within hours. The post was re-shared virally on Yahoo Finance&apos;s
                Echelon board as &quot;Karim Pirani Part 1,&quot; &quot;Part 2,&quot;
                and so on. By March 2000, ELON had risen to approximately $115 — a
                move of more than 1,250%. The original post remains live on Silicon
                Investor today at msgid 11920168.
              </div>
              {/* ELON 1999 Chart — shared snippet */}
              <div className="elon-chart-wrap">
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: "#C8921A",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    marginBottom: "4px",
                  }}
                >
                  Echelon Corporation — ELON · Nov 1999 – Mar 2000
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#8A99AE",
                    marginBottom: "16px",
                  }}
                >
                  Weekly closing price (approximate) · Nasdaq
                </div>
                <div
                  style={{ position: "relative", width: "100%", height: "300px" }}
                >
                  <canvas
                    id="elonChartEMBED"
                    role="img"
                    aria-label="ELON weekly price chart Nov 1999 to Mar 2000, rising from $8.50 at Karim Pirani's public call to $115 peak in March 2000"
                  >
                    ELON: ~$8.50 at Nov 14 1999 public call; peak ~$115 Mar 2000.
                  </canvas>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginTop: "14px",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(200,146,26,.12)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "2px",
                        background: "#dcac47",
                        borderRadius: "2px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#dcac47",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px", color: "#8A99AE" }}>
                      ELON weekly close
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <div
                      style={{
                        width: "11px",
                        height: "11px",
                        borderRadius: "50%",
                        background: "#ef4444",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px", color: "#8A99AE" }}>
                      Public call — Nov 14, 1999 (~$8.50) ·{" "}
                      <a
                        href="https://www.siliconinvestor.com/readmsg.aspx?msgid=11920168"
                        target="_blank"
                        rel="noopener"
                        style={{ color: "#dcac47" }}
                      >
                        SI msgid 11920168
                      </a>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <div
                      style={{
                        width: "11px",
                        height: "11px",
                        borderRadius: "50%",
                        background: "#22c55e",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px", color: "#8A99AE" }}>
                      Peak — Mar 2000 (~$115) · +1,253%
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "10px",
                    color: "#6B7A8D",
                    fontStyle: "italic",
                  }}
                >
                  Note: Pre-2000 OHLC data is not publicly archived. Curve
                  reconstructed from verified anchor points: ~$8.50 entry (Nov 14,
                  1999) and ~$115 peak (Mar 2000). Shape reflects documented
                  milestones, not tick-level data.
                </div>
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot">&#128202;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">Late 1980s — Early Career</div>
              <div className="tl-title">Discovering Point &amp; Figure</div>
              <div className="tl-desc">
                Karim begins his journey into technical analysis, discovering
                P&amp;F charting as the foundation of his stock reading
                methodology. Develops early expertise on Silicon Investor and
                Investor Village — two of the earliest online stock discussion
                communities.
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot">&#127760;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">1990s — 2000s</div>
              <div className="tl-title">Building the Signal Stack</div>
              <div className="tl-desc">
                25+ years of layering RSI, DMA, volume analysis, Bollinger Bands,
                Cup &amp; Handle patterns, and market sentiment on top of P&amp;F
                structure. The methodology that powers <OE /> today was built and
                refined over this period through thousands of real trades.
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot">&#127774;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">June 6, 2010</div>
              <div className="tl-title">
                First Public Market Call — Dow Bottom at 9,931 &nbsp;
                <span
                  className="sa-link"
                  style={{ fontSize: "11px" }}
                  onClick={() =>
                    openPopup(
                      "https://seekingalpha.com/article/208657-fridays-controlled-descent-in-equities-a-perfect-storm-is-brewing"
                    )
                  }
                >
                  View Article &#8599;{" "}
                  <span style={{ fontSize: "9px", opacity: 0.65 }}>
                    (SA account may be required)
                  </span>
                </span>{" "}
                &nbsp;
                <span
                  className="sa-link"
                  style={{ fontSize: "11px" }}
                  onClick={() =>
                    openPopup("https://seekingalpha.com/user/665090")
                  }
                >
                  View Profile &#8599;
                </span>
              </div>
              <div className="tl-desc">
                Posted under his then-company SafeList.com — long before
                Options2Wealth existed — Karim called the Dow bottom publicly
                against a tide of bearish sentiment. 29 thumbs down. The Dow
                proceeded to rise 20% in 6 months.
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot hi">&#11088;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">January – June 2013</div>
              <div className="tl-title">
                Options2Wealth — $10,000 → $1,074,475&nbsp;
                <span
                  className="sa-link"
                  style={{ fontSize: "11px" }}
                  onClick={() =>
                    openPopup(
                      "https://seekingalpha.com/instablog/6566781-options2wealth/2034682-back-to-sun-diego"
                    )
                  }
                >
                  View Final Tally Post &#8599;
                </span>
              </div>
              <div className="tl-desc">
                <strong>The defining public proof.</strong> 6 months on Seeking
                Alpha. Every trade called before execution. Every post timestamped.
                $10,000 turned into $1,074,475 in exactly 6 months — as planned from
                Day 1. 848 followers. Followers who piggy-backed made significant
                returns of their own.
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot">&#127381;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">July 2013 – March 2015</div>
              <div className="tl-title">Apple Bottom · Nasdaq Calls</div>
              <div className="tl-desc">
                Called Apple&apos;s bottom publicly at $440.* Called the Nasdaq
                correction over at 4,185 in May 2014. Called the Nasdaq Triple Top
                breakout at 5,050 in March 2015 — predicting the first all-time high
                above 5,132 since the year 2000. All confirmed.
                <br />
                <span
                  style={{
                    fontSize: "10px",
                    color: "#8A99AE",
                    fontStyle: "italic",
                  }}
                >
                  * Pre-split price. Apple executed a 7-for-1 split (June 2014) and
                  a 4-for-1 split (August 2020). Split-adjusted entry ≈ $15.71.
                </span>
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot">&#9881;&#65039;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">2013 — 2025</div>
              <div className="tl-title">
                Why 13 Years? Building <OE />
              </div>
              <div className="tl-desc">
                &quot;I never stopped trading. For over a decade, I kept fielding
                friends&apos; questions about the technicals on stocks they were
                watching &mdash; and in the back of my mind, I always wanted to
                build a system that could sift through the entire Russell 3000 and
                surface stocks that passed my stringent and elaborate methodology.
                So I built one &mdash; for myself. But once I saw what this engine
                is able to do, I decided to share it. That&apos;s OpusSignals.&quot;
              </div>
            </div>
          </div>
          <div className="tl-item">
            <div>
              <div className="tl-dot hi">&#128640;</div>
            </div>
            <div className="tl-content">
              <div className="tl-date">July 2026</div>
              <div className="tl-title">OpusSignals.com — Live</div>
              <div className="tl-desc">
                <strong>
                  <OE /> goes public.
                </strong>{" "}
                The methodology that turned $10,000 into $1,074,475 — now
                systematized, automated, and available to subscribers.
                High-conviction picks. Minimum one per rolling 5-session window.
                Performance-tracked. Transparent.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEDIA KIT */}
      <section className="about-sec" id="media-kit">
        <div className="section-label">&#9656; For Press &amp; Media</div>
        <h2
          style={{
            fontFamily: "'Cabinet Grotesk',sans-serif",
            fontSize: "clamp(24px,3.5vw,36px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-1px",
            marginBottom: "14px",
          }}
        >
          Media Kit
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#8899AA",
            maxWidth: "640px",
            marginBottom: "32px",
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          Everything a journalist or editor needs to verify the story and write
          about OpusSignals &mdash; in one place.
        </p>

        <div className="callout" style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "10px",
              fontWeight: 500,
            }}
          >
            Quick Facts
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "18px",
              fontSize: "14px",
              color: "var(--cream)",
              lineHeight: 1.7,
            }}
          >
            <div>
              <strong style={{ color: "#fff" }}>Founder:</strong> Karim Pirani
            </div>
            <div>
              <strong style={{ color: "#fff" }}>Company:</strong> PnFChart.com, Inc.
            </div>
            <div>
              <strong style={{ color: "#fff" }}>Product:</strong> OpusSignals.com
            </div>
            <div>
              <strong style={{ color: "#fff" }}>Engine:</strong> OpusEngine&trade;
            </div>
            <div>
              <strong style={{ color: "#fff" }}>Methodology:</strong> Point &amp;
              Figure, 25+ years
            </div>
            <div>
              <strong style={{ color: "#fff" }}>Launch Date:</strong> Launched July 2026
            </div>
            <div>
              <strong style={{ color: "#fff" }}>Track Record:</strong> $10,000
              &rarr; $1,074,475.06 in 6 months
            </div>
            <div>
              <strong style={{ color: "#fff" }}>Verification:</strong> Public,
              time-stamped, Seeking Alpha
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div className="signal-chip" style={{ padding: "20px" }}>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "10px",
              }}
            >
              One-Line Summary
            </div>
            <p
              style={{
                fontSize: "13.5px",
                color: "var(--cream)",
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              In 2013, Karim Pirani publicly documented every trade before
              execution on Seeking Alpha, turning $10,000 into over $1 million in
              six months. OpusSignals.com codifies that same methodology into an
              automated signal service.
            </p>
          </div>

          <div className="signal-chip" style={{ padding: "20px" }}>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "10px",
              }}
            >
              Verification Links
            </div>
            <p
              style={{
                fontSize: "13.5px",
                color: "var(--cream)",
                lineHeight: 1.9,
                fontWeight: 300,
              }}
            >
              <a
                href="https://seekingalpha.com/instablog/6566781-options2wealth/2034682-back-to-sun-diego"
                target="_blank"
                rel="noopener"
                style={{
                  color: "var(--gold2)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(200,146,26,.3)",
                }}
              >
                Options2Wealth Final Tally &#8599;
              </a>
              <br />
              <a
                href="https://seekingalpha.com/article/208657-fridays-controlled-descent-in-equities-a-perfect-storm-is-brewing"
                target="_blank"
                rel="noopener"
                style={{
                  color: "var(--gold2)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(200,146,26,.3)",
                }}
              >
                2010 Dow Bottom Call &#8599;
              </a>
              <br />
              <a
                href="https://app.opussignals.com"
                target="_blank"
                rel="noopener"
                style={{
                  color: "var(--gold2)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(200,146,26,.3)",
                }}
              >
                OpusSignals.com (Live Beta) &#8599;
              </a>
            </p>
          </div>

          <div className="signal-chip" style={{ padding: "20px" }}>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "10px",
              }}
            >
              Brand Assets
            </div>
            <p
              style={{
                fontSize: "13.5px",
                color: "var(--cream)",
                lineHeight: 1.9,
                fontWeight: 300,
              }}
            >
              <a
                href="/OpusSignalLogo.png"
                target="_blank"
                rel="noopener"
                style={{
                  color: "var(--gold2)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(200,146,26,.3)",
                }}
              >
                Download Logo (PNG) &#8599;
              </a>
              <br />
              <span style={{ color: "#8899AA" }}>
                High-resolution headshot available on request
              </span>
            </p>
          </div>

          <div className="signal-chip" style={{ padding: "20px" }}>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "10px",
              }}
            >
              Press Contact
            </div>
            <p
              style={{
                fontSize: "13.5px",
                color: "var(--cream)",
                lineHeight: 1.9,
                fontWeight: 300,
              }}
            >
              Karim Pirani
              <br />
              Founder &amp; Architect, OpusEngine&trade;
              <br />
              <a
                href="mailto:karim.pirani@opussignals.com"
                style={{
                  color: "var(--gold2)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(200,146,26,.3)",
                }}
              >
                karim.pirani@opussignals.com
              </a>
              <br />
              1.858.361.8861
            </p>
          </div>
        </div>

        <div className="bio-quote">
          <p
            style={{
              fontSize: "14px",
              color: "var(--cream)",
              lineHeight: 1.8,
              fontStyle: "italic",
              margin: 0,
            }}
          >
            &ldquo;Thirteen years ago I ran a public trading experiment where every
            trade was published before execution. Today I&apos;m using that same
            methodology as the foundation for a platform built on the idea that
            trust should be earned &mdash; not demanded.&rdquo;
          </p>
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "11px",
              color: "var(--gold)",
              letterSpacing: "1px",
              marginTop: "10px",
            }}
          >
            &mdash; Karim Pirani
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bio-cta">
        <h2>
          Ready to See What
          <br />
          <em>
            OpusEngine
            <sup style={{ fontSize: "10px", fontWeight: 100 }}>TM</sup> Finds?
          </em>
        </h2>
        <p>
          3 high-conviction picks, completely free — no email, no credit card.
          Watch them over 10 full trading sessions. Then decide.
        </p>
        <Link href="/#free-picks" className="cta-btn">
          Get My 3 Free Picks →
        </Link>
      </div>

      <Footer />

      {/* SA POST MODALS (dormant — reproduced from source for fidelity) */}
      <div className="sa-modal-overlay" id="saOverlay" onClick={closeSaModal}>
        <div className="sa-modal" id="saModal">
          <div className="sa-modal-header">
            <div>
              <div className="sa-modal-title" id="saModalTitle"></div>
              <div className="sa-modal-date" id="saModalDate"></div>
            </div>
            <div className="sa-modal-close" onClick={closeSaModalBtn}>
              ✕
            </div>
          </div>
          <div className="sa-modal-body" id="saModalBody"></div>
          <div className="sa-modal-footer">
            <div className="sa-modal-disclaimer">
              Originally published on Seeking Alpha. Timestamped before execution.
            </div>
            <a
              className="sa-modal-sa-link"
              id="saModalLink"
              href="#"
              target="_blank"
              rel="noopener"
            >
              View on Seeking Alpha ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
