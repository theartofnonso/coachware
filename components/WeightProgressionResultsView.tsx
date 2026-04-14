"use client";

import { GatedToolResult } from "@/components/lead/GatedToolResult";
import { ui } from "@/components/ui";
import { buildWeightLeadPayload } from "@/lib/weight-lead-payload";
import type { WeightProgressionResult } from "@/types/weight-progression";
import { useMemo } from "react";

type Props = {
  result: WeightProgressionResult;
  onEdit: () => void;
  onReset: () => void;
};

function WeightResultPreview({ result }: { result: WeightProgressionResult }) {
  return (
    <div className={ui.card}>
      <h2 className={ui.cardTitle}>Progression decision</h2>
      <div className={ui.decisionOutcome}>
        <p className={ui.decisionOutcomeText}>{result.decisionHeadline}</p>
        {result.suggestedWeightLabel !== null && (
          <p className={`${ui.bodyText} mt-3 text-zinc-600`}>
            Suggested load to try:{" "}
            <span className="font-medium text-zinc-950">
              {result.suggestedWeightLabel}
            </span>
          </p>
        )}
      </div>
      <p className={`${ui.hint} mt-4 border-t border-zinc-100 pt-4`}>
        Unlock for my full why, your next session step, example weeks, and a
        short note from me.
      </p>
    </div>
  );
}

function WeightResultGatedBody({ result }: { result: WeightProgressionResult }) {
  return (
    <>
      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Why I landed here</h2>
        <div className="space-y-3">
          {result.whyParagraphs.map((p) => (
            <p key={p} className={ui.bodyText}>
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Suggested next step</h2>
        <p className={ui.bodyText}>{result.nextStep}</p>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Example progression path</h2>
        <ul className={ui.bullets}>
          {result.examplePath.map((step) => (
            <li key={`${step.label}-${step.detail}`}>
              <strong>{step.label}:</strong> {step.detail}
            </li>
          ))}
        </ul>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Coaching note</h2>
        <p className={ui.coachNote}>{result.coachingNote}</p>
      </div>
    </>
  );
}

export function WeightProgressionResultsView({
  result,
  onEdit,
  onReset,
}: Props) {
  const leadPayload = useMemo(
    () => buildWeightLeadPayload(result),
    [result],
  );

  return (
    <GatedToolResult
      toolId="weight-progression"
      resultPayload={leadPayload}
      lockedTeaser="The headline above is yours. Below is my reasoning, your next session script, example weeks, and a note from me. Unlock to read the full recommendation."
      unlockButtonLabel="See the full recommendation"
      preview={<WeightResultPreview result={result} />}
      gated={<WeightResultGatedBody result={result} />}
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
