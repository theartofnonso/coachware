import { LANDING_CONTACT, LANDING_FOOTER } from "@/lib/landing-content";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LandingFooter() {
  const linkClass =
    "inline-flex items-center justify-center rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950";

  return (
    <footer className="border-t border-zinc-200 py-10 sm:py-12">
      <div className="mx-auto max-w-2xl text-center">
        <a
          href={LANDING_CONTACT.instagramUrl}
          className={linkClass}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon className="size-6 shrink-0" />
        </a>
        <p className="mx-auto mt-10 max-w-md text-pretty text-center text-sm font-medium leading-relaxed text-zinc-500 sm:max-w-lg">
          {LANDING_FOOTER.line}
        </p>
      </div>
    </footer>
  );
}
