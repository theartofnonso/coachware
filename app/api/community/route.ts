import { persistCommunitySignup } from "@/lib/supabase/persist-leads";
import { sendCommunityWelcomeEmail } from "@/lib/resend/send-emails";
import { validateLeadEmail, validateLeadFirstName } from "@/lib/tool-lead-validation";
import type { CommunitySignupResponse } from "@/types/community";
import { NextResponse } from "next/server";

/**
 * POST /api/community
 *
 * Validates name + email, inserts into Supabase (`community_signups`),
 * then sends a welcome email via Resend when configured.
 */
export async function POST(
  req: Request,
): Promise<NextResponse<CommunitySignupResponse>> {
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
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const body = raw as Record<string, unknown>;
  const firstName =
    typeof body.firstName === "string" ? body.firstName : "";
  const email = typeof body.email === "string" ? body.email : "";

  const fnErr = validateLeadFirstName(firstName);
  const emErr = validateLeadEmail(email);
  if (fnErr || emErr) {
    return NextResponse.json(
      { ok: false, error: fnErr ?? emErr ?? "Validation failed." },
      { status: 400 },
    );
  }

  const saved = await persistCommunitySignup({ firstName, email });
  if (!saved.ok) {
    return NextResponse.json(
      { ok: false, error: saved.message },
      { status: saved.httpStatus },
    );
  }

  const sent = await sendCommunityWelcomeEmail({
    to: email.trim(),
    firstName: firstName.trim(),
  });
  if (!sent.ok) {
    return NextResponse.json(
      { ok: false, error: sent.message },
      { status: sent.httpStatus },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "You are on the list.",
  });
}
