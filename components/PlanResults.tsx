"use client";

import type { NutritionPlan } from "@/types/nutrition";
import { formatPlanForCopy } from "@/lib/format-plan-for-copy";
import { ui } from "@/components/ui";
import { useState } from "react";

type Props = {
  plan: NutritionPlan;
  onEdit: () => void;
  onReset: () => void;
};

export function PlanResults({ plan, onEdit, onReset }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = formatPlanForCopy(plan);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const s = plan.summary;

  return (
    <div>
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
            <dt className={ui.summaryDt}>Protein</dt>
            <dd className={ui.summaryDd}>{s.proteinG} g</dd>
          </div>
          <div>
            <dt className={ui.summaryDt}>Carbs</dt>
            <dd className={ui.summaryDd}>{s.carbsG} g</dd>
          </div>
          <div>
            <dt className={ui.summaryDt}>Fats</dt>
            <dd className={ui.summaryDd}>{s.fatsG} g</dd>
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
      </div>

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

      <div className={ui.actions}>
        <button type="button" className={ui.btnPrimary} onClick={onEdit}>
          Change my answers
        </button>
        <button
          type="button"
          className={ui.btnSecondary}
          onClick={handleCopy}
        >
          Copy this plan
        </button>
        <button type="button" className={ui.btnGhost} onClick={onReset}>
          Start over
        </button>
        {copied && (
          <span className={ui.copyFeedback} aria-live="polite">
            Saved to clipboard
          </span>
        )}
      </div>
    </div>
  );
}
