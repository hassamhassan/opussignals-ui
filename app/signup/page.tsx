"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { signupFree, sendOtp, verifyOtp } from "@/lib/auth";
import "@/app/login/login.css";

type Step = "email" | "otp" | "password";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Step 1: Send OTP to email
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    setBusy(true);
    try {
      await sendOtp(trimmed, "signup");
      setStep("otp");
      startResendCooldown();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  // Step 2: Verify OTP
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (otpCode.length !== 6) {
      setError("Please enter the 6-digit code from your email.");
      return;
    }
    setBusy(true);
    try {
      await verifyOtp(email.trim(), otpCode, "signup");
      setStep("password");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed.");
    } finally {
      setBusy(false);
    }
  }

  // Step 3: Set password & create account
  async function handleCreateAccount(e: React.FormEvent) {
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

  // Resend cooldown timer
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
      await sendOtp(email.trim(), "signup");
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
          <div className="auth-eyebrow">▸ Free Account</div>
          <h1>Create your free account</h1>

          {/* Step indicators */}
          <div className="auth-steps">
            <span className={`auth-step ${step === "email" ? "active" : step === "otp" || step === "password" ? "done" : ""}`}>1. Email</span>
            <span className={`auth-step ${step === "otp" ? "active" : step === "password" ? "done" : ""}`}>2. Verify</span>
            <span className={`auth-step ${step === "password" ? "active" : ""}`}>3. Password</span>
          </div>

          {error && <div className="auth-error">{error}</div>}

          {/* Step 1: Enter email */}
          {step === "email" && (
            <form onSubmit={handleSendOtp}>
              <p className="auth-sub">
                Enter your email to receive a 6-digit verification code.
              </p>
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
              <button type="submit" className="scanbtn auth-submit" disabled={busy}>
                {busy ? "Sending code…" : "Send verification code"}
              </button>
            </form>
          )}

          {/* Step 2: Enter OTP */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp}>
              <p className="auth-sub">
                We sent a 6-digit code to <strong>{email}</strong>. Enter it below.
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
                {busy ? "Verifying…" : "Verify code"}
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

          {/* Step 3: Set password */}
          {step === "password" && (
            <form onSubmit={handleCreateAccount}>
              <p className="auth-sub">
                Email verified ✓ &mdash; now set your password to finish.
              </p>
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
          )}

          <div className="auth-alt">
            Already have an account? <Link href="/login">Log in →</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
