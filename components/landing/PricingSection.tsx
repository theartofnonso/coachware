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

      <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:gap-8 lg:grid-cols-2 lg:items-stretch">
        {LANDING_PRICING.packages.map((pkg) => (
          <article
            key={`${pkg.title}-${pkg.price}`}
            className="relative flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] hover:border-zinc-300 hover:shadow-md sm:p-6"
          >
            <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-zinc-950">
              {pkg.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-600">
              {pkg.description}
            </p>
            <p className="mt-5 font-serif text-2xl font-semibold tabular-nums tracking-[-0.02em] text-zinc-950 sm:text-3xl">
              {pkg.price}
              <span className="text-base font-normal text-zinc-500 sm:text-lg">
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
        ))}
      </div>
    </section>
  );
}
