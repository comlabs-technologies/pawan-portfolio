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
    <header className="pt-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <motion.h1
          className="name-sketch text-title-sm font-bold tracking-[-0.04em] text-ink md:text-title"
          {...enter(0)}
        >
          {site.name}
        </motion.h1>
        <motion.div {...enter(0.1)}>
          <RoleBadge />
        </motion.div>
      </div>

      <motion.p className="mt-3 max-w-[52ch] text-body text-ink-2" {...enter(0.2)}>
        {site.intro}
      </motion.p>
    </header>
  );
}
