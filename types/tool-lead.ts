export type ToolId =
  | "nutrition-timing"
  | "weight-progression"
  | "calories-calculator"
  | "protein-checker";

export type LeadAction = "unlock" | "send_email";

/** POST /api/tool-lead JSON body */
export interface ToolLeadRequestBody {
  tool: ToolId;
  action: LeadAction;
  firstName: string;
  email: string;
  /** Structured + display payload for CRM / email jobs later */
  result: unknown;
}

export interface ToolLeadResponseOk {
  ok: true;
  message?: string;
}

export interface ToolLeadResponseErr {
  ok: false;
  error: string;
}

export type ToolLeadResponse = ToolLeadResponseOk | ToolLeadResponseErr;
