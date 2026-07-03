"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll while the mobile nav is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close mobile nav on route change.
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  // Returns "nav-active" if the given href path matches the current page.
  // Hash-only links (/#section) are never highlighted.
  const cls = (href: string): string => {
    const linkPath = href.split("#")[0];
    if (!linkPath || linkPath === "/") return "";
    return pathname.startsWith(linkPath) ? "nav-active" : "";
  };

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
          <Link href="/about" className={cls("/about")}>About</Link>
          {/* FAQ is always gold (brand accent) — active state adds weight */}
          <Link href="/faq" className={cls("/faq")} style={{ color: "#E5AA2A" }}>FAQ</Link>
          <Link href="/blog" className={cls("/blog")}>Blog</Link>
          <Link href="/institutional" className={cls("/institutional")}>Institutions</Link>
          <Link href="/contact" className={cls("/contact")}>Contact</Link>
          <Link href="/login" className={cls("/login")}>Log in</Link>
          <Link href="/#pricing" className="ncta">Subscribe</Link>
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
        <Link href="/#how-it-works" onClick={closeMenu}>How It Works</Link>
        <Link href="/#methodology" onClick={closeMenu}>Methodology</Link>
        <Link href="/#pricing" onClick={closeMenu}>Pricing</Link>
        <Link href="/about" onClick={closeMenu} className={cls("/about")}>About</Link>
        <Link href="/faq" onClick={closeMenu} className={cls("/faq")}>FAQ</Link>
        <Link href="/blog" onClick={closeMenu} className={cls("/blog")}>Blog</Link>
        <Link href="/institutional" onClick={closeMenu} className={cls("/institutional")}>Institutions</Link>
        <Link href="/contact" onClick={closeMenu} className={cls("/contact")}>Contact</Link>
        <Link href="/login" onClick={closeMenu} className={cls("/login")}>Log in</Link>
      </nav>
    </>
  );
}
