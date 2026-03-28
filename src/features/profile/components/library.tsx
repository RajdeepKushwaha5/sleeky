"use client";

import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

type Book = {
  title: string;
  author: string;
};

type BookCategory = {
  label: string;
  books: Book[];
};

const LIBRARY: BookCategory[] = [
  {
    label: "Development / Programming",
    books: [
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt & David Thomas",
      },
      { title: "Clean Code", author: "Robert C. Martin" },
      {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
      },
      { title: "Competitive Programming Handbook", author: "Antti Laaksonen" },
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen et al.",
      },
      {
        title: "Build a Large Language Model from Scratch",
        author: "Sebastian Raschka",
      },
      {
        title: "Cracking the Coding Interview",
        author: "Gayle Laakmann McDowell",
      },
      { title: "Effective C++", author: "Scott Meyers" },
    ],
  },
  {
    label: "Casual / Self-Growth / Business",
    books: [
      { title: "Zero to One", author: "Peter Thiel" },
      { title: "Steve Jobs", author: "Walter Isaacson" },
      { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson" },
      { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson" },
      { title: "Man's Search for Meaning", author: "Viktor E. Frankl" },
      { title: "Elon Musk", author: "Walter Isaacson" },
      { title: "Eat That Frog!", author: "Brian Tracy" },
    ],
  },
];

const INITIAL_VISIBLE = 3;

export function Library() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Panel id="library">
      <PanelHeader>
        <PanelTitle>Library</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-col gap-8">
          {LIBRARY.map((cat) => {
            const visible = expanded
              ? cat.books
              : cat.books.slice(0, INITIAL_VISIBLE);
            const hiddenCount = cat.books.length - INITIAL_VISIBLE;

            return (
              <div key={cat.label}>
                {/* Category label */}
                <p className="mb-4 font-mono text-[10px] font-semibold tracking-[0.14em] text-muted-foreground/50 uppercase">
                  {cat.label}
                </p>

                {/* Books grid */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {visible.map((book) => (
                    <div key={book.title} className="flex flex-col gap-0.5">
                      <p className="text-sm leading-snug font-medium text-foreground/85">
                        {book.title}
                      </p>
                      <p className="text-xs text-muted-foreground/50">
                        {book.author}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Hidden count hint */}
                {!expanded && hiddenCount > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground/30">
                    +{hiddenCount} more
                  </p>
                )}
              </div>
            );
          })}

          {expanded && (
            <p className="font-serif text-xs text-muted-foreground/35 italic">
              *and many more — these are just some of my best reads
            </p>
          )}

          {/* Toggle button */}
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              className="rounded-full border-border/25 px-6 text-[13px] font-medium tracking-wide transition-all duration-300 hover:border-border/40 hover:bg-foreground/[0.04]"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "View Less" : "View More"}
              <ArrowRightIcon
                className={cn(
                  "ml-1 size-4 transition-transform duration-200",
                  expanded && "rotate-90"
                )}
              />
            </Button>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
