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
  heading: "and then Solo or coaching",
  intro:
    "I don't sell single sessions. Coaching is monthly, and you choose how much support you need.",
  introOffer: {
    kicker: "Intro offer",
    headline: "Intro first",
    body: "Two sessions to meet, assess, and see if we are a fit.",
    price: "£40",
    priceCaption: "for two sessions",
    ctaLabel: "Start with this intro",
    paymentHref: "https://pay.gocardless.com/BRT000501Z5X5NG",
  },
  solo: {
    name: "Solo",
    tagline: "For people who just need direction.",
    audience: "Structure and tools. You train independently.",
    price: "£40",
    priceSuffix: "/month",
    ctaLabel: "Start Solo",
    paymentHref: "https://pay.gocardless.com/BRT000501ZDNHFW",
    features: [
      "Personalised training plan",
      "Calories + protein targets",
      "Monthly check-in (message or call)",
    ],
  },
  coaching: {
    name: "Coaching",
    tagline: "For people who want accountability and real results.",
    tiers: [
      {
        tierLabel: "1 session per week",
        price: "£120",
        priceSuffix: "/month",
        ctaLabel: "Choose this plan",
        paymentHref: "https://pay.gocardless.com/BRT000501ZG12YC",
        features: [
          "1 PT session per week",
          "Everything in Solo",
          "Weekly check-ins",
        ],
        highlighted: false,
      },
      {
        tierLabel: "2 sessions per week",
        price: "£180",
        priceSuffix: "/month",
        badge: "Most popular",
        ctaLabel: "Choose this plan",
        paymentHref: "https://pay.gocardless.com/BRT000501ZH29SG",
        features: [
          "2 PT sessions per week",
          "Everything in Solo",
          "Weekly check-ins",
        ],
        highlighted: true,
      },
      {
        tierLabel: "3 sessions per week",
        price: "£240",
        priceSuffix: "/month",
        ctaLabel: "Choose this plan",
        paymentHref: "https://pay.gocardless.com/BRT000501ZRXW0V",
        features: [
          "3 PT sessions per week",
          "Everything in Solo",
          "Weekly check-ins",
        ],
        highlighted: false,
      },
    ],
  },
  footerLead:
    "Not sure which fits? Start with the intro and we will map the right tier from there.",
  ctaLabel: "Start with the intro",
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
