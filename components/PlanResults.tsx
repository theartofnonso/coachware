"use client";

import { GatedToolResult } from "@/components/lead/GatedToolResult";
import { ui } from "@/components/ui";
import { buildNutritionLeadPayload } from "@/lib/nutrition-lead-payload";
import type { NutritionPlan } from "@/types/nutrition";
import { useMemo } from "react";

type Props = {
  plan: NutritionPlan;
  onEdit: () => void;
  onReset: () => void;
};

function PlanResultPreview({ plan }: { plan: NutritionPlan }) {
  const s = plan.summary;
  return (
    <div className={ui.card}>
      <h2 className={ui.cardTitle}>Your day at a glance</h2>
      <dl className={ui.summaryGrid}>
        <div>
          <dt className={ui.summaryDt}>Calories</dt>
          <dd className={ui.summaryDd}>
            {s.dailyCalories.toLocaleString()}
          </dd>
        </div>
        <div>
          <dt className={ui.summaryDt}>Meals</dt>
          <dd className={ui.summaryDd}>{s.mealCount}</dd>
        </div>
        <div>
          <dt className={ui.summaryDt}>Goal</dt>
          <dd className={ui.summaryDd}>{s.goalLabel}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className={ui.summaryDt}>Today</dt>
          <dd className={ui.summaryDd}>
            <div>{s.trainingDayLabel}</div>
            <div className={ui.mutedSmall}>{s.trainingClockSummary}</div>
          </dd>
        </div>
      </dl>
      <p className={`${ui.hint} mt-4 border-t border-zinc-100 pt-4`}>
        Protein, carbs, and fats per meal, clock windows, plate ideas, and the
        full coaching note unlock below.
      </p>
    </div>
  );
}

function PlanResultGatedBody({ plan }: { plan: NutritionPlan }) {
  return (
    <>
      <div className={ui.card}>
        <h2 className={ui.cardTitle}>How to pace your meals</h2>
        <ul className={ui.bullets}>
          {plan.mealTimingLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Rough meal times</h2>
        <p className={`${ui.bodyText} mb-3`}>
          Ballpark windows so you can glance at the clock and decide. Move them
          if life happens.
        </p>
        <ul className={ui.bullets}>
          {plan.meals.map((m) => (
            <li key={m.index}>
              <strong>{m.displayLabel}:</strong> {m.approximateWindow}
            </li>
          ))}
        </ul>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Protein per meal</h2>
        <p className={ui.bodyText}>{plan.proteinGuidance}</p>
        <div className={ui.tableWrap}>
          <table className={ui.mealTable}>
            <thead>
              <tr>
                <th scope="col">Meal</th>
                <th scope="col" className={ui.tabular}>
                  Protein
                </th>
              </tr>
            </thead>
            <tbody>
              {plan.meals.map((m) => (
                <tr key={m.index}>
                  <td>{m.displayLabel}</td>
                  <td className={ui.tabular}>{m.proteinG} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Carbs per meal</h2>
        <p className={ui.bodyText}>{plan.carbGuidance}</p>
        <div className={ui.tableWrap}>
          <table className={ui.mealTable}>
            <thead>
              <tr>
                <th scope="col">Meal</th>
                <th scope="col" className={ui.tabular}>
                  Carbs
                </th>
              </tr>
            </thead>
            <tbody>
              {plan.meals.map((m) => (
                <tr key={m.index}>
                  <td>{m.displayLabel}</td>
                  <td className={ui.tabular}>{m.carbsG} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Fats per meal</h2>
        <p className={ui.bodyText}>{plan.fatGuidance}</p>
        <div className={ui.tableWrap}>
          <table className={ui.mealTable}>
            <thead>
              <tr>
                <th scope="col">Meal</th>
                <th scope="col" className={ui.tabular}>
                  Fats
                </th>
              </tr>
            </thead>
            <tbody>
              {plan.meals.map((m) => (
                <tr key={m.index}>
                  <td>{m.displayLabel}</td>
                  <td className={ui.tabular}>{m.fatsG} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>What a plate could look like</h2>
        <p className={`${ui.bodyText} mb-3`}>
          Ideas, not recipes. Trade in whatever you actually keep in the house.
        </p>
        <ul className={ui.bullets}>
          {plan.meals.map((m) => (
            <li key={m.index}>
              <strong>{m.displayLabel}:</strong> {m.sampleStructure}
            </li>
          ))}
        </ul>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Why we set it up this way</h2>
        <p className={ui.coachNote}>{plan.coachingNote}</p>
        {plan.warnings.length > 0 && (
          <div className={ui.warnings}>
            <strong>Worth knowing</strong>
            <ul>
              {plan.warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export function PlanResults({ plan, onEdit, onReset }: Props) {
  const leadPayload = useMemo(() => buildNutritionLeadPayload(plan), [plan]);

  return (
    <GatedToolResult
      toolId="nutrition-timing"
      resultPayload={leadPayload}
      lockedTeaser="Below you will find meal timing, macros split by meal, sample plates, and the full coaching note. Unlock to see everything in one place."
      unlockButtonLabel="Get the full plan"
      preview={<PlanResultPreview plan={plan} />}
      gated={<PlanResultGatedBody plan={plan} />}
      persistentActions={
        <>
          <button type="button" className={ui.btnPrimary} onClick={onEdit}>
            Change my answers
          </button>
          <button type="button" className={ui.btnGhost} onClick={onReset}>
            Start over
          </button>
        </>
      }
    />
  );
}
