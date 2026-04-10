import { validateLeadEmail, validateLeadFirstName } from "@/lib/tool-lead-validation";
import type { CommunitySignupResponse } from "@/types/community";
import { NextResponse } from "next/server";

/**
 * POST /api/community
 *
 * Stub: validates name + email for community signup. Wire to email provider or CRM later.
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

  return NextResponse.json({
    ok: true,
    message: "Recorded (stub). Connect email or CRM when ready.",
  });
}
