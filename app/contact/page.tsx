"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./contact.css";

// Note: metadata cannot be exported from a Client Component, so the page-level
// <title>/description are handled by the app-wide default in layout.tsx.
// (Original <title>: "Contact Karim Pirani | OpusSignals.com")

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !topic || !message.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    // TODO: wire to a backend contact endpoint
    setSubmitted(true);
  }

  return (
    <div className="contact-page">
      <Nav />

      <div className="c-hero">
        <div className="hero-eyebrow">Get In Touch</div>
        <h1 className="hero-title">
          Have a question?
          <br />
          <em>Karim reads every message.</em>
        </h1>
        <p className="hero-sub">
          Whether it&apos;s about the verified track record, Point &amp; Figure
          methodology, Golden Cross and Candlestick signals, pricing, press, or
          something else entirely — send a message below and you&apos;ll hear
          back personally, usually within 2 business days.
        </p>
      </div>

      <div className="contact-wrap">
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
              <option>General Question</option>
              <option>The Track Record</option>
              <option>Methodology &amp; OpusEngine™</option>
              <option>Subscription &amp; Pricing</option>
              <option>Trust &amp; Transparency</option>
              <option>Technical / Platform Issue</option>
              <option>Media &amp; Press Inquiry</option>
              <option>Institutional Inquiry</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cf-message">Your Message</label>
            <textarea
              id="cf-message"
              placeholder="What would you like to ask or share?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitted}
            ></textarea>
          </div>
          {!submitted ? (
            <button className="btn-submit" onClick={handleSubmit}>
              Send Message &rarr;
            </button>
          ) : (
            <div className="cf-confirm">
              &#10003; Thanks — we&apos;ll be in touch. Karim will respond
              personally.
            </div>
          )}
        </div>
      </div>

      <div className="c-divider"></div>

      <Footer />
    </div>
  );
}
