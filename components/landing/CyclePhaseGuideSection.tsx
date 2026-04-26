"use client";

import { useEffect, useMemo, useState } from "react";
import {
  GENDER_THEME_CHANGE_EVENT,
  getRuntimeGenderChoice,
  type GenderThemeChoice,
} from "@/lib/gender-theme-runtime";
import { ui } from "@/components/ui";

type Phase = "menstrual" | "follicular" | "ovulatory" | "luteal";
type ImpactLevel = "Low" | "Moderate" | "High" | "Variable";
type Factor = "Appetite" | "Sleep" | "Energy" | "Mood" | "Stress";

type PhaseData = {
  label: string;
  impacts: Record<Factor, ImpactLevel>;
  training: [string, string];
  nutrition: [string, string];
};

const PHASE_ORDER: Phase[] = ["menstrual", "follicular", "ovulatory", "luteal"];

const PHASE_DATA: Record<Phase, PhaseData> = {
  menstrual: {
    label: "Menstrual",
    impacts: {
      Appetite: "Moderate",
      Sleep: "Moderate",
      Energy: "Low",
      Mood: "Low",
      Stress: "Moderate",
    },
    training: [
      "Keep sessions lighter if cramps or fatigue are high.",
      "Focus on movement quality and recovery, not max effort.",
    ],
    nutrition: [
      "Appetite can change day to day, so keep meals regular.",
      "Keep protein steady and stay well hydrated.",
    ],
  },
  follicular: {
    label: "Follicular",
    impacts: {
      Appetite: "Low",
      Sleep: "Moderate",
      Energy: "Moderate",
      Mood: "Moderate",
      Stress: "Low",
    },
    training: [
      "This is a good phase to push performance and progression.",
      "Use your better energy for harder strength sessions.",
    ],
    nutrition: [
      "Keep your normal structure and protein intake consistent.",
      "Use enough carbs around training to support performance.",
    ],
  },
  ovulatory: {
    label: "Ovulatory",
    impacts: {
      Appetite: "Low",
      Sleep: "Moderate",
      Energy: "High",
      Mood: "High",
      Stress: "Low",
    },
    training: [
      "You can usually train hard here if sleep and recovery are good.",
      "Keep quality high and avoid adding extra junk volume.",
    ],
    nutrition: [
      "Keep protein high and carbs matched to training demand.",
      "Hydrate well, especially on intense or sweaty sessions.",
    ],
  },
  luteal: {
    label: "Luteal",
    impacts: {
      Appetite: "High",
      Sleep: "Variable",
      Energy: "Moderate",
      Mood: "Variable",
      Stress: "High",
    },
    training: [
      "Lower training intensity if fatigue or stress is rising.",
      "Prioritize recovery and keep technique clean over pushing hard.",
    ],
    nutrition: [
      "Expect higher appetite and plan meals/snacks in advance.",
      "Keep protein steady and add a little more carbs if needed.",
    ],
  },
};

const IMPACT_SCORE: Record<ImpactLevel, number> = {
  Low: 1,
  Moderate: 2,
  High: 3,
  Variable: 2,
};

const FACTOR_ORDER: Factor[] = ["Appetite", "Sleep", "Energy", "Mood", "Stress"];

const CHART_SCORE_BY_PHASE: Record<Phase, Record<Factor, number>> = {
  menstrual: {
    Appetite: 2,
    Sleep: 2.0,
    Energy: 1,
    Mood: 1,
    Stress: 2.0,
  },
  follicular: {
    Appetite: 1,
    Sleep: 2,
    Energy: 2,
    Mood: 2,
    Stress: 1,
  },
  ovulatory: {
    Appetite: 1,
    Sleep: 2,
    Energy: 3,
    Mood: 3,
    Stress: 1,
  },
  luteal: {
    Appetite: 3,
    Sleep: 1,
    Energy: 2,
    Mood: 2,
    Stress: 3,
  },
};

