import { ui } from "@/components/ui";

type Props = {
  kicker: string;
  title: string;
  lede: string;
  cardTitle: string;
  cardBody: string;
};

/**
 * Shown by Next.js while a tool route segment loads (same visual language as PlanGenerating).
 */
export function ToolRouteLoading({
  kicker,
  title,
  lede,
  cardTitle,
  cardBody,
}: Props) {
  return (
    <div className={ui.page}>
      <div className={ui.inner}>
        <header className={ui.header}>
          <p className={ui.kicker}>{kicker}</p>
          <h1 className={ui.title}>{title}</h1>
          <p className={ui.lede}>{lede}</p>
        </header>

        <div
          className={ui.card}
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <h2 className={ui.cardTitle}>{cardTitle}</h2>
          <p className={`${ui.bodyText} mb-5`}>{cardBody}</p>

          <div className={ui.progressTrack} aria-hidden>
            <div className="h-full w-[38%] rounded-full bg-zinc-950 motion-safe:animate-pulse" />
          </div>

          <ul className={`${ui.progressSteps} mt-6`} aria-hidden>
            {[0, 1, 2].map((i) => (
              <li
                key={i}
                className={`${ui.progressStepRow} ${ui.progressStepPending}`}
              >
                <span className={ui.progressMark}>
                  <span className="text-zinc-300">·</span>
                </span>
                <span className="h-4 max-w-md flex-1 rounded-md bg-zinc-200 motion-safe:animate-pulse" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
