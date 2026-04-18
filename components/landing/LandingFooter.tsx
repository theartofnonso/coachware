import Link from "next/link";
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

function ParQFormIcon({ className }: { className?: string }) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}

function ClientAgreementIcon({ className }: { className?: string }) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8M8 9h2" />
    </svg>
  );
}

function FooterFormLinkIcon({ href }: { href: string }) {
  if (href === "/par-q") {
    return <ParQFormIcon className="size-4 shrink-0 opacity-90" />;
  }
  if (href === "/client-agreement") {
    return <ClientAgreementIcon className="size-4 shrink-0 opacity-90" />;
  }
  return null;
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
        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm font-medium"
          aria-label="Client forms"
        >
          {LANDING_FOOTER.links.map((item, i) => (
            <span key={item.href} className="inline-flex items-center gap-x-2">
              {i > 0 ? (
                <span className="select-none text-zinc-300" aria-hidden>
                  ·
                </span>
              ) : null}
              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline"
              >
                <FooterFormLinkIcon href={item.href} />
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
