"use client";

import { useRef } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** Distance travelled on the y axis, in pixels. */
  distance?: number;
  as?: "div" | "section" | "header" | "article" | "li" | "span";
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "variants">;

/**
 * The signature blur-to-focus entrance, triggered once when the element
 * enters the viewport. Falls back to plain content when the visitor has
 * asked for reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  distance = 10,
  as = "div",
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const Component = motion[as] as typeof motion.div;

  if (reduced) {
    return (
      <Component className={className} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, filter: "blur(10px)", y: distance }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      /* Drop the filter once it has settled so the element stops needing
         its own composited layer for the rest of the session. */
      onAnimationComplete={() => ref.current?.style.removeProperty("filter")}
      {...rest}
    >
      {children}
    </Component>
  );
}
