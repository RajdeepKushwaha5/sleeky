# Rajdeep Singh - Portfolio

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit-blue?style=for-the-badge&logo=vercel)](https://rajdeep-singh.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-View_Code-black?style=for-the-badge&logo=github)](https://github.com/RajdeepKushwaha5/sleeky)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A modern, responsive portfolio website showcasing my work as a Full Stack Web Developer & Blockchain Developer. Built with Next.js 16, featuring real-time integrations, AI chatbot, and a component registry system.

<img width="1896" height="968" alt="image" src="https://github.com/user-attachments/assets/34d0ac73-f7a7-44d0-8982-4eefe924c064" />


## ✨ Features

### 🚀 Core Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **SEO Optimized**: Meta tags, structured data, and performance optimizations
- **Fast Loading**: Built with Next.js and optimized for Core Web Vitals

### 🎯 Live Integrations

- **Real-time Discord Status**: Shows online/offline status and activities
- **Spotify Integration**: Displays currently playing music via Discord
- **VS Code Activity**: Live coding session tracking
- **WakaTime Stats**: Coding time and language statistics

### 🤖 AI Features

- **RJDP's Assistant**: AI chatbot powered by Google Gemini
- **Context-Aware**: Knows about my skills, projects, and experience
- **Smart Responses**: Provides relevant information about my work

### 📝 Content Management

- **MDX Blog**: Write blog posts in Markdown with JSX components
- **Medium Integration**: Sync blog posts from Medium automatically
- **Component Registry**: Reusable UI components with CLI tool

### 🔧 Developer Experience

- **TypeScript**: Full type safety throughout the application
- **ESLint + Prettier**: Code quality and formatting
- **Git Hooks**: Automated linting and formatting on commits
- **Component CLI**: `rajfolio` - Add components from registry

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.dev/motion)

### Backend & APIs

- **AI**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Real-time Data**: [Lanyard API](https://github.com/Phineas/lanyard)
- **Coding Stats**: [WakaTime API](https://wakatime.com/developers)
- **Notifications**: Telegram Bot API
- **Deployment**: [Vercel](https://vercel.com/)

### Development Tools

- **Build Tool**: Turbopack
- **Linting**: ESLint
- **Formatting**: Prettier
- **Git Hooks**: Husky + lint-staged
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/RajdeepKushwaha5/sleeky.git
   cd sleeky
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API keys:

   ```env
   # Required for chatbot functionality
   GOOGLE_AI_API_KEY=your_google_ai_api_key

   # Required for contact form notifications
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_CHAT_ID=your_telegram_chat_id

   # Optional: Custom app URL
   APP_URL=https://your-domain.com
   ```

4. **Run development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:1408](http://localhost:1408)

## 📖 Usage

### Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Preview production build
pnpm preview

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Type checking
pnpm check-types

# Format code
pnpm format:write
```

### Component Registry

Add components from the registry using the CLI:

```bash
# Install globally
pnpm add -g rajfolio

# Add a component
rajfolio add button

# Add multiple components
rajfolio add button card dialog
```

### Blog Management

#### Writing Blog Posts

Create new posts in `src/content/blog/` as `.mdx` files:

```mdx
---
title: "My Blog Post"
description: "A description of my post"
date: "2024-01-01"
tags: ["nextjs", "react"]
---

# My Blog Post

Content goes here...
```

#### Medium Integration

Sync posts from Medium:

```bash
pnpm medium:sync
```

## 📁 Project Structure

```
sleeky/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/             # Main application routes
│   │   ├── (docs)/            # Blog and documentation
│   │   └── api/               # API routes
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   └── [feature]/        # Feature-specific components
│   ├── features/             # Feature-based organization
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities and helpers
│   ├── config/               # Configuration files
│   └── styles/               # Global styles
├── packages/
│   └── rajfolio/             # Component registry CLI
├── public/                   # Static assets
└── [config files]           # Various configuration files
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   pnpm lint
   pnpm check-types
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation for new features
- Test your changes thoroughly
- Ensure TypeScript types are correct

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Vercel](https://vercel.com/) for hosting and analytics
- [Lanyard](https://github.com/Phineas/lanyard) for Discord integration
- [WakaTime](https://wakatime.com/) for coding statistics

## 📞 Contact

**Rajdeep Singh**

- **Email**: rajdeepsingh10789@gmail.com
- **Website**: [https://rajdeep-singh.vercel.app/](https://rajdeep-singh.vercel.app/)
- **GitHub**: [@RajdeepKushwaha5](https://github.com/RajdeepKushwaha5)
- **LinkedIn**: [Rajdeep Singh](https://www.linkedin.com/in/rajdeepsingh5/)

---

⭐ **Star this repo** if you found it helpful!
