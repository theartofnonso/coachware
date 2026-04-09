"use client";

import { useMemo, useState } from "react";
import { IntakeForm, type FormState } from "@/components/IntakeForm";
import { PlanResults } from "@/components/PlanResults";
import { generateNutritionPlan } from "@/lib/generate-plan";
import { validateInputs } from "@/lib/validation";
import type { UserInputs } from "@/types/nutrition";
import { ui } from "@/components/ui";

const DEFAULT_FORM: FormState = {
  goal: "recomposition",
  dailyCalories: "2100",
  dailyProteinG: "155",
  dailyCarbsG: "220",
  dailyFatsG: "65",
  mealPreference: "recommend",
  trainingTime: "afternoon",
  trainingType: "full_body",
  keepItSimple: false,
};

function parseNumber(raw: string): number {
  const n = Number.parseFloat(raw.replace(/,/g, ""));
  return n;
}

function formToUserInputs(form: FormState): UserInputs {
  return {
    goal: form.goal,
    dailyCalories: parseNumber(form.dailyCalories),
    dailyProteinG: parseNumber(form.dailyProteinG),
    dailyCarbsG: parseNumber(form.dailyCarbsG),
    dailyFatsG: parseNumber(form.dailyFatsG),
    mealPreference: form.mealPreference,
    trainingTime: form.trainingTime,
    trainingType: form.trainingType,
    keepItSimple: form.keepItSimple,
  };
}

export function NutritionTool() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const plan = useMemo(() => {
    if (!submitted) {
      return null;
    }
    const input = formToUserInputs(form);
    const v = validateInputs(input);
    if (!v.ok) {
      return null;
    }
    return generateNutritionPlan(input);
  }, [form, submitted]);

  function handleSubmit() {
    const input = formToUserInputs(form);
    const v = validateInputs(input);
    setErrors(v.errors);
    if (!v.ok) {
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
  }

  function handleEdit() {
    setSubmitted(false);
  }

  function handleReset() {
    setForm(DEFAULT_FORM);
    setErrors([]);
    setSubmitted(false);
  }

  return (
    <div className={ui.page}>
      <div className={ui.inner}>
        <header className={ui.header}>
          <p className={ui.kicker}>Nutrition timing</p>
          <h1 className={ui.title}>Meal structuring tool</h1>
          <p className={ui.lede}>
            Turn your calorie and macro targets into a calm, practical way to
            eat across the day — especially around training.
          </p>
        </header>

        {!submitted || !plan ? (
          <IntakeForm
            value={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            errors={errors}
          />
        ) : (
          <PlanResults plan={plan} onEdit={handleEdit} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
