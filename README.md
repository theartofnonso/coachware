# Nutrition timing / meal structuring tool

A small Next.js app that turns **daily calories and macros** into **practical meal structure** around training — aimed at general users who want fat loss, recomposition, or muscle gain without living in a spreadsheet.

## What it does

You enter your goal, calorie target, macro targets, preferred meal count (or “recommend for me”), training time, and session type. The app returns:

- How many meals to use and how to **time** them relative to training (or an even rhythm on rest days)
- **Protein** split as evenly as possible across meals (whole grams, deterministic)
- **Carb** emphasis biased toward pre- and post-training on training days; more even on rest days, with intensity tuned by goal (fat loss → recomposition → muscle gain)
- **Fat** allocation slightly reduced next to pre-training, a bit higher away from the session
- Simple **placeholder meal ideas** (not recipes)
- A short **coaching-style note** tying the structure to adherence and performance

Optional **“Keep it simple”** mode shortens copy and hides the per-meal carb/fat tables while keeping the same underlying numbers.

## How the logic works (high level)

1. **Rest day** is triggered if either “When you train” or “Session type” is rest day. Pre/post labels disappear; macros use even-ish weighting.
2. **Meal count** is either your choice (3–5) or a deterministic recommendation from calories, protein density, and goal.
3. Each meal gets a **role** from training time (e.g. early morning → small pre + strong post; evening → earlier “other” meals + pre/post near the session).
4. **Protein** is split with a largest-remainder style even distribution.
5. **Carbs** use role-based weights (pre/post vs away from training), scaled by goal.
6. **Fats** use separate role weights (lighter pre-workout).
7. **Warnings** (soft) appear for very low calories, very low carbs on training days, or unusual protein per meal — without blocking a plan.

This is **guidance**, not medical advice. Adjust to appetite, digestion, and schedule.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # run production server
```

## Stack

- Next.js (App Router), TypeScript, [Tailwind CSS v4](https://tailwindcss.com) (PostCSS), shared utility strings in `components/ui.ts`.
