# Nutrition timing / meal structuring tool

A small Next.js app that turns **daily calories and macros** into **practical meal structure** around training. It is aimed at general users who want fat loss, balance/maintenance, or muscle gain without living in a spreadsheet.

## What it does

You enter your goal, calorie target, macro targets, **meal count (2 to 5)**, whether today is a **training or rest day**, and **what time you plan to train** on training days. The app returns:

- How many meals to use, **approximate eat windows on the clock**, and how to **time** them relative to training (or an even rhythm on rest days)
- **Protein** split as evenly as possible across meals (whole grams, deterministic)
- **Carb** emphasis biased toward meals before and after training on training days; more even on rest days, with intensity tuned by goal (fat loss, then balance/maintenance, then muscle gain)
- **Fat** allocation slightly reduced next to the pre workout meal, a bit higher away from the session
- Simple **placeholder meal ideas** (not recipes)
- A short **coaching-style note** tying the structure to adherence and performance

## How the logic works (high level)

1. **Rest day** is when you pick **Rest day** for today (no clock time). Pre/post labels disappear; macros use roughly even weighting.
2. **Meal count** is your choice: 2, 3, 4, or 5 meals per day (with two meals on training days, the plan is pre and post workout only).
3. Your **training start time** sets approximate **pre/post eat windows** and also maps to a **phase** (early / late morning, afternoon, evening) that drives meal **roles** (for example: early phase uses a small pre and strong post; evening puts pre/post near the end of the day).
4. **Protein** is split with a largest-remainder style even distribution.
5. **Carbs** use role-based weights (pre/post vs away from training), scaled by goal.
6. **Fats** use separate role weights (lighter before the workout).
7. **Warnings** (soft) appear for very low calories, very low carbs on training days, or unusual protein per meal, without blocking a plan.

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
