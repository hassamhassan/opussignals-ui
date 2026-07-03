"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./institutional.css";

// Note: metadata cannot be exported from a Client Component; the app-wide
// default in layout.tsx applies.
// Original <title>: "Institutional Consulting — Karim Pirani | OpusSignals"

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

export default function InstitutionalPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to a backend contact endpoint
    setSubmitted(true);
    // Scroll roughly to where the success message appears.
    if (typeof window !== "undefined") {
      window.scrollTo({ top: window.scrollY, behavior: "smooth" });
    }
  }

  return (
    <div className="inst-page">
      <Nav />

      {/* HERO */}
      <div className="inst-hero">
        <div className="eyebrow">&#9656; By Appointment Only</div>
        <h1>
          Private Consulting
          <br />{" "}
          <em>
            for Institutions &amp;
            <br />
            Family Offices
          </em>
        </h1>
        <p>
          Karim Pirani offers a limited number of private one-on-one consulting
          sessions for institutional investors, family office fund managers, and
          qualified professionals seeking direct access to his{" "}
          <strong>35+ years of P&amp;F signal expertise</strong> and the <OE />{" "}
          methodology.
        </p>

        <div className="fee-badge">
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2px",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Consultation Session
          </div>
          <div className="fee-amount">
            <sup>$</sup>10,000
          </div>
          <div className="fee-per">Up to 5 Hours</div>
          <div className="fee-per" style={{ marginTop: "4px" }}>
            By Appointment
          </div>
          <div
            className="fee-note"
            style={{ color: "#ffffff", marginTop: "6px" }}
          >
            Limited Availability.
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* WHO THIS IS FOR */}
      <div className="who-sec">
        <div>
          <div className="who-label">&#9656; Who&apos;s It For</div>
          <h2 className="who-title" style={{ fontWeight: 300 }}>
            Those Who Want
            <br />
            <em>Direct Access</em>
          </h2>
          <p className="who-p">
            OpusSignals.com delivers signals to individual subscribers. Consulting
            sessions are reserved for institutions, family offices, and
            professional fund managers who require a deeper level of engagement
            &mdash; direct access to Karim&apos;s methodology, analysis, and
            thinking.
          </p>
          <p className="who-p">
            These sessions are <strong>not sales calls</strong>. They are
            substantive working consultations. Karim will expect you to come
            prepared with specific questions, portfolio context, or analytical
            challenges you want to work through together.
          </p>
          <p className="who-p" style={{ color: "#ffffff" }}>
            Limited Availability.
          </p>
        </div>
        <div className="who-cards">
          <div className="who-card">
            <div className="who-icon">🏛️</div>
            <div>
              <h4>Institutional Investors</h4>
              <p>
                Hedge funds, asset managers, and investment firms seeking an
                independent P&amp;F and technical analysis perspective on specific
                securities or market conditions.
              </p>
            </div>
          </div>
          <div className="who-card">
            <div className="who-icon">👨‍👩‍👧‍👦</div>
            <div>
              <h4>Family Offices</h4>
              <p>
                Single and multi-family office investment teams looking for
                high-conviction signal guidance and methodology validation for
                portfolio decisions.
              </p>
            </div>
          </div>
          <div className="who-card">
            <div className="who-icon">📊</div>
            <div>
              <h4>Fund Managers</h4>
              <p>
                Professional portfolio managers and analysts who want to integrate
                P&amp;F chart analysis and <OE /> signal methodology into their
                existing research process.
              </p>
            </div>
          </div>
          <div className="who-card">
            <div className="who-icon">🎓</div>
            <div>
              <h4>Qualified Professionals</h4>
              <p>
                Licensed investment professionals and qualified financial analysts
                seeking structured education on Point &amp; Figure methodology and
                multi-signal conviction scoring.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* KARIM BIO STRIP */}
      <div className="karim-strip">
        <div className="karim-strip-inner">
          <div className="karim-avatar">👤</div>
          <div>
            <h3>Karim Pirani</h3>
            <div className="title">
              Founder &amp; Architect · <OE /> · PnFChart.com, Inc.
            </div>
            <p>
              35+ years reading P&amp;F charts and market signals. In 2013, turned{" "}
              <strong>$10,000 into $1,074,475 in exactly 6 months</strong> on
              Seeking Alpha &mdash; every trade posted publicly before execution,
              timestamped on record. Developer of <OE />, a proprietary
              multi-signal stock screening methodology built on three decades of
              active market expertise.
            </p>
            <Link href="/about">Read the full story and track record &rarr;</Link>
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="form-sec">
        <div className="form-eyebrow">&#9656; Request a Session</div>
        <h2 className="form-title" style={{ fontWeight: 300 }}>
          Schedule a Consulting Session
        </h2>
        <p className="form-sub">
          Complete the form below to request a private consulting session with
          Karim Pirani. All fields marked{" "}
          <strong style={{ color: "var(--gold2)" }}>*</strong> are required. Karim
          personally reviews every inquiry and will respond within 2 business
          days.
        </p>

        <div className="form-fee-reminder">
          <p>
            &#9656; &nbsp;Consulting fee payable in advance upon session
            confirmation. Sessions are conducted via Zoom or phone, or if you are
            in Southern California, in San Diego in person.{" "}
            <strong>Minimum Engagement Fee: $10,000 (5 hours).</strong>
          </p>
        </div>

        {!submitted ? (
          <form className="inst-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label>
                  Institution&apos;s Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  placeholder="e.g. Redwood Capital Management"
                  required
                />
              </div>
              <div className="field">
                <label>
                  Name of Fund Manager <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="manager_name"
                  placeholder="Full name"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>
                  Title <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Chief Investment Officer"
                  required
                />
              </div>
              <div className="field">
                <label>Institution Type</label>
                <select name="inst_type" defaultValue="">
                  <option value="">Select type</option>
                  <option>Hedge Fund</option>
                  <option>Family Office</option>
                  <option>Asset Management Firm</option>
                  <option>Private Equity</option>
                  <option>RIA / Advisory Firm</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>
                  Email Address <span className="req">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@institution.com"
                  required
                />
              </div>
              <div className="field">
                <label>
                  Phone Number <span className="req">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (000) 000-0000"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>What would you like to discuss?</label>
              <textarea
                name="comments"
                placeholder="Please describe what you'd like to cover in the session &mdash; specific stocks, sectors, methodology questions, portfolio review, or other topics. The more context you provide, the better Karim can prepare."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22 11 13 2 9l20-7z" />
              </svg>
              Submit Inquiry
            </button>
            <div className="form-disc" style={{ color: "#8899AA" }}>
              By submitting this form you confirm you are an accredited investor or
              a qualified institutional buyer. Karim personally reviews all
              requests and will respond within 2 business days.
            </div>
          </form>
        ) : (
          <div className="success-msg">
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>✅</div>
            <h3>Inquiry Received</h3>
            <p>
              Thank you for reaching out. Karim personally reviews every inquiry
              and will respond to{" "}
              <strong>qualified requests within 2 business days</strong>. If your
              session is confirmed, you will receive payment instructions and
              scheduling details by email.
            </p>
          </div>
        )}
      </div>

      <div className="divider"></div>

      <Footer />
    </div>
  );
}
