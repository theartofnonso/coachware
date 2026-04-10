import { ui } from "@/components/ui";
import { LANDING_GUARANTEE } from "@/lib/landing-content";

export function GuaranteeSection() {
  return (
    <section
      id="guarantee"
      className={ui.landingSection}
      aria-labelledby="guarantee-heading"
    >
      <p className={ui.landingSectionKicker}>{LANDING_GUARANTEE.kicker}</p>
      <h2 id="guarantee-heading" className={ui.landingSectionTitle}>
        {LANDING_GUARANTEE.heading}
      </h2>
      <blockquote className="mt-8 max-w-2xl border-l-2 border-zinc-950 pl-6 sm:pl-8">
        <p
          className={`${ui.coachNote} font-serif text-xl leading-snug sm:text-2xl`}
        >
          {LANDING_GUARANTEE.body}
        </p>
      </blockquote>
    </section>
  );
}
