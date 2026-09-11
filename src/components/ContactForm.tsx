"use client";

import { useState } from "react";
import { LoaderCircle, Check } from "lucide-react";
import { validateEnquiry, type FieldErrors } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass = cn(
  "w-full rounded-lg border border-line-strong bg-content px-3 py-2.5 text-label text-ink",
  "shadow-[var(--shadow-input)] placeholder:text-ink-3",
  "transition-[border-color,box-shadow] duration-200",
  "focus:border-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
  "disabled:opacity-60",
);

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");

  const update = (field: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEnquiry(values, true);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setNotice("");
      return;
    }

    setStatus("submitting");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, mode: "full" }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        // Entered data is deliberately preserved so nothing has to be retyped.
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        setNotice(data.message ?? "That did not go through. Please try again in a moment.");
        return;
      }

      setStatus("success");
      setNotice(data.message ?? "Thanks, your message is with me.");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setNotice("The network dropped that one. Your message is still here, try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 max-w-md space-y-5">
      <Field id="name" label="Full name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          disabled={status === "submitting"}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
          placeholder="Ada Lovelace"
        />
      </Field>

      <Field id="email" label="Email address" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={update("email")}
          disabled={status === "submitting"}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
          placeholder="you@company.com"
        />
      </Field>

      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          disabled={status === "submitting"}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass, "resize-y")}
          placeholder="What are you building, and where are you stuck?"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex h-11 min-w-32 items-center justify-center gap-2 rounded-lg px-4",
            "bg-ink text-label font-medium text-content",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_1px_2px_var(--shade-soft)]",
            "transition-[opacity,transform,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "hover:opacity-90 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_2px_6px_-2px_var(--shade)]",
            "active:scale-[0.99]",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            "Send message"
          )}
        </button>

        {status === "success" ? (
          <span className="inline-flex items-center gap-1.5 text-label text-ink-2">
            <Check aria-hidden="true" className="size-4" />
            Sent
          </span>
        ) : null}
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-label",
          status === "error" ? "text-danger" : "text-ink-2",
          notice ? "" : "sr-only",
        )}
      >
        {notice}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-label font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-meta text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
