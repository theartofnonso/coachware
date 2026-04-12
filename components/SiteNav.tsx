import Link from "next/link";
import { IntroOfferCountdown } from "@/components/IntroOfferCountdown";
import { ui } from "@/components/ui";
import { LANDING_PROFILE } from "@/lib/landing-content";

export function SiteNav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-zinc-200/90 bg-zinc-50/95 backdrop-blur-sm"
      aria-label="Primary"
    >
      <div
        className={`flex items-center justify-center px-4 py-3 sm:px-6 lg:px-8 ${ui.landingNavMax}`}
      >
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-[-0.02em] text-zinc-950"
        >
          {LANDING_PROFILE.name}
        </Link>
      </div>
      <IntroOfferCountdown variant="strip" />
    </nav>
  );
}
