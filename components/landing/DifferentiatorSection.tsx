"use client";

import { useEffect, useState } from "react";
import {
  GENDER_THEME_CHANGE_EVENT,
  getRuntimeGenderChoice,
  type GenderThemeChoice,
} from "@/lib/gender-theme-runtime";
import { ui } from "@/components/ui";
import { LANDING_DIFFERENTIATOR } from "@/lib/landing-content";

export function DifferentiatorSection() {
  const [selectedGender, setSelectedGender] = useState<GenderThemeChoice | null>(
    getRuntimeGenderChoice(),
  );

  useEffect(() => {
    function onGenderThemeChange(event: Event) {
      const detail = (event as CustomEvent<GenderThemeChoice>).detail;
      if (detail === "man" || detail === "woman" || detail === "other") {
        setSelectedGender(detail);
      }
    }

    window.addEventListener(GENDER_THEME_CHANGE_EVENT, onGenderThemeChange);
    return () => {
      window.removeEventListener(GENDER_THEME_CHANGE_EVENT, onGenderThemeChange);
    };
  }, []);

  const quote =
    selectedGender === "woman"
      ? "Most coaches ignore how appetite, sleep, energy, mood, and stress change through the cycle. I help you adapt your training and nutrition so your plan keeps working long-term."
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
