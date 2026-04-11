export type TimelineStep = {
  phase: string;
  description: string;
};

type Props = {
  steps: readonly TimelineStep[];
  className?: string;
  /** Use when `phase` might repeat across steps */
  stepKey?: (step: TimelineStep, index: number) => string;
};

export function TimelineList({ steps, className = "", stepKey }: Props) {
  const lastIndex = steps.length - 1;

  return (
    <ol className={`m-0 list-none p-0 ${className}`.trim()}>
      {steps.map((step, index) => (
        <li
          key={
            stepKey
              ? stepKey(step, index)
              : `${index}-${step.phase}`
          }
          className="relative flex gap-5 sm:gap-6"
        >
          <div
            className="flex w-5 shrink-0 flex-col items-center sm:w-6"
            aria-hidden
          >
            <span className="mt-1.5 size-2.5 shrink-0 rounded-full border-2 border-zinc-950 bg-zinc-50 sm:mt-2 sm:size-3" />
            {index < lastIndex ? (
              <span className="mt-2 min-h-[3.5rem] w-px flex-1 bg-zinc-200 sm:min-h-[4.5rem]" />
            ) : null}
          </div>
          <div
            className={`min-w-0 ${index < lastIndex ? "pb-10 sm:pb-12" : "pb-0"}`}
          >
            <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-2xl">
              {step.phase}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-zinc-600 sm:text-base">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
