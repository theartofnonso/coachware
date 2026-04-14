"use client";

import type { FormEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import { ProteinCheckerResultsView } from "@/components/ProteinCheckerResultsView";
import { ui } from "@/components/ui";
import { computeProteinCheckerResult } from "@/lib/protein-checker-compute";
import type { ProteinFormRaw } from "@/lib/protein-checker-validation";
import { validateProteinCheckerForm } from "@/lib/protein-checker-validation";
import { filterPositiveDecimalInput } from "@/lib/numeric-input";

const DEFAULT_FORM: ProteinFormRaw = {
  proteinGrams: "",
  calories: "",
  foodName: "",
};

export function ProteinCheckerTool() {
  const [form, setForm] = useState<ProteinFormRaw>(DEFAULT_FORM);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const validated = useMemo(() => {
    if (!submitted) {
      return null;
    }
    return validateProteinCheckerForm(form);
  }, [form, submitted]);

  const result = useMemo(() => {
    if (!validated?.ok) {
      return null;
    }
    return computeProteinCheckerResult(validated.input);
  }, [validated]);

  function set<K extends keyof ProteinFormRaw>(key: K, value: ProteinFormRaw[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validateProteinCheckerForm(form);
    setErrors(v.ok ? [] : v.errors);
    if (!v.ok) {
      setSubmitted(false);
      return;
    }
    setErrors([]);
    setSubmitted(true);
  }

  const handleEdit = useCallback(() => {
    setSubmitted(false);
  }, []);

  const handleReset = useCallback(() => {
    setForm(DEFAULT_FORM);
    setErrors([]);
    setSubmitted(false);
  }, []);

  return (
    <div className={ui.page}>
      <div className={ui.inner}>
        <header className={ui.header}>
          <p className={ui.kicker}>Nutrition</p>
          <h1 className={ui.title}>Protein checker</h1>
          <p className={ui.lede}>
            Enter protein and calories for any food or meal. I&apos;ll give you a
            fast read on whether it is a strong protein choice, and what to
            consider next.
          </p>
        </header>

        {!submitted || !validated?.ok || !result ? (
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
              <h2 className={ui.cardTitle}>Numbers</h2>
              <div className={ui.grid2}>
                <div className={ui.field}>
                  <label className={ui.label} htmlFor="pc-protein">
                    Protein (grams)
                  </label>
                  <input
                    id="pc-protein"
                    className={ui.input}
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="e.g. 32"
                    value={form.proteinGrams}
                    onChange={(e) =>
                      set(
                        "proteinGrams",
                        filterPositiveDecimalInput(e.target.value),
                      )
                    }
                  />
                </div>
                <div className={ui.field}>
                  <label className={ui.label} htmlFor="pc-calories">
                    Calories
                  </label>
                  <input
                    id="pc-calories"
                    className={ui.input}
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="e.g. 280"
                    value={form.calories}
                    onChange={(e) =>
                      set("calories", filterPositiveDecimalInput(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className={ui.field}>
                <label className={ui.label} htmlFor="pc-food">
                  Food name (optional)
                </label>
                <input
                  id="pc-food"
                  className={ui.input}
                  autoComplete="off"
                  placeholder="e.g. Chicken bowl, protein shake"
                  value={form.foodName}
                  onChange={(e) => set("foodName", e.target.value)}
                />
                <p className={ui.hint}>Only used on your result card.</p>
              </div>
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
          <ProteinCheckerResultsView
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
