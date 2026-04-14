import type { LandingToolIcon } from "@/lib/landing-tools";
import type { ComponentType } from "react";

const stroke = {
  viewBox: "0 0 24 24" as const,
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconProtein({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      {/* Bars: protein “density” / comparison */}
      <path d="M7 18V10M12 18V6M17 18v-7" />
      <path d="M5 21h14" />
    </svg>
  );
}

function IconCalories({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h6M8 15h4" />
    </svg>
  );
}

function IconMealTiming({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconWeight({ className }: { className?: string }) {
  return (
    <svg {...stroke} className={className} aria-hidden>
      <path d="M4.5 10.5v3M19.5 10.5v3" />
      <path d="M6 9h12v6H6z" />
      <path d="M4.5 8.5v7M19.5 8.5v7" />
    </svg>
  );
}

const ICONS: Record<LandingToolIcon, ComponentType<{ className?: string }>> = {
  protein: IconProtein,
  calories: IconCalories,
  "meal-timing": IconMealTiming,
  weight: IconWeight,
};

export function ToolListIcon({
  name,
  className,
}: {
  name: LandingToolIcon;
  className?: string;
}) {
  const Cmp = ICONS[name];
  return <Cmp className={className} />;
}
