"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { signupFree } from "@/lib/auth";
// Reuse the login page's scoped auth-card styles.
import "@/app/login/login.css";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      await signupFree(email.trim(), password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setBusy(false);
    }
  }

  return (
    <>
      <Nav />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-eyebrow">▸ Free Account</div>
          <h1>Create your free account</h1>
          <p className="auth-sub">
            Unlock 2 more high-conviction picks. No card required — every pick
            time-stamped and tracked.
          </p>

          <form onSubmit={onSubmit}>
            {error && <div className="auth-error">{error}</div>}

            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="einput"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="einput"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>

            <button type="submit" className="scanbtn auth-submit" disabled={busy}>
              {busy ? "Creating account…" : "Create free account"}
            </button>
          </form>

          <div className="auth-alt">
            Already have an account? <Link href="/login">Log in →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
