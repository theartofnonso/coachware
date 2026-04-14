"use client";

import { useEffect, useMemo, useState } from "react";
import { ui } from "@/components/ui";

type Props = {
  isRestDay: boolean;
  onComplete: () => void;
};

function stepLabels(isRestDay: boolean): string[] {
  return [
    "I checked your calorie and macro targets",
    "I laid out your meal rhythm",
    isRestDay
      ? "I balanced the day for a rest day"
      : "I anchored timing around your workout",
    "I assembled your plan",
  ];
}

const STEP_MS = [720, 780, 820, 640];
const FINISH_HOLD_MS = 480;

export function PlanGenerating({ isRestDay, onComplete }: Props) {
  const steps = useMemo(() => stepLabels(isRestDay), [isRestDay]);
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setCompletedSteps(steps.length);
      const id = window.setTimeout(onComplete, 100);
      return () => window.clearTimeout(id);
    }

    let cancelled = false;
    const timers: number[] = [];
    let t = 0;
    for (let i = 0; i < steps.length; i++) {
      t += STEP_MS[i] ?? 700;
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) {
            setCompletedSteps(i + 1);
          }
        }, t),
      );
    }
    timers.push(
      window.setTimeout(() => {
        if (!cancelled) {
          onComplete();
        }
      }, t + FINISH_HOLD_MS),
    );

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [onComplete, steps.length]);

  const pct =
    steps.length === 0 ? 100 : Math.min(100, (completedSteps / steps.length) * 100);

  const activeIndex =
    completedSteps < steps.length ? completedSteps : steps.length - 1;
  const liveLabel =
    completedSteps < steps.length
      ? `Working on: ${steps[activeIndex] ?? ""}`
      : "Your plan is ready";

  return (
    <div className={ui.card} role="status" aria-live="polite" aria-busy="true">
      <h2 className={ui.cardTitle}>Building your layout</h2>
      <p className={`${ui.bodyText} mb-5`}>
        Give me a moment while I line things up. Your answers are already in;
        I'm just organizing them so the plan reads clearly.
      </p>

      <p className="sr-only">{liveLabel}</p>

      <div className={ui.progressTrack} aria-hidden>
        <div className={ui.progressFill} style={{ width: `${pct}%` }} />
      </div>

      <ul className={`${ui.progressSteps} mt-6`}>
        {steps.map((label, i) => {
          const done = i < completedSteps;
          const active = i === completedSteps && completedSteps < steps.length;

          return (
            <li
              key={label}
              className={`${ui.progressStepRow} ${
                done
                  ? ui.progressStepDone
                  : active
                    ? ui.progressStepActive
                    : ui.progressStepPending
              }`}
            >
              <span
                className={`${ui.progressMark} ${
                  done ? ui.progressMarkDone : active ? ui.progressMarkActive : ""
                }`}
                aria-hidden
              >
                {done ? (
                  "✓"
                ) : active ? (
                  <span className={ui.progressSpinner} />
                ) : (
                  <span className="text-zinc-300">·</span>
                )}
              </span>
              <span>{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
