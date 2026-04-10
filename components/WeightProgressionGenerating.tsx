"use client";

import { useEffect, useState } from "react";
import { ui } from "@/components/ui";

type Props = {
  onComplete: () => void;
};

const STEP_LABELS = [
  "Read your rep range, weight, and sets",
  "Compared each set to your target range",
  "Chose stay, add reps, go heavier, or lighten the load",
  "Lined up your next step and example path",
] as const;

const STEP_MS = [720, 780, 820, 640];
const FINISH_HOLD_MS = 480;
const STEP_COUNT = STEP_LABELS.length;

export function WeightProgressionGenerating({ onComplete }: Props) {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setCompletedSteps(STEP_COUNT);
      const id = window.setTimeout(onComplete, 100);
      return () => window.clearTimeout(id);
    }

    let cancelled = false;
    const timers: number[] = [];
    let t = 0;
    for (let i = 0; i < STEP_COUNT; i++) {
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
  }, [onComplete]);

  const pct = Math.min(100, (completedSteps / STEP_COUNT) * 100);

  const activeIndex =
    completedSteps < STEP_COUNT ? completedSteps : STEP_COUNT - 1;
  const liveLabel =
    completedSteps < STEP_COUNT
      ? `Working on: ${STEP_LABELS[activeIndex] ?? ""}`
      : "Your progression readout is ready";

  return (
    <div className={ui.card} role="status" aria-live="polite" aria-busy="true">
      <h2 className={ui.cardTitle}>Building your progression readout</h2>
      <p className={`${ui.bodyText} mb-5`}>
        Hang tight while we turn your numbers into a clear call for next
        session. Your inputs are already saved; this step is just so the result
        feels considered.
      </p>

      <p className="sr-only">{liveLabel}</p>

      <div className={ui.progressTrack} aria-hidden>
        <div className={ui.progressFill} style={{ width: `${pct}%` }} />
      </div>

      <ul className={`${ui.progressSteps} mt-6`}>
        {STEP_LABELS.map((label, i) => {
          const done = i < completedSteps;
          const active = i === completedSteps && completedSteps < STEP_COUNT;

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
