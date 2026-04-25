import Script from "next/script";

/** Production GA4 ID from Google tag; override with `NEXT_PUBLIC_GA_MEASUREMENT_ID` if needed. */
const DEFAULT_GA_MEASUREMENT_ID = "G-Q80H8BFRKT";

function getMeasurementId(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (fromEnv === "" || fromEnv === "false") return null;
  const id = fromEnv || DEFAULT_GA_MEASUREMENT_ID;
  return id.startsWith("G-") ? id : null;
}

/**
 * Google tag (gtag.js) — one tag per site. Renders in `<head>` from root layout.
 * @see https://developers.google.com/tag-platform/gtagjs
 */
export function GoogleAnalytics() {
  const gaId = getMeasurementId();
  if (!gaId) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-gtag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
        `.trim()}
      </Script>
    </>
  );
}
