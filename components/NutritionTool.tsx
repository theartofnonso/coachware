"use client";

import { useCallback, useMemo, useState } from "react";
import { IntakeForm, type FormState } from "@/components/IntakeForm";
import { PlanGenerating } from "@/components/PlanGenerating";
import { PlanResults } from "@/components/PlanResults";
import { generateNutritionPlan } from "@/lib/generate-plan";
import { parseClockToMinutes } from "@/lib/training-clock";
import { validateInputs } from "@/lib/validation";
import type { UserInputs } from "@/types/nutrition";
import { ui } from "@/components/ui";

const DEFAULT_FORM: FormState = {
  goal: "recomposition",
  dailyCalories: "2100",
  dailyProteinG: "155",
  dailyCarbsG: "220",
  dailyFatsG: "65",
  mealPreference: 4,
  trainingClock: "12:00",
  trainingDay: "training",
};

function parseNumber(raw: string): number {
  const n = Number.parseFloat(raw.replace(/,/g, ""));
  return n;
}

function formToUserInputs(form: FormState): UserInputs {
  const isRest = form.trainingDay === "rest_day";
  return {
    goal: form.goal,
    dailyCalories: parseNumber(form.dailyCalories),
    dailyProteinG: parseNumber(form.dailyProteinG),
    dailyCarbsG: parseNumber(form.dailyCarbsG),
    dailyFatsG: parseNumber(form.dailyFatsG),
    mealPreference: form.mealPreference,
    trainingStartMinutes: isRest
      ? null
      : parseClockToMinutes(form.trainingClock),
    trainingDay: form.trainingDay,
  };
}

export function NutritionTool() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const finishGeneration = useCallback(() => {
    setIsGenerating(false);
    setSubmitted(true);
  }, []);

  function handleSubmit() {
    const input = formToUserInputs(form);
    const v = validateInputs(input);
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

  function handleEdit() {
    setSubmitted(false);
    setIsGenerating(false);
  }

  function handleReset() {
    setForm(DEFAULT_FORM);
    setErrors([]);
    setSubmitted(false);
    setIsGenerating(false);
  }

  return (
    <div className={ui.page}>
      <div className={ui.inner}>
        <header className={ui.header}>
          <p className={ui.kicker}>Eat around your training</p>
          <h1 className={ui.title}>Let&apos;s map your day</h1>
          <p className={ui.lede}>
            You already know your calories and macros. We&apos;ll help you place
            them through the day so eating feels doable, not like homework.
          </p>
        </header>

        {isGenerating ? (
          <PlanGenerating
            isRestDay={form.trainingDay === "rest_day"}
            onComplete={finishGeneration}
          />
        ) : !submitted || !plan ? (
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
