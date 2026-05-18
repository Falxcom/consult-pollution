import Script from "next/script";
import { adsEnabled, getAdClient } from "@/lib/ads";

export function AdSenseScript() {
  const client = getAdClient();
  if (!adsEnabled() || !client) return null;

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
