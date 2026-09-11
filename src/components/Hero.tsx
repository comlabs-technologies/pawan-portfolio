"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { site } from "@/data/site";
import { RoleBadge } from "./RoleBadge";

export function Hero() {
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
    <header className="pt-1">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <motion.h1
          className="heading-display text-[2rem] leading-[2.25rem] md:text-[2.5rem] md:leading-[2.75rem]"
          {...enter(0)}
        >
          {site.name}
        </motion.h1>
        <motion.div {...enter(0.1)}>
          <RoleBadge />
        </motion.div>
      </div>

      <motion.p className="mt-4 max-w-[54ch] text-body leading-6 text-ink-2" {...enter(0.2)}>
        {site.intro}
      </motion.p>
    </header>
  );
}
