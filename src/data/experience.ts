import type { TechKey } from "./tech";

export type Experience = {
  company: string;
  /** Two-letter monogram used for the neutral company mark. */
  mark: string;
  markColor: string;
  role: string;
  period: string;
  summary: string;
  stack: TechKey[];
};

export const experience: Experience[] = [
  {
    company: "Northbeam Systems",
    mark: "NB",
    markColor: "#2f4f6f",
    role: "Staff Frontend Engineer",
    period: "March 2023 — Present",
    summary:
      "Lead the interface platform behind the analytics console, and rebuilt the rendering path so dashboards with 40k data points stay interactive.",
    stack: ["typescript", "react", "next", "graphql", "postgres"],
  },
  {
    company: "Lumen Retail",
    mark: "LR",
    markColor: "#6f4b2f",
    role: "Senior Product Engineer",
    period: "June 2021 — February 2023",
    summary:
      "Owned checkout and account surfaces for a marketplace serving 2.3M monthly shoppers, and moved the storefront to streaming server rendering.",
    stack: ["typescript", "next", "node", "redis"],
  },
  {
    company: "Orbit Foundry",
    mark: "OF",
    markColor: "#3f5a45",
    role: "Frontend Engineer",
    period: "August 2019 — May 2021",
    summary:
      "Built the first shared component library across four product teams, and wrote the token pipeline that kept design and code in sync.",
    stack: ["typescript", "react", "tailwind", "figma"],
  },
  {
    company: "Cassette Labs",
    mark: "CL",
    markColor: "#4a3f66",
    role: "Software Engineer",
    period: "January 2018 — July 2019",
    summary:
      "Shipped the real-time collaboration layer for a document tool, including presence, offline drafts, and conflict-free merges.",
    stack: ["typescript", "react", "node", "webgl"],
  },
  {
    company: "Foldwork Studio",
    mark: "FS",
    markColor: "#6b3f4a",
    role: "Freelance Web Developer",
    period: "May 2017 — December 2017",
    summary:
      "Designed and built marketing sites for early-stage founders, with a focus on typography, load performance, and honest copy.",
    stack: ["typescript", "node", "figma"],
  },
];
