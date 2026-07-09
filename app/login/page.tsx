"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { login, verifyOtp, loginVerify } from "@/lib/auth";
import "./login.css";

type Step = "credentials" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Step 1: Submit email + password — backend sends OTP if credentials valid
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"}/api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: email.trim(), password }),
        },
      );
      if (res.status === 401) {
        setError("Invalid email or password.");
        setBusy(false);
        return;
      }
      if (!res.ok) {
        setError(`Login failed (HTTP ${res.status}).`);
        setBusy(false);
        return;
      }
      const data = await res.json();

      // If the backend returned tokens directly (admin bypass), go to dashboard.
      if (data.access_token) {
        const { setToken } = await import("@/lib/auth");
        setToken(data.access_token);
        router.push("/dashboard");
        return;
      }

      // OTP required — move to step 2.
      if (data.otp_required) {
        setStep("otp");
        startResendCooldown();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  // Step 2: Verify OTP then get tokens
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (otpCode.length !== 6) {
      setError("Please enter the 6-digit code from your email.");
      return;
    }
    setBusy(true);
    try {
      await verifyOtp(email.trim(), otpCode, "login");
      await loginVerify(email.trim(), password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed.");
      setBusy(false);
    }
  }

  // Resend cooldown
  function startResendCooldown() {
    setResendCooldown(60);
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function handleResend() {
    setError(null);
    setBusy(true);
    try {
      const { sendOtp } = await import("@/lib/auth");
      await sendOtp(email.trim(), "login");
      startResendCooldown();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend code.");
    } finally {
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

          {error && <div className="auth-error">{error}</div>}

          {/* Step 1: Email + Password */}
          {step === "credentials" && (
            <form onSubmit={handleLogin}>
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
          )}

          {/* Step 2: OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <p className="auth-sub" style={{ marginTop: "8px" }}>
                We sent a 6-digit code to <strong>{email}</strong>. Enter it below to complete login.
              </p>
              <div className="auth-field">
                <label htmlFor="otp">Verification Code</label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  className="einput otp-input"
                  autoComplete="one-time-code"
                  placeholder="000000"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                />
              </div>
              <button type="submit" className="scanbtn auth-submit" disabled={busy}>
                {busy ? "Verifying…" : "Verify & log in"}
              </button>
              <div className="auth-resend">
                {resendCooldown > 0 ? (
                  <span>Resend in {resendCooldown}s</span>
                ) : (
                  <button type="button" onClick={handleResend} disabled={busy} className="auth-resend-btn">
                    Resend code
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="auth-alt">
            Don&apos;t have an account?{" "}
            <Link href="/signup">Register →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
