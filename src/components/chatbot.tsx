"use client";

import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Magnetic from "@/components/ui/magnetic";

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
        className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-border/50 bg-card/80 text-foreground shadow-lg transition-all hover:scale-110 hover:bg-card md:right-6 md:bottom-6"
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
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
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
            className="fixed right-4 bottom-20 z-50 flex h-[500px] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/95 shadow-2xl backdrop-blur-xl md:right-6 md:bottom-24 md:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 p-4">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0 grayscale dark:grayscale-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2c4036] via-[#415d4e] to-[#2c4036] opacity-100 blur-md" />
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-background ring-2 ring-white/10">
                    <img
                      src="/final_about.png"
                      alt="Rajdeep's Assistant"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="absolute right-0 bottom-0 z-10 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground/90 italic">
                    RJDP&apos;s Assistant
                  </h3>
                  <p className="font-mono text-xs text-foreground/40">
                    AI-Powered Helper
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-foreground text-background"
                        : "border border-border/50 bg-card/80 text-foreground/80"
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
                  <div className="max-w-[80%] rounded-2xl border border-border/50 bg-card/80 px-4 py-3">
                    <Loader2 className="h-5 w-5 animate-spin text-foreground/40" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border/50 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  aria-label="Chat message"
                  className="flex-1 rounded-full border border-border/50 bg-card/80 px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/20 focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-all hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
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
