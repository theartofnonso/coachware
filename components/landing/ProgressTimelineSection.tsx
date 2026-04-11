import { TimelineList } from "@/components/TimelineList";
import { ui } from "@/components/ui";
import { LANDING_PROGRESS } from "@/lib/landing-content";

export function ProgressTimelineSection() {
  return (
    <section
      id="progress"
      className={ui.landingSection}
      aria-labelledby="progress-heading"
    >
      <p className={ui.landingSectionKicker}>{LANDING_PROGRESS.kicker}</p>
      <h2 id="progress-heading" className={ui.landingSectionTitle}>
        {LANDING_PROGRESS.heading}
      </h2>
      <p className={`${ui.landingBody} mt-6 max-w-2xl`}>
        {LANDING_PROGRESS.intro}
      </p>

      <TimelineList
        steps={LANDING_PROGRESS.steps}
        className="mt-12 max-w-2xl"
        stepKey={(step) => step.phase}
      />
    </section>
  );
}
