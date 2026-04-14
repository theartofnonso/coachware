import { LANDING_WORRIES_MARQUEE } from "@/lib/landing-content";

export function WorriesMarqueeSection() {
  const items = LANDING_WORRIES_MARQUEE.items;
  const track = [...items, ...items];

  return (
    <section
      aria-label={LANDING_WORRIES_MARQUEE.ariaLabel}
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-t border-zinc-200/90 bg-zinc-100/70 py-3.5 sm:py-4"
    >
      <ul className="sr-only motion-reduce:hidden">
        {items.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <ul className="m-0 hidden list-none flex-wrap justify-center gap-x-3 gap-y-2 px-4 py-1 text-center motion-reduce:flex sm:gap-x-4">
        {items.map((line) => (
          <li
            key={line}
            className="max-w-[min(100%,20rem)] text-[0.9375rem] font-light leading-snug text-zinc-700"
          >
            {line}
          </li>
        ))}
      </ul>

      <div className="motion-reduce:hidden" aria-hidden>
        <div className="flex w-max animate-landing-marquee hover:[animation-play-state:paused]">
          {track.map((line, i) => (
            <span
              key={`${i}-${line}`}
              className="flex shrink-0 items-center gap-8 pl-8 sm:gap-10 sm:pl-10"
            >
              <span className="whitespace-nowrap text-[0.9375rem] font-light leading-snug text-zinc-700">
                {line}
              </span>
              <span className="select-none text-zinc-300" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
