export type Outcome = {
  headline: string;
  detail: string;
};

/** Factual delivery outcomes — no client quotations, no invented metrics. */
export const outcomes: Outcome[] = [
  {
    headline: "2,000+ users supported",
    detail:
      "The Formial platform replaced a fragmented WhatsApp-based operational workflow for a user base of more than two thousand.",
  },
  {
    headline: "Multiple products shipped with founders",
    detail:
      "Direct engagements across education, professional networking, enterprise services and ecommerce, working from the founder's own description of the process.",
  },
  {
    headline: "End-to-end ownership",
    detail:
      "Product discovery, interface design, responsive implementation, deployment and the maintenance that follows launch.",
  },
  {
    headline: "Across the modern stack",
    detail:
      "Next.js, React and Node.js on the product side; AWS EC2/S3, MongoDB, Vercel and Shopify on the infrastructure and commerce side.",
  },
];
