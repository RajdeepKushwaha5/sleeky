"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export function DictionarySection() {
  return (
    <div className="max-w-screen overflow-x-hidden px-2 pb-8">
      <div className="screen-line-before screen-line-after mx-auto border-x border-edge md:max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="px-4 py-8"
        >
          {/* Dictionary Header with decorative lines */}
          <div className="relative mb-6">
            <div className="absolute top-1/2 right-0 left-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />
            <div className="relative mx-auto w-fit bg-background px-4">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className="text-zinc-400 dark:text-zinc-600">
                  /ˈdɪk.ʃən.er.i/
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-zinc-400 italic dark:text-zinc-600">
                  noun, informal
                </span>
              </div>
            </div>
          </div>

          {/* Main phrase */}
          <div className="mb-4">
            <h2 className="text-center font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              F*CK IT, WE BALL!
            </h2>
          </div>

          {/* Pronunciation guide */}
          <div className="mb-6 text-center font-mono text-sm text-muted-foreground">
            <span className="italic">/fʌk ɪt, wiː bɔːl/</span>
          </div>

          {/* Border decoration */}
          <div className="mx-auto mb-6 flex max-w-2xl items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-300 to-zinc-300 dark:via-zinc-700 dark:to-zinc-700" />
            <div className="flex gap-1">
              <div className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <div className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
              <div className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-300 to-zinc-300 dark:via-zinc-700 dark:to-zinc-700" />
          </div>

          {/* Definition */}
          <div className="mx-auto max-w-2xl">
            <div className="rounded-lg border border-edge bg-muted/30 p-6">
              <div className="mb-2 flex items-baseline gap-2">
                <span className="font-mono text-sm font-bold text-foreground">
                  def.
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  1.
                </span>
              </div>
              <p className="leading-relaxed text-foreground/90">
                A bold, carefree expression used to convey abandoning worry or
                hesitation and fully committing to an action or challenge, often
                with confidence, risk-taking, or enjoyment.
              </p>
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="mx-auto mt-6 flex max-w-2xl items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />
            <div className="font-mono text-xs text-zinc-400 dark:text-zinc-600">
              ◇
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />
          </div>

          {/* Corner brackets */}
          <div className="relative mx-auto mt-4 max-w-2xl">
            <div className="absolute -top-2 -left-2 h-4 w-4 border-t-2 border-l-2 border-zinc-300 dark:border-zinc-700" />
            <div className="absolute -top-2 -right-2 h-4 w-4 border-t-2 border-r-2 border-zinc-300 dark:border-zinc-700" />
            <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-zinc-300 dark:border-zinc-700" />
            <div className="absolute -right-2 -bottom-2 h-4 w-4 border-r-2 border-b-2 border-zinc-300 dark:border-zinc-700" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
