import type { ToolId } from "@/types/tool-lead";
import { NOREPLY_FOOTER_PLAIN } from "@/lib/resend/copy";
import {
  getResend,
  getResendFromAddress,
  isResendReady,
  warnResendMissingInDev,
} from "@/lib/resend/client";
import {
  escapeHtml,
  simpleParagraphEmail,
  wrapPlainTextEmailBody,
} from "@/lib/resend/html";

const TOOL_SUBJECT: Record<ToolId, string> = {
  "calories-calculator": "Your calorie calculator results",
  "nutrition-timing": "Your meal timing plan",
  "weight-progression": "Your weight progression summary",
  "protein-checker": "Your protein checker results",
};

function toolPlainText(result: unknown): string {
  if (result && typeof result === "object" && "plainText" in result) {
    const pt = (result as { plainText?: unknown }).plainText;
    if (typeof pt === "string" && pt.trim().length > 0) {
      return pt;
    }
  }
  try {
    return JSON.stringify(result, null, 2);
  } catch {
    return String(result);
  }
}

export type SendEmailFailure = {
  ok: false;
  httpStatus: 503 | 500;
  message: string;
};

export type SendEmailOk = { ok: true };

export async function sendToolResultEmail(input: {
  to: string;
  firstName: string;
  tool: ToolId;
  result: unknown;
}): Promise<SendEmailOk | SendEmailFailure> {
  if (!isResendReady()) {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        httpStatus: 503,
        message: "Email delivery is temporarily unavailable.",
      };
    }
    warnResendMissingInDev();
    return { ok: true };
  }

  const resend = getResend();
  const from = getResendFromAddress();
  if (!resend || !from) {
    return {
      ok: false,
      httpStatus: 503,
      message: "Email delivery is temporarily unavailable.",
    };
  }

  const plain = toolPlainText(input.result);
  const subject = TOOL_SUBJECT[input.tool];
  const intro = `Hi ${input.firstName.trim()}, here is the full readout you asked us to send.`;

  const { error } = await resend.emails.send({
    from,
    to: input.to.trim(),
    subject,
    text: `${intro}\n\n${plain}${NOREPLY_FOOTER_PLAIN}`,
    html: wrapPlainTextEmailBody(intro, plain),
  });

  if (error) {
    console.error("[resend] tool result email", error);
    return {
      ok: false,
      httpStatus: 500,
      message: "Could not send the email. Please try again.",
    };
  }

  return { ok: true };
}

export async function sendCommunityWelcomeEmail(input: {
  to: string;
  firstName: string;
}): Promise<SendEmailOk | SendEmailFailure> {
  if (!isResendReady()) {
    if (process.env.NODE_ENV === "development") {
      warnResendMissingInDev();
    }
    return { ok: true };
  }

  const resend = getResend();
  const from = getResendFromAddress();
  if (!resend || !from) {
    return { ok: true };
  }

  const name = input.firstName.trim();
  const subject = "You are on the list";
  const text = `Hi ${name},\n\nThanks for joining the community. You will hear from us when there is something worth sharing.\n\n— Nonso${NOREPLY_FOOTER_PLAIN}`;

  const htmlBody = simpleParagraphEmail(
    `<p>Hi ${escapeHtml(name)},</p><p>Thanks for joining the community. You will hear from us when there is something worth sharing.</p><p style="margin-top:1.5rem;color:#52525b">— Nonso</p>`,
  );

  const { error } = await resend.emails.send({
    from,
    to: input.to.trim(),
    subject,
    text,
    html: htmlBody,
  });

  if (error) {
    console.error("[resend] community welcome email", error);
    return {
      ok: false,
      httpStatus: 500,
      message: "You are signed up, but we could not send a confirmation email.",
    };
  }

  return { ok: true };
}
