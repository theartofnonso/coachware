"use client";

import { LeadCaptureForm } from "@/components/lead/LeadCaptureForm";
import { ui } from "@/components/ui";
import { useToolLeadCapture } from "@/hooks/useToolLeadCapture";
import type { ToolId } from "@/types/tool-lead";
import type { ReactNode } from "react";

type Props = {
  toolId: ToolId;
  resultPayload: unknown;
  preview: ReactNode;
  gated: ReactNode;
  /** Shown while locked; explains what unlock adds */
  lockedTeaser: string;
  /** Primary button label on the lead form */
  unlockButtonLabel?: string;
  /** Always visible (e.g. Edit / Start over) */
  persistentActions: ReactNode;
};

export function GatedToolResult({
  toolId,
  resultPayload,
  preview,
  gated,
  lockedTeaser,
  unlockButtonLabel,
  persistentActions,
}: Props) {
  const {
    unlocked,
    unlock,
    sendEmail,
    unlockSubmitting,
    sendingEmail,
    apiError,
    emailSent,
  } = useToolLeadCapture(toolId, resultPayload);

  return (
    <div>
      {preview}

      {!unlocked && (
        <p
          className={`${ui.bodyText} mb-4 border-l-2 border-zinc-300 pl-3.5 text-zinc-600`}
        >
          {lockedTeaser}
        </p>
      )}

      <div className="relative mb-5">
        <div className={unlocked ? "" : ui.leadGateMask}>{gated}</div>
        {!unlocked && <div className={ui.leadGateFade} aria-hidden />}
      </div>

      {!unlocked && (
        <LeadCaptureForm
          onSubmit={async ({ firstName, email }) => {
            await unlock(firstName, email);
          }}
          loading={unlockSubmitting}
          apiError={unlockSubmitting ? null : apiError}
          submitLabel={unlockButtonLabel ?? "Unlock full result"}
        />
      )}

      <div className={ui.actions}>
        {persistentActions}
        <button
          type="button"
          className={ui.btnSecondary}
          disabled={!unlocked || sendingEmail}
          title={
            unlocked
              ? undefined
              : "Unlock your full result first to email it."
          }
          onClick={() => void sendEmail()}
        >
          {sendingEmail ? "Sending…" : "Send result to email"}
        </button>
        {emailSent && (
          <span className={ui.copyFeedback} aria-live="polite">
            We will email you shortly (confirmation stub).
          </span>
        )}
        {unlocked && apiError && !sendingEmail && (
          <span className={`${ui.copyFeedback} text-zinc-950`} role="alert">
            {apiError}
          </span>
        )}
      </div>
    </div>
  );
}
