import { ui } from "@/components/ui";
import { LANDING_DIFFERENTIATOR } from "@/lib/landing-content";

export function DifferentiatorSection() {
  return (
    <section
      id="approach"
      className={ui.landingSection}
      aria-labelledby="differentiator-heading"
    >
      <p className={ui.landingSectionKicker}>{LANDING_DIFFERENTIATOR.kicker}</p>
      <h2 id="differentiator-heading" className={ui.landingSectionTitle}>
        {LANDING_DIFFERENTIATOR.heading}
      </h2>
      <blockquote className="mt-8 max-w-2xl border-l-2 border-zinc-950 pl-6 sm:pl-8">
        <p
          className={`${ui.coachNote} font-serif text-xl leading-snug sm:text-2xl`}
        >
          {LANDING_DIFFERENTIATOR.quote}
        </p>
      </blockquote>
    </section>
  );
}
