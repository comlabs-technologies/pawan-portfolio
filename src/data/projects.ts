import type { TechKey } from "./tech";

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Omitted until a verified public URL exists; the card then renders unlinked. */
  href?: string;
  external?: boolean;
  context: string;
  stack: TechKey[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "formial-platform",
    title: "Formial Platform",
    description:
      "A React and Node.js platform backed by MongoDB and AWS EC2/S3. The system supported more than 2,000 users and replaced a fragmented WhatsApp-based operational workflow.",
    image: "/images/projects/formial-platform.png",
    alt: "Abstract rendering of layered application panels for the Formial platform",
    context: "Formial Labs",
    stack: ["react", "javascript", "node", "mongodb", "aws"],
    featured: true,
  },
  {
    slug: "vionsys-platform",
    title: "Vionsys Company Platform",
    description:
      "End-to-end ownership of the company's main digital presence, including interface design, responsive frontend implementation, deployment and maintenance.",
    image: "/images/projects/vionsys-platform.png",
    alt: "Abstract grid composition representing the Vionsys company platform",
    context: "Vionsys IT Solutions",
    stack: ["typescript", "next", "react", "tailwind"],
    featured: true,
  },
  {
    slug: "global-services-enterprise",
    title: "Global Services Enterprise",
    description:
      "Worked directly with the founder on product strategy, design, Next.js and TypeScript implementation, SEO and Vercel deployment.",
    image: "/images/projects/global-services-enterprise.png",
    alt: "Abstract layered interface composition in teal tones",
    context: "Founder-led engagement",
    stack: ["typescript", "next", "tailwind", "vercel"],
    featured: true,
  },
  {
    slug: "fusion-institute",
    title: "Fusion Institute Website",
    description:
      "Designed and developed a complete responsive education website from initial requirements through production deployment.",
    image: "/images/projects/fusion-institute.png",
    alt: "Abstract stack of layered cards in warm tones",
    context: "Founder-led engagement",
    stack: ["next", "react", "tailwind", "vercel"],
  },
  {
    slug: "docrud",
    title: "Docrud",
    description:
      "Implemented authentication and onboarding workflows using Next.js and Node.js for a professional networking platform.",
    image: "/images/projects/docrud.png",
    alt: "Abstract orbital composition representing connected profiles",
    context: "Founder-led engagement",
    stack: ["next", "typescript", "node", "mongodb"],
  },
  {
    slug: "vithub-storefront",
    title: "Vithub.in",
    description:
      "Built and configured a complete Shopify storefront with responsive merchandising and ecommerce flows.",
    image: "/images/projects/vithub-storefront.png",
    alt: "Abstract grid of merchandising blocks in green tones",
    context: "Founder-led engagement",
    stack: ["shopify", "javascript"],
  },
  {
    slug: "warehouse-management",
    title: "Warehouse Management System",
    description:
      "Translated client conversations and operational requirements into product flows and implementation plans.",
    image: "/images/projects/warehouse-management.png",
    alt: "Abstract stacked panels representing warehouse inventory flows",
    context: "Vionsys IT Solutions",
    stack: ["typescript", "react", "node"],
  },
  {
    slug: "taxi-booking",
    title: "Taxi-Booking Application",
    description:
      "Contributed to requirements discovery, feature planning and development for a client-facing transportation platform.",
    image: "/images/projects/taxi-booking.png",
    alt: "Abstract orbital composition in warm amber tones",
    context: "Vionsys IT Solutions",
    stack: ["typescript", "react", "node"],
  },
  {
    slug: "maritime-5g-research",
    title: "Maritime 5G Research",
    description:
      "Conducted research at BITS Pilani into 5G network architecture for maritime connectivity, involving the Indian Navy and Mormugao Port Authority.",
    image: "/images/projects/maritime-5g-research.png",
    alt: "Abstract flowing network lines over a deep blue field",
    context: "BITS Pilani, Goa Campus",
    stack: [],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
