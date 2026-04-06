<p align="center">
  <a href="https://rajdeep-singh.vercel.app">
    <img src="public/icon.png" alt="Rajdeep Singh" width="80" height="80" />
  </a>
</p>

<h1 align="center">Rajdeep Singh — Portfolio</h1>

<p align="center">
  <strong>A sleek, modern portfolio built with Next.js 16</strong><br />
  Real-time integrations • AI Assistant • Stunning animations
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

<p align="center">

<img width="1903" height="958" alt="image" src="https://github.com/user-attachments/assets/ee07bf56-344d-4f38-b5a5-3b9274084a05" />

<img width="1917" height="957" alt="image" src="https://github.com/user-attachments/assets/b344a8fb-4d38-4a43-9620-03924c41d9b2" />

</p>

---

## Features

| Status                                                                  | Feature            | Description                                                  |
| :---------------------------------------------------------------------- | :----------------- | :----------------------------------------------------------- |
| ![Performance](https://img.shields.io/badge/Performance-High-blue)      | **Lightning Fast** | Next.js 16 with Turbopack for blazing performance            |
| ![Design](https://img.shields.io/badge/Design-Premium-vibrantgreen)     | **Sleek UI**       | Glassmorphism, smooth animations, and dark/light modes       |
| ![Intelligence](https://img.shields.io/badge/AI-Gemini_2.5-brightgreen) | **AI Assistant**   | Integrated chatbot powered by Google Gemini 2.5 Flash        |
| ![Real-time](https://img.shields.io/badge/Real--time-Active-success)    | **Live Status**    | Real-time Discord, Spotify, and VS Code activity via Lanyard |
| ![Music](https://img.shields.io/badge/Spotify-Last_Played-1DB954)       | **Spotify API**    | Shows last played track for all visitors via Spotify Web API |
| ![Analytics](https://img.shields.io/badge/Stats-WakaTime-informational) | **Coding Metrics** | Automated coding activity tracking via WakaTime              |
| ![Content](https://img.shields.io/badge/Content-MDX_Blog-blueviolet)    | **MDX Blog**       | Feature-rich blog powered by MDX and React components        |
| ![Adaptive](https://img.shields.io/badge/Responsive-Full-orange)        | **Device Ready**   | Optimized for seamless mobile, tablet, and desktop views     |
| ![Navigation](https://img.shields.io/badge/Nav-Keyboard-yellowgreen)    | **Quick Nav**      | Navigate sections with keyboard shortcuts (J/K)              |
| ![Optimization](https://img.shields.io/badge/SEO-Optimized-red)         | **SEO Ready**      | Structured data, meta tags, and high-performance sitemaps    |
| ![Security](https://img.shields.io/badge/Security-Hardened-critical)    | **Secure**         | Security headers, rate-limited APIs, input validation        |
| ![Contact](https://img.shields.io/badge/Contact-Telegram-26A5E4)        | **Contact Form**   | Messages sent directly to Telegram with rate limiting        |

---

## Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind,vercel" alt="Tech Stack" />
</p>

| Category           | Technologies                                   |
| :----------------- | :--------------------------------------------- |
| **Framework**      | Next.js 16, React 19, TypeScript               |
| **Styling**        | Tailwind CSS v4, shadcn/ui, Radix UI           |
| **Animation**      | Framer Motion                                  |
| **AI Engine**      | Google Generative AI (Gemini 2.5 Flash)        |
| **Integrations**   | Lanyard API, WakaTime API, Spotify Web API     |
| **Database**       | Upstash Redis (rate limiting, visitor counter) |
| **Infrastructure** | Vercel                                         |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/RajdeepKushwaha5/sleeky.git
cd sleeky

# Install dependencies
npm install

# Create your environment variables (see Environment Variables section)
# Then start development server
npm run dev
```

Open **[http://localhost:1729](http://localhost:1729)** in your browser.

> **Note:** No `.env.example` is provided. Create `.env.local` manually using the variables listed below.

---

## Environment Variables

```env
# App URL
APP_URL=https://your-domain.vercel.app

# AI Chatbot (Required for assistant)
GEMINI_API_KEY=your_gemini_api_key

# Notifications — Contact Form (Optional)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Coding Stats (Optional)
WAKATIME_API_KEY=your_wakatime_key

# Upstash Redis — Visitor Counter & Rate Limiting (Required)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Spotify API — Last Played Track (Optional)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

---

## Project Structure

```text
sleeky/
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Reusable UI components
│   ├── features/       # Feature modules (profile, blog)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities & helpers
│   └── config/         # Site configuration
├── public/             # Static assets
└── packages/rajfolio/  # Component registry CLI
```

---

## Available Scripts

| Command         | Description                           |
| :-------------- | :------------------------------------ |
| `npm run dev`   | Start development server on port 1729 |
| `npm run build` | Build the application for production  |
| `npm run start` | Start the production server           |
| `npm run lint`  | Run ESLint to check code quality      |

---

## Customization

| Configuration File                         | Data Description             |
| :----------------------------------------- | :--------------------------- |
| `src/features/profile/data/user.ts`        | Personal identity and bio    |
| `src/config/site.ts`                       | Site metadata and menu links |
| `src/features/profile/data/projects.ts`    | Portfolio project showcase   |
| `src/features/profile/data/experiences.ts` | Professional work history    |

---

## License

This project is licensed under the MIT License. Feel free to use it for your personal portfolio.

---

<p align="center">
  Developed by <a href="https://rajdeep-singh.vercel.app">Rajdeep Singh</a>
</p>

<p align="center">
  <a href="https://github.com/RajdeepKushwaha5">
    <img src="https://img.shields.io/badge/GitHub-@RajdeepKushwaha5-181717?style=flat&logo=github" />
  </a>
  <a href="https://twitter.com/rajdeeptwts">
    <img src="https://img.shields.io/badge/Twitter-@rajdeeptwts-1DA1F2?style=flat&logo=twitter" />
  </a>
  <a href="https://linkedin.com/in/rajdeepsingh5">
    <img src="https://img.shields.io/badge/LinkedIn-Rajdeep_Singh-0A66C2?style=flat&logo=linkedin" />
  </a>
</p>

<p align="center">
  Star this repository if you found it useful.
</p>
