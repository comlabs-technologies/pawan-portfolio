"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

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
            className="mr-3 flex h-46 w-60 shrink-0 flex-col justify-between rounded-xl border border-line bg-content p-4"
          >
            <p className="text-meta leading-[1.35rem] text-ink-2">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2">
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
              <span className="min-w-0">
                <span className="block truncate text-meta font-medium text-ink">
                  {testimonial.name}
                </span>
                <span className="block truncate text-[11px] leading-4 text-ink-3">
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
