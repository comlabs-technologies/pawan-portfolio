"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { validateEnquiry } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "invalid" | "submitting" | "success" | "error";

/** The inline enquiry field: one input with the button set inside its right edge. */
export function EmailEnquiry() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validateEnquiry({ email }, false);

    if (errors.email) {
      setStatus("invalid");
      setNotice(errors.email);
      return;
    }

    setStatus("submitting");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mode: "enquiry" }),
      });
      const data = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setNotice(data.message ?? "That did not go through. Please try again in a moment.");
        return;
      }

      setStatus("success");
      setNotice(data.message ?? "Thanks, I will be in touch shortly.");
      setEmail("");
    } catch {
      setStatus("error");
      setNotice("The network dropped that one. Your address is still here, try again.");
    }
  }

  const invalid = status === "invalid";

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 max-w-md">
      <label htmlFor="enquiry-email" className="sr-only">
        Your email address
      </label>
      <div className="relative">
        <input
          id="enquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "invalid") {
              setStatus("idle");
              setNotice("");
            }
          }}
          disabled={status === "submitting"}
          aria-invalid={invalid}
          aria-describedby={notice ? "enquiry-status" : undefined}
          className={cn(
            "h-12 w-full rounded-lg border bg-content pl-3 pr-36 text-label text-ink",
            "shadow-[var(--shadow-input)] placeholder:text-ink-3",
            "transition-[border-color] duration-200",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
            "disabled:opacity-60",
            invalid ? "border-danger" : "border-line-strong focus:border-ink-3",
          )}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "absolute inset-y-1.5 right-1.5 inline-flex min-w-32 items-center justify-center gap-2 rounded-md px-3",
            "bg-muted text-label font-medium text-ink",
            "shadow-[inset_0_1px_0_var(--inset-hi),inset_0_-1px_0_var(--shade-soft),0_1px_1px_var(--shade-soft)]",
            "transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "hover:bg-line-strong active:scale-[0.99]",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            "Send Enquiry"
          )}
        </button>
      </div>

      {notice ? (
        <p
          id="enquiry-status"
          role="status"
          aria-live="polite"
          className={cn(
            "mt-2 text-meta",
            status === "invalid" || status === "error" ? "text-danger" : "text-ink-2",
          )}
        >
          {notice}
        </p>
      ) : null}
    </form>
  );
}
