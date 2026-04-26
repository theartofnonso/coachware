"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui } from "@/components/ui";
import { OPEN_COACH_GALLERY_EVENT } from "@/components/landing/CoachGalleryFab";
import {
  GENDER_THEME_CHANGE_EVENT,
  getRuntimeGenderChoice,
  setRuntimeGenderChoice,
  type GenderThemeChoice,
} from "@/lib/gender-theme-runtime";
import { LANDING_PROFILE } from "@/lib/landing-content";

const NAV_ITEMS = [
  { href: "#offer", label: "Contact" },
  { href: "#offer", label: "Offer" },
  { href: "#volume-packages", label: "Packages" },
  { href: "#tools", label: "Tools" },
  { href: "#gallery", label: "Gallery" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [genderChoice, setGenderChoice] = useState<GenderThemeChoice | null>(
    getRuntimeGenderChoice(),
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("theme-woman", genderChoice === "woman");
  }, [genderChoice]);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  function toggleGenderTheme() {
    const next: GenderThemeChoice = genderChoice === "woman" ? "default" : "woman";
    setRuntimeGenderChoice(next);
    setGenderChoice(next);
    try {
      window.dispatchEvent(
        new CustomEvent(GENDER_THEME_CHANGE_EVENT, {
          detail: next,
        }),
      );
    } catch {
      // Ignore event issues; toggle still applies local theme.
    }
  }

  function onNavItemClick(href: string) {
    if (href !== "#gallery") {
      return;
    }

    window.dispatchEvent(new Event(OPEN_COACH_GALLERY_EVENT));
  }

  const womenActive = genderChoice === "woman";
  const hideSectionNavItems = pathname === "/contact";

  return (
    <nav
      className="sticky top-0 z-50 border-b border-zinc-200/90 bg-zinc-50/95 backdrop-blur-sm"
      aria-label="Primary"
    >
      <div
        className={`flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 ${ui.landingNavMax}`}
      >
        <Link
          href="/"
          className="font-serif text-lg font-semibold leading-none tracking-[-0.02em] text-zinc-950"
          onClick={closeMobileMenu}
        >
          {LANDING_PROFILE.name}
        </Link>

        <div className="flex items-center gap-2.5 md:hidden">
          <button
            type="button"
            className="inline-flex h-9 items-center self-center gap-2 rounded-full border border-zinc-300 bg-white px-2.5 text-xs font-medium leading-none text-zinc-900 hover:border-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 md:hidden"
            onClick={toggleGenderTheme}
            aria-label="Toggle between default and women theme"
            aria-pressed={womenActive}
          >
            <span className={!womenActive ? "text-zinc-950" : "text-zinc-500"}>
              Default
            </span>
            <span
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                womenActive ? "bg-pink-600" : "bg-zinc-300"
              }`}
              aria-hidden
            >
              <span
                className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                  womenActive ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </span>
            <span className={womenActive ? "text-zinc-950" : "text-zinc-500"}>
              Women
            </span>
          </button>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center self-center rounded-md border border-zinc-300 bg-white text-zinc-950 hover:border-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-primary-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        <ul
          className={`m-0 hidden list-none items-center gap-5 p-0 ${
            hideSectionNavItems ? "" : "md:flex"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <li key={`${item.href}-${item.label}`}>
              <a
                href={item.href}
                className={`${ui.navLink} block leading-none`}
                onClick={() => onNavItemClick(item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="hidden items-center gap-2 rounded-full border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-900 hover:border-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 md:inline-flex"
          onClick={toggleGenderTheme}
          aria-label="Toggle between default and women theme"
          aria-pressed={womenActive}
        >
          <span className={!womenActive ? "text-zinc-950" : "text-zinc-500"}>
            Default
          </span>
          <span
            className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
              womenActive ? "bg-pink-600" : "bg-zinc-300"
            }`}
            aria-hidden
          >
            <span
              className={`inline-block size-3.5 transform rounded-full bg-white transition-transform ${
                womenActive ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </span>
          <span className={womenActive ? "text-zinc-950" : "text-zinc-500"}>
            Women
          </span>
        </button>
      </div>

      {mobileOpen && !hideSectionNavItems ? (
        <div id="mobile-primary-nav" className="border-t border-zinc-200 px-4 py-3 md:hidden">
          <ul className="m-0 list-none space-y-1 p-0">
            {NAV_ITEMS.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <a
                  href={item.href}
                  className="block rounded-md px-2.5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                  onClick={() => {
                    onNavItemClick(item.href);
                    closeMobileMenu();
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

    </nav>
  );
}
