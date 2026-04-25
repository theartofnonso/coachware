import type { Metadata } from "next";
import { CalendarCheck2, Mail, MessageCircle, MessageSquareText } from "lucide-react";
import { ui } from "@/components/ui";
import { LANDING_OFFER, LANDING_PROFILE } from "@/lib/landing-content";

const CONTACT_LINK_ICONS = {
  email: Mail,
  imessage: MessageSquareText,
  whatsapp: MessageCircle,
  calendar: CalendarCheck2,
} as const;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nonso Biose directly by Email, iMessage, WhatsApp, or booking a call via Calendar.",
};

export default function ContactPage() {
  return (
    <main className={ui.page}>
      <div className={ui.inner}>
        <header className={ui.header}>
          <p className={ui.kicker}>Reach out directly</p>
          <h1 className={ui.title}>Contact {LANDING_PROFILE.name}</h1>
          <p className={ui.lede}>
            Choose the quickest way to reach me. If you prefer to schedule a call,
            use the calendar link.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          {LANDING_OFFER.consultationLinks.map((link) => {
            const Icon = CONTACT_LINK_ICONS[link.type];
            const openInNewTab =
              link.type === "whatsapp" || link.type === "calendar";
            return (
              <a
                key={link.type}
                href={link.href}
                className="group flex min-h-16 items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-zinc-300"
                target={openInNewTab ? "_blank" : undefined}
                rel={openInNewTab ? "noopener noreferrer" : undefined}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700 group-hover:border-zinc-300">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold text-zinc-950">
                    {link.label}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {link.type === "calendar"
                      ? "Book a call"
                      : link.type === "whatsapp"
                        ? "Message on WhatsApp"
                        : link.type === "imessage"
                          ? "Message via iMessage/SMS"
                          : "Send an email"}
                  </span>
                </span>
              </a>
            );
          })}
        </div>

        <div className={`${ui.card} mt-4`}>
          <h2 className="mb-2 font-serif text-xl font-semibold text-zinc-950">
            Direct details
          </h2>
          <p className="m-0 text-[0.9375rem] leading-relaxed text-zinc-700">
            Email: e.nonsobiose@gmail.com
            <br />
            Phone / iMessage / WhatsApp: +44 7881 707440
          </p>
        </div>
      </div>
    </main>
  );
}
