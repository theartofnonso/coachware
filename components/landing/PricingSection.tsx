import { IntroOfferCountdown } from "@/components/IntroOfferCountdown";
import { ui } from "@/components/ui";
import { LANDING_PRICING } from "@/lib/landing-content";

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
  const { introOffer, solo, coaching } = LANDING_PRICING;

  return (
    <section
      id="pricing"
      className={ui.landingSection}
      aria-label="Pricing"
    >
      <p className={ui.landingSectionKicker}>{LANDING_PRICING.kicker}</p>

      <div
        className="mt-6 overflow-hidden rounded-2xl border-2 border-zinc-950 bg-zinc-950 text-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)]"
        role="region"
        aria-labelledby="intro-offer-heading"
      >
        <div className="relative px-6 py-8 sm:px-8 sm:py-10">
          <div
            className="pointer-events-none absolute -right-16 -top-24 size-56 rounded-full bg-white/[0.06] blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-12 size-48 rounded-full bg-white/[0.04] blur-2xl"
            aria-hidden
          />

          <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            {introOffer.kicker}
          </p>
          <h2
            id="intro-offer-heading"
            className="relative mt-3 font-serif text-[1.75rem] font-semibold uppercase leading-[1.1] tracking-[0.04em] text-white sm:text-4xl sm:tracking-[0.06em]"
          >
            {introOffer.headline}
          </h2>
          <p className="relative mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-[1.0625rem]">
            {introOffer.body}
          </p>

          <IntroOfferCountdown variant="card" />

          <div className="relative mt-8 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div>
              <p className="font-serif text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-white sm:text-5xl">
                {introOffer.price}
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-400">
                {introOffer.priceCaption}
              </p>
            </div>
            <a
              href={introOffer.paymentHref}
              className="inline-flex w-full shrink-0 items-center justify-center rounded-sm border-2 border-white bg-white px-6 py-3.5 text-center text-sm font-semibold tracking-wide text-zinc-950 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-[12rem]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {introOffer.ctaLabel}
            </a>
          </div>
        </div>
      </div>

      <h2
        id="pricing-heading"
        className={`${ui.landingSectionTitle} mt-14 sm:mt-16`}
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
                  key={tier.price}
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
          href={solo.paymentHref}
          className={`${ui.btnPrimary} w-full shrink-0 sm:w-auto`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {LANDING_PRICING.ctaLabel}
        </a>
      </div>
    </section>
  );
}
