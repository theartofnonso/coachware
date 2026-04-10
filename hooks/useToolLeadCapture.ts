"use client";

import { postToolLead } from "@/lib/tool-lead-api";
import { stableToolResultContentKey } from "@/lib/tool-lead-key";
import { readLeadUnlock, writeLeadUnlock } from "@/lib/tool-lead-session";
import type { ToolId } from "@/types/tool-lead";
import { useCallback, useEffect, useMemo, useState } from "react";

export function useToolLeadCapture(toolId: ToolId, resultPayload: unknown) {
  const contentKey = useMemo(
    () => stableToolResultContentKey(toolId, resultPayload),
    [toolId, resultPayload],
  );

  const [unlocked, setUnlocked] = useState(false);
  const [lead, setLead] = useState<{
    firstName: string;
    email: string;
  } | null>(null);
  const [unlockSubmitting, setUnlockSubmitting] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  // Hydrate from sessionStorage when the result identity (contentKey) changes.
  useEffect(() => {
    queueMicrotask(() => {
      const stored = readLeadUnlock(contentKey);
      if (stored) {
        setLead(stored);
        setUnlocked(true);
      } else {
        setLead(null);
        setUnlocked(false);
      }
      setApiError(null);
      setEmailSent(false);
    });
  }, [contentKey]);

  const unlock = useCallback(
    async (firstName: string, email: string): Promise<boolean> => {
      setUnlockSubmitting(true);
      setApiError(null);
      const res = await postToolLead({
        tool: toolId,
        action: "unlock",
        firstName,
        email,
        result: resultPayload,
      });
      setUnlockSubmitting(false);
      if (!res.ok) {
        setApiError(res.error);
        return false;
      }
      writeLeadUnlock(contentKey, { firstName, email });
      setLead({ firstName, email });
      setUnlocked(true);
      return true;
    },
    [toolId, resultPayload, contentKey],
  );

  const sendEmail = useCallback(async (): Promise<boolean> => {
    if (!lead) {
      return false;
    }
    setSendingEmail(true);
    setApiError(null);
    setEmailSent(false);
    const res = await postToolLead({
      tool: toolId,
      action: "send_email",
      firstName: lead.firstName,
      email: lead.email,
      result: resultPayload,
    });
    setSendingEmail(false);
    if (!res.ok) {
      setApiError(res.error);
      return false;
    }
    setEmailSent(true);
    return true;
  }, [toolId, resultPayload, lead]);

  return {
    unlocked,
    lead,
    unlock,
    sendEmail,
    unlockSubmitting,
    sendingEmail,
    apiError,
    emailSent,
  };
}
