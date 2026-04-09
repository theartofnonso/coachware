/** Shared Tailwind class strings — calm B&W / zinc palette */
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
  card: "mb-5 rounded-[2px] border border-zinc-200 bg-white px-5 py-6 sm:px-7",
  cardTitle:
    "mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-500",
  field: "mb-5 last:mb-0",
  label: "mb-2 block text-sm font-medium text-zinc-950",
  hint: "mt-1.5 text-[0.8125rem] leading-snug text-zinc-500",
  input:
    "w-full rounded-[2px] border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  select:
    "w-full rounded-[2px] border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  grid2: "grid grid-cols-1 gap-3 sm:grid-cols-2",
  radioGroup: "flex flex-col gap-2",
  radioRow:
    "flex cursor-pointer items-start gap-2.5 rounded-[2px] border border-zinc-200 px-2.5 py-2 hover:border-zinc-300",
  radioInput: "mt-0.5 accent-zinc-950",
  radioText: "text-[0.9375rem] leading-snug text-zinc-950",
  toggleRow:
    "flex items-center justify-between gap-4 rounded-[2px] border border-zinc-200 px-3.5 py-3",
  toggleInput: "size-4 accent-zinc-950",
  errorBox:
    "mb-4 rounded-[2px] border border-zinc-300 bg-zinc-100 px-4 py-3.5 text-sm leading-normal text-zinc-950",
  actions: "mt-6 flex flex-wrap items-center gap-2.5 print:hidden",
  btnPrimary:
    "cursor-pointer rounded-[2px] border border-zinc-950 bg-zinc-950 px-[1.1rem] py-2.5 text-sm font-medium tracking-wide text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  btnSecondary:
    "cursor-pointer rounded-[2px] border border-zinc-950 bg-white px-[1.1rem] py-2.5 text-sm font-medium tracking-wide text-zinc-950 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  btnGhost:
    "cursor-pointer rounded-[2px] border border-zinc-300 bg-transparent px-[1.1rem] py-2.5 text-sm font-medium tracking-wide text-zinc-950 hover:border-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950",
  summaryGrid:
    "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4",
  summaryDt:
    "mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500",
  summaryDd: "m-0 text-base font-medium text-zinc-950",
  bullets:
    "m-0 list-disc space-y-1 pl-[1.1rem] text-[0.9375rem] leading-relaxed text-zinc-950",
  bodyText: "text-[0.9375rem] leading-relaxed text-zinc-950",
  tableWrap: "mt-4 overflow-x-auto [-webkit-overflow-scrolling:touch]",
  mealTable:
    "min-w-[16rem] w-full border-collapse text-sm [&_td]:border-b [&_td]:border-zinc-200 [&_td]:px-2 [&_td]:py-2.5 [&_td]:align-top [&_th]:border-b [&_th]:border-zinc-200 [&_th]:px-2 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[11px] [&_th]:font-medium [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-zinc-500",
  tabular: "whitespace-nowrap tabular-nums",
  mutedSmall: "mt-0.5 text-sm font-normal text-zinc-500",
  coachNote:
    "text-[0.9375rem] leading-relaxed text-zinc-950 italic",
  warnings:
    "mt-4 border-l-2 border-zinc-300 pl-3.5 text-sm leading-normal text-zinc-500 [&_ul]:mt-1.5 [&_ul]:pl-4",
  copyFeedback: "self-center text-[0.8125rem] text-zinc-500",
} as const;
