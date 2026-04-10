import { validateLeadEmail, validateLeadFirstName } from "@/lib/tool-lead-validation";
import type { LeadAction, ToolId, ToolLeadResponse } from "@/types/tool-lead";
import { NextResponse } from "next/server";

const TOOL_IDS: ToolId[] = [
  "nutrition-timing",
  "weight-progression",
  "calories-calculator",
];
const ACTIONS: LeadAction[] = ["unlock", "send_email"];

function isToolId(v: unknown): v is ToolId {
  return typeof v === "string" && TOOL_IDS.includes(v as ToolId);
}

function isLeadAction(v: unknown): v is LeadAction {
  return typeof v === "string" && ACTIONS.includes(v as LeadAction);
}

/**
 * POST /api/tool-lead
 *
 * Stub: validates payload and returns success. No persistence or email yet.
 *
 * TODO: Persist lead + tool + action to database for CRM / analytics.
 * TODO: On send_email, enqueue transactional email (e.g. Resend / SES) with result payload.
 * TODO: Optional webhook to external CRM (HubSpot, etc.).
 * TODO: Rate limiting and abuse checks (per IP / email).
 */
export async function POST(
  req: Request,
): Promise<NextResponse<ToolLeadResponse>> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  if (!raw || typeof raw !== "object") {
    return NextResponse.json(
      { ok: false, error: "Request body must be an object." },
      { status: 400 },
    );
  }

  const b = raw as Record<string, unknown>;
  const tool = b.tool;
  const action = b.action;
  const firstName = b.firstName;
  const email = b.email;
  const result = b.result;

  if (!isToolId(tool)) {
    return NextResponse.json(
      { ok: false, error: "Invalid or missing tool." },
      { status: 400 },
    );
  }
  if (!isLeadAction(action)) {
    return NextResponse.json(
      { ok: false, error: "Invalid or missing action." },
      { status: 400 },
    );
  }
  if (typeof firstName !== "string") {
    return NextResponse.json(
      { ok: false, error: "First name is required." },
      { status: 400 },
    );
  }
  if (typeof email !== "string") {
    return NextResponse.json(
      { ok: false, error: "Email is required." },
      { status: 400 },
    );
  }

  const fnErr = validateLeadFirstName(firstName);
  if (fnErr) {
    return NextResponse.json({ ok: false, error: fnErr }, { status: 400 });
  }
  const emErr = validateLeadEmail(email);
  if (emErr) {
    return NextResponse.json({ ok: false, error: emErr }, { status: 400 });
  }

  if (result === undefined) {
    return NextResponse.json(
      { ok: false, error: "Result payload is required." },
      { status: 400 },
    );
  }

  if (process.env.NODE_ENV === "development") {
    // TODO: structured log + enqueue job (CRM / email / analytics)
    console.info("[api/tool-lead stub]", {
      tool,
      action,
      email: email.trim(),
    });
  }

  if (action === "unlock") {
    return NextResponse.json({
      ok: true,
      message: "Unlocked (stub).",
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Email queued (stub).",
  });
}
