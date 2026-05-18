"use client";

import { useEffect, useRef } from "react";
import { adsEnabled, getAdClient, getAdSlot } from "@/lib/ads";

type AdSlotKey = "top" | "result";

type AdSlotProps = {
  slotKey: AdSlotKey;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function AdSlot({ slotKey, className = "" }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const client = getAdClient();
  const slot = getAdSlot(slotKey);
  const configured = adsEnabled() && Boolean(slot);

  useEffect(() => {
    if (!configured || !insRef.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      /* ad blockers */
    }
  }, [configured, client, slot]);

  if (!configured) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div
        className={`flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 text-center text-xs text-slate-500 ${className}`}
        aria-hidden
      >
        Ad slot ({slotKey}) — set NEXT_PUBLIC_ADSENSE_CLIENT and slot ID in .env
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-xl bg-white/[0.02] ${className}`}
      aria-label="Advertisement"
    >
      <ins
        ref={insRef}
        className="adsbygoogle block min-h-[90px] w-full"
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
