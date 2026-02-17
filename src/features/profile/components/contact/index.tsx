"use client";

import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { useState } from "react";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Panel id="contact">
      <PanelHeader>
        <PanelTitle>Contact</PanelTitle>
      </PanelHeader>

      <PanelContent>
        {/* Cool Intro Card */}
        <div className="mb-6 flex items-start gap-4">
          <div className="relative shrink-0 grayscale dark:grayscale-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2c4036] via-[#415d4e] to-[#2c4036] opacity-100 blur-md" />
            <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-background ring-2 ring-white/10 sm:h-16 sm:w-16">
              <img
                src="/final_about.png"
                alt="Rajdeep"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="flex-1 rounded-2xl rounded-tl-none border border-border/25 bg-foreground/[0.03] px-5 py-4">
            <p className="mb-1 font-syne text-xs font-bold tracking-wider text-foreground/50 uppercase">
              RJDP
            </p>
            <p className="font-outfit text-lg text-foreground/80">
              Let&apos;s build something cool together ↓
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name and Email - Two Column */}
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className="w-full rounded-xl border border-border/25 bg-card/40 px-4 py-3 text-sm text-foreground transition-all placeholder:text-foreground/30 focus:border-foreground/20 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full rounded-xl border border-border/25 bg-card/40 px-4 py-3 text-sm text-foreground transition-all placeholder:text-foreground/30 focus:border-foreground/20 focus:outline-none"
            />
          </div>

          {/* Message Field - Shorter */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message..."
            rows={4}
            className="w-full resize-none rounded-xl border border-border/25 bg-card/40 px-4 py-3 text-sm text-foreground transition-all placeholder:text-foreground/30 focus:border-foreground/20 focus:outline-none"
          />

          {/* Status Messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500">
              <CheckCircle2 className="h-4 w-4" />
              <span>Sent! I&apos;ll get back to you soon.</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
              <XCircle className="h-4 w-4" />
              <span>{errorMessage || "Failed to send. Please try again."}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      </PanelContent>
    </Panel>
  );
}
