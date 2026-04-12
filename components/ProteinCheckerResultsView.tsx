"use client";

import { GatedToolResult } from "@/components/lead/GatedToolResult";
import { ui } from "@/components/ui";
import { buildProteinLeadPayload } from "@/lib/protein-lead-payload";
import type {
  ProteinCheckerInput,
  ProteinCheckerResult,
} from "@/types/protein-checker";
import { useMemo } from "react";

type Props = {
  input: ProteinCheckerInput;
  result: ProteinCheckerResult;
  onEdit: () => void;
  onReset: () => void;
};

function ProteinPreview({
  input,
  result,
}: {
  input: ProteinCheckerInput;
  result: ProteinCheckerResult;
}) {
  return (
    <div className={ui.card}>
      <h2 className={ui.cardTitle}>Your check</h2>
      {input.foodName && (
        <p className={`${ui.bodyText} mb-4 text-zinc-600`}>
          <span className="text-zinc-500">Food: </span>
          {input.foodName}
        </p>
      )}
      <div className={ui.decisionOutcome}>
        <p className={ui.decisionOutcomeText}>{result.classificationHeadline}</p>
      </div>
      <p className={`${ui.bodyText} mt-6 text-zinc-950`}>
        <span className={ui.summaryDt}>Protein per 100 calories: </span>
        <span className="font-serif text-xl font-semibold tabular-nums tracking-[-0.02em] sm:text-2xl">
          {result.densityGramsDisplay}
        </span>
      </p>
      <p className={`${ui.hint} mt-4 border-t border-zinc-100 pt-4`}>
        Enter your email below to see the full explanation, a simple way to
        improve this choice if needed, and a short coaching note.
      </p>
    </div>
  );
}

function ProteinGatedBody({ result }: { result: ProteinCheckerResult }) {
  return (
    <>
      <div className={ui.card}>
        <h2 className={ui.cardTitle}>What this means</h2>
        <p className={ui.bodyText}>{result.explanation}</p>
      </div>
      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Suggestion</h2>
        <p className={ui.bodyText}>{result.improvement}</p>
      </div>
      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Coaching note</h2>
        <p className={ui.coachNote}>{result.coachingNote}</p>
      </div>
    </>
  );
}

export function ProteinCheckerResultsView({
  input,
  result,
  onEdit,
  onReset,
}: Props) {
  const leadPayload = useMemo(
    () => buildProteinLeadPayload(input, result),
    [input, result],
  );

  return (
    <GatedToolResult
      toolId="protein-checker"
      resultPayload={leadPayload}
      lockedTeaser="Unlock the explanation, practical suggestion, and coaching note."
      unlockButtonLabel="Enter your email to unlock full result"
      preview={<ProteinPreview input={input} result={result} />}
      gated={<ProteinGatedBody result={result} />}
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