export function CyclePhaseGuideSection() {
  const [selectedGender, setSelectedGender] = useState<GenderThemeChoice | null>(
    getRuntimeGenderChoice(),
  );
  const [selectedPhase, setSelectedPhase] = useState<Phase>("follicular");
  const [selectedFactor, setSelectedFactor] = useState<Factor>("Appetite");
  const active = PHASE_DATA[selectedPhase];

  useEffect(() => {
    function onGenderThemeChange(event: Event) {
      const detail = (event as CustomEvent<GenderThemeChoice>).detail;
      if (detail === "default" || detail === "woman") {
        setSelectedGender(detail);
      }
    }

    window.addEventListener(GENDER_THEME_CHANGE_EVENT, onGenderThemeChange);
    return () => {
      window.removeEventListener(GENDER_THEME_CHANGE_EVENT, onGenderThemeChange);
    };
  }, []);

  const barData = useMemo(
    () =>
      PHASE_ORDER.map((phase) => {
        const level = PHASE_DATA[phase].impacts[selectedFactor];
        return {
          phase,
          label: PHASE_DATA[phase].label,
          level,
          score: CHART_SCORE_BY_PHASE[phase][selectedFactor] ?? IMPACT_SCORE[level],
        };
      }),
    [selectedFactor],
  );

  if (selectedGender !== "woman") return null;

  return (
    <section
      id="cycle"
      className={ui.landingSection}
      aria-labelledby="cycle-phase-guide-heading"
    >
      <p className={ui.landingSectionKicker}>Cycle-aware coaching</p>
      <h2 id="cycle-phase-guide-heading" className={ui.landingSectionTitle}>
        Training and nutrition by cycle phase
      </h2>
      <p className={`${ui.landingBody} mt-4 max-w-2xl`}>
        Pick a factor to see how it changes by phase. Tap a bar to load practical
        coaching adjustments for that phase.
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {FACTOR_ORDER.map((factor) => {
          const isActive = selectedFactor === factor;
          return (
            <button
              key={factor}
              type="button"
              onClick={() => setSelectedFactor(factor)}
              className={
                isActive
                  ? "cursor-pointer rounded-full border border-zinc-950 bg-zinc-950 px-[1.1rem] py-2.5 text-sm font-medium tracking-wide text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                  : "cursor-pointer rounded-full border border-zinc-300 bg-white px-[1.1rem] py-2.5 text-sm font-medium tracking-wide text-zinc-950 hover:border-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
              }
              aria-pressed={isActive}
            >
              {factor}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-zinc-950">
          {selectedFactor} across cycle phases
        </h3>
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[22rem]">
            <div
              role="img"
              aria-label={`${selectedFactor} levels across menstrual, follicular, ovulatory, and luteal phases`}
              className="flex h-52 items-end gap-3 rounded-md border border-zinc-50 p-2 sm:gap-4"
            >
              {barData.map((item) => {
                const isActive = selectedPhase === item.phase;
                const height = `${(item.score / 3) * 100}%`;
                return (
                  <button
                    key={item.phase}
                    type="button"
                    onClick={() => setSelectedPhase(item.phase)}
                    className="flex h-full flex-1 cursor-pointer flex-col items-center justify-end gap-2"
                    aria-pressed={isActive}
                  >
                    <div className="flex h-40 w-full items-end">
                      <div
                        className={`w-full rounded-t-xl transition-all ${
                          item.level === "Variable"
                            ? "bg-[repeating-linear-gradient(45deg,#db2777_0px,#db2777_6px,#f9a8d4_6px,#f9a8d4_12px)]"
                            : "bg-pink-600"
                        } ${
                          isActive ? "opacity-100" : "opacity-70"
                        }`}
                        style={{ height, minHeight: "24px" }}
                      >
                        <span
                          className={`block px-1 pt-2 text-center font-serif text-[0.68rem] leading-tight text-white sm:text-xs ${
                            isActive ? "font-semibold" : "font-medium"
                          }`}
                        >
                          {item.level}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-[0.7rem] leading-tight sm:text-xs ${
                        isActive
                          ? "font-semibold text-zinc-950"
                          : "text-zinc-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-zinc-600">
          Current phase: <strong className="text-zinc-950">{active.label}</strong>
          {" · "}
          {selectedFactor}:{" "}
          <strong className="text-zinc-950">{active.impacts[selectedFactor]}</strong>
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-zinc-200 bg-white px-5 py-5 sm:px-6">
          <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-zinc-950">
            Training
          </h3>
          <ul className="mt-3 m-0 list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-zinc-700">
            {active.training.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg border border-zinc-200 bg-white px-5 py-5 sm:px-6">
          <h3 className="font-serif text-xl font-semibold tracking-[-0.02em] text-zinc-950">
            Nutrition
          </h3>
          <ul className="mt-3 m-0 list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-zinc-700">
            {active.nutrition.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </article>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-zinc-500">
        Cycle responses vary from person to person. Use this as a guide and
        adjust based on how you feel.
      </p>
    </section>
  );
}
