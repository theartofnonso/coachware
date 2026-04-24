"use client";

import { useEffect, useState } from "react";
import { ui } from "@/components/ui";
import { LANDING_DIFFERENTIATOR } from "@/lib/landing-content";

type GenderThemeChoice = "man" | "woman" | "other";
const STORAGE_KEY = "coachware.gender-theme-choice";

export function DifferentiatorSection() {
  const [selectedGender, setSelectedGender] = useState<GenderThemeChoice | null>(
    null,
  );

  useEffect(() => {
    function applyFromStorage() {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "man" || stored === "woman" || stored === "other") {
          setSelectedGender(stored);
          return;
        }
      } catch {
        // Keep default copy when storage is unavailable.
      }
      setSelectedGender(null);
    }

    function onGenderThemeChange(event: Event) {
      const detail = (event as CustomEvent<GenderThemeChoice>).detail;
      if (detail === "man" || detail === "woman" || detail === "other") {
        setSelectedGender(detail);
      }
    }

    applyFromStorage();
    window.addEventListener("gender-theme-change", onGenderThemeChange);
    return () => {
      window.removeEventListener("gender-theme-change", onGenderThemeChange);
    };
  }, []);

  const quote =
    selectedGender === "woman"
      ? "Most coaches ignore how appetite, sleep, energy, and mood change through the cycle. I help you adapt your training and nutrition so your plan keeps working long-term."
      : LANDING_DIFFERENTIATOR.quote;

  return (
    <section
      id="approach"
      className={ui.landingSection}
      aria-labelledby="differentiator-heading"
    >
      <p className={ui.landingSectionKicker}>{LANDING_DIFFERENTIATOR.kicker}</p>
      <h2 id="differentiator-heading" className={ui.landingSectionTitle}>
        {LANDING_DIFFERENTIATOR.heading}
      </h2>
      <blockquote className="mt-8 max-w-2xl border-l-2 border-zinc-950 pl-6 sm:pl-8">
        <p
          className={`${ui.coachNote} font-serif text-xl leading-snug sm:text-2xl`}
        >
          {quote}
        </p>
      </blockquote>
    </section>
  );
}
