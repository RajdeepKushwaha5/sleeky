"use client";

import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  User,
  XCircle,
} from "lucide-react";
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

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );

      // Reset error message after 5 seconds
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
        <PanelTitle>Contact Me</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-muted-foreground">
            Have a question or want to work together? Feel free to reach out!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <User className="h-4 w-4" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-edge bg-card/50 px-4 py-2.5 text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Mail className="h-4 w-4" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full rounded-lg border border-edge bg-card/50 px-4 py-2.5 text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <MessageSquare className="h-4 w-4" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                rows={6}
                className="w-full resize-none rounded-lg border border-edge bg-card/50 px-4 py-2.5 text-foreground transition-all placeholder:text-muted-foreground/50 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
              />
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-green-600 dark:text-green-500">
                <CheckCircle2 className="h-5 w-5" />
                <span>
                  Message sent successfully! I&apos;ll get back to you soon.
                </span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-600 dark:text-red-500">
                <XCircle className="h-5 w-5" />
                <span>
                  {errorMessage || "Failed to send message. Please try again."}
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative w-full overflow-hidden rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-2">
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    Send Message
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </PanelContent>
    </Panel>
  );
}
