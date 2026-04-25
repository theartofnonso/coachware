import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * GA4 (Google Analytics). Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to your `G-XXXXXXXXXX` ID.
 * If unset, nothing is rendered (e.g. local dev without analytics).
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID?.startsWith("G-")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
        `.trim()}
      </Script>
    </>
  );
}
