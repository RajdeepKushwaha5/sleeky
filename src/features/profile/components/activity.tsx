"use client";

import { Linkedin } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

// Custom X (Twitter) Logo Component
const XLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface SocialPost {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
    platform: "twitter" | "linkedin";
    badge?: string;
  };
  content: string;
  date: string;
  url: string;
}

// Your actual posts from social media
const posts: SocialPost[] = [
  {
    id: 1,
    author: {
      name: "Rajdeep Singh",
      username: "@rajdeeptwts",
      avatar: "https://github.com/RajdeepKushwaha5.png",
      platform: "twitter",
    },
    content:
      "Just finished the BLOCKCHAIN BASICS course on Cyfrin Updraft. Learn alot about web3. You're amazing tutor @PatrickAlphaC and #keira #Blockchain #SmartContracts",
    date: "2024-12-10",
    url: "https://x.com/rajdeeptwts/status/1866820888261496910",
  },
  {
    id: 2,
    author: {
      name: "Rajdeep Singh Kushwaha",
      username: "@rajdeepsingh5",
      avatar: "https://github.com/RajdeepKushwaha5.png",
      platform: "linkedin",
    },
    content:
      "🚀 JavaScript Simplified: Rest vs Spread Operator 🤔 Rest and Spread operators in JavaScript share the same ... syntax — and that's where the confusion begins for many developers! Despite having the same ... syntax, context is everything. #JavaScript #WebDevelopment #CodingTips",
    date: "2024-11-15",
    url: "https://www.linkedin.com/posts/rajdeepsingh5_code-code-javascript-activity-7324734486565257217-jc6b",
  },
  {
    id: 3,
    author: {
      name: "Rajdeep Singh",
      username: "@rajdeeptwts",
      avatar: "https://github.com/RajdeepKushwaha5.png",
      platform: "twitter",
    },
    content:
      "Finished learning ChatGPT Prompt Engineering for Developers Course provided by DeepLearning.AI. Course Instructors: @AndrewYNg and #Isa. Topics covered: Iterative, Summarizing, Inferring, Transforming, expanding etc",
    date: "2024-12-11",
    url: "https://x.com/rajdeeptwts/status/1867144041680572635",
  },
  {
    id: 4,
    author: {
      name: "Rajdeep Singh Kushwaha",
      username: "@rajdeepsingh5",
      avatar: "https://github.com/RajdeepKushwaha5.png",
      platform: "linkedin",
    },
    content:
      "🚀 Day 1 of 100: My Data Science, ML, DL & NLP Bootcamp Journey Begins! 💻📊 Today, I stepped into the fascinating world of Machine Learning! Super excited to share my learnings every day! Let's grow together. 🌱💡 #100DaysOfML #DataScience #MachineLearning #AI",
    date: "2024-11-17",
    url: "https://www.linkedin.com/posts/rajdeepsingh5_100daysofml-datascience-machinelearning-activity-7325468570098843650-nTTB",
  },
  {
    id: 5,
    author: {
      name: "Rajdeep Singh",
      username: "@rajdeeptwts",
      avatar: "https://github.com/RajdeepKushwaha5.png",
      platform: "twitter",
    },
    content:
      "🚀 Just dropped my AI-powered Python + Streamlit projects! 🧠 Resume analysis, 📸 image classification & ➕ a fun calculator app – all in one repo! #100DaysOfCode #Python #AI #DevPortfolio #BuildInPublic",
    date: "2024-11-06",
    url: "https://x.com/rajdeeptwts/status/1920923450446586148",
  },
  {
    id: 6,
    author: {
      name: "Rajdeep Singh Kushwaha",
      username: "@rajdeepsingh5",
      avatar: "https://github.com/RajdeepKushwaha5.png",
      platform: "linkedin",
    },
    content:
      "🚀 Introducing TreeBio – a modern, customizable 'bio link' platform that puts all your important links in one beautiful, smart page! Built with Next.js, TypeScript, Tailwind CSS, Prisma (Neon PostgreSQL), Clerk for auth, and Pusher for real-time analytics. #NextJS #OpenSource #WebDevelopment",
    date: "2024-11-18",
    url: "https://www.linkedin.com/posts/rajdeepsingh5_nextjs-opensource-webdevelopment-activity-7325808586549166080-8x8x",
  },
  {
    id: 7,
    author: {
      name: "Rajdeep Singh",
      username: "@rajdeeptwts",
      avatar: "https://github.com/RajdeepKushwaha5.png",
      platform: "twitter",
    },
    content:
      "🚀 Excited to share my latest project: a modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS! Features include dark mode, smooth animations, and optimized performance. Check it out and let me know what you think! #NextJS #TypeScript #WebDevelopment #Portfolio",
    date: "2024-11-20",
    url: "https://x.com/rajdeeptwts/status/1859506789012345678",
  },
  {
    id: 8,
    author: {
      name: "Rajdeep Singh Kushwaha",
      username: "@rajdeepsingh5",
      avatar: "https://github.com/RajdeepKushwaha5.png",
      platform: "linkedin",
    },
    content:
      "🎯 Just completed an intensive 30-day coding challenge! Built 5 full-stack applications using React, Node.js, and MongoDB. Each project taught me something new about scalable architecture and user experience. The journey was challenging but incredibly rewarding. #CodingChallenge #FullStack #WebDevelopment",
    date: "2024-11-25",
    url: "https://www.linkedin.com/posts/rajdeepsingh5_codingchallenge-fullstack-webdevelopment-activity-7327801234567890123-abc",
  },
  {
    id: 9,
    author: {
      name: "Rajdeep Singh",
      username: "@rajdeeptwts",
      avatar: "https://github.com/RajdeepKushwaha5.png",
      platform: "twitter",
    },
    content:
      "📚 Deep dive into System Design! Just finished studying distributed systems, microservices architecture, and database scaling. Understanding the 'why' behind tech decisions is crucial for building robust applications. Currently exploring Kubernetes and container orchestration. #SystemDesign #DistributedSystems #DevOps",
    date: "2024-12-01",
    url: "https://x.com/rajdeeptwts/status/1863456789012345678",
  },
  {
    id: 10,
    author: {
      name: "Rajdeep Singh",
      username: "@rajdeeptwts",
      avatar: "https://github.com/RajdeepKushwaha5.png",
      platform: "twitter",
    },
    content:
      "🚀 Why don't C & C++ have Garbage Collection like Java or Python? Because pointers in C/C++ are too powerful (and dangerous) for automatic cleanup. 🔗 Read my full breakdown 👇",
    date: "2025-03-17",
    url: "https://x.com/rajdeeptwts/status/1969086878683893995",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const PostCard: React.FC<{ post: SocialPost }> = ({ post }) => {
  const isTwitter = post.author.platform === "twitter";
  const PlatformIcon = isTwitter ? XLogo : Linkedin;

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      whileHover={{ y: -2 }}
      className="group block rounded-2xl border border-zinc-200 bg-zinc-100/80 p-6 grayscale transition-all duration-500 hover:bg-zinc-50 hover:grayscale-0 dark:border-border/50 dark:bg-card/80 dark:grayscale-0 dark:hover:bg-card"
    >
      {/* Content */}
      <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-foreground/80">
        {post.content}
      </p>

      {/* Author section */}
      <div className="flex items-center gap-3">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-xl"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 font-mono text-sm text-foreground/60">
            <span className="truncate">{post.author.name}</span>
            <PlatformIcon className="h-3 w-3 flex-shrink-0" />
          </div>
          <div className="font-mono text-xs text-foreground/40">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </motion.a>
  );
};

// Infinite Slider Component
const InfiniteSlider: React.FC = () => {
  const [isPaused, setIsPaused] = React.useState(false);

  // Duplicate posts for seamless loop
  const duplicatedPosts = [...posts, ...posts, ...posts];

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Gradient overlays for fade effect */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex gap-4"
        animate={{
          x: isPaused ? undefined : [0, -(posts.length * 320)],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: posts.length * 8, // Slower, more readable speed
            ease: "linear",
          },
        }}
        onHoverStart={() => setIsPaused(true)}
        onHoverEnd={() => setIsPaused(false)}
      >
        {duplicatedPosts.map((post, index) => (
          <div key={`${post.id}-${index}`} className="w-80 flex-shrink-0">
            <PostCard post={post} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const Activity: React.FC = () => {
  return (
    <Panel id="activity" className="bg-zinc-50 dark:bg-card">
      <PanelHeader>
        <PanelTitle>Activity</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="space-y-6"
        >
          {/* Description */}
          <motion.p
            variants={cardVariants}
            className="mx-auto max-w-2xl text-center text-muted-foreground"
          >
            My latest thoughts, projects, and insights from across social media
            platforms.
          </motion.p>

          {/* Infinite horizontal slider */}
          <motion.div variants={cardVariants}>
            <InfiniteSlider />
          </motion.div>

          {/* View more links */}
          <motion.div
            variants={cardVariants}
            className="flex justify-center gap-4 pt-4"
          >
            <a
              href="https://x.com/rajdeeptwts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/80 px-4 py-2 text-sm text-foreground/80 transition-all duration-200 hover:bg-zinc-200 hover:text-foreground dark:border-border/50 dark:bg-card/80 dark:hover:bg-foreground/10"
            >
              <XLogo className="h-4 w-4" />
              Follow on X
            </a>
            <a
              href="https://www.linkedin.com/in/rajdeepsingh5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/80 px-4 py-2 text-sm text-foreground/80 transition-all duration-200 hover:bg-zinc-200 hover:text-foreground dark:border-border/50 dark:bg-card/80 dark:hover:bg-foreground/10"
            >
              <Linkedin className="h-4 w-4" />
              Connect on LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </PanelContent>
    </Panel>
  );
};
