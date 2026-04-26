"use client";

import { useEffect, useState } from "react";
import {
  GENDER_THEME_CHANGE_EVENT,
  getRuntimeGenderChoice,
  type GenderThemeChoice,
} from "@/lib/gender-theme-runtime";
import { LANDING_WORRIES_MARQUEE } from "@/lib/landing-content";

const WOMEN_WORRIES_MARQUEE_ITEMS = [
  "I know training can feel harder at certain points in your cycle.",
  "I know energy dips can make your usual plan feel impossible.",
  "I know appetite changes can throw your food routine off.",
  "I know sleep can shift and affect recovery.",
  "I know mood changes can impact motivation and confidence.",
  "I know you are tired of plans that ignore hormonal changes.",
  "I know progress can feel confusing month to month.",
  "I know you want training that adapts with your body.",
  "I know consistency is harder when symptoms fluctuate.",
  "I know you need a plan that works with your cycle, not against it.",
] as const;

export function WorriesMarqueeSection() {
  const [selectedGender, setSelectedGender] = useState<GenderThemeChoice | null>(
    getRuntimeGenderChoice(),
  );

  useEffect(() => {
    function onGenderThemeChange(event: Event) {
      const detail = (event as CustomEvent<GenderThemeChoice>).detail;
      if (detail === "default" || detail === "woman") {
        setSelectedGender(detail);
      }
    }

    window.addEventListener(GENDER_THEME_CHANGE_EVENT, onGenderThemeChange);
    return () => {
      window.removeEventListener(GENDER_THEME_CHANGE_EVENT, onGenderThemeChange);
    };
  }, []);

  const items =
    selectedGender === "woman"
      ? WOMEN_WORRIES_MARQUEE_ITEMS
      : LANDING_WORRIES_MARQUEE.items;
  const track = [...items, ...items];

  return (
    <section
      aria-label={LANDING_WORRIES_MARQUEE.ariaLabel}
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-t border-zinc-200/90 bg-zinc-100/70 py-3.5 sm:py-4"
    >
      <ul className="sr-only motion-reduce:hidden">
        {items.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <ul className="m-0 hidden list-none flex-wrap justify-center gap-x-3 gap-y-2 px-4 py-1 text-center motion-reduce:flex sm:gap-x-4">
        {items.map((line) => (
          <li
            key={line}
            className="max-w-[min(100%,20rem)] text-[0.9375rem] font-light leading-snug text-zinc-700"
          >
            {line}
          </li>
        ))}
      </ul>

      <div className="motion-reduce:hidden" aria-hidden>
        <div className="flex w-max animate-landing-marquee hover:[animation-play-state:paused]">
          {track.map((line, i) => (
            <span
              key={`${i}-${line}`}
              className="flex shrink-0 items-center gap-8 pl-8 sm:gap-10 sm:pl-10"
            >
              <span className="whitespace-nowrap text-[0.9375rem] font-light leading-snug text-zinc-700">
                {line}
              </span>
              <span className="select-none text-zinc-300" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
