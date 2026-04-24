export type GenderThemeChoice = "man" | "woman" | "other";

export const GENDER_THEME_CHANGE_EVENT = "gender-theme-change";

let runtimeGenderChoice: GenderThemeChoice | null = null;

export function getRuntimeGenderChoice(): GenderThemeChoice | null {
  return runtimeGenderChoice;
}

export function setRuntimeGenderChoice(choice: GenderThemeChoice) {
  runtimeGenderChoice = choice;
}
