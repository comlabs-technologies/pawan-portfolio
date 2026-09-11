"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  className?: string;
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
    <header className={cn("pt-2", className)}>
      <motion.h1
        className="heading-display text-title-sm md:text-title"
        {...enter(0)}
      >
        {title}
      </motion.h1>
      {description ? (
        <motion.div className="mt-3 max-w-[58ch] text-body text-ink-2" {...enter(0.12)}>
          {description}
        </motion.div>
      ) : null}
    </header>
  );
}
