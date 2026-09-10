"use client";

import { CircleCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { timeline } from "@/data/timeline";
import { EASE, VIEWPORT } from "@/lib/motion";

export function Timeline() {
  const reduced = useReducedMotion();

  return (
    <ol className="mt-5 space-y-7">
      {timeline.map((group) => (
        <li key={group.year}>
          <motion.span
            className="inline-block rounded-md bg-muted px-2 py-0.5 text-meta font-semibold text-ink shadow-[var(--shadow-badge)]"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, filter: "blur(8px)", y: 6 },
                  whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
                  viewport: VIEWPORT,
                  transition: { duration: 0.5, ease: EASE },
                })}
          >
            {group.year}
          </motion.span>

          <motion.ul
            className="mt-3 space-y-4"
            initial={reduced ? undefined : "hidden"}
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.14 } },
            }}
          >
            {group.events.map((event) => (
              <motion.li
                key={event.title}
                className="flex gap-2.5"
                variants={{
                  hidden: { opacity: 0, filter: "blur(8px)", y: 8 },
                  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
                }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <CircleCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-ink-3"
                />
                <div className="min-w-0">
                  <p className="text-label font-medium text-ink">{event.title}</p>
                  <motion.p
                    className="mt-0.5 max-w-[62ch] text-label text-ink-2"
                    variants={{
                      hidden: { opacity: 0, filter: "blur(6px)" },
                      visible: { opacity: 1, filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
                  >
                    {event.detail}
                  </motion.p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </li>
      ))}
    </ol>
  );
}
