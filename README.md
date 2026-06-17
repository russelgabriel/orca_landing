# Orca Health — Landing Page

Marketing/landing site for **Orca Health** — the modeling, contracting, and
specialist-engagement layer on top of CMS's 4i CARA module, built for LEAD ACOs
in the Global Risk Option.

Dual-purpose page: ACO design-partner lead capture + investor narrative.

## Stack

- **SvelteKit** (Svelte 5 runes) + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`, CSS-first tokens in `src/app.css`)
- **Motion One** for scroll-reveal and counter animations
- **@sveltejs/adapter-static** — fully prerendered, deployable to any static host
- Fonts: Geist (display) + Inter (body) via Fontsource

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build      # outputs static site to ./build
npm run preview    # preview the production build
npm run check      # type-check (svelte-check)
```

## Structure

```
src/
  app.css                         design tokens, base styles, animations
  routes/+page.svelte             assembles all sections
  lib/
    data/content.ts               all marketing copy (single source)
    actions/reveal.ts             scroll-reveal Svelte action
    components/
      primitives/                 Button, GlassCard, Marquee, Counter, etc.
      sections/                   Nav, Hero, Problem, Modules, HowItWorks,
                                  WhyNow, Market, Competitive, Company,
                                  Contact, Footer, Credibility
      Simulator.svelte            interactive CARA scenario simulator
      DashboardMockup.svelte      glass product preview in the hero
```

## Notes

- All figures, episodes, and dashboards are **synthetic** — no PHI / real CMS data.
- The lead form and investor CTA are front-end only; wire them to an email
  service (e.g. Resend) or CRM before launch.
- "Orca Health" is the brand name used throughout (replacing the prior
  "SpecLink" working name).
