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
    slug: "cleanly",
    title: "Cleanly",
    description:
      "A streamlined home-services platform that turns service discovery, scheduling and booking management into one clear customer journey.",
    image: "/images/projects/cleanly.png",
    alt: "Cleanly homepage with a live product demo of the customer dashboard",
    context: "Product Design & Development",
    stack: [],
    featured: true,
  },
  {
    slug: "comlabs-technologies",
    title: "Comlabs Technologies",
    description:
      "Built the digital presence and product direction for a technology partner delivering application support, AWS cloud, AI agents and custom software engineering.",
    image: "/images/projects/comlabs.png",
    alt: "Comlabs Technologies homepage introducing application, cloud and AI services",
    href: "https://www.comlabstechnologies.com/",
    external: true,
    context: "Technology Company · Founder",
    stack: [],
    featured: true,
  },
  {
    slug: "humanmadelogic",
    title: "HumanMadeLogic",
    description:
      "Rebuilt a WordPress marketing website in Next.js with sharper positioning, improved performance and a cleaner conversion-focused experience.",
    image: "/images/projects/humanmadelogic.png",
    alt: "HumanMadeLogic homepage with the headline We make brands impossible to ignore",
    href: "https://humanmadelogic.vercel.app/",
    external: true,
    context: "Website Redesign · Next.js",
    stack: ["next"],
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
