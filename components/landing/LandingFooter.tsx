import Link from "next/link";
import {
  CalendarCheck2,
  Mail,
  MessageCircle,
  MessageSquareText,
} from "lucide-react";
import { LANDING_CONTACT, LANDING_FOOTER, LANDING_OFFER } from "@/lib/landing-content";

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
  return (
    <footer className="border-t border-zinc-200 py-6 sm:py-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto max-w-xl text-left sm:text-center">
          <div className="mt-2 flex flex-wrap gap-2 sm:justify-center">
            {LANDING_OFFER.consultationLinks.map((link) => {
              const openInNewTab = link.type === "whatsapp" || link.type === "calendar";
              const Icon =
                link.type === "email"
                  ? Mail
                  : link.type === "imessage"
                    ? MessageSquareText
                    : link.type === "whatsapp"
                      ? MessageCircle
                      : CalendarCheck2;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex min-h-10 items-center gap-2 px-1 py-1 text-sm font-medium text-zinc-700 underline-offset-4 hover:text-zinc-950 hover:underline"
                  target={openInNewTab ? "_blank" : undefined}
                  rel={openInNewTab ? "noopener noreferrer" : undefined}
                >
                  <Icon className="size-4" aria-hidden />
                  <span>{link.label}</span>
                </a>
              );
            })}
            <a
              href={LANDING_CONTACT.instagramUrl}
              className="inline-flex min-h-10 items-center gap-2 px-1 py-1 text-sm font-medium text-zinc-700 underline-offset-4 hover:text-zinc-950 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="size-4 shrink-0" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {LANDING_FOOTER.links.length > 0 ? (
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
        ) : null}
      </div>
    </footer>
  );
}
