"use client";

import type { ComponentProps } from "react";

export type DateInputProps = Omit<ComponentProps<"input">, "type">;

/**
 * WebKit date inputs ignore normal width constraints and can spill past the
 * card on narrow viewports. A bordered shell with overflow hidden clips the
 * native control while keeping the same visual weight as other text inputs.
 */
export function DateInput({ className, ...props }: DateInputProps) {
  const shell =
    "min-w-0 max-w-full overflow-hidden rounded-lg border border-zinc-300 bg-white focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-zinc-950";
  const field =
    "box-border w-full min-w-0 max-w-full appearance-none border-0 bg-transparent px-3 py-2.5 text-base text-zinc-950 outline-none [color-scheme:light]";

  return (
    <div className={className ? `${shell} ${className}` : shell}>
      <input type="date" className={field} {...props} />
    </div>
  );
}
