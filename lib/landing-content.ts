/**
 * Editable profile and landing copy.
 */
export const LANDING_PROFILE = {
  name: "Nonso Biose",
  role: "Online coach · Personal trainer",
  imageSrc: "/images/image.jpg",
  imageAlt: "Portrait of Nonso Biose, coach and personal trainer",
} as const;

export const LANDING_HERO = {
  headline: "Get in shape and stay that way.",
  /** Rendered with emphasis on `emphasize` phrases. */
  sub: {
    prefix: "I help you ",
    emphasize: ["build muscle", "lose fat"] as const,
    suffix:
      ", and stay consistent without starting over every few months.",
  },
} as const;

export const LANDING_DIFFERENTIATOR = {
  kicker: "Approach",
  heading: "Beyond the plan",
  quote:
    "Most coaches give you a plan. I show you how to understand it, apply it, and make it work long-term.",
} as const;

export const LANDING_OFFER = {
  kicker: "What you get",
  heading: "What You Get",
  pillars: [
    {
      title: "Training",
      description: "Know exactly what to do every time you train.",
    },
    {
      title: "Nutrition",
      description: "Eat in a way that fits your lifestyle and still gets results.",
    },
    {
      title: "Coaching",
      description: "Stay consistent, even when motivation drops.",
    },
    {
      title: "Education",
      subtitle: "The Difference",
      description:
        "Understand it well enough to never rely on guesswork again.",
    },
  ],
  consultationLead:
    "If you want to see whether we are a fit, book a short consultation. No pressure, just a clear conversation.",
  consultationCtaLabel: "Book a consultation",
  /** TODO: Replace with your Cal.com, Calendly, or booking page URL. */
  consultationBookingHref: "https://example.com/book-consultation",
} as const;

export const LANDING_PROGRESS = {
  kicker: "The path",
  heading: "Your progress",
  intro:
    "Where you are now is not where you have to stay. Here is how the path tends to feel.",
  steps: [
    {
      phase: "Today",
      description: "Inconsistent. Guessing. Starting over.",
    },
    {
      phase: "Tomorrow",
      description: "Structured. Consistent. Making progress.",
    },
    {
      phase: "Future",
      description: "Confident. Self-sufficient. In control for life.",
    },
  ],
} as const;

export const LANDING_GUARANTEE = {
  kicker: "The promise",
  heading: "Guarantee",
  body:
    "If you follow my plan and don't see progress, I'll adjust everything until you do.",
} as const;

export const LANDING_CONTACT = {
  instagramHandle: "nonso.coach",
  instagramUrl: "https://www.instagram.com/nonso.coach",
} as const;

export const LANDING_TOOLS_SECTION = {
  kicker: "Free tools",
  heading: "Useful before we ever speak",
  intro:
    "These calculators and planners are yours to use anytime. They reflect how I think about training and food: clear inputs, clear outputs, no hype.",
} as const;

export const LANDING_COMMUNITY = {
  heading: "Stay close",
  supporting:
    "Join the community for openings, occasional notes on training and nutrition, and early access when capacity allows. No spam.",
  submitLabel: "Join the community",
  successMessage:
    "You are in. We will be in touch with updates when there is news.",
} as const;

export const LANDING_FOOTER = {
  line:
    "Nonso Biose · The real goal isn't only to get in shape. It's to keep it.",
} as const;
