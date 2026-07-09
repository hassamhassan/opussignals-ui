import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./learn.css";

export const metadata: Metadata = {
  title:
    "What Is Point & Figure Charting — And Why Most Traders Have Never Heard of It | OpusSignals",
  description:
    "Former fund manager. 25-year P&F specialist. Authenticated Seeking Alpha calls predicted AAPL's bull run and a $10K→$1M options trade — before they happened.",
};

export default function LearnPage() {
  return (
    <div className="learn-page">
      <Nav />

      <main className="blog-wrap">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>&rsaquo;</span>
          <Link href="/blog">Blog</Link>
          <span>&rsaquo;</span>
          What Is Point &amp; Figure Charting
        </div>

        <div className="article-eyebrow">Education &middot; Methodology</div>

        <h1 className="article-title">
          What Is Point &amp; Figure Charting &mdash; And Why Most Traders Have
          Never Heard of It
        </h1>

        <div className="article-meta">
          <span>
            By <span className="author">Karim Pirani</span>
          </span>
          <span>June 27, 2026</span>
          <span>8 min read</span>
        </div>

        {/* GLANCE BOX */}
        <div className="glance-box">
          <div className="label">Point &amp; Figure Charting at a Glance</div>
          <p>
            Point &amp; Figure (P&amp;F) charting is a price-only technical
            analysis method that filters out time and noise, recording only
            meaningful shifts in supply and demand. Unlike candlestick charts,
            which plot one bar per time period regardless of price activity, a
            P&amp;F chart only updates when price moves by a defined amount &mdash;
            making trends, breakout patterns, and key resistance levels easier to
            identify with precision. Developed in the late 1800s and refined over
            more than a century, P&amp;F remains one of the most powerful &mdash;
            and least understood &mdash; methodologies available to stock and
            options traders.
          </p>
        </div>

        <div className="article-body">
          <p>
            If you showed a Point &amp; Figure chart to the average trader today,
            they would probably think it was broken. No time axis. No
            candlesticks. No volume bars creeping up from the bottom. Just a grid
            of X&rsquo;s and O&rsquo;s, stacked in alternating columns, looking
            nothing like anything they&rsquo;ve been taught to read.
          </p>

          <p>
            That reaction tells you everything about why Point &amp; Figure
            charting remains one of the most underused &mdash; and most powerful
            &mdash; methodologies available to stock and options traders. In a
            world where financial media refreshes every 15 seconds and traders
            stare at one-minute candlestick charts until their eyes blur, P&amp;F
            does something almost radical: it removes time entirely, and with it,
            the noise that causes most traders to make bad decisions.
          </p>

          <p>
            I have been trading primarily with Point &amp; Figure charts for over
            25 years. In 2013, my{" "}
            <a
              href="https://seekingalpha.com/instablog/6566781-options2wealth/1409851-an-intro-to-my-blog"
              target="_blank"
              rel="noopener"
            >
              Options2Wealth Seeking Alpha experiment
            </a>{" "}
            documented every trade before execution &mdash; every entry supported
            by P&amp;F analysis &mdash; and turned $10,000 into $1,074,475 in six
            months. The methodology wasn&rsquo;t a secret. It was right there in
            every post, explained in plain terms, timestamped before I placed a
            single order. Followers who wanted to learn how to read Point and
            Figure charts for themselves had a live classroom every time I posted.
          </p>

          <p>
            This is the methodology that OpusEngine&trade; &mdash; the proprietary
            scanning engine behind OpusSignals.com &mdash; is built on. The same
            25-year P&amp;F framework that produced that documented track record
            now powers every signal the engine generates. And this article is my
            attempt to explain what it is, why it works, and why the vast majority
            of traders have never seriously considered it.
          </p>

          <h2>The Basics: What Point &amp; Figure Charting Actually Is</h2>

          <p>
            Point &amp; Figure charting was developed in the late 1800s &mdash;
            making it one of the oldest surviving technical analysis methodologies
            in existence. Early Wall Street traders called it the &ldquo;book
            method&rdquo; or the &ldquo;figure chart,&rdquo; and they used it to
            filter the constant stream of price data coming off the ticker tape
            into something actionable and readable.
          </p>

          <p>
            The core concept is simple: a P&amp;F chart only records{" "}
            <strong>meaningful price movement</strong>. You set a &ldquo;box
            size&rdquo; &mdash; say, $1 per box &mdash; and a &ldquo;reversal
            amount&rdquo; &mdash; typically three boxes, meaning $3. The chart only
            changes when price moves by at least that reversal amount in the
            opposite direction. Everything else &mdash; every tick, every intraday
            wobble, every hour of sideways chop &mdash; is invisible. It never
            makes it onto the chart.
          </p>

          <div className="concept-box">
            <div className="label">Key Concept</div>
            <p>
              A P&amp;F chart plots X&rsquo;s when price rises by the box size, and
              O&rsquo;s when it falls. A new column only begins when price reverses
              by the reversal amount. Time is irrelevant &mdash; a column might
              represent one day of trading or three months. Only price movement
              matters.
            </p>
          </div>

          <p>
            The result is a chart that looks fundamentally different from anything
            taught in a standard technical analysis course &mdash; and that reads
            fundamentally differently too. Where a candlestick chart shows you
            everything that happened, a P&amp;F chart shows you only what mattered.
          </p>

          <h2>Why Removing Time Changes Everything</h2>

          <p>
            Most charting methodologies are built around time. A daily candlestick
            chart gives you one candle per day, whether that day had dramatic price
            movement or barely moved at all. A weekly chart gives you one bar per
            week. The time axis creates an artificial sense of equivalence &mdash;
            every period looks the same width regardless of how significant it
            actually was.
          </p>

          <p>
            This is a problem. Markets don&rsquo;t move on a schedule. Significant
            moves happen when they happen, and the periods between them are largely
            irrelevant from a trading perspective. Feeding traders a constant
            stream of equivalent-looking time periods trains them to see patterns
            that aren&rsquo;t there and to react to noise they should be ignoring.
          </p>

          <div className="pull-quote">
            <p>
              &ldquo;The goal is not to be right every day. The goal is to be right
              when it matters &mdash; when the stock is actually ready to move.
              Point &amp; Figure tells you when that is. Everything else is just
              waiting.&rdquo;
            </p>
            <cite>&mdash; Karim Pirani, Founder &amp; Architect, OpusEngine&trade;</cite>
          </div>

          <p>
            Point &amp; Figure charting sidesteps this entirely. Because the chart
            only records significant price movement, periods of consolidation and
            sideways chop simply don&rsquo;t appear. The chart compresses them.
            What you&rsquo;re left with is a clear visual record of where the real
            supply and demand battles happened &mdash; and where they were
            resolved.
          </p>

          <p>
            For anyone practicing Point and Figure options trading, this clarity is
            particularly valuable. Options have time decay working against you from
            the moment you buy them. Every day you hold an options position costs
            you theta. A methodology that helps you identify high-conviction
            entries &mdash; moments when a stock is genuinely ready to move, not
            just fluctuating &mdash; directly addresses the biggest structural
            challenge in options trading.
          </p>

          <h2>The Patterns That Matter</h2>

          <p>
            Like any charting methodology, Point &amp; Figure has a set of patterns
            that carry predictive weight. Unlike candlestick chart patterns, which
            are often criticized for being subjective and inconsistent, P&amp;F
            patterns have well-defined, objective criteria. Either the price action
            meets the definition of the pattern or it doesn&rsquo;t.
          </p>

          <h3>The Double Top Breakout</h3>
          <p>
            One of the most basic P&amp;F buy signals. When a column of X&rsquo;s
            exceeds the top of the previous column of X&rsquo;s, demand has
            overcome the prior resistance level. This is a straightforward signal
            that the bulls have taken control at a level where sellers previously
            dominated.
          </p>

          <div className="chart-block">
            <div className="chart-label">Pattern: Double Top Breakout</div>
            <svg
              width="100%"
              viewBox="0 0 380 200"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Double Top Breakout P&amp;F pattern</title>
              <desc>
                A Point and Figure chart showing two X columns reaching the same
                resistance level, then a third column breaking above it — the
                Double Top Breakout buy signal
              </desc>
              <defs>
                <marker
                  id="arr1"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path
                    d="M2 1L8 5L2 9"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
              </defs>
              <g stroke="rgba(200,146,26,0.12)" strokeWidth="0.5">
                <line x1="40" y1="20" x2="40" y2="185" />
                <line x1="72" y1="20" x2="72" y2="185" />
                <line x1="104" y1="20" x2="104" y2="185" />
                <line x1="136" y1="20" x2="136" y2="185" />
                <line x1="168" y1="20" x2="168" y2="185" />
                <line x1="200" y1="20" x2="200" y2="185" />
                <line x1="40" y1="20" x2="200" y2="20" />
                <line x1="40" y1="55" x2="200" y2="55" />
                <line x1="40" y1="90" x2="200" y2="90" />
                <line x1="40" y1="125" x2="200" y2="125" />
                <line x1="40" y1="160" x2="200" y2="160" />
              </g>
              <text x="32" y="59" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$55</text>
              <text x="32" y="94" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$52</text>
              <text x="32" y="129" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$49</text>
              <text x="32" y="164" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$46</text>
              {/* Col 1: X x3 */}
              <text x="56" y="90" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="56" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="56" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 2: O x3 */}
              <text x="88" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="88" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="88" y="185" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              {/* Col 3: X x3 same top */}
              <text x="120" y="90" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="120" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="120" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 4: O x3 */}
              <text x="152" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="152" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="152" y="185" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              {/* Col 5: X breakout */}
              <rect x="168" y="22" width="32" height="32" rx="4" fill="rgba(200,146,26,0.15)" stroke="var(--gold)" strokeWidth="1" />
              <text x="184" y="43" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="78" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="113" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="148" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Resistance line */}
              <line x1="40" y1="90" x2="200" y2="90" stroke="var(--gold)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
              <text x="92" y="84" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gold)" opacity="0.8">resistance</text>
              {/* BUY */}
              <line x1="184" y1="16" x2="184" y2="8" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arr1)" />
              <text x="160" y="8" fontFamily="Inter,sans-serif" fontSize="11" fill="#22c55e" fontWeight="600">BUY</text>
              {/* Legend */}
              <text x="216" y="50" fontFamily="Inter,sans-serif" fontSize="11" fill="#F8F3E8">X = rising price</text>
              <text x="216" y="68" fontFamily="Inter,sans-serif" fontSize="11" fill="var(--gray2)">O = falling price</text>
              <text x="216" y="100" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">Each box = $3</text>
              <text x="216" y="116" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">Reversal = 3 boxes</text>
              <text x="216" y="140" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)" fontStyle="italic">Time is not shown —</text>
              <text x="216" y="156" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)" fontStyle="italic">only price movement</text>
            </svg>
            <p>
              Price breaks above the prior X column high &mdash; demand has
              overcome resistance
            </p>
          </div>

          <h3>The Triple Top Breakout</h3>
          <p>
            A stronger version of the Double Top. When price breaks out above not
            one but two prior resistance levels, the signal carries significantly
            more weight. Triple Top Breakouts on P&amp;F charts have historically
            been among the most reliable buy signals in technical analysis &mdash;
            they represent price overcoming sustained, repeated resistance.
          </p>

          <div className="chart-block">
            <div className="chart-label">Pattern: Triple Top Breakout</div>
            <svg
              width="100%"
              viewBox="0 0 380 200"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Triple Top Breakout P&amp;F pattern</title>
              <desc>
                A Point and Figure chart showing three X columns reaching the same
                resistance level before a breakout above all three — the Triple
                Top Breakout buy signal
              </desc>
              <defs>
                <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>
              <g stroke="rgba(200,146,26,0.12)" strokeWidth="0.5">
                <line x1="40" y1="20" x2="40" y2="185" />
                <line x1="72" y1="20" x2="72" y2="185" />
                <line x1="104" y1="20" x2="104" y2="185" />
                <line x1="136" y1="20" x2="136" y2="185" />
                <line x1="168" y1="20" x2="168" y2="185" />
                <line x1="200" y1="20" x2="200" y2="185" />
                <line x1="232" y1="20" x2="232" y2="185" />
                <line x1="40" y1="20" x2="232" y2="20" />
                <line x1="40" y1="55" x2="232" y2="55" />
                <line x1="40" y1="90" x2="232" y2="90" />
                <line x1="40" y1="125" x2="232" y2="125" />
                <line x1="40" y1="160" x2="232" y2="160" />
              </g>
              <text x="32" y="59" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$55</text>
              <text x="32" y="94" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$52</text>
              <text x="32" y="129" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$49</text>
              <text x="32" y="164" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$46</text>
              {/* Col 1 */}
              <text x="56" y="90" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="56" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="56" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 2 */}
              <text x="88" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="88" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="88" y="185" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              {/* Col 3 */}
              <text x="120" y="90" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="120" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="120" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 4 */}
              <text x="152" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="152" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="152" y="185" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              {/* Col 5 */}
              <text x="184" y="90" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 6 */}
              <text x="216" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="216" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="216" y="185" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              {/* Col 7: breakout */}
              <rect x="232" y="22" width="32" height="32" rx="4" fill="rgba(200,146,26,0.15)" stroke="var(--gold)" strokeWidth="1" />
              <text x="248" y="43" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="248" y="78" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="248" y="113" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="248" y="148" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Resistance */}
              <line x1="40" y1="90" x2="264" y2="90" stroke="var(--gold)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
              <text x="100" y="84" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gold)" opacity="0.8">tested 3&times;</text>
              {/* BUY */}
              <line x1="248" y1="16" x2="248" y2="8" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arr2)" />
              <text x="224" y="8" fontFamily="Inter,sans-serif" fontSize="11" fill="#22c55e" fontWeight="600">BUY</text>
              <text x="280" y="50" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)" fontStyle="italic">Strongest</text>
              <text x="280" y="64" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)" fontStyle="italic">standard</text>
              <text x="280" y="78" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)" fontStyle="italic">P&amp;F buy signal</text>
            </svg>
            <p>
              Three separate tests of the same resistance level &mdash; then a
              decisive break above all three
            </p>
          </div>

          <h3>The Bullish Catapult</h3>
          <p>
            A powerful pattern in its own right, though not the most important one
            I trade &mdash; that distinction belongs to the Bearish Resistance Line
            Pierce. A Bullish Catapult begins with a Triple Top Breakout: price
            must overcome not one but two prior resistance levels before the first
            breakout is established. After that breakout, price pulls back in a
            column of O&rsquo;s but holds above the prior breakout level &mdash;
            resistance has become support. The subsequent advance to new highs is
            the Catapult. The structure requires three prior resistance peaks,
            which is what gives the pattern its strength.
          </p>

          <div className="chart-block">
            <div className="chart-label">Pattern: Bullish Catapult</div>
            <svg
              width="100%"
              viewBox="0 0 380 220"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Bullish Catapult P&amp;F pattern</title>
              <desc>
                A Point and Figure chart showing a Triple Top Breakout followed by
                a pullback that holds above the breakout, then a second advance to
                new highs — the Bullish Catapult pattern
              </desc>
              <defs>
                <marker id="arr3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>
              <g stroke="rgba(200,146,26,0.12)" strokeWidth="0.5">
                <line x1="40" y1="20" x2="40" y2="200" />
                <line x1="72" y1="20" x2="72" y2="200" />
                <line x1="104" y1="20" x2="104" y2="200" />
                <line x1="136" y1="20" x2="136" y2="200" />
                <line x1="168" y1="20" x2="168" y2="200" />
                <line x1="200" y1="20" x2="200" y2="200" />
                <line x1="232" y1="20" x2="232" y2="200" />
                <line x1="264" y1="20" x2="264" y2="200" />
                <line x1="40" y1="20" x2="264" y2="20" />
                <line x1="40" y1="55" x2="264" y2="55" />
                <line x1="40" y1="90" x2="264" y2="90" />
                <line x1="40" y1="125" x2="264" y2="125" />
                <line x1="40" y1="160" x2="264" y2="160" />
                <line x1="40" y1="195" x2="264" y2="195" />
              </g>
              <text x="32" y="59" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$58</text>
              <text x="32" y="94" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$55</text>
              <text x="32" y="129" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$52</text>
              <text x="32" y="164" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$49</text>
              <text x="32" y="199" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$46</text>
              {/* Col 1 */}
              <text x="56" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="56" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="56" y="195" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 2 */}
              <text x="88" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="88" y="195" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="88" y="212" textAnchor="middle" fontFamily="monospace" fontSize="14" fontWeight="600" fill="var(--gray2)">O</text>
              {/* Col 3 */}
              <text x="120" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="120" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="120" y="195" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 4 */}
              <text x="152" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="152" y="195" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="152" y="212" textAnchor="middle" fontFamily="monospace" fontSize="14" fontWeight="600" fill="var(--gray2)">O</text>
              {/* Col 5: Triple top breakout */}
              <text x="184" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="195" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="90" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="172" y="78" fontFamily="Inter,sans-serif" fontSize="9" fill="var(--gold)">Triple Top</text>
              <text x="172" y="90" fontFamily="Inter,sans-serif" fontSize="9" fill="var(--gold)">breakout</text>
              {/* Col 6: Pullback holds */}
              <text x="216" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="216" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="216" y="175" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="226" y="185" fontFamily="Inter,sans-serif" fontSize="9" fill="#22c55e">holds!</text>
              {/* Col 7: Catapult */}
              <rect x="248" y="22" width="32" height="32" rx="4" fill="rgba(200,146,26,0.15)" stroke="var(--gold)" strokeWidth="1" />
              <text x="264" y="43" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="264" y="78" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="264" y="113" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="264" y="148" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="280" y="30" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gold)" fontWeight="700">CATAPULT</text>
              {/* Peak labels */}
              <text x="56" y="114" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="var(--gray2)">peak 1</text>
              <text x="120" y="114" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="var(--gray2)">peak 2</text>
              <text x="184" y="114" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="var(--gray2)">peak 3</text>
              {/* Resistance line */}
              <line x1="40" y1="125" x2="280" y2="125" stroke="var(--gold)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
            </svg>
            <p>
              Three resistance peaks, a Triple Top Breakout, a pullback that holds
              &mdash; then the Catapult to new highs
            </p>
          </div>

          <h3>The Bearish Resistance Line Pierce &mdash; The Most Powerful Signal of All</h3>
          <p>
            In 25+ years of trading with Point &amp; Figure charts, I have found the
            Bearish Resistance Line Pierce to be the single most bullish &mdash;
            and most profitable &mdash; signal the methodology produces. When I see
            a genuine BRL pierce, I pay attention in a way that no other pattern
            demands.
          </p>

          <p>
            Every stock has a Bearish Resistance Line &mdash; a 45-degree diagonal
            line drawn from the highest point on the chart, descending to the
            right. As long as price stays below this line, the stock is technically
            in a bearish trend regardless of what the news, the analysts, or the
            financial media are saying. When price finally pierces that line from
            below and sustains above it, something structural has changed. The
            bears who held that line have been defeated. Supply that kept the stock
            in check has been absorbed. What follows is often a move of a magnitude
            that surprises even experienced traders.
          </p>

          <p>
            The reason the BRL pierce produces the largest moves is precisely
            because most traders aren&rsquo;t watching for it. A stock that has been
            under its BRL for months or years is ignored, under-followed, and
            under-owned. The crowd has moved on. When the BRL finally breaks, the
            repositioning that follows &mdash; as traders and institutions realize
            the trend has changed &mdash; can be explosive and sustained.
          </p>

          <div className="pull-quote">
            <p>
              &ldquo;Of all the signals Point &amp; Figure produces, the Bearish
              Resistance Line Pierce is the one that has made me the most money over
              25+ years. When a stock has been under its BRL and finally breaks
              through, the move that follows is rarely small.&rdquo;
            </p>
            <cite>&mdash; Karim Pirani, Founder &amp; Architect, OpusEngine&trade;</cite>
          </div>

          <p>
            This was central to my Apple call in July 2013. AAPL had been basing
            for months, largely out of favor, trading around $385. When its price
            pierced the Bearish Resistance Line at approximately $440 &mdash;{" "}
            <a
              href="https://seekingalpha.com/instablog/6566781-options2wealth/2068932-the-impending-move-in-apple"
              target="_blank"
              rel="noopener"
            >
              a move I documented publicly on Seeking Alpha before it happened
            </a>{" "}
            &mdash; I projected a $260+ move toward $700+. The stock went on to
            begin one of its most powerful multi-year bull runs in history. The BRL
            pierce was the signal. The fundamentals of the company confirmed it was
            not a fake-out. The combination produced the call.
          </p>

          <p
            style={{
              fontSize: "13px",
              color: "var(--gray)",
              borderTop: "1px solid rgba(200,146,26,.15)",
              paddingTop: "12px",
              fontFamily: "'Inter',sans-serif",
              lineHeight: 1.6,
            }}
          >
            * All prices above reflect AAPL&rsquo;s pre-split trading range as of
            2013. Apple has since executed two stock splits: a 7-for-1 split in June
            2014 and a 4-for-1 split in August 2020. Adjusted for both splits, the
            $385 base price equates to approximately $13.75 per share, and the
            $700+ target equates to approximately $25 per share in today&rsquo;s
            split-adjusted terms.
          </p>

          <div className="chart-block">
            <div className="chart-label">Pattern: Bearish Resistance Line Pierce</div>
            <svg
              width="100%"
              viewBox="0 0 380 200"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Bearish Resistance Line Pierce P&amp;F pattern</title>
              <desc>
                A Point and Figure chart showing a declining 45-degree Bearish
                Resistance Line being pierced from below by a rising column of X&apos;s
                — signals a potential major trend reversal
              </desc>
              <defs>
                <marker id="arr4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>
              <g stroke="rgba(200,146,26,0.12)" strokeWidth="0.5">
                <line x1="40" y1="20" x2="40" y2="185" />
                <line x1="72" y1="20" x2="72" y2="185" />
                <line x1="104" y1="20" x2="104" y2="185" />
                <line x1="136" y1="20" x2="136" y2="185" />
                <line x1="168" y1="20" x2="168" y2="185" />
                <line x1="200" y1="20" x2="200" y2="185" />
                <line x1="232" y1="20" x2="232" y2="185" />
                <line x1="40" y1="20" x2="232" y2="20" />
                <line x1="40" y1="55" x2="232" y2="55" />
                <line x1="40" y1="90" x2="232" y2="90" />
                <line x1="40" y1="125" x2="232" y2="125" />
                <line x1="40" y1="160" x2="232" y2="160" />
              </g>
              <text x="32" y="59" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$55</text>
              <text x="32" y="94" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$52</text>
              <text x="32" y="129" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$49</text>
              <text x="32" y="164" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$46</text>
              {/* Col 1 */}
              <text x="56" y="55" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="56" y="90" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 2 */}
              <text x="88" y="90" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="88" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="88" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              {/* Col 3 */}
              <text x="120" y="90" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="120" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 4 */}
              <text x="152" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="152" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="152" y="185" textAnchor="middle" fontFamily="monospace" fontSize="14" fontWeight="600" fill="var(--gray2)">O</text>
              {/* Col 5: PIERCE */}
              <rect x="168" y="22" width="32" height="32" rx="4" fill="rgba(200,146,26,0.15)" stroke="var(--gold)" strokeWidth="1" />
              <text x="184" y="43" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="78" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="113" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="184" y="148" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* BRL */}
              <line x1="40" y1="20" x2="232" y2="68" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8" />
              <text x="236" y="72" fontFamily="Inter,sans-serif" fontSize="10" fill="#ef4444">BRL (45°)</text>
              <circle cx="184" cy="48" r="8" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.7" />
              <line x1="199" y1="16" x2="199" y2="8" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arr4)" />
              <text x="166" y="8" fontFamily="Inter,sans-serif" fontSize="11" fill="#22c55e" fontWeight="600">PIERCE!</text>
              <text x="252" y="50" fontFamily="Inter,sans-serif" fontSize="11" fill="#ef4444">Red line = BRL</text>
              <text x="252" y="68" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">45° decline from</text>
              <text x="252" y="82" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">chart high</text>
              <text x="252" y="110" fontFamily="Inter,sans-serif" fontSize="11" fill="#F8F3E8">X column pierces</text>
              <text x="252" y="126" fontFamily="Inter,sans-serif" fontSize="11" fill="#F8F3E8">from below</text>
              <text x="252" y="152" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)" fontStyle="italic">Signals potential</text>
              <text x="252" y="167" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)" fontStyle="italic">major trend reversal</text>
            </svg>
            <p>
              The 45° Bearish Resistance Line acts as a ceiling &mdash; piercing it
              from below signals a trend change
            </p>
          </div>

          <h3>The Bullish Support Line &mdash; and Why It Can Fool You</h3>
          <p>
            Every stock also has a Bullish Support Line &mdash; the mirror image of
            the BRL. It is a 45° ascending line drawn from the lowest point on the
            chart, rising to the right. As long as price stays above this line, the
            stock is in a bullish trend. When price drops below it, that is
            traditionally read as a defensive signal: reduce or close the position.
          </p>

          <p>
            But here is where P&amp;F gets genuinely interesting &mdash; and where
            most traders who learn the patterns mechanically get burned. A BSL
            pierce is sometimes a fake-out. Price drops below the support line,
            triggers the defensive signal, then reverses and moves dramatically
            higher. Traders who exited get left behind on what turns out to be the
            biggest move of the entire run.
          </p>

          <p>
            Knowing the difference between a genuine BSL break and a fake-out is
            where fundamental knowledge of the stock becomes essential. If you
            understand the company &mdash; its earnings trajectory, its sector
            tailwinds, the structural reason it was in your portfolio in the first
            place &mdash; you have context that the chart alone cannot give you. A
            BSL pierce on a stock with deteriorating fundamentals is a real exit
            signal. A BSL pierce on a stock where the underlying thesis is intact
            and the price action looks like a shakeout may be the best buying
            opportunity of the entire trade.
          </p>

          <p>
            This interplay between technical signal and fundamental judgment is
            exactly what separates mechanical P&amp;F traders from experienced
            ones. OpusEngine&trade; flags the technical signal. The judgment call
            &mdash; fake-out or genuine break &mdash; is where 35 years of
            experience becomes the edge.
          </p>

          <div className="chart-block">
            <div className="chart-label">Pattern: Bullish Support Line Pierce</div>
            <svg
              width="100%"
              viewBox="0 0 380 210"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Bullish Support Line Pierce P&amp;F pattern</title>
              <desc>
                A Point and Figure chart showing an ascending 45-degree Bullish
                Support Line being pierced from above by a column of O&apos;s — a
                defensive signal that can sometimes be a fake-out before a major
                move higher
              </desc>
              <defs>
                <marker id="arr5" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>
              <g stroke="rgba(200,146,26,0.12)" strokeWidth="0.5">
                <line x1="40" y1="20" x2="40" y2="190" />
                <line x1="72" y1="20" x2="72" y2="190" />
                <line x1="104" y1="20" x2="104" y2="190" />
                <line x1="136" y1="20" x2="136" y2="190" />
                <line x1="168" y1="20" x2="168" y2="190" />
                <line x1="200" y1="20" x2="200" y2="190" />
                <line x1="232" y1="20" x2="232" y2="190" />
                <line x1="40" y1="20" x2="232" y2="20" />
                <line x1="40" y1="55" x2="232" y2="55" />
                <line x1="40" y1="90" x2="232" y2="90" />
                <line x1="40" y1="125" x2="232" y2="125" />
                <line x1="40" y1="160" x2="232" y2="160" />
              </g>
              <text x="32" y="59" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$55</text>
              <text x="32" y="94" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$52</text>
              <text x="32" y="129" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$49</text>
              <text x="32" y="164" textAnchor="end" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">$46</text>
              {/* Col 1 */}
              <text x="56" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="56" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 2 */}
              <text x="88" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="88" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="88" y="190" textAnchor="middle" fontFamily="monospace" fontSize="14" fontWeight="600" fill="var(--gray2)">O</text>
              {/* Col 3 */}
              <text x="120" y="90" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="120" y="125" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              <text x="120" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="700" fill="var(--gold)">X</text>
              {/* Col 4: BSL pierce */}
              <rect x="136" y="110" width="32" height="80" rx="4" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1" />
              <text x="152" y="130" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="152" y="160" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              <text x="152" y="185" textAnchor="middle" fontFamily="monospace" fontSize="20" fontWeight="600" fill="var(--gray2)">O</text>
              {/* BSL */}
              <line x1="40" y1="190" x2="232" y2="142" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.8" />
              <text x="236" y="148" fontFamily="Inter,sans-serif" fontSize="10" fill="#22c55e">BSL (45°)</text>
              <text x="136" y="120" fontFamily="Inter,sans-serif" fontSize="11" fill="#ef4444">pierce!</text>
              <path d="M 168 170 Q 210 195 230 155" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
              <text x="232" y="138" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gold)" fontStyle="italic">fake-out?</text>
              <text x="252" y="50" fontFamily="Inter,sans-serif" fontSize="11" fill="#22c55e">Green = BSL</text>
              <text x="252" y="66" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">45° ascent from</text>
              <text x="252" y="80" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)">chart low</text>
              <text x="252" y="106" fontFamily="Inter,sans-serif" fontSize="11" fill="#ef4444">O column breaks</text>
              <text x="252" y="122" fontFamily="Inter,sans-serif" fontSize="11" fill="#ef4444">below BSL</text>
              <text x="252" y="148" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)" fontStyle="italic">Defensive signal &mdash;</text>
              <text x="252" y="162" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray2)" fontStyle="italic">but check fundamentals</text>
              <text x="252" y="178" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gold)" fontStyle="italic">before exiting</text>
            </svg>
            <p>
              A BSL pierce triggers a defensive signal &mdash; but strong
              fundamentals can mean it&rsquo;s a fake-out before a major move higher
            </p>
          </div>

          <h2>Why Most Traders Have Never Heard of It</h2>

          <p>
            There are a few honest reasons why Point &amp; Figure charting has
            largely disappeared from mainstream trading education.
          </p>

          <p>
            The first is aesthetic. P&amp;F charts look unfamiliar and require a
            different mental model than the candlestick and bar charts that
            dominate trading platforms, YouTube tutorials, and financial media.
            Traders who encounter P&amp;F for the first time often dismiss it before
            understanding it, simply because it looks wrong to them.
          </p>

          <p>
            The second is commercial. Most modern trading platforms are built
            around real-time data streams &mdash; the more a trader watches, the
            more data they consume, the more trades they make, and the more
            commissions or spreads the platform earns. P&amp;F, by design,
            encourages patience and selectivity. It generates fewer signals, not
            more. That&rsquo;s not a feature most platforms want to advertise.
          </p>

          <p>
            The third is educational. The technical analysis curriculum that most
            traders learn &mdash; whether from books, courses, or online
            communities &mdash; is heavily weighted toward candlestick patterns,
            moving averages, MACD, RSI, and Bollinger Bands. These tools have become
            standard because they&rsquo;re widely taught, not necessarily because
            they&rsquo;re superior. P&amp;F fell out of the curriculum decades ago
            and was never brought back in.
          </p>

          <h2>What P&amp;F Trading Actually Looks Like in Practice</h2>

          <p>
            In 2012, I began identifying SPWR (SunPower Corporation) as a
            high-conviction setup using P&amp;F analysis. The stock was showing a
            series of higher lows and building a base on the P&amp;F chart that
            suggested significant accumulation. I established a position before the
            Jan 2 Buffett/MidAmerican Energy catalyst &mdash; not because I knew the
            news was coming, but because the chart was telling me supply was being
            absorbed and demand was beginning to take control.
          </p>

          <p>
            When the news hit, SPWR exploded. My P&amp;F analysis had identified the
            setup. The catalyst was confirmation, not the reason for the trade.
          </p>

          <p>
            This is what Point &amp; Figure trading looks like at its best: not
            predicting news, not reacting to headlines, but identifying the
            structural conditions in price action that precede significant moves
            &mdash; and having the conviction to act before the crowd recognizes
            what&rsquo;s happening.
          </p>

          <p>
            That conviction is what OpusEngine&trade; is built to deliver. The
            engine scans every stock in the Russell 3000 using this methodology,
            surfacing the stocks that meet my specific, layered criteria before I
            ever look at a single chart manually. When OpusEngine&trade; flags
            something, it&rsquo;s because the P&amp;F structure is there &mdash; not
            because a moving average crossed, or an RSI hit a number, but because
            the actual supply-demand picture in the stock says it is ready to move.
          </p>

          <h2>The Methodology Hasn&rsquo;t Changed. The Edge Is Larger Than Ever.</h2>

          <p>
            Point &amp; Figure charting is over 100 years old. In an era where
            algorithmic trading, AI-driven momentum strategies, and high-frequency
            firms dominate short-term price action, a 100-year-old methodology might
            seem like a relic.
          </p>

          <p>
            The opposite is true. Algorithmic trading has made markets more
            efficient at the micro level &mdash; the millisecond-to-millisecond
            price fluctuations that machines exploit. But it has not made markets
            more efficient at the structural level that P&amp;F reads. Supply and
            demand dynamics, the accumulation of positions, the resolution of
            resistance levels &mdash; these play out over days, weeks, and months.
            Machines don&rsquo;t eliminate them. In some ways, the noise that
            algorithms generate makes the P&amp;F signal cleaner, because the chart
            simply ignores all of it.
          </p>

          <p>
            The traders who don&rsquo;t know about Point &amp; Figure charting are
            not your competition when you&rsquo;re using it. They&rsquo;re reacting
            to the same noise the chart filters out. That asymmetry &mdash; seeing
            structure where others see chaos &mdash; is what I&rsquo;ve built a
            35-year trading career on. And it&rsquo;s what OpusEngine&trade; is
            designed to systematize.
          </p>

          <p>
            If you want to go deeper into P&amp;F methodology &mdash; charts,
            patterns, and the underlying theory &mdash; I am also building out{" "}
            <a href="https://chart.opussignals.com" target="_blank" rel="noopener">
              chart.opussignals.com
            </a>
            , a dedicated resource for Point &amp; Figure practitioners. It is
            currently in development, but worth bookmarking if this methodology
            resonates with you.
          </p>

          <h2>Point &amp; Figure vs. Candlestick Charting</h2>

          <div className="comparison-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Point &amp; Figure</th>
                  <th>Candlestick</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Uses Time</td>
                  <td><span className="badge-good">No</span></td>
                  <td><span className="badge-mod">Yes</span></td>
                </tr>
                <tr>
                  <td>Noise Filtered</td>
                  <td><span className="badge-good">High</span></td>
                  <td><span className="badge-mod">Low</span></td>
                </tr>
                <tr>
                  <td>Trend Clarity</td>
                  <td><span className="badge-good">Excellent</span></td>
                  <td><span className="badge-mod">Moderate</span></td>
                </tr>
                <tr>
                  <td>Breakout Signals</td>
                  <td><span className="badge-good">Excellent</span></td>
                  <td><span className="badge-mod">Good</span></td>
                </tr>
                <tr>
                  <td>Options Trading</td>
                  <td><span className="badge-good">Excellent</span></td>
                  <td><span className="badge-mod">Good</span></td>
                </tr>
                <tr>
                  <td>Day Trading</td>
                  <td><span className="badge-mod">Good</span></td>
                  <td><span className="badge-good">Excellent</span></td>
                </tr>
                <tr>
                  <td>Pattern Objectivity</td>
                  <td><span className="badge-good">High &mdash; defined rules</span></td>
                  <td><span className="badge-mod">Subjective</span></td>
                </tr>
                <tr>
                  <td>Supply &amp; Demand Focus</td>
                  <td><span className="badge-good">Pure</span></td>
                  <td><span className="badge-mod">Mixed with time</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* end article-body */}

        {/* FAQ */}
        <div className="faq-block">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <div className="faq-q">What is Point and Figure charting?</div>
            <p className="faq-a">
              Point and Figure charting is a technical analysis method that records
              only meaningful price movement, using columns of X&rsquo;s (rising
              price) and O&rsquo;s (falling price) rather than time-based bars or
              candlesticks. A new column begins only when price reverses by a
              defined amount &mdash; called the reversal amount. Time is completely
              absent from the chart. Only price action matters.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-q">
              Why doesn&rsquo;t Point and Figure charting use time?
            </div>
            <p className="faq-a">
              Because time is irrelevant to supply and demand. A stock can trade
              sideways for three months and that period carries no more analytical
              weight than a single quiet day. By removing time from the chart
              entirely, P&amp;F eliminates the noise those flat periods generate and
              focuses the trader&rsquo;s attention on the price movements that
              actually matter.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-q">What is a box size in Point and Figure charting?</div>
            <p className="faq-a">
              The box size is the minimum price increment that registers on a
              P&amp;F chart. If the box size is $1, price must move at least $1 in a
              direction before an X or O is added. Smaller box sizes capture more
              detail; larger box sizes filter more noise. Box size is typically
              scaled to the price of the stock being analyzed.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-q">What is a three-box reversal?</div>
            <p className="faq-a">
              The three-box reversal is the standard rule for when a P&amp;F chart
              switches from a column of X&rsquo;s to a column of O&rsquo;s, or vice
              versa. Price must move at least three boxes in the opposite direction
              before a new column begins. This filters out minor fluctuations and
              ensures that only genuine trend reversals are recorded. Every trend
              reversal on a properly constructed P&amp;F chart reflects a three-box
              reversal minimum.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-q">
              What is a Triple Top Breakout in Point and Figure charting?
            </div>
            <p className="faq-a">
              A Triple Top Breakout occurs when a column of X&rsquo;s rises above
              not one but two prior X column highs &mdash; meaning price has
              overcome the same resistance level three separate times. It is one of
              the strongest standard buy signals in P&amp;F analysis because it
              represents sustained, repeated rejection of sellers at a level,
              followed by a decisive breakthrough.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-q">What is a Bullish Catapult pattern?</div>
            <p className="faq-a">
              A Bullish Catapult begins with a Triple Top Breakout &mdash; price
              overcoming two prior resistance levels. After that breakout, price
              pulls back in a column of O&rsquo;s but holds above the prior breakout
              level, confirming that prior resistance has become support. The
              subsequent advance to new highs is the Catapult. The three prior
              resistance peaks and the confirmed support level give this pattern
              exceptional structural strength.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-q">
              What is a Bearish Resistance Line, and why does piercing it matter?
            </div>
            <p className="faq-a">
              The Bearish Resistance Line (BRL) is a 45-degree diagonal line drawn
              downward from the highest point on a P&amp;F chart. As long as price
              stays below the BRL, the stock is in a structural downtrend regardless
              of short-term rallies or analyst opinions. When price pierces the BRL
              from below and sustains above it, the bearish trend structure has
              broken. In 25+ years of P&amp;F trading, I have found the BRL pierce to
              be the single most consistently profitable signal the methodology
              produces &mdash; precisely because stocks under their BRL are ignored
              and under-owned, making the subsequent repositioning move explosive.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-q">
              Is Point and Figure charting better than candlestick charting?
            </div>
            <p className="faq-a">
              They answer different questions. Candlestick charts are excellent for
              tracking price action over specific time periods and are well-suited
              to short-term and intraday trading. Point and Figure charts are
              superior for identifying structural trend changes, significant
              breakout levels, and high-conviction entries where price is genuinely
              ready to move &mdash; not just fluctuating. For options traders in
              particular, where time decay punishes low-conviction entries,
              P&amp;F&rsquo;s ability to identify genuine momentum setups is a
              structural advantage.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-q">
              Do professional traders still use Point and Figure charting?
            </div>
            <p className="faq-a">
              Yes &mdash; though they rarely discuss it publicly, which is part of
              why P&amp;F remains underused at the retail level. Institutional
              analysts, particularly in the fixed income and relative strength
              disciplines, have used P&amp;F methodology for decades. The
              methodology&rsquo;s longevity &mdash; over 100 years &mdash; is itself
              evidence of its durability. Tools that don&rsquo;t work don&rsquo;t
              survive a century of market evolution.
            </p>
          </div>

          <div className="faq-item">
            <div className="faq-q">
              Can P&amp;F analysis be applied to options trading?
            </div>
            <p className="faq-a">
              It is particularly well-suited to options trading. Options have time
              decay (theta) working against the buyer from the moment of purchase. A
              methodology that identifies high-conviction entries &mdash; moments
              when a stock&rsquo;s supply-demand structure is genuinely ready to
              resolve in a direction &mdash; directly addresses options
              trading&rsquo;s core challenge. The 2013 Options2Wealth experiment,
              which turned a hypothetical $10,000 into $1,074,475 in six months
              using P&amp;F-driven options entries, is the most documented public
              example of this approach in practice.
            </p>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="takeaways">
          <div className="label">Key Takeaways</div>
          <ul>
            <li>
              Point &amp; Figure charting ignores time and records only meaningful
              price movement
            </li>
            <li>X&rsquo;s represent rising price; O&rsquo;s represent falling price</li>
            <li>A new column begins only after a three-box reversal</li>
            <li>
              P&amp;F filters market noise and highlights genuine supply and demand
              shifts
            </li>
            <li>
              Core patterns include the Double Top Breakout, Triple Top Breakout,
              Bullish Catapult, and Bearish Resistance Line Pierce
            </li>
            <li>
              The BRL Pierce is the single most powerful bullish signal in the
              P&amp;F methodology
            </li>
            <li>
              P&amp;F is particularly effective for options traders seeking
              high-conviction, time-sensitive entries
            </li>
            <li>
              The methodology is over 100 years old &mdash; its longevity is
              evidence of its durability
            </li>
          </ul>
        </div>

        <div className="article-cta">
          <h3>See OpusEngine&trade; in Action</h3>
          <p>
            Get 3 free stock picks &mdash; no email required, no credit card, no
            commitment. See the methodology working in real time before you decide
            anything.
          </p>
          <Link href="/#free-picks">Get My 3 Free Picks &rarr;</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
