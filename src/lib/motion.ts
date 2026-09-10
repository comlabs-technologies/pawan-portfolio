import type { Transition, Variants } from "motion/react";

/** The single easing curve used across the site. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const revealTransition: Transition = {
  duration: 0.6,
  ease: EASE,
};

/** Signature blur-to-focus reveal. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

export const staticVariants: Variants = {
  hidden: { opacity: 1, filter: "blur(0px)", y: 0 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

export const wordVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(2px)", y: 5 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

export const VIEWPORT = { once: true, amount: 0.18 } as const;
