"use client";

import { useEffect, useState } from "react";
import {
  GENDER_THEME_CHANGE_EVENT,
  getRuntimeGenderChoice,
  setRuntimeGenderChoice,
  type GenderThemeChoice,
} from "@/lib/gender-theme-runtime";

function applyTheme(choice: GenderThemeChoice) {
  if (typeof document === "undefined") return;
  document.body.classList.remove("theme-woman");
  if (choice === "woman") {
    document.body.classList.add("theme-woman");
  }
}

export function GenderThemeGate() {
  const [choice, setChoice] = useState<GenderThemeChoice | null>(
    getRuntimeGenderChoice(),
  );

  useEffect(() => {
    if (choice) applyTheme(choice);
  }, [choice]);

  function onSelect(next: GenderThemeChoice) {
    setRuntimeGenderChoice(next);
    setChoice(next);
    applyTheme(next);
    try {
      window.dispatchEvent(
        new CustomEvent(GENDER_THEME_CHANGE_EVENT, {
          detail: next,
        }),
      );
    } catch {
      // Ignore custom event issues; selection should still complete.
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
            className="no-gender-theme cursor-pointer rounded-md border border-zinc-950 bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
            onClick={() => onSelect("default")}
          >
            Default
          </button>
          <button
            type="button"
            className="no-gender-theme cursor-pointer rounded-md border border-pink-600 bg-pink-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-pink-700"
            onClick={() => onSelect("woman")}
          >
            Woman
          </button>
        </div>
      </div>
    </div>
  );
}
