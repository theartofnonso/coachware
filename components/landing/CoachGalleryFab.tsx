"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export const OPEN_COACH_GALLERY_EVENT = "open-coach-gallery";

const COACH_IMAGES = [
  {
    src: "/images/image1.jpg",
    alt: "Coach portrait in gym wear",
  },
  {
    src: "/images/image2.jpg",
    alt: "Coach portrait standing outdoors",
  },
] as const;

export function CoachGalleryFab() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onOpenGallery() {
      setIsOpen(true);
    }

    window.addEventListener(OPEN_COACH_GALLERY_EVENT, onOpenGallery);
    return () => {
      window.removeEventListener(OPEN_COACH_GALLERY_EVENT, onOpenGallery);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div id="gallery" className="sr-only" aria-hidden />

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-zinc-950/90"
          role="dialog"
          aria-modal="true"
          aria-label="Coach photo gallery"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white/90 text-zinc-900 backdrop-blur hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
            aria-label="Close gallery"
          >
            <X className="size-5" aria-hidden />
          </button>

          <div className="h-full w-full sm:flex sm:items-center sm:justify-center sm:p-6">
            <div className="h-full w-full overflow-y-auto bg-zinc-950 sm:h-auto sm:max-h-[85vh] sm:max-w-4xl sm:rounded-xl sm:border sm:border-zinc-700">
              <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95 px-5 py-4 backdrop-blur sm:px-6">
                <h2 className="font-serif text-xl font-semibold text-white">
                  Coach gallery
                </h2>
                <p className="mt-1 text-sm text-zinc-300">
                  See who you will be coached by.
                </p>
              </header>

              <div className="grid gap-0 sm:grid-cols-2 sm:gap-4 sm:p-4">
                {COACH_IMAGES.map((image, index) => (
                  <figure
                    key={image.src}
                    className="relative min-h-[80vh] border-b border-zinc-800 sm:aspect-[3/4] sm:min-h-0 sm:overflow-hidden sm:rounded-lg sm:border sm:border-zinc-800"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover sm:relative sm:h-auto sm:w-full sm:object-cover"
                      sizes="(min-width: 640px) 40vw, 100vw"
                      priority={index === 0}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
