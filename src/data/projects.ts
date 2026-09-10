import type { TechKey } from "./tech";

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  external?: boolean;
  year: string;
  stack: TechKey[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "atlas-analytics",
    title: "Atlas Analytics",
    description:
      "A query console for product teams that streams results while they compute. Cut median time-to-first-row from 4.1s to 380ms.",
    image: "/images/projects/atlas-analytics.png",
    alt: "Abstract rendering of layered analytics panels with a bar chart",
    href: "https://example.com/atlas",
    external: true,
    year: "2025",
    stack: ["typescript", "react", "postgres", "go"],
    featured: true,
  },
  {
    slug: "meridian-design-system",
    title: "Meridian Design System",
    description:
      "Forty-two components, one token pipeline, three products. Design-to-production drift dropped to near zero after adoption.",
    image: "/images/projects/meridian-design-system.png",
    alt: "Abstract grid composition of interface blocks in warm neutrals",
    href: "https://example.com/meridian",
    external: true,
    year: "2024",
    stack: ["typescript", "react", "tailwind", "figma"],
    featured: true,
  },
  {
    slug: "harbor-payments",
    title: "Harbor Checkout",
    description:
      "A payment flow rebuilt around optimistic state and idempotent retries. Checkout completion rose 9.4% across three markets.",
    image: "/images/projects/harbor-payments.png",
    alt: "Abstract stack of layered cards in teal tones",
    href: "https://example.com/harbor",
    external: true,
    year: "2024",
    stack: ["typescript", "next", "node", "redis"],
    featured: true,
  },
  {
    slug: "signal-observability",
    title: "Signal",
    description:
      "A latency explorer that renders one million spans in a canvas timeline without dropping a frame on a four-year-old laptop.",
    image: "/images/projects/signal-observability.png",
    alt: "Abstract flowing wave lines over a deep violet field",
    href: "https://example.com/signal",
    external: true,
    year: "2023",
    stack: ["typescript", "webgl", "rust", "graphql"],
  },
  {
    slug: "cadence-scheduling",
    title: "Cadence",
    description:
      "Scheduling for clinics across eleven time zones. Double-booking incidents went from weekly to none in the first six months.",
    image: "/images/projects/cadence-scheduling.png",
    alt: "Abstract orbital composition in warm apricot tones",
    href: "https://example.com/cadence",
    external: true,
    year: "2023",
    stack: ["typescript", "react", "node", "postgres"],
  },
  {
    slug: "quill-editor",
    title: "Quill",
    description:
      "A collaborative markdown editor with CRDT sync and offline drafts. Conflict resolution runs entirely on the client.",
    image: "/images/projects/quill-editor.png",
    alt: "Abstract dark editor surface with green syntax accents",
    href: "https://example.com/quill",
    external: true,
    year: "2022",
    stack: ["typescript", "react", "rust", "motion"],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
