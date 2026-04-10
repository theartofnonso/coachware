"use client";

import { GatedToolResult } from "@/components/lead/GatedToolResult";
import { ui } from "@/components/ui";
import { GOAL_LABELS } from "@/constants/labels";
import { buildCaloriesLeadPayload } from "@/lib/calories-lead-payload";
import type {
  CaloriesCalculatorInput,
  CaloriesCalculatorResult,
  CaloriesGoal,
} from "@/types/calories-calculator";
import { useMemo } from "react";

type Props = {
  input: CaloriesCalculatorInput;
  result: CaloriesCalculatorResult;
  onEdit: () => void;
  onReset: () => void;
};

function formatKcal(n: number): string {
  return `${n.toLocaleString("en-GB")} kcal`;
}

function CaloriesPreview({
  result,
}: {
  result: CaloriesCalculatorResult;
}) {
  return (
    <div className={ui.card}>
      <h2 className={ui.cardTitle}>Your numbers</h2>
      <p className={`${ui.summaryDt} mb-1`}>Estimated maintenance calories</p>
      <p className="mb-1 font-serif text-2xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-3xl">
        {formatKcal(result.maintenanceCalories)}
      </p>
      <p className={`${ui.bodyText} text-zinc-600`}>
        That is roughly what you would eat to stay near your current weight
        with the activity you described.
      </p>
      <div className="mt-6 border-t border-zinc-100 pt-5">
        <p className={`${ui.summaryDt} mb-1`}>
          Starting target ({GOAL_LABELS[result.goal]})
        </p>
        <p className="font-serif text-xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-2xl">
          {formatKcal(result.recommendedCalories)} / day
        </p>
        <p className={`${ui.hint} mt-2`}>
          A practical daily budget to begin with. Unlock below for the full
          walkthrough, other reference targets, and a short coaching note.
        </p>
      </div>
    </div>
  );
}

function targetEmphasis(
  goal: CaloriesGoal,
  key: "maint" | "fat" | "recomp" | "muscle",
): boolean {
  if (goal === "fat_loss") {
    return key === "fat";
  }
  if (goal === "recomposition") {
    return key === "recomp";
  }
  if (goal === "muscle_gain") {
    return key === "muscle";
  }
  return false;
}

function CaloriesGatedBody({
  result,
}: {
  result: CaloriesCalculatorResult;
}) {
  const g = result.goal;

  return (
    <>
      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Your summary</h2>
        <div className="space-y-3">
          {result.explanationParagraphs.map((p) => (
            <p key={p} className={ui.bodyText}>
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Reference targets</h2>
        <p className={`${ui.bodyText} mb-4 text-zinc-600`}>
          We highlighted the line that matches what you said you want. The rest
          are there if your plans change later.
        </p>
        <ul className="m-0 list-none space-y-3 p-0">
          <li className="rounded-lg border border-zinc-200 bg-white px-4 py-3.5">
            <p className={ui.summaryDt}>Maintenance</p>
            <p className="m-0 text-base font-medium text-zinc-950">
              {formatKcal(result.maintenanceCalories)} / day
            </p>
          </li>
          <li
            className={`rounded-lg border px-4 py-3.5 ${
              targetEmphasis(g, "fat")
                ? "border-2 border-zinc-950 bg-zinc-50"
                : "border-zinc-200 bg-white"
            }`}
          >
            <p className={ui.summaryDt}>Fat loss style</p>
            <p className="m-0 text-base font-medium text-zinc-950">
              {formatKcal(result.fatLossTarget)} / day
            </p>
            <p className={`${ui.hint} mt-1`}>
              A moderate deficit you can stick with.
            </p>
          </li>
          <li
            className={`rounded-lg border px-4 py-3.5 ${
              targetEmphasis(g, "recomp")
                ? "border-2 border-zinc-950 bg-zinc-50"
                : "border-zinc-200 bg-white"
            }`}
          >
            <p className={ui.summaryDt}>{GOAL_LABELS.recomposition}</p>
            <p className="m-0 text-base font-medium text-zinc-950">
              {formatKcal(result.balanceTarget)} / day
            </p>
            <p className={`${ui.hint} mt-1`}>
              Mostly steady or slow change, with a small dip from maintenance.
            </p>
          </li>
          <li
            className={`rounded-lg border px-4 py-3.5 ${
              targetEmphasis(g, "muscle")
                ? "border-2 border-zinc-950 bg-zinc-50"
                : "border-zinc-200 bg-white"
            }`}
          >
            <p className={ui.summaryDt}>Muscle gain style</p>
            <p className="m-0 text-base font-medium text-zinc-950">
              {formatKcal(result.muscleGainTarget)} / day
            </p>
            <p className={`${ui.hint} mt-1`}>A modest surplus, not a feast.</p>
          </li>
        </ul>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Coaching note</h2>
        <p className={ui.coachNote}>{result.coachingNote}</p>
      </div>
    </>
  );
}

export function CaloriesCalculatorResultsView({
  input,
  result,
  onEdit,
  onReset,
}: Props) {
  const leadPayload = useMemo(
    () => buildCaloriesLeadPayload(input, result),
    [input, result],
  );

  return (
    <GatedToolResult
      toolId="calories-calculator"
      resultPayload={leadPayload}
      lockedTeaser="The rest of your readout is behind this step: the full summary, other reference targets, and a coaching note. Unlock when you are ready to read it all in one place."
      unlockButtonLabel="Unlock full breakdown"
      preview={<CaloriesPreview result={result} />}
      gated={<CaloriesGatedBody result={result} />}
      persistentActions={
        <>
          <button type="button" className={ui.btnPrimary} onClick={onEdit}>
            Edit inputs
          </button>
          <button type="button" className={ui.btnGhost} onClick={onReset}>
            Reset
          </button>
        </>
      }
    />
  );
}
