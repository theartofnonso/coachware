/** Shared Tailwind class strings: calm B&W / zinc palette */
export const ui = {
  page:
    "min-h-screen bg-zinc-50 px-4 py-8 pb-16 sm:px-6 sm:py-10 lg:px-8 lg:py-12 print:min-h-0 print:p-0",
  inner: "mx-auto max-w-2xl",
  header: "mb-10 border-b border-zinc-200 pb-6",
  kicker:
    "mb-2 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500",
  title:
    "font-serif text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-zinc-950 sm:text-4xl",
  lede: "mt-3 max-w-xl text-base leading-relaxed text-zinc-600",
  card: "mb-5 rounded-lg border border-zinc-200 bg-white px-5 py-6 sm:px-7",
  cardTitle:
    "mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-500",
  field: "mb-5 last:mb-0",
  label: "mb-2 block text-sm font-medium text-zinc-950",
  hint: "mt-1.5 text-[0.8125rem] leading-snug text-zinc-500",
  /** Inline validation / field-level errors */
  fieldError:
    "mt-1.5 text-[0.8125rem] font-medium leading-snug text-red-600",
  input:
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  select:
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  grid2: "grid grid-cols-1 gap-3 sm:grid-cols-2",
  radioGroup: "flex flex-col gap-2",
  radioRow:
    "flex cursor-pointer items-start gap-2.5 rounded-lg border border-zinc-200 px-2.5 py-2 hover:border-zinc-300",
  radioInput: "mt-0.5 accent-zinc-950",
  radioText: "text-[0.9375rem] leading-snug text-zinc-950",
  errorBox:
    "mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-medium leading-normal text-red-900",
  actions: "mt-6 flex flex-wrap items-center gap-2.5 print:hidden",
  btnPrimary:
    "cursor-pointer rounded-sm border border-zinc-950 bg-zinc-950 px-[1.1rem] py-2.5 text-sm font-medium tracking-wide text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  btnSecondary:
    "cursor-pointer rounded-sm border border-zinc-950 bg-white px-[1.1rem] py-2.5 text-sm font-medium tracking-wide text-zinc-950 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  btnGhost:
    "cursor-pointer rounded-sm border border-zinc-300 bg-transparent px-[1.1rem] py-2.5 text-sm font-medium tracking-wide text-zinc-950 hover:border-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  btnText:
    "cursor-pointer border-0 bg-transparent p-0 text-sm font-semibold tracking-wide text-zinc-950 underline underline-offset-[0.22rem] decoration-zinc-400 hover:decoration-zinc-950 hover:text-zinc-800 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  summaryGrid:
    "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4",
  summaryDt:
    "mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500",
  summaryDd: "m-0 text-base font-medium text-zinc-950",
  bullets:
    "m-0 list-disc space-y-1 pl-[1.1rem] text-[0.9375rem] leading-relaxed text-zinc-950",
  bodyText: "text-[0.9375rem] leading-relaxed text-zinc-950",
  tableWrap:
    "mt-4 overflow-hidden overflow-x-auto rounded-lg border border-zinc-200 [-webkit-overflow-scrolling:touch]",
  mealTable:
    "min-w-[16rem] w-full border-collapse text-sm [&_td]:border-b [&_td]:border-zinc-200 [&_td]:px-2 [&_td]:py-2.5 [&_td]:align-top [&_th]:border-b [&_th]:border-zinc-200 [&_th]:px-2 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[11px] [&_th]:font-medium [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-zinc-500",
  tabular: "whitespace-nowrap tabular-nums",
  mutedSmall: "mt-0.5 text-sm font-normal text-zinc-500",
  coachNote:
    "text-[0.9375rem] leading-relaxed text-zinc-950 italic",
  warnings:
    "mt-4 border-l-2 border-zinc-300 pl-3.5 text-sm leading-normal text-zinc-500 [&_ul]:mt-1.5 [&_ul]:pl-4",
  copyFeedback: "self-center text-[0.8125rem] text-zinc-500",
  progressTrack:
    "h-1 w-full overflow-hidden rounded-full bg-zinc-200",
  progressFill:
    "h-full rounded-full bg-zinc-950 transition-[width] duration-500 ease-out motion-reduce:transition-none",
  progressSteps: "m-0 list-none space-y-3 p-0",
  progressStepRow: "flex items-start gap-3 text-[0.9375rem] leading-snug",
  progressStepDone: "text-zinc-950",
  progressStepPending: "text-zinc-400",
  progressStepActive: "font-medium text-zinc-950",
  progressMark:
    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white text-[0.65rem] font-semibold text-zinc-950",
  progressMarkDone:
    "border-zinc-950 bg-zinc-950 text-white",
  progressMarkActive:
    "border-zinc-950 bg-zinc-50",
  progressSpinner:
    "size-3.5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-950 motion-reduce:animate-none",
  /** Prominent progression outcome headline */
  decisionOutcome:
    "rounded-lg border-2 border-zinc-950 bg-zinc-50 px-4 py-5 text-center sm:px-6",
  decisionOutcomeText:
    "font-serif text-xl font-semibold leading-snug tracking-[-0.02em] text-zinc-950 sm:text-2xl",
  navLink:
    "text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950",
  navLinkActive: "text-zinc-950",
  /** Lead gate: blurred / clipped preview of locked content */
  leadGateMask:
    "relative max-h-[min(26rem,52vh)] overflow-hidden blur-[2.5px] opacity-[0.52] select-none motion-reduce:blur-none motion-reduce:opacity-90",
  leadGateFade:
    "pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent",
  leadPanel:
    "rounded-lg border border-zinc-200 bg-white px-5 py-6 sm:px-7",
  leadPanelTitle:
    "mb-1 font-serif text-lg font-semibold text-zinc-950 sm:text-xl",
  leadPanelHint: "mb-5 text-[0.9375rem] leading-relaxed text-zinc-600",
  /** Landing / profile page: wider measure, editorial spacing */
  landingPage:
    "min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-950 antialiased",
  landingInner: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8",
  landingSection:
    "scroll-mt-24 border-t border-zinc-200 py-16 sm:py-20 lg:py-24 first:border-t-0 first:pt-8 sm:first:pt-10 lg:first:pt-12",
  landingHeroTitle:
    "font-serif text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.03em] text-zinc-950 sm:text-5xl lg:text-[3.25rem]",
  landingSectionTitle:
    "mb-3 font-serif text-2xl font-semibold tracking-[-0.02em] text-zinc-950 sm:mb-4 sm:text-3xl",
  landingSectionKicker:
    "mb-2 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500",
  landingBody: "max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-[1.0625rem]",
  landingNavMax: "mx-auto max-w-4xl",
} as const;
