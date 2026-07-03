"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { login } from "@/lib/auth";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email.trim(), password);
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
          <div className="auth-eyebrow">▸ Member Access</div>
          <h1>Welcome back</h1>
          <p className="auth-sub">
            Log in to see your picks, track performance, and manage your account.
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
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="scanbtn auth-submit" disabled={busy}>
              {busy ? "Signing in…" : "Log in"}
            </button>
          </form>

          <div className="auth-alt">
            Don&apos;t have an account?{" "}
            <Link href="/signup">Get 3 free picks →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
