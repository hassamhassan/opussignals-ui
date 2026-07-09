import type { MetadataRoute } from "next";

/** Public marketing site: keep the funnel/marketing pages indexable, but keep
 *  crawlers out of the private member area. /login and /signup are currently
 *  disabled anyway, and /dashboard is per-user content that must never surface
 *  in search. Backed up by an X-Robots-Tag header on these paths (next.config). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/signup", "/dashboard"],
      },
    ],
  };
}
