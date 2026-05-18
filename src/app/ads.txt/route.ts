import { getPublisherIdForAdsTxt } from "@/lib/ads";

export function GET() {
  const pubId = getPublisherIdForAdsTxt();
  const body = pubId
    ? `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`
    : "# Set ADSENSE_PUBLISHER_ID or NEXT_PUBLIC_ADSENSE_CLIENT after AdSense approval\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
