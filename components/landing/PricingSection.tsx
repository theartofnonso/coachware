import { ui } from "@/components/ui";
import { LANDING_OFFER, LANDING_PRICING } from "@/lib/landing-content";

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 mt-5 list-none space-y-2.5 border-t border-zinc-100 p-0 pt-5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2 text-[0.9375rem] leading-snug text-zinc-700"
        >
          <span
            className="mt-2 size-1 shrink-0 rounded-full bg-zinc-400"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PricingSection() {
  return (
    <section
      id="pricing"
      className={ui.landingSection}
      aria-label="Pricing"
    >
      <p className={ui.landingSectionKicker}>{LANDING_PRICING.kicker}</p>

      <h2
        id="pricing-heading"
        className={`${ui.landingSectionTitle} mt-6 sm:mt-8`}
      >
        {LANDING_PRICING.heading}
      </h2>
      <p className={`${ui.landingBody} mt-6 max-w-2xl`}>
        {LANDING_PRICING.intro}
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:items-stretch lg:gap-4 lg:px-1 lg:pt-2">
        {LANDING_PRICING.packages.map((pkg) => {
          const featured = pkg.highlighted;
          return (
            <article
              key={`${pkg.title}-${pkg.price}`}
              className={`relative flex flex-col rounded-xl border bg-white shadow-sm transition-[border-color,box-shadow] ${
                featured
                  ? "z-10 border-2 border-zinc-950 p-6 shadow-lg sm:p-8 lg:-my-3 lg:scale-[1.06] lg:px-7 motion-reduce:lg:my-0 motion-reduce:lg:scale-100"
                  : "border border-zinc-200 p-5 hover:border-zinc-300 hover:shadow-md sm:p-6"
              }`}
            >
              {"badge" in pkg && pkg.badge ? (
                <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full border border-zinc-950 bg-zinc-950 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
                  <span aria-hidden>★</span>
                  {pkg.badge}
                </span>
              ) : null}
              <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-zinc-950">
                {pkg.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-zinc-700">
                {pkg.tagline}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-600">
                {pkg.description}
              </p>
              <p
                className={`mt-5 font-semibold tabular-nums tracking-[-0.02em] text-zinc-950 ${
                  featured
                    ? "font-serif text-3xl sm:text-4xl"
                    : "font-serif text-2xl"
                }`}
              >
                {pkg.price}
                <span
                  className={`font-normal text-zinc-500 ${
                    featured ? "text-lg sm:text-xl" : "text-base"
                  }`}
                >
                  {pkg.priceSuffix}
                </span>
              </p>
              <FeatureList items={pkg.features} />
              <a
                href={pkg.paymentHref}
                className={`${ui.btnText} mt-6 inline-flex min-h-11 w-full items-center justify-center`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pkg.ctaLabel}
              </a>
            </article>
          );
        })}
      </div>

      <div className="mt-12 flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:mt-14">
        <p className={`${ui.landingBody} m-0 min-w-0 max-w-none sm:flex-1`}>
          {LANDING_PRICING.footerLead}
        </p>
        <a
          href={LANDING_OFFER.consultationBookingHref}
          className={`${ui.btnPrimary} w-full shrink-0 sm:w-auto`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {LANDING_OFFER.consultationCtaLabel}
        </a>
      </div>
    </section>
  );
}
