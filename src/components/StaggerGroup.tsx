"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";

type GroupProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between sibling entrances. */
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
};

/**
 * Coordinates a set of sibling reveals so they arrive in sequence rather
 * than all at once. Pair with <StaggerItem /> for each child.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: GroupProps) {
  const reduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  if (reduced) return <Component className={className}>{children}</Component>;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Component>
  );
}

type ItemProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  as?: "div" | "li" | "article" | "section";
};

export function StaggerItem({
  children,
  className,
  distance = 10,
  duration = 0.55,
  as = "div",
}: ItemProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const Component = motion[as] as typeof motion.div;

  if (reduced) return <Component className={className}>{children}</Component>;

  return (
    <Component
      ref={ref}
      className={className}
      variants={{
        hidden: { opacity: 0, filter: "blur(10px)", y: distance },
        visible: { opacity: 1, filter: "blur(0px)", y: 0 },
      }}
      transition={{ duration, ease: EASE }}
      onAnimationComplete={() => ref.current?.style.removeProperty("filter")}
    >
      {children}
    </Component>
  );
}
