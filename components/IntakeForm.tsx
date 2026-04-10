"use client";

import { GOAL_HINTS, GOAL_LABELS } from "@/constants/labels";
import { filterPositiveDecimalInput } from "@/lib/numeric-input";
import type { Goal, MealPreference, TrainingDay } from "@/types/nutrition";
import { ui } from "@/components/ui";

const GOAL_OPTIONS: Goal[] = ["fat_loss", "recomposition", "muscle_gain"];

export type FormState = {
  goal: Goal;
  dailyCalories: string;
  dailyProteinG: string;
  dailyCarbsG: string;
  dailyFatsG: string;
  mealPreference: MealPreference;
  /** Local time "HH:MM" (24h) from the time input */
  trainingClock: string;
  trainingDay: TrainingDay;
};

type Props = {
  value: FormState;
  onChange: (next: FormState) => void;
  onSubmit: () => void;
  errors: string[];
};

const mealOptions: { value: MealPreference; label: string }[] = [
  { value: 2, label: "2 meals" },
  { value: 3, label: "3 meals" },
  { value: 4, label: "4 meals" },
  { value: 5, label: "5 meals" },
];

export function IntakeForm({ value, onChange, onSubmit, errors }: Props) {
  function set<K extends keyof FormState>(key: K, v: FormState[K]) {
    onChange({ ...value, [key]: v });
  }

  const isRestDay = value.trainingDay === "rest_day";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {errors.length > 0 && (
        <div className={ui.errorBox} role="alert">
          <strong>Almost there</strong>
          <ul className="mt-1.5 list-disc pl-[1.1rem]">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>What are you working toward?</h2>
        <fieldset className={ui.field}>
          <legend className="sr-only">What are you working toward?</legend>
          <div className={ui.radioGroup}>
            {GOAL_OPTIONS.map((g) => (
              <label key={g} className={ui.radioRow}>
                <input
                  type="radio"
                  name="goal"
                  value={g}
                  checked={value.goal === g}
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

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>Your numbers for today</h2>
        <div className={ui.field}>
          <label className={ui.label} htmlFor="calories">
            Calories
          </label>
          <input
            id="calories"
            className={ui.input}
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            value={value.dailyCalories}
            onChange={(e) =>
              set(
                "dailyCalories",
                filterPositiveDecimalInput(e.target.value.replace(/,/g, "")),
              )
            }
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
              spellCheck={false}
              value={value.dailyProteinG}
              onChange={(e) =>
                set("dailyProteinG", filterPositiveDecimalInput(e.target.value))
              }
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
              spellCheck={false}
              value={value.dailyCarbsG}
              onChange={(e) =>
                set("dailyCarbsG", filterPositiveDecimalInput(e.target.value))
              }
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
            spellCheck={false}
            value={value.dailyFatsG}
            onChange={(e) =>
              set("dailyFatsG", filterPositiveDecimalInput(e.target.value))
            }
          />
          <p className={ui.hint}>
            Quick sanity check: protein and carbs are 4 calories per gram,
            fats 9. If the math is way off your calorie target, tweak one side.
          </p>
        </div>
      </div>

      <div className={ui.card}>
        <h2 className={ui.cardTitle}>How many times do you like to eat?</h2>
        <fieldset className={ui.field}>
          <legend className="sr-only">How many times do you like to eat?</legend>
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
        <h2 className={ui.cardTitle}>Today&apos;s workout</h2>
        <fieldset className={`${ui.field} min-w-0 border-0 p-0`}>
          <legend className={ui.label}>What kind of day is it?</legend>
          <div className={ui.radioGroup}>
            <label className={ui.radioRow}>
              <input
                type="radio"
                name="trainingDay"
                value="rest_day"
                checked={value.trainingDay === "rest_day"}
                onChange={() => set("trainingDay", "rest_day")}
                className={ui.radioInput}
              />
              <span className={ui.radioText}>Rest day</span>
            </label>
            <label className={ui.radioRow}>
              <input
                type="radio"
                name="trainingDay"
                value="training"
                checked={value.trainingDay === "training"}
                onChange={() => set("trainingDay", "training")}
                className={ui.radioInput}
              />
              <span className={ui.radioText}>I&apos;m training</span>
            </label>
          </div>
        </fieldset>
        {!isRestDay && (
          <div className={ui.field}>
            <label className={ui.label} htmlFor="trainingClock">
              Roughly when do you train?
            </label>
            <input
              id="trainingClock"
              type="time"
              className={ui.input}
              value={value.trainingClock}
              onChange={(e) => set("trainingClock", e.target.value)}
            />
            <p className={ui.hint}>
              We&apos;ll sketch meal times around this. It doesn&apos;t have to
              be perfect, just your usual start.
            </p>
          </div>
        )}
        {isRestDay && (
          <p className={ui.hint}>
            On a rest day we skip workout timing and spread things evenly. No
            clock needed.
          </p>
        )}
      </div>

      <div className={ui.actions}>
        <button type="submit" className={ui.btnPrimary}>
          Show me my plan
        </button>
      </div>
    </form>
  );
}
