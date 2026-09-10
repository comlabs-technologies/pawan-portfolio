"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const reduced = useReducedMotion();

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, filter: "blur(10px)", y: 10 },
          animate: { opacity: 1, filter: "blur(0px)", y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <header className="pt-2">
      <motion.h1
        className="title-shadow text-title-sm font-bold tracking-[-0.04em] text-ink md:text-title"
        {...enter(0)}
      >
        {title}
      </motion.h1>
      <motion.p className="mt-3 max-w-[58ch] text-body text-ink-2" {...enter(0.12)}>
        {description}
      </motion.p>
    </header>
  );
}
