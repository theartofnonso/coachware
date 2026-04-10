"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui } from "@/components/ui";

const links = [
  { href: "/", label: "Home" },
  { href: "/meal-timing", label: "Meal timing" },
  { href: "/weight-progression", label: "Weight progression" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-zinc-200 bg-zinc-50"
      aria-label="Site tools"
    >
      <div className="mx-auto flex max-w-2xl flex-wrap gap-x-6 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`${ui.navLink} ${active ? ui.navLinkActive : ""}`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
