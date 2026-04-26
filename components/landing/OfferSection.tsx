import { ui } from "@/components/ui";
import { LANDING_OFFER } from "@/lib/landing-content";

function IconTraining({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4.5 10.5v3M19.5 10.5v3" />
      <path d="M6 9h12v6H6z" />
      <path d="M4.5 8.5v7M19.5 8.5v7" />
    </svg>
  );
}

function IconNutrition({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v4M12 10v11" />
      <path d="M9.5 6.5c0 2 1 3.5 2.5 3.5s2.5-1.5 2.5-3.5" />
      <path d="M8 21h8" />
    </svg>
  );
}

function IconCoaching({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
    </svg>
  );
}

function IconTools({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 8h3v3H8zM13 8h3M13 11h3M8 14h8M8 17h5" />
    </svg>
  );
}

const PILLAR_ICONS = {
  Training: IconTraining,
  Nutrition: IconNutrition,
  Coaching: IconCoaching,
  "Simple tools": IconTools,
} as const;

export function OfferSection() {
  return (
    <section
      id="offer"
      className={ui.landingSection}
      aria-labelledby="offer-heading"
    >
      <p className={ui.landingSectionKicker}>{LANDING_OFFER.kicker}</p>
      <h2 id="offer-heading" className={ui.landingSectionTitle}>
        {LANDING_OFFER.heading}
      </h2>

      <div className="mt-10 grid w-full gap-4 sm:grid-cols-2 lg:mt-12 lg:gap-5">
        {LANDING_OFFER.pillars.map((pillar, index) => {
          const Icon =
            pillar.title in PILLAR_ICONS
              ? PILLAR_ICONS[pillar.title as keyof typeof PILLAR_ICONS]
              : IconTools;

          return (
            <article
              key={pillar.title}
              className="group relative flex gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] sm:gap-5 sm:p-6 hover:border-zinc-300 hover:shadow-md"
            >
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 transition-colors group-hover:border-zinc-300 group-hover:bg-white sm:size-12"
                aria-hidden
              >
                <Icon className="size-5 sm:size-5" />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <h3 className="font-serif text-lg font-semibold tracking-[-0.02em] text-zinc-950 sm:text-xl">
                    {pillar.title}
                  </h3>
                  {"subtitle" in pillar && pillar.subtitle ? (
                    <span className="text-xs font-medium uppercase tracking-[0.08em] text-zinc-400">
                      {pillar.subtitle}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-600 sm:text-base">
                  {pillar.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute right-4 top-4 font-mono text-[0.65rem] font-medium tabular-nums text-zinc-300 sm:right-5 sm:top-5"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          );
        })}
      </div>

    </section>
  );
}
