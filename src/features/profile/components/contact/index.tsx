"use client";

import { ArrowRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send message");
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Panel id="contact">
      <PanelHeader>
        <PanelTitle>Contact</PanelTitle>
      </PanelHeader>

      <PanelContent>
        {/* Editorial intro */}
        <div className="mb-8 max-w-[40ch]">
          <p className="font-serif text-[1.65rem] leading-[1.2] font-medium tracking-tight text-foreground/80 sm:text-[2rem]">
            Let&apos;s build something
            <br />
            cool together.
          </p>
          <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-foreground/28 uppercase">
            Reply within 24 h · India (IST)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-[62ch]">
          {/* Name + Email */}
          <div className="grid sm:grid-cols-2">
            <div className="border-b border-foreground/[0.08] pb-3 sm:border-r sm:pr-6">
              <label
                htmlFor="contact-name"
                className="block font-mono text-[9px] tracking-[0.16em] text-foreground/28 uppercase"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="mt-1.5 w-full bg-transparent text-[13.5px] text-foreground/80 placeholder:text-foreground/20 focus:outline-none"
              />
            </div>
            <div className="border-b border-foreground/[0.08] pt-4 pb-3 sm:pt-0 sm:pl-6">
              <label
                htmlFor="contact-email"
                className="block font-mono text-[9px] tracking-[0.16em] text-foreground/28 uppercase"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="mt-1.5 w-full bg-transparent text-[13.5px] text-foreground/80 placeholder:text-foreground/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Message */}
          <div className="border-b border-foreground/[0.08] pt-5 pb-3">
            <label
              htmlFor="contact-message"
              className="block font-mono text-[9px] tracking-[0.16em] text-foreground/28 uppercase"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="What are you working on?"
              rows={4}
              className="mt-1.5 w-full resize-none bg-transparent text-[13.5px] leading-relaxed text-foreground/80 placeholder:text-foreground/20 focus:outline-none"
            />
          </div>

          {/* Status messages */}
          {status === "success" && (
            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-emerald-500/80">
              <CheckCircle2 className="size-3.5" />
              Sent — I&apos;ll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-red-400/80">
              <XCircle className="size-3.5" />
              {errorMessage || "Failed to send. Please try again."}
            </div>
          )}

          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={status === "loading"}
              className="quiet-action group disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-3 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight />
                </>
              )}
            </button>
          </div>
        </form>
      </PanelContent>
    </Panel>
  );
}
