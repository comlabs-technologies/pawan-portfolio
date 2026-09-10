import type { TechKey } from "./tech";

export type Experience = {
  company: string;
  /** Two-letter monogram used for the neutral company mark. */
  mark: string;
  markColor: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  stack: TechKey[];
};

export const experience: Experience[] = [
  {
    company: "Vionsys IT Solutions",
    mark: "VI",
    markColor: "#2f4f6f",
    role: "Software Engineer",
    period: "February 2026 — Present",
    summary:
      "Own the company website and client-facing web products across UI/UX, development, responsive implementation, deployment and ongoing improvements. Have led client conversations for warehouse-management and taxi-booking products, working alongside management and junior developers.",
    stack: ["typescript", "next", "react", "tailwind", "node"],
  },
  {
    company: "Founder-Led Client Engagements",
    mark: "FL",
    markColor: "#4a3f66",
    role: "Technical Consultant & Software Developer",
    period: "July 2025 — January 2026",
    location: "Remote",
    summary:
      "Worked directly with founders to understand business processes, define product scope and ship production applications across education, professional networking, enterprise services and ecommerce.",
    stack: ["next", "react", "node", "shopify", "vercel"],
  },
  {
    company: "Formial Labs",
    mark: "FO",
    markColor: "#3f5a45",
    role: "Freelance Frontend Engineer",
    period: "October 2025 — January 2026",
    location: "Remote",
    summary:
      "Built a multi-page platform containing authentication, onboarding, media upload, subscriptions, administrative workflows and more than ten production screens. Collaborated directly with the founder, backend engineers and interns.",
    stack: ["react", "javascript", "node", "mongodb", "aws"],
  },
];
