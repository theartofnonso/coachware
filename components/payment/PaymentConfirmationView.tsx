import Link from "next/link";
import { TimelineList } from "@/components/TimelineList";
import { ui } from "@/components/ui";
import type { PaymentConfirmationCopy } from "@/lib/payment-confirmation-content";

type Props = { copy: PaymentConfirmationCopy };

export function PaymentConfirmationView({ copy }: Props) {
  const nextTitle = copy.nextStepsTitle ?? "What happens next";
  const nextId = "payment-next-heading";

  return (
    <div className={ui.page}>
      <div className={ui.inner}>
        <header className={ui.header}>
          <p className={ui.kicker}>{copy.kicker}</p>
          <h1 className={ui.title}>{copy.headline}</h1>
        </header>

        {copy.paragraphs.length > 0 ? (
          <div className={`${ui.card} space-y-4`}>
            {copy.paragraphs.map((p) => (
              <p
                key={p}
                className="m-0 text-[0.9375rem] leading-relaxed text-zinc-700"
              >
                {p}
              </p>
            ))}
          </div>
        ) : null}

        {copy.nextSteps && copy.nextSteps.length > 0 ? (
          <div
            className="mt-10 max-w-2xl"
            role="region"
            aria-labelledby={nextId}
          >
            <h2 id={nextId} className={ui.landingSectionTitle}>
              {nextTitle}
            </h2>
            <TimelineList
              steps={copy.nextSteps}
              className="mt-8"
              stepKey={(step, index) => `${index}-${step.phase}`}
              openCtaInNewTab
            />
          </div>
        ) : null}

        <div className={ui.actions}>
          <Link
            href={copy.primaryCta.href}
            className={ui.btnSecondary}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.primaryCta.label}
          </Link>
          {copy.secondaryCta ? (
            <Link
              href={copy.secondaryCta.href}
              className={ui.btnSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.secondaryCta.label}
            </Link>
          ) : null}
          {copy.tertiaryCta ? (
            <Link
              href={copy.tertiaryCta.href}
              className={ui.btnGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.tertiaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
