import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// Google Analytics (gtag.js) — same GA4 property as the static marketing site
// (design-reference/*.html) so app + landing pages report together.
const GA_MEASUREMENT_ID = "G-KLVNNM8F3L";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.opussignals.com"),
  title: "OpusSignals.com — Verified Stock Picks | OpusEngine™",
  description:
    "High-conviction stock picks powered by OpusEngine™ — a P&F and candlestick methodology built on 35+ years of trading. Less Noise. More Conviction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/OpusSignalLogo.png" />
      </head>
      <body>{children}</body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </html>
  );
}
