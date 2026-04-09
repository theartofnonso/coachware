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
        <h2 className={ui.cardTitle}>Daily structure summary</h2>
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
            <dt className={ui.summaryDt}>Training</dt>
            <dd className={ui.summaryDd}>
              <div>{s.trainingTypeLabel}</div>
              <div className={ui.mutedSmall}>{s.trainingTimeLabel}</div>
            </dd>
          </div>
        </dl>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Meal timing</h2>
        <ul className={ui.bullets}>
          {plan.mealTimingLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Protein distribution</h2>
        <p className={ui.bodyText}>{plan.proteinGuidance}</p>
        <div className={ui.tableWrap}>
          <table className={ui.mealTable}>
            <thead>
              <tr>
                <th scope="col">Meal</th>
                <th scope="col" className={ui.tabular}>
                  Protein
                </th>
                {plan.keepItSimple && (
                  <>
                    <th scope="col" className={ui.tabular}>
                      Carbs
                    </th>
                    <th scope="col" className={ui.tabular}>
                      Fats
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {plan.meals.map((m) => (
                <tr key={m.index}>
                  <td>{m.displayLabel}</td>
                  <td className={ui.tabular}>{m.proteinG} g</td>
                  {plan.keepItSimple && (
                    <>
                      <td className={ui.tabular}>{m.carbsG} g</td>
                      <td className={ui.tabular}>{m.fatsG} g</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Carb placement</h2>
        <p className={ui.bodyText}>{plan.carbGuidance}</p>
        {!plan.keepItSimple && (
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
        )}
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Fat placement</h2>
        <p className={ui.bodyText}>{plan.fatGuidance}</p>
        {!plan.keepItSimple && (
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
        )}
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Sample meal structure</h2>
        <p className={`${ui.bodyText} mb-3`}>
          Placeholders — swap in foods you already eat.
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
        <h2 className={ui.cardTitle}>Coaching note</h2>
        <p className={ui.coachNote}>{plan.coachingNote}</p>
        {plan.warnings.length > 0 && (
          <div className={ui.warnings}>
            <strong>Heads-up</strong>
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
          Edit inputs
        </button>
        <button
          type="button"
          className={ui.btnSecondary}
          onClick={handleCopy}
        >
          Copy plan
        </button>
        <button type="button" className={ui.btnGhost} onClick={onReset}>
          Reset
        </button>
        {copied && (
          <span className={ui.copyFeedback} aria-live="polite">
            Copied
          </span>
        )}
      </div>
    </div>
  );
}
