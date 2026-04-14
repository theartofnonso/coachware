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
  const { solo, coaching } = LANDING_PRICING;

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

      <div className="mt-10 flex flex-col gap-10 lg:gap-12">
        <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 lg:max-w-md">
          <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-zinc-950">
            {solo.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-zinc-700">{solo.tagline}</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-600">
            {solo.audience}
          </p>
          <p className="mt-5 font-serif text-2xl font-semibold tabular-nums tracking-[-0.02em] text-zinc-950">
            {solo.price}
            <span className="text-base font-normal text-zinc-500">
              {solo.priceSuffix}
            </span>
          </p>
          <FeatureList items={solo.features} />
          <a
            href={solo.paymentHref}
            className={`${ui.btnText} mt-6 inline-flex min-h-11 w-full items-center justify-center sm:w-auto sm:justify-start`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {solo.ctaLabel}
          </a>
        </article>

        <div>
          <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-2xl">
            {coaching.name}
          </h3>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-zinc-600 sm:text-base">
            {coaching.tagline}
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:items-stretch lg:gap-4 lg:px-1 lg:pt-2">
            {coaching.tiers.map((tier) => {
              const featured = tier.highlighted;
              return (
                <article
                  key={`${tier.tierLabel}-${tier.price}`}
                  className={`relative flex flex-col rounded-xl border bg-white shadow-sm transition-[border-color,box-shadow] ${
                    featured
                      ? "z-10 border-2 border-zinc-950 p-6 shadow-lg sm:p-8 lg:-my-3 lg:scale-[1.06] lg:px-7 motion-reduce:lg:my-0 motion-reduce:lg:scale-100"
                      : "border border-zinc-200 p-5 hover:border-zinc-300 hover:shadow-md sm:p-6"
                  }`}
                >
                  {"badge" in tier && tier.badge ? (
                    <span
                      className={`mb-3 inline-flex w-fit items-center gap-1 rounded-full border border-zinc-950 bg-zinc-950 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white`}
                    >
                      <span aria-hidden>★</span>
                      {tier.badge}
                    </span>
                  ) : null}
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                    {tier.tierLabel}
                  </p>
                  <p
                    className={`mt-2 font-semibold tabular-nums tracking-[-0.02em] text-zinc-950 ${
                      featured
                        ? "font-serif text-3xl sm:text-4xl"
                        : "font-serif text-2xl"
                    }`}
                  >
                    {tier.price}
                    <span
                      className={`font-normal text-zinc-500 ${
                        featured ? "text-lg sm:text-xl" : "text-base"
                      }`}
                    >
                      {tier.priceSuffix}
                    </span>
                  </p>
                  <FeatureList items={tier.features} />
                  {"paymentHref" in tier && tier.paymentHref ? (
                    <a
                      href={tier.paymentHref}
                      className={`${ui.btnText} mt-6 inline-flex min-h-11 w-full items-center justify-center`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tier.ctaLabel}
                    </a>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
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
