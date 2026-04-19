"use client";

import { ui } from "@/components/ui";
import type { ParQYesNoField } from "@/types/parq";

type Props = {
  name: string;
  legend: string;
  value: ParQYesNoField;
  onChange: (next: boolean) => void;
};

export function ParQYesNoRadios({ name, legend, value, onChange }: Props) {
  return (
    <fieldset className="mb-3 min-w-0 border-0 p-0 last:mb-0">
      <legend className="mb-1.5 block min-w-0 max-w-full break-words text-pretty text-sm font-medium leading-snug text-zinc-950">
        {legend}
      </legend>
      <div className="mt-1 flex min-w-0 max-w-full flex-row flex-wrap gap-2">
        <label className={`${ui.radioRow} min-w-0 flex-1 items-center sm:flex-none`}>
          <input
            type="radio"
            name={name}
            checked={value === true}
            onChange={() => onChange(true)}
            className={ui.radioInput}
          />
          <span className={ui.radioText}>Yes</span>
        </label>
        <label className={`${ui.radioRow} min-w-0 flex-1 items-center sm:flex-none`}>
          <input
            type="radio"
            name={name}
            checked={value === false}
            onChange={() => onChange(false)}
            className={ui.radioInput}
          />
          <span className={ui.radioText}>No</span>
        </label>
      </div>
    </fieldset>
  );
}
