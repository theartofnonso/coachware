import { ui } from "@/components/ui";
import { LANDING_OFFER } from "@/lib/landing-content";

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
      <ul className="mt-10 m-0 max-w-2xl list-none space-y-0 divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white p-0">
        {LANDING_OFFER.pillars.map((pillar) => (
          <li key={pillar.title} className="px-5 py-5 sm:px-6 sm:py-6">
            <h3 className="font-serif text-lg font-semibold tracking-[-0.02em] text-zinc-950">
              {pillar.title}
              {"subtitle" in pillar && pillar.subtitle ? (
                <span className="font-normal text-zinc-600">
                  {" "}
                  ({pillar.subtitle})
                </span>
              ) : null}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-600">
              {pillar.description}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12 max-w-2xl">
        <p className={`${ui.landingBody} mb-6`}>
          {LANDING_OFFER.consultationLead}
        </p>
        <a
          href={LANDING_OFFER.consultationBookingHref}
          className={ui.btnPrimary}
          target="_blank"
          rel="noopener noreferrer"
        >
          {LANDING_OFFER.consultationCtaLabel}
        </a>
      </div>
    </section>
  );
}
