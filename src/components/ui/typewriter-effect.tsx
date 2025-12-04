"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function TypewriterEffect({
  words,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
        {currentText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="ml-1 inline-block h-[1em] w-[3px] bg-gradient-to-b from-blue-600 to-purple-600"
      />
    </span>
  );
}

interface FlipWordsProps {
  words: string[];
  className?: string;
  duration?: number;
}

export function FlipWords({
  words,
  className,
  duration = 3000,
}: FlipWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: -20, rotateX: 90 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400",
          className
        )}
      >
        {words[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );
}
