import {
  getSupabaseServiceRole,
  warnSupabaseMissingInDev,
} from "@/lib/supabase/service-role";

export type PersistFailure = {
  ok: false;
  httpStatus: 503 | 500;
  message: string;
};

export type PersistOk = { ok: true };

/** Serializable value for Postgres `jsonb` */
type Jsonb = string | number | boolean | null | Jsonb[] | { [key: string]: Jsonb };

function toJsonb(value: unknown): Jsonb {
  return JSON.parse(JSON.stringify(value ?? null)) as Jsonb;
}

export async function persistCommunitySignup(input: {
  firstName: string;
  email: string;
}): Promise<PersistOk | PersistFailure> {
  const supabase = getSupabaseServiceRole();
  if (!supabase) {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        httpStatus: 503,
        message: "Service temporarily unavailable.",
      };
    }
    warnSupabaseMissingInDev();
    return { ok: true };
  }

  const { error } = await supabase.from("community_signups").insert({
    first_name: input.firstName.trim(),
    email: input.email.trim().toLowerCase(),
  });

  if (error) {
    console.error("[supabase] community_signups insert", error);
    return {
      ok: false,
      httpStatus: 500,
      message: "Could not save your signup. Please try again.",
    };
  }

  return { ok: true };
}

export async function persistParQSubmission(input: {
  payload: unknown;
}): Promise<PersistOk | PersistFailure> {
  const supabase = getSupabaseServiceRole();
  if (!supabase) {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        httpStatus: 503,
        message: "Service temporarily unavailable.",
      };
    }
    warnSupabaseMissingInDev();
    return { ok: true };
  }

  const { error } = await supabase.from("par_q_submissions").insert({
    payload: toJsonb(input.payload),
  });

  if (error) {
    console.error("[supabase] par_q_submissions insert", error);
    return {
      ok: false,
      httpStatus: 500,
      message: "Could not save your form. Please try again.",
    };
  }

  return { ok: true };
}

export async function persistClientAgreementSubmission(input: {
  payload: unknown;
}): Promise<PersistOk | PersistFailure> {
  const supabase = getSupabaseServiceRole();
  if (!supabase) {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        httpStatus: 503,
        message: "Service temporarily unavailable.",
      };
    }
    warnSupabaseMissingInDev();
    return { ok: true };
  }

  const { error } = await supabase.from("client_agreement_submissions").insert({
    payload: toJsonb(input.payload),
  });

  if (error) {
    console.error("[supabase] client_agreement_submissions insert", error);
    return {
      ok: false,
      httpStatus: 500,
      message: "Could not save your agreement. Please try again.",
    };
  }

  return { ok: true };
}
