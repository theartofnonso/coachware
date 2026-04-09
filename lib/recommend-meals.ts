import type { Goal } from "@/types/nutrition";

export function goalCarbEmphasis(goal: Goal): { pre: number; post: number; away: number } {
  switch (goal) {
    case "fat_loss":
      return { pre: 0.95, post: 1.1, away: 0.72 };
    case "recomposition":
      return { pre: 1.05, post: 1.25, away: 0.78 };
    case "muscle_gain":
      return { pre: 1.15, post: 1.35, away: 0.82 };
  }
}
