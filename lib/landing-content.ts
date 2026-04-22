/**
 * Editable profile and landing copy.
 */
export const LANDING_PROFILE = {
  name: "Nonso Biose",
  role: "Online coach · Personal trainer",
  imageSrc: "/images/image.jpg",
  imageAlt: "Portrait of Nonso Biose, coach and personal trainer",
} as const;

export const LANDING_COACH_STATS = {
  kicker: "In practice",
  heading: "These are my real coaching numbers",
  intro:
    "This is a straight snapshot from my actual client work. No vanity metrics, just the numbers behind the coaching.",
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

/** Short “I know…” lines: doubts that keep people from hiring a coach. Shown in the hero marquee. */
export const LANDING_WORRIES_MARQUEE = {
  ariaLabel: "Common worries before working with a coach",
  items: [
    "I know the cost makes you think twice.",
    "I know you've tried this before.",
    "I know your week is already full.",
    "I know the gym can feel like the wrong room.",
    "I know you're braced for a sales pitch.",
    "I know 'coach' might not sound like you.",
    "I know a rough experience still stings.",
    "I know starting over is exhausting.",
    "I know you're scared of being judged.",
    "I know figuring it out alone feels safer.",
  ] as const,
} as const;

export const LANDING_DIFFERENTIATOR = {
  kicker: "Approach",
  heading: "Beyond the plan",
  quote:
    "Most coaches give you a plan. I show you how to understand it, apply it, and make it work long-term.",
} as const;

export const LANDING_OFFER = {
  kicker: "The Offer",
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
    "I work with a small number of people who are serious about getting in shape and learning how to stay that way.",
  consultationCtaLabel: "See if you qualify",
  consultationBookingHref:
    "https://calendar.app.google/GzsEx1pyGuiESaxE8",
} as const;

export const LANDING_APP_SHOWCASE = {
  kicker: "Training app",
  heading: "See the app you train in",
  body:
    "When we work together, you get your full training setup inside the app: sessions, notes, and progress in one place.",
  supporting:
    "Swipe through the screens below to get a feel for how coaching looks week to week.",
  ctaLabel: "Check if you're a fit",
  bookingHref: "https://calendar.app.google/GzsEx1pyGuiESaxE8",
  screenshots: [
    "/mocks/1.png",
    "/mocks/2.png",
    "/mocks/3.png",
    "/mocks/4.png",
    "/mocks/5.png",
    "/mocks/6.png",
  ] as const,
} as const;

export const LANDING_PRICING = {
  kicker: "Pricing",
  heading: "Monthly coaching",
  intro:
    "Two tiers, monthly only. This is full coaching, not just sessions: training, programming, check-ins, and accountability built around your week.",
  packages: [
    {
      title: "2 sessions per week",
      description:
        "Structured coaching for consistent progress: two coached sessions each week, personalised programming for the rest of the week, nutrition targets, and check-ins.",
      price: "£400",
      priceSuffix: "/month",
      ctaLabel: "Get started",
      paymentHref: "https://pay.gocardless.com/BRT000501ZH29SG",
      features: [
        "2 PT sessions per week",
        "Personalised programming outside sessions",
        "Nutrition targets + adjustments",
        "Weekly check-ins and accountability support",
      ],
    },
    {
      title: "3 sessions per week",
      description:
        "High-touch coaching for faster results: three coached sessions each week, personalised programming, tighter feedback loops, and ongoing support.",
      price: "£600",
      priceSuffix: "/month",
      ctaLabel: "Get started",
      paymentHref: "https://pay.gocardless.com/BRT000501ZRXW0V",
      features: [
        "3 PT sessions per week",
        "Personalised programming outside sessions",
        "Nutrition targets + adjustments",
        "High-touch check-ins and accountability support",
      ],
    },
  ],
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
  /** In-app client forms (also linked after payment). */
  links: [
    { href: "/payment/confirmed", label: "Client onboarding" },
  ],
} as const;
