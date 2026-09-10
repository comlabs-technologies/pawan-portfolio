"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimatedHeadingProps = {
  text: string;
  id?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
  /** Draws the muted highlighter rectangle once the words have landed. */
  highlight?: boolean;
};

/**
 * Reveals a heading word by word, then settles a muted rectangle behind it
 * so the line reads as lightly marked rather than badged.
 */
export function AnimatedHeading({
  text,
  id,
  className,
  as: Tag = "h2",
  stagger = 0.05,
  delay = 0,
  highlight = true,
}: AnimatedHeadingProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const highlightDelay = delay + words.length * stagger + 0.12;

  return (
    <Tag id={id} aria-label={text} className={cn("relative inline-block", className)}>
      {highlight ? (
        <motion.span
          aria-hidden="true"
          className="absolute -inset-x-2 -inset-y-1 z-0 rounded-[3px] bg-highlight"
          initial={reduced ? false : { opacity: 0, scaleX: 0.94 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: highlightDelay, ease: EASE }}
          style={{ originX: 0 }}
        />
      ) : null}

      <motion.span
        aria-hidden="true"
        className="relative z-10 inline-flex flex-wrap gap-x-[0.28em]"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, filter: "blur(2px)", y: 5 },
              visible: { opacity: 1, filter: "blur(0px)", y: 0 },
            }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
