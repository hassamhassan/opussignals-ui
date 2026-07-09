import Link from "next/link";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
// Reuse the auth-page / auth-card styling from the login route.
import "@/app/login/login.css";

/** Placeholder shown while public account access (login / signup) is turned off.
 *  Public auth is gated on transactional email (OTP delivery) being live; until
 *  then these routes redirect users here instead of a dead-end OTP screen. */
export default function AuthDisabledNotice({ mode }: { mode: "login" | "signup" }) {
  const heading = mode === "login" ? "Log in is coming soon" : "Sign-ups are coming soon";
  return (
    <>
      <Nav />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-eyebrow">▸ Member Access</div>
          <h1>{heading}</h1>
          <p className="auth-sub">
            Member accounts are launching shortly. In the meantime, explore the
            methodology or choose a plan to be first in line when access opens.
          </p>
          <Link
            href="/#pricing"
            className="scanbtn auth-submit"
            style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}
          >
            View plans
          </Link>
          <div className="auth-alt">
            <Link href="/">← Back to home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
