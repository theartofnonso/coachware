import type { TrainingTime } from "@/types/nutrition";

/** Parse HTML time input value "HH:MM" (24h) to minutes from midnight. */
export function parseClockToMinutes(value: string): number | null {
  const t = value.trim();
  const m = /^(\d{1,2}):(\d{2})$/.exec(t);
  if (!m) {
    return null;
  }
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (
    !Number.isInteger(h) ||
    !Number.isInteger(min) ||
    h < 0 ||
    h > 23 ||
    min < 0 ||
    min > 59
  ) {
    return null;
  }
  return h * 60 + min;
}

/** Single time, e.g. "6:30 PM" (locale en-US). */
export function formatAroundTime(minutes: number): string {
  const d = new Date();
  d.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Range like "6:30 to 7:45 AM". */
export function formatClockWindow(startMin: number, endMin: number): string {
  return `${formatAroundTime(startMin)} to ${formatAroundTime(endMin)}`;
}

/** Maps wall-clock training start to the phase model used for roles and copy. */
export function deriveTrainingPhase(minutes: number): TrainingTime {
  if (minutes < 8 * 60) {
    return "early_morning";
  }
  if (minutes < 11 * 60) {
    return "late_morning";
  }
  if (minutes < 17 * 60) {
    return "afternoon";
  }
  return "evening";
}
