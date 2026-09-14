"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Testimonial } from "@/data/testimonials";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

function testimonialInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function TestimonialAvatar({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.avatar) {
    return (
      <span className="relative block size-6 shrink-0 overflow-hidden rounded-full ring-1 ring-[var(--image-ring)]">
        <Image
          src={testimonial.avatar}
          alt=""
          fill
          sizes="24px"
          loading="lazy"
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-ink-2 ring-1 ring-[var(--image-ring)]"
    >
      {testimonialInitials(testimonial.name)}
    </span>
  );
}

export function TestimonialMarquee() {
  const reduced = useReducedMotion();
  const [held, setHeld] = useState(false);
  const loop = reduced ? testimonials : [...testimonials, ...testimonials];

  return (
    <div
      className={cn("group relative", reduced ? "overflow-x-auto" : "overflow-hidden edge-fade")}
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerCancel={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
    >
      <ul
        className={cn(
          "flex w-max py-1",
          !reduced && "marquee-track group-hover:[animation-play-state:paused]",
          held && "[animation-play-state:paused]",
        )}
      >
        {loop.map((testimonial, index) => (
          <li
            key={`${testimonial.name}-${index}`}
            aria-hidden={index >= testimonials.length ? "true" : undefined}
            className="mr-3 flex min-h-52 w-72 shrink-0 flex-col justify-between rounded-xl border border-line bg-content p-4"
          >
            <p className="text-meta leading-[1.35rem] text-ink-2">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2">
              <TestimonialAvatar testimonial={testimonial} />
              <span className="min-w-0">
                <span className="block truncate text-meta font-medium text-ink">
                  {testimonial.name}
                </span>
                <span className="block text-[11px] leading-4 text-ink-3 line-clamp-2">
                  {testimonial.title}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
