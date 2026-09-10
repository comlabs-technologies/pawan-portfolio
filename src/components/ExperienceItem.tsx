"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Experience } from "@/data/experience";
import { EASE, VIEWPORT } from "@/lib/motion";
import { CompanyMark } from "./CompanyMark";
import { TechIconStack } from "./TechIconStack";

export function ExperienceItem({ item, index }: { item: Experience; index: number }) {
  const reduced = useReducedMotion();
  const delay = index * 0.08;

  const enter = (extra = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, filter: "blur(10px)", y: 10 },
          whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
          viewport: VIEWPORT,
          transition: { duration: 0.55, delay: delay + extra, ease: EASE },
        };

  return (
    <li className="flex items-start justify-between gap-4">
      <motion.div className="min-w-0 flex-1" {...enter()}>
        <h3 className="text-label font-semibold text-ink">{item.company}</h3>
        <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-label font-medium text-ink-2">{item.role}</span>
          <span className="text-meta text-ink-3">{item.period}</span>
          {item.location ? (
            <span className="text-meta text-ink-3">{item.location}</span>
          ) : null}
        </p>
        <p className="mt-1.5 max-w-[62ch] text-label text-ink-2">{item.summary}</p>

        <motion.div
          className="mt-2.5"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: VIEWPORT,
                transition: { duration: 0.45, delay: delay + 0.18, ease: EASE },
              })}
          style={{ transformOrigin: "left center" }}
        >
          <TechIconStack items={item.stack} />
        </motion.div>
      </motion.div>

      <motion.div
        className="shrink-0 pt-0.5"
        {...(reduced
          ? {}
          : {
              initial: { opacity: 0, filter: "blur(6px)" },
              whileInView: { opacity: 1, filter: "blur(0px)" },
              viewport: VIEWPORT,
              transition: { duration: 0.5, delay: delay + 0.24, ease: EASE },
            })}
      >
        <CompanyMark mark={item.mark} color={item.markColor} company={item.company} />
      </motion.div>
    </li>
  );
}
