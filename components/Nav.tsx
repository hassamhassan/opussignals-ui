"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile nav is open (mirrors the static site).
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* BETA NOTICE BANNER */}
      <div
        style={{
          position: "relative",
          zIndex: 50,
          background: "#142B45",
          borderBottom: "1px solid rgba(200,146,26,.3)",
          padding: "11px 20px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "13.5px",
            color: "#C2D2E0",
            letterSpacing: ".2px",
          }}
        >
          <span style={{ color: "#E5AA2A", fontWeight: 700 }}>Beta</span> &mdash;
          the site is open for early testing now. Official launch is{" "}
          <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>
            July 4, 2026
          </strong>
          .
        </span>
      </div>

      {/* HEADER */}
      <header>
        <div className="logo">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="OpusSignals.com"
              style={{ width: "150px", display: "block" }}
              src="/OpusSignalLogo.png"
            />
          </Link>
        </div>
        <nav>
          <Link href="/#how-it-works">How It Works</Link>
          <Link href="/#methodology">Methodology</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link style={{ color: "#E5AA2A" }} href="/faq">
            FAQ
          </Link>
          <Link href="/blog">Blog</Link>
          <Link href="/institutional">Institutions</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Log in</Link>
          <Link href="/#pricing" className="ncta">
            Subscribe
          </Link>
        </nav>
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <nav className={`mobile-nav${menuOpen ? " open" : ""}`}>
        <Link href="/#how-it-works" onClick={closeMenu}>
          How It Works
        </Link>
        <Link href="/#methodology" onClick={closeMenu}>
          Methodology
        </Link>
        <Link href="/#pricing" onClick={closeMenu}>
          Pricing
        </Link>
        <Link href="/about" onClick={closeMenu}>
          About
        </Link>
        <Link href="/faq" onClick={closeMenu}>
          FAQ
        </Link>
        <Link href="/blog" onClick={closeMenu}>
          Blog
        </Link>
        <Link href="/institutional" onClick={closeMenu}>
          Institutions
        </Link>
        <Link href="/contact" onClick={closeMenu}>
          Contact
        </Link>
        <Link href="/login" onClick={closeMenu}>
          Log in
        </Link>
      </nav>
    </>
  );
}
