import { ui } from "@/components/ui";
import { LANDING_COACH_STATS } from "@/lib/landing-content";
import { getCoachMarketingStats } from "@/lib/coach-marketing-stats";

export async function CoachStatsSection() {
  const coachId = process.env.COACH_MARKETING_COACH_ID?.trim();
  if (!coachId) {
    return null;
  }

  const stats = await getCoachMarketingStats(coachId);
  if (!stats.success) {
    return null;
  }

  const hoursDisplay = stats.totalHours.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <section
      className={ui.landingSection}
      aria-labelledby="coach-stats-heading"
    >
      <p className={ui.landingSectionKicker}>{LANDING_COACH_STATS.kicker}</p>
      <h2 id="coach-stats-heading" className={ui.landingSectionTitle}>
        {LANDING_COACH_STATS.heading}
      </h2>
      <p className={`${ui.landingBody} mt-6 max-w-2xl`}>
        {LANDING_COACH_STATS.intro}
      </p>

      <dl className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
        <div className="rounded-lg border border-zinc-200 bg-white px-5 py-6 sm:px-6">
          <dt className={ui.summaryDt}>Clients I coach</dt>
          <dd className="mt-2 font-serif text-3xl font-semibold tabular-nums tracking-[-0.02em] text-zinc-950 sm:text-4xl">
            {stats.clientsCount.toLocaleString()}
          </dd>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white px-5 py-6 sm:px-6">
          <dt className={ui.summaryDt}>Sessions completed</dt>
          <dd className="mt-2 font-serif text-3xl font-semibold tabular-nums tracking-[-0.02em] text-zinc-950 sm:text-4xl">
            {stats.sessionsCount.toLocaleString()}
          </dd>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white px-5 py-6 sm:px-6 sm:col-span-1">
          <dt className={ui.summaryDt}>Hours in session</dt>
          <dd className="mt-2 font-serif text-3xl font-semibold tabular-nums tracking-[-0.02em] text-zinc-950 sm:text-4xl">
            {hoursDisplay}
          </dd>
        </div>
      </dl>
    </section>
  );
}
