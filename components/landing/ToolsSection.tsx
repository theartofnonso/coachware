import Link from "next/link";
import { ui } from "@/components/ui";
import { LANDING_TOOLS_SECTION } from "@/lib/landing-content";
import { LANDING_TOOLS } from "@/lib/landing-tools";

export function ToolsSection() {
  return (
    <section
      id="tools"
      className={ui.landingSection}
      aria-labelledby="tools-heading"
    >
      <p className={ui.landingSectionKicker}>{LANDING_TOOLS_SECTION.kicker}</p>
      <h2 id="tools-heading" className={ui.landingSectionTitle}>
        {LANDING_TOOLS_SECTION.heading}
      </h2>
      <p className={`${ui.landingBody} mt-6 max-w-2xl`}>
        {LANDING_TOOLS_SECTION.intro}
      </p>
      <ul className="mt-10 m-0 list-none space-y-4 p-0">
        {LANDING_TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="group flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white px-5 py-5 transition-colors hover:border-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6"
            >
              <div className="min-w-0">
                <span className="block font-medium text-zinc-950">
                  {tool.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-zinc-600">
                  {tool.description}
                </span>
              </div>
              <span className="mt-3 shrink-0 text-sm font-medium text-zinc-950 underline-offset-4 group-hover:underline sm:mt-0">
                Open
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
