"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./faq.css";

// Note: metadata cannot be exported from a Client Component; the app-wide
// default in layout.tsx applies.
// Original <title>: "FAQ — How OpusSignals' Stock Picks Work | OpusSignals.com"

function ChevronIcon() {
  return (
    <span className="faq-icon">
      <svg
        viewBox="0 0 12 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 1l5 5 5-5" />
      </svg>
    </span>
  );
}

function FaqItem({
  id,
  question,
  openId,
  setOpenId,
  children,
}: {
  id: string;
  question: ReactNode;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  children: ReactNode;
}) {
  const open = openId === id;
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-q" onClick={() => setOpenId(open ? null : id)}>
        <span className="faq-q-text">{question}</span>
        <ChevronIcon />
      </button>
      <div className="faq-a">{children}</div>
    </div>
  );
}

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>("q1");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitForm() {
    if (!name.trim() || !email.trim() || !topic || !message.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    // TODO: wire to a backend contact endpoint
    setSubmitted(true);
  }

  const itemProps = { openId, setOpenId };

  return (
    <div className="faq-page">
      <Nav />

      {/* HERO */}
      <div className="faq-hero">
        <div className="hero-eyebrow">Frequently Asked Questions</div>
        <h1 className="hero-title">
          Questions we <em>expect</em>
          <br />
          you to ask.
        </h1>
        <p className="hero-sub">
          All answers below are from{" "}
          <strong style={{ color: "var(--cream)" }}>Karim Pirani</strong>,
          Founder &amp; Architect of OpusEngine&#x2122;. If you have a specific
          question that isn&apos;t covered, submit yours below:
        </p>
        <div style={{ marginTop: "24px" }}>
          <button
            className="btn-ask"
            onClick={() => setShowForm((s) => !s)}
          >
            Submit a Question {showForm ? "▲" : "▼"}
          </button>
          <div
            className="ask-form"
            style={{ maxHeight: showForm ? "600px" : "0px" }}
          >
            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cf-name">Your Name</label>
                  <input
                    type="text"
                    id="cf-name"
                    placeholder="First &amp; Last Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={submitted}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-email">Your Email</label>
                  <input
                    type="email"
                    id="cf-email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitted}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cf-topic">Topic</label>
                <select
                  id="cf-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={submitted}
                >
                  <option value="" disabled>
                    Select a topic...
                  </option>
                  <option>The Track Record</option>
                  <option>Methodology &amp; OpusEngine™</option>
                  <option>Subscription &amp; Pricing</option>
                  <option>Trust &amp; Transparency</option>
                  <option>Results &amp; Expectations</option>
                  <option>Technical / Platform Issue</option>
                  <option>Media &amp; Press Inquiry</option>
                  <option>Institutional Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="cf-message">Your Question</label>
                <textarea
                  id="cf-message"
                  rows={4}
                  placeholder="What would you like to ask Karim?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={submitted}
                ></textarea>
              </div>
              {!submitted ? (
                <button className="btn-submit" onClick={submitForm}>
                  Send Question &rarr;
                </button>
              ) : (
                <div className="cf-confirm">
                  &#10003; Question received. Karim will respond
                  personally.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="faq-divider"></div>

      {/* FAQ CONTENT */}
      <div className="faq-wrap">
        {/* CATEGORY 1 */}
        <div className="faq-category">Trust &amp; Transparency</div>

        <FaqItem
          id="q1"
          {...itemProps}
          question="Why are you giving away 3 stock picks with no email required?"
        >
          <span className="kp-label">KP:</span>
          <p>Because trust should be earned, not demanded.</p>
          <p>
            Most investment websites ask for your email address{" "}
            <span style={{ color: "#ffffff" }}>before</span> providing any value.{" "}
            <br />I do the opposite.
          </p>
          <p>
            I rather you evaluate the work of my OpusEngine™ first and then decide
            for yourself whether it can make you money. For me, that is the bottom
            line.
          </p>
        </FaqItem>

        <FaqItem
          id="q2"
          {...itemProps}
          question="Is your Options2Wealth blog still accessible?"
        >
          <span className="kp-label">KP:</span>
          <p>
            Yes. The original Options2Wealth blog remains publicly accessible on
            Seeking Alpha. You can review the blog, the charts, the trade
            rationales, and the public comments for yourself.
          </p>
          <div className="faq-callout">
            <span className="faq-callout-label">Original Archive</span>
            <p>
              <a
                href="https://seekingalpha.com/instablog/6566781-options2wealth/1409851-an-intro-to-my-blog"
                target="_blank"
                rel="noopener"
              >
                seekingalpha.com — Options2Wealth Blog ↗
              </a>
            </p>
          </div>
          <p>
            We encourage healthy skepticism. Don&apos;t take our word for it.
            Verify the record yourself.
          </p>
        </FaqItem>

        <FaqItem
          id="q3"
          {...itemProps}
          question="Did you really publish every trade before execution?"
        >
          <span className="kp-label">KP:</span>
          <p>Yes. That was the entire point of the experiment.</p>
          <p>
            Every trade idea was published{" "}
            <span style={{ color: "#ffffff" }}>before</span> execution and
            time-stamped by Seeking Alpha. The public record was created first.
            The results came later.
          </p>
          <p>
            There was no way to go back and claim a trade after the fact. No
            cherry-picking. No reverse-engineering. The timestamp is the proof.
          </p>
        </FaqItem>

        <FaqItem id="q4" {...itemProps} question="Why did you do that?">
          <span className="kp-label">KP:</span>
          <p>Because hindsight is easy.</p>
          <p>
            Anyone can claim they bought a stock after it has already moved. I
            wanted to see whether my methodology could stand up to complete public
            transparency. It did.
          </p>
          <p>
            OpusSignals is built on the same principle: the methodology either
            works or it doesn&apos;t. We think you deserve to see for yourself
            before you pay a cent.
          </p>
        </FaqItem>

        {/* CATEGORY 2 */}
        <div className="faq-category">The Track Record</div>

        <FaqItem
          id="q5"
          {...itemProps}
          question="What was the final result of the Options2Wealth experiment?"
        >
          <span className="kp-label">KP:</span>
          <p>
            From Monday, December 31, 2012 through Friday, June 28, 2013 — the last
            trading day of the month — exactly six months, publicly committed on
            Day 1 — a starting capital of $10,000 grew to{" "}
            <strong>$1,074,475.06</strong>.
          </p>
          <p>
            Every trade was posted{" "}
            <span style={{ color: "#ffffff" }}>before</span> execution and
            time-stamped by Seeking Alpha. Every chart, every analysis, every
            rationale — documented for anyone to review.
          </p>
          <div className="faq-callout">
            <span className="faq-callout-label">Final Tally Post</span>
            <p>
              <a
                href="https://seekingalpha.com/instablog/6566781-options2wealth/2034682-back-to-sun-diego"
                target="_blank"
                rel="noopener"
              >
                Read the final accounting on Seeking Alpha ↗
              </a>
            </p>
          </div>
        </FaqItem>

        <FaqItem
          id="q6"
          {...itemProps}
          question="Did your readers make money too?"
        >
          <span className="kp-label">KP:</span>
          <p>
            Many of them did. Because every trade was posted publicly{" "}
            <span style={{ color: "#ffffff" }}>before</span> execution, readers
            who followed along were able to{" "}
            <strong style={{ color: "#ffffff", fontWeight: 600 }}>
              piggyback on the same ideas
            </strong>{" "}
            in their own accounts.
          </p>
          <div className="faq-testimonial">
            <p>
              &quot;I actually took my play money and followed just a few of
              Karim&apos;s moves starting in February. As of 6/18, I am up{" "}
              <strong>1,900%</strong>. While it isn&apos;t 10,000%, I cannot
              complain now that my play money is serious money!&quot;
            </p>
            <span className="attr">
              Play.Money · Seeking Alpha · June 19, 2013
            </span>
          </div>
          <div className="faq-testimonial">
            <p>
              &quot;I started only one month ago investing based upon the
              knowledge I have gained from this blog. In that one month my
              investment has grown more than <strong>250%</strong>.&quot;
            </p>
            <span className="attr">
              Dr. Wayne Label, Ph.D. · Seeking Alpha · June 6, 2013
            </span>
          </div>
          <div className="faq-testimonial">
            <p>
              &quot;I invested 20k in SPWR and GALE and in 3 months I had 100K for
              a total of <strong>80k in profits</strong>.&quot;
            </p>
            <span className="attr">
              Dr. Gabe Mena · Seeking Alpha · February 20, 2014
            </span>
          </div>
          <p>
            These are real comments, timestamped by Seeking Alpha. The archive is
            still public.
          </p>
        </FaqItem>

        {/* CATEGORY 3 */}
        <div className="faq-category">The Methodology</div>

        <FaqItem
          id="q7"
          {...itemProps}
          question="How did your readers make money?"
        >
          <span className="kp-label">KP:</span>
          <p>
            Since my trade plan(s) were posted{" "}
            <span style={{ color: "#ffffff" }}>before</span> execution, it made it
            easy for readers to make the exact same trades.
          </p>
        </FaqItem>

        <FaqItem id="q8" {...itemProps} question="What is OpusEngine™?">
          <span className="kp-label">KP:</span>
          <p>
            OpusEngine™ is the proprietary screening engine behind OpusSignals —
            the same methodology that generated the Options2Wealth track record in
            2013, now systematized and scaled.
          </p>
          <p>
            It combines Point &amp; Figure charting, trend analysis, volume
            studies, volatility compression, and other contextual factors I use to
            identify opportunities that meet my standards for conviction.
          </p>
          <p>
            This methodology has been refined over <strong>35 years</strong> of
            active markets &mdash; through multiple bull cycles, bear markets,
            corrections, and crashes. I first laid it out publicly in a{" "}
            <a
              href="https://seekingalpha.com/instablog/6566781-options2wealth/1410431-methodology-used-to-identify-my-stock-option-picks"
              target="_blank"
              rel="noopener"
              style={{ color: "var(--gold2)", textDecoration: "underline" }}
            >
              December 2012 post on Seeking Alpha
            </a>
            , before the Options2Wealth experiment even began.
          </p>
        </FaqItem>

        <FaqItem
          id="q9"
          {...itemProps}
          question="What technical signals does OpusEngine use — Golden Cross, Candlestick patterns?"
        >
          <span className="kp-label">KP:</span>
          <p>
            Yes to both. <strong>Point &amp; Figure</strong> charting is the
            foundation, but I layer in{" "}
            <strong>Candlestick chart patterns</strong> &mdash; like Cup &amp;
            Handle setups and Double Top breakouts &mdash; alongside{" "}
            <strong>Golden Cross signals</strong>, where the 50-day moving average
            crosses above the 200-day moving average.
          </p>
          <p>
            A Golden Cross is one of the more powerful bullish catalysts I watch
            for, and OpusEngine flags both confirmed Golden Crosses and ones it
            sees coming a few sessions out. I called a Golden Cross on Apple in
            2013, within the exact window I predicted, well before the move played
            out.
          </p>
          <p>
            None of these signals work in isolation. A stock has to confirm across
            multiple layers &mdash; P&amp;F structure, candlestick pattern, Golden
            Cross proximity, volume, and trend direction &mdash; before it meets my
            bar for conviction.
          </p>
        </FaqItem>

        <FaqItem
          id="q10"
          {...itemProps}
          question="What do Bearish Resistance Line, Bullish Support Line, Triple Top, and Catapult formations mean?"
        >
          <span className="kp-label">KP:</span>
          <p>
            These are classic Point &amp; Figure terms, and they&apos;re central to
            how OpusEngine reads a chart.
          </p>
          <p>
            A <strong>Bearish Resistance Line</strong> is a downward-sloping
            trendline a stock has to break through before a real reversal is
            confirmed &mdash; I called the Dow bottom in 2010 by watching one. A{" "}
            <strong>Bullish Support Line</strong> is the opposite: an
            upward-sloping line that, if it holds, confirms the uptrend stays
            intact.
          </p>
          <p>
            <strong>Double Top</strong> and <strong>Triple Top breakouts</strong>{" "}
            happen when a stock&apos;s P&amp;F chart prints a new high above two or
            three prior highs at the same price level &mdash; the more times that
            level gets tested and broken, the more conviction I have in the move. I
            called the Nasdaq&apos;s Triple Top breakout at 5,050 in March 2015,
            predicting new all-time highs within 30 days.
          </p>
          <p>
            A <strong>Bullish Catapult</strong> is one of the strongest patterns in
            P&amp;F charting &mdash; a Double or Triple Top breakout that launches
            directly into a new uptrend with no pullback. A{" "}
            <strong>Bearish Catapult</strong> is its mirror image on the downside.
            OpusEngine watches for both, though given my approach to the long side,
            it&apos;s the bullish version I act on.
          </p>
        </FaqItem>

        <FaqItem
          id="q11"
          {...itemProps}
          question="Are these stock picks generated by AI?"
        >
          <span className="kp-label">KP:</span>
          <p>
            No. Every opportunity originates from a validated structural event
            identified by OpusEngine™.
          </p>
          <p>
            This is the same methodology applied publicly on the Options2Wealth
            blog in 2013 — well before AI became a marketing buzzword in financial
            services.
          </p>
          <p>
            Artificial intelligence may eventually help rank opportunities, but AI
            does not generate the underlying signals. The signals come from my
            methodology.
          </p>
        </FaqItem>

        <FaqItem
          id="q12"
          {...itemProps}
          question="What makes OpusSignals different from other services?"
        >
          <span className="kp-label">KP:</span>
          <p>Most services try to generate more ideas. I try to eliminate ideas.</p>
          <p>
            My objective is not quantity. My objective is conviction. OpusSignals
            is designed to surface only the opportunities that survive every layer
            of my methodology.
          </p>
          <p>
            When OpusEngine™ identifies potential opportunities at the end of each
            trading day, I determine which of those, if any, are truly worth
            sharing. I am the final arbiter of the picks that are shared with you.
          </p>
          <p>
            If there are no compelling opportunities, I prefer to remain silent
            than force a signal. To me, staying silent is confidence, not failure.
          </p>
        </FaqItem>

        <FaqItem
          id="q13"
          {...itemProps}
          question="How many picks do you typically generate?"
        >
          <span className="kp-label">KP:</span>
          <p>As few as possible.</p>
          <p>
            OpusSignals is designed to surface only opportunities that survive all
            layers of my methodology. If there are no compelling opportunities in a
            given week, I would rather remain silent than force a signal.
          </p>
          <p>
            <strong>Silence is a signal too.</strong> It means market conditions
            don&apos;t meet my threshold for conviction — and I believe that
            restraint in itself is a form of value.
          </p>
        </FaqItem>

        <FaqItem id="q14" {...itemProps} question="Why don't you short stocks?">
          <span className="kp-label">KP:</span>
          <p>Because I am an optimist.</p>
          <p>
            For more than 35 years I have focused exclusively on identifying stocks
            that I believe have significant upside potential. I have never shorted a
            stock. Not once.
          </p>
          <p>
            This is not a philosophical objection to shorting — it is simply not
            what I do, and I have no interest in betting against a company. There
            are plenty of opportunities in making money on the long side, so I
            simply don&apos;t bother to short. Interestingly, OpusEngine™ can
            identify shorting opportunities just as well. But those don&apos;t
            interest me.
          </p>
        </FaqItem>

        {/* CATEGORY 4 */}
        <div className="faq-category">Results &amp; Expectations</div>

        <FaqItem id="q15" {...itemProps} question="Do you guarantee profits?">
          <span className="kp-label">KP:</span>
          <p>
            No one can guarantee profits on any individual trade. Markets are
            inherently uncertain.
          </p>
          <p>
            What I do guarantee is a performance standard. Legendary investor Peter
            Lynch said you only need to be right 60% of the time to be a successful
            investor — my goal for OpusEngine&trade; is to be right 70% of the time.
            If our win rate falls below that, your subscription, upon request, will
            immediately be refunded, no questions asked. We track every pick in your
            account, so the verification is instant on both sides.
          </p>
          <div className="faq-callout">
            <span className="faq-callout-label disclosure-label">
              Important Disclosure
            </span>
            <p>
              Past performance does not guarantee future results. The 2013
              Options2Wealth results are shown for methodology validation only.
              Current OpusSignals performance will vary by user, market conditions,
              and individual trading discipline.
            </p>
          </div>
        </FaqItem>

        <FaqItem id="q16" {...itemProps} question="Do you tell me when to sell?">
          <span className="kp-label">KP:</span>
          <p>
            No. OpusEngine&trade; and OpusSignals are designed to identify stocks
            that are showing signs of being ready to move higher &mdash;
            that&apos;s where our conviction lives. We don&apos;t advise on when to
            sell or how to lock in profits.
          </p>
          <p>
            Once you&apos;ve taken a position in one of our recommended stock picks,
            the decision of when to exit and take gains is entirely your own. We
            focus on finding you the entry; what you do from there is your call.
          </p>
        </FaqItem>

        <FaqItem
          id="q17"
          {...itemProps}
          question="Was Options2Wealth just a paper portfolio?"
        >
          <span className="kp-label">KP:</span>
          <p>
            The $10,000 starting balance was a standardized demonstration figure
            &mdash; used so followers could track the compounding math regardless of
            their own account size. But the methodology behind it was running
            simultaneously in a real client account at Charles Schwab, for a close
            friend who was in genuine financial hardship and had trusted me with his
            savings.
          </p>
          <p>
            That account started four weeks before O2W launched. It traded the same
            stocks, in the same timeframe, using the same methodology &mdash; and
            grew from under $15,000 to over $752,000 in the same seven-month window,
            before withdrawals he needed to keep his business afloat.
          </p>
          <p>
            When a professional fact-checker flew in from Canada to verify my track
            record, he sat with my client at a Starbucks for two hours. My client
            voluntarily brought his actual paper Charles Schwab statements to that
            meeting and showed him everything. The fact-checker came away convinced.
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "#8A99AE",
              fontStyle: "italic",
            }}
          >
            Charles Schwab brokerage statements documenting this client account are
            available to verified institutional inquiries and members of the press
            upon request.
          </p>
        </FaqItem>

        <FaqItem
          id="q18"
          {...itemProps}
          question="Why did you wait 13 years to launch OpusSignals?"
        >
          <span className="kp-label">KP:</span>
          <p>
            I never stopped trading. For over a decade, I kept fielding
            friends&apos; questions about the technicals on stocks they were
            watching &mdash; and in the back of my mind, I always wanted to build a
            system that could sift through the entire Russell 3000 and surface
            stocks that passed my stringent and elaborate methodology.
          </p>
          <p>
            So I built one &mdash; for myself. But once I saw what this engine is
            able to do, I decided to share it. That&apos;s OpusSignals.
          </p>
        </FaqItem>
      </div>
      {/* end faq-wrap */}

      {/* CTA */}
      <div className="faq-cta">
        <div className="faq-cta-label">
          <em>Ready to evaluate?</em>
        </div>
        <div className="faq-cta-title">Three picks. No email. No credit card.</div>
        <p className="faq-cta-sub">
          We either perform or we don&apos;t. You&apos;ll know within 10 trading
          days.
        </p>
        <Link href="/" className="btn-gold">
          See Today&apos;s Signals →
        </Link>
      </div>

      <Footer />
    </div>
  );
}
