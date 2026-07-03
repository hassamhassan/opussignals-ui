import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./blog.css";

export const metadata: Metadata = {
  title: "Blog — Point & Figure Charting & Options Trading | OpusSignals",
  description:
    "The OpusSignals blog — deep dives on Point & Figure charting, options trading methodology, and the OpusEngine™ approach to high-conviction stock picks by Karim Pirani.",
};

export default function BlogPage() {
  return (
    <main className="blog-page">
      <Nav />

      <div className="blog-hero">
        <div className="blog-eyebrow">The OpusSignals Blog</div>
        <h1 className="blog-title">Methodology. Markets. Conviction.</h1>
        <p className="blog-sub">
          Deep dives on Point &amp; Figure charting, options trading, and the
          OpusEngine&trade; approach to finding high-conviction stock picks
          &mdash; by Karim Pirani.
        </p>
      </div>

      <div className="blog-grid">
        {/* Article 1 — LIVE */}
        <Link href="/learn" className="post-card">
          <div className="post-meta">
            <span className="post-tag">Education &middot; Methodology</span>
            <span>June 27, 2026</span>
            <span>8 min read</span>
          </div>
          <div className="post-title">
            What Is Point &amp; Figure Charting &mdash; And Why Most Traders Have
            Never Heard of It
          </div>
          <p className="post-excerpt">
            P&amp;F charting has been around for over 100 years. It removes time
            from the chart entirely, filters noise, and shows only meaningful
            price movement. Here&rsquo;s why it remains one of the most powerful
            &mdash; and most overlooked &mdash; methodologies available to stock
            and options traders.
          </p>
          <div className="post-read">Read article &rarr;</div>
        </Link>

        {/* Article 2 — AAPL Call (Next Up) */}
        <div className="coming-card">
          <div className="post-meta">
            <span className="post-tag">Case Study &middot; Next Up</span>
            <span>Coming July 2026</span>
          </div>
          <div className="post-title">
            How a Point &amp; Figure Chart Predicted Apple&rsquo;s Greatest Bull
            Run Before Wall Street Saw It
          </div>
          <p className="post-excerpt">
            In July 2013, with AAPL trading around $385 and largely out of favor,
            I documented a Bearish Resistance Line pierce publicly on Seeking
            Alpha and projected a $260+ move toward $700+. What followed was one
            of Apple&rsquo;s most powerful multi-year bull runs. The full trade
            &mdash; timestamped before it happened.
          </p>
        </div>

        {/* Article 3 — $10K → $1M+ */}
        <div className="coming-card">
          <div className="post-meta">
            <span className="post-tag">Track Record</span>
            <span>Coming July 2026</span>
          </div>
          <div className="post-title">
            My $10K &rarr; $1M+: How I Turned $10,000 into $1,074,475 in 6 Months
            &mdash; Every Trade Documented Before Execution
          </div>
          <p className="post-excerpt">
            The full story of the 2013 Options2Wealth experiment on Seeking Alpha
            &mdash; the methodology, the trades, the timeline, and the verified
            public record of every call made before execution.
          </p>
        </div>

        {/* Article 4 — Sprint */}
        <div className="coming-card">
          <div className="post-meta">
            <span className="post-tag">Case Study</span>
            <span>Coming July 2026</span>
          </div>
          <div className="post-title">
            My Sprint Call: How I Identified a Cup &amp; Handle Breakout 2 Months
            Before It Happened
          </div>
          <p className="post-excerpt">
            On February 17, 2013, I posted a Cup &amp; Handle analysis on Sprint
            publicly before entering a position. On April 15, the breakout
            happened exactly as described. Here&rsquo;s the full trade &mdash;
            entry, rationale, exit, and what the P&amp;F chart was showing that
            most traders missed.
          </p>
        </div>

        {/* Article 5 — OpusEngine Scanning */}
        <div className="coming-card">
          <div className="post-meta">
            <span className="post-tag">Methodology</span>
            <span>Coming July 2026</span>
          </div>
          <div className="post-title">
            How OpusEngine&trade; Scans Every Stock in the Russell 2000 for the
            One Signal That Matters
          </div>
          <p className="post-excerpt">
            A look inside the scanning methodology &mdash; how OpusEngine&trade;
            works through all 2,000 stocks in the Russell 2000, what it filters
            for, and why small-cap signals are where the real opportunity
            consistently emerges.
          </p>
        </div>

        {/* Article 6 — Golden Cross */}
        <div className="coming-card">
          <div className="post-meta">
            <span className="post-tag">Education &middot; Contrarian</span>
            <span>Coming July 2026</span>
          </div>
          <div className="post-title">
            The Golden Cross: What Most Traders Get Completely Wrong About It
          </div>
          <p className="post-excerpt">
            The Golden Cross is one of the most searched technical signals in
            existence. It&rsquo;s also one of the most misunderstood.
            Here&rsquo;s what the standard interpretation misses &mdash; and how
            P&amp;F context changes everything about when a Golden Cross actually
            means something.
          </p>
        </div>

        {/* Article 7 — Long Only */}
        <div className="coming-card">
          <div className="post-meta">
            <span className="post-tag">Philosophy &middot; Risk</span>
            <span>Coming July 2026</span>
          </div>
          <div className="post-title">
            Why I Only Trade Long &mdash; And What That Tells You About Real Risk
            Management
          </div>
          <p className="post-excerpt">
            A long-only discipline isn&rsquo;t a limitation &mdash; it&rsquo;s a
            philosophy. After 35 years of trading, here&rsquo;s why removing
            short exposure from the equation produces better results, cleaner
            thinking, and a fundamentally different relationship with risk.
          </p>
        </div>

        {/* Article 8 — Options Aren't Risky */}
        <div className="coming-card">
          <div className="post-meta">
            <span className="post-tag">Options Education</span>
            <span>Coming July 2026</span>
          </div>
          <div className="post-title">
            Why Options Aren&rsquo;t as Risky as You Think &mdash; If You Know
            What You&rsquo;re Looking For
          </div>
          <p className="post-excerpt">
            The reputation of options as inherently dangerous instruments is a
            myth &mdash; one that keeps most investors away from one of the most
            powerful tools available. Here&rsquo;s what changes when you apply a
            proven methodology before entering a position.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
