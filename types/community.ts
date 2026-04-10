export interface CommunitySignupResponseOk {
  ok: true;
  message?: string;
}

export interface CommunitySignupResponseErr {
  ok: false;
  error: string;
}

export type CommunitySignupResponse =
  | CommunitySignupResponseOk
  | CommunitySignupResponseErr;
