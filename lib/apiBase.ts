function resolveApiBase(): string {
  const raw = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim();
  if (!raw) return "http://localhost:8000";
  // Guard against a scheme-less value (e.g. "api.opussignals.com"). Without a
  // scheme the browser treats it as a relative path and resolves it against the
  // current origin, producing URLs like
  // https://app.opussignals.com/api.opussignals.com/api/v1/... — so default a
  // bare host to https:// and strip any trailing slash.
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withScheme.replace(/\/+$/, "");
}

export const API_BASE = resolveApiBase();
