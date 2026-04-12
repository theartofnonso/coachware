"use client";

import { useEffect, useState } from "react";
import { INTRO_OFFER_COUNTDOWN_END_MS } from "@/lib/intro-offer-countdown";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function splitRemaining(ms: number) {
  if (ms <= 0) {
    return { expired: true as const, d: 0, h: 0, m: 0, s: 0 };
  }
  const totalS = Math.floor(ms / 1000);
  const d = Math.floor(totalS / 86400);
  const h = Math.floor((totalS % 86400) / 3600);
  const m = Math.floor((totalS % 3600) / 60);
  const s = totalS % 60;
  return { expired: false as const, d, h, m, s };
}

type Variant = "card" | "strip";

export function IntroOfferCountdown({ variant }: { variant: Variant }) {
  const [remaining, setRemaining] = useState(() =>
    INTRO_OFFER_COUNTDOWN_END_MS - Date.now(),
  );

  useEffect(() => {
    const tick = () =>
      setRemaining(INTRO_OFFER_COUNTDOWN_END_MS - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts = splitRemaining(remaining);

  if (parts.expired) {
    if (variant === "strip") {
      return null;
    }
    return (
      <p className="relative mt-6 text-sm font-medium text-zinc-400">
        This introductory price has ended.
      </p>
    );
  }

  const { d, h, m, s } = parts;
  const label =
    variant === "strip"
      ? "Intro offer ends in"
      : "Time left at this price";

  const timer = (
    <span
      className="tabular-nums tracking-tight"
      suppressHydrationWarning
      aria-hidden
    >
      {d > 0 ? `${d} ${d === 1 ? "day" : "days"} ` : null}
      {pad2(h)}:{pad2(m)}:{pad2(s)}
    </span>
  );

  const dayWord = d === 1 ? "day" : "days";
  const ariaLabel = `${d} ${dayWord}, ${h} hours, ${m} minutes, ${s} seconds remaining`;

  if (variant === "strip") {
    return (
      <div
        className="border-b border-zinc-800 bg-zinc-950 px-4 py-2 text-center text-[0.8125rem] leading-snug text-zinc-200 sm:text-sm"
        role="timer"
        aria-live="polite"
        aria-label={ariaLabel}
      >
        <span className="font-medium text-zinc-400">{label}</span>{" "}
        <span className="font-mono font-semibold text-white">{timer}</span>
      </div>
    );
  }

  return (
    <div
      className="relative mt-6 rounded-lg border border-white/20 bg-white/[0.07] px-4 py-3 sm:px-5 sm:py-3.5"
      role="timer"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
        {label}
      </p>
      <p className="mt-1.5 font-mono text-xl font-semibold text-white tabular-nums sm:text-2xl">
        {timer}
      </p>
    </div>
  );
}
