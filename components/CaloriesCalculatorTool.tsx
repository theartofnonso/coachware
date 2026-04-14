"use client";

import type { FormEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { CaloriesCalculatorGenerating } from "@/components/CaloriesCalculatorGenerating";
import { CaloriesCalculatorResultsView } from "@/components/CaloriesCalculatorResultsView";
import { ui } from "@/components/ui";
import { computeCaloriesResult } from "@/lib/calories-calculator-compute";
import type { CaloriesFormRaw } from "@/lib/calories-calculator-validation";
import { validateCaloriesForm } from "@/lib/calories-calculator-validation";
import {
  filterPositiveDecimalInput,
  filterPositiveIntInput,
} from "@/lib/numeric-input";
import { GOAL_HINTS, GOAL_LABELS } from "@/constants/labels";
import type {
  CaloriesActivityLevel,
  CaloriesGoal,
  CaloriesSex,
} from "@/types/calories-calculator";

const DEFAULT_FORM: CaloriesFormRaw = {
  sex: "male",
  age: "",
  heightMode: "cm",
  heightCm: "",
  heightFeet: "",
  heightInches: "",
  weight: "",
  weightUnit: "kg",
  activityLevel: "moderate",
  goal: "recomposition",
  trainingDaysPerWeek: "",
};

const ACTIVITY_OPTIONS: {
  value: CaloriesActivityLevel;
  label: string;
  hint: string;
}[] = [
  {
    value: "sedentary",
    label: "Mostly sitting / not very active",
    hint: "Desk work, errands, little planned exercise.",
  },
  {
    value: "light",
    label: "Lightly active",
    hint: "On your feet part of the day, or one to three easy sessions a week.",
  },
  {
    value: "moderate",
    label: "Moderately active",
    hint: "Regular training or an active job most days.",
  },
  {
    value: "very",
    label: "Very active",
    hint: "Hard training most days, or a very physical daily routine.",
  },
];

const GOAL_ORDER = [
  "fat_loss",
  "recomposition",
  "muscle_gain",
] as const satisfies readonly CaloriesGoal[];

export function CaloriesCalculatorTool() {
  const [form, setForm] = useState<CaloriesFormRaw>(DEFAULT_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const validated = useMemo(() => {
    if (!submitted) {
      return null;
    }
    return validateCaloriesForm(form);
  }, [form, submitted]);

  const result = useMemo(() => {
    if (!validated?.ok) {
      return null;
    }
    return computeCaloriesResult(validated.input);
  }, [validated]);

  const finishGeneration = useCallback(() => {
    setIsGenerating(false);
    setSubmitted(true);
  }, []);

  function set<K extends keyof CaloriesFormRaw>(
    key: K,
    value: CaloriesFormRaw[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validateCaloriesForm(form);
    setErrors(v.ok ? [] : v.errors);
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

  return (
    <div className={ui.page}>
      <div className={ui.inner}>
        <header className={ui.header}>
          <p className={ui.kicker}>Nutrition</p>
          <h1 className={ui.title}>Find your calorie budget</h1>
          <p className={ui.lede}>
            Tell me a bit about you and I&apos;ll estimate how much food energy
            you need day to day. Plain language, rounded numbers, and something
            you can actually use and tweak as you go.
          </p>
        </header>

        {isGenerating ? (
          <CaloriesCalculatorGenerating onComplete={finishGeneration} />
        ) : !submitted || !validated?.ok || !result ? (
          <form onSubmit={handleSubmit}>
            <div className={ui.card}>
              <h2 className={ui.cardTitle}>About you</h2>
              <fieldset className={`${ui.field} min-w-0 border-0 p-0`}>
                <legend className={ui.label}>Sex</legend>
                <p className={`${ui.hint} -mt-1 mb-3`}>
                  The usual estimate uses this to tune the maths. Pick what fits
                  you best.
                </p>
                <div className={ui.radioGroup}>
                  {(
                    [
                      { value: "male" as const, label: "Male" },
                      { value: "female" as const, label: "Female" },
                    ] as const
                  ).map((o) => (
                    <label key={o.value} className={ui.radioRow}>
                      <input
                        type="radio"
                        name="sex"
                        value={o.value}
                        checked={form.sex === o.value}
                        onChange={() => set("sex", o.value as CaloriesSex)}
                        className={ui.radioInput}
                      />
                      <span className={ui.radioText}>{o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={ui.field}>
                <label className={ui.label} htmlFor="cc-age">
                  Age
                </label>
                <input
                  id="cc-age"
                  className={ui.input}
                  inputMode="numeric"
                  autoComplete="bday-year"
                  spellCheck={false}
                  placeholder="e.g. 34"
                  value={form.age}
                  onChange={(e) =>
                    set("age", filterPositiveIntInput(e.target.value))
                  }
                />
              </div>
            </div>

            <div className={ui.card}>
              <h2 className={ui.cardTitle}>Height</h2>
              <fieldset className={`${ui.field} min-w-0 border-0 p-0`}>
                <legend className={ui.label}>Unit</legend>
                <div className={ui.radioGroup}>
                  {(
                    [
                      { value: "cm" as const, label: "Centimetres" },
                      { value: "ft_in" as const, label: "Feet & inches" },
                    ] as const
                  ).map((o) => (
                    <label key={o.value} className={ui.radioRow}>
                      <input
                        type="radio"
                        name="heightMode"
                        value={o.value}
                        checked={form.heightMode === o.value}
                        onChange={() => set("heightMode", o.value)}
                        className={ui.radioInput}
                      />
                      <span className={ui.radioText}>{o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.heightMode === "cm" ? (
                <div className={ui.field}>
                  <label className={ui.label} htmlFor="cc-height-cm">
                    Height (cm)
                  </label>
                  <input
                    id="cc-height-cm"
                    className={ui.input}
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="e.g. 172"
                    value={form.heightCm}
                    onChange={(e) =>
                      set(
                        "heightCm",
                        filterPositiveDecimalInput(e.target.value),
                      )
                    }
                  />
                </div>
              ) : (
                <div className={ui.grid2}>
                  <div className={ui.field}>
                    <label className={ui.label} htmlFor="cc-ft">
                      Feet
                    </label>
                    <input
                      id="cc-ft"
                      className={ui.input}
                      inputMode="numeric"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="e.g. 5"
                      value={form.heightFeet}
                      onChange={(e) =>
                        set(
                          "heightFeet",
                          filterPositiveIntInput(e.target.value),
                        )
                      }
                    />
                  </div>
                  <div className={ui.field}>
                    <label className={ui.label} htmlFor="cc-in">
                      Inches
                    </label>
                    <input
                      id="cc-in"
                      className={ui.input}
                      inputMode="numeric"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="e.g. 10"
                      value={form.heightInches}
                      onChange={(e) =>
                        set(
                          "heightInches",
                          filterPositiveIntInput(e.target.value),
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={ui.card}>
              <h2 className={ui.cardTitle}>Weight</h2>
              <div className={ui.field}>
                <label className={ui.label} htmlFor="cc-weight">
                  Weight
                </label>
                <input
                  id="cc-weight"
                  className={ui.input}
                  inputMode="decimal"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder={form.weightUnit === "kg" ? "e.g. 72.5" : "e.g. 160"}
                  value={form.weight}
                  onChange={(e) =>
                    set("weight", filterPositiveDecimalInput(e.target.value))
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
                        name="weightUnit"
                        value={o.value}
                        checked={form.weightUnit === o.value}
                        onChange={() => set("weightUnit", o.value)}
                        className={ui.radioInput}
                      />
                      <span className={ui.radioText}>{o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className={ui.card}>
              <h2 className={ui.cardTitle}>Typical week</h2>
              <fieldset className={`${ui.field} min-w-0 border-0 p-0`}>
                <legend className={ui.label}>Activity level</legend>
                <p className={`${ui.hint} -mt-1 mb-3`}>
                  Picture a normal week: work, daily steps, and any training
                  together.
                </p>
                <div className={ui.radioGroup}>
                  {ACTIVITY_OPTIONS.map((o) => (
                    <label key={o.value} className={ui.radioRow}>
                      <input
                        type="radio"
                        name="activity"
                        value={o.value}
                        checked={form.activityLevel === o.value}
                        onChange={() =>
                          set("activityLevel", o.value as CaloriesActivityLevel)
                        }
                        className={ui.radioInput}
                      />
                      <span className={ui.radioText}>
                        <span className="block font-medium">{o.label}</span>
                        <span className="mt-0.5 block text-zinc-500">
                          {o.hint}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={ui.field}>
                <label className={ui.label} htmlFor="cc-training">
                  Training days per week (optional)
                </label>
                <input
                  id="cc-training"
                  className={ui.input}
                  inputMode="numeric"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="0 to 7, or leave blank"
                  value={form.trainingDaysPerWeek}
                  onChange={(e) =>
                    set(
                      "trainingDaysPerWeek",
                      filterPositiveIntInput(e.target.value),
                    )
                  }
                />
                <p className={ui.hint}>
                  Count planned workouts only. I might mention it in your
                  summary, but it does not change the main maths twice over.
                </p>
              </div>
            </div>

            <div className={ui.card}>
              <h2 className={ui.cardTitle}>What are you working toward?</h2>
              <fieldset className={`${ui.field} min-w-0 border-0 p-0`}>
                <legend className="sr-only">What are you working toward?</legend>
                <div className={ui.radioGroup}>
                  {GOAL_ORDER.map((g) => (
                    <label key={g} className={ui.radioRow}>
                      <input
                        type="radio"
                        name="goal"
                        value={g}
                        checked={form.goal === g}
                        onChange={() => set("goal", g)}
                        className={ui.radioInput}
                      />
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className={ui.radioText}>{GOAL_LABELS[g]}</span>
                        <span className={ui.hint}>{GOAL_HINTS[g]}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {errors.length > 0 && (
              <div className={`${ui.errorBox} mt-2`} role="alert">
                <strong>Check these fields</strong>
                <ul className="mt-1.5 list-disc pl-[1.1rem]">
                  {errors.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

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
          <CaloriesCalculatorResultsView
            input={validated.input}
            result={result}
            onEdit={handleEdit}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
