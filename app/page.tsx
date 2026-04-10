import type { Metadata } from "next";
import Link from "next/link";
import { ui } from "@/components/ui";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Practical tools for meal timing around training and rep-based weight progression.",
};

export default function HomePage() {
  return (
    <div className={ui.page}>
      <div className={ui.inner}>
        <header className={ui.header}>
          <p className={ui.kicker}>Coachware</p>
          <h1 className={ui.title}>Training tools</h1>
          <p className={ui.lede}>
            Two focused helpers: structure meals around your day, and decide
            when to add reps or load on a lift.
          </p>
        </header>

        <ul className="m-0 list-none space-y-4 p-0">
          <li>
            <Link
              href="/meal-timing"
              className={`${ui.card} block text-inherit no-underline transition-colors hover:border-zinc-400`}
            >
              <h2 className={ui.cardTitle}>Meal timing</h2>
              <p className={`${ui.bodyText} text-zinc-600`}>
                Map calories and macros to meals and clock windows around
                training or rest days.
              </p>
            </Link>
          </li>
          <li>
            <Link
              href="/weight-progression"
              className={`${ui.card} block text-inherit no-underline transition-colors hover:border-zinc-400`}
            >
              <h2 className={ui.cardTitle}>Weight progression</h2>
              <p className={`${ui.bodyText} text-zinc-600`}>
                Use your rep range and last session to choose hold, add reps, go
                heavier, or rebuild lighter.
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
