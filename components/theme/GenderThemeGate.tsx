"use client";

import { useEffect, useState } from "react";

type GenderThemeChoice = "man" | "woman" | "other";

const STORAGE_KEY = "coachware.gender-theme-choice";

function applyTheme(choice: GenderThemeChoice) {
  if (typeof document === "undefined") return;
  document.body.classList.remove("theme-woman");
  if (choice === "woman") {
    document.body.classList.add("theme-woman");
  }
}

export function GenderThemeGate() {
  const [choice, setChoice] = useState<GenderThemeChoice | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "man" || stored === "woman" || stored === "other") {
        setChoice(stored);
        applyTheme(stored);
      }
    } catch {
      // Ignore storage read issues and keep prompt interactive.
    }
  }, []);

  function onSelect(next: GenderThemeChoice) {
    setChoice(next);
    applyTheme(next);
    window.dispatchEvent(
      new CustomEvent<GenderThemeChoice>("gender-theme-change", {
        detail: next,
      }),
    );
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // If storage is unavailable (privacy mode / blocked), still proceed.
    }
  }

  if (choice) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-xl">
        <h2 className="font-serif text-2xl font-semibold text-zinc-950">
          Select your gender
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          This helps me personalise your experience.
        </p>
        <div className="mt-5 grid gap-2">
          <button
            type="button"
            className="rounded-md border border-zinc-950 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
            onClick={() => onSelect("man")}
          >
            Man
          </button>
          <button
            type="button"
            className="rounded-md border border-pink-300 bg-pink-100 px-4 py-2.5 text-sm font-medium text-pink-900 hover:bg-pink-200"
            onClick={() => onSelect("woman")}
          >
            Woman
          </button>
          <button
            type="button"
            className="rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            onClick={() => onSelect("other")}
          >
            Prefer not to say / Other
          </button>
        </div>
      </div>
    </div>
  );
}
