"use client";

import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "1",
          text: "Hello! I'm here to help you learn more about Rajdeep's work. Ask me anything about his projects or skills.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Unable to connect right now. Please try again or use the contact form.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-50 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-border/18 bg-background/80 text-foreground shadow-[0_16px_44px_rgba(0,0,0,0.16),0_1px_0_rgba(255,255,255,0.55)_inset] backdrop-blur-2xl transition-all hover:bg-background/95 md:right-6 md:bottom-6 dark:border-white/[0.08] dark:bg-black/75 dark:shadow-[0_18px_54px_rgba(0,0,0,0.88)] dark:backdrop-blur-2xl dark:hover:bg-black/85"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 bottom-20 z-50 flex h-[500px] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[1.75rem] border border-border/18 bg-background/88 shadow-[0_24px_80px_rgba(0,0,0,0.18),0_1px_0_rgba(255,255,255,0.65)_inset] backdrop-blur-2xl md:right-6 md:bottom-24 md:w-[380px] dark:border-white/[0.07] dark:bg-black/80 dark:shadow-[0_28px_90px_rgba(0,0,0,0.94)] dark:backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/12 p-4 dark:border-white/[0.045]">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0 grayscale dark:grayscale-0">
                  <div className="absolute -inset-1 rounded-full bg-emerald-400/18 blur-lg" />
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border/25 bg-background ring-1 ring-foreground/8 dark:border-white/[0.08] dark:bg-white/[0.04] dark:ring-white/[0.06]">
                    <Image
                      src="/final_about.png"
                      alt="Rajdeep's Assistant"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="absolute right-0 bottom-0 z-10 h-3 w-3 rounded-full border-2 border-background bg-emerald-500 dark:border-black" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground/90 italic">
                    RJDP&apos;s Assistant
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground/70">
                    AI-Powered Helper
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-foreground/[0.055] hover:text-foreground dark:hover:bg-white/[0.055]"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              data-lenis-prevent
              className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-foreground/88 text-background shadow-[0_10px_28px_rgba(0,0,0,0.12)] dark:bg-white/90 dark:text-black"
                        : "border border-border/14 bg-foreground/[0.035] text-foreground/82 shadow-[0_1px_0_rgba(255,255,255,0.45)_inset] dark:border-white/[0.06] dark:bg-white/[0.04] dark:shadow-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <p
                      className={`mt-2 font-mono text-[10px] ${
                        message.sender === "user"
                          ? "text-background/50"
                          : "text-foreground/30"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl border border-border/14 bg-foreground/[0.035] px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.04]">
                    <Loader2 className="h-5 w-5 animate-spin text-foreground/40" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border/12 p-4 dark:border-white/[0.045]">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  aria-label="Chat message"
                  className="flex-1 rounded-full border border-border/14 bg-foreground/[0.035] px-4 py-2.5 text-sm text-foreground shadow-[0_1px_0_rgba(255,255,255,0.45)_inset] placeholder:text-muted-foreground/55 focus:border-foreground/18 focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.06] dark:bg-white/[0.04] dark:shadow-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/16 bg-foreground/88 text-background shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition-all hover:bg-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.08] dark:bg-white/[0.1] dark:text-white dark:shadow-[0_12px_34px_rgba(0,0,0,0.7)] dark:hover:bg-white/[0.16]"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
