import type { MealRole } from "@/types/nutrition";
import { formatClockWindow } from "@/lib/training-clock";

const DAY_START = 6 * 60;
const DAY_END = 23 * 60 + 45;
const SESSION_MIN = 60;
const PRE_BEFORE_MAX = 90;
const PRE_BEFORE_MIN = 55;
const BUFFER = 18;

function clamp(minutes: number): number {
  return Math.max(DAY_START, Math.min(DAY_END, Math.round(minutes)));
}

function preWindow(train: number): { start: number; end: number } {
  let start = train - PRE_BEFORE_MAX;
  let end = train - PRE_BEFORE_MIN;
  if (end <= start) {
    end = start + 28;
  }
  start = clamp(start);
  end = clamp(end);
  if (end > train - 15) {
    end = train - 15;
  }
  if (end <= start) {
    start = clamp(train - 95);
    end = clamp(train - 20);
  }
  return { start: clamp(start), end: clamp(end) };
}

function postWindow(train: number): { start: number; end: number } {
  const trainEnd = train + SESSION_MIN;
  const start = clamp(trainEnd + 12);
  let end = clamp(trainEnd + 100);
  if (end <= start) {
    end = clamp(start + 50);
  }
  return { start, end: clamp(end) };
}

function allocateCenters(segStart: number, segEnd: number, count: number): number[] {
  if (count === 0) {
    return [];
  }
  const usable = segEnd - segStart;
  if (usable < 20) {
    const c = (segStart + segEnd) / 2;
    return Array.from({ length: count }, (_, j) => c + j * 22);
  }
  const step = usable / (count + 1);
  return Array.from({ length: count }, (_, i) => segStart + step * (i + 1));
}

function centerToWindow(center: number, halfWidth = 32): {
  start: number;
  end: number;
} {
  return {
    start: clamp(center - halfWidth),
    end: clamp(center + halfWidth),
  };
}

/**
 * One human-readable line per meal: approximate clock window for decision-making.
 */
export function buildApproximateMealWindowLines(
  trainMinutes: number,
  roles: MealRole[],
  isRestDay: boolean,
): string[] {
  const n = roles.length;
  if (isRestDay) {
    const dayBegin = 7 * 60;
    const dayFinish = 20 * 60 + 45;
    const span = dayFinish - dayBegin;
    return roles.map((_, i) => {
      const c = dayBegin + ((i + 0.5) / n) * span;
      const w = centerToWindow(c, 38);
      const range = formatClockWindow(w.start, w.end);
      return `About ${range}, spaced evenly on a rest day. Slide it if you are hungrier earlier or later.`;
    });
  }

  const preIdx = roles.indexOf("pre_workout");
  const postIdx = roles.indexOf("post_workout");
  const preW = preWindow(trainMinutes);
  const postW = postWindow(trainMinutes);

  const otherIndices = roles
    .map((r, i) => (r === "other" || r === "meal" ? i : -1))
    .filter((i) => i >= 0);

  const beforePre = otherIndices.filter((i) => i < preIdx).sort((a, b) => a - b);
  const between = otherIndices
    .filter((i) => i > preIdx && i < postIdx)
    .sort((a, b) => a - b);
  const afterPost = otherIndices.filter((i) => i > postIdx).sort((a, b) => a - b);

  const windowByIndex = new Map<number, { start: number; end: number }>();
  windowByIndex.set(preIdx, preW);
  windowByIndex.set(postIdx, postW);

  function placeGroup(
    indices: number[],
    segStart: number,
    segEnd: number,
  ): void {
    if (indices.length === 0) {
      return;
    }
    if (segEnd - segStart < 35) {
      let t = clamp(segStart);
      indices.forEach((idx) => {
        windowByIndex.set(idx, { start: t, end: clamp(t + 42) });
        t = clamp(t + 48);
      });
      return;
    }
    const centers = allocateCenters(segStart, segEnd, indices.length);
    indices.forEach((idx, j) => {
      windowByIndex.set(idx, centerToWindow(centers[j] ?? segStart));
    });
  }

  placeGroup(
    beforePre,
    DAY_START,
    Math.max(DAY_START + 50, preW.start - BUFFER),
  );

  const midStart = preW.end + BUFFER;
  const midEnd = postW.start - BUFFER;
  if (between.length > 0) {
    if (midStart + 40 < midEnd) {
      placeGroup(between, midStart, midEnd);
    } else {
      let t = preW.end + 12;
      between.forEach((idx) => {
        windowByIndex.set(idx, { start: clamp(t), end: clamp(t + 40) });
        t = clamp(t + 48);
      });
    }
  }

  placeGroup(afterPost, postW.end + BUFFER, DAY_END);

  return roles.map((role, i) => {
    const w = windowByIndex.get(i);
    if (!w) {
      return "Flexible. Put it where hunger and your calendar actually agree.";
    }
    const range = formatClockWindow(w.start, w.end);
    if (role === "pre_workout") {
      return `About ${range}. Try to wrap eating roughly 60 to 90 minutes before you train.`;
    }
    if (role === "post_workout") {
      return `About ${range}. Aim for a real meal within an hour or two after you are done training.`;
    }
    return `About ${range}, a steady meal away from the workout window.`;
  });
}
