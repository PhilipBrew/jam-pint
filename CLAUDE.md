# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build (static export)
npm run start    # serve production build
npm run lint     # lint
```

## Architecture

This is a **Next.js 16 (App Router)** project with **Tailwind CSS v4** and **TypeScript**. All pages are statically generated at build time — no server-side logic, no database.

### Structure

- **`app/layout.tsx`** — root layout shared across all pages: sticky nav (P.I.N.T brand + Home / About / People links) and footer. Uses `Geist` from `next/font/google`.
- **`app/globals.css`** — global styles, sets dark amber/pub colour scheme via CSS custom properties and `@theme inline` for Tailwind v4.
- **`app/page.tsx`** — homepage: hero with P.I.N.T branding, stats cards, location teaser.
- **`app/about/page.tsx`** — About page: origin story, mission statement, unofficial rules list.
- **`app/people/page.tsx`** — People page: 2-column grid of all 10 members, each with emoji avatar, name, title and bio. All member data lives in the `MEMBERS` const at the top of the file.

### Design system

Dark pub theme throughout: `stone-950` backgrounds, `amber-*` accents (400 for headings, 500 for CTAs, 600/700 for muted text), `stone-900` cards with `amber-900/30` borders. No external component library — plain Tailwind utility classes only.

### Deployment

Builds to fully static HTML/CSS/JS — can be deployed to Netlify, Vercel, or any static host.
