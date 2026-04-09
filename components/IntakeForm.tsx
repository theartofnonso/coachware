"use client";

import type { Goal, MealPreference, TrainingTime, TrainingType } from "@/types/nutrition";
import { ui } from "@/components/ui";

export type FormState = {
  goal: Goal;
  dailyCalories: string;
  dailyProteinG: string;
  dailyCarbsG: string;
  dailyFatsG: string;
  mealPreference: MealPreference;
  trainingTime: TrainingTime;
  trainingType: TrainingType;
  keepItSimple: boolean;
};

type Props = {
  value: FormState;
  onChange: (next: FormState) => void;
  onSubmit: () => void;
  errors: string[];
};

const goalOptions: { value: Goal; label: string }[] = [
  { value: "fat_loss", label: "Fat loss" },
  { value: "recomposition", label: "Recomposition" },
  { value: "muscle_gain", label: "Muscle gain" },
];

const mealOptions: { value: MealPreference; label: string }[] = [
  { value: "recommend", label: "Recommend for me" },
  { value: 3, label: "3 meals" },
  { value: 4, label: "4 meals" },
  { value: 5, label: "5 meals" },
];

const timeOptions: { value: TrainingTime; label: string }[] = [
  { value: "early_morning", label: "Early morning" },
  { value: "late_morning", label: "Late morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "rest_day", label: "Rest day" },
];

const typeOptions: { value: TrainingType; label: string }[] = [
  { value: "lower_body", label: "Lower body / glute focused" },
  { value: "upper_body", label: "Upper body" },
  { value: "full_body", label: "Full body" },
  { value: "cardio", label: "Cardio / conditioning" },
  { value: "rest_day", label: "Rest day" },
];

export function IntakeForm({ value, onChange, onSubmit, errors }: Props) {
  function set<K extends keyof FormState>(key: K, v: FormState[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {errors.length > 0 && (
        <div className={ui.errorBox} role="alert">
          <strong>Check your inputs</strong>
          <ul className="mt-1.5 list-disc pl-[1.1rem]">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Goal</h2>
        <fieldset className={ui.field}>
          <legend className="sr-only">Goal</legend>
          <div className={ui.radioGroup}>
            {goalOptions.map((o) => (
              <label key={o.value} className={ui.radioRow}>
                <input
                  type="radio"
                  name="goal"
                  value={o.value}
                  checked={value.goal === o.value}
                  onChange={() => set("goal", o.value)}
                  className={ui.radioInput}
                />
                <span className={ui.radioText}>{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Daily targets</h2>
        <div className={ui.field}>
          <label className={ui.label} htmlFor="calories">
            Calories
          </label>
          <input
            id="calories"
            className={ui.input}
            inputMode="decimal"
            autoComplete="off"
            value={value.dailyCalories}
            onChange={(e) => set("dailyCalories", e.target.value)}
          />
        </div>
        <div className={ui.grid2}>
          <div className={ui.field}>
            <label className={ui.label} htmlFor="protein">
              Protein (g)
            </label>
            <input
              id="protein"
              className={ui.input}
              inputMode="decimal"
              autoComplete="off"
              value={value.dailyProteinG}
              onChange={(e) => set("dailyProteinG", e.target.value)}
            />
          </div>
          <div className={ui.field}>
            <label className={ui.label} htmlFor="carbs">
              Carbs (g)
            </label>
            <input
              id="carbs"
              className={ui.input}
              inputMode="decimal"
              autoComplete="off"
              value={value.dailyCarbsG}
              onChange={(e) => set("dailyCarbsG", e.target.value)}
            />
          </div>
        </div>
        <div className={ui.field}>
          <label className={ui.label} htmlFor="fats">
            Fats (g)
          </label>
          <input
            id="fats"
            className={ui.input}
            inputMode="decimal"
            autoComplete="off"
            value={value.dailyFatsG}
            onChange={(e) => set("dailyFatsG", e.target.value)}
          />
          <p className={ui.hint}>
            Rough check: protein and carbs are 4 kcal/g, fats 9 kcal/g — your
            totals should land near your calorie target.
          </p>
        </div>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Meals per day</h2>
        <fieldset className={ui.field}>
          <legend className="sr-only">Meals per day</legend>
          <div className={ui.radioGroup}>
            {mealOptions.map((o) => (
              <label key={String(o.value)} className={ui.radioRow}>
                <input
                  type="radio"
                  name="meals"
                  value={String(o.value)}
                  checked={value.mealPreference === o.value}
                  onChange={() => set("mealPreference", o.value)}
                  className={ui.radioInput}
                />
                <span className={ui.radioText}>{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Training</h2>
        <div className={ui.field}>
          <label className={ui.label} htmlFor="trainingTime">
            When you train
          </label>
          <select
            id="trainingTime"
            className={ui.select}
            value={value.trainingTime}
            onChange={(e) =>
              set("trainingTime", e.target.value as TrainingTime)
            }
          >
            {timeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className={ui.field}>
          <label className={ui.label} htmlFor="trainingType">
            Session type
          </label>
          <select
            id="trainingType"
            className={ui.select}
            value={value.trainingType}
            onChange={(e) =>
              set("trainingType", e.target.value as TrainingType)
            }
          >
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <p className={ui.hint}>
            If either field is a rest day, we treat the day as non-training for
            timing.
          </p>
        </div>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Mode</h2>
        <label className={ui.toggleRow}>
          <span className={ui.radioText}>Keep it simple</span>
          <input
            type="checkbox"
            checked={value.keepItSimple}
            onChange={(e) => set("keepItSimple", e.target.checked)}
            aria-describedby="simple-hint"
            className={ui.toggleInput}
          />
        </label>
        <p id="simple-hint" className={ui.hint}>
          Shorter explanations and a lighter structure — same underlying plan.
        </p>
      </div>

      <div className={ui.actions}>
        <button type="submit" className={ui.btnPrimary}>
          Build my day
        </button>
      </div>
    </form>
  );
}
