// Regular-user auth for the OpusSignals public site. The backend gates the
// dashboard behind a JWT; this client logs in as an ordinary user (no is_admin
// requirement) and sends that token. The short-lived access token is kept in
// localStorage; the refresh token is an httponly cookie the backend sets/reads
// (same-site). Mirrors the pnfchart tool's auth client (lib/auth.ts + the
// authedFetch in lib/api.ts) but for regular accounts and under a distinct
// localStorage key so the two apps don't clobber each other's sessions.

import { API_BASE } from "@/lib/apiBase";

const TOKEN_KEY = "os_user_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(TOKEN_KEY);
}

/** The current authenticated user (app/schemas/auth.py::UserResponse). */
export interface Me {
  id: number;
  email: string;
  email_verified: boolean;
  is_admin: boolean;
  subscription_status: string;
  subscribed_ranges: string[];
}

/** Raised when the session can't be recovered (expired + refresh failed). The
 *  dashboard listens for the "os-session-expired" event and returns to login. */
export class SessionExpiredError extends Error {
  constructor() {
    super("Your session has expired. Please sign in again.");
    this.name = "SessionExpiredError";
  }
}

/** GET /auth/me with an explicit token (used right after login/signup). */
export async function me(token?: string): Promise<Me> {
  const bearer = token ?? getToken();
  const res = await fetch(`${API_BASE}/api/v1/auth/me`, {
    headers: {
      Accept: "application/json",
      ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Could not verify the session.");
  return (await res.json()) as Me;
}

/** Log in a regular user. Stores the access token and returns the user. */
export async function login(email: string, password: string): Promise<Me> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error(`Could not reach the API at ${API_BASE}.`);
  }
  if (res.status === 401) throw new Error("Invalid email or password.");
  if (!res.ok) throw new Error(`Login failed (HTTP ${res.status}).`);
  const { access_token } = (await res.json()) as { access_token: string };
  setToken(access_token);
  return me(access_token);
}

/** Create a free account (the funnel "sign up for 2 more free picks" step).
 *  Stores the access token and returns the user. */
export async function signupFree(email: string, password: string): Promise<Me> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error(`Could not reach the API at ${API_BASE}.`);
  }
  if (res.status === 403) throw new Error("Please verify your email first.");
  if (res.status === 409) throw new Error("That email is already registered. Try logging in.");
  if (res.status === 422) {
    throw new Error("Enter a valid email and a password of at least 8 characters.");
  }
  if (!res.ok) throw new Error(`Sign up failed (HTTP ${res.status}).`);
  const { access_token } = (await res.json()) as { access_token: string };
  setToken(access_token);
  return me(access_token);
}

// ── OTP Methods ──

/** Send a 6-digit OTP code to the given email. */
export async function sendOtp(
  email: string,
  purpose: "signup" | "login",
): Promise<{ message: string; expires_in: number }> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/v1/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, purpose }),
    });
  } catch {
    throw new Error(`Could not reach the API at ${API_BASE}.`);
  }
  if (res.status === 409) throw new Error("This email is already registered. Log in instead.");
  if (res.status === 429) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.detail ?? "Please wait before requesting another code.");
  }
  if (!res.ok) throw new Error(`Failed to send code (HTTP ${res.status}).`);
  return (await res.json()) as { message: string; expires_in: number };
}

/** Verify a 6-digit OTP code. */
export async function verifyOtp(
  email: string,
  code: string,
  purpose: "signup" | "login",
): Promise<{ verified: boolean; message: string }> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/v1/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, code, purpose }),
    });
  } catch {
    throw new Error(`Could not reach the API at ${API_BASE}.`);
  }
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.detail ?? "Verification failed.");
  }
  return (await res.json()) as { verified: boolean; message: string };
}

/** Complete login after OTP verification (re-send credentials to get tokens). */
export async function loginVerify(email: string, password: string): Promise<Me> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/v1/auth/login/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error(`Could not reach the API at ${API_BASE}.`);
  }
  if (res.status === 401) throw new Error("Verification not complete. Please enter the OTP first.");
  if (!res.ok) throw new Error(`Login failed (HTTP ${res.status}).`);
  const { access_token } = (await res.json()) as { access_token: string };
  setToken(access_token);
  return me(access_token);
}

/** Exchange the refresh cookie for a fresh access token; null if not possible. */
export async function refresh(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) return null;
    const { access_token } = (await res.json()) as { access_token: string };
    setToken(access_token);
    return access_token;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${API_BASE}/api/v1/auth/logout`, { method: "POST", credentials: "include" });
  } catch {
    /* best-effort; clear locally regardless */
  }
  clearToken();
}

export interface AuthedOptions {
  method?: string;
  body?: unknown;
  signal?: AbortSignal;
}

/** Fetch with the user bearer token attached; on 401, refresh once and retry.
 *  On a final 401 it clears the token, dispatches "os-session-expired" so the
 *  dashboard can send the user back to login, and throws SessionExpiredError. */
export async function authedFetch(url: string, opts: AuthedOptions = {}): Promise<Response> {
  const build = (token: string | null): RequestInit => {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (opts.body !== undefined) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;
    return {
      method: opts.method ?? "GET",
      headers,
      credentials: "include",
      signal: opts.signal,
      ...(opts.body !== undefined ? { body: JSON.stringify(opts.body) } : {}),
    };
  };
  let res = await fetch(url, build(getToken()));
  if (res.status === 401) {
    const fresh = await refresh();
    if (fresh) res = await fetch(url, build(fresh));
    if (res.status === 401) {
      clearToken();
      if (typeof window !== "undefined") window.dispatchEvent(new Event("os-session-expired"));
      throw new SessionExpiredError();
    }
  }
  return res;
}
