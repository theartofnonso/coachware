import { parseParQRequestBody } from "@/lib/parq-validation";
import { persistParQSubmission } from "@/lib/supabase/persist-leads";
import type { ParQApiResponse } from "@/types/parq";
import { NextResponse } from "next/server";

/**
 * POST /api/par-q
 *
 * Accepts structured PAR-Q JSON, validates, persists to Supabase (`par_q_submissions`).
 */
export async function POST(req: Request): Promise<NextResponse<ParQApiResponse>> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = parseParQRequestBody(raw);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, error: parsed.error },
      { status: 400 },
    );
  }

  const saved = await persistParQSubmission({ payload: parsed.payload });
  if (!saved.ok) {
    return NextResponse.json(
      { ok: false, error: saved.message },
      { status: saved.httpStatus },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Your questionnaire has been submitted.",
  });
}
