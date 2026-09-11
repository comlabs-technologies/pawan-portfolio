"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { site } from "@/data/site";

const HOLD_MS = 2800;

/**
 * Cycles through the roles beside the name. The badge morphs its width to
 * fit each title; `layout` on both the shell and the label keeps the text
 * from stretching while that width animates.
 */
export function RoleBadge() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % site.roles.length),
      HOLD_MS,
    );
    return () => window.clearInterval(timer);
  }, [reduced]);

  const role = site.roles[index];

  if (reduced) {
    return (
      <span className="inline-flex h-8 items-center rounded-full border border-line bg-content px-3 text-meta font-medium text-ink-2">
        {site.roles[0]}
      </span>
    );
  }

  return (
    <motion.span
      layout
      transition={{ duration: 0.45, ease: EASE }}
      className="inline-flex h-8 items-center overflow-hidden rounded-full border border-line bg-content px-3 text-meta font-medium text-ink-2"
    >
      {/* A stable label for assistive technology: the visual cycle is decorative. */}
      <span className="sr-only">{site.role}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={role}
          layout="position"
          aria-hidden="true"
          initial={{ opacity: 0, filter: "blur(5px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(5px)", y: -12 }}
          transition={{ duration: 0.42, ease: EASE }}
          className="block whitespace-nowrap"
        >
          {role}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
