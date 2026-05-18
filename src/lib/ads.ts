/** Google AdSense (optional). Set in Vercel Environment Variables. */

export function getAdClient(): string | undefined {
  const id = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  return id || undefined;
}

export function getAdSlot(key: "top" | "result"): string | undefined {
  const envKey =
    key === "top"
      ? "NEXT_PUBLIC_AD_SLOT_TOP"
      : "NEXT_PUBLIC_AD_SLOT_RESULT";
  const id = process.env[envKey]?.trim();
  return id || undefined;
}

export function adsEnabled(): boolean {
  return Boolean(getAdClient());
}

/** ads.txt uses pub-XXXXXXXX (not ca-pub-). */
export function getPublisherIdForAdsTxt(): string | null {
  const explicit = process.env.ADSENSE_PUBLISHER_ID?.trim();
  if (explicit) return explicit;

  const client = getAdClient();
  if (!client?.startsWith("ca-pub-")) return null;
  return `pub-${client.slice("ca-pub-".length)}`;
}
