import Image from "next/image";
import { ui } from "@/components/ui";
import { LANDING_APP_SHOWCASE } from "@/lib/landing-content";

export function AppShowcaseSection() {
  return (
    <section
      id="app"
      className={ui.landingSection}
      aria-labelledby="app-showcase-heading"
    >
      <div className="mx-auto max-w-4xl">
        <p className={ui.landingSectionKicker}>{LANDING_APP_SHOWCASE.kicker}</p>
        <h2 id="app-showcase-heading" className={ui.landingSectionTitle}>
          {LANDING_APP_SHOWCASE.heading}
        </h2>
        <p className={ui.landingBody}>{LANDING_APP_SHOWCASE.body}</p>
        <p className={`${ui.landingBody} mt-3`}>{LANDING_APP_SHOWCASE.supporting}</p>
      </div>

      <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 sm:mt-10">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-webkit-overflow-scrolling:touch] sm:gap-5 sm:px-6 lg:px-8">
          {LANDING_APP_SHOWCASE.screenshots.map((src, index) => (
            <figure
              key={src}
              className="w-[76vw] max-w-[23rem] shrink-0 snap-center overflow-hidden"
            >
              <Image
                src={src}
                alt={`Training app screen ${index + 1}`}
                width={1290}
                height={2796}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1280px) 26rem, (min-width: 640px) 46vw, 82vw"
              />
            </figure>
          ))}
        </div>
      </div>

    </section>
  );
}
