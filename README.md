<p align="center">
  <a href="https://rajdeep-singh.vercel.app">
    <img src="public/icon.png" alt="Rajdeep Singh" width="80" height="80" />
  </a>
</p>

<h1 align="center">Rajdeep Singh — Portfolio</h1>

<p align="center">
  <strong>A sleek, modern developer portfolio, component registry, and blog.</strong><br />
  Built with Next.js 16 · React 19 · Tailwind CSS v4 — featuring real-time integrations,
  an AI assistant, and meticulous animations.
</p>

<p align="center">
  <a href="https://rajdeep-singh.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-Visit_Site-0070f3?style=for-the-badge" alt="Live Demo" />
  </a>
  <a href="https://github.com/RajdeepKushwaha5/sleeky/stargazers">
    <img src="https://img.shields.io/github/stars/RajdeepKushwaha5/sleeky?style=for-the-badge&color=yellow" alt="Stars" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" alt="License" />
  </a>
</p>

<br />

---

## Overview

This repository powers [rajdeep-singh.vercel.app](https://rajdeep-singh.vercel.app) — a single‑page,
content‑rich portfolio that doubles as a **shadcn‑compatible component registry** and an **MDX blog**.

It pulls live data from several services (Discord, Spotify, WakaTime, GitHub), answers questions through
a Gemini‑powered AI assistant, and ships polished UX details: a command menu, keyboard navigation,
smooth scrolling, a macOS‑style dock, dark/light themes, and a generated CAD‑style hero diagram.

---

## Features

| Status                                                                  | Feature                | Description                                                            |
| :---------------------------------------------------------------------- | :--------------------- | :-------------------------------------------------------------------- |
| ![Performance](https://img.shields.io/badge/Performance-High-blue)      | **Lightning Fast**     | Next.js 16 App Router + Turbopack, React Server Components             |
| ![Design](https://img.shields.io/badge/Design-Premium-vibrantgreen)     | **Sleek UI**           | Tailwind v4, shadcn/ui, Radix primitives, dark/light themes           |
| ![Animation](https://img.shields.io/badge/Motion-Framer-ff0080)         | **Motion**             | Framer Motion, Lenis smooth scroll, scroll‑driven reveals             |
| ![Intelligence](https://img.shields.io/badge/AI-Gemini_2.5-brightgreen) | **AI Assistant**       | In‑page chatbot powered by Google Gemini 2.5 Flash                    |
| ![Real-time](https://img.shields.io/badge/Real--time-Active-success)    | **Live Status**        | Real‑time Discord, Spotify & VS Code activity via the Lanyard API     |
| ![Music](https://img.shields.io/badge/Spotify-Now_Playing-1DB954)       | **Spotify**            | Now‑playing and recently‑played tracks via the Spotify Web API        |
| ![Analytics](https://img.shields.io/badge/Stats-WakaTime-informational) | **Coding Metrics**     | Coding activity tracking via the WakaTime API                         |
| ![Content](https://img.shields.io/badge/Content-MDX_Blog-blueviolet)    | **MDX Blog**           | Feature‑rich blog with MDX, syntax highlighting, and Medium sync      |
| ![Registry](https://img.shields.io/badge/Registry-shadcn-000000)        | **Component Registry** | Distribute components via shadcn + the `rajfolio` CLI                 |
| ![Navigation](https://img.shields.io/badge/Nav-Cmd_K_·_J%2FK-yellowgreen) | **Command & Keys**   | Command menu (⌘K) and J/K keyboard section navigation                 |
| ![Optimization](https://img.shields.io/badge/SEO-Optimized-red)         | **SEO & PWA**          | JSON‑LD structured data, sitemap, robots, RSS, OG images, web manifest |
| ![Security](https://img.shields.io/badge/Security-Hardened-critical)    | **Secure**             | Security headers, rate‑limited APIs, input validation with Zod        |
| ![Contact](https://img.shields.io/badge/Contact-Telegram-26A5E4)        | **Contact Form**       | Messages delivered straight to Telegram with rate limiting            |
| ![vCard](https://img.shields.io/badge/Extras-vCard-lightgrey)           | **Extras**             | Downloadable vCard, visitor counter, custom cursor, oneko cat         |

---

## Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind,nodejs,vercel" alt="Tech Stack" />
</p>

| Category           | Technologies                                                        |
| :----------------- | :------------------------------------------------------------------ |
| **Framework**      | Next.js 16 (App Router), React 19, TypeScript 5.8                    |
| **Styling**        | Tailwind CSS v4, shadcn/ui, Radix UI, `tailwind-merge`, CVA          |
| **Animation**      | Framer Motion (`motion`), Lenis smooth scroll                        |
| **State & Data**   | Jotai, SWR, `next-themes`                                            |
| **Content**        | MDX (`next-mdx-remote`, `fumadocs-core`), Shiki / rehype‑pretty‑code |
| **AI Engine**      | Google Gemini 2.5 Flash (`@google/genai`, `@google/generative-ai`)  |
| **Integrations**   | Lanyard, Spotify Web API, WakaTime, GitHub                           |
| **Data Store**     | Upstash Redis (visitor counter & rate limiting)                     |
| **Validation**     | Zod, React Hook Form                                                 |
| **Tooling**        | ESLint, Prettier, Husky, lint‑staged, tsx                            |
| **Infrastructure** | Vercel (Analytics + Speed Insights)                                  |

---

## Homepage Sections

The portfolio renders as a single scrollable page composed of focused sections:

**Hero** · **About** · **Live Status** · **Experience** · **Projects** · **Tech Stack** ·
**Testimonials** · **Blog** · **GitHub Contributions** · **Open‑Source Contributions** ·
**Awards** · **Certifications** · **Library** · **Pomodoro Timer** · **Contact**

---

## Quick Start

### Prerequisites

- **Node.js** `>=22 <23`
- **npm** (the repo ships a `package-lock.json`)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/RajdeepKushwaha5/sleeky.git
cd sleeky

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local   # then fill in the values (see below)

# 4. Start the development server
npm run dev
```

Open **[http://localhost:1729](http://localhost:1729)** in your browser.

> The site runs without any keys, but integration‑backed sections (AI chat, Spotify,
> WakaTime, contact form, visitor counter) require the corresponding variables.

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# ── Core ───────────────────────────────────────────────
APP_URL=https://your-domain.vercel.app

# ── AI Assistant (chatbot) ─────────────────────────────
GEMINI_API_KEY=your_gemini_api_key

# ── Live Status (Discord via Lanyard) ──────────────────
# Must be a member of the Lanyard Discord: https://discord.gg/lanyard
# Exposed to the browser, so it MUST be prefixed with NEXT_PUBLIC_
NEXT_PUBLIC_DISCORD_USER_ID=your_discord_user_id

# ── Spotify (now playing / recently played) ────────────
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# ── Coding Stats (WakaTime) ────────────────────────────
WAKATIME_API_KEY=your_wakatime_key

# ── Visitor Counter & Rate Limiting (Upstash Redis) ────
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# ── Contact Form (Telegram) ────────────────────────────
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

| Variable                                           | Used for                                   |
| :------------------------------------------------- | :----------------------------------------- |
| `APP_URL`                                          | Absolute URLs, OG images, Spotify callback |
| `GEMINI_API_KEY`                                   | AI assistant                               |
| `NEXT_PUBLIC_DISCORD_USER_ID`                      | Discord live status (Lanyard)              |
| `SPOTIFY_CLIENT_ID` / `_SECRET` / `_REFRESH_TOKEN` | Spotify now‑playing & recently‑played      |
| `WAKATIME_API_KEY`                                 | Coding metrics                             |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN`                | Visitor counter & API rate limiting        |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`          | Contact form delivery                      |

> A helper script is available to mint a Spotify refresh token: `node scripts/get-spotify-token.js`.

---

## Project Structure

```text
sleeky/
├── src/
│   ├── app/
│   │   ├── (app)/                  # Public site (home, projects, blog, contact, docs)
│   │   ├── api/                    # Route handlers: chatbot, contact, spotify, wakatime, visitors, blog
│   │   ├── og/ · rss/ · vcard/     # OG image, RSS feed, vCard endpoints
│   │   ├── sitemap.ts · robots.ts · manifest.ts
│   │   └── layout.tsx
│   ├── components/                 # Reusable UI (dock, command menu, chatbot, nav, ...)
│   ├── features/                   # Domain modules: profile, projects, blog
│   ├── config/                     # Site metadata & navigation
│   ├── hooks/ · lib/ · utils/      # Hooks, helpers, integrations (redis, spotify)
│   ├── registry/ · __registry__/   # Source + generated component registry
│   ├── scripts/                    # Build registry, Medium sync, screenshot capture
│   └── styles/                     # Global styles & animations
├── public/
│   ├── r/                          # Published registry JSON (shadcn add)
│   └── assets/ · images/ · audio/ · tech-stack-icons/
├── packages/
│   └── rajfolio/                   # CLI wrapper for the component registry
├── scripts/                        # Standalone Node scripts (e.g. Spotify token)
└── package.json
```

---

## Available Scripts

| Command                  | Description                                          |
| :----------------------- | :--------------------------------------------------- |
| `npm run dev`            | Start the dev server (Turbopack) on port **1729**    |
| `npm run build`          | Production build                                     |
| `npm run start`          | Start the production server                          |
| `npm run preview`        | Build and serve the production output on port 1729   |
| `npm run lint`           | Run ESLint                                            |
| `npm run lint:fix`       | Run ESLint with autofix                              |
| `npm run check-types`    | Type‑check with `tsc --noEmit`                       |
| `npm run format:check`   | Check formatting with Prettier                       |
| `npm run format:write`   | Format files with Prettier                           |
| `npm run registry:build` | Build the component registry (shadcn)                |
| `npm run medium:sync`    | Sync blog posts from Medium                          |
| `npm run capture`        | Capture screenshots / OG assets                      |

---

## API Routes

| Endpoint                          | Purpose                                |
| :-------------------------------- | :------------------------------------- |
| `/api/chatbot`                    | Gemini‑powered AI assistant            |
| `/api/contact`                    | Contact form → Telegram (rate limited) |
| `/api/spotify/now-playing`        | Current Spotify track                  |
| `/api/spotify/recently-played`    | Recently played Spotify tracks         |
| `/api/spotify/auth` · `/callback` | Spotify OAuth helper flow              |
| `/api/wakatime`                   | Coding activity metrics                |
| `/api/visitors`                   | Visitor counter (Upstash Redis)        |
| `/api/blog`                       | Blog data                              |

---

## Customization

Most content lives in typed data files — edit these to make the portfolio yours:

| File                                        | Controls                      |
| :------------------------------------------ | :---------------------------- |
| `src/features/profile/data/user.ts`         | Personal identity, bio, links |
| `src/config/site.ts`                        | Site metadata & navigation    |
| `src/features/profile/data/projects.ts`     | Project showcase              |
| `src/features/profile/data/experiences.ts`  | Work history                  |
| `src/features/profile/data/social-links.ts` | Social links                  |

---

## Component Registry

Components are distributed through a shadcn‑compatible registry. Add them to any project with the
`rajfolio` CLI (or `shadcn`):

```bash
npx rajfolio@latest add <component>
```

The registry source lives in `src/registry/`, builds into `public/r/*.json`, and the CLI wrapper is in
`packages/rajfolio/`.

---

## Deployment

The site is optimized for **Vercel**:

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add the environment variables from the section above.
4. Deploy — Vercel detects Next.js automatically.

---

## License

Licensed under the **MIT License** — see [LICENSE](LICENSE). Feel free to use it as a base for your own
portfolio; a star or attribution is appreciated.

---

<p align="center">
  Built by <a href="https://rajdeep-singh.vercel.app">Rajdeep Singh</a>
</p>

<p align="center">
  <a href="https://github.com/RajdeepKushwaha5">
    <img src="https://img.shields.io/badge/GitHub-@RajdeepKushwaha5-181717?style=flat&logo=github" />
  </a>
  <a href="https://x.com/rajdeepstwt">
    <img src="https://img.shields.io/badge/X-@rajdeepstwt-000000?style=flat&logo=x" />
  </a>
  <a href="https://linkedin.com/in/rajdeepsingh5">
    <img src="https://img.shields.io/badge/LinkedIn-Rajdeep_Singh-0A66C2?style=flat&logo=linkedin" />
  </a>
</p>

<p align="center">
  Star this repository if you found it useful.
</p>
