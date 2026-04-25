import { ui } from "@/components/ui";
import { LANDING_PRICING, LANDING_VOLUME_PACKAGES } from "@/lib/landing-content";

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 mt-5 list-none space-y-2.5 border-t border-white/20 p-0 pt-5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2 text-[0.9375rem] leading-snug text-white/85"
        >
          <span
            className="mt-2 size-1 shrink-0 rounded-full bg-white/70"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function VolumeCoachingPackagesSection() {
  const sharedBenefits = (LANDING_PRICING.packages[0]?.features ?? []).filter(
    (feature) => feature !== "2 PT sessions per week",
  );

  return (
    <section
      className={ui.landingSection}
      aria-labelledby="volume-packages-heading"
    >
      <h2
        id="volume-packages-heading"
        className={ui.landingSectionTitle}
      >
        {LANDING_VOLUME_PACKAGES.heading}
      </h2>
      <p className={`${ui.landingBody} mt-4 max-w-2xl`}>
        {LANDING_VOLUME_PACKAGES.subheading}
      </p>

      <div className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-2">
        {LANDING_VOLUME_PACKAGES.packages.map((pkg) => (
          <article
            key={pkg.title}
            className="volume-package-card flex flex-col rounded-xl border border-white/20 p-5 transition-opacity hover:opacity-95 sm:p-6"
          >
            <h3 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-white">
              {pkg.title}
            </h3>
            <p className="mt-4 font-serif text-4xl font-semibold tabular-nums tracking-[-0.03em] text-white">
              {pkg.price}
            </p>
            <FeatureList items={sharedBenefits} />
            <a
              href={pkg.checkoutHref}
              className="volume-package-cta mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-white bg-white px-[1.1rem] py-2.5 text-sm font-semibold tracking-wide text-zinc-950 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {pkg.ctaLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
