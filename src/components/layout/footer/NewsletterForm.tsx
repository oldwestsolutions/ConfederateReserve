"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "@/components/ui/icons";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState<string | null>(null);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid) {
      setStatus("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMsg(null);
    try {
      // No backend wired yet — simulate a real request.
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      setMsg("Subscribed. Check your inbox for the next dispatch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMsg("Subscription failed. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-2">
      <div className="flex gap-2">
        <input
          id="nl-email"
          type="email"
          autoComplete="email"
          required
          inputMode="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") {
              setStatus("idle");
              setMsg(null);
            }
          }}
          className="input h-10 flex-1 text-sm"
          aria-invalid={status === "error"}
          aria-describedby="nl-msg"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          className="btn-primary h-10 shrink-0 px-4 text-xs"
          disabled={status === "loading"}
          aria-label="Subscribe to the newsletter"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Sending
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              Sent
            </>
          ) : (
            <>
              Subscribe <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
      <p
        id="nl-msg"
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={`min-h-[1rem] text-[11px] leading-snug ${
          status === "error"
            ? "text-danger"
            : status === "success"
              ? "text-success"
              : "text-subtle"
        }`}
      >
        {msg ?? "Monthly attestation notes. No noise."}
      </p>
    </form>
  );
}
