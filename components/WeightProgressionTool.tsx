"use client";

import type { FormEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { WeightProgressionGenerating } from "@/components/WeightProgressionGenerating";
import { ui } from "@/components/ui";
import { formatWeightProgressionForCopy } from "@/lib/format-weight-progression-copy";
import { computeWeightProgressionResult } from "@/lib/weight-progression-compute";
import {
  filterPositiveDecimalInput,
  filterPositiveIntInput,
} from "@/lib/numeric-input";
import { validateWeightProgressionInput } from "@/lib/weight-progression-validation";
import type { DifficultyOption, WeightUnit } from "@/types/weight-progression";

const DEFAULT_SET_COUNT = 3;

type FormState = {
  exerciseName: string;
  repLower: string;
  repUpper: string;
  workingWeight: string;
  unit: WeightUnit;
  setCount: number;
  repsPerSet: string[];
  difficulty: DifficultyOption;
};

const DIFFICULTY_OPTIONS: {
  value: DifficultyOption;
  label: string;
}[] = [
  { value: null, label: "No answer" },
  { value: "easy", label: "Felt easy" },
  { value: "challenging", label: "Felt challenging" },
  { value: "very_hard", label: "Felt very hard" },
  { value: "form_breakdown", label: "Form broke down" },
];

function emptyRepsSlots(count: number): string[] {
  return Array.from({ length: 5 }, (_, i) => (i < count ? "" : ""));
}

const DEFAULT_FORM: FormState = {
  exerciseName: "",
  repLower: "8",
  repUpper: "10",
  workingWeight: "",
  unit: "kg",
  setCount: DEFAULT_SET_COUNT,
  repsPerSet: emptyRepsSlots(DEFAULT_SET_COUNT),
  difficulty: null,
};

export function WeightProgressionTool() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!submitted) {
      return null;
    }
    const v = validateWeightProgressionInput({
      exerciseName: form.exerciseName,
      repLower: form.repLower,
      repUpper: form.repUpper,
      workingWeight: form.workingWeight,
      unit: form.unit,
      setCount: form.setCount,
      repsPerSet: form.repsPerSet,
      difficulty: form.difficulty,
    });
    if (!v.ok || !v.input) {
      return null;
    }
    return computeWeightProgressionResult(v.input);
  }, [form, submitted]);

  const finishGeneration = useCallback(() => {
    setIsGenerating(false);
    setSubmitted(true);
  }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSetCount(next: number) {
    setForm((prev) => ({
      ...prev,
      setCount: next,
      repsPerSet: prev.repsPerSet.map((r, i) => (i < next ? r : "")),
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validateWeightProgressionInput({
      exerciseName: form.exerciseName,
      repLower: form.repLower,
      repUpper: form.repUpper,
      workingWeight: form.workingWeight,
      unit: form.unit,
      setCount: form.setCount,
      repsPerSet: form.repsPerSet,
      difficulty: form.difficulty,
    });
    setErrors(v.errors);
    if (!v.ok) {
      setSubmitted(false);
      setIsGenerating(false);
      return;
    }
    setErrors([]);
    setSubmitted(false);
    setIsGenerating(true);
  }

  const handleEdit = useCallback(() => {
    setSubmitted(false);
    setIsGenerating(false);
  }, []);

  const handleReset = useCallback(() => {
    setForm(DEFAULT_FORM);
    setErrors([]);
    setSubmitted(false);
    setIsGenerating(false);
  }, []);

  async function handleCopy() {
    if (!result) {
      return;
    }
    const text = formatWeightProgressionForCopy(result);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={ui.page}>
      <div className={ui.inner}>
        <header className={ui.header}>
          <p className={ui.kicker}>Strength training</p>
          <h1 className={ui.title}>Know when to go heavier</h1>
          <p className={ui.lede}>
            Use rep ranges to decide whether to hold, add reps, or increase the
            load. No spreadsheets, just a clear call for your next session.
          </p>
        </header>

        {isGenerating ? (
          <WeightProgressionGenerating onComplete={finishGeneration} />
        ) : !submitted || !result ? (
          <form onSubmit={handleSubmit}>
              {errors.length > 0 && (
                <div className={ui.errorBox} role="alert">
                  <strong>Check these fields</strong>
                  <ul className="mt-1.5 list-disc pl-[1.1rem]">
                    {errors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={ui.card}>
                <h2 className={ui.cardTitle}>Your lift</h2>
                <div className={ui.field}>
                  <label className={ui.label} htmlFor="wp-exercise">
                    Exercise name
                  </label>
                  <input
                    id="wp-exercise"
                    className={ui.input}
                    autoComplete="off"
                    placeholder="e.g. RDL, Goblet squat, leg press"
                    value={form.exerciseName}
                    onChange={(e) => set("exerciseName", e.target.value)}
                  />
                </div>
              </div>

              <div className={ui.card}>
                <h2 className={ui.cardTitle}>Target rep range</h2>
                <div className={ui.grid2}>
                  <div className={ui.field}>
                    <label className={ui.label} htmlFor="wp-rep-low">
                      Lower bound
                    </label>
                    <input
                      id="wp-rep-low"
                      className={ui.input}
                      inputMode="numeric"
                      autoComplete="off"
                      spellCheck={false}
                      value={form.repLower}
                      onChange={(e) =>
                        set("repLower", filterPositiveIntInput(e.target.value))
                      }
                    />
                  </div>
                  <div className={ui.field}>
                    <label className={ui.label} htmlFor="wp-rep-high">
                      Upper bound
                    </label>
                    <input
                      id="wp-rep-high"
                      className={ui.input}
                      inputMode="numeric"
                      autoComplete="off"
                      spellCheck={false}
                      value={form.repUpper}
                      onChange={(e) =>
                        set("repUpper", filterPositiveIntInput(e.target.value))
                      }
                    />
                  </div>
                </div>
                <p className={ui.hint}>
                  Example: 8 to 10, 10 to 12, or 6 to 8. This is the lane you
                  are trying to own.
                </p>
              </div>

              <div className={ui.card}>
                <h2 className={ui.cardTitle}>Current working weight</h2>
                <div className={ui.field}>
                  <label className={ui.label} htmlFor="wp-weight">
                    Weight
                  </label>
                  <input
                    id="wp-weight"
                    className={ui.input}
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    value={form.workingWeight}
                    onChange={(e) =>
                      set(
                        "workingWeight",
                        filterPositiveDecimalInput(e.target.value),
                      )
                    }
                  />
                </div>
                <fieldset className={`${ui.field} min-w-0 border-0 p-0`}>
                  <legend className={ui.label}>Unit</legend>
                  <div className={ui.radioGroup}>
                    {(
                      [
                        { value: "kg" as const, label: "kg" },
                        { value: "lb" as const, label: "lb" },
                      ] as const
                    ).map((o) => (
                      <label key={o.value} className={ui.radioRow}>
                        <input
                          type="radio"
                          name="unit"
                          value={o.value}
                          checked={form.unit === o.value}
                          onChange={() => set("unit", o.value)}
                          className={ui.radioInput}
                        />
                        <span className={ui.radioText}>{o.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className={ui.card}>
                <h2 className={ui.cardTitle}>Last session</h2>
                <fieldset className={`${ui.field} min-w-0 border-0 p-0`}>
                  <legend className={ui.label}>Number of sets</legend>
                  <div className={ui.radioGroup}>
                    {([1, 2, 3, 4, 5] as const).map((n) => (
                      <label key={n} className={ui.radioRow}>
                        <input
                          type="radio"
                          name="setCount"
                          value={String(n)}
                          checked={form.setCount === n}
                          onChange={() => handleSetCount(n)}
                          className={ui.radioInput}
                        />
                        <span className={ui.radioText}>
                          {n} set{n === 1 ? "" : "s"}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className={ui.field}>
                  <p className={ui.label}>Reps per set</p>
                  <div className={ui.grid2}>
                    {Array.from({ length: form.setCount }, (_, i) => (
                      <div key={i} className={ui.field}>
                        <label
                          className={`${ui.label} text-zinc-500`}
                          htmlFor={`wp-reps-${i}`}
                        >
                          Set {i + 1}
                        </label>
                        <input
                          id={`wp-reps-${i}`}
                          className={ui.input}
                          inputMode="numeric"
                          autoComplete="off"
                          spellCheck={false}
                          value={form.repsPerSet[i] ?? ""}
                          onChange={(e) => {
                            const next = [...form.repsPerSet];
                            next[i] = filterPositiveIntInput(e.target.value);
                            set("repsPerSet", next);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <fieldset className={`${ui.field} min-w-0 border-0 p-0`}>
                  <legend className={ui.label}>
                    Overall, how did this lift feel? (optional)
                  </legend>
                  <p className={`${ui.hint} -mt-1 mb-3`}>
                    This is one honest read for the whole exercise, not a rating
                    per set. Reps you entered above already show how each set
                    went. We only use this to nudge the call when reps alone are
                    ambiguous (for example, form slipped or the whole thing felt
                    brutal).
                  </p>
                  <div className={ui.radioGroup}>
                    {DIFFICULTY_OPTIONS.map((o) => (
                      <label key={String(o.value)} className={ui.radioRow}>
                        <input
                          type="radio"
                          name="difficulty"
                          value={o.value === null ? "none" : o.value}
                          checked={
                            (o.value === null && form.difficulty === null) ||
                            form.difficulty === o.value
                          }
                          onChange={() => set("difficulty", o.value)}
                          className={ui.radioInput}
                        />
                        <span className={ui.radioText}>{o.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className={ui.actions}>
                <button type="submit" className={ui.btnPrimary}>
                  Calculate
                </button>
                <button
                  type="button"
                  className={ui.btnGhost}
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className={ui.card}>
                <h2 className={ui.cardTitle}>Progression decision</h2>
                <div className={ui.decisionOutcome}>
                  <p className={ui.decisionOutcomeText}>
                    {result.decisionHeadline}
                  </p>
                  {result.suggestedWeightLabel !== null && (
                    <p className={`${ui.bodyText} mt-3 text-zinc-600`}>
                      Suggested load to try:{" "}
                      <span className="font-medium text-zinc-950">
                        {result.suggestedWeightLabel}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className={ui.card}>
                <h2 className={ui.cardTitle}>Why this decision was made</h2>
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

              <div className={ui.actions}>
                <button
                  type="button"
                  className={ui.btnPrimary}
                  onClick={handleEdit}
                >
                  Edit inputs
                </button>
                <button
                  type="button"
                  className={ui.btnSecondary}
                  onClick={handleCopy}
                >
                  Copy result
                </button>
                <button
                  type="button"
                  className={ui.btnGhost}
                  onClick={handleReset}
                >
                  Reset
                </button>
                {copied && (
                  <span className={ui.copyFeedback} aria-live="polite">
                    Saved to clipboard
                  </span>
                )}
              </div>
            </>
          )}
      </div>
    </div>
  );
}
