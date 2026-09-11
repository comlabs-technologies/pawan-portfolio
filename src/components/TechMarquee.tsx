"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { techIconItems } from "@/data/tech";
import { BrandIcon } from "./BrandIcon";
import { cn } from "@/lib/utils";

const LOOP_MS = 48_000;
const HOVER_RATE = 0.28;

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 md:gap-12 md:pr-12"
    >
      {techIconItems.map((item) => (
        <li key={`${hidden ? "dup" : "src"}-${item.key}`} className="shrink-0">
          <span className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-muted ring-1 ring-line">
              <BrandIcon
                src={item.src}
                label={item.label}
                invertInDark={item.invertInDark}
                size={22}
                decorative
                className="size-[22px]"
              />
            </span>
            <span className="text-label font-medium tracking-[-0.01em] text-ink-2">
              {item.label}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    const animation = track.animate(
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: "translate3d(-50%, 0, 0)" },
      ],
      {
        duration: LOOP_MS,
        iterations: Infinity,
        easing: "linear",
      },
    );
    animationRef.current = animation;

    return () => {
      animation.cancel();
      animationRef.current = null;
    };
  }, [reduced]);

  const setRate = (rate: number) => {
    const animation = animationRef.current;
    if (animation) animation.playbackRate = rate;
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !reduced &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
      )}
      onMouseEnter={() => setRate(HOVER_RATE)}
      onMouseLeave={() => setRate(1)}
      onFocusCapture={() => setRate(HOVER_RATE)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setRate(1);
        }
      }}
    >
      {reduced ? (
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 px-4 md:px-8">
          {techIconItems.map((item) => (
            <li key={item.key} className="shrink-0">
              <span className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-muted ring-1 ring-line">
                  <BrandIcon
                    src={item.src}
                    label={item.label}
                    invertInDark={item.invertInDark}
                    size={22}
                    decorative
                    className="size-[22px]"
                  />
                </span>
                <span className="text-label font-medium tracking-[-0.01em] text-ink-2">
                  {item.label}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div ref={trackRef} className="flex w-max items-center py-1 will-change-transform">
          <LogoRow />
          <LogoRow hidden />
        </div>
      )}
    </div>
  );
}
