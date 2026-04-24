"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ui } from "@/components/ui";
import { LANDING_COMMUNITY, LANDING_HERO, LANDING_PROFILE } from "@/lib/landing-content";

type GenderThemeChoice = "man" | "woman" | "other";
const STORAGE_KEY = "coachware.gender-theme-choice";

export function HeroSection() {
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

  return (
    <header
      id="about"
      className="grid gap-12 pb-16 pt-8 sm:gap-14 sm:pb-20 sm:pt-10 lg:grid-cols-12 lg:items-start lg:gap-10 lg:pb-28 lg:pt-14"
      aria-labelledby="hero-headline"
    >
      <div className="lg:col-span-6">
        <p className={ui.landingSectionKicker}>{LANDING_PROFILE.role}</p>
        <h1
          id="hero-headline"
          className={`${ui.landingHeroTitle} mt-4 max-w-xl`}
        >
          {LANDING_HERO.headline}
        </h1>
        {selectedGender === "woman" ? (
          <p className={`${ui.landingBody} mt-6 max-w-xl`}>
            Training for women{" "}
            <strong className="font-semibold text-zinc-950">
              adapt around hormonal shifts
            </strong>
            , because appetite, mood, and energy can change through the cycle.
          </p>
        ) : (
          <p className={`${ui.landingBody} mt-6 max-w-xl`}>
            {LANDING_HERO.sub.prefix}
            <strong className="font-semibold text-zinc-950">
              {LANDING_HERO.sub.emphasize[0]}
            </strong>
            ,{" "}
            <strong className="font-semibold text-zinc-950">
              {LANDING_HERO.sub.emphasize[1]}
            </strong>
            {LANDING_HERO.sub.suffix}
          </p>
        )}
        <div className={`${ui.actions} mt-10`}>
          <a href="#community" className={ui.btnPrimary}>
            {LANDING_COMMUNITY.submitLabel}
          </a>
          <a href="#tools" className={ui.btnGhost}>
            Explore tools
          </a>
        </div>
      </div>

      <div className="lg:col-span-6 lg:pt-2">
        <figure className="mx-auto max-w-md lg:mx-0 lg:max-w-none">
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
            <Image
              src={LANDING_PROFILE.imageSrc}
              alt={LANDING_PROFILE.imageAlt}
              width={1024}
              height={1536}
              className="aspect-[4/5] h-auto w-full object-cover object-center"
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
          <figcaption className="sr-only">{LANDING_PROFILE.imageAlt}</figcaption>
        </figure>
      </div>
    </header>
  );
}
