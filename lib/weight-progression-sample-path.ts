import { formatWeight, roundWorkingWeight } from "@/lib/weight-progression-load";
import type {
  ProgressionDecisionKind,
  ProgressionExampleStep,
  WeightProgressionInput,
} from "@/types/weight-progression";

function repString(reps: number[]): string {
  return reps.join(", ");
}

function buildThreeRowBlock(
  w: number,
  unit: WeightProgressionInput["unit"],
  n: number,
  L: number,
  U: number,
): ProgressionExampleStep[] {
  const lastLow = Math.max(1, L - 1);
  const row1 = Array.from({ length: n }, (_, i) =>
    i === n - 1 ? lastLow : L,
  );
  const row2 = row1.map((r, i) => {
    if (i === 0) {
      return Math.min(U, r + 1);
    }
    if (n > 2 && i === 1) {
      return Math.min(U, r + 1);
    }
    return r;
  });
  const row3 = Array.from({ length: n }, (_, i) =>
    Math.min(U, Math.max(L, U - (n - 1 - i))),
  );

  return [
    {
      label: "Session 1",
      detail: `${formatWeight(w, unit)} × ${repString(row1)}`,
    },
    {
      label: "Session 2",
      detail: `${formatWeight(w, unit)} × ${repString(row2)}`,
    },
    {
      label: "Session 3",
      detail: `${formatWeight(w, unit)} × ${repString(row3)}`,
    },
  ];
}

/**
 * Builds a short, deterministic example storyline for the user's rep range and set count.
 */
export function buildExampleProgressionPath(
  decision: ProgressionDecisionKind,
  input: Pick<
    WeightProgressionInput,
    | "workingWeight"
    | "unit"
    | "setCount"
    | "repLower"
    | "repUpper"
    | "repsPerSet"
  >,
  suggestedNextWeight: number | null,
  suggestedLighterWeight: number | null,
): ProgressionExampleStep[] {
  const {
    workingWeight: w,
    unit,
    setCount: n,
    repLower: L,
    repUpper: U,
    repsPerSet,
  } = input;

  const achieved = repString(repsPerSet.slice(0, n));

  if (decision === "reduce_load") {
    const wLight =
      suggestedLighterWeight !== null
        ? suggestedLighterWeight
        : roundWorkingWeight(w * 0.9, unit);
    const floor = unit === "kg" ? 1 : 2.5;
    const wUse = Math.max(floor, wLight);
    const easy = Array.from({ length: n }, () => Math.max(L - 1, 1));
    const mid = Array.from({ length: n }, (_, i) =>
      Math.min(U, easy[i]! + (i === 0 ? 1 : 0)),
    );
    const back = Array.from({ length: n }, () => L);
    return [
      {
        label: "Where you are",
        detail: `${formatWeight(w, unit)} × ${achieved}`,
      },
      {
        label: "Session 1 (lighter)",
        detail: `${formatWeight(wUse, unit)} × ${repString(easy)}`,
      },
      {
        label: "Session 2",
        detail: `${formatWeight(wUse, unit)} × ${repString(mid)}`,
      },
      {
        label: "Session 3",
        detail: `${formatWeight(wUse, unit)} × ${repString(back)}`,
      },
    ];
  }

  const block = buildThreeRowBlock(w, unit, n, L, U);

  if (decision === "increase_load" && suggestedNextWeight !== null) {
    const row4 = Array.from({ length: n }, () => L);
    return [
      ...block,
      {
        label: "Session 4",
        detail: `${formatWeight(
          suggestedNextWeight,
          unit,
        )} × ${repString(row4)} (new load, reps back toward ${L})`,
      },
    ];
  }

  if (decision === "add_reps") {
    return [
      ...block,
      {
        label: "Next focus",
        detail: `Keep ${formatWeight(
          w,
          unit,
        )} and add reps on your weakest set before increasing load.`,
      },
    ];
  }

  return [
    {
      label: "Where you are",
      detail: `${formatWeight(w, unit)} × ${achieved}`,
    },
    ...block.slice(0, 2),
    {
      label: "Aim next",
      detail: `Same ${formatWeight(
        w,
        unit,
      )}, same ${L} to ${U} target, but chase cleaner sets across the board.`,
    },
  ];
}
